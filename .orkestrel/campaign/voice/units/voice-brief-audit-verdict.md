# Audit verdict — unit voice-brief

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `2324035`
(`units/voice-brief.diff`, `units/voice-brief.status`, `units/voice-brief-report.md`).
Rewritten per the writer: imperative 33, verbless 88, name 0, returns 1. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (design fit, voice, wording, meaning preservation, guide/product coherence). Subject: the uncommitted TSDoc voice change in /home/user/fleet/brief, ruled on /home/user/scaffold/tmp/units/voice/voice-brief.diff and the tree, not on the writer's report.

## 1. Meaning preserved in every rewritten first sentence — CONFIRMED

I read every hunk in the diff, not a sample: 11 file headers, 122 changed line pairs, matching the 11 rows in /home/user/scaffold/tmp/units/voice/voice-brief.status. Every pair differs from its predecessor in exactly one of three ways, and in no other way:

- an existing imperative inflected to the `-s` form, with the rest of the line byte-identical — `/home/user/fleet/brief/src/core/factories.ts:15` `Create a compilation orchestrator.` to `Creates a compilation orchestrator.`; `/home/user/fleet/brief/src/core/helpers.ts:428` `Count` to `Counts`; `/home/user/fleet/brief/src/core/parsers.ts:6` `Parse` to `Parses`;
- a verb prefixed to a noun phrase, with the following word's capital lowered and nothing else moved — `/home/user/fleet/brief/src/core/constants.ts:76` `` `16` — the default turn cap `briefToGoal` renders. `` to `` Holds `16` — the default turn cap `briefToGoal` renders. ``, which keeps both code tokens and the whole trailing clause; `/home/user/fleet/brief/src/core/helpers.ts:384` `Lists the readiness rules a brief fails, computed directly from its own measures.`, where the trailing participial clause keeps its original attachment and `its` still resolves to `a brief`; `/home/user/fleet/brief/src/core/types.ts:340` `Represents a visible marker for a phase that failed.`;
- the one mandated boolean `@returns` rewrite at `/home/user/fleet/brief/src/core/errors.ts:39`.

Nothing was dropped. The only additions beyond the verb are the two articles the verb form requires: `/home/user/fleet/brief/src/core/types.ts:425` `Input to createBriefCompiler.` to `Represents the input to createBriefCompiler.`, and the same at `/home/user/fleet/brief/src/core/types.ts:489`. No quantifier was added, no possessive moved (`/home/user/fleet/brief/src/core/types.ts:416` keeps `the BriefCompiler's push observation surface`), and no backtick token was altered.

One class of change deserves its reasoning on the record. The guard blocks at `/home/user/fleet/brief/src/core/validators.ts:40` and `:50`–`:157` moved from `` `true` when the value is X `` to `Checks whether the value is X`, which drops the backticked `true` and shifts the sentence from stating the return value to stating the action. That is the rule's own named verb (`.claude/rules/typescript.md:75-76` gives `Checks whether` as the canonical form), and no compliant sentence can retain the `` `true` when `` opener. The fact is not lost: each symbol is declared `Guard<T>`, so the boolean and its narrowing are carried by the type. Qualifiers survive intact — `empty included` at `:40`, `` `value` may be empty but stays one line `` at `:98`, `` `rank` a positive integer `` at `:91`. Meaning kept.

## 2. Verb is third person, `-s`, fits the symbol, and does not repeat the symbol's name — CONFIRMED

