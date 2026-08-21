# Unit H-browser-1: reachability consolidation and the describe layer

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing.

## Objective

Two coupled deliveries from the reconciled round (`design2-reconciliation.md`, families 3 and
6-partial): FIRST consolidate the published browser layer's near-duplicate reachability
filters into one `isReachable`, THEN land the accessibility describe layer beside the act
layer, plus `clearStorage`.

## Context

Authority: `AGENTS.md`; `.claude/rules/names.md` (the package's own verb table — `resolve*`
returns elements, `read*` returns facts, `describe*` renders descriptions),
`.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/writing.md`. Guide `guides/test.md` granted
for your own Surface/Voices rows only. The browser project runs Playwright Chromium
(`npx.cmd vitest run ... --project src:browser` spawns a real browser).

The supervisor originals (read-only, another repository) at
`supervisor/tests/setupBrowser.ts`: `isRendered` `:402`, `collapseText` `:421`, `resolveRole`
`:444`, `resolveName` `:476`, `resolveStates` `:522`, `describeTree` `:572`, `describeFocus`
`:613`, the constants `:300-382`, `clearBrowserStorage` `:115`.

The measured near-duplicates to consolidate, in the PUBLISHED layer
(`test/src/browser/helpers.ts`): `resolveRendered` `:58-69` (connected, visible, sized,
`tabIndex >= 0`, not disabled, no inert ancestor), `clickAccessibleWithin` `:186-198` (the
same list retyped), `clickDisclosure` `:234-244` (the same minus the disabled check),
`readPerception` `:378-386` (connected, visible, sized only).

## The design, fixed by the reconciled round

1. CONSOLIDATION FIRST: extract one exported `isReachable(element): boolean` and route
   `resolveRendered`, `clickAccessibleWithin`, and `clickDisclosure` through it. Where
   unifying would change what a helper accepts (`clickDisclosure` lacks the disabled check
   today; `readPerception` differs deliberately), preserve the current behaviour and record
   the choice — your report carries a per-helper before/after table of the conditions each
   gained or lost, and every Voices message in the guide must still be thrown by the same
   helper for the same input.
2. The describe layer, adopted with the package's verbs: `isRendered(element)` (announced —
   no geometry), `readText(element)` (from `collapseText`), `readRole(element)`,
   `readName(element)`, `readStates(element)`, `describeTree(element)`,
   `describeFocus(element)`. Constants in `src/browser/constants.ts`: `IMPLICIT_ROLES`,
   `HEADER_ROLES` (from `IMPLICIT_HEADERS`), `FIELD_ROLES` (from `IMPLICIT_FIELDS`),
   `CONTENT_ROLES`, `FOCUSABLE_SELECTOR` (from `FOCUSABLE`). `IMPLICIT_ROLES`' membership is
   CONTRACT: its TSDoc states the answered element population, and `describeTree` omits an
   element the map does not answer for — visibly (the tests prove the omission is observable).
   `isRendered`/`isReachable` stand as a deliberate pair with the difference stated (announced
   vs clickable).
3. `clearStorage(): void` in `src/browser/helpers.ts` (from `clearBrowserStorage`).
4. EXCLUDED — do not adopt: `describeSurface`, `extractControls`, `resolveText`/`findText`,
   the press/fill family, `recordArrival`/`driveArrival`, anything Vue-coupled.
5. `extractOrphans(root, child, parent)` — the parameterized class-ancestry orphan check —
   IS adopted (family 3's one salvage), in `src/browser/helpers.ts`, framework names as
   arguments only.

## Tests, in `tests/src/browser/helpers.test.ts`

Follow the file's idiom (real browser, real nodes). Cover: each mapped tag in
`IMPLICIT_ROLES` plus a control tag OUTSIDE the map proving the omission is visible; a
`section` with and without a name; a `th` per scope; an anchor with and without `href`; a
`select` in both modes; an `aria-hidden` glyph dropped from `readName`; `aria-labelledby`
across several ids; `describeTree` indentation following roles; `describeFocus` honouring a
positive `tabindex`; `isRendered` vs `isReachable` split (a zero-size announced control);
`clearStorage` clearing both storages; `extractOrphans` finding a child-class element with no
matching ancestor and staying empty when nested correctly; and the consolidation's guard —
every existing browser test passes unchanged.

## Guide rows

Surface rows for every new export under the Browser tables, in each table's voice; no
narrative sections. `tests/guides.test.ts` only if a parity list there needs a row (check the
mechanism first — H-server found the methods population derived, not enumerated).

## Scope

- Owned: `src/browser/helpers.ts`, `src/browser/constants.ts`, `src/browser/types.ts` (only
  if a declaration genuinely needs it — report), `tests/src/browser/helpers.test.ts`,
  `guides/test.md` rows.
- Off-limits: `src/core/**`, `src/server/**`, `src/browser/factories.ts`, every other test
  file, `package.json`, `vite.config.ts`.
- Standing entries: the tree carries every earlier unit of this wave plus the user's
  manifest/lockfile entries — measure `git status --porcelain` first and treat everything
  present as standing.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` and
   `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` exit 0.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser`
   exits 0 — read the pre-change baseline FIRST and record it; every pre-existing proof
   passes; report totals and the delta.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.
6. The consolidation report: the per-helper before/after condition table, and confirmation
   that every Voices message still comes from the same helper.

## Output

The diff; raw output and exit code per criterion with baselines; the consolidation report;
any deviation. No process diary.

## Deviation contract

Stop on: a consolidation that cannot preserve a helper's current acceptance without
contradicting the one-`isReachable` design; parity red outside your rows; a criterion
unreachable. Naming within the fixed set, TSDoc wording, and test naming are yours: decide,
record, carry on.
