import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mic, FileText, History, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Recording', icon: Mic, path: '/recording' },
    { name: 'Notes', icon: FileText, path: '/notes' },
    { name: 'History', icon: History, path: '/history' },
  ];

  return (
    <div className={`bg-white text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 shadow-lg`}>
      <div className="flex justify-between items-center px-4 mb-6">
        <h2 className="text-2xl font-semibold">Voice Notes</h2>
        <button onClick={toggleSidebar} className="md:hidden">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === item.path ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;