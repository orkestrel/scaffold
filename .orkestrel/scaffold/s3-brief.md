# Unit S3 — close the second audit round

## Role and engine

`implementer` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer.

The previous fix round was written by GPT-5.6 Sol. This round moves to Opus because most of what
remains is product prose a developer reads, and because a fix round's writer must not be the engine
whose work is being repaired.

## Objective

Close the enumerated findings from the second audit round. Two independent lanes rejected the
change; neither found a gate failure. Every finding below is carried by exactly one item.

**This is the last planned round.** When these items are closed and the gates are green, the change
is accepted and committed. Do not widen it.

## Authority — read before acting, in this order

1. `AGENTS.md` and `.agents/orchestration.md`.
2. `.claude/rules/writing.md`, `.claude/rules/documentation.md`, `.claude/rules/quality.md`
   § Instruments, `.claude/rules/tests.md`, `.claude/rules/names.md`,
   `.claude/rules/architecture.md`, `.claude/rules/typescript.md`.
3. `.orkestrel/scaffold/s2-audit-subjective-report.md` and
   `.orkestrel/scaffold/s2-audit-objective-report.md` — the findings, in the auditors' words.
4. `.orkestrel/scaffold/s1-audit-verdict.md` — the round-one findings and what was ruled out of
   scope. Nothing it records as not carried is reopened here.

## The state you inherit

The working tree carries the whole change, uncommitted, and the gates are green on it:
`format:check`, `lint:check`, `check`, `build`, and `npm test` all exit 0, with `src:core` at 419
and `config` at 172 passed, 1 skipped. `host.json` is unchanged after a build.

## The rule on emitted text

Several items change the emitted configuration's bytes. **That is expected.** Update every
expectation that pins a span you change, and regenerate this repository's own `vite.config.ts` from
the generator so the byte-identity proof stays green with no expectation of its own edited. Do not
weaken an assertion to avoid an update.

## The work

### 1. The emitted comment states a falsehood about `UserConfig`

**Carries: subjective Finding 1. Verified independently by the Orchestrator.**

The emitted comment reads: "A `UserConfig` declares neither `command` nor `mode`, so a value
carrying both is treated as Vitest's invocation record rather than an override."

`UserConfig` declares `mode`. `node_modules/vite/dist/node/index.d.ts:3477` opens
`interface UserConfig`, and `mode?: string` sits at line 3517. Only `command` is absent, and
`command` appears on `ConfigEnv` and `ResolvedConfig` only.

This sentence ships in every workspace the generator creates, and it is the justification for the
one mechanism a developer must trust before passing an override at all. The error came from the
brief that specified the narrowing, not from the unit that implemented it.

**The property to change.** Say what is true: `UserConfig` declares `mode` but not `command`, and
Vitest's invocation record always carries both, so a value carrying the pair is that record rather
than an override. Carry the correction into `src/core/templates.ts`, into this repository's own
`vite.config.ts`, and into the test comment in `tests/src/core/templates.test.ts` that restates it.

### 2. `used` names a ledger the search never consults

**Carries: subjective Finding 2 and objective Finding 4, which converge.**

`findIndex` runs fresh for every base entry and never skips an index already consumed; `used` is
read only by the leftover loop. Where a base declares two entries carrying one name and the override
carries one entry with that name, the same override object is pushed into both positions and the
second base entry is discarded.

No emitted base reaches that shape — the objective lane enumerated every factory and confirmed it.
It is reachable through the exported `mergeOverride`, which every generated workspace ships, so a
workspace developer calling it with a base of their own can hit it.

The objective lane judged documentation the proportionate close. Take the code fix instead: it is
one conjunct, it removes the anomaly rather than describing it, and the writer's own earlier draft
at `.orkestrel/scaffold/s2-instruments/s2-edit.mjs:18-19` already carried it.

**The property to change.** Exclude an index the base loop has already consumed, so one override
entry is installed at most once. Then make the code and the emitted comment use one word for the
axis — the comment says "Remaining", the code says `used`.

**The proof.** A case whose red is the current behaviour: a base carrying two entries under one name
and an override carrying one, where the second base entry must survive. Record the command and both
counts.

### 3. The merge comment never says what happens to every other key

**Carries: subjective Finding 3.**

The comment opens with "`mergeConfig` concatenates arrays, so an override carrying `plugins` would
otherwise add a second copy", then gives the plugin rule in full. It never says `plugins` is the
only key given that treatment. A developer overriding `test.setupFiles` gets the entry twice,
silently, and the comment's opening implies the function solved that generally.

