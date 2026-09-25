# TOKEN-PROOFS audit round 6 — claims

Subject: TOKEN-PROOFS round 7 in `/home/user/veneer-tkp` (uncommitted over Veneer `2376710`, rounds 1 to 7), briefed by
`token-proofs-brief-7.md`, whose Items the Orchestrator ruled in `tkp-audit-5-verdict.md`. Written by `builder` on
Sonnet and reported in `token-proofs-report-7.md`. Evidence: `tkp-7.diff` (`git diff 2376710`), `tkp-7-status.txt`, and
`tkp-instruments/r7/` (this round's own diff `tkp-7-delta.diff`, the plant log, and the gate logs). All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim; for claim 1, compare words, not line wrapping.

1. **The Items.** The opening paragraph, the list's first and fourth items, and the two test comments read as Items 1
   to 5 give them, and `tkp-7-delta.diff` changes nothing else.
2. **Every stop is relative.** Every sentence in `guides/veneer.md` § Customization and § Color modes, and every comment
   and case title in `describe('ancestor token overrides')` of `tests/src/styles/tokens.test.ts`, that states where an
   override stops or what a mode scope keeps, is true of CSS custom properties and of the built cascade, for an override
   on any element, the root included, whether or not that element carries `data-bs-theme`, and whether the override is
   an unlayered rule or an inline declaration.
3. **The primary alias on a root that carries a mode.** With `data-bs-theme="light"` on `document.documentElement`,
   `#outside` reads `--bs-primary` at the light value, then at `rgb(4, 5, 6)` after the root override, while `#held`
   keeps the light value; the plant in `tkp-7-plant-root-primary.log.txt` fails the override assertion with an
   `AssertionError` while every earlier assertion holds; the restore is byte-identical; and `finally` removes the
   property and the attribute.
4. **The title.** The scope case's title states each state the case asserts.
5. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check, the styles build, the tokens file (46 passed), and
   `npm run test:guides` exit 0 in `tkp-instruments/r7/`, and `npm run test:policy` reads 109 passed and 1 skipped.
