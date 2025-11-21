# AI Coding Instructions

## Project Overview

This is a modern React frontend application built with TanStack Router, TanStack Query, Vite, and Tailwind CSS v4. It uses Bun as the package manager and runtime, with Biome for linting/formatting instead of ESLint/Prettier.

## Tech Stack & Architecture

### Core Technologies

- **Build Tool**: Vite 7 with React plugin + React Compiler (babel-plugin-react-compiler)
- **Routing**: TanStack Router with file-based routing (auto-generates `src/routeTree.gen.ts`)
- **State Management**: TanStack Query v5 for server state
- **Styling**: Tailwind CSS v4 (newer version with different config approach)
- **Runtime**: Bun (not Node.js)
- **Linting/Formatting**: Biome (not ESLint/Prettier)

### Router Architecture

- Routes are file-based in `src/routes/` - **never manually edit** `src/routeTree.gen.ts` (auto-generated)
- Each route exports a `Route` constant: `export const Route = createFileRoute("/path")({ component: Component })`
- Root route (`__root.tsx`) uses `createRootRouteWithContext<MyRouterContext>()` to inject QueryClient context
- Router is initialized in `src/main.tsx` with context from TanStack Query provider pattern

### TanStack Query Integration Pattern

The project uses a specific provider pattern in `src/integrations/tanstack-query/root-provider.tsx`:

- `getContext()` creates a QueryClient and returns it
- `Provider` component wraps children with QueryClientProvider
- Router receives queryClient via context in `main.tsx`

## Development Commands

```bash
bun install              # Install dependencies
bun run dev              # Start dev server on port 3000
bun run build            # Build for production (runs vite build && tsc)
bun run test             # Run Vitest tests
bun run check            # Biome lint + format check
bun run lint             # Biome lint only
bun run format           # Biome format only
```

**Important**: Use `bun` commands, not `npm` or `yarn`. Development server runs on port 3000.

## Code Conventions

### Import Aliases

Use `@/` for all imports from `src/`:

```tsx
import Lock from '@/icons/Lock';
import { getContext } from '@/integrations/tanstack-query/root-provider';
```

### Biome Formatting Rules

- **Tabs for indentation** (not spaces) - configured in `biome.json`
- **Double quotes** for strings in JavaScript/TypeScript
- Biome auto-organizes imports via `assist.actions.source.organizeImports`
- Files checked: `src/**`, `.vscode/**`, `index.html`, `vite.config.js`
- **Excluded**: `routeTree.gen.ts`, `src/styles.css`

### Component Patterns

- Route components are defined as functions within the route file, not separate files:

```tsx
export const Route = createFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  return <div>...</div>;
}
```

- Icons are React components in `src/icons/` returning inline SVG elements
- Use Tailwind classes directly (no CSS modules or styled-components)

### TypeScript Configuration

- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `verbatimModuleSyntax: true` - use explicit `type` imports where needed
- `noEmit: true` - TypeScript is type-checking only, Vite handles transpilation

## Adding New Routes

1. Create file in `src/routes/` (e.g., `src/routes/dashboard.tsx` or `src/routes/admin/users.tsx`)
2. TanStack Router plugin auto-generates the route tree
3. Export route using `createFileRoute()`:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return <div>Dashboard</div>;
}
```

4. Use `<Link to="/dashboard">` from `@tanstack/react-router` for navigation

## Current State

### Implemented

- Auth routes: `/auth/login` (styled form), `/auth/register` (placeholder)
- Home page: `/` with link to login
- Custom SVG icons: `Lock`, `Mail`, `SignIn` in `src/icons/`
- Tailwind v4 setup (empty config file is intentional)
- TanStack Query provider integration with router context

### Folder Structure Notes

- `src/components/` - currently empty, ready for shared components
- `src/data/` - currently empty, likely for mock data or API clients
- Root route minimal (`<Outlet />` only), no shared layout yet

## Known Patterns

### Router Context Type Safety

The router is typed with a custom context interface:

```tsx
interface MyRouterContext {
  queryClient: QueryClient;
}
```

This enables type-safe access to queryClient in route loaders/hooks.

### Performance Optimizations

- React Compiler enabled via Babel plugin (automatic memoization)
- Auto code-splitting via `autoCodeSplitting: true` in router config
- Preload strategy: `defaultPreload: "intent"` (preloads on hover)
- Structural sharing enabled: `defaultStructuralSharing: true`

## Testing

- Uses Vitest + jsdom for unit/integration tests
- Testing Library React for component tests
- Run with `bun run test`

## Common Pitfalls

- Don't edit `src/routeTree.gen.ts` - it's auto-generated by TanStack Router
- Don't use npm/yarn/pnpm - this project uses Bun
- Don't add ESLint/Prettier config - Biome is used instead
- Don't use spaces - Biome enforces tabs
- Remember to use `@/` alias for imports, not relative paths
