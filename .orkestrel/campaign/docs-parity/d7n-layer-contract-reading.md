# Contract version reading

The registry serves @orkestrel/contract 0.0.16. The reconciled source at
fd3fce2d2665027021bfef05bb7de1e546fa52ae declares 0.0.17. This is a prepared unpublished
version, not a version bumped by this reading. Retain 0.0.17 as the candidate version
for the layer visit, subject to its accepted artifact and fresh registry check.

Root ran the saved raw command recorded in d7n-layer-contract-registry-reading.log.txt
through the absolute Node and npm CLI entries. The command exited 0. Its raw response
retains the requested metadata, including published versions, dependency categories
that exist in that release, and distribution identity. Fields absent from that response
are absent in the queried published manifest; they are not evidence about local state.
The inspected local manifest is retained unchanged in d7n-layer-contract-manifest.json.

Root then ran git -C C:/Users/mikes/WebstormProjects/contract fetch origin with exit 0.
The subsequent merge-base --is-ancestor origin/main HEAD reading exited 0. rev-parse
reported fd3fce2d2665027021bfef05bb7de1e546fa52ae for HEAD and refreshed origin/main.
The status --short reading was empty. The host time after those readings was
2026-09-08 17:52:48 UTC.

This lookup establishes no fleet order, installed closure or package acceptance. It
does not use or accept the pending custom inventory instrument. No source, version,
dependency, lockfile or installed package changed. The owner's required per-layer bump
decision remains explicit even when an existing prepared version is retained.
