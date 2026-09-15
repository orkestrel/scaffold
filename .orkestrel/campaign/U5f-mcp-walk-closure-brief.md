# Unit U5f — the reached-file assertion, and one false sentence (`@orkestrel/mcp`)

Successor of `U5e-mcp-receipt-residue-brief.md`. It carries the two findings audit round A5c
adopted (`A5c-audit-verdict.md`), and nothing else. Every carrier of U5c, U5d, and U5e stands.

## Role and engine

`builder` on Claude Sonnet (native; Read, Grep, Glob, Edit, Write, Bash). Perform the assignment
directly and spawn nothing. You are the only writer in this checkout.

## Objective

Make the reached-file assertion pin what its own comment advertises, and correct the teardown
comment's false sentence.

## Context

- Read first, in the mcp checkout: `AGENTS.md` and the rule files it names, which this package
  reads from `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` — `tests.md` and
  `writing.md` bear on this unit. Skill: none.
- Checkout: `C:/Users/mikes/WebstormProjects/mcp`, `main`, HEAD `8d97dd0`. The working tree carries
  U5c, U5d, and U5e uncommitted across exactly five paths: `tests/distribution.test.ts` (M),
  `guides/mcp.md` (M), and the new `tests/fixtures/distributionPage.mjs`,
  `distributionServer.mjs`, `distributionScript.mjs`. `tmp/` holds unit logs and bench journals;
  leave it. `git status` names nothing else.
- This repository formats with `oxfmt`, never `prettier`. Use `npx oxfmt --write <file>` or
  `npm run format`.
- The policy project carries ONE standing red (`surface population incomplete …
  src/core/helpers.ts:837: TSDeclareFunction`), which the scaffold 0.0.69 re-pin that follows this
  unit closes. It is not yours, and it short-circuits `npm test`, so run the projects you need
  directly.
- **Carrier 1's defect, measured.** The closure receipt asserts two things about
  `receipts.modules.files`: that every entry is a file inside an installed `@orkestrel` package
  under the consumer's top-level `node_modules`, and that every target the import map names is
  among the entries. The comment above them says the entries are "what the walk reached". Neither
  assertion pins that. The objective lane executed the extracted assertions against the real
  installed graph with the entry `@orkestrel/mcp/dist/src/core/index.js` deleted from the list, and
  they still passed, because that file is reached only through a RELATIVE edge — the installed
  `@orkestrel/mcp/dist/src/browser/index.js` imports `../core/index.js` — and a relative edge never
  becomes an import-map key. So a walk that stopped following relative edges would shrink the
  reached set silently and this receipt would stay green. Its own empty-list control did fail, so
  the assertions are not vacuous; they are incomplete.
- **Carrier 2's defect.** The teardown comment says a stage that rejected on its way up "never
  opened anything to close". That is false: the browser is launched before the guard that can
  throw, and the child exists before the origin read, and the surrounding `catch` is what cleans
  each up.
- Host facts: Windows; `npm.cmd`; `npm run test:distribution -- --mode release` is the receipt gate
  and needs the network and Chromium (19 passed, 4 skipped, about 23 s).

## Unknowns

None.

## Scope

- Owned: `tests/distribution.test.ts` only.
- Off-limits: every other path, including the three fixtures, `guides/mcp.md`, `src/**`,
  `package.json`, `package-lock.json`, `vite.config.ts`, `tmp/**`. No npm package added anywhere.
- Tools: Read, Grep, Glob, Edit, Write, Bash for the named commands. No install, no commit, and
  none of `git stash`, `git checkout`, `git restore`, `git reset`, `git clean`.

## Carriers

1. **Pin what the walk reached.** Add to the closure receipt, beside the two assertions already
   there, an assertion that the reached set is CLOSED under the relative edges its own files name:
   for every entry of `receipts.modules.files`, read that installed file and, for each relative
   specifier its top-level import and export statements name, assert the path it resolves to is
   also an entry. The walk's own served-path join and its specifier reader are already in this
   file; reuse them rather than writing a second reader, and resolve against the entry's own
   directory exactly as the walk does. Then add one non-circular pin beside it: assert that the
   installed `@orkestrel/mcp` core entry's reached path is among the entries and is NOT among the
   import map's targets, naming in the comment that it is reached only through the browser entry's
   relative edge. The first assertion catches a walk that stops following relative edges in
   general; the second catches it without depending on the same reader.
   Correct the comment above the group to say what the three assertions now pin together.
2. **The false sentence.** Rewrite the teardown comment's clause about a stage that rejected. The
   browser is launched before the guard that can throw and the child exists before the origin read,
   and the `catch` around the stage is what closes each. Say what the `finally` actually buys: the
   tree's removal runs whether the stage resolved, rejected, or was torn down by that `catch`.

## Execution

Perform the assignment directly; spawn nothing. Take the release-mode distribution run before
editing and at the end. Between them, prove carrier 1's new assertion binds: delete the installed
`@orkestrel/mcp` core entry from the list the assertion reads, by the smallest edit that does it,
run the closure receipt, record the failure, and restore by that same edit's reverse. Never use a
git command to restore.

## Acceptance criteria (cheap first)

1. `npm run format:check` exit 0; `npm run lint:check` exit 0.
2. `npm run check` exit 0.
3. The new assertion recorded red under the planted deletion and green after the restore, with the
   exact command and both readings.
4. `npm run test:distribution -- --mode release` exit 0, 19 passed and 4 skipped, every receipt
   unchanged apart from the closure receipt's added assertions; record the duration.
5. `git status --short` names only the same five paths, and `git diff HEAD --stat
   tests/distribution.test.ts` shows this unit's additions on top of U5e's.
6. No `any`, assertion, nested function, or default export added; no count of a growable set, no
   `above` or `below`, in prose you add.

## Output

Return, as your final message, a report with these sections and nothing else: **Carriers** (what
changed, `file:line`, with the assertion's text); **Red then green** (the planted deletion, the
exact command, both readings, and how you restored); **Distribution runs** (the two release-mode
readings with durations); **Acceptance readings**; **Deviation state**. The Orchestrator captures
it to `tmp/units/U5f-mcp-walk-closure-report.md`.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, one hypothesis at most) when
carrier 1's assertion cannot be written truthfully against what the walk collects — in which case
say what the walk actually holds — or when a criterion outside your owned file reddens. Decide and
record an ancillary matter yourself: a helper's name, where a comment sits, the exact wording of a
sentence this brief does not quote.
