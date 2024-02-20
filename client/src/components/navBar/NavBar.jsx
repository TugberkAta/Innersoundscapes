import NavBarLinks from "./NavBarLinks";
import NavBarSocial from "./NavBarSocial";
import PropTypes from "prop-types";
// React icons
import { GiSoundWaves } from "react-icons/gi";
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import {
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

const NavBar = ({ userData, toggleHamburger, setToggleHamburger }) => {
  return (
    <>
      <nav className="h-16 bg-black flex items-center justify-between">
        <div className="flex items-center ">
          <div className="text-white flex items-center ml-6 gap-4 text-pretty font-montserrat font-extralight">
            <a href="/homepage">
              Inner<span className="text-purple-400">Soundscapes</span>
            </a>
            <GiSoundWaves color="white" size={32} />
          </div>
          {/* Navbar menu for bigger screens*/}
          <div className="hidden md:flex gap-4 ml-11 font-mono text-sm font-bold">
            <NavBarLinks
              linkAddress="/Alternative"
              linkName="Alternative"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="/psychedelia"
              linkName="Psychedelia"
            ></NavBarLinks>
            <NavBarLinks
              linkAddress="/progressive"
              linkName="Progressive"
            ></NavBarLinks>
            <NavBarLinks linkAddress="/punk" linkName="Punk"></NavBarLinks>
            <NavBarLinks
              linkAddress="/turkish-scene"
              linkName="Turkish Scene"
            ></NavBarLinks>
          </div>
        </div>
        {/*Login button that only shows up on bigger screens*/}
        <div className="hidden xl:flex items-center gap-8">
          {userData.adminStatus ? (
            <a
              href="/create-article"
              className="text-white font-mono text-sm font-bold p-2 border-2 rounded-sm hover:scale-105 transition-all"
            >
              Create an article
            </a>
          ) : (
            <></>
          )}
          <div className=" hidden xl:flex items-center gap-4">
            <NavBarSocial SocialLogo={FaInstagram}></NavBarSocial>
            <NavBarSocial SocialLogo={FaFacebook}></NavBarSocial>
            <NavBarSocial SocialLogo={FaXTwitter}></NavBarSocial>
            <NavBarSocial SocialLogo={FaYoutube}></NavBarSocial>
          </div>
          <a href="/log-in">
            <BsWrenchAdjustableCircle color="white" className="mr-8 size-6 " />
          </a>
        </div>
        {/* Hamburger menu toggle that only shows on small screens*/}
        <div className="h-full justify-center flex md:hidden items-center mr-6">
          <button
            type="button"
            onClick={() => setToggleHamburger(!toggleHamburger)}
          >
            <RxHamburgerMenu
              style={{ display: toggleHamburger ? "block" : "none" }}
              color="white"
            ></RxHamburgerMenu>
            <RxCross2
              style={{ display: toggleHamburger ? "none" : "block" }}
              color="white"
            ></RxCross2>
          </button>
        </div>
        {/* Hamburger menu */}
        {!toggleHamburger && (
          <>
            <nav className="flex md:hidden flex-col items-start font-mono h-fit right-0 top-[3rem] absolute z-40 bg-black w-fill">
              <NavBarLinks
                linkAddress="/Alternative"
                linkName="Alternative"
              ></NavBarLinks>
              <NavBarLinks
                linkAddress="/psychedelia"
                linkName="Psychedelia"
              ></NavBarLinks>
              <NavBarLinks
                linkAddress="/progressive"
                linkName="Progressive"
              ></NavBarLinks>
              <NavBarLinks linkAddress="/punk" linkName="Punk"></NavBarLinks>
              <NavBarLinks
                linkAddress="/turkish-scene"
                linkName="Turkish Scene"
              ></NavBarLinks>
            </nav>
            <div
              className={`w-screen md:hidden top-[3rem] bg-black opacity-40 absolute z-30 h-screen`}
            ></div>
          </>
        )}
      </nav>
    </>
  );
};

NavBar.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default NavBar;
