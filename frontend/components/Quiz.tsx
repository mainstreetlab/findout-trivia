'use client';

import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import { ObjectId } from 'mongoose';
import { Question } from '@/models/trivia';
import { cn } from '@/lib/utils';
import useAnswerQuizStore from '@/hooks/useAnswerQuizStore';
import { useState } from 'react';
import Lottie from 'lottie-react';
import tickAnimation from '@/animations/tick-animation.json';

interface TriviaProps {
  _id: ObjectId;
  triviaId: string;
  questions: Question[];
}

interface QuizProps {
  trivia: TriviaProps;
}

const Quiz = ({ trivia: { questions } }: QuizProps) => {
  const {
    currentQuestion,
    setCurrentQuestion,
    selectedAnswer,
    setSelectedAnswer,
    complete,
    setComplete,
    addAnswer,
  } = useAnswerQuizStore(state => ({
    currentQuestion: state.currentQuestion,
    setCurrentQuestion: state.setCurrentQuestion,
    selectedAnswer: state.selectedAnswer,
    setSelectedAnswer: state.setSelectedAnswer,
    complete: state.complete,
    setComplete: state.setComplete,
    addAnswer: state.addAnswer,
  }));

  const handleOptionSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer !== null) {
      addAnswer(selectedAnswer);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setComplete(true);
        // Here you would submit the answers to your backend or smart contract
        // For example: await submitAnswersToContract(trivia._id, answers);
      }
    }
  };

  const QuestionContent = () => {
    const { questionText, choices } = questions[currentQuestion];

    return (
      <div className="w-[90%] gap-6 flex flex-col">
        <div className="w-full h-[200px] flex flex-col items-center justify-center text-center leading-normal gradient-question-card mx-auto rounded-md text-white p-4 relative overflow-clip">
          <div
            style={{ overflowWrap: 'break-word' }}
            className="flex flex-col items-center justify-center gap-6 px-2 w-full"
          >
            <span className="flex items-center justify-center rounded-full text-4xl font-normal text-blue-500/90 opacity-80 gradient-question-number w-14 h-14 absolute top-4 -left-3.5"></span>
            <p className="text-2xl font-medium w-full mt-4">{questionText}</p>
            <span className="flex items-center justify-center rounded-full text-4xl font-normal text-blue-500/90 gradient-question-number w-20 h-20 absolute -bottom-10 right-12 opacity-75 rotate-120"></span>
          </div>
        </div>
        <ul className="flex flex-col gap-6 mx-auto w-full">
          {choices.map((choice, index) => (
            <li key={index} className="w-full">
              <button
                className={cn(
                  'border border-accent/20 px-2 py-2.5 w-full h-20 rounded-md text-center text-lg select-none text-primary',
                  'cursor-pointer',
                  selectedAnswer === index
                    ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-500 text-white'
                    : 'bg-fuchsia-200/10 hover:bg-fuchsia-200/20',
                )}
                onClick={() => handleOptionSelect(index)}
                title={choice.value}
                style={{ overflowWrap: 'break-word' }}
              >
                {choice.value}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`p-4 rounded-md text-white text-lg ${
            selectedAnswer !== null ? 'bg-violet-700' : 'bg-neutral-500/20'
          } hover:bg-opacity-90 disabled:cursor-not-allowed disabled:text-white/90`}
          onClick={handleConfirmAnswer}
          disabled={selectedAnswer === null}
        >
          {currentQuestion + 1 === questions.length
            ? 'Finish Quiz'
            : 'Next Question'}
        </button>
      </div>
    );
  };

  const FinalResults = () => {
    const [animationComplete, setAnimationComplete] = useState(false);

    if (complete) {
      return (
        <div
          className="w-[90%] rounded-md p-8 flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-blue-700/80 to-violet-600/90 text-white gap-6"
          style={{ height: '680px' }}
        >
          <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
            <div className="w-42 h-42">
              <Lottie
                animationData={tickAnimation}
                loop={false}
                onComplete={() => setAnimationComplete(true)}
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center">
            🎉 You finished the quiz!
          </h2>
          <p className="text-center">
            You've completed all questions. Your answers have been submitted.
          </p>
          <div className="h-[52px] flex items-center justify-center">
            {' '}
            {/* Fixed height container */}
            <Link
              href={'/results?id=abcdef'}
              className={`mt-4 px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-600 transition-all duration-300 ${
                animationComplete
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              }`}
            >
              View Results
            </Link>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-md w-[420px] h-[95%] text-primary gap-6 overflow-y-auto pb-6">
      {questions && (
        <>
          {!complete && (
            <ProgressBar
              progress={Math.round(
                ((currentQuestion + 1) / questions.length) * 100,
              )}
              complete={complete}
            />
          )}
          {!complete && <QuestionContent />}
          <FinalResults />
        </>
      )}
    </div>
  );
};

export default Quiz;
