# Unit U6 terrain-reference — make `terrain` the reference implementation of the journey skill

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. You are the sole writer in the `terrain`
checkout at `C:\Users\mikes\WebstormProjects\terrain`. Perform the assignment directly and spawn
nothing.

## Objective

Bring `terrain`'s browser suite onto the published `@orkestrel/test/browser` layer and give it one
`integration.test.ts` carrying the journey, refusal, matrix, and statechart families the rewritten
`orkestrel-prove-journey` skill prescribes, with the capture family under its flag, so the skill
has one real implementation to point at.

## Context

**Evidence.**

- The skill you implement: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md`
  and every reference it names, as unit U4 left them. Read them in full first.
- The package: the Orchestrator packed `@orkestrel/test` from the test checkout after unit U1 and
  installed the tarball into this checkout's `node_modules` with `npm install --no-save`; the exact
  tarball path and the installed version are in `tmp/units/terrain-reference-tarball.txt` in this
  checkout. `package.json` still pins `^0.0.6`; do not change the pin — the release wave re-pins to
  the published version. Read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and
  `.../core/index.d.ts` for the surface you code against.
- `tests/setupBrowser.ts` loads Halfmoon, sets `data-bs-core="modern"`, keeps `TEARDOWNS`, and
  declares local `typeInput` and `commitInput` (published now) and IndexedDB fixtures (keep).
- `tests/app/browser/styles/tokens.test.ts` proves focus rings above 3:1 in both themes with inline
  luminance math and carries a negative control at "proves the focus contrast assertion rejects an
  untreated control". Replace the math with `readRing` and `contrast`; the control must still read
  under 3:1 and the treated controls above it.
- `tests/app/browser/setup.ts` exports `renderWithApp`, `renderComponent`, `stubFetch`,
  `installSettings`, and the app fixtures; `App.vue` takes an optional `application` prop for a
  memory-driver app. `app/browser/components/Toolbar.vue` is the surface: one primary `Add
  building`, a `Delete` that is disabled until a row is selected and carries its reason through
  `aria-describedby`, two dropdowns, a theme toggle with the accessible name `Switch to dark mode`
  / `Switch to light mode`.
- `tests/app/browser/components/Toolbar.test.ts` drives the toolbar today through selectors and
  Bootstrap instances; it stays. The new file is a journey, not a component test.
- Bootstrap surfaces switch theme on `data-bs-theme` on `<html>`; terrain's app flips it through
  the controller's `theme` command and `useTheme`.

**Law.** `AGENTS.md`; `.claude/rules/tests.md` (integration test placement and scope, real
implementations, `@orkestrel/test` ownership, no fixed sleeps); `.claude/rules/browser.md`;
`.claude/rules/styles.md`; `.claude/rules/portability.md`. Skill: `orkestrel-prove-journey` and
every reference it names. Guide: terrain's `guides/README.md` and the app guide it names for the
surface, if one exists.

**Host.** Windows 11, Git Bash. `node_modules` is installed. Playwright Chromium is installed
under `%LOCALAPPDATA%\ms-playwright`. The `app:browser` project runs headless Chromium with
`fileParallelism: false`.

**Measurements.** `git status --porcelain` in this checkout reads `D  package-lock.json` and
`?? package-lock.json` before you start: that is the user's state, not yours. Do not stage,
restore, or rewrite the lockfile.

**Control identifiers.** none. Name tests for what they prove.

**Standing conditions.** The lockfile state above. Nothing else writes this checkout while you
run.

## Unknowns

- Whether the variant `apply` must drive the app's theme through the controller or may set
  `data-bs-theme` on `<html>` directly. Ruling: set the attribute directly in `apply`, because the
  matrix family measures the cascade, not the toggle; the journey family drives the toggle through
  the control's accessible name and asserts the attribute changed. Report if the app's watcher
  reverts a direct set.

## Scope

**Owned.** `tests/setupBrowser.ts`, `tests/app/browser/styles/tokens.test.ts`,
`tests/app/browser/integration.test.ts` (new), `tests/app/browser/setup.ts` only to export what
the journey needs.

**Shared (report-only).** `vite.config.ts` (a capture flag or variant environment read may need a
`define` or `env` entry; return a patch), `app/**` (a surface finding the layer's refusals expose
is reported, never fixed here).

**Off-limits.** `package.json`, `package-lock.json`, `app/**`, every other test file.

**What asserts the state this change ends.** `tests/config.test.ts` and `tests/policy.test.ts` if
they enumerate browser test files or setup exports. Run `npm run test:config` and
`npm run test:policy`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for scoped `npx vitest run --project
app:browser <file>`, `npm run test:config`, `npm run test:policy`, `npm run check`,
`npm run format:check`, `npm run lint:check`, `git diff`. No commits, no installs, no
`git checkout`/`restore`/`stash`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## What the suite must carry

`tests/app/browser/integration.test.ts`, mounting the shipped `App.vue` with a memory-driver
application through the real entry:

- **Journey.** A person adds a building through `Add new building` (the accessible name the `aria-label` carries; the visible text is `Add building`), sees the row appear (assert the
  perception of the schedule region), selects it through its row checkbox by accessible name,
  deletes through `Delete selected buildings`, and reads focus landing on `Add new building`. Drive every step by role and
  accessible name through the published verbs; poll every asynchronous fact with a bounded wait.
- **Refusal.** With nothing selected, `Delete selected buildings` is present but not reachable: assert the exact
  voice. `Import buildings` inside the closed CSV menu is not reachable until the menu is opened:
  assert the exact voice, open the menu through its name, assert it becomes reachable.
- **Matrix.** Declare the variants `light-1280`, `dark-1280`, `light-390`, `dark-390` as
  `CaptureVariant` values whose `apply` sets `data-bs-theme`. For each: `Add new building` measures at
  least 4.5:1 through `contrast`, the focus ring of `Add new building` after `traverseAccessible`
  measures at least 3:1 through `readRing`, and `readClasses` of the mounted app minus
  `readCascade()` is empty with a population floor, with a control class known absent showing in
  the difference; `extractStyles` of the freshly mounted app is empty, or lists only the elements
  a named exemption covers (Bootstrap's runtime styles on driven dropdowns and `v-show`).
- **Statechart.** The `Delete selected buildings` control: `idle` (nothing selected, unreachable) × `select` →
  `armed` (reachable, `btn-outline-danger`); `armed` × `deselect` → `idle`; `armed` × `delete` →
  `idle` with the row gone. Declare the transitions with `StateTransition`, one `StateScenario`
  each, and run them with `executeScenarios` from `@orkestrel/test` against a context the suite builds
  from the mounted app.
- **Capture.** Register `schedule-empty`, `schedule-populated`, `delete-armed`; place each from the
  journey that reaches it; keep the always-on expansion-uniqueness and placement set-equality
  proofs, and the disk membership proof under the flag. Read the flag and the variant from
  `import.meta.env` so an ordinary run resizes and writes nothing; report the exact names you read
  so the Orchestrator can run one capture per variant.

Rewrite `tokens.test.ts` to measure through the published readers with the same controls and the
same treated set. Remove `typeInput` and `commitInput` from `tests/setupBrowser.ts` and re-point
their importers to `@orkestrel/test/browser`.

## Output

Return, as your final message, the report you also write to `tmp/units/terrain-reference-report.md`
in this checkout: each family with the test names it carries, the refusal voices asserted, the
variant and flag environment names, every surface finding the layer exposed (with the voice that
exposed it), the bare output of every gate you ran, and every claim you could not close.

## Deviation contract

Stop and report when a journey step cannot be performed through the interface (report it as a
surface finding and continue with the remaining families), when the installed package lacks a name
the skill cites, or when a gate fails outside your owned files. Decide, record, and carry on for
test names, the order of families in the file, and the exact bounded-wait budgets.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` green.
2. `npx vitest run --config vite.config.ts --project app:browser tests/app/browser/integration.test.ts`
   green, and the same for `tests/app/browser/styles/tokens.test.ts` with its negative control
   still reading under 3:1.
3. `npm run test:config` and `npm run test:policy` green.
4. No selector, component instance, or store reach inside the journey file; every target is named
   by role and accessible name.

**Observations, not criteria.** `npm run test:app:browser` as a whole: report its reading; the
Orchestrator takes the authoritative run.

## Review evidence

Code change: return `git diff --stat` and `git status --porcelain` in the report.

## Voice (added 2026-09-02, the user's instruction)

Write every line as a directive for the agent that executes it: what to do, what to check, what to refuse. Match the voice and tone of `AGENTS.md` and `.claude/rules/*.md` throughout. Delete narration, persuasion, and rationale that changes no judgment. This is an acceptance criterion: a file that reads as prose for a person fails the unit.
