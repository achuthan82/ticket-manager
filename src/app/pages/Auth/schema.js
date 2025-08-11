import * as Yup from 'yup'

export const schema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .trim()
        .required('Email is required'),
    password: Yup.string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
})