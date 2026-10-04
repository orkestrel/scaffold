The following cases change for the header. No case is deleted.

`tests/app/browser/Showcase.test.ts`:

- Amended `mounts the page under the Bootstrap face and the light color mode`: labels and status.
- Amended `holds the recipe compile alone under the tailwindcss face`: labels and status.
- Amended `inserts the unexcluded compile directly before the Bootstrap sheet under the unexcluded face`: labels and status.
- Kept `moves between every pair of faces through the Stylesheets buttons`: shared labels follow the header.
- Amended `leaves a host stylesheet in place under each face`: labels.
- Amended `writes the selected color mode to data-bs-theme on the root element`: labels and status.
- Amended `reads every header button at 4.5:1 or more, pressed or not, in both color modes`: labels; retained contrast assertions.
- Amended `restores the title, a %s data-bs-theme, the head, and the body on destroy`: reads root inline-style restoration, including an absent attribute and an important prior scroll-padding value.
- Added `keeps the compact sticky header neutral under every face at narrow and wide viewports`: boxes and computed longhands, declared neutrality exclusions, normalized selection and focus, planted and removed `px-3`, light and dark at 390 and 1280.
- Added `lands first and deep contents headings below the sticky header after a viewport resize`: first/deep targets, every face, both widths, sticky contents bounds, and removed scroll-padding control.
- Amended `ignores a click on the header of a destroyed mount, also after a second start`: labels and status.
- Amended `mounts a fresh page under the defaults on a second start after destroy`: labels.
- Amended `restarts a mounted page instead of mounting a second one`: labels.
- Kept toast ownership, dialog/toast engine behavior, placeholder-link/form/anchor behavior, main-region guard cleanup, and pagehide lifecycle cases.

`tests/app/browser/constants.test.ts`:

- Amended `labels the stylesheet and color-mode buttons and titles the page`: exact label literals.
- Kept every other case.

`tests/app/browser/helpers.test.ts`:

- Amended `names the face by its button label and the color mode by its value`: status literals under each face and mode.
- Kept every other case.

`tests/app/browser/factories.test.ts`:

- Amended `builds the skip link, banner, controls, contents region, and main landmark`: sticky classes, compact layout, labels, sibling version, hidden status, planted and removed gap-class control.
- Kept `presses %s and %s and reads them in the status line`, the registry/no-inline-style/unique-id case, the sticky contents overflow case, and every other case.

`tests/app/browser/integration.test.ts`:

- Amended `J1 arrives on the showcase and reads its header, state, and contents`: labels, mobile header bound, header/button boxes, and single-line button heights.
- Amended `J2 reaches the skip link, the five header buttons, the contents, and a specimen field by keyboard`: labels, retained order.
- Amended `refuses disabled and aria-disabled controls and the fieldset-disabled form`: face-button labels.
- Amended `reads the resolved values under its declared variant and partitions every departure of the tailwindcss face`: admits the observer's sticky contents element only after asserting its exact property names, top, and resolved maximum height; retains planted style-escape controls.
- Kept J3, J4, J6, paired engine-state readings, the partition proof, and face/color-mode/pair statecharts. Their shared labels and face-row names follow `tests/setupBrowser.ts`.

`tests/setupBrowser.test.ts`:

- Amended `reads the face and color mode the header buttons announce`: labels.
- Amended `refuses a face group that announces two faces or none, and an absent button`: fixture labels.
- Amended `refuses a name that selects no theme and a page that renders no button`: exact refusal label.
- Amended `detects chrome changes outside the specimen sections and restores normalization`: proves the banner-only reader agrees with the full reader and detects the planted outline-color departure.
- Amended `censuses controls, detects an occluded pointer route, and parks real hover`: native scroll landing follows the header bottom plus 8px.
- Kept every other case, including face/color-mode/pair scenario proofs.

`tests/app/browser/sections/integration.test.ts` stays unchanged.
