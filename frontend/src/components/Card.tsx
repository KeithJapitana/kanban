'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Pencil } from 'lucide-react';
import { Card as CardType, Priority } from '@/lib/types';
import EditCardForm from './EditCardForm';

interface CardProps {
  card: CardType;
  onDeleteCard: (cardId: string) => void;
  onUpdateCard?: (cardId: string, title: string, description: string, priority: Priority) => void;
  isOverlay?: boolean;
}

const priorityBorderColors = {
  low: '#9ca3af',
  medium: '#eab308',
  high: '#ef4444',
};

export default function Card({ card, onDeleteCard, onUpdateCard, isOverlay = false }: CardProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const sortable = useSortable({
    id: card.id,
    data: { type: 'card' },
    disabled: isOverlay || isConfirmingDelete || isEditOpen,
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

  if (isEditOpen && !isOverlay) {
    return (
      <>
        <article className="task-card card-container" data-testid={`card-${card.id}`} style={{ opacity: 0.5 }}>
          <div className="task-card__top">
            <h3>{card.title}</h3>
          </div>
          <p>{card.description}</p>
        </article>
        <EditCardForm
          cardTitle={card.title}
          cardDescription={card.description}
          cardPriority={card.priority}
          onSubmit={(title, description, priority) => {
            if (onUpdateCard) {
              onUpdateCard(card.id, title, description, priority);
            }
            setIsEditOpen(false);
          }}
          onCancel={() => setIsEditOpen(false)}
        />
      </>
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
        <div>
          <h3>{card.title}</h3>
          <div className="task-card__priority-badge" style={{ borderColor: priorityBorderColors[card.priority] }}>
            <span style={{ color: priorityBorderColors[card.priority] }}>{card.priority}</span>
          </div>
        </div>
        {!isOverlay ? (
          <div className="task-card__actions">
            <button
              type="button"
              className="task-card__edit"
              aria-label={`Edit ${card.title}`}
              onClick={(event) => {
                event.stopPropagation();
                setIsEditOpen(true);
              }}
            >
              <Pencil size={16} />
            </button>
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
          </div>
        ) : null}
      </div>
      <p>{card.description}</p>
    </article>
  );
}
