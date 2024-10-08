import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import PropTypes from "prop-types";
import React from "react";
import serverUrl from "../../helper/clientUrl";

const ArticlePage = ({ userData, categoryName, DisplayComponent }) => {
  const [displayData, setDisplayData] = useState();
  const [recommendationDataArray, setRecommendationDataArray] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const { id } = useParams();
  const [toggleHamburger, setToggleHamburger] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverUrl + `/article/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDisplayData(result[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          serverUrl + `/article/${id}/recommendation`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setRecommendationDataArray(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!displayData) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [displayData]);

  useEffect(() => {
    if (!recommendationDataArray) {
      setLoadingRecommendations(true);
    } else {
      setLoadingRecommendations(false);
    }
  }, [recommendationDataArray]);

  return (
    <>
      <NavBar
        userData={userData}
        toggleHamburger={toggleHamburger}
        setToggleHamburger={setToggleHamburger}
      ></NavBar>

      <DisplayComponent
        loading={loading}
        loadingRecommendations={loadingRecommendations}
        displayData={displayData}
        categoryName={categoryName}
        recommendationDataArray={recommendationDataArray}
        userData={userData}
      />
    </>
  );
};

ArticlePage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  categoryName: PropTypes.string,
  DisplayComponent: PropTypes.elementType,
};

export default ArticlePage;
