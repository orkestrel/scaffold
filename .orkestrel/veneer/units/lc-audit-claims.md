# Audit claims — LABEL (`lc`), round 1

Subject: LABEL round 1 — `lc.diff` and `lc-status.txt` (the worktree `/home/user/veneer-lc` against `ac74459`), the
shared patch `lc-shared.patch` (against `ac74459`), the report `b-label-lc-report.md`, and the records under
`lc-instruments/` — against the brief `b-label-lc-brief.md` and rulings L1 to L9 of
`/home/user/scaffold/.orkestrel/veneer/label-contrast-design-verdict.md`. The unit was written by `opus` on Opus 5.5.
Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish that mutation
from the passing case.

Orchestrator ruling the lanes take as given, and rule wrong where the evidence says so: the root `color-scheme: light`
declaration the unit added to `src/styles/_theme.scss` is in scope. The design verdict's L4 did not foresee that the
build's Lightning CSS minifier lowers `light-dark()` into variables it declares only beside a `color-scheme`
declaration. The release declares `color-scheme` on its dark scope alone; Veneer declares it on both mode scopes.

1. **Scope.** `lc-status.txt` lists only files the brief owns, plus the added rule fixture
   `tests/src/styles/fixtures/contrast.scss`; `lc-shared.patch` touches `guides/veneer.md`, `tests/setupStyles.ts`,
   and `tests/setupStyles.test.ts` alone; no off-limits file changes, and `src/styles/elements/_button.scss` is
   untouched.
2. **The rule (L1, L2).** The `luminance`, `ratio`, and `contrast` functions in `src/styles/_mixins.scss` compute the
   release's `color-contrast` pick (`node_modules/bootstrap/scss/_functions.scss`): white at 4.5 to 1 or more, else
   black, with the higher ratio as the fallback. The rule fixture reproduces the release's own `.text-bg-*` color for
   every `$theme-colors` fill, holds `#0d6efd` between 4.5 and 4.501, and reddens on M1 (the candidates reversed), M2
   (the minimum raised to 4.6), and M10 (a pair written where the modes agree). No color literal sits outside
   `src/styles/_tokens.scss`.
3. **Labels and direction (L3, L5, L6).** The built cascade's picks and directions match the design verdict's table
   for every role in each mode: the dark primary takes the black label and tints; the `light` and `dark` roles move
   toward their own label; the shade endpoint is the `$light` map's `state-mixer` value and the tint endpoint is the
   white palette entry, at the unchanged `--vn-state-hover` and `--vn-state-active` weights. The floor proof reads
   every filled, outline, pair, and tooltip state at 4.5 to 1 or more and reddens on M3; the direction proof reddens
   on M4 and ran red on the base tree. The bare `.btn` background and the bare `button` rule still read
   `--vn-state-mixer`, and M7 reddens the veil cases.
4. **The byte comparisons (L2, F2).** Every `--vn-color-*-rgb` declaration in the built `dist/src/styles/index.css`
   is byte-identical to `ac74459`'s build; each mode scope carries the same declaration set as the base, with only the
   order inside a rule changed; the `:root` scope differs only by the root scheme and the two `--lightningcss-*`
   variables (`lc-compare-3.log.txt`).
5. **The other sites (L6).** Each `.text-bg-{role}` label equals its `.btn-{role}` label in each mode and keeps its
   `!important` flag (M5 reddens it); each `.{state}-tooltip` label reads the rule (M9 reddens it); each `.link-{role}`
   hover and focus color and underline color move 20% away from the role's label with the opacity variables still
   scaling them (M8 reddens it, and every role ran red on the base tree).
6. **The islands and the root scheme (L4).** Without a root `color-scheme` declaration, the built cascade's lowered
   `light-dark()` value is invalid at an attribute-less root and a root `.btn-primary` shows the inherited body color
   (`lc-probe-1.log.txt`); with it, the root, a dark island, a light island nested in it, and a button carrying its
   own light attribute read white, black, white, and white (`lc-probe-2.log.txt`), and M6 reddens the island proof.
   The root declaration is the better mechanism than the `@scope` alternative the report names. The files the change
   makes false outside the owned set are exactly `tests/src/styles/theme.test.ts`, `tests/src/styles/tokens.test.ts`,
   the `UNDER_BAR` list in `tests/setup.ts`, and UTIL-FRAMES' link journey case, and `lc-theme-owned.patch` and
   `lc-journey-link.patch` make the first and last of them true.
7. **Law and report.** The changed code holds no `any`, no `as` cast, no `!` assertion, no suppression, no nested
   function, and no mock; case populations live in `tests/setupStyles.ts`; every comment and TSDoc sentence the unit
   wrote, every guide sentence in the shared patch (the L4 `light-dark()` sentence included), and the F1 comments read
   true against what ships; the report states no tally of a growable set and no temporal word, and follows every code
   token with a noun.
