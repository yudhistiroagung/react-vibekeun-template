import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { QueryOptions } from '@/cores/tanstack-query/tanstack-query';

import di from '@/di';
import type { Todo } from '@/domain/todos/models';

type TodoQueryOption = QueryOptions<Todo[]>;

export const useGetTodos = (userId: string, options: TodoQueryOption = {}) => {
  return useQuery({
    queryKey: ['TODOS', userId],
    queryFn: () => di.repositories.todoRepository.getTodos(userId),
    ...options,
  });
};

export const useCreateTodo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'userId'>,
    ) => di.repositories.todoRepository.createTodo({ ...todo, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TODOS', userId] });
    },
  });
};

export const useUpdateTodo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => di.repositories.todoRepository.updateTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TODOS', userId] });
    },
  });
};

export const useDeleteTodo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => di.repositories.todoRepository.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TODOS', userId] });
    },
  });
};
