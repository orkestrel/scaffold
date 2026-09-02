# Audit verdict — unit voice-toolbox

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `0ec520f`
(`units/voice-toolbox.diff`, `units/voice-toolbox.status`, `units/voice-toolbox-report.md`).
Rewritten per the writer: imperative 50, verbless 115, name 3, returns 4. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1, 2)

## 1. Every rewritten first sentence keeps the meaning of the sentence it replaced — BROKEN

I read every hunk in `/home/user/scaffold/tmp/units/voice/voice-toolbox.diff`, not a sample. All but one preserve the action, the subject, and the qualifiers. The imperative-to-third-person hunks are mechanical and clean (`Wrap` → `Wraps`, `Determine whether` → `Determines whether`, `Re-key` → `Re-keys`, `Re-point` → `Re-points`). The verbless hunks add a verb and nothing else. Two hunks add the pronoun `it` — `/home/user/fleet/toolbox/src/core/factories.ts:1043` and `:1293` — and in each the pronoun resolves to the tool named in the same clause, matching the file's own pre-existing house style at `createWorkspaceTool` ("— it ADVERTISES the `operation`-discriminated 13-op union"), so I retain them.

One hunk changes the term:

`/home/user/fleet/toolbox/src/core/types.ts:125`

```
- /** The workflow's native terminal status. */
+ /** Holds the workflow's native terminal outcome. */
```

The member is `readonly status: WorkflowStatus` (`:126`). The rewrite had to drop the bare word `status`, but it substituted `outcome`, a word this package already spends on a different pair of fields in the same interface: `/home/user/fleet/toolbox/src/core/helpers.ts:102` calls `durable` / `fault` the "native persistence outcome", and `/home/user/fleet/toolbox/guides/toolbox.md:192` calls them "optional native persistence outcome fields". After the rewrite, one word names two distinct members of `WorkflowToolResult`, and the sentence no longer tells the reader the value is a `WorkflowStatus`.

## 2. Every rewritten first sentence opens with a third-person `-s` verb that fits the symbol — BROKEN

The verb palette is coherent per file kind and I retain most of it: `Holds` / `Lists` across `constants.ts`, `Describes` across `shapers.ts`, `Represents` across `types.ts` and `server/types.ts`, `Narrows` across `validators.ts`, the action verbs on the `WorkspaceOperation` variants. `Reports whether` (`types.ts:129`, `:224`) fits a boolean and mirrors the rule's own `Checks whether`. `Names the registered behavior this step runs` (`types.ts:105`) is the best available rewrite of a `name` member. `Caps the tasks in flight at once` (`types.ts:70`) fits a value the runner enforces as a ceiling. No rewritten sentence repeats its own symbol's identifier except the two the report names, and each of those points at a different symbol, which I accept.

Two do not fit.

`/home/user/fleet/toolbox/src/core/types.ts:127` — `/** Counts the settled task results. */` on `readonly count: number`. The member is the tally; it performs no count. Its three siblings in the same interface take stative verbs (`Holds`, `Reports whether`, `Holds`), so this one line makes an inert readonly number read as an action.

`/home/user/fleet/toolbox/src/core/types.ts:91` — `/** Sets the failure policy: ... */` on `WorkflowDraft.bail`, against `/home/user/fleet/toolbox/src/core/types.ts:72` — `/** Holds the per-phase failure-policy OVERRIDE; ... */` on `PhaseDraft.bail`. One concept, two verbs, in adjacent interfaces the same reader reads together. At least one of them does not fit.

## 3. Every rewritten boolean `@returns` reads `True if …; false otherwise` with the original condition kept — CONFIRMED

Every boolean `@returns` in the published source is in the mandated form, and no other wording survives (a search of `src/` for `@returns Whether` and for `@returns` followed by a `true` / `false` token returns nothing).

- `/home/user/fleet/toolbox/src/core/errors.ts:57` — from `` `true` when `value` is an {@link ToolboxError} ``; condition intact.
- `/home/user/fleet/toolbox/src/core/databases/DatabaseResolver.ts:48` — from `Whether a live handle is cached`; condition intact.
- `/home/user/fleet/toolbox/src/core/validators.ts:18` — from `Whether `value` is a unique, nonempty-tagged workflow/agent chain`; condition intact.
- `/home/user/fleet/toolbox/src/core/validators.ts:39` — from `Whether it is a frozen {@link AgentFunction} with a frozen valid lineage`; condition intact, including the pre-existing `it`.

