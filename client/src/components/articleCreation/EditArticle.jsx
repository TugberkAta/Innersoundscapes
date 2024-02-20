import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputPredetermined from "../formUtils.jsx/PredeterminedInput/InputPredetermined";
import TextAreaPredetermined from "../formUtils.jsx/PredeterminedInput/TextAreaPredetermined";
import CheckboxInputPredetermined from "../formUtils.jsx/PredeterminedInput/CheckboxInputPredetermined";

const EditArticle = ({ displayMode, userData }) => {
  const [displayData, setDisplayData] = useState();
  const { id } = useParams();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [paragraphArray, setParagraphArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.innersoundscapes.com/api/article/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDisplayData(result[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = methods.handleSubmit(async (data) => {
    paragraphArray.push(data.mainBody);
    const formData = {
      ...data,
      paragraphArray: paragraphArray,
    };
    try {
      const response = await fetch(
        `https://www.innersoundscapes.com/api/article/${id}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
    <>
      {displayData && userData ? (
        <div
          className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover h-full ${
            displayMode
              ? "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/src/assets/stacked-waves-haikei-2.svg')]"
              : "bg-[url('/Users/tugberk/Documents/repos/Active-Node-Projects/Restful_Blog_Website/client/src/assets/stacked-waves-haikei-3.svg')]"
          }`}
        >
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="flex flex-col justify-center gap-6 shadow-md px-24 py-6 rounded-md border-t-4 rounded-t-none border-cyan-400 bg-slate-100 mt-16 mb-16">
                <h1 className="flex justify-center text-2xl font-semibold">
                  EDIT ARTICLE
                </h1>
                <div className="flex gap-2 items-center w-96">
                  <InputPredetermined
                    id="firstName"
                    type="input"
                    placeholder="First name.."
                    labelText="First Name"
                    predeterminedValue={displayData.firstName}
                    setSuccess={setSuccess}
                    changeable={true}
                  ></InputPredetermined>
                  <InputPredetermined
                    id="lastName"
                    type="input"
                    placeholder="Last name.."
                    labelText="Last Name"
                    predeterminedValue={displayData.lastName}
                    setSuccess={setSuccess}
                    changeable={true}
                  ></InputPredetermined>
                </div>
                <InputPredetermined
                  id="articleHeader"
                  type="input"
                  placeholder="Header..."
                  labelText="Header"
                  predeterminedValue={displayData.articleHeader}
                  setSuccess={setSuccess}
                  changeable={true}
                ></InputPredetermined>{" "}
                <TextAreaPredetermined
                  setParagraphArray={setParagraphArray}
                  paragraphArray={paragraphArray}
                  id="mainBody"
                  labelText="Body"
                  setSuccess={setSuccess}
                  predeterminedArray={displayData.paragraphArray}
                ></TextAreaPredetermined>
                <div className="flex flex-col gap-3 items-center ">
                  <InputPredetermined
                    id="imgUrl"
                    type="input"
                    placeholder="Url..."
                    labelText="Image Url"
                    setSuccess={setSuccess}
                    predeterminedValue={displayData.imgUrl}
                    changeable={true}
                  ></InputPredetermined>
                  <InputPredetermined
                    id="imgAlt"
                    type="input"
                    placeholder="Description..."
                    labelText="Image Description"
                    setSuccess={setSuccess}
                    predeterminedValue={displayData.imgAlt}
                    changeable={true}
                  ></InputPredetermined>
                  <p className="flex justify-center text-xl font-medium border-b-2 w-9/12">
                    Tags
                  </p>
                  <div className="grid grid-cols-2 ">
                    <CheckboxInputPredetermined
                      id="genreAlternative"
                      labelText="Alternative"
                      predeterminedValue={displayData.genreTag.genreAlternative}
                      setSuccess={setSuccess}
                    ></CheckboxInputPredetermined>
                    <CheckboxInputPredetermined
                      id="genrePsychedelia"
                      type="checkbox"
                      labelText="Psychedelia"
                      predeterminedValue={displayData.genreTag.genrePsychedelia}
                      setSuccess={setSuccess}
                    ></CheckboxInputPredetermined>
                    <CheckboxInputPredetermined
                      id="genreProgressive"
                      type="checkbox"
                      labelText="Progressive"
                      predeterminedValue={displayData.genreTag.genreProgressive}
                      setSuccess={setSuccess}
                    ></CheckboxInputPredetermined>
                    <CheckboxInputPredetermined
                      id="genrePunk"
                      type="checkbox"
                      labelText="Punk"
                      predeterminedValue={displayData.genreTag.genrePunk}
                      setSuccess={setSuccess}
                    ></CheckboxInputPredetermined>
                    <CheckboxInputPredetermined
                      id="genreTurkishScene"
                      type="checkbox"
                      labelText="Turkish Scene"
                      predeterminedValue={
                        displayData.genreTag.genreTurkishScene
                      }
                      setSuccess={setSuccess}
                    ></CheckboxInputPredetermined>
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
      ) : (
        <></>
      )}
    </>
  );
};

EditArticle.propTypes = {
  displayMode: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default EditArticle;
