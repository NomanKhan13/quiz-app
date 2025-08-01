import { useEffect, useState } from 'react';
import StartScreen from './usedState/StartScreen';
import { Loader } from 'lucide-react';
import ErrorScreen from './usedState/ErrorScreen';
import { clsx } from 'clsx';
import QuestionNumberList from './usedState/QuestionNumberList';
import Questions from './usedState/Questions';
import ResultScreen from './usedState/ResultScreen';
import Timer from './usedState/Timer';

const SECS_PER_QUESTION = 30;

const QuizApp = ({ setType }) => {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswer] = useState({ score: 0 });
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [secondsRemaining, setSecondsRemaining] = useState(null);

  const restartQuiz = () => {
    setQuestions([]);
    setStatus('idle');
    setError(null);
    setCurrentQuestion(0);
    setSelectedAnswer({ score: 0 });
    setShuffledOptions([]);
    setSecondsRemaining(null);
  };

  function shuffleOptions(question) {
    const options = [...question.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * (options.length + 1));
    options.splice(randomIndex, 0, question.correct_answer);
    return options;
  }

  async function handleStartQuiz() {
    try {
      setStatus('loading');
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
      );
      const data = await res.json();
      setStatus('loaded');
      setQuestions(data.results);
      setShuffledOptions(shuffleOptions(data.results[0]));
      setSecondsRemaining(10 * SECS_PER_QUESTION);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  function updateAnswers(optionSelected) {
    const isCorrectAns =
      optionSelected === questions.at(currentQuestion).correct_answer;
    setSelectedAnswer((prevAns) => ({
      ...prevAns,
      [currentQuestion]: optionSelected,
      score: isCorrectAns ? prevAns.score + 10 : prevAns.score,
    }));
    // if (!selectedAnswers?.[currentQuestion]) {
    // } else {
    //   return;
    // }
  }

  console.log(selectedAnswers?.[currentQuestion]);
  console.log(!selectedAnswers?.[currentQuestion]);

  function handleNextQuestion() {
    if (
      selectedAnswers?.[currentQuestion] &&
      currentQuestion < questions.length - 1
    ) {
      setCurrentQuestion((prevQues) => prevQues + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setStatus('complete');
    }
  }

  useEffect(() => {
    if (!questions.length) return;
    setShuffledOptions(shuffleOptions(questions.at(currentQuestion)));
  }, [currentQuestion]);

  return (
    <div className="min-h-screen sm:bg-gradient-to-br from-sky-100 to-blue-200 sm:p-6 flex flex-col items-center">
      {status === 'idle' && (
        <button
          onClick={() => setType('useReducer')}
          className="bg-emerald-600 text-white p-4 absolute top-4 right-4 rounded-full w-40 cursor-pointer hover:brightness-90 focus:scale-90"
        >
          useReducer
        </button>
      )}
      <div className="bg-white sm:shadow-xl my-auto sm:rounded-xl p-6 w-full max-w-xl">
        {status == 'idle' && <StartScreen onStart={handleStartQuiz} />}
        {status == 'loading' && (
          <Loader size={28} className="animate-spin mx-auto" />
        )}
        {status == 'error' && <ErrorScreen message={error} />}
        {status == 'loaded' && (
          <div className="flex flex-col">
            <QuestionNumberList
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              selectedAnswers={selectedAnswers}
            />

            <Questions
              questions={questions}
              currentQuestion={currentQuestion}
              selectedAnswers={selectedAnswers}
              updateAnswers={updateAnswers}
              shuffledOptions={shuffledOptions}
            />
            <div className="flex justify-between items-center my-8">
              <Timer
                secondsRemaining={secondsRemaining}
                setSecondsRemaining={setSecondsRemaining}
              />
              <button
                disabled={!selectedAnswers?.[currentQuestion]}
                onClick={handleNextQuestion}
                className="bg-indigo-600 hover:brightness-120 cursor-pointer text-white text-lg font-medium py-2 px-6 rounded-lg shadow transition duration-200"
              >
                {currentQuestion == questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        )}
        {status === 'complete' && (
          <ResultScreen
            score={selectedAnswers.score}
            total="100"
            onRestart={restartQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default QuizApp;
