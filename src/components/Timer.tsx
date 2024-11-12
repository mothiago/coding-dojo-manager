import { useEffect, useState, useRef } from 'react';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export default function Timer({ duration, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Inicialização do cliente e áudio
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Inicialização e atualização do timeLeft
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  const playNotification = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContextRef.current.currentTime);

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (!time || time <= 1) {
            setIsRunning(false);
            onComplete();
            playNotification();
            return duration; // Reinicia com a duração total em segundos
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete, duration]);

  const handleReset = () => {
    setTimeLeft(duration);
    setIsRunning(false);
  };

  if (!isClient || timeLeft === null) {
    return <div className="w-64 h-64 bg-gray-800 rounded-full" />;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-64 h-64">
        {/* Borda animada */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 0deg,
              rgb(59, 130, 246) ${percentage}%,
              transparent ${percentage}%
            )`,
            animation: isRunning ? 'rotate 60s linear infinite' : 'none'
          }}
        />
        
        {/* Timer analógico */}
        <div className="absolute inset-2 bg-gray-900 rounded-full">
          <div className="w-full h-full rounded-full border-8 border-gray-700 relative">
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-blue-500 transition-all duration-1000"
              style={{
                clipPath: `polygon(50% 50%, 50% 0, ${percentage >= 25 ? '100% 0' : `${50 + percentage * 2}% 0`}, ${
                  percentage >= 50 ? '100% 100%' : '100% 0'
                }, ${percentage >= 75 ? '0 100%' : '100% 100%'}, ${percentage >= 100 ? '0 0' : '0 100%'}, 50% 0)`
              }}
            />
          </div>
        </div>

        {/* Timer digital */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold bg-gray-900 px-4 py-2 rounded-lg text-gray-100">
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
} 