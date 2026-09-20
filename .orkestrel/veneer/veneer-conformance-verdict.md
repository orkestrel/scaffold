# Veneer tree conformance audit, first half — verdict, 2026-09-20

Subject: the built Veneer tree outside U3's owned files (`src/browser/**`, `app/**`, their tests,
`configs/**`, the root configuration, `tests/setupConformance*.ts`, `tests/conformance.test.ts`,
`tests/distribution.test.ts`), read against scaffold's law and the fleet's layout. Brief:
`units/veneer-conformance-brief.md`. Lanes, blind to each other, through workflow
`wf_41491b15-74c`: `checker` on native Sonnet (`units/veneer-conformance-checker-report.md`; its
coverage note admits it read the placement class alone and left the configuration files unread)
and `reviewer` on native Opus 5 (`units/veneer-conformance-reviewer-report.md`; every file of the
half read). The user's question — why `ColorMode` sits in a nested `color-mode` folder — opened
the audit; the U1 writer (Astra) chose the folder, and the U1 audit and the Orchestrator let it
stand. The second half (U3's files) is audited in U3's own round with placement claims added.

## Rulings

| Finding | Lanes | Ruling | Carrier |
| --- | --- | --- | --- |
| `ColorMode` and `Showcase` each nest alone in a folder (`color-mode/`, `showcases/`), tests mirroring | both | accepted: flat at the environment root, tests mirrored, barrels and imports updated, folders deleted | U1-conform |
| `ColorScheme` names the CSS property while its values are Bootstrap's mode; three words for one axis | reviewer | accepted: `ColorModeState`, `isColorModeState` | U1-conform |
| `createColorMode`, `createShowcase` are pass-through factories | reviewer | accepted: deleted with their test file, cases folded into the class tests, callers construct directly | U1-conform |
| `tsconfig.json` lacks `@src/styles`; `app/browser/main.ts` imports `../../src/styles/index.scss` | reviewer | accepted in substance; the root `tsconfig.json` and `vite.config.ts` are scaffold content-owned and `repair` restores them, and scaffold's compilers generate no styles environment although `workspace.md` documents one — the cause is a scaffold gap | S1, then U1-conform's `main.ts` import |
| `configs/src/vite.styles.config.ts` is a whole configuration; the root registers no `src:styles` project | reviewer | accepted in substance for the same reason: the generated root must carry the `srcStyles` factory and the project, and the wrapper then thins | S1 |
| `main.ts` imports its own barrel | reviewer | accepted: import the concrete module | U1-conform |
| `index.html` title is the birth placeholder | reviewer | accepted: `Veneer` | U1-conform |
| `@tailwindcss/vite`, `postcss`, `tailwindcss` declared with no consumer in this half | reviewer | `postcss` keeps its consumer in U3 (`tests/setupStyles.ts` parses the Bootstrap oracle); the Tailwind pair is removed until the Tailwind unit, which declares them with their first consumer | U1-conform (manifest patch, report-only; the Orchestrator installs) |
| conformance's last case needs `dist/src` and is a distribution subject | reviewer | accepted: moved to `tests/distribution.test.ts` | U1-conform |
| `read*` used for extract, scan, collect, and compute helpers in `tests/setupConformance.ts` | reviewer | accepted: renamed by the helper-prefix table | U1-conform |
| `tests/src/browser/fixtures/constants.ts` is a load-time control in a data-named file, in a folder the fleet lacks | reviewer | accepted: the control moves to a `tests/setup*.ts` module named for what it does, and the folder goes; rule for the plan: a `fixtures/` folder under a test directory holds only data files a proof loads (SCSS, JSON), never a TypeScript declaration | U1-conform; § process rule |
| `COLOR_MODE_KEY = 'theme'` | reviewer (bound) | accepted: `'color-mode'` | U1-conform |
| `Showcase` constructor builds the tree | reviewer (bound) | accepted: `#mount()` | U1-conform |
| `_shell.scss` declares no layer, carries a deferred comment; the app entry declares no order | reviewer (bound) | accepted: the app's own layer and order; present-tense comment | U1-conform |
| Vue wiring (`vue`, `@vitejs/plugin-vue`, `vue-tsc`) with no `.vue` file | reviewer (bound) | scaffold mandates it (`APP_BROWSER_DEV_DEPENDENCIES`); the guide's shell section records the framework-free choice | U1-conform (guide sentence) |
| `WORKSPACE_PATH` | reviewer (bound) | accepted: `WORKSPACE_ROOT` | U1-conform |

## Order

U3's writer exits → U3's audit round (read-only) → U3 lands → U1-conform writes Veneer, with the
two S1-dependent items (the `@src/styles` import and the wrapper) left as named bounds → S1 in
scaffold after the vendored-only release publishes → Veneer re-pins and repairs → the two bounds
close in a U1-conform successor. U4b follows.
