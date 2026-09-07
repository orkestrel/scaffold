# Brief — U1 `d7-guide-readers` (the example readers reach every declaration head)

## Role and engine

`implementer` on Claude Opus 5. This unit is Sol's work class — an objective, constraint-heavy reader change — and the Codex bench is dark this session, so the substitution is recorded. You are the sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing. Do not commit; the Orchestrator commits.

## Objective

`source.examples()` returns the `@example` blocks of every exported declaration head `collectKeys` names — a `type`, `interface`, `const`, `function`, or `class` head at column zero — rather than `function` heads alone, so a titled class or interface block enters `findDrift`'s comparison and the seed's `--to source` direction can reach it. The contract, the guide, and the tests move with it. The axis becomes declaration head against member, with no keyword carve-out.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`, then `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`.
2. `/home/user/fleet/guide/guides/guide.md` § The extraction model (`:300-500`) and § The check catalog's EX and EQ rows (`:536-560`).
3. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-plan.md` ruling 4, and `orchestrator-measurements.md` § P15 (the fleet sweep).

## What is fixed

Every fact here was read from the tree at `cfa1f73` (clean, `version` `0.0.18`).

- `collectKeys` (`src/core/helpers.ts:2015`) keys a column-zero `export` head as `${keyword} ${name}` (`computeSymbolKey`, `:691-693`) and a one-tab callable member as `Owner.member`, so a head key carries no `.` and a member key carries one.
- `extractExamples` (`src/core/helpers.ts:2085-2124`) keeps `key.startsWith('function ')` (`:2110-2113`) and names the block from the text past `function `. Its doc block (`:2085-2099`) and its executed example state the function-only membership.
- `Source.#scanExamples` (`src/core/sources/Source.ts:128-148`) unions `extractExamples` over the module keys; its comment (`:128-130`) says exported-function. `Source.examples()` (`:117-125`) and `#exampleMembers` (`:208-227`) are unchanged in code.
- The contract: `SourceInterface.examples()` and `examples(name)` doc blocks at `src/core/types.ts:358-395`. `extractMemberMethods` compares the first overload's paragraph only, so the no-argument overload's paragraph is the compared text; both paragraphs open verb-first (`Lists …`).
- `collectTitles` (`src/core/helpers.ts:2369-2380`) unions `source.examples()` with each documented class or interface owner's member blocks; no code change there, and its doc block moves only if it names functions.
- `findUnexampled` (`:775`) reads example names alone; EX's population stays every `function`-keyword Surface symbol and every member (`guides/guide.md:536-544`), so the EX row does not move.
- The guide sentences the change makes false: the `extractExamples` row at `guides/guide.md:107` and the `examples` row at `:270` ("The exported functions' `@example` blocks", "carried by the exported functions"); read `:424`, `:433`, and `:466` and change each only where it states the function-only reach. The EQ row states the reach after this unit: a declaration head's own block or a member's block, paired by title, an untitled block presence evidence alone.
- Dedupe stays by `name` and `title` (`:2117-2121`, `Source.ts:141-145`), so a `type` and a `const` sharing one name contribute the first titled block seen. State that limit in one sentence where the reader is described (§ The extraction model), not in the EQ row.
- The guide's own class blocks (`src/core/Guide.ts:26-30`, `src/core/sources/Source.ts`, `src/core/sources/SourceManager.ts`) are untitled and stay untitled in this unit; they enter `source.examples()` and pair with nothing.
- The fleet carries no titled head block beyond scaffold's function blocks that already pair (P15: `titled: 3`, all `export function` in scaffold), so this widening changes no comparison outcome anywhere today.
- The seed's `--to source` (`scripts/docs.ts:250`, `findExample`) matches a key ending in `` ` ${name}` `` and rewrites through `locateComment(text, key)` and `replaceExample(comment, example)` (`src/core/helpers.ts:2864`, `:2787`); `replaceExample` refuses a body carrying three backticks.
- Test sites: `tests/src/core/helpers.test.ts` `describe('extractExamples')` at `:1676`, `describe('collectTitles')` at `:2743`, `describe('replaceExample')` at `:3770`, `describe('locateComment')` at `:4028`; `tests/src/core/sources/` for `Source.examples`; the broken fixture `tests/fixtures/broken/missing-example/module/helpers.ts` (its `greet` block now opens with `Greets \`name\`.`) and its test at `helpers.test.ts:1965-1981`.

