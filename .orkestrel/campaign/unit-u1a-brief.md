# Unit U1-A: emit and pin `prepack`

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

Design round 3 (S1, user-decided): every publishing blueprint's script table gains
`"prepack": "npm run build"` so `npm pack` cannot ship a stale `dist`. Land the compiler emit,
its pins, the rule-table row, and this repository's own manifest key.

## Context

Authority in this checkout: `AGENTS.md`; `.claude/rules/typescript.md`,
`.claude/rules/tests.md`, `.claude/rules/workspace.md` (you edit its script-intent table —
follow its own row idiom), `.claude/rules/writing.md`. Guide `guides/scaffold.md` read-only.

Ground (verified 2026-08-21): `blueprintToScripts` is `src/core/compilers.ts:287-422`; it
emits `prepublishOnly` only inside `if (publishes)` at `:415-420`; `build` is composed near
`:372-376`. Compiler tests pin `prepublishOnly` membership and absence at
`tests/src/core/compilers.test.ts:185-231` and siblings. The script-intent table is
`.claude/rules/workspace.md:213-232` and has no `prepack` row. This repository's own
`package.json` `scripts` lacks `prepack`; its `build` is
`npm run clean && npm run build:src && npm run build:host`.

## The design, fixed by the reconciled round (design3-reconciliation.md S1)

1. In `blueprintToScripts`, inside the existing `if (publishes)` block, assign
   `scripts.prepack` to THE SAME VALUE the function assigned to `scripts.build` — by identity
   from the composed value, not by a second literal, so the two cannot drift.
2. Compiler tests: for a publishing blueprint, `scripts.prepack === scripts.build`; for a
   non-publishing blueprint, `scripts.prepack === undefined` (mirror how `prepublishOnly`
   absence is pinned); and neither `scripts.test` nor `scripts.prepublishOnly` contains the
   string `prepack`.
3. `.claude/rules/workspace.md` script-intent table gains, directly after the
   `prepublishOnly` row:
   `| `prepack` | Publishing workspaces only: rebuild `dist/` so a pack ships current output |`
4. This repository's own `package.json` gains `"prepack": "npm run build"` in `scripts`,
   placed beside `prepublishOnly`.

## Standing conditions, all expected, none a deviation

`git status --porcelain` currently shows: ` M ROADMAP.md`, ` M package-lock.json`,
` M package.json`, ` M tests/setupServer.ts`, ` M tests/src/server/WriteTransaction.test.ts`,
`?? .orkestrel/`. The `package.json`/`package-lock.json` entries are a tarball-installed
`@orkestrel/test` (`file:` reference) — your `prepack` line lands ON TOP of that modified
`package.json`; do not touch its dependency entries or the lockfile. Every other standing
entry is campaign state — leave it.

## Scope

- Owned: `src/core/compilers.ts`, `tests/src/core/compilers.test.ts`,
  `.claude/rules/workspace.md`, and in `package.json` the one `scripts.prepack` line.
- Off-limits: everything else, including `guides/scaffold.md`, `ROADMAP.md`,
  `tests/setupServer.ts`, `.orkestrel/**`, `tests/config.test.ts` (the vendored-gate half is a
  deliberately deferred separate unit).
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`; restore any temporary edit by rewriting
  text and prove with `git diff`. The sandbox denies network and mounts `.git` read-only. Use
  `npx.cmd` — plain `npx` is refused by PowerShell policy here.

## Execution

Perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries (the
   `package.json` entry already stands; your line rides it).
2. `npx.cmd oxfmt --config .oxfmtrc.json --check src/core/compilers.ts tests/src/core/compilers.test.ts`
   exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/core/compilers.ts tests/src/core/compilers.test.ts`
   exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. Failing-first: run the new compiler assertions BEFORE the emit change and record the red;
   then green after.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/compilers.test.ts`
   exits 0; every pre-existing case passes; report totals.
7. `node -p "JSON.parse(require('node:fs').readFileSync('package.json','utf8')).scripts.prepack"`
   prints `npm run build`.

## Output

The complete diff; raw output and exit code per criterion including the failing-first pair; any
deviation decisions. No process diary.

## Deviation contract

Stop on a conflict with the primary objective — the emit site not matching, a criterion
unreachable, the rule-table edit contradicting `.claude/rules/workspace.md`'s own idiom.
Test naming and placement within the files are yours: decide, record, carry on.

## Amendment 1, 2026-08-21, after the first launch stopped at criterion 6

The stop was correct: the emit change makes two golden pins false, and the brief owned only one
of their homes. The grant widens:

- `tests/src/core/fixtures/setup-false-manifest.txt` is now OWNED. Update it so the compiled
   manifest it pins carries the `prepack` line the compiler now emits. Its diff must be exactly
   that line — prove it with `git diff -- tests/src/core/fixtures/setup-false-manifest.txt`
   showing one insertion.
- The byte-stable digest pin inside `tests/src/core/compilers.test.ts` (the
   `keeps a generated source workspace manifest byte-stable` case) is re-derived from the run:
   update the expected digest to the value the changed emit actually produces, and state in your
   report that the ONLY manifest change feeding it is the `prepack` line (the fixture diff is
   that statement's evidence).

Your first run's work is in the working tree — keep it, complete the two golden updates, and
re-run criteria 2-7 from the top. Criterion 6 then requires the full scoped compiler suite
green. Everything else in the brief is unchanged.
