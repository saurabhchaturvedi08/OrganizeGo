import { Task, TaskCategory, TaskPriority, TaskStatus } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and finalize the Q2 project proposal for the client presentation',
    category: TaskCategory.WORK,
    priority: TaskPriority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date('2025-01-10'),
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-05')
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Weekly grocery shopping - milk, bread, fruits, vegetables',
    category: TaskCategory.SHOPPING,
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.TODO,
    dueDate: new Date('2025-01-08'),
    createdAt: new Date('2025-01-03'),
    updatedAt: new Date('2025-01-03')
  },
  {
    id: '3',
    title: 'Learn Go programming',
    description: 'Complete the advanced Go course and build practice projects',
    category: TaskCategory.LEARNING,
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date('2025-01-20'),
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2025-01-04')
  },
  {
    id: '4',
    title: 'Schedule dentist appointment',
    description: 'Annual dental checkup and cleaning',
    category: TaskCategory.HEALTH,
    priority: TaskPriority.LOW,
    status: TaskStatus.COMPLETED,
    dueDate: null,
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2025-01-02')
  },
  {
    id: '5',
    title: 'Review team performance',
    description: 'Quarterly performance reviews for team members',
    category: TaskCategory.WORK,
    priority: TaskPriority.URGENT,
    status: TaskStatus.TODO,
    dueDate: new Date('2025-01-12'),
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '6',
    title: 'Plan weekend trip',
    description: 'Research and book accommodation for the mountain hiking trip',
    category: TaskCategory.PERSONAL,
    priority: TaskPriority.LOW,
    status: TaskStatus.TODO,
    dueDate: new Date('2025-01-15'),
    createdAt: new Date('2025-01-04'),
    updatedAt: new Date('2025-01-04')
  }
];