import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck,
  FileText,
  BarChart3,
  LogOut,
  GraduationCap,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['ADMIN', 'TEACHER'] },
    { path: '/students', icon: Users, label: 'Students', roles: ['ADMIN', 'TEACHER'] },
    { path: '/staff', icon: UserCheck, label: 'Staff', roles: ['ADMIN'] },
    { path: '/classes', icon: BookOpen, label: 'Classes', roles: ['ADMIN', 'TEACHER'] },
    { path: '/attendance', icon: CalendarCheck, label: 'Attendance', roles: ['ADMIN', 'TEACHER'] },
    { path: '/exams', icon: FileText, label: 'Exams', roles: ['ADMIN', 'TEACHER'] },
    { path: '/reports', icon: BarChart3, label: 'Reports', roles: ['ADMIN'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-6 border-b">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">CMS</span>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded">
              {user?.role}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-gray-800">CMS</span>
          </div>
          <div className="w-10" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
