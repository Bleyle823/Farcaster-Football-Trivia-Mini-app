"use client";

import {
  PwaBottomNavbar,
  bottomNavHeight,
} from "@/app/pwa/components/bottom-navbar";
import { PwaSafeArea } from "@/app/pwa/components/safe-area";
import { PwaTopNavbar, topNavHeight } from "@/app/pwa/components/top-navbar";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type TriviaQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

const QUESTIONS: TriviaQuestion[] = [
  {
    question: "Which country won the 2022 FIFA World Cup?",
    options: ["France", "Argentina", "Brazil", "Germany"],
    answerIndex: 1,
  },
  {
    question: "Who holds the record for most Ballon d'Or awards?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Michel Platini", "Johan Cruyff"],
    answerIndex: 1,
  },
  {
    question: "Which club has the most UEFA Champions League titles?",
    options: ["AC Milan", "Bayern Munich", "Barcelona", "Real Madrid"],
    answerIndex: 3,
  },
  {
    question: "Which player is known as 'El Fenómeno'?",
    options: ["Ronaldo Nazário", "Ronaldinho", "Romário", "Rivaldo"],
    answerIndex: 0,
  },
  {
    question: "Which nation has won the most FIFA World Cups?",
    options: ["Brazil", "Italy", "Germany", "Argentina"],
    answerIndex: 0,
  },
];

export default function HomePage() {
  const totalQuestions = QUESTIONS.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const currentQuestion = useMemo(
    () => QUESTIONS[currentQuestionIndex],
    [currentQuestionIndex],
  );

  function handleSelectOption(optionIndex: number) {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(optionIndex);
    if (optionIndex === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsCompleted(true);
      // Save game statistics to localStorage
      saveGameStats();
    }
  }

  function saveGameStats() {
    const existingStats = localStorage.getItem('football-trivia-stats');
    const stats = existingStats ? JSON.parse(existingStats) : {
      gamesPlayed: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      bestScore: 0,
      averageScore: 0,
    };

    // Update stats
    stats.gamesPlayed += 1;
    stats.totalQuestions += totalQuestions;
    stats.correctAnswers += score;
    stats.bestScore = Math.max(stats.bestScore, score);
    stats.averageScore = stats.correctAnswers / stats.totalQuestions;

    localStorage.setItem('football-trivia-stats', JSON.stringify(stats));
  }

  function handleRestart() {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setIsCompleted(false);
    setGameStarted(false);
  }

  function handleStart() {
    setGameStarted(true);
  }

  return (
    <PwaSafeArea {...{ topNavHeight, bottomNavHeight }}>
      <PwaTopNavbar />
      <main className="mx-auto flex w-full max-w-global flex-1 flex-col gap-4 p-4">
        {!gameStarted && !isCompleted ? (
          <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-6 text-center">
            <h1 className="text-3xl font-bold">⚽ Football Trivia</h1>
            <p className="text-lg text-muted-foreground">
              Test your knowledge with {totalQuestions} exciting football questions!
            </p>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Answer questions about FIFA World Cups, legendary players, famous clubs, and more!
              </p>
            </div>
            <button
              onClick={handleStart}
              className="rounded-md bg-primary px-6 py-3 text-lg text-primary-foreground hover:opacity-90"
            >
              Start Trivia
            </button>
          </div>
        ) : gameStarted && !isCompleted ? (
          <div className="mx-auto w-full max-w-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">
                Score: {score} / {totalQuestions}
              </div>
            </div>
            
            <div className="mb-4 h-2 w-full rounded-full bg-muted">
              <div 
                className="h-2 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <h1 className="mb-6 text-xl font-semibold">
              {currentQuestion.question}
            </h1>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOptionIndex === index;
                const isCorrect = index === currentQuestion.answerIndex;
                const showState = selectedOptionIndex !== null;
                return (
                  <button
                    key={`option-${index}`}
                    onClick={() => handleSelectOption(index)}
                    disabled={showState}
                    className={cn(
                      "w-full rounded-md border px-4 py-3 text-left transition-colors",
                      !showState && "hover:bg-muted",
                      showState && isCorrect && "border-green-600 bg-green-50 text-green-800",
                      showState && isSelected && !isCorrect && "border-red-600 bg-red-50 text-red-800",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleRestart}
                className="rounded-md border px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
              >
                Restart
              </button>
              <button
                onClick={handleNext}
                disabled={selectedOptionIndex === null}
                className={cn(
                  "rounded-md bg-primary px-6 py-2 text-primary-foreground",
                  selectedOptionIndex === null && "opacity-50 cursor-not-allowed",
                )}
              >
                {currentQuestionIndex + 1 < totalQuestions ? "Next Question" : "Finish"}
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-md text-center">
            <div className="mb-6">
              <h2 className="mb-2 text-3xl font-bold">🎉 Quiz Complete!</h2>
              <div className="text-4xl font-bold text-primary">
                {score} / {totalQuestions}
              </div>
              <p className="mt-2 text-lg text-muted-foreground">
                {score === totalQuestions 
                  ? "Perfect score! You're a football expert! ⚽"
                  : score >= totalQuestions * 0.8 
                  ? "Great job! You know your football! 👏"
                  : score >= totalQuestions * 0.6
                  ? "Not bad! Keep learning about football! 📚"
                  : "Keep practicing! There's always more to learn! 💪"
                }
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleRestart}
                className="w-full rounded-md bg-primary px-6 py-3 text-primary-foreground hover:opacity-90"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </main>
      <PwaBottomNavbar />
    </PwaSafeArea>
  );
}
