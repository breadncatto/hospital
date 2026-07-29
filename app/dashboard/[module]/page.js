import mockData from '../../../mock/db.json';
import DynamicTable from '../../../components/shared/DynamicTable';

export default function ModulePage({ params }) {
  // 1. Lấy tên URL hiện tại. Ví dụ: URL là /user-accounts thì moduleName = "user-accounts"
  const moduleName = params.module; 

  // 2. Thuật toán tìm kiếm Menu tương ứng trong file JSON (Mock Data)
  let currentMenuConfig = null;
  
  // Quét qua các nhóm menu (SECURITY & SYSTEM, EMPLOYEE MANAGEMENT...)
  mockData.menuGroups.forEach((group) => {
    // Quét qua các menu con để tìm path khớp với URL hiện tại
    const foundMenu = group.menus.find((menu) => menu.path === `/${moduleName}`);
    if (foundMenu) {
      currentMenuConfig = foundMenu;
    }
  });

  // 3. Nếu người dùng gõ bậy bạ một URL không tồn tại
  if (!currentMenuConfig) {
    return (
      <div className="flex items-center justify-center h-full text-xl text-gray-500">
        Tính năng này không tồn tại hoặc bạn không có quyền truy cập.
      </div>
    );
  }

  // 4. Nếu URL có thật, truyền dữ liệu JSON vào bảng động để nó tự "vẽ" giao diện
  return (
    <div className="w-full">
      {/* 
        Ở đây ta đang nhúng Component bảng động vừa tạo, 
        và ném cục dữ liệu JSON của menu hiện tại vào biến menuConfig
      */}
      <DynamicTable menuConfig={currentMenuConfig} />
    </div>
  );
}