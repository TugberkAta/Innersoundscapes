import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState, React } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { FaSignInAlt, FaHome } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import InputDefault from "../formUtils.jsx/Input/InputDefault";
import serverUrl from "../../helper/clientUrl";

const LoginForm = ({ displayMode, userData }) => {
  const methods = useForm();
  const [success, setSuccess] = useState(true);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await fetch(serverUrl + "/users/log-in", {
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
        window.location.href = "/homepage";
      } else if (response.status === 400) {
        setSuccess(false);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccess(false);
    }
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
            {!success && (
              <p className="flex transition-all text-xs w-fit p-2 rounded-lg items-center gap-2 bg-red-500 text-white">
                <RiErrorWarningLine />
                Username or password is wrong
              </p>
            )}
            <InputDefault
              id="username"
              type="text"
              placeholder="Username"
              labelText="User Name"
              setSuccess={setSuccess}
            />
            <InputDefault
              id="password"
              type="password"
              placeholder="***"
              labelText="Password"
              setSuccess={setSuccess}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-sm"
              onClick={onSubmit}
            >
              Submit
            </button>
            <div>
              <a
                href="/register"
                className="flex items-center gap-2 text-blue-400 m-0 hover:text-blue-600"
              >
                <FaSignInAlt />
                If you have not registered yet{" "}
              </a>
              <a
                href="/homepage"
                className="flex items-center gap-2 text-blue-400 m-0 hover:text-blue-600"
              >
                <FaHome />
                Return to homepage{" "}
              </a>
              {userData && (
                <a
                  className="flex items-center gap-2 text-blue-400 m-0 hover:text-blue-600"
                  href={"/register-admin/" + userData.uuid}
                >
                  <GrUserAdmin />
                  Admin activation
                </a>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

LoginForm.propTypes = {
  displayMode: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default LoginForm;
