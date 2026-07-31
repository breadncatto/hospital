'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cuprum } from 'next/font/google';
import { authApi } from '../../api/api'; 

const cuprum = Cuprum({ subsets: ['latin'], weight: ['400', '700'] });

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authApi.login(username, password);
      
      const data = await response.json();
      if (response.ok) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('accessToken', data.token);
        console.log(data.token);
        router.push('/user-accounts');
      } else {
        setError(data.message || 'Tên người dùng hoặc mật khẩu không chính xác!');
      }

    } catch (err) {
      setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng hoặc Backend.');
    }
  };

  return (
    <div className={`flex min-h-screen w-full bg-[#E6EFFF] ${cuprum.className}`}>
      
      {}
      <div className="flex w-full flex-col justify-center px-10 md:w-[40%] lg:px-20 xl:px-32">
        <div className="mx-auto w-full max-w-[450px]">
          
          {}
          <h1 className="mb-10 text-[3.5rem] font-bold text-black lg:text-[4rem]">
            Đăng nhập
          </h1>

          {}
          {error && (
            <div className="mb-6 rounded bg-red-100 p-3 text-center text-sm text-red-600 shadow">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {}
            <div className="flex flex-col gap-2">
              <label className="text-[1.2rem] font-bold text-black">
                Tên người dùng
              </label>
              <div className="relative flex items-center">
                {}
                <div className="absolute left-4 text-gray-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-[60px] w-full rounded-[5px] bg-white pl-12 pr-4 text-xl text-black shadow-md outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {}
            <div className="flex flex-col gap-2">
              <label className="text-[1.2rem] font-bold text-black">
                Mật khẩu
              </label>
              <div className="relative flex items-center">
                {}
                <div className="absolute left-4 text-gray-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[60px] w-full rounded-[5px] bg-white pl-12 pr-4 text-xl text-black shadow-md outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {}
            <div className="flex justify-end mt-[-10px]">
              <a href="#" className="text-lg text-[#3b82f6] underline hover:text-blue-700">
                Quên mật khẩu
              </a>
            </div>

            {}
            <button
              type="submit"
              className="mt-2 h-[60px] w-full rounded-[5px] bg-[#4780E3] text-2xl font-normal text-white shadow-md transition-colors hover:bg-[#3466bd]"
            >
              Đăng nhập
            </button>
          </form>

          {}
          <div className="mt-6 flex justify-center text-lg text-[#555]">
            Chưa có tài khoản?{' '}
            <a href="#" className="ml-1 font-bold text-[#2A5C9A] underline hover:text-[#1d4272]">
              Đăng ký
            </a>
          </div>

        </div>
      </div>

      {}
      <div 
        className="hidden md:block md:w-[70%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image 2.png')" }} 
      />
      
    </div>
  );
}