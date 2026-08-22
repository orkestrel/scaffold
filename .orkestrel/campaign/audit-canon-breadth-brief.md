# Audit canon-breadth: the strategy-switch canon

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform this audit directly and spawn
nothing. The edits were written by Claude Opus 5 from an Orchestrator brief; you are the
engine that wrote neither. Read-only `git diff` and `git status` are yours.

## Subject and evidence

A process-canon change and the edits that land it. The subject occupies the proposal row
and the code-change row of the evidence table, so both evidence sets apply:

- The proposal's motivation record: `.orkestrel/campaign/unit-canon-breadth-brief.md`
  (the ruling section quotes the user's diagnosis and the campaign evidence).
- The diff: `git diff -- .claude/rules/quality.md .agents/orchestration.md
  .agents/skills/orkestrel-falsify/SKILL.md` against HEAD.
- The canon it must satisfy: `AGENTS.md` § Writing and § Instruction files,
  `.claude/rules/writing.md`, and the untouched neighbours in each edited file.

The ruling being landed: the three-round seam budget stays, and its expiry becomes a
strategy signal instead of a bare stop. At the budget, the Orchestrator names what the
audit is trying to accomplish and switches by the recurrence's shape: a directional
recurrence (the class relocates along one stream) gets one parallel breadth round that
probes the stream's stations to locate the source, then plans downstream from it; a
directionless recurrence keeps the existing design-ruling prescription; a subject that
reprices itself on every edit (a count or census of prose) is dropped or recast as the
property the tally stood in for.

## Claims, each falsifiable

1. **One home per rule.** After the edits, the budget law's full statement exists only
   in `.claude/rules/quality.md` § Rounds and verdicts; `.agents/orchestration.md`
   carries only the operational breadth move and a naming reference to the law;
   `.agents/skills/orkestrel-falsify/SKILL.md` carries only a pointer; no passage
   restates another home's substance in a way that can drift, and no other file in the
   repository states the budget (sweep for it and name the sweep's scope).
2. **The switch is total over its cases.** Each recurrence shape — directional,
   directionless, moving-target — has an observable trigger an executing agent can
   recognise and a named action; no shape falls through to an unstated default, and the
   deep rounds still run before the signal can fire.
3. **No contradiction.** The edited passages agree with their untouched neighbours: the
   frame bullet and the lens fan-out bullet in orchestration, the matrix-row and
   ruling-shape bullets in quality, the successor-round and something-new-to-attack
   rules in the falsify skill, and the no-count law in `AGENTS.md` § Writing. Name any
   sentence a neighbour now falsifies.
4. **Style conformance.** Every added or changed line satisfies
   `AGENTS.md` § Instruction files and `.claude/rules/writing.md`: directives with
   observable triggers, no persuasion clauses, no narrative of how the rule was found,
   no banned substitution-table hit in a banned sense, spaced em dashes, no count
   outside a stated limit.
5. **Intent fidelity.** The landed text preserves the motivating diagnosis: the switch
   replaces a hard stop with a strategy change at the same threshold; the breadth round
   exists to find the source and produce a measured bound on the remaining work; nothing
   landed weakens the budget itself or licenses unbounded further rounds.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence, then
findings outside the claims in their own section. Write the final answer as the last
message. End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
