import * as yup from 'yup'

import VALIDATION_MESSAGES from '@/constants/validation-messages'

const exampleFormValidation = yup.object().shape({
  firstName: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  lastName: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  firstAddress: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  secondAddress: yup.string(),
  gender: yup.number(),
  checkbox: yup.array(),
  phone: yup.string(),
  email: yup.string().email(VALIDATION_MESSAGES.EMAIL_INVALID).required(VALIDATION_MESSAGES.REQUIRED),
  position: yup.string(),
  dateOfBirth: yup.string(),
  description: yup.string(),
  avatar: yup.array().required(VALIDATION_MESSAGES.REQUIRED)
})

export { exampleFormValidation }
