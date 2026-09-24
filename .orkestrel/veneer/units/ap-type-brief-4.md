# Unit AP-TYPE round 4 — three comment lines and two report errata

Successor to `ap-type-brief-3.md`, which stays in force for every section this brief does not restate. What changed:
the round-3 audit (`apt-audit-3-verdict.md`) held every claim and found L1 to L5 outside them. Each edit is specified
exactly, so the unit is taste-free.

## Role and engine

`builder` on Sonnet, a native Claude subagent, in `/home/user/veneer-apt`.

## Objective

Three comment or prose sites name what they mean, and the round-3 report's two wrong sentences carry an erratum.

## Context

`/home/user/veneer-apt` holds AP-TYPE round 3 uncommitted over Veneer `712ae72`; it is the tree you edit. Read
`/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`, and
`/home/user/scaffold/.orkestrel/veneer/units/apt-audit-3-verdict.md`. Host: Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and
set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` before any `npm` command; the host npm fails `devEngines`. Format only
with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`, never `npm run format`. The round-3 compiled cascade is
`tmp/units/apt-3-index.css`; the round-3 diffs are `apt-3.diff` and `apt-shared-3.patch` in
`/home/user/scaffold/.orkestrel/veneer/units/`.

## Unknowns

None.

## Scope

**Owned.** `tests/setupStyles.ts` (the `FLUID_SIZE_CASES` TSDoc only), `guides/veneer.md` (the § Font utilities
sentence only), `src/styles/utilities/_font.scss` (the one comment only), and new files under `tmp/units/`. Everything
else is off-limits. No git command that writes, no install, no `npm run build`, no `npm run format`.

## Execution

Perform the assignment directly and spawn nothing.

1. **L1.** In the `FLUID_SIZE_CASES` TSDoc `@remarks` in `tests/setupStyles.ts`, replace "and the 2.25rem row sits under a 20px root" (the phrase wraps across a comment line
   break) with "and the 2.25rem row resolves against a 20px root". Rewrap that paragraph by hand to 100 columns.
2. **L2.** In `guides/veneer.md` § Font utilities (the paragraph that opens with this sentence, around line 6185;
   the same sentence opens paragraphs in § Spacing utilities and § Text utilities, which stay unchanged), replace "The partial writes every entry through the `utility` mixin"
   with "The `_font.scss` partial writes every entry through the `utility` mixin". Rewrap that paragraph by hand to 100
   columns.
3. **L3.** In `src/styles/utilities/_font.scss`, replace "None of the release's font entries is responsive, so the
   walk" with "None of the release's font entries takes a breakpoint infix, so the walk". Rewrap that comment by hand
   to 100 columns.
4. **L4 and L5.** Write the report's `## Errata to the round-3 report` section with these two entries, verbatim:
   - "`ap-type-report-3.md` § Failing-first: the mode/density and unlayered-priority cases in `font.test.ts` read the
     `.fs-3` size relationally, so they read a size this unit changes; their assertions stay true under every supplied
     mutation."
   - "`ap-type-report-3.md` § Formatting: the edited guide paragraphs are rewrapped by hand to 100 columns."

## Output

Write `tmp/units/apt-report-4.md` and return the same text: the edits, the errata section, the gate table with log
paths, `tmp/units/apt-4.diff` (`git diff 712ae72` over owned files), and `tmp/units/apt-4-status.txt`
(`git status --short`).

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. You settle line breaks yourself. Stop and report
if a named sentence is absent.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged to `tmp/units/`.
2. `npm run test:guides` exits 0, logged.
3. `npm run build:src:styles` exits 0, and `cmp dist/src/styles/index.css tmp/units/apt-3-index.css` exits 0, logged.
4. The diff against round 3 touches the three named sites and nothing else.

## Review evidence

The Orchestrator supplies `apt-4.diff`, `apt-4-status.txt`, the report, and the logs to the round-4 lanes.
