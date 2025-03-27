import { ChangeEvent, FormEvent, useState } from "react";
import { data, NavLink } from "react-router";
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
      await loginFormSchema.validateAt(fieldName, stateData);
      setErrors({ ...errors, [fieldName]: undefined });
    } catch (validationError: any) {
      setErrors({ ...errors, [fieldName]: validationError.message });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // Check for errors on submitting as well.
      // Clear previous errors if any.
      setErrors({});
      const validData = await loginFormSchema.validate(stateData, {
        abortEarly: false,
      });
    } catch (validationErrors: any) {
      // If validation fails, set the errors
      const newErrors: Partial<LoginFormType> = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path as keyof CustomFormValidationErrorType] =
          error.message;
      });
      setErrors(newErrors);
    }
  }

  function handleReset() {
    setStateData(initialLoginFormStateData);
    setErrors({});
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
