import PropTypes from "prop-types";
import ArticlePicture from "./ArticlePicture";
import ArticlePreview from "../utilities/ArticlePreview";
import React from "react";
import "ldrs/mirage";
import { motion, useScroll } from "framer-motion";

const ArticleLayout = ({
  displayData,
  recommendationDataArray,
  loadingRecommendations,
  loading,
  userData,
}) => {
  const date = displayData ? new Date(displayData.date_of_article) : null;
  const { scrollYProgress } = useScroll();

  return displayData ? (
    <>
      <div className="flex justify-center mb-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-16 w-10/12 items-start">
          <div className="flex flex-col lg:w-9/12">
            {loading || !displayData ? null : (
              <>
                <motion.div
                  className="bg-gray-700  w-full top-0 h-1 left-0 z-40 fixed lg:hidden"
                  style={{
                    transformOrigin: "left",
                    scaleX: scrollYProgress,
                  }}
                />
                <ArticlePicture userData={userData} displayData={displayData} />
                <h1 className="text-2xl font-bold mt-2 mb-4 ">
                  {displayData.articleHeader}
                </h1>
                <div className="w-full flex justify-between mb-2 font-mono text-gray-500">
                  <p>
                    Author: {displayData.firstName + " " + displayData.lastName}
                  </p>
                  <p>
                    {" "}
                    {date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
                <div className="w-11/12 border-l-2 pl-4 -ml-4 font-inter flex flex-col gap-8">
                  {displayData.paragraphArray.map((paragraph, index) => (
                    <p key={index}> {paragraph}</p>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-4/12">
            {loadingRecommendations
              ? null
              : recommendationDataArray
                  .slice(0, 4)
                  .map((displayData) => (
                    <ArticlePreview
                      key={displayData.id}
                      displayData={displayData}
                      classNameSpecifier={"medium-preview "}
                    />
                  ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    // Put a loading spinner when the content hasn't loaded
    <div className="w-full flex h-[calc(100vh-8rem)] border1 items-center justify-center">
      <l-mirage size="60" speed="2.5" color="purple"></l-mirage>
    </div>
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
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ArticleLayout;
