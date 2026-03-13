'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Column as ColumnType, Card as CardType, Priority } from '@/lib/types';
import AddCardForm from './AddCardForm';
import Card from './Card';

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  onAddCard: (title: string, description: string, priority: Priority) => void;
  onDeleteCard: (cardId: string) => void;
  onRenameColumn: (title: string) => void;
  onUpdateCard?: (cardId: string, title: string, description: string, priority: Priority) => void;
}

export default function Column({
  column,
  cards,
  onAddCard,
  onDeleteCard,
  onRenameColumn,
  onUpdateCard,
}: ColumnProps) {
  const [draftTitle, setDraftTitle] = useState(column.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'column' },
  });

  const saveTitle = () => {
    const trimmed = draftTitle.trim();
    if (trimmed) {
      onRenameColumn(trimmed);
    } else {
      setDraftTitle(column.title);
    }

    setIsEditing(false);
  };

  const cancelTitleEdit = () => {
    setDraftTitle(column.title);
    setIsEditing(false);
  };

  return (
    <section
      className={`column column-container ${isOver ? 'column--active' : ''}`}
      aria-label={column.title}
      role="region"
      data-testid={`column-${column.id}`}
    >
      <div className="column__header">
        <div>
          <p className="column__eyebrow">Stage</p>
          {isEditing ? (
            <input
              aria-label={`Rename ${column.title}`}
              className="column__title-input"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              onBlur={saveTitle}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  saveTitle();
                }

                if (event.key === 'Escape') {
                  cancelTitleEdit();
                }
              }}
              autoFocus
            />
          ) : (
            <button
              type="button"
              className="column__title-button"
              onDoubleClick={() => {
                setDraftTitle(column.title);
                setIsEditing(true);
              }}
              aria-label={`Rename column ${column.title}`}
            >
              {column.title}
            </button>
          )}
        </div>
        <span className="column__count">{cards.length.toString().padStart(2, '0')}</span>
      </div>

      <div ref={setNodeRef} className="column__body">
        <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <Card key={card.id} card={card} onDeleteCard={onDeleteCard} onUpdateCard={onUpdateCard} />
          ))}
        </SortableContext>
      </div>

      <div className="column__footer">
        <button
          type="button"
          className="column__add-button"
          onClick={() => setIsComposerOpen(true)}
        >
          + Add Card
        </button>
      </div>

      {isComposerOpen ? (
        <AddCardForm
          columnTitle={column.title}
          onSubmit={(title, description, priority) => {
            onAddCard(title, description, priority);
            setIsComposerOpen(false);
          }}
          onCancel={() => setIsComposerOpen(false)}
        />
      ) : null}
    </section>
  );
}
