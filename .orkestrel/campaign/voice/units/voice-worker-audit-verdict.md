# Audit verdict — unit voice-worker

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `5d1d6df`
(`units/voice-worker.diff`, `units/voice-worker.status`, `units/voice-worker-report.md`).
Rewritten per the writer: imperative 12, verbless 20, name 1, returns 1. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1, 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), Claude Opus 5, clean context, read-only. Sol bench dark; this lane ran on the writer's engine, as the brief states.

## 1. Meaning kept in every rewritten first sentence — BROKEN

Sampled every hunk in `/home/user/scaffold/tmp/units/voice/voice-worker.diff`. Most rewrites are clean inflections that keep the action, subject, and qualifiers (`src/core/factories.ts:5`, `src/server/factories.ts:10`, `src/server/factories.ts:47`, `src/server/handlers.ts:14`, `src/server/helpers.ts:17`, `src/server/helpers.ts:42`, `src/server/helpers.ts:80`, `src/core/types.ts:48`, `src/core/types.ts:67`, `src/core/types.ts:73`, `src/core/types.ts:98`, `src/core/types.ts:103`, `src/core/types.ts:109`, `src/core/types.ts:112`, `src/server/types.ts:6`, `src/server/types.ts:24`, `src/server/types.ts:47`, `src/server/types.ts:83`, and every `WorkerEventMap` member at `src/core/types.ts:24-36`). Four rewrites change what the sentence asserts.

- `/home/user/fleet/worker/src/core/Worker.ts:9` — `A resource-backed job worker — a thin facade composing a Queue ... with a Pool.` became `Runs resource-backed jobs — a thin facade composing a Queue ... with a Pool.` The appositive after the dash renamed the noun `worker`; with the noun gone it now renames `jobs`, so the sentence says the jobs are a thin facade. Nothing was dropped from the fact list, but the sentence's subject moved.
- `/home/user/fleet/worker/src/server/NodeWorker.ts:10` — `Internal composition entity backing {@link createNodeWorker}.` became `Backs {@link createNodeWorker} with an internal composition entity.` The class IS the internal composition entity (`export class NodeWorker` at `src/server/NodeWorker.ts:16`, absent from the barrel `src/server/index.ts:1-4`). The rewrite makes it a symbol that uses a separate entity. That inverts the original relationship.
- `/home/user/fleet/worker/src/server/Thread.ts:5` — same construction: `Internal mutable implementation of the readonly {@link NodeThread} observation contract.` became `Backs the readonly {@link NodeThread} observation contract with an internal mutable implementation.` `class Thread implements NodeThread` (`src/server/Thread.ts:13`) is that implementation, not a supplier of one.
- `/home/user/fleet/worker/src/server/Dispatch.ts:10` — `Internal lifecycle entity for one dispatched worker-thread job.` became `Manages the internal lifecycle of one dispatched worker-thread job.` `internal` qualified the entity, marking a class the barrel does not export; it now qualifies the job's lifecycle. The visibility marker a reader relied on is gone and a different claim stands in its place.

Lesser, same claim: `/home/user/fleet/worker/src/core/types.ts:95` — `Re-enqueue outstanding entries loaded from the store` became `Loads outstanding entries from the store and re-enqueues them`. Loading was a subordinate participle; it is now a co-asserted action. The behaviour supports it, but a simple inflection (`Re-enqueues outstanding entries loaded from the store`) was available and the wave's transform asked for no more.

## 2. Verb fits the symbol and the symbol's name goes — BROKEN

Verb fit is right in almost every block, including the choice of `Fires when …` for the `WorkerEventMap` members (`src/core/types.ts:24-36`), which suits an event key better than `Holds` and keeps each payload clause intact. Two failures.

- Verb misdescribes the symbol: `/home/user/fleet/worker/src/server/NodeWorker.ts:10` and `/home/user/fleet/worker/src/server/Thread.ts:5`, per the citations under claim 1. `Backs X with Y` names the symbol as the agent and Y as its instrument, and Y is the symbol.
- Name repetition applied inconsistently: `/home/user/fleet/worker/src/core/Worker.ts:9` drops `worker` from the `Worker` class doc, while `/home/user/fleet/worker/src/core/types.ts:79` rewrites the `WorkerInterface` doc and keeps it — `Represents a resource-backed job worker`. Two rewritten sentences in one unit take opposite rulings on the same constraint, and the one that dropped the noun is the one that acquired the dangling appositive.

