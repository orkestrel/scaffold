# B-PASSIVE-ORDER — successor report 2 (the fix round)

## Claim 4 — composition proof and baseline count

Added `reads a nested card as absolute, the barrel resolving the tie in the release order` to
`tests/src/styles/components/ratio.test.ts`:

```ts
it('reads a nested card as absolute, the barrel resolving the tie in the release order', () => {
	// `.ratio > *` and `.card` both declare `position` at specificity `(0,1,0)`, so the barrel
	// that loads later wins the tie. The release loads its helpers, `_ratio.scss` among them,
	// after `card`, so a card nested in a ratio box reads `position: absolute` from the ratio
	// rule rather than `relative` from its own.
	const host = scene.mount('<div class="ratio ratio-1x1"><div class="card"></div></div>')
	const card = requireValue(host.querySelector('.card'), 'No nested card')
	expect(readStyle(card, 'position')).toBe('absolute')
})
```

Runs, each preceded by `export PATH=".../npm11/node_modules/.bin:$PATH"`:

- **Negative control (pre-reorder barrel).** `git show 87ff1d0:src/styles/index.scss` written to
  `src/styles/index.scss`, `npm run build:src:styles` (exit 0), then
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/pagination.test.ts tests/src/styles/components/button-group.test.ts
  tests/src/styles/components/progress.test.ts tests/src/styles/components/spinner.test.ts
  tests/src/styles/components/placeholder.test.ts tests/src/styles/components/card.test.ts
  tests/src/styles/components/list-group.test.ts tests/src/styles/components/breadcrumb.test.ts
  tests/src/styles/components/badge.test.ts tests/src/styles/components/close.test.ts
  tests/src/styles/components/icon-link.test.ts tests/src/styles/components/ratio.test.ts
  tests/src/styles/components/vr.test.ts` (the thirteen proofs): `Test Files 1 failed | 12 passed
  (13)`, `Tests 1 failed | 210 passed (211)`. The one failure is the composition case:
  `expected 'relative' to be 'absolute'`, confirming the pre-reorder barrel reads the card
  `relative`.
- The reordered barrel was written back byte-for-byte immediately after
  (`diff /tmp/reordered-index.scss src/styles/index.scss` reported no difference), then
  `npm run build:src:styles` re-run (exit 0).
- **Post-reorder (positive control).**
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/ratio.test.ts tests/src/styles/components/card.test.ts`:
  `Test Files 2 passed (2)`, `Tests 31 passed (31)`.

Baseline case count (`211`, pre-reorder, thirteen proofs) versus post-reorder case count for the
same thirteen proofs (`211`, all green; not re-run as a full sweep in this round because criterion
3 scopes the direct proof to `ratio.test.ts` and `card.test.ts`, both green at `31` cases). The
round-1 report gave only the post-reorder reading; this round adds the pre-reorder reading.

## Claim 6 — the comment's tokens

`tests/conformance.test.ts` around the `Bootstrap source order` describe's second case now reads:

```ts
// The release names the passive partials with the `spinners` token and the `placeholders`
// token, plural forms Veneer writes from the singular `spinner` stem and the `placeholder`
// stem, so this case maps them the way the forms case maps its own renamed partials. The
// passive block and the helpers both load after every forms partial, in the release's own
// sequence.
```

`grep -n "spinners\|spinner" tests/conformance.test.ts` shows `spinners` and `spinner` each
followed by `token` or `stem` in the comment; the remaining hits are code (the `spinners: 'spinner'`
map entry and the array literals), which are code tokens rather than prose.

## Claim 5 — corrected guide move list

Read from `grep -n "^### \|^#### " guides/veneer.md` at the current tree (unchanged from `87ff1d0`
for this unit; CLOSE-GUIDE runs in a sibling worktree). The barrel's target order (forms partials,
then `button-group`, `card`, `breadcrumb`, `pagination`, `badge`, `progress`, `list-group`, `close`,
`spinner`, `placeholder`, `icon-link`, `ratio`, `vr`) fixes the guide's target order.

**`### <Key> classes` sections**, moved into barrel order, after the forms sections
(`### Validation classes`) and before `### Card classes`:

`### Button group classes` (currently before the forms block, at line 828), then
`### Button toolbar classes` (line 876, immediately after it today; the round-1 list omitted this
section), then, following the forms sections and `### Card classes` (already correctly placed at
1523) and its neighbors, `### Helper classes` (line 726 today, sitting before `### Pagination
classes`) moves to follow `### Placeholder classes`. `### Progress classes` (885) and `### Spinner
classes` (919) and `### Placeholder classes` (941) stay adjacent, following `### Badge classes`
(their barrel position after `badge`). `### Pagination classes` (778) moves to follow `### Breadcrumb
classes`. The round-1 report's `### Icon link classes` and `### Vr classes` do not exist as
sections: the icon-link, ratio, and vr subjects live inside `### Helper classes` (726), which is one
section covering all the helpers, and it takes the single new position after `### Placeholder
classes`.

The resulting section order after the forms sections: `### Card classes`, `### Breadcrumb classes`,
`### Pagination classes`, `### Badge classes`, `### Progress classes`, `### Spinner classes`,
`### Placeholder classes`, `### Helper classes`, then `### Close classes` (1673, already in barrel
position following the passive block per the release's `close` slot preceding `spinners` — the
guide may keep `### Close classes` where the family's existing placement already sits, since `close`
precedes `spinner` in the barrel; the unit that applies this list resolves the exact adjacency
against the barrel order recorded in this brief and in `b-passive-order-brief.md`).

**`#### <key>` tables**, under `### Departures`, moved after the forms tables
(`#### was-validated`, 3259) and before `### Additions` (3569), in barrel order: `#### card` (3341),
`#### breadcrumb` (3369), `#### pagination` (3272), `#### badge` (3363), `#### progress` (3298),
`#### placeholder` (3290), `#### icon-link` (2868, moved out of its current position among the
alphabetical older block), then `#### btn-close` (3376, named as itself — the round-1 list wrongly
named this table `close`). `#### form-range` (3308) already sits among the forms tables and needs no
move. There is no `button-group`, `close` (as distinct from `btn-close`), `spinner`, `ratio`, or
`vr` table in the guide today; the round-1 report's claim of such tables was wrong, as the analyst
and checker lanes found.

## Gate exits (worktree `/home/user/veneer-bpo`, `unit/bpo` over `87ff1d0`)

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build:src:styles` (post-reorder) | 0 |
| `npm run test:conformance` | 0 (`Test Files 1 passed (1)`, `Tests 22 passed (22)`) |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/ratio.test.ts tests/src/styles/components/card.test.ts` (post-reorder) | 0 (`31 passed`) |
| same command over the pre-reorder barrel (negative control, restored after) | 1 (`1 failed \| 12 passed (13)` across the thirteen proofs; the composition case is the one failure) |

`git status --porcelain` shows only `src/styles/index.scss`, `tests/conformance.test.ts`, and
`tests/src/styles/components/ratio.test.ts` modified. The negative-control barrel swap was undone:
`diff /tmp/reordered-index.scss src/styles/index.scss` reported no difference before the second
build.

## What this round could not close

None outside scope. The guide move list is a report-only correction for CLOSE-GUIDE's successor
builder to apply; this unit made no edit to `guides/veneer.md`.
