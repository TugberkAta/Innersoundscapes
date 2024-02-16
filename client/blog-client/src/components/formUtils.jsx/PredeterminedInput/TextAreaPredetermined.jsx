import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { isFormInvalid } from "../../../utils/isFormValid";
import { findInputError } from "../../../utils/inputError";
import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TextAreaPredetermined = ({
  id,
  labelText,
  setSuccess,
  setParagraphArray,
  paragraphArray,
  predeterminedArray,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [paragraph, setParagraph] = useState("");
  const [currentDisplayPage, setCurrentDisplayPage] = useState(0);

  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  const validationRules = {
    required: {
      value: true,
      message: "required",
    },
  };

  useEffect(() => {
    if (isInvalid) {
      setSuccess(false);
    }
  }, [isInvalid, setSuccess]);

  // UseEffect to load predeterminedArray on render
  useEffect(() => {
    if (predeterminedArray && predeterminedArray.length > 0) {
      setParagraphArray(predeterminedArray); // Initialize paragraphArray with predeterminedArray
      setParagraph(predeterminedArray[0] || ""); // Optionally, initialize the textarea with the first paragraph
    }
  }, [predeterminedArray, setParagraphArray]);

  useEffect(() => {
    console.log(paragraphArray);
  }, [paragraphArray]);

  useEffect(() => {
    console.log(currentDisplayPage);
    console.log(paragraphArray);
    console.log(paragraphArray[currentDisplayPage]);
  }, [currentDisplayPage, paragraphArray]);

  function onAdd() {
    // Check if the paragraph has any text
    if (paragraph.trim() === "") {
      return 0;
    }
    //if we are not on the current page update the paragraph
    if (currentDisplayPage < paragraphArray.length) {
      const updatedParagraphs = [...paragraphArray];
      updatedParagraphs[currentDisplayPage] = paragraph.trim();
      setParagraphArray(updatedParagraphs);
      setCurrentDisplayPage(paragraphArray.length);
    } else {
      // add new paragraph
      setParagraphArray([...paragraphArray, paragraph.trim()]);
      setCurrentDisplayPage(paragraphArray.length + 1);
    }
    // Update the displayed paragraph with an empty field
    setParagraph("");
  }

  function onDelete() {
    // Check if there's anything to delete.
    if (paragraphArray.length > 0) {
      // Create a new array without the current paragraph.
      const updatedParagraphs = paragraphArray.filter(
        (_, index) => index !== currentDisplayPage
      );
      setParagraphArray(updatedParagraphs);

      const newDisplayPage =
        currentDisplayPage > 0 ? currentDisplayPage - 1 : 0; // Adjust the current display page if we're at the end of the array.
      setCurrentDisplayPage(newDisplayPage);
      // Update the displayed paragraph to the new current page's paragraph, or empty if none.
      setParagraph(
        newDisplayPage < updatedParagraphs.length
          ? updatedParagraphs[newDisplayPage]
          : ""
      );
    }
  }

  const handleMessageChange = (event) => {
    setParagraph(event.target.value);
  };

  // Function to handle the right-click event for pagination.
  function onRightClick() {
    setCurrentDisplayPage((prevCurrentDisplayPage) => {
      const nextPage = prevCurrentDisplayPage + 1; // Calculate the next page number based on the current page.
      // Check if the next page is within the bounds of the paragraphArray.
      if (nextPage < paragraphArray.length) {
        setParagraph(paragraphArray[nextPage]); // Update the paragraph content to the content of the next page.
        return nextPage;
      } else if (nextPage === paragraphArray.length) {
        // If navigating to a page beyond the last content page, clear the paragraph.
        setParagraph("");
        return nextPage;
      }
      return prevCurrentDisplayPage;
    });
  }

  // Function to handle the left-click event for pagination.
  function onLeftClick() {
    setCurrentDisplayPage((prevCurrentDisplayPage) => {
      const prevPage = prevCurrentDisplayPage - 1; // Calculate the next page number based on the current page.
      // Check if the next page is within the bounds of the paragraphArray.
      if (prevPage >= 0) {
        setParagraph(paragraphArray[prevPage]); // Update the paragraph content to the content of the next page.
        return prevPage;
      }
      return prevCurrentDisplayPage;
    });
  }

  return (
    <>
      <div className="flex flex-col w-96 text-sm">
        <div className="w-full flex justify-between mb-1 items-center">
          <label htmlFor={id}>{labelText}</label>
          <div className="flex gap-3 items-center">
            <p>Viewing paragraph {currentDisplayPage + 1}</p>
            <button onClick={onLeftClick}>
              <FaArrowLeft></FaArrowLeft>
            </button>
            <button onClick={onRightClick}>
              <FaArrowRight></FaArrowRight>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {" "}
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
        <textarea
          id={id}
          className="border-2 rounded-md p-1 min-h-64 max-h-96"
          name={id}
          value={paragraph}
          onInput={handleMessageChange}
          {...register(id, validationRules)}
        />
        <div className="flex w-full justify-between mt-1 items-center">
          <div className="flex gap-3 items-center">
            <button onClick={onDelete}>
              <MdDelete className="fill-red-500 h-5 w-5"></MdDelete>
            </button>
            <p>Delete Paragraph</p>
          </div>
          <div className="flex gap-3 items-center">
            <p>Paragraph count is {paragraphArray.length}</p>
            <button onClick={onAdd} className="h-5 w-5">
              <FaPlus></FaPlus>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 max-w-56 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

TextAreaPredetermined.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  setSuccess: PropTypes.func.isRequired,
  setParagraphArray: PropTypes.func.isRequired,
  paragraphArray: PropTypes.array.isRequired,
  predeterminedArray: PropTypes.array.isRequired,
};

InputError.propTypes = {
  message: PropTypes.string,
};

export default TextAreaPredetermined;
