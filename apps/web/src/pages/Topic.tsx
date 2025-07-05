import React from "react";
import { useParams } from "react-router-dom";
import { HiMiniClock } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const topicDescription = `Cumque ipsa ut est eos officiis eaque vitae modi quaerat. Libero alias soluta consequatur. Quidem voluptates repellendus omnis quos cumque libero sed mollitia. Eaque qui rerum. Id et dignissimos temporibus commodi id voluptatem corporis voluptate aut.Cumque ipsa ut est eos officiis eaque vitae modi quaerat. Libero alias soluta consequatur. Quidem voluptates repellendus omnis quos Cumque ipsa ut est eos officiis eaque vitae modi quaerat. Libero alias soluta consequatur. Quidem voluptates repellendus omnis quos cumque libero sed mollitia. Eaque qui rerum. Id et dignissimos temporibus commodi id voluptatem corporis voluptate aut.Cumque ipsa ut est eos officiis eaque vitae modi quaerat. Libero alias soluta consequatur. Quidem voluptates repellendus omnis quos Cumque ipsa ut est eos officiis eaque vitae modi quaerat. Libero alias soluta consequatur. Quidem voluptates repellendus omnis quos cumque libero sed mollitia. Eaque qui rerum. Id et dignissimos temporibus commodi id voluptatem corporis voluptate aut.Cumque ipsa ut est eos officiis eaque vitae modi quaerat. Libero alias soluta consequatur. Quidem voluptates repellendus omnis quos`;

const Topic: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  // Dynamic previous button
  const prevTopicId =
    topicId && topicId !== "topic-1"
      ? `topic-${parseInt(topicId.split("-")[1]) - 1}`
      : null;

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-5 pb-10 md:pl-0">
      <div className="w-full rounded-[32px] bg-white p-5 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Topic {topicId}</h1>
          <div className="text-IEEEorange flex items-center gap-1 rounded bg-orange-100 px-3 py-1 text-sm">
            <span>
              <HiMiniClock color="#F7A501" size={18} />
            </span>
            <span>32 min</span>
          </div>
        </div>
        <p className="text-muted-foreground pb-5 text-justify text-base sm:text-lg">
          {topicDescription}
        </p>
        <div className="mb-6 w-full">
          <div className="aspect-w-16 aspect-h-9">
            <video
              className="h-[350px] w-full rounded-lg object-cover sm:h-[400px] md:h-[450px] 2xl:h-[650px]"
              controls
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
          </div>
        </div>
        <p className="text-muted-foreground pb-5 text-justify text-base sm:text-lg">
          {topicDescription}
        </p>
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="mb-4 flex justify-between">
            <TabsTrigger value="notes" className="text-lg">
              Notes
            </TabsTrigger>
            <TabsTrigger value="task" className="text-lg">
              Task
            </TabsTrigger>
          </TabsList>
          <TabsContent value="notes">
            <ul className="p-4" style={{ listStyleType: "disc" }}>
              <li className="p-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                euismod.
              </li>
              <li className="p-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                euismod.
              </li>
              <li className="p-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                euismod.
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="task">
            <ul className="p-4" style={{ listStyleType: "square" }}>
              <li className="p-1">Task Time: 20 min</li>
              <li className="p-1">10 Questions</li>
              <li className="p-1">
                Topics: Intro SQL, Select and Insert statement
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-6 flex w-full justify-between">
        {prevTopicId ? (
          <Button
            size="lg"
            variant="outline"
            className="text-base"
            onClick={() => (window.location.href = `/topic/${prevTopicId}`)}
          >
            Previous
          </Button>
        ) : (
          <div />
        )}
        <Button size="lg" className="text-base">
          Mark as completed
        </Button>
      </div>
    </div>
  );
};

export default Topic;
