# Guide carrier pre-build inspection correction

Act as native builder on Terra. Keep the authoring brief's ownership and authority.
Perform this bounded assignment directly and spawn nothing. You are not alone;
preserve every other edit. No install, build, pack, commit or canonical package edit.

Root exec 18496 exited 1 at inspect.mjs in tmp/pass/d7n-guide-stage.jREDPY. Runtime
dependency manifests resolved to the accepted versions, but inspect.mjs then called
require.resolve('@orkestrel/guide') before the archive had been built. It failed with
MODULE_NOT_FOUND for guide/dist/src/core/index.cjs. No package gate ran. Canonical
Guide remains clean and the stage manifest/lock checks passed.

Own only tmp/pass/guide-artifact-stage/inspect.mjs. Remove its premature guide-entry
console.log containing require.resolve('@orkestrel/guide'). Retain the Guide manifest
identity and all runtime dependency resolution checks. The real packed consumer after
build already verifies Guide's runtime entry. Make no other mechanism change.

Run node --check on this file if the shell returns its exit status; otherwise name
it unverified. Return the exact diff and report. Root reruns the saved carrier in a
fresh disposable stage and supplies the result for independent verification.
