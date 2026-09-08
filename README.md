
# Personal Portfolio

A single-page personal portfolio application, presenting academic background, professional experience, technical skills, and project work. The application is implemented in Vue 3 (Composition API) and built with Vite, and is deployed as a static site to GitHub Pages via a continuous-deployment workflow.

## Overview

The application is structured as a client-side-routed single-page application (SPA), comprising a home view — aggregating a biographical summary, a categorized skills inventory, chronological education and experience timelines, and a project index — together with dedicated detail views for individual projects and academic theses. Internationalization is provided for Italian and English, with locale detection based on stored user preference and, secondarily, browser-reported language. Light and dark themes are supported, following an analogous detection precedence based on stored preference and the `prefers-color-scheme` user-agent preference.

Notable implementation characteristics include:

- Client-side routing via Vue Router, configured in HTML5 history mode, with a GitHub Pages-compatible fallback mechanism (`public/404.html`) for direct navigation to nested routes.
- Internationalized content, managed through Vue I18n, with locale-specific message catalogs and a separate, locale-partitioned static content repository (`src/data.js`).
- A custom, DOM-based scroll-bar and pointer-cursor implementation, in place of native browser affordances, to support consistent cross-browser interaction styling.
- Colour tokens verified against the WCAG 2.1 Level AAA contrast criterion for text.
- Animated page transitions and scroll-position restoration, coordinated with Vue Router's navigation lifecycle.

## Technology Stack

| Layer                | Technology                                 |
| -------------------- | ------------------------------------------ |
| Framework            | Vue 3 (Composition API,`<script setup>`) |
| Build tool           | Vite 6                                     |
| Routing              | Vue Router 4                               |
| Internationalization | Vue I18n 11                                |
| Iconography          | `@lucide/vue`                            |
| Package manager      | pnpm                                       |
| Deployment           | GitHub Actions → GitHub Pages             |

## Prerequisites

- [Node.js](https://nodejs.org/) 20.x or later.
- [pnpm](https://pnpm.io/), installed globally:

  ```sh
  npm install -g pnpm
  ```

## Local Development

Clone the repository and install dependencies:

```sh
pnpm install
```

On first install, pnpm may report that a dependency (`esbuild`) requires approval to execute its installation script. This is expected and is pre-authorized via `pnpm-workspace.yaml`; no further action is required.

Start the development server, which serves the application with hot module replacement at `http://localhost:5173`:

```sh
pnpm run dev
```

Produce an optimized production build, emitted to `dist/`:

```sh
pnpm run build
```

Serve the production build locally, for pre-deployment verification:

```sh
pnpm run preview
```

## Deployment

Deployment to GitHub Pages is performed automatically by the workflow defined in `.github/workflows/deploy.yml` on every push to the `main` branch: it installs dependencies via `pnpm install --frozen-lockfile`, executes `pnpm run build`, and publishes the resulting `dist/` directory.

## License

See [`LICENSE`](./LICENSE).
