const BASE_URL = 'http://10.36.22.72:81/api';

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
        throw new Error(errorData?.message || 'Login failed!');
      }
      return response;
      
    } catch (error) {
      console.error('Connection error:', error);
      throw error; 
    }
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken'); 
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const dynamicApi = {
  getAll: async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}/${endpoint}`);
    if (!res.ok){
      return {data: [], error: "Connection error!"};
    }
    return res.json();
  },

  create: async (endpoint: string, data: Record<string, any>) => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      });
    console.log(`ok`);
    if (res.ok!){
      return {data: [], error: "Connection error!"}
    }
    return data;
  },

  update: async (endpoint: string, id: string | number, data: Record<string, any>) => {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok!)return {data: [], error: "Connection error!"}
    return res.json();
  },

  delete: async (endpoint: string, id: string | number) => {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (res.ok!)return {data: [], error: "Connection error!"}
    return true;
  }
};

export const systemApi = {
  getMenus: async (userId: number) => {
    try {
      const res = await fetch(`${BASE_URL}/User/userId=${userId}/menus`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (!res.ok) {
        return { error: 'Connection error', data: [] }; 
      }
      
      const responseData = await res.json();
      return { error: null, data: responseData };
    } catch (err) {
      console.error('Fetch error:', err);
      return { error: 'Connection error', data: [] };
    }
  }
};