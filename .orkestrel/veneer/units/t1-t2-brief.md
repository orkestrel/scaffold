# Unit T1 TEST-SCOPED and T2 TEST-FORCED-COLORS — the Orchestrator implements in the Test checkout

## Role and engine

The Orchestrator on Opus 5, writing directly in `/home/user/test` (branch `claude/inspiring-allen-t4qzv1`
at `774ba14`, the 0.0.19 release commit, clean tree) under the user's routing ruling of 2026-09-22.
Audited afterwards by `analyst` on Astra (objective) and `reviewer` on Opus (subjective, told its
engine wrote the work), plus `checker`.

## Objective

Give `@orkestrel/test/browser` the region-scoped pointer hold and Tab traversal that Veneer's oracle
drive needs (T1), and the forced-colours axis on `MediaOptions` that Veneer's Compatibility section
waits on (T2), each proved and documented, so the next Test release carries them.

## Rulings

- **Shape follows `clickAccessibleWithin`.** The scoped verbs take `(region, role, name)`: the
  region's exact accessible name, the control's exact ARIA role, and the control's accessible-name
  text matched loosely inside that region, resolved through the role engine over the region.
- **One resolver, exported.** The resolution `clickAccessibleWithin` inlines (region locator, role
  locator with hidden included, the reachability filter, the three refusals) moves to an exported
  `resolveAccessibleWithin(region, role, name): HTMLElement`; `clickAccessibleWithin` composes it and
  keeps its three refusal voices unchanged.
- **One pointer drive, exported.** The hold protocol `holdAccessible` performs after resolution
  (the held-marker refusal, the tester-scale mapping, the two protocol sends, the marker, the frame
  wait, the pressed read-back with release-on-miss) moves to an exported `holdElement(element, name)`;
  `holdAccessible` and the new `holdAccessibleWithin(region, role, name)` compose it. Its refusal
  voices stay `Pointer is already held at <x>x<y>` and `Interactive target "<name>" did not enter
  the pressed state`.
- **One traversal loop, exported.** The loop `traverseAccessible` runs (the cap off
  `FOCUSABLE_SELECTOR`, the visited set, the trail, re-resolution on every step) moves to an
  exported `traverseTo(resolve: () => HTMLElement, name: string): Promise<HTMLElement>`;
  `traverseAccessible(name)` passes `() => resolveRendered(name)` and the new
  `traverseAccessibleWithin(region, role, name)` passes `() => resolveAccessibleWithin(region, role, name)`.
  The refusal voice stays `Interactive target "<name>" is not reachable through forward Tab
  traversal: <trail>`.
- **`MediaOptions.forced?: boolean`.** `true` stages `forced-colors: active`, `false` stages
  `forced-colors: none`, omitted leaves the reading alone, exactly as `motion` does for reduced
  motion. `stageMedia` refuses an options object with every axis omitted (the existing voice), sends
  the `forced-colors` feature from the option when supplied, and reads back
  `(forced-colors: active)` or `(forced-colors: none)` the way it reads the motion query.
  `releaseMedia` already restores the forced axis from the marker and does not change.
- Every new export has a doc block whose description paragraph is its guide `Summary` cell, a
  titled or plain `@example`, `readonly` and single-word members where it declares any, and a
  row in `guides/test.md` § Surface; the `Voice` tables gain the voices the new verbs raise; the
  § Patterns prose and the fences that name `clickAccessibleWithin` and `traverseAccessible` gain
  their scoped twins where a sentence would otherwise be false.
- Insert the failing proof first for each behaviour: the scoped hold refusing a neighbour region's
  twin, the scoped traversal stopping on the region's control while a twin outside the region sits
  earlier in the tab order, and the forced axis reading back `active` and `none`.

## Scope

**Owned.** `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts`,
`guides/test.md`, `README.md` (only where the guide's tagline or a pitch sentence is compared).

**Off-limits.** `package.json`, `package-lock.json` (the release unit T3 bumps), `src/core/**`,
`src/server/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, everything under `dist/`.

**What asserts the state this change ends.** `tests/guides.test.ts` (Surface parity, examples for
every Surface function, Summary equality); the export inventory, if any, in `tests/src/browser/**`
(search bound: `grep -rn "Object.keys(" tests/src/browser` returned no barrel inventory);
`tests/src/browser/helpers.test.ts` cases for `clickAccessibleWithin`, `holdAccessible`,
`traverseAccessible`, `stageMedia`, and `releaseMedia`.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0 (host npm 10 is accepted
   here; the manifest carries no `devEngines`).
2. `npm run test:src:browser` exits 0 with the new cases present, each recorded red before its
   implementation and green after.
3. `npm run test:guides` exits 0.
4. `npm run build` and `npm test` exit 0 (observation for the whole chain; the verifier takes the
   authoritative run before the release).
5. `git status --porcelain` lists owned files only.
