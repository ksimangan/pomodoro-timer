import { useState, useEffect } from 'react';

function Timer() {
  // State for time remaining (default 25 mins), running status, and current mode
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'

  // The Timer Logic
  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsRunning(false);
      alert(mode === 'work' ? 'Time for a break! 🍵' : 'Back to work! 💪');
      switchMode();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  // Switch between Work and Break modes
  const switchMode = () => {
    const nextMode = mode === 'work' ? 'break' : 'work';
    setMode(nextMode);
    setTimeLeft(nextMode === 'work' ? 25 * 60 : 5 * 60);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Control functions
  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  // Progress bar calculation
  const totalTime = mode === 'work' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 rounded-xl shadow-2xl text-white max-w-sm w-full mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-2 uppercase tracking-wide">
        {mode === 'work' ? 'Focus Time' : 'Break Time'}
      </h2>
      
      {/* Timer Display */}
      <div className="text-7xl font-mono font-bold my-6 text-cyan-400">
        {formatTime(timeLeft)}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-700 rounded-full mb-8 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${mode === 'work' ? 'bg-cyan-500' : 'bg-green-500'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 w-full">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-lg transition-colors ${
            isRunning 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={resetTimer}
          className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        Current Mode: <span className="font-bold text-white">{mode}</span>
      </div>
    </div>
  );
}

export default Timer;