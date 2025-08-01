import { clsx } from 'clsx';

const QuestionNumberList = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  selectedAnswers,
}) => {
  function handleQuestionChange(idx) {
    if (!selectedAnswers?.[idx]) return;
    setCurrentQuestion(idx);
  }

  return (
    <ul className="flex justify-center gap-3 flex-wrap mb-6">
      {Array.from({ length: questions.length }, (_, idx) => (
        <li
          key={idx}
          onClick={() => handleQuestionChange(idx)}
          className={clsx(
            'rounded-full w-9 h-9 flex items-center justify-center font-semibold shadow-sm cursor-pointer hover:brightness-95 transition',
            idx <= currentQuestion
              ? 'bg-indigo-500 text-white'
              : 'bg-indigo-200 text-indigo-800'
          )}
        >
          {idx + 1}
        </li>
      ))}
    </ul>
  );
};

export default QuestionNumberList;
