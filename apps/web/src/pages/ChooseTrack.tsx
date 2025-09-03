import Flutter from "../../public/trackIcons/4fd5520fe28ebf839174 1.svg?react";
import DataScience from "../../public/trackIcons/cib_tensorflow.svg?react";
import Ui from "../../public/trackIcons/figma.svg?react";
import Backend from "../../public/trackIcons/Frame 1261156619.svg?react";
import DataEngineering from "../../public/trackIcons/Frame 1261156626.svg?react";
import Embedded from "../../public/trackIcons/Mask group.svg?react";
import Frontend from "../../public/trackIcons/html-5.svg?react";
import Cyber from "../../public/trackIcons/security-safe.svg?react";
import Frame from "../../public/trackIcons/Frametrack.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { register } from "../services/authService";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function ChooseTrack() {
  const { username, email, password, discordUsername } = useAuthStore();

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
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await register(username, email, password, discordUsername, selected);
      toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50"
      style={{
        backgroundImage: `url("${Frame}")`, // Replace with your actual frame image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="sm:10/12 z-10 m-auto w-11/12 text-xl sm:text-2xl lg:-mt-10 lg:w-2/3">
        <div>
          <p className="mb-5 text-center font-semibold">
            which track are you interested in?
          </p>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  className={`flex flex-col items-center gap-2 font-semibold ${
                    selected === t.name
                      ? "bg-IEEEorange text-white"
                      : "text-IEEEorange bg-white"
                  } cursor-pointer rounded-md p-5 py-10 text-center shadow-md`}
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
          <p className="mb-5 text-center font-semibold">
            What is your current level in Programming Basics
          </p>
          <div className="flex gap-8 self-center">
            <div className="mb-5 flex w-full justify-between gap-2 sm:gap-5 md:mb-10">
              {levels.map((l) => (
                <div className="xs:text-lg flex items-center gap-1 text-base sm:gap-2 sm:text-2xl">
                  <input
                    type="radio"
                    name="level"
                    className="peer sm:h-5 sm:w-5"
                  />
                  {/* checked:accent-IEEEorange   */}
                  <p className="peer-checked:text-IEEEorange">{l}</p>
                </div>
              ))}
            </div>
            <div
              className="bg-IEEEorange hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full md:flex"
              onClick={() => {
                // handeSubmit();
              }}
            >
              <ChevronRight color="white" />
            </div>
          </div>
          <div
            className="flex cursor-pointer items-center justify-end md:hidden"
            onClick={() => {
              handleSubmit();
            }}
          >
            <ChevronRight
              color="white"
              className="bg-IEEEorange mb-5 h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseTrack;
