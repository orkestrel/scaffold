# Check guide final instruments

Act as checker on the native mechanical route. Perform directly and spawn nothing.
Read AGENTS.md, .agents/orchestration.md, portability, writing, quality, documentation,
and orkestrel-falsify with its required references. Read d7n-guide-final-instruments-brief.md
and its report. The complete new scripts tmp/pass/validate-guide-heading.sh and
tmp/pass/pack-guide-heading.sh are the actual review subject. No package write or body
execution, install, build, pack, commit, push, publication, or credential access.
Run syntax checks only. Preserve the author report even if a claim in it is false.

V1. Validation enforces the branch, staged, untracked, and owned-path preconditions before
the gate chain. It preserves failed guards and commands, captures final state on exit,
and fails if a successful chain changed tracked state. A success marker cannot exist
unless the final comparison already succeeded. Check ordering, not the author's claim.

V2. The validator runs the exact requested gate order from guide, logs command text and
actual exits, stops on failure, and changes no tracked file. No install, mutating docs
direction, formatting, repair, or source cleanup is present.

P1. Packing validates the supplied full SHA, branch, clean state, package identity, and
version; fetches origin and refuses missing ancestry; and rechecks HEAD and cleanliness.
Its fresh tarball cannot overwrite the original head start. Its extracted distribution
must match the just-built distribution. Review command failures and capture paths.

P2. The pack result retains the commit, version, artifact path, tarball hash, and dist
hash in on-disk evidence, alongside final status. It measures rather than guesses the
new hash. A failed guard cannot be reported as success, and a successful run cannot lose
the evidence needed to identify the artifact.

Return per-claim evidence and a terminal verdict in
tmp/units/d7n-guide-final-instruments-check-report.md. No prose counts or engine IDs.
