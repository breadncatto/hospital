'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import DynamicForm from './DynamicForm';
import { dynamicApi } from '../../api/api';

export default function DynamicTable({ schema }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQueries, setSearchQueries] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const { moduleName, actions, fields, listConfig, pageTabs } = schema || {};

  useEffect(() => {
    if (!schema) return;
    const getMockData = () => {
      switch (moduleName) {
        case 'USERS':
          return [
            { id: 1, username: 'admin', userCode: 'admin', email: 'admin@gmail.com', password: '1', departmentId: '1', groupIds: 'USER, ADMIN' },
            { id: 2, username: 'user', userCode: 'user', email: 'user@gmail.com', password: '1', departmentId: '1', groupIds: 'USER' },
            { id: 3, username: 'user01', userCode: 'user01', email: 'user01@gmail.com', password: '1', departmentId: '', groupIds: 'USER, ADMIN' },
          ];
        case 'CUSTOM FIELDS':
          return [
            { id: 1, label: 'Username', fieldKey: 'username' },
            { id: 2, label: 'User Code', fieldKey: 'user_code' },
            { id: 3, label: 'Email', fieldKey: 'email' },
            { id: 4, label: 'Password', fieldKey: 'password' },
          ];
        case 'FORM ACTIONS':
          return [
            { id: 1, actionName: 'Save', actionCode: 'USER_SAVE' },
            { id: 2, actionName: 'Update', actionCode: 'USER_UPDATE' },
            { id: 3, actionName: 'Delete', actionCode: 'USER_DELETE' },
          ];
        default:
          return [
            { id: 1, groupName: 'USER', groupCode: 'USER' },
            { id: 2, groupName: 'ADMIN', groupCode: 'ADMIN' },
          ];
      }
    };
    setTableData(getMockData());
  }, [moduleName, schema]);

  if (!schema) return <div>Không tìm thấy cấu hình trang!</div>;

  const displayFields = fields.filter(field => 
    listConfig.displayColumns.includes(field.name)
  );

  const processedData = useMemo(() => {
    let data = [...tableData]; 
    Object.keys(searchQueries).forEach(key => {
      const query = searchQueries[key]?.toLowerCase();
      if (query) {
        data = data.filter(row => {
          const cellValue = row[key];
          return cellValue && String(cellValue).toLowerCase().includes(query);
        });
      }
    });
    if (sortConfig.key) {
      data.sort((a, b) => {
        const valA = a[sortConfig.key] || '';
        const valB = b[sortConfig.key] || '';
        
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [tableData, searchQueries, sortConfig]); 

  const handleSearchChange = (fieldName, value) => {
    setSearchQueries(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSort = (fieldName) => {
    setSortConfig(prev => {
      if (prev.key === fieldName) {
        return { key: fieldName, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key: fieldName, direction: 'asc' };
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dữ liệu này không?')) {
      try {
        await dynamicApi.delete(moduleName, id);
        setTableData(prev => prev.filter(row => row.id !== id));
        alert('Xóa thành công!');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedRow) {
        const updatedData = await dynamicApi.update(moduleName, selectedRow.id, formData);
        setTableData(prev => prev.map(row => row.id === selectedRow.id ? updatedData : row));
        alert('Cập nhật thành công!');
      } else {
        const newData = await dynamicApi.create(moduleName, formData);
        setTableData(prev => [...prev, newData]);
        alert('Thêm mới thành công!');
      }
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpenCreate = () => {
    setSelectedRow(null); 
    setIsModalOpen(true);
  };

  const handleOpenEdit = (row) => {
    setSelectedRow(row); 
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* TABS MENU */}
      {pageTabs && pageTabs.length > 0 && (
        <div className="flex gap-2">
          {pageTabs.map((tab, idx) => (
            <Link
              key={idx}
              href={tab.path}
              className={`px-4 py-1.5 rounded-sm text-sm border font-medium transition-colors ${
                tab.isActive 
                  ? 'bg-[#00b074] text-white border-[#00b074]' 
                  : 'bg-white text-[#00b074] border-[#00b074]/50 hover:bg-green-50'
              }`}
            >
              {tab.title}
            </Link>
          ))}
        </div>
      )}

      {/* TABLE WRAPPER */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wider">
            {moduleName}
          </h2>
          {actions?.canCreate && (
            <button 
              onClick={handleOpenCreate}
              className="bg-[#00b074] hover:bg-[#009662] text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <span>+</span> New Entry
            </button>
          )}
        </div>

        {/* TABEL STRUCT */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead>              
              <tr className="border-b border-gray-200">
                {displayFields.map((field) => (
                  <th 
                  key={field.name}
                  className="pb-3 font-semibold text-gray-700 whitespace-nowrap pr-4 cursor-pointer hover:text-[#00b074] select-none"
                  onClick={() => handleSort(field.name)}
                  >
                    <div className="flex items-center gap-1.5">
                      {field.label}
                      <span className="flex items-center">
                        {sortConfig.key === field.name ? (
                          sortConfig.direction === 'asc' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00b074]">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                            ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00b074]">
                              <line x1="12" y1="19" x2="12" y2="5"></line>
                              <polyline points="5 12 12 5 19 12"></polyline>
                              </svg>
                              )
                            ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 opacity-50">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <polyline points="19 12 12 19 5 12"></polyline>
                              </svg>
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                <th className="pb-3 font-semibold text-gray-700 text-center w-24">Actions</th>
              </tr>
              <tr className="border-b border-gray-200">
                {displayFields.map((field) => (
                  <th key={`search-${field.name}`} className="py-2 pr-4 font-normal">
                    {field.isSearchable && (
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          value={searchQueries[field.name] || ''}
                          onChange={(e) => handleSearchChange(field.name, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1.5 w-full max-w-[200px] outline-none focus:border-[#00b074] text-gray-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                             className={`cursor-pointer ${searchQueries[field.name] ? 'text-[#00b074]' : 'text-gray-400 hover:text-gray-600'}`}
                             onClick={() => handleSearchChange(field.name, '')}
                        >
                          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                      </div>
                    )}
                  </th>
                ))}
                <th className="py-2"></th>
              </tr>
            </thead>

            <tbody>
              {processedData.length > 0 ? (
                processedData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    {displayFields.map((field) => (
                      <td key={`${row.id}-${field.name}`} className="py-4 pr-4">
                        {field.name === 'groupIds' && row[field.name] ? (
                          <div className="flex gap-1.5 flex-wrap">
                            {row[field.name].split(', ').map(tag => (
                              <span key={tag} className="bg-[#e6f0fa] text-[#0066cc] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-600">{row[field.name]}</span>
                        )}
                      </td>
                    ))}
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {actions?.canEdit && (
                          <button 
                            onClick={() => handleOpenEdit(row)} 
                            className="w-7 h-7 rounded-full border border-green-400 text-green-500 flex items-center justify-center hover:bg-green-50 transition-colors"
                          >
                            ✎
                          </button>
                        )}
                        {actions?.canDelete && (
                          <button 
                            onClick={() => handleDelete(row.id)} 
                            className="w-7 h-7 rounded-full border border-red-400 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors"
                          >
                            🗑
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={displayFields.length + 1} className="py-8 text-center text-gray-400">
                    Không tìm thấy dữ liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <DynamicForm 
          schema={schema} 
          initialData={selectedRow} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
}