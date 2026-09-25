# Unit LEDGER-ADDITIONS round 3 — the escaped function name, the reader's name, and the ownership reason

Successor to `ledger-additions-brief-2.md`. What changed: the second audit round (`lad-audit-2-verdict.md`) confirmed the
attribution, the kept owner rows, the executed table, and the gates, and failed claims 1 and 7 with N1 and N2 accepted.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-lad`, which holds rounds 1 and 2 uncommitted over Veneer `2376710`. Start every shell command with
`cd /home/user/veneer-lad &&` and give every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`,
the rules `/home/user/scaffold/.claude/rules/{names,tests,typescript,documentation,writing}.md`, and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/lad-audit-2-verdict.md` with both lane verdicts beside it. No skill applies.

## Objective

The class reader recognises `:is()` and `:where()` by their decoded names, carries a name and TSDoc that say what it
returns, and the guide gives a true reason for the reading.

## Context

**Evidence.** Measured in the worktree at round 2's tree:
- `collectSubjectClasses` in `tests/setupServer.ts` (around line 1875) recognises the function by testing the raw text
  before the parenthesis against `/:(?:is|where)$/iu`. The module's `readIdentifier` decodes an identifier over the
  walked steps.
- Its sites: the declaration and TSDoc, the `attributeSelector` call and the TSDoc that names it (around lines 2444 and
  2464) in `tests/setupServer.ts`; the import, the export-list entry, and the reading case in `tests/setupServer.test.ts`.
- `matchSelectorKey`'s `@param classes` (around line 1812) names `collectSelectorClasses`.
- `guides/veneer.md` § Additions holds the sentence "Attribution reads a class written inside an `:is()` or a `:where()`
  argument as the rule's own, because that argument matches the element the rule matches."

Re-take each reading before editing, and stop if one differs.

**Law.** `.claude/rules/names.md` § General vocabulary (a name describes what the thing is; a module-scope helper takes
`{verb}{Noun}`); `.claude/rules/typescript.md` (TSDoc voice); `.claude/rules/documentation.md` § Parity.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`.
Write every log, backup, and script under this worktree's `tmp/units/`, never in the scratchpad.

**Shared files, told in advance.** `tests/setupServer.ts` and `tests/setupServer.test.ts` also change in the engine
session's J-ORACLE and in TAILWIND-RECIPE round 2, each in another worktree. Change only the lines Items name.

## Unknowns

- The reader's new name. It must not use `subject`, which in CSS names a selector's last compound, and it must tell the
  reader apart from `collectSelectorClasses`. Settle it under `.claude/rules/names.md` and state it in the report.

## Scope

**Owned.** `tests/setupServer.ts` (the reader, its TSDoc, `attributeSelector`'s TSDoc and call, and `matchSelectorKey`'s
`@param`), `tests/setupServer.test.ts` (the import, the export-list entry, and the reading case), `guides/veneer.md` (the
§ Additions ownership sentence and any sentence naming the reader), and `tmp/units/`.

**Off-limits.** Every other path and every other line.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. **Claim 1.** Recognise the function by decoding its name through `readIdentifier` (or the module's existing
   decoder) and comparing the decoded, case-folded name with `is` and `where`. Add to the reading case
   `expect(<reader>(':\\77 here(.nav-link)')).toEqual(['nav-link'])`, written so the source string carries the CSS
   escape `\77 `. Plant: restore the raw-spelling test; the new assertion fails with an `AssertionError`. Restore.
2. **N1.** Rename `collectSubjectClasses` at every site. Its summary reads "Collects every class a selector writes,
   reading through `:is()` and `:where()` arguments." Its first remark gives the reason in Item 3. Keep the `@example`
   under the new name.
3. **Claim 7.** Replace the § Additions clause "because that argument matches the element the rule matches" with
   "because an `:is()` or `:where()` argument is part of the selector the rule matches through, while a `:not()`
   argument names what the rule excludes and a `:has()` argument names a relative". Keep the rest of the paragraph.
4. **N2.** Point `matchSelectorKey`'s `@param classes` at the renamed reader.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 to 4, and run Item 1's plant, logged to `tmp/units/lad-3-plant-escaped.log.txt`.
3. Run each gate in Acceptance, logged to `tmp/units/lad-3-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/lad-report-3.md` and return the same text: the name ruling; each Item's before and after text; the
plant reading; the gate table; `tmp/units/lad-3.diff` (`git diff 2376710`) and `tmp/units/lad-3-status.txt`. State no
count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when decoding the name changes an attribution the conformance gate reads, or when a gate reads red outside a
timeout under load. Settle yourself the reader's name and the TSDoc wording beyond the summary.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts` passes.
3. Item 1's plant fails the new assertion, per its log.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant log, and the gate logs. The round's audit runs `analyst` on GPT-6 Astra.
