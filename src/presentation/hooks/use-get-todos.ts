import { useState } from 'react';
import type { Todo } from '@/domain/todos/models';

import di from '@/di';

export const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const getTodos = async () => {
    const todos = await di.repositories.todoRepository.getTodos();
    setTodos(todos);
    return todos;
  };

  return {
    todos,
    getTodos,
  };
};
