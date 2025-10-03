import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, DashboardStats } from '../types';
import { MOCK_TASKS, MOCK_USERS } from '../lib/mockData';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  searchTasks: (query: string) => Task[];
  getDashboardStats: () => DashboardStats;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(MOCK_TASKS);
      localStorage.setItem('tasks', JSON.stringify(MOCK_TASKS));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const newStatus = task.status === 'pending' ? 'completed' : 'pending';
          return {
            ...task,
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
  };

  const searchTasks = (query: string): Task[] => {
    const lowerQuery = query.toLowerCase();
    let filteredTasks = tasks;

    if (!isAdmin && user) {
      filteredTasks = tasks.filter(task => task.userId === user.id);
    }

    return filteredTasks.filter(task =>
      task.title.toLowerCase().includes(lowerQuery)
    );
  };

  const getDashboardStats = (): DashboardStats => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const tasksLast7Days = tasks.filter(
      task => new Date(task.createdAt) >= sevenDaysAgo
    ).length;

    const tasksPrevious7Days = tasks.filter(
      task =>
        new Date(task.createdAt) >= fourteenDaysAgo &&
        new Date(task.createdAt) < sevenDaysAgo
    ).length;

    const uniqueUsers = new Set(tasks.map(task => task.userId)).size;

    return {
      totalTasks: tasks.length,
      totalUsers: MOCK_USERS.filter(u => u.role === 'user').length,
      avgTasksPerUserLast7Days: uniqueUsers > 0 ? tasksLast7Days / uniqueUsers : 0,
      tasksByStatus: {
        pending: tasks.filter(t => t.status === 'pending').length,
        completed: tasks.filter(t => t.status === 'completed').length,
      },
      tasksLast7Days,
      tasksPrevious7Days,
    };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        searchTasks,
        getDashboardStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
