import PropTypes from "prop-types";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const EditArticleButton = ({ userData }) => {
  const { id } = useParams();

  return userData.adminStatus ? (
    <a
      className="flex items-center justify-center rounded-md h-5 absolute left-2 top-1 z-30"
      href={`/article/${id}/edit`}
    >
      <FaEdit className="fill-blue-300 size-5" />
    </a>
  ) : (
    <></>
  );
};

EditArticleButton.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default EditArticleButton;
