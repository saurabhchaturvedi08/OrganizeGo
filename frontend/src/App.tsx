import React, { useState } from 'react';
import { Task, TaskStatus } from './types/task';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { TaskFiltersComponent } from './components/TaskFilters';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';

function App() {
  const {
    tasks,
    stats,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask
  } = useTasks();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      createTask(taskData);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    updateTask(id, { status });
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleCancelForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateTask={handleCreateTask} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />
        
        <TaskFiltersComponent 
          filters={filters}
          onFiltersChange={setFilters}
        />
        
        <div className="mt-8">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-6">
                {Object.values(filters).some(f => f !== 'all' && f !== '') 
                  ? 'Try adjusting your filters to see more tasks'
                  : 'Get started by creating your first task'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showTaskForm && (
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleSubmitTask}
          onCancel={handleCancelForm}
          isEditing={!!editingTask}
        />
      )}
    </div>
  );
}

export default App;