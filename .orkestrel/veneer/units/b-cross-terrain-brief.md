# Terrain brief — B-CROSS (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `87ff1d0`; CLOSE-GUIDE has not landed, so `guides/veneer.md` will move after
this reading; cite every site by symbol or heading and give a line only as approximate). Perform
the reading directly and spawn nothing. Capture `git status --porcelain` before and after; any
change is a deviation. Return evidence with `file:line` pointers and no raw file dumps, no
decisions, no design, no edits. Never read `dist/`, `node_modules/bootstrap/dist/`, `tmp/`, or a
lockfile. Quote at most twelve lines per site. Your shell allows `ls` and `git status`; do not run
`git show`.

## Question

What does the cross-cutting family B-CROSS require, and what does each site say today? `ROADMAP.md`
§ The family queue assigns it `theme` and `transition`, the `media` conditions (the breakpoint
ramp, `prefers-reduced-motion`, and print), and `keyframes` as a group, with the right-to-left
mechanism and the `DOMContentLoaded` auto-initialization rows refused by the standing rulings.
The pinned inventory (`tests/fixtures/oracle/inventory.json`) records `theme` with 15 selectors and
`transition` with 7, and no `media`, `keyframes`, or `fade` key (the Orchestrator's reading on
2026-09-23): report where the inventory keeps media conditions and keyframes instead (each key's
`media` and `keyframes` fields, the `root`, `dark`, and `references` maps) and what "as a group"
can mean for a key the inventory does not carry.

## Evidence sought

A. **The oracle surface.** From `node_modules/bootstrap/scss/` `_root.scss` (the `:root` and
   `[data-bs-theme="dark"]` custom-property blocks; list every `--bs-*` name by group),
   `_variables-dark.scss`, `_maps.scss` (the theme maps), `_transitions.scss` (`.fade`,
   `.collapse`, `.collapsing`), `mixins/_transition.scss`, `mixins/_breakpoints.scss`
   (`media-breakpoint-up`, `-down`, `-between`, `-only`, the infix rule), `mixins/_color-mode.scss`,
   `_utilities.scss` print handling and `utilities/_api.scss`'s print loop, and every `@keyframes`
   in the release SCSS (grep `@keyframes` under `node_modules/bootstrap/scss/`): which component
   declares each and whether it sits under a reduced-motion branch.
B. **What Veneer ships.** `src/styles/_tokens.scss`, `_theme.scss`, `_reset.scss`, `_mixins.scss`
   (`breakpoint-up`, `breakpoint-each`, `breakpoint-down`, `reduced-motion`, `transition`,
   `forced-colors`, `role-each`, `theme-tokens`, `breakpoints()`): what each emits, the
   `--vn-*` names and their `--bs-*` aliases, the `[data-bs-theme]` island mechanism F6 landed,
   the `$assets` and `$dark` maps, every `@keyframes` under `src/styles/`, every `@media print`,
   and the guide's `## Tokens` subsections `#### Motion, focus, validation, breakpoints, and
   stacking` and `### Bootstrap variables Veneer retains` (quote the headers and the rows a
   B-CROSS unit would close); the `theme` and `transition` rows in the guide's `## Compatibility`
   table and their proofs (`tests/src/styles/theme.test.ts`, `tokens.test.ts`, `mixins.test.ts`:
   name the cases).
C. **Accounting of conditions.** How `tests/setupServer.ts` compares an at-rule condition
   (`condition` on a departure, `readCascadeBlocks`, `collectValueGaps`, `collectAdditions`) and
   how `tests/setupStyles.ts` reads a media condition in a case table (`condition:` fields, the
   `REDUCED_MOTION` constant, `stageMedia`), so a B-CROSS unit knows what a media or keyframe
   obligation is proved by today.
D. **Rulings.** `ROADMAP.md` § Tenets and § Rulings paragraphs naming the theme, dark mode,
   islands, motion, print, breakpoints, right-to-left, or auto-initialization (quote); D5 and the
   `DOMContentLoaded` refusal; every § Carriers row naming B-CROSS, `theme`, `transition`, print,
   `keyframes`, or a breakpoint (quote whole); exit criterion items 2, 3, and 6; every decision in
   `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` naming the theme, islands,
   motion, print, or breakpoints (quote number and text).
E. **Sizing.** Line counts of each source in A and B.
F. **Files the family makes false.** The enumerating assertions over shipped keys and tokens
   (`tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/src/styles/tokens.test.ts`,
   `theme.test.ts`, the guide `### Files` table and `## Tokens` rows), each named with the
   assertion.

## Output

One distillate with a section per lettered item, each fact with a `file:line` pointer (line
approximate, symbol or heading named), contradictions called out, and a closing list of unresolved
inputs. No design, no recommendation, no edits.
