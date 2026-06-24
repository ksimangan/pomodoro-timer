import Timer from './components/Timer';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">My Pomodoro Timer</h1>
      <Timer />
    </div>
  );
}

export default App;