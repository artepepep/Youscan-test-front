# Dashboard Frontend

React and TypeScript frontend for a full-stack dashboard with persistent,
data-driven widgets.

## Deployed application

- [Website](https://youscan-test-front.onrender.com)
- [Backend endpoint](https://youscan-test-back.onrender.com)

## Features

- Responsive dashboard grid with three widgets per row on desktop
- Line, bar, stacked-bar, pie, and text widgets
- Randomized server-generated data for newly created charts
- Date-range selection for line charts
- Persistent text editing
- Widget creation and deletion
- Loading, empty, and error states
- CSV and XLSX importing through the backend API

The initial line, pie, and stacked-bar charts are populated from the files
provided with the task. Parsing and persistence are handled by the backend.

## Tech stack

- React 19 and TypeScript
- Vite
- TanStack Query
- Recharts
- Tailwind CSS and shadcn/ui primitives
- Feature-Sliced Design

## Local development

Requirements:

- Node.js 20 or newer
- npm
- A running dashboard backend

Install dependencies:

```bash
npm install
```

Create a `.env.local` file if the backend is not running at the default local
address:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the development server:

```bash
npm run dev
```

The frontend is available at `http://localhost:5173` by default.

## Available commands

```bash
npm run dev      # start the development server
npm run build    # type-check and create a production build
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

## Importing chart data

The reusable import mechanism is exposed by the backend. CSV, XLSX, and XLS
files are supported for line, bar, stacked-bar, and pie charts.

For example, import a stacked-bar chart into the deployed dashboard:

```bash
curl -X POST https://youscan-test-back.onrender.com/api/widgets/import \
  -F "file=@/absolute/path/to/stacked-bar.csv" \
  -F "type=stacked-bar" \
  -F "title=Imported stacked chart"
```

The `@` before the file path is required: it tells `curl` to upload the file
rather than send the path as plain text.

Supported import types are `line`, `bar`, `stacked-bar`, and `pie`. For XLSX
files with multiple worksheets, pass an optional sheet name:

```bash
-F "sheet=Sheet name"
```

## Project structure

The source code follows a pragmatic Feature-Sliced Design structure:

```text
src/
├── app/       # application initialization and providers
├── pages/     # route-level page composition
├── widgets/   # large page sections
├── features/  # create, edit, and delete operations
├── entities/  # widget models, API mapping, and rendering
└── shared/    # reusable UI, configuration, and utilities
```
