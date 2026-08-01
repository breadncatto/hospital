'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { systemApi } from '../api/api';

// Bê bộ từ điển Icon từ DynamicForm sang hoặc tách ra 1 file dùng chung (ví dụ: utils/icons.js)
const Icons = {
  shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  // ... thêm các icon khác nếu cần
};

export default function Sidebar() {
  const pathname = usePathname(); 
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await systemApi.getMenus();
        setMenuItems(response.data || []);
      } catch (error) {
        console.error("Lỗi lấy menu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-gray-500">Đang tải menu...</div>;
  }

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-5 text-xl font-bold border-b border-gray-800">
        HOSPITAL SYSTEM
      </div>
      
      <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
        {menuItems.map((item) => {
          // Xử lý active state: Nếu pathname chứa đường dẫn của menu thì tô sáng
          const isActive = pathname === item.to || pathname.startsWith(item.to + '/');

          return (
            <Link 
              key={item.id} 
              href={item.to || '#'} // Nếu BE trả về "to": "", tạm thời để '#' tránh lỗi
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#00b074] text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {/* Hiển thị Icon từ dictionary */}
              <span className="flex items-center justify-center">
                {Icons[item.icon] || <span className="w-5 h-5 bg-gray-700 rounded-full" />}
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