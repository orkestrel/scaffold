# Guide final instruments check

1. V1 — BROKEN

Evidence: `tmp/pass/validate-guide-heading.sh:80-97` installs the EXIT trap before the gate chain, but the branch, state, and baseline preconditions at lines 82-88 can fail before the trap exists, so those failures do not capture final state. The success marker is touched at line 97 before the EXIT trap's final comparison at lines 64-77; if the chain changed tracked state, `finish` exits nonzero but the success marker already exists. The ordering does not satisfy the claim that a success marker exists only after the final comparison succeeds. `bash -n tmp/pass/validate-guide-heading.sh` exited 0.

2. V2 — CONFIRMED

Evidence: `tmp/pass/validate-guide-heading.sh:90-97` invokes the requested commands in order: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, and `npm run docs`. The `run` helper at lines 13-29 records the command, output, and exit and returns failures; the validator contains no install, docs-direction, formatting write, repair, or source cleanup operation. Final tracked-state comparison is performed by `finish`.

3. P1 — CONFIRMED

Evidence: `tmp/pass/pack-guide-heading.sh:61-81` validates one full hexadecimal SHA, branch, clean state, HEAD, origin ancestry after `fetch`, package name, and version. Lines 83-92 allocate fresh packed and extraction directories, build, pack to the fresh destination, require the exact tarball, extract it, and byte-compare its distribution entry with the built distribution. Lines 99-101 recheck clean state and unchanged HEAD. The generated path cannot overwrite the retained tarball because `mktemp -d` creates a fresh directory.

4. P2 — BROKEN

Evidence: `tmp/pass/pack-guide-heading.sh:94-102` prints commit, version, tarball path, tarball hash, distribution hash, and final status to stdout, while `finish` persists only status and diff files at lines 45-58. No metadata log or result file captures the printed artifact identity and measured hashes. The `run` helper logs build, pack, extract, and compare commands, but it does not capture the later metadata prints. `bash -n tmp/pass/pack-guide-heading.sh` exited 0.

Syntax evidence: `bash -n tmp/pass/validate-guide-heading.sh` and `bash -n tmp/pass/pack-guide-heading.sh` each exited 0. No package gate, build, pack, install, or script body ran.

VERDICT: FAIL V1, P2; outside the claims: none
