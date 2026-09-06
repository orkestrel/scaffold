# Report — U2-fix-3 (the Orchestrator integration edit), 2026-09-06

Edits applied by `instruments/u2-fix-3.sh` (each replacement asserted unique); the scoped checks:

```text
edited tests/config.test.ts
edited tests/setupPolicy.ts
edited tests/setupPolicy.ts
edited tests/setupPolicy.ts
edited configs/policy.ts
== oxfmt
Checking formatting...

All matched files use the correct format.
Finished in 9ms on 3 files using 4 threads.
exit=0
== oxlint
exit=0
== test:policy
      Tests  77 passed (77)
   Start at  04:01:49
   Duration  1.12s (transform 585ms, setup 538ms, import 112ms, tests 291ms, environment 0ms)

exit=0
== test:config
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  |config| tests/config.test.ts > root configuration > keeps the committed host inventory aligned with the vendored checkout bytes
 Test Files  1 failed (1)
      Tests  1 failed | 107 passed (108)
exit=1
```

The host-inventory case stays red until the verifier's `build` regenerates `host.json`.
