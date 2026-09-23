# Unit B-PASSIVE-ORDER-GUIDE (`bpog`) — report

## Heading measurement, before (`b5038db`, filtered to the moved headings)

```
729:### Helper classes
780:### Pagination classes
830:### Button group classes
878:### Button toolbar classes
887:### Progress classes
922:### Spinner classes
944:### Placeholder classes
1531:### Card classes
1582:### List group classes
1627:### Breadcrumb classes
1655:### Badge classes
1679:### Close classes
2890:#### `icon-link`
3294:#### `pagination`
3312:#### `placeholder`
3320:#### `progress`
3363:#### `card`
3375:#### `list-group`
3385:#### `badge`
3391:#### `breadcrumb`
3398:#### `btn-close`
3583:#### `valid-tooltip`
```

## Heading measurement, after

```
729:### Form label classes   (### Table classes stays at 698; the passive block moved out from between it and the forms sections)
1275:### Button group classes
1323:### Button toolbar classes
1332:### Card classes
1383:### Breadcrumb classes
1411:### Pagination classes
1461:### Badge classes
1485:### Progress classes
1520:### List group classes
1565:### Close classes
1600:### Spinner classes
1622:### Placeholder classes
1663:### Helper classes
1714:### Deferred selectors   (unchanged line number: total file length is unchanged)
3492:#### `valid-tooltip`
3500:#### `card`
3512:#### `breadcrumb`
3519:#### `pagination`
3537:#### `badge`
3543:#### `progress`
3553:#### `list-group`
3563:#### `btn-close`
3574:#### `placeholder`
3582:#### `icon-link`
```

`grep -n "^### " guides/veneer.md` after the change prints, after `### Validation classes` (1233),
the sections in the order Button group, Button toolbar, Card, Breadcrumb, Pagination, Badge,
Progress, List group, Close, Spinner, Placeholder, Helper — the order acceptance criterion 3 names.
`grep -n "^#### " guides/veneer.md` prints, after `#### valid-tooltip` (3492), the tables in the
order `card`, `breadcrumb`, `pagination`, `badge`, `progress`, `list-group`, `btn-close`,
`placeholder`, `icon-link` — the same order. Every other heading (`### Table classes`, the forms
sections, `### Validation classes`, `### Deferred selectors`, `### Reference map` and its
`####` children, and every other `####` table) sits at its prior relative order; the whole-file line
count is unchanged at 4162 lines both before and after, confirming the move added and deleted no
text.

## Moves performed

Two reordering passes, each done as a scripted line-range extraction and reinsertion (no sentence
inside a moved block was rewritten):

1. The `### <Key> classes` sections `Helper`, `Pagination`, `Button group`, `Button toolbar`,
   `Progress`, `Spinner`, `Placeholder` (originally sitting before the forms sections) and `Card`,
   `List group`, `Breadcrumb`, `Badge`, `Close` (originally sitting after `### Validation classes`)
   moved into one run after `### Validation classes`, in the order Button group, Button toolbar,
   Card, Breadcrumb, Pagination, Badge, Progress, List group, Close, Spinner, Placeholder, Helper.
2. The `#### <key>` tables `card`, `breadcrumb`, `pagination`, `badge`, `progress`, `list-group`,
   `btn-close`, `placeholder`, `icon-link` (scattered among the forms tables under `### Departures`)
   moved into one run after `#### valid-tooltip`, in that order.

Each moved block kept its blank-line separator with its neighbours; no double or missing blank line
resulted (checked by reading the boundary text on both sides of every splice point).

## Commands and exits

| Command | Exit |
| --- | --- |
| `npm run test:guides` (baseline, `b5038db` content) | 0, 19 passed |
| `npm run test:guides` (after the move) | 0, 19 passed — same case count |
| `git diff --stat` | reports `guides/veneer.md \| 828 +++++++++++++++++++++++++++----------------------------` and no other file |
| `git diff \| grep '^[-+]' \| grep -v '^[-+][-+]' \| sed 's/^[-+]//' \| sort \| uniq -u` | prints nothing (exit 0), confirming the diff carries only moved lines |
| `npx oxfmt --check guides/veneer.md` | 0 |
| `npm run format:check` | 0 |
| `npm run test:policy` (observation only) | 0, 109 passed, 1 skipped |
| `git status --porcelain` | `M guides/veneer.md` only |

## What the unit could not close

Nothing. Every named heading was present in the guide, every section and table the barrel implies
was in the measured list, and no moved block split a table from its introducing sentence. The
deviation contract's stop conditions did not fire.
