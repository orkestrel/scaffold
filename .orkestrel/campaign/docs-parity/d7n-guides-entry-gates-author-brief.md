# Author the scaffold entry acceptance carrier

Act as native builder on Terra. Author the specified script only; root runs it after
the source writer has returned. You are not alone. Preserve all other edits and spawn
nothing. Read primary AGENTS.md, .agents/orchestration.md, portability, workspace,
quality and writing rules, orkestrel-harden-package with centralization, contract and
hardening references, guides/README.md and the matching scaffold guide commands.

Read primary campaign d7n-guides-entry-design-verdict.md and
d7n-guides-entry-fix-brief.md. The isolated source worktree is
/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-guides-entry at baseline
9b3003d14ca73c5218a7cb2a968f8b35600d3280 plus the returned entry candidate.

Own only /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/run-guides-entry-gates.sh.
Do not modify the candidate or the primary checkout. No install, commit, push,
publication, credentials, formatter write, lint fix or gate execution by this role.
Use apply_patch. Return syntax evidence and the exact plain root launch.

Author a Bash carrier that sources pass-env.sh and changes directory explicitly to
the isolated worktree. Require its exact branch and baseline, and refuse a missing
scripts/guides.ts or an existing scripts/docs.ts. Require primary owner manifests
to match the recorded SHA256 values before and after:

- package.json: ca21d0993005c32bf4c1b5654db727d911ff01d82b9a82dd716d51e0fe5c0fd4;
- package-lock.json: 4c418ce6a2987fdf93c82b5385c6bcf0438f242e46d33ef2610a3c2cac62542b.

Create a fresh evidence directory tmp/pass/d7n-guides-entry-gates.XXXXXX. Record
before/after source status, full Git diff, untracked entry content and file digest.
Guard the isolated manifest and lock bytes across the run. Permit build-generated
host.json changes and capture them; do not accept or stage them. Record every reached
command's raw log, exit code and duration; stop at a failure and leave unreached gates
unclaimed. Store logs directly in the evidence folder, not under a gitignored logs/.

Validate the resolved dist cleanup target before invoking the existing build:
it must be the isolated checkout's own ordinary dist directory, or absent, not a link,
mount or another root. Do not invoke a recursive delete directly. Run the existing
package chain in this order:

    npm run format:check
    npm run lint:check
    npm run check
    npm run build
    npm test

Use the Bash PATH from pass-env.sh, not the PowerShell npm shim. Do not modify the
installed dependency tree or run registry-final distribution. Capture the generated
host inventory hash, script entry hash and Guide installed core hash. Require installed
Guide core SHA256 6455f6f9399961cc499631c8e3d7db7e7b5d7c5062c44ffd72144c41f1395205.

After a successful chain, run npm run test:guides explicitly and require no authored
source, guide, manifest or lock byte movement. Compare before/after authored files
excluding generated host.json. Use Git diff plus the untracked entry digest, not a
status-only comparison that misses modifications to already-dirty files. Do not run
either rewrite direction against scaffold's real source: real temporary-workspace
cases prove those directions.

The root launch uses an external 1800s timeout with a short kill grace. Do not detach,
monitor, restart or choose a longer cap. Root tracks the exec and reruns a whole-suite
or timing failure alone before ruling. A separate independent verifier consumes the
actual receipts. Keep prose free of counts and positional references.
