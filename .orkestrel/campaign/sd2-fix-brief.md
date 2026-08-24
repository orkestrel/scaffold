# Unit SD2-FIX — repair must append, not block, the writable scripts

Role: sol implementer. Engine: GPT-5.6 Sol. You perform this unit directly and spawn nothing.

## The falsifying run (a real target, scaffold packed from 1b39fa0, installed as a tarball)

`npx scaffold repair` in an html-shaped target with `test:probe`, `test:bench`, and `prepack`
absent exited nonzero with:

```
TARGET: The manifest at . does not declare planned scripts: test:probe, test:bench, prepack.
The manifest group is blocked. Add these exact script lines to package.json: ... Add the
scripts before selecting manifest, or exclude manifest from --groups.
```

No file was written. The reconciliation (ruling 6, `.orkestrel/campaign/d2d-reconciliation.md`)
and your prior unit's fixture pin both say repair APPENDS the absent writable scripts. The real
CLI's writing path evidently gates the manifest group on the scripts question BEFORE the region
writer runs, so the fixture pinned a mechanism the verb never reaches.

## Objective

In `/home/user/scaffold` (baseline: the head commit when you start — read `git log --oneline -1`):

1. Find why the writing path blocks: trace the real `repair` flow from `src/bin/CLI.ts` through
   group gating to `replaceManifestScripts`, and name the gate that fired.
2. Make the writing verbs (`repair`, and `overwrite` through it) APPEND the absent writable
   scripts instead of blocking on their absence. The scripts question stays for `audit`
   (non-blocking, reporting). A DIFFERING (customized) writable script still refuses the region
   and still reports — only ABSENT scripts are writable-by-append, exactly as the ruling states.
3. Re-pin with a test that drives THE REAL VERB: the html-shaped fixture invoking the CLI's
   actual repair entry (the same door `npx scaffold repair` reaches — the existing CLI test
   idioms invoke the run/dispatch function with argv; use the deepest entry the suite already
   uses for other repair tests), asserting the appended scripts, the byte-for-byte survival of
   the custom script and key order, and a clean second audit. Record the red first (the current
   code blocks — the exact refusal above).
4. Keep every SD2 pin green; where one pinned the wrong behavior (a repair path that blocks on
   absence), flip it and name it in the report.
5. Close the standing root-check red your own file carries: `npm run check` fails on four
   TS7053 errors in `tests/src/bin/CLI.test.ts` (near lines 1745-1746 and 1826-1827 — indexing
   a fixture scripts record typed `{ deploy: string }` or `{ 'test:config': string }` with
   `'test:probe'`/`'test:bench'`). These arrived with SD2 and were measured present at baseline
   1b39fa0 (they are not another unit's). Fix the cause (type the fixture record to admit the
   keys the test reads, or read through a form the type admits) — never with an assertion or a
   suppression.

## Environment and limits

Run from `/home/user/scaffold`; `node_modules` installed; sandbox denies network, git index
writes, and child spawns (record spawn-denied suite commands as host observations; scoped runs
that avoid spawning pass). Owned: `src/bin/CLI.ts`, `src/core/compilers.ts` (if the gate lives
there), `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`, `guides/scaffold.md`
(only if a sentence states the blocking behavior), `host.json` (regenerate with
`npm run build:inventory` if the guide moves). Off-limits: `src/core/templates.ts`,
`tests/config.test.ts`, everything else. No commits.

## Acceptance criteria (cheap-first)

1. The gate is named; the append lands; scoped oxfmt/oxlint clean.
2. `npm run check:src:core` and `check:src:bin` green, and `npm run check`'s root `tsc` step no
   longer reports the four TS7053 errors (run `npx tsc --noEmit` and read it bare).
3. The real-verb pin recorded red then green; SD2's pins reconciled with flips named.

## Output

Final message = report: the gate found (file:line), the fix (file:line), red/green records,
flipped pins with reasons, gate tails, `git diff --stat`, `git status --porcelain`, deviations
or none.
