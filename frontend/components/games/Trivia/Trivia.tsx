'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { questions } from './questions';

interface TriviaProps {
  gameData?: string;
}

export default function Trivia({ gameData }: TriviaProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 w-full">
      {showResult ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4 christmas-font">
            Koniec Gry! 🎅
          </h1>
          <p className="text-3xl text-white mb-8">
            Twój wynik:{' '}
            <span className="text-yellow-300 font-bold">{score}</span> /{' '}
            {questions.length}
          </p>
          <button
            className="btn glass-btn text-xl px-8"
            onClick={() => window.location.reload()}
          >
            Zagraj ponownie 🎁
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="glass w-full max-w-2xl p-8"
        >
          <div className="mb-8 text-center">
            <span className="text-lg text-gray-200 uppercase tracking-widest">
              Pytanie {currentQuestion + 1}/{questions.length}
            </span>
            <h2 className="text-3xl font-bold mt-4 text-white christmas-font leading-relaxed">
              {questions[currentQuestion].question}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className="btn glass-btn w-full text-lg py-4 h-auto justify-start pl-8 hover:bg-white/30 border-white/40"
                onClick={() => handleAnswer(index)}
              >
                <span className="mr-4 font-bold text-yellow-300">
                  {String.fromCharCode(65 + index)}.
                </span>{' '}
                {answer}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
