import { useState } from "react";
import { Card } from "@/components/ui/card";
import { HiMiniClock } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

const TASK_NAME = "Task on topic 1";
const TASK_DURATION = "30 min";

const QUESTIONS = [
  {
    text: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    points: 1,
  },
  {
    text: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    points: 1,
  },
  {
    text: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    points: 1,
  },
];

const Task = () => {
  const [selected, setSelected] = useState(["", "", ""]);

  const handleSelect = (qIdx: number, value: string) => {
    setSelected((prev) => prev.map((v, i) => (i === qIdx ? value : v)));
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{TASK_NAME}</h1>
        <div className="text-IEEEorange flex items-center gap-1 rounded bg-orange-100 px-3 py-1 text-sm">
          <span>
            <HiMiniClock color="#F7A501" size={18} />
          </span>
          <span>{TASK_DURATION}</span>
        </div>
      </div>
      {QUESTIONS.map((q, qIdx) => (
        <Card key={qIdx} className="mb-6 border-none p-6 shadow-xs">
          <div className="mb-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <h2 className="text-foreground text-lg font-semibold sm:text-xl">
              Question {qIdx + 1} : {q.text}
            </h2>
            <span className="text-IEEEorange flex items-center gap-1 rounded bg-orange-100 px-3 py-1 text-sm">
              {q.points} Point
            </span>
          </div>
          <div className="mb-6 space-y-3">
            {q.choices.map((choice, idx) => {
              const isSelected = selected[qIdx] === choice;
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handleSelect(qIdx, choice)}
                  className={`flex w-full cursor-pointer items-center space-x-3 rounded-[18px] border px-4 py-3 text-left transition-colors focus:outline-none ${
                    isSelected
                      ? "bg-IEEEorange border-IEEEorange text-white"
                      : "border-gray-200 bg-white hover:bg-orange-50"
                  } `}
                >
                  <span
                    className={`text-lg font-bold ${
                      isSelected ? "text-white" : "text-IEEEorange"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="flex-1">{choice}</span>
                </button>
              );
            })}
          </div>
        </Card>
      ))}
      <Button
        className="mx-auto block !h-auto w-40 text-lg"
        disabled={selected.some((ans) => !ans)}
      >
        Confirm
      </Button>
    </div>
  );
};

export default Task;
