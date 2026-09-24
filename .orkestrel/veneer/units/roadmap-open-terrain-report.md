# ROADMAP-OPEN terrain report

Engine: Cursor Grok (Grok 4.7), through the `grok` bridge. Journal `tmp/cursor/roadmap-open-terrain.jsonl`
(swept at acceptance), session `74e44668-4d77-4445-99c6-4b8a50ffe260`. Brief: `roadmap-open-terrain-brief.md`.

The Orchestrator sampled the cited commits and symbols (`8e42c8a`, `64e69f6`, `04114c5`, `3a9202a`, `984d062`,
`testToPolicyStem`, the absent `index.rtl.css`, the `_body.scss` `text-align` declaration, the absent
`matchesLooseTagPair`) and found them as stated. Row 506 cites `c505826`, the resolved read, rather than `e3d7280`.
The fold landed as Veneer `82e1120`.

## Grok's answer

I'll read the brief first and follow it exactly, without changing any files.The brief classifies unmarked carrier rows. I'll read the writing law and the roadmap sections it names.The carriers table is long. I'll read the phases list and pull every row whose carrier cell is still unmarked.Phases mark most foundation units landed. I'll check the unmarked rows against the tree so each status cites a commit and a symbol.Unmarked rows in `ROADMAP.md` § Carriers are classified below. A carrier cell that contains `Closed:` or `closed:` is omitted.

