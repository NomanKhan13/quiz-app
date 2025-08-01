export default function ResultScreen({ score, total, onRestart }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Quiz Completed!</h1>
      <p className="text-lg mb-4">
        You scored <span className="font-semibold">{score}</span> out of{' '}
        <span className="font-semibold">{total}</span>
      </p>
      <button
        onClick={onRestart}
        className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:brightness-90 transition cursor-pointer"
      >
        Restart Quiz
      </button>
    </div>
  );
}
