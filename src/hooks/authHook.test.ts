import { describe, expect, it, vi } from 'vitest';
import { useUser } from './authHook';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

vi.mock('react', () => ({
  useEffect: vi.fn(),
  useState: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

describe('useUser', () => {
  it('should return false initially', () => {
    const mockSetState = vi.fn();
    const mockOnAuthStateChanged = vi.fn();
    vi.mocked(useState).mockReturnValue([false, mockSetState]);
    vi.mocked(onAuthStateChanged).mockImplementation(mockOnAuthStateChanged);

    const user = useUser();
    expect(user).toBe(false);
  });
});
