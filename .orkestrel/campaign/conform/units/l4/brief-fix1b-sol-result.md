## Rewrites
- `guides/brief.md:208`: “the builders below” → “the following builders”
- `guides/brief.md:632`: “the Surface rows above” → “the earlier Surface rows”
- `guides/brief.md:1066`: “the definition above” → “the preceding definition”
- `guides/brief.md:1080`: “as above” → “as in the preceding example”
- `src/core/BriefCompiler.ts:112`: “every stage below” → “every following stage”
- `tests/src/core/BriefCompiler.test.ts:547`: “The two runs below” → “The following runs”
- `tests/src/core/BriefManager.test.ts:126`: “the refusal above” → “the earlier refusal”
- `tests/src/core/parsers.test.ts:106`: “the assertions above” → “the earlier assertions”
- `tests/src/core/shapers.test.ts:115`: “no row above” → “no earlier row”
- `tests/src/core/shapers.test.ts:124`: “the sweep below” → “the following sweep”
- `tests/src/core/shapers.test.ts:193`: “the refusals above” → “the earlier refusals”
- `tests/src/core/shapers.test.ts:241`: “the comparison above” → “the earlier comparison”
- `tests/policy.test.ts:544`: “the empty result above” → “the earlier empty result”
- `tests/guides.test.ts:277`: “the check above” → “the earlier check”

## Permitted hits
- `guides/brief.md:545`: “ranked above” compares outcome ranks.
- `guides/brief.md:1044`: `'above'` is a reasons operator literal.
- `src/core/helpers.ts:349`, `:350`, `:355`: `'above'` is a reasons operator literal.
- `src/core/helpers.ts:669`: “ranked above” compares outcome ranks.
- `tests/setupPolicy.ts:2098`: “below tests/src or tests/app” describes a path location.

## Git status
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
 M tests/policy.test.ts
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