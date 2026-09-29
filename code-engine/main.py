from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager
import subprocess
import os
import tempfile

EUREKA_SERVER = "http://localhost:8761/eureka"
APP_NAME = "engine-service"
SERVER_PORT = 8000

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Register to Eureka on startup
    try:
        await eureka_client.init_async(eureka_server=EUREKA_SERVER,
                                       app_name=APP_NAME,
                                       instance_port=SERVER_PORT)
    except Exception as e:
        print(f"Notice: Could not connect to Eureka ({e}) - Running in standalone mode.")
    yield
    # Unregister from Eureka on shutdown
    try:
        await eureka_client.stop_async()
    except:
        pass

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    language: str
    code: str
    input_data: str = ""

@app.get("/")
def read_root():
    return {"status": "Code Engine is running"}

def execute_python(code: str, input_data: str):
    try:
        result = subprocess.run(
            ['python', '-c', code],
            input=input_data,
            text=True,
            capture_output=True,
            timeout=5
        )
        return result.stdout + result.stderr
    except subprocess.TimeoutExpired:
        return "Error: Execution Timeout (5s)"
    except Exception as e:
        return str(e)

def execute_c(code: str, input_data: str):
    # Create a temporary directory to hold the source and executable
    with tempfile.TemporaryDirectory() as temp_dir:
        source_file = os.path.join(temp_dir, "main.c")
        exec_file = os.path.join(temp_dir, "main.exe" if os.name == 'nt' else "main")
        
        with open(source_file, "w", encoding="utf-8") as f:
            f.write(code)
            
        # Compile the C code
        compile_process = subprocess.run(
            ['gcc', source_file, '-o', exec_file],
            capture_output=True, text=True
        )
        
        if compile_process.returncode != 0:
            return "Compilation Error:\n" + compile_process.stderr
            
        # Execute the compiled program
        try:
            run_process = subprocess.run(
                [exec_file],
                input=input_data,
                capture_output=True, text=True,
                timeout=5
            )
            return run_process.stdout + run_process.stderr
        except subprocess.TimeoutExpired:
            return "Error: Execution Timeout (5s)"
        except Exception as e:
            return str(e)

@app.post("/execute")
def execute_code(request: CodeExecutionRequest):
    language = request.language.lower()
    
    if language == "python":
        output = execute_python(request.code, request.input_data)
    elif language == "c":
        output = execute_c(request.code, request.input_data)
    else:
        output = f"Error: Language '{language}' is not supported yet by Moulinette."

    return {
        "status": "success",
        "language": language,
        "output": output
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=SERVER_PORT)
