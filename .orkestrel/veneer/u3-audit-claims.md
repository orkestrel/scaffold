# U3 audit — numbered claims

Subject: the U3 diff in the Veneer checkout `C:/Users/mikes/WebstormProjects/veneer`, from
`b661142` to the working tree the dispatch names, made by `opus` (native Opus 5) from
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief.md`, with its report
`units/u3-report.md`, plus the Orchestrator's serial integration of the report's three exact
patches (D3 in `tests/distribution.test.ts`, D4 in `guides/veneer.md`, D6 in
`configs/src/vite.styles.config.ts`). Rule on every claim with `CONFIRMED`, `REFUTED`, or
`UNDECIDABLE` and the deciding evidence (`file:line` or exact text). Read the actual diff
(`units/u3-diff.patch.txt`, tracked changes first, then each untracked file against `/dev/null`)
and the live checkout, never the report alone. The design the unit implements is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-design-planner-report.md`
as amended by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-design-verdict.md`;
where they disagree the verdict wins. The value sources are
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.md`,
`research/instruments.md`, `research/inventory.json`, `units/u2-run-6-extract.md`, and
`research/ledger.md` § Token rows. Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and
`.claude/rules/` there, `styles.md` first.

Standing condition, not a finding: `npm run test:policy` is red on `guides/tokens.md` because the
vendored policy admits only the package's own guide, the index, and catalog rows; a scaffold unit
is amending that rule and re-vendoring it. `test:distribution` needs the registry (`--mode
release`) for the case D3 patched.

1. **Registry.** `src/core/constants.ts` declares `TOKEN_NAMES` frozen at every level with
   `as const` on each literal; every leaf equals `--vn-` plus its joined path; `src/core/types.ts`
   declares `TokenLeaf`, `TokenMap`, `TokenName` as the planner wrote them; `src/core/index.ts`
   star-exports both files and nothing else; the files carry no listener, timer, or DOM access.
2. **Registry proof.** `tests/src/core/index.test.ts` asserts the export set, that every group is
   frozen, that every leaf equals `--vn-` plus its path derived by walking the tree (not
   restated), leaf uniqueness, and that a dynamic import registers no listener on `globalThis`
   through a recorder installed before the import with the deliberate-listener control.
3. **Value-source law.** Every value declared in `src/styles/_tokens.scss` and `_theme.scss`
   traces to a calibration row, or to `inventory.json` `root`/`dark` as a Bootstrap retained
   value recorded with its reason in `guides/tokens.md`, or is a derivation the guide names with
   its expression; the report's retained-value table matches the guide; no value is invented.
   Spot-check at least: the primary light and dark fills, the body text pair, the canvas dark, the
   border pair, the raised surface pair, the motion durations and easing, the radius scale, and
   the dark primary `-rgb` triplet `0, 172, 236`.
4. **Cascade shape.** Token declarations sit inside `@layer theme`; the factors (`density`,
   `radius`, `elevation`, `motion`) are registered with `@property`; the role tiers are emitted by
   a `palette-each` mixin using `color-mix(in oklab, …)` with the calibrated percentages; `-rgb`
   tokens are literal triplets; the theme-dependent closure reaches `:root` and both
   `data-bs-theme` blocks through a `theme-tokens` mixin; radius names are full words and
   breakpoint names are Bootstrap's; no `body` transition is declared; `focus-ring` and
   `breakpoint-down` are deferred in the guide; `index.scss` loads `tokens`, `theme`,
   `elements/html`, `elements/body` in that order and never `mixins`.
5. **Aliases.** Every `--bs-*` root variable and every `--bs-*` dark variable of `inventory.json`
   is declared in the built cascade at the matching scope; `tests/setupStyles.ts` exports
   `BOOTSTRAP_ROOT_VARIABLES`, `BOOTSTRAP_DARK_VARIABLES`, and `THEME_DARK_ADDITIONS` frozen with
   the Bootstrap version and digest in TSDoc, and `tests/setupStyles.test.ts` proves them against
   the inventory; the dark scope's `--bs-*` partition is exactly the dark list plus the additions.
6. **Elements.** `src/styles/elements/_html.scss` and `_body.scss` exist per the verdict; no
   two-bare-tag selector outside the HTML-mandated pairings (`MANDATED_TAG_PAIRS`); no physical
   inline-axis property anywhere in the shipped cascade; `index.rtl.css` stays byte-identical to
   `index.css` and the scanner case in `tests/setupStyles.test.ts` requires at least one
   declaration.
