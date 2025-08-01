const ResultScreen = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 50;

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">
        {passed ? '🎉 Well done!' : '😓 Better luck next time!'}
      </h2>

      <p className="text-lg text-slate-600">
        You scored{' '}
        <span className="font-semibold text-indigo-700">{score}</span> out of{' '}
        <span className="font-semibold text-indigo-700">{total}</span>
        <br />
        <span className="text-sm text-slate-500">({percentage}%)</span>
      </p>

      <button
        onClick={onRestart}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition cursor-pointer"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultScreen;
