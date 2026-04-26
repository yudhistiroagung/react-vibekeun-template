import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button Component', () => {
  // 1. Unit Test (Logic/Behavior)
  it('harus merender aria-label="LOGIN" dengan benar', () => {
    const screen = render(<Button aria-label="LOGIN">LOGIN</Button>);

    const buttonElement = screen.getByLabelText(/login/i);

    expect(buttonElement).toBeDefined();
  });

  // 2. Snapshot Test (UI Structure)
  it('harus cocok dengan snapshot sebelumnya', () => {
    const { asFragment } = render(<Button aria-label="LOGIN" />);
    
    // Ini akan membuat file .snap di folder __snapshots__
    expect(asFragment()).toMatchSnapshot();
  });
});
