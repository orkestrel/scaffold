# U6-design report, subjective lane (planner, native Opus 5, 2026-09-20, 733 s)

# Question

What are the names, signatures, refusal voices, placements, and proofs of the additions to `@orkestrel/test/browser` — a hover verb, a pointer hold and its release, a pseudo-element form of `readStyle`, and a media-emulation pair — such that U6 lands them in one unit in the Test checkout and Veneer's Button unit consumes them?

# Proposal

## 1. Names and signatures

The additions are `hoverAccessible`, `sendProtocol`, `holdAccessible`, `releasePointer`, `stageMedia`, `releaseMedia`, one new type `MediaOptions`, one new constant `POINTER_HOLD`, and a third parameter on `readStyle` and on `readPixels`.

```ts
// src/browser/types.ts, after StateOptions
export interface MediaOptions {
	/** Determines whether the tester lays out for print. Omit it to leave the medium alone. */
	readonly print?: boolean
	/** Determines whether the tester prefers motion. Omit it to leave the preference alone. */
	readonly motion?: boolean
}

// src/browser/constants.ts, after IMPLICIT_ROLES (the file is alphabetical)
export const POINTER_HOLD = 'data-pointer-hold'

// src/browser/helpers.ts
export async function sendProtocol(method: string, params: Readonly<Record<string, unknown>>): Promise<void>
export async function hoverAccessible(name: string): Promise<void>
export async function hoverAccessible(role: string, name: string): Promise<void>
export async function holdAccessible(name: string): Promise<void>
export async function holdAccessible(role: string, name: string): Promise<void>
export async function releasePointer(): Promise<void>
export async function stageMedia(options: MediaOptions): Promise<void>
export async function releaseMedia(): Promise<void>
export function readStyle(element: Element, property: string, pseudo?: string): string
export function readPixels(element: Element, property: string, pseudo?: string): number
```

**Placement in `helpers.ts`.** `sendProtocol` immediately after `clickDisclosure` (ends `:474`); `hoverAccessible`, `holdAccessible`, `releasePointer` follow it, before `typeAccessible` (`:492`); `stageMedia` and `releaseMedia` after `releasePane` (`:2394`) and before `captureFrame`; `readStyle` (`:2158`) and `readPixels` (`:2234`) stay.

