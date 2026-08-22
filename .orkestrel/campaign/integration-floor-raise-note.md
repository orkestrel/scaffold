# Integration note: the test floor raised to 0.0.10

Orchestrator-owned integration, 2026-08-22, between fetch-U2 and fetch-U3, triaging
U2's observation of the pin reds after the `@orkestrel/test` 0.0.10 tarball install.

The floor derives from scaffold's own manifest, so no source table moved. The raise is
the fixtures' designed ritual, each site chosen by its own designating comment or by
sense: `tests/src/core/compilers.test.ts:138` (the floor assertion whose comment says a
raise moves it) and `:187` (the byte-stability digest tripwire, updated to the received
`94b1285620fa…47d4`), `tests/src/bin/CLI.test.ts:738` (the advisory message literal),
`:86` and `:159` (the fixture registry's packuments now serving `0.0.10`), and
`tests/src/core/fixtures/setup-false-manifest.txt:67` (the golden manifest line). The
deliberate below-floor seeds — the `@orkestrel/guide` `^0.0.9` rows and the
`Materializer.test.ts` scenario seeds — stay untouched by sense.

Verification: `src:core` `324 passed (324)` exit 0; `src:bin` `178 passed (178)`
exit 0. The standing-red set for the campaign shrinks to the consolidation's `read`
sites and the two formatter reds on `tests/setupServer.ts` and
`tests/src/bin/CLI.test.ts`.
