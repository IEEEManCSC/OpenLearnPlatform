import { useParams } from "react-router-dom";

function Course() {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4 sm:pl-0">
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl font-bold">
          Course Content
        </h1>
        <p className="text-muted-foreground">Course ID: {courseId}</p>
      </div>

      <div className="bg-card rounded-lg border p-8 text-center">
        <h2 className="text-foreground mb-4 text-xl font-semibold">
          Course content will be implemented here
        </h2>
        <p className="text-muted-foreground">
          This is where the actual course content, lessons, and materials will
          be displayed.
        </p>
      </div>
    </div>
  );
}

export default Course;
