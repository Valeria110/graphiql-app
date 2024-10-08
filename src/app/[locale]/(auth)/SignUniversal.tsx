'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useEffect, useId, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { logInWithEmailAndPassword, registerWithEmailAndPasswordShort } from '@/authService';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSchemaSignUp, valuesSignUp } from '@/validation/schemas';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

interface SignUniversalProps {
  mode: 'signIn' | 'signUp';
}

export default function SignUniversal({ mode }: SignUniversalProps) {
  const schemaSignUp = useSchemaSignUp();
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schemaSignUp),
    mode: 'onChange',
  });

  const [user] = useAuthState(auth);
  const [messageAuthErrorMail, setMessageAuthErrorMail] = useState('');
  const [messageAuthErrorPassword, setMessageAuthPassword] = useState('');
  const isMessageAuthErrorMail = messageAuthErrorMail !== '';
  const isMessageAuthErrorPassword = messageAuthErrorPassword !== '';
  const idEmail = useId();
  const idPassword = useId();
  const router = useRouter();
  const watchPassword = useWatch({ control, name: 'password' });
  const watchEmail = useWatch({ control, name: 'email' });
  const localActive = useLocale();

  const t = useTranslations('AuthPages');

  const { errors, isValid, isDirty } = formState;

  const onSubmit = async (data: valuesSignUp) => {
    setMessageAuthErrorMail('');
    setMessageAuthPassword('');
    try {
      if (mode === 'signIn') {
        await logInWithEmailAndPassword(data.email, data.password);
      } else if (mode === 'signUp') {
        await registerWithEmailAndPasswordShort(data.email, data.password);
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'auth/email-already-in-use') {
          setMessageAuthErrorMail(t('errorMsgEmailInUse'));
        } else {
          setMessageAuthErrorMail(t('errorMsgInvalidCredentials'));
          setMessageAuthPassword(t('errorMsgInvalidCredentials'));
        }
      }
    }
  };

  useEffect(() => {
    if (user && localActive) {
      router.push(`/${localActive}`);
    }
  }, [user, router, localActive]);

  useEffect(() => {
    setMessageAuthErrorMail('');
    setMessageAuthPassword('');
  }, [watchPassword, watchEmail]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: {
          xs: '100%',
          sm: '100%',
          md: '50%',
        },
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
            error={!!errors.email || isMessageAuthErrorMail}
            helperText={errors.email?.message ?? messageAuthErrorMail ?? ''}
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
            error={!!errors.password || isMessageAuthErrorPassword}
            helperText={errors.password?.message ?? messageAuthErrorPassword ?? ''}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid || !isDirty || isMessageAuthErrorMail || isMessageAuthErrorPassword}
        >
          {mode === 'signIn' ? t('btnSignIn') : t('btnSignUp')}
        </Button>
      </form>
    </Box>
  );
}
