import { useState, useEffect } from 'react';
import { Task, TaskStats, TaskFilters, TaskStatus, TaskCategory, TaskPriority, Subtask, TimeEntry, TaskComment, BulkOperation } from '../types/task';
import { mockTasks } from '../utils/mockData';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    category: 'all',
    priority: 'all',
    status: 'all',
    search: '',
    tags: [],
    hasSubtasks: null,
    hasDependencies: null,
    dateRange: { start: null, end: null }
  });

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: taskData.subtasks || [],
      timeTracking: taskData.timeTracking || [],
      dependencies: taskData.dependencies || [],
      tags: taskData.tags || [],
      comments: taskData.comments || []
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            ...updates, 
            updatedAt: new Date(),
            completedAt: updates.status === TaskStatus.COMPLETED ? new Date() : task.completedAt
          }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
  };

  const addSubtask = (taskId: string, title: string) => {
    const subtask: Subtask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date()
    };
    
    updateTask(taskId, {
      subtasks: [...(tasks.find(t => t.id === taskId)?.subtasks || []), subtask]
    });
  };

  const updateSubtask = (taskId: string, subtaskId: string, completed: boolean) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed } : st
    );

    updateTask(taskId, { subtasks: updatedSubtasks });
  };

  const deleteSubtask = (taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.filter(st => st.id !== subtaskId);
    updateTask(taskId, { subtasks: updatedSubtasks });
  };

  const startTimeTracking = (taskId: string, description?: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Stop any currently running time entries
    const updatedTimeTracking = task.timeTracking.map(entry => 
      !entry.endTime ? { ...entry, endTime: new Date() } : entry
    );

    const newTimeEntry: TimeEntry = {
      id: crypto.randomUUID(),
      startTime: new Date(),
      description
    };

    updateTask(taskId, { 
      timeTracking: [...updatedTimeTracking, newTimeEntry],
      status: task.status === TaskStatus.TODO ? TaskStatus.IN_PROGRESS : task.status
    });
  };

  const stopTimeTracking = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedTimeTracking = task.timeTracking.map(entry => 
      !entry.endTime ? { ...entry, endTime: new Date() } : entry
    );

    updateTask(taskId, { timeTracking: updatedTimeTracking });
  };

  const addComment = (taskId: string, text: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const comment: TaskComment = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date()
    };

    updateTask(taskId, { 
      comments: [...task.comments, comment]
    });
  };

  const bulkOperation = (operation: BulkOperation) => {
    selectedTasks.forEach(taskId => {
      switch (operation.type) {
        case 'status':
          updateTask(taskId, { status: operation.value });
          break;
        case 'priority':
          updateTask(taskId, { priority: operation.value });
          break;
        case 'category':
          updateTask(taskId, { category: operation.value });
          break;
        case 'delete':
          deleteTask(taskId);
          break;
        case 'addTag':
          const task = tasks.find(t => t.id === taskId);
          if (task && !task.tags.includes(operation.value)) {
            updateTask(taskId, { tags: [...task.tags, operation.value] });
          }
          break;
        case 'removeTag':
          const taskToUpdate = tasks.find(t => t.id === taskId);
          if (taskToUpdate) {
            updateTask(taskId, { tags: taskToUpdate.tags.filter(tag => tag !== operation.value) });
          }
          break;
      }
    });
    setSelectedTasks([]);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = filters.category === 'all' || task.category === filters.category;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesSearch = filters.search === '' || 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesTags = filters.tags.length === 0 || 
      filters.tags.every(filterTag => task.tags.includes(filterTag));
    
    const matchesSubtasks = filters.hasSubtasks === null || 
      (filters.hasSubtasks ? task.subtasks.length > 0 : task.subtasks.length === 0);
    
    const matchesDependencies = filters.hasDependencies === null || 
      (filters.hasDependencies ? task.dependencies.length > 0 : task.dependencies.length === 0);
    
    const matchesDateRange = (!filters.dateRange.start || !task.dueDate || new Date(task.dueDate) >= filters.dateRange.start) &&
      (!filters.dateRange.end || !task.dueDate || new Date(task.dueDate) <= filters.dateRange.end);
    
    return matchesCategory && matchesPriority && matchesStatus && matchesSearch && 
           matchesTags && matchesSubtasks && matchesDependencies && matchesDateRange;
  });

  const getTaskTimeSpent = (task: Task): number => {
    return task.timeTracking.reduce((total, entry) => {
      if (entry.endTime) {
        return total + (entry.endTime.getTime() - entry.startTime.getTime());
      }
      return total;
    }, 0);
  };

  const stats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
    inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
    todo: tasks.filter(t => t.status === TaskStatus.TODO).length,
    blocked: tasks.filter(t => t.status === TaskStatus.BLOCKED).length,
    overdue: tasks.filter(t => 
      t.dueDate && 
      new Date(t.dueDate) < new Date() && 
      t.status !== TaskStatus.COMPLETED
    ).length,
    completedThisWeek: tasks.filter(t => {
      if (!t.completedAt) return false;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return t.completedAt >= weekAgo;
    }).length,
    totalTimeSpent: Math.round(tasks.reduce((total, task) => total + getTaskTimeSpent(task), 0) / (1000 * 60)), // in minutes
    averageCompletionTime: 0 // Would calculate based on created vs completed dates
  };

  const getAllTags = (): string[] => {
    const allTags = tasks.flatMap(task => task.tags);
    return [...new Set(allTags)].sort();
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `organizego-tasks-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTasks = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target?.result as string);
        setTasks(importedTasks);
      } catch (error) {
        console.error('Error importing tasks:', error);
      }
    };
    reader.readAsText(file);
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    stats,
    filters,
    setFilters,
    selectedTasks,
    setSelectedTasks,
    createTask,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    startTimeTracking,
    stopTimeTracking,
    addComment,
    bulkOperation,
    getAllTags,
    getTaskTimeSpent,
    exportTasks,
    importTasks
  };
};