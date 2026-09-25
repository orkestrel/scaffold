# J-ORACLE-FIX-OFFCANVAS round 2 — the writer's report (opus on Opus 5.5, 2026-09-25)

The shadow-root press is fixed and all six acceptance criteria hold. A backdrop press now cancels its default action whenever its hide moved focus, including when the panel and its trigger share a shadow root. Every corrected sentence states what the code does.

## Measurement and the unknown

- **Red reading.** I added the same-shadow-root case to `Offcanvas.test.ts` and ran the whole file against the `eaf3908` source: `Tests 1 failed | 64 passed (65)`. The one failure is an `AssertionError` at `expect(readings).toEqual(expected)`. It read `pressed: null` and `settled: null` from the shadow root in both motion settings, and `hidden: [[null]]` with motion. Log: `tmp/j-oracle-fix-offcanvas/red-first-2.log.txt`.
- **How the case loads the cascade.** `scene.load(cascade)` puts the cascade in the document for its `:root` tokens, which the shadow tree inherits. The shadow root adopts the same cascade through `new CSSStyleSheet()`, `replaceSync(cascade)`, and `adoptedStyleSheets`. The markup is `<div>${markup}</div>` inside an open shadow root on a `scene.mount('')` container, so the backdrop lands inside the shadow root too.
- **Unknown: a panel in a shadow root shows and hides correctly apart from the press.** I checked this with a temporary case, then removed it (text in `probe-2-case.ts.txt`, log in `probe-2.log.txt`).
  - After `show(opener)`: `show` returned `true`, the classes read `offcanvas offcanvas-start show`, and `aria-modal` read `"true"`. The panel computed `position: fixed` and a `0.3s` transition. The backdrop sat in the shadow root carrying `offcanvas-backdrop fade show` at opacity `0.5`, and the shadow root's focus was on `#panel`.
  - After `hide()`: `hide` returned `true`, the classes read `offcanvas offcanvas-start`, `aria-modal` was removed, the backdrop was disconnected, and the shadow root's focus was on `#opener`.

## Files touched

- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Offcanvas.ts`: `#press` reads focus from the panel's root, and the `#press` comment and the class TSDoc sentence are corrected.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tests/src/browser/Offcanvas.test.ts`: the same-shadow-root case is added, and the guard case is retitled and its comment reworded. The comment "The window hears the press" is fixed.
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/guides/veneer.md`: the § Offcanvas press paragraph and the Bootstrap-difference bullet are corrected.
- Instruments under `tmp/j-oracle-fix-offcanvas/`: `red-2.sh`, `file-2.sh`, `mutate-4.sh`, `mutate-5.sh`, `accept-2.sh`, `compare-2.py`, and `wait-2.sh`, with their logs and the `census-after-2/` folder.

Diffstat: `guides/veneer.md | 18`, `src/browser/Offcanvas.ts | 26`, `tests/src/browser/Offcanvas.test.ts | 65`; 3 files changed, 84 insertions(+), 25 deletions(-).

## The fix

`#press` reads the active element from `this.#host.getRootNode()` when that root is a `ShadowRoot`, and from `ownerDocument` otherwise. The document retargets focus inside a shadow root to the shadow host, so only the panel's own root sees focus move between two of its elements.

```ts
const root = this.#host.getRootNode()
const scope = isInstance(root, ShadowRoot) ? root : this.#host.ownerDocument
const focused = scope.activeElement
void this.hide()
if (scope.activeElement !== focused) event.preventDefault()
```

## Red-first proof

- **Case:** "leaves focus on a trigger in the panel's shadow root after a trusted press on the backdrop hides the panel, at the hidden event and after the press, with motion and under reduced motion"
- **Red at `eaf3908`:** `file-2.sh` over the whole file reads `exit 1`, `Tests 1 failed | 64 passed (65)`. The `AssertionError` is at `expect(readings).toEqual(expected)`. That log was taken before a later comment-only edit, so it cites line 703. `mutate-4.sh` re-ran the `base-eaf3908` row on the final file and reads the same failure at `Offcanvas.test.ts:704:19`.
- **Green:** the same command after the fix reads `exit 0`, `Tests 65 passed (65)`. The final acceptance run repeats it.

## Corrected sentences

**Guide, § Offcanvas paragraph.** Before: "A press that hides the panel releases the isolation inside its `mousedown` listener, which moves focus to the trigger, and the press's default action runs after the listener and would move focus on to the body. … A press that moves no focus keeps its default action, which moves focus to the body: …"

After: "A press that hides the panel releases the isolation inside its `mousedown` listener, and the isolation moves focus to the trigger when the platform lets it. The press's default action runs after the listener and would move focus on to the body. So a press whose hide moved focus cancels that default action, and focus stays on the trigger through the `hidden.vn.offcanvas` event and after the press, with motion and under reduced motion. The panel reads the move from its root, the document or the shadow root that holds it, so a move between two elements of one shadow root counts. Every other press on the backdrop keeps its default action, which moves focus to the body: …"

**Guide, Bootstrap-difference bullet.** Before: "A backdrop press that hides the panel therefore cancels its own `mousedown` default action, and focus stays on the trigger. Bootstrap lets that default action move focus to the body, and its data API returns focus to the trigger at `hidden.bs.offcanvas`, so both end with focus on the trigger."

After: "A backdrop press whose hide moves focus to the trigger therefore cancels its own `mousedown` default action, so focus stays there. Bootstrap lets that default action move focus to the body, and its data API then returns focus to the trigger that opened the panel, at `hidden.bs.offcanvas`."

