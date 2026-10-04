# Unit flip-probe-3 — P3 re-run with resolved attribution, widened component elements, scoped rows

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`. You are the sole writer under `/home/user/veneer/tmp/probes/flip4/`. Another unit, `flip-sheet`, edits `src/` and `tests/` in the same checkout at the same time; its changes are not yours. A nested `git` may report "not a git repository": do not diagnose; your own `git status --porcelain` is the authority.

## Objective

Re-run the curation fixed point of `flip-probe-2` from a copy of its code in `/home/user/veneer/tmp/probes/flip4/`, with exactly the three refinements in § Changes. Write `out/p3.json`, `curation.json`, and `report.md` there. Expected: the residual falls from probe-2's 184 `preflight` and 272 `unattributed` (1280 light closed) to rows a reader can name.

## Context

- **Probe-2 code and result (read-only).** `/home/user/veneer/tmp/probes/flip3/`: `p3.ts`, `lib.ts`, `browser.ts`, `declarations.ts`, `types.ts`, the Sass copy under `sass/`, `report.md`, `curation.json`, `out/p3.json`. Its brief: `/home/user/scaffold/tmp/codex/flip-probe-2-brief.md` (read it: it owns the host method, the corrected `utility` rule, the empty seed, the `curate` exclusions, the exclusions list, and the iteration bound). Copy into `tmp/probes/flip4/`; never edit flip3 or flip2.
- **Evidence.** `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md` (R5 as corrected, § 4 seed, § 12 copy exclusions). Original method: `/home/user/scaffold/tmp/codex/flip-probe-brief.md`.
- **Inputs.** Shared names: the 192 shared utility names plus the `TAILWIND_CLASSES` members in `/home/user/veneer/app/browser/constants.ts`; `CLASS_NAMES.bootstrap.components` from the same source. Lifted sheet: `/home/user/veneer/dist/src/bootstrap/index.css`. Served page: `/home/user/veneer/dist/app/browser` (read as served). Recipe candidates: `/home/user/veneer/app/browser/recipe.json`.
- **Host.** Linux. Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Chromium: `chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })`; record `browser.version()`. Playwright, sass, tailwindcss from `/home/user/veneer/node_modules`. Loopback `node:http` server on port 0. No network.
- **Law.** Scripts are TypeScript run by `node path/file.ts`; no `any`, no `as`, no `!`, no `@ts-*`; add no package; import nothing from the checkout source trees. Report prose: plain, lead with the finding, numbers only with their run.

## Scope

- **Owned.** `/home/user/veneer/tmp/probes/flip4/**` (create).
- **Off-limits.** Every other file. Write no tracked file. Run no npm script. Never rebuild `dist/`. No install, commit, push, credential, destructive command, `git stash/add/reset/checkout`, or tree-wide mutating gate. `flip-sheet`'s edits may appear in `git status --porcelain`; list them, change none.

## Changes from probe-2 (exactly these)

1. **Attribution kind `resolved`.** Rank order: `utility`, `resolved`, `preflight`, then `inherited`, else `unattributed`. A departure is `resolved` when a Bootstrap rule that is not withheld matches the element (or the element with the pseudo-element for a pseudo reading) and declares the longhand. A Bootstrap rule that is not withheld is any rule of the tuned sheet in the `bootstrap` layer or unlayered, read from the recipe's CSSOM; shorthands expand to longhands as in probe-2. The declaration is the same under both faces, so the change is a resolved-value consequence of other changes (a percentage `margin-left` of `.offset-1` in a narrower row, `margin-right: -100%` of `.carousel-item`, the `auto` margins of `.modal-dialog` and `.btn-close`, the `padding-top` of `.ratio::before`, a hovered `.btn-secondary` background). `preflight` then fires only when a `base` rule declares the longhand and no non-withheld Bootstrap rule matching the element does. Report the count of departures `resolved` absorbs per condition.
2. **Widened component elements.** An element is a component element when it carries a `CLASS_NAMES.bootstrap.components` name, or is matched by a selector of a lifted-sheet rule whose selector text carries a `.NAME` compound for a component name on an ancestor position (a bare `td` matched by `.table > :not(caption) > * > *`, a bare `li` matched by `.dropdown-menu li`, a bare `svg` matched by `.icon-link > .bi` only if the svg carries `.bi`). Read the selector set once from `/home/user/veneer/dist/src/bootstrap/index.css` in CSSOM: every style rule whose selector list contains a compound with a component class that is not the last compound. Test `Element.matches` per element against that list. Report how many elements the widening adds per condition and which component roots they sit under.
3. **Row form `scoped`.** For a `preflight` departure on a widened component element that carries no component class, the row names the nearest ancestor component root class and the element's tag as `.ROOT TAG` (the `.table` root with `thead`, `tbody`, `tfoot`, `tr`, `td`, `th` for the border rows is the expected case). The fixed point adds, for a reboot row on the tag, the reboot declarations under the selector `.ROOT TAG` inside the `bootstrap` layer after the reboot; for a longhand the reboot never declares, a restore row `.ROOT TAG { L: revert }`. Patch the flip4 Sass copy: a `$scoped` map from root class to tag list, emitted by a `scope` mixin inside `bootstrap` after the restore rows, copying each reboot rule whose selector names the tag. Keep the `reboot` and `restore` forms of probe-2 for elements that carry a component class.

Everything else stays as probe-2 did it: the corrected `utility` rule with the withheld Bootstrap rule's longhands, the empty seed, the `curate` exclusions, the exclusions list, the three-iteration bound (recompile the flip4 Sass copy to `sheets/tuned.iN.css` and the recipe to `sheets/recipe.iN.css` each iteration), the 14 conditions at 1280 and 390 in light and dark with the open states, and the two byte-identical runs.

## Outputs

- `tmp/probes/flip4/out/p3.json` (stable key order, no timestamps or durations).
- `tmp/probes/flip4/curation.json`: rows with form `reboot`, `restore`, or `scoped`, class or selector, longhands, witness markup, A, F, iteration.
- `tmp/probes/flip4/report.md`: the derived table beside the verdict § 4 seed, each row marked reproduced, outside the seed, or seed not reproduced; the residual `preflight` and `unattributed` groups after the last iteration grouped by (classes, tag, pseudo, longhand, A, F) with counts; per-iteration attribution counts including `resolved`; the widening counts; the Chromium version; durations; two-run byte identity of `p3.json` (run `p3.ts` twice, `cmp`); `git status --porcelain` (expected to show `flip-sheet`'s edits; list them, change none).
- Expected derived rows: typography (`card-title`, `offcanvas-title`, `modal-title`, `popover-header`, `accordion-header` with the `accordion-button` restore); paragraph and list margins (`card-text`, `lead`, `display-1` to `display-5`, `placeholder-glow`, `list-unstyled`, `pagination`); links (`alert-link`, `card-link`, `icon-link`, `icon-link-hover`, `stretched-link`, `visually-hidden-focusable`, `nav-link`, `focus-ring*`, `link-*`); tables (`table-active`, `table-group-divider`, the scoped `.table` cells); images (`svg:where(.bi)`, `img:where(.figure-img)`, `img:where(.img-fluid)`, `img:where(.card-img*)`); input color rows. Report every row outside that list.

## Acceptance criteria (cheap first)

1. `node tmp/probes/flip4/p3.ts` exits 0 twice with byte-identical `out/p3.json`.
2. `report.md` and `curation.json` exist.
3. No tracked file changed by this unit.

Observations, not criteria: the residual counts and the row list.

## Return shape

Final message: finding first (residual `preflight` and `unattributed` counts against probe-2's 184 and 272, counts absorbed by `resolved`, widening counts, rows reproduced, outside the seed, not reproduced, copy count), paths of `report.md` and `curation.json`, byte-identity result, and anything not run with the exact error. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); Chromium cannot launch from the pinned path; a write outside `tmp/probes/flip4/` would be needed. Settle ancillary choices yourself and record them in the report.
