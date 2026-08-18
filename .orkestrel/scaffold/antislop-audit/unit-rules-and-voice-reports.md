# U1 and AF-voice returned reports (Opus implementer) — condensed retention

## U1 (rule-file amendments), returned report substance

All four amendments landed; only the three owned files changed (+39/−3). Deviations recorded by
the unit: amendment 3 widened the canon past the round-1 report on the Orchestrator's ruling
(later homed in AGENTS.md by AF-prose); `protected` initially had no mechanical proof (closed by
U2's rule covering it); the visitor-table exception was discoverable only from workspace.md;
tree-wide search confirmed no amendment duplicated existing prose.

## AF-voice (instruction tightening), returned report substance

Four tightenings landed (+9/−14 over AGENTS.md, typescript.md, workspace.md): the
readonly-parameters non-negotiable deleted as subsumed by the accessibility line; the
parameter-property bullet reduced to definition + directive; the two as-const bullets compressed
to one; the visitor-adapter bullet stated once beside its cross-reference. One-home verified by
tree-wide grep: `parameter propert` resolves only to typescript.md; scoped oxfmt check green on
all three files. Both units validated read-only and committed by the Orchestrator (090336a,
ea4f636).

## Final acceptance evidence (verifier, independent)

format:check 0; lint:check 0; check 0; build 0 with 108 files staged into dist/host including
configs/policy.ts; npm test 0 — src:core 293, src:server 356, src:bin 167, policy 60, config 28,
guides 7 (911 total). The one mid-campaign consequence the full suite caught — Compiler.test.ts
pinning the artifact plan at 46/31-host — was corrected to 47/32 (the new vendored row is the
counted fact changing exactly as the change intended) and re-verified green by a second
independent verifier pass.
