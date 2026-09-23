# Unit B-PASSIVE-ORDER — the barrel's passive block and helpers in Bootstrap's order, the conformance order case extended, the guide following

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent in the worktree `/home/user/veneer-bpo`
(branch `unit/bpo` from `87ff1d0`). The executor that opens this brief is that subagent.

## Objective

`src/styles/index.scss` loads the passive block in Bootstrap's order after the forms partials and
the helper partials after it, the conformance order case proves that order against the release's
barrel, and the guide's `### <Key> classes` sections and `#### <key>` tables for those keys sit in
the same order.

## Context

**Evidence.** The carrier row (`grep -n B-PASSIVE-ORDER /home/user/veneer/ROADMAP.md`):

> The barrel's passive block (pagination, button-group, progress, spinner, placeholder, card, list-group, breadcrumb, badge, close) loads in landing order rather than family ruling 8's order, and the helpers load before the forms (the B-PASSIVE-CLOSE design round, R6) | B-PASSIVE-ORDER reorders the block with the conformance order case extended, the guide's sections and `#### <key>` tables following, after the family close

The barrel today (`grep -n "@use 'components\|@use 'utilities" src/styles/index.scss`):

```text
43:@use 'components/button' as button-component;
44:@use 'components/type';
45:@use 'components/list';
46:@use 'components/quote';
47:@use 'components/image';
48:@use 'components/link';
49:@use 'components/container';
50:@use 'components/grid';
51:@use 'components/table' as table-component;
52:@use 'components/icon-link';
53:@use 'components/ratio';
54:@use 'components/vr';
55:@use 'components/form-label';
56:@use 'components/form-control';
57:@use 'components/form-select';
58:@use 'components/form-check';
59:@use 'components/form-range';
60:@use 'components/form-floating';
61:@use 'components/input-group';
62:@use 'components/validation';
63:@use 'components/pagination';
64:@use 'components/button-group';
65:@use 'components/progress' as progress-component;
66:@use 'components/spinner';
67:@use 'components/placeholder';
68:@use 'components/card';
69:@use 'components/list-group';
70:@use 'components/breadcrumb';
71:@use 'components/badge';
72:@use 'components/close';
73:@use 'utilities/gap';
```

The release's barrel order (`grep -n "@import" node_modules/bootstrap/scss/bootstrap.scss`): `root`,
`reboot`, `type`, `images`, `containers`, `grid`, `tables`, `forms`, `buttons`, `transitions`,
`dropdown`, `button-group`, `nav`, `navbar`, `card`, `accordion`, `breadcrumb`, `pagination`,
`badge`, `alert`, `progress`, `list-group`, `close`, `toasts`, `modal`, `tooltip`, `popover`,
`carousel`, `spinners`, `offcanvas`, `placeholders`, then `helpers`, then `utilities/api`. The
target order for the lines 52 to 73 is therefore: the forms partials as they are (lines 55 to 62),
then `button-group`, `card`, `breadcrumb`, `pagination`, `badge`, `progress` (as
`progress-component`), `list-group`, `close`, `spinner`, `placeholder`, then `icon-link`, `ratio`,
`vr`, then `utilities/gap`. Lines 43 to 51 stay where they are (the row names the passive block
and the helpers only).

