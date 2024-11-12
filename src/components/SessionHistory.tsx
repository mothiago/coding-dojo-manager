import { useState } from 'react';

interface SessionRecord {
  id: number;
  date: string;
  participants: string[];
  duration: number;
}

interface SessionHistoryProps {
  history: SessionRecord[];
  onClearHistory: () => void;
}

export default function SessionHistory({ history, onClearHistory }: SessionHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors text-gray-100"
      >
        {isOpen ? 'Ocultar Histórico' : 'Mostrar Histórico'}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-100">Histórico de Sessões</h3>
            <button
              onClick={onClearHistory}
              className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Limpar Histórico
            </button>
          </div>

          <div className="space-y-2">
            {history.map((session) => (
              <div
                key={session.id}
                className="p-4 bg-gray-800 rounded-md border border-gray-700"
              >
                <p className="font-medium text-gray-100">Data: {new Date(session.date).toLocaleString()}</p>
                <p className="text-gray-300">Duração: {session.duration} minutos</p>
                <p className="text-gray-300">Participantes: {session.participants.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 