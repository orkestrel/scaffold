Implemented the carried `showcase-page` work and rebuilt `showcase/browser.html`.

| Carried item | Change and evidence |
| --- | --- |
| Claim 18 / F1 | Removed unlicensed fixed-tone frames from contextual buttons, groups, checks, links, text, and shadows. Preserved licensed light/white/dark/black frames. Factory assertions and both-theme captures verify the resulting surfaces. |
| Claim 11 | Added nine focusable class-disabled triggers on the real engine routes. Factory tests assert `.disabled`, `aria-disabled="true"`, no native `disabled` attribute, route presence, and `tabIndex === 0`. Keyboard refusal rows remain assigned to `showcase-proofs`. |
| Claim 2 | Added a frozen `alert alert-dismissible` carrier with a close button carrying no `data-bs-dismiss`. The factory test verifies that separation; the caption identifies the live comparison. |
| Claims 16/19 / F3/F4 | Overflow has no clipping specimen frame, padded cells, bottom clearance, and hints before the matrix and each specimen. Added Tailwind recipe and engine-table hints. Flex wrap and align-content use four items, two lines, and free cross-axis space. Browser geometry tests and captures verify the differences. |
| Claim 9 | `Showcase.#notify` checks the registry and tracks only toasts it creates. The real-engine regression proves a previously registered toast survives Showcase teardown and still dismisses, while Showcase's own toast is destroyed. |
| F2/F7/F8 / claim 21 captions | Corrected live/frozen leads; standardized caption prose; rendered prose class/attribute tokens as unbroken code; removed the duplicate placeholder token; ordered shadows none, sm, default, lg; named live comparisons in frozen captions. Captures and factory/constants tests verify these changes. |
| Bound | Kept licensed frames and existing live behavior. Rebuilt the standalone showcase. All existing journeys pass. |

The claim 9 regression was red before the ownership fix (1 failed) and green afterwards (1 passed; 13 filtered tests): `npx vitest run --config vite.config.ts --project app:browser tests/app/browser/Showcase.test.ts -t 'destroys only its own toasts'`.

Stable IDs for the next unit:

| Specimen | Trigger ID | Carrier / target ID |
| --- | --- | --- |
| Alert dismissal | `alerts-disabled-dismiss` | `alerts-refusal-alert` |
| Toast dismissal | `toasts-disabled-dismiss` | `toasts-refusal-toast` |
| Modal dismissal | `modal-disabled-dismiss` | `modal-live-archive` |
| Offcanvas dismissal | `offcanvas-disabled-dismiss` | `offcanvas-live-start` |
| Offcanvas toggle | `offcanvas-disabled-toggle` | `offcanvas-live-start` |
| Tab | `navs-tabs-disabled-tab` | `navs-tabs-tab-refusal-unavailable` |
| Pill | `navs-tabs-disabled-pill` | `navs-tabs-pill-refusal-unavailable` |
| List | `list-group-disabled-list` | `list-group-list-refusal-unavailable` |
| Dropdown | `dropdowns-disabled-toggle` | `dropdowns-refusal-menu` |
| Frozen alert | `alerts-frozen-close` | `alerts-frozen-dismissible`; figure `alerts-frozen` |

Tab, pill, and list current panes use the same target prefix with `-current` in place of `-unavailable`; their selected controls use `-active`. Open the archive dialog or start panel to reach its disabled dismissal.

All required gates ran in the specified order after the last source edit. Full output and exit codes are retained in `tmp/codex/gate-*.log`.

