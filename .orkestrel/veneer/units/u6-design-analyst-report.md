Question: Which U6 additions can expose hover, held pointer activation, pseudo-element styles, and restorable media emulation through Test’s existing journey contract?

Proposal

1. **Names and signatures**

```ts
// Reuse TeardownHandler from @src/core:
// () => void | Promise<void>

// src/browser/types.ts
export interface MediaOptions {
	readonly reduced?: boolean
	readonly print?: boolean
}

// src/browser/helpers.ts
export function hoverAccessible(name: string): Promise<TeardownHandler>
export function hoverAccessible(
	role: string,
	name: string,
): Promise<TeardownHandler>

export function holdAccessible(name: string): Promise<TeardownHandler>
export function holdAccessible(
	role: string,
	name: string,
): Promise<TeardownHandler>

export function readStyle(element: Element, property: string): string
export function readStyle(
	element: Element,
	property: string,
	pseudo: string,
): string

export function emulateMedia(options: MediaOptions): Promise<TeardownHandler>
```

`hoverAccessible` returns an unhover operation; `holdAccessible` returns a pointer release; `emulateMedia` returns restoration. Each returned handler must tolerate repeated calls after successful cleanup.

Place the pointer verbs after `clickAccessibleWithin`, keeping the click family together. Keep the `readStyle` overload at its existing location. Place `emulateMedia` beside the browser environment helpers, immediately before `waitForFrame`.

The pointer names extend `clickAccessible`’s vocabulary and resolution boundary. `holdAccessible` distinguishes a sustained pointer press from `pressKeys`. The pseudo argument selects the subject of the same CSSOM reading, so another reader name adds no capability. Media fields are independent booleans: omitted means no override, `reduced: false` means `no-preference`, and `print: false` means `screen`.

Reuse `TeardownHandler`; do not invent another cleanup type or lifecycle object. Put new refusal templates in a frozen `BROWSER_REFUSALS` constant. Existing barrel star exports already publish helpers, types, and constants. These placements follow the brief’s fixed decision and the [naming rules](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md), [existing signatures](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:376), [reader](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:2158), and [barrel](C:/Users/mikes/WebstormProjects/test/src/browser/index.ts).

The proposed names `hoverAccessible`, `holdAccessible`, `emulateMedia`, `MediaOptions`, and `BROWSER_REFUSALS` have no occurrence in the specified [hosted guides](C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides). Their Surface rows already assign `readStyle` and `TeardownHandler` to Test.

2. **Mechanism**

**Hover.** Resolve with `resolveRendered`, then call `userEvent.hover(target)`. Verify `target.matches(':hover')` before returning. Return cleanup through `userEvent.unhover(target)`. Keep resolver errors outside the provider-error translation so absence, gating, and ambiguity retain their existing sentences. Resolution and the postcondition make this more than a renamed primitive. [Resolver](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:287); [U5 hover instrument](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u5-probe.test.ts:28).

**Hold.** Resolve through `resolveAccessible`, which incorporates the same resolver and scrolls wholly offscreen controls. Measure immediately before dispatch. Require the centre hit to belong to the target, using `readHit`; refuse a covered or clipped centre rather than pressing another element.

Use the U5 mapping, recalculated for every hold:

```text
local.x = target.left + target.width / 2
local.y = target.top  + target.height / 2
scale   = frame.width / window.innerWidth
x       = frame.left + local.x * scale
y       = frame.top  + local.y * scale
```

At a genuine top-level window use scale `1` and origin `(0, 0)`. If embedded but `frameElement` is inaccessible, refuse; a null frame reference must not silently imply top-level coordinates.

Send `mouseMoved`, then `mousePressed` with `button: 'left'`, `buttons: 1`, and `clickCount: 1`. Await `waitForFrame` and require `target.matches(':active')`. Return cleanup sending `mouseReleased` with `buttons: 0` at the stored point, without resolving the name again. A removed or renamed target must not prevent releasing the physical button.

