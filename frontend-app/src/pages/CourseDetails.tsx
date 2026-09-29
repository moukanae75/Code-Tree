import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/content/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!course) {
    return <div className="text-center py-12 text-gray-400">Loading course...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      
      <header className="bg-gray-800 p-8 rounded-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
        <p className="text-gray-400 mb-4">{course.description}</p>
        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
          {course.language}
        </span>
      </header>

      <section>
        <h3 className="text-2xl font-bold mb-6">Course Lessons</h3>
        <div className="space-y-4">
          {course.lessons?.map((lesson: any) => (
            <div key={lesson.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex justify-between items-center group">
              <div>
                <h4 className="font-bold text-lg">{lesson.title}</h4>
                <p className="text-gray-400 text-sm mt-1 whitespace-pre-wrap">{lesson.content}</p>
              </div>
              <Link 
                to="/engine" 
                state={{ 
                  initialCode: `// ${lesson.title}\n// Write your code here...`, 
                  language: course.language.toLowerCase(),
                  lesson: lesson
                }}
                className="bg-gray-700 hover:bg-emerald-500 text-white p-3 rounded-full transition-colors"
                title="Solve in Engine"
              >
                <PlayCircle className="w-6 h-6" />
              </Link>
            </div>
          ))}
          {(!course.lessons || course.lessons.length === 0) && (
            <p className="text-gray-500">No lessons available for this course yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
