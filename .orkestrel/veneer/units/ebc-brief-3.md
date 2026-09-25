# Unit E-ID-BUTTON-CASCADE round 3 — the audit's findings

Successor to `ebc-brief-2.md`. What changed: the audit (`ebc-audit-verdict.md`) ruled FAIL on claims 4, 5, 6, 7, 9, 10,
and 11 and accepted F1, F2, and a referral. This round carries every one of them. Each item names its source.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-ebc`, which holds rounds 1 and 2
uncommitted over `e07b3a6`. The proofs drive Chromium, which a bench sandbox denies (`.agents/orchestration.md` § Bench
laws, rule 5), so the round runs on the native writing lane. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,writing,quality}.md`; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-button-design-verdict.md`; the audit verdict
`/home/user/scaffold/.orkestrel/veneer/units/ebc-audit-verdict.md` and the lane verdicts it names beside it. Round 1's
report is `/home/user/scaffold/.orkestrel/veneer/units/e-id-button-cascade-report.md`; its instruments are in
`tmp/units/ebc-probe/` in the worktree. No skill applies.

## Objective

Every claim of `ebc-audit-claims.md` holds on the evidence this round retains, and each accepted finding is fixed.

## Items

1. **Kills name an assertion (claims 5, 7, and 9's mutation half; objective and subjective lanes).** Copy
   `tmp/units/ebc-probe/mutate.sh` to `tmp/units/ebc-probe/mutate-3.sh` (edit the copy, never the file a shell may be
   running) so it keeps every failure message: drop the `grep` filter, strip only the colour codes, and keep the whole
   run in the log. Re-run the `class`, `target`, `important`, `spacing`, and `nav` mutations. A kill counts only when
   the failing case's message names an assertion failure (`AssertionError`, or the expect library's own assertion
   message); record for each mutation which cases it kills by that rule.
2. **Rest readings under reduced motion (claim 4; both lanes).** Copy `revert.mjs` to `revert-3.mjs`, turn reduced
   motion on before the first reading, and re-run it. Report each `revert` reading again against the release.
3. **`.btn` in every state (claim 6; subjective lane).** The case titled `resolves every .btn form on a button as the
   same form resolves on an anchor, apart from the button appearance` reads each form at rest, disabled, and checked.
   Read each form also under hover, press, and keyboard focus, against the anchor form in the same state. Add a
   mutation, `state-spacing`, that writes `letter-spacing: 0.05em` inside the surface's `&:hover` block, and show it
   kills the case. Keep the title true of what the case reads.
4. **The Tailwind pairing anchors the surface (claim 9; subjective lane).** The case titled `keeps the button surface
   on a button carrying a utility alone, and lets the utility win the padding it declares` in
   `tests/service/tailwind/consumer.test.ts` compares the utility button with the plain button only. Anchor the plain
   button's reading to the surface itself, as the tag proof in `tests/src/styles/elements/button.test.ts` does (the
   surface's padding, weight, and a shadow other than `none`), so the case reads red when the surface is gone from every
   button. Add a mutation, `no-surface`, that renames the surface rule's selector to one that matches nothing, and show
   it kills the case.
5. **Retire "bare" from the button surface (claim 10; subjective lane).** Reword each site so it names the button
   surface or the `button` rule: `guides/veneer.md` § Button states and bindings (the paragraph beginning "Button uses
   the following canonical defaults" and the `--vn-state-mixer` and `--vn-button-transparent` rows), the sentence
   beginning "Only the bare `button` rule" in the outline paragraph after it, and the comment in
   `src/styles/_tokens.scss` beginning "The endpoints a role's hover and active tiers mix toward". Rename
   `BUTTON_BARE_VALUES` and `BUTTON_BARE_CASES` in `tests/setupStyles.ts` to names that describe the surface, and update
   every consumer: `tests/setupStyles.test.ts`, `tests/src/styles/elements/button.test.ts`, and
   `tests/src/styles/components/button.test.ts`. Search `src/`, `tests/`, `app/`, and `guides/` case-insensitively for
   `bare` and rule each hit: reword it where it names the button surface, and leave it where it names another thing
   (a bare import, a bare tag, a bare panel).
6. **The tag proof's title (claim 11; subjective lane).** The case titled `paints an empty-class, a utility-class, a
   consumer-class, and a target-attribute button with the surface a classless button wears, at rest and in every state`
   asserts the utility's own padding. Retitle it so it states that exception.
7. **The reboot comment (F1; subjective lane).** The comment above the first `button` rule in
   `src/styles/elements/_button.scss` says every button keeps the release's reboot at the release's values. Make it
   name what every button keeps: the release's margin, text transform, and button appearance.
8. **One prefix, one meaning (F2; subjective lane).** Rename `BUTTON_REBOOT_LONGHANDS` for what it lists, the longhands
   every button keeps from the release, and update its doc block and every site (`tests/src/styles/mixins.test.ts` and
   `tests/setupStyles.test.ts`).
9. **The badge comment (referral; subjective lane).** Read the `.btn` host in the Badge section's button specimen and
   make the comment beside the `btn-primary` expectation in `tests/app/browser/sections/BadgeSection.test.ts` true of
   what it reads.

## Context

- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH`, set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, and launch Chromium in a probe with
  `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`. The harness environment block may name
  another worktree as the primary working directory; work in `/home/user/veneer-ebc` with absolute paths. Format only
  with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Rebuild the styles with `npm run build:src:styles`
  before a styles run. Another worktree may run suites at the same time; a timing failure under load is an observation
  with its reading.
- **The standing condition.** Rounds 1 and 2 are uncommitted in the worktree; `git diff e07b3a6` reads them.

## Scope

**Owned.** Every file rounds 1 and 2 changed, `src/styles/_tokens.scss` for the one comment item 5 names,
`tests/src/styles/components/button.test.ts` for the rename, and the instruments under `tmp/units/`. **Off-limits:**
`src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, `tests/setupServer.ts`,
`tests/setupBrowser.ts`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
and every partial or test the items do not name. No git command that writes, no install, no `npm run format`;
`npm run build:src:styles` and `npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing. Do the items in order. Then run the owned styles files and the
Tailwind consumer file, then `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:styles`,
`npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, and
`npx vitest run --config vite.config.ts --no-cache --project service`. Log each to `tmp/units/ebc-3-<gate>.log.txt`
with `echo "exit=$?"` appended.

## Output

Write `tmp/units/ebc-report-3.md` and return the same text: per item, what changed and its evidence; the mutation table
(mutation, cases killed with the assertion message quoted, log path, restore digest); the revert readings; the gate
table with log paths; `tmp/units/ebc-3.diff` (`git diff e07b3a6`) and `tmp/units/ebc-3-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This round settles the new names, the reworded
sentences, the added state reads, and the anchor values. Stop and report if a mutation's kill is not an assertion
failure and the fix would need a file outside the owned set, or if `.btn` reads differently from the anchor form in a
state.

## Acceptance criteria

Every named mutation's kill is an assertion failure in the retained log; the rest readings are taken under reduced
motion; the `.btn` case reads hover, press, and keyboard focus, and `state-spacing` kills it; the Tailwind case reads
red under `no-surface`; no hit of `bare` in `src/`, `tests/`, `app/`, or `guides/` names the button surface; no
constant carries the "bare" name for it; the retitled case, the reboot comment, the renamed longhand list, and the badge
comment are each true of what they name; every gate in Execution exits 0.
