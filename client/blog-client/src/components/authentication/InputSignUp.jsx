import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { isFormInvalid } from "../../utils/isFormValid";
import { findInputError } from "../../utils/inputError";
import { useEffect } from "react";
import InputErrorHelper from "./InputError";

const InputSignUp = ({
  id,
  type,
  placeholder,
  labelText,
  minLength,
  password,
  setSuccess,
  regEx,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  const passwordValue = watch(password);

  const validationRules = {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: minLength,
      message: `This field needs to be longer than ${minLength} characters`,
    },
    pattern: {
      value: regEx,
      message:
        "Password needs to have at least one uppercase letter and one number",
    },
  };

  //Validate if the repeatPassword field and password value match, if not send an error message.
  if (id === "repeatPassword") {
    validationRules.validate = (value) =>
      // passwordValue.password gives the password value
      value === passwordValue.password || "Passwords do not match";
  }

  useEffect(() => {
    if (isInvalid) {
      setSuccess(false);
    }
  }, [isInvalid, setSuccess]);

  return (
    <div className="flex flex-col w-56">
      <label htmlFor={id}>{labelText}</label>
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputErrorHelper
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
      <input
        id={id}
        className="border-2 rounded-md p-1"
        type={type}
        placeholder={placeholder}
        name={id}
        {...register(id, validationRules)}
      />
    </div>
  );
};

InputSignUp.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  password: PropTypes.string,
  setSuccess: PropTypes.func.isRequired,
  regEx: PropTypes.instanceOf(RegExp),
};

InputSignUp.defaultProps = {
  minLength: 1,
};

export default InputSignUp;
