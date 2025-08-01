export default function StartScreen({ onStart }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Quiz</h1>
      <button
        onClick={onStart}
        className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:brightness-90 transition cursor-pointer"
      >
        Start Quiz
      </button>
    </div>
  );
}
