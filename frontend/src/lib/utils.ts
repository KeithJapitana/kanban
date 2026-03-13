import { Card, Column, Priority } from './types';

export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `card-${Math.random().toString(36).slice(2, 10)}`;
};

export const getCardsForColumn = (cards: Card[], columnId: string): Card[] =>
  cards
    .filter((card) => card.columnId === columnId)
    .sort((left, right) => left.order - right.order);

export const addCardToColumn = (
  cards: Card[],
  columnId: string,
  title: string,
  description: string,
  priority: Priority = 'medium'
): Card[] => {
  const nextCard: Card = {
    id: generateId(),
    columnId,
    title,
    description,
    order: getCardsForColumn(cards, columnId).length,
    priority,
  };

  return [...cards, nextCard];
};

export const removeCard = (cards: Card[], cardId: string): Card[] => {
  const cardToRemove = cards.find((card) => card.id === cardId);

  if (!cardToRemove) {
    return cards;
  }

  return normalizeColumns(cards.filter((card) => card.id !== cardId), [cardToRemove.columnId]);
};

export const updateCard = (
  cards: Card[],
  cardId: string,
  title: string,
  description: string,
  priority: Priority
): Card[] =>
  cards.map((card) => (card.id === cardId ? { ...card, title, description, priority } : card));

export const renameColumn = (columns: Column[], columnId: string, title: string): Column[] =>
  columns.map((column) => (column.id === columnId ? { ...column, title } : column));

type DropTarget = { type: 'column' | 'card'; id: string };

export const moveCard = (cards: Card[], activeCardId: string, over: DropTarget): Card[] => {
  const activeCard = cards.find((card) => card.id === activeCardId);

  if (!activeCard) {
    return cards;
  }

  const sourceWithoutActive = getCardsForColumn(cards, activeCard.columnId).filter(
    (card) => card.id !== activeCard.id
  );

  if (over.type === 'column') {
    const destination = getCardsForColumn(cards, over.id).filter((card) => card.id !== activeCard.id);
    return rebuildColumns(cards, activeCard, sourceWithoutActive, [...destination, { ...activeCard, columnId: over.id }], over.id);
  }

  const overCard = cards.find((card) => card.id === over.id);
  if (!overCard) {
    return cards;
  }

  const destinationWithoutActive = getCardsForColumn(cards, overCard.columnId).filter(
    (card) => card.id !== activeCard.id
  );
  const destinationIndex = destinationWithoutActive.findIndex((card) => card.id === overCard.id);
  const destination = [...destinationWithoutActive];

  destination.splice(destinationIndex < 0 ? destination.length : destinationIndex, 0, {
    ...activeCard,
    columnId: overCard.columnId,
  });

  return rebuildColumns(cards, activeCard, sourceWithoutActive, destination, overCard.columnId);
};

const rebuildColumns = (
  cards: Card[],
  activeCard: Card,
  sourceCards: Card[],
  destinationCards: Card[],
  destinationColumnId: string
): Card[] => {
  const untouched = cards.filter(
    (card) => card.columnId !== activeCard.columnId && card.columnId !== destinationColumnId
  );

  if (activeCard.columnId === destinationColumnId) {
    return [
      ...untouched,
      ...destinationCards.map((card, index) => ({ ...card, order: index })),
    ];
  }

  return [
    ...untouched,
    ...sourceCards.map((card, index) => ({ ...card, order: index })),
    ...destinationCards.map((card, index) => ({ ...card, columnId: destinationColumnId, order: index })),
  ];
};

const normalizeColumns = (cards: Card[], columnIds: string[]): Card[] => {
  const targets = new Set(columnIds);
  const preserved = cards.filter((card) => !targets.has(card.columnId));
  const normalized = Array.from(targets).flatMap((columnId) =>
    getCardsForColumn(cards, columnId).map((card, index) => ({ ...card, order: index }))
  );

  return [...preserved, ...normalized];
};
