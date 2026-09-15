# Unit D4-S2 — `@orkestrel/supervisor`: relocate the package guide to the fleet's path (successor to D4-S)

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/supervisor` checkout while this unit runs.

## Why a successor

D4-S stopped before writing (`.orkestrel/campaign/D4S-supervisor-guide-deviation.md`): the guide
already exists at `guides/src/supervisor.md` (4890 lines), the pre-migration path; the top-level
`guides/*.md` set is the fresh scaffold-staged mirror set and `guides/src/*.md` a stale duplicate
of it; `tests/guides.test.ts` pins the old path in `QUOTING`; `README.md` has no blockquote pitch.
Scaffold's `catalog` fetches a package guide from `guides/<bare>.md` on `main`, so the fleet's
hosted set cannot see this guide until it moves.

**Orchestrator rulings.** (1) Move, do not rewrite: the guide's prose stays byte-for-byte except
the relative links the move invalidates. (2) The stale `guides/src/*.md` mirrors are deleted and
the empty directory removed: each is an older copy of a top-level mirror that `catalog` owns.
(3) No gate runs in this checkout: `npm ci` fails on a dependency conflict outside this unit
(`ERESOLVE`: `@orkestrel/middleware@0.0.18` wants peer `@orkestrel/server@^0.0.16`, the root
declares `^0.0.17`; receipt `.orkestrel/campaign/US0-receipt.md`), carried to the supervisor
owner. You verify links on disk; the Orchestrator verifies the relocated guide with scaffold's
own `@orkestrel/guide`.

## Objective

`guides/supervisor.md` exists at the top level with every relative link resolving from there;
`guides/README.md` points at it; `tests/guides.test.ts` quotes the new path; `README.md` carries
the guide's tagline as its blockquote pitch; `guides/src/` is gone.

## Scope

**Owned.** `guides/src/supervisor.md` (moved), `guides/supervisor.md` (the moved file),
`guides/src/*.md` (deleted), `guides/README.md`, `tests/guides.test.ts` (the `QUOTING` constant
only), `README.md` (a blockquote pitch inserted under the H1, equal to the guide's tagline).
**Off-limits.** Everything else: `src/**`, `app/**`, `tests/**` beyond the one constant,
`package.json`, `package-lock.json`, the `scaffold repair` set, the top-level `guides/*.md`
mirrors, `node_modules` (absent; do not install).

## Execution

1. Move with the shell: `mv guides/src/supervisor.md guides/supervisor.md` (never `git mv`).
2. For every relative link in the moved file (`grep -n '](\.\./' guides/supervisor.md` and
   `grep -n '](\./'`), resolve the target from the OLD location to find what it meant (the old
   file sat in `guides/src/`, so `../../tests/...` meant `<root>/tests/...` and `../src/core`
   meant `<root>/guides/src/core`, which never existed — read each one against the tree and pick
   the path that exists), then rewrite it so it resolves from `guides/`. Verify each rewritten
   target with `test -e` from `guides/` and list any that resolve to nothing in the report (do
   not invent a target; leave such a link unchanged and report it).
3. `guides/README.md`: every `src/supervisor.md` reference becomes `supervisor.md`; the concept
   and directory rows stay otherwise as they are.
4. `tests/guides.test.ts`: `QUOTING` becomes `['README.md', 'guides/supervisor.md']`.
5. `README.md`: insert, directly under the H1, a blockquote whose text equals the guide's tagline
   (the blockquote under the guide's H1), then a blank line; leave the rest.
6. Delete `guides/src/*.md` and `rmdir guides/src`; confirm `git status --porcelain` shows the
   deletions and the move (a rename shows as `D` plus `??` until staged — do not stage).
7. Report the link table: old text → new text → exists (yes/no).

## Output

Final message: `git status --porcelain`; the link table; the `QUOTING` line after the edit; the
pitch line; the count of deleted mirrors named individually; deviation state. No process diary.

## Deviation contract

Stop and report on: a link whose intended target you cannot identify from the tree (list it, do
not guess); the README H1 missing. Decide, record, carry on for whitespace and blank-line
placement.

## Acceptance criteria

1. `guides/supervisor.md` exists; `guides/src/` does not.
2. Every relative link in `guides/supervisor.md` resolves from `guides/` (`test -e`), except any
   named in the report as unresolvable from the old file too.
3. `guides/README.md` contains no `src/supervisor.md`.
4. `tests/guides.test.ts` `QUOTING` names `guides/supervisor.md`.
5. `README.md`'s blockquote equals the guide's tagline byte for byte.
6. Only owned files changed.
