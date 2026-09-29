import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CodeEngine from './pages/CodeEngine';
import CourseDetails from './pages/CourseDetails';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import './App';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <nav className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/50 backdrop-blur-md">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CodeTree</h1>
          <div className="space-x-4 flex items-center">
            <a href="/pricing" className="text-purple-400 hover:text-purple-300 transition mr-2 font-semibold">💎 Subscribe</a>
            <a href="/admin" className="text-red-400 hover:text-red-300 transition mr-2 font-semibold">Admin Panel</a>
            <a href="/teacher" className="text-amber-400 hover:text-amber-300 transition mr-4 font-semibold">Teacher View</a>
            <a href="/login" className="hover:text-emerald-400 transition">Login</a>
            <a href="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition">Register</a>
          </div>
        </nav>
        
        <main className="container mx-auto p-4 pt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/engine" element={<CodeEngine />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
