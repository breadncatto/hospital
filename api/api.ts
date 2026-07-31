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


  }
};

export const dynamicApi = {
  getAll: async (moduleName) => {
    const res = await fetch(`${BASE_URL}/${moduleName}`);
    if (!res.ok) throw new Error('Lỗi tải dữ liệu');
    return res.json();
  },

  create: async (moduleName, data) => {
    const res = await fetch(`${BASE_URL}/${moduleName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Thêm mới thất bại');
    return res.json();
  },

  update: async (moduleName, id, data) => {
    const res = await fetch(`${BASE_URL}/${moduleName}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Cập nhật thất bại');
    return res.json();
  },

  delete: async (moduleName, id) => {
    const res = await fetch(`${BASE_URL}/${moduleName}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Xóa thất bại');
    return true;
  }
};