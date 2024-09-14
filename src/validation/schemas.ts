import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export interface valuesSignUp {
  email: string;
  password: string;
}

export const useSchemaSignUp = () => {
  const t = useTranslations('Validation');
  return yup.object().shape({
    email: yup.string().email(t('invalidEmail')).required(t('emailRequired')),
    password: yup
      .string()
      .required(t('passwordRequired'))
      .min(8, t('passwordMinLength', { length: 8 }))
      .matches(/\p{L}/u, t('passwordLetter'))
      .matches(/\d/, t('passwordNumber'))
      .matches(/[@$!%*?&]/, t('passwordSpecialChar', { example: '@$!%*?&' })),
  });
};
