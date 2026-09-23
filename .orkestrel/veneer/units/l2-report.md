# Unit L2 LEDGER-PRIORITY — report

## The case's site

`tests/conformance.test.ts`, `describe('declaration priority')`, placed after the `cascade ledger`
block and before `Bootstrap source order` (around lines 221 to 254). Its one case, "carries the
priority the release writes on every declaration both sheets make, and adds none", reads
`node_modules/bootstrap/dist/css/bootstrap.css` (resolved through
`createRequire(import.meta.url).resolve(...)`) and `readBuiltCascade()` through two `SheetReader`
instances, keys each declaration by `${selector} { ${property} }`, folds the cascade's declarations
into a `Map<string, boolean>` of whether any declaration of that pair is important, then walks the
release's declarations once, comparing each pair both sheets declare (each pair counted once) and
collecting a mismatch line in the form `<selector> { <property> }: release
<important|normal>, cascade <important|normal>`. It asserts `compared` is greater than `0` and
`mismatches` equals `[]`. A comment states D39a: the oracle records no priority, so this case is
where the priority is held equal.

## The plant record

Removed ` !important` from `display: none !important` on the `[hidden]` rule in
`src/styles/_reset.scss` (`@layer reset`). After `npm run build:src`, `npm run test:conformance`
reddened with exactly one failing test and one mismatch line:

```
[hidden] { display }: release important, cascade normal
```

Reversed the edit exactly (`display: none !important` restored byte-for-byte). After
`npm run build:src`, `npm run test:conformance` passed all 19 tests, matching the mixin unit's
head reading.

## The guide sentence

Added, in `guides/veneer.md`, immediately after "…each matching Bootstrap's own declaration." and
before "Where a class name exists…": "The conformance proof holds that agreement for every
declaration both sheets make: each shared selector and property carries the same priority on both
sides, because the oracle records values without their priority." Rewrapped the paragraph at or
under 100 columns.

## Gate exits

- `npx oxfmt --config .oxfmtrc.json --write tests/conformance.test.ts guides/veneer.md`: applied
  (reformatted the new import line and the case's argument wrapping).
- `npx oxfmt --config .oxfmtrc.json --check tests/conformance.test.ts guides/veneer.md`: exit 0,
  "All matched files use the correct format."
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/conformance.test.ts`: exit 0, no
  output.
- `npm run check`: exit 0 (`tsc` over the root project, `check:src:core`, `check:src:browser`,
  `check:src:styles`, and `check:app:browser` through `vue-tsc`, all clean).
- `npm run build:src`: exit 0.
- `npm run test:conformance`: exit 0, 19 tests passed, the new case included; it compares 1350
  pairs (matching the Orchestrator's probe reading in `l2-probe.log.txt`) with no mismatch at the
  worktree's head.
- `npm run test:guides`: exit 0, 18 tests passed.

## `git status --porcelain`

```
 M guides/veneer.md
 M tests/conformance.test.ts
```

`src/styles/_reset.scss` is clean: the plant's exact reverse edit restored it to the worktree's
head.

## Deviations

None. The case did not redden on the tree before the plant, the plant reddened it with the one
expected line, and no gate touched a file outside the owned scope.
