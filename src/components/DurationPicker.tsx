interface DurationPickerProps {
  value: number; // duração total em segundos
  onChange: (seconds: number) => void;
}

export default function DurationPicker({ value, onChange }: DurationPickerProps) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  const handleMinutesChange = (newMinutes: number) => {
    onChange((newMinutes * 60) + seconds);
  };

  const handleSecondsChange = (newSeconds: number) => {
    onChange((minutes * 60) + newSeconds);
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1">
        <label className="block text-sm text-gray-400 mb-1">Minutos</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => handleMinutesChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full px-4 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
          min="0"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm text-gray-400 mb-1">Segundos</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => handleSecondsChange(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
          className="w-full px-4 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
          min="0"
          max="59"
        />
      </div>
    </div>
  );
} 