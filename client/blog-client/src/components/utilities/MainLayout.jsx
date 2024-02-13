import { useEffect, useState } from "react";
import NavBar from "../navBar/NavBar";
import PropTypes from "prop-types";
import HubPageDisplay from "./HubPageDisplay";

const MainLayout = ({ userData, articleAddress, categoryName }) => {
  const [displayDataArray, setDisplayDataArray] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/article/" + articleAddress,
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
  }, []);

  useEffect(() => {
    if (!displayDataArray) {
      setLoading(true);
    } else setLoading(false);
    console.log(displayDataArray);
  }, [displayDataArray]);

  return (
    <>
      <NavBar userData={userData}></NavBar>
      <HubPageDisplay
        loading={loading}
        displayDataArray={displayDataArray}
        categoryName={categoryName}
      ></HubPageDisplay>
    </>
  );
};

MainLayout.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  articleAddress: PropTypes.string,
  categoryName: PropTypes.string,
};

export default MainLayout;
