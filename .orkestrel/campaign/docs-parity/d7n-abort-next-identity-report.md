# Abort native identity-pin report

## Outcome

The Abort native guide entry now binds the package manifest identity to `@orkestrel/abort` before it accepts the Guide pitch report. Its inventory includes `package.json`. Missing inventory, malformed JSON, a non-record manifest, a missing name, and a wrong name fail the entry.

The implementation uses the installed `@orkestrel/contract` `parseJSON` parser and `isRecord` guard. `PACKAGE_NAME` is the shared package-owned identity for the assertion and the package module mapping. No local parser or Guide wrapper was added.

## Control evidence

Root's accepted control changed the manifest name to `@orkestrel/pitch-control` and changed the README tagline to a deliberate mismatch. The predecessor native entry returned exit code `0`:

```text
Test Files  1 passed (1)
Tests  27 passed (27)
Duration  528ms
```

This was a consumer-entry false green. It was not a runtime Abort defect. Root restored the package manifest and README bytes; the matching hashes are recorded under `tmp/pass/d7n-abort-pitch-control-before`.

## Correction

- Added `package.json` to the Guide inventory patterns.
- Added one package identity constant and used it in `MODULES`.
- Parsed the inventory manifest through `parseJSON`.
- Required a plain record through `isRecord`.
- Asserted `manifest.name` equals the package identity before asserting `report.pitch` is clear.

The Guide API, source API, guides, README, manifest, setup policy, and generated config test were not changed by this unit.

## Scoped validation

```text
node --experimental-strip-types tests/guides.test.ts
exit 0
Test Files  1 passed (1)
Tests  27 passed (27)
Duration  519ms
```

```text
npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts
exit 0
All matched files use the correct format.
```

```text
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

```text
git diff --check -- tests/guides.test.ts
exit 0
```

## Paths and limits

- `C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts` — identity pin.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-abort-next-identity-report.md` — supplemental report.

Root-generated edits remain present in `package.json`, `tests/config.test.ts`, and `tests/setupPolicy.ts`. This unit did not alter them. Shared-file patches: none.

No install, formatter write, build, git write, source edit, guide edit, launcher, dependency change, commit, push, or publication ran. Root owns the incorrect-name control rerun, input restoration, normal rerun, prepublish gate, and blind actual-diff review.
