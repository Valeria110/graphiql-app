import { describe, expect, it } from 'vitest';
import { schemaSignUp } from './schemas';

describe('yupSchema', () => {
  it('should validate valid email and password', async () => {
    const values = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    await expect(schemaSignUp.validate(values)).resolves.toBe(values);
  });

  it('should throw error for invalid email', async () => {
    const values = {
      email: 'invalidemail',
      password: 'Password123!',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('Invalid email');
  });

  it('should throw error for empty email', async () => {
    const values = {
      email: '',
      password: 'Password123!',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('Email is required');
  });

  it('should throw error for short password', async () => {
    const values = {
      email: 'test@example.com',
      password: 'Jake12',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('Password must be at least 8 characters');
  });

  it('should throw error for password without a letter', async () => {
    const values = {
      email: 'test@example.com',
      password: '12345678910',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('Password must contain at least one letter');
  });

  it('should throw error for password without a number', async () => {
    const values = {
      email: 'test@example.com',
      password: 'SomePassword',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('Password must contain at least one number');
  });

  it('should throw error for password without a special character', async () => {
    const values = {
      email: 'test@example.com',
      password: 'Password234',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError(
      'Password must contain at least one special character',
    );
  });

  it('should throw error for empty password', async () => {
    const values = {
      email: 'test@example.com',
      password: '',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('Password must be at least 8 characters');
  });
});
