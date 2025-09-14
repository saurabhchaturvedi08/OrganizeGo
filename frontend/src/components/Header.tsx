import React from 'react';
import { Button } from './ui/Button';
import { CheckSquare, Plus } from 'lucide-react';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">OrganizeGo</h1>
              <p className="text-gray-600">Manage your tasks efficiently</p>
            </div>
          </div>
          
          <Button onClick={onCreateTask} className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Task</span>
          </Button>
        </div>
      </div>
    </header>
  );
};