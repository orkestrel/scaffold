# Brief — U1-fix `d7-guide-readers-fix` (R1's findings on the readers unit)

## Role and engine

`builder` on Sonnet: a fully specified, taste-free unit. Sole writer in `/home/user/fleet/guide` from the committed baseline `aee1477` (clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing.

## Objective

Five findings from R1 (`d7-guide-readers-audit-verdict.md`) land as the exact edits below, with the gates green.

## Read first

`/home/user/scaffold/AGENTS.md` § Non-negotiable rules and § Writing; `/home/user/scaffold/.claude/rules/writing.md`; the verdict file named above.

## Items, each an exact edit

1. **`guides/guide.md`, the EQ row** (`:556`). Replace `The block is a declaration head's own — a` with `The block is an exported declaration head's own — a`. Source: subjective F1.
2. **`src/core/helpers.ts`, the `extractExamples` doc block** (`:2088-2091`). Replace the clause `head\n * membership is the {@link collectKeys} key of the documented record under every keyword that\n * grammar heads, so comment and template payload cannot qualify and the head grammar stays the\n * one every reader here shares.` with `head\n * membership is the {@link collectKeys} key of the documented record under every keyword that\n * grammar admits at column zero, so comment and template payload cannot qualify and the head\n * grammar stays the one every reader here shares.` Re-wrap to the print width; `npm run format` does not re-wrap comments, so wrap by hand under 100 columns. Source: subjective F2.
3. **`src/core/types.ts`, the `examples(name)` overload's description paragraph** (`:381-383`). Replace `The head's own block belongs to the\n\t * no-argument overload instead, so the overloads split the axis at the\n\t * declaration head against its members.` with `The head's own block belongs to the\n\t * no-argument overload instead.` Source: subjective F3. The no-argument overload's paragraph (`:359-364`) is unchanged.
4. **`tests/src/core/helpers.test.ts`, the untitled class-head control** (`:1776`). Replace `expect(extractExamples(source)).toEqual([{ name: 'Widget', code: 'new Widget()' }])` with `expect(extractExamples(source)).toStrictEqual([{ name: 'Widget', code: 'new Widget()' }])`, so an emitted `title: undefined` fails the control. Source: objective 3.
5. **`guides/guide.md`, § The extraction model** (`:426-427`). After the sentence ending `contribute the first block of a title rather than one block each.` add one sentence: `` `collectTitles` reads a module's head blocks before its documented members' blocks, so where a head and a member carry one title the head's block answers. `` Source: objective 4; the order is `src/core/helpers.ts:2379-2382` and the first-seen keep is `:2384-2387`.

## Standing conditions

- The vendored `policy/no-malformed-summary` and `policy/no-banned-term` rules read every doc block and comment; the vendored prose sweep reads `guides/guide.md`.
- `npm run format` after editing; the acceptance gate is `format:check`.
- `npm run docs` reads `dist/`; this unit does not run it.

## Scope

Owned: the five sites above and nothing else in those files. Off-limits: every other file and every other line.

## Acceptance criteria, cheapest first

1. `git diff --stat` lists `guides/guide.md`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/src/core/helpers.test.ts` and no other file; each hunk is one of the five items.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `npm run test:src:core` exit 0 with `598 passed`; `npm run test:guides` exit 0; `npm run test:policy` exit 0.

## Output

`/home/user/scaffold/tmp/units/d7-guide-readers-fix-report.md`: per item the diff hunk, per criterion the command and its last lines. No process diary.

## Deviation contract

Stop and report if a replacement's before-text is not found verbatim, or if a gate reads red. Nothing here is ancillary.
