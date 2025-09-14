import React, { useState } from 'react';
import { Task, TaskStatus, TaskTemplate } from './types/task';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { TaskFiltersComponent } from './components/TaskFilters';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { TaskTemplates } from './components/TaskTemplates';
import { BulkActions } from './components/BulkActions';
import { Analytics } from './components/Analytics';
import { CheckSquare } from 'lucide-react';

function App() {
  const {
    tasks,
    allTasks,
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
  } = useTasks();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const handleCreateFromTemplate = (template: TaskTemplate) => {
    const taskData = {
      title: template.name,
      description: template.description,
      category: template.category,
      priority: template.priority,
      status: TaskStatus.TODO,
      dueDate: null,
      subtasks: template.subtasks.map(title => ({
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date()
      })),
      timeTracking: [],
      dependencies: [],
      tags: [...template.tags],
      comments: [],
      estimatedHours: template.estimatedHours
    };
    
    createTask(taskData);
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

  const handleTaskSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedTasks(prev => [...prev, id]);
    } else {
      setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
    }
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedTasks([]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Header 
        onCreateTask={handleCreateTask}
        onShowTemplates={() => setShowTemplates(true)}
        onShowAnalytics={() => setShowAnalytics(true)}
        onExport={exportTasks}
        onImport={importTasks}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} darkMode={darkMode} />
        
        <TaskFiltersComponent 
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={getAllTags()}
        />
        
        <BulkActions
          selectedCount={selectedTasks.length}
          onBulkOperation={bulkOperation}
          onClearSelection={handleClearSelection}
        />
        
        <div className="mt-8">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className={`w-24 h-24 mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-300'
              }`} />
              <h3 className={`text-xl font-medium mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                No tasks found
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {Object.values(filters).some(f => f !== 'all' && f !== '' && f !== null && (Array.isArray(f) ? f.length > 0 : true))
                  ? 'Try adjusting your filters to see more tasks'
                  : 'Get started by creating your first task or using a template'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Showing {tasks.length} of {allTasks.length} tasks
                </div>
                <button
                  onClick={handleSelectAll}
                  className={`text-sm font-medium ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  } transition-colors`}
                >
                  {selectedTasks.length === tasks.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              
              <div className="space-y-4">
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                    onStartTimer={startTimeTracking}
                    onStopTimer={stopTimeTracking}
                    onSubtaskToggle={updateSubtask}
                    isSelected={selectedTasks.includes(task.id)}
                    onSelect={handleTaskSelect}
                    getTaskTimeSpent={getTaskTimeSpent}
                  />
                ))}
              </div>
            </>
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

      {showTemplates && (
        <TaskTemplates
          onCreateFromTemplate={handleCreateFromTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {showAnalytics && (
        <Analytics
          tasks={allTasks}
          stats={stats}
          onClose={() => setShowAnalytics(false)}
          onExport={exportTasks}
        />
      )}
    </div>
  );
}

export default App;