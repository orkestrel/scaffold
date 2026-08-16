# Unit D2 — carry the A-campaign's retained findings into the supervisor roadmap

Role: `builder`. Engine: native cheap tier. Sole writer in `/workspace/supervisor`.
Perform the assignment directly and spawn nothing.

## Objective

Update `/workspace/supervisor/ROADMAP.md` — and only that file — so the "Open, recorded
rather than improvised" list carries the A-campaign's retained findings and drops its one
satisfied row.

## Context

ROADMAP.md's header law: "this file holds only work that has not happened yet", so a
satisfied row is removed, not annotated. Match the existing rows' voice: bold lead, one
to three sentences, evidence pointer in parentheses.

## The edits

Add six rows to the "Open, recorded rather than improvised" list:

1. **Agent-lane settlement observation** — the ollama agent executor records activity
   only: no transcript frames and no settlement observation, so the settlement card
   renders only on CLI lanes. Whether the agent executor should emit a settlement
   observation like the CLI executors is a design round, not a defect. (A-campaign
   debrief; scaffold record at 278f3e0, a11-refilm-record.)
2. **Surrogate-pair cut in settlement voice** — `Failed:`/`Quarantined:` strings are
   bounded at the card, but the cut can split a surrogate pair; travels with the
   bounded-voices change. (Same record, a7-audit-verdict.)
3. **S7 — live-stream-based deadline proof** — the agent-deadline proof polls the
   snapshot under a raised `APP_LIMIT`; a live-stream-based proof would not need the
   raised limit. (Same record, a10-review-verdict.)
4. **S3 — keep duration grammar** — `APP_AGENT_KEEP` passes through to the provider
   unvalidated; decide whether policy validates the duration grammar or documents the
   pass-through. (Same record, a10-review-verdict.)
5. **settled/FINISHED fixture consolidation** — the duplicated fixture shape awaits its
   consolidation micro. (Same record, a7-audit-brief.)
6. **Contrast reading for the settled state** — add the settled-state reading to
   `contrast.test.ts`. (Same record, a8-report.)

Remove one satisfied row: "**The Sol implementer is still a route**, not a named role
file, while its Codex mirror has a named `opus` bridge…" — the canon closed it:
`.claude/agents/sol.md` exists and the shared transport contract lives in
`.claude/agents/codex.md`, bound by reference from both `analyst` and `sol`.

Leave every other row untouched, including the CLAUDE.md-sentence row.

## Scope

Owned: `/workspace/supervisor/ROADMAP.md`. Off-limits: everything else. No commits, no
pushes, no installs, no gates.

## Deviation contract

If the satisfied row's text does not match, or the list heading is absent, stop and
report expected/found. Row order within the list is yours.

## Output

The exact diff of ROADMAP.md and nothing else.
