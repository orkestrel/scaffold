# J-ORACLE-FIX-OFFCANVAS round 5 — the writer's report (opus on Opus 5.5, 2026-09-25)

The press rule is in place and every acceptance criterion passes. Obligation 1's probe agreed with the rule in every row, so the unit did not stop. Nothing is committed.

## Obligation 1: readings around `void offcanvas.hide()`
**Probe:** `bash tmp/probe/holds-probe.sh`, run on unmodified `43fa73d` source. Its block is `tmp/probe/holds.block.ts.txt` and its log is `tmp/probe/holds-probe.log.txt`. The script put the test file back from its backup, and `cmp` confirmed it.
- **"Root"** is `trigger.getRootNode().activeElement === trigger`.
- **"`:focus`"** is `trigger.matches(':focus')`.
- **"Released"** is my stand-in for whether `#isolation` changed. That private field cannot be read from outside, so I placed a sentinel element beside the panel. The isolation marks it inert, and only destroying the isolation clears that. "Released" means the sentinel was inert before the hide and not after.
- `document.hasFocus()` read `true` before and after in every row.

| Row | Released | Root before → after | `:focus` before → after | Rule | Expected |
|---|---|---|---|---|---|
| light | yes | F → T | F → T | cancel | cancel |
| open one level | yes | F → T | F → T | cancel | cancel |
| closed one level | yes | F → T | F → T | cancel | cancel |
| open two levels | yes | F → T | F → T | cancel | cancel |
| closed root the panel carries | yes | F → T | F → T | cancel | cancel |
| shadow panel, light trigger | yes | F → T | F → T | cancel | cancel |
| shadow panel, focus outside | yes | F → T | F → T | cancel | cancel |
| guard: prevented | no | F → F | F → F | keep | keep |
| guard: unfocusable (removed) | yes | F → F (no root) | F → F | keep | keep |
| guard: sliding | no | T → T | T → T | keep | keep |
| trigger inside the panel, focused | yes | T → T | T → T | cancel | cancel |
| listener focuses trigger + prevents (light) | no | F → F (trigger inert) | F → F | keep | keep |
| listener focuses trigger + prevents (shadow panel) | no | F → T | F → T | keep | keep |
| listener moves focus after trigger removed | yes | F → F (no root) | F → F | keep | keep |
| fallback H | yes | T → T | T → T | cancel | cancel |
| fallback H with `delegatesFocus` | yes | T → T | T → T | cancel | cancel |

**The brief's unknown:** `:focus` matched the root read in every row. Frame focus was `true` everywhere. I found no way to take focus away from the frame on this host, so a row with an unfocused document is unmeasured.

## The code, verbatim
```ts
#press(event: MouseEvent): void {
	if (!this.#options.dismiss.backdrop) {
		this.#prevent()
		return
	}
	const isolation = this.#isolation
	const trigger = isolation?.trigger
	void this.hide()
	const released = isolation !== undefined && this.#isolation !== isolation
	if (released && trigger !== undefined && holdsFocus(trigger)) event.preventDefault()
}

export function holdsFocus(element: Element): boolean {
	const root = element.getRootNode()
	const scope = isInstance(root, ShadowRoot) ? root : element.ownerDocument
	return root === scope && scope.activeElement === element
}

get trigger(): HTMLElement | undefined {
	return this.#trigger
}
```
`IsolationInterface` gains `readonly trigger: HTMLElement | undefined`, with its TSDoc.

## Files touched
The diffstat is 9 files changed, 524 insertions, 189 deletions. All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/`.
- `src/browser/types.ts`: adds `IsolationInterface.trigger`.
- `src/browser/Isolation.ts`: adds the `trigger` getter.
- `src/browser/helpers.ts`: `holdsFocus` replaces `readFocusedElement`.
- `src/browser/Offcanvas.ts`: the `#press` rule, its comment, the class TSDoc, and the import.
- `tests/src/browser/helpers.test.ts`: the `holdsFocus` suite replaces the `readFocusedElement` suite. Its cases are the document, an open root, a closed root read through a held reference, a host whose tree holds focus, and a removed, unmounted, or detached element.
- `tests/src/browser/Isolation.test.ts`: one getter case covering the option, the fallback, and a retargeted shadow host.
- `tests/src/browser/Offcanvas.test.ts`:
  - The carried-root case now runs open and closed roots.
  - The guard case adds a `redirected` row.
  - Four cases are new: the listener that focuses the trigger and prevents the hide; a light trigger with a shadow panel, focus on the panel or outside it; the trigger inside the panel, already focused; and fallback H, with and without `delegatesFocus`.