## 3. Boolean `@returns` reads `True if …; false otherwise` with the condition kept — CONFIRMED

`/home/user/fleet/worker/src/server/helpers.ts:90` reads `@returns True if the value is this job's well-formed reply; false otherwise`, from `` @returns `true` when the value is this job's well-formed reply ``. The condition is unchanged. `isReply` (`src/server/helpers.ts:92`) is the only boolean-returning exported symbol under `src/`; no other boolean `@returns` exists to migrate.

## 4. No compliant sentence rewritten, and no other tag or later sentence touched — CONFIRMED

- Every rewritten sentence was imperative (`Create`, `Register`, `Spawn`, `Dispatch`, `Narrow`, `Re-enqueue`, `Stop`, `Cancel`, `Drop`, `Tear down`) or a bare noun phrase in the launch tree; none already opened with a third-person `-s` verb. The one block that already complied, `/home/user/fleet/worker/src/core/types.ts:40` (`Runs one worker job with a leased pool resource.`), is untouched.
- Every hunk edits a first sentence only. The single non-first-sentence edit is the boolean `@returns` at `src/server/helpers.ts:90`, which claim 3 sanctions. No `@example`, `@param`, `@remarks`, `@throws`, or later sentence appears in the diff, and `git status --short` lists only `src/` files.
- Coverage is complete: all doc blocks under `src/` now open with a third-person `-s` verb; none was missed.

Findings outside the claims:

## Findings outside the claims

**F1. The guide and the class doc now describe the flagship class differently.** `/home/user/fleet/worker/guides/worker.md:3` opens with `> A resource-backed job worker — a thin facade composing a [Queue](queue.md) (from ...` and `/home/user/fleet/worker/guides/worker.md:92` carries the Surface row `| Worker | class | A resource-backed job worker — a Queue composed with a Pool. |`. Both are the sentence `src/core/Worker.ts:9` just replaced. Why it matters: the guide is the package's self-contained human guide, and its tagline is now a quotation of a sentence that no longer exists in the source. The unit is not at fault — the wave brief puts `guides/**` off-limits (`/home/user/scaffold/tmp/units/voice/voice-worker-brief.md:65`) — but the wave leaves this divergence in every package it sweeps. What right looks like: a named carrier unit that re-reads each guide's tagline and Surface descriptions against the migrated TSDoc, or a recorded ruling that guide Surface rows keep the noun-phrase genre by design. Right now neither exists.

**F2. Line wrapping was repaired in one block and not in the others.** `/home/user/fleet/worker/src/server/Thread.ts:5-6` was rewrapped to two lines when the added verb pushed it over; `/home/user/fleet/worker/src/server/types.ts:6` (102 columns), `/home/user/fleet/worker/src/core/types.ts:28` (102), `/home/user/fleet/worker/src/core/types.ts:34` (102), and `/home/user/fleet/worker/src/core/types.ts:67` were left long against `printWidth: 100` in `/home/user/fleet/worker/.oxfmtrc.json:7`. Why it matters: it is a craft inconsistency inside one unit, not a rule break — unchanged lines such as `src/server/Dispatch.ts:16` already sit at 101, so the package tolerates slight comment overflow. What right looks like: rewrap the four lines the rewrite pushed over, the way `Thread.ts` was rewrapped, or leave all of them and record the ruling.

**F3. Event keys whose sentence still carries their own name — retained deliberately, recorded here rather than passed over.** `/home/user/fleet/worker/src/core/types.ts:28` (`retried` under key `retry`), `:30` (`successfully` under `success`), `:32` (`failure` under `failure`), `:34` (`aborted` under `abort`). I rule these permitted: each word is the domain action the event is named for, which is the pilot lesson the wave brief already records at `/home/user/scaffold/tmp/units/voice/voice-worker-brief.md:50-51`, and removing them would cost meaning. No change required; the record exists so the next audit does not re-open it.

