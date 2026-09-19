# Unit R2 — close the port's audit round

## Role and engine

`implementer` — Opus 5, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer. The working tree carries unit R1's
uncommitted change; it is dirty by design and the gates are green on it.

## Objective

Close the audit round's defects. Both lanes rejected. Neither found a fault in the ported code
itself — the merge and the predicate are byte-identical to scaffold's committed bodies and both
lanes confirmed it. Every defect is in the prose the port wrote around them, or in one instrument.

**This is the last unit on this subject.** When these are closed and the gates are green, the change
is committed.

## Authority — read before acting, in this order

1. `AGENTS.md`, then `tmp/authority/rules/typescript.md`, `rules/tests.md`,
   `rules/quality.md` § Instruments, `rules/names.md`, `rules/writing.md`.
2. `.orkestrel/roughnotes/r1-audit-objective-report.md` and
   `.orkestrel/roughnotes/r1-audit-subjective-report.md` — the findings in the auditors' words.
   Both files exist; read them before editing.
3. `.orkestrel/roughnotes/r1-report.md` — the port's own account.

## The work

### 1. The `@returns` line claims base entries survive replacement

**Both lanes, independently, and the Orchestrator confirmed it against the code.**

`vite.config.ts` reads: "every base entry in the position the base gave it, and every override entry
that replaced none in the order the caller wrote it."

The first clause is false whenever a named override matches, which is the case the function exists
for: the merge pushes the replacement and the base entry is not pushed at all. The objective lane
proved it by executing the extracted source against installed Vite — base `[originalBase,
repeatedBase]` with override `[replacement]`, all sharing a name, returns `[replacement,
repeatedBase]`. The subjective lane added that the file's own vocabulary makes "entry" the object
rather than the slot, so the charitable "position" reading is not available.

This line already replaced one false claim. Do not replace it with a third.

**The property to change.** Name the slot and its occupant, and name the refusal. The subjective
lane's wording, to use or better:

```text
 * @returns The merged configuration. Each base position carries its own entry, or the override
 * entry that replaced it, and every override entry that replaced none follows in the order the
 * caller wrote it. The base itself when the override is absent or is Vitest's invocation record.
```

Check your replacement against the base-repeats-a-name case before you keep it: a reader applying
your sentence to base `[alpha, alpha]` with override `[alpha]` must predict `[replacement,
repeated]`.

### 2. The discriminant case's control cannot fail

**Subjective lane, Finding 2.** In `tests/conformance.test.ts`, the discriminant case's control
reads `expect(() => expect(refused.base).toBe(COMMAND_ONLY.base)).toThrow(/expected/u)` under a
comment naming the `command`-alone refusal as its rival. It constructs no rival. `refused` is the
subject's own result and the invocation record carries no `base` key, so that property is
`undefined` under the shipped merge, under the `command`-alone rival, and under a merge with no
discriminant at all.

The file's own header states the standard this breaks: each proof carries the untracked behaviour as
its control.

**The property to change.** Build the rival and show the merged reading fail against it, the way the
position case builds `mergeConfig`. The rival is the refusal keyed on `command` alone: it refuses
the `command`-only value that the shipped discriminant merges.

**The proof.** The control must fail when the subject is mutated to the rival, and the case must
still red under the existing `r1-red-discriminant` mutation. Record both.

### 3. The `tests/config.test.ts` sentence is true in scaffold and false here

**Subjective lane, Finding 3.** The doc block says "The `tests/config.test.ts` file drives every
registered factory through it." In scaffold every registered project factory takes `override?` and
ends in `return mergeOverride(project, override)`, so the sentence holds there. In this workspace
the registered set is `appCore`, `appBrowser`, four `journey` entries, `policy`, `config`,
`conformance`, and `probe`, and every one except `appBrowser` is a parameterless arrow that never
reaches `mergeOverride`. The vendored file hands the sentinel to all of them and exactly one
forwards it.

A sentence carried across from another repository is a claim about this one. Verify it here.

**The property to change.** State what the vendored file does in this workspace. The subjective
lane's wording, to use or better:

```text
 * The `tests/config.test.ts` file hands that record to every registered factory and refuses any
 * configuration that carries a field of it.
```

**Do not** widen the other factories to take overrides. That is a separate change with no consumer
today, and it is recorded as a successor rather than carried here.

### 4. The added test helpers are reusable module-scope declarations

**Objective lane, and the subjective lane's Finding 4 on the same helpers.**

`tests/conformance.test.ts` adds reusable local helpers. `.claude/rules/tests.md` places shared test
infrastructure in the setup module, and `AGENTS.md` § Design laws forbids a hidden module helper:
fold trivial one-use logic into its caller, or export it from the correct centralized module and
test it.

