import { describe, expect, it } from 'vitest';

import { cn } from './utils';

describe('utils', () => {
  it('should return correct className name', () => {
    expect(cn('a', 'b')).toBe('a b');
  });
});
