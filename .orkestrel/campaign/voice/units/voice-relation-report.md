# Unit voice-relation — report

Every TSDoc block under `src/` of `@orkestrel/relation` opens with a third-person `-s` verb, and
each boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at every step.
No deviation.

## Counts by kind

Blocks in the population: 41. First sentences rewritten: 38. Left untouched because they already
satisfied the rule: `resolveRelation`, `readColumn`, and `countAttached` in `src/core/helpers.ts`.

| Kind                                            | Count |
| ----------------------------------------------- | ----- |
| First sentence from the imperative              | 9     |
| First sentence given a verb                     | 25    |
| First sentence reworded to drop the symbol name | 4     |
| Boolean `@returns` rewritten                    | 2     |

The name-dropping rewrites also carried a verb, so they sit in their own row rather than in the
verbless row: `Model`, `RelationManager`, `ModelInterface`, and `RelationManagerInterface`. The
boolean `@returns` rewrites sit inside blocks whose first sentence is counted under the imperative
row: `isRelationError` and `isRelationDescriptor`.

Two blocks the launch scan bucketed as imperative are noun phrases ruled by reading:
`RelationsShape` (`Per-table relation maps — …`) and `FindOptions` (`Pagination, ordering, …`).
One block the scan bucketed as third person is a noun phrase too: `RelationManagerOptions`
(`Options for …` → `Configures …`). All three are counted in the verbless row.

## Files touched

- `/home/user/fleet/relation/src/core/Model.ts` — the `Model` class doc drops the symbol's name and
  takes a verb.
- `/home/user/fleet/relation/src/core/RelationManager.ts` — the class doc drops the `relation
  registry` restatement and leads with `Resolves`.
- `/home/user/fleet/relation/src/core/errors.ts` — `RelationError` gains `Represents`,
  `isRelationError` moves to `Narrows` and the ruled boolean `@returns`.
- `/home/user/fleet/relation/src/core/factories.ts` — `createRelationManager` moves to `Creates`.
- `/home/user/fleet/relation/src/core/helpers.ts` — `resolveRelationMap` and the five builders move
  to the third person.
- `/home/user/fleet/relation/src/core/types.ts` — 24 blocks gain a verb; `ModelInterface` and
  `RelationManagerInterface` also drop the symbol's name.
- `/home/user/fleet/relation/src/core/validators.ts` — `isRelationDescriptor` moves to `Narrows`
  and the ruled boolean `@returns`.

## Gates

| Command                | Exit | Result                                                        |
| ---------------------- | ---- | ------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` over 44 files      |
| `npm run lint:check`   | 0    | no output                                                     |
| `npm run check`        | 0    | root project and `configs/src/tsconfig.core.json` both clean   |
| `npm run build`        | 0    | `dist/src/core/index.js` and `index.cjs` emitted, declarations built |
| `npm test`             | 0    | `test:src`, `test:policy`, `test:config` (46), `test:setup` (10), `test:guides` (23) all passed |

`npm run lint` and `npm run format` were not needed: `format:check` passed on the first run.
`npm test` is reported as an observation for timing; the Orchestrator's landing chain is the
authoritative run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-relation.diff` — 368 lines, 58 insertions and 45
  deletions across 7 files.
- `/home/user/scaffold/tmp/units/voice/voice-relation.status` — 7 modified files, all under
  `src/core/`.

Every changed line is a comment line. The check that proves it:

```text
git diff -U0 | grep -E '^[+-]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[+-]\s*(\*|/\*\*|\*/)'
```

It returns nothing, so no `+` or `-` line falls outside a TSDoc comment body.

The acceptance instrument agrees: `.orkestrel/campaign/instruments/voice-scan.mjs` reports
`relation files=8 blocks=41 imperative=0 verbless=0 returnsBad=0`.

## Deviations

None.

## Observations

- Some first sentences were rewrapped so no comment line passes the 100-character `printWidth` in
  `.oxfmtrc.json`: `ResolvedMany`, `ResolvedOne`, `ResolvedThrough`, and `ResolvedMorph` in
  `src/core/types.ts`. The `ModelEventMap` member docs became multi-line blocks for the same
  reason, which preserved their wording exactly rather than shortening it.
- `guides/relation.md` carries the sentences `The relation registry — resolves relations once,
  vends a model per table.` and `A typed table paired with relation-aware load / find and junction
  methods.` in its surface table. `tests/guides.test.ts` pins backticked exports, fence languages,
  and links, not sentences, so the guide was left untouched and the suite stays green.
- The session scratchpad is shared with a concurrent unit: a file this unit wrote at
  `scratchpad/list.mjs` was overwritten by a `rater` instrument mid-run. This unit's instrument was
  renamed to `scratchpad/voice-relation-list.mjs`. No file in `/home/user/fleet/relation` was
  affected.
</content>
</invoke>
