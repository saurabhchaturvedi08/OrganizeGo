import React, { useState } from 'react';
import { BulkOperation, TaskStatus, TaskPriority, TaskCategory } from '../types/task';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Card, CardContent } from './ui/Card';
import { Trash2, Tag, CheckSquare, AlertCircle, Folder } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onBulkOperation: (operation: BulkOperation) => void;
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onBulkOperation,
  onClearSelection
}) => {
  const [bulkAction, setBulkAction] = useState<string>('');
  const [bulkValue, setBulkValue] = useState<string>('');

  if (selectedCount === 0) return null;

  const statusOptions = [
    { value: TaskStatus.TODO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.COMPLETED, label: 'Completed' },
    { value: TaskStatus.BLOCKED, label: 'Blocked' },
    { value: TaskStatus.CANCELLED, label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: TaskPriority.LOW, label: 'Low' },
    { value: TaskPriority.MEDIUM, label: 'Medium' },
    { value: TaskPriority.HIGH, label: 'High' },
    { value: TaskPriority.URGENT, label: 'Urgent' }
  ];

  const categoryOptions = [
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

  const handleBulkAction = () => {
    if (!bulkAction) return;

    let operation: BulkOperation;

    switch (bulkAction) {
      case 'delete':
        operation = { type: 'delete' };
        break;
      case 'status':
        if (!bulkValue) return;
        operation = { type: 'status', value: bulkValue as TaskStatus };
        break;
      case 'priority':
        if (!bulkValue) return;
        operation = { type: 'priority', value: bulkValue as TaskPriority };
        break;
      case 'category':
        if (!bulkValue) return;
        operation = { type: 'category', value: bulkValue as TaskCategory };
        break;
      default:
        return;
    }

    onBulkOperation(operation);
    setBulkAction('');
    setBulkValue('');
  };

  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">
                {selectedCount} task{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Select
                value={bulkAction}
                onChange={(e) => {
                  setBulkAction(e.target.value);
                  setBulkValue('');
                }}
                options={[
                  { value: '', label: 'Choose action...' },
                  { value: 'status', label: 'Change Status' },
                  { value: 'priority', label: 'Change Priority' },
                  { value: 'category', label: 'Change Category' },
                  { value: 'delete', label: 'Delete Tasks' }
                ]}
                className="min-w-[150px]"
              />

              {bulkAction === 'status' && (
                <Select
                  value={bulkValue}
                  onChange={(e) => setBulkValue(e.target.value)}
                  options={[{ value: '', label: 'Select status...' }, ...statusOptions]}
                  className="min-w-[120px]"
                />
              )}

              {bulkAction === 'priority' && (
                <Select
                  value={bulkValue}
                  onChange={(e) => setBulkValue(e.target.value)}
                  options={[{ value: '', label: 'Select priority...' }, ...priorityOptions]}
                  className="min-w-[120px]"
                />
              )}

              {bulkAction === 'category' && (
                <Select
                  value={bulkValue}
                  onChange={(e) => setBulkValue(e.target.value)}
                  options={[{ value: '', label: 'Select category...' }, ...categoryOptions]}
                  className="min-w-[120px]"
                />
              )}

              <Button
                onClick={handleBulkAction}
                disabled={!bulkAction || (bulkAction !== 'delete' && !bulkValue)}
                variant={bulkAction === 'delete' ? 'danger' : 'primary'}
                size="sm"
              >
                {bulkAction === 'delete' && <Trash2 className="w-4 h-4 mr-1" />}
                {bulkAction === 'status' && <CheckSquare className="w-4 h-4 mr-1" />}
                {bulkAction === 'priority' && <AlertCircle className="w-4 h-4 mr-1" />}
                {bulkAction === 'category' && <Folder className="w-4 h-4 mr-1" />}
                Apply
              </Button>
            </div>
          </div>

          <Button
            onClick={onClearSelection}
            variant="ghost"
            size="sm"
          >
            Clear Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};