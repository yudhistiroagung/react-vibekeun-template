import { CheckCircle2, Flame } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useDashboardStats } from '../hooks/use-dashboard-stats';

export function DashboardView() {
  const { stats, isLoading, error } = useDashboardStats(7);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-[120px] w-full rounded-xl" />
          <Skeleton className="h-[120px] w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 text-center text-muted-foreground border rounded-xl bg-gray-50/50">
        <p>{error?.message || 'Failed to load dashboard data.'}</p>
      </div>
    );
  }

  const {
    completedToday,
    totalToday,
    currentStreak,
    completionRate,
    performanceTrend,
  } = stats;

  const pieData = [
    { name: 'Completed', value: completionRate.completed, color: '#111827' }, // gray-900
    { name: 'Pending', value: completionRate.pending, color: '#e5e7eb' }, // gray-200
  ];

  // Only show pie chart if there are any tasks
  const hasPieData = completionRate.completed > 0 || completionRate.pending > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {completedToday} / {totalToday}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalToday === 0
                ? 'No tasks for today'
                : `${Math.round((completedToday / totalToday) * 100)}% completion rate`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Streak
            </CardTitle>
            <Flame className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Consecutive days with at least 1 completed task
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Completion Rate</CardTitle>
            <CardDescription>Overall tasks status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-center justify-center">
              {hasPieData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                      }}
                      itemStyle={{ color: '#111827' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No tasks data available
                </p>
              )}
            </div>
            {hasPieData && (
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  <span className="text-sm text-gray-600">
                    Completed ({completionRate.completed})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                  <span className="text-sm text-gray-600">
                    Pending ({completionRate.pending})
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Performance Trend</CardTitle>
            <CardDescription>Average rating over last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceTrend}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f3f4f6"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    }}
                    formatter={(value: any) => [
                      typeof value === 'number'
                        ? value.toFixed(1)
                        : 'No rating',
                      'Avg Rating',
                    ]}
                  />
                  <Bar
                    dataKey="averageRating"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  >
                    {performanceTrend.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.averageRating ? '#111827' : '#f3f4f6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
