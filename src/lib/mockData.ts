import { User, Task } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    authToken: 'admin-token-123',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user1@example.com',
    name: 'John Doe',
    role: 'user',
    authToken: 'user-token-456',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'user2@example.com',
    name: 'Jane Smith',
    role: 'user',
    authToken: 'user-token-789',
    createdAt: new Date().toISOString(),
  },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    dueDate: today.toISOString(),
    category: 'Office',
    status: 'pending',
    priority: 'high',
    userId: '2',
    createdAt: lastWeek.toISOString(),
    updatedAt: lastWeek.toISOString(),
  },
  {
    id: '2',
    title: 'Review pull requests',
    dueDate: tomorrow.toISOString(),
    category: 'Office',
    status: 'pending',
    priority: 'medium',
    userId: '2',
    createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Buy groceries',
    dueDate: today.toISOString(),
    category: 'Personal',
    status: 'completed',
    priority: 'low',
    userId: '2',
    completedAt: today.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: '4',
    title: 'Fix production bug',
    dueDate: yesterday.toISOString(),
    category: 'Office',
    status: 'pending',
    priority: 'high',
    userId: '2',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Update user dashboard',
    dueDate: nextWeek.toISOString(),
    category: 'Office',
    status: 'pending',
    priority: 'medium',
    userId: '3',
    assignedBy: '1',
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: '6',
    title: 'Clean the house',
    dueDate: today.toISOString(),
    category: 'Home',
    status: 'completed',
    priority: 'low',
    userId: '3',
    completedAt: today.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: '7',
    title: 'Prepare presentation',
    dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Office',
    status: 'pending',
    priority: 'high',
    userId: '3',
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '8',
    title: 'Call dentist',
    dueDate: tomorrow.toISOString(),
    category: 'Personal',
    status: 'pending',
    priority: 'medium',
    userId: '2',
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
];
