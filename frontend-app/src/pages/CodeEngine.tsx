import { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Terminal, Code2, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function CodeEngine() {
  const location = useLocation();
  const state = location.state as any;

  const [code, setCode] = useState(state?.initialCode || 'print("Welcome to CodeTree Live Engine!")');
  const [language, setLanguage] = useState(state?.language || 'python');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const lesson = state?.lesson;
  const userId = localStorage.getItem('userId') || 'guestUser';

  const handleRunCode = async (isSubmit: boolean = false) => {
    setIsLoading(true);
    setOutput('');
    setIsSuccess(false);
    try {
      const res = await axios.post('http://localhost:8000/execute', {
        language,
        code
      });
      
      const executionOutput = res.data.output || JSON.stringify(res.data, null, 2);
      let newOutput = executionOutput;

      if (isSubmit && lesson) {
        // Extract Expected Output from lesson content (e.g. Output: ...)
        const outputMatch = lesson.content.match(/Output:\s*(.*)/i);
        if (outputMatch && outputMatch[1]) {
          const expected = outputMatch[1].trim();
          const actual = executionOutput.trim();

          if (actual.includes(expected) || expected.includes(actual) || actual === expected) {
            newOutput += '\n\n✅ TEST PASSED! Output matches expected result.';
            setIsSuccess(true);
            
            // Award points
            if (userId !== 'guestUser') {
               await axios.post(`http://localhost:8080/api/gamification/progress/${userId}/add-points?points=10`);
               newOutput += '\n🌟 You earned 10 XP!';
            }
          } else {
            newOutput += `\n\n❌ TEST FAILED!\nExpected: ${expected}\nActual: ${actual}`;
          }
        } else {
           newOutput += '\n\n⚠️ No strict expected output found for this exercise. Executed successfully.';
        }
      }

      setOutput(newOutput);
    } catch (err: any) {
      setOutput(`Error: ${err.message}\n\nMake sure the Code Engine service is running on port 8000.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700 gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <Code2 className="text-cyan-400 w-8 h-8" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            {lesson ? `Exercise: ${lesson.title}` : 'Live Code Engine'}
          </h2>
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex-1 md:flex-none bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
            disabled={!!lesson} // lock language if solving a specific course lesson
          >
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          <button 
            onClick={() => handleRunCode(false)}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 min-w-[120px]"
          >
            {isLoading && !isSuccess ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            <span>Run</span>
          </button>

          {lesson && (
            <button 
              onClick={() => handleRunCode(true)}
              disabled={isLoading || isSuccess}
              className={`flex items-center justify-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-all shadow-lg disabled:opacity-50 min-w-[140px]
                ${isSuccess ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/30'}
              `}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isSuccess ? <CheckCircle className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isSuccess ? 'Passed' : 'Submit'}</span>
            </button>
          )}
        </div>
      </header>

      {lesson && (
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 whitespace-pre-wrap text-sm text-gray-300">
          <strong className="text-white block mb-2">Instructions:</strong>
          {lesson.content}
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
        {/* Editor Section */}
        <div className="flex flex-col bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700">
            <span className="text-sm font-mono text-gray-400">
              main.{language === 'python' ? 'py' : language === 'c' ? 'c' : language === 'cpp' ? 'cpp' : 'java'}
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-6 bg-gray-900 text-gray-100 font-mono text-base outline-none resize-none leading-relaxed"
            spellCheck="false"
            placeholder="Write your code here..."
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col bg-black rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-mono text-gray-400">Terminal Output</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto font-mono text-base">
            {output ? (
              <pre className={`whitespace-pre-wrap leading-relaxed ${isSuccess ? 'text-emerald-400' : 'text-gray-300'}`}>{output}</pre>
            ) : (
              <span className="text-gray-600">Execution output will appear here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
