const BASE_URL = 'http://10.36.22.85:81/api';

export const authApi = {
  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Đăng nhập thất bại!');
      }
      return response;
      
    } catch (error) {
      console.error('Lỗi khi gọi API login:', error);
      throw error; 
    }


  },
  //...
};