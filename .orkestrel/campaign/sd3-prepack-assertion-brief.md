# Unit SD3 — scaffold: vendored prepack assertion + guide line

Role: sol implementer. Engine: GPT-5.6 Sol. You perform this unit directly and spawn nothing.
Read `/home/user/scaffold/AGENTS.md` and `.claude/rules/tests.md` before editing.

## Objective

In `/home/user/scaffold` (baseline: the head commit when you start — read
`git log --oneline -1`), land ruling 3 from
`/home/user/scaffold/.orkestrel/campaign/d2d-reconciliation.md` (read it first). SD2 (the
emitted `prepack` literal and the repair refresh) is already on the head you start from, and the
SD6 census (`.orkestrel/campaign/plan.md`, the SD6 entry) reported 29 publishing targets missing
`prepack` — the release note pairing SD2+SD3 in one release is recorded; your unit only lands
the assertion here.

1. **The vendored assertion.** In `tests/config.test.ts` (scaffold's master copy of the vendored
   fleet test), add a sibling test named for packing that asserts
   `expect(prepack).toBe(publishes ? 'npm run build' : undefined)` — read the file's existing
   inline throwing-control idiom first and use exactly that idiom for the control. `publishes`
   is however the file already derives it (read the sibling tests; do not invent a second
   derivation).
2. **The self-referential pin becomes the literal.** `tests/src/core/compilers.test.ts` carries
   `toBe(published.build)` near line 443 (re-locate by fragment); it becomes the literal
   `toBe('npm run build')` per the ruling — the self-reference hid drift.
3. **The guide line.** `guides/scaffold.md` near lines 1188-1192 describes the packing script;
   make the sentence state the emitted delegation (`prepack` runs `npm run build`; publishing
   workspaces only) — read the surrounding passage and keep its voice. One sentence-level edit,
   not a rewrite.
4. **Carried from SD4 (ruling 4's runtime pin).** The zero-parameter factory seal closed the
   compile-time door, but a JavaScript caller can still reach a project row with
   `Reflect.apply(row, undefined, [env])` — the ruling's "sentinel-env invocation test asserting
   env fields do not enter the returned config" belongs in the vendored root-configuration proof.
   Add it to `tests/config.test.ts` beside the factory-lookup rows: invoke each project-row
   factory through `Reflect.apply` with a sentinel record and assert no sentinel field appears in
   the returned configuration. Use the file's existing iteration and control idioms.
5. **The digest half.** `tests/config.test.ts` and `guides/scaffold.md` are `dist/host` surface:
   run `npm run build:inventory` last and leave the regenerated `host.json` in the tree.

## TTTDD

Red-first for the assertion: scaffold's own manifest declares `prepack: 'npm run build'` and
publishes, so the new test must pass here — the red is the CONTROL: plant a wrong prepack in the
test's fixture-manifest idiom (or run the test body against a mutated copy per the file's
control idiom), record the failure, restore, record green. Record commands and counts.

## Environment and limits

Run from `/home/user/scaffold`; `node_modules` installed. The sandbox denies network, git index
writes, and child spawns — `npm run test:config` spawns Vitest; if the scoped run is denied,
record the exact command as a host observation with the reason, and validate with
`npm run check` scopes that do not spawn. No commits.

## Scope

- Owned: `tests/config.test.ts`, `tests/src/core/compilers.test.ts`, `guides/scaffold.md` (the
  one passage), `host.json` (through `npm run build:inventory` only).
- Off-limits: `src/**`, `tests/src/core/templates.test.ts`, everything else.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on owned test files.
2. `npm run check:src:core` green (the edited tests compile).
3. The control recorded failing then green; `npm run test:config` green (or recorded as a host
   observation if spawn-denied).
4. `npm run build:inventory` run last; `host.json` regenerated.

## Deviation contract

Stop and report on: a conflict with the primary objective, the guide passage not matching the
ruling's description, or an off-limits file the change makes false. Ancillary wording is yours.

## Output

Final message = report: the new test's name and idiom, the control's red record, the guide
sentence before/after, gate tails, `git diff --stat`, `git status --porcelain`, deviations or
none.
