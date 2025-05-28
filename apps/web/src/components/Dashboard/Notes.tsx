import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Notes() {
    const Fakenotes = [
        { topic: 'Topic 1 : intro to sql', date: '22/5/2024', note: 'consectetur adipiscing elit, sed do' },
        { topic: 'Topic 1 : intro to sql', date: '22/5/2024', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' },
    ]
    return (
        <div className="bg-white p-5 rounded-3xl pb-0">
            <p className="text-3xl font-bold text-center text-secondary-gray">My Notes</p>
            {/* notes */}
            <div className="flex flex-col gap-2 my-5">
                {
                    Fakenotes.slice(0, 2).map((note, index) =>
                        <div key={index} className="flex flex-col gap-3 rounded-xl border-s-IEEEorange border-s-4 border-[1px] p-3">
                            <div className="flex flex-wrap justify-between">
                                <p className="text-secondary-gray text-lg">{note.topic}</p>
                                <p className="text-zinc-400">{note.date}</p>
                            </div>
                            <p className="text-secondary-gray text-ellipsis line-clamp-2">{note.note}...</p>
                        </div>
                    )
                }
                <Link to={'/notes'} className="justify-center text-xl font-bold text-IEEEorange group flex cursor-pointer items-center gap-1 mt-2">
                    <p>View All</p>
                    <span className="transition-all duration-200 group-hover:translate-x-1.5">
                        <ChevronRight/>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Notes