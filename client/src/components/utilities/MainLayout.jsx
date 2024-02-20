import { useEffect, useState } from "react";
import NavBar from "../navBar/NavBar";
import PropTypes from "prop-types";
import React from "react";

const MainLayout = ({
  userData,
  articleCategory,
  categoryName,
  DisplayComponent,
}) => {
  const [displayDataArray, setDisplayDataArray] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggleHamburger, setToggleHamburger] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/article/" + articleCategory,
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
        setDisplayDataArray(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [articleCategory]);

  useEffect(() => {
    if (!displayDataArray) {
      setLoading(true);
    } else setLoading(false);
  }, [displayDataArray]);

  return (
    <>
      <div
        className={`${
          !toggleHamburger
            ? "h-screen overflow-y-hidden md:overflow-y-auto"
            : ""
        }`}
      >
        <NavBar
          userData={userData}
          toggleHamburger={toggleHamburger}
          setToggleHamburger={setToggleHamburger}
        ></NavBar>
        <DisplayComponent
          loading={loading}
          displayDataArray={displayDataArray}
          categoryName={categoryName}
        />
      </div>
    </>
  );
};

MainLayout.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  articleCategory: PropTypes.string,
  categoryName: PropTypes.string,
  DisplayComponent: PropTypes.elementType,
};

export default MainLayout;