**The property to change.** For each added helper, either fold it into its single caller, or move it
to this workspace's own test setup module and export it. Check first whether that setup file is
vendored — if `scaffold repair` restores it, it is off-limits and folding is the only route. State
which you chose per helper and why.

**Also rename `keyByName`.** It returns a list, not a map, so a reader meeting it expects a `Map` or
a record. `selectByName` names the returned value and matches the comments that already call it "the
name-keyed selection".

### 5. The nested case's count reads as a claim the merge does not make

**Subjective lane, Finding 5.** That case asserts a name count of 1, and the reader that produces it
stringifies a nested array, so the reading covers top-level entries only. As written it reads as the
deduplication the merge does not claim — the exact misreading the port's own report exists to
prevent.

**The property to change.** State the coverage beside the result: the count reads top-level entries,
and Vite flattens the nested entry at resolve time, so a nested override entry carrying a base name
does reach the resolved configuration twice. `.claude/rules/quality.md` § Instruments requires an
instrument to state what it establishes and what it does not.

## What is settled and must not be reopened

- **The ported bodies.** `mergeOverride` and `isNamedPlugin` are byte-identical to scaffold's
  committed copies and stay that way. Both lanes confirmed the comparison. If a fix here would move
  a body byte, stop and report instead.
- **The position mutation reddening two cases.** The lanes split. The objective lane wanted the
  instrument scoped to one case; the subjective lane ruled the overlap honest, because the
  base-repeat case cannot assert its behaviour unless replacement happens first, and the `taken`
  mutation isolates that case alone. The subjective reading wins: every added behaviour has at least
  one mutation that isolates it, and the overlap was disclosed rather than hidden. Leave it.
- **The `tmp/probe/` instruments.** The objective lane read their placement as outside the owned
  list. `.claude/rules/tests.md` fixes `tmp/probe/` as the home for a runtime probe, so the
  placement is right and the brief's enumeration was wrong. Not your defect and not yours to move.
- **The nested residual itself.** A nested override entry can still reach Vite as a duplicate name.
  That is scaffold's committed contract; naming the consequence belongs upstream, not in a local
  fork. Item 5 documents the instrument's coverage, not a behaviour change.

## Unknowns

- Whether this workspace's test setup module is vendored. Establish it before moving anything into
  it, and say what you found.
- Whether item 2's rival can be built without importing anything the file does not already import.
  If it cannot, say so and choose the shape that keeps the file's imports unchanged.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- The `npm` shim does not resolve from a spawned child. The retained red scripts spawn Vitest
  through `node node_modules/vitest/vitest.mjs`; keep that mechanism.
- The retained instruments are Python, and Python 3.14.7 resolves on this host.
- Bootstrap's Sass deprecations are silenced in `appBrowser`'s configuration. A deprecation line in
  a build or test run is a regression; there are none today.

## Scope

**Owned files:**

- `vite.config.ts` — the doc block only. No body byte moves.
- `tests/conformance.test.ts`
- This workspace's test setup module, only if item 4 moves a helper into it and it is not vendored
- New or amended scripts under `tmp/units/`

**Off-limits — do not edit, for any reason:**

- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- everything under `app/` and `tests/app/`
- `configs/`, `guides/`, `package.json`, `.orkestrel/`, `tmp/authority/`
- every factory in `vite.config.ts`, and the bodies of `mergeOverride` and `isNamedPlugin`
- the scaffold checkout at `C:\Users\mikes\WebstormProjects\scaffold` — read it, never write it

**Do not bump a version, and do not publish.** Do not commit or push. Do not install anything. Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. You may undo exactly
your own edit.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes. No `any`, `as`, `!`, or suppression comment in what you add.
4. The `@returns` line predicts the base-repeats-a-name result correctly. Quote your sentence and
   walk that case through it in your report.
5. The discriminant case's control builds the rival and fails against it, with a recorded red.
6. The `tests/config.test.ts` sentence is true of this workspace's registered factories.
7. Every added helper is folded or moved, with the choice stated per helper, and `keyByName` is
   renamed.
8. The nested case states its coverage.
9. `mergeOverride` and `isNamedPlugin` are still byte-identical to scaffold's committed bodies.
   Prove it with a comparison.
10. `npm run test:conformance` passes, with its count.
11. `npm test` exits 0, and no `deprecat` line appears in the build or test output.

**Observations, not criteria:** the wall-clock durations.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file. Do not move a byte of either ported body.
Do not weaken an assertion to make a run green. Do not reopen anything under § What is settled.

## Output

Write your report to `tmp/units/r2-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The `@returns` line** — your sentence, and the base-repeats-a-name case walked through it.
3. **The control** — what it builds now, and its red.
4. **The helpers** — the choice per helper, and whether the setup module is vendored.
5. **The byte comparison** — the command and its result.
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
