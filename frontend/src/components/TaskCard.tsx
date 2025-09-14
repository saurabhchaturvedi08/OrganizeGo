import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority, TaskCategory } from '../types/task';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  Calendar, Clock, Edit2, Trash2, CheckCircle, Circle, PlayCircle, 
  Pause, Play, MessageSquare, Link, Timer, ChevronDown, ChevronRight,
  Tag, Zap
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onStartTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
  onSubtaskToggle: (taskId: string, subtaskId: string, completed: boolean) => void;
  isSelected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  getTaskTimeSpent: (task: Task) => number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange,
  onStartTimer,
  onStopTimer,
  onSubtaskToggle,
  isSelected = false,
  onSelect,
  getTaskTimeSpent
}) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
      case TaskStatus.BLOCKED:
        return <Pause className="w-5 h-5 text-red-600" />;
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
      case TaskCategory.FITNESS:
        return 'success';
      case TaskCategory.FINANCE:
        return 'warning';
      case TaskCategory.TRAVEL:
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

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const nextStatus = () => {
    switch (task.status) {
      case TaskStatus.TODO:
        return TaskStatus.IN_PROGRESS;
      case TaskStatus.IN_PROGRESS:
        return TaskStatus.COMPLETED;
      case TaskStatus.COMPLETED:
        return TaskStatus.TODO;
      case TaskStatus.BLOCKED:
        return TaskStatus.IN_PROGRESS;
      default:
        return TaskStatus.TODO;
    }
  };

  const hasActiveTimer = task.timeTracking.some(entry => !entry.endTime);
  const timeSpent = getTaskTimeSpent(task);
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <Card hover className={`${isOverdue ? 'ring-2 ring-red-200' : ''} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {onSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelect(task.id, e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            )}
            
            <button
              onClick={() => onStatusChange(task.id, nextStatus())}
              className="hover:scale-110 transition-transform duration-200 mt-1"
            >
              {getStatusIcon(task.status)}
            </button>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className={`font-semibold text-lg ${
                  task.status === TaskStatus.COMPLETED ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                
                {task.dependencies.length > 0 && (
                  <Link className="w-4 h-4 text-gray-400" title="Has dependencies" />
                )}
                
                {hasActiveTimer && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Timer className="w-4 h-4 animate-pulse" />
                    <span className="text-xs font-medium">ACTIVE</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {task.description}
              </p>
              
              {task.tags.length > 0 && (
                <div className="flex items-center space-x-2 flex-wrap">
                  <Tag className="w-3 h-3 text-gray-400" />
                  {task.tags.map(tag => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-1">
            {task.status !== TaskStatus.COMPLETED && (
              <>
                {hasActiveTimer ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStopTimer(task.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Stop timer"
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStartTimer(task.id)}
                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                    title="Start timer"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="p-2"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant={getCategoryColor(task.category)}>
              {task.category}
            </Badge>
            <Badge variant={getPriorityColor(task.priority)}>
              <Zap className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
            
            {timeSpent > 0 && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
            )}
            
            {task.estimatedHours && (
              <div className="text-sm text-gray-500">
                Est: {task.estimatedHours}h
              </div>
            )}
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

        {/* Subtasks Section */}
        {totalSubtasks > 0 && (
          <div className="border-t pt-3">
            <button
              onClick={() => setShowSubtasks(!showSubtasks)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 mb-2"
            >
              {showSubtasks ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span>Subtasks ({completedSubtasks}/{totalSubtasks})</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
                />
              </div>
            </button>
            
            {showSubtasks && (
              <div className="space-y-2 ml-4">
                {task.subtasks.map(subtask => (
                  <div key={subtask.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={(e) => onSubtaskToggle(task.id, subtask.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${
                      subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'
                    }`}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comments indicator */}
        {task.comments.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>{task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};