- `tests/src/browser/index.test.ts`: the export list swaps `readFocusedElement` for `holdsFocus`.
- `guides/veneer.md`: the Surface row, the `#### IsolationInterface` section, § Offcanvas, and the Bootstrap-difference bullet.

## Red-first proofs
**Command:** `bash tmp/j-oracle-fix-offcanvas/red-5.sh`. It writes `43fa73d`'s `Offcanvas.ts` and `helpers.ts` over the fixed files, runs the whole `Offcanvas.test.ts`, restores both files (`cmp` passed), and runs it again.
- At `43fa73d`: exit 1, `Tests 6 failed | 64 passed (70)`.
- Fixed: exit 0, `Tests 70 passed (70)`.

**The two round-3 inputs:**
- **The closed root the panel carries.**
  - With motion at `43fa73d`: `hidden` read `[body, null]` (expected `[panel, trigger]`), `pressed` read `[body, null]` (expected `[panel, trigger]`), `lost` read `"visible"` (expected `"hidden"`), and `prevented` read `false` (expected `true`).
  - Under reduced motion at `43fa73d`: `prevented` read `false`.
  - The open-root rows stayed green.
- **The panel in a shadow root, with focus outside it.**
  - With motion at `43fa73d`: `hidden`, `pressed`, and `settled` all read the body (expected the opener), and `prevented` read `false`.
  - Under reduced motion at `43fa73d`: `pressed` and `settled` read the body, and `prevented` read `false`.
  - The row with focus on the panel stayed green.

**The new rows, also red at `43fa73d`:**
- The `redirected` guard row: focus read `button#inside`, where the body was expected.
- The listener that focuses the trigger and prevents the hide: `prevented` read `true` and focus read the opener, where `false` and the body were expected.
- The trigger inside the panel: with motion, `prevented` read `false`, `pressed` read the body, and `lost` read `"visible"`; under reduced motion, `prevented` read `false`.
- Fallback H: `prevented` read `false` in all four rows.

## Corrected sentences
- **Class TSDoc**
  - Before: "A press whose hide moves focus, by releasing the isolation, cancels … The panel compares the deepest focused element … Two moves escape the read …"
  - After: "A press cancels its `mousedown` default action exactly when its hide released the isolation and the isolation's trigger then holds focus, read from the trigger's own root, the document or a shadow root of any mode … The press reads focus once, when its hide returns: under reduced motion … a focus move a `hidden.vn.offcanvas` listener makes is undone by a default action the press kept. When `show` receives no trigger, the isolation falls back to … a shadow root's host, not the element inside it … so the press keeps focus inside the host until the panel's visibility turns hidden."
- **`#press` comment:** the deepest-read rationale and its two misses are replaced by the release-and-hold rule, the once-read reduced-motion limit, and the fallback-host limit, called the isolation's limit.
- **Guide § Offcanvas**
  - Before: "…a press whose hide moved focus cancels … through the `readFocusedElement` function … Two moves escape the read …"
  - After: "…a press cancels that default action exactly when its hide released the isolation and the isolation's trigger then holds focus, which the `holdsFocus` function reads from the trigger's own root…"
  - A new paragraph, "The press rule has two limits.", states the reduced-motion ordering and the fallback shadow host.
- **Bootstrap-difference bullet**
  - Before: "…whose hide moves focus to the trigger… The press reads the deepest focused element down through each open shadow root…"
  - After: "…whose hide released the isolation, and after which the trigger holds focus as its own root reads it, … whatever shadow roots hold the trigger…", followed by both limits.
