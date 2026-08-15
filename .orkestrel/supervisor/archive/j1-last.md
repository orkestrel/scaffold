# J1 report

Status: implementation complete; runtime acceptance remains unproved because the managed sandbox refuses loopback listeners before Vitest collects browser tests. Static gates pass.

## Touched files and diffstat

- [tests/app/browser/integration/setup.ts](/workspace/supervisor/tests/app/browser/integration/setup.ts)
- [tests/app/browser/integration/journey.test.ts](/workspace/supervisor/tests/app/browser/integration/journey.test.ts)
- [tests/setupBrowser.ts](/workspace/supervisor/tests/setupBrowser.ts)
- [tests/app/browser/ApplicationView.test.ts](/workspace/supervisor/tests/app/browser/ApplicationView.test.ts)
- [tests/app/browser/components/OpenPanel.test.ts](/workspace/supervisor/tests/app/browser/components/OpenPanel.test.ts)
- [tests/app/browser/components/RunList.test.ts](/workspace/supervisor/tests/app/browser/components/RunList.test.ts)

```text
 tests/app/browser/ApplicationView.test.ts      |  4 --
 tests/app/browser/components/OpenPanel.test.ts |  7 +--
 tests/app/browser/components/RunList.test.ts   |  4 +-
 tests/app/browser/integration/journey.test.ts  | 73 +++++++++++++++++++-------
 tests/app/browser/integration/setup.ts         | 68 +++++++++++++++++++++++-
 tests/setupBrowser.ts                          |  4 ++
 6 files changed, 132 insertions(+), 28 deletions(-)
```

## Journey layer surface and calls

`resolveJourneyTarget(page, role, name): Promise<Locator>`

- Minimal roles: `button | textbox`.
- Resolves by accessible name over the live Playwright page.
- Textboxes start from their accessible label because HTML-AAM gives password inputs no implicit role; the resolver then verifies a real text-entry control.
- Buttons use Playwright role resolution with hidden candidates included.
- Refuses ambiguity, hidden controls, wrong control roles, disabled/inert/non-tab-reachable controls, and absent controls with readable messages.
- Returns the real locator, preserving Playwright pointer actionability.
- Records the below-`lg` asymmetry: the backdrop may intercept pointer actions while keyboard reach remains real.

`hasJourneyFocus(target): Promise<boolean>` reads perceived focus for convergent assertions.

Recorded consumers:

- Refusal probe: Username, Password, hidden Close.
- Login journey: Username, Password, retried Password.
- Pointer rail journey: Username, Password, run row.
- Keyboard rail journey: Username, Password, run row.

## Login retrofit table

| Old line/instrument | New instrument |
|---|---|
| 15: `#login-name:focus`, attached wait | Username resolved as `textbox` by accessible name; convergent `hasJourneyFocus` |
| 18: `#login-secret:focus`, attached wait | Password resolved as `textbox` by accessible name; convergent `hasJourneyFocus` |
| 22: `#login form` CSS scope | Named `region` “Login to the supervisor”, then its `alert` role |
| 26: `.is-invalid` class count | Both resolved fields’ accessible `aria-invalid` state |
| 27: `#login-name` value | Resolved Username field’s `inputValue()` |
| 28: `#login-secret` value | Resolved Password field’s `inputValue()` |
| 32: retry `#login-secret:focus` | Freshly resolved Password plus convergent focus assertion |
| 35: retry `#login-secret` value | Resolved retry field’s `inputValue()` |
| 43: `#login` count | Named login region’s disappearance |

The fixed facts remain: type, refuse, preserve both values, one alert, neither field marked invalid, type over the selected password, succeed, and remove the login region.

## Cascade-truth repairs

