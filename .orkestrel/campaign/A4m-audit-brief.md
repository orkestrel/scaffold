# Audit A4m — the U4e-f shape round (`@orkestrel/mcp` subscription stream)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  the OBJECTIVE lane and the cross-engine auditor of a fix Opus 5 wrote. Do not attempt a Vitest
  run (the read-only sandbox refuses Vite's temporary file); name each unexecuted vector as
  `UNRESOLVED` with its exact command and read the Orchestrator's logs under Review evidence —
  every file is staged beside this brief in `tmp/codex/`. Runtime checks through plain `node`
  scripts against the built `dist/` are yours to take where they settle a claim.
- `checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane — every carrier closed at
  the `file:line` the report names; the red readings; the searches; scope; the gates.

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the
mcp tree at `C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing.
This round closes the server chain: rule on every claim and name any remaining defect with its
vector, or state the chain is closed.

## Subject

The `mcp` checkout at commit `7959f08` plus the working tree after U4e … U4e-e and U4e-f. Brief:
`U4e-f-mcp-shape-brief.md`; report: `U4e-f-mcp-shape-report.md`; the findings it carries:
`A4l-audit-reviewer.md` (F1–F3, the recommended items, the release-reason carry-forward); the
previous verdicts `A4l-audit-checker.md`, `A4k-audit-analyst.md`; the round record
`U4-chain-audit-verdict.md`.

## Review evidence

- `A4m-u4e-f-only.patch` — U4e-f's delta; `A4m-whole.patch` — the whole U4e chain against
  `7959f08`; `A4l-u4e-e-only.patch` for what U4e-e itself landed.
- `U4e-f-mcp-gates-orchestrator.log.txt`, `U4e-f-mcp-gates-test-full.log.txt` — the
  Orchestrator's authoritative gates after U4e-f; `collide3-mcp-after-u4e-f.txt`.
- `P20-a4k-probe.md` / `P20-a4l-replay.md` — the objective vectors of the previous rounds, red
  then green on the host (unchanged by this round; re-read only if claim 4 needs them).

## Numbered falsifiable claims

1. **The refusal message covers both causes** (F2): the `MCPError` at `createMCPServer` names a
   malformed or missing consumer filter and a tools claim alike, in the package's voice; the
   refusal pin carries the malformed case with the same code and class; the guide and the TSDoc
   describe the refusal the same way.
2. **The Shape cell is a type shape** (F3): `MCPSubscriptionFilter plus { toolsListChanged?: false }`.
3. **The setup test block sits with its siblings** (F1): the module constants of
   `tests/setup.test.ts` are contiguous and the block opens the describe sequence.
4. **One state record per subscription**: the three at-most-one collections are gone; one mutable
   per-subscription record with `frame`, `failure`, and `iterator` members, each `X | undefined`,
   is built in `#subscription` and passed as one parameter; no behaviour changed — every U4e-e pin
   is green unchanged, and the pull, the failure ordering, the coalescing, and the
   destroyed-registry rulings still hold in the code as A4l confirmed them. Name any state the
   record fails to carry, or any reading of it that a concurrent registry event or abort can
   corrupt, with its vector. Rule on the two decisions the report flags: (a) `MCPSubscriptionState`
   is a published type with writable members because the `policy` rules refuse an interface
   outside `types.ts` and a non-exported one there — is a published mutable record the right
   shape against `AGENTS.md` § Non-negotiable rules ("interface properties readonly") and
   § Minimal public API, or does a narrower form exist that the policy admits (name it with its
   cost); (b) a producer that throws a literal `undefined` now closes gracefully rather than
   with the `-32603` terminal — is that reading right under "absence is `undefined`", and does
   any consumer-visible contract promise otherwise.
5. **The release reason**: both release sites pass `options.signal.reason` through
   `#releaseProducer` to `iterator.return`; `MCPSubscriptionHandler`'s `@remarks` states it; the
   pin `releases the consumer producer with the stream's abort reason` shows a `TransformStream`
   producer's pending write rejecting with the exact reason, red first against `undefined`.
6. **Guide precision and duplication**: the coalescing sentence reads as the brief's carrier 6
   prescribes and appears once; the rewrapped paragraphs fill their lines.
7. **Names and comments**: `createProducerScript` and `ProducerScriptOptions` replace the
   `SubscriptionScript` names everywhere with the extended `@remarks`; the refusal literal and
   the `!emitter.destroyed` condition carry their one-line comments; the inserted import names
   are sorted with their blocks.
8. **Nothing else moved**: only the owned files beyond the fifteen U4e … U4e-e files; no
   `src/browser/**`, `src/server/**`, browser or server test, `MCPClient.test.ts`, or
   `tests/guides.test.ts` hunk; the collision probe clean; `git diff --check` clean; every gate
   step exit 0; no `any`, assertion, nested function, or default export in the source hunks.
9. **The chain is closed.** Every FAIL from A4k and A4l names a closing change, pin, probe, or
   recorded ruling (P20 and its replay; the A4k analyst 2 and 7; the A4k reviewer R1–R14 and its
   two referrals; the A4l reviewer F1–F3, its recommended items, and the release reason).
10. **Ship it toward mcp 0.0.31** with U14e and U5c next? Name what must change first if not,
    with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; findings outside the
claims under `outside:` (or `outside: none — chain closed`); ONE terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>`. Nothing else.
