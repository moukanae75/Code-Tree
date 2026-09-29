import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, BookOpen, PlusCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', language: 'Python' });
  const [newLesson, setNewLesson] = useState({ title: '', content: 'Write instructions...\nOutput: Expected Output here', courseId: '', order: 1 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resLeaderboard = await axios.get('http://localhost:8080/api/gamification/leaderboard');
      setLeaderboard(resLeaderboard.data.sort((a: any, b: any) => b.points - a.points));

      const resCourses = await axios.get('http://localhost:8080/api/content/courses');
      setCourses(resCourses.data);
      if (resCourses.data.length > 0 && !newLesson.courseId) {
        setNewLesson(prev => ({ ...prev, courseId: resCourses.data[0].id.toString() }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/content/courses', newCourse);
      setNewCourse({ title: '', description: '', language: 'Python' });
      fetchData();
      alert('Course created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/content/lessons', {
        title: newLesson.title,
        content: newLesson.content,
        order: newLesson.order,
        courseId: parseInt(newLesson.courseId)
      });
      setNewLesson(prev => ({ ...prev, title: '', content: 'Write instructions...\nOutput: Expected Output here', order: prev.order + 1 }));
      fetchData();
      alert('Lesson added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div>
          <h2 className="text-3xl font-extrabold text-amber-400">Teacher Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage courses and monitor student progress</p>
        </div>
        <Link to="/" className="text-gray-400 hover:text-white transition">Back to Main</Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Leaderboard */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="text-amber-400 w-6 h-6" />
            <h3 className="text-xl font-bold">Student Leaderboard</h3>
          </div>
          <div className="space-y-4">
            {leaderboard.length === 0 ? <p className="text-gray-500">No students yet.</p> : null}
            {leaderboard.map((student: any, index: number) => (
              <div key={student.id} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3">
                  <span className={`font-bold ${index === 0 ? 'text-amber-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                    #{index + 1}
                  </span>
                  <span className="font-semibold">{student.userId}</span>
                </div>
                <div className="text-right">
                  <span className="block text-emerald-400 font-bold">{student.points} XP</span>
                  <span className="block text-xs text-purple-400">Level {student.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Course Management */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Create Course */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="text-emerald-400 w-6 h-6" />
              <h3 className="text-xl font-bold">Create New Course</h3>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="Course Title" required
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-emerald-500"
                  value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                />
                <select 
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-emerald-500"
                  value={newCourse.language} onChange={e => setNewCourse({...newCourse, language: e.target.value})}
                >
                  <option value="Python">Python</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
              </div>
              <textarea 
                placeholder="Course Description" required rows={2}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-emerald-500 resize-none"
                value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})}
              />
              <button type="submit" className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition font-semibold">
                <PlusCircle className="w-5 h-5" /> <span>Add Course</span>
              </button>
            </form>
          </div>

          {/* Add Lesson */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center space-x-2 mb-6">
              <PlusCircle className="text-cyan-400 w-6 h-6" />
              <h3 className="text-xl font-bold">Add Exercise (Test Case)</h3>
            </div>
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500"
                  value={newLesson.courseId} onChange={e => setNewLesson({...newLesson, courseId: e.target.value})}
                  required
                >
                  <option value="">Select Course...</option>
                  {courses.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
                <input 
                  type="text" placeholder="Exercise Title" required
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500"
                  value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="Exercise Instructions (Include 'Output: ...' for Moulinette Validation)" required rows={4}
                className="w-full font-mono text-sm bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-500 resize-none leading-relaxed"
                value={newLesson.content} onChange={e => setNewLesson({...newLesson, content: e.target.value})}
              />
              <button type="submit" className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg transition font-semibold">
                <PlusCircle className="w-5 h-5" /> <span>Add Exercise</span>
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-500">
              * Note: The Code Engine (Moulinette) extracts the string after "Output:" to validate the student's code automatically.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
