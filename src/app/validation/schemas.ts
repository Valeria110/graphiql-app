import * as yup from 'yup';

export interface valuesSignUp {
  email: string;
  password: string;
}

export const schemaSignUp: yup.ObjectSchema<valuesSignUp> = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/\p{L}/u, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
});
