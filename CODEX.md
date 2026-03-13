# Kanban Web App - Codex Setup Guide

This document provides CLI commands and task instructions for setting up and running the Kanban board application on the Codex platform.

## Prerequisites

- Node.js 18+ and npm installed
- Git for cloning repositories
- Terminal/shell access

## Quick Start Commands

### 1. Navigate to Project
```bash
cd C:\agentic-coding\kanban\frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Task List for Codex AI Agent

### Phase 1: Initial Setup
- [ ] Verify Node.js version is 18 or higher
- [ ] Navigate to frontend directory: `cd C:\agentic-coding\kanban\frontend`
- [ ] Install all dependencies: `npm install`
- [ ] Verify installation completed without errors

### Phase 2: Development Server
- [ ] Start development server: `npm run dev`
- [ ] Confirm server starts successfully on port 3000
- [ ] Verify no compilation errors in terminal output
- [ ] Check that browser can access http://localhost:3000

### Phase 3: Application Verification
- [ ] Open application in browser at http://localhost:3000
- [ ] Verify 5 columns are displayed with dummy data
- [ ] Test drag and drop: move a card between columns
- [ ] Test add card: click "+ Add Card" button, fill form, submit
- [ ] Test card deletion: click card delete icon, confirm deletion
- [ ] Test column rename: double-click column title, edit, save
- [ ] Verify all UI elements are visible and styled correctly

### Phase 4: Bug Verification
- [ ] Test card deletion: click delete on card, click "Yes", verify card is removed immediately
- [ ] Test card text visibility: open Add Card modal, verify input and textarea text is white and readable
- [ ] Add a new card and verify it appears in the correct column
- [ ] Delete a newly added card and verify it's removed

## Available Scripts

### Development
```bash
npm run dev
```
Starts Next.js development server with hot reload

### Production Build
```bash
npm run build
```
Creates optimized production build

### Start Production Server
```bash
npm start
```
Starts production server (requires build first)

### Linting
```bash
npm run lint
```
Runs ESLint for code quality checks

## Testing

### Manual Testing Checklist
- [ ] All 5 columns render correctly
- [ ] Dummy cards are visible in columns
- [ ] Drag and drop works between any columns
- [ ] New cards can be added to any column
- [ ] Cards can be deleted with confirmation
- [ ] Column titles can be edited
- [ ] Responsive layout works on browser resize
- [ ] No console errors in browser DevTools

### Integration Testing (Optional)
```bash
cd C:\agentic-coding\kanban\frontend
npx playwright test
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Main board page
│   │   └── globals.css      # Global styles and theme
│   ├── components/
│   │   ├── Board.tsx        # Main board container
│   │   ├── Column.tsx       # Individual column
│   │   ├── Card.tsx         # Individual card
│   │   └── AddCardForm.tsx  # Add card modal
│   └── lib/
│       ├── types.ts         # TypeScript interfaces
│       └── data.ts          # Dummy data generator
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Technology Stack

- Next.js 15 (React 19)
- TypeScript
- Tailwind CSS 4
- dnd-kit (drag and drop)
- Lucide React (icons)

## Color Scheme Reference

- Accent Yellow: #ecad0c
- Blue Primary: #209dd7
- Purple Secondary: #753991
- Dark Navy: #032147
- Gray Text: #888888

## Application Features

- Single Kanban board with 5 fixed columns
- Drag and drop card movement between columns
- Add new cards with title and description
- Delete cards with confirmation dialog
- Edit column titles
- Client-side rendered (no persistence)
- Pre-populated with dummy data

## Known Issues

All reported bugs have been fixed:
- Card deletion now works correctly
- AddCardForm input text is now white and readable
