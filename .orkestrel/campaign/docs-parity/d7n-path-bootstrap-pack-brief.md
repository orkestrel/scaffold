# Unit d7n-path-bootstrap-pack — package the accepted host build

Act as builder on Terra. Own only tmp/pass/pack-path-bootstrap.sh and
tmp/units/d7n-path-bootstrap-pack-report.md in C:/Users/mikes/WebstormProjects/scaffold.
You are not alone; preserve every other edit. Write the script with apply_patch, do
not execute it. No installs, builds, source edits, Git mutations, publication, secrets
or delegation. Root executes the checked instrument.

Read AGENTS.md, .agents/orchestration.md, portability, quality and writing rules,
orkestrel-align-packages SKILL.md and fleet/integration references, guides/README.md
and guides/scaffold.md packaging and packed-host contract. Read the campaign's
d7n-scaffold-path-landing-verdict.md and d7n-layer-supported-map-reading.md.

The accepted isolated build is
C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/dist.
Its accepted canonical source is c90089c99b03c692e8eda3935af592601a5e87e3, integrated
from this isolated candidate. This worktree remains at its earlier base with the
accepted source edits; do not commit or discard them. The built package version is
0.0.63. This pack is provisional path/tool bootstrap, never a final release artifact.
Do not bump it or install it into a fleet package in this unit.

Author this exact bounded Git Bash script:

- Source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh. Use set -euo
  pipefail, forward-slash paths and quoted native shell variables.
- Verify the isolated directory, dist/host/manifest.json, dist/host/tests/setupPolicy.ts,
  dist/host/tests/config.test.ts and dist/src/core/index.js exist. Verify its source
  tests/setupPolicy.ts and tests/config.test.ts are byte-equal with primary scaffold's
  accepted copies using cmp. Do not read primary package/lock or credentials.
- Make an exclusive mktemp -d directory under existing SCR/packed with a descriptive
  path-bootstrap prefix. Print the path; save all following evidence inside it.
- Capture isolated Git HEAD and status using git -C to receipt files.
- Capture source package.json and lock SHA-256 into a checksum file.
- Run npm pack --ignore-scripts --json --pack-destination with that absent artifact
  folder, from the isolated worktree, redirecting stdout and stderr to distinct logs.
  Use the npm already on PATH; do not rebuild or trigger lifecycle scripts.
- Require orkestrel-scaffold-0.0.63.tgz in the new folder. Save its SHA-256 and tar
  member list. Save package/package.json from the tarball as packed-manifest.json.
  Save the packed host manifest and packed setupPolicy/config test member hashes.
  Use native tar extraction to stdout, not a new extractor or a broad filesystem copy.
- Check the saved source manifest/lock checksum file after packing. Print evidence
  paths and digests. Never overwrite an existing artifact, remove anything, synthesize
  dependency metadata, claim release readiness or run npm publish.

Keep each root shell launch a plain script-file command. Do not use a here-document or
inline node -e/-p. Return the actual authored script and its rationale in the report;
a syntax-only bash -n check is permitted. Source gates already closed separately;
do not rerun them in this authoring unit.

