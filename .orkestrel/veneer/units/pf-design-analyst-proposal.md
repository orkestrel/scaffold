1. **Options.**

   The viable local change bounds what the document contains during a page shot. The installed reader still decodes the entire PNG before sampling it. (`node_modules/@orkestrel/test/dist/src/browser/index.js`, `captureFrame`, `readFrame`; `tests/setupBrowser.ts`, `measureVariation`.)

   | Shape | Cost and growth behavior | Ruling |
   |---|---|---|
   | Temporarily remove unrelated showcase sections from layout | Preserves the subject’s live node, ancestors, and surrounding section. Added sections contribute no capture height. Requires restoration, accurate staged coordinates, and proof that focus and pointer paint survive. | **Adopt.** |
   | Shoot focus and pointer states as element frames of lifted copies | Bounds the image by the specimen, but requires replaying keyboard and pointer state on the copy. Copies can duplicate accessible names and control identifiers; focus rings require a padded frame. Resting-copy property comparisons don't prove driven-state equivalence. | **Reject for this unit.** The existing journeys already move live specimens where pointer reach requires it. (`tests/app/browser/integration.test.ts`, cases “repaints and lifts a page under the pointer and under keyboard focus, in both modes” and “marks a copy of the resting checkbox mixed and photographs the mixed glyph”.) |
   | Shoot the arrival as an element frame of the opening | Bounds the arrival independently of later sections, but doesn't repair driven page frames. The `Showcase` region contains the introductory paragraph; the heading and mode control occupy a sibling header, so shooting the region alone omits that opening context. | **Reject as the combined solution.** Retain the header and opening region through the same bounded-page mechanism. (`app/browser/Showcase.ts`, `Showcase.#mount`.) |
   | Move live subjects into padded element frames | Avoids copied interaction state, but changes inherited layout and requires rewriting the focus journeys and their framing claims. | **Retain existing uses only.** Don't expand this mechanism for PAGE-FRAME. (`tests/app/browser/integration.test.ts`, pagination and navigation driven-state cases.) |
   | Add a Test-side oversized-image reader | Could support larger artifacts, but requires a release unavailable in this batch. Changing only `readFrame` leaves `measureVariation` decoding the same oversized image. Unbounded document growth remains. | **Later Test-side carrier only; no dependency for this unit.** (`/home/user/scaffold/.orkestrel/veneer/units/pf-design-brief.md`, standing constraints; installed `readFrame`; local `measureVariation`.) |
   | Lower screenshot height, resize after decoding, or clip the whole document | `captureFrame` treats the requested height as a minimum and expands to content height. Resizing after decoding cannot repair a decode failure. Clipping can exclude the declared subject. | **Reject.** (`node_modules/@orkestrel/test/dist/src/browser/index.js`, `captureFrame`; `tests/setupBrowser.ts`, `measureVariation`.) |

