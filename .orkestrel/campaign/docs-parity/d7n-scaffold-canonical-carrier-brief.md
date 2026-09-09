# Scaffold canonical pack carrier

Act as the native builder. Author the specified shell carrier and return its path
and checks. Do not execute a pack, install, build, gate, Git mutation or publication.
You are not alone in the checkout. Preserve every existing edit and the index.

Read AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md,
.claude/rules/writing.md, .claude/rules/quality.md and the align-packages skill with
its required fleet references. Read guides/README.md, guides/scaffold.md's packing
and host-inventory contract, and d7n-guides-extraction-plan.md in the campaign.
Read tmp/pass/pack-parity-guide.sh only as a saved-carrier pattern. Never use the
historical isolated-checkout pack script.

Own only tmp/pass/pack-canonical-scaffold.sh and your tmp/units report. Use
apply_patch. Keep each shell call plain; put multi-step work in the carrier.
Use forward-slash canonical paths and source the existing
/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh. Do not use a worktree,
package copy, model identifier, secret, new dependency, or vendored target edit.

Write a Bash carrier taking an expected full scaffold commit and an evidence label.
Reject an absent or malformed commit or label. Use SCAFFOLD from pass-env and always
git -C. Require the actual HEAD to equal the argument, and the active branch to be
claude/orkestrel-npm-audit-deps-14ibta. Reject staged or unstaged product changes
outside .orkestrel/campaign/docs-parity. Reject untracked files outside that campaign
path using git's untracked inventory with standard exclusions. Do not reject the
campaign's evolving evidence. Do not edit source or metadata.

Create only a new $SCR/packed/<label> evidence directory and its extract child;
reject an existing destination. Record the expected/actual head, status, product
diff, package.json/package-lock.json SHA256, and staged package metadata inventory.
Run npm pack --ignore-scripts --pack-destination against canonical scaffold in a
subshell with cwd SCAFFOLD. Bound it with timeout 600 and kill-after 15s, capture
stdout/stderr and its exit, and stop on failure. Expect
orkestrel-scaffold-0.0.64.tgz; do not silently choose another version.

Extract the returned archive only for inspection under the evidence directory.
Compare extracted package.json and dist/src/core/index.js, dist/src/core/index.d.ts,
dist/src/server/index.js, dist/src/server/index.d.ts with canonical build bytes.
Compare the complete extracted dist/host tree with canonical dist/host using diff
-r. Save that comparison output and exit. Record archive and compared source-file
SHA256 values. Record sha256sum --check results for metadata and compare staged
metadata inventory and product diff after packing with the before readings.
Retain package metadata as the packed package.json in the evidence directory.
Print the actual archive path and write a receipt labeling it local-artifact-only.
The carrier must neither build nor assume this is the registry-final runtime graph.
It must neither publish nor change branches. Leave the expected tip supplied by root.

Run bash -n through explicit Git Bash and read the result. Return a brief report
with touched paths, syntax result and any limitation. No source review or acceptance
belongs to this role. Root executes packing after accepted product commits.
