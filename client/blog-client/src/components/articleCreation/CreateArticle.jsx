import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import InputUserPredetermined from "./InputPredetermined";
import TextAreaArticle from "./TextAreaArticle";
import InputHeader from "./InputHeader";
import InputDefault from "./InputDefault";

const CreateArticle = ({ displayMode, userData }) => {
  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/article/create-article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
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
    window.location.href = "/homepage";
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
          <div className="flex flex-col justify-center gap-6 shadow-md px-24 py-12 rounded-md border-t-4 rounded-t-none border-cyan-400 bg-slate-100">
            <h1 className="flex justify-center text-2xl font-semibold">
              CREATE ARTICLE
            </h1>
            <div className="flex gap-2 items-center w-96">
              <InputUserPredetermined
                id="firstName"
                type="input"
                placeholder="First Name..."
                labelText="First Name"
                setSuccess={setSuccess}
                userInfo={userData.firstName}
              />
              <InputUserPredetermined
                id="lastName"
                type="input"
                placeholder="Last name..."
                labelText="Last Name"
                setSuccess={setSuccess}
                userInfo={userData.lastName}
              />
            </div>
            <InputHeader
              id="articleHeader"
              type="input"
              placeholder="Header..."
              labelText="Header"
              setSuccess={setSuccess}
            ></InputHeader>{" "}
            <TextAreaArticle
              id="mainBody"
              labelText="Body"
              setSuccess={setSuccess}
            ></TextAreaArticle>
            <div className="flex flex-col gap-3 items-center ">
              <InputDefault
                id="imgUrl"
                type="input"
                placeholder="Url..."
                labelText="Image Url"
                setSuccess={setSuccess}
              ></InputDefault>
              <InputDefault
                id="imgAlt"
                type="input"
                placeholder="Description..."
                labelText="Image Description"
                setSuccess={setSuccess}
              ></InputDefault>
              <div className="flex justify-center w-56">
                {success && (
                  <p className="font-semibold text-green-500">
                    Post sent successfully
                  </p>
                )}
                {!success && <></>}
              </div>
              <button
                className=" w-10/12 p-2 bg-blue-500 text-white rounded-sm"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

CreateArticle.propTypes = {
  displayMode: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default CreateArticle;
