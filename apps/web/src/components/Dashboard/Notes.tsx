import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function Notes() {
  const Fakenotes = [
    {
      topic: "Topic 1 : intro to sql",
      date: "22/5/2024",
      note: "consectetur adipiscing elit, sed do",
    },
    {
      topic: "Topic 1 : intro to sql",
      date: "22/5/2024",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    },
  ];
  return (
    <div className="rounded-3xl bg-white p-5 pb-0">
      <p className="text-secondary-gray text-center text-3xl font-bold">
        My Notes
      </p>
      {/* notes */}
      <div className="my-5 flex flex-col gap-2">
        {Fakenotes.slice(0, 2).map((note, index) => (
          <div
            key={index}
            className="border-s-IEEEorange flex flex-col gap-3 rounded-xl border-[1px] border-s-4 p-3"
          >
            <div className="flex flex-wrap justify-between">
              <p className="text-secondary-gray text-lg">{note.topic}</p>
              <p className="text-zinc-400">{note.date}</p>
            </div>
            <p className="text-secondary-gray line-clamp-2 text-ellipsis">
              {note.note}...
            </p>
          </div>
        ))}
        <Link
          to={"/notes"}
          className="text-IEEEorange group mt-2 flex cursor-pointer items-center justify-center gap-1 text-xl font-bold"
        >
          <p>View All</p>
          <span className="transition-all duration-200 group-hover:translate-x-1.5">
            <ChevronRight />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Notes;
