import { produce } from 'immer';
// import { number, z } from 'zod';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface CreateQuizStore {
  currentQuestion: number;
  setCurrentQuestion: (value: number) => void;
  selectedAnswer: number | null;
  setSelectedAnswer: (value: number) => void;
  submitted: boolean;
  setSubmitted: () => void;
  complete: boolean;
  setComplete: () => void;
}

const useAnswerQuizStore = create()(
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
    // score: 0
    // setScore: () => {},
    submitted: false,
    setSubmitted: () => {
      set(
        produce(state => {
          state.submitted = !state.submitted;
        }),
      );
    },
    complete: false,
    setComplete: () => {
      set(
        produce(state => {
          state.complete = !state.complete;
        }),
      );
    },
  })),
);

export default useAnswerQuizStore;
