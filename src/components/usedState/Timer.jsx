import { useEffect } from 'react';

const Timer = ({ secondsRemaining, setSecondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSecs) => prevSecs - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="border border-slate-400 bg-slate-200 p-2 rounded-md w-20 text-center">
      {mins.toString().padStart(2, 0)}:{secs.toString().padStart(2, 0)}
    </p>
  );
};

export default Timer;
