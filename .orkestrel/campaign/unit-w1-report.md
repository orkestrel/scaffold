# Unit W1 report — guard the release-mode config shape

Role `implementer`, engine Opus 5, sole serial writer, dispatched from a clean committed baseline.
Brief: `.orkestrel/campaign/unit-w1-brief.md`.

## What landed

One `it` in `describe('root configuration')` of the vendored `tests/config.test.ts`, asserting that
every entry of the root `projects` array survives a `typeof entry === 'function'` filter, with an
inline object value added to the same filtered population as the control. `host.json` carries the
regenerated digest for the vendored file and the inventory's own digest.

## The firing control

The unit fired the control by inverting its own assertion's polarity to
`expect(callable).toContain(inline)`, never by editing `vite.config.ts`.

Red, `npm run test:config`, exit 1: `AssertionError: expected [ [Function srcCore], …(7) ] to
include { test: { …(3) } }`, one failed and 43 passed. The accepted set is every real entry, each a
function; the rejected value is the inline object.

Green, same command after restoring `not.toContain(inline)`, exit 0, 44 passed.

## Acceptance

`format:check` 0. `check` 0. `test:config` 0 with the assertion named under a verbose reporter.
`build` 0 and `build:inventory` 0. `test:policy` 0. The firing control closed.

`lint:check` returned 1 on a file the unit did not own and could not edit — see the deviation that
follows.

## Deviations the unit reported, and their disposition

**The lint gate was already red, on an Orchestrator instrument.**
`.orkestrel/campaign/rehearsal/drive.mjs` carried `require_` and `__keys`, which
`eslint(no-underscore-dangle)` refuses under `--deny-warnings`. The unit correctly identified the
file as off-limits, proved it byte-identical to HEAD, proved its own owned files lint clean, and
carried on rather than stopping. **Cause:** the Orchestrator committed that instrument after the
baseline gate run, so the baseline recorded green against a tree that no longer existed. Closed by
the Orchestrator renaming the identifiers to `loadFromScaffold` and `subjectKeys`; `lint:check` now
exits 0.

**The brief's build chain was wrong.** `npm run build` already runs `build:host`, so the brief's
`npm run build && npm run build:host` fails the second invocation with `ScaffoldError: Staging host
root is not vacant at dist/host`. The effective chain is `npm run build && npm run build:inventory`.
The brief was wrong; the unit was right to report it.

**Criterion 4 could not precede criterion 6.** Editing a vendored file restales `host.json`, so
`test:config` fails on inventory staleness until the inventory is regenerated. The brief's ordering
put the cheap gate first, which is correct in general and wrong for a vendored edit specifically.

**The control is local rather than the existing `concrete`.** The brief named `control` and
`concrete` for reuse; both are `const` declarations inside another test's body, so reusing them
would have entangled two assertions. The unit built a local `inline` value of the same shape under
the brief's Unknowns clause and left the existing test untouched. Correct call.

## Carried

Nothing. Every criterion the unit could reach is closed, and the one it could not reach was closed
by the Orchestrator in the same commit.
