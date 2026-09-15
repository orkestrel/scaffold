# A5b — audit verdict (U5c + U5d, the mcp composition receipts)

Round of 2026-09-15 on the mcp tree at `8d97dd0` plus U5c and U5d (uncommitted). Subject:
`A5b-diff.patch.txt`, `U5c-mcp-distribution-report.md`, `U5d-mcp-distribution-report.md`, the
Orchestrator's release-mode run `A5b-distribution-orchestrator.log.txt`, gates
`U5d-mcp-gates-orchestrator.log.txt` and `U5d-mcp-gates-test-full.log.txt`, the tail projects
`A5b-tail-gates.log.txt`, and the probes `P25-u5d-receipt-probe.md` and `P26-floor-names-probe.md`.
Briefs: `A5b-audit-brief.md` (claims 1–10) and `A5b-seam-brief.md` (claims 11–64).

## Lanes

| Lane | Engine | Ran | Verdict |
| --- | --- | --- | --- |
| checker (mechanical) | Sonnet | yes — `A5b-audit-checker.md` | PASS |
| analyst (objective, the cross-engine lane) | GPT-6 Astra | yes — `A5b-audit-analyst.md` (thread `01a0a65f-c374-7222-b31b-15a5c4d50045`) | FAIL 1 2 9 10 |
| reviewer (subjective) | Opus 5 | yes — `A5b-audit-reviewer.md` | PASS, outside F1–F11 |
| seam lenses S1–S6 | Opus 5, one per seam | yes — `A5b-seam-verdicts.md` (workflow `wf_7dcb6608-b6f`) | S1 PASS, S2 PASS, S3 PASS, S4 FAIL 43, S5 FAIL 51 54, S6 FAIL 64 |

An Opus 5 implementer wrote U5c and U5d. The analyst on Astra is the engine that did not write
them, so the fix-round rule holds through that lane. The seam lenses ran beside the three contract
lanes rather than in place of any of them, per `.agents/orchestration.md` § Context and
decomposition: the subjective and objective lanes are the pass's floor, not its shape. Each lens
held one seam over a disjoint slice, blind to the others, with the claims numbered once across the
round.

## Reconciliation

### Closed on the Orchestrator's own readings

- **The receipts themselves (claims 1–8).** Astra marked 1 and 2 UNRESOLVED because its sandbox
  runs no Chromium and no install; both name probe P25 as the supporting reading. P25 is the
  Orchestrator's own replay: a gap planted in the emitted import map reddens every composition
  receipt with a module-resolution failure while the surface drives stay green, and dropping the
  page tool's `title` reddens exactly the in-page pair receipt and the agent-dispatch receipt, the
  second naming the loss off the wire listing and off the agent registry. Closed.
- **The gates.** The checker's earlier claim that the chain never reached the later projects is
  closed by `A5b-tail-gates.log.txt`: config, setup, conformance, integration, and guides each run
  directly and exit 0, and no `distribution-*` tree survives a run.
- **The floor risk.** P26 read the published 0.0.68 and 0.0.69 hosted guides and found the refresh
  adds only the tool contract's own names, none of which mcp declares. The 0.0.69 re-pin therefore
  adds no collision to mcp, and the visit's only expected policy change is the overload the 0.0.68
  reader refused.

### Adopted into U5e

| Finding | Source | Carrier |
| --- | --- | --- |
| Four sites still carry `prettier --write` reflow that `oxfmt` cannot see, falsifying U5d's "no prettier residue" claim | reviewer F1 | U5e 1 |
| The scratch tree survives a `startReceipts` rejection: the hook awaits `closeReceipts()`, which adopts the stage's rejection, before the removal | S6 claim 64, S1 required, reviewer F5 | U5e 2 |
| `stopped: pair.client.connected` reports `stopped: false` for a client stopped a line earlier, so the assertion's literal reading is the opposite of what it proves | S5 required | U5e 3 |
| The header's opening enumeration and its composition sentence are each false of the file as it stands | S5 claim 51 | U5e 4 |
| Counts of a growable set in added prose | Astra claim 9, S5 claim 54, the Orchestrator's own sweep | U5e 5 |
| `Modules.files` is declared, populated, documented as evidence, and never read | reviewer F2, S1 | U5e 6 |
| The consolidation left the page's own run functions duplicated and the scripted turns authored twice across fixtures | S4 claim 43 | U5e 7 |
| No receipt drives a refused relay credential, so the `authorize` wiring cannot redden | S2 | U5e 8 |
| The derivation assumes a flat install and nothing checks it; a nested duplicate would make the receipt describe a resolution the consumer's Node never performs | S1 | U5e 9 |
| The route handlers are written in place while the sibling fixture references every handler by name | S4 | U5e 10 |
| The closure comment overstates what is served from `node_modules`; the guide bullet garden-paths and claims more than the assertion checks; a serial comma in a two-item list; the abort comment reads a stated limit as a platform property | S5, reviewer F3 and F4 | U5e 11 |

