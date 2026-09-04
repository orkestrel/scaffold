# Unit toolbox-prose — report

Writer: `builder` on Claude Sonnet, sole writer in `/home/user/fleet/toolbox`, dispatched from
landed tip `5c4228c` (tree was clean at start).

## Rewrites

Each row names the pattern's replacement sense, the location, and whether it adopts the Grok map's
proposed rewrite or is this unit's own (the fix round moved several lines from the map's recorded
numbers; every location here is verified against the current tree, not the map).

### `src/core/types.ts`

- `:200` `via` → `through`, adopts map. Before: `(via`. After: `(through`.
- `:280` `via` → `through`, adopts map. Before: `) via \`rangeOf\`.` After: `) through \`rangeOf\`.`
- `:333` `and/or` → `and`, adopts map. Before: `individually, and/or an`. After: `individually, and an`.
- `:403` `via` → `through`, adopts map. Before: `looked up via`. After: `looked up through`.
- `:438` `currently` deleted, adopts map. Before: `lists the forms currently addressed to \`to\``. After: `lists the forms addressed to \`to\``.
- `:481` `via` → `through`, adopts map. Before: `(via \`createDatabase\``. After: `(through \`createDatabase\``.
- `:554` `e.g.` → `for example`, adopts map. Before: `with (e.g. a`. After: `with (for example a`.
- `:567` `via` → `through`, adopts map. Before: `row cap — via {@link`. After: `row cap — through {@link`.
- `:664` `e.g.` → `for example`, adopts map. Before: `inferred type (e.g. a number sent`. After: `inferred type (for example a number sent`.
- `:695` `e.g.` → `for example`, adopts map. Before: `COERCED values (e.g. \`7\` sent`. After: `COERCED values (for example \`7\` sent`.

### `src/core/constants.ts`

- `:34,131,182,260,297,452` (six occurrences of the same repeated sentence) `via` → `through`, adopts map. Before: `the full text stays retrievable via`. After: `... retrievable through`.
- `:305` `currently` deleted, adopts map. Before: `'List the forms currently addressed to this terminal, or answer...'`. After: `'List the forms addressed to this terminal, or answer...'`.
- `:308` `currently` deleted, adopts map. Before: `list every form currently addressed to this terminal`. After: `list every form addressed to this terminal`.
- `:471` `e.g.` → `for example`, adopts map. Before: `— e.g. the number 7 is NOT valid`. After: `— for example the number 7 is NOT valid`.

### `src/core/factories.ts`

