# Unit docs-proposal-audit — falsify `PROPOSAL.md`

## Role and lane

Three blind lanes read this one brief:

- Subjective lane: `reviewer` on Opus 5 — design fit, voice, whether the document reads as one decision an owner can act on, whether each option's worked example and mechanism cohere.
- Objective lane: `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench — pointer truth, version truth, constraint conformance, tautology honesty in the check tables, cost-model honesty.
- `checker` on Sonnet, in addition and never in place of a lane — mechanical conformance to the writing rules and the outline.

Each lane performs the assignment directly, spawns nothing, writes no file, and runs no command. Each returns per-claim verdicts with evidence and exactly one terminal line.

## Subject

`/home/user/scaffold/PROPOSAL.md`, written by `implementer` on Opus 5 from `tmp/units/docs-proposal-brief.md` under the rulings in `tmp/units/docs-reconciliation.md`. Review evidence for a proposal is the document itself plus the records it rests on; read the file directly. The writer's returned report is at `tmp/units/docs-proposal-report.md`.

## What the round decides

Whether `PROPOSAL.md` can land on `main` as the owner's decision document: every ruling presented as ruled, every pointer true, every check ruling honest, every writing rule met.

## Already established

- The Orchestrator ran `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` (result recorded in `tmp/units/docs-proposal-format.txt`); a lane does not re-run it.
- The rulings R1 to R10 in `tmp/units/docs-reconciliation.md` are the Orchestrator's and are not under audit; whether the document presents them faithfully is.

## Claims

Attack each claim; default to refuting it where the evidence is thin.

1. Every `file:line` pointer in `PROPOSAL.md` resolves to text that says what the sentence citing it says. (Objective; checker samples every pointer into `guides/scaffold.md`, `src/core/types.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/server/Materializer.ts`, `src/core/constants.ts`, `tests/guides.test.ts`, `configs/policy.ts`, `.claude/rules/*.md`.)
2. Every version and measurement in the document matches the distillates: typescript 6.0.3, oxlint 1.80.0, oxfmt 0.65.0, api-extractor 7.59.0, tsdoc 0.16.0 transitive, api-extractor-model 7.33.11 transitive, TypeDoc 0.28.20, api-documenter 7.30.13, `@orkestrel/guide` `^0.0.17`; the rollup counts 202/129/87/77; the `oxfmt --check .` reading of 221 files with `ROADMAP.md` red. (Objective.)
3. Each option's Checks block rules on SB, MB, LI, TE, NV, FL, EX, FI, and the executed fences individually, and no check the option generates one side of is reported as surviving with force. (Objective.)
4. Each option's Edit cost block lists files before and after for every one of the five change kinds and names the catching check or `none`; a relocated site is not counted as removed. (Objective.)
5. The rulings R1 to R10 are each presented as ruled, in the sections the writer's report names, and no option contradicts a ruling without flagging it as a refused alternative. (Objective and subjective.)
6. The document states no count in prose: no numeral tallying rules, rows, options, files, checks, commits, stages, or packages outside a table cell or a measurement quoted with its command. (Checker: sweep for a numeral followed by a plural noun and for the words `both`, `two`, `three`, `four`, `five`, `several`; rule each hit.)
7. No substitution-table term appears in a banned sense: `should`, `simply`, `easy`, `just`, `currently`, `now`, `new`/`latest` as a date, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, causal `since`, temporal `once`, `please`; and no `above`/`below` as a pointer. (Checker: case-insensitive, across inflections, ruling each hit by its sense; a hit inside a code fence or backticks is data.)
8. Every heading is sentence case; every list, table, and fence is introduced by a complete sentence; a backticked token is followed by a noun; `must`/`can`/`might` carry requirement, option, and possibility. (Checker.)
9. The worked examples quote the real TSDoc and the real guide passages verbatim where they claim to, and the generated passages they show follow from the mechanism as described (R1's verbatim first sentence with `{@link X}` as code). (Subjective and objective.)
10. The document leads with the decision, an owner can act on it without asking a follow-up question, and the recommendation's order and the three decisions the owner must take now are explicit. (Subjective.)
11. The Refused section gives one reason with a pointer for each refusal, and the Probes section gives a command or a comparison for each probe. (Checker.)
12. The Humans and agents sections answer the owner's question — one artifact for both readers, the voice law stated once and enforced, the entry point for an agent — rather than restating the conventions. (Subjective.)

## Unknowns

- Whether a pointer that moved after the writer read it exists: the tree is at the same commit for the writer and the lanes, so none is expected; report one if found.

## Threshold

The document lands when claims 1 to 9 and 11 hold and any failure under 10 or 12 is a wording fix the fix round can take. A failed pointer, a misreported check fate, a count in prose, or a banned-sense term is a fix-round item, never a wording note.

## Output

Return per-claim verdicts in the `orkestrel-falsify` shape: for each claim, `PASS` or `FAIL` with the evidence (a quote and its line in `PROPOSAL.md`, and the pointer it was checked against), then a list of findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <claim ids that failed>; outside the claims: <ids or none>`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.
