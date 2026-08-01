'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { systemApi } from '../api/api';
import { Icons } from '../utils/icon'; 

export default function Sidebar() {
  const pathname = usePathname(); 
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      setError(null);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User ID not found. Please login again.');
        setIsLoading(false);
        return;
      }

      const response = await systemApi.getMenus(userId);
      if (response.error) {
        setError(response.error);
      } else {
        setMenuItems(response.data?.data || response.data || []);
      }
      setIsLoading(false);
    };

    fetchMenu();
  }, []);

  if (isLoading) {
    return <div className="p-5 text-gray-400">Loading menu...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500 font-medium">{error}</div>;
  }

  if (menuItems.length === 0) {
    return <div className="p-5 text-gray-400">No menu available</div>;
  }

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-5 text-xl font-bold border-b border-gray-800">
        HOSPITAL SYSTEM
      </div>
      
      <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
        {menuItems.map((item) => {
          const routePath = item.to || '#';
          const isActive = pathname === routePath || pathname.startsWith(routePath + '/');

          return (
            <Link 
              key={item.id} 
              href={routePath} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#00b074] text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5">
                {Icons[item.icon] || <span className="w-2 h-2 bg-gray-600 rounded-full" />}
              </span>
              
              <span className="text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}