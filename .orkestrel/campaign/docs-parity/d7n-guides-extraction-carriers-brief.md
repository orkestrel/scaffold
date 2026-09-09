# Canonical extraction carriers

Act as builder on Terra. Execute directly; spawn nothing. Read scaffold AGENTS.md,
.agents/orchestration.md, .claude/rules/portability.md, writing.md and quality.md,
the alignment skill and fleet/integration references, and
.orkestrel/campaign/docs-parity/d7n-guide-canonical-pack-ruling.md, resolved from
the scaffold checkout root. No product implementation belongs to this unit.

Own only tmp/pass/run-parity-gates.sh, tmp/pass/pack-parity-guide.sh,
tmp/pass/install-parity-guide.sh, tmp/pass/inspect-parity-guide.mjs, and
tmp/units/d7n-guides-extraction-carriers-report.md in canonical scaffold. The scaffold
product writer has returned before dispatch. Guide has its own source writer; do
not write to Guide. Preserve others' work. Use apply_patch and forward-slash paths.

Adapt tmp/pass/run-guides-test-file-gates-closed.sh mechanically. The gate script
takes a package name (guide or scaffold only) and an evidence label. Source pass-env.sh.
Select the canonical directory; refuse any other package or existing output directory.
Capture manifest/lock hashes and git staged index before gates. Run in order
format:check, lint:check, check, build, test with retained logs and exit files, a hard
timeout per command, and immediate script failure on a red. Capture product diff
before/after npm test and compare. For scaffold exclude the campaign record from
the diff; Guide excludes nothing. Check manifest/index preservation and git diff
--check. Capture final HEAD/status/diff. Do not mutate or fix source.

The pack script takes an unused evidence label. It never edits package metadata or
runs build. Root first builds and gates frozen Guide source, records exact original metadata, then
temporarily overlays its runtime ranges with apply_patch. Validate canonical Guide
metadata before npm pack: name @orkestrel/guide, version 0.0.18, dependencies Contract
^0.0.17 and Markdown ^0.0.14. Use npm pack --ignore-scripts with an output directory
under SCR/packed, capture output/exit, extract the tarball for read-only inspection,
and compare packed dist/src/core/index.js and its declaration with canonical built
dist. Validate packed metadata with the same function, write hashes and the exact
artifact path, and label the receipt local-artifact-only. The unpacked archive is
inspection evidence, never a copied-package build/test target. Root restores the
overlay immediately on success or failure; the script must say it never owns that
restoration and may not be called outside root's guarded transaction.

The inspect mjs file uses native fs/path and node:assert to validate the exact
package metadata just described. Accept a package.json path as its argument and
print only the selected nonsecret fields. Do not read arbitrary configuration,
credentials, or add an npm package. Keep declarations module-scoped; no hidden
nested functions, unsafe casts, or redundant wrappers.

The install script takes the exact new Guide tarball path and evidence label. Check
that the input is a file within SCR/packed. Source pass-env.sh. Capture scaffold's
manifest/lock hashes and staged index. Install no-save --ignore-scripts
--package-lock=false into canonical scaffold with the accepted Contract .17, HTML .9,
Markdown .14, Test .14 paths from prepare-guide-extraction-deps.sh and the new Guide
archive. Do not run the install yourself. Capture hashes of all supplied archives.
After install compare scaffold's installed Guide dist/src/core/index.js to canonical
Guide's built file, inspect its metadata, prove manifest/lock/index preservation,
and print the exact receipt directory. Fail on any mismatch. No links, package
copies, manifest rewrites, or lock synthesis.

Validate scripts with bash -n and inspect mjs with node --check only. Root executes
the install/build/pack/gates. No git mutations, dependency installs, source writes,
publishing, secrets, or whole-tree commands by this role. Stop and report any
deviation; do not redesign the carrier. Return the owned paths and validation
results. Root retains and audits the carriers with execution receipts.

## Root carrier corrections

Bound install and pack with timeout --kill-after=15s 600. Capture the actual exit
file even when the command fails. For pack, cd to canonical Guide and invoke npm
pack there. Accept only a single output-label segment with an alphanumeric leading
character and alphanumeric, dot, underscore, or hyphen thereafter. Canonicalize the
archive with realpath -e before checking SCR/packed containment. Keep this correction
limited to the named carriers; rerun syntax checks and return.

## Supported Guide mirror carrier

Also own tmp/pass/mirror-parity-guide.mjs and its report entry. Author only; do not
execute it. Root read the public Mirror contract and Materializer.mirror method:
src/core/types.ts defines the found record with name, path, lookup, content, and
optional observed exact-byte hex; src/server/Materializer.ts checks observed bytes
before its existing transactional write. No fetch-policy change is required.

Use static relative imports from ../../dist/src/server/index.js for Materializer
and readFileHex, and ../../dist/src/core/index.js for contentToHex. Accept the exact
canonical upstream guide file path and scaffold target path as arguments. Use native
node:path resolution and node:fs/promises reads; never hand-build host paths. Validate
the inputs and keep the destination fixed as guides/guide.md with package name
@orkestrel/guide. Read the existing target through readFileHex. Construct a found
Mirror record with content and its observed value, omitting observed when absent.
Call Materializer.mirror with that record and the target. Destroy the instance in
finally. Compare readFileHex afterward with contentToHex of the upstream content,
then print only the MaterializeResult and selected paths. The supported API performs
the write; no manual guide rewrite, package copy, or alternate mirror mechanism.

Run node --check only. Root will execute after the Guide source is frozen and gate-green and
scaffold has no active writer. Keep all other source and configuration untouched.
