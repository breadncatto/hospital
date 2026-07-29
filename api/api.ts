const BASE_URL = 'http://localhost:7270/api'; 
export const authApi = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      return response;
      
    } catch (error) {
      console.error('Lỗi khi gọi API login:', error);
      throw error; 
    }
  },
  //...
};