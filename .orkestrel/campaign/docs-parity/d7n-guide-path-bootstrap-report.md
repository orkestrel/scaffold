# d7n guide path bootstrap report

## Status

Authored the Guide bootstrap visit. It was not installed or executed.

## Source

- `tmp/pass/path-artifact-pilot/guide-constants.mjs` holds the resolved Guide checkout
  and the preserved logical paths.
- `tmp/pass/path-artifact-pilot/guide.mjs` composes the frozen pilot helpers with public
  scaffold exports, repairs the selected paths only, checks packed-host bytes and preserved
  bytes, and writes the required receipts.
- `tmp/pass/path-artifact-pilot/guide.sh` checks the installed packed-host hashes, Guide
  candidate state, baseline policy case, repair exit, final policy case, and before/after
  Git readings. A failed repair retains its output, exit receipt, status, and diff before
  returning the same exit.

## Diff

The new files are `guide-constants.mjs`, `guide.mjs`, and `guide.sh`. Frozen pilot helpers,
pilot entry, pilot constants, and pilot launcher were not changed.

## Syntax validation

`node --check tmp/pass/path-artifact-pilot/guide-constants.mjs` exited `0`.

`node --check tmp/pass/path-artifact-pilot/guide.mjs` exited `0`.

`bash -n tmp/pass/path-artifact-pilot/guide.sh` exited `0`.

`git diff --check` over the owned driver paths and this report exited `0`.

## Unrun assumptions

The script assumes root's existing disposable pilot installation resolves the provisional
scaffold tarball and Guide remains at the supplied candidate head and campaign branch. Root
must execute the script to establish those facts and the configured-policy outcomes.
