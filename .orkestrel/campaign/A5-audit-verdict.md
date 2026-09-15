# A5 — audit verdict (U5c, the mcp distribution receipts)

Round of 2026-09-15 on the mcp tree at `8d97dd0` plus U5c (uncommitted). Subject:
`A5-diff.patch.txt`, `U5c-mcp-distribution-report.md`, the Orchestrator's release-mode run
`A5-distribution-orchestrator.log.txt`, gates `U5c-mcp-gates-orchestrator.log.txt` /
`U5c-mcp-gates-test-full.log.txt`, the tail gates `A5-tail-gates.log.txt`. Brief: `A5-audit-brief.md`
(claims 1–13; 11–13 added before launch for the unit's recorded departures and observations).

## Lanes

| Lane | Engine | Ran | Verdict |
| --- | --- | --- | --- |
| checker (mechanical) | Sonnet | yes — `A5-audit-checker.md` | FAIL 8, 10 |
| analyst (objective, the cross-engine lane) | GPT-6 Astra | yes — `A5-audit-analyst.md` (thread `01a0a634-9b2b-7bf2-a4cc-169330d1739f`) | FAIL 1 2 3 4 5 6 7 8 9 10 12 |
| reviewer (subjective) | Opus 5 | yes — `A5-audit-reviewer.md` | FAIL 8; outside F1–F11 |

An Opus 5 implementer wrote U5c; the analyst on Astra is the engine that did not write it.

## Reconciliation

- **X5–X8, the instrument (claims 1–5):** CONFIRMED by the reviewer and the checker from the
  source; the analyst's UNRESOLVED marks name only the sandbox's inability to run Chromium, and
  each names the Orchestrator's own release-mode run as supporting the receipt. Closed on
  `A5-distribution-orchestrator.log.txt` (exit 0, 18 passed / 4 skipped, 21.55 s).
- **The closure (6):** the page is Vite-bundled, so the U5 Unknown (an import map over
  `node_modules`, no bundler) is unproved (analyst), and the instrument reads the agent's own
  module's specifiers while three sentences claim the whole graph (reviewer F2). ADOPTED → U5d
  carriers 1 and 4.
- **Metadata (7):** the page tool carries no `title`/`annotations`, so the projection through the
  pair and the agent registry is unasserted (analyst). ADOPTED → U5d carrier 2. The checker's
  teardown element and the reviewer's F10 close on the tail-gates reading (0 `distribution-*`
  trees) and are ADOPTED as an assertion → U5d carrier 10.
- **The guide (8):** every lane read the sentences as true; the only open element was an
  independent `test:guides`, which the Orchestrator ran (202 passed, exit 0). The tag-free titles
  follow the file's convention for the registry-tagged titles — RULED acceptable, not adopted.
  F7 (voice, the long line) ADOPTED → U5d carrier 8.
- **Scope and shape (9):** confirmed by every lane. The nested function assignments (analyst; the
  checker's `createLedger`) are outside the lint rule's `src/**`/`app/**` scope and inside the test
  corpus's idiom (reviewer), yet the `AGENTS.md` law names no test exemption — ADOPTED for the new
  fixtures → U5d carrier 3; the rule's scope in tests is a carry-forward for the policy.
- **Ship (10):** every lane holds until the policy red clears with the scaffold 0.0.69 re-pin and
  the full chain runs. The checker's vector (the projects the chain never reached) closed on
  `A5-tail-gates.log.txt` (config 172/1, setup 89, conformance 47, integration 4, each exit 0).
  The settling commands — `npm run test:policy` green after the re-pin, `npm run prepublishOnly` —
  run at the release chain.
- **The registry agent (11):** CONFIRMED by the analyst and the reviewer; the departure stands.
- **The parser package (12):** the analyst reads `@orkestrel/ndjson` in the consumer as an added
  package under R5; the reviewer reads it as the only correct choice (the agent's contract makes
  the application supply the parser; `.claude/rules/tests.md` forbids reimplementing a framework
  helper in a fixture). RULED with the reviewer: R5 binds the campaign packages' manifests, which
  are untouched; the consumer models a real application. Not adopted; recorded for the user.
- **The observations (13):** the cancellation reason is lost inside this package at `bindServer`
  (`src/core/helpers.ts:1879`), confirmed by the analyst's probe and the reviewer's source
  reading — CARRY-FORWARD F9 for the next `src/**` unit (forward `params.reason` into the
  per-request abort, or state the limit on `MCPServerInterface` and prove it). The JSON-quoted
  string value is documented agent behaviour — closed.
- **Reviewer F1, F4, F5, F6, F8, F11:** ADOPTED → U5d carriers 5, 6, 7, 9, 10. F3 dissolves with
  carrier 1 (the composition's Vite build goes away; the surface drives keep `bundleEntry`).

Successor: U5d (`U5d-mcp-distribution-brief.md`, Opus implementer); its audit is A5b — the
analyst on Astra as the cross-engine lane, plus the reviewer and the checker.

VERDICT: FAIL 6, 7 (carried by U5d); the rest closed or ruled
