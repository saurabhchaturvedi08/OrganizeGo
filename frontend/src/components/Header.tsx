import React, { useState } from 'react';
import { Button } from './ui/Button';
import { CheckSquare, Plus, BookTemplate as Template, BarChart3, Moon, Sun, Download, Upload } from 'lucide-react';

interface HeaderProps {
  onCreateTask: () => void;
  onShowTemplates: () => void;
  onShowAnalytics: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCreateTask, 
  onShowTemplates,
  onShowAnalytics,
  onExport,
  onImport,
  darkMode,
  onToggleDarkMode
}) => {
  const [importFile, setImportFile] = useState<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImport(file);
      }
    };
    input.click();
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                OrganizeGo
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Advanced task management with powerful features
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={onToggleDarkMode}
              className="p-2"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onShowAnalytics}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onExport}
              className="flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={handleImportClick}
              className="flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={onShowTemplates}
              className="flex items-center space-x-2"
            >
              <Template className="w-5 h-5" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
            
            <Button onClick={onCreateTask} className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Task</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};