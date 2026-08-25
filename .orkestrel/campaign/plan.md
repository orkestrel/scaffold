# Implementation campaign plan — LSP audit follow-through

Date: 2026-08-25. Supersedes the roadmap section of `audit.md` where the user's post-audit
rulings changed it (`direction-2026-08-25.md`, second ruling set). The audit's findings and
evidence stand unchanged; this plan is the successor campaign that lands them.

Process law for every unit: implementation units run under the `orkestrel-harden-package`
phases their brief selects; cross-package integration follows `orkestrel-align-packages`;
every nontrivial unit is audited through `orkestrel-falsify` with at least one lane whose
engine did not write it; one independent `verifier` runs each touched checkout's gate chain;
every repair carries its red-before-green proof. Serialization: one writer per checkout from
a committed baseline; at most one Sol exec and one native writer live at a time, always in
different checkouts.

## Wave L — the lsp package (user-directed rescope)

- **L0 — repository creation.** Create `orkestrel/lsp`, scaffold the workspace with
  `scaffold new`, add the repository to the session scope. Needs the user's confirmation to
  create the repository. Orchestrator-owned.
- **L1 — contract design round.** One brief, two blind lanes (`planner` Opus, `analyst`
  Sol): the `@orkestrel/lsp` v1 public contract, mirroring the mcp package's architecture —
  host-independent core (protocol types from the 3.18 spec and metaModel, validators,
  parsers, framing helpers, error codes) plus a server environment carrying the stdio child
  transport and `LSPClient`. v1 scope is probe's need, per the creation gate: lifecycle with
  real capability declaration and `InitializeResult` consumption, position-encoding
  negotiation, `didOpen`/`didClose`, sync-mode selection from server capability, push
  diagnostics plus pull selection from `diagnosticProvider`, `$/cancelRequest`,
  method-not-found responses to unsupported server requests, the shutdown/exit/kill
  teardown. Excluded with recorded triggers: `didChange` (first re-inspecting consumer),
  work-done progress rendering (first rendering consumer), `LSPServer` (the user's named
  eventual trajectory — designed the way `MCPServer` was, when a serving consumer exists;
  the html/markdown structure exclusions in `audit.md` name this server as their admitting
  consumer path). The audit's client-surface ruling seeds the subjective lane: entity-scoped
  lifecycle and document operations, no generic request/notify escape hatch.
- **L2 — core implementation** (types, validators, parsers, framing, errors; fixture-testable
  without child processes) — `sol`, GPT-5.6 Sol.
