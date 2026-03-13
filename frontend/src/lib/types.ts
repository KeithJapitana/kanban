export interface Column {
  id: string;
  title: string;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Card {
  id: string;
  columnId: string;
  title: string;
  description: string;
  order: number;
  priority: Priority;
}

export interface BoardState {
  columns: Column[];
  cards: Card[];
}