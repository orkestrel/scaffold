The diff adds `dismissOtherPopovers`, using accessible trigger clicks and `COMPONENT_WAIT`, plus the regression proof. Nothing was committed.

```diff
diff --git a/tests/setupBrowser.test.ts b/tests/setupBrowser.test.ts
--- a/tests/setupBrowser.test.ts
+++ b/tests/setupBrowser.test.ts
@@ -403,6 +403,56 @@ describe('showcase mount', () => {
 })
 
 describe('component statechart setup', () => {
+	it('removes the preceding popover before clicking the next specimen', async () => {
+		const controller = new AbortController()
+		try {
+			const variant = { name: 'light-1280', width: 1280, height: 800 }
+			await buildJourney(variant, true)
+			const table = requireValue(COMPONENT_TABLES.find(({ family }) => family === 'popover'))
+			const first = requireValue(
+				table.scenarios.find(({ specimen }) => specimen.control === 'Delivery status'),
+			)
+			const second = requireValue(
+				table.scenarios.find(({ specimen }) => specimen.control === 'Billing status'),
+			)
+			const previous = await buildComponent(first, variant)
+			await first.arrange(previous, 'shown')
+			const panel = requireValue(
+				document.getElementById(
+					requireValue(previous.buttons?.get(previous.control)?.getAttribute('aria-describedby')),
+				),
+			)
+			const context = await buildComponent(second, variant)
+			const trigger = requireValue(context.buttons?.get(context.control))
+			const readings =
+				createRecorder<readonly [boolean, readonly Element[], Element | null, boolean]>()
+			trigger.addEventListener(
+				'pointerdown',
+				(event) => {
+					const box = trigger.getBoundingClientRect()
+					readings.handler(
+						panel.isConnected,
+						readStrayTipPanels(undefined),
+						document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2),
+						event.isTrusted,
+					)
+				},
+				{ signal: controller.signal },
+			)
+			await second.arrange(context, 'shown')
+			expect(readings.calls).toEqual([[false, [], trigger, true]])
+			expect(table.state(context)).toBe('shown')
+			const owned = requireValue(
+				document.getElementById(requireValue(trigger.getAttribute('aria-describedby'))),
+			)
+			await second.arrange(context, 'shown')
+			expect(owned.isConnected).toBe(true)
+			expect(readings.count).toBe(1)
+		} finally {
+			controller.abort()
+			await parkShowcasePointer()
+		}
+	}, 30_000)
 	it.each([true, false])('fires scrollend for ArrowDown with motion=%s', async (motion) => {
 		try {
 			await stageMedia({ motion })
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -4564,7 +4564,41 @@ export const TOOLTIP_SCENARIOS: ReadonlyArray<
 		),
 )
 
+/** Dismisses other specimens' popovers through their named controls before the next click.
+ * @param context - The specimen whose own popover must remain untouched.
+ * @returns Resolves after every other popover panel leaves the document.
+ */
+export async function dismissOtherPopovers(context: ComponentSpecimen): Promise<void> {
+	const host = requireValue(context.buttons?.get(context.control))
+	const panel = document.getElementById(host.getAttribute('aria-describedby') ?? '') ?? undefined
+	const base = CLASS_NAMES.bootstrap.components.popover.base
+	for (const other of readStrayTipPanels(panel)) {
+		if (!other.classList.contains(base) || !other.classList.contains('show')) continue
+		const trigger = requireValue(
+			document.querySelector(`[aria-describedby~="${CSS.escape(other.id)}"]`),
+		)
+		const region = requireValue(
+			page
+				.getByRole('region')
+				.elements()
+				.find((element) => element.contains(trigger)),
+		)
+		await clickAccessibleWithin(readName(region), 'button', readName(trigger))
+		await waitForCondition(
+			`${readName(trigger)} popover leaves the document`,
+			() => !other.isConnected,
+			COMPONENT_WAIT,
+		)
+	}
+	await waitForCondition(
+		`${context.control} has no other popover panel`,
+		() => !readStrayTipPanels(panel).some((element) => element.classList.contains(base)),
+		COMPONENT_WAIT,
+	)
+}
+
 async function arrangePopoverVisibility(context: ComponentSpecimen, state: string): Promise<void> {
+	await dismissOtherPopovers(context)
 	const shown = readTipVisibility(context) === 'shown'
 	if (document.activeElement !== context.buttons?.get(context.control)) {
 		await clickAccessibleWithin(context.region, 'button', context.control)
```

