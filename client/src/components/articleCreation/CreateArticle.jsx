import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import React, { useState } from "react";
import InputUserPredetermined from "../formUtils.jsx/PredeterminedInput/InputPredetermined";
import TextAreaArticle from "../formUtils.jsx/Input/TextAreaArticle";
import InputDefault from "../formUtils.jsx/Input/InputDefault";
import CheckboxInput from "../formUtils.jsx/Input/CheckboxInput";

const CreateArticle = ({ displayMode, userData }) => {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [paragraphArray, setParagraphArray] = useState([]);

  const onSubmit = methods.handleSubmit(async (data) => {
    const formData = {
      ...data,
      paragraphArray: paragraphArray,
    };
    try {
      console.log(formData);
      const response = await fetch(
        "https://www.innersoundscapes.com/api/article/create-article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setSuccess(true);
        methods.reset();
        setParagraphArray([]);
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
      className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover h-full ${
        displayMode
          ? "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/src/assets/stacked-waves-haikei-2.svg')]"
          : "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/src/assets/stacked-waves-haikei-3.svg')]"
      }`}
    >
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="flex flex-col justify-center gap-6 shadow-md px-24 py-6 rounded-md border-t-4 rounded-t-none border-cyan-400  bg-slate-100 mt-16 mb-16">
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
                predeterminedValue={userData.firstName}
              />
              <InputUserPredetermined
                id="lastName"
                type="input"
                placeholder="Last name..."
                labelText="Last Name"
                setSuccess={setSuccess}
                predeterminedValue={userData.lastName}
              />
            </div>
            <InputDefault
              id="articleHeader"
              type="input"
              placeholder="Header..."
              labelText="Header"
              setSuccess={setSuccess}
            ></InputDefault>{" "}
            <TextAreaArticle
              setParagraphArray={setParagraphArray}
              paragraphArray={paragraphArray}
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
              <p className="flex justify-center text-xl font-medium border-b-2 w-9/12">
                Tags
              </p>
              <div className="grid grid-cols-2 ">
                <CheckboxInput
                  id="genreAlternative"
                  placeholder=""
                  labelText="Alternative"
                  setSuccess={setSuccess}
                ></CheckboxInput>
                <CheckboxInput
                  id="genrePsychedelia"
                  type="checkbox"
                  placeholder=""
                  labelText="Psychedelia"
                  setSuccess={setSuccess}
                ></CheckboxInput>
                <CheckboxInput
                  id="genreProgressive"
                  type="checkbox"
                  placeholder=""
                  labelText="Progressive"
                  setSuccess={setSuccess}
                ></CheckboxInput>
                <CheckboxInput
                  id="genrePunk"
                  type="checkbox"
                  placeholder=""
                  labelText="Punk"
                  setSuccess={setSuccess}
                ></CheckboxInput>
                <CheckboxInput
                  id="genreTurkishScene"
                  type="checkbox"
                  placeholder=""
                  labelText="Turkish Scene"
                  setSuccess={setSuccess}
                ></CheckboxInput>
              </div>
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
