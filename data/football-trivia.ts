const footballTrivia = {
  // Premier League & English Football
  premierLeague: [
    {
      id: 1,
      question: "Which two teams gained automatic promotion to the 2025/26 Premier League season?",
      options: [
        "Leeds United & Burnley",
        "Sheffield United & Sunderland",
        "Leicester City & Ipswich",
        "Norwich City & Watford",
      ],
      correct: 0,
      difficulty: "current",
      category: "Premier League",
    },
    {
      id: 2,
      question: "Who holds the record for most Premier League goals in a single season?",
      options: ["Alan Shearer", "Mohamed Salah", "Erling Haaland", "Harry Kane"],
      correct: 2,
      difficulty: "medium",
      category: "Premier League",
    },
    {
      id: 3,
      question: "Which team has won the most Premier League titles?",
      options: ["Arsenal", "Chelsea", "Liverpool", "Manchester United"],
      correct: 3,
      difficulty: "easy",
      category: "Premier League",
    },
    {
      id: 4,
      question: "After how many years will Nottingham Forest return to European competition in 2025/26?",
      options: ["25 years", "30 years", "35 years", "40 years"],
      correct: 1,
      difficulty: "current",
      category: "Premier League",
    },
    {
      id: 5,
      question: "Which stadium is known as 'The Theatre of Dreams'?",
      options: ["Anfield", "Old Trafford", "Emirates Stadium", "Stamford Bridge"],
      correct: 1,
      difficulty: "easy",
      category: "Premier League",
    },
  ],
  // European Football
  european: [
    {
      id: 6,
      question: "Which German midfielder joined Leeds United from Hoffenheim in summer 2025?",
      options: ["Florian Wirtz", "Anton Stach", "Jamal Musiala", "Kai Havertz"],
      correct: 1,
      difficulty: "current",
      category: "Transfers",
    },
    {
      id: 7,
      question: "Which club has won the most Champions League/European Cup titles?",
      options: ["Barcelona", "Bayern Munich", "AC Milan", "Real Madrid"],
      correct: 3,
      difficulty: "medium",
      category: "Champions League",
    },
    {
      id: 8,
      question: "Who made a major move to Liverpool in the 2025 transfer window?",
      options: ["Kylian Mbappé", "Florian Wirtz", "Jude Bellingham", "Pedri"],
      correct: 1,
      difficulty: "current",
      category: "Transfers",
    },
    {
      id: 9,
      question: "Which country will host the 2025 FIFA World Cup?",
      options: ["Qatar", "United States", "Saudi Arabia", "Morocco"],
      correct: 2,
      difficulty: "current",
      category: "International",
    },
    {
      id: 10,
      question: "What is the maximum number of substitutions allowed in a Champions League match?",
      options: ["3", "5", "7", "No limit"],
      correct: 1,
      difficulty: "medium",
      category: "Rules",
    },
  ],
  // Classic Football History
  classic: [
    {
      id: 11,
      question: "Who is the all-time leading scorer in FIFA World Cup history?",
      options: ["Pelé", "Diego Maradona", "Miroslav Klose", "Ronaldo Nazário"],
      correct: 2,
      difficulty: "medium",
      category: "World Cup",
    },
    {
      id: 12,
      question: "Which player has won the most Ballon d'Or awards?",
      options: ["Cristiano Ronaldo", "Lionel Messi", "Johan Cruyff", "Michel Platini"],
      correct: 1,
      difficulty: "easy",
      category: "Awards",
    },
    {
      id: 13,
      question: "In which year was the Premier League founded?",
      options: ["1990", "1992", "1994", "1996"],
      correct: 1,
      difficulty: "medium",
      category: "History",
    },
    {
      id: 14,
      question: "Which goalkeeper holds the record for most clean sheets in Premier League history?",
      options: ["David Seaman", "Edwin van der Sar", "Petr Čech", "David James"],
      correct: 2,
      difficulty: "hard",
      category: "Records",
    },
    {
      id: 15,
      question: "What is the nickname of Manchester City?",
      options: ["The Red Devils", "The Citizens", "The Gunners", "The Blues"],
      correct: 1,
      difficulty: "easy",
      category: "Nicknames",
    },
  ],
  // Current Season & Players
  current: [
    {
      id: 16,
      question: "Who recently became the new head coach of Tottenham?",
      options: ["Antonio Conte", "Thomas Frank", "Mauricio Pochettino", "José Mourinho"],
      correct: 1,
      difficulty: "current",
      category: "Management",
    },
    {
      id: 17,
      question: "Which competition will Nottingham Forest participate in during the 2025/26 season?",
      options: ["Champions League", "Europa League", "Conference League", "None"],
      correct: 2,
      difficulty: "current",
      category: "European Competition",
    },
    {
      id: 18,
      question: "How many Premier League clubs qualified for European competitions in 2025/26?",
      options: ["7", "8", "9", "10"],
      correct: 2,
      difficulty: "current",
      category: "European Qualification",
    },
    {
      id: 19,
      question: "Which midfielder has been linked with a move to Brentford in summer 2025?",
      options: ["Jordan Henderson", "James Milner", "Fabinho", "Thiago Alcântara"],
      correct: 0,
      difficulty: "current",
      category: "Transfer Rumors",
    },
    {
      id: 20,
      question: "When does the 2025 FIFA World Cup final take place?",
      options: ["July 15", "July 17", "July 19", "July 21"],
      correct: 2,
      difficulty: "current",
      category: "World Cup 2025",
    },
  ],
  // Fun Facts & Records
  records: [
    {
      id: 21,
      question: "What is the fastest goal scored in Premier League history?",
      options: ["7.69 seconds", "9.12 seconds", "11.2 seconds", "13.4 seconds"],
      correct: 0,
      difficulty: "hard",
      category: "Records",
    },
    {
      id: 22,
      question: "Which player has made the most Premier League appearances?",
      options: ["Ryan Giggs", "Frank Lampard", "Gareth Barry", "James Milner"],
      correct: 2,
      difficulty: "hard",
      category: "Records",
    },
    {
      id: 23,
      question: "What is the highest-scoring Premier League match ever?",
      options: ["7-4", "8-2", "9-0", "8-0"],
      correct: 0,
      difficulty: "hard",
      category: "Records",
    },
    {
      id: 24,
      question: "Which team holds the record for the longest unbeaten run in Premier League history?",
      options: ["Manchester United", "Arsenal", "Chelsea", "Liverpool"],
      correct: 1,
      difficulty: "medium",
      category: "Records",
    },
    {
      id: 25,
      question: "How many teams participate in the Premier League each season?",
      options: ["18", "20", "22", "24"],
      correct: 1,
      difficulty: "easy",
      category: "Format",
    },
  ],
}

