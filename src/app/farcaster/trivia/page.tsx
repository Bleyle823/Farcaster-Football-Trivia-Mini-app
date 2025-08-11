"use client";

import {
  BottomNavbar,
  bottomNavHeight,
} from "@/app/farcaster/components/bottom-navbar";
import { SafeArea } from "@/app/farcaster/components/safe-area";
import { TopNavbar, topNavHeight } from "@/app/farcaster/components/top-navbar";
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

export default function TriviaPage() {
  const totalQuestions = QUESTIONS.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = useMemo(
    () => QUESTIONS[currentQuestionIndex]!,
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
    }
  }

  function handleRestart() {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setIsCompleted(false);
  }

  return (
    <SafeArea {...{ topNavHeight, bottomNavHeight }}>
      <TopNavbar />
      <main className="mx-auto flex w-full max-w-global flex-1 flex-col gap-4 p-4">
        {!isCompleted ? (
          <div className="mx-auto w-full max-w-md">
            <div className="mb-2 text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
            <h1 className="mb-4 text-xl font-semibold">
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
                      "w-full rounded-md border px-4 py-3 text-left",
                      !showState && "hover:bg-muted",
                      showState && isCorrect && "border-green-600 bg-green-50",
                      showState && isSelected && !isCorrect && "border-red-600 bg-red-50",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Score: {score} / {totalQuestions}
              </div>
              <button
                onClick={handleNext}
                disabled={selectedOptionIndex === null}
                className={cn(
                  "rounded-md bg-primary px-4 py-2 text-primary-foreground",
                  selectedOptionIndex === null && "opacity-50",
                )}
              >
                {currentQuestionIndex + 1 < totalQuestions ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-md text-center">
            <h2 className="mb-2 text-2xl font-semibold">All done!</h2>
            <p className="mb-6 text-muted-foreground">
              You scored {score} out of {totalQuestions}.
            </p>
            <button
              onClick={handleRestart}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
              Play Again
            </button>
          </div>
        )}
      </main>
      <BottomNavbar />
    </SafeArea>
  );
}


