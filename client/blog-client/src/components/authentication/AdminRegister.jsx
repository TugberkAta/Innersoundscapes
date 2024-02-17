import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaSignInAlt, FaHome } from "react-icons/fa";
import InputDefault from "../formUtils.jsx/Input/InputDefault";
import { RiErrorWarningLine } from "react-icons/ri";

const AdminRegister = ({ displayMode, userData }) => {
  const methods = useForm();
  const [success, setSuccess] = useState(true);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/register-admin/${userData.uuid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      console.log(response.ok);
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

  return userData ? (
    <div
      className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover md:h-screen h-full ${
        displayMode
          ? "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/blog-client/src/assets/stacked-waves-haikei-2.svg')]"
          : "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/blog-client/src/assets/stacked-waves-haikei-3.svg')]"
      }`}
    >
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="flex flex-col gap-6 shadow-md p-12 rounded-md border-t-4 rounded-t-none border-cyan-400 bg-slate-100">
            {!success && (
              <p className="flex transition-all text-xs w-fit p-2 rounded-lg items-center gap-2 bg-red-500 text-white">
                <RiErrorWarningLine />
                Wrong admin key
              </p>
            )}
            <InputDefault
              id="adminKey"
              type="password"
              placeholder="***"
              labelText="Admin Key"
              setSuccess={setSuccess}
            />

            <div className="flex justify-center w-56">{!success && null}</div>
            <button
              className=" p-2 bg-blue-500 w-full text-white rounded-sm"
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
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  ) : (
    <></>
  );
};

AdminRegister.propTypes = {
  displayMode: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default AdminRegister;
