export type UserRole = 'admin' | 'user';

export type TaskStatus = 'pending' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory = 'Home' | 'Personal' | 'Office' | 'Other';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  authToken: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  userId: string;
  assignedBy?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalTasks: number;
  totalUsers: number;
  avgTasksPerUserLast7Days: number;
  tasksByStatus: {
    pending: number;
    completed: number;
  };
  tasksLast7Days: number;
  tasksPrevious7Days: number;
}
