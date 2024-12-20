import { Pattern } from '../types';

export const patterns: Pattern[] = [
  // Numeric Patterns
  { 
    sequence: "2, 4, 6, 8, ?",
    answer: "10",
    hint: "Look for a constant difference between numbers",
    explanation: "This is an arithmetic sequence where each number increases by 2",
    type: "numeric",
    difficulty: "easy"
  },
  { 
    sequence: "1, 1, 2, 3, 5, ?",
    answer: "8",
    hint: "Each number is related to the previous two numbers",
    explanation: "This is the Fibonacci sequence where each number is the sum of the previous two numbers",
    type: "numeric",
    difficulty: "medium"
  },
  { 
    sequence: "2, 6, 12, 20, ?",
    answer: "30",
    hint: "Look at the differences between consecutive numbers",
    explanation: "The differences form an arithmetic sequence: 4, 6, 8, 10. Add 10 to 20 to get 30",
    type: "numeric",
    difficulty: "hard"
  },
  
  // Symbolic Patterns
  {
    sequence: "△, □, △, □, ?",
    answer: "△",
    hint: "Look for alternating shapes",
    explanation: "This is an alternating pattern between triangle and square",
    type: "symbolic",
    difficulty: "easy"
  },
  {
    sequence: "●, ●○, ●●○, ●●●○, ?",
    answer: "●●●●○",
    hint: "Count the filled circles in each term",
    explanation: "Each term adds one filled circle before the empty circle",
    type: "symbolic",
    difficulty: "medium"
  },
  
  // Logical Patterns
  {
    sequence: "MON, WED, FRI, ?",
    answer: "SUN",
    hint: "Think about days of the week",
    explanation: "The pattern skips one day each time: Monday → Wednesday → Friday → Sunday",
    type: "logical",
    difficulty: "medium"
  },
  {
    sequence: "Y, O, R, ?",
    answer: "P",
    hint: "Think about the word these letters spell",
    explanation: "The letters spell 'YOUR' → the next letter completes the word 'YOUR P(urple)'",
    type: "logical",
    difficulty: "hard"
  }
];