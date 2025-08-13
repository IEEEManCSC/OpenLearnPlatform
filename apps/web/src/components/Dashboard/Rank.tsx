import { FaAward } from "react-icons/fa6";
import Linegb from "../../../public/linebg.svg?react";
function Rank() {
  return (
    <div className="bg-lightOrange h-[218px] w-full rounded-3xl border-2 border-orange-100">
      <Linegb width="100%" className="rounded-3xl" preserveAspectRatio="none" />
      <div className="m-auto -mt-20 w-3/4 py-8">
        <p className="text-IEEEorange text-2xl font-semibold">Rank</p>
        <div className="text-IEEEorange m-auto mt-5 w-fit text-5xl font-semibold">
          44
          <sub className="font-normal text-orange-300"> /50 </sub>
        </div>
        <div className="text-IEEEorange my-5 flex items-center justify-center gap-1 text-xl">
          <FaAward className="text-2xl" />
          <p>Top 8% of students</p>
        </div>
      </div>
    </div>
  );
}

export default Rank;
