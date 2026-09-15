# Audit A4i — close the U4l round and the U4 chain (`@orkestrel/mcp` browser face)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote the chain). Do not attempt a browser run; name each
  unexecuted vector as `UNRESOLVED` with its exact command and read the Orchestrator's logs under
  Review evidence — every file is staged beside this brief in `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane — design fit of the new pins and
  the relationship-shaped host records, test names, comment voice, the unit's recorded decisions.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4l carrier closed at the
  `file:line` the report names; the red readings and their host replay; scope; the probe; the chain
  walk (claim 5).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (`.txt`
suffixed where noted; the Astra lane reads the staged copies) and the mcp tree at
`C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing. This round
closes the chain: rule on every claim and name any remaining defect with its vector, or state the
chain is closed.

## Subject

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → … → U4k → U4l. U4l's
brief is `U4l-mcp-browser-fix-brief.md`; its report `U4l-mcp-browser-report.md`. Previous round:
`A4h-audit-analyst.md` (`FAIL 1, 2, 7, 8`), `A4h-audit-checker.md` (`PASS`); the Orchestrator's
probes `P18-a4h-probe.md` (the U4k red reproduced; closes A4h-O 2) and `P19-a4i-probe.md` (the four
U4l controls replayed on the host); the round record `U4-chain-audit-verdict.md`.

## Review evidence

- `A4i-u4l-only.patch` — the U4l delta (three test files); `A4h-u4k-only.patch` — the U4k delta;
  `A4i-diff.patch` — the whole chain against `b9ff0b9`.
- `U4l-mcp-gates-orchestrator.log.txt`, `U4l-mcp-gates-test-full.log.txt` — the Orchestrator's
  authoritative gates after U4l (every step exit 0); `collide3-mcp-after-u4l.txt`
  (`collisions: none`).
- `P19-a4i-probe.md` with `P19-a4i-probe.log.txt` — the replay of every U4l control.

## Numbered falsifiable claims

1. **The publication failure path is pinned** (A4h-O 1): `prunes a failed publication and keeps
   the names it carries` publishes A holding `dropped` and `kept`, then B holding `accepted`,
   `refused`, `kept` in that order with `refused` refused; the publication rejects its caller with
   the fixture's message; the registry then holds exactly `accepted` and `kept`, with `kept` the
   SAME registration entry the first publication made (identity); clearing the refusal and
   publishing B again converges on `accepted`, `kept`, `refused`. Red against `#publish` flattened
   to reconcile-then-prune (the unit's reading and the Orchestrator's replay); the identity
   assertion red under its own control.
2. **The host records are relationships that hold on any host** (A4h-O 7):
   `builds a bridge exactly where this page exposes the registry` asserts `createModelContext()`
   is defined exactly when `'modelContext' in document` and destroys a built bridge;
   `detects the registry exactly where this page exposes the property` asserts
   `isWebMCPDocument(document)` equals `'modelContext' in document`; no conditional, `runIf`, or
   `skipIf` in either; each forced-value control red; the isolated absence cases unchanged; the
   factories comment states what the relationship guards and where the dated host reading lives;
   the native block's comment at `ModelContext.test.ts` names the isolated document as the ordinary
   absence assertion exactly.
3. **The relationship is the right shape.** A host shipping `document.modelContext` under a shape
   `isWebMCPDocument` refuses reddens these two tests rather than leaving the gated native block
   silently uncollected; a host shipping the registry runs the native block and keeps these green.
   Name any host state the pair misreads.
4. **Nothing else moved; nothing re-implements an installed export**: the three owned test files
   only; `src/browser/ModelContext.ts` (SHA-256 `56ac1dc5588e259d…`), `tests/fixtures/modelContext.ts`,
   and `guides/mcp.md` byte-identical to the U4k state; the probe clean; the same tracked paths.
5. **The chain is whole.** Every FAIL from A4 through A4h names a closing test, a landed change, a
   probe, or a recorded ruling (P9, P11, P12, P13/P13b, P14, P16, P18, P19; the A4d-O generation
   ruling; the nonblocking transport-recorder follow-up; R8 carried to a design round).
6. **Ship it as mcp 0.0.31** for U4e and U5b? Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; findings outside the
claims under `outside:` (or `outside: none — chain closed`); ONE terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>`. Nothing else.
