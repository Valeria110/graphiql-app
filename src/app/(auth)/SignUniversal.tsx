'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { logInWithEmailAndPassword, registerWithEmailAndPasswordShort } from '@/authService';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { schemaSignUp, valuesSignUp } from '@/validation/schemas';
import { SignOutBtn } from '@/components/SignOutBtn/SignOutBtn';
import { useRouter } from 'next/navigation';

// TODO: mix ", '
// TODO: Show all problem with password together
// TODO: Find better way with header
// TODO: eyes for password
// TODO: reset auth error when typing
// TODO: Message email already use

interface SignUniversalProps {
  mode: 'signIn' | 'signUp';
}

export default function SignUniversal({ mode }: SignUniversalProps) {
  const [user, loading] = useAuthState(auth);
  const [messageAuthError, setMessageAuthError] = useState('');
  const isMessageAuthError = messageAuthError !== '';
  const idEmail = useId();
  const idPassword = useId();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schemaSignUp),
    mode: 'onChange',
  });
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

  console.log(`user = ${user}, loading = ${loading}`);
  console.log(user);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

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
            label="Email"
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
            label="Password"
            variant="outlined"
            type="password"
            {...register('password')}
            required
            sx={{ marginBottom: 2 }}
            error={!!errors.password || isMessageAuthError}
            helperText={errors.password?.message ?? messageAuthError ?? ''}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" disabled={!isValid || !isDirty}>
          {mode === 'signIn' ? 'Sign in' : 'Sign up'}
        </Button>

        <SignOutBtn />
      </form>
    </Box>
  );
}
