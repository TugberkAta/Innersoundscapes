import { GiSoundWaves } from "react-icons/gi";
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import NavBarLinks from "../NavBarLinks";

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
              linkName="Turkish Scene"
            ></NavBarLinks>
          </div>
        </div>
        <a href="http://localhost:5173/log-in">
          <BsWrenchAdjustableCircle color="white" size={24} className="mr-8" />
        </a>
      </div>
    </>
  );
};

export default NavBar;
