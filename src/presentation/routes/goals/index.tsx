import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { GoalFrequency } from '@/domain/goals/models/goal';
import { Button } from '@/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { Textarea } from '@/presentation/components/ui/textarea';
import { useGoals } from './goals.hook';

export const Route = createFileRoute('/goals/')({
  component: GoalsRoute,
});

function GoalsRoute() {
  const { goals, isLoading, isFormOpen, setIsFormOpen, form } = useGoals();

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground">
            Manage your recurring goal templates.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          <PlusIcon className="mr-2 size-4" />
          {isFormOpen ? 'Cancel' : 'Add Goal'}
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
            <CardDescription>
              Add a new template to generate tasks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Read a book"
                  value={form.title}
                  onChange={(e) => form.setTitle(e.target.value)}
                  disabled={form.isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional details..."
                  value={form.description}
                  onChange={(e) => form.setDescription(e.target.value)}
                  disabled={form.isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={form.frequency}
                  onValueChange={(val) =>
                    form.setFrequency(val as GoalFrequency)
                  }
                  disabled={form.isSubmitting}
                >
                  <SelectTrigger id="frequency" className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {GoalFrequency.options.map((freq) => (
                      <SelectItem key={freq} value={freq}>
                        {freq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={form.isSubmitting}
                className="w-full sm:w-auto"
              >
                {form.isSubmitting ? 'Creating...' : 'Create Goal'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-muted-foreground">Loading goals...</p>
        ) : goals.length === 0 ? (
          <div className="col-span-full p-8 text-center border rounded-lg bg-muted/20">
            <p className="text-muted-foreground mb-4">
              No goals found for the active profile.
            </p>
            {!isFormOpen && (
              <Button variant="outline" onClick={() => setIsFormOpen(true)}>
                Create your first goal
              </Button>
            )}
          </div>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{goal.title}</span>
                  <span className="text-xs font-normal px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {goal.frequency}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {goal.description || 'No description provided.'}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