Once the press command is attempted, every subsequent setup failure must attempt release before rejecting. Normal release can produce a click; document that observable effect. Do not suppress it by secretly moving the pointer elsewhere. [U5 press and release](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u5-probe.test.ts:47); [centre-reading limits](C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts:167).

**Pseudo style.** Pass the pseudo argument to `getComputedStyle(element, pseudo)`, then preserve the existing property lookup and trimming. Require a pseudo spelling beginning with `::` and supported by `CSS.supports('selector(...)')`; translate CSSOM rejection or an unavailable declaration into the pseudo refusal. A supported declaration with an absent property still returns `''`. Neither `content: none` nor an empty property alone proves unsupported syntax.

This remains an element reader. Applying the brief’s role-and-name requirement to it would contradict its explicit `readStyle` extension and the layer’s [reader/verb distinction](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:107). U5 proves the positive readings for `::after`, `::backdrop`, and `::details-content`; it does not prove the proposed unsupported-pseudo detector. [Instrument](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u5-probe.test.ts:93).

**Media.** Acquire `cdp()` and send a complete `Emulation.setEmulatedMedia` payload on each application:

- `reduced: true` → feature value `reduce`; `false` → `no-preference`; omitted → no feature override.
- `print: true` → `media: 'print'`; `false` → `'screen'`; omitted → `''`.

Await `waitForFrame`. Restoration sends exactly `{ media: '', features: [] }` and awaits a frame. A failed application must attempt this reset before rejecting, because command rejection does not establish that nothing changed. [U5 media instrument](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u5-probe.test.ts:122).

Use the existing cleanup ownership pattern in Test’s proofs and Veneer’s Button consumer:

```ts
const teardown = createTeardown()
afterEach(() => teardown.destroy())

// Register before any assertion can fail.
teardown.add(await emulateMedia({ reduced: true }))

const release = await holdAccessible('button', 'Save')
teardown.add(release)
// Read held paint here.
await release()
```

The helper owns failure during acquisition; the registered teardown owns later assertion failure. Preserve an original failure when cleanup succeeds; report original and cleanup failures together when cleanup also fails. Never swallow restoration failure.

This follows the installed [teardown contract](C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides/test.md:1247), which deliberately leaves Vitest hook registration to consumers.

Rule on the restoration fork: U6 restores **provider defaults**, as U5 measured. It does not restore an arbitrary pre-existing CDP override. Require non-overlapping media scopes and pointer holds; complete early cleanup before starting another.

3. **Voices**

Keep the resolver’s existing messages verbatim:

| Condition | Exact sentence |
|---|---|
| Absent control | `No interactive element has the accessible name "<name>"` |
| Present but gated | `Interactive target "<name>" is not visible and focus-reachable` |
| Ambiguous | `Interactive target "<name>" is ambiguous across <n> elements` |
| Still wholly offscreen | `Interactive target "<name>" is unreachable after scrolling` |

Add these templates to `BROWSER_REFUSALS`:

| Condition | Exact sentence |
|---|---|
| Hover rejected or never established | `Interactive target "<name>" is not hoverable` |
| Unhover fails | `Interactive target "<name>" could not be unhovered` |
| Centre blocked, press rejected, or active state absent | `Interactive target "<name>" is not pressable` |
| Pointer release fails | `Pointer held on "<name>" could not be released` |
| Tester coordinates cannot be established | `Tester pane is unavailable for a pointer hold` |
| Pseudo unsupported or CSSOM declaration unavailable | `Computed style for pseudo-element "<pseudo>" is unavailable` |
| CDP media acquisition/application fails | `Media emulation is unavailable through this browser provider` |
| Media reset fails | `Media emulation could not be restored` |

