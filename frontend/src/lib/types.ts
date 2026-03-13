export interface Column {
  id: string;
  title: string;
}

export interface Card {
  id: string;
  columnId: string;
  title: string;
  description: string;
  order: number;
}

export interface BoardState {
  columns: Column[];
  cards: Card[];
}