**`Offcanvas.ts`, `#press` comment.** Before: "…which moves focus to the trigger, … Bootstrap's panel returns focus after that default action, at its `hidden` event. So a press whose hide moved focus cancels its default action and focus stays where the hide put it; a press that moved no focus keeps it, as Bootstrap's does."

After: "…which moves focus to the trigger when the platform lets it, … Bootstrap's data API returns focus after that default action, at the panel's `hidden` event. So a press whose hide moved focus cancels its default action and focus stays where the hide put it; every other press keeps its default action, as Bootstrap's does. The panel's root reads the move, because the document retargets an element focused inside a shadow root to that root's host, so the document reads no move between two elements of the panel's own shadow root."

**`Offcanvas.ts`, class TSDoc.** Before: "…; a press that moves no focus keeps its default action."

After: "…; every other press keeps its default action. The panel reads the move from its root, the document or the shadow root that holds it, so a move between two elements of one shadow root counts."

**Test, guard case title.** Before: "keeps the press focus change when the press moves no focus: …"

After: "keeps the press's default action, which moves focus to the body, when the hide moves no focus: a prevented hide, a trigger that takes no focus, a press during the slide out, and a static backdrop"

**Test, guard case comment.** Before: "A press whose listeners leave focus where it was keeps its own focus change, …"

After: "A press whose hide moves no focus, or that starts no hide, keeps its default action, which moves focus to the body, as Bootstrap's press does: …"

**Test, light-tree case comment.** Before: "The window hears the press after the backdrop does, …"

After: "The window's `mousedown` listener runs after the backdrop's, …"

## Mutation table

Every mutation ran on the final files, and every reading is an `AssertionError`. `mutate-4.sh` carries round 1's five mutations, the `document` mutation, and both bases; `mutate-5.sh` carries the click mutation. Both scripts restored the source (`cmp` confirmed it).

| Mutation | Script | Red case (assertion) | Received |
| --- | --- | --- | --- |
| `document`: `const scope = this.#host.ownerDocument` | `mutate-4.sh` | Shadow case (`:704`) | `hidden [[null]]`, `pressed null`, `settled null` |
| `never` | `mutate-4.sh` | Light case (`:655`) and shadow case (`:704`) | focus on the body |
| `always` | `mutate-4.sh` | Guard, `prevented` row (`:748`) | focus on the panel `div` |
| `released` | `mutate-4.sh` | Guard, `unfocusable` row (`:748`) | focus on the panel `div` |
| `outside` | `mutate-4.sh` | Guard, `sliding` row (`:748`) | focus on the opener `button` |
| `static` | `mutate-4.sh` | Guard, `static` row (`:748`) | focus on the panel `div` |
| `base-eaf3908` | `mutate-4.sh` | Shadow case (`:704`) | `pressed null`, `settled null` |
| `base-63eabbd` | `mutate-4.sh` | Light case (`:655`) and shadow case (`:704`) | focus on the body |
| `click` | `mutate-5.sh` | Light case (`:655`) | `dismissed [[true]]` in place of `[[false]]` |

## Census compared with round 1

`compare-2.py` compared round 1's `census-after` with this round's `census-after-2`:

```text
departures round 1 66 round 2 66
only round 1: []
only round 2: []
facets round 2: ['attribute']
focus departures round 2: []
offcanvas bootstrap steps 18 changed steps: []
offcanvas veneer steps 18 changed steps: []
modal bootstrap steps 22 changed steps: []
modal veneer steps 22 changed steps: []
```

## Acceptance output, verbatim

This is `accept-2.log.txt` from the final run:

```text
npm run check exit 0
npm run lint:check exit 0
npm run format:check exit 0
Offcanvas.test.ts exit 0
 Test Files  1 passed (1)
      Tests  65 passed (65)
Isolation.test.ts exit 0
 Test Files  1 passed (1)
      Tests  10 passed (10)
Modal.test.ts exit 0
 Test Files  1 passed (1)
      Tests  61 passed (61)
census exit 0
compare exit 0
departures round 1 66 round 2 66
only round 1: []
only round 2: []
facets round 2: ['attribute']
focus departures round 2: []
offcanvas bootstrap steps 18 changed steps: []
offcanvas veneer steps 18 changed steps: []
modal bootstrap steps 22 changed steps: []
modal veneer steps 22 changed steps: []
```

## `git status --short`

`tmp/` is ignored.

```text
 M guides/veneer.md
 M src/browser/Offcanvas.ts
 tests/src/browser/Offcanvas.test.ts
```

## Deviation state

No stop was needed. I settled two choices myself.

- **Successor scripts.** The brief names `mutate-2.sh` and `mutate-3.sh`, but this round makes both of their `-t` filters miss: the guard case's title changed. `mutate-2.sh` also looks for the `document.activeElement` cancel line, which no longer exists. So I left both scripts unedited and ran the same mutations through `mutate-4.sh` and `mutate-5.sh`, whose headers state what changed. For the same reason, `accept-2.sh` and `compare-2.py` stand in for `accept.sh` and `compare.py`, which read round 1's folders.
- **The shadow case.** It sits right after the light-tree case, runs both motion settings, and loads the cascade as the Measurement section states.

## Observations, not criteria

Neither observation was executed; both come from reading the source.

- **One placement the root reading still misses.** The panel's root does not see a move between two elements of a shadow tree nested below it. That happens only when the previously focused element and the trigger both sit inside one shadow root beneath the panel's own root.
- **For J-ISOLATION-SHADOW (the `Isolation.ts` file is off-limits here).** When `show()` gets no trigger, `Isolation` falls back to `host.ownerDocument.activeElement`. For a panel in a shadow root, that fallback records the shadow host, not the element that held focus.
