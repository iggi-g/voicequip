import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header>
          <button onClick={toggleSidebar} className="p-2 text-gray-900">
            <Menu className="h-6 w-6" />
          </button>
        </Header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;