import { useCallback, useEffect, useState } from 'react';

import { useGetTodos } from '@/presentation/hooks/use-get-todos';

export const useMenu1 = () => {
  /**
   * custom hook usage
   */
  const { data: todos } = useGetTodos();

  /**
   * State Declarations
   */
  const [count, setCount] = useState(0);

  /**
   * Derived state declaration
   */
  const mappedCount = `This is ${count}`;

  /**
   * Function handlers declarations
   */
  const increaseCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  /**
   * Effect declarations
   */
  useEffect(() => {
    console.log('TODOS', todos);
  }, [todos]);

  return {
    count,
    mappedCount,
    increaseCount,
  };
};
