# Kanban Project Manager

A modern drag-and-drop Kanban board application built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

- Single board with 5 customizable columns
- Drag and drop cards between columns
- Add and delete cards with title and details
- Rename columns
- Responsive design
- No persistence (state resets on refresh)
- Pre-populated with dummy data

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Local Development

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Testing

```bash
cd frontend

# Run unit tests in watch mode
npm test

# Run unit tests once (CI mode)
npm run test:ci

# Run unit tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Production Build

```bash
cd frontend
npm install
npm run build
npm start
```

The app will be available at http://localhost:3000.

## GitHub Setup

1. Create a new GitHub repository
2. Push the project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Kanban MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Hostinger Deployment

Hostinger Node.js hosting automatically deploys from GitHub. Follow these steps:

### 1. Prepare GitHub Repository

- Push your code to GitHub as shown above
- Verify the repository structure shows `frontend/` directory

### 2. Configure Hostinger Node.js Hosting

1. Log in to Hostinger hPanel
2. Navigate to Hosting → Manage
3. Go to Node.js App section
4. Click "Create Node.js App"
5. Configure:

**Basic Settings:**
- **Project root:** Leave as default (your domain root)
- **Project URL:** Your domain name
- **Node.js version:** Select 18.x or 20.x

**Application Settings:**
- **Application mode:** Production
- **Application root:** `frontend`
- **Application URL:** http://localhost:3000
- **Startup file:** `package.json` (Hostinger reads scripts from here)

**Build & Start Commands:**
- **Build command:** `npm install && npm run build`
- **Start command:** `npm start`

**GitHub Integration:**
- **Repository:** Select your GitHub repository
- **Branch:** `main`
- Enable auto-deployment on push

6. Click "Create" or "Deploy"

### 3. Verify Deployment

1. Wait for deployment to complete (check logs in hPanel)
2. Navigate to your domain
3. Test all features:
   - Drag and drop cards between columns
   - Add new cards
   - Delete cards
   - Rename columns
4. Check browser console for errors

### Troubleshooting

**Build fails in Hostinger:**
- Check Node.js version is 18+ (set in `package.json` engines field)
- Verify build command: `npm install && npm run build`
- Check error logs in Hostinger hPanel

**App doesn't start:**
- Verify start command: `npm start` (runs `next start`)
- Check port is correct (3000)
- Ensure `.next/` directory exists after build

**Missing features:**
- Clear browser cache and reload
- Check browser console for JavaScript errors
- Verify all files deployed correctly

**GitHub auto-deploy not working:**
- Verify GitHub webhook is configured in Hostinger
- Check repository branch is `main`
- Ensure Hostinger has GitHub OAuth permissions

## Technology Stack

- Next.js 16.1.6 (App Router)
- React 19.2.3
- Tailwind CSS 4
- @dnd-kit (drag and drop)
- Lucide React (icons)
- TypeScript

## Color Scheme

- Accent Yellow: #ecad0a
- Blue Primary: #209dd7
- Purple Secondary: #753991
- Dark Navy: #032147
- Gray Text: #888888

## License

MIT
