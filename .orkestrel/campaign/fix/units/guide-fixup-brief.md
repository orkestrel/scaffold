# Unit guide-fixup — close the guide unit's audit findings

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; substitution recorded).
You perform the assignment directly and spawn nothing.

## Objective

The guide unit's audit findings are closed in `@orkestrel/guide`: no old helper name survives
under `tests`, `Source.methods` resolves from one located declaration as its prose states, and
`matchesDeclaration` holds the boolean contract it documents.

## Context

**Findings, each with its ruling** (from `.orkestrel/campaign/fix/units/guide-audit-verdict.md`
round 1):

1. **Retirement literal.** `tests/src/core/helpers.test.ts:1797-1819` holds a `renamed` object
   literal mapping each new helper name to its retired predecessor and asserting the predecessor
   is absent from the runtime barrel. Every old name therefore survives under `tests`. The
   parity test's surface-versus-guide direction (`tests/guides.test.ts`, `findMissingSymbols`
   over `source.surface()` and `guide.surface()`) already fails on a reintroduced export, so the
   literal is redundant coverage. Ruling: delete that test block; keep the per-helper `describe`
   coverage that exists.
2. **F1, resolution scope.** `src/core/sources/Source.ts:239-266` (`#members`) unions members
   from every in-scope file that declares the name, while `guides/guide.md:325` and
   `src/core/types.ts:216` describe one located declaration, and the superseded `#body` stopped
   at the first declaring file. Ruling: bound `#members` to the first declaring file — the first
   file whose head for the name has a body or has bases — so the code matches the prose and the
   prior semantic; the extending-with-empty-body case still resolves through that head's bases.
   Add the two-file case to `tests/src/core/sources/Source.test.ts` proving the bound from a real
   pair of source files (the second file's members are not reported).
3. **F2, unescaped name.** `src/core/helpers.ts:1099` builds `new RegExp(...)` with `name`
   interpolated unescaped, so a name carrying a regex metacharacter throws while the TSDoc at
   `:1086` documents `True when …; false otherwise`. `extractDeclarationBases` (`:1150`) is a second
   door onto the same grammar. Ruling: escape the name before interpolation. First inspect the
   installed `@orkestrel/contract` declarations (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts`)
   for a declared escape helper and reuse it if its semantics match; otherwise write the escape
   once in `helpers.ts` beside the grammar (exported and tested, per `AGENTS.md` "Export and test
   reusable logic"). Add the metacharacter case to `describe('matchesDeclaration')` and to
   `extractDeclarationBases`'s tests.
4. **Subjective lane findings**, appended below under "Subjective findings" when they arrived;
   each carries its ruling.

**Law.** `AGENTS.md`; `.claude/rules/names.md` (the vendored copy predates the vocabulary; the
landed text is quoted in `guide-brief.md` § Vocabulary); `.claude/rules/tests.md`;
`.claude/rules/documentation.md` § Parity; `.claude/rules/typescript.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/guide`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch (`8eca8dc`), `node_modules`
installed. Do not run `npm install`.

**Standing conditions.** none.

## Unknowns

Whether `@orkestrel/contract` declares an escape helper for regular-expression text; report what
you found either way.

## Scope

**Owned.** `src/core/helpers.ts`, `src/core/sources/Source.ts`, `src/core/types.ts` (the
`SourceInterface.methods` remark only if the ruling changes its wording), `guides/guide.md` (the
sentence at `:325` only if the ruling changes its wording), `README.md`,
`tests/src/core/helpers.test.ts`, `tests/src/core/sources/Source.test.ts`, `tests/guides.test.ts`
(only where a moved symbol needs it).

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every other file, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the rulings in order
(types first where a contract's remark changes), run the word-boundary sweep for every retired
name (`moduleKey`, `symbolKey`, `missingSymbols`, `fenceImports`, `firstCode`, `cellLinks`,
`identifierOf`, `kindIndex`, `exportsFrom`, `hiddenFrom`, `declarationBody`, `memberMethods`,
`sectionBlocks`, `examplesFrom`, `exampleMethods`) over `src`, `tests`, `guides`, and `README.md`,
then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the escape-helper finding from the Unknowns; the sweep command and every hit; each gate
command with its exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when bounding `#members` to the first declaring file breaks an existing test whose
expectation the ruling did not anticipate, or when a gate fails for a cause you cannot attribute.
Decide, record, and carry on from the exact wording of a test title or a TSDoc sentence.

## Acceptance criteria

1. The word-boundary sweep for the retired names returns no hit under `src`, `tests`, `guides`,
   or `README.md`.
2. `Source.test.ts` carries a two-file case proving `methods()` reports the first declaring
   file's members and bases and not the second file's; `guides/guide.md` and the
   `SourceInterface.methods` remark describe that bound.
3. `matchesDeclaration('export interface A.B {', 'interface', 'A.B')` and a name carrying `(`,
   `[`, or `$` return a boolean without throwing, proved by tests.
4. The gate chain exits 0.
5. `git status --short` lists only owned files.

## Subjective findings

(appended by the Orchestrator when the subjective lane returns)