## Required changes, re-dispatchable verbatim

1. `/home/user/fleet/worker/src/server/NodeWorker.ts:10` — change `with` to `as`: `Backs {@link createNodeWorker} as an internal composition entity.` One word restores the original relationship and keeps every noun.
2. `/home/user/fleet/worker/src/server/Thread.ts:5-6` — same fix: `Backs the readonly {@link NodeThread} observation contract as an internal mutable implementation.`
3. `/home/user/fleet/worker/src/server/Dispatch.ts:10` — put `internal` back on the entity: `Manages one dispatched worker-thread job's lifecycle as an internal entity.`
4. `/home/user/fleet/worker/src/core/types.ts:95` — use the minimal inflection: `Re-enqueues outstanding entries loaded from the store; no-op without a store.`
5. `/home/user/fleet/worker/src/core/Worker.ts:9` and `/home/user/fleet/worker/src/core/types.ts:79` — rule the name question once and apply it to both. Recommended, because it honours the wave's transform: drop the noun in both. Write `src/core/Worker.ts:9` as `Composes a Queue (@orkestrel/queue) with a Pool (@orkestrel/pool) into a thin facade that runs resource-backed jobs.` (keeping the existing backticks on the package specifiers), which also removes the dangling appositive, and write `src/core/types.ts:79` as `Represents the resource-backed job contract — a Queue whose handler runs against a pooled resource.` The alternative — keep `worker` in both as the package's domain term — costs the wave's own rule at the two most-read blocks in the package, so I do not recommend it.

## Referrals — outside my lane, addressed to the Orchestrator (Sol bench dark)

- **R1.** Confirm `npm run format:check` and `npm run check` are green with the four comment lines now over `printWidth: 100` (F2). I did not run a gate; oxfmt's comment-reflow behaviour is an objective question and my finding rests on the config value alone.
- **R2.** Confirm the acceptance instrument `instruments/voice-scan.mjs` classifies `Fires when …`, `Configures …`, `Holds …`, and `Backs …` as compliant openers before its re-run is read as acceptance evidence. The unit's coverage is complete by my reading of every block; whether the scanner agrees is mechanical and belongs to the checker.

## Checker lane (PASS)

Claim 1 CONFIRMED; Claim 2 CONFIRMED; Claim 3 CONFIRMED; Claim 4 CONFIRMED; Claim 5 CONFIRMED (on quoted evidence, Orchestrator's landing chain authoritative).

Findings outside the claims:

All five claims confirmed by direct evidence. The diff at /home/user/scaffold/tmp/units/voice/voice-worker.diff shows every hunk confined to /** */ or // comment lines; no code token, backtick, {@link}, or URL changed except the mandated boolean @returns rewrite at /home/user/fleet/worker/src/server/helpers.ts:90 (True if ...; false otherwise), which matches the rule's exception. The status file /home/user/scaffold/tmp/units/voice/voice-worker.status lists only src/core and src/server files. A raw grep sweep for imperative-opener and bad @returns patterns over /home/user/fleet/worker/src surfaced two lines (src/core/types.ts:15, src/core/Worker.ts:30) that are mid-paragraph @remarks continuation text, not first-line doc-block openers, so neither is a true violation; no app/ directory exists in the package. The report at /home/user/scaffold/tmp/units/voice/voice-worker-report.md:51-57 quotes exact command and exit code (0) for every gate. No findings outside the claims.

## Orchestrator

Subjective claims 1 and 2 broke on five sentences: the `Worker` summary whose verb left the appositive renaming the jobs, `Backs X with Y` on the two internal classes that are Y, the internal marker moved from the `Dispatch` entity onto the job's lifecycle, and a participle promoted to a co-asserted action. Ruled to `Represents …` forms that keep the noun and the internal marker, and to the plain inflection for the store sentence (fix-up brief `voice-worker-fixup-brief.md`, builder on Sonnet). The event-key sentences that carry their own domain action stand, as the lane ruled. Guide taglines quoting the pre-wave noun phrase are not drift (ruling in the findings file). Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