Use one-word constant members such as `hover`, `unhover`, `hold`, `release`, `pane`, `pseudo`, `media`, and `restore`. Preserve the provider exception as `cause`. These sentences follow the subject-first refusal family in [Voices](C:/Users/mikes/WebstormProjects/test/guides/test.md:989); they must not imply that a provider failure proves a disabled control.

4. **Proofs**

Put behavioral cases beside their siblings in `tests/src/browser/helpers.test.ts`, collected by `src:browser`. Use the existing fixture/style infrastructure and real event recorders. Each proposed mutation must produce a behavioral red with collection intact; none was run in this lane. This follows [test law](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md) and the skill’s assertion-mutation requirement.

| Addition | Fixture and positive reading | Negative control that must go red |
|---|---|---|
| Hover | `<button class="u6-hover">Hover me</button>` with `padding:16px` and `:hover { padding:32px }`. Assert `16px → 32px → 16px`, `:hover`, and no click. | Omit the provider hover: the during reading must remain `16px`. Omit unhover: the post-cleanup reading must remain hovered. |
| Hold | `<button class="u6-active">Press me</button>` with `16px` base padding and `32px` under `:active`. Record trusted pointer/mouse down and up events. Assert active during the hold and cleared after release. | At an actually scaled tester size, remove the scale factor: the target must fail to become active. Omit release: the post-cleanup assertion must fail. |
| Pseudo | A named button with `::after { content:""; padding-top:7px }`; a shown modal dialog with backdrop color `rgb(1,2,3)`; open details with `::details-content { padding-top:9px }`. Give originating elements different values. | Drop the pseudo argument: each asserted pseudo value must differ. Supply `::u6-unsupported`: require the exact refusal. Keep a supported-pseudo missing-property case returning `''`. |
| Media | `<button class="u6-media">Save</button>` with padding `1px`, reduced-motion rule `2px`, and later print rule `3px`. Assert the relevant `matchMedia` result beside each style reading and the original baseline after cleanup. | Omit the application: changed-state readings fail. Omit reset: restoration readings fail. Exercise reduced and print together so resetting only one axis also fails. |

For pointer verbs, additionally prove bare-name ambiguity and role disambiguation using the existing `Drafts` tab/tabpanel fixture. Prove exact absence and gated voices; use a covering element and `pointer-events:none` on the target to exercise delivery failures without replacing browser APIs.

For hold and media, deliberately throw a sentinel after registration, execute the same teardown path, and assert restored browser state outside the failing scope. Add an unrelated cleanup that throws: restoration must still run. Explicit cleanup followed by teardown must cause no second release or stale reset.

The existing proof patterns are [click and role disambiguation](C:/Users/mikes/WebstormProjects/test/tests/src/browser/helpers.test.ts:742), [keyboard refusal](C:/Users/mikes/WebstormProjects/test/tests/src/browser/helpers.test.ts:924), [animation controls](C:/Users/mikes/WebstormProjects/test/tests/src/browser/helpers.test.ts:1611), and [style readings and acknowledged limits](C:/Users/mikes/WebstormProjects/test/tests/src/browser/helpers.test.ts:2947).

Veneer’s Button unit imports these exports, registers returned cleanup immediately, and reads its actual hover/active/pseudo/media paint after `waitForAnimations`. The numeric fixture values above prove Test’s instruments; they are not proposed Button design values.

5. **Guide rows**

Add or replace these Browser Surface rows, using the full overload signatures from part 1:

| API | Surface summary |
|---|---|
| `hoverAccessible` | Hovers one resolved control and returns its cleanup. |
| `holdAccessible` | Holds the primary pointer button on one resolved control and returns its release. |
| `readStyle` | Reads one resolved CSS property from an element or a named pseudo-element. |
| `emulateMedia` | Applies browser media overrides and returns restoration to provider defaults. |
| `MediaOptions` | Configures reduced-motion and print overrides. Shape: `{ reduced?, print? }`. |
| `BROWSER_REFUSALS` | Names the refusal templates for pointer actions, pseudo-element readings, and media emulation. |

