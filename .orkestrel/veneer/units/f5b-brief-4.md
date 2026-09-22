# Unit F5b ACCOUNTING-LEDGER — brief 4 (the site claim and one reason)

Successor to `tmp/units/f5b-brief-3.md`. What changed: the audit of rounds 2 and 3 (`analyst` on GPT-6
Astra, `/home/user/scaffold/.orkestrel/veneer/units/f5b-fix-audit-analyst-verdict.md`) ruled two
findings that need a change: claim 6 BROKEN, the direct comparison path never registers its site
claim, and claim 8 BROKEN, one addition reason misstates the release. Every other claim held; claim
9's historical clause the Orchestrator settles by the gate. This brief carries those two findings and
nothing else. The earlier briefs stay unedited.

## Role and engine

`opus` on Opus (native Claude subagent), sole writer in `/home/user/veneer-f5b`, a git worktree
detached at `07fc3c3` carrying every earlier round's writes, uncommitted (the two ledger files are
untracked). Perform the assignment directly and spawn nothing.

## Objective

`collectLedger` refuses one emitted declaration two shipped components claim at the same site
whichever path each claim takes, and the reduced-motion addition row's reason states the release's
own fact.

## Context

- Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/{tests,typescript,architecture,names,writing}.md`.
- The analyst's evidence for claim 6, verbatim: "Duplicate ownership is refused only within the
  property-fallback loop. An executed counterexample used shipped `btn` and `close` vocabularies,
  each recording `--bs-btn-close-filter: invert(1)` and listing that property. `btn` recorded `.btn`;
  `close` recorded the withheld `.btn-close-white`. Comparing `.btn { --bs-btn-close-filter: none }`
  returned departures attributed to both components at the same site, without throwing. The direct
  comparison never registers its claim. Register and check ownership across the direct and fallback
  paths, preserving legitimate repeated writes within one component." Site: the value-gap comparison
  in `tests/setupServer.ts` (the direct `rows.push` over sited declarations, around line 1541, and the
  fallback loop's `claimed` map, around line 1569).
- The analyst's evidence for claim 8, verbatim: "The reduced-motion row's reason says the release
  'leaves unpaired' the transition at `reboot | button { transition }`. Bootstrap declares no
  transition on bare `button`. Its `.btn` transition does have a reduced-motion counterpart. Replace
  that clause with the site-specific fact that Bootstrap declares no bare-button transition." Site:
  `guides/ledger/additions.md`, the row whose Name cell is `` `button { transition }` `` under
  `` `@media (prefers-reduced-motion: reduce)` `` (around line 89); the release's `button` reboot rules
  are `node_modules/bootstrap/dist/css/bootstrap.css` around line 447 and its `.btn` transition around
  line 2986.
- Host: npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
  Other worktrees' gate chains may run beside you.

## Obligations

### Obligation 1 — the site claim on both paths

Every departure row the comparison writes registers its `selector | condition | property` site to
the component that wrote it, on the direct path as on the fallback path; a second component
reaching a site another component holds throws naming both components and the site; a component
writing the same site twice (a repeated write inside one component) stays accepted as today. Plant
in `tests/setupServer.test.ts`: `refuses one emitted declaration two shipped components claim through
different paths`, built from the analyst's counterexample (two shipped vocabularies recording the
same property, one at the emitted selector and one at a withheld selector, and an emitted block at
the first), asserting the throw names both components and the site. Record it red against the
current reader and green after, with `npm run test:setup` and its counts. The retained
fallback-only plant stays.

### Obligation 2 — the reason

Rewrite the reason cell of the `reboot | button { transition }` row so it states that the release
declares no transition on the bare `button` element while the `transition` mixin writes one with its
reduced-motion pair; keep the row's other cells unchanged. `npm run build:src && npm run
test:conformance` stays green (the reason cell is authored, not measured).

## Scope

- Owned: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `guides/ledger/additions.md`.
- Shared, report-only: none.
- Off-limits: everything else, including `guides/ledger/departures.md`, `guides/veneer.md`,
  `tests/conformance.test.ts`, `src/**`, and every file under `tmp/` other than
  `tmp/units/f5b-report-4.md` and your own `tmp/probe/` (delete it before reporting). No git
  command that discards a working-tree change.

## Execution

Perform the assignment directly and spawn nothing. Validate with `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run build:src && npm run
test:conformance`, `npm run test:guides`, and `npm run test:policy`.

## Output

Write `tmp/units/f5b-report-4.md` and return the same text: the red-then-green reading with its
command and counts, the exact refusal wording, the rewritten reason cell, the touched files,
`git status --porcelain`, `git diff --stat`, the gate exits, deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`, and the claims you flag unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: the refusal wording
(follow the existing `Components ${holder} and ${component} both claim ${site}` idiom), where the
claim registration sits (one helper both paths call, exported and inventoried, or the registration
inline at both sites), and the plant's fixture shape.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the plant present, recorded red before the change.
3. `npm run build:src && npm run test:conformance` exits 0.
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. `git status --porcelain` lists the earlier rounds' files and nothing else.

## Review evidence

The report, `git diff 07fc3c3 -- tests/setupServer.ts tests/setupServer.test.ts`, the additions
file's changed row, and the status.
