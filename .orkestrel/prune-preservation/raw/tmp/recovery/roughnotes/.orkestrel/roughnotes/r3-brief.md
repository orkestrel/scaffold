# Unit R3 — close the port's second audit round

## Role and engine

`implementer` — Opus 5, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer. The working tree carries units R1
and R2 uncommitted; it is dirty by design and the gates are green on it.

## Objective

Close the second audit round. The objective lane rejected, the subjective lane accepted, and they
converge on the same two defects. **This is the last unit on this subject.** When these close and
the gates are green, the change is committed.

## Authority — read before acting, in this order

1. `AGENTS.md`, then `tmp/authority/rules/tests.md`, `rules/typescript.md`,
   `rules/quality.md` § Instruments, `rules/writing.md`, `rules/names.md`.
2. `.orkestrel/roughnotes/r2-audit-objective-report.md` and
   `.orkestrel/roughnotes/r2-audit-subjective-report.md` — the findings in the auditors' words.
   Both exist. Read them before editing.
3. `.orkestrel/roughnotes/r2-report.md` — what the previous unit did and why.

## The work

### 1. The `@returns` line does not determine the result

**Both lanes, converging.** The objective lane refuted it by construction: the sentence permits
`[original, replacement]` as readily as `[replacement, repeated]`, because nothing in it says which
matching base position takes the override entry. It built a reverse-traversal implementation that
satisfies every clause and returns the other answer. The subjective lane reached the same gap and
called it implicit: a reader has no rule telling them to allocate in reading order.

The line is true. It is underdetermined, which fails the criterion it was written for.

**The property to change.** State the allocation: base positions are visited in order, and each
named position takes the earliest override entry that no earlier position took. The implementation
already does this — `findIndex` over the candidates with `taken` excluded, walked base-first.

Check your sentence by construction, not by reading: name an implementation that satisfies every
clause and returns something other than `[replacement, repeated]`. If you can, the sentence is still
underdetermined.

**Do not rewrite the whole block.** The subjective lane priced a fourth full rewrite of this line as
the wrong move and proposed the vocabulary reconciliation be carried upstream instead. Add the
allocation rule; leave the rest.

### 2. The setup module's exports have no proof of their own

**Objective lane, and the subjective lane's referrals.** Three helpers moved into `tests/setup.ts`
and nothing binds their behaviour. The objective lane demonstrated it with surviving mutations:
widening `readPlugins`'s guard to accept an empty array leaves every conformance assertion passing,
and reversing `selectByName`'s returned order leaves every conformance assertion passing.

The previous unit could not close this because adding `tests/setup.test.ts` forces a `setup` project
registration, and its brief placed `vite.config.ts`'s factory list off limits. **That restriction is
lifted for this unit.** It was a scope conflict, not a reason the work was complete.

**The property to change.** Add `tests/setup.test.ts`, register the `setup` project, and add its
script, following exactly the shape the `conformance` project already uses in this workspace. Prove
each export at the behaviours the mutations reached:

- `readPlugins` throws when the configuration carries no plugins, with the message it declares;
- `selectByName` retains the last entry per name **at the first insertion's position** — asserted
  positively, not only as a negation;
- `createNamedEntry` returns an entry the caller can compare by reference.

**Each proof owes a red.** Mutate the export, run the named case, restore. Retain each mutation as a
script under `tmp/units/`.

### 3. A legitimate override carrying `mode` is unproven

**Subjective lane referral.** Every case feeds the discriminant both keys or `command` alone. A
discriminant keyed on `mode` alone would refuse a legitimate override and pass every assertion in
the file.

**The property to change.** Add the case: `mergeOverride(appBrowser(), { mode: 'development', base:
'/conformance-mode-only/' })` must merge, and the override's value must reach the result. Give it a
control that fails — the `mode`-alone rival refuses it.

**The red.** Mutate the discriminant to `'mode' in override` and show this case red.

### 4. The exported helpers lack complete documentation

**Objective lane, P3.** The three exports in `tests/setup.ts` carry summaries and no parameter or
return documentation. `.claude/rules/typescript.md` requires a complete block for a public export.

### 5. Prose defects the lanes named, with their wording supplied

Each is small, each moves no line count, and each has its replacement given.

- **`tests/conformance.test.ts` uses `above` in two comments.** `.claude/rules/writing.md` bans it in
  developer prose, and no instrument catches it because the policy table carries no row for it.
  Replace "the readings above fail against it" with "the readings earlier fail against it", and
  "both readings above fail" with "the position reading and the count fail" — which also closes an
  unnamed `both` tally.
