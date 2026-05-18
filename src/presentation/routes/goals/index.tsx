import { createFileRoute } from '@tanstack/react-router';
import { GoalFrequency } from '@/domain/goals/models/goal';
import { useGoals } from './goals.hook';

export const Route = createFileRoute('/goals/')({
  component: GoalsRoute,
});

function GoalsRoute() {
  const { goals, isLoading, isFormOpen, setIsFormOpen, form } = useGoals();

  return (
    <>
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-6 py-2 bg-primary text-on-primary border border-primary font-label-caps uppercase hover:bg-surface hover:text-primary transition-none"
        >
          {isFormOpen ? 'CANCEL' : 'ADD GOAL'}
        </button>
      </div>

      {isFormOpen && (
        <section className="mb-section-gap">
          <div className="border-strict p-container-padding bg-surface-container-lowest">
            <h3 className="font-headline-md text-headline-md mb-6">Create New Goal</h3>
            <form onSubmit={form.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="font-label-caps text-label-caps uppercase">Title</label>
                <input
                  id="title"
                  className="w-full border-strict p-3 font-body-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-none"
                  placeholder="e.g., Read a book"
                  value={form.title}
                  onChange={(e) => form.setTitle(e.target.value)}
                  disabled={form.isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="font-label-caps text-label-caps uppercase">Description</label>
                <textarea
                  id="description"
                  className="w-full border-strict p-3 font-body-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-none min-h-[100px]"
                  placeholder="Optional details..."
                  value={form.description}
                  onChange={(e) => form.setDescription(e.target.value)}
                  disabled={form.isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="frequency" className="font-label-caps text-label-caps uppercase">Frequency</label>
                <select
                  id="frequency"
                  className="w-full border-strict p-3 font-body-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary rounded-none appearance-none"
                  value={form.frequency}
                  onChange={(e) => form.setFrequency(e.target.value as GoalFrequency)}
                  disabled={form.isSubmitting}
                >
                  <option value="" disabled>Select frequency</option>
                  {GoalFrequency.options.map((freq) => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={form.isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary font-label-caps uppercase border border-primary transition-none hover:opacity-90"
              >
                {form.isSubmitting ? 'CREATING...' : 'INITIALIZE GOAL'}
              </button>
            </form>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-12 gap-element-gap">
        <div className="md:col-span-12 border-b border-primary pb-4 mb-4 w-full">
          <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Recurring Templates</h3>
        </div>

        {isLoading ? (
          <div className="md:col-span-12 p-8 text-center text-secondary">Loading goals...</div>
        ) : goals.length === 0 ? (
          <div className="md:col-span-12 flex flex-col items-center justify-center py-section-gap text-center border border-dashed border-primary mt-section-gap">
            <span className="material-symbols-outlined text-[64px] text-secondary mb-6">flag</span>
            <h3 className="font-headline-lg text-headline-lg mb-2">No active goals found.</h3>
            <p className="font-body-lg text-body-lg text-secondary mb-8">Begin your architectural journey by establishing your first recurring commitment.</p>
            {!isFormOpen && (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-3 bg-primary text-on-primary font-label-caps uppercase border border-primary"
              >
                Initialize Ledger
              </button>
            )}
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="md:col-span-12 bg-surface-container-lowest border border-primary p-container-padding flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-surface-container transition-none">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-12 h-12 border border-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">flag</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md">{goal.title}</h4>
                  <p className="font-body-sm text-body-sm text-secondary uppercase tracking-tighter">Frequency: {goal.frequency}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <button className="px-6 py-2 bg-surface-container-lowest text-primary border border-primary font-label-caps uppercase hover:bg-primary hover:text-on-primary transition-none">
                  Edit
                </button>
                <div className="w-8 h-8 border border-primary flex items-center justify-center bg-primary text-on-primary">
                  <span className="material-symbols-outlined text-[16px]">more_horiz</span>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
