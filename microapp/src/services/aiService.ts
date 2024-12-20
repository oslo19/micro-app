import { Pattern } from '../types';
import { generateAIHint } from '../utils/aiHelper';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Enable client-side usage
});

export async function getAIHint(pattern: Pattern, userAttempts: number) {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    console.warn('No OpenAI API key found, using local hint generator');
    return generateAIHint(pattern, userAttempts);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a helpful AI assistant that provides hints for pattern recognition puzzles."
      }, {
        role: "user",
        content: `Pattern: ${pattern.sequence}\nPattern Type: ${pattern.type}\nDifficulty: ${pattern.difficulty}\nAttempts: ${userAttempts}\n\nProvide a helpful hint without revealing the answer directly.`
      }],
      temperature: 0.7,
      max_tokens: 150
    });

    return {
      hint: completion.choices[0].message.content || "No hint available",
      confidence: 0.9,
      reasoning: `AI-generated hint based on ${pattern.type} pattern analysis`
    };
  } catch (error) {
    console.error('Error getting AI hint:', error);
    return generateAIHint(pattern, userAttempts);
  }
} 