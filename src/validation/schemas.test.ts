import { describe, expect, it, vi } from 'vitest';
import { useSchemaSignUp } from './schemas';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('yupSchema', () => {
  const schemaSignUp = useSchemaSignUp();

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

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('invalidEmail');
  });

  it('should throw error for empty email', async () => {
    const values = {
      email: '',
      password: 'Password123!',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('emailRequired');
  });

  it('should throw error for short password', async () => {
    const values = {
      email: 'test@example.com',
      password: 'Jake12',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('passwordMinLength');
  });

  it('should throw error for password without a letter', async () => {
    const values = {
      email: 'test@example.com',
      password: '12345678910',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('passwordLetter');
  });

  it('should throw error for password without a number', async () => {
    const values = {
      email: 'test@example.com',
      password: 'SomePassword',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('passwordNumber');
  });

  it('should throw error for password without a special character', async () => {
    const values = {
      email: 'test@example.com',
      password: 'Password234',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('passwordSpecialChar');
  });

  it('should throw error for empty password', async () => {
    const values = {
      email: 'test@example.com',
      password: '',
    };

    await expect(schemaSignUp.validate(values)).rejects.toThrowError('passwordRequired');
  });
});
