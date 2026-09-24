**Lane held:** subjective, as `planner` on Opus 5.5. I read only and ran nothing.

**Shape note:** I used the five sections the brief's Output names, as the dispatch asks. The role file's `Units`, `Tensions`, and `Risks` sit inside Recommendation and inside Risks and rulings.

## 1. Options

**A. Bound the document a page frame shoots (recommended).**
- **Change:** the `page` method of the `FrameManager` class (`tests/setupBrowser.ts`) takes out of the layout every other child of the `main` element that holds the subject, for the shot only. It sets `hidden` on those children and removes it again in `finally`.
- **Frame:** the frame shows the page's opening (the heading and the Dark mode control) plus the one section holding the subject.
- **Growth:** a frame's height is the opening plus that one section, however many sections the showcase renders. A new family appends a `SpecimenSection` to `main` (`app/browser/Showcase.ts`, `#mount`), so the rule covers it without an edit.
- **Why it works:**
  - Every section is a direct `main > section` child (`app/browser/sections/SpecimenSection.ts`).
  - `[hidden]` resolves to `display: none !important` in the reset layer (`src/styles/_reset.scss`).
  - The installed `measureContent` function takes a zero box from a node that is not displayed, so `captureFrame` stages a bounded pane.
- **Drives stay untouched.** Every page-frame site drives focus before it calls `page`. Several drives cross sections: `reaches the range slider through the keyboard…` starts its Tab walk in the Form label section, and `floats the empty field label…` starts in the Form control section. Hiding at shot time leaves those walks alone.
- **Focus survives** because the focused element stays in its kept section. The existing post-shot readings prove it, for example `expect(document.activeElement).toBe(control)` in the floating-label case and the `framedFocus` reading in `reveals the skip link…`.
- **Cost:**
  - A page frame shows a document no reader sees, with the other sections missing. The guide must say so.
  - A pointer state can't be a page frame, because hiding the earlier sections moves the subject out from under the pointer.
- **Ruling:** adopt.

**B. Shoot focus and pointer states as element frames of a lifted stage.**
- **Change:** move the live specimen into a padded stage at the document's start and shoot an element frame of the stage. The existing precedents are `list-group-actions-*`, `close-control-hover`, and `captioned-carousel-*`.
- **Growth:** the best bound, the specimen's size.
- **Cost:**
  - Every page-frame site has to be rewritten.
  - Focus must be driven after the move, because moving a focused node blurs it.
  - The cross-section Tab walks named in option A break, because their starting control stays behind in the showcase.
  - The primary-focus ring sweep would read rings in a moved context against the pinned `FOCUS_RING` values.
- **Ruling:** refuse as the general shape. Adopt it at the one site already lifted: `repaints and lifts a page under the pointer and under keyboard focus…` builds a padded `stage` at the document's start and then shoots a page frame of it. Make those two calls `FRAMES.place('page-strip-hover', strip, stage)` and `FRAMES.place('page-strip-focus', strip, stage)`. This keeps the pointer state off page frames.

**C. Make the arrival frame an element frame of the page's opening.**
- **Obstacle:** no single element holds the heading, the control, and the Showcase region. `#header` is a sibling of `#main`, and the region sits inside `#main` (`app/browser/Showcase.ts`).
- **Workarounds and their costs:**
  - Wrap the opening: changes product markup to serve a test.
  - Frame the region alone: drops the heading and the control that the arrival perception names.
  - Lift a copy of the opening: shows a copy outside `main`'s context.
- **Ruling:** refuse. Option A already produces the page's opening for arrival, because the arrival subject is the region itself and no specimen section holds it.

**D. A Test-side reader that decodes an oversized frame.**
- **Cost:**
  - Needs an `@orkestrel/test` release, which isn't available in this batch.
  - Moves the ceiling without bounding growth.
  - Leaves a 1280 × 53410 frame that no reviewer can read, although the portfolio is the review input for rendered claims (`.agents/orchestration.md` § Acceptance laws).
- **Ruling:** refuse as this unit's route. Record it only as a later-release carrier (see section 5).

**E. An area guard at placement (adopted beside option A).**
- **Change:** the `FrameManager` class refuses, before it shoots, any frame whose area in device pixels exceeds a declared `FRAME_AREA` constant. It does this on every run, capture or not, because the class stages and reads each placement on every run.
- **Area:**
  - Element frame: the frame box × `devicePixelRatio`².
  - Page frame: `innerWidth` × max(`measureContent()`, `innerHeight`) × `devicePixelRatio`².
