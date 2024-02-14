import PropTypes from "prop-types";
import ArticlePicture from "./ArticlePicture";
import ArticlePreview from "../utilities/ArticlePreview";

const ArticleLayout = ({
  displayData,
  recommendationDataArray,
  loadingRecommendations,
  loading,
}) => {
  return (
    <>
      <div className="flex justify-center mt-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 w-10/12">
          <div className="flex flex-col lg:w-9/12">
            {loading || !displayData ? null : (
              <>
                <ArticlePicture displayData={displayData} />
                <h1 className="text-2xl font-bold mt-2 mb-4 ">
                  {displayData.articleHeader}
                </h1>
                <p className="w-11/12 border-l-2 pl-4 -ml-4 font-inter">
                  {displayData.mainBody}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 md:w-8/12 lg:w-4/12">
            {loadingRecommendations
              ? null
              : recommendationDataArray
                  .slice(0, 4)
                  .map((displayData) => (
                    <ArticlePreview
                      key={displayData.id}
                      displayData={displayData}
                      classNameSpecifier={"medium-preview"}
                    />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
};

ArticleLayout.propTypes = {
  displayData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  recommendationDataArray: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  loading: PropTypes.bool,
  loadingRecommendations: PropTypes.bool,
};

export default ArticleLayout;
