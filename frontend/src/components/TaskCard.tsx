import React from 'react';
import { Task, TaskStatus, TaskPriority, TaskCategory } from '../types/task';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Calendar, Clock, Edit2, Trash2, CheckCircle, Circle, PlayCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        return 'danger';
      case TaskPriority.HIGH:
        return 'warning';
      case TaskPriority.MEDIUM:
        return 'info';
      case TaskPriority.LOW:
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case TaskStatus.IN_PROGRESS:
        return <PlayCircle className="w-5 h-5 text-blue-600" />;
      case TaskStatus.TODO:
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: TaskCategory) => {
    switch (category) {
      case TaskCategory.WORK:
        return 'info';
      case TaskCategory.PERSONAL:
        return 'success';
      case TaskCategory.SHOPPING:
        return 'warning';
      case TaskCategory.HEALTH:
        return 'danger';
      case TaskCategory.LEARNING:
        return 'info';
      default:
        return 'default';
    }
  };

  const isOverdue = task.dueDate && 
    new Date(task.dueDate) < new Date() && 
    task.status !== TaskStatus.COMPLETED;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const nextStatus = () => {
    switch (task.status) {
      case TaskStatus.TODO:
        return TaskStatus.IN_PROGRESS;
      case TaskStatus.IN_PROGRESS:
        return TaskStatus.COMPLETED;
      case TaskStatus.COMPLETED:
        return TaskStatus.TODO;
      default:
        return TaskStatus.TODO;
    }
  };

  return (
    <Card hover className={`${isOverdue ? 'ring-2 ring-red-200' : ''}`}>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onStatusChange(task.id, nextStatus())}
                className="hover:scale-110 transition-transform duration-200"
              >
                {getStatusIcon(task.status)}
              </button>
              <h3 className={`font-semibold text-lg ${
                task.status === TaskStatus.COMPLETED ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed ml-8">
              {task.description}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="p-2"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between ml-8">
          <div className="flex items-center space-x-4">
            <Badge variant={getCategoryColor(task.category)}>
              {task.category}
            </Badge>
            <Badge variant={getPriorityColor(task.priority)}>
              {task.priority} priority
            </Badge>
          </div>
          
          {task.dueDate && (
            <div className={`flex items-center space-x-1 text-sm ${
              isOverdue ? 'text-red-600' : 'text-gray-500'
            }`}>
              {isOverdue ? (
                <Clock className="w-4 h-4" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
              <span className={isOverdue ? 'font-medium' : ''}>
                {isOverdue ? 'Overdue: ' : ''}{formatDate(new Date(task.dueDate))}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};