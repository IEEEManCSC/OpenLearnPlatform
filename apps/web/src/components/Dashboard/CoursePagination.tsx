import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const CoursePagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className="mt-3 flex items-center justify-center gap-2 text-gray-600">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer disabled:opacity-50"
      >
        <HiChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`h-7 w-7 cursor-pointer rounded-md transition-all duration-300 ${
            i + 1 === currentPage
              ? "bg-lightOrange text-IEEEorange"
              : "hover:text-IEEEorange"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer disabled:opacity-50"
      >
        <HiChevronRight />
      </button>
    </div>
  );
};

export default CoursePagination;
