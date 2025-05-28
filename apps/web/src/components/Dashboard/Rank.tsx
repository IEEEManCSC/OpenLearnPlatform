import { FaAward } from "react-icons/fa6";
import Linegb from '../../../public/linebg.svg?react'
function Rank() {
    return (
        <div className='bg-lightOrange rounded-3xl h-[218px] border-2 border-orange-100 w-full'>
            <Linegb width="100%" className="rounded-3xl" preserveAspectRatio="none" />
            <div className="-mt-20 w-3/4 m-auto py-8">
                <p className="text-IEEEorange font-semibold text-2xl">Rank</p>
                <div className="text-IEEEorange text-5xl font-semibold mt-5 w-fit m-auto">
                    44
                    <sub className="text-orange-300 font-normal"> /50 </sub>
                </div>
                <div className="flex items-center justify-center my-5 text-IEEEorange gap-1 text-xl">
                    <FaAward className="text-2xl" />
                    <p>Top 8% of students</p>
                </div>
            </div>

        </div>
    )
}

export default Rank