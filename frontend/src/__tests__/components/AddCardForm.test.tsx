import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCardForm from '@/components/AddCardForm';

describe('AddCardForm', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    onSubmit.mockReset();
    onCancel.mockReset();
  });

  it('renders title and details inputs', () => {
    render(<AddCardForm columnTitle="To Do" onSubmit={onSubmit} onCancel={onCancel} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Details')).toBeInTheDocument();
    expect(screen.getByText('Add card to To Do')).toBeInTheDocument();
  });

  it('submits trimmed values', async () => {
    const user = userEvent.setup();
    render(<AddCardForm columnTitle="To Do" onSubmit={onSubmit} onCancel={onCancel} />);

    await user.type(screen.getByLabelText('Title'), '  Test Card  ');
    await user.type(screen.getByLabelText('Details'), '  Refine the flow  ');
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Add Card' }));

    expect(onSubmit).toHaveBeenCalledWith('Test Card', 'Refine the flow');
  });

  it('shows an error when title is empty', async () => {
    const user = userEvent.setup();
    render(<AddCardForm columnTitle="To Do" onSubmit={onSubmit} onCancel={onCancel} />);

    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Add Card' }));

    expect(screen.getByText('Title cannot be empty.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('cancels on escape', async () => {
    const user = userEvent.setup();
    render(<AddCardForm columnTitle="To Do" onSubmit={onSubmit} onCancel={onCancel} />);

    await user.keyboard('{Escape}');

    expect(onCancel).toHaveBeenCalled();
  });
});
