# Audit A4g — close the U4j round and the U4 chain (`@orkestrel/mcp` browser face)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote the chain). Do not attempt a browser run; name each
  unexecuted vector as `UNRESOLVED` with its exact command and read the Orchestrator's logs under
  Review evidence — every file is staged beside this brief in `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane — your A4f findings (5A, 5B,
  F5–F8, R4, R5) against what U4j landed; the prune-last ruling's prose; `#pendingManager`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4j carrier closed at
  the `file:line` the report names; the red readings; scope; the probe; the chain walk (claim 8).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (`.txt`
suffixed where noted; the Astra lane reads the staged copies) and the mcp tree at
`C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing. This round
closes the chain: rule on every claim and name any remaining defect with its vector, or state the
chain is closed.

## Subject

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → U4c → U4d → U4f → U4g
→ U4h → U4i → U4j. U4j's brief is `U4j-mcp-browser-fix-brief.md`; its report
`U4j-mcp-browser-report.md`. Previous round: `A4f-audit-analyst.md` (V1), `A4f-audit-reviewer.md`
(5A, 5B, F5–F8, R4–R6), `A4f-audit-checker.md`; the Orchestrator's probe `P14-a4f-probe.md`
(V1a–c reproduced; the two writer-only controls reproduced).

## Review evidence

- `A4g-u4j-only.patch` — the U4j delta (4 files, +198/−60); `A4f-u4i-only.patch` — the U4i delta;
  `A4g-diff.patch` — the whole chain.
- `U4j-mcp-gates-orchestrator.log.txt`, `U4j-mcp-gates-test-full.log.txt` — the Orchestrator's
  authoritative gates after U4j.
- `collide3-mcp-after-u4j.txt` — the collision probe (`collisions: none`).
- The U4j report's red readings, the carrier 4 ruling, and the `#prune` control.

## Numbered falsifiable claims

1. **Coalescing respects publication order.** `publish` clears `#pendingManager` as it queues; a
   queued synchronisation covers the events before the next queued publication and none after it;
   V1a, V1b, V1c are pinned red→green and V1d holds. Walk the space once more ({event before /
   after a queued same-manager publish; another manager's publish; a suspended registration;
   destroy}) and name any cell that still drops or double-applies an event.
2. **Prune-last is one rule and correct.** `#sync` and `#publish` both reconcile then prune; the
   `toolchange`-order pin (`registers what a change added before it releases what the change
   removed`) reddened under the old order; the failure-path consequence (a reconcile that throws
   leaves the prune unrun) is stated in the `#prune` comment and not pinned — rule whether it needs
   a pin (a registry that refuses `registerTool`) or whether the comment suffices.
3. **The unprojectable-replacement release is right and stated**: the sync releases a registered
   name whose tool became unprojectable; pinned (`releases a registered name the manager replaced
   with a tool WebMCP cannot carry`, green first, control-proved); `guides/mcp.md`, the class
   remarks, and the `publish` TSDoc say so; `describeWebMCPTool` is the consumer's diagnostic.
4. **The prose is exact** (reviewer 5A, 5B, F5, F6): the equal-descriptor remark names its
   manager; the helpers-table introduction is one sentence; the paragraphs are wrapped to their
   file's width; the follow paragraph carries the publication-order rule; the reconcile paragraph
   carries the prune order.
5. **`#pendingManager` and `#prune`'s comment (F7, F8)**: the rule citation holds (a two-word
   private field is in rule; the identifier and its comment use one word for the operation).
6. **Nothing else moved; nothing re-implements an installed export**: four files; probe clean.
7. **The mutation controls are reproduced** (P14: the boolean coalescing; the synchronous
   teardown) — the Orchestrator's readings close A4f checker 2 and 8.
8. **The chain is whole.** Every FAIL from A4 through A4f names a closing test, a landed change,
   or a recorded ruling (P9, P11, P12, P13, P13b, P14; the A4d-O ruling on the generation
   exemption; the recorder follow-up recorded as nonblocking).
9. **Ship it as mcp 0.0.31** for U4e and U5b? Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence; findings outside the claims under `outside:` (or `outside:
none — chain closed`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
Nothing else.
