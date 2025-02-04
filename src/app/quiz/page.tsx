"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import questionsData from "@/../public/questions.json";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Question[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type AnswerRecord = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export default function QuizPage() {
  const router = useRouter();
  const [key, setKey] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionsData).slice(0, 30);
    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setQuizFinished(false);
    setUserAnswers([]);
  }, [key]);

  if (questions.length === 0) return <p>Loading...</p>;

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);

    const currentQuestion = questions[currentIndex];
    const isCorrect = option === currentQuestion.answer;

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: option,
        correctAnswer: currentQuestion.answer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setKey((prevKey) => prevKey + 1);
  };

  if (quizFinished) {
    return (
      <div className="max-w-3xl p-6 mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700">Quiz Completed!</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <p className="text-xl font-semibold text-gray-700">
            ✅ Correct: {correctAnswers}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            ❌ Wrong: {wrongAnswers}
          </p>
        </div>

        {/* ✅ Results Table */}
        <h3 className="mt-6 text-xl font-bold">Review Your Answers</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">Question</th>
                <th className="p-2 border border-gray-300">Your Answer</th>
                <th className="p-2 border border-gray-300">Correct Answer</th>
                <th className="p-2 border border-gray-300">Result</th>
              </tr>
            </thead>
            <tbody>
              {userAnswers.map((record, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-2 border border-gray-300">
                    {record.question}
                  </td>
                  <td
                    className={`border border-gray-300 p-2 ${
                      record.isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {record.userAnswer}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {record.correctAnswer}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {record.isCorrect ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Restart & Home Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            className="px-6 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700"
            onClick={restartQuiz}
          >
            Restart Quiz
          </Button>
          <Button
            className="px-6 py-3 text-lg text-white bg-gray-600 hover:bg-gray-700"
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div key={key} className="max-w-lg p-6 mx-auto text-center">
      <h2 className="mb-4 text-xl font-bold">
        {questions[currentIndex].question}
      </h2>
      <div className="grid gap-3 mt-1">
        {questions[currentIndex].options.map((option, idx) => (
          <Button
            key={idx}
            onClick={() => handleAnswer(option)}
            className={`${
              selectedAnswer === option
                ? option === questions[currentIndex].answer
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
