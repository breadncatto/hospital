'use client';

import { useState } from 'react';
import { Icons } from '../../utils/icon.js'

export default function DynamicForm({ schema, initialData, onClose, onSave }) {
  const [formData, setFormData] = useState(initialData || {});
  const { moduleName, fields, formConfig } = schema;
  const getFieldDef = (fieldName) => fields.find((f) => f.name === fieldName);
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {initialData ? `Edit ${moduleName}` : `Add new ${moduleName}`}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {formConfig.layout.map((section, index) => {
            if (section.type === 'flat') {
              return (
                <div key={index} className="flex flex-col gap-5">
                  {section.fields.map((fieldName) => {
                    const field = getFieldDef(fieldName);
                    if (!field) return null;

                    return (
                      <div key={field.name} className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          {field.label}
                        </label>
                        {(field.type === 'text' || field.type === 'email') && (
                          <input 
                            type={field.type} 
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00b074] transition-colors text-gray-500 font-medium"
                          />
                        )}
                        {field.type === 'password' && (
                          <div className="relative">
                            <input 
                              type="password" 
                              value={formData[field.name] || ''}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00b074] transition-colors pr-10 text-gray-500 font-medium"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </div>
                          </div>
                        )}
                        {(field.type === 'select' || field.type === 'multiselect') && (
                          <div className="relative">
                            <select 
                              value={formData[field.name] || ''}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00b074] transition-colors appearance-none bg-white text-gray-500 font-medium"
                            >
                              <option value="" className="text-gray-500 font-normal">Select...</option>
                              <option value="1">Option 1</option>
                              <option value="2">Option 2</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6"/>
                              </svg>
                            </div>
                          </div>
                        )}
                        {field.type === 'tree_checkbox' && (
                          <div className="w-full border border-gray-200 rounded p-5 bg-white max-h-[300px] overflow-y-auto shadow-inner text-gray-500 font-medium">
                             <PermissionsTree />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-[#00b074] hover:bg-green-50 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-medium text-white bg-[#00b074] hover:bg-[#009662] rounded shadow-sm transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const treeData = [
  {
    id: 'g1',
    label: 'Security & System',
    icon: 'shield',
    children: [
      {
        id: 'm1',
        label: 'User Accounts',
        icon: 'user-key',
        children: [
          { id: 'a1', label: 'Save', icon: 'lightning' },
          { id: 'a2', label: 'Update', icon: 'lightning' },
          { id: 'a3', label: 'Delete', icon: 'lightning' },
        ]
      },
      { id: 'm2', label: 'User Groups', icon: 'lock' }
    ]
  },
  { id: 'g2', label: 'Employee Management', icon: 'users' },
  { id: 'g3', label: 'Administration', icon: 'gear' },
  { 
    id: 'g4', 
    label: 'Transactions', 
    icon: 'document',
    children: [
      { id: 'm4', label: 'Orders', icon: 'cart' },
      { id: 'm5', label: 'Invoice Management', icon: 'document' }
    ]
  },
  { 
    id: 'g5', 
    label: 'Master Data', 
    icon: 'database',
    children: [
      { id: 'm6', label: 'Product Categories', icon: 'tag' },
      { id: 'm7', label: 'Customer Categories', icon: 'users' },
      { id: 'm8', label: 'Customer Master', icon: 'user' }
    ]
  }
];



function TreeNode({ node, level = 0 }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col">
      <div 
        className="flex items-center py-1.5 hover:bg-gray-50 transition-colors"
        style={{ paddingLeft: `${level * 24}px` }}
      >
        <div 
          className="w-5 flex items-center justify-center cursor-pointer"
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        >
          {hasChildren && (
            <svg 
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
          )}
        </div>
        <input type="checkbox" className="w-4 h-4 mr-3 rounded border-gray-300 text-[#00b074] focus:ring-[#00b074] cursor-pointer" />
        <div className="flex items-center gap-2 text-sm text-gray-700 select-none">
          {node.icon && Icons[node.icon]}
          <span>{node.label}</span>
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function PermissionsTree() {
  return (
    <div className="flex flex-col">
      {treeData.map(rootNode => (
        <TreeNode key={rootNode.id} node={rootNode} level={0} />
      ))}
    </div>
  );
}