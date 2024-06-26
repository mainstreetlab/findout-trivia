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

import useQuizStore, { QuizStore } from "@/hooks/useQuizStore";

import PrizeInput from "@/components/PrizeInput";

import { z } from "zod";
import { ZodError, fromZodError } from 'zod-validation-error';
import { FormEvent } from "react";

import { useToast } from "@/components/ui/use-toast"

interface QuestionCardProps {
  questionIdx: number;
  onDelete?: (questionIdx: number) => void;
}

const QuestionCard = ({ questionIdx, onDelete }: QuestionCardProps) => {
  const { questions, editQuestion, editChoice, isValidateQuestion,validateQuestion, validateChoice } = useQuizStore<QuizStore>(
    (state) => {
      return {
        prize: state.prize,
        setPrize: state.setPrize,
        questions: state.questions,
        addQuestion: state.addQuestion,
        editQuestion: state.editQuestion,
        isValidateQuestion: state.isValidateQuestion,
        validateQuestion: state.validateQuestion,
        editChoice: state.editChoice,
        validateChoice: state.validateChoice

      };
    }
  );

  const { questionText, choices, answer } = questions[questionIdx];

  const handleEditQuestion =  (idx: number, newValue: string) => {
    editQuestion(idx, newValue);
  };

  const handleValidateQuestion = async (idx:number)=>{
    const questionSchema = z.string().min(5).max(255)
    try {
      await questionSchema.parseAsync(questions[idx].questionText)
      validateQuestion(idx, "")
    } catch (error) {
      const validationError = fromZodError(error as ZodError, {prefix:null});
      validateQuestion(idx, validationError.toString())
    }
  }

  const handleEditChoice = (
    idx: number,
    choiceIdx: number,
    newValue: string
  ) => {
    editChoice(idx, choiceIdx, newValue);
  };

  const handleValidateChoice = async (idx:number) => {
    const choicesSchema = z.array(
      z.object({
        value: z.string().min(3).max(65),
        // isCorrect: z.boolean().optional(),
      })
    )
    .length(4)
    try {
      await choicesSchema.parseAsync(questions[idx].choices)
      validateChoice(idx, "")
    } catch (error) {
      // const validationError = fromZodError(error as ZodError, {prefix: null});
      validateChoice(idx, "Please fill all four answers correctly.")
    }
  }

  return (
    <div className="flex flex-col justify-center items-start gap-4 my-10">
      <div className="w-full px-0 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Label
            htmlFor={`ques-${questionIdx + 1}`}
            className="text-lg font-medium"
          >
            Question {questionIdx + 1}
          </Label>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(questionIdx)}
          >
            <MdOutlineClear className="w-4 h-4" />
          </Button> */}
        </div>

        <div className="w-full my-2">
          <Textarea
            placeholder="Type your question here..."
            id={questionIdx.toString()}
            value={questionText}
            onChange={(e) => {
              handleEditQuestion(questionIdx, e.target.value);
            }}
            onBlur={(e) => {
              handleValidateQuestion(Number(e.target.id))}
            }
            className={`resize-none ${!!isValidateQuestion[questionIdx].question && 'border border-red-600/70'}`}
          />
          <p className="text-sm font-normal text-red-600 mt-1 select-none"> 
            {isValidateQuestion[questionIdx].question}
          </p>
        </div>
      </div>

      <ul className={`w-full flex flex-col items-center justify-center gap-4 px-2.5 py-3 rounded-md ${isValidateQuestion[questionIdx].choices && 'border border-red-600/70'}`}>
        {choices.map((choice, idx) => (
          <div className="w-full">
            <Input
              key={idx}
              id={idx.toString()}
              boxsize="md"
              variant="clickable"
              placeholder={`${choice.letter}.`}
              value={choice.value}
              autoComplete="off"
              className={`${idx === parseInt(answer) && "bg-red-500"}`}
              onChange={(e) =>
                handleEditChoice(questionIdx, idx, e.target.value)
              }
              onBlur={(e)=>
                handleValidateChoice(questionIdx)
              }
            />
          </div>
        ))}
        <p className="text-sm font-normal text-red-600 -mt-1 select-none self-start"> 
          {isValidateQuestion[questionIdx].choices}
        </p>
      </ul>
    </div>
  );
};

const QuestionList = () => {
  const { toast } = useToast()
  
  const { questions, isValidatePrize, isValidateQuestion } = useQuizStore((state) => {
    return {
      questions: state.questions,
      isValidatePrize: state.isValidatePrize,
      isValidateQuestion: state.isValidateQuestion
      // addQuestion: state.addQuestion,
      // deleteQuestion: state.deleteQuestion,
    };
  });

  // const handleAddQuestion = () => {
  //   if (questions.length < 5) addQuestion();
  // };

  // const handleDeleteQuestion = (id: number) => {
  //   deleteQuestion(id);
  // };

  const handleSubmit = (e:FormEvent) => {
      e.preventDefault();

      if (!isValidatePrize) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Incorrect prize amount.",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        return;
      }

      if(!isValidateQuestion){
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid question.",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        return;
      }


  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <form className="w-full" onSubmit={handleSubmit}
      >
        <PrizeInput />
        {questions?.map((_, idx) => {
          return (
            <QuestionCard
              key={idx}
              questionIdx={idx}
              // onDelete={() => handleDeleteQuestion(idx)}
            />
          );
        })}
        <div className="flex flex-col items-center justify-center mt-10 mb-6">
          <Button type="submit" className="w-3/4 md:w-3/5 px-8">Submit</Button>
        </div>
      </form>

      {/* Add another question */}
      {/* {questions.length < 5 && (
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
      )} */}
    </div>
  );
};

export default QuestionList;
