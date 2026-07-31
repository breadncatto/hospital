'use client';

import mockData from '../../mock/db.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const currentPath = usePathname(); 

  return (
    <div className="flex h-screen w-full bg-[#f4f7f6] overflow-hidden font-sans">
      
      {}
      <aside className="w-[260px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* LOGO */}
        <div className="h-[60px] flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-[#00b074] font-bold text-xl tracking-wider">
            {}
            <div className="w-8 h-8 rounded-full border-2 border-[#00b074] flex items-center justify-center">H</div>
            HEHE
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto py-6">
          {mockData.menuGroups.map((group, index) => (
            <div key={index} className="mb-6">
              {}
              <h3 className="px-6 mb-2 text-xs font-bold text-gray-500 tracking-wider">
                {group.groupName}
              </h3>
              
              {}
              <ul className="flex flex-col">
                {group.menus.map((menu) => {
                  const isActive = currentPath === menu.path;
                  
                  return (
                    <li key={menu.id}>
                      <Link 
                        href={menu.path}
                        className={`flex items-center gap-3 px-6 py-2 text-sm font-medium transition-colors ${
                          isActive 
                            ? "text-[#00b074] bg-[#e6f7f1] border-r-4 border-[#00b074]" 
                            : "text-gray-600 hover:bg-gray-50" 
                        }`}
                      >
                        {/* ICON */}
                        <div className={`w-4 h-4 rounded-sm ${isActive ? 'bg-[#00b074]' : 'border border-gray-400'}`}></div>
                        {menu.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOPBAR */}
        <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="text-gray-400">
            {}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </div>
          
          <div className="flex items-center gap-5 text-gray-500">
            <div className="w-5 h-5 rounded-full border border-gray-400"></div>
            <div className="w-5 h-5 rounded border border-gray-400"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
               <img src={mockData.currentUser.avatar} alt="Avatar" />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT*/}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f4f7f6] p-6">
          {children}
        </main>
      </div>
      
    </div>
  );
}