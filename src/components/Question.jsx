import Answers from "./Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Question({
  question,
  answers,
  onClickAnswer,
  selectedAnswer,
  answersState,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      <h2>{question}</h2>
      <QuestionTimer timeout={15000} onTimeout={() => onSkipAnswer} />
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answersState={answersState}
        onClick={onClickAnswer}
      />
    </div>
  );
}
