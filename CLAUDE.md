# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Install: `npm install`
- Dev server (http://localhost:8080, hot reload): `npm start` — uses `local` config. `npm run start:<development|staging|production>` serves with that environment's config instead.
- Build: `npm run build:<development|staging|production>` → output in `./build` (cleaned each build).
- Lint: `npm run lint` (ESLint + Prettier on `.ts/.tsx`). A Claude Code PostToolUse hook in `.claude/settings.json` runs Prettier on every edited file.
- Type checking runs inside webpack via `fork-ts-checker-webpack-plugin` (`async: false`, so type errors fail the build/dev compile). There is no standalone `tsc` script; use `npx tsc --noEmit` if needed.
- There is no test runner configured.

## Architecture

React 18 + TypeScript SPA, bundled by a custom webpack 5 config (no CRA/Vite) and transpiled by Babel (`.babelrc`), not `tsc`.

**Environment config**: `webpack.config.js` takes `--env NODE_ENV=<name>`, merges `src/configs/default.json` with `src/configs/<name>.json`, and injects the result as `window._GLOBAL` via `DefinePlugin`. App code reads it through `src/configs/index.js`. `NODE_ENV=local` is the only "development" webpack mode; every other env (including `development`) builds in production mode with extracted CSS. To add a config key, add it to the relevant JSON files — no `.env` files are used.

**Entry & routing**: `src/index.js` mounts the Redux `Provider` and `src/app/router.tsx`. The router lazy-loads pages from `src/pages/*` and imports `@/translations/i18n` for side-effect initialization. Authenticated pages are nested under the `/` route wrapped in `PrivateRoute` + `DashboardLayout` (which renders an `<Outlet>`). `PrivateRoute` only checks for a token in `localStorage` (`LOGIN_ACCESS_TOKEN`). Route paths live in `ROUTER_PATH` in `src/constants/common.ts`.

**API layer**: `src/api/*` currently returns mocked promises via `src/utils/mock-api.ts` (no HTTP client is installed). Demo login: `admin` / `123456`.

**State**: Redux Toolkit slices in `src/redux/reducers/*.reducer.ts`, registered in `src/redux/store.ts`; selectors in `src/redux/selectors/`. Use the typed `useAppDispatch` / `useAppSelector` from `src/redux/hooks.ts`. Payload types go in `src/types/reduxPayload/`.

**Forms**: `react-hook-form` + `yupResolver`. Yup schemas live in `src/shared/validation/`, messages in `src/constants/validation-messages.ts`. Shared form components (`InputField`, `Select`, `Checkbox`, etc.) take a `control` prop from `useForm` and must bind `value` so `reset()` works. Validation messages are i18n keys (in `translations/error-messages.json`), rendered/translated by the `ErrorMessage` component.

**UI components**: `src/component/<Name>/` wrap Ant Design v5 components; always import them through the barrel `@/component` and register new ones in `src/component/index.ts`. `Toast(type, message)` is a function, not a JSX component.

**Styling**: SCSS modules (`*.module.scss`, imported as `styles`) per component/page. Global SCSS (variables, breakpoints, antd overrides) is in `src/assets/styles/bases/` and loaded once via `main.scss`. SVGs imported in TSX are inlined as React components by `babel-plugin-inline-react-svg` (see `src/assets/icons/index.ts`).

**i18n**: i18next with JSON resources in `src/translations/`, deep-merged in `i18n.ts` — new namespace files must be imported and added to the merge there. Selected language persists to `localStorage`.

## Conventions

- Import alias `@/` → `src/` (configured in both webpack and tsconfig).
- File names are kebab-case (`input-field.tsx`); component folders and page folders are PascalCase; pages export from `index.tsx`.
- Prettier: no semicolons, single quotes (including JSX), 2-space indent, `printWidth` 120, no trailing commas.
- Code comments in config files are often in Vietnamese.

## Deployment

`.github/workflows/deploy.yml`: every push to `master` runs `npm run build:development` and syncs `./build` to the S3 bucket `react-base-tqhuy` (ap-southeast-1) with `--delete`; hashed assets get long-lived cache headers, `index.html` gets `no-cache`. `.claude/settings.json` denies `git push origin master` for Claude — the user pushes themselves.
