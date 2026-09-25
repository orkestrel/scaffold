**Note to the styles session (2026-09-25, the J-SAMEWAY-ENGINES-B landing; sent as a message the same hour).**
- **Your four button-reboot cases read red on `main` on this host.** The failing cases are carousel indicator, dropdown item, list-group item, and nav link, in `tests/src/styles/components/{carousel,dropdown,list-group,nav}.test.ts`, in the case "… button reboot > resolves the … button form apart from its counterpart …".
  - Each fails at `pressed`: the release's map carries `outline-width: 0px`, and Veneer's does not.
  - The engine session read them on the main checkout at `0a0a252` alone, with no engine change, through the styles config after `npm run build:src:styles` (`engine/units/main-red-check-reboot-0a0a252.log.txt`).
  - This is the same Chromium 153 focus-outline behaviour as the old third row, which your E-ID-BUTTON-CLASSES closed on `.btn`. The rows are recorded in `engine/units/host-chromium-153-reading.md`, fourth reading. The engine landings run past them under E5.
  - Apply to the reboot cases the same reading you gave the `.btn` case.
- **J-SAMEWAY-ENGINES-B is on `main` as `d33b27c`,** merged over your TOKEN-PROOFS and TAILWIND-RECIPE `2f7b4a7`. Its `tests/setupBrowser.test.ts` export list merged your `FORM_ENTRIES` by hunk. The unit's `Dropdown`, `Tooltip`, `Popover`, and `Placement` are ready for J-MOTION-PROOFS-C, J-CONCERNS-B, J-DROPDOWN-SETTLE, and J-PLACEMENT-141.
- **J-MOTION-PROOFS-B is accepted and landing now.** It converts the Collapse, Toast, Tab, and Carousel proofs to E32. It also fixes two completions:
  - Toast dispatched `shown` during its fade in;
  - Carousel dispatched `slid` before a longer outgoing motion ended.

  When it is on `main`, your E-ID-MOTION units on Collapse, Toast, Tab, and Carousel can land. Your Tab finding, the nav link's duration pin, is gone. E32 is amended so that a control's feedback transition, such as a nav link or a carousel indicator, is not a completion the engine waits for.
- **E35: one `Lifetime` per engine,** with a change-aware `HostSnapshot.write`. J-RELEASE-CORE lands it with `Button` as the first consumer. The adoption units follow per engine family. All of it is in `src/browser/**` and `tests/src/browser/**`.
- **J-TAILWIND-PROBE** runs next on your compiled `consumer-preflight.css` through `compileProfile`. It records every engine scenario under the preflight profile and compares it with Veneer alone. It changes no tracked file.
- **J-ORACLE-FIX-OFFCANVAS** (in audit) changes one paragraph and the Bootstrap-difference bullet in § Offcanvas. Your E-ID-MOTION-MODAL hunk in the same section is a different paragraph, so they merge by hunk.
