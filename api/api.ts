const BASE_URL = 'http://10.36.22.112:81/api';

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
  getAll: async (moduleName: string) => {
    console.log(moduleName);
    const res = await fetch(`${BASE_URL}/${moduleName}`);
    if (!res.ok) throw new Error('Lỗi tải dữ liệu');
    console.log(res)
    return res.json();
  },

  create: async (moduleName: string, data: Record<string, any>) => {
    moduleName = moduleName.toLowerCase();
    console.log(JSON.stringify(data))
    const res = await fetch(`${BASE_URL}/${moduleName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      //body: data as any,
    });
    console.log(`Data: ${JSON.stringify(data)}`)
    if (!res.ok) throw new Error('Thêm mới thất bại');
    console.log(`Data: ${res.json}`)
    return res.json();
  },

  update: async (moduleName: string, id: string | number, data: Record<string, any>) => {
    const res = await fetch(`${BASE_URL}/${moduleName}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Cập nhật thất bại');
    return res.json();
  },

  delete: async (moduleName: string, id: string | number) => {
    const res = await fetch(`${BASE_URL}/${moduleName}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Xóa thất bại');
    return true;
  }
};

export const systemApi = {
  getMenus: async () => {
    const res = await fetch(`${BASE_URL}/menus`, {
      method: 'GET',
     // headers: getAuthHeaders(), 
    });
    
    if (!res.ok) {
      throw new Error('Lỗi tải danh sách menu');
    }
    return res.json();
  }
};