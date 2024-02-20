import PropTypes from "prop-types";
import DeleteArticle from "../articleCreation/DeleteArticle";
import EditArticleButton from "../articleCreation/EditArticleButton";

const ArticlePicture = ({ displayData, userData }) => {
  return (
    <div
      href={"/article/" + displayData.uuid}
      className={`big-article-img relative font-mono overflow-hidden`}
    >
      <div className="absolute w-full h-full z-10 "></div>
      <img
        className="relative object-cover w-full h-full"
        src={displayData.imgUrl}
        alt={displayData.imgAlt}
      />
      <DeleteArticle userData={userData}></DeleteArticle>
      <EditArticleButton userData={userData}></EditArticleButton>
    </div>
  );
};

ArticlePicture.propTypes = {
  displayData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ArticlePicture;