The conformance order case (`grep -n "Bootstrap source order" tests/conformance.test.ts` → line
318; the case `loads every forms partial in the release order, validation last` reads
`scss/_forms.scss` imports through `FORM_PARTIALS` and compares the barrel's forms subsequence).
The release names the passive partials `button-group`, `card`, `breadcrumb`, `pagination`,
`badge`, `progress`, `list-group`, `close`, `spinners`, `placeholders` and the helpers through
`_helpers.scss` (`icon-link`, `ratio`, `vr` among them); `spinners` and `placeholders` differ from
the Veneer stems `spinner` and `placeholder`.

Family ruling 8 (`/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md` § Rulings, item
8) names the order `button-group`, `card`, `breadcrumb`, `pagination`, `badge`, `progress`,
`list-group`, `close`, `spinner`, `placeholder` with `as progress-component` on `progress`.

The guide's passive sections (`grep -n "^### " guides/veneer.md` at `87ff1d0`): `### Helper
classes` sits before `### Pagination classes`, and the passive sections run Pagination, Button
group, Button toolbar, Progress, Spinner, Placeholder, then the forms sections, then Card, List
group, Breadcrumb, Badge, Close. The `#### <key>` tables under `### Departures`
(`awk '/^#### /' guides/veneer.md` between `### Departures` and `### Additions`) run an
alphabetical older block, then `is-invalid`, `is-valid`, `was-validated`, `pagination`,
`placeholder`, `progress`, `form-range`, `card`, `list-group`, `badge`, `breadcrumb`, `btn-close`,
`form`, `form-check`, `form-control`, `form-floating`, `form-select`, `input-group`,
`invalid-feedback`, `invalid-tooltip`, `valid-feedback`, `valid-tooltip`.

**Law.** `AGENTS.md`; `.claude/rules/styles.md`; `.claude/rules/tests.md`;
`.claude/rules/documentation.md`; `.claude/rules/writing.md`; the skill: none; the guide
`guides/veneer.md` (§ Styles states the forms order's one home; the sections and tables follow the
barrel).

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract` (their declarations under
`node_modules/@orkestrel/*/dist/`): this unit adds no helper; a helper whose job an installed
export does is a defect. The checker probes the diff for a new exported symbol.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-bpo`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell); network reachable; Chromium installed; no sandbox.

**Measurements.** Taken at `87ff1d0` in the worktree before the unit starts: `npm run
build:src:styles` exits 0; `npm run test:conformance` exits 0; `npm run test:guides` exits 0. The
unit re-runs each first and records the exits. The unit also records `sha256sum dist/src/styles/*.css`
(or the built cascade path `readBuiltCascade` names) before and after, as an observation: a
reorder moves rule order and the bytes differ; the resolved proofs are what must stay green.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored: never
edit them. `git status --porcelain` is empty at `87ff1d0`. B-PASSIVE-PROSE runs in a sibling
worktree and returns a § Tests patch for `guides/veneer.md`; this unit moves no § Tests text, so the
two patches integrate serially.

## Unknowns

- Whether any proof reads the guide's section or table order (grep `Departures`, `####`, and
  `classes` in `tests/setupServer.ts`, `tests/guides.test.ts`, and `tests/setupServer.test.ts`):
  the unit measures first and reports; a reader keyed by heading name is order-insensitive and
  needs no change.
- Whether the reorder changes any resolved reading in the passive and helper proofs (a specificity
  tie between two partials): the unit runs the scoped styles project over the passive and helper
  proofs and reports every failure with the rule pair; a failure stops the unit (deviation).

## Scope

**Owned.** `src/styles/index.scss` (lines 52 to 73 only), `tests/conformance.test.ts` (the
`Bootstrap source order` describe: one added case over the passive block and the helpers).

**Shared (report-only).** `guides/veneer.md`: CLOSE-GUIDE is rewriting it in a sibling worktree,
so the unit edits nothing there and returns, in its report, the move list the guide needs to follow
the barrel (each `### <Key> classes` section of the passive block and `### Helper classes` by
heading with its new neighbours; the `#### <key>` tables of `pagination`, `placeholder`,
`progress`, `card`, `list-group`, `badge`, `breadcrumb`, `btn-close`, and `icon-link` by heading
with their new neighbours after the forms tables; any `### Files` row whose order must change), for
a later builder unit to apply after CLOSE-GUIDE lands.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `ROADMAP.md`, every partial under
`src/styles/`, every file under `app/`, every other test file.

**What asserts the state this change ends.** `tests/conformance.test.ts` (in Owned); the passive
and helper proofs under `tests/src/styles/components/` (read resolved values; in Unknowns);
`tests/guides.test.ts` (parity over the guide; heading-keyed).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format`, `lint
--fix`; `npm run build:src:styles` is permitted because the conformance case reads the built
cascade; scoped runs only.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-bpo/tmp/units/bpo-report.md` with: the barrel diff, the added case's
text and its negative control (the case run against the pre-reorder barrel, red), the guide moves
(each section and table by heading with its new neighbours), the order-reader measurement, the
digest observation, the scoped gate exits with their commands, and a closing list of what the unit
could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a resolved reading that changes under the reorder, on a proof that reads table
order, or on a section whose move breaks a cross-reference. Decide, record, and carry on from
where a moved section's blank lines fall and how the added case names its subject.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. `npm run check` exits 0.
3. `npm run build:src:styles` exits 0 and `npm run test:conformance` exits 0, with the added case green; the same case run over the pre-reorder barrel (the unit's negative control, restored after the run) is red.
4. `grep -n "@use 'components\|@use 'utilities" src/styles/index.scss` prints the forms lines unchanged, then `button-group`, `card`, `breadcrumb`, `pagination`, `badge`, `progress` as `progress-component`, `list-group`, `close`, `spinner`, `placeholder`, `icon-link`, `ratio`, `vr`, `utilities/gap`.
5. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/pagination.test.ts tests/src/styles/components/button-group.test.ts tests/src/styles/components/progress.test.ts tests/src/styles/components/spinner.test.ts tests/src/styles/components/placeholder.test.ts tests/src/styles/components/card.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/breadcrumb.test.ts tests/src/styles/components/badge.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/icon-link.test.ts tests/src/styles/components/ratio.test.ts tests/src/styles/components/vr.test.ts` exits 0.
6. `npm run test:guides` exits 0 on the unchanged guide, and the report carries the guide move list by heading.

**Observations, not criteria.** The built cascade digest before and after; `npm run test:setup`
and the journey (the Orchestrator's chain).

## Review evidence

`git -C /home/user/veneer-bpo diff 87ff1d0` and `git -C /home/user/veneer-bpo status --porcelain`,
captured by the Orchestrator at hand-back as `bpo.diff` and `bpo-status.txt`, plus the report.
