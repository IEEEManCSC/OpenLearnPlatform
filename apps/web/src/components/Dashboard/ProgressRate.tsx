import { LuChartNoAxesColumn } from "react-icons/lu";
import ProgressBar from "../global/ProgressBar";

const ProgressRate = () => {
  const fakeProg = [
    {
      progress: 40,
      title: "Course Completed",
      currentProg: 4,
    },
    {
      progress: 70,
      title: "Quizzes Completed",
      currentProg: 12,
    },
    {
      progress: 40,
      title: "Topics Completed",
      currentProg: 8,
    },
  ];

  return (
    <div className="mt-6 w-full rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 pb-4 font-semibold">
        <span>
          <LuChartNoAxesColumn size={25} />
        </span>
        Progress
      </h2>

      {fakeProg.map((item) => (
        <div key={item.title}>
          <div className="relative -my-2 flex items-center">
            <h3 className="text-secondary-gray pt-2 font-semibold">
              {" "}
              {item.title}{" "}
            </h3>
            <span className="text-IEEEorange absolute top-2.5 right-0 text-sm font-semibold">
              {" "}
              {item.currentProg}{" "}
              <sub className="text-secondary-gray font-normal"> /15 </sub>{" "}
            </span>
          </div>
          <ProgressBar
            progress={item.progress}
            topicName={item.title}
            key={item.title}
            hideLabel={true}
            height={8}
            bgColor={"fff6e6"}
          />
        </div>
      ))}
    </div>
  );
};

export default ProgressRate;
