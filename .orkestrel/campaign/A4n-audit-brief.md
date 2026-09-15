# Audit A4n — the U4e-g round closes the server chain (`@orkestrel/mcp` subscription stream)

## Role and lane

One brief, two blind lanes plus the Orchestrator's replay; state which lane you hold in your
first line.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): the SUBJECTIVE lane and the cross-engine
  auditor of a fix a GPT-6 Astra session wrote (U4e-g) — read the objective claims too, because
  this round runs no analyst lane and the objective vectors are replayed by the Orchestrator.
- `checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane — every carrier closed at
  the `file:line` the report names; the red readings; the searches; scope; the gates; the chain
  walk.
- The Orchestrator's probe P21 (`P21-a4n-probe.md`) replays the two A4m claim-4 vectors on the
  host after U4e-g.

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the
mcp tree at `C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing.
This round closes the server chain: rule on every claim and name any remaining defect with its
vector, or state the chain is closed.

## Subject

The `mcp` checkout at commit `7959f08` plus the working tree after U4e … U4e-g. Brief:
`U4e-g-mcp-failure-brief.md`; report: `U4e-g-mcp-failure-report.md`; the findings it carries:
`A4m-audit-analyst.md` (claims 4 and 7); the previous verdicts `A4m-audit-checker.md`,
`A4l-audit-reviewer.md`, `A4l-audit-checker.md`, `A4k-audit-analyst.md`, `A4k-audit-reviewer.md`;
the round record `U4-chain-audit-verdict.md`.

## Review evidence

- `A4n-u4e-g-only.patch` — U4e-g's delta (four files); `A4n-whole.patch` — the whole U4e chain
  against `7959f08` (fifteen files).
- `U4e-g-mcp-gates-orchestrator.log.txt`, `U4e-g-mcp-gates-test-full.log.txt` — the
  Orchestrator's authoritative gates after U4e-g; `collide3-mcp-after-u4e-g.txt`.
- `P21-a4n-probe.md` with `P21-a4n-probe.log.txt` — the two vectors green on the host; the unit's
  own logs `U4e-g-regressions-red.log.txt`, `U4e-g-regressions-green.log.txt`,
  `U4e-g-closure-control-red.log.txt`, `U4e-g-closure-control-green.log.txt`,
  `U4e-g-search.log.txt`, and `U4e-g-core-concurrent-failure.log.txt` (a load reading the unit
  recorded: the legacy-transport timeout test failed under a concurrent run and passed alone; the
  authoritative gates ran alone).

## Numbered falsifiable claims

1. **A caught value keeps its identity**: the failure is held as `{ readonly error: unknown } |
   undefined`, the generator rethrows `failure.error` after draining, and a producer that throws
   a literal `undefined` ends with the `-32603` terminal after its queued frame. Pin `terminates
   with the failure terminal when the producer throws undefined` red first; P21's identity
   reading shows the frame then the terminal.
2. **A closed stream refuses the registry's enqueue**: after a failure close, `#change` enqueues
   nothing; a registry `clear` throws nothing and the terminal arrives. Pin `ignores registry
   changes after the stream closed on a producer failure` for the `undefined` and `Error` cases,
   red first; the negative control (guard removed) red; P21's closure reading shows `clear` threw
   nothing.
3. **The state record is private**: `MCPSubscriptionState` appears nowhere under `src/**`,
   `tests/**`, `guides/**`; the record is an inline structural annotation at the private methods
   (`frame`, `failure`, `iterator`, each `X | undefined`); lint and typecheck admit it; no published
   interface carries a writable member.
4. **The two comments are one line each** and keep their rationale.
5. **Nothing else moved**: only the four owned files beyond the fifteen U4e … U4e-f files; no
   `src/browser/**`, `src/server/**`, browser or server test, `MCPClient.test.ts`, `tests/setup.ts`,
   `tests/setup.test.ts`, or `tests/guides.test.ts` hunk; the collision probe clean; `git diff
   --check` clean; every gate step exit 0; no `any`, assertion, nested function, or default export
   in the source hunks.
6. **The chain is closed.** Every FAIL from A4k, A4l, and A4m names a closing change, pin, probe,
   or recorded ruling (P20 and its replay, P21; A4k analyst 2 and 7; A4k reviewer R1–R14 and its
   two referrals; A4l reviewer F1–F3, its recommended items, the release reason; A4m analyst 4 and
   7).
7. **Ship it toward mcp 0.0.31** with U14e and U5c next? Name what must change first if not,
   with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; findings outside the
claims under `outside:` (each tagged required, recommended, or carry-forward; or `outside: none —
chain closed`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