Every rewritten opener is third-person `-s` and each verb fits its symbol class, applied systematically rather than case by case: `Implements` for the two classes (`/home/user/fleet/brief/src/core/BriefCompiler.ts:42`, `/home/user/fleet/brief/src/core/BriefManager.ts:16`), `Creates` and `Builds` for factories and builders (`/home/user/fleet/brief/src/core/factories.ts:15,40`, `/home/user/fleet/brief/src/core/helpers.ts:37-266`), `Lists` for the collection-returning finders (`/home/user/fleet/brief/src/core/helpers.ts:471,491,536,583`) and the frozen literal arrays (`/home/user/fleet/brief/src/core/constants.ts:4,20,32,41`), `Holds` and `Matches` for scalar and pattern constants (`/home/user/fleet/brief/src/core/constants.ts:76,84,88,110`), `Names` for the closed unions (`/home/user/fleet/brief/src/core/types.ts:26,37,40,43,47`), `Represents` for record interfaces, `Records` for the four phase snapshots (`/home/user/fleet/brief/src/core/types.ts:290,303,311,319`), `Declares` for the contracts and event maps (`:416,472,482,497`), `Describes` for the shapes (`/home/user/fleet/brief/src/core/shapers.ts:19-137`), and `Checks whether` for every guard. `Computes` for a digest (`/home/user/fleet/brief/src/core/helpers.ts:714`), `Renders` for text producers (`:737,917,946`), and `Projects` for the four projections (`:609,1011,1153,1183`) each match what the function returns. No verb misdescribes its symbol.

I checked the name-repeat half by hand rather than by substring, because the near-misses are exactly the cases a substring check cannot see. `/home/user/fleet/brief/src/core/constants.ts:4` documents `TASK_OPERATIONS` as `Lists the TaskOperation values, frozen.`, `/home/user/fleet/brief/src/core/shapers.ts:25` documents `taskShape` as `Describes the Task shape — …`, and `/home/user/fleet/brief/src/core/validators.ts:53` documents `isTaskOperation` as `Checks whether the value is one of the TaskOperation literals.` In each the backticked token names a different exported symbol — the type the constant enumerates, the type the shape describes, the type the guard admits — and removing it would leave the sentence unable to say what the symbol is about. None is the self-reference the rule bars.

## 3. Boolean `@returns` reads `True if …; false otherwise` with the condition kept — CONFIRMED

`/home/user/fleet/brief/src/core/errors.ts:39` reads `@returns True if \`value\` is a \`BriefError\`; false otherwise.`, replacing `@returns \`true\` when \`value\` is a \`BriefError\`.` The condition is carried verbatim, including the `value` and `BriefError` tokens. It is the only boolean `@returns` in the package: a search for `@returns` across `/home/user/fleet/brief/src` returns 44 lines, and every other one describes a non-boolean return (`A fresh Task`, `An eight-hex-digit digest`, `The markdown prompt`, and so on). No other `@returns` needed the form and none was touched.

## 4. Already-compliant sentences untouched; no `@example`, `@param`, `@remarks`, `@throws`, or later sentence moved — CONFIRMED

Every `-` line in the diff is a non-compliant opener: an imperative (`Create`, `Build`, `Narrow`, `Freeze`, `Render`, `Project`, `Derive`, `Parse`, `Count`, `Compile`, `Return`), a bare noun phrase (`The compilation orchestrator`, `One ranked outcome`, `A visible marker`, `Input to createBriefManager`), or a `` `true` when `` opener. Not one already carried a third-person `-s` verb. The two blocks the writer reports as already compliant are byte-identical in the tree and absent from the diff: `/home/user/fleet/brief/src/core/cloners.ts:7` `Captures one stable, frozen view of a foreign contract value.` and `/home/user/fleet/brief/src/core/helpers.ts:1252` `Derives a \`Task\` from an interprets \`Intent\` through the caller's vocabularies.` I confirmed the hunk whose header names `export function deriveTask(` changes the block belonging to `deriveGivens`, not to `deriveTask`, and that `/home/user/fleet/brief/src/core/helpers.ts:1227` belongs to `deriveStatement` at `:1244`.

The only changed tag line in the whole diff is the `@returns` at `/home/user/fleet/brief/src/core/errors.ts:39`, which claim 3 mandates and claim 4's list excludes. Every other changed line is a block's first sentence. No `@example` fence, `@param`, `@remarks`, `@throws`, or later sentence appears as a `-`/`+` pair anywhere in the diff, and no non-comment token changed.

Findings outside the claims:

## Required changes

**1. Five single-line doc comments now overrun the package's 100-column width, where their predecessors fit.**

