import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";

const DeleteArticle = ({ userData }) => {
  const [pressed, setPressed] = useState(false);

  function onPress() {
    if (pressed) setPressed(false);
    else setPressed(true);
  }

  const { id } = useParams();

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/article/${id}/delete`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting article: ${response.statusText}`);
      }

      window.location.href = "/homepage";
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return userData.adminStatus ? (
    <>
      <button
        onClick={onPress}
        className="flex items-center justify-center rounded-md h-5 absolute right-1 top-2 z-30"
      >
        <MdDeleteForever className="fill-red-600 size-6" />
      </button>
      <form onSubmit={handleDelete}>
        <button
          className={`${
            pressed ? "block" : "hidden "
          } w-40 rounded-sm h-8 absolute bg-red-700 text-white right-1 top-12 z-30 transition-all`}
          type="submit"
        >
          Delete Article
        </button>
      </form>
    </>
  ) : (
    <></>
  );
};

DeleteArticle.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DeleteArticle;
