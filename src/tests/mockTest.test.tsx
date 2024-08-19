import { expect, it } from 'vitest';
import { sum } from './sum';

it('should calculate the sum', () => {
  expect(sum(1, 3)).toBe(4);
});
