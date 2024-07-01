import { QuizStore } from '@/hooks/useQuizStore';

interface Error {
  question?: string | null;
  choices?: string | null;
  answer?: string | null;
}

export default function checkValidationErrors(
  isValidateQuestion: QuizStore['isValidateQuestion'],
) {
  const errors = []; // Array to store errors per question

  for (let i = 0; i < isValidateQuestion.length; i++) {
    const question = isValidateQuestion[i];
    const error: Error = {
      // question: null,
      // choices: null,
      // answer: null,
    }; // Object to store individual question errors

    if (question.question) {
      error.question = 'Question text required';
    }

    if (question.choices) {
      error.choices = 'Please fill all 4 choices correctly';
    }

    if (question.answer! < 0 || question.answer! > 3) {
      error.answer = 'Selected answer index out of range (0-3)';
    }

    if (Object.keys(error).length > 0) {
      errors.push({ index: i, error }); // Add error object for this question
    }
  }

  return errors; // Return array of error objects (empty if no errors)
}
