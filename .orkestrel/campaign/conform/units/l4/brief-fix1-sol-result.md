## Assertions
- `tests/guides.test.ts:392`: `draft.output.format === 'diff'`
- `tests/guides.test.ts:393`: `draft.trace === undefined`
- `tests/guides.test.ts:394`: `buildGateDefinition().rules.length === 7`

## Red and green
- Red: `1 failed | 19 passed (20)` — `/home/user/work/evidence/brief-proofs/fix1-red.txt`
- Green: `20 passed (20)` — `/home/user/work/evidence/brief-proofs/fix1-green.txt`

## `:352` rewrite
`guides/brief.md:352`: “round-trips the exact-record validators named earlier.”

## `above|below` sweep
- Document pointers remain at `guides/brief.md:208`, `:632`, `:1066`, and `:1080`.
- `guides/brief.md:545` is rank comparison; `:1044` is an operator literal.
- `src/core/BriefCompiler.ts:112` is a comment pointer.
- `src/core/helpers.ts:349`, `:350`, and `:355` are operator literals; `:669` is rank comparison.
- Comment pointers occur at `tests/src/core/BriefCompiler.test.ts:547`, `tests/src/core/BriefManager.test.ts:126`, `tests/src/core/parsers.test.ts:106`, `tests/src/core/shapers.test.ts:115`, `:124`, `:193`, `:241`, `tests/policy.test.ts:544`, and `tests/guides.test.ts:277`.
- `tests/setupPolicy.ts:2098` describes a path location.
- No hits in `guides/README.md` or `README.md`.

## `git status --short`
```text
 M README.md
 M guides/brief.md
 M src/core/BriefCompiler.ts
 M src/core/BriefManager.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/BriefCompiler.test.ts
 M tests/src/core/BriefManager.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/validators.test.ts
```

## Exit codes
- `npm run format:check`: `0`
- `npm run lint:check`: `0`
- `npm run check`: `0`
- `npm run test:guides`: `0`

## Deviations
Expected: no document pointers in `guides/brief.md`.

Found: pointers remain at lines 208, 632, 1066, and 1080. They were not edited because the brief owns only line 352. The report records this deviation.