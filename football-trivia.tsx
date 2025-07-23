"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RotateCcw, Zap, Target, Award, Shuffle } from "lucide-react"
import { triviaUtils } from "./data/football-trivia"

type Question = {
  id: number
  question: string
  options: string[]
  correct: number
  difficulty: string
  category: string
}

type GameMode = "random" | "easy" | "medium" | "hard" | "current"

export default function FootballTrivia() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [gameMode, setGameMode] = useState<GameMode>("random")
  const [showModeSelect, setShowModeSelect] = useState(true)

  const initializeGame = (mode: GameMode) => {
    let selectedQuestions: Question[] = []

    switch (mode) {
      case "easy":
        selectedQuestions = triviaUtils.getQuestionsByDifficulty("easy")
        break
      case "medium":
        selectedQuestions = triviaUtils.getQuestionsByDifficulty("medium")
        break
      case "hard":
        selectedQuestions = triviaUtils.getQuestionsByDifficulty("hard")
        break
      case "current":
        selectedQuestions = triviaUtils.getQuestionsByDifficulty("current")
        break
      default:
        selectedQuestions = triviaUtils.getRandomQuestions(10)
    }

    // If not enough questions in category, supplement with random ones
    if (selectedQuestions.length < 8) {
      const additionalQuestions = triviaUtils.getRandomQuestions(10 - selectedQuestions.length)
      selectedQuestions = [...selectedQuestions, ...additionalQuestions]
    }

    setQuestions(selectedQuestions.slice(0, 10))
    setGameMode(mode)
    setShowModeSelect(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameComplete(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
    }
  }

  const resetGame = () => {
    setShowModeSelect(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      case "current":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-emerald-600"
    if (percentage >= 60) return "text-amber-600"
    return "text-rose-600"
  }

  const getScoreGradient = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "from-emerald-500 to-teal-600"
    if (percentage >= 60) return "from-amber-500 to-orange-600"
    return "from-rose-500 to-pink-600"
  }

  if (showModeSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <Trophy className="relative w-20 h-20 text-blue-500 drop-shadow-lg" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Football Trivia Challenge
            </CardTitle>
            <p className="text-lg text-slate-600">Choose your difficulty level and test your football knowledge!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <Button
                onClick={() => initializeGame("random")}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Shuffle className="w-6 h-6 mr-3" />
                Mixed Challenge (Random Questions)
              </Button>

              <Button
                onClick={() => initializeGame("easy")}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Easy Mode
              </Button>

              <Button
                onClick={() => initializeGame("medium")}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Medium Mode
              </Button>

              <Button
                onClick={() => initializeGame("hard")}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Hard Mode
              </Button>

              <Button
                onClick={() => initializeGame("current")}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Current Season 2025
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <Trophy className="relative w-20 h-20 text-yellow-500 drop-shadow-lg" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Game Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-center">
            <div className="relative">
              <div
                className={`text-7xl font-black bg-gradient-to-r ${getScoreGradient()} bg-clip-text text-transparent drop-shadow-sm`}
              >
                {score}
              </div>
              <div className="text-2xl text-slate-400 font-medium">out of {questions.length}</div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
              <p className="text-xl font-semibold text-slate-700 mb-2">
                {triviaUtils.getScoreMessage(score, questions.length)}
              </p>
              <div className="flex items-center justify-center gap-2 text-lg mb-3">
                <Target className="w-5 h-5 text-slate-500" />
                <span className="font-bold text-slate-800">
                  {Math.round((score / questions.length) * 100)}% Accuracy
                </span>
              </div>
              <Badge className={`${getDifficultyColor(gameMode)} text-sm font-medium`}>
                {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)} Mode
              </Badge>
            </div>

            <Button
              onClick={resetGame}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              size="lg"
            >
              <RotateCcw className="w-6 h-6 mr-3" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{currentQuestion + 1}</span>
              </div>
              <div className="text-sm font-medium text-slate-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${getDifficultyColor(questions[currentQuestion].difficulty)} text-xs font-medium`}>
                {questions[currentQuestion].difficulty}
              </Badge>
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full border border-emerald-200">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Score: {score}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-3 bg-slate-200" />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Progress</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
          </div>

          <div className="mb-4">
            <Badge variant="outline" className="text-xs text-slate-600 mb-3">
              {questions[currentQuestion].category}
            </Badge>
            <CardTitle className="text-2xl font-bold leading-relaxed text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {questions[currentQuestion].question}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => {
            let buttonClass =
              "group w-full p-5 text-left border-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"

            if (showResult) {
              if (index === questions[currentQuestion].correct) {
                buttonClass +=
                  " bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 text-emerald-800 shadow-lg scale-[1.02]"
              } else if (index === selectedAnswer) {
                buttonClass += " bg-gradient-to-r from-rose-50 to-pink-50 border-rose-400 text-rose-800 shadow-lg"
              } else {
                buttonClass += " bg-slate-50 border-slate-200 text-slate-400"
              }
            } else {
              buttonClass +=
                " border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showResult}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-indigo-100 flex items-center justify-center text-sm font-bold mr-4 transition-all duration-300">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            )
          })}

          {showResult && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="text-center space-y-6">
                {selectedAnswer === questions[currentQuestion].correct ? (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                    <div className="flex items-center justify-center gap-3 text-emerald-700 font-bold text-xl mb-2">
                      <Zap className="w-6 h-6" />
                      Correct! Outstanding!
                    </div>
                    <p className="text-emerald-600">You're on fire! Keep it up!</p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6">
                    <div className="text-rose-700 font-bold text-xl mb-2">Not quite right</div>
                    <p className="text-rose-600">
                      The correct answer is{" "}
                      <span className="font-bold">{String.fromCharCode(65 + questions[currentQuestion].correct)}</span>.
                      Better luck next time!
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleNextQuestion}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  size="lg"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question →" : "View Results 🎉"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
