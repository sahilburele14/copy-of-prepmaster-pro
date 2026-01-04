
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  mcqStats: {
    totalAttempts: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 }
  },
  points: { type: Number, default: 0 }
});

const ProblemSchema = new mongoose.Schema({
  title: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  category: String,
  description: String,
  constraints: [String],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  starterCode: {
    javascript: String,
    python: String,
    java: String,
    cpp: String
  }
});

const MCQSchema = new mongoose.Schema({
  topicId: String,
  question: String,
  options: [String],
  correctAnswer: Number,
  explanation: String
});

export const User = mongoose.model('User', UserSchema);
export const Problem = mongoose.model('Problem', ProblemSchema);
export const MCQ = mongoose.model('MCQ', MCQSchema);