`git status --porcelain`:

```text
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

Gate commands ran from `/home/user/.wave/veneer-containment`. Format and lint used these commands, both exiting 0:

```text
/home/user/.wave/veneer-containment/node_modules/.bin/oxfmt --config /home/user/.wave/veneer-containment/.oxfmtrc.json --check /home/user/.wave/veneer-containment/tests/setupBrowser.ts /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts

/home/user/.wave/veneer-containment/node_modules/.bin/oxlint --config /home/user/.wave/veneer-containment/.oxlintrc.json --deny-warnings /home/user/.wave/veneer-containment/tests/setupBrowser.ts /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts
```

Format’s bare result was `All matched files use the correct format.` Lint emitted no output.

Every queued command used this form, with a fresh folder:

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

The following command definitions expand `COMMAND`; `NAME` is the run-folder name in the results table.

```text
TYPECHECK:
/home/user/.wave/veneer-containment/node_modules/.bin/tsc --noEmit --project /home/user/.wave/veneer-containment/tsconfig.json

PROOF:
/home/user/.wave/veneer-containment/node_modules/.bin/vitest run --config /home/user/.wave/veneer-containment/vite.config.ts --configLoader runner --no-cache --project setup:browser /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts -t 'removes the preceding popover' --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/NAME/report.json

SETUP:
/home/user/.wave/veneer-containment/node_modules/.bin/vitest run --config /home/user/.wave/veneer-containment/vite.config.ts --configLoader runner --no-cache --project setup:browser /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/NAME/report.json

POPOVER:
CAPTURE=0 /home/user/.wave/veneer-containment/node_modules/.bin/vitest run --config /home/user/.wave/veneer-containment/configs/app/vite.journey.config.ts --configLoader runner --no-cache --project journey:light-1280 -t "drives the 'popover' table" --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/NAME/report.json

JOURNEY:
CAPTURE=0 /home/user/.wave/veneer-containment/node_modules/.bin/vitest run --config /home/user/.wave/veneer-containment/configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/NAME/report.json
```

Each folder link contains the exact command record and logs.

| Command | Folder | Kind | Exit | Bare result |
|---|---|---|---:|---|
| PROOF | [task75-u7c-proof-red](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-proof-red) | command | 1 | `Tests  1 failed \| 145 skipped (146)` |
| PROOF | [task75-u7c-proof-green](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-proof-green) | command | 0 | `Tests  1 passed \| 145 skipped (146)` |
| TYPECHECK | [task75-u7c-typecheck](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-typecheck) | command | 0 | No output |
| SETUP | [task75-u7c-setup](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-setup) | command | 0 | `Tests  146 passed (146)` |
| POPOVER | [task75-u7c-popover](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-popover) | command | 0 | `Tests  2 passed \| 18 skipped (20)` |
| JOURNEY | [task75-u7c-journey-1](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-journey-1) | journey | 0 | `Tests  94 passed (94)` |
| TYPECHECK | [task75-u7c-typecheck-final](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-typecheck-final) | command | 0 | No output |

Popover durations from the JSON reports, in milliseconds:

| Motion | [Before: U5](/home/user/veneer/tmp/units/journey-cost/runs/task75-u5-journey-1/report.json) | [After: filtered](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-popover/report.json) | [After: full journey](/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-journey-1/report.json) |
|---|---:|---:|---:|
| true | 132,150.1 | 13,879.5 | 19,829.8 |
| false | 13,450.9 | 9,351.8 | 13,870.2 |

The full run recorded 605.071 seconds elapsed, 69.39 outside CPU seconds, and no OOM increment. The filtered run used `--kind command`, so it has no host-load sampler.

The deviation is the brief’s Escape premise: **expected** Escape hides the popover; **found** the existing `POPOVER_SCENARIOS` explicitly preserves its shown state for Escape. **Evidence:** its unchanged transition expression and the passing table runs. **Done:** used the expressly permitted trigger-click method. **Hypothesis:** the brief’s Escape context note is stale.

The Orchestrator’s comparison remains **not run by this unit**, as assigned. Candidate: `task75-u7c-journey-1`; baselines: `task75-u3-journey-1` and `task75-u3-journey-2`; expected exit 0 with no row changes. All existing scenario rows, order, titles, and Journal code are unchanged.