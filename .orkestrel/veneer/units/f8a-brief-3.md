# Unit F8a PROFILES — brief 3 (the second fix round)

Successor to `tmp/units/f8a-brief-2.md`. What changed: `analyst` on GPT-6 Astra audited round 2
(`/home/user/scaffold/.orkestrel/veneer/units/f8a-fix-audit-analyst-verdict.md`,
`VERDICT: FAIL 1, 3, 5; outside the claims: F-DISPATCH`); F-DISPATCH is the Orchestrator's launch
evidence, not yours. This brief carries the three findings and nothing else; the earlier briefs stay
unedited. Same role, worktree, host, law, and scope as the first brief.

## Obligations

1. **The theme reading is scoped (analyst 1).** The control case reads the theme variables
   (`--spacing`, `--font-weight-bold`) from declarations inside the `theme` layer block alone, not
   across the whole stylesheet, so a compiled `theme` block moved into another layer reddens it.
   Record the mutation reading (move the block in a copy, or assert against a planted sheet whose
   variables sit outside `theme`) with the command
   `npm exec -- vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot tests/tailwind/profiles.test.ts`.
2. **The guide's empty-emission statement is bounded (analyst 3).** In § Tailwind's paragraph after
   the profile table, the sentence that a build whose markup uses no utility fills no layer holds for
   the composable profile alone; the bare import emits `theme` and `base` regardless, because
   preflight reads its own font variables. Say both, in that order; the existing fixture assertion
   (`['theme', 'base']` for `preflight`) already agrees.
3. **The directive reader parses every supported form (analyst 5).** `collectInlineSources` in
   `tests/setupBrowser.ts` reads a single-quoted `@source not inline('…')` directive as it reads a
   double-quoted one, or refuses an unsupported form explicitly naming it; its case in
   `tests/setupBrowser.test.ts` gains the single-quoted control, and the copy-equality case's report
   reading records that a guide directive rewritten with single quotes and a missing `col-7`
   reddens the comparison.

## Output

Append `## Round 3` to `tmp/units/f8a-report.md` and return that section: each obligation's readings
with their commands, the touched files, `git status --porcelain`, the gate exits for
`format:check`, `lint:check`, `check`, `test:src:tailwind`, `test:setup:browser`, `test:guides`, and
`test:policy`, deviations, and the claims you flag unverified.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:tailwind` exits 0 with the scoped theme reading and its mutation recorded red.
3. `npm run test:setup:browser` exits 0 with the single-quoted control present.
4. `npm run test:guides` and `npm run test:policy` exit 0.
