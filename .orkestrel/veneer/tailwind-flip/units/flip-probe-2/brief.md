# Unit flip-probe-2 — P3 re-run with corrected attribution

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`. You are the sole writer under `/home/user/veneer/tmp/probes/flip3/`. Another unit, `flip-sheet`, edits `src/` and `tests/` in the same checkout at the same time; its changes are not yours.

## Objective

Re-run probe P3 of U1 (the curation fixed point) with a corrected attribution, from a copy of U1's code in `/home/user/veneer/tmp/probes/flip3/`. Write `out/p3.json`, `curation.json`, and `report.md` there. Expected: the residual `preflight` count on component-class elements falls from U1's 15198 (1280 light closed) to a small residual the report lists in full; the derived rows are a subset of the verdict § 4 seed plus a short list the report names.

## Context

- **U1 code and result (read-only).** `/home/user/veneer/tmp/probes/flip2/`: `p3.ts`, `lib.ts`, `browser.ts`, `declarations.ts`, `types.ts`, the Sass copy under `sass/`, the served-page method; report `/home/user/veneer/tmp/probes/flip2/report.md` § P3; output `/home/user/veneer/tmp/probes/flip2/out/p3.json`. Copy into `tmp/probes/flip3/`; never edit flip2.
- **Evidence.** `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md` (R5 as corrected, § 4 seed, § 12 copy exclusions). Original unit brief with host method: `/home/user/scaffold/tmp/codex/flip-probe-brief.md` (§ Context, P3 text).
- **Inputs.** Shared names: the 192 shared utility names plus the `TAILWIND_CLASSES` members in `/home/user/veneer/app/browser/constants.ts`. Lifted sheet: `/home/user/veneer/dist/src/bootstrap/index.css`. Served page: `/home/user/veneer/dist/app/browser` (read as served). Recipe candidates: `/home/user/veneer/app/browser/recipe.json`.
- **Host.** Linux. Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Chromium: `chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })`; record `browser.version()`. Playwright, sass, tailwindcss from `/home/user/veneer/node_modules`. Loopback `node:http` server on port 0. Sandbox `danger-full-access`. No network. A nested `git` may report "not a git repository": do not diagnose; your own `git status --porcelain` is the authority.
- **Law.** Scripts are TypeScript run by `node path/file.ts`; no `any`, no `as`, no `!`, no `@ts-*`; add no package; import nothing from the checkout source trees. Report prose: plain, lead with the finding, numbers only with their run.

## Scope

- **Owned.** `/home/user/veneer/tmp/probes/flip3/**` (create).
- **Off-limits.** Every other file. Write no tracked file. Run no npm script. Never rebuild `dist/`. No install, commit, push, credential, destructive command, `git stash/add/reset/checkout`, or tree-wide mutating gate. Read `/home/user/veneer/dist/app/browser` as served. `flip-sheet`'s edits may appear in `git status --porcelain`; report them and change none.

## Changes from U1 (exactly these)

1. **Attribution order and `utility` rule.** A departure on an element is, in order:
   - `utility`: the element carries one of the 192 shared utility names (or a `TAILWIND_CLASSES` member) and either Tailwind's exact `.NAME` rule inside the recipe's `utilities` layer declares the longhand, or Bootstrap's withheld exact `.NAME` rule declares it. Read the withheld rule's longhands from `/home/user/veneer/dist/src/bootstrap/index.css` by parsing its `.NAME` rules in CSSOM and expanding shorthands to longhands: `border` declares every `border-*-width`, `border-*-style`, `border-*-color` longhand, logical aliases included; `border-radius` declares the four corner longhands and their logical aliases; `margin`, `padding`, `inset`, `gap` expand the same way. U1 read `span.border` losing `--bs-border-color` as `preflight`; under this rule it is `utility`.
   - then `preflight`: a `base` rule matches and declares the longhand;
   - then `inherited`: an inherited property with a departing ancestor;
   - else `unattributed`.
   - Exclusions stay as U1 applied them: layout-resolved fields, `tab-size`, 0px-width border styles, `list-style-*` off a list-item, the `text-decoration` shorthand, `line-height` beside the element's own `font-size` departure.
2. **Seed.** Start the fixed point from empty `$curated` and `$restored` as U1 did. Do not seed `vertical-align` on `svg.bi`.
3. **Copy exclusions (verdict § 12).** In the flip3 Sass copy's `_mixins.scss`, `curate` must not copy a rule whose declarations are all `unlayer` importants (the datalist indicator rule) and must drop a compound carrying `:not([class])`. Record the resulting copy count.

Run at most 3 iterations; each iteration recompile the flip3 Sass copy to `sheets/tuned.iN.css` and the recipe to `sheets/recipe.iN.css`.

## Outputs

- `tmp/probes/flip3/out/p3.json` (stable key order, no timestamps or durations) and `tmp/probes/flip3/curation.json` in U1's shape (rows: form, class or selector, longhands, witness element markup, reading A, reading F, iteration), plus per-iteration attribution counts for every condition, and the residual `preflight` and `unattributed` departures on component-class elements after the last iteration grouped by (classes, tag, longhand, A, F) with counts.
- `tmp/probes/flip3/report.md`: table of rows (expected seed from verdict § 4 beside derived rows, each marked reproduced, outside the seed, or seed not reproduced); residual groups in full; iteration counts; Chromium version; durations; two-run byte identity of `p3.json` (run `p3.ts` twice, `cmp`); `git status --porcelain` (expected empty apart from `flip-sheet`'s own edits; list them, change none).

## Acceptance criteria (cheap first)

1. `node tmp/probes/flip3/p3.ts` exits 0 twice with byte-identical `out/p3.json`.
2. `report.md` and `curation.json` exist.
3. No tracked file changed by this unit.

Observations, not criteria: the residual counts and the row list.

## Return shape

Final message: finding first (residual `preflight` and `unattributed` counts against U1's 15198, rows reproduced, outside the seed, not reproduced, copy count), paths of `report.md` and `curation.json`, byte-identity result, and anything not run with the exact error. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); Chromium cannot launch from the pinned path; a write outside `tmp/probes/flip3/` would be needed. Settle ancillary choices yourself and record them in the report.
