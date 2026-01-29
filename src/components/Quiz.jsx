import { useState, useCallback } from "react";

import Answers from "./Answers.jsx";
import quizCompletedImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [answersState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answersState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleAnswerClick = useCallback(
    function handleAnswerClick(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          console.log("CORRECT ANSWER");
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex],
  );

  const handleSkipAnswer = useCallback(
    () => handleAnswerClick(null),
    [handleAnswerClick],
  );

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Trophy Image" />
        <h2>You've Completed The Quiz!!</h2>
      </div>
    );
  } else {
    return (
      <div id="quiz">
        <div id="question">
          <Question
            key={activeQuestionIndex}
            question={QUESTIONS[activeQuestionIndex].text}
            answers={QUESTIONS[activeQuestionIndex].answers}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            answersState={answersState}
            onClickAnswer={handleAnswerClick}
            onSkipAnswer={handleSkipAnswer}
          />
        </div>
      </div>
    );
  }
}