Dropping the backticked `true` / `false` tokens is what the wave brief mandates, so it is not a token change.

## 4. No already-compliant sentence rewritten; no `@example`, `@param`, `@remarks`, `@throws`, or later sentence touched — CONFIRMED

- No changed line in the diff carries `@param`, `@remarks`, `@example`, `@throws`, `@deprecated`, or `@see`.
- Every changed line in the diff begins with `*` or `/**` after its leading whitespace; no non-comment token moved. `voice-toolbox.status` lists only files under `src/`, and the tree has no `app/` directory.
- Every removed first sentence opened with an imperative or a bare noun phrase. The only removed openers whose first word ends in `-s` are the `Options for …` blocks, which are noun phrases and correctly in scope. Nothing already third-person was rewritten: `compilers.ts`, `server/factories.ts`, and `server/terminals/TerminalBridge.ts` already opened `Compiles` / `Builds` / `Bridges` / `Projects` and appear in neither the diff nor the status.
- One block's rewrite spans two lines, `/home/user/fleet/toolbox/src/core/helpers.ts:127-128`; both lines are inside the first sentence, which ends at `:129`.

Findings outside the claims:

## Required changes

**A. `/home/user/fleet/toolbox/src/core/types.ts:125`** — `Holds the workflow's native terminal outcome.` spends the word `outcome` on `status`, while `src/core/helpers.ts:102` and `guides/toolbox.md:192` already use it for the `durable` / `fault` persistence pair. It matters because one interface now names two different members with one word, and the sentence stopped pointing at the union the field carries. Right looks like naming the value by its own type, the same move the writer justified for `DatabaseDefinitionRow`: `/** Holds the run's terminal {@link WorkflowStatus}. */`. `WorkflowStatus` is imported by name at `types.ts:9`, so the link resolves, and the member identifier `status` still goes.

**B. `/home/user/fleet/toolbox/src/core/types.ts:127`** — `Counts the settled task results.` attributes an action to `readonly count: number`, which holds a tally and counts nothing. It matters because the reader of a JSON-safe result summary must read the field as data, and the three sibling members already do. Right looks like `/** Holds the tally of settled task results. */`.

**C. `/home/user/fleet/toolbox/src/core/types.ts:91` and `:72`** — the same `bail` concept reads `Sets the failure policy` on `WorkflowDraft` and `Holds the per-phase failure-policy OVERRIDE` on `PhaseDraft`. It matters because these interfaces sit within twenty lines of each other and a reader comparing them infers a distinction that does not exist. Right looks like one verb for the concept: `/** Holds the failure policy: `false` (default) continues gracefully, `true` halts on the first failure. */` at `:91`, leaving `:72` as it stands.

## Findings outside the claims

**D. `/home/user/fleet/toolbox/src/core/shapers.ts:613`** keeps `via` inside a sentence this unit rewrote: `Describes the flat dot-path relation include list, expanded via {@link import('./helpers.js').expandInclude}.` `.claude/rules/writing.md` § Substitutions replaces `via` with `through`, and `AGENTS.md` § Writing binds TSDoc. This is not a required change to this unit: `via` is pervasive and pre-existing across `src/core/types.ts`, `src/core/constants.ts`, `src/core/factories.ts`, and `src/core/shapers.ts`, almost all of it in `@remarks` bodies the wave puts off limits, and fixing only the one line the sweep happened to touch would leave the package less consistent than it is now. Route it as a successor writing-rules sweep over the package's whole comment surface.

**E. Advisory, no change requested.** `.oxfmtrc.json:7` sets `printWidth` to 100, and the inserted verbs push a set of previously-conforming first lines to or past that column without re-wrapping their continuations — for example `src/core/constants.ts:11`, `src/core/types.ts:45`, `:110`, `:148`, `:192`. The formatter does not reflow comments, so `format:check` is unaffected, and the tree already carried over-width link lines before this unit (`src/core/types.ts:206`, `:312`, `src/core/constants.ts:129`). I raise it only so the campaign can decide once, package-wide, rather than per unit.

**F. Retained on purpose, recorded so it is not re-litigated.** `Represents the options for …` is wordier than the `Options for …` it replaced and repeats across every options interface. I considered a more informative verb such as `Configures` and rejected it: the wave brief prescribes `Represents` for a type or interface, and one stock opener applied uniformly reads better across a package than a varied one. The same reasoning retains `Describes` throughout `shapers.ts` and `Holds` throughout `constants.ts`.