2. **Recommendation.**

   Make `FrameManager.page` capture a temporary document containing the subject’s section and the showcase header. Keep the subject in its live node. Pass the mounted showcase root explicitly so the operation owns a defined subtree rather than searching arbitrary document sections.

   Derive the excluded sections from the rendered direct children of the showcase’s `main`; don't enumerate family names. Keep the section containing the subject. For the arrival, keep the `Showcase` section. For the pagination specimen already moved into its padded stage, retain that stage and take the showcase root out of layout. Preserve existing styles and restore them exactly in `finally`. Don't detach or clone a focused subject. These boundaries follow the actual mounting structure. (`app/browser/Showcase.ts`, `Showcase.#mount`; `app/browser/sections/SpecimenSection.ts`, constructor; `tests/app/browser/integration.test.ts`, pagination case.)

   Resolve geometry before recording the region. Use the installed `stagePane`, `measureContent`, and `releasePane` primitives. At the registered viewport, measure the bounded content, stage its required height, and require that content height to remain stable. Record the subject’s region at that admitted geometry. Reject unstable geometry rather than duplicating Test’s iterative convergence algorithm. The installed capture resets to the variant height before expanding, so the proof must establish that this sequence reaches the admitted geometry. The existing assertion that capture “moves nothing” isn't established by staging only `window.innerHeight`. (`tests/setupBrowser.ts`, `FrameManager.#shoot` and class TSDoc; installed `captureFrame` and `stagePane`.)

   Adopt a proposed admission limit of **64 MiB of decoded RGBA**, with a **16384-device-pixel edge limit**, subject to the Orchestrator’s browser observation before dispatch. Compute admission from device dimensions, including `devicePixelRatio`; these are proposed limits, not measured browser ceilings. Refuse an oversized retained section with the scenario and measured dimensions. Never satisfy admission by clipping, scaling, skipping a scenario, or reducing its declared region.

   The growth invariant is: adding unrelated showcase sections doesn't change an existing page frame’s retained content or admitted dimensions. Growth inside the retained section remains subject to admission. Every registered page scenario must fit and decode before acceptance; refusal is a diagnostic, not completion.

   Own the following files:

   - `tests/setupBrowser.ts`: page staging, restoration, admission, region recording, and their TSDoc.
   - `tests/setupBrowser.test.ts`: browser proofs and the export-membership assertion.
   - `tests/setup.ts`: capture limits and revised registry documentation.
   - `tests/setup.test.ts`: affected setup-export membership and registry proofs.
   - `tests/app/browser/integration.test.ts`: explicit showcase scope at page placements, state assertions, containment checks, and corrected comments.
   - `guides/veneer.md`: bounded page-frame coverage and limits.

   Replace the claims this shape makes false:

   - `tests/setup.ts`, `SHOWCASE_KEYS`: “a frame of the whole page” becomes a frame of the opening with unrelated sections temporarily excluded.
   - `tests/setup.ts`, `CASCADE_KEYS` remarks adjacent to `CascadeKey`: “A page frame covers the whole document” must distinguish the unbounded historical mechanism from bounded page frames. Preserve the dated blank-element measurement; it doesn't prove that element capture still fails after section isolation.
   - `tests/setupBrowser.ts`, `FrameManager.page`: replace the scrolled-document and “8000-pixel frame” explanation with retained-section coverage, admission, and restoration.
   - `tests/setupBrowser.ts`, `FrameManager` remarks: describe how capture geometry is admitted and verified.
   - `tests/app/browser/integration.test.ts`, Primary focus, resting cascade, and Skip link comments: remove whole-document coverage claims.
   - `guides/veneer.md`, Showcase stem table: replace “The page frame, read through the region at rest” with “The opening page frame, retaining the header and Showcase region.” State that driven page frames retain their subject’s section or existing padded stage.

3. **Proofs.**

   Add or strengthen these behavioral proofs, using real DOM, the installed portfolio, and real screenshots.

   | Proof | Mutation it must distinguish |
   |---|---|
   | **Unrelated growth doesn't enlarge a page frame.** Capture a subject with tall sections before and after it, then append another tall section. Compare decoded dimensions and the recorded region. Cover arrival, an in-section subject, and the externally staged pagination subject. (`tests/setupBrowser.test.ts`, proposed page-framing cases.) | Remove exclusion; exclude only following sections; hard-code known family names; mishandle a subject outside the showcase root. |
   | **The declared region belongs wholly to the written image.** Assert finite, positive dimensions and complete containment, then read the region’s pixels. Include scroll offsets and fractional coordinates. (`tests/app/browser/integration.test.ts`, “reads every frame this variant left in the portfolio directory inside its declared region”; `tests/setupBrowser.test.ts`, region proofs.) | Record coordinates before exclusion, omit scroll or device scaling, or accept a partially clipped region. `measureVariation` deliberately clips, so positive variation alone cannot establish containment. |
   | **Capture-enabled and capture-disabled placements record equivalent geometry.** Use the same real layout and variant with enabled and disabled portfolios. (`tests/setupBrowser.test.ts`, existing disabled-portfolio case.) | Apply exclusion or final geometry staging only when a file is written. |
   | **Admission rejects oversized or height-dependent content before writing.** Exercise the limit boundary and a real viewport-height-dependent layout. (`tests/setupBrowser.test.ts`, proposed admission cases.) | Omit admission, ignore device scaling, admit the wrong boundary, or record geometry before it stabilizes. |
   | **Focus and pointer paint survive the actual shot.** Retain existing journey state readings and add controlled screenshot-pixel evidence for an outside-border focus ring and hovered fill. Include pagination’s neighboring pages and padded stage. (`tests/app/browser/integration.test.ts`, Primary focus, pagination, and Skip link cases; `tests/setupBrowser.test.ts`, proposed framing fixtures.) | Capture after blur or pointer displacement, crop the ring, or restore the layout before taking the screenshot. A state restored after capture must not make this proof pass. |
   | **Restoration runs on success and refusal.** Compare section styles, node identity, viewport, scroll, and focus after placement. Trigger refusal through a real enabled portfolio’s unregistered scenario and through admission failure. (`tests/setupBrowser.test.ts`, proposed restoration cases.) | Remove `finally`, overwrite prior styles, restore only after successful placement, or leave the pane staged. |
   | **The portfolio remains complete and readable.** Preserve registry expansion and placement equality; read every present frame through `readFrame` and `measureVariation`. Add page-frame admission and full-region containment assertions. (`tests/app/browser/integration.test.ts`, portfolio cases.) | Skip an oversized scenario, catch and discard a decode error, bypass either reader, or narrow discovery to files that happen to decode. |

