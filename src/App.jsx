import { useState } from 'react';
import QuizWithReducer from './components/QuizWithReducer';
import QuizWithState from './components/QuizWithState';

function App() {
  const [type, setType] = useState('');

  return (
    <>
      {type === 'useState' && <QuizWithState setType={setType} />}
      {type === 'useReducer' && <QuizWithReducer setType={setType} />}
      {type === '' && (
        <div className="h-screen w-screen flex flex-col justify-center gap-6 items-center">
          <p className="text-2xl text-gray-800 tracking-wide">
            What type of state management?
          </p>
          <button
            onClick={() => setType('useState')}
            className="bg-emerald-600 text-white p-4 rounded-full w-60 cursor-pointer hover:brightness-90 focus:scale-90"
          >
            useState
          </button>
          <button
            onClick={() => setType('useReducer')}
            className="bg-emerald-600 text-white p-4 rounded-full w-60 cursor-pointer hover:brightness-90 focus:scale-90"
          >
            useReducer
          </button>
        </div>
      )}
    </>
  );
}

export default App;
