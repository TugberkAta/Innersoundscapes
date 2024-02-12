import NavBar from "./navBar/NavBar";
import PropTypes from "prop-types";

const HomePage = ({ userData }) => {
  return (
    <>
      <NavBar userData={userData}></NavBar>
    </>
  );
};

HomePage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default HomePage;
