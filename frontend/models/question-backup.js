import { Schema, model, models } from "mongoose";

const ChoiceSchema = new Schema({
  value: {
    type: String,
    required: true,
    minLength: [3, "Answers must be at least 3 characters long"],
    maxlength: [65, "Answers cannot exceed 65 characters"],
  },
  isCorrect: { type: Boolean },
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
      validate: {
        validator: (choices) => choices.length === 4,
        message: "Choices must contain exactly 4 options.",
      },
    },
    answer: {
      type: Number, // Index of the correct choice (0-based)
      required: true,
      validate: {
        validator: (answer) => answer >= 0 && answer < 4, // Valid answer index within choices
        message: "Answer index must be between 0 and 3 (inclusive).",
      },
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: User, // Reference the User schema
    //   required: true,
    // },
  },
  { timestamps: true },
);

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
