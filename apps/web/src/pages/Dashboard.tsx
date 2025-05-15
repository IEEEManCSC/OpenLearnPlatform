import CourseStatus from '../components/Dashboard/CourseStatus';

function Dashboard() {
  return (
    <main className="mx-auto flex w-[80%] flex-wrap items-start gap-10 py-2 pe-4 md:gap-6">
      <div className="w-[100%] md:w-[55%] lg:w-[60%]">
        <CourseStatus />
      </div>
      <div className="bg-PlaceHolderGray w-[100%] md:w-[40%] lg:w-[30%]">
        right
      </div>
    </main>
  );
}

export default Dashboard;
