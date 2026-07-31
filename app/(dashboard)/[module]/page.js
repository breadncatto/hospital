import mockData from '../../../mock/db.json';
import DynamicTable from '../../../components/shared/DynamicTable';

export default async function ModulePage({ params }) {
  const resolvedParams = await params;
  const moduleName = resolvedParams.module; 

  let schemaPath = null;
  
  mockData.menuGroups.forEach((group) => {
    const foundMenu = group.menus.find((menu) => menu.path === `/${moduleName}`);
    if (foundMenu) {
      schemaPath = foundMenu.schemaPath;
    }
  });
  const subTabMapping = {
    'custom-fields': '/api/schema/custom-fields',
    'form-actions': '/api/schema/form-actions',
    'user-accounts': '/api/schema/users',
    'user-groups': '/api/schema/groups'
  };

  if (!schemaPath && subTabMapping[moduleName]) {
    schemaPath = subTabMapping[moduleName];
  }
  const currentSchema = schemaPath ? mockData.schemas[schemaPath] : null;

  if (!currentSchema) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
        <div className="text-xl">Tính năng này chưa có cấu hình hoặc bạn không có quyền truy cập.</div>
        <div className="text-sm bg-gray-100 px-4 py-2 rounded">
          <b>Debug URL đang tìm:</b> /{moduleName}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DynamicTable schema={currentSchema} />
    </div>
  );
}