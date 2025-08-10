## Farcaster Football Trivia Mini‑app

An interactive football (soccer) trivia game built with Next.js and designed to run as a Farcaster Mini‑app. Includes multiple difficulty modes, progress tracking, instant feedback, and a polished UI.

### Features
- **Game modes**: Random mix, Easy, Medium, Hard, and Current Season (2025)
- **Progress + scoring**: Visual progress bar, score tracking, and result summary
- **Rich UI**: Tailwind CSS + shadcn/ui + Radix primitives, icons via `lucide-react`
- **Mini‑app ready**: Integrates `@farcaster/miniapp-sdk` for use inside Farcaster clients

### Tech Stack
- **Next.js 15**, **React 19**, **TypeScript**
- **Tailwind CSS**, **shadcn/ui**, **Radix UI**, **lucide-react**
- **@farcaster/miniapp-sdk** for Farcaster integration

---

## Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended)
- pnpm (recommended) or npm/yarn

### Install
```bash
pnpm install
# or
npm install
```

### Develop
```bash
pnpm dev
# Visit http://localhost:3000
```

### Build & Start
```bash
pnpm build
pnpm start
```

### Scripts
- `dev`: Start the Next.js dev server
- `build`: Production build
- `start`: Run the production server
- `lint`: Run Next.js linting

---

## Using as a Farcaster Mini‑app

This project calls `sdk.actions.ready()` on load (see `app/page.tsx`) to integrate with Farcaster Mini‑app clients.

To expose the app as a Mini‑app:
- Host the app on HTTPS
- Add the appropriate Mini‑app manifest under `public/.well-known/`
- Configure your Farcaster client or registry to point at your deployed URL

Example manifest file path:
```
public/.well-known/farcaster.json
```

Note: Manifest structure can vary by client/spec version. Consult the `@farcaster/miniapp-sdk` documentation for the latest manifest fields and registration steps.

---

## Editing/Adding Questions

Questions live in `data/football-trivia.ts`. Each item has:
```ts
{
  id: number,
  question: string,
  options: string[],
  correct: number,      // index into options
  difficulty: 'easy' | 'medium' | 'hard' | 'current',
  category: string
}
```

- Add new questions to the appropriate arrays (`premierLeague`, `european`, `classic`, `current`, `records`).
- The game pulls questions by difficulty or chooses a random mix via utilities in `triviaUtils`.

Key utilities exported from `data/football-trivia.ts`:
- `getRandomQuestions(count)`
- `getQuestionsByDifficulty(difficulty)`
- `getQuestionsByCategory(category)`
- `getScoreMessage(correct, total)`

---

## Project Structure
```
app/
  page.tsx              # Loads the FootballTrivia component and Mini‑app ready hook
components/ui/          # shadcn/ui components
data/football-trivia.ts # Question bank + utilities
football-trivia.tsx     # Main game component
public/.well-known/     # Place Mini‑app manifest files here
```

---

## Deployment

The app works well on Vercel or any Node‑capable host.

Basic steps (Vercel):
- Push to a Git repo connected to Vercel
- Set the framework to Next.js
- Build command: `pnpm build`
- Output: `.next`

After deploy, ensure your Mini‑app manifest under `public/.well-known/` is accessible over HTTPS.

---

## Acknowledgements
- UI built with shadcn/ui and Radix UI
- Icons by `lucide-react`
- Farcaster integration via `@farcaster/miniapp-sdk`