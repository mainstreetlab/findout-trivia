import { produce } from 'immer';
// import { number, z } from 'zod';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface AnswerQuizStore {
  currentQuestion: number;
  setCurrentQuestion: (value: number) => void;
  selectedAnswer: number | null;
  setSelectedAnswer: (value: number) => void;
  score: number;
  setScore: (score: number) => void;
  submitted: boolean;
  setSubmitted: (isSubmitted: boolean) => void;
  complete: boolean;
  setComplete: (isComplete: boolean) => void;
}

const useAnswerQuizStore = create<AnswerQuizStore>()(
  immer(set => ({
    currentQuestion: 0,
    setCurrentQuestion: (value: number) => {
      set(
        produce(state => {
          state.currentQuestion = value;
        }),
      );
    },
    selectedAnswer: null,
    setSelectedAnswer: (value: number) => {
      set(
        produce(state => {
          state.selectedAnswer = value;
        }),
      );
    },
    score: 0,
    setScore: (score: number) => {
      set(
        produce(state => {
          state.score = score;
        }),
      );
    },
    submitted: false,
    setSubmitted: (isSubmitted: boolean) => {
      set(
        produce(state => {
          state.submitted = isSubmitted;
        }),
      );
    },
    complete: false,
    setComplete: (isComplete: boolean) => {
      set(
        produce(state => {
          state.complete = isComplete;
        }),
      );
    },
  })),
);

export default useAnswerQuizStore;