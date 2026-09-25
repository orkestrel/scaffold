# TOKEN-PROOFS audit round 5 — claims

Subject: TOKEN-PROOFS round 6 in `/home/user/veneer-tkp` (branch `unit/tkp`, uncommitted over Veneer `2376710`), briefed
by `token-proofs-brief-6.md`, which carries the text the Orchestrator ruled in `tkp-audit-4-verdict.md`. Written by
`opus` on Opus 5.5 and reported in `token-proofs-report-6.md`. Items 1 to 3 are the Orchestrator's writing, so this
round audits their truth as well as the new assertion. Evidence: `tkp-6.diff` (`git diff 2376710`), `tkp-6-status.txt`,
and `tkp-instruments/r6/` (this round's own diff `tkp-6-delta.diff`, the scope instruments and logs, the plant and gate
drivers, and the logs). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill
only when the failing case's message names an assertion failure. Rule every claim.

1. **Verbatim.** § Customization's opening paragraph and the list's first and second items equal the brief's Items 1 to
   3 byte for byte, and `tkp-6-delta.diff` changes nothing else in the guide except the § Color modes sentence Item 5
   names.
2. **The placement text.** The opening paragraph and the list's first and second items are true of CSS custom
   properties and of the built cascade, including where the root element itself carries `data-bs-theme`, and no
   shipped rule is a counterexample.
3. **The root-with-mode assertion.** In the scope case, with `data-bs-theme="light"` and an override of
   `--vn-radius-base` on `document.documentElement`, a child reads `--bs-border-radius` as the override value, after a
   guard that it reads the rest value first; the plant in `tkp-6-plant-root-mode.log.txt` freezes
   `--bs-border-radius` on `:root[data-bs-theme]` and fails that assertion with an `AssertionError` while every earlier
   assertion holds; the restore is byte-identical; and the `finally` block removes the attribute and the property.
4. **The § Color modes sentence.** Its names — `--vn-state-hover`, `--vn-state-active`, `--vn-state-stripe`,
   `--vn-focus-highlight`, `--vn-focus-reset`, and `--bs-heading-color` — are exactly the names each mode scope in the
   built `dist/src/styles/index.css` declares again with the value the `:root` selector gives them, and its claim that
   an island below the root inherits every other unchanged name from the `:root` selector holds.
5. **The fourth item and the rest of the prose.** The list's fourth item ("An override of a `--bs-*` alias works the
   same way …") is false where the root element carries the mode, as the unit's probe (`tkp-6-alias-probe.log.txt`)
   reads, and the unit's returned patch, which inserts "below the root" after "`[data-bs-theme]` element", makes it
   true. No other sentence in § Customization, § Color modes, or the header comment of `describe('ancestor token
   overrides')` in `tests/src/styles/tokens.test.ts` states a mode-scope exception that the same edge makes false.
6. **Titles and writing.** The scope case's title and the comment above it state what the case proves. The edited
   prose follows every code token with a noun, uses no term the substitution table in `.claude/rules/writing.md` bans,
   and states no count.
7. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check, the styles build, the tokens file (46 passed), and
   `npm run test:guides` exit 0 in `tkp-instruments/r6/`; `npm run test:policy` exits 0 on its third reading after two
   readings timed out at load near 22, and the landing chain takes the deciding reading.
