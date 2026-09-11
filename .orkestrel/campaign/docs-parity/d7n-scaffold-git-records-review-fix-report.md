# Scaffold git-record review fix report

## Outcome

Done within the review continuation. This is implementation evidence, not release acceptance.

`readGitRecords` now constructs `TextDecoder('utf-8', { ignoreBOM: true })`. This keeps a leading
U+FEFF in the first Git record as filename data while retaining the decoder's default replacement
behavior for malformed UTF-8. The collector and refuser now have complete parameter and return
TSDoc.

The mirrored helper suite now directly proves split UTF-8 decoding, a delimiter arriving after its
record, pending-fragment completion, empty-record omission, preserved order, inventory refusal at
the existing boundary, unfinished-path acceptance and refusal at the existing boundary, ignored
input after refusal, and retention of the initial `TARGET` reason. These cases use actual
`TextDecoder`, `TextEncoder`, `AbortController`, and owned byte chunks. No Process session was
mocked.

The suite also runs `git rev-parse --show-toplevel` through `readGitRecords`. That real Git query
exits successfully but emits no NUL terminator, and the test proves the incomplete final record is
refused under `TARGET`.

## Baseline and owned scope

Expected and found HEAD: `502428f11b792feab233120d1de395b197117610`.

This continuation retained the prior Git-stream source, CLI await change, guide edit, and original
report. It changed only:

- `src/bin/helpers.ts`
- `tests/src/bin/helpers.test.ts`

Root's release metadata, generated fixtures, guides, campaign evidence, and sibling package work
were preserved. No dependency, config, caller, public package contract, generated output, manifest,
fixture, ref, install, build, full suite, commit, push, or publication action ran.

## BOM defect proof

The regression creates a real scratch Git repository, writes a real blob, indexes a filename whose
first character is U+FEFF through `git update-index -z --index-info`, and reads the real
`git ls-files -z` result.

Exact command before the decoder change:

```text
node_modules/.bin/vitest.cmd run --config vite.config.ts --no-cache --reporter=dot --project src:bin tests/src/bin/helpers.test.ts -t "preserves a leading BOM in the first tracked filename"
```

Red result:

```text
exit: 1
Test Files  1 failed (1)
Tests  1 failed | 114 skipped (115)
expected [ 'leading.txt' ] to strictly equal [ '\ufeffleading.txt' ]
```

The identical command after the decoder change:

```text
exit: 0
Test Files  1 passed (1)
Tests  1 passed | 114 skipped (115)
```

The case requires a real Git child and raw process stream, outside the `prove` stages. The permanent
mirrored regression is the fallback instrument, and its pre-fix run is the negative control. No
Probe receipt applies.

## Scoped validation

```text
npm run test:src:bin -- tests/src/bin/helpers.test.ts
exit: 0
Test Files  1 passed (1)
Tests  115 passed (115)
```

```text
npm run check:src:bin
exit: 0
```

```text
node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check src/bin/helpers.ts tests/src/bin/helpers.test.ts
exit: 0
All matched files use the correct format.
```

```text
node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings src/bin/helpers.ts tests/src/bin/helpers.test.ts
exit: 0
```

```text
git diff --check -- src/bin/helpers.ts tests/src/bin/helpers.test.ts
exit: 0
```

## Deviations and handoff

No deviation occurred. No shared-file patch was made. Independent Astra re-review and root's final
generated convergence, prepublish, and pack receipts remain required.
