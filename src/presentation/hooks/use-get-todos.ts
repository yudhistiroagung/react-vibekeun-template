import { useQuery } from '@tanstack/react-query';

import type { QueryOptions } from '@/cores/tanstack-query/tanstack-query';

import di from '@/di';
import type { Todo } from '@/domain/todos/models';

type TodoQueryOption = QueryOptions<Todo[]>;

export const useGetTodos = (options: TodoQueryOption = {}) => {
  const queryMethods = useQuery({
    queryKey: ['TODOS'],
    queryFn: () => di.usecases.getTodosUsecase.run(),
    ...options,
  });

  return queryMethods;
};
