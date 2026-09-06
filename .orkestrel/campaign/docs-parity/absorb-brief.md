# Bounded absorption brief: docs-parity-absorb

Read-only. Return distilled evidence with `file:line` pointers, never raw file dumps. No
decisions, no design, no edits. Do not run any `git` command; the sandbox refuses the `git`
binary.

## Question

The owner ruled that a package's guide and its TSDoc must enforce each other as equals:
neither is the source; when one moves the other must move; a gate refuses the tree while they
disagree; the guide's tables and its examples carry the comparison; the projection lives in
`@orkestrel/guide`; `vite` never moves to a runtime edge. Absorb the terrain a design round
needs to build that parity mechanism.

## Scope

### A. `/home/user/scaffold/PROPOSAL.md` (1,280 lines)

Distil:
- § Summary
- § What the evidence shows (the edit-site inventory, the drift classes found, the multi-site
  edit cost, the current parity checks and what they miss)
- Option 1 and Option 3 in full (mechanisms, stages, the marker-bounded regions, the
  summary-equality pairing, the voice gate rules, the `@example` chain reader)
- Option 2 only for what it says about examples and narrative ownership
- § Refused on the evidence
- § Probes before the first unit
- The constraints every option must satisfy

For each mechanism, state which side it treats as the source and what would change to make it
symmetric.

### B. `/home/user/fleet/guide` (the `@orkestrel/guide` package at its current tip)

Read: `guides/guide.md` in full (§ Surface, § Methods, § The extraction model, § The check
catalog, § Patterns, § Tests), `src/core/types.ts`, `src/core/Guide.ts`,
`src/core/sources/Source.ts`, `src/core/helpers.ts`, `src/core/parsers.ts`,
`src/core/shapers.ts`, `src/core/validators.ts`, `src/core/factories.ts`,
`src/core/constants.ts`, `src/core/index.ts`, and `src/server/**` if present.

Report:
- Every public type and method with `file:line`
- How a guide is parsed (headings, the Surface and Methods tables, fences, the H1 tagline)
- How a `Source` scans TypeScript text (the text-only scanners, the `@example` chain reader,
  the first-sentence reader if any, the check catalog's directions)
- What `Guide.surface()` returns
- The bijection assertion shape
- What the package explicitly refuses (the compiler API) and why

### C. Guide table conventions across the fleet

Read `## Surface` and `## Methods` tables in `guides/scaffold.md`, `guides/guide.md`,
`/home/user/fleet/database/guides/database.md`, and `/home/user/fleet/abort/guides/abort.md`.

Report:
- The columns and row form of each table; quote one row per table with `file:line`
- How a guide names an example (fence languages, the `@example` presence check in
  `guides/guide.md:403-409`)
- How `tests/guides.test.ts` in scaffold (`/home/user/scaffold/tests/guides.test.ts`) and in
  database checks parity today (which directions, which fields, what is executed)

### D. TSDoc conventions

Read `/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation and
`/home/user/scaffold/.claude/rules/documentation.md` in full.

Report:
- How a first sentence, `@param`, `@returns`, `@remarks`, `@example`, and `{@link}` are written
  in `src/core/types.ts` and `src/core/helpers.ts` of scaffold; quote two blocks with `file:line`
- Whether any package's TSDoc `@example` blocks and its guide fences carry the same code today
  (compare scaffold's `createBlueprint` or `Materializer` block against the guide's fence for
  it, `file:line` both)

### E. Tooling seams

Report:
- oxlint's plugin comment surface as `/home/user/scaffold/configs/policy.ts` and
  `/home/user/scaffold/.orkestrel/campaign/ts6-api/plan.md` § Decision 3 and § Re-baseline
  record it (`getAllComments`, `getCommentsBefore`, `context.filename`)
- oxfmt's `jsdoc` option as `.oxfmtrc.json` sets it
- The parser `vite` re-exports (`parseSync`) as scaffold's `tests/setupServer.ts`
  `readStatements` reads it (comments with ranges: does `parseSync` return comments, `file:line`
  of the program's `comments` member in `node_modules/@oxc-project/types/types.d.ts`)

## Closing table

One row per mechanism the design will need (the guide table reader, the TSDoc reader, the
example pair reader, the projection, the equality gate, the voice gate, the propagation tool),
with the file where the nearest existing seam sits, what exists, and what is missing.

## Coverage statement

End the response with a coverage statement naming every file read.

## Output shape

Return only:
- `Question`: one line.
- `Evidence`: concise facts with `file:line` or primary-source pointers.
- `Distillate`: the smallest context the next engine needs.
- `Unknowns`: unresolved facts, not recommendations, naming every input row the distillate did
  not reach.
