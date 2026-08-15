# U4 — the Runs rail and the demoted door

## Role and engine

`implementer`, engine **Opus 5** (subjective unit: rail composition, row treatment, copy,
demotion). Sole serial writer in `/workspace/supervisor` from the committed checkpoint the
dispatch names (after U3's fix round). Perform directly, spawn nothing, no commits/pushes/installs.

## Authority

`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` rulings are settled: complete-snapshot
rich entries `{id, status, paused, created, updated}`; append-bottom acquisition order, no queue;
ended runs decay in place, never vanish; open run's row pinned while open, selection survives the
run ending; no auto-open, no auto-scroll, no reorder under the user; **no waiting indicator**
(the field was priced and dropped); dedicated visible `role="status"` line, the list carries no
aria-live; the typed-id door is **never primary anywhere, not even the empty state** (owner
ruling); no polling — partial/error offer keyboard-reachable Retry. The enterprise-bootstrap
skill's five-states and accessibility law binds. U2's landed contract is authoritative: read
`app/browser/types.ts` (`RosterManagerInterface`) before designing.

## What this unit builds

- **`RunList.vue`** (new, `app/browser/components/`): the rail's list. Rows = the union of
  `roster.snapshot.runs` and `roster.departed`, ordered by `created` ascending (acquisition
  order; the merge is derivation, never a second store). Live rows show the collapsed
  status/paused presentation (reuse the repo's existing tone mapping where semantics match; do
  not invent a parallel one). Departed rows decay in place: visibly quieter, presenting their
  LAST-SEEN state — the entry carries the last live status, not a terminal one, so the copy must
  not claim completion (the terminal fact arrives with History). The open run's row is marked
  and pinned in place while open. Rows are real buttons/links: keyboard-operable, visible focus,
  click opens through the ordinary operator path — an id is never typed or recalled. Beneath or
  beside the list, one visible `role="status"` line carries the coalesced roster fact (count and
  liveness transitions); the list itself has no live region.
- **`RunItem.vue`** (new) only if the row earns its own component under the repo's component
  rules; folding the row into `RunList.vue` is equally acceptable — your call, recorded.
- **Five states** in `RunList.vue` from the manager's independent facts alone: loading (no
  snapshot, live), ideal (snapshot with rows), empty (snapshot, zero rows and zero departed —
  the rail's own message; do NOT surface the typed-id door here), partial (fault with retained
  snapshot: rows stay, inline non-blocking notice + Retry wired to `retry()`), error (fault, no
  snapshot: alert + Retry). No timer anywhere; Retry is the only recovery.
- **`OpenPanel.vue` demotion**: the typed-id form becomes a collapsed disclosure (Bootstrap
  collapse, closed by default, plain summary control — "Open by id" with help text "For a run
  that has already ended."). Never primary, never auto-opened. Its internals (validation,
  refusal copy) stay as they are — demotion, not redesign. Flag in the report any assertion in
  existing tests that binds the old prominence.
- **`CommandBar.vue`**: if the old roster affordance there duplicates what the rail now owns,
  make the smallest consistent move and flag it; otherwise leave it.

## Scope

**Owned:** `app/browser/components/RunList.vue` (new), optionally `RunItem.vue` (new),
`app/browser/components/OpenPanel.vue`, `app/browser/components/CommandBar.vue` (smallest move
only), mirrored component tests (`tests/app/browser/components/RunList.test.ts` new, existing
`OpenPanel.test.ts`/`CommandBar.test.ts`), and `app/browser/index.ts` if a barrel row is owed.

**Off-limits:** `ApplicationView.vue` (U5 composes the rail into the shell — your components
must mount standalone in tests without it), `app/browser/controllers/**`, `stores/**`,
`services/**`, `app/browser/types.ts` (consume, don't extend — if a criterion genuinely needs a
type change, stop and report), `app/core/**`, `app/server/**`, `src/**`, vendored files,
`package.json`, `configs/**`, `guides/**`.

Forbidden: `any`, `as`, `!`, `@ts-` comments, `eslint-disable`, mocks/fakes/spies/fake clocks,
new dependencies, `style` attributes, `<style>` blocks, invented utility classes, timers,
polling, aria-live on the list.

## Acceptance criteria

1. A published snapshot renders rows in acquisition order; a second snapshot adding a run appends
   it without reordering existing rows — proved with the real Operator + the shared scriptable
   roster fixture.
2. A run leaving the snapshot decays in place: same position (by `created`), quieter treatment,
   last-seen state, still openable-looking selection semantics preserved for the open run —
   proved.
3. The five states render from manager facts alone, each proved; Retry invokes the manager's
   retry seam exactly once per activation; no state shows the typed-id door.
4. The `role="status"` line announces the coalesced fact and updates on transitions; the list
   carries no aria-live — proved via the accessibility tree.
5. OpenPanel renders collapsed by default with the ruled help text; expanding and using it still
   works (existing behavior intact) — proved; no surface makes it primary.
6. Keyboard: rows reachable and activatable by keyboard, visible focus — proved in the component
   test's accessibility assertions.
7. Converge lint then format scoped to your files; static gates green; the Orchestrator runs the
   full chain as acceptance. Expected red: guides parity only (new exports/components — report
   the exact set).

## Deviation contract

A criterion needing an off-limits file stops the unit with the exact gap. Ancillary composition
choices (row markup, one component vs two, status-line placement) are yours, recorded. Pixel
proof is deferred to U5's composition and the U8 capture round — your proofs here are DOM and
accessibility-tree level. The standing human-interaction-journey instruction (REDESIGN.md) lands
for the rail at U5, once your components are composed into the shell: click-a-row-to-open and
Tab/Enter keyboard-open through the real server; design your components so that journey needs no
special hooks.

## Output

Touched files + diffstat; full `RunList.vue`; `git status --porcelain`; per-criterion proof
pointers; your recorded calls (one component or two, status-line copy, decayed-row copy);
deviations or none.
