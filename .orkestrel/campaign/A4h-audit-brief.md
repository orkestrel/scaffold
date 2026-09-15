# Audit A4h — close the U4k round and the U4 chain (`@orkestrel/mcp` browser face)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote the chain). Do not attempt a browser run; name each
  unexecuted vector as `UNRESOLVED` with its exact command and read the Orchestrator's logs under
  Review evidence — every file is staged beside this brief in `tmp/codex/`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4k carrier closed at
  the `file:line` the report names; the red readings; scope; the probe; the chain walk (claim 7).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (`.txt`
suffixed where noted; the Astra lane reads the staged copies) and the mcp tree at
`C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing. This round
closes the chain: rule on every claim and name any remaining defect with its vector, or state the
chain is closed. The subjective lane ran at A4g and its items are the subject here; it is not
re-run (recorded in `U4-chain-audit-verdict.md`).

## Subject

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → … → U4j → U4k. U4k's
brief is `U4k-mcp-browser-fix-brief.md`; its report `U4k-mcp-browser-report.md`. Previous round:
`A4g-audit-analyst.md` (`FAIL 2, 3, 4, 9`), `A4g-audit-reviewer.md` (`PASS`; F9–F12, R7–R9),
`A4g-audit-checker.md`; the Orchestrator's probe `P16-a4g-probe.md` (both U4j controls
reproduced) and the round record `U4-chain-audit-verdict.md`.

## Review evidence

- `A4h-u4k-only.patch` — the U4k delta; `A4g-u4j-only.patch` — the U4j delta; `A4h-diff.patch` —
  the whole chain.
- `U4k-mcp-gates-orchestrator.log.txt`, `U4k-mcp-gates-test-full.log.txt` — the Orchestrator's
  authoritative gates after U4k; `collide3-mcp-after-u4k.txt`.
- The U4k report's red readings and the fixture member it added.

## Numbered falsifiable claims

1. **The prune runs in `finally` in both `#sync` and `#publish`** (A4g-O 2, A4g-R R7): a batch
   that fails partway releases the names the manager dropped while the names the batch carries stay
   protected by `kept`; a publication still rejects its caller; a followed change's failure is still
   contained by the queue; the `#destroyed` read keeps the prune's synchronous aborts safe.
2. **The failure path is pinned**: the fixture double's refusal member; `releases what the
   manager dropped when a registration fails` red against reconcile-then-prune and green against
   `finally`; recovery shown.
3. **The skip and diagnostic sentences are exact** (A4g-O 4, A4g-R F10): the `change` recorder on
   the replacement pin shows the release of a REGISTERED name reports a `change` and the skip of a
   NEW name reports none; the prose says exactly that; `describeWebMCPTool` is described as
   answering `undefined` for a name `definitions()` still lists — never as naming the tool.
4. **The `#prune` comment states the rule with its noun** (F9); `types.ts` says "releases" (F11);
   `destroy` clears `#pendingManager` (F12).
5. **Nothing else moved; nothing re-implements an installed export**: the owned files only; the
   probe clean.
6. **The U4j controls are reproduced** (P16) — closes A4g-O 3.
7. **The chain is whole.** Every FAIL from A4 through A4g names a closing test, a landed change, or
   a recorded ruling (P9, P11, P12, P13/P13b, P14, P16; the A4d-O generation ruling; the
   nonblocking recorder follow-up; R8 carried to a design round).
8. **Ship it as mcp 0.0.31** for U4e and U5b? Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; findings outside the
claims under `outside:` (or `outside: none — chain closed`); ONE terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>`. Nothing else.
