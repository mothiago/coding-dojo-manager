'use client';

import { useState } from 'react';
import Timer from '@/components/Timer';
import ParticipantManager from '@/components/ParticipantManager';
import SessionHistory from '@/components/SessionHistory';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import DurationPicker from '@/components/DurationPicker';

interface Participant {
  id: number;
  name: string;
}

interface SessionRecord {
  id: number;
  date: string;
  participants: string[];
  duration: number;
}

export default function Home() {
  const [participants, setParticipants] = useLocalStorage<Participant[]>('participants', []);
  const [sessionHistory, setSessionHistory] = useLocalStorage<SessionRecord[]>('sessionHistory', []);
  const [currentPilot, setCurrentPilot] = useState<number>(0);
  const [sessionDuration, setSessionDuration] = useLocalStorage('sessionDuration', 300);

  const handleTimerComplete = () => {
    setCurrentPilot((current) => (current + 1) % participants.length);
    
    // Adicionar sessão ao histórico
    const newSession: SessionRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      participants: participants.map(p => p.name),
      duration: sessionDuration
    };
    setSessionHistory([...sessionHistory, newSession]);
  };

  const getCurrentPairs = () => {
    if (participants.length < 2) return null;
    
    const pilot = participants[currentPilot];
    const copilot = participants[(currentPilot + 1) % participants.length];
    
    // Só retorna next se houver mais de 2 participantes
    const next = participants.length > 2 ? {
      pilot: participants[(currentPilot + 1) % participants.length],
      copilot: participants[(currentPilot + 2) % participants.length]
    } : null;

    return { 
      current: { pilot, copilot },
      next
    };
  };

  const pairs = getCurrentPairs();

  const handleResetDojo = () => {
    if (window.confirm('Tem certeza que deseja iniciar um novo Coding Dojo? Todos os dados serão perdidos.')) {
      // Limpa todos os dados do localStorage
      setParticipants([]);
      setSessionHistory([]);
      setCurrentPilot(0);
      setSessionDuration(300);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">Coding Dojo Manager</h1>
            <button
              onClick={handleResetDojo}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium transition-colors"
              title="Iniciar novo Coding Dojo"
            >
              Novo Dojo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Coluna da esquerda */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <h2 className="text-2xl font-semibold">Participantes</h2>
            <ParticipantManager 
              onUpdateParticipants={setParticipants}
              participants={participants} 
            />
          </div>

          {/* Coluna central - Timer */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-start">
            <div className="w-full space-y-6">
              <h2 className="text-2xl font-semibold">Duração da sessão</h2>
              <DurationPicker
                value={sessionDuration}
                onChange={setSessionDuration}
              />
              <Timer 
                duration={sessionDuration} 
                onComplete={handleTimerComplete} 
              />
            </div>
          </div>

          {/* Coluna da direita - Pairs */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <h2 className="text-2xl font-semibold">Pairs</h2>
            {pairs && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-900 rounded-md">
                  <h3 className="font-semibold mb-2">Pair atual:</h3>
                  <p>Piloto: {pairs.current.pilot.name}</p>
                  <p>Copiloto: {pairs.current.copilot.name}</p>
                </div>

                {pairs.next && (
                  <div className="p-4 bg-gray-800 rounded-md">
                    <h3 className="font-semibold mb-2">Próximo pair:</h3>
                    <p>Piloto: {pairs.next.pilot.name}</p>
                    <p>Copiloto: {pairs.next.copilot.name}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <SessionHistory
          history={sessionHistory}
          onClearHistory={() => setSessionHistory([])}
        />
      </div>
    </main>
  );
} 