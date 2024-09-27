import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mic, FileText, History } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Recording', icon: Mic, path: '/recording' },
    { name: 'Notes', icon: FileText, path: '/notes' },
    { name: 'History', icon: History, path: '/history' },
  ];

  return (
    <div className={`bg-green-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === item.path ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <item.icon className="inline-block mr-2 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;