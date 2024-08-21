'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { schemaSignUp, valuesSignUp } from '../validation/schemas';
import { registerWithEmailAndPassword } from '@/authService';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// TODO: mix ", '
// TODO: Show all problem with password together
// TODO: Find better way with header
// TODO: eyes for password

export default function SignUp() {
  const [user, loading] = useAuthState(auth);
  const idEmail = useId();
  const idPassword = useId();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schemaSignUp),
    mode: 'onChange',
  });
  const { errors, isValid, isDirty } = formState;

  const onSubmit = async (data: valuesSignUp) => {
    registerWithEmailAndPassword('Mikhail', data.email, data.password);
  };
  console.log(`user = ${user}, loading = ${loading}`);
  console.log(user);

  if (user !== undefined) {
    console.log('should redirect');
  }

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
            error={!!errors.email}
            helperText={errors.email?.message ?? ''}
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
            error={!!errors.password}
            helperText={errors.password?.message ?? ''}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" disabled={!isValid || !isDirty}>
          Sign up
        </Button>
      </form>
    </Box>
  );
}
