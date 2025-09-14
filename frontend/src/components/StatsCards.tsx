import React from 'react';
import { TaskStats } from '../types/task';
import { Card, CardContent } from './ui/Card';
import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';

interface StatsCardsProps {
  stats: TaskStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: <ListTodo className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="flex items-center p-6">
            <div className={`p-3 rounded-lg ${item.bgColor} mr-4`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <p className={`text-2xl font-bold ${item.textColor}`}>{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};