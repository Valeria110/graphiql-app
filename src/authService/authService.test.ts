import { describe, expect, it, Mock, vi } from 'vitest';
import { logInWithEmailAndPassword, logOutUser, registerWithEmailAndPassword } from '.';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '@/firebase';

vi.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  };
});

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  getFirestore: vi.fn(),
}));

describe('logInWithEmailAndPassword', () => {
  it('should successfully sign in with valid credentials', async () => {
    (signInWithEmailAndPassword as Mock).mockResolvedValueOnce({
      user: { uid: '123', email: 'test@example.com' },
    });

    const result = await logInWithEmailAndPassword('test@example.com', 'password123');

    expect(result).toBeUndefined();
  });

  it('should return true after successful sign up with email and password', async () => {
    vi.mocked(createUserWithEmailAndPassword as Mock).mockImplementationOnce(() =>
      Promise.resolve({ user: { uid: '123', email: 'test@example.com' } }),
    );
    vi.mocked(collection as Mock).mockReturnValue({});
    vi.mocked(addDoc as Mock).mockResolvedValue({});

    const result = await registerWithEmailAndPassword('test', 'test@example.com', 'password123');

    expect(result).toBe(true);
  });

  it('should call sign out method with auth object', async () => {
    vi.mocked(signOut as Mock).mockResolvedValueOnce({});

    await logOutUser();

    expect(signOut).toHaveBeenCalledWith(auth);
  });
});
