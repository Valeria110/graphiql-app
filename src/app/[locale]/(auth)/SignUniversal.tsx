'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useEffect, useId, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { logInWithEmailAndPassword, registerWithEmailAndPasswordShort } from '@/authService';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { schemaSignUp, valuesSignUp } from '@/validation/schemas';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface SignUniversalProps {
  mode: 'signIn' | 'signUp';
}

export default function SignUniversal({ mode }: SignUniversalProps) {
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schemaSignUp),
    mode: 'onChange',
  });

  const [user] = useAuthState(auth);
  const [messageAuthError, setMessageAuthError] = useState('');
  const isMessageAuthError = messageAuthError !== '';
  const idEmail = useId();
  const idPassword = useId();
  const router = useRouter();
  const watchPassword = useWatch({ control, name: 'password' });
  const watchEmail = useWatch({ control, name: 'email' });

  const t = useTranslations('AuthPages');

  const { errors, isValid, isDirty } = formState;

  const onSubmit = async (data: valuesSignUp) => {
    let success = false;

    if (mode === 'signIn') {
      success = await logInWithEmailAndPassword(data.email, data.password);
    } else if (mode === 'signUp') {
      success = await registerWithEmailAndPasswordShort(data.email, data.password);
    }
    setMessageAuthError(success ? '' : 'Invalid credentials');
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    setMessageAuthError('');
  }, [watchPassword, watchEmail]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: '50%',
        margin: '0 auto',
        padding: 2,
        marginTop: 20,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" error={!!errors.email}>
          <TextField
            id={idEmail}
            label={t('labelEmail')}
            variant="outlined"
            {...register('email')}
            required
            sx={{ marginBottom: 2 }}
            error={!!errors.email || isMessageAuthError}
            helperText={errors.email?.message ?? messageAuthError ?? ''}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.password}>
          <TextField
            id={idPassword}
            label={t('labelPassword')}
            variant="outlined"
            type="password"
            {...register('password')}
            required
            sx={{ marginBottom: 2 }}
            error={!!errors.password || isMessageAuthError}
            helperText={errors.password?.message ?? messageAuthError ?? ''}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" disabled={!isValid || !isDirty || isMessageAuthError}>
          {mode === 'signIn' ? t('btnSignIn') : t('btnSignUp')}
        </Button>
      </form>
    </Box>
  );
}
