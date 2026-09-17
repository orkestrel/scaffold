# Unit S2 — close the audit findings on the config override change

## Role and engine

`implementer` — GPT-5.6 Sol, running inside the Codex CLI with the `scaffold` checkout at
`C:\Users\mikes\WebstormProjects\scaffold` as your working directory, `workspace-write` sandbox.

You are the executor. Do this work yourself, now, in this session. Launch no `codex` command, no
nested agent, and no second CLI. A nested launch fails inside this sandbox and is not part of your
assignment.

You are the sole writer in this checkout. The unit that wrote the change you are fixing has exited.

## Objective

Close the findings the adversarial audit returned against the config override change, which sits
uncommitted in the working tree. Every finding below is carried by exactly one item in § The work.
Nothing else in the change is reopened.

## Authority — read before acting, in this order

1. `AGENTS.md` and `.agents/orchestration.md`.
2. `.claude/rules/quality.md` § Instruments, `.claude/rules/tests.md`,
   `.claude/rules/architecture.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`,
   `.claude/rules/workspace.md`, `.claude/rules/writing.md`.
3. `.orkestrel/scaffold/s1-report-2.md` — the change under repair, as its writer described it.
4. `.orkestrel/scaffold/s1-audit-subjective-report.md` and
   `.orkestrel/scaffold/s1-audit-checker-report.md` — the audit findings, in the auditors' own words.
5. `.orkestrel/scaffold/s1-brief.md` — the original brief, for the hazards and the invariants the
   change deliberately inverted. Those rulings stand; do not revisit them.

## The state you inherit

The working tree carries the change. It is dirty by design. The gate chain ran green on it:
`format:check`, `lint:check`, `check`, `build`, and `npm test` all exit 0, with `src:core` at 415
passed. `host.json` is unchanged after a build, so no vendored file moved.

Two independent audit lanes rejected it on the findings below. Neither found a gate failure; each
found a defect the gates do not catch.

## The work

Each item names the finding it carries, the property to change, and the proof it owes.

### 1. The plugin selection is depth-dependent and reaches the caller's own array

**Carries: subjective Finding 1, objective claim 5 REFUTED, and the objective lane's nested-array
and double-merge hazard rulings.**

`mergeOverride` runs its one-plugin-per-name selection over the **merged** array, after a `.flat()`
with no depth argument. Two consequences, each measured by an auditor:

- A caller's own two entries that share a `name` collapse to one, in the other's position, with no
  diagnostic. `plugins` in a generated `vite.config.ts` stops meaning what `plugins` means in Vite.
- `.flat()` lifts one level only. The objective lane's falsifying input is
  `srcServer({ plugins: [[[{ name: 'orkestrel-output-boundary' }]]] })`: a nested array survives the
  selection as an identity key, Vite flattens it recursively at resolve time, and the duplicate name
  the selection exists to prevent reaches the resolved configuration anyway.

**The property to change.** Select against the base's plugins and the override's plugins as two
separate lists, never against a flattened concatenation:

- Compare only **top-level entries that are objects carrying a `name`**, on each side.
- Where a base entry's name matches a named top-level override entry, the override's entry takes the
  base entry's position.
- Every override entry that matched no base entry is appended, in the order the caller wrote it.
- Nothing else is touched. A nested array, a falsy entry, a promise, and an anonymous object each
  pass through unchanged, on whichever side it was written.

This is depth-independent: it never flattens, so no nesting depth changes the result. It keeps the
showcase mechanism exactly — the showcase's output boundary still replaces the browser's in its
position — and it restores Vite's own semantics for everything a caller writes.

**The proof.** A case whose red is the current behaviour. Assert at least: the objective lane's
nested input above leaves the nesting intact and adds no second `orkestrel-output-boundary` at top
level; a caller's two same-named entries both survive in the order written; and a named override
entry still replaces the base's entry of that name in the base's position. Record the command and
both counts.

**The emitted comment** must state what a caller cannot do: only a base plugin of the same name is
replaced, nothing can be removed, and the caller's own entries are never merged with each other.

### 2. The hazard case states a population it does not have

**Carries: subjective Finding 2.**

`tests/src/core/compilers.test.ts` states its population as "every factory this checkout registers
as a project row", then sweeps a hand-written list that omits `distribution` — which
`vite.config.ts` does register — because the case reuses `distribution` as its control.
`expect(registered).toHaveLength(8)` then asserts that hand-written literal against a number
transcribed from it.

