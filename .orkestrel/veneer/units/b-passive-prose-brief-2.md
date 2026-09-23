# Unit B-PASSIVE-PROSE — successor brief 2 (the fix round)

## What changed and why

Round 1 (`bpp-audit-verdict.md`) returned FAIL 2, 3 with findings F1 to F7 on
`b-passive-prose-brief.md`'s result in `/home/user/veneer-bpp` (uncommitted over `87ff1d0`). The
split sites and the § Tests measurement stand. This round carries:

- **F1 and claim 2.** Rewrite every `{@link}` tag in `tests/setupServer.ts` and
  `tests/setupStyles.ts` that stands without a following noun, including the ones a line break
  hides: the objective verdict (`bpp-audit-objective-verdict.md` § F1) lists them by line
  (`setupServer.ts` 801, 885, 888, 1101, 1176, 1559, 1906-1907, 1987, 2008, 2015, 2223, 2508, and
  the bare tags at 412 and 884; `setupStyles.ts` 59, 369-370, 465, 1046, 2526, 2843). Sweep with a
  multiline-aware pattern (a tag followed by optional whitespace and a line break, then a verb) and
  rule every `{@link}` tag in both files in the ledger (F4), no sample.
- **D42 and F3.** The noun for a module-scope function is `helper` in these files (they already
  write `helper`); change every `function` the round-1 rewrites introduced to `helper`; keep
  `method` for a method and `constant` for a constant; a literal value token (`undefined`, `null`,
  `true`, `false`, a number, a quoted string) is its own noun and needs no rewrite
  (`decisions-round-2.md` § D42).
- **Claim 3.** At `tests/setupStyles.ts` around line 3615 write "The `engine` field is the axis…".
- **F2.** At `tests/setupServer.ts` around lines 1593-1594, lowercase the clause after the
  semicolon: "…or not; the {@link collectKeyframeNames} helper answers…".
- **F5 and F6.** The successor report names the fed cases as they are titled in
  `button-group.test.ts` and states no count anywhere (name the files, never their number).
- **F7.** Criterion 6 is bounded to the row's named scope: the eight style proofs and the section
  proofs; keep the § Tests link list you measured (it is correct) and drop the element and
  infrastructure proofs from the patch (the Orchestrator records them as an observation).

## Instruction

Read `b-passive-prose-brief.md` whole; everything in it stands except the amendments here. Write
the report as `/home/user/veneer-bpp/tmp/units/bpp-report-2.md` with the full ledger (every
`{@link}` tag in both files: quoted text, sense, permitted or rewritten, the rewrite), the F2 and
claim-3 diffs, the corrected fed-case names, the § Tests patch bounded per F7, and every command
with its exit. Work directly and spawn nothing; run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell; no commit, push, install, or destructive git command.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. A multiline sweep (`grep -Pzo '\{@link [^}]+\}\s*\n?\s*(is|are|reads|holds|returns|names|writes|takes|carries|maps|owns|runs|lists|declares|records|keeps|emits|binds|hands|reports|raises|measures|answers|builds|refuses|does|passes|states|decodes|copies|drives|serves|sits)\b' tests/setupServer.ts tests/setupStyles.ts`) returns nothing, and `grep -n "{@link [A-Za-z_.#]*} function" tests/setupServer.ts tests/setupStyles.ts` returns nothing.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts` exits 0 with the same case count as round 1.
5. The report carries the full ledger, no count, the corrected case names, and the bounded § Tests patch.
