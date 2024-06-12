"use client";

import { CgMathPlus } from "react-icons/cg";
import { MdOutlineClear } from "react-icons/md";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "./ui/input";

import useStore from "@/hooks/useStore";

const QuestionCard = ({ question, num }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-6 my-6">
      <div className="w-full px-2 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Label htmlFor={`ques-${num}`} className="text-lg font-medium">
            Question {num}
          </Label>
          <MdOutlineClear />
        </div>

        <Textarea placeholder="Type your question here..." id={`ques-${num}`} />
      </div>
      {/* <p className="text-sm text-muted-foreground">
        Enter your question here...
      </p> */}
      <div className="w-full flex flex-col items-center justify-center gap-4 px-2">
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="A." />
        </div>
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="B." />
        </div>
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="C." />
        </div>
        <div className="w-full">
          <Input size="md" variant="clickable" placeholder="D." />
        </div>
      </div>
    </div>
  );
};

const QuestionList = () => {
  const { questions, addQuestion, deleteQuestion, resetQuestions } = useStore(
    (state) => {
      return {
        questions: state.questions,
        addQuestion: state.addQuestion,
        deleteQuestion: state.deleteQuestion,
        resetQuestions: state.resetQuestions,
      };
    },
  );

  console.log(questions);

  const handleAddQuestion = () => {
    if (questions.length < 5)
      addQuestion({
        question: "What is your name?",
        choices: ["Ade", "Tolu", "Tim"],
        answer: "Ade",
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <div className="w-full">
        {questions?.map((question, idx) => {
          return <QuestionCard key={idx} question={question} num={idx + 1} />;
        })}
      </div>
      {/* Add another question */}
      {questions.length < 5 && (
        <TooltipProvider delayDuration={275}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="lg" onClick={handleAddQuestion}>
                <CgMathPlus className="w-8 h-8" />
              </Button>
            </TooltipTrigger>

            <TooltipContent className="mt-2" side="bottom">
              <p className="text-primary">Add Question</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default QuestionList;
