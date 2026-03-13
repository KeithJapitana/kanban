# CODEX: Card Editing and Priority Status

Implementation reference for the card editing and priority status features added to the Kanban MVP.

---

## CLI Commands

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if needed)
npm install

# Run the development server
npm run dev

# Build for production (verify no TypeScript errors)
npm run build

# Run all tests
npm test -- --watchAll=false

# Run specific test suites
npm test -- utils.test --watchAll=false
npm test -- AddCardForm.test --watchAll=false
npm test -- Board.test --watchAll=false
```

---

## Task Checklist

### Phase 1: Data Structures
- [x] `types.ts` — Add `Priority = 'low' | 'medium' | 'high'` type export
- [x] `types.ts` — Add `priority: Priority` field to `Card` interface
- [x] `dummy-data.ts` — Add priority to all 10 dummy cards (high/medium/low variety)

### Phase 2: Utilities
- [x] `utils.ts` — Update `addCardToColumn` signature to include `priority: Priority = 'medium'`
- [x] `utils.ts` — Add `updateCard(cards, cardId, title, description, priority)` function

### Phase 3: Edit Component
- [x] `EditCardForm.tsx` — Create modal component mirroring `AddCardForm` structure
  - Pre-filled title, description, priority from current card
  - Submit saves changes via `onSubmit(title, description, priority)` callback
  - Cancel / Escape discards changes via `onCancel` callback

### Phase 4: Core Components
- [x] `Card.tsx` — Add priority display (colored left border + background tint)
- [x] `Card.tsx` — Add priority badge (colored text label with matching border)
- [x] `Card.tsx` — Add pencil edit icon (visible on card hover alongside delete)
- [x] `Card.tsx` — Add edit state: click pencil -> opens `EditCardForm` modal
- [x] `Card.tsx` — Update `onUpdateCard` prop: `(cardId, title, description, priority) => void`
- [x] `Column.tsx` — Add `onUpdateCard` prop and pass to `Card`
- [x] `Column.tsx` — Update `onAddCard` signature to include priority
- [x] `Board.tsx` — Add `updateCard` import and `onUpdateCard` handler
- [x] `Board.tsx` — Update `onAddCard` to pass priority through

### Phase 5: Add Card Form
- [x] `AddCardForm.tsx` — Add priority select dropdown (low/medium/high, default medium)
- [x] `AddCardForm.tsx` — Update `onSubmit` signature to include priority

### Phase 6: Styles
- [x] `globals.css` — Add `.task-card__actions` flex container for edit + delete icons
- [x] `globals.css` — Add `.task-card__edit` and `.task-card__delete` styles (opacity 0, visible on hover)
- [x] `globals.css` — Add `.task-card__priority-border` (left border + background tint wrapper)
- [x] `globals.css` — Add `.task-card__priority-badge` (pill badge with border/text color)
- [x] `globals.css` — Extend `.modal-form__field` input styles to include `select`

### Phase 7: Tests
- [x] `utils.test.ts` — Update `addCardToColumn` test to pass priority argument
- [x] `utils.test.ts` — Add `updateCard` test: verifies title/description/priority update
- [x] `utils.test.ts` — Add `updateCard` test: verifies unchanged cards when id not found
- [x] `AddCardForm.test.tsx` — Update submit test to expect priority argument in callback
- [x] `AddCardForm.test.tsx` — Update render test to verify priority input is present

---

## Priority Color Mapping

| Priority | Left border / Badge color | Background tint           |
|----------|--------------------------|---------------------------|
| high     | `#ef4444`                | `rgba(239, 68, 68, 0.1)`  |
| medium   | `#eab308`                | `rgba(234, 179, 8, 0.1)`  |
| low      | `#9ca3af`                | `rgba(156, 163, 175, 0.1)`|

---

## Manual Testing Checklist

- [ ] Add new card — priority dropdown appears with default 'Medium' selected
- [ ] Add card with 'High' priority — red badge and left border appear on card
- [ ] Add card with 'Low' priority — gray badge and left border appear on card
- [ ] Add card with 'Medium' priority — yellow badge and left border appear on card
- [ ] Hover over an existing card — pencil edit icon appears alongside trash delete icon
- [ ] Click pencil edit icon — `EditCardForm` modal opens with current card title/description/priority pre-filled
- [ ] Edit card title — change title, click Save Changes, verify new title shows on card
- [ ] Edit card description — change description, click Save Changes, verify change persists
- [ ] Edit card priority — change from medium to high, verify badge turns red
- [ ] Cancel edit — click Cancel button, verify no changes were saved
- [ ] Escape edit — press Escape key, verify modal closes with no changes
- [ ] Drag edited card — verify priority badge and updated data persist after drag
- [ ] Delete card — confirm dialog appears; card is removed (existing behavior unaffected)
- [ ] Rename column — double-click column title to rename (existing behavior unaffected)

---

## Build Verification

- [ ] `npm run build` exits with code 0, no TypeScript errors
- [ ] No console errors in browser DevTools when hovering, editing, adding, dragging cards
- [ ] All existing features still work: add, delete, drag, rename columns
