# Unit W3 — close the four audit findings against the generated proof

## Role and engine

`implementer`, Opus 5, in a clean context. You did not write the code you are fixing.

## Objective

Close four findings an adversarial audit raised against commit `4f3aa61`. Each is verified by the
Orchestrator against the committed source, so none is in dispute. Fix exactly these and nothing
else.

## Context

Read first-hand before editing: `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/tests.md`,
`.claude/rules/typescript.md`, and `.claude/rules/writing.md`; and
`.orkestrel/campaign/audit-w2-verdict.md`, which records the audit this unit answers.

The subject is the generated distribution proof, held as a template in `src/core/templates.ts`, and
its emission in `src/core/compilers.ts`. Text you change in the template ships into **every
publishing workspace in the fleet**, so a naming or teardown defect there is not local to this
repository.

Host environment: Linux, Node v22.22.2, network reachable, Playwright Chromium present but its
pinned path absent — the ladder in a generated `configs/browsers.ts` resolves the alias at
`/opt/pw-browsers/chromium`. The working tree is clean and you are the sole writer.

## The four findings

**F1 — a TSDoc prose line exceeds the formatter's width.** `src/core/compilers.ts:278` is 138
characters. The repository sets `printWidth: 100`, and oxfmt does not reflow comments, so
`format:check` cannot see it. Rewrap that paragraph. Change no wording; only the line breaks.

Verify with `awk 'length>100 && /^ \* [A-Za-z]/ {print FNR}' src/core/compilers.ts`. Before W2 that
returned only two lines, both `@example` import statements that cannot be broken. It must return
only those two again.

**F2 — a boolean is named for the negation of its value.** `src/core/templates.ts:1391` declares
`const STAGED = STAGE === undefined`, so `STAGED` is true when the stage is **absent**, and
`it.skipIf(STAGED)` reads "skip if staged" while meaning the opposite. `.claude/rules/names.md`
requires a boolean to read as an assertion. The behaviour is correct and must not change; only the
name and the call sites do. Settle the exact form yourself against that rule — the binding property
is that the identifier is true when the stage exists.

**F3 — the scratch directory leaks when staging fails.** `afterAll` registers at
`src/core/templates.ts:1398`, after the module-scope release throw at `:1387` and the `buildStage()`
call at `:1390`. When either throws, the teardown never registers and `SCRATCH` survives the run.
The audit demonstrated this: leaked `/tmp/distribution-*` trees accumulate, each holding the npm
cache the run created, and on the `buildStage()` failure path also the packed tarball and the
installed consumer. Register the teardown before anything that can throw.

**F4 — three registry-dependent tests skip without citing their mechanism.** Of the tests gated on
the stage, only the first carries `[requires the registry]` in its title; the rest skip silently.
The browser branch does this correctly — it passes its cause into `context.skip`, so the reader sees
why. `.claude/rules/tests.md` requires a conditional skip to cite its mechanism. Bring the
registry-gated skips up to the browser branch's standard.

## Unknowns

Whether `tests/src/core/templates.test.ts` pins the generated proof's line total. It records
`'tests/distribution.test.ts': 112` in `MODULE_EMITTERS`. If your edits move that number, update it
and say so; if the entry means something other than a line total, say what it means.

## Scope

**Owned:** `src/core/compilers.ts`, `src/core/templates.ts`, and the focused tests that pin them —
`tests/src/core/templates.test.ts`, `tests/src/core/compilers.test.ts`,
`tests/src/core/Compiler.test.ts`.

**Off-limits:** `guides/` — a later unit owns the guide drift and it is not yours. This repository's
own `tests/distribution.test.ts`. `tests/config.test.ts`, `tests/policy.test.ts`,
`tests/setupPolicy.ts`, and `host.json`. `vite.config.ts`, `package.json`, `src/bin/`, `src/server/`,
and everything under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it: expected, found, exact evidence, done or
not done, and at most one short hypothesis. A subordinate detail — a chosen identifier, a comment's
wording, where a rewrapped line breaks — is yours to settle, record, and carry on from.

Fix only these four findings. If you notice something else wrong, record it in your report against
the file and line; do not fix it.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `awk 'length>100 && /^ \* [A-Za-z]/ {print FNR}' src/core/compilers.ts` prints only the two
   `@example` import lines. Paste the command and its output.
5. The staging boolean is true when the stage exists. Paste its declaration and every call site.
6. In the generated template, the teardown registration precedes both the release throw and the
   `buildStage()` call. Paste the ordered lines.
7. Every stage-gated test cites its mechanism when it skips. Paste the skip output of a run with an
   unreachable registry, showing each skipped test naming a reason.
8. `npm run test:src:core` and `npm run test:src:bin` exit 0.
9. **Executed, not asserted.** Materialize a workspace outside this repository, run the generated
   proof to a pass, then force the release-mode registry failure and show that **no new**
   `/tmp/distribution-*` directory survives the run. Count before and after. That count is F3's
   proof and a description of it is not.
10. `npm run build` exits 0, then `npm test` exits 0. Report per-project counts.

## Review evidence

Return the actual `git diff` of both source files and the actual `git status --short`.

## Output

Return, with no process diary: the diff; one line per acceptance criterion with its exit code or
evidence; the criterion 9 before-and-after counts; the unknown answered; and anything you could not
close, named.
