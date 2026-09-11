# Author the upper tooling installer and final visit

Act as the mechanical builder on the native builder engine. Read Scaffold AGENTS,
orchestration, portability/writing/workspace/quality rules, publish skill and wave
reference, and guides/scaffold.md dependency-floor and ownership sections. You
are not alone in the workspace. Own only the new scripts named below in Scaffold
tmp/pass. Preserve source and campaign changes. Spawn nothing. No installs,
full gates, commits, pushes, authentication, publication, or secret reads.

Author successors with apply_patch, retaining predecessors unchanged:

- install-upper-layer-tooling.sh: derive from install-following-layer-tooling.sh.
  Arguments: package, fresh safe label, Guide pack label, Guide SHA-256,
  Scaffold pack label, Scaffold SHA-256. Restrict targets to guide, browser,
  interpret, lsp, qualifier, queue, rater, relation, sea, server, terminal,
  workspace. Require canonical manifest identity, safe labels, exact hashes,
  extracted package identities and versions Guide 0.0.18 / Scaffold 0.0.64.
  Install the actual Scaffold archive and, except in Guide itself, actual Guide
  archive using npm --no-save --ignore-scripts --package-lock=false. Add registry
  Test 0.0.14; do not stage old HTML/Markdown/Probe archives. Preserve manifest,
  lockfile, HEAD, index and tracked status. Record the replaced declared ranges
  via package JSON snapshots or explicit extraction before install. Compare
  each installed tooling package's complete dist to its extracted archive with
  diff -r. Capture actual exits and npm ls evidence without treating expected
  no-save version-range mismatch as a successful published-runtime proof.
- finish-upper-layer-native-final.sh: derive from the following final visit.
  Arguments: package, expected HEAD, pending version, registry baseline version,
  fresh visit label, Guide pack label/hash, Scaffold pack label/hash. Same exact
  allowlist. Use upper-layer-action.sh, install-upper-layer-tooling.sh and
  pack-upper-layer-final-verified.sh. Preserve clean campaign HEAD refusal,
  offline overwrite's exact known catalog note, audit zero, supported catalog,
  canonical Guide mirror, lock/ci/tooling/format/prepublish/actual-pack order,
  evidence binding and true exits. Do not duplicate or redesign behavior. Do not
  add a manual scripts.docs deletion: supported Scaffold owns script removal.
  Verify scripts.docs absent after overwrite with the JSON reader; retired
  scripts/docs.ts and scripts/guides.ts must be absent. Stop if they remain.

Write all paths forward-slash. Shell scripts may contain multi-step syntax;
launch commands must remain plain script calls. Never touch credentials or
accept package paths outside canonical WebstormProjects. Root supplies final
accepted hashes and executes. Syntax-check only. Return owned paths, diffs,
syntax exits, and any deviation. Independent review uses root actual receipts.
