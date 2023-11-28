/* eslint-disable no-undef */
import { cleanup } from '@testing-library/react';
afterEach(cleanup);

jest.mock('react', () => ({
  // Mock React hooks
}));