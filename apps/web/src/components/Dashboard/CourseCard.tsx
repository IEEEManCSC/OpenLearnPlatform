import { HiChevronRight, HiMiniClock } from 'react-icons/hi2';
import ProgressBar from '../global/ProgressBar';

type Props = {
  title: string;
  time: string;
  progress: number;
};

const CourseCard: React.FC<Props> = ({ title, time, progress }) => {
  return (
    <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-medium text-gray-900 max-sm:text-[16px] lg:text-2xl">
          {title}
        </h2>
        <div className="text-IEEEorange flex items-center gap-1 rounded bg-orange-100 px-3 py-1 text-sm">
          <span>
            <HiMiniClock color="#F7A501" size={18} />
          </span>
          <span>{time}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative py-5">
        <span className="absolute top-0 right-0"> {progress}% </span>
        <ProgressBar progress={progress} />
      </div>

      {/* Continue Button */}
      <div className="mt-4 flex w-full flex-col items-center justify-center text-center">
        <button className="text-IEEEorange group flex cursor-pointer items-center gap-1 font-semibold">
          Tap to Continue
          <span className="transition-all duration-200 group-hover:translate-x-1.5">
            <HiChevronRight />
          </span>
        </button>
        <div className="bg-IEEEorange mt-1 h-0.5 w-28" />
      </div>
    </div>
  );
};

export default CourseCard;
