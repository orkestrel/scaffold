# Guide entity-heading admission report

## Outcome

Implemented the bounded entity-heading admission repair in the guide checkout. An H3 now enters
the documented class surface only when its trimmed compared inline content equals the raw
backticked value returned by `findFirstCode`. Normalization still runs after admission. The table
reader, Methods reader, section window, keyword-aware key, encounter order, deduplication, and
first-seen behavior are unchanged.

The permanent tests prove the direct extractor and the cached public `Guide` surface. They retain
plain, generic, padded, emphasized, and linked entity headings. They refuse headings with visible
words, additional code, or a whitespace-only code span. They also pin Surface-section exclusion,
same-name/different-keyword entries, table-before-heading Summary retention, and the existing
heading-before-table summary-less limit.

I did not accept this work. Independent audit and authoritative verification remain with the
Orchestrator.

## Baseline

- Checkout: `C:/Users/mikes/WebstormProjects/guide`
- Head: `1d5afa3c637ea280c54649d8661856de05f22eaf`
- Branch: `claude/orkestrel-npm-audit-deps-14ibta`
- Initial `git status --short`: empty
- `ROADMAP.md`: absent
- Installed dependencies inspected: `@orkestrel/markdown@0.0.13` and
  `@orkestrel/contract@0.0.16`

## Contract decisions

- Reused `findFirstCode`, `extractCellText`, `normalizeIdentifier`, and the installed Markdown
  node guards. Added no parser, helper, wrapper, dependency, export, signature, or type shape.
- Compared `extractCellText(block.children).trim()` with the backticked raw code-span value before
  normalization. This preserves code-token boundaries and refuses the whitespace-only-code
  control that flattened text admitted.
- Consolidated the demonstration-before-row markdown in `tests/setup.ts` because the direct
  extractor test and cached `Guide` test consume the same input.
- Kept image handling and empty-identifier policy unchanged.
- Updated `extractSurface`, `extractCellText`, and `GuideInterface.surface` documentation and the
  paired guide cells. The extraction model now states the admission and first-seen boundaries.

## Red and green proof

Exact command:

```text
npm run test:src:core -- tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts
```

Red before the implementation repair:

```text
exit=1
Test Files  2 failed (2)
Tests  5 failed | 459 passed (464)
```

The failures covered the cached `Guide` summary loss, the direct extractor summary loss, and the
incorrect admission of visible-word, additional-code, and whitespace-only-code headings. Evidence:
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-guide-heading-fix/red.log.txt`.

Green after the implementation repair and after scoped formatting:

```text
exit=0
Test Files  2 passed (2)
Tests  464 passed (464)
```

Evidence: `C:/Users/mikes/WebstormProjects/guide/tmp/d7n-guide-heading-fix/green.log.txt` and
`focused-final.log.txt`.

The design receipt is quoted verbatim. It covers the proposed admission fragment and its control,
not this implementation or its gates:

```text
receipt probe:3e7d91fbd8f8771e3d029fafea15c171:runtime:typescript@6.0.3:oxlint@1.81.0:vitest@4.1.11:configs/src/tsconfig.core.json@ffc6382b7365dd2800ee4756927e298b
```

## Scoped validation

- `npx --no-install oxfmt --config .oxfmtrc.json --write src/core/helpers.ts src/core/types.ts tests/setup.ts tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts guides/guide.md` — exit 0. Evidence: `format.log.txt`.
- `npx --no-install oxlint --config .oxlintrc.json --deny-warnings src/core/helpers.ts src/core/types.ts tests/setup.ts tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts` — exit 0 with no warnings. Evidence: `lint-check.log.txt`.
- `npx --no-install oxfmt --config .oxfmtrc.json --check src/core/helpers.ts src/core/types.ts tests/setup.ts tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts guides/guide.md` — exit 0. Evidence: `format-check.log.txt`.
- `npm run check` — exit 0. Root TypeScript and `configs/src/tsconfig.core.json` completed. Evidence: `check.log.txt`.
- `npm run test:src:core -- tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts` — exit 0; 464 tests passed. Evidence: `focused-final.log.txt`.
- `npm run test:guides` — exit 0; 54 tests passed. Evidence: `test-guides.log.txt`.
- `git diff --check` — exit 0. Evidence: `diff-check.log.txt`.
- The scoped completion sweep found no replacement character, forbidden diagnostic suppression,
  skipped/todo test addition, or new production/test function. Evidence: `sweep.log.txt` and
  `sweep.diff.txt`.

The root verifier owns the later full chain. I did not build, pack, install, commit, push, publish,
change a version, or run a tree-wide mutating gate.

## Owned paths changed

- `src/core/helpers.ts`
- `src/core/types.ts` comments only
- `tests/setup.ts`
- `tests/src/core/helpers.test.ts`
- `tests/src/core/Guide.test.ts`
- `guides/guide.md`

No shared-file patch is requested. All other guide paths remained off-limits.

## Diff and status

```text
guides/guide.md                | 156 ++++++++++++++++++++++-------------------
src/core/helpers.ts            |  36 ++++++----
src/core/types.ts              |  10 ++-
tests/setup.ts                 |  12 ++++
tests/src/core/Guide.test.ts   |  10 ++-
tests/src/core/helpers.test.ts |  82 +++++++++++++++++++++-
6 files changed, 215 insertions(+), 91 deletions(-)
```

The larger `guides/guide.md` diff is scoped `oxfmt` table realignment after the target Summary cells
grew. The saved final status contains only the owned modified paths. Evidence:
`C:/Users/mikes/WebstormProjects/guide/tmp/d7n-guide-heading-fix/diff.txt`, `diff-stat.txt`, and
`status.txt`.

## Deviations

The initial `bash tmp/d7n-guide-heading-fix/red.sh` launch resolved to Windows' unregistered WSL
handler and exited before Vitest ran. The saved script was rerun unchanged through the installed
Git Bash executable. That run produced the required red baseline. No implementation, scope, or
validation deviation occurred.
