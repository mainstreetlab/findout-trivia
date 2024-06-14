import { Schema, model, models } from "mongoose";

const ChoiceSchema = new Schema({
  value: {
    type: String,
    required: true,
    minLength: [3, "Answers must be at least 3 characters long"],
    maxlength: [65, "Answers cannot exceed 65 characters"],
  },
  isCorrect: { type: Boolean, default: false },
});

const QuestionSchema = new Schema(
  {
    questionText: {
      type: String,
      required: true,
      minlength: [5, "Question must be at least 5 characters long"],
      maxlength: [255, "Question cannot exceed 255 characters"],
    },
    choices: {
      type: [ChoiceSchema],
      required: true,
      // validate: {
      //   validator: (choices) => choices.length === 4,
      //   message: "Choices must contain exactly 4 options.",
      // },
    },
    answer: {
      type: Number, // Index of the correct choice (0-based)
      required: true,
      // validate: {
      //   validator: (answer) => answer >= 0 && answer < 4, // Valid answer index within choices
      //   message: "Answer index must be between 0 and 3 (inclusive).",
      // },
      validate: [
        validateAnswerIndex,
        "Selected answer does not match the choices!",
      ],
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: User, // Reference the User schema
    //   required: true,
    // },
  },
  { timestamps: true },
);

QuestionSchema.pre("save", async function (next) {
  const question = this; // Use 'this' to access the document being saved
  question.choices.forEach((choice, index) => {
    choice.isCorrect = index === question.answer; // Set isCorrect based on answer index
  });
  next(); // Call next() to proceed with saving
});

// validator functions
function validateAnswerIndex(answer) {
  return this.choices && answer >= 0 && answer < this.choices.length;
}

function choicesLengthValidator(choices) {
  return choices.length === 4;
}

function validateIsCorrect(choices) {
  // Check if exactly one choice has isCorrect set to true
  const correctChoices = choices.filter((choice) => choice.isCorrect);
  return (
    correctChoices.length === 1 ||
    "Exactly one choice must be marked as correct"
  );
}

const validateChoiceSchema = [choicesLengthValidator, validateIsCorrect]; // Combine validations

QuestionSchema.pre("validate", function (next) {
  const errors = []; // Collect potential errors
  const question = this;

  if (!validateChoiceSchema.every((validator) => validator(question.choices))) {
    // Perform all validations
    errors.push("Choices validation failed");
  }

  if (errors.length > 0) {
    next(new Error(errors.join(", "))); // Throw a combined error message if validations fail
  } else {
    next(); // Proceed with validation if no errors
  }
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
