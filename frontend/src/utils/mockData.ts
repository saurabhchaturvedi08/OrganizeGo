import { Task, TaskCategory, TaskPriority, TaskStatus, TaskTemplate } from '../types/task';

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
    updatedAt: new Date('2025-01-05'),
    subtasks: [
      { id: 's1', title: 'Research market trends', completed: true, createdAt: new Date('2025-01-02') },
      { id: 's2', title: 'Create presentation slides', completed: false, createdAt: new Date('2025-01-03') },
      { id: 's3', title: 'Review with team', completed: false, createdAt: new Date('2025-01-04') }
    ],
    timeTracking: [
      { id: 't1', startTime: new Date('2025-01-05T09:00:00'), endTime: new Date('2025-01-05T11:30:00'), description: 'Initial research' },
      { id: 't2', startTime: new Date('2025-01-06T14:00:00'), endTime: new Date('2025-01-06T16:00:00'), description: 'Slide creation' }
    ],
    dependencies: [],
    tags: ['client', 'presentation', 'Q2'],
    comments: [
      { id: 'c1', text: 'Need to include competitor analysis', createdAt: new Date('2025-01-04') }
    ],
    estimatedHours: 8
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
    updatedAt: new Date('2025-01-03'),
    subtasks: [
      { id: 's4', title: 'Make shopping list', completed: true, createdAt: new Date('2025-01-03') },
      { id: 's5', title: 'Check store hours', completed: false, createdAt: new Date('2025-01-03') }
    ],
    timeTracking: [],
    dependencies: [],
    tags: ['weekly', 'essentials'],
    comments: [],
    estimatedHours: 1
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
    updatedAt: new Date('2025-01-04'),
    subtasks: [
      { id: 's6', title: 'Complete basic syntax module', completed: true, createdAt: new Date('2024-12-15') },
      { id: 's7', title: 'Build REST API project', completed: false, createdAt: new Date('2024-12-20') },
      { id: 's8', title: 'Learn concurrency patterns', completed: false, createdAt: new Date('2025-01-01') }
    ],
    timeTracking: [
      { id: 't3', startTime: new Date('2025-01-04T19:00:00'), endTime: new Date('2025-01-04T21:00:00'), description: 'Goroutines tutorial' }
    ],
    dependencies: [],
    tags: ['programming', 'backend', 'skill-development'],
    comments: [
      { id: 'c2', text: 'Focus on concurrency patterns next', createdAt: new Date('2025-01-04') }
    ],
    estimatedHours: 40
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
    updatedAt: new Date('2025-01-02'),
    completedAt: new Date('2025-01-02'),
    subtasks: [],
    timeTracking: [],
    dependencies: [],
    tags: ['health', 'annual'],
    comments: [],
    estimatedHours: 0.5
  },
  {
    id: '5',
    title: 'Review team performance',
    description: 'Quarterly performance reviews for team members',
    category: TaskCategory.WORK,
    priority: TaskPriority.URGENT,
    status: TaskStatus.BLOCKED,
    dueDate: new Date('2025-01-12'),
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    subtasks: [
      { id: 's9', title: 'Collect feedback forms', completed: false, createdAt: new Date('2025-01-01') },
      { id: 's10', title: 'Schedule individual meetings', completed: false, createdAt: new Date('2025-01-01') }
    ],
    timeTracking: [],
    dependencies: ['6'],
    tags: ['management', 'quarterly', 'team'],
    comments: [
      { id: 'c3', text: 'Waiting for HR approval on new review format', createdAt: new Date('2025-01-01') }
    ],
    estimatedHours: 6
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
    updatedAt: new Date('2025-01-04'),
    subtasks: [
      { id: 's11', title: 'Research hiking trails', completed: false, createdAt: new Date('2025-01-04') },
      { id: 's12', title: 'Book accommodation', completed: false, createdAt: new Date('2025-01-04') },
      { id: 's13', title: 'Check weather forecast', completed: false, createdAt: new Date('2025-01-04') }
    ],
    timeTracking: [],
    dependencies: [],
    tags: ['travel', 'hiking', 'weekend'],
    comments: [],
    estimatedHours: 3
  }
];

export const taskTemplates: TaskTemplate[] = [
  {
    id: 'template-1',
    name: 'Weekly Planning',
    description: 'Plan and organize tasks for the upcoming week',
    category: TaskCategory.WORK,
    priority: TaskPriority.MEDIUM,
    estimatedHours: 2,
    subtasks: [
      'Review previous week accomplishments',
      'Set priorities for the week',
      'Schedule important meetings',
      'Block time for deep work'
    ],
    tags: ['planning', 'weekly', 'productivity']
  },
  {
    id: 'template-2',
    name: 'Project Kickoff',
    description: 'Standard checklist for starting a new project',
    category: TaskCategory.WORK,
    priority: TaskPriority.HIGH,
    estimatedHours: 4,
    subtasks: [
      'Define project scope and objectives',
      'Identify key stakeholders',
      'Create project timeline',
      'Set up project workspace',
      'Schedule kickoff meeting'
    ],
    tags: ['project', 'kickoff', 'planning']
  },
  {
    id: 'template-3',
    name: 'Monthly Review',
    description: 'Reflect on monthly progress and plan ahead',
    category: TaskCategory.PERSONAL,
    priority: TaskPriority.MEDIUM,
    estimatedHours: 1.5,
    subtasks: [
      'Review completed goals',
      'Analyze what worked well',
      'Identify areas for improvement',
      'Set goals for next month'
    ],
    tags: ['review', 'monthly', 'reflection']
  }
];