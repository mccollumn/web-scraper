"use client";

import { TextFieldElement, PasswordElement } from "react-hook-form-mui";
import { FormWrapper, FormWrapperProps } from "../components/form/FormWrapper";

const Login = ({
  onLoginSubmit = () => {},
  onRegisterRedirect,
  title = "Member Login",
  description = <DefaultDescription />,
  submitButtonText = "Login",
  defaultEmail,
  defaultPassword,
  minPasswordLength = 10,
  minSpecialCharLength = 2,
  minNumberLength = 2,
  closeModal = () => {},
  ...props
}: LoginProps) => {
  const defaultValues = {
    email: defaultEmail,
    password: defaultPassword,
  };

  const onSuccess = (values: any) => {
    onLoginSubmit(values);
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  if (!description) {
    description = (
      <DefaultDescription onRegisterRedirect={onRegisterRedirect} />
    );
  }

  return (
    <FormWrapper
      onSuccess={onSuccess}
      onCancel={onCancel}
      defaultValues={defaultValues}
      title={title}
      description={description}
      submitButtonText={submitButtonText}
      {...props}
    >
      <TextFieldElement
        label="Email"
        name="email"
        type={"email"}
        validation={{
          required: "Email is required",
        }}
      />

      <PasswordElement
        label="Password"
        name="password"
        type={"password"}
        helperText={`Min length: ${minPasswordLength} | Min special characters: ${minSpecialCharLength} | Min numbers: ${minNumberLength}`}
        validation={{
          required: "Password is required",
          minLength: {
            value: minPasswordLength,
            message: `Minimum password length: ${minPasswordLength}`,
          },
          validate: {
            minSpecialChar: (p: string) =>
              matchPasswordValidate({
                p,
                minNumber: minSpecialCharLength,
                regex: specialCharacterRegex,
                message: `Min special characters: ${minSpecialCharLength}`,
              }),
            minNumber: (p: string) =>
              matchPasswordValidate({
                p,
                minNumber: minNumberLength,
                regex: numberRegex,
                message: `Min numbers: ${minNumberLength}`,
              }),
          },
        }}
      />
    </FormWrapper>
  );
};

const DefaultDescription = ({ onRegisterRedirect = () => {} }: any) => {
  const clickHandler = (event: any) => {
    event.preventDefault();
    onRegisterRedirect();
  };

  return (
    <div className="login-description">
      Don&apos;t have an account? &nbsp;&nbsp;
      <div style={{}} onClick={clickHandler}>
        Click Here
      </div>
    </div>
  );
};

const specialCharacterRegex = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~/]/g;
const numberRegex = /[0-9]/g;
const matchPasswordValidate = ({
  p = "",
  message = "",
  regex,
  minNumber,
}: any) => {
  const validArray = p.match(regex) || [];
  const isValid = validArray.length >= minNumber;
  return isValid ? true : message;
};

export interface LoginProps
  extends Omit<FormWrapperProps, "onSuccess" | "defaultValues"> {
  /**
   * Handler when Login form is submitted
   */
  onLoginSubmit?: any;
  // onLoginSubmit?: (formValues: any) => void;
  /**
   * on User redirect to "Register" page
   */
  onRegisterRedirect?: () => void;
  /**
   * Minimum password length allowed
   */
  minPasswordLength?: number;
  /**
   * Minimum special characters to include in password
   */
  minSpecialCharLength?: number;
  /**
   * Minimum special characters to include
   */
  minNumberLength?: number;
  /**
   * Populate default username field
   */
  defaultEmail?: string;
  /**
   * Populate default password field
   */
  defaultPassword?: string;
  /**
   * Injected if parent is a Modal
   */
  closeModal?: Function;
}

export default Login;
