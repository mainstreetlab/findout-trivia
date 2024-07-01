'use client';

import { useEffect, useState } from 'react';
import quizData from '@/data/quizData';
import Link from 'next/link';

import { FaCircleCheck } from 'react-icons/fa6';

import { Progress } from '@/components/ui/progress';
// import useFetch from '@/hooks/useFetch';
import { ObjectId } from 'mongoose';
import { Question } from '@/models/trivia';
import { cn } from '@/lib/utils';

interface TriviaProps {
  _id: ObjectId;
  triviaId: string;
  questions: Question[];
}

interface QuizProps {
  trivia: TriviaProps;
}

const Quiz = ({ trivia: { questions } }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Track if question submitted
  const [complete, setComplete] = useState(false);

  const handleOptionChange = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer >= 0) {
      if (selectedAnswer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
      setSubmitted(true); // Mark question submitted
      setSelectedAnswer(-1); // Reset selected answer
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSubmitted(false); // Reset submitted flag for next question
    }
    // console.log(currentQuestion);
    // console.log(submitted);
    // console.log(quizData.length);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSubmitted(false);
    setComplete(false);
  };

  useEffect(() => {
    if (currentQuestion + 1 === questions.length && submitted) {
      setComplete(true);
    }
  }, [submitted, complete, currentQuestion, questions.length]);

  const ProgressBar = () => {
    const progress = Math.round(
      ((currentQuestion + 1) / questions.length) * 100,
    );

    return (
      <div className="w-[90%] flex justify-between items-center gap-2">
        <div
          className={cn('flex items-center flex-1 p-2 -ml-2', {
            '-mr-2': progress > 60 && !complete,
          })}
        >
          <Progress value={progress} />
        </div>
        <FaCircleCheck
          className={`${complete ? 'block' : 'hidden'} text-xl text-violet-700`}
        />
      </div>
    );
  };

  const QuestionContent = () => {
    const { questionText, choices, answer } = questions[currentQuestion];

    return (
      <div className="w-[90%] gap-6 flex flex-col">
        <div className="w-full h-[200px] flex flex-col items-center justify-center text-center leading-normal gradient mx-auto rounded-md text-white p-4">
          <div className="-mt-6 flex flex-col items-center justify-between gap-6">
            <span className="flex items-center justify-center rounded-full text-2xl font-semibold text-blue-500/90 bg-white w-10 h-10">
              {currentQuestion + 1}
            </span>
            <p className="text-xl text-wrap">{questionText}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-6 mx-auto w-full">
          {choices.map((choice, index) => (
            <li key={index} className="w-full">
              <button
                className={`border border-primary/20 p-4 w-full rounded-md text-center text-lg 
                ${submitted ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'}
                ${
                  selectedAnswer === index
                    ? 'bg-blue-500 text-white'
                    : submitted
                      ? 'bg-neutral-500/20'
                      : 'bg-blue-500/20'
                }
                `}
                onClick={() => handleOptionChange(index)}
              >
                {choice.value}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`p-4 rounded-md text-white text-lg ${submitted ? 'bg-violet-500' : 'bg-blue-500'} hover:bg-opacity-90 disabled:bg-neutral-500/20 disabled:cursor-not-allowed`}
          onClick={
            complete
              ? handleRestart
              : submitted
                ? handleNextQuestion
                : handleSubmitAnswer
          }
          disabled={selectedAnswer < 0 && !submitted}
        >
          {complete
            ? 'Restart Quiz'
            : submitted
              ? 'Next Question'
              : 'Submit Answer'}
        </button>
      </div>
    );
  };

  const FinalResults = () => {
    if (currentQuestion + 1 === questions.length && submitted) {
      return (
        <div className="w-[90%] rounded-md p-5 flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-blue-700/80 to-violet-600/90 text-white gap-2">
          <h2 className="text-2xl font-semibold">🎉You finished the quiz!</h2>
          <p>
            You scored <span className="text-xl font-semibold">{score}</span>{' '}
            out of{' '}
            <span className="text-xl font-semibold">{quizData.length}</span>
          </p>
          <Link href={'/results?id=abcdef'} className="text-sm ">
            Review your answers
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-md w-[420px] h-[95%] text-primary gap-6 overflow-y-auto pb-6">
      {/* {loading && <p>Loading quiz...</p>}
      {error && <p>Error: {error}</p>} */}
      {questions && (
        <>
          <ProgressBar />
          <QuestionContent />
          <FinalResults />
        </>
      )}
    </div>
  );
};

export default Quiz;
