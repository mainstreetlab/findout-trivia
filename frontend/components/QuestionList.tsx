"use client";

import { CgMathPlus } from "react-icons/cg";
import { MdOutlineClear } from "react-icons/md";

import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from './ui/input';
import { useToast } from '@/components/ui/use-toast';

import useQuizStore, { QuizStore } from '@/hooks/useQuizStore';

import { FormEvent, useState } from 'react';

import { z } from 'zod';
import { ZodError, fromZodError } from 'zod-validation-error';
import checkValidationErrors from '@/utils/checkValidationErrors';

import PrizeInput from '@/components/PrizeInput';

import { usePrivy } from '@privy-io/react-auth';
import { TriviaCreatedDialog } from './TriviaCreatedDialog';
import { useDialog } from '@/hooks/useDialog';
import Submit from '@/components/Submit';

interface QuestionCardProps {
  questionIdx: number;
  onDelete?: (questionIdx: number) => void;
}

const QuestionCard = ({ questionIdx, onDelete }: QuestionCardProps) => {
  const {
    questions,
    editQuestion,
    editChoice,
    isValidateQuestion,
    validateQuestion,
    validateChoice,
    editAnswer,
    getAnswers,
  } = useQuizStore<QuizStore>(state => {
    return {
      prize: state.prize,
      setPrize: state.setPrize,
      questions: state.questions,
      addQuestion: state.addQuestion,
      editQuestion: state.editQuestion,
      isValidateQuestion: state.isValidateQuestion,
      validateQuestion: state.validateQuestion,
      editChoice: state.editChoice,
      validateChoice: state.validateChoice,
      editAnswer: state.editAnswer,
      getAnswers: state.getAnswers,
    };
  });

  const { questionText, choices, answer } = questions[questionIdx];

  const handleEditQuestion = (idx: number, newValue: string) => {
    editQuestion(idx, newValue);
  };

  const handleValidateQuestion = async (idx: number) => {
    const questionSchema = z.string().min(5).max(255);
    try {
      await questionSchema.parseAsync(questions[idx].questionText);
      validateQuestion(idx, '');
    } catch (error) {
      const validationError = fromZodError(error as ZodError, { prefix: null });
      validateQuestion(idx, validationError.toString());
    }
  };

  const handleEditChoice = (
    questionIdx: number,
    choiceIdx: number,
    newValue: string,
  ) => {
    editChoice(questionIdx, choiceIdx, newValue);
  };

  const handleValidateChoice = async (idx: number) => {
    const choicesSchema = z
      .array(
        z.object({
          value: z.string().min(3).max(65),
          // isCorrect: z.boolean().optional(),
        }),
      )
      .length(4);
    try {
      await choicesSchema.parseAsync(questions[idx].choices);
      validateChoice(idx, '');
    } catch (error) {
      // const validationError = fromZodError(error as ZodError, {prefix: null});
      validateChoice(idx, 'Please fill all four choices correctly.');
    }
  };

  const handleSelectAnswer = async (questionIdx: number, choiceIdx: number) => {
    const answerSchema = z.number().min(0).max(3);
    try {
      await answerSchema.parseAsync(choiceIdx);
      editAnswer(questionIdx, choiceIdx);
    } catch (error) {
      // const validationError = fromZodError(error as ZodError, {prefix: null});
      editAnswer(questionIdx, 0);
    }
  };

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
            onChange={e => {
              handleEditQuestion(questionIdx, e.target.value);
            }}
            onBlur={e => {
              handleValidateQuestion(Number(e.target.id));
            }}
            className={`resize-none ${!!isValidateQuestion[questionIdx].question && 'border border-red-600/70'}`}
          />
          <p className="text-sm font-normal text-red-600 mt-1 select-none">
            {isValidateQuestion[questionIdx].question}
          </p>
        </div>
      </div>

      <ul
        className={`w-full flex flex-col items-center justify-center gap-4 px-2.5 py-3 rounded-md ${isValidateQuestion[questionIdx].choices && 'border border-red-600/70'}`}
      >
        <p className="text-md font-normal text-green-600 -mb-2 select-none self-start">
          {answer !== null && `Selected answer is ${choices[answer].letter}`}
        </p>
        {choices.map((choice, idx: number) => (
          <li key={idx} className="w-full">
            <Input
              key={idx}
              id={idx.toString()}
              boxsize="md"
              variant="clickable"
              placeholder={`${choice.letter}.`}
              value={choice.value}
              autoComplete="off"
              className={`${typeof answer !== 'undefined' && idx === answer && 'bg-green-500 border border-green-500 text-white placeholder:text-white focus-visible:border-accent transition-all duration-700'}`}
              onChange={e => handleEditChoice(questionIdx, idx, e.target.value)}
              onBlur={e => handleValidateChoice(questionIdx)}
              onClick={e => handleSelectAnswer(questionIdx, idx)}
            />
          </li>
        ))}
        <p className="text-sm font-normal text-red-600 -mt-1 select-none self-start">
          {isValidateQuestion[questionIdx].choices}
        </p>
      </ul>
    </div>
  );
};

const QuestionList = () => {
  const { toast } = useToast();
  const { user } = usePrivy();

  const { onOpen } = useDialog();

  const { questions, isValidatePrize, isValidateQuestion, getAnswers } =
    useQuizStore(state => {
      return {
        questions: state.questions,
        isValidatePrize: state.isValidatePrize,
        isValidateQuestion: state.isValidateQuestion,
        // addQuestion: state.addQuestion,
        // deleteQuestion: state.deleteQuestion,
        getAnswers: state.getAnswers,
      };
    });

  // const handleAddQuestion = () => {
  //   if (questions.length < 5) addQuestion();
  // };

  // const handleDeleteQuestion = (id: number) => {
  //   deleteQuestion(id);
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // if (!isValidatePrize) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Uh oh! Something went wrong.',
    //     description: 'Incorrect prize amount.',
    //     // action: <ToastAction altText="Try again">Try again</ToastAction>,
    //   });
    //   return;
    // }

    const validationErrors = checkValidationErrors(isValidateQuestion);

    // console.log('isval', isValidateQuestion);

    if (validationErrors.length > 0) {
      validationErrors.forEach(error => {
        console.error(`Question ${error.index + 1} Errors:`);
        console.error(error.error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong with your submission.',
          description: `Error ${error.index}: ${JSON.stringify(error.error, null, '\t')}`,
        });
      });
    } else {
      const answers = getAnswers();
      alert(answers);

      if (user) {
        let fetchData = {
          method: 'POST',
          body: JSON.stringify({ questions: questions, owner: user.id }),
          headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
          }),
        };

        const res = await fetch('/api/create', fetchData);

        if (!res.ok) {
          toast({
            variant: 'destructive',
            title: 'Internal Server Error',
            description: 'Could not create trivia. Try again.',
          });
        } else {
          const data = await res.json();
          console.log('API data', data);
          toast({
            variant: 'default',
            title: 'Action Successful',
            description: JSON.stringify(data),
          });
          onOpen();
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <form className="w-full" onSubmit={handleSubmit}>
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
          <Submit answers={getAnswers()} />
        </div>
      </form>

      <TriviaCreatedDialog triviaId="SJHGShjgdhGD" />

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
