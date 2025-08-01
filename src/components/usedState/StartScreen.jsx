const StartScreen = ({ onStart }) => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Welcome to the Quiz
      </h1>
      <button
        onClick={onStart}
        className="bg-indigo-600 text-white px-6 py-3 rounded-full cursor-pointer font-semibold hover:brightness-90 transition"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