**The property to change.** Add one sentence after the plugin rule stating that every other key
merges as `mergeConfig` merges it, so an override's arrays elsewhere concatenate with the base's
rather than replacing them.

### 4. The `assetsInlineLimit` reason is split across two comments, and the halves disagree

**Carries: subjective Finding 4 and objective Finding 3, which converge from opposite sides.**

The template-level comment says the value is restated "because the browser configuration this
composes on writes every asset as its own file, and a showcase inlines instead". That is not why the
showcase inlines: `vite-plugin-singlefile@2.3.3` overwrites `assetsInlineLimit` with `() => true`
whenever `useRecommendedBuildConfig` is true, and the emitted showcase passes it true. The emitted
comment states the overwrite but omits the purpose, and so ends the reader on "this is overwritten
anyway" — an invitation to delete the line it exists to protect.

**The property to change.** Put the whole reason in the **emitted** comment, where the reader who
can act on it meets it: the browser configuration this composes on sets `0`, `4096` is Vite's own
default, and the single-file plugin overwrites it while `useRecommendedBuildConfig` stays true, so
the line takes effect only in a workspace that turns that option off. Reduce the template-level
comment to what it alone owns — the composition and the boundary replacement — and drop its false
causal clause.

### 5. The hazard suite's comment asserts a control regime its cases do not have

**Carries: objective Finding 1.**

`tests/src/core/compilers.test.ts` states "each carries the bare merge as its control" and "against
the real vendored boundary plugins". Both are false for the nested-entry case, the caller-order
case, the opaque-entry case, and the `command`-alone case: none calls `mergeConfig`, and the last
two use no vendored boundary plugin.

`.claude/rules/quality.md` § Instruments requires stating what the controls established and what
they did not.

**The property to change.** Either name which cases carry the bare merge as their control and which
carry none, or give a control to the cases that lack one. State which you chose.

### 6. One factory-driven assertion admits the reading it exists to exclude

**Carries: objective Finding 2.**

In `replaces a named base plugin in its position`, the factory-driven half asserts only the mapped
plugin names. An implementation that kept the base entry and discarded the replacement produces the
same array and the same length, so the rival reading passes. The hand-written block above it does
exclude that reading.

**The property to change.** Assert the replacement by identity at the base's position in the
factory-driven half.

### 7. The whole-output pinning case has neither a recorded red nor a control

**Carries: objective Finding 5, and the first half of claim 15's refutation.**

`emits every browser workspace configuration for a showcase selection and for none` was added whole
and has never been shown to fail.

**The property to change.** Pair it with a control that must fail, the way the byte-identity case is
paired, or record its red from a mutation of the emitted text. State which you chose and show the
red.

### 8. No retained instrument re-produces any red

**Carries: the second half of claim 15's refutation, from both lanes.**

The reds recorded for this change exist only in a report. `.agents/orchestration.md` § Dispatch
anatomy requires retaining "the exact executed script or instrument", and the retained
`.orkestrel/scaffold/s2-instruments/` holds the implementation and capture scripts but no mutation.

**The property to change.** Write each mutation you perform as a script under `tmp/units/`, run it,
and name the file beside the red it produced. The Orchestrator retains them. A red whose mutation
cannot be re-run is a claim, not evidence.

### 9. The relocation control tests the comparator, not the capture

**Carries: claim 6, from both lanes.**

`.orkestrel/scaffold/s2-instruments/s2-compare.mjs` appends one byte to the output file and asserts
the comparison fails. A capture that silently emitted nothing would pass that control identically.

**The property to change.** Perturb one character **inside** the relocated showcase literal,
re-capture, and assert the comparison fails. Then undo the perturbation and re-run the real
comparison. Retain the script.

### 10. Naming and shape

**Carries: subjective Findings 5, 6 and 7.**

- `replacements` holds every override entry, and most of them append rather than replace. The name
  states a judgment that is false for its own members. Rename it to what it holds.
- The `findIndex` callback spells "is this a named top-level plugin object" twice inline, once for
  the base entry and once for the candidate — the same conjuncts, re-evaluated for every candidate.
  Extract it as a named predicate in the generated root configuration, beside `resolveWorkspacePath`
  and `mergeOverride`. This also makes item 2's shape visible.
- The emitted showcase comment writes `appBrowser`, `useRecommendedBuildConfig`, and
  `assetsInlineLimit` as bare words while its sibling comment backticks its code tokens, and it
  opens with an imperative that addresses nobody. `.claude/rules/writing.md` § Code tokens requires
  the backticks. Make it declarative, with its tokens marked.

