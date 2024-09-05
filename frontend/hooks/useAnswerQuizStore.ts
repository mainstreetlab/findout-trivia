import { produce } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface AnswerQuizStore {
  currentQuestion: number;
  setCurrentQuestion: (value: number) => void;
  selectedAnswer: number | null;
  setSelectedAnswer: (value: number | null) => void;
  complete: boolean;
  setComplete: (isComplete: boolean) => void;
  answers: number[];
  addAnswer: (answer: number) => void;
}

const useAnswerQuizStore = create<AnswerQuizStore>()(
  immer(set => ({
    currentQuestion: 0,
    setCurrentQuestion: (value: number) =>
      set(
        produce(state => {
          state.currentQuestion = value;
        }),
      ),
    selectedAnswer: null,
    setSelectedAnswer: (value: number | null) =>
      set(
        produce(state => {
          state.selectedAnswer = value;
        }),
      ),
    complete: false,
    setComplete: (isComplete: boolean) =>
      set(
        produce(state => {
          state.complete = isComplete;
        }),
      ),
    answers: [],
    addAnswer: (answer: number) =>
      set(
        produce(state => {
          state.answers.push(answer);
        }),
      ),
  })),
);

export default useAnswerQuizStore;
