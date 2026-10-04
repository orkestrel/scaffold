# Unit flip-sheet-3 — finish the fold after the scoped-witness ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit U2b exactly as `/home/user/scaffold/tmp/codex/flip-sheet-2-brief.md` specifies (read it first, including its appended rulings), starting from the partial tree the first run left uncommitted, under the ruling in § The scoped-witness ruling. The first run's report is `/home/user/scaffold/tmp/codex/flip-sheet-2-last.md`: read it for what is done, what is pending, and the measured values. Every section of the original brief binds here except where this brief says otherwise.

## State at launch

`git status --porcelain` reads ten modified tracked files, all U2b's: the Sass (`src/bootstrap/_mixins.scss`, `_reset.scss`, `_tokens.scss`, `src/tailwindcss/_tokens.scss`) with the `$scoped` map and the `scope` mixin emitting `:where(.ROOT) TAG` copies after the restore rows; the guide table with 30 reboot, 10 restore, and 6 scoped rows; `tests/setup.ts` and `.test.ts` (`readCuration` with the `scoped` form); `tests/setupStyles.ts` and `.test.ts`; `tests/src/tailwindcss/index.test.ts` (the derivation proof passes with 73 originals, 72 curated copies, 7 scoped copies; the witness case fails on the `:where(.table) tr` removal control). Done: `build:src:bootstrap` with the unchanged digest `7932f7a5…`; the drop-in digest `214ee522…` unchanged; `build:src:tailwindcss` (digest `22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43` before the witness fix); the scratch border-width readings (0px on every side for `a.card-link`, `svg.bi`, `input.btn-check`, `input.form-range` under Bootstrap alone and under preflight plus the tuned sheet). Not done: the precedence case, the writers, the recipe-based border-width reading, formatting, every other gate.

## The scoped-witness ruling

The first run stopped because the prescribed `tr` witness (`<tr class="table-primary">`) reads the variant color under Bootstrap alone, under the recipe, and under the recipe with `:where(.table) tr` removed: the variant rule at (0,1,0) outranks the scoped copy at (0,0,1) in every composition, which is the equality the row must prove, and leaves the removal control nothing to expose.

Rulings:

1. **A witness carries every element its selector matches, and the case reads them all.** For every row, the witness case reads `querySelectorAll(selector)` in the witness markup (the class selector `.NAME` for a reboot row, the row's selector for a restore or scoped row), reads the row's longhands on each matched element in document order, and compares the arrays: equality against Bootstrap alone over every matched element; the removal control differs on at least one. A witness that matches no element is a malformed row (`readCuration` need not check it; the case fails with the row named).
2. **Scoped witnesses carry a plain case and a hazard case.** `:where(.table) tr`: a `.table` with a plain `tr` and a `tr.table-primary`, each with a cell; `:where(.table) tbody`: a `.table` with a plain `tbody` and a `tbody.table-group-divider`; `:where(.table) td` and `th`: a `.table` with a plain row's cells and a `tr.table-primary`'s cells; `:where(.table) thead` and `tfoot`: plain markup. The plain element exposes the removal (Bootstrap alone reads the inherited `var(--bs-table-border-color)`, the recipe equals it, the recipe without the scoped rule reads preflight's `currentColor` border); the hazard element proves the component rule still wins. The Longhands cell of `tbody` adds `border-top-width` so the divider's width is read too; the other scoped rows keep the four border colors.
3. **Reboot and restore witnesses** stay as written where they match one element; where a witness holds two elements of the class (none today), ruling 1 reads both.
4. **The border widths under the compiled recipe** are read in the witness case itself (or a sibling case in the same file) for `a.card-link`, `svg.bi`, `input.btn-check`, and `input.form-range`: every side `0px` under Bootstrap alone and under the recipe; report the readings. A nonzero width is a stop.

## Scope deltas against the original brief

None beyond § The scoped-witness ruling. The precedence case (original brief ruling 7), the writers run twice with the record digests reported, and every acceptance gate stand as written.

## Acceptance criteria

The original brief's criteria, bare, in order, each with its exit in the report: `build:src:bootstrap` (digest `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`); `build:src:tailwindcss` (digest reported) then the U3 writers twice (`npx vitest run --config tmp/units/flip-records/vite.writers.config.ts`; both record digests reported, equal after both runs, `git status --porcelain` equal); `check:src:bootstrap`; `check:src:tailwindcss`; `check`; `lint:check`; `format:check` (format only owned files first); `test:src:bootstrap`; `test:src:tailwindcss`; `test:setup`; `test:setup:browser` (the one U6-owned title `reads every Tailwind reading the caption claims under both stylesheet sets` is a known failure; any other failure is reported); the conformance describe `Tailwind compatibility recipe` by `-t`; `test:integration` as an observation with every failing title; `git diff --check`.

## Return shape

As the original brief, plus: the per-row element counts the witness case reads, the plain and hazard readings for each scoped row, the border widths of ruling 4, the measured copy counts (73, 72, 7 or as measured), the precedence case's measured pairs, and both record digests. Nothing committed.

## Deviation contract

As the original brief, with ruling 1 and 2 replacing the first run's stop.
