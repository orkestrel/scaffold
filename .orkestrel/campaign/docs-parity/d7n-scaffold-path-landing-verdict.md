# Canonical path landing

The tested canonical path correction landed as
c90089c99b03c692e8eda3935af592601a5e87e3. The campaign branch, main and designated
claude/docs-parity-windows-01a0810d ref each accepted its push. The accepted gate
evidence and closure ruling were committed separately before the source landing.

Root integrated the exact candidate with apply_patch. Every landed file's SHA-256
matched the isolated tested file. The primary owner package and staged lock hashes
remained unchanged from d7n-scaffold-path-closure-verdict.md. Whitespace checking exited
0. After the scoped commit, Git status contained only the owner package and staged lock.

The canonical source scope is closed on main. The direct setup proof stays in scaffold;
existing vendored membership carries the helper, configured-policy test and portability
rule. Fleet targets have not received those bytes yet.

## Landing audit

Root invoked the accepted isolated checkout's own built dist/bin/main.js entry against
primary scaffold with audit --offline and --from pointing at the isolated dist/host.
Primary has no built CLI entry. Its src tree has no delta from the candidate baseline,
so the isolated compiled command supplies the tested source without building against or
installing over the owner's dependency edits.

The CLI exited 1 and reported authoring-tree drift in AGENTS.md and CLAUDE.md, plus
orchestration paths outside the consumer plan. The ordinary rendered reading is retained
in d7n-scaffold-path-landing-audit-plain.log.txt. The preceding JSON reading was truncated
by tool output limits, as labelled in d7n-scaffold-path-landing-audit.log.txt; do not
treat it as a complete machine artifact. The rendered reading is the usable audit
evidence. The audit wrote nothing and does not reopen the accepted path scope.

## Next scope

Propagate the canonical vendored correction through scaffold's supported materializer.
Keep dependency declarations unchanged during propagation. CLI repair also declares
manifest regions, so do not run it blindly over the owner's prepared pins. Brief and
independently check a bounded instrument that uses a freshly audited plan with the
public Materializer.repair contract and no declare call. Root owns its execution.
Verify the target diff and the real configured-policy regression.

Then resume the guide reader correction and the owner's dependency-layer alignment.
Inventory audits still await reconciliation. No release pin, publication, replacement
guide artifact or registered Probe dependency closure is claimed by this landing.

VERDICT: PASS

