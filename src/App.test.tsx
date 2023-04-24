import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    screen.debug();

    // check if App components renders headline
  });
});

// create a login form
// username: min max character
// password: min max character, lowercase, uppercase, numbers
// remeber me checkbox
// show error 
// login button

// UI test:
// { data: { username, password, rememberMe }, error: { username, password, rememberMe, general }, onChange, onSubmit}

// Custom hook test:
// { data, error, onChange, onSubmit } = useLoginForm()
// onChange(name, value)
// onSubmit()