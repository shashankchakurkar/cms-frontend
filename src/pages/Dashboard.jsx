import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { dummyStudents, dummyStaff, dummyClasses, dummyEnrollments, dummyAttendance, dummyExams } from '../data/dummyData';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Students',
      value: dummyStudents.length,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      label: 'Total Staff',
      value: dummyStaff.length,
      icon: UserCheck,
      color: 'bg-green-500',
      trend: '+5%',
    },
    {
      label: 'Active Classes',
      value: dummyClasses.filter(c => c.status === 'ACTIVE').length,
      icon: BookOpen,
      color: 'bg-purple-500',
      trend: '+2',
    },
    {
      label: 'Total Enrollments',
      value: dummyEnrollments.filter(e => e.status === 'ACTIVE').length,
      icon: CalendarCheck,
      color: 'bg-orange-500',
      trend: '+8%',
    },
  ];

  const recentAttendance = dummyAttendance.slice(0, 5);
  const upcomingExams = dummyExams.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.trend} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attendance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CalendarCheck className="w-5 h-5 mr-2 text-indigo-600" />
              Recent Attendance
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentAttendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{record.studentName}</p>
                    <p className="text-sm text-gray-600">{record.className}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === 'PRESENT'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'ABSENT'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              Upcoming Exams
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{exam.name}</p>
                    <p className="text-sm text-gray-600">{exam.className}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{exam.examDate}</p>
                    <p className="text-xs text-gray-600">{exam.startTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition">
            <Users className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Student</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <UserCheck className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Staff</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
            <CalendarCheck className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Mark Attendance</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
            <FileText className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Create Exam</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
