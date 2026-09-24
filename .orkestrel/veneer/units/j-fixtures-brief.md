# Unit J-FIXTURES — one lookup shape under the fixture lookups

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-jf` (branch `unit/jf`, cut from Veneer `main`
`6882751`). The styles session carries this unit for the engine session (`/home/user/scaffold/.orkestrel/veneer/engine/plan.md`
§ Carried findings, the fixture-lookups row).

## Objective

`readButton`, `readSpecimen`, and `readSubject` in `tests/setupBrowser.ts` route their "exactly one named element,
checked as an HTML element" step through one exported helper, and `readOracleButton` keeps composing `readButton`.
Each lookup keeps its name, signature, selection policy, and error messages, so no caller changes.

## Context

- **Law.** `/home/user/scaffold/AGENTS.md` (Export and test reusable logic; No superfluous wrappers; Single-word entity
  APIs, where a module helper takes `{verb}{Noun}`); `/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,writing}.md`.
- **Callers.** `tests/app/**` and `tests/setupBrowser.test.ts` alone.
- **Host.** Linux, bash; put
  `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`
  and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; format only with
  `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`.
- **Standing conditions.** `tests/setupBrowser.ts` is shared with the engine session, which may land edits to it; keep
  the change to the lookups and the new helper. Units run in other worktrees at the same time.

## Unknowns

The helper's name and parameters: settle them under the naming rule and report the choice.

## Scope

**Owned.** The four lookups and the new helper in `tests/setupBrowser.ts`, with its TSDoc; `tests/setupBrowser.test.ts`
(the export list and the helper's cases). Everything else is off-limits; no git command that writes, no install, no
`npm run build`, no `npm run format`.

## Execution

Perform the assignment directly and spawn nothing.

1. Add the helper with TSDoc; route the three lookups through it; keep every message.
2. Cases for the helper in `tests/setupBrowser.test.ts`: one match returned, no match refused, several matches refused,
   and a non-HTML match refused, each asserting the message; list it in the export list.
3. Run `npx vitest run --config vite.config.ts --no-cache --project setup:browser`, then
   `npx vitest run --config vite.config.ts --no-cache --project app:browser`, and `npm run format:check`,
   `npm run lint:check`, and `npm run check`, each logged under `tmp/units/`.

## Output

Write `tmp/units/jf-report.md` and return the same text: the helper and its rationale, the gate table with log paths,
`tmp/units/jf.diff` (`git diff 6882751`), and `tmp/units/jf-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if a caller must change.

## Acceptance criteria

The gates exit 0; `git diff 6882751 --stat` lists only the two owned files; each lookup's messages are unchanged.
