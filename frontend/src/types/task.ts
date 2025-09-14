export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  subtasks: Subtask[];
  timeTracking: TimeEntry[];
  dependencies: string[]; // Task IDs this task depends on
  tags: string[];
  comments: TaskComment[];
  estimatedHours?: number;
  completedAt?: Date;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TimeEntry {
  id: string;
  startTime: Date;
  endTime?: Date;
  description?: string;
}

export interface TaskComment {
  id: string;
  text: string;
  createdAt: Date;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  estimatedHours?: number;
  subtasks: string[];
  tags: string[];
}

export enum TaskCategory {
  WORK = 'work',
  PERSONAL = 'personal',
  SHOPPING = 'shopping',
  HEALTH = 'health',
  LEARNING = 'learning',
  FITNESS = 'fitness',
  FINANCE = 'finance',
  TRAVEL = 'travel',
  OTHER = 'other'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
  CANCELLED = 'cancelled'
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  blocked: number;
  overdue: number;
  completedThisWeek: number;
  totalTimeSpent: number; // in minutes
  averageCompletionTime: number; // in days
}

export interface TaskFilters {
  category: TaskCategory | 'all';
  priority: TaskPriority | 'all';
  status: TaskStatus | 'all';
  search: string;
  tags: string[];
  hasSubtasks: boolean | null;
  hasDependencies: boolean | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export interface BulkOperation {
  type: 'status' | 'priority' | 'category' | 'delete' | 'addTag' | 'removeTag';
  value?: any;
}