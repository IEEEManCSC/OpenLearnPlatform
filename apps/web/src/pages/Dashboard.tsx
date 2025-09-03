import CourseStatus from "../components/Dashboard/CourseStatus";
import RankNotes from "../components/Dashboard/RankNotes";

function Dashboard() {
  return (
    <main className="mx-auto flex w-[90%] flex-wrap items-start gap-10 py-2 pe-4">
      <div className="w-[100%] lg:w-[60%]">
        <CourseStatus />
      </div>
      <div className="w-[100%] lg:w-[30%]">
        <RankNotes />
      </div>
    </main>
  );
}

export default Dashboard;
