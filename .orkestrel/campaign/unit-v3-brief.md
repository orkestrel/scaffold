# Unit V3: instruments, fixtures, and parity for the version authority

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`. Ruling records, read in order:
`.orkestrel/campaign/design-versions-reconciliation.md`, `design-versions-brief-amendment2.md`
(the floor law — it supersedes the reconciliation's Q3 range form), and the landed unit
reports `unit-v1-report.md` and `unit-v2-report.md`. You perform the assignment directly
and spawn nothing.

## The work

1. **Retire the mirrors.** In `tests/src/core/constants.test.ts`: the self-pin equality
   case and the table-to-manifest sweep are tautologies under derivation — remove them.
   The TypeScript bound survives restated on the emitted range: the projected
   `blueprintToDevDependencies` TypeScript row names major 6 and `matchesRange(row, '7.0.2')`
   is false, keeping the stated compatibility reason. Keep the `ORKESTREL_RANGE_PATTERN`
   shape case for the self-pin.
2. **The named seed population.** One case asserts BY NAME the exact set of table rows
   scaffold's own manifest does not declare (the Vue family, `vite-plugin-singlefile`, the
   uninstalled app-server fleet rows) — a row silently entering or leaving the manifest
   moves this test. Negative control: a manifest-declared name (`@orkestrel/guide`) must
   not appear in the set.
3. **The range-shape instrument.** Per amendment 2: every foreign row in every shared
   table, and every foreign row in scaffold's own manifest, is a caret over a FULL triple —
   the pattern rejects bare `^6`, `~8.2.2`, a bare `8.2.2`, and a prerelease, and accepts
   `^0.64.0`. Fleet rows stay under `ORKESTREL_RANGE_PATTERN`. Name and place the pattern
   constant per the rules if V1 did not already export it.
4. **Fixture and digest.** Regenerate `tests/src/core/fixtures/setup-false-manifest.txt`
   and the byte digest in `tests/src/core/compilers.test.ts` from the run that produces
   them (the derived self-pin `^0.0.47`, the derived rows, the full-triple floors). Replace
   the self-referential assertions (`compilers.test.ts` near `:113`, `:124`, `:141`, and
   `tests/src/bin/CLI.test.ts:520`) — an assertion never compares emitted output against
   the constant that produced it; compare against literal expected values or the manifest
   read as a second mechanism.
5. **`tests/src/core/templates.test.ts`** — the showcase expectation moves to the
   full-triple seed value.
6. **The distribution census.** In `tests/distribution.test.ts`: the
   `vite-plugin-singlefile` TSDoc example verdict became prose (V1) — move its row from the
   `driven` list to `glossed`, keep the census total, and report the four list diffs
   (`driven`, `glossed`, `elided`, `undriven`), not only the total. Add the coherence case:
   the packed core's derived self-pin equals the installed package's own `package.json`
   version; negative control per the reconciliation (mutate the installed manifest copy
   without rebuilding — as a probe, removed after, with removal shown).
7. **Guide parity** (`guides/scaffold.md`): surface rows for every new public export
   (V1's range-to-major helper and `replacePlanRanges`, V2's seam option and `releases`
   evidence fields — read the barrels for the authoritative list); the verbs' registry
   behavior and offline outcomes; the floor law stated as the release procedure — before
   each scaffold release, scaffold raises its own floors online so every release ships the
   then-latest floor (the reconciliation's R6). The guides project proves parity.

## Scope

- Owned: `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`,
  `tests/src/core/templates.test.ts`, `tests/src/core/fixtures/setup-false-manifest.txt`,
  `tests/distribution.test.ts`, `tests/src/bin/CLI.test.ts` (the one self-referential
  assertion), `guides/scaffold.md`, and `tests/guides.test.ts` only if parity requires.
- Off-limits: every `src/` file — a needed source change is a deviation to report.
- Standing entries: everything `git status --porcelain` lists at your start (V1 and V2's
  diffs are standing).
- The `npm` PowerShell shim is blocked — use `npm.cmd` / `npx.cmd`. No commits, installs,
  or `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before/after.
2. Scoped format and lint on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first: the seed-population case red against a probe adding a phantom row; the
   shape instrument red against a probe admitting a bare `^6`; each green with the plant
   removed and its removal shown.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   exits 0 — the mirror and digest reds all close here.
6. `--project guides` exits 0.
7. `--project src:bin` exits 0 (the CLI.test assertion replacement holds).
8. Distribution is NOT run by you (it packs and installs; the verifier owns it) — report
   the census list diffs from reading the file, and leave the coherence case for the
   verifier's run.

## Output

The diff; raw output and exit code per criterion including the failing-first pairs and the
census list diffs; any deviation. No process diary.

## Deviation contract

Stop on: a source change needed; a red outside the named set; a criterion unreachable.
Wording within the fixed content is yours: decide, record, carry on.
