import { HiHandThumbDown, HiHandThumbUp } from "react-icons/hi2";
import ProgressBar from "../global/ProgressBar";

interface Topic {
  topicName: string;
  progress: number;
}

interface Values {
  title: string;
  type: "strengths" | "weak";
  topics: Topic[];
}

const EvaluationCard = ({ title, type, topics }: Values) => {
  return (
    <div className="border-border w-full rounded-xl border-[1px] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-1.5 py-2 text-xl">
        {type === "strengths" ? (
          <span className="text-main-green-100">
            <HiHandThumbUp />
          </span>
        ) : (
          <span className="text-danger-100">
            <HiHandThumbDown />
          </span>
        )}
        <h3 className="max-sm:text-sm">{title}</h3>
      </div>
      {topics.map((topic, index) => (
        <ProgressBar
          type={type}
          topicName={topic.topicName}
          progress={topic.progress}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};

export default EvaluationCard;
