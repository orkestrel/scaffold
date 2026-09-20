# U3 audit round 1 — checker brief (native Sonnet)

Retained after the fact on 2026-09-20: this is the dispatch text as sent through the harness's
Agent tool, written to disk on the Orchestrator's own retention audit. The lane's report is
`u3-audit-checker-report.md`; the claims file is `../u3-audit-claims.md`.

---

Role `checker` on native Sonnet (clean context). You produce mechanical conformance evidence for
unit U3 of the Veneer campaign, which Opus wrote in the Veneer checkout
`C:/Users/mikes/WebstormProjects/veneer` (HEAD `b661142` plus the uncommitted U3 diff). Perform
the assignment directly and spawn nothing. You edit nothing; you have no write tools. Run nothing
that writes.

Read first: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/documentation.md`, `styles.md`,
`writing.md`. Then the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims.md`,
the diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-diff.patch.txt`, and the report
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-report.md`.

Check mechanically, reading the live files, and report each with the exact evidence:

A. Claim 1: in `src/core/constants.ts`, walk `TOKEN_NAMES` by reading the file and confirm every
   leaf string equals `--vn-` + its key path joined by `-` (list every leaf that does not);
   confirm every object literal is wrapped in `Object.freeze(` and ends `as const`; quote
   `src/core/index.ts` in full. In `src/core/types.ts`, quote the three type declarations.
B. Claim 5: count the `--bs-` custom properties declared in the built `dist/src/styles/index.css`
   inside the `:root` rule and inside the `[data-bs-theme="dark"]` rule (read the file; report the
   counts), and compare with the number of `root` keys and `dark` keys in
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.json`; list any
   `--bs-` name in the inventory absent from the matching scope of the built file, and any `--bs-`
   name in the built dark scope absent from the inventory's dark keys that is not one of
   `THEME_DARK_ADDITIONS` in `tests/setupStyles.ts` (quote that constant).
C. Claim 6: `grep -n` the shipped `dist/src/styles/index.css` for the physical inline-axis
   properties `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left`,
   `border-right`, `left:`, `right:`, `text-align: left`, `text-align: right`, `float:`, `clear:`
   and report every hit; `cmp dist/src/styles/index.css dist/src/styles/index.rtl.css` and report
   the result.
D. Claim 8: `grep -n "PLANT-\|vn-ghost\|h1 + p\|margin-left\|addEventListener" ` over `src/` and
   `tests/src/` and report every hit.
E. Claim 12: in `guides/veneer.md` quote the `Surface` rows for `TOKEN_NAMES`, `TokenLeaf`,
   `TokenMap`, `TokenName` and compare each `Summary` cell with the TSDoc description paragraph in
   the source (equal or not, quoting both when they differ); quote the `## Tests` link to the core
   proof; quote the `## Showcase` paragraph and state whether each sentence is true of the built
   cascade (tokens present, aliases present, document and body baseline present, no component
   treatments); in `guides/README.md` quote the `src/styles` row of `## By directory` and the
   paragraph naming `tokens.md`; in `README.md` quote the sentence naming the token reference; in
   `guides/tokens.md` list the H2 headings and confirm a `css` fence exists under the
   customization recipe heading and that `tests/src/styles/integration.test.ts` carries the same
   declarations (quote the fence and the case's stylesheet string).
F. Claim 13: search `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides/*.md`
   for each of `TOKEN_NAMES`, `TokenLeaf`, `TokenMap`, `TokenName`, `BOOTSTRAP_ROOT_VARIABLES`,
   `BOOTSTRAP_DARK_VARIABLES`, `THEME_DARK_ADDITIONS`, `CALIBRATED_TIERS`, `MANDATED_TAG_PAIRS`,
   `collectNestedRules`, `collectScopeProperties`, `collectTokenNames`, `extractSelectorTags`,
   `matchesLooseTagPair`, `normalizeSelectorText`, `normalizeValueToken`, `readCascadeSheet`,
   `readPaintedColor` and report the hit count per name.
G. Claim 14: from `git status --porcelain` in the checkout (read-only), list every changed and
   untracked path and confirm each is in the owned list of the brief
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief.md` § Scope or is one
   of the three integrated patch sites (`tests/distribution.test.ts`, `guides/veneer.md`,
   `configs/src/vite.styles.config.ts`); search the diff's added TypeScript lines for ` as `
   (excluding `as const`), `!.`, `!)`, `: any`, `@ts-`, `eslint-disable`, and report every hit.
H. Writing sweep: search the added lines of `guides/tokens.md`, `guides/veneer.md`,
   `guides/README.md`, `README.md`, and the added TSDoc in `src/core/*.ts` and
   `tests/setupStyles.ts` for the banned terms in `.claude/rules/writing.md` § Substitutions
   (`should`, `simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`,
   `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`)
   case-insensitively and report each hit with its line, ruling the sense-dependent rows (`now`,
   `new`, `once`, `since`, `above`, `below`) yourself. Also report every count phrase in that
   prose (a numeral or number word answering "how many" about rules, rows, tokens, tests, or
   files), since `AGENTS.md` § Writing forbids counts.

Output: one section per check A to H with the evidence quoted, each ending in `PASS` or `FAIL`
with the reason; no process diary; no verdict beyond those readings.