**The property to change.** Derive the population from the registered rows rather than transcribing
it: read the project rows off the default export and filter to callables, the way the vendored
`tests/config.test.ts` already does. Drop the length assertion. Draw the control from outside the
population, per `.claude/rules/quality.md` § Instruments, rather than from a member of it.

**The proof.** The case must still fail when the refusal is removed. Show that red.

### 3. The showcase factory template lives in the compiler

**Carries: subjective Finding 3.**

`src/core/compilers.ts` holds the whole emitted `appShowcase` body as an inline template literal.
`.claude/rules/architecture.md` puts template definitions in `*/templates.ts`, and
`CONFIG_TEMPLATES.factories.app` has the sibling slot beside the other factories. The change grew
this literal from a three-line delegate into the largest emitted factory, and the tests gate the
resulting drift hazard rather than removing it.

**The property to change.** Move the literal into `CONFIG_TEMPLATES.factories.app`, and reduce the
compiler's fill to the selection between that template and the empty string. Carry the explanatory
comment to the template's new home.

**The proof.** The byte-identity case and the whole-output case already pin the emitted text. They
must stay green with no expectation edited. If an expectation must change, stop and report — that
means the move was not byte-neutral.

### 4. The inverted browser case plants no control

**Carries: subjective Finding 4, objective claim 9 REFUTED.**

`tests/src/core/compilers.test.ts`'s `gives every application browser factory the caller override`
asserts emitted literals and nothing else. Its sibling in `tests/src/core/templates.test.ts` plants
the sealed shape through `sealParameter` and pins what the plant produces.

**The property to change.** Plant the sealed shape into a copy of the emitted configuration —
`export function appBrowser(): UserConfig {` in place of the override-taking declaration — and
assert the copy fails the assertion the case relies on. Match the form the sibling case already
uses.

### 5. The refusal's comment overclaims, and the refusal is wider than its subject

**Carries: subjective Finding 5 and the objective lane's silent-refusal hazard ruling.**

The emitted comment says a value carrying `command` "is that record". The objective lane compiled a
type-correct caller that carries `command` and is not Vitest's record, and the whole override was
discarded with no signal.

**The property to change.** Key the refusal on the invocation record's own required fields —
`command` and `mode`, both of which Vitest's `ConfigEnv` always carries and a `UserConfig` declares
neither of — rather than on `command` alone. Then correct the comment to say what is true: a value
carrying both is Vitest's invocation record rather than an override, and the merge returns the base
unchanged and reports nothing.

**The proof.** The vendored `tests/config.test.ts` drives every registered row with a record
carrying `command`, `mode`, `isPreview`, `isSsrBuild`, and a sentinel. It must stay green,
unedited. Add the case that a value carrying `command` alone is **not** refused.

### 6. `findRefused` names a judgment rather than what it returns

**Carries: subjective Finding 6.**

`tests/src/core/templates.test.ts`. The function returns `name(parameters)` strings for declarations
that violate the rule. `.claude/rules/names.md` requires `{verb}{Noun}`. Rename it to
`findRefusals`.

### 7. Shared test data sits in private module constants

**Carries: the objective lane's placement finding.**

`FACTORY_PARAMETERS` and `MERGE_PARAMETERS` are private module constants in
`tests/src/core/templates.test.ts`. `.claude/rules/tests.md` places shared test data and helpers in
exported setup infrastructure. `tests/setup.ts` is this repository's own file and is not vendored.

**The property to change.** Move them to the exported setup infrastructure, or fold each into its
single caller if it has exactly one. State which you chose and why.

### 8. The showcase's `assetsInlineLimit` is unread, and nothing says why it is there

**Carries: audit claims 8 and 14, settled by research rather than by a build.**

`vite-plugin-singlefile@2.3.3` overwrites `build.assetsInlineLimit` with `() => true` in its
`config` hook, unconditionally, whenever `useRecommendedBuildConfig` is true — and the emitted
showcase passes `useRecommendedBuildConfig: true`. The restated `4096` is therefore discarded before
Vite resolves the configuration, which is what makes the restatement build-neutral, and is also what
makes it look arbitrary to a reader.

Keep the value. It is the guard for the case a workspace turns `useRecommendedBuildConfig` off: the
showcase composes on `appBrowser`, which sets `0`, and `0` stops the asset inlining a single-file
showcase exists to do.

**The property to change.** Add one comment beside the value in the emitted template stating why it
is there: it restates Vite's default because a showcase composes on a browser configuration that
sets `0`, and the single-file plugin overwrites it while `useRecommendedBuildConfig` stays true.
Nothing else about the value changes.