| Line | Row | Carrier | Status | Evidence |
| --- | --- | --- | --- | --- |
| 423 | Outline ghost; dark primary contrast | E-ELEMENTS, then E-IDENTITY | open, later phase | § Phases and units: E-ELEMENTS and E-IDENTITY have no `landed` mark. They depend on B-CROSS and APPEARANCE-RULING. |
| 424 | Older highlight token pair with no consumer | F5c TOKENS-TRUTH | landed | `8e42c8a`. § Phases closes on removing that pair (D7). `src/styles/_tokens.scss` keeps the consumed `highlight` entry; the mark comment points the consumer at the mark highlight. |
| 427 | `::-moz-focus-inner` exclusion | F5 ACCOUNTING (recorded drop) | landed | F5e `67d12d7`. `guides/veneer.md` § Deferred selectors, row `` `::-moz-focus-inner` ``, owner `Excluded`. |
| 430 | Navbar offcanvas panel rendered without a specimen | Offcanvas unit of B-MODAL … B-CAROUSEL | landed | OFFCANVAS `42fd88e`. `OffcanvasSection` in `app/browser/sections/OffcanvasSection.ts`. The `navbar-offcanvas` panel is in `app/browser/constants.ts`. |
| 431 | Registry later majors of `@vitest/browser-playwright`, `typescript`, and `vitest` | X-EXIT | open, later phase | § Phases: X-EXIT has no `landed` mark. It depends on every preceding unit. |
| 433 | Chrome receipt | E-RECEIPTS | open, later phase | § Phases: E-RECEIPTS has no `landed` mark. The install stays with the user. F4 `af673cb` pinned the promised hosts. |
| 434 | U1-del legacy tree in the working tree | X-RETENTION | open, later phase | § Phases: X-RETENTION has no `landed` mark. The recorded drop is `fc36cec`. |
| 437 | U7c paint calibration readings | E-ELEMENTS, then E-IDENTITY | open, later phase | Same phase rows as the outline row. The ruling is APPEARANCE-RULING. |
| 438 | Frame grammar; unaligned filename stems | F7 CAPTURE | landed | `64e69f6`. § Phases closes on the frame grammar, stems, palette and link coverage, the pixel guard, and the sampler. Scenarios live in `tests/setup.ts` (`scenario`). |
| 439 | Portfolio finding 5 (differing context) and finding 7 | F7 CAPTURE | landed | `64e69f6`. The same capture grammar is what § Phases names for comparable context and link coverage. |
| 451 | The noun rule's scope for a CSS token | P1 SCAFFOLD-PROPAGATE | open, later phase | § Phases: P1 has no `landed` mark. It waits on the last B and E unit. |
| 456 | `.form-control-plaintext:focus` writes `outline: 0` | B-FORMS-CLOSE-FORCED (dropped on evidence) | landed | `2822fc2`. `guides/veneer.md` states the plaintext focus rule writes `outline: 0` and draws no indicator in any mode. |
| 464 | Helper key with no subject region and no showcase home | F7 CAPTURE, then B-UTILITIES | landed | F7 `64e69f6` for the subject contract. B-UTILITIES through UTIL-TEXT `273b8e7` (`TextSection`). § Phases closes the remaining helper roots with their regions. |
| 465 | Normalizer regression case's local inventory literal | F5 ACCOUNTING | landed | F5e `67d12d7` put the case tables back in `tests/setupStyles.ts`. That module's header names the selector grammar the normalizer stands on. Completeness sits on `readAdditions` in the conformance ledger. |
| 466 | "specimen" term collision on the browser setup module | F4 HOST-OBSERVATIONS | landed | `af673cb`. § Phases closes on the `scene` term and the stripe scope assertion. |
| 467 | Mirror instrument's base-name comparison | F6 FOUNDATION | landed | `04114c5`. `testToPolicyStem` in `tests/setupPolicy.ts` returns the workspace-relative stem, directory included. |
| 468 | Shell's document-global `main` id | F6 FOUNDATION | landed | `04114c5`. `Showcase.#mount` in `app/browser/Showcase.ts` builds `main` with `createElement` and sets no id. The description-list proof is `tests/src/styles/elements/dl.test.ts` (`mode`). |
| 469 | `visitBreakpoint`'s bare `finally` | X-RETENTION | open, later phase | The cell records the drop as satisfied. X-RETENTION still verifies the citations at the prune. |
| 470 | CL12 guide bounds | X-RETENTION | open, later phase | Same: the drop is recorded as satisfied, and X-RETENTION confirms each citation. |
| 471 | Reviewer F1: `Delegate` refuses `disabled` hosts | F6 FOUNDATION | landed | `04114c5`. `Delegate` in `src/browser/Delegate.ts` reads `matchesDisabled` and does not refuse the host. |
| 472 | Reviewer F2: the unreachable `index.rtl.css` twin | F6 FOUNDATION | landed | `04114c5`. No `index.rtl.css` remains in the tree. F5b `3a9202a` removed the RTL digest pin. |
| 473 | Reviewer F3: no record of the engine's own additions | F5 ACCOUNTING | landed | F5b `3a9202a`. `readAdditions` in `tests/setupServer.ts` reads the Additions table. |
| 474 | Vue delivery | E-VUE | open, later phase | § Phases: E-VUE has no `landed` mark. It depends on J-ENGINE. |
| 475 | Tailwind tooling | F8 TAILWIND | landed | `104a573` installed `tailwindcss` and `@tailwindcss/postcss` (`package.json`). F8a `0783b2b` and F8b/F8c `a803407` landed the profiles. |
| 476 | A later unit that ships a shared class name whose Veneer declarations are all normal | carrier not yet known | open, implementation | The F8c consumer proof at `a803407` (`tests/service/tailwind/`) is the trigger. No such name is named, so no edit is due until one ships. |
| 477 | Audit claim 3: the restoration proof compares class membership | F4 HOST-OBSERVATIONS | landed | `af673cb`. § Phases closes on the serialized restoration proof in `tests/src/browser/Button.test.ts`. |
| 478 | Audit claim 5: `apply('light')` inside a dark island | F6 FOUNDATION | landed | `04114c5`. `ColorMode.apply` in `src/browser/ColorMode.ts` writes the theme attribute for the mode it is given. |
| 480 | Audit claim 8: `[hidden]` and the calendar-picker rule carry `!important` | F6 FOUNDATION | landed | `04114c5`. § Phases closes on the important-utility contract and the Tailwind conflict rule in the guide (D6). |
| 481 | Audit claim 9: factor overrides beyond density are unproved | F6 FOUNDATION and F5 ACCOUNTING | landed | F6 `04114c5` adds the override cases. F5 `3a9202a` records the two filter bindings in the ledger (`readAdditions`). |
| 482 | Audit claim 10: theme islands are proved for the probed tokens only | F6 FOUNDATION | landed | `04114c5`. § Phases closes on the `ColorMode` islands. |
| 483 | Audit claim 11: the guide's link rows state values the package does not ship | E-IDENTITY | open, later phase | The cell says the F5 and F6 parts landed. The stripe value still waits on E-IDENTITY. |
| 484 | Audit claim 12: `btn` and `reboot` emit unrecorded names | F5 ACCOUNTING | landed | F5a `984d062` and F5b `3a9202a`. `readAdditions` and the extra-name refusal in the ledger readers. |
| 485 | Audit claim 13: unrecorded structural changes to `dl`, `blockquote`, `code`, `pre`, and `kbd` | E-IDENTITY | open, later phase | The cell says the F5 part landed. Which departures stay waits on E-IDENTITY. |
| 486 | Audit claim 14: the dev-cascade half is vacuous | E-RECEIPTS | open, later phase | The claim is retired as mis-stated. The distribution proof in release mode is E-RECEIPTS, which has no `landed` mark. |
| 487 | Audit claim 16: `input.test.ts` asserts the `::file-selector-button` text twice | F5 ACCOUNTING | landed | F5a `984d062`. § Phases closes on removing that duplicate assertion. |
| 489 | Audit claim 18: the named APIs alone do not eliminate the selector grammar | F5 ACCOUNTING | landed | F5a `984d062`. § Phases closes on retiring the tag-pair grammar. `matchesLooseTagPair` is absent. A surviving structural question goes to the user as a `postcss-selector-parser` request. |
| 490 | Audit claim 20: a visitor object is declared inside `extractSpecifiers` | F5 ACCOUNTING | landed | F5a `984d062`. `extractSpecifiers` in `tests/setupServer.ts` calls a module-scope visitor. |
| 491 | Audit claim 21: the § Tokens link rows are stale | F5 ACCOUNTING and F6 FOUNDATION | landed | F5c `8e42c8a` adds the value gate, the corrected rows, and `--vn-link-base`. F6 `04114c5` names `_tokens.scss`. |
| 492 | Audit claim 22: the forbidden-runtime sweep never reads `dist/src/**` | F5 ACCOUNTING | landed | F5a `984d062`. `scanForbiddenBuild` in `tests/setupServer.ts`, called from the built-entry case in `tests/conformance.test.ts`. |
| 494 | Checker claims 16, 19, and 23 left unresolved | claim 16 rides its audit row; 19 and 23 carry nothing | landed | Claim 16 is the file-selector row above (`984d062`). Line 502 records that claims 19 and 23 held and carry nothing. |
| 495 | F5d reviewer F-B and F-C: the `veneer-logical-rtl` plugin | F6 FOUNDATION | landed | `04114c5`. § Phases closes on deleting the plugin and the comment with the twin (D5). |
| 496 | F5d reviewer F-D: the legend departure row's axis vocabulary | F5b ACCOUNTING-LEDGER | landed | `3a9202a`. The guide's departure record is the ledger tables `readDepartures` reads. |
| 497 | F5d reviewer R-2: nothing catches a logical property re-entering the cascade | F5b ACCOUNTING-LEDGER | landed | `3a9202a`. `tests/setupServer.test.ts` reports a planted declaration the inventory lacks (`scanLedgerDrift`). |
| 498 | F5d report finding 2: the `_body.scss` `text-align` fallback | F5b ACCOUNTING-LEDGER | landed | `3a9202a`. `src/styles/elements/_body.scss` writes one `text-align: var(--bs-body-text-align)` declaration. |
| 499 | F5d reviewer F-F: a brief listing `ROADMAP.md` as shared and as off-limits | X-EXIT | open, later phase | The next brief lists `ROADMAP.md` once. X-EXIT still verifies that over the retained briefs. |
| 503 | D14's law that `guides/` holds guides alone | P1 SCAFFOLD-PROPAGATE | open, later phase | § Phases: P1 has no `landed` mark. |
| 504 | D18's law that an unread `@use` is a dead load | P1 SCAFFOLD-PROPAGATE | open, later phase | Same P1 row. |
| 506 | The floating select's `line-height: 1.25` declaration has no resolved reading | B-FORMS-SELECT | landed | `e3d7280`. `tests/src/styles/components/form-floating.test.ts` reads the select's line height as `1.25` times its font size. `guides/veneer.md` § Form floating classes states that `.form-select` removes the native appearance so the declaration resolves. |
| 508 | The floating select frame shows a bare user-agent select | B-FORMS-SELECT | landed | `e3d7280`. `guides/veneer.md` states the `form-floating-select` frame shows the floated label over the styled select. The scenario is `form-floating-select` in `tests/setup.ts`. |
| 534 | The installed `readFrame` refusal does not name the frame's size | the next `@orkestrel/test` release, not yet named | open, implementation | PAGE-FRAME `ec98064` holds the area guard (`FRAME_AREA` in `tests/setupBrowser.ts`). The named `readFrame` and `captureFrame` changes belong to the next Test release. |
| 537 | The lift into a padded wrapper, the ring reach, and the crop reading repeat | FRAME-HELPERS (`fh`) | open, implementation | `FrameManager.place` exists in `tests/setupBrowser.ts` after FOCUS-FRAME `5afa37b`. Dropdown and carousel proofs still call `focus()` (`tests/src/styles/components/dropdown.test.ts`, `tests/src/styles/components/carousel.test.ts`). |
| 539 | The palette's dark contrast readings and the type scale's 14-pixel labels | the user's APPEARANCE-RULING | open, user | The cell says the palette values stay until that ruling is given. |

**Open, implementation**

- **Shared class name, all Veneer declarations normal (line 476).** Leave the tree alone until such a name ships. Then let the F8c consumer proof go red and name that class in the carrier cell.
- **`readFrame` and `captureFrame` (line 534).** In the next `@orkestrel/test` release, make `readFrame` name the frame size, stop `captureFrame` from staging content height for an element frame, and add a first-screen page frame.
- **FRAME-HELPERS (line 537).** One focus-frame placement in `tests/setupBrowser.ts` that every driven case calls, and drive dropdown and carousel focus with Tab.

No unmarked row is landed with its obligation still unmet.