4. **Acceptance criteria.**

   Apply the criteria in this order:

   - Confirm ownership and documentation changes. Leave `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` untouched.
   - Pass formatting, lint, and the applicable TypeScript checks for the owned files. Preserve registry stems and subjects.
   - Run the scoped setup proofs, including the mutation controls. Record the named regression failing before repair and passing afterward. Browser execution denied by the bench remains an observation with the exact command, not a substitute source-based pass.
   - Pass setup-export membership and guide parity. (`tests/setup.test.ts`, export case; `tests/setupBrowser.test.ts`, export case; `package.json`, `test:guides`.)
   - Establish the structural growth invariant, admission, geometry equivalence, containment, state preservation, and restoration. Require every registered page subject to fit the approved limits.

   The Orchestrator separately observes fresh captures after the unit exits:

   ```text
   CAPTURE=1 npm run test:journey -- --project journey:light-1280
   CAPTURE=1 npm run test:journey -- --project journey:dark-1280
   CAPTURE=1 npm run test:journey -- --project journey:light-390
   CAPTURE=1 npm run test:journey -- --project journey:dark-390
   ```

   These commands use the registered project names. Record dimensions, complete regions, reader results, and representative focus and pointer captures. Run ordinary readback against that same fresh portfolio, then the authoritative gate chain. The wide capture runs are Orchestrator observations, not unit criteria. (`configs/app/vite.journey.config.ts`, `VARIANTS`; `vite.config.ts`, `appJourney`; `package.json`, scripts.)

5. **Risks and rulings.**

   - **Approve the coverage change.** Bounded page frames document local live state, and the arrival documents the opening. They cease to be whole-showcase panoramas. This ruling must precede dispatch because the guide and TSDoc change with it. (`tests/setup.ts`, `SHOWCASE_KEYS` and `CASCADE_KEYS`; `guides/veneer.md`, Showcase stem table.)
   - **Approve the admission limits after a host probe.** Measure retained sections at every registered variant and drive the largest admitted captures through the actual readers. The exact decode ceiling isn't needed for the recommended mechanism. If the Orchestrator needs it, vary independently encoded PNG dimensions in the same browser, include a known decodable control, and exercise decoding and canvas readback separately. Don't infer a universal ceiling from the supplied interval. (`installed readFrame`; local `measureVariation`; brief, “The measurement”.)
   - **Resolve capture-geometry and pointer stability before dispatch.** The installed capture performs its own viewport staging. A locally bounded layout must remain stable through that sequence, and pagination hover must remain painted during the screenshot. Source reading doesn't settle those browser outcomes. (`installed captureFrame`; pagination journey case.)
   - **Keep measurement provenance explicit.** Header reads during this lane found `showcase--dark-1280.png` at `1280 × 53410` and `showcase--light-390.png` at `390 × 57705`. Those files no longer match the brief’s earlier measurements. Their PNG `IHDR` dimensions establish image size, not decode success. Use fresh captures for acceptance. (`tmp/capture/states/`, named files, `IHDR`.)
   - **The responsive-height question remains unmeasured.** Source candidates include responsive spacing at `lg` and `xl`, responsive gutters and gaps, and width-dependent ratio and image specimens. Responsive offcanvas and modal specimens sit inside the shell’s bounded `.viewport`, so their breakpoint changes alone don't establish increased document height. Measure section edges at the registered widths before attributing the difference. (`app/browser/constants.ts`, `SPACING_SPECIMENS`, `LAYOUT_SPECIMENS`, `MEDIA_SPECIMENS`, `FLEX_SPECIMENS`, `OBJECT_FIT_SPECIMENS`, `OFFCANVAS_SPECIMENS`, and `MODAL_SPECIMENS`; `src/styles/components/_ratio.scss`, `.ratio::before`; `app/browser/styles/_shell.scss`, `.viewport`.)
   - **Assign a successor only if the retained subject itself exceeds admission.** Such a result requires a framing decision for that subject. Raising the limit, clipping the subject, or omitting its frame doesn't close PAGE-FRAME. The proposed browser behavior remains unverified in this read-only lane.