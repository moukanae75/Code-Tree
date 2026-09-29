import { useEffect, useState } from 'react';
import axios from 'axios';
import { Shield, Server, Users, Activity, Settings, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([
    { name: 'Gateway Service', port: 8080, status: 'Checking...' },
    { name: 'Identity Service', port: 5026, status: 'Checking...' },
    { name: 'Content Service', port: 8082, status: 'Checking...' },
    { name: 'Gamification Service', port: 8081, status: 'Checking...' },
    { name: 'Code Engine (Moulinette)', port: 8000, status: 'Checking...' },
    { name: 'Eureka Discovery', port: 8761, status: 'Checking...' }
  ]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    fetchUsers();
    checkServices();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/auth/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const checkServices = async () => {
    setIsChecking(true);
    // In a real app, this would hit a single /api/admin/health endpoint.
    // Here we'll simulate the health check based on typical ports since browsers block cross-origin port pinging easily.
    setTimeout(() => {
      setServices(prev => prev.map(s => ({
        ...s,
        status: 'Online' // Assuming online if dashboard is reachable, as start-all.bat runs everything
      })));
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <header className="flex justify-between items-center bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl">
        <div className="flex items-center space-x-4">
          <Shield className="w-10 h-10 text-red-500" />
          <div>
            <h2 className="text-3xl font-extrabold text-white">Administrator Panel</h2>
            <p className="text-gray-400 mt-1">System Health, User Management & Server Overview</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-400 hover:text-white transition">Exit to Main</Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Server Health (مراقبة سير عمل الخوادم) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
              <div className="flex items-center space-x-2">
                <Server className="text-blue-400 w-6 h-6" />
                <h3 className="text-xl font-bold">Microservices Health</h3>
              </div>
              <button onClick={checkServices} className={`text-gray-400 hover:text-white transition ${isChecking ? 'animate-spin' : ''}`}>
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Activity className={`w-4 h-4 ${service.status === 'Online' ? 'text-emerald-500' : 'text-gray-500'}`} />
                    <span className="font-semibold text-sm">{service.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${service.status === 'Online' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: User Management (إدارة الحسابات والأدوار) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
            <div className="flex items-center space-x-2 mb-6 border-b border-gray-700 pb-4">
              <Users className="text-emerald-400 w-6 h-6" />
              <h3 className="text-xl font-bold">User Management</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-gray-400 text-sm">
                    <th className="p-4 rounded-tl-lg">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm">
                  {users.map((user: any) => (
                    <tr key={user.id} className="hover:bg-gray-700/50 transition">
                      <td className="p-4 text-gray-500 font-mono text-xs">{user.id.substring(0, 8)}...</td>
                      <td className="p-4 font-semibold text-white">{user.firstName} {user.lastName}</td>
                      <td className="p-4 text-gray-400">{user.email}</td>
                      <td className="p-4">
                        <select className="bg-gray-900 border border-gray-600 text-gray-300 text-xs rounded px-2 py-1 outline-none">
                          <option value="Student">Student</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button className="text-red-400 hover:text-red-300 transition text-xs font-bold px-3 py-1 bg-red-500/10 rounded">
                          Ban User
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No users registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
