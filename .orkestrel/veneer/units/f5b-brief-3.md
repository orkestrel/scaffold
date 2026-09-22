# Unit F5b ACCOUNTING-LEDGER — brief 3 (the ledger's home)

Successor to `tmp/units/f5b-brief-2.md`. What changed: that brief's obligation 8 named
`guides/ledger.md`, and the vendored policy sweep (`inspectPolicyProse` in `tests/setupPolicy.ts`)
refuses a top-level guide that is neither the package's own, the map, nor a catalog row. Your report 2
measured that a nested path passes `npm run test:policy`. The Orchestrator rules: the ledger's two
sections move to `guides/ledger/departures.md` and `guides/ledger/additions.md`. This brief carries
obligation 8 at that home and nothing else. The earlier briefs stay unedited.

## Role and engine

`opus` on Opus (native Claude subagent), sole writer in `/home/user/veneer-f5b`, a git worktree
detached at `07fc3c3` carrying the first run's writes, the two granted `_button.scss` edits, and the
fix round's writes, all uncommitted. Perform the assignment directly and spawn nothing.

## Objective

`guides/veneer.md` § Tokens no longer carries the departure and addition tables; they live in
`guides/ledger/departures.md` and `guides/ledger/additions.md`, every reader and gate reads them there,
and every gate that reads prose is green.

## Context

- Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/{documentation,writing,tests,typescript,names}.md`.
  `documentation.md`: `guides/README.md` is the map with a concept index and a directory index; every
  backticked API in a guide resolves; a parity failure is drift to correct, never to suppress.
- Sites, located by heading rather than line: in `guides/veneer.md`, `### Departures` (its
  introduction, legend, refresh command, and the per-component `#### \`key\`` tables) and
  `### Additions` (its introduction and table) sit under `## Tokens`, followed by
  `### Outside the ledger`, which stays. `readDepartures` and `readAdditions` in `tests/setupServer.ts`
  take a path and default to the package guide; `tests/conformance.test.ts` calls them without an
  argument in the `cascade ledger` gates. `guides/README.md` carries § By concept and § By directory.
  `tests/guides.test.ts` is the package-owned parity proof; whether it reads nested guides is an
  unknown you settle by running it.
- The gate that refused `guides/ledger.md`, verbatim from your report:
  `{ rule: 'prose', path: 'guides/ledger.md', message: 'guide is the package's own, the map, or a catalog row' }`.
  `guides/ledger/<name>.md` passed the same sweep in your measurement.
- Host: npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium 141 at `/opt/pw-browsers`. Other worktrees' gate chains may run beside you.

## Obligations

### Obligation 1 — the move

`guides/ledger/departures.md` opens with an H1 and a one-line blockquote tagline, then carries the
§ Departures introduction, the legend, the refresh command (`npm run build:src && npm run test:conformance`),
and every per-component table under its `#### \`key\`` heading, byte-for-byte the rows the fix round
wrote. `guides/ledger/additions.md` does the same for § Additions, with its `Condition` column.
`guides/veneer.md` § Tokens keeps `### Outside the ledger` and gains, where `### Departures` stood, one
short paragraph that names both files with relative links and says what reads them; no table row
remains in `guides/veneer.md` under a per-component heading. Relative links inside the moved sections
are rewritten for the new directory depth so each resolves.

### Obligation 2 — the readers and the gates

`readDepartures` and `readAdditions` default to the new paths (or the `cascade ledger` gates pass
them; pick one home for each path and export it as a constant in `tests/setupServer.ts` if two call
sites need it). The refresh loop, the drift gates, and the plants in `tests/setupServer.test.ts` read
and write the new files. `npm run build:src && npm run test:conformance` exits 0 over the moved ledger.

### Obligation 3 — the map and parity

`guides/README.md` names both ledger files: a row or a short paragraph under § By concept saying the
ledger records the cascade's departures from and additions to the Bootstrap release, read by
`tests/conformance.test.ts`. `npm run test:guides` and `npm run test:policy` exit 0. If
`tests/guides.test.ts` must register the nested guides for link parity, do it there and say so.

## Scope

- Owned: `guides/veneer.md`, `guides/ledger/departures.md`, `guides/ledger/additions.md`,
  `guides/README.md`, `tests/setupServer.ts`, `tests/setupServer.test.ts`,
  `tests/conformance.test.ts`, `tests/guides.test.ts`.
- Shared, report-only: `ROADMAP.md` (return the § Records patch naming the new files).
- Off-limits: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `src/**`,
  `tests/fixtures/oracle/inventory.json`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and
  every other file. No git command that discards a working-tree change.

## Execution

Perform the assignment directly and spawn nothing. Do not run tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src` for the refresh loop; validate with `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:conformance`,
`npm run test:guides`, and `npm run test:policy`.

## Output

Write `tmp/units/f5b-report-3.md` and return the same text: the touched files, what moved and what
stayed, the README wording, the `ROADMAP.md` § Records patch, `git status --porcelain`,
`git diff --stat`, the gate exits, deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`, and the claims you flag unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: the two files' H1 and
tagline wording, whether the paths are constants or arguments, the README's row-or-paragraph form,
and how a relative link is rewritten.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:policy` exits 0 with both ledger files present.
3. `npm run build:src && npm run test:conformance` exits 0 reading the nested files.
4. `npm run test:guides` and `npm run test:setup` exit 0.
5. `grep -c '^#### ' guides/veneer.md` prints a number smaller than before and
   `grep -c '^#### ' guides/ledger/departures.md` prints the per-component heading count that left.
6. `git status --porcelain` lists the fix round's files plus the ledger files, `guides/README.md`,
   and `tests/guides.test.ts` at most, and nothing else.

## Review evidence

The report, `git diff 07fc3c3 --stat`, the status, and `git diff 07fc3c3 -- tests/conformance.test.ts tests/setupServer.ts guides/README.md`.
