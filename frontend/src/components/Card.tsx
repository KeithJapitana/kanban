'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { Card as CardType } from '@/lib/types';

interface CardProps {
  card: CardType;
  onDeleteCard: (cardId: string) => void;
  isOverlay?: boolean;
}

export default function Card({ card, onDeleteCard, isOverlay = false }: CardProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const sortable = useSortable({
    id: card.id,
    data: { type: 'card' },
    disabled: isOverlay || isConfirmingDelete,
  });

  const style = isOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(sortable.transform),
        transition: sortable.transition,
      };

  if (isConfirmingDelete && !isOverlay) {
    return (
      <article className="task-card task-card--confirm" data-testid={`card-${card.id}`}>
        <div className="task-card__confirm-copy">
          <strong>Delete this card?</strong>
          <p>This removes it from the board immediately.</p>
        </div>
        <div className="task-card__confirm-actions">
          <button type="button" className="button button--danger" onClick={() => onDeleteCard(card.id)}>
            Yes
          </button>
          <button
            type="button"
            className="button button--ghost"
            onClick={() => setIsConfirmingDelete(false)}
          >
            No
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={isOverlay ? undefined : sortable.setNodeRef}
      style={style}
      className={`task-card card-container ${sortable.isDragging ? 'task-card--dragging' : ''} ${
        isOverlay ? 'task-card--overlay' : ''
      }`}
      data-testid={`card-${card.id}`}
      {...(!isOverlay ? sortable.attributes : {})}
      {...(!isOverlay ? sortable.listeners : {})}
    >
      <div className="task-card__top">
        <h3>{card.title}</h3>
        {!isOverlay ? (
          <button
            type="button"
            className="task-card__delete"
            aria-label={`Delete ${card.title}`}
            onClick={(event) => {
              event.stopPropagation();
              setIsConfirmingDelete(true);
            }}
          >
            <Trash2 size={16} />
          </button>
        ) : null}
      </div>
      <p>{card.description}</p>
    </article>
  );
}
