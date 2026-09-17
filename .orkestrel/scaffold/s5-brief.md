# Unit S5 — close the fourth audit round

## Role and engine

`builder` — Sonnet, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer.

This unit is fully specified and taste-free. Both replacement texts are given verbatim. Do not
design anything; place what is written here, then re-run what the brief names.

## Objective

Close two findings from the fourth audit round. **This is the last unit before the change is
committed.** Do not widen it.

## The state you inherit

The working tree carries an uncommitted change across four units. The gates are green on it:
`format:check`, `lint:check`, `check`, `build`, and `npm test` all exit 0, with `src:core` at 422
and `config` at 172 passed, 1 skipped. `host.json` is unchanged after a build. Nothing is broken —
these are two honesty defects in a comment and an instrument.

## The work

### 1. The hazard census does not account for the cases it partitions

Both audit lanes found this independently.

`tests/src/core/compilers.test.ts` carries a comment block above
`describe('the generated configuration under its own hazards')`. Two of its paragraphs enumerate
which cases carry a bare-merge control and which carry none. They name seven cases between them.
The block now holds nine: `preserves non-string plugin names without selecting them` and
`preserves named structural promises without selecting them` were added and appear in neither
paragraph. A reader who trusts the partition concludes those two carry controls.

The fix is not to re-enumerate. This census has produced a finding in two consecutive rounds, each
time because a case was added and a list was not repriced, and `.claude/rules/quality.md`
§ Rounds and verdicts rules that a subject repricing itself on every edit has no closing condition
and must be recast as the property the tally stood in for.

**Replace both paragraphs** — the one beginning `// What the controls establish:` and the one
beginning `// What the controls do not establish:`, along with the blank comment line between them —
with exactly this text, preserving the leading tab-free `// ` prefix style the block already uses:

```text
// What the controls establish, and what they do not: a case that can contrast against the
// bare merge carries `mergeConfig` beside the guarded call and asserts the damage the guard
// prevents, so a guard that stopped working cannot leave both assertions passing. A case
// that cannot contrast carries no such control, because it asserts exactly the value the
// bare merge produces — there is no damage to show — and its load-bearing assertions are
// identity and order instead. Which kind a case is reads off its own body: the ones with a
// control call `mergeConfig` inside it. The two predicate cases are the exception worth
// naming, because their kind is not visible here at all — nothing in this file discriminates
// a guard that admits a non-string `name` or a structural thenable, and the red that does
// comes from mutating the predicate itself.
```

Leave every other paragraph of the block as it is. The paragraph naming which cases meet the real
vendored boundary plugins is true and was corrected last round; do not touch it.

This is a comment edit. No emitted byte moves, and no test expectation changes.

### 2. An instrument asserts itself

`tmp/units/s4-run-case.mjs` carries `assert.equal(report.numTotalTests, assertions.length)`. Both
values are derived from the same report in the same run, so they agree by construction and the
assertion cannot fail. `.claude/rules/tests.md` bars asserting an implementation against itself.

The failure it admits: if the `src:core` project silently stopped discovering a test file,
`numTotalTests` would drop, `assertions.length` would drop with it, the line would still pass, the
named case would still run and fail, and the runner would certify the red over a smaller population
than it claims. The figure that would catch it — the executed total — is printed and not asserted.
That is the same print-versus-assert defect this runner was hardened to close, one level down.

**The property to change.** Delete that line. Give the runner an expected-total parameter and assert
the report's total against it. Each caller passes the population it expects, which is `422` for
every caller today. Keep `assert.equal(executed.length, 1)` and the pending-count assertion; they
carry the rest of the property.

Callers to update: `tmp/units/s3-red-1-selection.mjs`, `tmp/units/s3-red-2-pinning.mjs`, and
`tmp/units/s4-red-predicate.mjs`.

Pinning `422` is correct rather than brittle. These are campaign instruments retained as the record
of what ran at this commit; an instrument that stops matching the suite it measured must say so.

## Re-run what you change

After item 2, run each of these and report its output verbatim:

```text
node tmp/units/s3-red-1-selection.mjs
node tmp/units/s3-red-2-pinning.mjs
node tmp/units/s4-red-predicate.mjs
node tmp/units/s4-runner-control.mjs
```

Each mutates a source file and restores it in a `finally` block. Run them **one at a time** — they
write the same files. After each one, run `git diff --name-only | wc -l` and confirm it reports `8`.
If it reports anything else, stop and report immediately: the tree did not restore.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The `npm` shim does not resolve from a spawned child on this host. The instruments spawn Vitest
  through `process.execPath` and `node_modules/vitest/vitest.mjs`. Keep that mechanism.
- Do not run the whole suite. Run `npm run test:src:core` once at the end and report its count.

## Scope

**Owned files:**

- `tests/src/core/compilers.test.ts` — the comment block only
- `tmp/units/s4-run-case.mjs`, `s3-red-1-selection.mjs`, `s3-red-2-pinning.mjs`,
  `s4-red-predicate.mjs`

**Off-limits — do not edit, for any reason:**

- `.orkestrel/` — the campaign record. The Orchestrator re-retains the instruments after you exit.
- `src/`, `configs/`, `vite.config.ts`, `tests/src/core/templates.test.ts`
- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- Everything under `dist/`; `package.json`, `host.json`, `guides/`, `ROADMAP.md`

**Do not bump a version, and do not publish.** Do not commit or push. Do not install anything. Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. The two paragraphs are replaced with the given text, and no other paragraph of the block changed.
2. `tmp/units/s4-run-case.mjs` carries no assertion comparing two values derived from the same
   report, and asserts the total against a caller-supplied expectation.
3. All three callers pass their expected total.
4. Each named instrument re-runs, and its output is reported verbatim.
5. The tree reports 8 modified files after every instrument run.
6. `npm run format:check` and `npm run lint:check` are clean.
7. `npm run test:src:core` passes, with its count reported.
8. `git diff --name-only` names exactly the eight files it named before this unit — no new file is
   modified, because item 1 edits a file already in that set and item 2 edits untracked scratch.

## Deviation contract

A conflict stops you: report expected, found, exact evidence, done or not done. Do not edit a
vendored file or anything under `.orkestrel/`. Do not change a test assertion. Do not reword the
supplied comment text.

## Output

Write your report to `tmp/units/s5-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The comment** — the block as it now reads, quoted.
3. **The runner** — what it asserts now.
4. **The re-runs** — each instrument's verbatim output, and the tree count after each.
5. **What you did not close**, and why.

No process diary.
