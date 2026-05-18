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
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useDashboardStats } from '../hooks/use-dashboard-stats';

export function DashboardView() {
  const { stats, isLoading, error } = useDashboardStats(7);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-[120px] w-full rounded-none" />
          <Skeleton className="h-[120px] w-full rounded-none" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-none" />
          <Skeleton className="h-[300px] w-full rounded-none" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 text-center text-secondary border-strict bg-surface-container-lowest">
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
    { name: 'Completed', value: completionRate.completed, color: '#000000' },
    { name: 'Pending', value: completionRate.pending, color: '#e2e2e2' },
  ];

  const hasPieData = completionRate.completed > 0 || completionRate.pending > 0;
  const avgCompletion = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  return (
    <>
      {/* Quick Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-element-gap mb-section-gap">
        <div className="border-strict p-container-padding bg-surface-container-lowest flex flex-col justify-between h-32">
          <span className="font-label-caps text-label-caps text-secondary">TASKS COMPLETED</span>
          <span className="font-headline-lg text-headline-lg font-bold">
            {completedToday}/{totalToday} Today
          </span>
        </div>
        <div className="border-strict p-container-padding bg-primary text-on-primary flex flex-col justify-between h-32">
          <span className="font-label-caps text-label-caps text-on-primary-container">CURRENT VELOCITY</span>
          <span className="font-headline-lg text-headline-lg font-bold">
            {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'} Streak
          </span>
        </div>
      </section>

      {/* Bento Layout for Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-element-gap mb-section-gap w-full">
        {/* Completion Rate Donut Chart */}
        <div className="md:col-span-5 border-strict bg-surface-container-lowest">
          <div className="p-4 border-separator flex justify-between items-center">
            <span className="font-label-caps text-label-caps">COMPLETION RATE</span>
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <div className="p-container-padding flex flex-col items-center h-[250px] relative">
            {hasPieData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '0px',
                      border: '1px solid #000000',
                      boxShadow: 'none',
                      fontFamily: 'Geist, sans-serif'
                    }}
                    itemStyle={{ color: '#000000' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-secondary font-body-sm flex h-full items-center">
                No tasks data available
              </p>
            )}
            {hasPieData && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-[52px]">
                <span className="font-headline-lg text-headline-lg">{avgCompletion}%</span>
                <span className="font-label-caps text-label-caps text-secondary">TODAY</span>
              </div>
            )}
          </div>
        </div>

        {/* Performance Trend Bar Chart */}
        <div className="md:col-span-7 border-strict bg-surface-container-lowest">
          <div className="p-4 border-separator flex justify-between items-center">
            <span className="font-label-caps text-label-caps">PERFORMANCE TREND</span>
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <div className="p-container-padding h-[250px] pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceTrend}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e2e2" />
                <XAxis
                  dataKey="date"
                  axisLine={{ stroke: '#000000' }}
                  tickLine={false}
                  tick={{ fill: '#000000', fontFamily: 'Geist, sans-serif', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  axisLine={{ stroke: '#000000' }}
                  tickLine={false}
                  tick={{ fill: '#000000', fontFamily: 'Geist, sans-serif', fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: '#f9f9f9' }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0px',
                    border: '1px solid #000000',
                    boxShadow: 'none',
                    fontFamily: 'Geist, sans-serif'
                  }}
                  formatter={(value: any) => [
                    typeof value === 'number' ? value.toFixed(1) : 'No rating',
                    'Avg Rating',
                  ]}
                />
                <Bar dataKey="averageRating" radius={[0, 0, 0, 0]} maxBarSize={40}>
                  {performanceTrend.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.averageRating ? '#000000' : '#e2e2e2'}
                      stroke="#000000"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commitment Map / Consistency Grid */}
        <div className="md:col-span-12 border-strict bg-surface-container-lowest mb-section-gap">
          <div className="p-4 border-separator flex justify-between items-center">
            <span className="font-label-caps text-label-caps">COMMITMENT MAP</span>
            <span className="font-label-caps text-label-caps text-secondary">LAST 90 DAYS</span>
          </div>
          <div className="p-container-padding overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {/* Simulated Grid Columns */}
              {Array.from({ length: 13 }).map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-7 gap-1">
                  {Array.from({ length: 7 }).map((_, rowIndex) => {
                    // Randomize cell colors for the placeholder
                    const value = Math.random();
                    let bgColor = 'bg-surface-container';
                    if (value > 0.8) bgColor = 'bg-primary border-primary';
                    else if (value > 0.6) bgColor = 'bg-surface-container-high border-outline';
                    else if (value > 0.4) bgColor = 'bg-surface-container-highest border-outline';
                    else if (value > 0.2) bgColor = 'bg-surface-container-lowest border-outline';
                    
                    return (
                      <div
                        key={`${colIndex}-${rowIndex}`}
                        className={`w-4 h-4 border ${bgColor}`}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