7. **Proofs.** `tests/src/styles/` carries `tokens.test.ts` (parity over LTR and RTL, values
   against the calibration through consuming properties with parsed colours, island and
   geometry, invalid and cycle, nesting), `theme.test.ts`, `mixins.test.ts` (fixture stylesheet
   under `fixtures/` compiled by Vite, `cdp()` media emulation), `index.test.ts` (effective layer
   order across statement and block rules, bare-tag rule, direction-neutrality sweep),
   `elements/html.test.ts`, `elements/body.test.ts`, and `integration.test.ts` executing the
   guide's recipe; every colour assertion compares parsed colours (`matchesPaintedColor` in
   `tests/src/styles/fixtures/colors.ts`), never strings; no assertion is unfalsifiable.
8. **Controls.** The report records `PLANT-GHOST`, `PLANT-DROP`, `PLANT-SCOPE`, `PLANT-PAIR`,
   `PLANT-PHYSICAL`, and `PLANT-LISTENER` each turning a named assertion red with the exact
   assertion text; the tree carries no plant and no case name carries a control tag.
9. **Carried obligations.** In `tests/setupStyles.ts`, `scanPhysicalDeclaration` (or the
   `normalizeValueToken` it calls) normalizes whitespace inside a parenthesized token before the
   edge comparison so `calc( 1px )` equals `calc(1px)` (N17); its limit sentence names the value
   form (N18); the wrapped `@returns` clause in `matchesRadiusShorthand` is reflowed (N19).
10. **Unknowns.** The report records the raw readings for `box-shadow` collapsing a
    registered-factor `calc()` and for `interpolate-size` on both engines; the elevation factor
    stays on the shadow tokens' geometry; `tests/src/styles/elements/html.test.ts` reads the
    property the engine reports (`-webkit-text-size-adjust`).
11. **Density island (D2).** The guide's § Factors states that a subtree factor rescales only a
    scale declared in the same subtree, the proof reads the document-level and subtree cases the
    report describes, and no claim in the guide or the TSDoc promises the island behaviour the
    first reading refuted.
12. **Guides.** `guides/tokens.md` carries the reference map (group, token, value, source), the
    customization recipe as one `css` fence the integration proof transcribes, the departures
    table, and the deferred names; `guides/veneer.md` documents the four core exports with
    `Summary` cells equal to the TSDoc description paragraphs, links the core proof, and its
    § Showcase paragraph (the integrated D4 patch) is true of the shipped cascade; `guides/README.md`
    indexes the token reference in § By directory with the paragraph explaining its absence from
    § By concept; `README.md` names it; `test:guides` is green.
13. **Names.** `TokenMap`, `TokenName`, `TokenLeaf`, `TOKEN_NAMES`, and every new
    `tests/setupStyles.ts` export are absent from every `Surface` row under
    `node_modules/@orkestrel/scaffold/dist/host/guides/*.md`, and the report records the check;
    each helper name follows `{verb}{Noun}` and each constant `UPPER_SNAKE_CASE`.
14. **Scope and law.** Only owned files changed plus the three integrated patches;
    `package.json`, `tests/guides.test.ts`, every vendored path (`tests/setupPolicy.ts`,
    `tests/policy.test.ts`, `tests/config.test.ts`), `src/browser/**`, `app/**`, and the other
    off-limits setup files are unchanged; no `any`, `as` (other than `as const`), `!`, `@ts-*`,
    `eslint-disable`, nested function declaration, or hidden untested helper; no `scaffold repair`,
    tree-wide `format`, or lint `--fix` ran.
15. **Decided deviations.** Each of D5, D7 (`--vn-surface-raised-base`), D8
    (`THEME_DARK_ADDITIONS`), D9 (`matchesPaintedColor` placement), D10 (two registry walks),
    D11 (the stacking ladder), and D12 (dark-only assets) is consistent with the verdict's
    rulings, is recorded where the report says (guide or TSDoc), and introduces no token, export,
    or claim the value-source law or the naming rules refuse.
16. **Gates.** Every gate the report lists reproduces green on the same tree on managed Chromium
    (with `test:policy` as the standing condition), and `test:src:styles`, `test:src`, and
    `test:journey` are green on Edge.
