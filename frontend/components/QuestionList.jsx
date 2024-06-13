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

const QuestionCard = ({ questionIdx, onDelete }) => {
  const { questions, editQuestion, editChoice } = useStore((state) => {
    return {
      questions: state.questions,
      editQuestion: state.editQuestion,
      editChoice: state.editChoice,
    };
  });

  const { questionText, choices, answer, completed } = questions[questionIdx];

  const handleEditQuestion = (idx, newValue) => {
    editQuestion(idx, newValue);
  };

  const handleEditChoice = (idx, choiceIdx, newValue) => {
    editChoice(idx, choiceIdx, newValue);
  };

  return (
    <div className="flex flex-col justify-center items-start gap-6 my-6">
      <div className="w-full px-2 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Label
            htmlFor={`ques-${questionIdx + 1}`}
            className="text-lg font-medium"
          >
            Question {questionIdx + 1}
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(questionIdx)}
          >
            <MdOutlineClear className="w-4 h-4" />
          </Button>
        </div>

        <Textarea
          placeholder="Type your question here..."
          id={questionIdx}
          value={questionText}
          onChange={(e) => {
            handleEditQuestion(questionIdx, e.target.value);
          }}
          className="resize-none"
        />
        <p>{JSON.stringify(questions[questionIdx])}</p>
      </div>

      <ul className="w-full flex flex-col items-center justify-center gap-4 px-2">
        {choices.map((choice, idx) => (
          <div className="w-full">
            <Input
              size="md"
              variant="clickable"
              placeholder={choice.letter}
              value={choice.value}
              onChange={(e) =>
                handleEditChoice(questionIdx, idx, e.target.value)
              }
              className={`${idx === answer && "bg-red-500"}`}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

const QuestionList = () => {
  const {
    questions,
    addQuestion,
    // editQuestion,
    deleteQuestion,
    resetQuestions,
    editChoice,
  } = useStore((state) => {
    return {
      questions: state.questions,
      addQuestion: state.addQuestion,
      // editQuestion: state.editQuestion,
      deleteQuestion: state.deleteQuestion,
      resetQuestions: state.resetQuestions,
    };
  });

  const handleAddQuestion = () => {
    if (questions.length < 5)
      addQuestion({
        questionText: "",
        choices: [
          {
            letter: "A",
            value: "",
          },
          {
            letter: "B",
            value: "",
          },
          {
            letter: "C",
            value: "",
          },
          {
            letter: "D",
            value: "",
          },
        ],
        answer: "",
      });
  };

  const handleDeleteQuestion = (id) => {
    deleteQuestion(id);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <div className="w-full">
        {questions?.map((question, idx) => {
          return (
            <QuestionCard
              key={idx}
              questionIdx={idx}
              onDelete={() => handleDeleteQuestion(idx)}
            />
          );
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
