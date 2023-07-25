import React, { useState, useContext } from "react";
import SignupIn from "../components/signup/signupIn";

export default function Signup() {
  const userContent = [
    {
      typesign: "signup",
      label: "Full Name",
      placeholder: "  John Doe",
      type: "text",
      warninglabel: "Name should be at least 4 characters.",
    },
    {
      typesign: "signup",
      label: "Email",
      placeholder: "  test@example.com",
      type: "email",
      warninglabel: "Email is not valid.",
    },
    {
      typesign: "signup",
      label: "Password",
      placeholder: "  Your Password",
      type: "password",
      warninglabel: "Password is required.",
    },
  ];
  const authQuestion = {
    question: "Already have an account?",
    button: "Sign In",
  };

  return (
    <div>
      <SignupIn
        whichSign="signup"
        userContent={userContent}
        authQuestion={authQuestion}
        // currentUserinfo={currentUserinfo}
        // setCurrentUserinfo={setCurrentUserinfo}
      />
    </div>
  );
}
