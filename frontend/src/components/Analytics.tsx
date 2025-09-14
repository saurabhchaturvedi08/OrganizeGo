import React from 'react';
import { Task, TaskStats, TaskStatus, TaskCategory, TaskPriority } from '../types/task';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { 
  BarChart3, TrendingUp, Clock, Target, Calendar, 
  CheckCircle, AlertCircle, X, Download 
} from 'lucide-react';

interface AnalyticsProps {
  tasks: Task[];
  stats: TaskStats;
  onClose: () => void;
  onExport: () => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  tasks,
  stats,
  onClose,
  onExport
}) => {
  const getProductivityScore = () => {
    if (stats.total === 0) return 0;
    const completionRate = (stats.completed / stats.total) * 100;
    const overdueRate = (stats.overdue / stats.total) * 100;
    return Math.max(0, Math.round(completionRate - (overdueRate * 0.5)));
  };

  const getCategoryStats = () => {
    const categoryStats: Record<string, { total: number; completed: number }> = {};
    
    tasks.forEach(task => {
      if (!categoryStats[task.category]) {
        categoryStats[task.category] = { total: 0, completed: 0 };
      }
      categoryStats[task.category].total++;
      if (task.status === TaskStatus.COMPLETED) {
        categoryStats[task.category].completed++;
      }
    });
    
    return Object.entries(categoryStats).map(([category, data]) => ({
      category,
      ...data,
      completionRate: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
    }));
  };

  const getPriorityStats = () => {
    const priorityStats: Record<string, { total: number; completed: number }> = {};
    
    tasks.forEach(task => {
      if (!priorityStats[task.priority]) {
        priorityStats[task.priority] = { total: 0, completed: 0 };
      }
      priorityStats[task.priority].total++;
      if (task.status === TaskStatus.COMPLETED) {
        priorityStats[task.priority].completed++;
      }
    });
    
    return Object.entries(priorityStats).map(([priority, data]) => ({
      priority,
      ...data,
      completionRate: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
    }));
  };

  const getWeeklyProgress = () => {
    const today = new Date();
    const weeklyData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const completedTasks = tasks.filter(task => 
        task.completedAt && 
        task.completedAt.toDateString() === date.toDateString()
      ).length;
      
      weeklyData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: completedTasks
      });
    }
    
    return weeklyData;
  };

  const categoryStats = getCategoryStats();
  const priorityStats = getPriorityStats();
  const weeklyProgress = getWeeklyProgress();
  const productivityScore = getProductivityScore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span>Analytics Dashboard</span>
            </h2>
            <p className="text-gray-600">Insights into your productivity and task management</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={onExport} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{productivityScore}%</div>
                <div className="text-sm text-blue-700 font-medium">Productivity Score</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{stats.completedThisWeek}</div>
                <div className="text-sm text-green-700 font-medium">Completed This Week</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{Math.round(stats.totalTimeSpent / 60)}h</div>
                <div className="text-sm text-purple-700 font-medium">Total Time Tracked</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                </div>
                <div className="text-sm text-amber-700 font-medium">Completion Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Weekly Progress</span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-end space-x-2 h-32">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-600 rounded-t transition-all duration-300 hover:bg-blue-700"
                      style={{ 
                        height: `${Math.max(8, (day.completed / Math.max(...weeklyProgress.map(d => d.completed), 1)) * 100)}px`,
                        minHeight: '8px'
                      }}
                    />
                    <div className="text-xs text-gray-600 mt-2">{day.date}</div>
                    <div className="text-xs font-medium text-gray-800">{day.completed}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Performance */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Category Performance</span>
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryStats.map(({ category, total, completed, completionRate }) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="default" size="sm">{category}</Badge>
                        <span className="text-sm text-gray-600">{completed}/{total}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Priority Analysis */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span>Priority Analysis</span>
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {priorityStats.map(({ priority, total, completed, completionRate }) => (
                  <div key={priority} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            priority === TaskPriority.URGENT ? 'danger' :
                            priority === TaskPriority.HIGH ? 'warning' :
                            priority === TaskPriority.MEDIUM ? 'info' : 'default'
                          } 
                          size="sm"
                        >
                          {priority}
                        </Badge>
                        <span className="text-sm text-gray-600">{completed}/{total}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          priority === TaskPriority.URGENT ? 'bg-red-600' :
                          priority === TaskPriority.HIGH ? 'bg-yellow-600' :
                          priority === TaskPriority.MEDIUM ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Task Status Overview */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Task Status Overview</span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{stats.todo}</div>
                  <div className="text-sm text-gray-600">To Do</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                  <div className="text-sm text-gray-600">Overdue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};