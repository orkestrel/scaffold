# Unit UNHOVER-SWEEP — report

Brief: `unhover-sweep-brief.md`. Engine: Cursor Grok (Grok 4.7 256K High) through the `grok` bridge driver, session
`db269a2a-f68a-41a2-9c07-9bc10710ce04`, journal `tmp/cursor/unhover-sweep.jsonl` (swept at acceptance; its `init`
event carries that session id). Subject: Veneer `1ee0faf`.

## Grok's answer

No `unhover` call under `tests/` is followed by a frame placement that lacks a `releasePointer` call. Where a placement
follows, it is the `focus` method, and that method calls `releasePointer` before the shot.

| File | Line | Case title | Next placement | Release between | Status |
| --- | --- | --- | --- | --- | --- |
| `tests/app/browser/integration.test.ts` | 1312 | drives one list-group action to hover, focus, and press, and photographs each state | 1316, `focus` | yes | clear |
| `tests/app/browser/integration.test.ts` | 1329 | drives one list-group action to hover, focus, and press, and photographs each state | none | no | clear |
| `tests/app/browser/integration.test.ts` | 1741 | drives one menu item to hover and to focus and photographs each state | 1751, `focus` | yes | clear |
| `tests/app/browser/integration.test.ts` | 1921 | drives a carousel control to hover and to focus and photographs each state | 1923, `focus` | yes | clear |
| `tests/app/browser/integration.test.ts` | 2000 | drives the fading carousel's next control to hover and to focus on the lifted specimen, and photographs each state | 2002, `focus` | yes | clear |
| `tests/app/browser/integration.test.ts` | 2270 | hovers the file control on its lifted specimen and photographs the button surface the pointer paints | none | no | clear |
| `tests/src/styles/components/list-group.test.ts` | 273 | paints a resting action on $state and leaves a selected one alone, on either host | none | no | clear |
| `tests/src/styles/components/dropdown.test.ts` | 275 | paints a hovered and a focused item from the hover slots the menu declares | none | no | clear |
| `tests/src/styles/components/button-group.test.ts` | 29 | file `afterEach` hook (no test case) | none | no | clear |
| `tests/src/styles/components/table.test.ts` | 141 | keeps the canonical $role tint readable in every state | none | no | clear |
| `tests/src/styles/components/table.test.ts` | 198 | paints stripe, active, and hover layers over the base with state precedence | none | no | clear |
| `tests/src/styles/components/table.test.ts` | 237 | retunes the stripe at the table where its alias resolves and retains independent active and hover accents | none | no | clear |
| `tests/src/styles/components/table.test.ts` | 307 | reads the $role palette and each state against the recorded colors | none | no | clear |

Exposed calls: none.

## The Orchestrator's acceptance

- The journal's `init` event names session `db269a2a-f68a-41a2-9c07-9bc10710ce04` and model `Grok 4.7 256K High`.
- `grep -rn unhover tests/` in `/home/user/veneer` at `1ee0faf`, comments excluded, returns the table's sites and no
  other.
- Sampled: `integration.test.ts` 1312 (the `focus` method at 1316 follows), 1329 (no placement follows in the case), and
  2270 (the case's `place` call at 2263 precedes the `unhover` call, and none follows). Each holds.
- Ruling: the Veneer re-pin carries no `unhover` site. Its scope is the comment rewrites and the unpadded,
  origin-touching resting case of park ruling P6.
