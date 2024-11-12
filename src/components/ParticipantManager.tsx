import { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface Participant {
  id: number;
  name: string;
}

interface ParticipantManagerProps {
  onUpdateParticipants: (participants: Participant[]) => void;
  participants: Participant[];
}

export default function ParticipantManager({ onUpdateParticipants, participants }: ParticipantManagerProps) {
  const [newParticipant, setNewParticipant] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddParticipant = () => {
    if (newParticipant.trim()) {
      const newParticipants = [
        ...participants,
        { id: Date.now(), name: newParticipant.trim() }
      ].sort((a, b) => a.name.localeCompare(b.name));
      onUpdateParticipants(newParticipants);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (id: number) => {
    const newParticipants = participants.filter(p => p.id !== id);
    onUpdateParticipants(newParticipants);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = participants.findIndex((p) => p.id === active.id);
      const newIndex = participants.findIndex((p) => p.id === over.id);
      
      const newParticipants = arrayMove(participants, oldIndex, newIndex);
      onUpdateParticipants(newParticipants);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          placeholder="Nome do participante"
          onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
        />
        <button
          onClick={handleAddParticipant}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Adicionar
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={participants}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {participants.map((participant) => (
              <SortableItem
                key={participant.id}
                id={participant.id}
                participant={participant}
                onRemove={handleRemoveParticipant}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
} 