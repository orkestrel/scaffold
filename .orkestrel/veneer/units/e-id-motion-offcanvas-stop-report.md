# E-ID-MOTION-OFFCANVAS report

**Deviation state: STOPPED.** The ruled hidden-state opacity makes a resting offcanvas panel inside an expanded navbar transparent. The fix needs `src/styles/components/_navbar.scss`, which is off-limits. I stopped after the proofs and the offcanvas rules. The guide, the plants, and the gates are not done. The same report is in `/home/user/veneer-moff/tmp/units/moff-report.md`.

## Deviation

- **Expected.** Opacity `0` on the hidden and `.hiding` states, written in the `$panel` and `$nested` maps, reaches only the fixed panel. The in-flow range keeps full opacity.
- **Found.** The navbar partial's `.navbar-expand{infix} .offcanvas` rule puts a panel back in the flow at and above the bar's boundary.
  - It resets `visibility`, `transform`, `transition`, and the box, but writes no `opacity`.
  - A resting in-flow panel carries no state class, so the bare `.offcanvas` rule's `opacity: 0` reaches it.
  - This is Bootstrap's offcanvas-navbar pattern. At desktop widths the links sit in an in-flow panel with no `show` class, so the bar's links would disappear.
  - The showcase's navbar specimen carries `show`, so it doesn't reveal this.
- **Evidence.** `tmp/units/moff-stop-styles.log.txt` holds this run, taken after `npm run build:src:styles`:
  `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts`
  - It exits 1, and the only failures are the `lays a shown and a resting panel into the $name expanded bar …` cases, one per boundary, `xs` included.
  - Each fails on the resting panel's opacity at and above its boundary. At 992 px, for example, it reads `resting: ['visible', 0, 0, '0']` where `'1'` is expected.
  - The `navbar.test.ts` file passes, and `/proc/loadavg` is appended to the log.
- **Probe of the fix.** `tmp/units/moff-probe-navbar-reset.log.txt` holds the probe run.
  - The probe loaded the proposed rule through `scene.load` into the components layer, under each bar's `(width >= boundary)` condition, and ran `-t "expanded bar"`.
  - Every navbar case passes (exit 0).
  - I removed the probe edit afterwards, and `cmp` confirmed the test file matches the kept copy.
- **Done.** The proofs are written, and the offcanvas rules turn them green except for the navbar resting opacity.
- **Not done.** Execution step 3's guide rows, step 4's plants, and step 5's gate logs. I read `npm run test:conformance` once to answer the ledger unknown; that reading is under § Unknowns.
- **Hypothesis.** The in-flow reset belongs in the navbar partial, beside its `visibility` and `transform` resets.
  - Plain `opacity: 1` is enough there, because specificity (0,2,0) beats the bare `.offcanvas` rule's (0,1,0).
  - The panel's `.showing` and `.show:not(.hiding)` rules write `1` anyway.

### The unowned patch (report-only, not applied)

This patch to the navbar partial closes the navbar case:

```diff
--- a/src/styles/components/_navbar.scss
+++ b/src/styles/components/_navbar.scss
@@ .navbar-expand#{$infix} .offcanvas
 			border: 0 !important;
 			transform: none !important;
+			opacity: 1;
 			transition: none;
 		}
```

The patch also makes these statements false, each outside this unit's owned set:

- The comment above that rule in `_navbar.scss` (around line 157), which lists what the bar resets.
- The `guides/veneer.md` § Navbar paragraph that starts "The expanded bar also turns an offcanvas panel into part of its row". It lists the panel properties the bar's rule wins over.
- The conformance ledger's navbar rows. `.navbar-expand{infix} .offcanvas { opacity }` becomes a declaration addition for each infix.

**Alternative (not recommended).** Write `.navbar-expand{infix} .offcanvas { opacity: 1 }` in `_offcanvas.scss`, under the bar's breakpoint.
- **Benefit.** The change stays inside the owned files, and the recorded selector set doesn't change.
- **Cost.** The bar's in-flow reset is split across the two partials, although the navbar partial states that it owns that rule.

## Searches

- **Timing literals.** I searched `0\.3s|300ms|ease-in-out` across `tests/src/browser`, `tests/app`, and `app`. No match.
- **Files naming `offcanvas`.**
  - `tests/src/browser/{Delegate,validators,Offcanvas,index}.test.ts`
  - `tests/app/browser/sections/{EngineSection,NavbarSection,OffcanvasSection}.test.ts`
  - `app/browser/sections/OffcanvasSection.ts`
  - `app/browser/constants.ts`
- **Opacity readings.** Of those files, only `tests/src/browser/Offcanvas.test.ts` reads an opacity, and it is the backdrop's, in the case `reads the shipped offcanvas declarations the motion proofs run under`. That case pins no panel opacity and no duration.
- **Showcase navbar.** The `Navbar with offcanvas` markup in `app/browser/constants.ts` puts `show` on its panel.
- **Result.** No engine proof or showcase proof pins a value this unit changes.
- **Style pins.** I searched `0.3s|ease-in-out` across `tests/` outside the browser and app trees. The only offcanvas pin was the `offcanvas.test.ts` motion case (around line 547), which this unit replaces.

