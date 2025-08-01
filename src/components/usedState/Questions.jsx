import { clsx } from 'clsx';
const Questions = ({
  questions,
  currentQuestion,
  selectedAnswers,
  updateAnswers,
  shuffledOptions,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-5 text-center">
        {questions.at(currentQuestion).question}
      </h2>

      <ul className="flex flex-col gap-4">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            disabled={selectedAnswers?.[currentQuestion]}
            onClick={() => updateAnswers(option)}
            className={clsx(
              'bg-emerald-100 hover:brightness-90 transition rounded-lg p-3 text-center text-emerald-900 font-medium cursor-pointer shadow-sm',

              option === selectedAnswers?.[currentQuestion] &&
                option !== questions.at(currentQuestion).correct_answer
                ? 'bg-red-500 text-white'
                : '',
              selectedAnswers?.[currentQuestion] &&
                option === questions.at(currentQuestion).correct_answer
                ? 'bg-green-500 text-white'
                : ''
            )}
          >
            {option}
            {option === selectedAnswers?.[currentQuestion] &&
              option === questions.at(currentQuestion).correct_answer &&
              '😊'}
            {option === selectedAnswers?.[currentQuestion] &&
              option !== questions.at(currentQuestion).correct_answer &&
              '😔'}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
// ? 'bg-emerald-500 text-white'
//                   : 'bg-red-500 text-white'
