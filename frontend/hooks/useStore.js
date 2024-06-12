import { create } from "zustand";

const useStore = create((set) => ({
  questions: [],
  addQuestion: (question) =>
    set((state) => ({
      questions: [
        ...state.questions,
        {
          id: state.questions.length,
          ...question,
          completed: false,
        },
      ],
    })),
  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((question) => question.id !== id),
    })),
  resetQuestions: () =>
    set(() => {
      questions: {
      }
    }),
}));

export default useStore;
