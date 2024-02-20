import PropTypes from "prop-types";

const NavBarLinks = ({ linkName, linkAddress }) => {
  return (
    <>
      <a
        href={linkAddress}
        className="text-white pr-6 p-5 md:pr-2 w-full md:w-auto hover:text-purple-400 hover:bg-white transition"
      >
        {linkName}
      </a>
    </>
  );
};

NavBarLinks.propTypes = {
  linkName: PropTypes.string.isRequired,
  linkAddress: PropTypes.string.isRequired,
};

export default NavBarLinks;
