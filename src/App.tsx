import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import Login from './components/Login';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { user, isAdmin } = useAuth();
  const { tasks } = useTasks();
  const [activeView, setActiveView] = useState('all');

  if (!user) {
    return <Login />;
  }

  const now = new Date();
  const today = now.toDateString();

  const userTasks = isAdmin ? tasks : tasks.filter(task => task.userId === user.id);

  const getFilteredTasks = () => {
    switch (activeView) {
      case 'all':
        return userTasks.filter(task => task.status === 'pending');
      case 'today':
        return userTasks.filter(
          task => task.status === 'pending' && new Date(task.dueDate).toDateString() === today
        );
      case 'overdue':
        return userTasks.filter(
          task => task.status === 'pending' && new Date(task.dueDate) < now
        );
      case 'archive':
        return userTasks.filter(task => task.status === 'completed');
      default:
        return userTasks;
    }
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'all':
        return 'All Tasks';
      case 'today':
        return "Today's Tasks";
      case 'overdue':
        return 'Overdue Tasks';
      case 'archive':
        return 'Completed Tasks';
      default:
        return 'Tasks';
    }
  };

  const getEmptyMessage = () => {
    switch (activeView) {
      case 'all':
        return 'No pending tasks. Create a new task to get started!';
      case 'today':
        return 'No tasks due today. Enjoy your day!';
      case 'overdue':
        return 'No overdue tasks. You are all caught up!';
      case 'archive':
        return 'No completed tasks yet.';
      default:
        return 'No tasks found.';
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'dashboard' ? (
        <Dashboard />
      ) : (
        <TaskList
          title={getViewTitle()}
          tasks={getFilteredTasks()}
          emptyMessage={getEmptyMessage()}
        />
      )}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}
