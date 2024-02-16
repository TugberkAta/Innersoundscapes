import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { isFormInvalid } from "../../../utils/isFormValid";
import { findInputError } from "../../../utils/inputError";
import { useEffect } from "react";

const InputPredetermined = ({
  id,
  type,
  placeholder,
  labelText,
  setSuccess,
  predeterminedValue,
  changeable,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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

  return (
    <div className="flex flex-col w-56">
      <label htmlFor={id}>{labelText}</label>
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
      <input
        id={id}
        className={`border-2 rounded-md p-1 ${
          changeable ? "" : "pointer-events-none text-green-500"
        }`}
        type={type}
        placeholder={placeholder}
        name={id}
        defaultValue={predeterminedValue}
        {...register(id, validationRules)}
      />
    </div>
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

InputPredetermined.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  setSuccess: PropTypes.func.isRequired,
  predeterminedValue: PropTypes.string.isRequired,
  changeable: PropTypes.bool,
};

InputError.propTypes = {
  message: PropTypes.string,
};

export default InputPredetermined;
