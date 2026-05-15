import { useRouter } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGetTodos } from '@/presentation/hooks/use-get-todos';

export const useMenu1 = () => {
  /**
   * hook from external library like navigation, etc
   */
  const { navigate } = useRouter();

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
  const mappedCount = useMemo(() => `This is ${count}`, [count]);

  /**
   * Function handlers declarations
   */
  const increaseCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  /**
   * Effect declarations
   * 1 effect only do one thing
   */
  useEffect(() => {
    console.log('TODOS', todos);
  }, [todos]);

  return {
    count,
    mappedCount,
    increaseCount,
    navigate,
  };
};
