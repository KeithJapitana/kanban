'use client';

import { FormEvent, KeyboardEvent, useState } from 'react';
import { X } from 'lucide-react';

interface AddCardFormProps {
  columnTitle: string;
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
}

export default function AddCardForm({ columnTitle, onSubmit, onCancel }: AddCardFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextTitle = title.trim();
    const nextDescription = description.trim();

    if (!nextTitle) {
      setError('Title cannot be empty.');
      return;
    }

    onSubmit(nextTitle, nextDescription);
  };

  const handleEscape = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onCancel();
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-card-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-card__header">
          <div>
            <p className="modal-card__eyebrow">New task</p>
            <h3 id="add-card-heading">Add card to {columnTitle}</h3>
          </div>
          <button type="button" className="modal-card__close" onClick={onCancel} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form className="modal-form" onSubmit={submit} onKeyDown={handleEscape}>
          <label className="modal-form__field" htmlFor="card-title">
            <span>Title</span>
            <input
              id="card-title"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) {
                  setError('');
                }
              }}
              placeholder="Ship refined mobile layout"
              autoFocus
            />
          </label>

          <label className="modal-form__field" htmlFor="card-description">
            <span>Details</span>
            <textarea
              id="card-description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Keep this concise and actionable."
              rows={5}
            />
          </label>

          {error ? <p className="modal-form__error">{error}</p> : null}

          <div className="modal-form__actions">
            <button type="button" className="button button--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="button button--primary">
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
