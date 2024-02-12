import PropTypes from "prop-types";

const HomePageDisplay = ({ loading, displayDataArray }) => {
  return (
    <>
      {loading ? null : (
        <div className="w-screen flex justify-center">
          <div className=" grid grid-cols-4 gap-2 grid-rows-3 [&>*:first-child]:row-start-1 [&>*:first-child]:row-end-3 [&>*:first-child]:col-start-1 [&>*:first-child]:col-end-3 w-10/12 mt-4">
            {displayDataArray.map((displayData) => (
              /* Target the container to specialize it in css cause tailwind does'nt seem to work */
              <div
                className="article-container relative font-mono"
                key={displayData.id}
              >
                <div className="absolute w-full h-full shadow-inline-article z-10"></div>
                <img
                  className="relative object-cover w-full h-full"
                  src={displayData.imgUrl}
                  alt={displayData.imgAlt}
                />
                <p className="headline-background absolute z-20 bottom-2 left-5 text-sm text-white ">
                  {displayData.articleHeader}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

HomePageDisplay.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  displayDataArray: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HomePageDisplay;
