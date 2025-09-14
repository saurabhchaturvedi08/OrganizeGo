import React from 'react';
import { TaskFilters, TaskCategory, TaskPriority, TaskStatus } from '../types/task';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Search } from 'lucide-react';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
}

export const TaskFiltersComponent: React.FC<TaskFiltersProps> = ({ 
  filters, 
  onFiltersChange 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: TaskCategory.WORK, label: 'Work' },
    { value: TaskCategory.PERSONAL, label: 'Personal' },
    { value: TaskCategory.SHOPPING, label: 'Shopping' },
    { value: TaskCategory.HEALTH, label: 'Health' },
    { value: TaskCategory.LEARNING, label: 'Learning' },
    { value: TaskCategory.OTHER, label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: TaskPriority.LOW, label: 'Low' },
    { value: TaskPriority.MEDIUM, label: 'Medium' },
    { value: TaskPriority.HIGH, label: 'High' },
    { value: TaskPriority.URGENT, label: 'Urgent' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: TaskStatus.TODO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.COMPLETED, label: 'Completed' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          icon={<Search className="w-5 h-5 text-gray-400" />}
        />
        
        <Select
          value={filters.category}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as TaskCategory | 'all' })}
          options={categoryOptions}
        />
        
        <Select
          value={filters.priority}
          onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value as TaskPriority | 'all' })}
          options={priorityOptions}
        />
        
        <Select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as TaskStatus | 'all' })}
          options={statusOptions}
        />
      </div>
    </div>
  );
};