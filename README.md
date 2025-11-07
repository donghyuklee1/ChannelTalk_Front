# ChannelTalk Frontend

Collaborative frontend workspace for the ChannelTalk project. This repository contains the shared UI code, prompt assets, and integration layer for the ChannelTalk experience.

## Tech Stack
- React 18 + TypeScript
- Vite build tool
- CSS Modules with global baseline styles
- Axios for API requests

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment defaults:
   ```bash
   cp env.example .env
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Available Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint

## Project Structure
```
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI widgets
│   ├── constants/         # Prompt and copy resources
│   ├── hooks/             # Shared logic
│   ├── pages/             # Route-level components
│   ├── services/          # API clients
│   ├── styles/            # Global and modular styles
│   └── types/             # Shared TypeScript types
├── env.example            # Template for environment variables
├── package.json
└── README.md
```

## Collaboration Guidelines
- Create feature branches from `main` using the `feat/*`, `fix/*`, or `chore/*` naming convention.
- Keep prompt and locale text in `src/constants` rather than hardcoding in components.
- Run `npm run lint` before opening pull requests.
- Use clear, conventional commits (e.g., `feat: add chat composer`).

## Prompt Management
Shared prompt copy lives in `src/constants/prompts.json`. Update this file for content changes and import via `src/constants/index.ts`. Coordinate with backend prompt owners before modifying server-driven prompts.

## License
This project is private for the ChannelTalk team.