- `tests/app/browser/ApplicationView.test.ts`: removed the test-local Halfmoon import.
- `tests/setupBrowser.ts`: became the single Halfmoon CSS home for all browser suites.
- `tests/app/browser/components/OpenPanel.test.ts`: the closed disclosure now proves `checkVisibility() === false`; after the real `userEvent` disclosure path it proves `checkVisibility() === true`.
- `tests/app/browser/components/RunList.test.ts`: corrected the keyboard-focus proof to describe the shipped shared-cascade focus ring rather than an unstylized browser default.

The sandbox prevented test collection, so no runtime-generated list of additional cascade breakages was available.

## Acceptance proofs

### Criterion 1 — resolver and readable refusal probe

Implemented as:

```text
it('refuses a hidden control with a readable journey failure', ...)
'journey target button "Close" is hidden'
```

Failing-first and final execution command:

```text
npm run test:app:browser:integration
```

The application build passed, but the test project was not collected:

```text
✓ built in 1.78s
✓ built in 950ms

No test files found, exiting with code 1

Error: listen EPERM: operation not permitted 127.0.0.1
Serialized Error: { code: 'EPERM', errno: -1, syscall: 'listen', address: '127.0.0.1' }
```

Verdict: implemented, runtime proof blocked.

### Criterion 2 — forbidden login instruments removed

Command:

```text
grep -n "locator('#\|state: 'attached'\|is-invalid" tests/app/browser/integration/journey.test.ts
```

Exit: `1`, no output. This is the expected no-match result.

Verdict: static proof passes; journey execution blocked as above.

### Criterion 3 — both rail journeys use the layer

Both rail rows are obtained through:

```ts
await resolveJourneyTarget(page, 'button', `Open ${workflow},`)
```

Pointer journey uses the returned locator’s real `click()`. Keyboard journey reaches it through bounded real Tab presses and activates it with Enter.

Command:

```text
npm run test:app:browser:integration
```

Exit: `1`; blocked before collection by the loopback `EPERM` shown above.

Verdict: implementation present, runtime green unproved.

### Criterion 4 — cascade home and browser project

Command:

```text
rg -n "halfmoon/css/halfmoon.min.css" tests
```

Output:

```text
tests/setupBrowser.ts:31:import 'halfmoon/css/halfmoon.min.css'
```

Command:

```text
npm run test:app:browser
```

Exit: `1`, before test collection:

```text
RUN  v4.1.10 /workspace/supervisor

Error: listen EPERM: operation not permitted 127.0.0.1:63315
Serialized Error: { code: 'EPERM', errno: -1, syscall: 'listen', address: '127.0.0.1', port: 63315 }

Test Files  no tests
Tests       no tests
Errors      1 error
```

Verdict: import placement passes; whole-browser green unproved.

### Criterion 5 — static gates

```text
npm run format:check
```

Exit `0`:

```text
All matched files use the correct format.
Finished in 5694ms on 354 files using 4 threads.
```

```text
npm run lint:check
```

Exit `0`, no diagnostics.

```text
npm run check
```

Exit `0`; root TypeScript, `check:src`, and all `check:app` scopes completed.

Additional:

```text
git diff --check
```

Exit `0`, no output.

## Full diff

