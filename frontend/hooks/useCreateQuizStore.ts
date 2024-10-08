import { produce } from 'immer';
import { z } from 'zod';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface CreateQuizStore {
  // Prize state
  prize: number | undefined | string;
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
    answer: number | null;
  }[];
  validateQuestion: (idx: number, validate: string) => void;
  validateChoice: (idx: number, validate: string) => void;

  // Choices editing
  editChoice: (idx: number, choiceIdx: number, newValue: string) => void;

  // Answer setters and getters
  editAnswer: (idx: number, choiceIdx: number) => void;
  getAnswers: () => number[];
}

export interface Question {
  id: number;
  questionText: string;
  choices: Choice[];
  answer: number | null;
}

interface Choice {
  letter: string;
  value: string;
}
const initialState = {
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
  ],
};

const useCreateQuizStore = create<CreateQuizStore>()(
  immer((set, get) => ({
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
        answer: null,
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
        answer: null,
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
        answer: null,
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
        answer: null,
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
        answer: null,
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
    // set answer
    editAnswer: (idx: number, choiceIdx: number) =>
      set(
        produce(state => {
          state.questions[idx].answer = choiceIdx;
          state.isValidateQuestion[idx].answer = choiceIdx;
        }),
      ),
    getAnswers: () => {
      const answers: number[] = [];
      get().questions.forEach(question => answers.push(question.answer!));

      return answers;
    },
    // get Answers() {
    //   return !!get().questions;
    // },
  })),
);

export default useCreateQuizStore;
