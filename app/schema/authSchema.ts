import { string, number, object } from "yup"

const loginSchema = object({
  phoneNumber: number().positive().integer()
    .test(
      'is-of-10-length',
      'Invalid Phone Number',
      (value) => value?.toString().length === 10,
    )
    .typeError("Enter a valid Phone Number")
    .required(),
  otp: number().positive().integer()
    .typeError("Enter a valid OTP")
  // .test(
  //   'is-of-6-length',
  //   'OTP must be of 6 digits',
  //   (value) => value?.toString().length === 6,
  // ),
})

const registerSchema = object({
  name: string().required().label("Name"),
  email: string().email().required().label("Email"),
})

export { loginSchema, registerSchema }
