import React from 'react';
import { TaskStats } from '../types/task';
import { Card, CardContent } from './ui/Card';
import { CheckCircle, Clock, AlertCircle, ListTodo, PlayCircle, Timer, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: TaskStats;
  darkMode?: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, darkMode = false }) => {
  const statItems = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: <ListTodo className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      darkBgColor: 'dark:bg-blue-900/20',
      darkTextColor: 'dark:text-blue-400'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      darkBgColor: 'dark:bg-green-900/20',
      darkTextColor: 'dark:text-green-400'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: <PlayCircle className="w-6 h-6 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      darkBgColor: 'dark:bg-yellow-900/20',
      darkTextColor: 'dark:text-yellow-400'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      darkBgColor: 'dark:bg-red-900/20',
      darkTextColor: 'dark:text-red-400'
    },
    {
      title: 'This Week',
      value: stats.completedThisWeek,
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      darkBgColor: 'dark:bg-purple-900/20',
      darkTextColor: 'dark:text-purple-400'
    },
    {
      title: 'Time Tracked',
      value: `${Math.round(stats.totalTimeSpent / 60)}h`,
      icon: <Timer className="w-6 h-6 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      darkBgColor: 'dark:bg-indigo-900/20',
      darkTextColor: 'dark:text-indigo-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {statItems.map((item, index) => (
        <Card key={index} className={`hover:shadow-md transition-shadow duration-200 ${
          darkMode ? 'bg-gray-800 border-gray-700' : ''
        }`}>
          <CardContent className="flex items-center p-6">
            <div className={`p-3 rounded-lg ${item.bgColor} ${darkMode ? item.darkBgColor : ''} mr-4`}>
              {item.icon}
            </div>
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.title}
              </p>
              <p className={`text-2xl font-bold ${item.textColor} ${darkMode ? item.darkTextColor : ''}`}>
                {item.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};