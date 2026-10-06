# Frontend Development Guidelines

## Project context

This application uses React and TypeScript. Organize frontend code using a pragmatic version of Feature-Sliced Design (FSD).

Prioritize clear ownership, predictable dependencies, strong typing, and simple code. Do not introduce abstractions unless they solve an existing problem or remove meaningful duplication.

Before changing code, inspect the nearby implementation, package scripts, TypeScript configuration, lint rules, and existing conventions. Preserve established conventions unless this file explicitly overrides them.

## Architecture

Use these layers inside `src`:

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

Layer responsibilities:

- `app` — application initialization, providers, routing, global configuration, and global styles.
- `pages` — route-level screens and composition of lower layers.
- `widgets` — large, reusable page sections composed from features and entities.
- `features` — user actions and business capabilities, such as creating or deleting an item.
- `entities` — business entities, their types, reusable representations, and entity-specific data access.
- `shared` — business-independent UI, infrastructure, utilities, configuration, and base types.

Allowed dependency direction:

```text
app → pages → widgets → features → entities → shared
```

A lower layer must never import from a higher layer. Slices on the same layer should not depend directly on each other's internal implementation.

## Slices and segments

Create a slice for each distinct entity, feature, widget, or page. Use only the segments that the slice needs:

- `ui` — React components and component styles.
- `model` — state, hooks, schemas, selectors, and business logic.
- `api` — requests, query definitions, and transport mapping.
- `lib` — helpers used only inside the slice.
- `config` — configuration owned by the slice.

Example:

```text
features/create-widget/
├── api/
│   └── create-widget.ts
├── model/
│   ├── create-widget.schema.ts
│   └── use-create-widget.ts
├── ui/
│   └── CreateWidgetModal.tsx
└── index.ts
```

Do not create empty folders to satisfy the structure. Small slices may contain only a component and `index.ts`.

## Code placement

Place code in the lowest suitable layer:

- Keep page composition in `pages`.
- Put a large independent page section in `widgets` only when it has a clear responsibility or is reused.
- Put an action initiated by a user in `features`.
- Put reusable business data, entity types, entity-specific requests, and entity UI in `entities`.
- Put code in `shared` only when it is independent of the product domain.
- Keep code used by one slice inside that slice.
- Move code upward or into `shared` only after real reuse appears.

Do not create global folders such as `components`, `hooks`, `services`, `utils`, `helpers`, or `types` at the root of `src`.

Avoid generic files such as `utils.ts`, `helpers.ts`, `common.ts`, or `constants.ts`. Use names that state the purpose, such as `format-chart-value.ts` or `parse-api-error.ts`.

## Dashboard domain terminology

The word `widget` has two meanings in this project:

- The FSD `widgets` layer contains large interface sections, such as `dashboard-grid`.
- A dashboard widget is a business entity and belongs to `entities/dashboard-widget`.

Use these locations for dashboard functionality:

```text
widgets/dashboard-grid/
entities/dashboard-widget/
features/create-widget/
features/delete-widget/
features/edit-text-widget/
```

Chart and text rendering belong to `entities/dashboard-widget/ui`. User operations belong to the appropriate feature slice.

## Public APIs and imports

Every slice must expose its supported public API through its root `index.ts`.

Use explicit exports:

```ts
export { CreateWidgetModal } from "./ui/CreateWidgetModal";
export type { CreateWidgetFormValues } from "./model/create-widget.types";
```

Avoid wildcard exports when explicit exports are practical.

Import other slices through their public API:

```ts
import { CreateWidgetModal } from "@/features/create-widget";
```

Do not import another slice's internal files:

```ts
// Avoid
import { CreateWidgetModal } from "@/features/create-widget/ui/CreateWidgetModal";
```

Relative imports are allowed within the same slice. Use the `@/` alias for imports across slices. Avoid circular dependencies.

## React rules

- Use function components and hooks.
- Do not use `React.FC`.
- Keep components focused on one responsibility.
- Keep local UI state close to the component that owns it.
- Extract a custom hook when logic is reused or when extraction substantially clarifies a component.
- Prefer composition over large components with many boolean props.
- Keep side effects in event handlers or narrowly scoped effects.
- Do not use `useEffect` to derive values that can be calculated during render.
- Add memoization only when it solves a measured or clear rendering problem.
- Handle loading, empty, success, and error states where they occur.
- Make interactive controls accessible by keyboard and provide meaningful labels.

