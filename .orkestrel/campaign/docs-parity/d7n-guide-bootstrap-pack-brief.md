# Unit d7n-guide-bootstrap-pack — port the accepted Guide pack runner

Act as builder on Terra. Perform this fully specified assignment directly and spawn
nothing. You are not alone. Own only tmp/pass/pack-guide-bootstrap.sh,
tmp/pass/read-package-field.mjs and tmp/units/d7n-guide-bootstrap-pack-report.md.
Do not edit a predecessor or any package checkout. Guide has a live source writer.

Read AGENTS.md, .agents/orchestration.md, portability, architecture, TypeScript,
quality and writing rules; orkestrel-harden-package SKILL.md and hardening reference;
guides/README.md and guides/scaffold.md. Read tmp/pass/pack-guide-heading.sh.

Copy that existing accepted runner into pack-guide-bootstrap.sh. Change only its
script identity and log/artifact-directory labels from heading to bootstrap, plus
its read_package function. Replace the node -p command with a Node invocation of
the owned read-package-field.mjs file, receiving the package JSON path and field.
Keep clean/branch/expected-SHA checks, fetch/ancestry checks, build-before-pack,
ignore-scripts packing, extracted-member comparison, full digest receipt and final
state comparisons unchanged. Package remains @orkestrel/guide at 0.0.18. The runner
accepts its source commit as an argument; do not hardcode the in-flight writer tip.

Make read-package-field.mjs a small standalone entry: read the positional JSON path
with node:fs/promises, admit only name or version as the positional field, parse the
JSON and require a non-null object with that own field and a string value. Print the
field value. Throw on a missing path, unsupported field or non-string field. Do not
add a dependency, helper framework, nested function, assertion or any type. No path
rewriting is needed: read the supplied filesystem path through the native API.

This successor removes a Windows approval-classifier hazard. It does not redesign
packing or certify final runtime dependencies. Root will execute it only after
Guide's retained source corrections, gates and acceptance. Root owns all installs,
builds and packing. Do not run this shell script.

Syntax-check the authored module and shell file. You may run the reader directly
against C:/Users/mikes/WebstormProjects/guide/package.json for name and version,
then an unsupported field that must fail. Retain actual exits. Compare the successor
to the predecessor and report the exact changes. Use apply_patch for authored files.
No Git mutation, commit, push, publish, secret access, cleanup or source edits.

Stop if the specified substitution requires a different mechanism. Return the paths,
syntax/read controls and unrun packing state; do not claim release readiness.
