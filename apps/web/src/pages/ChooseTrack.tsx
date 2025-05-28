import Flutter from "../../public/trackIcons/4fd5520fe28ebf839174 1.svg?react";
import DataScience from "../../public/trackIcons/cib_tensorflow.svg?react";
import Ui from "../../public/trackIcons/figma.svg?react";
import Backend from "../../public/trackIcons/Frame 1261156619.svg?react";
import DataEngineering from "../../public/trackIcons/Frame 1261156626.svg?react";
import Embedded from "../../public/trackIcons/Mask group.svg?react";
import Frontend from "../../public/trackIcons/html-5.svg?react";
import Cyber from "../../public/trackIcons/security-safe.svg?react";
import Frame from '../../public/trackIcons/Frametrack.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function ChooseTrack() {
  const tracks = [
    { name: "UI/UX", icon: Ui },
    { name: "Frontend", icon: Frontend },
    { name: "Flutter", icon: Flutter },
    { name: "Backend", icon: Backend },
    { name: "Data Science", icon: DataScience },
    { name: "Data Engineering", icon: DataEngineering },
    { name: "Embedded Systems", icon: Embedded },
    { name: "Cyber Security", icon: Cyber },
  ];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const [selected, setSelected] = useState("");
  const navigate=useNavigate()
  return (
    <div className="bg-gray-50 min-h-screen ">
      <img src={Frame} alt=""  />
      <div className=" sm:text-2xl text-xl lg:-mt-10 lg:w-2/3 sm:10/12 w-11/12 m-auto">
        <div>
          <p className="text-center font-semibold mb-5">
            which track are you interested in?
          </p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  className={`font-semibold flex flex-col gap-2 items-center ${selected === t.name
                      ? "bg-IEEEorange text-white"
                      : "text-IEEEorange bg-white"
                    } cursor-pointer text-center rounded-md p-5 py-10 shadow-md`}
                  onClick={() => setSelected(t.name)}
                >
                  <Icon />
                  <p>{t.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <p className="text-center font-semibold mb-5">
            What is your current level in Programming Basics
          </p>
          <div className="flex gap-8 self-center">
            <div className="flex justify-between sm:gap-5 gap-2 w-full md:mb-10 mb-5">
              {levels.map((l) => (
                <div className="flex sm:gap-2 gap-1 items-center sm:text-2xl xs:text-lg text-base ">
                  <input type="radio" name="level" className="sm:w-5 sm:h-5 peer" />
                  {/* checked:accent-IEEEorange   */}
                  <p className="peer-checked:text-IEEEorange">{l}</p>
                </div>
              ))}
            </div>
            <div className="h-10 w-10 bg-IEEEorange rounded-full md:flex hidden items-center justify-center cursor-pointer" onClick={()=>navigate('/')}>
              <ChevronRight color="white" />
            </div>
          </div>
          <div className=" flex md:hidden items-center justify-end cursor-pointer" onClick={()=>navigate('/')}>
            <ChevronRight color="white" className="h-8 w-8 bg-IEEEorange rounded-full mb-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseTrack;