- **Effect:** an ordinary journey run at a 1280 variant reddens at the call site, naming the scenario, before a capture run writes an undecodable file.
- **Ruling:** adopt. Refuse as an error in setup code, not as an assertion case: setup code throws and never asserts (`.claude/rules/tests.md` § Shared test infrastructure), and the refusal names the site that shot the frame.

## 2. Recommendation

Adopt option A for every page frame, option B at the page-strip site only, and option E for every frame.

**Invariant.** A page frame shows the page's opening and the one section holding its subject. No frame is shot above the largest area a written frame has been read back at. A section added to the showcase changes no page frame except those shot inside it.

**Contract (types first, `tests/setupBrowser.ts` and `tests/setup.ts`):**
- The `page(scenario, subject)` signature stays as it is. It gains two refusals, each an `Error` naming the scenario:
  - no child of a `main` element holds the subject;
  - the frame's area exceeds `FRAME_AREA`.
- The `place` method gains the area refusal.
- Order inside `#shoot` for a page frame: take the sections out → `stagePane` → check the area → `readRegion` → `portfolio.place` → `releasePane` → restore the sections. Only the `hidden` attributes this call set are removed. A refused placement records no scenario and no placement.
- New constant in `tests/setup.ts`: `FRAME_AREA = 1280 * 41954`. That is the batch-1 `showcase--dark-1280.png` frame, which read back at 204.9 MiB decoded.

**Owned files:**
- `tests/setupBrowser.ts`
- `tests/setup.ts`
- `tests/setupBrowser.test.ts`
- `tests/setup.test.ts` (its export-list case goes false when `FRAME_AREA` is added)
- `tests/app/browser/integration.test.ts`
- `guides/veneer.md`

**Off-limits:** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `src/**`, `app/**`, and `node_modules/**`.

**Sentences the change makes false, with a replacement for each:**

- **`FrameManager.page` TSDoc** (`tests/setupBrowser.ts`), "the region points a reader of an 8000-pixel frame at that part". Replace with: "A page frame shows the page's opening and the one section holding the subject. Every other child of the `main` element holding the subject is taken out of the layout for the shot and put back before this returns, on the refusing path as well. The subject names the part of that frame the scenario claims. A page frame carries a focus state and never a pointer state: taking the earlier sections out of the layout moves the subject out from under a pointer that does not move with it."
  - Update `@throws` on the `page` and `place` methods, and add one sentence on the area refusal to the class remarks.
- **`FRAME_AREA` TSDoc** (new): "Holds the largest frame area, in device pixels, that a written frame has been read back at: the batch-1 capture run's 1280 × 41954 `showcase--dark-1280.png` frame, 204.9 MiB decoded. The batch-2 run's 1280 × 53410 frame, 260.8 MiB decoded, is refused by the browser's image decoder, so the decode ceiling lies between the two and is unmeasured. A frame is refused above this area because nothing larger has been read back."
- **`SHOWCASE_KEYS` TSDoc** (`tests/setup.ts`), "as a frame of the whole page" and "one shot of the resting document…". Replace with: "Lists the scenarios a journey photographs as a page frame of the page's opening. The arrival subject is the Showcase region, which no specimen section holds, so the frame carries the heading, the mode control, and the region alone. A second resting page frame of one subject is one image whatever scenario name it carries."
- **`CASCADE_KEYS` remarks** (`tests/setup.ts`), "A **page frame** covers the whole document… would duplicate the arrival frame". Replace with: "A **page frame** carries the page's opening and the whole section holding its subject, so a cascade scenario shot that way would show every specimen of that section rather than the key it names, and keys sharing a section would be one image under several names."
- **Integration comments** (`tests/app/browser/integration.test.ts`) that state a whole, tall, or 8000-pixel page frame:
  - the ring sweep in `paints a focus ring on every variant…`;
  - `drives a delegated host to pressed…` ("one document apart in 8000 pixels");
  - the lift comment in `reads every resting cascade key…`;
  - the validation ring case;
  - the range, floating-label, close-control, input-group, accordion, skip-link, and focus-ring-role cases ("a reader of the whole document").
  - Replace each with the section-bounded claim: "the declared region is X, so a reader of the frame is pointed at the part the scenario claims". Rewrite the page-strip header comment for the stage element frame.
