import CourseCard from "./CourseCard";
import CoursePagination from "./CoursePagination";
import { useState } from "react";
import EvaluationCard from "./EvaluationCard";
import ProgressRate from "./ProgressRate";

const CourseStatus = () => {
  const FakeCourses = [
    {
      title: "Intro To SQL",
      progress: 14,
      time: 35,
    },
    {
      title: "Intro To React",
      progress: 44,
      time: 25,
    },
    {
      title: "Intro To CSS",
      progress: 74,
      time: 15,
    },
  ];
  const topics = [
    {
      topicName: "Intro To React",
      progress: 80,
    },
    {
      topicName: "Intro To CSS",
      progress: 70,
    },
  ];
  const badTopics = [
    {
      topicName: "Intro To Next",
      progress: 40,
    },
    {
      topicName: "Intro To Tailwind",
      progress: 50,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCourse = FakeCourses[selectedIndex];

  return (
    <section className="w-full pb-4">
      <div>
        <CourseCard
          title={selectedCourse.title}
          progress={selectedCourse.progress}
          time={`${selectedCourse.time} min`}
        />

        <CoursePagination
          totalPages={FakeCourses.length}
          currentPage={selectedIndex + 1}
          setCurrentPage={(page: number) => setSelectedIndex(page - 1)}
        />
      </div>
      <div className="max-lg: mt-4 flex flex-wrap items-center justify-center gap-10 max-lg:gap-3 lg:flex-nowrap">
        <EvaluationCard title="Strengths" type="strengths" topics={topics} />
        <EvaluationCard
          title="Need to improve"
          type="weak"
          topics={badTopics}
        />
      </div>
      <div>
        <ProgressRate />
      </div>
    </section>
  );
};

export default CourseStatus;