- **"the reader" names a component with the word that means the human audience.** In the nested
  case's comment, write `readPluginNames` instead of "the reader".
- **The control comment's closing sentence carries two nested clauses.** Replace it with: "The
  subject's merged reading must differ from what the rival returns."
- **The helper split has no in-file reason.** Add one comment above `createPluginOverride` stating
  that it stays local because `tests/setup.ts` is host-independent and carries no Vue.

### 6. The body-comparison instrument's control uses the wrong operands

**Subjective lane, F4.** `tmp/units/r2-compare-bodies.py` compares its altered text against the
local extract, while the claim rests on committed against local. The control exercises the operator
but not the comparison it certifies.

**The property to change.** Move the control inside the revision loop and compare the altered text
against the committed extract, so the control uses the same operands, the same extraction on both
sides, and the same git read the claim depends on. Re-run it and report.

## What is settled and must not be reopened

- The ported `mergeOverride` and `isNamedPlugin` bodies. Byte-identical to scaffold's committed
  copies, confirmed by both lanes twice. **No body byte moves.** If a fix would move one, stop.
- The discriminant control's construction, the removed assertion in its isolation script, the
  helper placement, `selectByName`'s name and its `Map<unknown, Plugin>` key, the nested case's
  coverage statement, and the `tests/config.test.ts` sentence. Every one was confirmed.
- The `@returns` and `@remarks` vocabulary duplication — `replace`/`took` for one event. Recorded
  for the upstream carry-back, where `@remarks` can move too. Not yours.
- The pre-existing local helpers `readField`, `readPluginNames`, `countPlugin`, and
  `readOutputDirectory`. Their migration is a successor; item 5's comment names the end state.

## Unknowns

- Whether registering a `setup` project needs anything beyond the factory, the `projects` entry, and
  the script. Read how `conformance` was registered in this workspace and follow it exactly. If the
  vendored `tests/config.test.ts` asserts anything further about a `setup` project, say so.
- Where `setup` belongs in the `npm test` chain. Rule on it and record the reason.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- The `npm` shim does not resolve from a spawned child. Spawn Vitest through
  `node node_modules/vitest/vitest.mjs`.
- The retained instruments are Python, and Python 3.14.7 resolves here.
- `tests/setup.ts` is shared with the browser and journey projects. Its `vite` imports must stay
  type-only; a value import would pull Vite's Node entry into a browser suite.
- Bootstrap's Sass deprecations are silenced. A `deprecat` line in a build or test run is a
  regression; there are none.
- The built CSS asset is 323.24 kB and must stay there.

## Scope

**Owned files:**

- `vite.config.ts` — the `@returns` line, and the `setup` factory plus its `projects` entry
- `tests/conformance.test.ts`
- `tests/setup.ts`
- New `tests/setup.test.ts`
- `package.json` — the `test:setup` script and the `test` chain only
- Scripts under `tmp/units/`

**Off-limits — do not edit, for any reason:**

- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- everything under `app/` and `tests/app/`
- `configs/`, `guides/`, `.orkestrel/`, `tmp/authority/`
- the bodies of `mergeOverride` and `isNamedPlugin`
- every other factory in `vite.config.ts`
- the scaffold checkout — read it, never write it

**Do not bump a version, and do not publish.** Do not commit or push. Do not install anything. Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes. No `any`, `as`, `!`, or suppression comment in what you add.
4. The `@returns` line determines the result. Report the implementation you tried and failed to
   construct against it.
5. `tests/setup.test.ts` exists, the `setup` project is registered, and its script runs.
6. Each setup export has a case whose red comes from mutating that export, with a retained script.
   Show each red.
7. The `mode`-only case exists, carries a failing control, and reds under the `mode`-alone rival.
8. The three exports carry complete documentation.
9. Every prose defect in item 5 is closed with the supplied wording.
10. The comparison instrument's control uses the committed extract, and it re-runs.
11. Every earlier retained red still re-runs at its recorded count.
12. The ported bodies are still byte-identical to scaffold's committed copies.
13. `npm test` exits 0. Report every project's count, including `setup`.
14. `npm run build` succeeds, no `deprecat` line appears, and the CSS asset is 323.24 kB.

**Observations, not criteria:** the wall-clock durations; where you placed `setup` in the chain.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file. Do not move a byte of either ported body.
Do not weaken an assertion to make a run green. Do not reopen anything under § What is settled.

## Output

Write your report to `tmp/units/r3-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The `@returns` line** — your sentence, and the implementation you could not construct against it.
3. **The setup proofs** — each case, its mutation, and both counts.
4. **The `mode` case** — its control and its red.
5. **The registration** — what you added and where `setup` sits in the chain.
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
