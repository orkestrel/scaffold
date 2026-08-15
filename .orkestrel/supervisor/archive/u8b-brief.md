# U8b — the application's first stylesheet: focus chrome to bar

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **30f6ed1**. Perform directly, spawn
nothing, no commits/pushes/installs.

## The finding this unit closes (U8, measured and pinned)

Three focus indicators measure below the 3:1 bar against their backgrounds:

| surface | light | dark | bar |
| --- | --- | --- | --- |
| focus ring: theme switch | 4.32:1 | 3.54:1 | 3:1 |
| focus ring: filter | 4.90:1 | **2.24:1** | 3:1 |
| focus ring: drawer | **2.30:1** | **1.59:1** | 3:1 |

The framework's `focus-ring-*` utilities only retint the same quarter-opacity halo, so no
utility closes it. The application ships no stylesheet at all; closing this means creating its
first one, and `.claude/rules/styles.md` governs that structure — read it COMPLETELY and build
the layer as it prescribes (centralization, tokens, layers, naming), sized to what this unit
needs and no more (minimal public surface; no speculative token system).

The pinned findings live in `tests/app/browser/contrast.test.ts` — the per-theme lines that
record the failing readings. Your change flips them: the same instrument that recorded the
failure must record the pass (do not weaken the instrument; the Tab-driven `:focus-visible`
reader stays exactly as it is).

## The unit

1. Create the application's stylesheet layer per the styles rule and wire it through the
   app's real entry (the browser build must ship it; the tests must load it the way the app
   does).
2. Give every keyboard focus indicator in the application a visible ring meeting ≥3:1 against
   its adjacent colors in BOTH themes — the three failing surfaces are the subject; the other
   26 readings must not regress below their bars.
3. Update the pinned lines in `contrast.test.ts` from findings to passing assertions; every
   other reading's assertion stays.
4. Re-run the affected portfolio frames' generation so the captures show the new chrome
   (the registry/membership proofs must stay green; regenerated frames are expected diff).

## Scope

**Owned:** the new style file(s) per the styles rule's placement, the app entry that loads
them (`app/browser/` entry/main files as the rule directs), `tests/app/browser/contrast.test.ts`
(the pinned lines only), the regenerated `tests/app/browser/__screenshots__/portfolio/`
frames. **Off-limits:** `vite.config.ts` and `configs/**` (vendored — deviation-stop if the
stylesheet cannot ship without them), `src/**`, `guides/**` (report the parity delta),
component logic (style-only unit; class additions to templates are yours where the rule's
mechanism needs them).

## Environment facts

Native, listener-capable; Chromium at `/opt/pw-browsers`. The contrast suite and portfolio
run under `npm run test:app:browser`.

## Acceptance criteria

1. All 29+ readings ≥ bar in both themes, proved by the unweakened instrument
   (`npx vitest run --project app:browser tests/app/browser/contrast.test.ts` green with the
   three former findings now asserted ≥3:1).
2. The full browser suites and all gates green; the build ships the stylesheet.
3. The parity delta reported (a new public style surface may owe the guide a sentence).

## Output

Touched files + diffstat; the new ratio table for the three surfaces; per-criterion proofs
with commands and tails; the parity delta; `git status --porcelain`; deviations or none. No
diary.
