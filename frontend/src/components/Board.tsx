'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { initialBoardState } from '@/lib/dummy-data';
import { Card as CardType } from '@/lib/types';
import {
  addCardToColumn,
  getCardsForColumn,
  moveCard,
  removeCard,
  renameColumn,
} from '@/lib/utils';
import Card from './Card';
import Column from './Column';

export default function Board() {
  const [board, setBoard] = useState(initialBoardState);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeItem = board.cards.find((card) => card.id === active.id);
    setActiveCard(activeItem ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveCard(null);

    if (!over || active.id === over.id) {
      return;
    }

    const overType = over.data.current?.type === 'column' ? 'column' : 'card';

    setBoard((current) => ({
      ...current,
      cards: moveCard(current.cards, String(active.id), {
        type: overType,
        id: String(over.id),
      }),
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <main className="board-shell">
        <section className="board-hero" aria-label="Board overview">
          <div className="board-hero__copy">
            <p className="board-kicker">Single board. Clear flow. No clutter.</p>
            <h1>Studio Kanban</h1>
            <p className="board-intro">
              A polished planning surface for one team board, five fixed stages, and the only
              actions that matter in an MVP: move, rename, add, and delete.
            </p>
          </div>
          <div className="board-hero__stats" aria-label="Board summary">
            <div className="hero-stat">
              <span>{board.columns.length}</span>
              Columns
            </div>
            <div className="hero-stat">
              <span>{board.cards.length}</span>
              Live cards
            </div>
            <div className="hero-stat">
              <span>Client</span>
              Rendered
            </div>
          </div>
        </section>

        <section className="board-panel">
          <div className="board-header">
            <div>
              <p className="board-header__eyebrow">Board workspace</p>
              <h2>Execution pipeline</h2>
            </div>
            <p className="board-header__meta">Double-click a column title to rename it.</p>
          </div>

          <div className="board-grid" data-testid="board-container">
            {board.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                cards={getCardsForColumn(board.cards, column.id)}
                onAddCard={(title, description) => {
                  setBoard((current) => ({
                    ...current,
                    cards: addCardToColumn(current.cards, column.id, title, description),
                  }));
                }}
                onDeleteCard={(cardId) => {
                  setBoard((current) => ({
                    ...current,
                    cards: removeCard(current.cards, cardId),
                  }));
                }}
                onRenameColumn={(title) => {
                  setBoard((current) => ({
                    ...current,
                    columns: renameColumn(current.columns, column.id, title),
                  }));
                }}
              />
            ))}
          </div>
        </section>

        <DragOverlay>
          {activeCard ? (
            <div className="drag-overlay-card">
              <Card card={activeCard} onDeleteCard={() => undefined} isOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </main>
    </DndContext>
  );
}
