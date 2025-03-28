import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import userService from "../services/user-service";
import { AxiosError } from "axios";
import { registerFormSchema } from "../helpers/yup-schema-validation-helper";
import { ValidationError } from "yup";

export interface RegisterFormType {
  name: string;
  username: string;
  password: string;
  about?: string;
}

interface CustomFormValidationErrorType {
  name?: string;
  username?: string;
  password?: string;
}

const initialRegisterFormStateData = {
  name: "",
  username: "",
  password: "",
  about: "",
};

function Register() {
  console.log("Register Page Rendered !!");

  const [stateData, setStateData] = useState<RegisterFormType>(initialRegisterFormStateData);

  const [errors, setErrors] = useState<CustomFormValidationErrorType>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setStateData((oldStateData) => {
      return { ...oldStateData, [event.target.name]: event.target.value };
    });
  }

  async function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    //Check for errors on blur event.
    const fieldName = event.target.name;
    try {
      await registerFormSchema.validateAt(fieldName, stateData);
      setErrors({ ...errors, [fieldName]: undefined });
    } catch (validationError: any) {
      setErrors({ ...errors, [fieldName]: validationError.message });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      // Check for errors on submitting as well.
      const validData = await registerFormSchema.validate(stateData, {abortEarly: false,});
      const response = await userService.registerUser(validData);
      console.log("User Registered Successfully !!", response.data);
      setErrors({});
      setStateData(initialRegisterFormStateData);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const newErrors: Partial<RegisterFormType> = {};
        error.inner.forEach((error: any) => {
          newErrors[error.path as keyof CustomFormValidationErrorType] =
            error.message;
        });
        setErrors(newErrors);
      } else if (error instanceof AxiosError) {
        if (error.status === 409) {
          console.log("User Already Registered !!");
        } else if (error.status === 400) {
          console.log("Bad Request !!");
          setErrors(error.response?.data.errors);
        }
      } else {
        console.log("Something Went Wrong !!", error);
      }
    }
  }

  function handleReset() {
    setStateData(initialRegisterFormStateData);
    setErrors({});
  }

  return (
    <div className="Register container" style={{ minHeight: "500px" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Card
            className="my-2 shadow"
            style={{ backgroundColor: "rgb(255,255,255,0.4)" }}
          >
            <CardHeader>
              <h2 style={{ textAlign: "center" }}>REGISTER NOW</h2>
            </CardHeader>
            <CardBody>
              <div className="RegisterForm">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      type="text"
                      value={stateData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors?.name ? true : false}
                    />
                    <FormFeedback>{errors?.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter Username"
                      type="text"
                      value={stateData.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors?.username ? true : false}
                    />
                    <FormFeedback>{errors?.username}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                      value={stateData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors?.password ? true : false}
                    />
                    <FormFeedback>{errors?.password}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      id="about"
                      name="about"
                      type="textarea"
                      value={stateData.about}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div className="container text-center">
                    <Button className="btn btn-sm">Submit</Button>
                    <Button
                      className="btn btn-sm btn-danger ms-2"
                      type="reset"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
            <CardFooter className="text-center">
              <NavLink to="/login">
                Already Registered ? Click Here To Login.
              </NavLink>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;