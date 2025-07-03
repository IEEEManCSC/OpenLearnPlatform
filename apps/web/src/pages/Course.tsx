import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiChevronRight, HiCheck } from "react-icons/hi2";

// Types
interface Topic {
  id: string;
  title: string;
  completed: boolean;
}

interface Chapter {
  id: number;
  title: string;
  topics: Topic[];
  duration: string;
  completed: boolean;
}

interface CourseUnit {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface CourseData {
  id: string;
  title: string;
  units: CourseUnit[];
  description: string;
  completionPercentage: number;
}

// Course data
const courseDataMap: Record<string, CourseData> = {
  "1": {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    completionPercentage: 100,
    units: [
      {
        id: "unit-1",
        title: "Unite",
        chapters: [
          {
            id: 1,
            title: "Chapter 1",
            duration: "32min",
            completed: true,
            topics: [
              { id: "topic-1", title: "Intro to sql", completed: true },
              { id: "topic-2", title: "Intro to sql", completed: true },
              { id: "topic-3", title: "Intro to sql", completed: true },
              { id: "topic-4", title: "Intro to sql", completed: true },
              { id: "topic-5", title: "Intro to sql", completed: true },
              { id: "topic-6", title: "Intro to sql", completed: true },
              { id: "topic-7", title: "Intro to sql", completed: true },
              { id: "topic-8", title: "Intro to sql", completed: true },
            ],
          },
          {
            id: 2,
            title: "Chapter 2",
            duration: "32min",
            completed: true,
            topics: [
              { id: "topic-7", title: "Intro to sql", completed: true },
              { id: "topic-8", title: "Intro to sql", completed: true },
            ],
          },
          {
            id: 3,
            title: "Chapter 3",
            duration: "32min",
            completed: true,
            topics: [
              { id: "topic-9", title: "Intro to sql", completed: true },
              { id: "topic-10", title: "Intro to sql", completed: true },
            ],
          },
          {
            id: 4,
            title: "Chapter",
            duration: "32min",
            completed: false,
            topics: [
              { id: "topic-11", title: "Intro to sql", completed: false },
              { id: "topic-12", title: "Intro to sql", completed: false },
            ],
          },
          {
            id: 5,
            title: "Chapter",
            duration: "32min",
            completed: false,
            topics: [
              { id: "topic-13", title: "Intro to sql", completed: false },
              { id: "topic-14", title: "Intro to sql", completed: false },
            ],
          },
          {
            id: 6,
            title: "Chapter",
            duration: "32min",
            completed: false,
            topics: [
              { id: "topic-15", title: "Intro to sql", completed: false },
              { id: "topic-16", title: "Intro to sql", completed: false },
            ],
          },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    title: "CSS Fundamentals",
    description: "Master CSS styling and layouts",
    completionPercentage: 25,
    units: [
      {
        id: "unit-1",
        title: "Unite",
        chapters: [
          {
            id: 1,
            title: "Chapter 1",
            duration: "45min",
            completed: true,
            topics: [
              { id: "css-topic-1", title: "CSS Basics", completed: true },
              { id: "css-topic-2", title: "Selectors", completed: true },
            ],
          },
          {
            id: 2,
            title: "Chapter 2",
            duration: "50min",
            completed: false,
            topics: [
              { id: "css-topic-3", title: "Flexbox", completed: false },
              { id: "css-topic-4", title: "Grid", completed: false },
            ],
          },
        ],
      },
    ],
  },
  "3": {
    id: "3",
    title: "JavaScript Introduction",
    description: "Get started with JavaScript programming",
    completionPercentage: 0,
    units: [
      {
        id: "unit-1",
        title: "Unite",
        chapters: [
          {
            id: 1,
            title: "Chapter 1",
            duration: "60min",
            completed: false,
            topics: [
              { id: "js-topic-1", title: "Variables", completed: false },
              { id: "js-topic-2", title: "Functions", completed: false },
            ],
          },
        ],
      },
    ],
  },
};

function Course() {
  const navigate = useNavigate();

  const { courseId } = useParams<{ courseId: string }>();

  const courseData = courseId ? courseDataMap[courseId] : null;

  const defaultChapter = courseData?.units[0]?.chapters[0] || null;
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(
    defaultChapter,
  );

  if (!courseData) {
    return (
      <div className="w-full px-4 pt-4 sm:pl-0">
        <div className="bg-card rounded-lg border p-8 text-center">
          <h2 className="text-foreground mb-4 text-xl font-semibold">
            Course not found
          </h2>
          <p className="text-muted-foreground">
            The requested course could not be found.
          </p>
        </div>
      </div>
    );
  }

  const currentUnit = courseData.units[0];

  return (
    <div className="w-full px-4 pt-4 pb-6 sm:pt-2 sm:pl-0">
      <div className="flex h-full flex-col gap-6 rounded-[20px] bg-white lg:flex-row">
        {/* Course Sidebar */}
        <div className="w-full lg:w-72">
          <div className="border-secondary my-8 mb-0 rounded-tl-[20px] border-r bg-white px-6 lg:mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentUnit.title}
              </h2>
            </div>
            <div className="custom-scrollbar relative max-h-[500px] overflow-y-auto">
              {currentUnit.chapters.map((chapter, index) => {
                const isUnnamedChapter = chapter.title === "Chapter";
                return (
                  <div key={chapter.id} className="relative">
                    {index < currentUnit.chapters.length - 1 &&
                      !isUnnamedChapter && (
                        <div className="border-IEEEorange absolute top-14 left-3 h-14 w-0.5 border-l-2 border-dashed"></div>
                      )}
                    <div
                      className="group mb-2 flex cursor-pointer items-start gap-4 rounded-xl p-4 pl-0 transition-all duration-200"
                      onClick={() => {
                        setSelectedChapter(chapter);
                      }}
                    >
                      <div className="mt-1 flex-shrink-0">
                        {isUnnamedChapter ? (
                          <div className="border-IEEEorange h-6 w-6 rounded-full border-2"></div>
                        ) : (
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              chapter.completed
                                ? "bg-IEEEorange border-IEEEorange text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {chapter.completed ? (
                              <HiCheck className="h-4 w-4 stroke-1" />
                            ) : null}
                          </div>
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div
                          className={`mb-2 text-lg font-semibold ${
                            chapter.completed
                              ? "text-gray-900"
                              : "text-muted-foreground"
                          }`}
                        >
                          {chapter.title}
                        </div>
                        {!isUnnamedChapter && (
                          <div className="text-IEEEorange inline-flex w-fit items-center rounded-md bg-orange-100 px-3 py-1 text-sm font-medium">
                            {chapter.duration}
                          </div>
                        )}
                      </div>
                      {!isUnnamedChapter && (
                        <div className="mt-3 flex-shrink-0">
                          <HiChevronRight className="text-muted-foreground group-hover:text-foreground h-6 w-6 duration-200 ease-in group-hover:translate-x-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1">
          <div className="pt-6 pl-6 lg:pl-0">
            <p className="text-foreground text-lg font-bold sm:text-xl">
              {selectedChapter?.title}
            </p>
          </div>
          <div className="bg-card border-secondary mt-4 mr-6 mb-6 ml-6 rounded-[20px] border lg:ml-0">
            <div className="flex flex-col justify-between p-6 pb-0 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-foreground mb-2 text-lg font-bold sm:text-xl">
                  {courseData.title}
                </h1>
                <p className="text-muted-foreground mb-4 sm:text-lg">
                  {courseData.description}
                </p>
              </div>
              <div className="bg-lightOrange text-IEEEorange inline-flex items-center gap-2 rounded-sm px-3 py-1 text-sm">
                <span>{courseData.completionPercentage}% Completed</span>
              </div>
            </div>
            <div className="px-6 pt-6 sm:pt-0">
              <hr className="border-secondary w-full border" />
            </div>
            {selectedChapter ? (
              <div className="space-y-4 p-6">
                <div className="custom-scrollbar max-h-[400px] space-y-3 overflow-auto">
                  {selectedChapter.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`group flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 transition-all duration-200 ${topic.completed ? "border-IEEEorange !bg-lightOrange" : "!bg-secondary"}`}
                      onClick={() => navigate(`/topic/${topic.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            topic.completed
                              ? "bg-IEEEorange text-white"
                              : "border-2 border-gray-300"
                          }`}
                        >
                          {topic.completed ? (
                            <HiCheck className="h-4 w-4" />
                          ) : null}
                        </div>
                        <div>
                          <h3
                            className={`text-foreground font-medium ${topic.completed ? "!text-IEEEorange" : ""}`}
                          >
                            {topic.title}
                          </h3>
                        </div>
                      </div>
                      <HiChevronRight className="text-foreground h-6 w-6 duration-200 ease-in group-hover:translate-x-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <h2 className="text-foreground mb-4 text-xl font-semibold">
                  Select a chapter to view topics
                </h2>
                <p className="text-muted-foreground">
                  Choose a chapter from the sidebar to view its topics and start
                  your learning journey.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