`/home/user/fleet/brief/.oxfmtrc.json:7` sets `printWidth` to 100. The formatter does not reflow comment text, so `format:check` stays green and no gate catches this; a reader does. These five lines now run past 100 columns (confirmed by a `^.{101,}$` search over `/home/user/fleet/brief/src`, which returns them alongside six pre-existing over-width lines this unit did not touch):

- `/home/user/fleet/brief/src/core/types.ts:129` — `/** Represents one context fact handed to the executor — a convention, a version, a constraint value. */` (the predecessor was about 92 columns)
- `/home/user/fleet/brief/src/core/validators.ts:65` — `/** Checks whether the value is a well-formed \`Task\` — both vocabularies closed, statement one line. */` (predecessor exactly 100)
- `/home/user/fleet/brief/src/core/validators.ts:72` — `/** Checks whether the value is a well-formed \`Reference\` — both members required, both single-line. */` (predecessor exactly 100)
- `/home/user/fleet/brief/src/core/shapers.ts:25` — `/** Describes the \`Task\` shape — closed operation and domain vocabularies plus a non-empty statement. */` (predecessor about 94)
- `/home/user/fleet/brief/src/core/shapers.ts:95` — `/** Describes the \`Gap\` shape — an unknown, whether it blocks, and the candidates that would close it. */` (predecessor about 94)

Why it matters: the verb the wave adds is a fixed cost of the migration, and five sentences the package could previously read as one tidy line now hang past the width every neighbouring line respects. That is the wave paying for voice with legibility, in a package whose plainness is its selling point.

What right looks like: convert exactly those five to the multi-line block form, which carries the identical sentence inside the width and matches the form the same files already use for longer descriptions — for example

```
/**
 * Describes the `Task` shape — closed operation and domain vocabularies plus a non-empty statement.
 */
```

Change no word of the sentence; this is a wrapping change only, and it stays inside the unit's owned scope (TSDoc text under `src/**`).

**2. `/home/user/fleet/brief/src/core/errors.ts:4` describes the declaration rather than the symbol.**

The line reads `Represents the one error class this package throws.` `BriefError` *is* that class; it does not represent a class. The two sibling class blocks got this right by choosing a verb that acts on the noun they carry — `/home/user/fleet/brief/src/core/BriefCompiler.ts:42` `Implements the compilation orchestrator`, `/home/user/fleet/brief/src/core/BriefManager.ts:16` `Implements the self-owning … registry`.

Why it matters: this is the block a consumer reads first when a throw reaches them, and the mention-level phrasing puts one needless layer between the reader and the fact.

What right looks like: `Defines the one error class this package throws.` One word, no other change, and the `@remarks` and `@example` stay as they are.

**3. `/home/user/fleet/brief/src/core/types.ts:73` is the file's single verb one-off.**

`Task` opens `States what the brief asks for, in one imperative sentence.` Every other record interface in the same file took `Represents` — `Reference` at `:85`, `Manifest` at `:104`, `Outcome` at `:118`, `Given` at `:129`, `Example` at `:136`, `Citation` at `:144`, `Gap` at `:180`, `Risk` at `:193`, `Output` at `:201`, `Proof` at `:214`, `Brief` at `:225`.

Why it matters: `AGENTS.md` § Design laws fixes one concept to one term. The rest of this sweep is impressively systematic — one verb per symbol class, applied without drift — and a reader scanning `types.ts` sees a single row break the pattern and looks for the distinction it signals. There is none: `Task` is a record interface like its neighbours.

What right looks like: `Represents what the brief asks for, in one imperative sentence.`

## Observations, no change requested

**4. `/home/user/fleet/brief/src/core/constants.ts:100` breaks the pattern its two siblings hold, and the mandate is why.** `LINE_BREAK_PATTERN` at `:88` and `BLANK_PATTERN` at `:110` both open `Matches …`; `SINGLE_LINE_PATTERN` at `:100` opens `Holds the positive form of {@link LINE_BREAK_PATTERN}, for the shape DSL.` `Holds` is a legitimate constant verb and the sentence is about a relationship rather than a match, so `Matches` cannot be substituted without rewriting the clause — which the wave's "change the first sentence, keep its meaning" mandate forbids. I record the inconsistency rather than demanding a fix; closing it is the Orchestrator's call about whether the wave's exit criterion reaches a sentence rewrite.

