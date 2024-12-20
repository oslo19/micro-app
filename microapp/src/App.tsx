import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { patterns } from './data/patterns';
import { PatternDisplay } from './components/PatternDisplay';
import { InputGroup } from './components/InputGroup';
import { Feedback } from './components/Feedback';
import { AIAssistant } from './components/AIAssistant';
import { Pattern, FeedbackState, AIHint } from './types';
import { getAIHint } from './services/aiService';
import { saveProgress, getProgress } from './utils/progressTracker';

function App() {
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>({ message: '', type: null });
  const [attempts, setAttempts] = useState(0);
  const [aiHint, setAIHint] = useState<AIHint | null>(null);
  const [userProgress, setUserProgress] = useState(getProgress());

  const generatePattern = () => {
    const randomIndex = Math.floor(Math.random() * patterns.length);
    setCurrentPattern(patterns[randomIndex]);
    setUserAnswer('');
    setFeedback({ message: '', type: null });
    setAttempts(0);
    setAIHint(null);
  };

  const checkAnswer = async () => {
    if (!currentPattern) {
      alert('Please generate a pattern first.');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const isCorrect = userAnswer.trim().toLowerCase() === currentPattern.answer.toLowerCase();

    if (isCorrect) {
      const points = Math.max(10 - (attempts * 2), 5);
      setScore(prev => prev + points);
      
      const progress = saveProgress(points, newAttempts, true);
      setUserProgress(progress);
      
      setFeedback({
        message: 'Correct! Well done!',
        type: 'success',
        explanation: currentPattern.explanation
      });
    } else {
      const hint = await getAIHint(currentPattern, newAttempts);
      setAIHint(hint);

      setFeedback({
        message: newAttempts === 1 ? 
          'Not quite right. Try looking at the pattern more carefully!' : 
          'Still incorrect. Check the AI hint below for guidance!',
        type: 'error'
      });

      saveProgress(0, newAttempts, false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
          <Brain className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-500">Pattern Completion</h1>
        </div>

        <PatternDisplay pattern={currentPattern} />

        <div className="space-y-4">
          <InputGroup
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={checkAnswer}
            onKeyPress={handleKeyPress}
            disabled={!currentPattern}
          />

          <button
            onClick={generatePattern}
            className="w-full bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
          >
            Generate Pattern
          </button>
        </div>

        <Feedback feedback={feedback} />
        <AIAssistant hint={aiHint} />

        <div className="mt-4 text-center">
          <div className="text-lg font-semibold">Score: {score}</div>
          {userProgress && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-white rounded shadow-sm">
                  <p className="text-gray-600">Total Score</p>
                  <p className="font-medium text-lg">{userProgress.totalScore}</p>
                </div>
                <div className="p-2 bg-white rounded shadow-sm">
                  <p className="text-gray-600">Success Rate</p>
                  <p className="font-medium text-lg">
                    {Math.round((userProgress.correctAnswers / userProgress.gamesPlayed) * 100)}%
                  </p>
                </div>
                <div className="p-2 bg-white rounded shadow-sm">
                  <p className="text-gray-600">Games Played</p>
                  <p className="font-medium text-lg">{userProgress.gamesPlayed}</p>
                </div>
                <div className="p-2 bg-white rounded shadow-sm">
                  <p className="text-gray-600">Avg. Attempts</p>
                  <p className="font-medium text-lg">{userProgress.averageAttempts.toFixed(1)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;