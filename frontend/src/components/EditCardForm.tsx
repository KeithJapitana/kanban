'use client';

import { FormEvent, KeyboardEvent, useState } from 'react';
import { X } from 'lucide-react';
import { Priority } from '@/lib/types';

interface EditCardFormProps {
  cardTitle: string;
  cardDescription: string;
  cardPriority: Priority;
  onSubmit: (title: string, description: string, priority: Priority) => void;
  onCancel: () => void;
}

export default function EditCardForm({
  cardTitle,
  cardDescription,
  cardPriority,
  onSubmit,
  onCancel,
}: EditCardFormProps) {
  const [title, setTitle] = useState(cardTitle);
  const [description, setDescription] = useState(cardDescription);
  const [priority, setPriority] = useState<Priority>(cardPriority);
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextTitle = title.trim();
    const nextDescription = description.trim();

    if (!nextTitle) {
      setError('Title cannot be empty.');
      return;
    }

    onSubmit(nextTitle, nextDescription, priority);
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
        aria-labelledby="edit-card-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-card__header">
          <div>
            <p className="modal-card__eyebrow">Edit task</p>
            <h3 id="edit-card-heading">Update card details</h3>
          </div>
          <button type="button" className="modal-card__close" onClick={onCancel} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form className="modal-form" onSubmit={submit} onKeyDown={handleEscape}>
          <label className="modal-form__field" htmlFor="edit-card-title">
            <span>Title</span>
            <input
              id="edit-card-title"
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

          <label className="modal-form__field" htmlFor="edit-card-description">
            <span>Details</span>
            <textarea
              id="edit-card-description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Keep this concise and actionable."
              rows={5}
            />
          </label>

          <label className="modal-form__field" htmlFor="edit-card-priority">
            <span>Priority</span>
            <select
              id="edit-card-priority"
              name="priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value as Priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          {error ? <p className="modal-form__error">{error}</p> : null}

          <div className="modal-form__actions">
            <button type="button" className="button button--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="button button--primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
