import React from 'react';
import { TaskFilters, TaskCategory, TaskPriority, TaskStatus } from '../types/task';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Search, Filter, X, Calendar } from 'lucide-react';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  availableTags: string[];
}

export const TaskFiltersComponent: React.FC<TaskFiltersProps> = ({ 
  filters, 
  onFiltersChange,
  availableTags
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: TaskCategory.WORK, label: 'Work' },
    { value: TaskCategory.PERSONAL, label: 'Personal' },
    { value: TaskCategory.SHOPPING, label: 'Shopping' },
    { value: TaskCategory.HEALTH, label: 'Health' },
    { value: TaskCategory.LEARNING, label: 'Learning' },
    { value: TaskCategory.FITNESS, label: 'Fitness' },
    { value: TaskCategory.FINANCE, label: 'Finance' },
    { value: TaskCategory.TRAVEL, label: 'Travel' },
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
    { value: TaskStatus.COMPLETED, label: 'Completed' },
    { value: TaskStatus.BLOCKED, label: 'Blocked' },
    { value: TaskStatus.CANCELLED, label: 'Cancelled' }
  ];

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      priority: 'all',
      status: 'all',
      search: '',
      tags: [],
      hasSubtasks: null,
      hasDependencies: null,
      dateRange: { start: null, end: null }
    });
  };

  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.priority !== 'all' ||
    filters.status !== 'all' ||
    filters.search !== '' ||
    filters.tags.length > 0 ||
    filters.hasSubtasks !== null ||
    filters.hasDependencies !== null ||
    filters.dateRange.start !== null ||
    filters.dateRange.end !== null;

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFiltersChange({ ...filters, tags: newTags });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-medium text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          value={filters.hasSubtasks === null ? 'all' : filters.hasSubtasks ? 'yes' : 'no'}
          onChange={(e) => {
            const value = e.target.value === 'all' ? null : e.target.value === 'yes';
            onFiltersChange({ ...filters, hasSubtasks: value });
          }}
          options={[
            { value: 'all', label: 'Any Subtasks' },
            { value: 'yes', label: 'Has Subtasks' },
            { value: 'no', label: 'No Subtasks' }
          ]}
        />

        <Select
          value={filters.hasDependencies === null ? 'all' : filters.hasDependencies ? 'yes' : 'no'}
          onChange={(e) => {
            const value = e.target.value === 'all' ? null : e.target.value === 'yes';
            onFiltersChange({ ...filters, hasDependencies: value });
          }}
          options={[
            { value: 'all', label: 'Any Dependencies' },
            { value: 'yes', label: 'Has Dependencies' },
            { value: 'no', label: 'No Dependencies' }
          ]}
        />

        <Input
          type="date"
          label="Due After"
          value={filters.dateRange.start ? filters.dateRange.start.toISOString().split('T')[0] : ''}
          onChange={(e) => onFiltersChange({ 
            ...filters, 
            dateRange: { 
              ...filters.dateRange, 
              start: e.target.value ? new Date(e.target.value) : null 
            }
          })}
          icon={<Calendar className="w-5 h-5 text-gray-400" />}
        />

        <Input
          type="date"
          label="Due Before"
          value={filters.dateRange.end ? filters.dateRange.end.toISOString().split('T')[0] : ''}
          onChange={(e) => onFiltersChange({ 
            ...filters, 
            dateRange: { 
              ...filters.dateRange, 
              end: e.target.value ? new Date(e.target.value) : null 
            }
          })}
          icon={<Calendar className="w-5 h-5 text-gray-400" />}
        />
      </div>

      {/* Tags Filter */}
      {availableTags.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};