### Ruled, not adopted

- **The nested-function question (R16, refined).** An anonymous arrow written as an options-object
  property inside a call argument satisfies `AGENTS.md` § Design laws, "an anonymous callback
  passed directly as an argument". It is the form this package's own public API documents —
  `createTool({ name: 'add', execute: () => 5 })` appears in the `src/browser` doc examples that
  `test:guides` executes — so reading it as a violation would refuse the package's documented call
  shape. The refinement A5b adds: a ROUTE TABLE is governed separately.
  `.claude/rules/architecture.md` fixes a route as data mapping each path to a handler referenced
  by name, and the sibling fixture in the same directory already keeps that form, so the Node
  fixture follows it (U5e carrier 10) on the table's own rule rather than on the nested-function
  law.
- **The bump trigger.** The reviewer answered claim 10 "this delta obliges no bump", which is right
  about the delta: U5c through U5e touch only tests and a guide, and the package publishes
  `dist/src` and `README.md`. The bump to 0.0.31 is owed by the `src/**` work already landed
  beneath this baseline — the browser face and the server chain — which the reviewer correctly
  recorded as not evidenced in its slice. `K-dist-compare-mcp-v31.txt` evidences it: the rebuilt
  `dist/` differs materially from the published 0.0.30 in the browser entry and the core entry
  across both module systems. The bump stands on that reading.
- **The guide's tag-free receipt titles.** The checker read the `## Tests` bullets as quoting each
  title without its `[requires a browser]` suffix and referred whether that satisfies "exact test
  title". It does: the file's pre-existing registry-tagged titles are quoted the same way
  throughout the guide, so this is the section's own established form.

### Carried forward

Each is recorded against the capability that owns it, for a later change rather than this one.

- **mcp `src/**`, the cancellation reason.** `bindServer` aborts a request closure without
  forwarding the cancellation notification's `reason`, so a hosted handler cannot distinguish a
  reasoned cancellation from a transport close. Carried from A5 as F9; U5e carrier 11 makes the
  receipt's comment name it as a limit so the carry-forward stays visible. The next `src/**` unit
  forwards the reason or states the limit on `MCPServerInterface` and proves that sentence.
- **The derivation has no synthetic test.** The classifiers beside it are driven over a written
  fixture tree with no registry and no browser; the walk, the specifier resolution, and the served
  path join are exercised only by a stage that skips without both. A successor unit adds a case in
  that same block over a synthetic tree holding a relative cycle, a parent-relative specifier, and
  an unresolvable bare specifier.
- **The specifier scan is written twice**, once dropping relative specifiers and once keeping them.
  Fold into one reader whose callers partition the result.
- **The Node fixture's relay accounting retains a request before the relay rules on its
  authorization**, so the reported relay figure counts arrivals rather than served turns. It cannot
  misreport in today's scenarios; U5e carrier 8 adds a refused request, which makes the distinction
  live, so whichever unit next owns the accounting reads it then.
- **The media-type read scans the whole path** rather than the file name, so a file whose own name
  carries no dot under an ancestor directory that does falls back to the octet stream. No file in
  this composition hits it.
- **`COMPOSITION` names the artifacts the receipts compose, and the Node half also runs the router
  and the server**, which reach the consumer only as peers of the packed workspace. A real consumer
  of the server face declares those peers itself.
- **`serveUnder`'s containment is lexical**, so a symbolic link under the served root is followed
  wherever it points. No escape is reachable in a registry install of this tree.
- **`closure` names two concepts** — the root entries one installed module imports, and the whole
  walked graph — and `readClosure` names two functions across the composition.
- **The page fixture's one-shot deferreds** make the cancellation receipt single-use; it holds only
  because each reading opens a fresh page.
- **`readOrigin` waits on the child's lines unbounded**, so a child that never announces its port
  burns the test timeout and then the hook timeout, and the scratch tree survives by a route the
  teardown fix does not close.
- **The recorders cover the fetch and document-request class.** Traffic over a socket, an event
  source, or a beacon is invisible to both, and nothing in this composition uses them. Whoever adds
  such a transport extends the recorders in the same change.
- **A metadata field a projection invents outside the fixture's fixed read list is invisible** to
  every composition receipt; the nearest live case is the field the wire loses as a separate one.

Successor: U5e (`U5e-mcp-receipt-residue-brief.md`, Opus implementer); its audit is A5c, with the
analyst on Astra as the cross-engine lane.

VERDICT: FAIL 9 (carried by U5e), with S4 43, S5 51, S5 54, and S6 64 carried by the same unit
