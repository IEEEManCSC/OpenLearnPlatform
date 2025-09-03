import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Course Status Types
type CourseStatus = "Notstarted" | "In progress" | "Completed" | "Locked";

// Course Data
const courseData = {
  beginner: [
    {
      id: 1,
      title: "HTML Basics",
      description: "Learn the basics of HTML",
      progress: 100,
      status: "Completed" as CourseStatus,
    },
    {
      id: 2,
      title: "CSS Fundamentals",
      description: "Master CSS styling and layouts",
      progress: 25,
      status: "In progress" as CourseStatus,
    },
    {
      id: 3,
      title: "JavaScript Introduction",
      description: "Get started with JavaScript programming",
      progress: 0,
      status: "Not started" as CourseStatus,
    },
  ],
  intermediate: [
    {
      id: 4,
      title: "React Fundamentals",
      description: "Build dynamic UIs with React",
      progress: 0,
      status: "Locked" as CourseStatus,
    },
    {
      id: 5,
      title: "Node.js Backend",
      description: "Create server-side applications",
      progress: 0,
      status: "Locked" as CourseStatus,
    },
    {
      id: 6,
      title: "Database Design",
      description: "Learn SQL and database concepts",
      progress: 0,
      status: "Locked" as CourseStatus,
    },
  ],
  advanced: [
    {
      id: 7,
      title: "System Design",
      description: "Design scalable systems",
      progress: 0,
      status: "Locked" as CourseStatus,
    },
    {
      id: 8,
      title: "DevOps & Deployment",
      description: "Deploy and manage applications",
      progress: 0,
      status: "Locked" as CourseStatus,
    },
    {
      id: 9,
      title: "Advanced Algorithms",
      description: "Master complex algorithms and data structures",
      progress: 0,
      status: "Locked" as CourseStatus,
    },
  ],
};

// Course Card Component
interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    progress: number;
    status: CourseStatus;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-card rounded-[30px] p-4">
      <Link
        to={`/course/${course.id}`}
        className="group bg-card relative flex cursor-pointer items-center justify-between rounded-[30px] border p-4 px-6 transition-all duration-200"
      >
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h3 className="text-foreground group-hover:text-IEEEorange text-base font-semibold transition-colors sm:text-lg">
              {course.title}
            </h3>
            <p className="text-muted-foreground group-hover:text-IEEEorange text-sm transition-colors">
              {course.description}
            </p>
          </div>
          <div className="bg-lightOrange text-IEEEorange flex w-fit items-center gap-2 rounded-sm p-1 sm:mr-4">
            <span className="text-sm">{course.progress}%</span>
            <p className="text-sm">{course.status}</p>
          </div>
        </div>
        <div className="text-foreground group-hover:text-IEEEorange absolute right-4 pb-4 transition-colors sm:relative sm:right-0 sm:pb-0">
          <HiChevronRight className="size-5 stroke-1" />
        </div>
      </Link>
    </div>
  );
};

function Roadmap() {
  return (
    <div className="w-full px-4 pt-4 sm:pl-0">
      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="mb-8 w-full justify-start gap-4">
          <TabsTrigger
            value="beginner"
            className="text-sm font-semibold sm:text-lg"
          >
            Beginner
          </TabsTrigger>
          <TabsTrigger
            value="intermediate"
            className="text-sm font-semibold sm:text-lg"
          >
            Intermediate
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="text-sm font-semibold sm:text-lg"
          >
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beginner" className="space-y-4">
          <div className="grid gap-4">
            {courseData.beginner.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intermediate" className="space-y-4">
          <div className="grid gap-4">
            {courseData.intermediate.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid gap-4">
            {courseData.advanced.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Roadmap;