Add the exact voices from part 3 and a cleanup example transcribed into the browser proof file. The existing Surface explicitly distinguishes journey actions from element readers; preserve that distinction. [Surface](C:/Users/mikes/WebstormProjects/test/guides/test.md:221).

No existing candidate row specifically rules on these additions. Add these **Ships** rulings to [Limits](C:/Users/mikes/WebstormProjects/test/guides/test.md:1481):

- **Accessible hover:** “Ships as `hoverAccessible`. Exact role/name resolution, reachability refusal, and returned cleanup add the journey boundary to the installed hover primitive.”
- **Held pointer activation:** “Ships as `holdAccessible`. It composes accessible resolution, tester-coordinate translation, trusted press, and release; Veneer’s Button consumes the held state.”
- **Pseudo-element styles:** “Ships as an overload of `readStyle`. The pseudo names another subject of the same CSSOM reading; a separate reader would duplicate that operation.”
- **Media emulation:** “Ships as `emulateMedia`. It adds a bounded options contract and failure cleanup to the CDP operation, and returns restoration for the suite’s teardown.”

Document inherited focus-reachability restrictions, centre-only press targeting, release-generated click, serial scope ownership, provider-default restoration, and CDP availability as bounds.

6. **Risks**

| Risk | Smallest settling instrument |
|---|---|
| Different project sizes change iframe fitting | Run the held-padding case at the default viewport and a substantially different `page.viewport` size; record actual frame bounds, scale, event target, and active state. Never pin `0.379` or `0.366`. |
| Frame borders, nonuniform transforms, nesting, or inaccessible ancestors invalidate U5’s mapping | Measure the actual tester arrangement. Support the measured single, accessible, uniformly scaled frame; refuse unsupported geometry rather than silently treating it as top-level. |
| Edge or another headless launch differs | Run the same public-helper cases on the configured Chromium and Edge launches, recording engine identity. U5 measured mechanisms in Veneer, not the proposed implementation in Test. |
| A pointer callback removes or replaces its target | Remove the button from a real `pointerdown` listener, then release and press a fresh button. Confirm no held-button state leaks. |
| Hover cleanup meets a removed target | Remove the hovered button before cleanup and read the pointer state on a fresh fixture. Do not assume the provider’s unhover accepts a detached node. |
| Pseudo syntax support differs from CSSOM exposure | Compare supported-but-ungenerated, unsupported, and generated pseudo cases using native CSSOM readings beside the helper. |
| Provider cannot obtain CDP or disconnects during cleanup | Exercise an actually unavailable provider/session on the host. Do not replace `cdp()` with a fake and call that integration proof. A dead connection cannot guarantee restoration; surface cleanup failure. |

These are extensions beyond the recorded [U5 readings](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/instruments.md), not reasons to reopen the mechanisms U5 already established.

Unknowns

- The specified [Vitest declaration](C:/Users/mikes/WebstormProjects/test/node_modules/vitest/dist/browser.d.ts) contains an empty `CDPSession`; the specified [browser index declaration](C:/Users/mikes/WebstormProjects/test/node_modules/@vitest/browser/dist/index.d.ts) does not declare `userEvent`, `page`, or `cdp`. Their effective declarations and provider augmentation must be inspected and typechecked by U6 before implementation claims are accepted.
- The unsupported-pseudo detector, removed-target cleanup, altered tester geometry, and provider-failure paths remain unmeasured.
- Restoration is guaranteed through the specified cleanup path while the provider remains usable. It cannot guarantee recovery from browser termination or restore unrelated pre-existing emulation.

Journal

Session id unavailable in the supplied context. The bridge driver must attach the id from its journal; this lane cannot truthfully substitute `native`.

Deviation

No files written, tests or probes run, or agents spawned. Additional scaffold rule-map files were read for the governing TypeScript, placement, and evidence requirements. The declaration-path mismatch and unavailable journal id are reported above rather than inferred.