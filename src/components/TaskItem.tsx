import { CheckCircle, Circle, Trash2, CreditCard as Edit, Clock, Tag, AlertCircle } from 'lucide-react';
import { Task } from '../types';
import { useAuth } from '../context/AuthContext';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const { isAdmin } = useAuth();
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  const isOverdue = task.status === 'pending' && dueDate < now;
  const isToday = dueDate.toDateString() === now.toDateString();

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const categoryColors = {
    Home: 'bg-blue-100 text-blue-800',
    Personal: 'bg-purple-100 text-purple-800',
    Office: 'bg-orange-100 text-orange-800',
    Other: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border-l-4 transition hover:shadow-md ${
      isOverdue ? 'border-red-500' : task.status === 'completed' ? 'border-green-500' : 'border-blue-500'
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className="mt-1 flex-shrink-0 transition hover:scale-110"
        >
          {task.status === 'completed' ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                  <Tag className="w-3 h-3 mr-1" />
                  {task.category}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority.toUpperCase()}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isOverdue ? 'bg-red-100 text-red-800' : isToday ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {dueDate.toLocaleDateString()}
                </span>
                {isOverdue && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Overdue
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isAdmin && task.assignedBy && (
            <p className="text-xs text-gray-500 mt-2">
              Assigned by Admin
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
