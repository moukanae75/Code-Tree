import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Code, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState<any>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // API Gateway route to Content Service
    axios.get('http://localhost:8080/api/content/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));

    if (userId) {
      axios.get(`http://localhost:8080/api/gamification/progress/${userId}`)
        .then(res => setProgress(res.data))
        .catch(err => console.error('No progress yet', err));
    }
  }, [userId]);

  return (
    <div className="space-y-8">
      <header className="text-center py-12">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to CodeTree Learning</h2>
        <p className="text-gray-400 text-lg mb-6">Master programming languages with interactive lessons and gamification.</p>
        {userId && (
          <div className="inline-flex items-center space-x-6 bg-gray-800 px-8 py-4 rounded-full border border-purple-500/30">
            <div className="text-center">
              <span className="block text-sm text-gray-400 uppercase tracking-wider">Level</span>
              <span className="text-2xl font-bold text-purple-400">{progress?.level || 1}</span>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="text-center">
              <span className="block text-sm text-gray-400 uppercase tracking-wider">Total XP</span>
              <span className="text-2xl font-bold text-emerald-400">{progress?.points || 0}</span>
            </div>
          </div>
        )}
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition cursor-pointer group">
          <BookOpen className="w-12 h-12 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Interactive Courses</h3>
          <p className="text-gray-400">Learn step-by-step with guided tutorials.</p>
        </div>
        
        <Link to="/engine" className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition cursor-pointer group block">
          <Code className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Live Code Engine</h3>
          <p className="text-gray-400">Execute your code instantly in Python, C#, and more.</p>
        </Link>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition cursor-pointer group">
          <Trophy className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Gamified Learning</h3>
          <p className="text-gray-400">Earn points, level up, and unlock badges.</p>
        </div>
      </div>

      <section className="pt-12">
        <h3 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">Available Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <p className="text-gray-500 col-span-full">No courses available yet. Database might be empty.</p>
          ) : (
            courses.map((course: any) => (
              <Link to={`/course/${course.id}`} key={course.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition cursor-pointer block group">
                <h4 className="font-bold text-lg group-hover:text-emerald-400 transition">{course.title}</h4>
                <p className="text-gray-400 text-sm mt-2">{course.description}</p>
                <span className="inline-block mt-4 px-3 py-1 bg-gray-700 rounded-full text-xs font-semibold group-hover:bg-emerald-500 group-hover:text-white transition">{course.language}</span>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
