import { object, string } from "yup";

const NAME_MIN_LENGTH = 3;
const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 5;

export const registerFormSchema = object({
  name: string()
    .required("Name Is Required.")
    .min(NAME_MIN_LENGTH,`Name Must Be Of Atleast ${NAME_MIN_LENGTH} Characters.`),
  username: string()
    .required("Username Is Required.")
    .min(USERNAME_MIN_LENGTH, `Username Must Be Of Atleast ${USERNAME_MIN_LENGTH} Characters.`),
  password: string()
    .required("Password Is Required.")
    .min(PASSWORD_MIN_LENGTH, `Password Must Be Of Atleast ${PASSWORD_MIN_LENGTH} Characters.`),
});

export const loginFormSchema = object({
    username: string()
    .required("Username Is Required.")
    .min(USERNAME_MIN_LENGTH, `Username Must Be Of Atleast ${USERNAME_MIN_LENGTH} Characters.`),
  password: string()
    .required("Password Is Required.")
    .min(PASSWORD_MIN_LENGTH, `Password Must Be Of Atleast ${PASSWORD_MIN_LENGTH} Characters.`),
});
