# U1-conform audit round 2 — numbered claims (both lanes and the checker)

Subject: the U1-conform working tree in `C:/Users/mikes/WebstormProjects/veneer` on `d8b0e65`
after briefs 2 and 3 (`.orkestrel/veneer/units/u1-conform-brief-2.md`, report
`units/u1-conform-report-2.md`; `units/u1-conform-brief-3.md`, report `units/u1-conform-report-3.md`),
on top of the round-1 tree that `u1-conform-audit-verdict.md` ruled on. Native Opus 5 wrote both
briefs, so the `analyst` on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the
SUBJECTIVE lane and is told its engine wrote the work. This file alone fixes the claim numbers.
The Orchestrator rendered the diff over `d8b0e65` including every added file at
`units/u1-conform-diff-2.patch.txt` and the status at `tmp/audit/u1-conform-status-2.txt`. Rule on
every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line`
or exact text); read the rendered diff and the live files, never the reports alone. Round 1
confirmed everything outside the files briefs 2 and 3 own (`app/browser/styles/_shell.scss`,
`app/browser/styles/index.scss`, `guides/veneer.md`, `tests/guides.test.ts`,
`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupConformance.ts`,
`tests/setupConformance.test.ts`); re-read other sites only where a claim names them. Law:
scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `typescript.md`, `names.md`,
`documentation.md`, `writing.md`, read from `C:/Users/mikes/WebstormProjects/scaffold`.

1. **The shell stylesheet.** `app/browser/styles/index.scss` is a comment and `@use 'shell'`, with
   no `sass:meta`, no `meta.load-css`, and no order statement; `_shell.scss` opens with
   `@layer shell;`, wraps its `:root` `color-scheme` rules in `@layer shell { … }`, carries no
   `body` rule, and its comment states in the present tense what the shell owns; that is the
   shape `styles.md` § Centralized files fixes (the barrel loads partials with `@use`; the order
   is the first statement of the first-loaded partial, as `src/styles/_tokens.scss` line 3 does);
   the compiled entry opens with `@layer shell;` ahead of the block (report 2's `sass` reading),
   and the built app bundle's only `body` rule is the published `elements` one.
2. **The mount.** `mountShowcase` in `tests/setupBrowser.ts` loads `../src/styles/index.scss` and
   then `../app/browser/styles/index.scss`, the order `app/browser/main.ts` loads them; the body
   in the showcase proofs paints from `--vn-surface-body-base` and `--vn-text-body-base` (report
   2's before-and-after readings: light `rgb(255, 255, 255)` / `oklch(0.208 0.042 265.755)`, dark
   `oklch(0.21 0.013 256)` / `oklch(0.929 0.013 255.508)`); every journey and app assertion keeps
   its meaning and passes.
3. **The guide.** The `## Showcase` sentence in `guides/veneer.md` reads that the shell is
   framework-free by design, so the showcase drives the published cascade and the published engine
   with no framework between them and what renders, while scaffold mandates the Vue toolchain for
   an `app/browser` environment; that is what the tree does after claim 2; `## Tests` links
   `tests/app/browser/Showcase.test.ts` beside the journey; the `it` title in `tests/guides.test.ts`
   is `executes the color-mode guard example verdicts`; every changed sentence sweeps clean under
   `writing.md`; `test:guides` is green.
4. **The extractor.** `tests/setupConformance.ts` exports `extractStringArgument(node:
   ESTree.Argument): string | undefined`, returning a `Literal` string, a substitution-free
   `TemplateLiteral`'s cooked text, and `undefined` otherwise; the `ImportExpression` and the
   `require` `CallExpression` branches of `extractSpecifiers` both read through it; executed:
   ``extractSpecifiers('require(`bootstrap`)')`` is `['bootstrap']`, ``require(`${name}`)`` and
   `require(name)` extract nothing, `import(`./literal.js`)` still extracts; the helper is in the
   export inventory and has a direct case over parser-built nodes; report 2 records the case red
   (`1 failed | 82 passed`) before the change and green (`84 passed`) after; the doc blocks
   describe the reading.
5. **The readers.** `readCascadeSheet(sheets: Iterable<CSSStyleSheet> = document.styleSheets)`
   and `collectLayer(name: string, sheets: Iterable<CSSStyleSheet> = document.styleSheets)` in
   `tests/setupBrowser.ts` keep their names, return shapes, and error text; nothing new is
   exported from that module; every production caller (`tests/src/styles/index.test.ts` lines 8,
   24, 29; `tests/src/styles/tokens.test.ts` lines 31, 51) is unchanged and green; in
   `tests/setupBrowser.test.ts` the probe-cascade cases pass their sheets, the case
   `walks the document by default …` mounts the showcase itself, loads the probe afterwards, and
   asserts the no-argument reading selects a sheet that is not the probe and declares a `theme`
   layer, and report 3 records that planting `[]` as both defaults reddens that case alone; the
   refusal case loads the probe beside the plain sheet, hands the readers the plain sheet alone,
   and asserts `readRules()` reports an `elements` layer (its inverted control, report 3
   deviation 1, carrying its own premise); the two `mountShowcase` cases sit where they were.
6. **Law over the diff.** Across the eight files briefs 2 and 3 own: no `any`, non-null
   assertion, type assertion, `@ts-` directive, `eslint-disable`, default export, or nested
   function; `Array<string | undefined>` for the non-simple element type; every doc block and
   comment sweeps clean under `writing.md`; the `@throws` line of `collectLayer` names `sheets`
   while the thrown text names the document (report 3 deviation 4, recorded, no change).
7. **Scope honesty.** `tmp/audit/u1-conform-status-2.txt` equals the round-1 status plus one row,
   `M tests/setupBrowser.test.ts`; the blob pairs that differ from `units/u1-conform-diff.patch.txt`
   are exactly the eight owned files.
8. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:distribution` green; `test:src`, `test:app`, `test:src:styles`,
   and `test:setup:browser` exit 0 on Edge; `scaffold audit` exits 0 with the `setup` question for
   `tests/setupListeners.ts` and the three advisory dependency lines alone.
