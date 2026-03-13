import { render, screen } from '@testing-library/react';
import Board from '@/components/Board';

describe('Board', () => {
  it('renders all five columns and seeded cards', () => {
    render(<Board />);

    const columnNames = ['To Do', 'In Progress', 'Review', 'Testing', 'Done'];
    expect(columnNames.map((name) => screen.getByRole('region', { name }))).toHaveLength(5);

    expect(screen.getByText('Shape the launch narrative')).toBeInTheDocument();
    expect(screen.getByText('Approve color system')).toBeInTheDocument();
  });
});
