import clsx from 'clsx';

export default function QuestionScreen({
  question,
  options,
  currentIdx,
  totalQuestions,
  selectedAnswers,
  onAnswer,
  correctOption,
  onNext,
  onSubmit,
}) {
  const hasAnswer = selectedAnswers?.[currentIdx] ?? false;
  console.log(question.correct_answer);

  function handleSelectedOption(selectedOption) {
    if (hasAnswer) return;
    const isCorrect = selectedOption == correctOption;
    onAnswer(selectedOption, isCorrect);
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="text-gray-500 text-sm">
        Question {currentIdx + 1} of {totalQuestions}
      </div>

      <h2 className="text-xl font-semibold">{`${question}`}</h2>

      <ul className="space-y-3">
        {options.map((opt, i) => (
          <li key={i}>
            <button
              disabled={hasAnswer}
              onClick={() => handleSelectedOption(opt)}
              className={clsx(
                'w-full text-left hover:brightness-90 px-4 py-2 rounded-md transition cursor-pointer disabled:cursor-not-allowed',
                hasAnswer && opt === correctOption
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100',
                hasAnswer &&
                  opt === selectedAnswers?.[currentIdx] &&
                  opt !== correctOption
                  ? 'bg-red-600 text-white'
                  : ''
              )}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
      <button
        disabled={!hasAnswer}
        onClick={currentIdx === 9 ? onSubmit : onNext}
        className="mt-6 self-end bg-emerald-600 text-white uppercase text-sm text-semibold leading-wide px-8 py-3 rounded-md hover:brightness-90 cursor-pointer transition disabled:brightness-50 disabled:cursor-not-allowed"
      >
        {currentIdx === 9 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}


