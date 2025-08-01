import { useReducer } from 'react';
import StartScreen from './usedReducer/StartScreen';
import LoadingScreen from './usedReducer/LoadingScreen';
import QuestionScreen from './usedReducer/QuestionScreen';
import ResultScreen from './usedReducer/ResultScreen';
import QuestionsList from './usedReducer/QuestionsList';

const POINTS_PER_QUES = 10;
const SECS_PER_QUES = 30;

const initialState = {
  questions: [],
  status: 'idle',
  error: null,
  currentIdx: 0,
  totalQuestions: null,
  selectedAnswers: {},
  score: 0,
  totalPoints: 0,
};

function optionSwapper(options, swapThis) {
  options.splice(Math.floor(Math.random() * options.length), 0, swapThis);
  return options;
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading' };
    case 'start':
      return {
        ...state,
        questions: action.payload,
        status: 'loaded',
        totalQuestions: action.payload.length,
        totalPoints: action.payload.length * POINTS_PER_QUES,
      };
    case 'answer':
      return {
        ...state,
        selectedAnswers: {
          ...state.selectedAnswers,
          [state.currentIdx]: action.payload.selectedOption,
        },
        score: action.payload.isCorrect
          ? state.score + POINTS_PER_QUES
          : state.score,
      };
    case 'next':
      return { ...state, currentIdx: state.currentIdx + 1 };
    case 'submit':
      return { ...state, status: 'complete' };
    case 'question-change':
      console.log(state.selectedAnswers?.[action.payload]);
      return {
        ...state,
        currentIdx: state.selectedAnswers?.[action.payload]
          ? action.payload
          : state.currentIdx,
      };
    case 'restart':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

const QuizWithReducer = ({ setType }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, currentIdx, totalQuestions, selectedAnswers } = state;

  async function handleQuizStart() {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
      );
      const data = await res.json();
      if (!res.ok) throw new Error('Error while fetching questions.');
      const questions = data.results.map((question) => ({
        ...question,
        options: optionSwapper(
          question.incorrect_answers,
          question.correct_answer
        ),
      }));
      dispatch({ type: 'start', payload: questions });
    } catch (err) {
      dispatch({ type: 'error', payload: err.message });
    }
  }

  function handleAnswer(selectedOption, isCorrect) {
    dispatch({ type: 'answer', payload: { selectedOption, isCorrect } });
  }

  return (
    <div className="flex items-center justify-center h-screen px-4 max-w-xl w-full mx-auto">
      {state.status === 'idle' && (
        <button
          onClick={() => setType('useState')}
          className="absolute top-4 right-4 bg-indigo-600 text-white p-4 rounded-full w-40 cursor-pointer hover:brightness-90 focus:scale-90"
        >
          useState
        </button>
      )}
      {state.status === 'idle' && <StartScreen onStart={handleQuizStart} />}
      {state.status === 'loading' && <LoadingScreen />}
      {state.status === 'loaded' && (
        <div className="flex w-full flex-col gap-4">
          <QuestionsList
            totalQuestions={totalQuestions}
            currentIdx={currentIdx}
            onQuestionChange={(targetQuestion) => {
              console.log(targetQuestion);
              dispatch({ type: 'question-change', payload: targetQuestion });
            }}
          />
          <QuestionScreen
            question={questions.at(currentIdx).question}
            options={questions.at(currentIdx).options}
            currentIdx={currentIdx}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
            selectedAnswers={selectedAnswers}
            correctOption={questions.at(currentIdx).correct_answer}
            onNext={() => dispatch({ type: 'next' })}
            onSubmit={() => dispatch({ type: 'submit' })}
          />
        </div>
      )}
      {state.status === 'complete' && (
        <ResultScreen
          score={state.score}
          total={state.totalPoints}
          onRestart={() => dispatch({ type: 'restart' })}
        />
      )}

      {/* 
      status = idle && <StartScreen />
      status = loading && <StartScreen />
      status = loaded && <StartScreen />
      status = complete && && <StartScreen />
      */}
    </div>
  );
};

export default QuizWithReducer;
