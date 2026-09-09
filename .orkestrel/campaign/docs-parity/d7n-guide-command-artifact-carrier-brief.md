# Prove the Guide server artifact

Act as the native Terra builder. Own tmp/pass/verify-guide-server-artifact.mjs,
tmp/pass/run-guide-server-artifact.sh and
tmp/units/d7n-guide-command-artifact-carrier-report.md only. Preserve all other
edits. Spawn nothing. Read AGENTS.md, .agents/orchestration.md, portability,
quality and writing rules; align-packages and required fleet references; the
command design verdict; and guides/guide.md's server entry once it exists.

Author a root-run read-only artifact comparison instrument. Do not install, pack,
build, mutate Git, write a package, or touch secret files. Use apply_patch and
native path/URL APIs. Keep multi-step commands in the saved Bash carrier with
the existing pass-env.sh source and explicit canonical forward-slash invocation.

The Node instrument accepts the pack evidence directory and a new evidence output
directory. Validate native resolved input is below scaffold/tmp/pass/packed and
the output is below scaffold/tmp/pass. Compare package/dist/src/core and
package/dist/src/server under the pack's extract directory against canonical
Guide dist entries, and compare these packed entries against scaffold's installed
@orkestrel/guide dist entries. Compare index.js and index.d.ts exactly. Read and
validate packed and installed package metadata with existing Contract guards and
parseJSON. Require Guide name/version0.0.18 and matching ./server export value;
record the actual exports and dependency fields without guessing the writer's
export-map form. Resolve actual installed @orkestrel/guide/server with import.meta
and dynamically import it; require GuideCommand to be a function. Never import
source files as a substitute. Record file SHA256, resolved module URL and package
metadata to output JSON. Emit a concise completion message, not source dumps.

The Bash carrier validates safe labels, rejects existing evidence output, captures
Guide and scaffold metadata SHA256 and index readings before and after, invokes
the Node instrument through timeout120 with captured log/exit, and verifies those
preservation readings even when it fails. Always address Git with git -C. Do not
run the instrument during authorship; the new server artifact does not exist yet.
Validate Node and Bash syntax. Return paths, receipts and freeze. Root inspects
and runs after the accepted pack/install instruments complete.