## What is settled and must not be reopened

- The factories take overrides, and `applicationBrowser` is deleted. Both lanes confirmed it.
- The two sealed-against-a-parameter cases stay inverted. That inversion is the repository owner's
  instruction.
- This repository's own adoption is byte-identical to what the generator emits. The objective lane
  executed the generator and confirmed it. Keep it that way: if your change moves an emitted byte,
  this checkout's own files move with it.
- `assetsInlineLimit: 4096` in `appShowcase` stays. It restates Vite 8.3.0's documented default so a
  showcase does not inherit the browser's `0`.
- `publicDir: false` is restated in the core wrapper. It predates the change. **Leave it.** It is
  recorded as a successor finding and is not yours.

## Unknowns

- Whether moving the showcase template is byte-neutral. It should be: the text carries no backtick
  and no `${`. If it is not, stop and report rather than editing an expectation to match.
- Whether the new plugin selection changes any emitted wrapper's effective configuration. Every
  emitted wrapper's override names plugins disjoint from its base's, so the selection is inert for
  all of them today. Confirm that rather than assuming it.

## Host facts

- Windows. POSIX syntax in the shell; `npm` resolves as `npm.cmd`.
- The gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- A scoped Vitest run under a **read-only** sandbox fails with `EPERM … mkdir …\ssr` before
  collecting tests. Your sandbox is `workspace-write`, so it runs. If you meet that EPERM anyway,
  report it as an observation with the exact command; do not work around it.
- Do not run a whole-suite or timing-sensitive gate as your own acceptance evidence. Run the scoped
  projects your files touch — `src:core` and `config` — and report their counts. The Orchestrator
  takes the authoritative whole-suite run after you exit.

## Scope

**Owned files:**

- `src/core/templates.ts`
- `src/core/compilers.ts`
- `tests/src/core/templates.test.ts`
- `tests/src/core/compilers.test.ts`
- `tests/setup.ts` — for item 7 only
- `vite.config.ts` — this repository's own adoption, which must stay byte-identical to the generator
- `configs/src/vite.core.config.ts`, `vite.server.config.ts`, `vite.bin.config.ts` — the same, and
  only if an emitted wrapper's bytes move

**Off-limits — do not edit, for any reason:**

- `configs/helpers.ts`, `configs/policy.ts` — vendored
- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- Everything under `dist/`
- `package.json`, `host.json`, `ROADMAP.md`, `guides/`, `.orkestrel/`
- Every `src/` file other than `templates.ts` and `compilers.ts`

**Do not bump a version, and do not publish.** Do not commit or push. Do not install anything. Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npm run format:check` and `npm run lint:check` are clean.
2. `npm run check` passes. No `any`, `as`, `!`, or suppression comment in what you add.
3. The plugin selection never flattens, and the objective lane's nested input produces no duplicate
   top-level name. A case proves it, and you record its red against the current code.
4. A caller's two same-named plugin entries both survive, in the order written. Same case, same red.
5. A named override entry still replaces the base's entry of that name, in the base's position.
6. The hazard case derives its population from the registered rows, asserts no transcribed length,
   and draws its control from outside the population. It still reds when the refusal is removed.
7. The showcase template lives in `CONFIG_TEMPLATES.factories.app`, and no emitted-text expectation
   changed.
8. The inverted browser case plants a control and asserts that the plant fails.
9. The refusal keys on `command` and `mode`; a value carrying `command` alone is not refused, and a
   case proves it. The vendored `tests/config.test.ts` stays unedited and green.
10. `findRefusals` replaces `findRefused`, and `FACTORY_PARAMETERS` and `MERGE_PARAMETERS` are
    placed per item 7.
11. The emitted showcase's `assetsInlineLimit` carries the comment item 8 names, and its value is
    unchanged.
12. `npm run test:src:core` and `npm run test:config` pass, with counts reported.
13. No vendored file changed, and `host.json` is unchanged after a build.

**Observations, not criteria:** the wall-clock durations; the whole-suite result; whether any
emitted wrapper's bytes moved.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file. Do not edit an expectation to make a move
look byte-neutral. Do not reopen anything under § What is settled.

Where a detail is ancillary — a helper name among equals, where a comment sits — decide it, record
it, and carry on.

## Output

Write your report to `tmp/units/s2-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The selection** — the rule you implemented, and how it treats each entry shape.
3. **The reds** — command and both counts, per instrument.
4. **The template move** — byte-neutral or not, with the evidence.
5. **The refusal** — what it keys on now, and what a caller carrying `command` alone gets.
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
