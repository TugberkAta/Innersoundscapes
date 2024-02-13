import PropTypes from "prop-types";

const ArticleDisplay = ({ displayData, classNameSpecifier, key }) => {
  return (
    <a
      href={"/article-" + displayData.uuid}
      className={`${classNameSpecifier} relative font-mono  overflow-hidden`}
      key={key}
    >
      <div className="absolute w-full h-full shadow-inline-article z-10 "></div>
      <img
        className="relative object-cover w-full h-full"
        src={displayData.imgUrl}
        alt={displayData.imgAlt}
      />
      <p className="headline-background absolute z-20 bottom-2 left-3 text-sm text-white">
        {displayData.articleHeader}
      </p>
    </a>
  );
};

ArticleDisplay.propTypes = {
  displayData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  classNameSpecifier: PropTypes.string,
  key: PropTypes.string.isRequired,
};

export default ArticleDisplay;
