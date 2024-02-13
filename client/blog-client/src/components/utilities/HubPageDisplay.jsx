import PropTypes from "prop-types";
import ArticleDisplay from "../utilities/ArticleDisplay";

const GenreDisplay = ({ loading, displayDataArray, categoryName }) => {
  return (
    <>
      <h1 className="font-mono text-2xl ml-16 mt-4 font-extrabold">
        {categoryName}
      </h1>
      {loading ? null : (
        <div className="flex flex-col w-screen items-center">
          <div className="grid grid-cols-4 gap-2 grid-rows-3 [&>*:first-child]:row-span-2 [&>*:first-child]:col-span-3 w-10/12 mt-4">
            {/* Render the first 7 items */}
            {displayDataArray.slice(0, 7).map((displayData) => (
              /* Target the container to specialize it in css cause tailwind doesn't seem to work */
              <ArticleDisplay
                key={displayData.id}
                displayData={displayData}
                classNameSpecifier="big-article-container"
              />
            ))}
          </div>
          {/* Render the content after the 7th child in a container */}
          <div className="grid grid-cols-3 gap-2 grid-rows-1 w-10/12 mt-4 mb-8">
            {displayDataArray.slice(7).map((displayData) => (
              <ArticleDisplay key={displayData.id} displayData={displayData} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

GenreDisplay.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  displayDataArray: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  categoryName: PropTypes.string,
};

export default GenreDisplay;
