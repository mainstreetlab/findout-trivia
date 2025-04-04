import { produce } from 'immer';
import { z } from 'zod';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from "zustand/middleware";
import { useSettingsStore, type Settings } from "./useSettingsStore";

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

  // Settings integration
  getSettings: () => Settings;

  // Quiz metadata
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;

  // Add these new methods
  applyQuestionMode: (mode: string) => void;
  getQuestionCount: () => number;
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

// Add this function to create empty questions based on mode
const createEmptyQuestions = (mode: string): Question[] => {
  const settings = useSettingsStore.getState().settings;
  let questionCount = 5; // Default

  if (mode === "short") {
    questionCount = 5;
  } else if (mode === "long") {
    questionCount = 30;
  } else if (mode === "custom") {
    // Use the unitTimer setting as our custom question count
    const customCount = parseInt(settings.unitTimer);
    if (!isNaN(customCount) && customCount > 0) {
      questionCount = Math.min(customCount, 100); // Cap at 100 questions
    }
  }

  return Array.from({ length: questionCount }, (_, index) => ({
    id: index,
    questionText: "",
    choices: [
      { letter: "A", value: "" },
      { letter: "B", value: "" },
      { letter: "C", value: "" },
      { letter: "D", value: "" },
    ],
    answer: null,
  }));
};

// Add this function to create empty validation entries
const createEmptyValidations = (mode: string) => {
  const settings = useSettingsStore.getState().settings;
  let questionCount = 5; // Default

  if (mode === "short") {
    questionCount = 5;
  } else if (mode === "long") {
    questionCount = 30;
  } else if (mode === "custom") {
    // Use the unitTimer setting as our custom question count
    const customCount = parseInt(settings.unitTimer);
    if (!isNaN(customCount) && customCount > 0) {
      questionCount = Math.min(customCount, 100); // Cap at 100 questions
    }
  }

  return Array.from({ length: questionCount }, () => ({
    question: null,
    choices: null,
    answer: -1,
  }));
};

const useCreateQuizStore = create<CreateQuizStore>()(
  persist(
    immer((set, get) => ({
      // prize state
      prize: 0,
      setPrize: (prize: number) =>
        set(
          produce((state) => {
            state.prize = Number(prize);
          }),
        ),
      isValidatePrize: null,
      validatePrize: () =>
        set(
          produce(async (state) => {
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
          answer: null,
        },
        {
          id: 1,
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
          answer: null,
        },
        {
          id: 2,
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
          answer: null,
        },
        {
          id: 3,
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
          answer: null,
        },
        {
          id: 4,
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
          answer: null,
        },
      ],
      addQuestion: () =>
        set(
          produce((state) => {
            state.questions.push({
              id: state.questions.length,
              ...initialState,
            });
          }),
        ),
      editQuestion: (idx: number, newValue: string) =>
        set(
          produce((state) => {
            state.questions[idx].questionText = newValue;
          }),
        ),
      deleteQuestion: (id: number) =>
        set(
          produce((state) => {
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
          produce((state) => {
            state.isValidateQuestion[idx].question = validate;
          }),
        ),
      validateChoice: (idx: number, validate: string) =>
        set(
          produce((state) => {
            state.isValidateQuestion[idx].choices = validate;
          }),
        ),

      // edit choices
      editChoice: (idx: number, choiceIdx: number, newValue: string) =>
        set(
          produce((state) => {
            state.questions[idx].choices[choiceIdx].value = newValue;
          }),
        ),
      // set answer
      editAnswer: (idx: number, choiceIdx: number) =>
        set(
          produce((state) => {
            state.questions[idx].answer = choiceIdx;
            state.isValidateQuestion[idx].answer = choiceIdx;
          }),
        ),
      getAnswers: () => {
        const answers: number[] = [];
        get().questions.forEach((question) => answers.push(question.answer!));

        return answers;
      },
      // get Answers() {
      //   return !!get().questions;
      // },

      // Add these new properties
      title: "",
      description: "",
      setTitle: (title: string) => set({ title }),
      setDescription: (description: string) => set({ description }),

      // Settings integration
      getSettings: () => {
        return useSettingsStore.getState().settings;
      },

      // Add these new methods
      applyQuestionMode: (mode: string) =>
        set(
          produce((state) => {
            const newQuestions = createEmptyQuestions(mode);
            const newValidations = createEmptyValidations(mode);

            state.questions = newQuestions;
            state.isValidateQuestion = newValidations;
          }),
        ),

      getQuestionCount: () => {
        const settings = useSettingsStore.getState().settings;
        return settings.mode === "short"
          ? 5
          : settings.mode === "long"
            ? 30
            : 5;
      },
    })),
    {
      name: "findout-create-quiz",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCreateQuizStore;
