import React from "react";

import "./Auth.css";

import Card from "../../shared/components/UIElements/Card";
import Input from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/components/formelements/input";
import Button from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/components/formelements/button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/util/validators";
import { useForm } from "c:/users/erlangga/downloads/react-frontend-28-login-form-auth-page/react-frontend-27-login-form-auth-page/src/shared/hooks/form-hook";

const Auth = () => {
  const [formState, inputHandler] = useForm(
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
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
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
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
