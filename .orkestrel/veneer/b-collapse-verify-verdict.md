# B-COLLAPSE VERIFY verdict — the disclosure family's capture portfolio (2026-09-24)

The Orchestrator's ruling on the capture-portfolio verdict round the disclosure family's design
verdict names as VERIFY, over the portfolio Veneer `main` carries at `2a3f223` (`tmp/capture/states`,
regenerated at the NAVBAR landing under `@orkestrel/test` 0.0.21).

## Lanes

- Round 1, workflow `wf_9c63a67c-0d8` (script `units/bc-verify-workflow.js`, slices
  `units/bc-verify-args.json`, every lane's return `units/bc-verify-lenses.json`): three blind lenses
  per slice (fidelity, state truth, variant integrity) over the slices `collapse-accordion`,
  `dropdown-toggles`, `nav-tabs`, and `navbar`, each lens `reviewer` on Opus 5.5 in a clean context,
  then a completeness critic, `reviewer` on Opus 5.5, that opened the frames each contradiction
  needed. Every lens's reviewed list matches its slice.
- The objective reading is the Orchestrator's own measurement, taken on the host: the frame
  dimensions of every PNG under `tmp/capture/states` (912 frames; 72 are page frames taller than
  2000 px). Astra holds no lane in a capture-portfolio round: the subject is a rendered surface, and
  `.agents/orchestration.md` § Acceptance laws takes the capture as the evidence.
- Round 2, workflow `wf_d16206fb-0ff` (script `units/bc-verify-workflow-2.js`): the fidelity and
  state lenses over the frames round 1 never handed a lens (the `dropup`, `dropup-center`, `dropend`,
  and `dropstart` scenarios, which the Orchestrator's slice filter dropped although the portfolio
  holds them) and over the navbar frames the round-1 fidelity lens left unruled. Its rulings append
  to § Round 2 when it returns.

## Rulings, round 1

Each finding names its one carrier. `BCF` is the family's fix unit dispatched from this verdict;
`THEME` and `BARE-BUTTON` are B-CROSS units (the second added by this verdict, § Re-baseline).

| # | Finding | Ruling | Carrier |
| --- | --- | --- | --- |
| V1 | Every focus scenario is a page frame (`accordion-base-focus`, `nav-base-focus`, `navbar-collapsed-focus`, and portfolio-wide `primary-focus`, `valid-control-focus`, `invalid-control-focus`, `check-group-focus`, `close-control-focus`, `form-check-box-focus`, `form-control-text-focus`, `form-floating-empty-focus`, `form-select-base-focus`, `input-group-button-focus`, `page-strip-focus`, `range-focus`, `skip-link-focus`, and the `page-strip-hover` hover), so no lens can find the ring and each focus state is not evidenced. The journey chose page frames because an element frame over the control crops a ring painted outside its border box; the `dropdown-menu-focus`, `list-group-actions-focus`, and `captioned-carousel-focus` scenarios already place the control's lifted specimen as the frame, which holds the ring. | Confirmed by every lens and by the measurement. Each page-frame focus or hover scenario becomes an element frame over its lifted specimen, with a reading that the ring's painted extent sits inside the frame; `showcase` stays the one page frame. | BCF |
| V2 | Resting frames show one link lifted toward its hover paint: `navbar-inverted--dark-1280`, `navbar-inverted-class--dark-1280`, and `navbar-scroll--dark-390`, against light siblings in the idle grey. | Confirmed by the critic's comparison. A capture-order defect (a pointer left over a link by an earlier driven scenario) until a probe names the cause; the resting capture must start with the pointer released. | BCF |
| V3 | `nav-tabs` at 1280 crops the open menu at the frame's bottom edge, through its last item. | Confirmed (the critic struck the two clean verdicts on the lower chrome). The specimen's pane is shorter than the open menu, so the specimen needs the room its menu paints into. The `nav-underline` dark crop keeps the 2 px bar and is recorded as a capture note, not a defect. | BCF |
| V4 | Every open-dropdown specimen writes `show` on the menu only, so no frame shows the opened toggle (`.btn.show` paints the active fill). | Confirmed. The engine writes `show` on the toggle too; each open specimen's toggle carries it. | BCF |
| V5 | The `dropdown-align-*` toggles overrun their `col-6` column at 390 at every width step (the critic's comparison: the geometry is the same for each step). | Confirmed for every step, not md alone. The specimen labels or columns change so each toggle fits its column. | BCF |
| V6 | Unframed developer-written states: the accordion's last item expanded (the outer bottom radius rules), `nav-underline` hover and focus (the underline's `currentcolor`), and an open menu inside an expanded navbar (`.navbar-expand{infix} .navbar-nav .dropdown-menu`). | Confirmed against the partials. Each takes a specimen or a driven scenario with its frames. | BCF |
| V7 | `.collapsing` and `.collapsing.collapse-horizontal` have no frame. | Dropped with reason: engine-written transition classes, proved by the declared-and-resolved reading in `collapse.test.ts` with no frame, as the disclosure verdict's states-at-rest ruling states. | none |
| V8 | The `forced-ring` focus on `.accordion-button`, `.nav-link`, and `.navbar-toggler` has no forced-colours frame. | Dropped with reason: the style proofs read each outline under `stageMedia({ forced: true })`; the portfolio's variants are light and dark at two widths, and no family frames forced colours. | none |
| V9 | A disabled `button.dropdown-item` paints smaller and paler than a disabled anchor item, and a disabled `button.nav-link` paler than a disabled anchor (`Base export` against `Base archive`). The elements layer's bare `button` rule writes `font-size: var(--vn-size-2)` and `button:disabled` writes `opacity: var(--vn-button-opacity)`; the release's reboot writes `font-size: inherit` and no opacity, and no component rule resets either for its button form. | Confirmed by the fidelity lenses and the critic. A cross-cutting defect: every component with a button form inherits the bare control's additions. | BARE-BUTTON |
| V10 | In dark, `.btn-outline-secondary` and `.btn-secondary` labels, borders, and carets read about 2.3 to 1 against the page (`--vn-color-secondary-base` is the light slate in both modes), on the split buttons, the input-group toggles, and `split-dropstart`. | Confirmed by two lenses and the critic. A dark-mode legibility defect in the secondary role. | THEME |
| V11 | In dark, the pressed `.btn-primary` fill is a pale cyan under a white label, lighter than its own resting fill, and it no longer matches the menus' active blue. | Confirmed by two lenses. The active tier's mix direction inverts in dark. | THEME |
| V12 | In dark, link hover darkens the link (`--vn-link-hover-base` mixes 80% with black in both modes) where the release lightens it; in light, the hover step is not visible in the frame (`nav-base-hover--light-1280` reads the same as its resting sibling). | Confirmed by the state lens and the critic; the variant lens's light-mode claim is struck for resting on source alone. The link base colour itself is a recorded departure (`--vn-link-base`, the § Tokens Links row) and carries nothing. | THEME |
| V13 | Type sizes below the release's: the `.accordion-body` text reads 14 px against 16 px, the `.btn` label 14 px against 16 px, the `.btn-sm` label 12 px against 14 px, and the `.btn-lg` label 16 px against 20 px. | Dropped: recorded departures (the body size reads `--vn-size-2`, and the `#### btn` rows record `--bs-btn-font-size` on `.btn`, `.btn-sm`, and `.btn-lg`). | none |
| V14 | The `.dropdown-header` renders bold where the release's `h6` weight resolves regular on the capture's system face. | Open until read: BCF reads whether the heading weight is a recorded departure and records the row if it is missing. | BCF |
| V15 | The critic's citation-drift note (a clean verdict citing `_accordion.scss` line 149 and a `_variables-dark.scss` that is not under `src/`). | Recorded; the observation (light-blue carets in dark) stands and no finding rests on the stale citation. | none |

## Round 2

Pending the successor workflow's return.

## Re-baseline

- Added: BCF (`bcf`), `opus` on Opus 5.5, owning `tests/app/browser/integration.test.ts`'s frame
  placements and pointer staging, the disclosure family's specimens in `app/browser/constants.ts`
  (`DROPDOWN_SPECIMENS`, `NAV_SPECIMENS`, `ACCORDION_SPECIMENS`, `NAVBAR_SPECIMENS`), and the
  capture registrations in `tests/setup.ts`; dispatched after the B-MODAL wave-2 landings, because
  every wave-2 unit patches those shared files.
- Added to B-CROSS: BARE-BUTTON (`cb`), `opus` on Opus 5.5, the scope of the elements layer's bare
  `button` rules against the component button forms (V9). Recommendation for its design lanes: the
  elements file names its subject "the bare button", so scope the additions to a button no
  component class claims, rather than resetting them in every component partial.
- THEME (`ct`) carries V10, V11, and V12 as inputs beside its own scope.

## Exit

The family's VERIFY row closes when BCF lands with its frames regenerated and a successor lens round
over the changed scenarios finds no major, and round 2's findings each carry a ruling here.
