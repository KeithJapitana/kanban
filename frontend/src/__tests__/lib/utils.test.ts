import { initialBoardState } from '@/lib/dummy-data';
import {
  addCardToColumn,
  generateId,
  getCardsForColumn,
  moveCard,
  removeCard,
  renameColumn,
} from '@/lib/utils';

describe('board utilities', () => {
  it('generates unique ids', () => {
    const first = generateId();
    const second = generateId();

    expect(first).not.toBe(second);
    expect(first.length).toBeGreaterThan(5);
  });

  it('returns ordered cards for a column', () => {
    const cards = getCardsForColumn(initialBoardState.cards, 'todo');

    expect(cards.map((card) => card.title)).toEqual([
      'Shape the launch narrative',
      'Review onboarding friction',
      'Capture stakeholder feedback',
    ]);
  });

  it('adds a card to the end of a column', () => {
    const cards = addCardToColumn(initialBoardState.cards, 'todo', 'New card', 'Details');
    const todoCards = getCardsForColumn(cards, 'todo');

    expect(todoCards.at(-1)).toMatchObject({ title: 'New card', description: 'Details', order: 3 });
  });

  it('removes a card and normalizes order', () => {
    const cards = removeCard(initialBoardState.cards, 'card-2');
    const todoCards = getCardsForColumn(cards, 'todo');

    expect(todoCards).toHaveLength(2);
    expect(todoCards[0].order).toBe(0);
    expect(todoCards[1].order).toBe(1);
  });

  it('renames a column', () => {
    const columns = renameColumn(initialBoardState.columns, 'review', 'Code Review');

    expect(columns.find((column) => column.id === 'review')?.title).toBe('Code Review');
  });

  it('moves a card to another column', () => {
    const cards = moveCard(initialBoardState.cards, 'card-1', { type: 'column', id: 'done' });

    expect(getCardsForColumn(cards, 'todo')).toHaveLength(2);
    expect(getCardsForColumn(cards, 'done').at(-1)).toMatchObject({ id: 'card-1', order: 2 });
  });

  it('reorders a card within the same column', () => {
    const cards = moveCard(initialBoardState.cards, 'card-3', { type: 'card', id: 'card-2' });

    expect(getCardsForColumn(cards, 'todo').map((card) => card.id)).toEqual(['card-1', 'card-3', 'card-2']);
  });
});

