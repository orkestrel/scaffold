# Probe native helper correction handoff

## Outcome

The guide-test extraction helpers now represent absence with `undefined`. Their focused cases expect that contract, and guide-test callers assert presence and narrow before using extracted text.

The failure-table collection is now named `failures`, so it does not shadow the `GuideCommand` rows.

## Changed paths

- `C:/Users/mikes/WebstormProjects/probe/tests/guides.test.ts`: narrows required extracted text and renames the failure-table collection.
- `C:/Users/mikes/WebstormProjects/probe/tests/setupServer.ts`: changes the named extraction helpers to return `undefined` when content is absent.
- `C:/Users/mikes/WebstormProjects/probe/tests/setupServer.test.ts`: updates focused absence expectations.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-probe-native-helper-report.md`: records this handoff.

No CLAIM, DIGEST, receipt workload, deadline, guide declaration, source contract, or implementation changed. Root-owned lint, type, native, and release gates were not run.