- **`#### IsolationInterface`:** a paragraph is added above the methods table. It covers the `trigger` property, the press rule, and both limits.
- **Surface row:** the `holdsFocus` row replaces the `readFocusedElement` row. Its summary equals the new TSDoc.
- No sentence names a shadow depth the press misses.

## Mutation table
**Command:** `bash tmp/j-oracle-fix-offcanvas/mutate-7.sh`. Its logs are `mutation-7-<label>.log.txt`, and `cmp` confirmed the source restored.

| Mutation | What goes red, by assertion |
|---|---|
| The document's `activeElement` in place of the trigger's root | The same-shadow-root case, open or closed, at `expect(readings).toEqual(expected)`; the carried-root case, open or closed, at the same assertion |
| Release condition dropped | The listener-focuses-trigger-and-prevents case (`prevented` reads `[[true]]`) |
| Always cancel | The guard case at the `prevented` row; the listener-focuses-trigger-and-prevents case |
| Never cancel | Six cases: light, same-shadow-root, carried-root, light-trigger shadow panel, trigger inside the panel, and fallback H |
| `matches(':focus')` in place of the root read | **Stays green**, `70 passed`. No row tells it apart, which matches the probe. |

A helper mutation also ran (`mutate-helper-7.sh`): making `holdsFocus` read the document's `activeElement` reddens the open-root and closed-root `holdsFocus` cases.

## Census compared with round 3's
It matches: 66 departures on both sides, none on one side only, the only facet is `attribute`, and there are no focus departures. No step changed in either library (offcanvas 18 steps, modal 22). The four recordings and `departures.json` are byte-identical, and `findings.json` is identical once the timings are left out.

## Acceptance output, verbatim (`tmp/j-oracle-fix-offcanvas/accept-5.log.txt`)
```
npm run check exit 0
npm run lint:check exit 0
npm run format:check exit 0
npm run test:policy exit 0
npm run test:guides exit 0
npm run test:setup:browser exit 0
accept-5-test-policy.log.txt:      Tests  109 passed | 1 skipped (110)
accept-5-test-setup-browser.log.txt:      Tests  93 passed (93)
(test:guides)      Tests  26 passed (26)
helpers.test.ts exit 0      Tests  98 passed (98)
Offcanvas.test.ts exit 0      Tests  70 passed (70)
Isolation.test.ts exit 0      Tests  11 passed (11)
Modal.test.ts exit 0      Tests  61 passed (61)
index.test.ts exit 0      Tests  3 passed (3)
census exit 0
compare exit 0
npm run test:app exit 0 (observation)      Tests  223 passed (223)
```
`git grep readFocusedElement` finds nothing. The git-ignored `tmp/` folder still holds earlier rounds' files that mention it. The red-first and mutation runs came before the last edits, which touched comments and prose only; `#press` did not change after them.

## `git status --short`
```
 M guides/veneer.md
 M src/browser/Isolation.ts
 M src/browser/Offcanvas.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/src/browser/Isolation.test.ts
 M tests/src/browser/Offcanvas.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
```

## Deviation state: complete, no stop
Choices I settled within scope:
- **Release read in the probe:** I used the sentinel stand-in described under obligation 1, because the private field cannot be read.
- **The listener that focuses the trigger and prevents the hide:** the test uses a shadow panel with a light-tree trigger. In the light tree the trigger is inert, so the listener's `focus()` fails and the row cannot tell the release condition apart.
- **The listener that moves focus elsewhere:** it moves focus to `#inside`, because `#outer` is inert while the isolation lives.
- **Shadow-panel test containers:** the new cases remove the container's `tabindex`. A focusable container takes the default action's focus, so focus would not end on the body.
- **Fallback H end state:** the press cancels, focus stays inside H while the panel slides out, and it ends on the body once the panel's visibility turns hidden. That settled state matches Bootstrap's for a panel shown without a trigger.
- **Wording:** the source and guide call the fallback host "the isolation's limit" and do not name J-ISOLATION-SHADOW.
- **`holdsFocus` parameter:** it takes `Element`.

One observation outside owned files: the § Modal `Isolation` bullet in `guides/veneer.md` (around the line "Destruction moves focus to the trigger") does not say that the fallback is a shadow host when focus sits inside a shadow root.
