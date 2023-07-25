import React from "react";
import SignupIn from "../components/signup/signupIn";
export default function SignIn() {
  const userContent = [
    {
      typesign: "signin",
      label: "Email",
      placeholder: "  test@example.com",
      type: "email",
      warninglabel: "",
    },
    {
      typesign: "signin",
      label: "Password",
      placeholder: "  Your Password",
      type: "password",
      warninglabel: "",
    },
  ];
  const authQuestion = {
    question: "Don't have an account?",
    button: "Sign Up",
  };
  return (
    <div>
      <SignupIn
        whichSign="signin"
        userContent={userContent}
        authQuestion={authQuestion}
      />
    </div>
  );
}
