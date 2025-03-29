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
import { loginFormSchema } from "../helpers/yup-schema-validation-helper";
import LoginAndRegisterService from "../services/login-and-register-service";
import { ValidationError } from "yup";
import { AxiosError } from "axios";

export interface LoginFormType {
  username: string;
  password: string;
}

const initialLoginFormStateData = {
  username: "",
  password: "",
};

interface CustomFormValidationErrorType {
  username?: string;
  password?: string;
}

function Login() {
  console.log("Login Page Rendered !!");

  const [stateData, setStateData] = useState<LoginFormType>(
    initialLoginFormStateData
  );

  const [validationErrors, setValidationErrors] = useState<CustomFormValidationErrorType>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setStateData((oldStateData) => {
      return { ...oldStateData, [event.target.name]: event.target.value };
    });
  }

  async function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    //Check for errors on blur event.
    const fieldName = event.target.name;
    try {
      await loginFormSchema.validateAt(fieldName, stateData);
      setValidationErrors({ ...validationErrors, [fieldName]: undefined });
    } catch (error: any) {
      setValidationErrors({ ...validationErrors, [fieldName]: error.message });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // Check for errors on submitting as well.
      // Clear previous errors if any.
      setValidationErrors({});
      const validLoginRequestData = await loginFormSchema.validate(stateData, {abortEarly: false});
      const response = await LoginAndRegisterService.performLogin(validLoginRequestData);
      const user = response.data;

      //Extract The Token From Header
      const token = "DEMO-TOKEN-FOR-NOW";
      LoginAndRegisterService.performOperationsOnLogin(token, user);
      handleReset();
      console.log("Login Successful !!")
    } catch (error: any) {
      if (error instanceof ValidationError) {
        // If validation fails, set the errors
        const newErrors: Partial<LoginFormType> = {};
        error.inner.forEach((error: any) => {
          newErrors[error.path as keyof CustomFormValidationErrorType] =
            error.message;
        });
        setValidationErrors(newErrors);
      } else if (error instanceof AxiosError) {
        console.log("Login Failed !!", error.response?.data.message);
      } else {
        console.log("Something Went Wrong !!", error);
      }
    }
  }

  function handleReset() {
    setStateData(initialLoginFormStateData);
    setValidationErrors({});
  }

  return (
    <div className="Login container" style={{ minHeight: "500px" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Card
            className="my-2 shadow"
            style={{ backgroundColor: "rgb(255,255,255,0.4)" }}
          >
            <CardHeader>
              <h2 style={{ textAlign: "center" }}>LOGIN</h2>
            </CardHeader>
            <CardBody>
              <div className="LoginForm">
                <Form onSubmit={handleSubmit}>
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
                      invalid={validationErrors?.username ? true : false}
                    />
                    <FormFeedback>{validationErrors?.username}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                      autoComplete="off"
                      value={stateData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={validationErrors?.password ? true : false}
                    />
                    <FormFeedback>{validationErrors?.password}</FormFeedback>
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
              <NavLink to="/register" style={{ color: "red" }}>
                Haven't Registered Yet ? Register Now !!
              </NavLink>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
