# Unit brief — D4-fix-3: the audit round's prose and shape corrections

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`. Every edit is exact; perform the assignment directly and spawn nothing.

## Objective

Every finding `d4-audit-verdict.md` round 1 carries closes as written here, L1 to L7, and nothing else moves.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-audit-subjective.md` (claim 7 and F1 to F5) and `d4-audit-objective.md` (claim 7 and the referral); the files you own at their uncommitted state.

## Standing conditions

The tree carries D4 and its fix rounds uncommitted across `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `host.json`, and `tests/guides.test.ts`; that state is what you edit. `npm run test:guides` is red on `keeps every compared summary and example equal to its source` and `opens the README with the guide tagline` by design. `oxfmt` formats Markdown, so a table's padding is the formatter's. Never a discard-class git command, never a commit, never `npm install`.

## Edits, exact

**L1.** `.claude/rules/documentation.md:35-39`, the equality bullet, becomes exactly:

```md
- A guide `Summary` cell equals its export's doc-block description paragraph, both read in the form
  the `findDrift` function compares (a `{@link}` tag written as its target's code token, whitespace
  collapsed, a code span's boundary whitespace trimmed); a titled `@example` equals the guide fence
  under the heading of that title; and the README pitch equals the guide's tagline.
  `tests/guides.test.ts` asserts each through the `findDrift` function and the `tagline` method
  that `@orkestrel/guide` exports; converge the two sides with `npm run docs`, never by weakening
  the gate.
```

**L2.** `.claude/rules/workspace.md:132`, the `guides` row's `Proves` cell, becomes byte-equal to `.claude/rules/tests.md:55`'s: `Every documented API exists, every public API is documented, every compared summary, example, and pitch equals its source, and every executable fence returns what the guide says it returns`. Let `oxfmt` re-pad; confirm with `git diff -w -- .claude/rules/workspace.md` that only that cell and the separator row differ from `HEAD`.

**L3.** `tests/guides.test.ts:165-168`, the comment above the equality case, becomes exactly:

```ts
	// The equality gate: a `Summary` cell against its export's description paragraph, a
	// titled fence against the `@example` of that title. `findDrift` owns the comparison
	// and names both sides; read the disagreement list from `npm run docs` rather than from
	// this assertion's output, and converge the two sides there, never by weakening this
	// assertion. `findDrift` pairs an example only where a title is present on both sides,
	// so an untitled `@example` block is outside this case.
```

**L4.** `tests/guides.test.ts:126-129`: `const listed = [...group.methods]` loses its spread — `const listed = group.methods` followed by the same `.map((method) => method.name).sort().join(', ')` chain (`map` returns a fresh array, so `sort` needs no copy).

**L5.** `tests/guides.test.ts:185-186`, the README case: assert `pitch` before `tagline` — `expect(pitch).not.toBeUndefined()` then `expect(tagline).not.toBeUndefined()` — so the case reads in one direction.

**L6.** `npm run build` so `host.json` carries the vendored rules' new digests, then `npm run build:inventory` once more and record `sha256sum host.json` before and after that re-run.

**L7.** Your report states, at the final tree, the lines of the equality case, the README case, `publishes read without the former files reader method`, and `documents the members of every behavioural declaration`, superseding the D4 report's citations, and states no count of a growable set.

## Scope

- Owned: `.claude/rules/documentation.md`, `.claude/rules/workspace.md`, `tests/guides.test.ts`, `host.json` (by regeneration alone).
- Off-limits: everything else, `.claude/rules/tests.md` included.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:policy`, `npm run test:guides`, `npm run build`, `npm run build:inventory`. Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "both read in the form" .claude/rules/documentation.md` prints one line; `grep -c "the \`findDrift\` function and the \`tagline\` method" .claude/rules/documentation.md` prints 1; `diff <(sed -n 132p .claude/rules/workspace.md | sed 's/  */ /g') <(sed -n 55p .claude/rules/tests.md | sed 's/  */ /g')` compares the two rows' cells and shows the `Proves` cells equal (state the command you ran and its output); `grep -n "pairs an example only where a title is present" tests/guides.test.ts` prints one line; `grep -c "\[\.\.\.group.methods\]" tests/guides.test.ts` prints 0.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0; `npm run test:policy` exits 0.
3. `npm run build` exits 0; the `host.json` digest is identical across the `build:inventory` re-run.
4. `npm run test:guides` exits 1 with exactly the two by-design cases red and every other case green.

## Output

Write `/home/user/scaffold/tmp/units/docs-d4-fix-3-report.md`: each edit with `file:line`, the L7 lines, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims; no count in prose. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a quoted text is not at the named site or nearby, when `test:guides` reddens any case beyond the two by-design ones, when a criterion needs an off-limits file, or when a gate fails outside the owned files. Nothing else is yours to decide.
