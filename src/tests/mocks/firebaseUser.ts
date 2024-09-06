import { IdTokenResult, User } from 'firebase/auth';

export const user: User = {
  uid: '123',
  email: 'user@example.com',
  emailVerified: true,
  isAnonymous: false,
  displayName: 'User name',
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  },
  providerData: [],
  refreshToken: 'some-refresh-token',
  tenantId: null,
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  },
  phoneNumber: null,
  photoURL: null,
  providerId: '',
};
