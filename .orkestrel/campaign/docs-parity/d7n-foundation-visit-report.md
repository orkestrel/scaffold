# d7n foundation visit report

## Status

Authored the public repair entry and root foundation visit script. Package execution remains unrun.

## Created paths

- `tmp/pass/path-artifact-pilot/foundation-constants.mjs`
- `tmp/pass/path-artifact-pilot/foundation.mjs`
- `tmp/pass/prepare-foundation.sh`

## Reuse

`foundation.mjs` reuses frozen pilot functions for output creation, filtered plan construction,
selection, byte readings, packed-host comparison, preservation checks, and receipts. It limits
targets to codec, contract, msg, sse, and test. The selected repair paths remain
`tests/setupPolicy.ts` and `tests/config.test.ts`.

`prepare-foundation.sh` validates package state and the supplied Guide tarball, uses the packed
scaffold host identity, records stage output through `run`, preserves manifest and lock hashes,
runs the declared package gates only through `prepublishOnly` and `docs`, and records packed
artifact evidence. Its EXIT trap saves target status and binary diff on every exit.

## Syntax validation

`node --check tmp/pass/path-artifact-pilot/foundation-constants.mjs` exited `0`.

`node --check tmp/pass/path-artifact-pilot/foundation.mjs` exited `0`.

`C:/Users/mikes/scoop/apps/git/2.55.0.5/bin/bash.exe -n tmp/pass/prepare-foundation.sh`
exited `0`.

`git diff --check` over the owned paths and this report exited `0`.

## Unrun work

No repair, registry view, installation, package gate, documentation command, or pack command ran.
