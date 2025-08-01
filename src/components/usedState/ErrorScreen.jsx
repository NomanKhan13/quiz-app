const ErrorScreen = ({
  message = 'Something went wrong. Please try again.',
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-red-600 text-4xl mb-3">⚠️</div>
      <h2 className="text-2xl font-semibold text-red-700 mb-2">Oops!</h2>
      <p className="text-slate-600 mb-4">{message}</p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded shadow-sm transition"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;
