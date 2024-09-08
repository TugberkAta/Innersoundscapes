import { FormProvider, useForm } from "react-hook-form";
import InputSignUp from "./InputSignUp";
import PropTypes from "prop-types";
import { FaSignInAlt, FaHome } from "react-icons/fa";
import { useState, React } from "react";
import serverUrl from "../../helper/clientUrl";

const SignUpForm = ({ displayMode }) => {
  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await fetch(serverUrl + "/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess(true);
        methods.reset();
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    methods.reset();
    window.location.href = "/log-in";
  });

  return (
    <div
      className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover md:h-screen h-full ${
        displayMode
          ? "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/src/assets/stacked-waves-haikei-2.svg')]"
          : "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/src/assets/stacked-waves-haikei-3.svg')]"
      }`}
    >
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="flex flex-col gap-6 shadow-md p-12 rounded-md border-t-4 rounded-t-none border-cyan-400 bg-slate-100">
            <InputSignUp
              id="firstName"
              type="text"
              placeholder="First name..."
              labelText="First Name"
              setSuccess={setSuccess}
            />
            <InputSignUp
              id="lastName"
              type="text"
              placeholder="Last Name..."
              labelText="Last Name"
              setSuccess={setSuccess}
            />
            <InputSignUp
              id="username"
              type="text"
              placeholder="User name..."
              labelText="Username"
              setSuccess={setSuccess}
            />
            <InputSignUp
              id="password"
              type="password"
              placeholder="***"
              labelText="Password"
              regEx={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/}
              minLength={8}
              setSuccess={setSuccess}
            />
            <InputSignUp
              id="repeatPassword"
              type="password"
              placeholder="***"
              labelText="Repeat Password"
              setSuccess={setSuccess}
            />
            <div className="flex justify-center w-56">
              {success && (
                <p className="flex font-semibold text-green-500">
                  Sign up was successful
                </p>
              )}
              {!success && <></>}
            </div>
            <button
              className=" p-2 bg-blue-500 text-white rounded-sm"
              onClick={onSubmit}
            >
              Submit
            </button>
            <div>
              <a
                href="/log-in"
                className="flex items-center gap-2 text-blue-400 m-0 hover:text-blue-600"
              >
                <FaSignInAlt />
                Login Page
              </a>
              <a
                href="/homepage"
                className="flex items-center gap-2 text-blue-400 m-0 hover:text-blue-600"
              >
                <FaHome />
                Return to homepage{" "}
              </a>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

SignUpForm.propTypes = {
  displayMode: PropTypes.bool.isRequired,
};

export default SignUpForm;
