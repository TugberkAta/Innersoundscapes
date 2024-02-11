import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import InputLogin from "./InputLogin";

const LoginForm = ({ displayMode }) => {
  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
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
  });

  return (
    <div
      className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover md:h-screen h-full ${
        displayMode
          ? "bg-[url('src/assets/stacked-waves-haikei-2.svg')]"
          : "bg-[url('src/assets/stacked-waves-haikei-3.svg')]"
      }`}
    >
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="flex flex-col gap-6 shadow-md p-12 rounded-md border-t-4 rounded-t-none border-cyan-400 bg-slate-100">
            <InputLogin
              id="username"
              type="text"
              placeholder="Username"
              labelText="User Name"
              setSuccess={setSuccess}
            />
            <InputLogin
              id="password"
              type="password"
              placeholder="***"
              labelText="Password"
              setSuccess={setSuccess}
            />
            <div className="flex justify-center w-56">
              {success && (
                <p className="flex font-semibold text-green-500">
                  Log in was successful
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
            <a
              href="/register"
              className="text-blue-400 m-0 hover:text-blue-600"
            >
              If you have not registered yet{" "}
            </a>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

LoginForm.propTypes = {
  displayMode: PropTypes.bool.isRequired,
};

export default LoginForm;