- **Guide § Showcase stem table** (`guides/veneer.md`), the `showcase` row. Replace "The page frame, read through the region at rest" with "The page's opening at rest, read through the region".
- **New guide paragraph**, after the element-frame paragraph: "A page frame carries the page's opening, the heading and the mode control, and the one section holding its subject. The showcase's other sections are taken out of the layout for the shot, so a page frame does not grow as sections are added, and a frame larger than any written frame has been read back at is refused before it is shot. A page frame carries a focus state, never a pointer state."
- **Guide sentence** "a Veneer frame is a lift out of the mounted showcase". It is already false for page frames and for the in-place host frames. Replace with: "a Veneer frame is taken inside the mounted showcase: an element frame on a specimen lifted out of it or on a host where it renders, and a page frame on the showcase with every section but its subject's taken out of the layout."

**Bound as sections are added:** the frame is the opening plus the tallest section that holds a page-frame subject, and `FRAME_AREA` is the checked ceiling.

**Units:**

| Unit | Role and engine | Owns | Depends on | Accepts on |
| --- | --- | --- | --- | --- |
| PF-PROBE | `builder` on Sonnet authors a runtime probe under `tmp/probe/`; the Orchestrator runs it as a tracked command | nothing in the tree | none | Reports the height of each `main > section` at 390 and 1280, the tallest page-frame subject's section, and the opening's height. This settles which sections make 1280 taller and confirms that option A's frames sit far under `FRAME_AREA`. |
| PF | `opus` on Opus 5.5, native | the owned files listed earlier | PF-PROBE reading | Section 4 |
| PF-AUDIT | `analyst` on GPT-6 Astra (objective, the engine that did not write PF) and `reviewer` on Opus 5.5 (subjective); plus `checker` on Grok for the stale-sentence sweep | none | PF | Per-claim verdicts on section 3's proofs, each naming its mutation |
| PF-CAPTURE | Orchestrator observation, with `verifier` on Sonnet taking the evidence | none | PF-AUDIT | `CAPTURE=1` at `light-1280` and `dark-1280`; the read-back case goes green |

**Why PF routes to `opus` rather than `sol`:** the `setup:browser` and journey proofs run Vitest → Playwright → Chromium, a grandchild process that a bench sandbox denies (`.agents/orchestration.md` § Bench laws, rule "A bench sandbox spawns a child and denies that child's child"). The unit also carries the TSDoc and guide voice.

## 3. Proofs

- **P1, new, `tests/setupBrowser.test.ts`: a page frame shoots the opening and the subject's section alone.**
  - Setup: mount the showcase. Pick a subject in a deep section, for example `Role links`. Read the full `measureContent()` and the subject's `readRegion` value first.
  - Portfolio: a recording stand-in that implements `PortfolioInterface` minimally. Its `place` records `measureContent()`, the subject's box, and the `hidden` state of every `main` child at call time.
  - Assert:
    - the recorded edge is under the full edge;
    - the subject's section is displayed and every other `main` child is hidden;
    - the recorded region equals the subject's box at call time;
    - after the call, no `main` child carries `hidden` that it did not carry before, and a child pre-marked `hidden` stays hidden.
  - Mutations it must distinguish:
    - no hiding → edge equals full;
    - the subject's own section hidden → subject box is zero;
    - region read before hiding → region differs;
    - restore that clears every `hidden` → the pre-marked child shows;
    - restore outside `finally` → see P2.
- **P2, new: `page` refuses a subject that no `main` child holds.** Use a node from `scene.mount`. It rejects with a message naming the scenario, records no placement, and leaves no child hidden. Mutation: drop the refusal → the call resolves.
- **P3, new: the area refusal.**
  - An element frame whose box is one device-pixel row over `FRAME_AREA` rejects, naming the scenario.
  - The boundary control, an element at exactly `FRAME_AREA`, places.
  - Mutations: an off-by-one on the comparison, and a dropped refusal.
