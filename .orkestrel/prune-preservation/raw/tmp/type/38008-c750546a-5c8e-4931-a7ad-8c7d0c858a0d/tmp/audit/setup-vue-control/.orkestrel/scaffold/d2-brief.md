# Unit D2 — close the D1 audit findings

## Role and engine

`opus` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer.

**Why native rather than the Sol bench.** Verification runs `npm run test:distribution`, which packs,
installs, and spawns a generated workspace. A bench sandbox denies a nested install and a grandchild
process, and the objective audit lane could not run that project for exactly this reason. Routing
recorded rather than assumed.

## The state you inherit

The tree carries unit D1's uncommitted work on top of `53d4a58e`: `tests/config.test.ts`,
`tests/distribution.test.ts`, and `host.json`. **Do not revert it.** Run no `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

Both audit lanes rejected D1 independently. **Neither asked for the mechanism to change.** The split
of the roll-up case into a conditional face-scope case and an unconditional helper case stands. Do
not reopen it, do not restore the single case, and do not replace the skip with a guard.

Read the full reconciliation at `.orkestrel/scaffold/d1-audit-verdict.md` before editing. Its
"Findings carried to the fix round" table is your work list, and this brief restates each with its
required change.

## The findings, and what closes each

### 1. The `published` predicate is wrong in substance — HIGH, blocking

`tests/config.test.ts:72` reads `const published = existsSync(resolve(root, 'src'))`.

`existsSync` accepts a regular file, an empty directory, and a directory holding no recognized
environment. On this case-insensitive host `SRC` resolves too. So a private workspace carrying an
unrelated `src` entry still enters the case and fails with `The workspace declares no face project`
— the exact defect D1 was dispatched to close, surviving in a narrower population.

The repository already defines this fact twice, and the test must agree with both:

- `src/bin/helpers.ts:899-903`, `targetToEnvironments`, filters `ENVIRONMENTS` by
  `isPhysicalDirectory(resolveContainedPath(target, `${axis}/${environment}`))`.
- `src/core/compilers.ts:278` defines `const publishes = blueprint.src.length > 0`.

Derive applicability from a recognized physical source environment — whether any of `src/core`,
`src/browser`, or `src/server` is a directory — rather than from the presence of a `src` entry. The
file's own `resolves every declared alias to its real entry` case already walks axes and environments
this way at `tests/config.test.ts:87-93`; follow that shape.

**Keep the throw reachable.** A workspace that declares a recognized source environment and vendors
no `configs/src/tsconfig.{core,browser,server}.json` must still fail this case. That requirement is
what forbids conditioning on the wrapper.

### 2. `published` is also the wrong name — blocking

The file calls this same fact `publishes` at `:541` and `:637`, and `src/core/compilers.ts` calls it
`publishes` at `:278` and `:519`. Two identifiers for one concept, differing by one letter, is what
`AGENTS.md` § Design laws forbids under "One concept, one term".

Rename the module-scope constant to `publishes` and update `:2164` and the comment at `:2161-2162`.
If `lint:check` refuses the shadow the two case-locals create, resolve it on the case-locals — the
module-scope constant owns the file-wide term.

### 3. The skip comment claims an outcome the reporter does not deliver — blocking

`tests/config.test.ts:2161-2163` states that a skip "reports that absence in the run". Every
generated workspace runs Vitest with `--reporter=dot`, fixed at `src/core/compilers.ts:282`, so in
the workspace this comment is written for the skip prints as a single unnamed `-`. A developer there
sees the project total move and the skipped count rise, and nothing tells them which case skipped or
why.

This is the sentence that justified skipping over guarding, and it is the one claim in the change a
target reader can check against their own output. State what is observable instead: the skipped count
rises where a guard would raise the passed count, and the case name and its condition are read by
re-running the project with a reporter that names skipped cases.

Then put the condition into the case name, in the bracket form this repository already uses at
`tests/distribution.test.ts:1124`, so the reason is legible wherever names are printed.

### 4. Shared install scenarios are declared inside a test file — MEDIUM

`tests/distribution.test.ts:143-266` declares `installPackedScaffold` and
`installGeneratedWorkspace` locally, and both cases use them. `AGENTS.md` requires reusable logic
exported from its centralized home, and `.claude/rules/tests.md` requires a test file to import
shared test infrastructure rather than declare its own scenario helpers.

Move the setup mechanics into the shared test infrastructure module that owns them and import them.
Keep every assertion in the cases. Read `.claude/rules/tests.md` for which module that is and follow
it; if the right home is ambiguous, stop and report rather than inventing one.

### 5. `installGeneratedWorkspace` returns the wrong value — MEDIUM

It fixes the materialization directory internally and returns only an environment, so both callers
repeat the `'generated'` literal at `:976`, `:1068`, and `:1086`, and the app-only case re-parses a
manifest the helper already parsed and wrote back.

Return the facts the caller needs rather than one of them. Delete the repeated literal derivations
and the re-parse. One place knows where the workspace was materialized.

### 6. A case comment states a reason false for its own readings

`tests/config.test.ts:2213-2214` says every reading there is decided by the text or the value handed
to it. That is false for `packageManifestName(configHelpers.WORKSPACE_ROOT)` at `:2260`, which reads
the manifest from disk; for `readCompilerOutput` at `:2230`, which spawns the real compiler; and for
`createRequire(...).resolve` at `:2267`, which reads the module resolver.

The conclusion is true — none needs a `src` axis. State the property that is actually true: none of
them reads anything under `configs/src/`.

### 7. The two case names disagree, and the second undersells its contents

`:2164` ends "a declaration roll-up requires" and `:2217` ends "a roll-up requires". Use one spelling
in both. The second case also holds the `parseProjectScope` refusals at `:2222-2228`, the compiler
refusal at `:2230-2236`, `isStringList` at `:2238-2241`, and `isExtractorModule` at `:2271-2292`,
none of which its name admits. Name it for what it holds and why it is unconditional.

### 8. Added comments use a prohibited word

`here` appears at `tests/config.test.ts:2213` and at `tests/distribution.test.ts:142`, `179`, `181`,
`1060`, `1071`, and `1098`. `.claude/rules/writing.md` § Code tokens, references, and links bans it.
Name the file, the proof, the install, or the assertion instead.

### 9. A vendored sentence inverts its actor

`tests/config.test.ts:68-69`: "a declared axis whose wrapper is missing is the defect such a proof
exists to report, and must still fail it." The subject of "must still fail it" parses as the axis,
and `it` attaches to either the proof or the defect. Name the actor and the object.

### 10. A comment states a past-state claim the case beneath it makes false

`tests/distribution.test.ts:1059-1060` says "nothing here has ever run the vendored set against a
workspace that carries none", directly above the case that does exactly that. Write the present tense
for what exists.

### 11. The blocked-plan diagnostic changed

`53d4a58e:tests/distribution.test.ts:933` emitted `The generated proof blueprint was blocked`;
`tests/distribution.test.ts:201` emits `The generated blueprint was blocked`. No assertion was
dropped, so this is a diagnostic regression rather than a behavioural one. Restore the naming the
message carried, or make it name the blueprint the helper was given.

### 12. Re-take the contaminated skip measurement

`.orkestrel/scaffold/d1-instruments/d1-probe-skipreport-3.sh:6` materializes its workspace at
`$root/tmp/units/d1-skipreport`, **inside this checkout**. Node then resolves
`@microsoft/api-extractor` by walking up into this checkout's `node_modules`, which turned a skip
into a pass and masked the new one. The retained reading of one added skip is wrong; the audit
reconciled the true figure as `171 passed | 3 skipped (174)` against this checkout's
`173 passed | 1 skipped (174)`.

Re-take it in the operating system's temporary directory, never under this checkout, and report the
measured counts. Write the corrected instrument under `tmp/units/`.

## Also record

**The red's chronology.** The objective lane left claim 9 `UNSETTLED`: `npm pack` reads staged
`dist/host` bytes, so a stale build could in principle produce the same red after a source edit had
already landed. Your re-run gives a fresh chance to settle it. Record, explicitly, the order of your
own steps — when source changed, when `npm run build` ran, and when each measurement was taken — so
the next auditor does not have to infer it.

## Scope

**Owned files:** `tests/config.test.ts`, `tests/distribution.test.ts`, the shared test-infrastructure
module finding 4 names, and the generated artifacts `npm run build` restages — `dist/`, `host.json`.

**Off-limits:** `src/`, `configs/`, `app/`, `.claude/`, `.agents/`, `ROADMAP.md`, `package.json`, and
`.orkestrel/`. Read `.orkestrel/scaffold/d1-audit-verdict.md` and the two lane reports; write none of
them.

Do not bump the version and do not publish. Do not commit or push. Install no new dependency.

Never silence a rule: no `eslint-disable`, no `oxlint-disable`, no suppression comment, no `any`, no
`as`, no non-null assertion.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Write any multi-step command to a script file and run the file. A heredoc, a `node -e`, or an `&&`
  chain trips the shell's approval classifier and stalls an unattended run.
- `npm run test:distribution` packs, installs, and runs a full gate chain in a temporary workspace.
  Budget minutes.
- **Editing a vendored file invalidates `host.json` until `npm run build` reruns.** D1 met this:
  a comment-only edit reddened `tests/src/server/helpers.test.ts > readHostFloor` with
  `The vendored host cannot read the declared file at tests/config.test.ts`. Rebuild before any gate
  that reads a generated artifact.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first. The rebuild precedes every gate that reads a generated artifact.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. No `here` remains in a comment in either owned test file, and the sweep you ran is named with its
   pattern and paths.
4. `npm run check` exits 0.
5. `npm run build` exits 0 and `dist/host/tests/config.test.ts` carries the corrected bytes.
6. A workspace carrying a recognized source environment and no face wrapper still fails the scope
   case. Prove it with a recorded run, not by reading the source.
7. A workspace carrying an unrelated `src` entry — a regular file, or an empty directory — does not
   fail the scope case. Prove it with a recorded run.
8. The re-taken skip measurement, in the operating system's temporary directory, reports its counts.
9. `npm run test:distribution` exits 0, with counts reported.
10. `npm test` exits 0, with per-project counts reported.
11. `git status --short` shows no path outside the owned list.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report where closing a finding
requires editing an off-limits file, or where finding 4's correct home is ambiguous.

Settle these yourself and record each choice: the derived predicate's exact expression, the two case
names, every rewritten comment, and the helper's return shape.

## Output

Write your report to `tmp/units/d2-report.md`, and make your final message the same content: done or
not done per criterion and per finding; the recorded runs behind criteria 6, 7, and 8 with their
exact commands and counts; your own step chronology; and what you did not close.

No process diary.