- **L3 — server transport and `LSPClient`** (child over stdio, correlation, teardown,
  protocol-faithful fixture server, live run against the workspace's own `oxlint --lsp`) —
  Opus `implementer`, native: language-server children are unmeasurable inside bench
  sandboxes, so every proof here is a host run.

## Wave M — mcp repairs, then names (unchanged from the audit)

Serial on the mcp checkout, `sol` (GPT-5.6 Sol) unless named otherwise; listener and stdio
proofs taken on the host; the in-memory era matrix from the audit's risk section is each
unit's cheapest probe.

- **M1 — revision boundary.** Bare server strictly modern: rejects every non-modern stamped
  revision with `-32022` and era-scoped `supported` data; discovery advertises the modern
  set; legacy `initialize` and legacy `ping` exist only through the decorator; client
  negotiation cannot ride legacy revisions over modern metadata.
- **M2 — input continuation.** Grouped call options carry continuation state and input
  responses; an `input_required` outcome is answerable through the public client; altered
  or expired state fails; accepted responses resume the original execution.
- **M3 — subscription client.** Entity-scoped `listen` returning a backpressured async
  stream; ordered notifications; terminal result settles the stream; caller abort reaches
  the peer; proven through the real HTTP stream decoder.
- **M4 — tasks proof.** Orchestrator stages the authoritative `ext-tasks` schema locally
  first (network work stays out of bench execs); signatures verified against it; the
  `notifications/tasks` family lands so transitions arrive without polling.
- **M5 — deprecated surface** — `builder`, Sonnet. `@deprecated` markers on roots,
  sampling, and logging declarations; modern producers and removed registrations removed;
  parsing preserved only where the dated schema still permits receipt.
- **M6 — naming cascade** — Opus `implementer`, last so mcp bumps once. `MCPLegacy` to
  `MCPDualEra` with `createMCPDualEra`; `MCP_PROTOCOL_VERSION` to `MCP_HANDSHAKE_VERSION`;
  `MCP_LEGACY_VERSION` to `MCP_FALLBACK_VERSION`; every consumer, test, and guide fence in
  the same change.

## Wave H — html and markdown provenance (unchanged from the audit)

- **H1 — html provenance** — `sol`. Source-retaining parse entity; `HTMLSpan`
  `{ start, end }` half-open UTF-16; single-word `span(node)` lookup on the `HTML` entity;
  offsets index the original input across CRLF normalization; slice-equality proof over
  parsed, sanitized, and distilled trees; CRLF and astral-character probes with the
  normalized-offset negative control.
- **H2 — markdown provenance** — `sol`, after H1. Offset-aware block and inline parsing;
  `MarkdownSpan` and `span(node)` on the `Markdown` entity; same proofs; the conversion
  helpers document positionless output.
- **H3 — exclusions recorded** — `builder`. Outline, folding ranges, selection ranges, and
  semantic tokens recorded as intentionally excluded in both guides, each trigger naming the
  eventual `@orkestrel/lsp` server path as an admitting consumer.

## Wave P — probe adopts the lsp package (revised)

Serial on the probe checkout, Opus `implementer` (native — child-process proofs), after L3.

- **P1 — client adoption.** `@orkestrel/lsp` built from source, packed, and installed as a
  tarball (installed, never linked) until the package publishes; `LintStage` drops its
  private framing, correlation, and lifecycle for `LSPClient`; capabilities declared;
  `InitializeResult` kept; encoding derived; diagnostics path selected from the server's
  capability. Acceptance against the real oxlint binary on the host, and the recorded
  process-id teardown check.
- **P2 — `Issue` range.** `line` replaced by zero-based UTF-16 `range`, rendered one-based
  at format time; consumer set derived by running the suite; every stage and renderer in the
  same change.
- **P3 — TypeScript 7 receipt gate.** Orchestrator-owned host capture: run the native
  toolchain's LSP server, record the launch contract and the initialization and diagnostic
  exchanges. Needs the user's approval to install `@typescript/native-preview` into a
  scratch workspace when the gate runs. The adapter unit that would retire `TypeStage`
  opens only on parity evidence; until then `TypeStage` stays.

## Wave W — workflow adopts MCP progress directly (user-directed reversal)

- **W1 — progress adoption** — `sol`. `TaskProgress { current, total?, unit? }` becomes
  `{ progress, total?, message? }` with MCP's semantics, no adapter. The unit resolves and
  proves the named constraints: monotonicity is scoped to one task execution (a new attempt
  is a new scope, mirroring MCP's per-request token scope); a regressing report within a
  scope is refused; `unit` retires with its formatting content folded into `message`; the
  activity `note` overlap is reconciled so one field carries observer text. Failing proof:
  replay workflow's existing reporters against the monotonic rule, record the refusals red,
  fix the reporters, record green. Dependents re-pin when workflow bumps.
- **G1 — guide rulings** — `builder`. queue, process, tool, and middleware record why they
  stay untouched; middleware records the multipart-upload-progress trigger; tool records
  that progress lives one layer up in mcp's execution context.

## Order and parallelism

L0 and L1 first — L1 can run while M1 begins, on different checkouts and different engines.
Then two pipelines advance concurrently, one writer each: Sol works M1 through M4 serially
on mcp, then H1 and H2, then W1; the native Opus lane works L3, then P1 and P2. M5, M6, H3,
and G1 slot behind their dependencies. P3 runs whenever the user approves the preview
install. Publishing is a separate user decision at the end, in layer order, through the
`orkestrel-publish` skill.

## Exit criterion

Every audit-report row reaches implemented, repaired, retained, or intentionally excluded on
landed evidence: the mcp era matrix and continuation, subscription, and tasks proofs green;
the provenance slice proofs green across CRLF and astral inputs; probe running on
`@orkestrel/lsp` with range-carrying issues and the TS7 gate documented; workflow's adoption
proofs green with its reporters migrated; every falsify verdict on file, every touched
checkout's gate chain reported green by an independent `verifier`, and the campaign folder
pruned at acceptance. The `LSPServer` and the TypeScript 7 adapter close as recorded
trajectories, not as debt.

## Confirmations the plan carries

- Creating the `orkestrel/lsp` repository (L0) — awaiting the user's word.
- The mcp names in M6, the zero-based-stored coordinate ruling in P2, and the
  side-lookup provenance ruling in H1/H2 — adopted from the reconciliation; standing unless
  the user overrules.
- Installing `@typescript/native-preview` for P3 — deferred approval, asked when the gate
  runs.
- `unit` retiring from workflow's progress shape in W1 — the one acknowledged loss of the
  direct adoption; standing unless the user overrules.
