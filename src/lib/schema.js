import * as yup from 'yup';

const LoginSchema = yup.object().shape({
    email: yup.string().required('Please enter email').email('Please enter valid email'),
    password: yup.string().required('Please enter password')
})

const ForgotPasswordSchema = yup.object().shape({
    email: yup.string().required('Please enter email').email('Please enter valid email')
})

const OTPSchema = yup.object().shape({
    otp: yup.string().required('Please enter OTP').length(4, "OTP must be 4 digits")
})


const ResetPasswordSchema = yup.object().shape({
    new_password: yup.string()
        .required("Please enter new password")
        .min(8, "New password must be more than 8 characters long including lower case, upper case, number and a special character")
        .matches(/[A-Z]/, "New password must be more than 8 characters long including lower case, upper case, number and a special character")
        .matches(/[a-z]/, "New password must be more than 8 characters long including lower case, upper case, number and a special character")
        .matches(/[0-9]/, "New password must be more than 8 characters long including lower case, upper case, number and a special character")
        .matches(/[@$!%*?&#]/, "New password must be more than 8 characters long including lower case, upper case, number and a special character"),
    confirm_password: yup.string().required('Please enter confirm password').oneOf([yup.ref('new_password'), null], ' New password and confirm password does not match')
})

const LetterSoundsSchema = yup.object().shape({
    // word: yup.string().required('Please enter word name'),
    level: yup.string().required('Please enter level'),
    sound: yup.mixed().required("Please select sound").test('Required', 'Please select sound', (value) => {
        return value
    }),
    image: yup.mixed().required("Please select image").test('Required', 'Please select image', (value) => {
        return value
    }),
    script: yup.string().required("Please enter script")
})

const PronunciationSchema = yup.object().shape({
    word: yup.string().required('Please enter word name'),
    level: yup.string().required('Please enter level'),
    sound: yup.mixed().required("Please select sound").test('Required', 'Please select sound', (value) => {
        return value
    }),
    image: yup.mixed().required("Please select image").test('Required', 'Please select image', (value) => {
        return value
    }),
    script: yup.string().required("Please enter script")
})


export { LoginSchema, ForgotPasswordSchema, OTPSchema, ResetPasswordSchema, LetterSoundsSchema, PronunciationSchema }