# Unit D4-6 — `@orkestrel/scaffold`: the shape findings of audit AD4 (core and bin)

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs. D4-5 landed before you (its report is
staged beside this brief); read it first.

## Carriers (each names its ruling; the reviewer's findings are in `AD4-audit-reviewer.md`)

1. **The seed guide set has a name (F1).** `export const SEED_GUIDE_PATHS: readonly string[] =
   Object.freeze(['guides/guide.md', 'guides/scaffold.md'])` in `src/core/constants.ts`, consumed
   by `blueprintToHostArtifacts` (`src/core/compilers.ts` near `:1608`) and by the fixture in
   `tests/setupServer.ts` (near `:1554`); the TSDoc and `guides/scaffold.md` (near `:26` and
   `:1366`) and `guides/README.md` (near `:35`) point at the constant instead of respelling the
   members. A Surface row for the constant.
2. **`CatalogResult` names the axis that varies (F2).** `src/bin/types.ts` (near `:295-301`): the
   three correlated optionals `entries`, `dropped`, `releases` become one optional entity
   `membership?: { readonly entries: readonly CatalogEntry[]; readonly dropped: readonly string[];
   readonly releases: readonly Release[] }` (name the entity after what it is — the membership
   read that completed); every producer and consumer in `src/bin/CLI.ts` (the guards near `:467`
   and `:1418`) and `src/bin/helpers.ts` follows; `note` stops encoding the mode the shape says;
   the `--json` shape moves accordingly — update `tests/src/bin/CLI.test.ts` and the guide's
   result rows and the JSON example. Derive the touched set by running `npm.cmd run check` and
   `test:src:bin` after the type change.
3. **`Question.field` stays a field (F6).** `src/server/Materializer.ts` (near `:692`) writes a
   target path into `field`; write `field: 'guides'` and put the path in the message: `The mirror
   at ${path} differs from the hosted guide. Run catalog to refresh it.`; update the pin in
   `tests/src/server/Materializer.test.ts` (near `:1210`) and the guide sentence that describes
   the question (near `guides/scaffold.md:1190`).

## Context, law, bench, standing conditions

As D4-5. Read `src/core/types.ts` (`Question`), `src/bin/types.ts` (`CatalogResult`),
`src/bin/CLI.ts` (the catalog command and its report), `src/bin/helpers.ts`, `src/core/compilers.ts`
(`blueprintToHostArtifacts`), `src/core/constants.ts`. Do not run `npm.cmd run build`.

## Scope

**Owned.** `src/core/constants.ts`, `src/core/compilers.ts`, `src/core/index.ts` (if a new export
needs a barrel line — it should not; `constants.ts` is re-exported), `src/bin/types.ts`,
`src/bin/CLI.ts`, `src/bin/helpers.ts`, `src/server/Materializer.ts`, `tests/setupServer.ts`,
`tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/constants.test.ts`
(if it exists), `tests/src/server/Materializer.test.ts`, `tests/distribution.test.ts` (printed
examples only, if one changes), `guides/scaffold.md`, `guides/README.md` (the seed sentence only).
**Off-limits.** `src/server/helpers.ts`, `src/server/types.ts`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `.agents/**`, `.orkestrel/**`, `host.json`, `dist/**`,
`package.json`, `package-lock.json`.

## Acceptance criteria

1. `npm.cmd run lint:check`, `check`, `format:check` exit 0.
2. `npm.cmd run test:src:core`, `test:src:bin` exit 0; `test:src:server` exit 0 beyond the
   documented sandbox failures; each carrier's changed pin red first where a behaviour moves
   (the `field` pin; the catalog result shape).
3. `npm.cmd run test:guides` exit 0.
4. Only owned files changed beyond the inherited state.

## Output

D4-5's Output shape.
