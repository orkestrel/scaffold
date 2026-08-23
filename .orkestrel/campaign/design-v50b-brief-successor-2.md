# Second successor — the last unknown, and a correction to the registry reading

## Settled: `supervisor` is the eighth `configs/browsers.ts` carrier

`supervisor` was cloned and read at `origin/main`, 2026-08-22. It carries `app/browser` and
`app/server` beside `src/core` and `src/server`, and `configs/browsers.ts` follows the browser
axis across `src` and `app` alike. It publishes no browser face.

The consequence for the browser stage: the axis that generates `configs/browsers.ts` is wider than
the set of packages whose **published** surface needs a browser stage. A workspace can carry the
Chromium resolver and still need no browser branch in its distribution proof, and the distribution
proof covers the published `src` faces only. Selecting the branch from `configs/browsers.ts`
presence would therefore over-select.

## Correction: the registry sweep lags an unpublished commit

`supervisor` locally declares `test:setup` at version 0.0.2 and carries
`tests/setupServer.test.ts`. The registry serves 0.0.1, which declares neither. The registry
reading in `provision-evidence-correction.md` names its own coverage limit, and this is a
measured instance of it: the setup-proof carriers are at least `ollama`, `process`, and
`supervisor`, and an unpublished commit elsewhere in the fleet may add more.

This does not disturb the correction's finding. `mcp` and `terminal` were checked by checkout
rather than by registry, and neither carries a file matching `tests/setup*.test.ts`.

## The proof's path is a glob, not a fixed path

`supervisor` satisfies `Blueprint.setup` through `tests/setupServer.test.ts`, not
`tests/setup.test.ts`. The derivation at `src/bin/CLI.ts:970` matches any file in `tests/` whose
name starts with `setup` and ends with `.test.ts`, and the `setup` project's `include` is
`tests/setup*.test.ts`.

Rule on what that means for ownership. `DISTRIBUTION_TEST_PATH` is one exact path, and the
`Ownership` vocabulary in `src/core/types.ts` claims presence over a path. A glob has no single
path to claim, so a presence claim over a generated setup proof must either fix one canonical
path — and then report drift in a workspace that satisfies the glob at another name, as
`supervisor` does — or express presence over a pattern, which the ownership model does not
currently carry. State which, and what it costs.

## Executed evidence you must read before answering item 1

`.orkestrel/campaign/setup-proof-evidence.md`, with its instrument `helpers.mjs`. The brief's
candidate assertion was run rather than reasoned about, and it fails in every checkout measured.
Its dominant failure block is the vendored `tests/setupPolicy.ts`, which `repair` restores, so an
adopting target could neither pass the gate nor edit the file to fix it. Read the file for the
package-owned misses and the instrument's coverage limits, and let it decide your ruling on
whether a generated setup proof can assert helper coverage at all.
