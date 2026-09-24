# E-IDENTITY units — the common terms every E-ID brief binds

Each E-ID brief names this file; its sections bind unless the brief restates one.

## Context

- **Ruling.** `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` (the house rule and the rulings).
  The lane proposals (`/home/user/scaffold/.orkestrel/veneer/units/e-identity-design-planner-proposal.md` and
  `/home/user/scaffold/.orkestrel/veneer/units/e-identity-design-analyst-proposal.md`)
  carry the probe markup and readings; the verdict wins where they disagree.
- **Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/e-identity-terrain-report.md` and `/home/user/scaffold/.orkestrel/veneer/units/e-identity-instruments/` (the probes and their logs, Veneer against
  Bootstrap 5.3.8 in Chromium at 390 and 1280 pixels).
- **Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`;
  `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol. Test titles name what their assertions prove.
  Insert each failing proof first: record the command and its failing count, implement, then the same command green.
- **Host.** Linux, bash. Put
  `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`
  and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` before any `npm` command; the host npm fails `devEngines`. Format
  only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`, never `npm run format`. A Playwright script
  launches Chromium with `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`. Run scoped: the one
  test file first (`npx vitest run --config vite.config.ts --no-cache --project src:styles <file>`), then
  `npm run test:src:styles`; `npm run build:src:styles` rebuilds the cascade a probe reads.
- **Standing conditions.** Three E-ID units run at once in separate worktrees. APPEARANCE (AP-COLOR, AP-TYPE) is in
  audit elsewhere and lands on Veneer before any E-ID unit; it changes `guides/veneer.md`, `tests/setupStyles.ts`,
  `tests/setup.ts`, and color, link, button, and type sources, so your shared patches are applied three-way at your
  landing. `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are vendored: never edit them.

## Scope rules

- **Owned** files are listed in each brief; edit them directly.
- **Shared** files (`guides/veneer.md`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `app/browser/constants.ts`,
  `tests/setup.ts`): edit them in your worktree as the change needs, and return each one's hunk list in the report;
  the Orchestrator applies them serially at landing.
- **Off-limits**: everything else, and every path the `scaffold repair` command restores.
- No git command that writes, no install, no `npm run build`, no `npm run format`, no tree-wide lint fix. Never read
  `.env*`, `.npmrc`, `auth.json`, or any credential file.

## Output

Write `tmp/units/<unit>-report.md` and return the same text: each change; the failing-first table (command, failing
count, then green); the mutation table (mutation, the assertion it reddens, the reading, the log, the byte-identical
restore); the probe readings against Bootstrap's; the gate table with log paths; the shared-file hunks; and
`tmp/units/<unit>.diff` (`git diff ca83afb`) with `tmp/units/<unit>-status.txt`. State no count in prose.

## Acceptance criteria common to every E-ID unit

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. The owned test files and `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`, and
   `npm run test:guides` exit 0, each logged.
3. Every proof the unit adds was red before its change and is red under its named mutation, with a byte-identical
   restore.
4. The guide's departure, addition, and exclusion rows match the shipped cascade, and the conformance ledger passes.