## Referrals — outside my lane, addressed to the Orchestrator

The objective lane did not run (Sol bench dark), so these go to you rather than to a lane, and I return no verdict on them.

- The gate chain results and the acceptance instrument reading in `/home/user/scaffold/tmp/units/voice/voice-toolbox-report.md` are the writer's self-report. My tools are read-only and I ran nothing. Re-run `instruments/voice-scan.mjs` and the gate chain yourself before acceptance.
- The report's per-kind block tallies and its reconciliation of the launch measurement are mechanical acceptance criteria. Dispatch `checker` against them; they sit outside the subjective lane.
- The three required changes are three comment lines in one file. If you re-dispatch, the writer's engine wrote this work, so per the fix-round rule the auditor of the fix must be an engine that did not — which, with the Sol bench dark, means recording the substitution again.

## Checker lane (PASS)

Claim 1 CONFIRMED. Claim 2 CONFIRMED. Claim 3 CONFIRMED. Claim 4 CONFIRMED. Claim 5 CONFIRMED.

Findings outside the claims:

Audited `/home/user/fleet/toolbox` against `voice-toolbox.diff`, `voice-toolbox.status`, `voice-toolbox-report.md`, and the tree itself.

1. Comment-only diff (CONFIRMED). Read the full diff (`voice-toolbox.diff`, all hunks across 13 files). Every `-`/`+` pair sits inside a `/** … */` block or a single-line `/** … */` comment. No hunk touches an import, a signature, a body statement, or any other code token.

2. Token parity (CONFIRMED). Spot-checked backtick tokens, `{@link …}` targets, and inline code across many hunks (for example `src/core/constants.ts:233-234` `` `records` ``/`` `query.limit` ``; `src/core/types.ts:1016-1017` `` `path` ``; `src/core/errors.ts:391-392` `{@link ToolboxError}` and `` `value` ``): all preserved byte-identical. The 4 boolean `@returns` rewrites (`DatabaseResolver.ts:48`, `errors.ts:57`, `validators.ts:18`, `validators.ts:39`) all read `True if …; false otherwise`, matching the mandated form and dropping only the backticked `true`/`false` as the exception permits. `src/core/types.ts:56` (`behavior`), `:105` (`name`), `:125` (`status`) each drop the plain-text (non-backticked) mention of the symbol's own name, consistent with the report's own accounting; no backticked instance of a dropped identifier was found. `PhaseDraft.bail` (`types.ts:901-903`) and `DatabaseDefinitionRow`-in-generic (`types.ts:1162`) keep their backtick token, as the report's observations describe.

3. Scope honesty (CONFIRMED). `voice-toolbox.status` lists 13 files, all `src/core/*` or `src/server/*`. No `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/` path appears.

4. Mechanical sweep (CONFIRMED). Grepped `src/` (the tree has no `app/` directory, confirmed by `Glob`) for a doc block's first line opening with an imperative verb from the named list, restricted to lines beginning `/**` or `*` so code `return` statements are excluded. 3 hits, all mid-block continuation lines inside `@remarks` prose (`shapers.ts:636`, `factories.ts:534`, `stores/MemoryDefinitionStore.ts:9`), none is a doc block's first line. Grepped for `@returns` followed by `Whether`, `` `true` ``, or `true `: 4 hits, all already rewritten to `True if …; false otherwise`. The sweep returns no genuine hit.

5. Gates (CONFIRMED on quoted evidence). The report quotes command, exit code, and an evidence excerpt for `format:check`, `lint:check`, `check`, `build`, and `test`, each exit 0, per the brief's condition. The Orchestrator's landing chain remains the authoritative run.

No findings outside the claims: no `@param`/`@remarks`/`@example`/`@throws`/`@deprecated`/`@see` line appears anywhere in the diff, consistent with the report's claim that only first sentences and `@returns` lines changed.

## Orchestrator

Subjective claims 1 and 2 broke on three sentences: `outcome` spent on the `status` member, `Counts` on a tally, and `Sets` beside `Holds` for the one `bail` concept. Ruled with the lane's proposals (fix-up brief `voice-toolbox-fixup-brief.md`, builder on Sonnet): `Holds the run's terminal {@link WorkflowStatus}.`, `Holds the tally of settled task results.`, `Holds the failure policy: …`. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