### 11. The opaque-entry case proves equality where it means identity

**Carries: subjective claim 4's recorded weakness.**

The case asserts the whole result with `toStrictEqual`, so for an anonymous `{}` it would also pass
if the merge substituted a fresh empty object.

**The property to change.** Assert the opaque entries by identity, the way the nested case does.

## What is settled and must not be reopened

- The factories take overrides; `applicationBrowser` is deleted; the two sealed cases stay inverted.
- The refusal keys on `command` and `mode`. The objective lane traced Vitest's call site and
  confirmed no invocation path reaches a factory with `command` and no `mode`. Only the sentence
  explaining it is wrong, which is item 1.
- The inverted browser case's planted control stands. The subjective lane called it near-vacuous;
  the objective lane ruled it confirmed, having checked that the plant is proven to have landed and
  that the case's own load-bearing assertion is what runs against it. One lane could not
  substantiate the objection, so it is dropped on the record.
- `mergeOverride` stays exported, and the relocation stays.
- The root configuration's runtime behaviour is proven from `tests/src/core/compilers.test.ts`
  rather than the vendored `tests/config.test.ts`. Moving it would edit a vendored file, move
  `dist/host`, and oblige a release. Recorded for the next owner of the vendored set; not yours.

## Unknowns

- Whether extracting the named predicate moves any emitted byte beyond the predicate itself. It
  will move the emitted configuration; update the pinned expectations and regenerate this
  repository's own file, per § The rule on emitted text.
- Whether item 2's fix changes any emitted wrapper's effective configuration. No emitted base
  repeats a plugin name, so it should not. Confirm rather than assume.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- Do not run a whole-suite or timing-sensitive gate as your own acceptance evidence. Run the scoped
  projects your files touch — `src:core` and `config` — and report their counts. The Orchestrator
  takes the authoritative whole-suite run after you exit.

## Scope

**Owned files:**

- `src/core/templates.ts`
- `src/core/compilers.ts`
- `tests/src/core/templates.test.ts`
- `tests/src/core/compilers.test.ts`
- `vite.config.ts` — this repository's own adoption, regenerated from the generator
- `configs/src/vite.core.config.ts`, `vite.server.config.ts`, `vite.bin.config.ts` — only if an
  emitted wrapper's bytes move
- New scripts under `tmp/units/` for items 8 and 9

**Off-limits — do not edit, for any reason:**

- `configs/helpers.ts`, `configs/policy.ts` — vendored
- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- Everything under `dist/`
- `package.json`, `host.json`, `ROADMAP.md`, `guides/`, `.orkestrel/`
- Every `src/` file other than `templates.ts` and `compilers.ts`

**Do not bump a version, and do not publish.** Do not commit or push. Do not install anything. Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. You may undo exactly
your own edit.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npm run format:check` and `npm run lint:check` are clean.
2. `npm run check` passes. No `any`, `as`, `!`, or suppression comment in what you add.
3. The emitted comment states the true discriminant, and the same correction reaches
   `src/core/templates.ts`, `vite.config.ts`, and the test comment that restates it.
4. One override entry is installed at most once, with a recorded red for a base repeating a name.
5. The merge comment states that every key other than `plugins` merges as `mergeConfig` merges it.
6. The emitted `assetsInlineLimit` comment carries the whole reason, and the template-level
   comment's false causal clause is gone.
7. The hazard suite's comment matches the controls its cases actually carry.
8. The factory-driven half of the replacement case asserts identity at the base's position.
9. The whole-output pinning case has a control that must fail, or a recorded red.
10. Every red this unit records has a retained script under `tmp/units/` that re-produces it.
11. The relocation control perturbs a character inside the showcase literal.
12. `replacements` is renamed, the named predicate is extracted, and the showcase comment is
    declarative with its tokens backticked.
13. The opaque-entry case asserts identity.
14. `npm run test:src:core` and `npm run test:config` pass, with counts reported.
15. No vendored file changed, and `host.json` is unchanged after a build.

**Observations, not criteria:** the wall-clock durations; the whole-suite result; whether any
emitted wrapper's bytes moved.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file. Do not weaken an assertion to make a run
green. Do not reopen anything under § What is settled.

Where a detail is ancillary — a predicate's name among equals, where a sentence sits inside a
comment — decide it, record it, and carry on.

## Output

Write your report to `tmp/units/s3-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The emitted prose** — each sentence you changed, before and after.
3. **The reds** — command, both counts, and the retained script that re-produces each.
4. **The selection** — what changed in the code, and what it does to a base repeating a name.
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
