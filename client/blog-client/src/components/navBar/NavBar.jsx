import NavBarLinks from "./NavBarLinks";
import NavBarSocial from "./NavBarSocial";
// React icons
import { GiSoundWaves } from "react-icons/gi";
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import {
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

const NavBar = () => {
  return (
    <>
      <div className="h-16 bg-black flex items-center justify-between">
        <div className="flex items-center ">
          <p className="text-white flex items-center gap-4 ml-6 text-pretty font-montserrat font-thin">
            Inner Soundscapes
            <GiSoundWaves color="white" size={32} />
          </p>
          <div className="flex gap-4 ml-11 font-mono text-sm font-bold">
            <NavBarLinks
              linkAddress="http://localhost:5173/homepage"
              linkName="Alternative"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/homepage"
              linkName="Psychedelia"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/homepage"
              linkName="Progressive"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/homepage"
              linkName="Punk"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="http://localhost:5173/homepage"
              linkName="Turkish Scene"
            ></NavBarLinks>
          </div>
        </div>
        <div className="flex items-center gap-8">
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

export default NavBar;