**Why each name follows the layer's vocabulary.** `hoverAccessible` takes the `{verb}Accessible` form of `clickAccessible`, `typeAccessible`, `fillAccessible`, `traverseAccessible`. `holdAccessible` rather than `pressAccessible`, because `pressKeys` owns `press` for a completed keystroke; `hold` names the state the verb leaves the control in. `releasePointer` rather than `releaseAccessible`, because a release resolves nothing; `releasePane` fixes `release{Noun}` as the layer's undo verb. `stageMedia`/`releaseMedia` rather than `emulateMedia`, because `stagePane`/`releasePane` already give the layer a verb pair meaning "put the tester's environment into a declared state, then hand it back". `sendProtocol` rather than `sendCommand` (the guide spends `command` on the runner's `readFile`). `MediaOptions` is `{Entity}Options`; `print` and `motion` are one-word permission switches like `StorageOptions.reads`/`writes`; absence means "leave that axis alone". `POINTER_HOLD` mirrors `CAPTURE_PANE`: a marker attribute carrying the value its release reads back.

**Why the pseudo-element read is a parameter on `readStyle`.** `getComputedStyle(element, pseudo)` is the same operation with a different datum (`names.md` § Split instead of compounding); a `readPseudo` export would be a wrapper adding nothing and would fork the trim contract; `readToken`, `readRootToken`, `readPixels` route through the one reader. `readPixels` takes the parameter too so a consumer measuring a pseudo-element's length does not hand-roll `Number.parseFloat`.

## 2. Mechanism

**`sendProtocol` is the one provider boundary.** `vitest/dist/browser.d.ts:44` declares `interface CDPSession {}` and `@vitest/browser/context.d.ts:942` declares `cdp: () => CDPSession`, so the session type carries no `send`. The call goes through `readProperty` and `invokeUnchecked` (`guides/test.md:1514`); the response is dropped, the return is `Promise<void>`. `@orkestrel/browser`'s `CDPClient` was checked and refused (it needs a socket transport no tester document has, and every `CDP*` bare name belongs to that package).

**`hoverAccessible`** is `await userEvent.hover(resolveRendered(first, second))`; `userEvent` exposes `hover`/`unhover` and no pointer-down member, which is why the hold cannot use it.

**`holdAccessible`** resolves, refuses a double hold (`Pointer is already held at <x>x<y>`), computes the scaled point (`scale = frame.width / innerWidth`, or `1` at top level; `x = frame.left + centre.x * scale`), sends `mouseMoved` then `mousePressed` (`button: 'left'`, `buttons: 1`, `clickCount: 1`), parks `POINTER_HOLD`, waits a frame, reads `target.matches(':active')` back and, when false, releases then refuses `Interactive target "<name>" did not enter the pressed state`. The verb verifies what it computes and trusts what the provider computes, so the hover verb carries no such check.

**`releasePointer`** reads and removes the marker, sends `mouseReleased` at the recorded point when present, sends an unconditional `mouseMoved` to the origin (which also un-hovers), waits a frame; idle release changes nothing and throws nothing, so `afterEach(releasePointer)` is safe.

**`readStyle`** guards `pseudo`: `startsWith('::')` (`Pseudo-element "<pseudo>" must start with "::"`), then `CSS.supports(\`selector(${pseudo})\`)` (`Pseudo-element "<pseudo>" is not one this engine exposes`); then `getComputedStyle(element, pseudo).getPropertyValue(property).trim()`. Both guards close the same false green: an unparsed pseudo-element or a pseudo-class returns the element's own style.

**`stageMedia`** builds `features` (`motion: false` → `reduce`, `true` → `no-preference`) and `media` (`print: true` → `print`, `false` → `screen`), refuses `{}` (`Media emulation was staged with nothing to emulate`), sends `Emulation.setEmulatedMedia`, waits a frame, verifies each staged axis through `matchMedia` (not `screen`), releasing before refusing `Media emulation did not reach the tester: <query>`. **`releaseMedia`** sends `{ media: '', features: [] }` and waits a frame; safe on an unstaged tester.

## 3. Voices

New rows for § Voices: `Browser provider exposes no DevTools session` (`sendProtocol`); `Pointer is already held at <x>x<y>` and `Interactive target "<name>" did not enter the pressed state` (`holdAccessible`); `Pseudo-element "<pseudo>" must start with "::"` and `Pseudo-element "<pseudo>" is not one this engine exposes` (`readStyle`); `Media emulation was staged with nothing to emulate` and `Media emulation did not reach the tester: <query>` (`stageMedia`). The resolver's absent, gated, ambiguous, and unreachable sentences stand unchanged; no separate "not hoverable" voice, because the platform exposes no hoverability fact apart from reachability.

## 4. Proofs

All in `tests/src/browser/helpers.test.ts` with `buildFixture`, `buildStylesheet`, `afterEach(resetFixtures)`, plus `afterEach(releasePointer)` and `afterEach(releaseMedia)`; fixture classes prefixed `journey-`.

- **Hover:** two `journey-hover` buttons (`padding-top` 16 → 32 under `:hover`); the named one reads 32 while the twin stays 16 (the negative control); release reads 16; `hoverAccessible('Nowhere')` rejects with the absent voice.
- **Hold and release:** `journey-active` button 16 → 32 under `:active`, `document.activeElement` the button, 16 after release. Negative control: the suite presses at the **unscaled** point through `sendProtocol` and reads 16. Further cases: a covered control (`journey-cover` over it) rejects with `did not enter the pressed state` and leaves no marker; a double hold rejects with `Pointer is already held at`; an idle release resolves; a second viewport `page.viewport(390, 844)` holds and reads 32.
- **Pseudo:** `.journey-marked::after { padding-top: 7px }` reads `'7px'`/`7` with the pseudo and `'0px'` without (the essential control); `::backdrop` `rgb(1, 2, 3)` on a modal dialog; `::details-content` `9px` on an open details; refusals for `:hover` and `::journey-absent`.
- **Media:** `.journey-media` 1px base, 2px under reduced motion, 3px under print; `{ motion: true }` pins the base (host-independent), `{ motion: false }` reads 2 with `matchMedia` true, `{ print: true }` reads 3, `releaseMedia()` reads neither 2 nor 3 with `matchMedia('print')` false (the restore control); `stageMedia({})` rejects.
- Transcribed cases for each new Patterns fence.

## 5. Guide rows

Surface rows for `MediaOptions`, `POINTER_HOLD`, `sendProtocol`, `hoverAccessible`, `holdAccessible`, `releasePointer`, `stageMedia`, `releaseMedia`; the `readStyle` and `readPixels` signature cells gain `pseudo?: string`. Limits candidate rows: a hover verb (Ships), a pointer hold (Ships), a pseudo-element style read (Ships as a third argument), a medium emulation (Ships), a DevTools command door (Ships), a general media-feature map (Refused), a scoped hold taking a callback (Refused). Bounds bullets: the hold maps through the tester iframe's painted scale and reads `:active` back; `releasePointer` parks the pointer at the top-level origin; `stageMedia` restores the host's own preference, so pin the base; `readStyle` refuses a pseudo argument rather than ignoring it; `sendProtocol` reaches a Chromium-family provider alone. Patterns: "Hold a control and read the pressed paint", "Read a pseudo-element's paint", "Emulate reduced motion and print".

## 6. Risks

The iframe scale on another project size, Edge, headless (the second-viewport case; the `:active` verification makes a wrong mapping a red test); a device scale factor other than 1; `Emulation.setEmulatedMedia` is page-scoped (a two-file leak instrument); `matchMedia('print')` following emulation (unmeasured); `CSS.supports` on a bare pseudo-element (measured for `::details-content` only); a control inside a shadow root; a stale tarball in Veneer; the skill vocabulary (`references/layer.md`, `styles.md`) going stale — a separate writer in the scaffold checkout.

# Unknowns

`matchMedia('print')` under emulation; `CSS.supports` for `::before`/`::after`/`::backdrop`; whether the Test browser project runs several files against one page; whether `.agents/skills/**` is vendored under `dist/host`; which pseudo-elements and media Button reads; `document.activeElement` after a protocol press on every engine.

# Journal

native

# Deviation

None stopped the work; the brief's output shape replaces the role's default section list, and the units belong to the Orchestrator's reconciliation. The judgment calls the other lane is meant to challenge are named inline.
