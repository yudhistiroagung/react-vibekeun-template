import { useCallback, useEffect, useState } from 'react';

export const useMenu1 = () => {
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
    console.log('CHANGE', mappedCount);
  }, [mappedCount]);

  return {
    count,
    mappedCount,
    increaseCount,
  };
};
