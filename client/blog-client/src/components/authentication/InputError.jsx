import { MdError } from "react-icons/md";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const InputErrorHelper = ({ message }) => {
  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  };
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

InputErrorHelper.propTypes = {
  message: PropTypes.string,
};

export default InputErrorHelper;