**5. The writer's name-repeat evidence is weaker than the report states.** `/home/user/scaffold/tmp/units/voice/voice-brief-report.md:16-17` reports "a scripted pre-check over every block's declaration name found no first sentence containing its own symbol's identifier", concluding the rewording bucket is empty rather than unswept. That check is a literal identifier substring match, and the only real candidates in this package are the spaced and re-cased variants it cannot see: `taskShape` against "the `Task` shape", `TASK_OPERATIONS` against "the `TaskOperation` values", `isTaskOperation` against "the `TaskOperation` literals". I read those by hand and ruled each not a repeat, so the conclusion holds; the instrument behind it does not establish it. Treat the zero as read-confirmed, not machine-confirmed, if it is carried into the campaign record.

## Referral to the Orchestrator (outside this unit's scope)

**6. The package's guide keeps the noun-phrase voice the TSDoc just left.** `/home/user/fleet/brief/guides/brief.md:119` describes `BriefCompilerInterface` as "The compilation orchestrator contract — …", `:618` describes `BriefCompiler` as "The compilation orchestrator — …", `:619` describes `BriefManager` as "The self-owning, versioned and content-hashed brief registry — …", and `:109` describes `Dispatch` in the same register. The TSDoc for those same symbols now reads `Declares the compilation orchestrator contract.`, `Implements the compilation orchestrator …`, `Implements the self-owning … registry.`, and `Represents the subagent projection of a brief.` The guide is off-limits to this unit by both the shared wave brief and the unit brief, so this is not the unit's defect and I raise no verdict on it. The decision is yours: the guide's surface tables are a catalog register and `.claude/rules/typescript.md:75-76` governs TSDoc first sentences only, so excluding them is defensible — but after this wave the package documents the same symbols in two voices, and that should be a recorded exclusion rather than a leftover.

## Checker lane (FAIL 2)

Claim 1 CONFIRMED — every diff hunk touches comment lines only (spot-checked across all files in voice-brief.diff). Claim 2 BROKEN — src/core/validators.ts drops the backticked `true` token in ~18 doc-block openers ("`true` when the value is..." → "Checks whether the value is...") that are not @returns lines and do not repeat the symbol's own identifier, so neither stated exception covers them (e.g. validators.ts:946-947, 955-956, 1000-1001, 1016-1018, 1026-1027, 1034-1035, 1043-1044, 1051-1052, 1060-1061). Claim 3 CONFIRMED — voice-brief.status:1-11 lists only src/core/*.ts paths. Claim 4 CONFIRMED — grep hits at types.ts:147, types.ts:184, helpers.ts:390 are inside @remarks paragraphs, not first-line openers; no genuine first-line hit; app/ does not exist. Claim 5 CONFIRMED — report quotes each gate command with exit code 0 (report.md:45-51), meeting the claim's literal quoting requirement.

Findings outside the claims:

The validators.ts backtick-`true`-drop pattern (claim 2) is systematic (~18 instances) rather than isolated, and is the only category of token drift in the diff falling outside the two named exceptions. It matters because claim 2 exists to catch exactly this kind of silent token drift in an otherwise comment-only sweep. Right looks like either: the exception list in future audits explicitly covers a Guard constant's boolean-summary opener the way it covers @returns lines, or the rewrite preserves the backtick `true` token (e.g. "Checks whether the value is a `true`... " is awkward, so more likely the exception list should be extended) — this is a judgment call for the subjective/objective lanes, not a mechanical ruling this checker can make.

## Orchestrator

Subjective PASS. Checker claim 2 broke on the backticked `true` dropped by the guard constants' boolean-summary openers (`\`true\` when the value is …` → `Checks whether the value is …`), the rule's own example form; ruled a brief defect and carved out of every pending checker brief. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
