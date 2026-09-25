# E-ID-MOTION-COLLAPSE: stopped before any edit

I stopped the unit before editing anything. The search the brief requires before editing found a test outside the owned set that this change would make fail. The Deviation contract says to stop "when a change needs a file outside the owned set".

- **Tree:** no file was edited. The worktree is at `877e7c6`, and `git status --short` printed nothing.
- **Report file:** `/home/user/veneer-mcol/tmp/units/mcol-report.md` holds the same text as this report.

## Expected
The brief's Evidence lists the collapse timing checks in `collapse.test.ts` and the chevron timing check in `accordion.test.ts`. It says to "own every pin in the owned set".

## Found
`tests/src/styles/components/fade.test.ts` also checks the collapse timing, and that file is off-limits. The check is in the case `yields the transition to the collapsing rule on an element carrying the fade and collapsing classes`, around line 240. It expects this row:

```ts
['height', '0.35s', 'ease'],
```

After the ruled change, that element resolves to `height` over `0.25s` on `cubic-bezier(0.32, 0.72, 0, 1)`, so the case fails. The case is about the order in which the fade and collapse partials load, not about the collapse timing.

## Evidence
The pre-edit search over `tests/` (TypeScript files):
```text
$ cd /home/user/veneer-mcol && grep -rnE "0\.35s|'height 0\.35s'|0\.2s" tests/ --include=*.ts
tests/src/styles/components/fade.test.ts:250:			['height', '0.35s', 'ease'],
tests/src/styles/components/accordion.test.ts:501:			'0.2s',
tests/src/styles/components/collapse.test.ts:64:				[undefined, '0px', '', 'hidden', 'height 0.35s'],
tests/src/styles/components/collapse.test.ts:68:				[undefined, 'auto', '0px', '', 'width 0.35s'],
tests/src/styles/components/collapse.test.ts:160:			['height', '0.35s', 'ease'],
tests/src/styles/components/collapse.test.ts:161:			['width', '0.35s', 'ease'],
tests/src/styles/components/collapse.test.ts:174:		).toEqual(['0.35s', '0.35s'])
tests/src/styles/components/collapse.test.ts:183:	// `calc(0.35s * var(--vn-factor-motion))`: a wrapper doubling the motion factor would then read
tests/src/styles/components/collapse.test.ts:190:		expect(readStyle(panel, 'transition-duration')).toBe('0.35s')
tests/setupBrowser.test.ts:1836:			<p style="transition: color 0.2s 1s"></p>
```
- The `setupBrowser.test.ts` hit is an inline test style, not a value a partial ships, so the change doesn't affect it.
- Every other hit outside `fade.test.ts` is in the owned set.

## Answers to the Unknowns
- **App proofs, the showcase, and engine proofs:** none checks a value this unit changes.
  - The search `grep -rnE "0\.35s|\b350\b|0\.2s|ease-in-out" tests/app app tests/src/browser` returned nothing.
  - It covered all three directories. They hold `app/browser/sections/CollapseSection.ts`, `app/browser/sections/AccordionSection.ts`, their `tests/app/browser/sections/*` proofs, and `tests/src/browser/Collapse.test.ts`.
- **Other style proofs and setup files:** nothing else is affected.
  - `grep -rnE "\b350\b|collapsing" tests/src/styles tests/*.ts`, leaving out the collapse and fade proofs, found only the toast's `350` px width, comments, and a class list in `setupServer.test.ts`.
  - The case table in `tests/setupStyles.test.ts` names the `--bs-accordion-btn-icon-transition` property but not its value. It stays green as long as the partial still declares the property.
- **How the ledger classes each change:** not answered. It needs the changed stylesheet and a `npm run test:conformance` run.

## Guide text outside the owned sections
§ Fade classes says an element with both the `fade` and `collapsing` classes "transitions its size". That stays true after the change, so it needs no edit.

## Proposed fix
Either grant this unit that one case in `tests/src/styles/components/fade.test.ts`, or apply the following patch yourself. The patch compares the element that has both classes with a plain `.collapsing` element. The case then checks the load order without fixing the collapse's values. If the fade partial loaded after the collapse partial, the combined element would take the fade's `opacity` transition instead of the plain panel's, and the case would still fail with an `AssertionError`.
```diff
 	it('yields the transition to the collapsing rule on an element carrying the fade and collapsing classes', () => {
 		const host = scene.mount(
-			'<div class="fade collapsing" style="height: 24px">Tide table</div><div class="fade">Tide table</div>',
+			'<div class="fade collapsing" style="height: 24px">Tide table</div><div class="collapsing" style="height: 24px">Tide table</div><div class="fade">Tide table</div>',
 		)
-		expect(
-			[...host.children].map((element) => [
-				readStyle(element, 'transition-property'),
-				readStyle(element, 'transition-duration'),
-				readStyle(element, 'transition-timing-function'),
-			]),
-		).toEqual([
-			['height', '0.35s', 'ease'],
-			['opacity', '0.15s', 'ease-out'],
-		])
+		const [compound, closing, fading] = [...host.children].map((element) => [
+			readStyle(element, 'transition-property'),
+			readStyle(element, 'transition-duration'),
+			readStyle(element, 'transition-timing-function'),
+		])
+		expect(closing?.[0]).toBe('height')
+		expect(compound).toEqual(closing)
+		expect(fading).toEqual(['opacity', '0.15s', 'ease-out'])
 	})
```
The case's comment says "The lone fading element is the reading that the fade rule is present". Add a matching clause saying the plain `.collapsing` element is the collapsing rule's own reading.

## Done and not done
- **Done:** read every law file the brief names, confirmed the clean baseline, and ran the pre-edit and Unknowns searches.
- **Not done:** everything from Execution step 1 on. There are no proofs, rule changes, guide edits, plants, or gate runs.
- **Diff and status files:** `tmp/units/mcol.diff` and `tmp/units/mcol-status.txt` were not written, because nothing changed since `877e7c6`.
