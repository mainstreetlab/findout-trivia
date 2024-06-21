import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
produce;

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

const useQuizStore = create()(
  immer((set) => ({
    // prize state
    prize: 0,
    setPrize: (prize) =>
      set(
        produce((state) => {
          state.prize = Number(prize);
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
        }),
      ),
    editQuestion: (idx, newValue) =>
      set(
        produce((state) => {
          state.questions[idx].questionText = newValue;
        }),
      ),
    deleteQuestion: (id) =>
      set(
        produce((state) => {
          state.questions.splice(id, 1);
        }),
      ),
    resetQuestions: () =>
      set(() => {
        questions: [];
      }),
    // edit choices
    editChoice: (idx, choiceIdx, newValue) =>
      set(
        produce((state) => {
          state.questions[idx].choices[choiceIdx].value = newValue;
        }),
      ),
  })),
);

//should have a function that return just the answers to each questions
//const Answers = QuizStore(state);  state.questions[idx].a

export default useQuizStore;
