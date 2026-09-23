# Unit B-PASSIVE-ORDER — successor brief 2 (the fix round)

## What changed and why

Round 1 (`bpo-audit-verdict.md`) returned FAIL 4, 5, 6 on `b-passive-order-brief.md`'s result in
`/home/user/veneer-bpo` (uncommitted over `87ff1d0`). The barrel order stands. This round carries:

- **Claim 4 (the analyst).** `.ratio > *` (`src/styles/components/_ratio.scss`, `position:
  absolute`) and `.card` (`_card.scss`, `position: relative`) tie at specificity `(0,1,0)`, and the
  reorder loads `_ratio.scss` after `_card.scss`, so a card inside a ratio box now reads
  `position: absolute`. That is the release's own resolution (Bootstrap loads the helpers last),
  so the order is right and the reading needs a proof: add a case to
  `tests/src/styles/components/ratio.test.ts` that mounts `<div class="ratio ratio-1x1"><div
  class="card"></div></div>` and reads the card's resolved `position` as `absolute`; its negative
  control is the pre-reorder barrel (`git show 87ff1d0:src/styles/index.scss` written to the file
  for the run, then the reordered file written back exactly), which reads `relative`. Record both
  runs. Also record the baseline styles run over the thirteen proofs at `87ff1d0` with its case
  count beside the post-reorder count (the round-1 report gave only the latter).
- **Claim 6 (the analyst).** The added conformance case's comment leaves the `spinners` and
  `spinner` tokens without nouns (`tests/conformance.test.ts` around line 352): follow each code
  token with its noun per `.claude/rules/writing.md` § Code tokens.
- **Claim 5 (both lanes).** The round-1 report's guide move list is wrong: it omits `### Button
  toolbar classes` (line 876 at `87ff1d0`), names `### Icon link classes` and `### Vr classes`
  sections that do not exist (their subjects sit under `### Helper classes`, line 726), and names
  `#### button-group`, `#### close`, `#### spinner`, `#### ratio`, and `#### vr` tables that do not
  exist (the passive tables are `pagination` 3272, `placeholder` 3290, `progress` 3298, `card`
  3341, `list-group` 3353, `badge` 3363, `breadcrumb` 3369, `btn-close` 3376, and `icon-link`
  2868; `form-range` sits at 3308 among them). Write a corrected move list in the successor report
  from the headings you read in `/home/user/veneer-bpo/guides/veneer.md`: the sections in barrel
  order after the forms sections with `### Button toolbar classes` after `### Button group
  classes` and `### Helper classes` after `### Placeholder classes`; the existing passive and
  helper tables after the forms tables in the same order, `btn-close` named as itself.

## Instruction

Read `b-passive-order-brief.md` whole; everything in it stands except these amendments: Owned gains
`tests/src/styles/components/ratio.test.ts` (one added case); the report is written as
`/home/user/veneer-bpo/tmp/units/bpo-report-2.md` and supersedes round 1's guide move list. Work
directly and spawn nothing; run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell; no commit, push, install, `git checkout`, `git restore`, `git stash`, `git
reset`, or `git clean`; undo the negative-control barrel swap by writing the reordered file back.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/ratio.test.ts tests/src/styles/components/card.test.ts` exits 0 with the composition case green, and the same command over the pre-reorder barrel is red on that case (recorded).
4. `npm run build:src:styles` and `npm run test:conformance` exit 0, and `grep -n "spinners\|spinner" tests/conformance.test.ts` shows each token followed by a noun in the comment.
5. The report carries the corrected guide move list, the baseline and post-reorder case counts, and every command with its exit.
