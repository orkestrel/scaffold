---
paths:
  - 'src/**/*'
  - 'app/**/*'
  - 'tests/**/*'
  - 'guides/**/*'
---

# Evidence, probes, and completion rules

## Evidence before change

- Read the authoritative `types.ts` and the decision-bearing implementation first-hand. Delegate bulk reading, never the owning decision.
- Treat existing code, tests, `old/`, branches, and copied projects as evidence, not authority.
- Research when the user asks, when comparing an upstream or legacy implementation, or when current external behavior changes the design. Use primary sources for external capabilities and the installed declarations for dependencies. Separate verified fact from inference.
- For a broad API or production-readiness change, build a capability/defect matrix before editing. Every row ends as implement, repair, retain, or exclude with evidence. The matrix is the definition of done; fix it when the change starts. Record a finding outside it for the next matrix.

## Probes before arguments

- Settle a question about behavior by running it: what a function returns, what a config resolves to, whether a path is reached. Run before stating the belief.
- When the argument about a behavior grows past a few sentences, stop and run it.
- Label an unverified assertion as unverified. An unverified claim in a brief becomes the premise of every downstream unit.
- Bound a search before starting it: the benchmark, the population, or the row that ends it.
- A passing negative probe proves nothing until its input is shown to reach the code under test.
- A clean reproduction of a reported defect means your vector was weaker than the reporter's; get theirs before ruling. A vector the compiler rejects refutes the vector, not the finding.
- "No tests found", an empty match, or a runner that resolved nothing reports on the harness. Confirm the probe was collected before reading a result.
- Prefer an observation to a derivation. When a measurement and an argument disagree, the argument is wrong until the measurement is shown broken.
- Read a gate bare. A `| tail` or `| grep` behind it hides the failing lines and reports the pipe's exit code.

## Instruments

- An instrument counts as evidence only after it has failed: pair every probe, comparison, or matrix with a negative control that must fail under the same conditions, drawn from outside the population the instrument covers.
- When a TypeScript question can name a workspace project, a case (files plus a test), and a control (files, test, the stage it must fail at, and why), call the `prove` tool the `probe` MCP server registers. Quote its closing line (`receipt probe:<digest>:…` or `no receipt`) where the claim is reported. A `no receipt` line leaves the claim unproved; report the stage that refused.
- When the question supplies no project, no case, or no control, write a probe per `.claude/rules/tests.md` § Probes and report the probe's control and coverage.
- When no `probe` server is registered, register one outside the repository in the harness's user or local MCP scope, pointing at `node_modules/@orkestrel/probe/dist/bin/main.js`, and start it in the repository whose projects the question names. A scaffold target holds no `.mcp.json`.
- Read a receipt as evidence about its claim, never as a gate result.
- State the instrument's coverage beside its result. Match the instrument to the question: a text search reports on text; a claim about declarations or call sites needs the compiler or a parser.
- Report a question unanswered rather than answering it with a weaker instrument.
- Baseline a published-artifact claim against the published artifact (the tarball, the deployed asset). Prove a module cycle by loading the built entry points.
- Promote an instrument that settled a claim into a test, with its control, before accepting the work it settled.

## Ecosystem reuse

- Prove a semantic difference before keeping a local variant of an installed primitive.
- Fix a reusable defect in the lowest package that owns the mechanism; keep product policy downstream.
- Never re-export a dependency's symbol.

## Production hardening

- Translate "enterprise-grade" or "production-ready" into a risk and seam matrix: inputs, states, failures, cleanup, cancellation, concurrency, resource ownership, hostile boundaries, environment isolation, serialization, package consumption.
- Grade the matrix on coverage of applicable seams, not on further interleavings against a seam already proven.
- Test observable invariants at each seam with real implementations; use a dedicated real-service project for external behavior.
- Treat "works with an external client" as unproven until one representative real client has driven it end to end.
- Audit test discovery, counts, skipped and todo tests, cleanup, and assertion adequacy before acceptance. Coverage is not adequacy.
- Add an independent review for security, destructive paths, concurrency, protocols, or untrusted input, per the size gate in `.agents/orchestration.md`.

## Completion

- Sweep centralization, wrappers, test helpers, and text integrity after implementation and before gates.
- Stop when the enumerated scope is closed and the gates the size gate names are green. The next scope is the deliverable; a further pass needs a further instruction from the user.
