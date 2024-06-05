"use client";

import { useEffect, useState } from "react";
import quizData from "@/data/quizData";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Track if question submitted
  const [complete, setComplete] = useState(false);

  const handleOptionChange = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer >= 0) {
      if (selectedAnswer === quizData[currentQuestion].answer) {
        setScore(score + 1);
      }
      setSubmitted(true); // Mark question submitted
      setSelectedAnswer(-1); // Reset selected answer
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSubmitted(false); // Reset submitted flag for next question
    }
    console.log(currentQuestion);
    console.log(submitted);
    console.log(quizData.length);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSubmitted(false);
    setComplete(false);
  };

  useEffect(() => {
    if (currentQuestion + 1 === quizData.length && submitted) {
      setComplete(true);
    }
  }, [submitted, complete]);

  const ProgressBar = () => {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    return (
      <div className="w-full flex p-4">
        <div className="flex items-center justify-between w-full">
          <div
            style={{
              width: `${progress}%`,
            }}
            className="h-3 flex items-center p-1 text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-pink-500 w-full rounded-md border border-primary/20"
          ></div>
        </div>
      </div>
    );
  };

  const QuestionContent = () => {
    const question = quizData[currentQuestion];
    return (
      <div className="w-[90%] gap-6 flex flex-col">
        <div className="w-full h-[220px] flex items-center justify-center text-2xl text-center leading-normal bg-blue-600/90 mx-auto rounded-md text-white px-4">
          {question.question}
        </div>
        <ul className="flex flex-col gap-6 mx-auto w-full">
          {question.choices.map((choice, index) => (
            <li key={index} className="w-full">
              <button
                className={`border border-primary/20 p-4 w-full rounded-md text-center text-lg 
                ${submitted ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"}
                ${
                  selectedAnswer === index
                    ? "bg-blue-500"
                    : submitted
                      ? "bg-neutral-500/20"
                      : "bg-blue-500/20"
                }
                `}
                onClick={() => handleOptionChange(index)}
              >
                {choice}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`p-4 rounded-md text-white text-lg ${submitted ? "bg-violet-500" : "bg-blue-500"} hover:bg-opacity-90 disabled:bg-neutral-500/20 disabled:cursor-not-allowed`}
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
            ? "Restart Quiz"
            : submitted
              ? "Next Question"
              : "Submit Answer"}
        </button>
      </div>
    );
  };

  const FinalResults = () => {
    if (currentQuestion + 1 === quizData.length && submitted) {
      return (
        <div className="w-[90%] rounded-md p-6 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500/80 via-blue-600 to-violet-600/90 text-white">
          <h2 className="text-2xl font-semibold">🎉You finished the quiz!</h2>
          <p>
            Your score: {score} out of {quizData.length}
          </p>
        </div>
      );
    }
  };

  // ... Render question, answer options, submit button based on state

  return (
    // ... JSX for your quiz UI
    <div className="flex flex-col items-center bg-white rounded-md w-[420px] h-[95%] text-primary gap-8">
      {<ProgressBar />}
      {<QuestionContent />}
      {<FinalResults />}
    </div>
  );
};

export default Quiz;
