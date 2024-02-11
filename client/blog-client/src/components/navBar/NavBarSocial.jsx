import PropTypes from "prop-types";

const NabBarSocial = ({ SocialLogo }) => {
  return (
    <>
      <a href="http://localhost:5173/homepage">
        <SocialLogo className="size-4 fill-white hover:opacity-100 hover:scale-105 hover:fill-purple-400 transition-all opacity-85" />
      </a>
    </>
  );
};

NabBarSocial.propTypes = {
  SocialLogo: PropTypes.elementType.isRequired,
};

export default NabBarSocial;
