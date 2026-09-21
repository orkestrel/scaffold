# Unit CL2 — the Content/layout tokens and the breakpoint proof

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `00a5bdc` (the CL1 landing), tracked
tree clean. Perform the assignment directly and spawn nothing.

## Objective

Every `--vn-*` token the Content/layout family consumes lands once, in the registry and the
cascade, with its proofs and its guide rows, so every later unit only consumes: the spacing
steps at 1.5rem and 3rem, the six display sizes, the table stripe percentage, and the breakpoint
mixins proven against the published breakpoint tokens from the built cascade's media conditions.

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/styles.md`,
`tests.md`, `typescript.md`, `names.md`, `documentation.md`. The design record:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/content-layout-design-verdict.md`
(the token rulings: `--vn-space-12` and `--vn-space-24` on the ramp's index law, `--vn-display-1`
to `-6`, `--vn-state-stripe`; consumer fallbacks and no token for the link opacities and
`--bs-body-text-align`; the breakpoint mixin proof against the tokens), the planner's § 3 and
CL2 criteria (`units/content-layout-design-planner-report.md`), the analyst's § Token proposal
(`units/content-layout-design-analyst-report.md`), and the Grok map's § 2
(`units/content-layout-scout-report.md`: the bindings present, at `_tokens.scss:202-280` and
`_mixins.scss:94-152`, and the ones missing).

Readings taken by the Orchestrator at launch (verify each; a stale line is a re-read, never a
stop):

- `src/styles/_tokens.scss`: `--vn-size-1` to `-8` (0.75rem to 2.25rem, a type scale, about
  lines 208-215); `--vn-space-1` to `-8` as `calc(<index> * 0.125rem * var(--vn-factor-density))`
  (about lines 222-229); `--vn-breakpoint-xs` to `-xxl` (0, 576, 768, 992, 1200, 1400; about
  lines 275-280) with `--bs-breakpoint-*` aliases (about lines 367-372); the `reset` layer is
  declared (about line 3).
- `src/styles/_mixins.scss`: the state mixer and the hover and active percentages
  (`--vn-state-mixer`, `--vn-state-hover`, `--vn-state-active`, about lines 83-85, inside
  `theme-tokens`); the breakpoint mixins (find `breakpoint-up` and `breakpoint-down`; the guide's
  `### Deferred names` table under § Tokens carries a row for `breakpoint-down`).
- `src/core/types.ts` and `src/core/constants.ts`: the token registry `TOKEN_NAMES` as grouped
  leaves; `tests/src/core/index.test.ts` asserts the export set, freeze, and path law;
  `tests/src/styles/tokens.test.ts` asserts bidirectional equality between the cascade's `--vn-`
  partition and the registry's leaves, so every new name moves both.
- `tests/src/styles/mixins.test.ts` with its fixture `tests/src/styles/fixtures/mixins.scss`
  proves the declaration mixins from a compiled fixture.
- `guides/veneer.md` § Tokens (`### Reference map` about line 318 onward) carries one row per
  token with its value and source (`elements`, `bootstrap`, `derived`); `test:guides` and the
  policy sweep read the guide.
- Host: Windows, Git Bash; `npm run <name>`; managed Chromium by default, Edge through
  `PLAYWRIGHT_CHANNEL=msedge`; `vite.config.ts` and `tests/{config.test,policy.test,setupPolicy}.ts`
  are vendored and never edited.

Standing clauses: audits cover implementation only (no wording, comment, or guide-prose change
beyond what a code change requires; a token row in the guide is the parity minimum, value and
source); an enumerating assertion in an owned file that your change grows (the registry's
export set, `tokens.test.ts`, the guide's token rows) is yours to update in the same step,
recorded, never a stop; the scoped formatter and a lint diagnostic's canonical rewrite are
granted.

## Unknowns

Whether the breakpoint mixins' emitted media conditions can be read back from the built
cascade as `CSSMediaRule` conditions in the existing styles readers (`readCascadeSheet`,
`collectLayer`) or need one more reader in `tests/setupStyles.ts`; decide from the readers and
record.

## Scope

Owned: `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/core/types.ts`,
`src/core/constants.ts`, `tests/src/core/index.test.ts` (only its enumerating assertion),
`tests/src/styles/tokens.test.ts`, `tests/src/styles/mixins.test.ts`,
`tests/src/styles/fixtures/mixins.scss`, `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
(only for a media-condition reader and its export inventory), `guides/veneer.md` § Tokens (the
new token rows and the deletion of the `breakpoint-down` deferred-name row), `cl2-report.md`.
Off-limits: everything else, `src/styles/elements/**` and `components/**` included (no consumer
lands here).

## Execution

1. Tokens: `--vn-space-12: calc(1.5rem * var(--vn-factor-density))` and
   `--vn-space-24: calc(3rem * var(--vn-factor-density))` continuing the ramp under its index law;
   `--vn-display-1: 5rem` through `--vn-display-6: 2.5rem` (Bootstrap's `$display-font-sizes`,
   source `bootstrap`); `--vn-state-stripe` beside the hover and active percentages in the theme
   closure, Bootstrap's `0.05` as the percentage until CL0's Elements reading replaces it (source
   `bootstrap`, recorded). Registry leaves in `src/core/types.ts` and `constants.ts`.
2. Proofs: `tokens.test.ts` bidirectional equality red on a planted unmapped name, green after;
   the new values resolve at density `1` and rescale at `1.25` (the space steps) and resolve
   exactly (the display sizes, the stripe percentage); the breakpoint mixins' emitted conditions
   equal the resolved `--vn-breakpoint-*` tokens, read from the built cascade's media conditions,
   red on a planted disagreement in the fixture and green restored.
3. Guide: one row per new token in § Tokens' reference map with value and source; delete the
   `breakpoint-down` row from `### Deferred names` once its proof exists.
4. Gates, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm run test:src:core`, `npm run test:src:styles`, `npm run test:setup`,
   `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, `npm test`, then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`.

## Output

Write `cl2-report.md` in the Veneer checkout and return it: per item the change as
landed with its site, the red-then-green pairs (command and counts), the resolved values at
both densities, each gate's exit code and final lines on both engines, the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`, every plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: where the media-condition
reader sits; the guide rows' wording within the table's shape. Stop on: a gate red after your
own fix inside owned files; a registry shape that cannot carry a `display` group without a
types change the rules forbid.

## Acceptance criteria

1. The registry and the cascade agree on every new name (bidirectional equality green, red on
   the plant); the values resolve as recorded at both densities.
2. The breakpoint mixins' conditions equal the tokens, proven from the built cascade.
3. `test:guides` green with the new rows and the deleted deferred-name row.
4. Every gate in item 4 exits 0 on managed Chromium and Edge.
5. The status shows only the owned files and the report.
