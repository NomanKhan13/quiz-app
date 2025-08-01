import { couch } from 'globals';
import { useReducer } from 'react';

const initialState = {
  count: 0,
  history: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, '+1'],
      };
    case 'DECREMENT':
      console.log(Number('+1'));
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, '-1'],
      };
    case 'RESET':
      return initialState;
    case 'UNDO':
      const historyCopy = [...state.history];
      const lastEntry = historyCopy.pop();
      const updatedCount =
        lastEntry == '-1' ? state.count + 1 : state.count - 1;
      console.log(historyCopy);
      return {
        ...state,
        count: updatedCount,
        history: historyCopy,
      };
    default:
      throw new Error('unknown action performed');
  }
}

export default function CounterWithHistory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🧮 Counter with History
        </h1>

        <div className="text-center mb-6">
          <p className="text-4xl font-semibold">{state.count}</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => dispatch({ type: 'INCREMENT' })}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            +1
          </button>
          <button
            onClick={() => dispatch({ type: 'DECREMENT' })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            -1
          </button>
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
          >
            Reset
          </button>
          <button
            onClick={() => dispatch({ type: 'UNDO' })}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Undo
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="font-semibold mb-2">📝 History:</h2>
          <div className="overflow-y-auto h-30">
            {state.history.length === 0 ? (
              <p className="text-gray-500 italic">No actions yet.</p>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {state.history.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