```diff
diff --git a/tests/app/browser/ApplicationView.test.ts b/tests/app/browser/ApplicationView.test.ts
index 224b313..1556b81 100644
--- a/tests/app/browser/ApplicationView.test.ts
+++ b/tests/app/browser/ApplicationView.test.ts
@@ -1,9 +1,5 @@
 import type { ApplicationRoster, ApplicationSession } from '@app/core'
 import type { App } from 'vue'
-// The shell's two forms are a CSS decision, so the proofs below read the same compiled cascade the
-// page itself loads. Without it every breakpoint class is an inert string and a hidden rail answers
-// as though it were on screen.
-import 'halfmoon/css/halfmoon.min.css'
 import { BrowserApplicationError, createOperatorStore, Operator, POINTER_KEY } from '@app/browser'
 import { failure, success } from '@orkestrel/workflow'
 import { nextTick } from 'vue'
diff --git a/tests/app/browser/components/OpenPanel.test.ts b/tests/app/browser/components/OpenPanel.test.ts
index 063b9dc..166eba9 100644
--- a/tests/app/browser/components/OpenPanel.test.ts
+++ b/tests/app/browser/components/OpenPanel.test.ts
@@ -106,11 +106,11 @@ describe('OpenPanel', () => {
 		expect(control.getAttribute('aria-expanded')).toBe('false')
 		expect(control.getAttribute('aria-controls')).toBe('open-run-door')
 		expect(control.className).not.toContain('active')
-		// No stylesheet loads in this realm, so the closed door is proved by the state the shipped
-		// cascade acts on — `.collapse:not(.show)` is what sets `display: none` — and the capture round
-		// proves what the reader sees.
+		// The shared browser cascade makes the closed state perceptual here: the form is absent from
+		// sight until the reader asks for it, then the same disclosed form becomes visible.
 		expect(door?.classList.contains('collapse')).toBe(true)
 		expect(door?.classList.contains('show')).toBe(false)
+		expect(door instanceof HTMLElement ? door.checkVisibility() : true).toBe(false)
 		expect(element.querySelector('.btn-primary')).toBeNull()
 
 		await disclose(element)
@@ -118,6 +118,7 @@ describe('OpenPanel', () => {
 		expect(control.getAttribute('aria-expanded')).toBe('true')
 		expect(control.className).toContain('active')
 		expect(door?.classList.contains('show')).toBe(true)
+		expect(door instanceof HTMLElement ? door.checkVisibility() : false).toBe(true)
 
 		// Demotion, not redesign: the door that opens still opens the run it is given. The wait is the
 		// projected stack itself, so the assertion follows the work landing rather than a timer.
diff --git a/tests/app/browser/components/RunList.test.ts b/tests/app/browser/components/RunList.test.ts
index a8245c5..325d32e 100644
--- a/tests/app/browser/components/RunList.test.ts
+++ b/tests/app/browser/components/RunList.test.ts
@@ -377,8 +377,8 @@ describe('RunList', () => {
 		await userEvent.keyboard('{Tab}')
 
 		// Focus arrived under keyboard modality, which is the only condition under which the browser
-		// itself decides a focus ring is owed. No stylesheet loads in this realm, so this proves the
-		// rail suppresses no ring rather than measuring the one the shipped cascade paints.
+		// itself decides a focus ring is owed. The shared cascade now makes this the shipped ring rather
+		// than the browser default, and the test still reads the focus the reader actually reached.
 		expect(document.activeElement).toBe(first)
 		expect(first?.matches(':focus-visible')).toBe(true)
 		expect(getComputedStyle(first ?? element).outlineStyle).not.toBe('none')
diff --git a/tests/app/browser/integration/journey.test.ts b/tests/app/browser/integration/journey.test.ts
index 82deb65..9b9363b 100644
--- a/tests/app/browser/integration/journey.test.ts
+++ b/tests/app/browser/integration/journey.test.ts
@@ -1,38 +1,71 @@
 import { describe, expect, inject, it } from 'vitest'
-import { driveApplication, startApplicationWorkflow, waitForApplicationSession } from './setup.js'
+import {
+	driveApplication,
+	hasJourneyFocus,
+	resolveJourneyTarget,
+	startApplicationWorkflow,
+	waitForApplicationSession,
+} from './setup.js'
 
 // A journey drives the shipped application the way a reader does: it types with the keyboard,
 // presses the keys a keyboard offers, and reads what the page renders. It reaches into no browser
 // object, holds no credential the form did not receive, and waits on nothing but the interface.
 describe('Login journey', () => {
+	it('refuses a hidden control with a readable journey failure', async () => {
+		const seam = inject('application')
+		await driveApplication(seam, async (page) => {
+			await page.goto(seam.origin, { waitUntil: 'load' })
+			const username = await resolveJourneyTarget(page, 'textbox', 'Username')
+			const password = await resolveJourneyTarget(page, 'textbox', 'Password')
+			await username.click()
+			await page.keyboard.type(seam.name)
+			await page.keyboard.press('Tab')
+			await expect.poll(() => hasJourneyFocus(password)).toBe(true)
+			await page.keyboard.type(seam.secret)
+			await page.keyboard.press('Enter')
+			await waitForApplicationSession(page)
+
+			await expect(resolveJourneyTarget(page, 'button', 'Close')).rejects.toThrow(
+				'journey target button "Close" is hidden',
+			)
+		})
+	})
+
 	it('replaces the selected password by typing after a refusal and reaches the authenticated view', async () => {
 		const seam = inject('application')
 		const wrong = 'wrong-password'
 		await driveApplication(seam, async (page) => {
 			await page.goto(seam.origin, { waitUntil: 'load' })
+			const login = page.getByRole('region', { name: 'Login to the supervisor' })
+			await login.waitFor({ state: 'visible' })
+			const username = await resolveJourneyTarget(page, 'textbox', 'Username')
+			const password = await resolveJourneyTarget(page, 'textbox', 'Password')
 
 			// The card takes the focus on arrival, so the reader types without finding a field first.
-			await page.locator('#login-name:focus').waitFor({ state: 'attached' })
+			await expect.poll(() => hasJourneyFocus(username)).toBe(true)
 			await page.keyboard.type(seam.name)
 			await page.keyboard.press('Tab')
-			await page.locator('#login-secret:focus').waitFor({ state: 'attached' })
+			await expect.poll(() => hasJourneyFocus(password)).toBe(true)
 			await page.keyboard.type(wrong)
 			await page.keyboard.press('Enter')
 
-			const alert = page.locator('#login form').getByRole('alert')
+			const alert = login.getByRole('alert')
 			await alert.waitFor({ state: 'visible' })
 
+			expect(await login.getByRole('alert').count()).toBe(1)
 			expect(await alert.textContent()).toContain('The supervisor refused that login.')
-			expect(await page.locator('#login form .is-invalid').count()).toBe(0)
-			expect(await page.locator('#login-name').inputValue()).toBe(seam.name)
-			expect(await page.locator('#login-secret').inputValue()).toBe(wrong)
+			expect(await username.getAttribute('aria-invalid')).toBeNull()
+			expect(await password.getAttribute('aria-invalid')).toBeNull()
+			expect(await username.inputValue()).toBe(seam.name)
+			expect(await password.inputValue()).toBe(wrong)
 
 			// The refusal leaves the password focused with its contents selected, so the retry is one
 			// word typed over the last one. Nothing here clears the field, and nothing clicks it.
-			await page.locator('#login-secret:focus').waitFor({ state: 'attached' })
+			const retry = await resolveJourneyTarget(page, 'textbox', 'Password')
+			await expect.poll(() => hasJourneyFocus(retry)).toBe(true)
 			await page.keyboard.type(seam.secret)
 
-			expect(await page.locator('#login-secret').inputValue()).toBe(seam.secret)
+			expect(await retry.inputValue()).toBe(seam.secret)
 
 			await page.keyboard.press('Enter')
 
@@ -40,7 +73,7 @@ describe('Login journey', () => {
 			// reader knows they are in one.
 			await waitForApplicationSession(page)
 
-			expect(await page.locator('#login').count()).toBe(0)
+			expect(await login.count()).toBe(0)
 		})
 	})
 })
@@ -55,9 +88,12 @@ describe('Rail journey', () => {
 		const workflow = 'journey-pressed'
 		await driveApplication(seam, async (page) => {
 			await page.goto(seam.origin, { waitUntil: 'load' })
-			await page.getByLabel('Username').click()
+			const username = await resolveJourneyTarget(page, 'textbox', 'Username')
+			const password = await resolveJourneyTarget(page, 'textbox', 'Password')
+			await username.click()
 			await page.keyboard.type(seam.name)
 			await page.keyboard.press('Tab')
+			await expect.poll(() => hasJourneyFocus(password)).toBe(true)
 			await page.keyboard.type(seam.secret)
 			await page.keyboard.press('Enter')
 			await waitForApplicationSession(page)
@@ -68,8 +104,7 @@ describe('Rail journey', () => {
 
 			// Nothing is typed and no id is recalled: the run arrives in the rail on its own, and the
 			// row is what the reader waits for and then presses.
-			const row = page.getByRole('button', { name: `Open ${workflow},` })
-			await row.waitFor({ state: 'visible' })
+			const row = await resolveJourneyTarget(page, 'button', `Open ${workflow},`)
 			await row.click()
 
 			// What the reader sees is the run's own name where a run's title goes, the request it is
@@ -88,9 +123,12 @@ describe('Rail journey', () => {
 		const workflow = 'journey-tabbed'
 		await driveApplication(seam, async (page) => {
 			await page.goto(seam.origin, { waitUntil: 'load' })
-			await page.getByLabel('Username').click()
+			const username = await resolveJourneyTarget(page, 'textbox', 'Username')
+			const password = await resolveJourneyTarget(page, 'textbox', 'Password')
+			await username.click()
 			await page.keyboard.type(seam.name)
 			await page.keyboard.press('Tab')
+			await expect.poll(() => hasJourneyFocus(password)).toBe(true)
 			await page.keyboard.type(seam.secret)
 			await page.keyboard.press('Enter')
 			await waitForApplicationSession(page)
@@ -99,18 +137,17 @@ describe('Rail journey', () => {
 			expect(started.status).toBe(202)
 			await started.body?.cancel()
 
-			const row = page.getByRole('button', { name: `Open ${workflow},` })
-			await row.waitFor({ state: 'visible' })
+			const row = await resolveJourneyTarget(page, 'button', `Open ${workflow},`)
 
 			// Tab walks the interface in the order the interface itself offers, and the row either
 			// answers within a page's worth of presses or this journey fails. Nothing here focuses an
 			// element on the reader's behalf.
 			for (let press = 0; press < 24; press += 1) {
-				if (await row.evaluate((node) => node === document.activeElement)) break
+				if (await hasJourneyFocus(row)) break
 				await page.keyboard.press('Tab')
 			}
 
-			expect(await row.evaluate((node) => node === document.activeElement)).toBe(true)
+			expect(await hasJourneyFocus(row)).toBe(true)
 
 			await page.keyboard.press('Enter')
 
diff --git a/tests/app/browser/integration/setup.ts b/tests/app/browser/integration/setup.ts
index d434ddc..2fb7f11 100644
--- a/tests/app/browser/integration/setup.ts
+++ b/tests/app/browser/integration/setup.ts
@@ -1,7 +1,7 @@
 import type { ApplicationRoster, ApplicationWorkflowInput } from '@app/core'
 import type { ClientRosterInterface } from '@app/browser'
 import type { Result } from '@orkestrel/contract'
-import type { Browser, BrowserContext, Cookie, Page } from 'playwright'
+import type { Browser, BrowserContext, Cookie, Locator, Page } from 'playwright'
 import {
 	APP_ROSTER_EVENT,
 	APP_ROSTER_LIVE_PATH,
@@ -191,6 +191,72 @@ export function launchApplicationBrowser(seam: ApplicationSeamInterface): Promis
 	})
 }
 
+/**
+ * Resolve one visible, keyboard-reachable journey control by role and accessible name.
+ *
+ * @param page - The live Playwright page a person is driving
+ * @param role - The human-facing control role needed by the journey
+ * @param name - The accessible name exposed by the rendered page
+ * @returns The one visible and focus-reachable control matching the request
+ *
+ * @remarks
+ * Playwright follows HTML-AAM and assigns password inputs no implicit role, so textbox lookup starts
+ * from the control's accessible label and then verifies that the result is a real text-entry field.
+ * Buttons use Playwright's role resolver directly. Both paths include hidden candidates so the
+ * layer can refuse one immediately with a readable journey failure instead of timing out.
+ *
+ * Below `lg`, the drawer backdrop blocks pointers but does not remove keyboard reach from controls
+ * behind it. This layer preserves that recorded Tab-escape asymmetry: a returned target is genuinely
+ * keyboard-reachable, while a pointer action still goes through Playwright's real actionability and
+ * fails if the backdrop intercepts it.
+ */
+export async function resolveJourneyTarget(
+	page: Page,
+	role: 'button' | 'textbox',
+	name: string | RegExp,
+): Promise<Locator> {
+	const target =
+		role === 'textbox' ? page.getByLabel(name) : page.getByRole(role, { name, includeHidden: true })
+	const label = typeof name === 'string' ? JSON.stringify(name) : name.toString()
+	let count = await target.count()
+	if (count === 0) {
+		try {
+			await target.first().waitFor({ state: 'visible' })
+		} catch (cause) {
+			throw new Error(`journey target ${role} ${label} did not become visible`, { cause })
+		}
+		count = await target.count()
+	}
+	if (count !== 1) {
+		throw new Error(`journey target ${role} ${label} is ambiguous: found ${String(count)} controls`)
+	}
+	const control = target.first()
+	if (!(await control.isVisible())) {
+		throw new Error(`journey target ${role} ${label} is hidden`)
+	}
+	if (role === 'textbox') {
+		const textbox = await control.evaluate(
+			(node) =>
+				node instanceof HTMLTextAreaElement ||
+				(node instanceof HTMLInputElement &&
+					['email', 'password', 'search', 'tel', 'text', 'url'].includes(node.type)),
+		)
+		if (!textbox) throw new Error(`journey target ${role} ${label} has the wrong control role`)
+	}
+	const reachable = await control.evaluate(
+		(node) => node instanceof HTMLElement && node.tabIndex >= 0 && node.closest('[inert]') === null,
+	)
+	if (!reachable || !(await control.isEnabled())) {
+		throw new Error(`journey target ${role} ${label} is not focus-reachable`)
+	}
+	return control
+}
+
+/** Read whether one resolved journey target currently holds the reader's focus. */
+export function hasJourneyFocus(target: Locator): Promise<boolean> {
+	return target.evaluate((node) => node === document.activeElement)
+}
+
 /**
  * Drive one real Chromium page against the application and release everything it acquired.
  *
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
index 13c4081..cbbbd47 100644
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -25,6 +25,10 @@ import type { Result } from '@orkestrel/contract'
 import type { WorkflowSnapshot } from '@orkestrel/workflow'
 import type { Observation, QuarantinedUnit, SettledUnit, UnitSnapshot } from '@src/core'
 import type { App, Component } from 'vue'
+// Browser component proofs share the application's compiled cascade. Keeping the framework CSS in
+// setup makes visibility, focus reach, and breakpoint role queries truthful in every suite instead
+// of only in the shell test that first needed them.
+import 'halfmoon/css/halfmoon.min.css'
 import { resolveLiveFrameEvent } from '@app/core'
 import { isLiveFrame, LiveStream, OPERATOR_KEY } from '@app/browser'
 import { failure, success } from '@orkestrel/workflow'
```

## Git status

```text
 M tests/app/browser/ApplicationView.test.ts
 M tests/app/browser/components/OpenPanel.test.ts
 M tests/app/browser/components/RunList.test.ts
 M tests/app/browser/integration/journey.test.ts
 M tests/app/browser/integration/setup.ts
 M tests/setupBrowser.ts
```

## Deviations

No product-code deviation was found, and no off-limits file was changed.

Execution deviation: both required browser projects are unverified because this sandbox prohibits binding loopback listeners. Vitest collected zero tests and returned `EPERM` before either journey or component code ran. Therefore criteria 1, 3, and the runtime portion of 4 cannot honestly be declared green in this environment.