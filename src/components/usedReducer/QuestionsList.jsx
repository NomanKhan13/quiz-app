import clsx from 'clsx';

const QuestionsList = ({ totalQuestions, onQuestionChange, currentIdx }) => {
  // dispatch({type: "question-change", payload: targetQuestion});

  return (
    <ul className="flex flex-wrap gap-2 justify-between">
      {Array.from({ length: totalQuestions }).map((_, idx) => (
        <button
          className={clsx(
            'rounded-full hover:brightness-90 w-8 h-8 cursor-pointer',
            idx <= currentIdx ? 'bg-emerald-600 text-white' : 'bg-gray-100'
          )}
          onClick={() => {
            console.log(idx);
            onQuestionChange(idx);
          }}
        >
          {idx + 1}
        </button>
      ))}
    </ul>
  );
};

export default QuestionsList;
