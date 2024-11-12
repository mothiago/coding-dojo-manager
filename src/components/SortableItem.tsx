import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Participant {
  id: number;
  name: string;
}

interface SortableItemProps {
  id: number;
  participant: Participant;
  onRemove: (id: number) => void;
}

export function SortableItem({ id, participant, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex justify-between items-center p-3 bg-gray-800 rounded-md cursor-move border border-gray-700 hover:border-gray-600 transition-colors"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2">
        <span className="text-gray-400">☰</span>
        <span className="text-gray-100">{participant.name}</span>
      </div>
      <button
        onClick={() => onRemove(participant.id)}
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        Remover
      </button>
    </li>
  );
} 