- **P4, changed, `tests/setupBrowser.test.ts` case `records every placed scenario…`.** Its `frames.page('base', subject)` call must still record a placement when the subject sits in a section. `Role links` does.
- **P5, changed, `tests/setup.test.ts` export list:** gains `FRAME_AREA`. Mutation: an unexported constant.
- **P6, existing journey readings serve as focus-survival proofs.** Examples are `document.activeElement` after the floating-label shot and `framedFocus` in the skip-link case. Mutation: hide the subject's own section → the element blurs and the reading reddens.
- **P7, existing journey at `light-1280` and `dark-1280`, capture off.** With option A reverted, the arrival placement spans 1280 × 53410 > `FRAME_AREA` and the E refusal reddens `arrives at the showcase…`. At 390 the revert (390 × 44684) stays under the area, so only the 1280 projects distinguish it. `test:journey` runs all four variants (`configs/app/vite.journey.config.ts`, `package.json` `test`).

## 4. Acceptance criteria

1. The typecheck (`npm run check`) is green over the owned files.
2. `lint:check` and `format:check` are green, scoped to the owned files.
3. `test:setup` is green, including P5.
4. `test:setup:browser` is green. P1, P2, and P3 were each recorded red, with the exact command and its failing count, before the `FrameManager` change, and then recorded green by the same command.
5. `test:guides` is green.
6. A case-insensitive sweep of the owned files for `8000`, `whole document`, `whole page`, `tall page frame`, and `covers the whole` returns only sentences the unit rules true. The unit reports the pattern and the paths.
7. Observation only, not a criterion: the unit reports its own non-capture `test:journey` reading at each variant, and the Orchestrator takes the authoritative run. The capture run at `light-1280` and `dark-1280` is the Orchestrator's observation.

## 5. Risks and rulings

**Rulings for the Orchestrator before dispatch:**
- **Option A vs option B.** I chose A on judgment: it bounds by section and keeps every drive intact. B bounds by specimen and matches the counterpart portfolio's specimen-alone frames. The objective lane may weigh B's rewrite cost differently.
- **Arrival scope.** Option A turns the arrival frame into the opening alone, not the first screen a reader sees, which also shows the start of the Buttons section. A first-screen frame needs a Test-side viewport capture.
- **The `FRAME_AREA` value.** I set it at the measured-good decode area. A tighter bound on height would also keep frames readable for review, but its value is unmeasured and needs a ruling.
- **Stand-in portfolio in P1.** I read it as a sanctioned boundary recorder (`.claude/rules/tests.md`, the scripted boundary stub rule). The fallback without it observes only the region's upward shift, which proves the hiding of earlier sections and not of later ones.
- **Stale guide sentence.** The sentence stating that the declared region is read against "that region's first pixel" is already false, because the read-back uses the frame's floor. It sits in the paragraph PF edits. Either rule it into PF or name another carrier.

**Risks and the evidence that settles each:**
- **In-flight worktrees.** FADE and LEDGER, branched from `42fd88e`, may add page frames of pointer states, subjects outside `main`, or "whole document" comments. Send them the page-frame ruling under the mid-campaign rule (`.agents/orchestration.md` § Dispatch anatomy).
- **One tall section.** A single section that grows past `FRAME_AREA` at 1280 would reach the refusal. PF-PROBE's per-section heights settle this.
- **Element-frame staging height.** Element frames still stage the pane to the full document height inside `captureFrame`. Growth may break that staging independently of decoding. The PF-CAPTURE read-back of the element frames at 1280 settles it.
- **Which sections make 1280 taller** is unsettled by reading. The candidates are the width-proportional boxes in `app/browser/constants.ts`: `CAROUSEL_SPECIMENS` (`img-fluid` at 800 × 400), `OBJECT_FIT_SPECIMENS` (`ratio-1x1`, `ratio-21x9 w-50`), and the other `ratio-4x3` specimens. The lg and xl utility steps add only a few pixels. PF-PROBE settles it.

**Findings with no carrier yet** (the carrier is a later `@orkestrel/test` release unit, not yet chosen):
- The `readFrame` refusal could name the frame's dimensions.
- `captureFrame` could stage to the content height only for a page frame.
- A first-screen page frame needs a viewport capture.

**Files:**
- /home/user/scaffold/.orkestrel/veneer/units/pf-design-brief.md
- /home/user/veneer/tests/setupBrowser.ts
- /home/user/veneer/tests/setup.ts
- /home/user/veneer/tests/setupBrowser.test.ts
- /home/user/veneer/tests/setup.test.ts
- /home/user/veneer/tests/app/browser/integration.test.ts
- /home/user/veneer/guides/veneer.md
- /home/user/veneer/app/browser/Showcase.ts
- /home/user/veneer/src/styles/_reset.scss
- /home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.js