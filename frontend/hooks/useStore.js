import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
produce;

const useStore = create()(
  immer((set) => ({
    questions: [
      {
        id: 0,
        questionText: "",
        choices: [
          {
            letter: "A.",
            value: "",
          },
          {
            letter: "B.",
            value: "",
          },
          {
            letter: "C.",
            value: "",
          },
          {
            letter: "D.",
            value: "",
          },
        ],
        answer: "",
      },
      // { id: 1, questionText: "", choices: [], answer: "" },
      // { id: 2, questionText: "", choices: [], answer: "" },
      // { id: 3, questionText: "", choices: [], answer: "" },
      // { id: 4, questionText: "", choices: [], answer: "" },
    ],
    addQuestion: (question) =>
      set(
        produce((state) => {
          state.questions.push({
            id: state.questions.length,
            ...question,
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

export default useStore;
