import PropTypes from "prop-types";
import ArticlePreview from "./ArticlePreview";
import React from "react";
import "ldrs/mirage";

const HubPageDisplay = ({ loading, displayDataArray, categoryName }) => {
  return (
    <>
      <h1 className="font-mono text-2xl ml-10 md:ml-16 mt-4 font-extrabold">
        {categoryName}
      </h1>
      {loading ? (
        // Put a loading spinner when the content has'nt loaded
        <div className="w-full flex h-[calc(100vh-8rem)] border1 items-center justify-center">
          <l-mirage size="60" speed="2.5" color="purple"></l-mirage>
        </div>
      ) : (
        <div className="flex flex-col w-screen items-center">
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2 xl:grid-rows-3 md:grid-rows-2 md:[&>*:first-child]:row-span-2 md:[&>*:first-child]:col-span-3 xl:[&>*:first-child]:row-span-2 xl:[&>*:first-child]:col-span-3 w-10/12 mt-4">
            {/* Render the first 7 items */}
            {displayDataArray.slice(0, 7).map((displayData) => (
              /* Target the container to specialize it in css cause tailwind doesn't seem to work */
              <ArticlePreview
                key={displayData.id}
                displayData={displayData}
                classNameSpecifier="big-article-container"
              />
            ))}
          </div>
          {/* Render the content after the 7th child in a container */}
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 grid-rows-1 w-10/12 mt-2 md:mt-4 mb-8">
            {displayDataArray.slice(7).map((displayData) => (
              <ArticlePreview key={displayData.id} displayData={displayData} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

HubPageDisplay.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  displayDataArray: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  categoryName: PropTypes.string,
};

export default HubPageDisplay;
