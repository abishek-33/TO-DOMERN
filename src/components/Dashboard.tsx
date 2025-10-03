import { Users, ListTodo, TrendingUp, BarChart } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_USERS } from '../lib/mockData';

export default function Dashboard() {
  const { tasks, getDashboardStats } = useTasks();
  const { user, isAdmin } = useAuth();
  const stats = getDashboardStats();

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <p className="text-red-600 text-lg">Access Denied: Admin only</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: ListTodo,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Avg Tasks/User (7 days)',
      value: stats.avgTasksPerUserLast7Days.toFixed(1),
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Tasks This Week',
      value: stats.tasksLast7Days,
      icon: BarChart,
      color: 'bg-orange-500',
    },
  ];

  const completionRate = stats.totalTasks > 0
    ? ((stats.tasksByStatus.completed / stats.totalTasks) * 100).toFixed(1)
    : 0;

  const weekComparison = stats.tasksPrevious7Days > 0
    ? (((stats.tasksLast7Days - stats.tasksPrevious7Days) / stats.tasksPrevious7Days) * 100).toFixed(1)
    : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Task Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Completed</span>
                <span className="text-sm font-bold text-green-600">
                  {stats.tasksByStatus.completed} ({completionRate}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Pending</span>
                <span className="text-sm font-bold text-blue-600">
                  {stats.tasksByStatus.pending} ({(100 - Number(completionRate)).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${100 - Number(completionRate)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Comparison</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Last 7 Days</p>
                <p className="text-2xl font-bold text-gray-900">{stats.tasksLast7Days}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Previous 7 Days</p>
                <p className="text-2xl font-bold text-gray-900">{stats.tasksPrevious7Days}</p>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${
              Number(weekComparison) >= 0 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className="text-sm text-gray-600 mb-1">Change</p>
              <p className={`text-2xl font-bold ${
                Number(weekComparison) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Number(weekComparison) >= 0 ? '+' : ''}{weekComparison}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">All Users Tasks</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Task</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Priority</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.slice(0, 10).map(task => {
                const taskUser = MOCK_USERS.find(u => u.id === task.userId);
                return (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{taskUser?.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{task.title}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