## Standing conditions

- `npm run docs` reads the built readers through the package's `exports` map, so run `npm run build` before it; it exits 1 with `rows read: 1, disagreements found: 139` before this unit and must read the same after it (no table heads `Summary` yet; U2 renames the headers).
- The vendored `policy/no-malformed-summary` rule reads every doc block you write: open a description with a third-person verb ending in `s`. `policy/no-banned-term` bans the terms in `.claude/rules/writing.md` § Substitutions.
- Run `npm run format` after editing; the acceptance gate is `npm run format:check`.
- The permission system denies discard-class git commands (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing.
- `node_modules/@orkestrel/scaffold` is a `--no-save` head start; do not install anything.

## Scope

- **Owned:** `src/core/helpers.ts` (the `extractExamples` body and doc block; `collectTitles`'s doc block only if it names functions), `src/core/types.ts` (the `SourceInterface.examples` doc blocks; `SourceExample.name`'s sentence only if it names functions), `src/core/sources/Source.ts` (the `#scanExamples` comment), `tests/src/core/helpers.test.ts`, `tests/src/core/sources/**`, `guides/guide.md` at the rows and sentences named under What is fixed and the EQ row.
- **Off-limits:** every vendored file (`.oxlintrc.json`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/docs.ts`, `tsconfig.json`, `.claude/**`), `README.md`, `tests/guides.test.ts`, `tests/setup.ts`, `package.json`, every table header in `guides/guide.md`, every other row and section of `guides/guide.md`, `tests/fixtures/**` (build inline source text in tests instead).
- **Tools:** read, edit, and the scoped commands under Acceptance. No install, no commit, no publish.

## Unknowns

- Whether an existing test pins the function-only population (a class-head block expected absent from `extractExamples` or `examples()`). Report each such test and what it became; a test that pinned the carve-out becomes a control for the new axis (a member block still absent from `examples()` and present in `examples(owner)`).

## Acceptance criteria, cheapest first

1. **Red-first.** Add the test that expects a titled `@example` above `export class Widget` in `extractExamples(text)`; run `npm run test:src:core` and record the failing count; implement; record the same command green.
2. `extractExamples` collects every head key (a key without `.`), naming the block from the text past the keyword and its one space; a member key and a comment attached to no key are skipped. Controls in the suite: an untitled class head (collected with `title` absent), a member block (absent from `extractExamples`, present in `extractExampleMethods`), a `type` and an `interface` head each carrying a titled block (collected).
3. `findDrift` reports a titled class-head block against a same-titled fence with a differing body, and reports nothing when the bodies agree (a case in the `findDrift` suite built from inline guide text and inline source text).
4. `locateComment(text, 'class Widget')` returns the head's block span and `replaceExample` over that comment returns the rewritten block, so the seed's `--to source` direction reaches a head that is not a function (a case in the `locateComment` or `replaceExample` suite).
5. The contract paragraphs of both `examples` overloads, the `extractExamples` doc block and its executed example, and the `#scanExamples` comment state the widened reach, verb-first.
6. The guide rows at `:107` and `:270` and the sentences at `:424`, `:433`, `:466` read true of the widened readers; the EQ row states the reach; the dedupe limit sits in § The extraction model; the EX row is unchanged.
7. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:guides` each exit 0.
8. `npm run build && npm run docs` prints `rows read: 1, disagreements found: 139` and exits 1 (expected; report the reading).
9. `git status --short` lists owned files only.

## Output

Write `/home/user/scaffold/tmp/units/d7-guide-readers-report.md`: per criterion the command and its reading (the red-first counts verbatim), every test added or rewritten by name, each guide sentence changed as before and after, the unknown's answer, and the claims you flag. No process diary.

## Deviation contract

Stop and report on: a vendored file needing an edit; a test outside the owned files going red; `test:guides` changing outcome on the guide's own tree; `npm run docs` reading other than 139. Decide and record ancillary matters (where a sentence sits, a test's name) yourself. A test is named for what it proves, never for the criterion number here.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you return.
