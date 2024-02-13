import NavBarLinks from "./NavBarLinks";
import NavBarSocial from "./NavBarSocial";
import PropTypes from "prop-types";
// React icons
import { GiSoundWaves } from "react-icons/gi";
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import {
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

const NavBar = ({ userData }) => {
  return (
    <>
      <div className="h-16 bg-black flex items-center justify-between">
        <div className="flex items-center ">
          <div className="text-white flex items-center ml-6 gap-4 text-pretty font-montserrat font-extralight">
            <a href="/homepage">
              Inner<span className="text-purple-400">Soundscapes</span>
            </a>
            <GiSoundWaves color="white" size={32} />
          </div>
          <div className="flex gap-4 ml-11 font-mono text-sm font-bold">
            <NavBarLinks
              linkAddress="http://localhost:5173/Alternative"
              linkName="Alternative"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/psychedelia"
              linkName="Psychedelia"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/progressive"
              linkName="Progressive"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/punk"
              linkName="Punk"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/turkish-scene"
              linkName="Turkish Scene"
            ></NavBarLinks>
          </div>
        </div>
        <div className="flex items-center gap-8">
          {userData ? (
            <a
              href="/create-article"
              className="text-white  font-mono text-sm font-bold p-2 border-2 rounded-sm hover:scale-105 transition-all"
            >
              Create an article
            </a>
          ) : (
            <></>
          )}
          <div className="flex items-center gap-4">
            <NavBarSocial SocialLogo={FaInstagram}></NavBarSocial>
            <NavBarSocial SocialLogo={FaFacebook}></NavBarSocial>
            <NavBarSocial SocialLogo={FaXTwitter}></NavBarSocial>
            <NavBarSocial SocialLogo={FaYoutube}></NavBarSocial>
          </div>
          <a href="http://localhost:5173/log-in">
            <BsWrenchAdjustableCircle color="white" className="mr-8 size-6 " />
          </a>
        </div>
      </div>
    </>
  );
};

NavBar.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default NavBar;
