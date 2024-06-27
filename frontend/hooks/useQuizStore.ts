import { produce } from "immer";
import { z } from "zod";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface QuizStore {
  // Prize state
  prize: number;
  setPrize: (amount: number) => void;
  isValidatePrize?: boolean | null;
  validatePrize?: () => void;

  // Questions state
  questions: Question[];
  addQuestion: () => void;
  editQuestion: (idx: number, newValue: string) => void;
  deleteQuestion?: (id: number) => void;
  isValidateQuestion: {
    question: string | null;
    choices: string | null;
    answer: number;
  }[];
  validateQuestion: (idx: number, validate: string) => void;
  validateChoice: (idx: number, validate: string) => void;

  // Choices editing
  editChoice: (idx: number, choiceIdx: number, newValue: string) => void;
}

export interface Question {
  id: number;
  questionText: string;
  choices: Choice[];
  answer: string;
}

interface Choice {
  letter: string;
  value: string;
}
const initialState = {
  questions: [
      {
        id: 0,
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
      },
    ],
};

const useQuizStore = create<QuizStore>()(
  immer(set => ({
    // prize state
    prize: 0,
    setPrize: (prize: number) =>
      set(
        produce(state => {
          state.prize = Number(prize);
        }),
      ),
    isValidatePrize: null,
    validatePrize: () =>
      set(
        produce(async state => {
          const prizeSchema = z.number().min(2).max(1000);
          try {
            await prizeSchema.parseAsync(state.prize);
            set({ isValidatePrize: true });
          } catch (error) {
            set({ isValidatePrize: false });
          }
        }),
      ),

    // questions state
    questions: [
      {
        id: 0,
        questionText: '',
        choices: [
          {
            letter: 'A',
            value: '',
          },
          {
            letter: 'B',
            value: '',
          },
          {
            letter: 'C',
            value: '',
          },
          {
            letter: 'D',
            value: '',
          },
        ],
        answer: '',
      },
      {
        id: 1,
        questionText: '',
        choices: [
          {
            letter: 'A',
            value: '',
          },
          {
            letter: 'B',
            value: '',
          },
          {
            letter: 'C',
            value: '',
          },
          {
            letter: 'D',
            value: '',
          },
        ],
        answer: '',
      },
      {
        id: 2,
        questionText: '',
        choices: [
          {
            letter: 'A',
            value: '',
          },
          {
            letter: 'B',
            value: '',
          },
          {
            letter: 'C',
            value: '',
          },
          {
            letter: 'D',
            value: '',
          },
        ],
        answer: '',
      },
      {
        id: 3,
        questionText: '',
        choices: [
          {
            letter: 'A',
            value: '',
          },
          {
            letter: 'B',
            value: '',
          },
          {
            letter: 'C',
            value: '',
          },
          {
            letter: 'D',
            value: '',
          },
        ],
        answer: '',
      },
      {
        id: 4,
        questionText: '',
        choices: [
          {
            letter: 'A',
            value: '',
          },
          {
            letter: 'B',
            value: '',
          },
          {
            letter: 'C',
            value: '',
          },
          {
            letter: 'D',
            value: '',
          },
        ],
        answer: '',
      },
    ],
    addQuestion: () =>
      set(
        produce(state => {
          state.questions.push({
            id: state.questions.length,
            ...initialState,
          });
        }),
      ),
    editQuestion: (idx: number, newValue: string) =>
      set(
        produce(state => {
          state.questions[idx].questionText = newValue;
        }),
      ),
    deleteQuestion: (id: number) =>
      set(
        produce(state => {
          state.questions.splice(id, 1);
        }),
      ),
    isValidateQuestion: [
      {
        question: null,
        choices: null,
        answer: -1,
      },
      {
        question: null,
        choices: null,
        answer: -1,
      },
      {
        question: null,
        choices: null,
        answer: -1,
      },
      {
        question: null,
        choices: null,
        answer: -1,
      },
      {
        question: null,
        choices: null,
        answer: -1,
      },
    ],
    validateQuestion: (idx: number, validate: string) =>
      set(
        produce(state => {
          state.isValidateQuestion[idx].question = validate;
        }),
      ),
    validateChoice: (idx: number, validate: string) =>
      set(
        produce(state => {
          state.isValidateQuestion[idx].choices = validate;
        }),
      ),

    // edit choices
    editChoice: (idx: number, choiceIdx: number, newValue: string) =>
      set(
        produce(state => {
          state.questions[idx].choices[choiceIdx].value = newValue;
        }),
      ),
  })),
);

//should have a function that return just the answers to each questions
//const Answers = QuizStore(state);  state.questions[idx].a

export default useQuizStore;