// Utility functions for the trivia app
const triviaUtils = {
  // Get random questions from different categories
  getRandomQuestions: (count = 10) => {
    const allQuestions = [
      ...footballTrivia.premierLeague,
      ...footballTrivia.european,
      ...footballTrivia.classic,
      ...footballTrivia.current,
      ...footballTrivia.records,
    ]

    return allQuestions.sort(() => Math.random() - 0.5).slice(0, count)
  },

  // Get questions by difficulty
  getQuestionsByDifficulty: (difficulty: string) => {
    const allQuestions = [
      ...footballTrivia.premierLeague,
      ...footballTrivia.european,
      ...footballTrivia.classic,
      ...footballTrivia.current,
      ...footballTrivia.records,
    ]

    return allQuestions.filter((q) => q.difficulty === difficulty)
  },

  // Get questions by category
  getQuestionsByCategory: (category: keyof typeof footballTrivia) => {
    return footballTrivia[category] || []
  },

  // Calculate score message
  getScoreMessage: (correct: number, total: number) => {
    const percentage = (correct / total) * 100

    if (percentage >= 90) return "🏆 Football Genius! You know your stuff!"
    if (percentage >= 80) return "⭐ Excellent! You're a true football fan!"
    if (percentage >= 70) return "👏 Great job! You know your football!"
    if (percentage >= 60) return "✅ Good effort! Keep watching those matches!"
    if (percentage >= 50) return "📚 Not bad! Time to brush up on football knowledge!"
    return "🔄 Keep learning! Football is a beautiful game to explore!"
  },
}

// Export for use in your app
export { footballTrivia, triviaUtils }
