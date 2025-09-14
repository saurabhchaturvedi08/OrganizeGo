import React, { useState } from 'react';
import { TaskTemplate, TaskCategory, TaskPriority } from '../types/task';
import { taskTemplates } from '../utils/mockData';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { X, Plus, FileText, Clock, Tag } from 'lucide-react';

interface TaskTemplatesProps {
  onCreateFromTemplate: (template: TaskTemplate) => void;
  onClose: () => void;
}

export const TaskTemplates: React.FC<TaskTemplatesProps> = ({
  onCreateFromTemplate,
  onClose
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);

  const handleCreateFromTemplate = (template: TaskTemplate) => {
    onCreateFromTemplate(template);
    onClose();
  };

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Task Templates</h2>
            <p className="text-gray-600">Choose a template to quickly create a new task</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {taskTemplates.map(template => (
              <Card 
                key={template.id} 
                hover 
                className="cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all duration-200"
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Badge variant={getCategoryColor(template.category)} size="sm">
                      {template.category}
                    </Badge>
                    <Badge variant={getPriorityColor(template.priority)} size="sm">
                      {template.priority}
                    </Badge>
                    {template.estimatedHours && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{template.estimatedHours}h</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {template.subtasks.length} subtasks • {template.tags.length} tags
                  </div>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateFromTemplate(template);
                    }}
                    className="w-full"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedTemplate && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Template Preview: {selectedTemplate.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{selectedTemplate.description}</p>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-700">Subtasks:</span>
                  <ul className="mt-1 space-y-1">
                    {selectedTemplate.subtasks.map((subtask, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        <span>{subtask}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedTemplate.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex space-x-1">
                      {selectedTemplate.tags.map(tag => (
                        <Badge key={tag} variant="default" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};