| Gate | Exit | Result |
| --- | ---: | --- |
| `npm run format:check` | 0 | 357 files checked |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | All configured type checks passed |
| `npm run build` | 0 | Source and application builds passed |
| `npm run test:app:browser` | 0 | 226 passed |
| `npm run test:setup:browser` | 0 | 102 passed |
| `npm run test:journey` | 0 | 60 passed across four variants |
| `npm run test:guides` | 0 | 15 passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run build:showcase` | 0 | Standalone page rebuilt |
| `git diff --check` | 0 | Clean |
| `CAPTURE=1 npm run test:journey` | 0 | 60 passed; 304 captures |

Build output retains the API Extractor/TypeScript-version and bundle-size warnings. Browser evidence is bounded to Chromium as documented in `configs/browsers.ts`.

Read both `SECTION--light-1280.png` and `SECTION--dark-1280.png` for every section below after the final capture run, under `tmp/captures/states/`. Each observation applies to both themes unless stated otherwise.

| Section | What the captures show |
| --- | --- |
| accordion | Expanded and collapsed panels; the parent-route attribute remains whole in the caption. |
| alerts | Live, frozen, and disabled dismissible alerts are separately captioned; the disabled close is visibly muted. |
| badge | Badge examples retain licensed light/dark frames and consistent caption prose. |
| button-group | Joined, sized, toolbar, and vertical groups use the page surface. |
| buttons | Contextual and toggle controls use the page surface; light/dark variants retain contrasting frames. |
| carousel | Live controls and frozen transition frames are distinguished in the lead and captions. |
| checks-radios | Checks, radios, switches, and toggle buttons follow the page theme. |
| close-button | Enabled/disabled close icons and the licensed dark-surface examples retain readable code captions. |
| collapse | Shown, hidden, and horizontal disclosures have consistent captions; the lead locates the frozen transition elsewhere. |
| colored-links | Contextual links use the page surface; only light/dark links keep fixed frames. |
| containers | Width descriptions remain aligned; the caption renders container-xxl as one code token. |
| dropdowns | Frozen menu previews and live toggles are distinguished; Unavailable actions is visibly disabled. |
| engine-states | The sideways-scroll hint precedes the table; frozen captions name their live sections. |
| flex | Wrap and wrap-reverse form two lines; align-content values visibly position those lines within taller frames. |
| form-layout | Horizontal forms and the disabled fieldset retain aligned, consistent captions. |
| icon-link | The success icon link sits directly on the themed surface. |
| interactions | Selection and pointer examples remain intact; attribute/class names appear as whole code tokens. |
| list-group | The new unavailable list selection appears beside a current pane; existing list examples remain intact. |
| live-components | The visible feedback, disclosure, and overlay controls have consistent captions; the section capture shows the initial scroll position. |
| modal | Live launchers precede frozen dialog frames; each frozen caption names the live archive dialog. The disabled dismissal is inside the initially closed live dialog. |
| navbar | Responsive bars remain intact; navbar and theme-attribute caption tokens remain whole. |
| navs-tabs | Separate disabled tab and pill specimens show their current panes and muted unavailable selections. |
| offcanvas | Live launchers include the disabled toggle; frozen edge previews name the live example. The disabled dismissal is inside the initially closed start panel. |
| overflow | Hints precede the matrix and specimens; clipped values contrast with visible text extending beyond its frame, with space below each specimen. |
| placeholders | The loading-card caption lists placeholder once; size, animation, and color examples remain intact. |
| popovers | Live triggers precede five frozen placement previews with explicit live-example captions. |
| position-helpers | Fixed/sticky examples remain intact; positioning tokens stay whole in the captions. |
| position-utilities | Offset, translation, static, sticky, and fixed examples retain consistent code-formatted explanations. |
| progress | Labeled, colored, striped, and stacked bars retain consistent caption prose. |
| shadows | Rows read none, sm, default, lg on the page surface; shadows are naturally subtler in dark mode. |
| spinners | Border, grow, size, and button examples retain consistent animation captions. |
| tables | Table variants and the scroll hint remain visible; caption typography is consistent. |
| tailwindcss | A recipe-scroll hint precedes the preformatted block; prose class tokens stay whole. |
| text | Contextual text has no fixed frames; white/light/black/dark text retains its licensed contrasting surface. |
| toasts | Existing notifications and the upload launcher remain; the retained notification shows a muted disabled close. |
| tooltips | Live triggers and frozen placement labels are clearly distinguished by the lead and captions. |
| z-index | Overlapping panels and watermark retain their layout, with whole code tokens in the captions. |

Also read the final light and dark `overflow--THEME-390.png` captures: visible overflow clears the row dividers and footer, including the last lines. The narrow matrix is horizontally scrolled by the existing journey.

These captures prove the displayed states; they do not prove keyboard refusal or opened modal/offcanvas dismissals. Those journey rows remain the next unit's work.

Commit: `7593cfe02fd1bcafe2352fade5546f9812b4b3b2` (`fix(showcase): address page audit findings`). Exactly one commit from `8707cb9`; `git status --porcelain` is empty.

Deviations: none. No reserved journey/statechart files changed. No subagents, push, publication, or installation outside the worktree.