## TypeScript rules

- Use strict TypeScript.
- Prefer `type` over `interface` unless declaration merging is required.
- Do not use `any`. Use `unknown` and narrow it safely when the value is external.
- Use discriminated unions for variants such as widget types and their data.
- Avoid unsafe type assertions. Validate data at external boundaries.
- Keep domain types in their owning entity or feature.
- Keep truly generic types in `shared`.
- Use exhaustive checks when handling unions.

Example:

```ts
type DashboardWidget =
  | { id: string; type: "line"; data: LineChartData }
  | { id: string; type: "bar"; data: BarChartData }
  | { id: string; type: "stacked-bar"; data: StackedBarChartData }
  | { id: string; type: "pie"; data: PieChartData }
  | { id: string; type: "text"; data: TextWidgetData };
```

## Data fetching and state

- Keep server state in the project's query library, such as TanStack Query.
- Keep request functions and transport mapping in `api` segments.
- Keep query keys centralized within the owning slice.
- Invalidate or update relevant cached data after mutations.
- Do not duplicate server data in global client state.
- Use component state for local UI concerns.
- Introduce global client state only for state shared across distant parts of the application.
- Convert backend DTOs to frontend domain models at the API boundary when their shapes differ.

## Styling and UI

### shadcn/ui

- Use shadcn/ui as the source of reusable UI primitives.
- Place generated shadcn components in `src/shared/ui`.
- Do not place shadcn components in `src/components/ui`.
- Treat generated shadcn components as project-owned source code; they may be modified when required.
- Keep shadcn primitives business-independent.
- Do not add dashboard-specific behavior to components in `shared/ui`.
- Compose shadcn primitives inside entity, feature, widget, and page slices.
- Use Tailwind CSS for styling and follow the project's existing design tokens.
- Use the `cn` utility from `@/shared/lib/utils` for conditional class names.
- Before creating a custom primitive, check whether an appropriate shadcn component already exists.
- Do not install large groups of unused shadcn components.

## Naming

- Components: `PascalCase.tsx`.
- Hooks: `useSomething.ts`.
- Other TypeScript files: `kebab-case.ts`.
- Tests: `*.test.ts` or `*.test.tsx`.
- CSS modules: `*.module.css`.
- Slice folders: `kebab-case`.
- Boolean variables and props should read as predicates, such as `isLoading`, `hasError`, or `canEdit`.
- Event handlers should describe the event or result, such as `handleSave` or `handleWidgetDeleted`.

## Error handling

- Validate user input before sending it.
- Treat API responses and other external values as untrusted.
- Show actionable errors near the UI that produced them.
- Allow retry when an operation can reasonably be retried.
- Do not silently swallow errors.
- Log enough context for debugging without exposing secrets or personal data.

## Testing

- Test observable behavior and business rules.
- Prefer focused unit tests for pure model logic and component tests for important user flows.
- Add integration tests for API boundaries or multi-component behavior when they provide meaningful coverage.
- Avoid tests that only repeat implementation details.
- Mock at system boundaries rather than mocking internal functions extensively.
- Keep tests beside the code they cover unless the repository already uses a dedicated test structure.

## Change discipline

- Keep changes within the requested scope.
- Reuse existing libraries and patterns before adding dependencies.
- Do not refactor unrelated code while implementing a feature.
- Remove obsolete code introduced or made unreachable by the change.
- Do not leave commented-out code, debug logging, or unexplained TODO comments.
- Update documentation when setup, architecture, environment variables, or user-visible behavior changes.

## Completion checklist

Before completing a task:

1. Confirm that files are placed in the correct FSD layers and slices.
2. Confirm dependency direction and public API imports.
3. Confirm loading, empty, error, and success states where relevant.
4. Confirm external data and user input are validated.
5. Run the relevant repository commands for formatting, linting, type checking, tests, and build.
6. Fix failures caused by the change.
7. Report what changed, which checks ran, and any remaining limitation.

Use the actual scripts defined in `package.json`. Typical commands are:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Do not claim a check passed unless it was executed successfully.
