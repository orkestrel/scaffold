# Unit U3-design — the token contract, adversarial design round

## Role and engine

Two blind lanes on one brief: `planner` on native Opus 5 holds the subjective lane (shape, naming,
ergonomics, the feel the token surface must present); `analyst` on Astra through
`codex exec --sandbox read-only` holds the objective lane (correctness, constraints, what the
readings and the rules permit). Each lane is a fresh context, sees only this brief and the files it
names, and returns a proposal; neither sees the other's answer. Perform the assignment directly
and spawn nothing. A bridge driver carries this brief unaltered and returns the journal; the engine
inside the CLI does the work.

## Question

What is the complete token contract for `@orkestrel/veneer` — the `--vn-*` names and their
grouping, the values each takes from the Elements calibration, the `--bs-*` root aliases, the dark
retune set, the factor tokens, the TypeScript `TOKEN_NAMES` map shape, and the tests that bind
them — such that U3 can implement it in one unit against the plan's closing conditions?

## Context

Read, at these paths, in this order:

- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/tenets.txt` — the user's
  requirements.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md` § Build this product
  (the Tokens, CSS, Identity, Semantics, and Class control rows) and § U3 Token contract (the
  unit this design serves and its closing conditions).
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.md` — the
  accepted foundation values per specimen, state, and mode on managed Chromium and Edge (the
  record the Orchestrator wrote from run 5 and Grok's distillate); every value a token takes must
  trace to a row there.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/ledger.md` § Token rows
  — every `--bs-*` root variable and dark retune Bootstrap 5.3.8 declares, each an alias
  obligation.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.json` — keys
  `root` and `dark` only (the variable names and Bootstrap's values), and `references` (which
  properties consume each variable).
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/tokens.md`,
  `research/platform.md`, `research/motion.md`, and `research/instruments.md` — the retained
  readings on Elements' token source, platform syntax support (every capability the tester engines
  expose is listed there with its reading), motion, and instruments.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/styles.md`, `names.md`,
  `typescript.md`, `architecture.md`, and `tests.md`.
- `C:/Users/mikes/WebstormProjects/veneer/src/styles/` — the landed partials (layer order,
  empty `:root`, empty dark scope, declaration-only mixins) and
  `C:/Users/mikes/WebstormProjects/veneer/configs/src/vite.styles.config.ts` — the build that
  emits `index.css` and `index.rtl.css`.
- `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
  — `readRules`, `findRule`, `readRootToken`, `readStyle`, `readPixels`, `mount`, `extractStyles`,
  `buildEscapes`; the tests must reuse these rather than wrap them.

**Fixed decisions (not for redesign).** `--vn-*` is canonical and lives in `_tokens.scss`; the
`--bs-*` root list is aliased in full in one pass; `TOKEN_NAMES: TokenMap` in `src/core` holds
names only, frozen, grouped, typed, with `TokenName` the union of leaves; values live in SCSS and
nowhere else; theme, density, and radius are independent factor tokens; `data-bs-theme` islands
retune; no `--set-*` vocabulary; the cascade-layer order is `theme, reset, base, elements,
components, utilities`; the hosted-guide fleet name-ownership rule binds every public TypeScript
name (check `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides/*.md`
before proposing one).

**Host.** Read-only; write nothing anywhere; run nothing.

## Evidence to return

Each lane returns one proposal with these parts, every claim pointing at the reading or rule it
rests on:

1. **Name map.** The `--vn-*` namespace as a grouped table: group, token name, the calibration row
   (specimen, state, mode, property) its value comes from, the value, and the Bootstrap `--bs-*`
   variable(s) it aliases. Cover factors (density, radius, elevation, motion), palette, semantic
   color roles with subtle, emphasis, and border tiers, surface and text tiers, spacing, type scale
   and families, radius scale, border, elevation, motion durations and easings, focus ring, and the
   z-index ladder. Name every `--bs-*` root variable the ledger lists and say which `--vn-*` value
   it takes or that it keeps Bootstrap's own value with a reason.
2. **Dark retune.** Which tokens vary by theme, their dark values from the calibration's dark rows,
   how the island selector is written so nesting retunes, and how `color-scheme` follows.
3. **TypeScript shape.** `TokenMap`'s groups and leaf naming, `TokenName`, and how the union stays
   exhaustive without duplicating values; the exact declarations for `src/core/types.ts` and the
   shape of `src/core/constants.ts`.
4. **Departures.** Every place Elements and Bootstrap disagree on a value the token carries, with
   the Elements value taken and the Bootstrap value recorded.
5. **Tests.** For each test the plan's § U3 names, the assertion it makes, the installed helper it
   uses, the planted control that must go red, and the browser reading that closes it.
6. **Risks.** What the calibration does not measure that a token needs (name it as open, with the
   smallest instrument that would settle it), and any rule the proposal cannot satisfy as written.

## Bound

Read only the paths above. Propose one contract; do not propose alternatives unless the readings
leave a fork, and then name the fork and rule on it. Return no more than U3's implementer needs.

## Output

Return only, in this order: `Question` (one line); `Proposal` (parts 1 to 6 as Markdown tables and
short lists); `Unknowns`; `Journal` (the bench lane's session id; the native lane writes `native`);
`Deviation` (anything that stopped you). No process diary.
