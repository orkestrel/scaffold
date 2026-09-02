# Gate evidence — `@orkestrel/test` after units U1 and U1b (2026-09-02, commit `ce75175`)

Taken by the Orchestrator in the `test` checkout after both units exited and after the pack script
finished, so no unit's exec and no build contended with the run.

```text
$ npm run build
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
build exit=0

$ npm test
 Test Files  7 passed (7)        Tests  455 passed | 9 skipped (464)    (src:core, src:browser, src:server)
 Test Files  1 passed (1)        Tests  111 passed (111)                 (policy)
 Test Files  1 passed (1)        Tests  46 passed (46)                   (config)
 Test Files  3 passed (3)        Tests  24 passed (24)                   (setup)
 Test Files  1 passed (1)        Tests  38 passed | 1 skipped (39)       (guides)
test exit=0
```

The three `[Unhandled error]` and `[Unhandled rejection]` lines the browser project prints during
the run come from the `createJournal` suite dispatching `Boom`, `Refused`, and `Ignored` on purpose
and forwarding them to the console it wraps; they are the journal's own proof, not a failure.

The counts match the readings U1 and U1b reported from inside their own execs (`src:core` 98,
`src:browser` 221, `policy` 111, `setup` 24, `guides` 38 passed with 1 skipped). The `format:check`,
`lint:check`, and `check` gates ran green inside U1b after its final edit.

The packed tarball `tmp/tarballs/orkestrel-test-0.0.11.tgz` carries this commit's build under the
registry's version number; the release wave bumps before publishing. It is installed into
`terrain/node_modules` with `--no-save`; `terrain-reference-tarball.txt` records the swap.
