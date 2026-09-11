# Align Scaffold's pin-bound expectations

Act as the mechanical builder on the native builder engine. Read AGENTS.md,
orchestration, names/TypeScript/tests/workspace/portability/writing/quality rules,
the publish skill and wave reference, and guides/scaffold.md dependency-floor
section. You are the sole source writer in canonical Scaffold for this unit.
Other work exists; preserve the catalog, mirrors, manifest pins and regenerated
lock already present. Use apply_patch. Spawn nothing. Do not install, build,
run a whole suite, change Git refs, authenticate, publish or read secrets.

Own only these exact fixture edits:

- tests/src/core/fixtures/app-only-toolchain.txt: Contract ^0.0.16 to ^0.0.17,
  HTML ^0.0.8 to ^0.0.9, Test ^0.0.13 to ^0.0.14.
- tests/src/core/fixtures/source-manifest.txt and setup-false-manifest.txt:
  Test ^0.0.13 to ^0.0.14. Preserve every other byte.
- tests/src/bin/CLI.test.ts: in the assertion belonging to 'reports only the
  missing shared test tool for an app-only workspace', change only the quoted
  Test floor ^0.0.13 to ^0.0.14. Preserve the static expectation and its comment.
- package.json: remove 'five ' from its description. Change no other field.

The root's real installed pin baseline is red in
tmp/pass/d7n-scaffold-upper-pins-red. Root read the exact snapshot diffs: they
contain only the specified release-floor values. The scoped CLI case also ran
red with exactly the specified quoted-floor change; its output and exit are in
tmp/pass/d7n-scaffold-upper-pin-controls. The root invoked probe/prove on the
real BASE_DEV_DEPENDENCIES floor with the preceding value as its runtime
control. It returned the legacy stream-representation error, not a receipt.
Do not claim that transport defect is fixed or widen this unit to fix it.

No public contract or implementation changes here. Reusable declarations stay
untouched. The source reads these floors from the authoritative package manifest.
Do not replace the static fixture expectations with a computation from that
same source and do not bulk-update snapshots.

Run only a scoped formatter check on the touched TS/JSON paths if useful.
Root will rerun the exact core-file and CLI-case commands, then prepublishOnly
alone. Return exact touched paths, focused diff, command exits and any deviation.
Stop if a requested old value is absent or any other fixture byte must change.