- `:521` `via` → `through`, adopts map. Before: `(via \`@orkestrel/workspace\`'s`. After: `(through \`@orkestrel/workspace\`'s`.
- `:594-596` `ensure` rewritten (behaviour claim, own rewrite — the map's proposal did not carry the line-wrap correction needed to keep the sentence readable). Before: `A WRITING op ensures a target — auto-creating\n// + activating a default workspace when none is active (the no-active ergonomic seam) — while\n// a pure-READ op returns the empty result...` After: `A WRITING op auto-creates and activates a\n// default workspace when none is active (the no-active ergonomic seam) — while a pure-READ\n// op returns the empty result...`.
- `:672` `via` → `through`, adopts map. Before: `rehydrates the sub-agent via`. After: `rehydrates the sub-agent through`.
- `:769` `via` → `through`, adopts map. Before: `up via \`tools.tool(name)\``. After: `up through \`tools.tool(name)\``.
- `:914` `currently` deleted, adopts map. Before: `currently addressed to {@link`. After: `addressed to {@link`.
- `:920` `currently` deleted, adopts map. Before: `of every form currently addressed to \`to\`.`. After: `of every form addressed to \`to\`.`.
- `:922` `via` → `through`, adopts map. Before: `and applies it via`. After: `and applies it through`.
- `:1061` `via` → `through`, adopts map. Before: `DATABASE_TOOL_LIMIT}) via`. After: `DATABASE_TOOL_LIMIT}) through`.
- `:1063` `via` → `through`, adopts map. Before: `is normalized via`. After: `is normalized through`.
- `:1310` `via` → `through`, adopts map. Before: `\`Include\` tree via {@link`. After: `\`Include\` tree through {@link`.
- `:1432` `via` → `through`, adopts map. Before: `infers a schema via \`@orkestrel/contract\`'s`. After: `infers a schema through \`@orkestrel/contract\`'s`.
- `:1433` `via` → `through`, adopts map. Before: `\`{ value: <schema> }\` via \`schemaToObject\` (mirrors`. After: `\`{ value: <schema> }\` through \`schemaToObject\` (mirrors`.
- `:1441` `via` → `through`, adopts map. Before: `inferred schema (via \`@orkestrel/contract\`'s`. After: `inferred schema (through \`@orkestrel/contract\`'s`.
- `:1449` `i.e.` → `that is`, adopts map. Before: `this value", i.e. would {@link createEndpointTool}'s`. After: `this value", that is would {@link createEndpointTool}'s`.
- `:1451` `guarantee` deleted (behaviour claim), adopts map. Before: `by the house parse/guard round-trip guarantee, a \`valid: true\` entry is`. After: `by the house parse/guard round-trip, a \`valid: true\` entry is`.
- `:1460` `e.g.` → `for example`, adopts map. Before: `candidate (e.g. a`. After: `candidate (for example a`.
- `:1544` `via` → `through`, adopts map. Before: `\`definition.samples\` via`. After: `\`definition.samples\` through`.
- `:1546` `via` → `through`, adopts map. Before: `\`{ value: <schema> }\` via \`schemaToObject\` —`. After: `\`{ value: <schema> }\` through \`schemaToObject\` —`.
- `:1553` `e.g.` → `for example`, adopts map. Before: `COERCED value (e.g. \`7\` sent for a`. After: `COERCED value (for example \`7\` sent for a`.

### `src/core/shapers.ts`

- `:46` `currently` deleted, adopts map. Before: `'List the forms currently addressed to this terminal.'`. After: `'List the forms addressed to this terminal.'`.
- `:241` `via` → `through`, adopts map. Before: `every field via \`stringShape\``. After: `every field through \`stringShape\``.
- `:490` `via` → `through` (this unit's line number; map recorded `:488` before the fix round shifted it). Adopts map's sense. Before: `compiled via`. After: `compiled through`.
- `:605` `via` → `through` (map recorded `:603`). Adopts map. Before: `expanded via {@link import('./helpers.js').expandInclude}.`. After: `expanded through {@link import('./helpers.js').expandInclude}.`.
- `:609` `e.g.` → `for example` (map recorded `:607`). Adopts map. Before: `relation names, e.g. "contacts.account".`. After: `relation names, for example "contacts.account".`.

### `tests/setupServer.ts`

- `:2` `currently` deleted, adopts map. Before: `Read every chunk currently buffered on an SSE response body.`. After: `Read every chunk buffered on an SSE response body.`.
- `:5` `currently` deleted, adopts map. Before: `@returns The currently available decoded text`. After: `@returns The available decoded text`.

### `tests/src/core/factories.test.ts`

- `:1117` `via` → `through`, adopts map. Before: `persistence observable via the store`. After: `persistence observable through the store`.
- `:1190` `via` → `through`, adopts map. Before: `schema accept/reject via agentToolShape`. After: `schema accept/reject through agentToolShape`.
- `:1350` `via` → `through`, adopts map. Before: `failure via the manager envelope`. After: `failure through the manager envelope`.
- `:1438` `via` → `through`, adopts map. Before: `ToolboxError via the manager\`s error envelope`. After: `ToolboxError through the manager\`s error envelope`.
- `:1467` `via` → `through`, adopts map. Before: `the peer answers via the answer tool`. After: `the peer answers through the answer tool`.
- `:1660` `simply` deleted, adopts map. Before: `is simply ignored — the shapes`. After: `is ignored — the shapes`.
- `:2207` `via` → `through`, adopts map. Before: `are honored via the SERIALIZED query form`. After: `are honored through the SERIALIZED query form`.
- `:2592` `just` deleted, adopts map. Before: `not just that it doesn't throw.`. After: `not that it doesn't throw.`.
- `:2712` `via` → `through` (this unit's line number; map's two hits shifted from `:2712`/`:2714` to the same numbers with slightly different wrap). Adopts map. Before: `has-through \`reps\` via`. After: `has-through \`reps\` through`.
- `:2714` `via` → `through`, adopts map. Before: `via the SAME junction (the inverse side)`. After: `through the SAME junction (the inverse side)`.
- `:3337` `via` → `through` (map recorded `:3336`). Adopts map. Before: `NORMALIZES via \`.parse\``. After: `NORMALIZES through \`.parse\``.
- `:3453` `via` → `through` (map recorded `:3452`). Adopts map. Before: `-args TOOL error path via the manager envelope`. After: `-args TOOL error path through the manager envelope`.

Left unchanged (permitted, identifier/fixture literals, ruled in map and re-confirmed): `:205`
`'via-mgr'`, `:1166` `'via-manager'`, `:1170` `'via-manager'`.

### `tests/src/core/stores/DatabaseDefinitionStore.test.ts`

- `:146` `just` — left unchanged, permitted fixture string literal `'just a string'` is data, not
  prose. Re-confirmed against the current tree.

### `tests/src/server/terminals/TerminalBridge.test.ts`

- `:646` `via` → `through`, adopts map. Before: `// Expire it via the injected timer BEFORE posting the answer.`. After: `// Expire it through the injected timer BEFORE posting the answer.`.

### `guides/toolbox.md`

- `:25` `via` → `through`, adopts map.
- `:137` `via` → `through`, adopts map.
- `:190` `via` → `through`, adopts map.
- `:237` `currently` deleted (`currently-pending` → `pending`), adopts map.
- `:292` `guarantee` rewritten (own rewrite — dropped "guarantee" outright rather than reusing the
  map's phrasing, which read awkwardly against the surrounding sentence). Before: `are outside this
  guarantee; hosts must not use them`. After: `are not covered; hosts must not use them`.
- `:300` two `via` occurrences → `through` (both), adopts map.
- `:302` `via` → `through`, adopts map.
- `:304` `via` → `through`, adopts map.
- `:312` `via` → `through`, adopts map.
- `:332` `e.g.` → `for example` and `guarantee` deleted, adopts map.
- `:334` `via` → `through`, adopts map.
- `:340` `via` → `by using` (own rewrite — the map's `through` collides with the sentence's earlier
  `through the tool`, producing "through the tool, through a real `ToolManager`"; `by using` keeps
  the sentence readable per the ancillary-decision leeway in the deviation contract). Before:
  `Authoring + running a workflow through the tool, via a real \`ToolManager\``. After: `... through
  the tool, by using a real \`ToolManager\``.
- `:443` `via` → `through`, adopts map.
- `:467` `via` → `through`, adopts map.
- `:482` `e.g.` → `for example`, adopts map.
- `:723` `via` → `through`, adopts map.
- `:848` `via` → `through`, adopts map.
- `:956` `currently` deleted and `via` → `through`, adopts map.

After the guide's prose rewrites, `npx oxfmt --config .oxfmtrc.json guides/toolbox.md` realigned
table-column padding on lines `:25`, `:137`, `:190` (trailing-space width only, no content change);
the diff was read before accepting it and no other line moved.

`guides/README.md` and `README.md`: no hits under any pattern (checked against the current tree,
not only the map).

## Sweep record — every remaining hit ruled

Re-running each pattern of the brief's row 1 (`\bvia\b`, `e\.g\.`, `i\.e\.`, `\bcurrently\b`,
`\bsimply\b`, `\bjust\b`, `\band/or\b`, `\bensure`, `\bguarantee`, case-insensitive, over `src`,
`tests` minus the vendored set, `guides/toolbox.md`, `guides/README.md`, `README.md`) after the
rewrites:

- `\bvia\b` — 3 hits, all permitted identifier literals (fixture/test data, not prose):
  `tests/src/core/factories.test.ts:205` (`'via-mgr'`), `:1166` (`'via-manager'`), `:1170`
  (`'via-manager'`).
- `e\.g\.` — 0 hits.
- `i\.e\.` — 0 hits.
- `\bcurrently\b` — 0 hits.
- `\bsimply\b` — 0 hits.
- `\bjust\b` — 1 hit, permitted fixture string literal:
  `tests/src/core/stores/DatabaseDefinitionStore.test.ts:146` (`'just a string'`, a data value
  passed to `table.set`, not prose).
- `\band/or\b` — 0 hits.
- `\bensure` — 0 hits.
- `\bguarantee` — 0 hits.

Every remaining hit is ruled permitted with its reason; every banned-sense hit found in the sweep
was rewritten.

## `git status --short`

```
 M guides/toolbox.md
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M tests/setupServer.ts
 M tests/src/core/factories.test.ts
 M tests/src/server/terminals/TerminalBridge.test.ts
```

Every listed file is owned by the brief's scope. No vendored file, no code identifier, and no
`package.json` line changed.

## Gate exit codes

| Gate | Command | Exit |
| --- | --- | --- |
| Format | `npm run format:check` | 0 |
| Lint | `npm run lint:check` | 0 |
| Typecheck | `npm run check` | 0 |
| Guide parity | `npm run test:guides` (28 tests, 1 file) | 0 |
| Scoped `src:core` (`factories.test.ts`) | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts` (201 tests) | 0 |
| Scoped `src:server` (`TerminalBridge.test.ts`) | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/terminals/TerminalBridge.test.ts` (33 tests) | 0 |

`tests/setupServer.ts` is shared server-suite infrastructure with no standalone test file; its
edit is exercised transitively by the `src:server` project run just listed.

No deviation occurred. Every gate in the brief's row 3 and every scoped run over an edited test
file exited `0`.
