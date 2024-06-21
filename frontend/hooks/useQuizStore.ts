import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface QuizStore {
  // Existing properties
  prize: number;
  setPrize: (amount: number) => void;

  // Questions state
  questions: Question[];
  addQuestion: () => void;
  editQuestion: (idx: number, newValue: string) => void;
  deleteQuestion: (id: number) => void;

  // Choices editing
  editChoice: (idx: number, choiceIdx: number, newValue: string) => void;
}

interface Question {
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
};

const useQuizStore = create<QuizStore>()(
  immer((set) => ({
    // prize state
    prize: 0,
    setPrize: (prize: number) =>
      set(
        produce((state) => {
          state.prize = Number(prize);
        })
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
        answer: "",
      },
    ],
    addQuestion: () =>
      set(
        produce((state) => {
          state.questions.push({
            id: state.questions.length,
            ...initialState,
          });
        })
      ),
    editQuestion: (idx: number, newValue: string) =>
      set(
        produce((state) => {
          state.questions[idx].questionText = newValue;
        })
      ),
    deleteQuestion: (id: number) =>
      set(
        produce((state) => {
          state.questions.splice(id, 1);
        })
      ),
    // edit choices
    editChoice: (idx: number, choiceIdx: number, newValue: string) =>
      set(
        produce((state) => {
          state.questions[idx].choices[choiceIdx].value = newValue;
        })
      ),
  }))
);

//should have a function that return just the answers to each questions
//const Answers = QuizStore(state);  state.questions[idx].a

export default useQuizStore;
