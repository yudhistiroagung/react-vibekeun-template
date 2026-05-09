import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import type { Todo } from '@/domain/todos/models';
import { useAuth } from '@/presentation/contexts/auth-context';
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from '@/presentation/hooks/use-get-todos';

export const Route = createFileRoute('/_protected/todos')({
  component: TodosPage,
});

function TodosPage() {
  const { activeUserId } = useAuth();
  const { data: todos = [], isLoading } = useGetTodos(activeUserId!);
  const createTodo = useCreateTodo(activeUserId!);
  const updateTodo = useUpdateTodo(activeUserId!);
  const deleteTodo = useDeleteTodo(activeUserId!);

  const [newTaskName, setNewTaskName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    createTodo.mutate({
      name: newTaskName,
      status: false,
      description: '',
    });
    setNewTaskName('');
  };

  const handleToggle = (todo: Todo) => {
    updateTodo.mutate({
      ...todo,
      status: !todo.status,
    });
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  if (isLoading) {
    return <div className="p-8">Loading todos...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Todo History & Management</h1>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-md border-gray-300 shadow-sm px-4 py-2 border focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={createTodo.isPending}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          Add Task
        </button>
      </form>

      <div className="bg-white shadow rounded-lg divide-y">
        {todos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No tasks yet. Create one above!
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => handleToggle(todo)}
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span
                  className={
                    todo.status ? 'line-through text-gray-400' : 'text-gray-900'
                  }
                >
                  {todo.name}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(todo.createdAt).toLocaleDateString()}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700 px-3 py-1"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
