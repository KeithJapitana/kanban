import { BoardState } from './types';

export const initialBoardState: BoardState = {
  columns: [
    { id: 'todo', title: 'To Do' },
    { id: 'progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'testing', title: 'Testing' },
    { id: 'done', title: 'Done' },
  ],
  cards: [
    {
      id: 'card-1',
      columnId: 'todo',
      title: 'Shape the launch narrative',
      description: 'Write the opening product story and align it with the new visual direction.',
      order: 0,
    },
    {
      id: 'card-2',
      columnId: 'todo',
      title: 'Review onboarding friction',
      description: 'List the first-session blockers and reduce the number of clicks to first action.',
      order: 1,
    },
    {
      id: 'card-3',
      columnId: 'todo',
      title: 'Capture stakeholder feedback',
      description: 'Summarize last sprint feedback into concrete edits for content and interaction.',
      order: 2,
    },
    {
      id: 'card-4',
      columnId: 'progress',
      title: 'Refine dashboard shell',
      description: 'Tighten spacing, header rhythm, and responsive behavior across breakpoints.',
      order: 0,
    },
    {
      id: 'card-5',
      columnId: 'progress',
      title: 'Polish drag states',
      description: 'Make movement feel crisp with clearer hover targets and stronger active feedback.',
      order: 1,
    },
    {
      id: 'card-6',
      columnId: 'review',
      title: 'Audit microcopy',
      description: 'Remove vague language from buttons, labels, and modal prompts.',
      order: 0,
    },
    {
      id: 'card-7',
      columnId: 'review',
      title: 'Check empty-state treatment',
      description: 'Confirm each stage still feels intentional when it has no cards.',
      order: 1,
    },
    {
      id: 'card-8',
      columnId: 'testing',
      title: 'Run browser matrix',
      description: 'Verify the board feels stable in Chrome, Firefox, Safari, and narrow mobile widths.',
      order: 0,
    },
    {
      id: 'card-9',
      columnId: 'done',
      title: 'Approve color system',
      description: 'Lock the yellow, blue, purple, navy, and gray palette for the MVP.',
      order: 0,
    },
    {
      id: 'card-10',
      columnId: 'done',
      title: 'Confirm MVP scope',
      description: 'Freeze the feature list at rename, drag, add, delete, and seeded dummy data.',
      order: 1,
    },
  ],
};
