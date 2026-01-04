
import { Problem, MCQQuestion, Topic, Language } from './types';

export const LANGUAGES: Language[] = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
];

export const TOPICS: Topic[] = [
  { id: 'java', name: 'Java Programming', icon: '☕', count: 120 },
  { id: 'dbms', name: 'Database Systems', icon: '🗄️', count: 85 },
  { id: 'os', name: 'Operating Systems', icon: '💻', count: 64 },
  { id: 'aptitude', name: 'Aptitude & Logic', icon: '🧠', count: 210 },
  { id: 'networking', name: 'Networking', icon: '🌐', count: 45 },
];

export const PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Write your code here\n};",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
    }
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    starterCode: {
      javascript: "function isValid(s) {\n  \n};",
      python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        pass",
      java: "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};"
    }
  }
];

export const MCQS: MCQQuestion[] = [
  {
    id: 'm1',
    topicId: 'java',
    question: 'Which of these is not a feature of Java?',
    options: ['Object-oriented', 'Use of pointers', 'Platform independent', 'Architecture neutral'],
    correctAnswer: 1,
    explanation: 'Java does not support pointers to ensure security and simplicity.'
  },
  {
    id: 'm2',
    topicId: 'java',
    question: 'What is the extension of a Java bytecode file?',
    options: ['.java', '.js', '.class', '.obj'],
    correctAnswer: 2,
    explanation: 'The compiler generates a .class file containing the bytecode.'
  },
  {
    id: 'm3',
    topicId: 'dbms',
    question: 'What does SQL stand for?',
    options: ['Strong Question Language', 'Structured Query Language', 'Structured Question Layout', 'Standard Query List'],
    correctAnswer: 1,
    explanation: 'SQL stands for Structured Query Language, used for managing relational databases.'
  }
];
