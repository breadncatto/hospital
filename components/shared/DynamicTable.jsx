'use client';

export default function DynamicTable({ menuConfig }) {
  if (!menuConfig) return <div>Không tìm thấy cấu hình trang!</div>;

  const { title, tabs, tableConfig } = menuConfig;
  const { actions, fields } = tableConfig;
  const mockTableData = [
    { id: 1, username: 'admin', userCode: 'admin', email: 'admin@gmail.com', department: '1', userGroups: 'USER, ADMIN' },
    { id: 2, username: 'user', userCode: 'user', email: 'user@gmail.com', department: '1', userGroups: 'USER' },
    { id: 3, username: 'user01', userCode: 'user01', email: 'user01@gmail.com', department: '', userGroups: 'USER, ADMIN' },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* TABSS) */}
      {tabs && tabs.length > 0 && (
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-1.5 rounded-sm text-sm border font-medium ${
                tab.isActive 
                  ? 'bg-[#00b074] text-white border-[#00b074]' 
                  : 'bg-white text-[#00b074] border-[#00b074]/50 hover:bg-green-50'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wider">
            {tableConfig.tableName || title}
          </h2>
          
          {/* ACTION */}
          {actions?.canCreate && (
            <button className="bg-[#00b074] hover:bg-[#009662] text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors">
              <span>+</span> New Entry
            </button>
          )}
        </div>

        {}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            
            {}
            <thead>
              {}
              <tr className="border-b border-gray-200">
                {fields.map((field) => (
                  <th key={field.name} className="pb-3 font-semibold text-gray-700 whitespace-nowrap pr-4">
                    {field.label} <span className="text-gray-400 font-normal">↑↓</span>
                  </th>
                ))}
                <th className="pb-3 font-semibold text-gray-700 text-center">Actions</th>
              </tr>
              
              {/* Filter */}
              <tr className="border-b border-gray-200">
                {fields.map((field) => (
                  <th key={`search-${field.name}`} className="py-2 pr-4 font-normal">
                    {}
                    {field.isSearchable ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          className="border border-gray-300 rounded px-2 py-1 w-full max-w-[150px] outline-none focus:border-[#00b074]"
                        />
                        <span className="text-gray-400">Y</span> {}
                      </div>
                    ) : null}
                  </th>
                ))}
                <th className="py-2"></th>
              </tr>
            </thead>

            {}
            <tbody>
              {mockTableData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  
                  {}
                  {fields.map((field) => (
                    <td key={`${row.id}-${field.name}`} className="py-4 pr-4">
                      {}
                      {field.name === 'userGroups' && row[field.name] ? (
                         <div className="flex gap-1">
                            {row[field.name].split(', ').map(tag => (
                              <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">{tag}</span>
                            ))}
                         </div>
                      ) : (
                        row[field.name]
                      )}
                    </td>
                  ))}

                  {}
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {actions?.canEdit && (
                        <button className="w-7 h-7 rounded-full border border-green-400 text-green-500 flex items-center justify-center hover:bg-green-50">✎</button>
                      )}
                      {actions?.canDelete && (
                        <button className="w-7 h-7 rounded-full border border-red-400 text-red-500 flex items-center justify-center hover:bg-red-50">🗑</button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}