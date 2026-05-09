import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAuth } from '@/presentation/contexts/auth-context';
import { useGetTodos } from '@/presentation/hooks/use-get-todos';

export const Route = createFileRoute('/_protected/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { activeUserId } = useAuth();
  const { data: todos = [], isLoading } = useGetTodos(activeUserId!);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.status).length;
    const pending = total - completed;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Group by day for the chart
    const last7Days = Array.from({ length: 7 })
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString();
      })
      .reverse();

    const chartData = last7Days.map((dateStr) => {
      const dayTodos = todos.filter(
        (t) => new Date(t.createdAt).toLocaleDateString() === dateStr,
      );
      return {
        date: dateStr.substring(0, 5), // short date
        created: dayTodos.length,
        completed: dayTodos.filter((t) => t.status).length,
      };
    });

    const recent = [...todos]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    return { total, completed, pending, rate, chartData, recent };
  }, [todos]);

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Analytics</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.completed}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {stats.rate}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Activity (Last 7 Days)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.chartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="created"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Created"
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
          <div className="space-y-4">
            {stats.recent.length === 0 ? (
              <p className="text-sm text-gray-500">No recent activity.</p>
            ) : (
              stats.recent.map((todo) => (
                <div key={todo.id} className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${todo.status ? 'bg-green-500' : 'bg-orange-500'}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {todo.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(todo.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
