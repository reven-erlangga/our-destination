import React, { useContext, useState } from "react";

import "./Auth.css";

import Card from "../../shared/components/UIElements/Card";
import Input from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/components/formelements/input";
import Button from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/components/formelements/button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/util/validators";
import { useForm } from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  const switchModeHandler = (event) => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "Sign Up"}
        </Button>
      </form>

      <Button inverse onClick={switchModeHandler}>
        Switch to {isLoginMode ? "Sign up" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
