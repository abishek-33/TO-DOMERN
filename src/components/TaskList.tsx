import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

interface TaskListProps {
  title: string;
  tasks: Task[];
  emptyMessage: string;
}

export default function TaskList({ title, tasks, emptyMessage }: TaskListProps) {
  const { user, isAdmin } = useAuth();
  const { addTask, updateTask, deleteTask, toggleTaskStatus, searchTasks } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (task: Task) => {
    if (isAdmin || task.userId === user?.id) {
      setEditingTask(task);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (isAdmin || task?.userId === user?.id) {
      if (window.confirm('Are you sure you want to delete this task?')) {
        deleteTask(id);
      }
    }
  };

  const handleSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const filteredTasks = searchQuery
    ? searchTasks(searchQuery).filter(task => tasks.some(t => t.id === task.id))
    : tasks;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            <span>New Task</span>
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTaskStatus}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          task={editingTask}
        />
      )}
    </div>
  );
}
