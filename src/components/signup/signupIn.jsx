import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../signup/signup.css";
import signContext from "../../context/signContext";
import { useNavigate } from "react-router-dom";

export default function SignupIn({ whichSign, userContent, authQuestion }) {
  const location = useLocation();
  const socialmedia = [
    {
      svg: (
        <svg
          t="1688183700521"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1819"
          width="20"
          height="20"
        >
          <path
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z"
            fill="#ffffff"
            p-id="1820"
          ></path>
        </svg>
      ),
      text: "Continue with Facebook",
      cName: "media_fb",
    },
    {
      svg: (
        <svg
          t="1688183777294"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2355"
          width="20"
          height="20"
        >
          <path
            d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"
            fill="#4A4A4A"
            p-id="2356"
          ></path>
        </svg>
      ),
      text: "Continue with Google",
      cName: "media_google",
    },
    {
      svg: (
        <svg
          t="1688188322278"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2973"
          width="20"
          height="20"
        >
          <path
            d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
            fill="#ffffff"
            p-id="2974"
          ></path>
        </svg>
      ),
      text: "Continue with Github",
      cName: "media_github",
    },
  ];
  let matchfullName = `^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$`;
  let regfullName = new RegExp(matchfullName, "i");

  let matchEmail = `^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$`;
  let regEmail = new RegExp(matchEmail, "i");

  // AT least one upper case, one lower case, minimum 8 in length
  let matchPassword = `^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$`;
  let regPassword = new RegExp(matchPassword, "i");

  let passwordlengthValidation = `.{8,}`;
  let regPassword_length = new RegExp(passwordlengthValidation, "i");

  let passwordUppercaseValidation = `(?=.*?[A-Z]).{8,}`;
  let regPassword_uppercase = new RegExp(passwordUppercaseValidation, "g");

  const { signupInfo, setSignupInfo, ifsigned, setIfsigned } =
    useContext(signContext);
  const [currentUserinfo, setCurrentUserinfo] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [inputValidation, setInputValidation] = useState({
    validateFullname: "* Full Name",
    validateEmail: "* Email",
    validatePassword: "* Password",
  });
  const [validName, setValidName] = useState("* Full Name");
  const [validEmail, setValidEmail] = useState("* Email");
  const [incorrectwarn, setIncorrectWarn] = useState(false);
  const [couldnotFindWarn, setcouldnotFindWarn] = useState(false);
  useEffect(
    (e) => {
      //Full name
      if (
        regfullName.test(currentUserinfo.fullname) === false &&
        currentUserinfo.fullname?.length !== 0
      ) {
        // setInputValidation({
        //   ...inputValidation,
        //   validateFullname: "Name should be at least 4 characters.",
        // });
        // setInputValidation({
        //   ...inputValidation,
        //   validateFullname: "hahahahah",
        // });
        setValidName("Name should be at least 4 characters.");
      } else if (regfullName.test(currentUserinfo.fullname) === true) {
        // setInputValidation({
        //   ...inputValidation,
        //   validateFullname: "* Full Name",
        // });
        setValidName("* Full Name");
      }
      //Email
      if (
        regEmail.test(currentUserinfo.email) === false &&
        currentUserinfo.email?.length !== 0
      ) {
        // setInputValidation({
        //   ...inputValidation,
        //   validateEmail: "Email is not valid.",
        // });
        setValidEmail("Email is not valid.");
      } else if (regEmail.test(currentUserinfo.email) === true) {
        // setInputValidation({
        //   ...inputValidation,
        //   validateEmail: "* Email",
        // });
        setValidEmail("* Email");
      }
      //Password
      if (
        regPassword_length.test(currentUserinfo.password) === false &&
        currentUserinfo.password?.length !== 0
      ) {
        setInputValidation({
          ...inputValidation,
          validatePassword: "Password length should be at least 8 characters.",
        });
      } else if (
        regPassword_uppercase.test(currentUserinfo.password) === false &&
        currentUserinfo.password?.length !== 0
      ) {
        setInputValidation({
          ...inputValidation,
          validatePassword:
            "Password should contain at least 1 uppercase letter.",
        });
      } else if (regPassword.test(currentUserinfo.password) === true) {
        setInputValidation({
          ...inputValidation,
          validatePassword: "* Password",
        });
      }
      // For label className
    },
    [currentUserinfo.fullname, currentUserinfo.email, currentUserinfo.password]
  );

  //跳转
  const navigate = useNavigate();
  useEffect(() => {
    if (ifsigned === true) {
      navigate("/");
    }
  }, [ifsigned]);

  const handleinputChange = (e) => {
    if (whichSign === "signup") {
      if (e.target.type === "text") {
        setCurrentUserinfo({ ...currentUserinfo, fullname: e.target.value });
      } else if (e.target.type === "email") {
        setCurrentUserinfo({ ...currentUserinfo, email: e.target.value });
      } else if (e.target.type === "password") {
        setCurrentUserinfo({ ...currentUserinfo, password: e.target.value });
      }
    } else {
      if (e.target.type === "email") {
        setCurrentUserinfo({ ...currentUserinfo, email: e.target.value });
      } else if (e.target.type === "password") {
        setCurrentUserinfo({ ...currentUserinfo, password: e.target.value });
      }
    }
  };
  // Jump to Home page after signed up
  const sendinputtoSignup = (e) => {
    if (location.pathname === "/signup") {
      setIfsigned(true);
      setSignupInfo(currentUserinfo);
      localStorage.setItem("token", JSON.stringify(currentUserinfo));
    } else if (location.pathname === "/signin") {
      let localemail = JSON.parse(localStorage.getItem("token"))?.email;
      let localpassword = JSON.parse(localStorage.getItem("token"))?.password;

      if (
        localemail === currentUserinfo?.email &&
        localpassword === currentUserinfo?.password
      ) {
        setIfsigned(true);
        setSignupInfo(currentUserinfo);
      }
      //  else if (localStorage =) {
      //   setIfsigned(false);
      //   setcouldnotFindWarn(true);
      //   console.log("please sign up");
      // }
      else {
        setIfsigned(false);
        setIncorrectWarn(true);
      }
    }
  };

  return (
    <div>
      <div className="authContent">
        <div
          className={
            incorrectwarn ? "incorrectWarning" : "incorrectWarning_hidden"
          }
        >
          Incorrect Email or Password. Please{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            Sign Up
          </Link>{" "}
          If You are New User
        </div>

        {/* <div className="incorrectWarning">Incorrect email or password</div> */}
        <div className="authContent_center">
          {/* {whichSign === "Signup" ? (
            <h3 className="authContent_title">Sign up to Viva</h3>
          ) : (
            <h3 className="authContent_title">Sign in to Viva</h3>
          )} */}
          <h3 className="authContent_title">
            Sign {whichSign.slice(-2)} to Viva
          </h3>
          <div className="authContent_user">
            <div className="authContent_info">
              <div className="alluserinfo">
                {location.pathname === "/signup" ? (
                  <>
                    <label
                      htmlFor=""
                      className={
                        validName === "* Full Name"
                          ? "eachfiledlabel"
                          : `eachfiledlabelred`
                      }
                    >
                      {validName}
                    </label>
                    <input
                      type="text"
                      // className="eachfiledinput"
                      className={
                        validName === "* Full Name"
                          ? "eachfiledinput"
                          : `eachfiledinputred`
                      }
                      placeholder="John Doe"
                      onChange={(e) =>
                        setCurrentUserinfo({
                          ...currentUserinfo,
                          fullname: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor=""
                      className={
                        validEmail === "* Email"
                          ? "eachfiledlabel"
                          : `eachfiledlabelred`
                      }
                    >
                      {validEmail}
                    </label>
                    <input
                      type="email"
                      className={
                        validEmail === "* Email"
                          ? "eachfiledinput"
                          : `eachfiledinputred`
                      }
                      placeholder="test@example.com"
                      onChange={(e) =>
                        setCurrentUserinfo({
                          ...currentUserinfo,
                          email: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor=""
                      className={
                        inputValidation.validatePassword === "* Password"
                          ? "eachfiledlabel"
                          : `eachfiledlabelred`
                      }
                    >
                      {inputValidation.validatePassword}
                    </label>
                    <input
                      type="password"
                      className={
                        inputValidation.validatePassword === "* Password"
                          ? "eachfiledinput"
                          : `eachfiledinputred`
                      }
                      placeholder="Your Password"
                      onChange={(e) =>
                        setCurrentUserinfo({
                          ...currentUserinfo,
                          password: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <label
                      htmlFor=""
                      className={
                        validEmail === "* Email"
                          ? "eachfiledlabel"
                          : `eachfiledlabelred`
                      }
                    >
                      {validEmail}
                    </label>
                    <input
                      type="email"
                      className={
                        validEmail === "* Email"
                          ? "eachfiledinput"
                          : `eachfiledinputred`
                      }
                      placeholder="test@example.com"
                      onChange={(e) =>
                        setCurrentUserinfo({
                          ...currentUserinfo,
                          email: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor=""
                      className={
                        inputValidation.validatePassword === "* Password"
                          ? "eachfiledlabel"
                          : `eachfiledlabelred`
                      }
                    >
                      {inputValidation.validatePassword}
                    </label>
                    <input
                      type="password"
                      className={
                        inputValidation.validatePassword === "* Password"
                          ? "eachfiledinput"
                          : `eachfiledinputred`
                      }
                      placeholder="Your Password"
                      onChange={(e) =>
                        setCurrentUserinfo({
                          ...currentUserinfo,
                          password: e.target.value,
                        })
                      }
                    />
                  </>
                )}

                {/* {userContent.map((eachfield, index) => {
                  return (
                    <>
                      <div className="eachfiledlabel">
                        {console.log(
                          "inputValidation",
                          inputValidation,
                          "+++",
                          eachfield,
                          "---",
                          eachfield.inputValidation
                        )}
                        {eachfield?.warninglabel}
                      </div>
                      <input
                        typesign={eachfield.typesign}
                        type={eachfield.type}
                        placeholder={eachfield.placeholder}
                        className="eachfiledinput"
                        key={eachfield.type}
                        onChange={(e) => {
                          handleinputChange(e);
                        }}
                      />
                    </>
                  );
                })} */}
              </div>
              <div className="flexbutton">
                {whichSign === "signup" ? (
                  <div className="forgotPassw_butt"></div>
                ) : (
                  <div className="forgotPassw_butt">Forgot Password?</div>
                )}

                <button
                  className="signUp"
                  onClick={() => {
                    sendinputtoSignup();
                  }}
                >
                  {location.pathname === "/signup" ? "Sign Up" : "Sign In"}
                  <svg
                    t="1688184809125"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1951"
                    width="20"
                    height="20"
                    className="svgarrowright icon"
                  >
                    <path
                      d="M1024.2048 512c0 6.656-2.4576 13.2608-7.5264 18.2784l-325.8368 325.8368a25.6 25.6 0 1 1-36.1984-36.1984l282.5216-282.5216H25.8048a25.6 25.6 0 1 1 0-51.2h910.9504l-282.112-282.112a25.6 25.6 0 1 1 36.1984-36.1984l325.8368 325.8368c4.608 4.608 7.5264 11.008 7.5264 18.0736V512z"
                      fill="#ffffff"
                      p-id="1952"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="authContent_line">
              <div className="line"></div>
              <div className="or">OR</div>
              <div className="line"></div>
            </div>
            <div className="socialmedia">
              <div className="allsocialmediainfo">
                {socialmedia.map((eachsocialmedia, index) => {
                  return (
                    <div className="userinformation" key={index}>
                      <div
                        className={eachsocialmedia.cName}
                        id="eachsocialmedia_css"
                      >
                        <div className="eachsocialM">{eachsocialmedia.svg}</div>
                        <div className="eachsocialtext">
                          {eachsocialmedia.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="authMessage">
            <div className="checkquestion">{authQuestion.question}</div>
            {whichSign === "signup" ? (
              <Link to="/signin">
                <button className="signin_butt">{authQuestion.button}</button>
              </Link>
            ) : (
              <Link to="/signup">
                <button className="signin_butt">{authQuestion.button}</button>
              </Link>
            )}
            {/* <Link to="/signin">
              <button className="signin_butt">{authQuestion.button}</button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