## Unknowns

- **Opacity declaration form.** `opacity: 0` sits in the `$panel` map, and `opacity: 1` in the `'&.showing, &.show:not(.hiding)'` entry of `$nested`. The bare panel and each responsive panel below its boundary already emit both maps, so the in-flow responsive range gets neither declaration. The navbar in-flow range is the deviation.
- **Ledger classing.** I read `tmp/units/moff-stop-conformance.log.txt` (exit 1) before writing any guide row.
  - Each panel class classes the transition variable as a departure:
    `offcanvas | .offcanvas{,-sm,-md,-lg,-xl,-xxl} | --bs-offcanvas-transition | — | transform 0.3s ease-in-out | transform var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-out) | tokenized`
  - The opacity declarations class as additions:
    `offcanvas | .offcanvas[-{bp}] { opacity } | — or @media (width < N) | declaration | 0`
    The same row appears for `.showing` and `.show:not(.hiding)`, at `1`.
  - The `tokenized` cell has the same legend problem the MODAL verdict carries to LEDGER-RETUNE: `250ms` on the panel curve doesn't preserve `0.3s ease-in-out`.
- **Engine and showcase readings.** See § Searches.

## Failing-first and current readings

Every run followed `npm run build:src:styles`, and each used this command:
`npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts`

| Stage | Log | Reading |
| --- | --- | --- |
| Base rules, proofs written | `tmp/units/moff-red.log.txt` | exit 1; 18 failed, 22 passed; every failure an `AssertionError` |
| Rules changed | `tmp/units/moff-green-2.log.txt` | exit 1; 6 failed, 34 passed; every failure is the navbar resting panel's in-flow opacity |

These proofs were red at base, each named for what it asserts:

- `paints a panel carrying "$classes" when the state shows it, and keeps it slid out and transparent while the state leaves it`. It reads opacity beside the visibility and the slide. The expected opacity comes from the shared table's `slid` field, so the shared table needs no patch.
- `slides the $placement panel in from its edge on the panel curve and fades it in on the ease-out curve over the panel duration as the showing class joins, and back out as the hiding class joins`, once per placement.
- `keeps the $name panel opaque and still at and above its boundary, and slides and fades it in below`, once per responsive boundary.
- `doubles the running slide and fade at a doubled motion factor, and runs none at a zero factor or under the reduced-motion preference, on the bare panel and on a responsive panel below its boundary`. It uses `sweepMotionFactor` inside `visitBreakpoint(1399, …)`, once with motion allowed and once under the reduced-motion preference.
- `lays a shown and a resting panel into the $name expanded bar …`. It adds the resting panel's opacity, and the fixed panel's transition property reads `transform, opacity`.

The proofs follow the MODAL audit findings:
- Each sample's presence is asserted with `toBeDefined()` or `not.toContain(undefined)` before `requireValue` narrows it.
- A reading with no transition holds `undefined` in its duration slot.
- Each timing is named by its tokens.

## Rules as written

These are the rule changes in `src/styles/components/_offcanvas.scss`:

```scss
// $panel
	visibility: hidden,
	opacity: 0,
// $nested
	'&.showing, &.show:not(.hiding)': (
		transform: none,
		opacity: 1,
	),
// every panel class
		--bs-offcanvas-transition:
			transform var(--vn-motion-panel) var(--vn-ease-panel),
			opacity var(--vn-motion-panel) var(--vn-ease-out);
```

I rewrote the header comment and the responsive-range comment to match these rules.

## Not produced because of the stop

- The guide rows: § Offcanvas classes, the § Factors exception list, and the `0.3s` clause under `## Engine`.
- The plant table.
- The gate table.

## Files

All paths are under `/home/user/veneer-moff/`.

- **Diff and status.** `tmp/units/moff.diff` (`git diff 877e7c6`) and `tmp/units/moff-status.txt`.
  - Status: ` M src/styles/components/_offcanvas.scss` and ` M tests/src/styles/components/offcanvas.test.ts`.
  - Diffstat: 2 files changed, 212 insertions(+), 53 deletions(-).
- **Logs.**
  - `tmp/units/moff-red.log.txt`
  - `tmp/units/moff-green-1.log.txt`: an intermediate run. After it, I changed the leaving slide's start pin to the identity matrix the browser interpolates.
  - `tmp/units/moff-green-2.log.txt`
  - `tmp/units/moff-stop-styles.log.txt`
  - `tmp/units/moff-stop-conformance.log.txt`
  - `tmp/units/moff-probe-navbar-reset.log.txt`
- **Copies.**
  - `tmp/units/work/_offcanvas.scss.base`: the partial at base.
  - `tmp/units/work/offcanvas.test.ts.keep`: the test file as it stands.
