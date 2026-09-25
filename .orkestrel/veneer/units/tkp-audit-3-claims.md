# TOKEN-PROOFS audit round 3 — claims

Subject: TOKEN-PROOFS round 4 in `/home/user/veneer-tkp` (branch `unit/tkp`, uncommitted over Veneer `2376710`),
briefed by `token-proofs-brief-4.md`, which carries the text the Orchestrator ruled in `tkp-audit-2-verdict.md`.
Applied by `builder` on Sonnet and reported in `token-proofs-report-4.md`. The paragraph is the Orchestrator's own
writing, so this round audits its truth as well as its application. Evidence: `tkp-4.diff` (`git diff 2376710`),
`tkp-4-status.txt`, `tkp-3.diff` (round 3), and `tkp-instruments/r4/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Rule every claim.

1. **Verbatim.** Between `tkp-3.diff` and `tkp-4.diff`, `guides/veneer.md` changes only § Customization's opening
   paragraph and list, and `tests/src/styles/tokens.test.ts` changes only the comment above
   `describe('ancestor token overrides')` and the comment above the scope case, each to the brief's Items text.
2. **Direct readers.** Each rule the first list item names — the link colors and decoration, the button state mixes
   and the disabled button opacity, the heading weight, and the standard easing — reads a canonical token directly in
   `src/styles/`, and a case in `describe('ancestor token overrides')` overrides that token on a plain ancestor and
   reads the rule's consumer move. The item presents them as examples, and no sentence claims the list is complete.
3. **Tiers and aliases.** The second list item is true of the built cascade and of the executed cases: an override in a
   `:root` rule moves every derived tier and alias except inside a mode scope that declares the token again (the scope
   case and its held island); an override on a `[data-bs-theme]` element moves the tiers and aliases its mode scope
   derives from the token, which is what § Color modes states a mode scope declares (the scope case and the placement
   case); an override on any other element moves no tier and no alias (the placement case's plain ancestor). No
   sentence claims that a literal a mode scope selects, such as `--bs-btn-close-filter`, follows a token.
4. **Alias readers.** The third list item is true of the validation rules and is executed by the alias case.
5. **The comments.** The rewritten header comment describes every case in the block truthfully, and the rewritten
   scope-case comment names no set by its position.
6. **Writing.** The paragraph follows every code token with a noun, uses no term the substitution table in
   `.claude/rules/writing.md` bans, states no count, and makes a rule or an override the actor.
7. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check, the tokens file after `npm run build:src:styles`,
   `npm run test:guides`, and `npm run test:policy` exit 0 in `tkp-instruments/r4/`.
