# TOKEN-PROOFS audit round 4 — claims

Subject: TOKEN-PROOFS round 5 in `/home/user/veneer-tkp` (branch `unit/tkp`, uncommitted over Veneer `2376710`),
briefed by `token-proofs-brief-5.md`, which carries the text the Orchestrator re-ruled in `tkp-audit-3-verdict.md`.
Written by `opus` on Opus 5.5 and reported in `token-proofs-report-5.md`. The paragraph and the header comment are the
Orchestrator's writing, so this round audits their truth as well as the new assertions. Evidence: `tkp-5.diff`
(`git diff 2376710`), `tkp-5-status.txt`, and `tkp-instruments/r5/` (this round's own diff `tkp-5-delta.diff`, the plant
and gate drivers, and the logs). The brief quoted the link case's title wrongly; the case is the one titled "repaints a
link and a link button inside an ancestor that overrides the link color, ..." around line 697. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names an
assertion failure. Rule every claim.

1. **Verbatim.** § Customization's opening paragraph and list, and the block header comment in
   `tests/src/styles/tokens.test.ts`, equal the brief's Items 1 and 2 byte for byte, and `tkp-5-delta.diff` changes
   nothing else in the guide.
2. **The mechanism sentence.** "Each custom property resolves on the element whose rule declares it, from the values
   that element inherits, and a descendant inherits the resolved value. An override therefore reaches every
   declaration that reads the token on its own element or inside it, and no declaration on an element above it; an
   element inside it that declares the token again gives its own subtree that value." is true of CSS custom properties
   and of the built cascade, and no counterexample exists among the shipped rules.
3. **Each placement item.** Each of the four list items is true of the built cascade and follows from the mechanism
   sentence; each item's behaviour is executed by a case in `describe('ancestor token overrides')`: the `:root` item and
   its exception by the scope case's document-element override and held island; the `[data-bs-theme]` item by the scope
   case and the form placement case; the any-other-element item by the consumer cases, including the disabled-button
   opacity case whose component alias is declared on `.btn`, and by the plain placement case's held aliases; the alias
   item and its exception by the alias case and its nested mode-scope assertion.
4. **The nested assertions.** The link case's nested anchor and the alias case's nested control and feedback each read
   the value a light mode scope outside the override reads, after a guard that the mode value is not the override; each
   plant (`tkp-5-plant-link-nested.log.txt`, `tkp-5-plant-alias-nested-border.log.txt`,
   `tkp-5-plant-alias-nested-feedback.log.txt`) makes the mode scope inherit the name and fails at its nested assertion
   with an `AssertionError` while every earlier assertion holds; each restore is byte-identical.
5. **The header comment.** Every sentence of the block header is true of every case in the block: the consumer cases'
   ancestors (plain for a rule or component alias that reads the token, a mode scope for the validation rules), the
   twin order, the placement cases, the scope case, and the reduced motion.
6. **Titles and writing.** Each retitled case states what it proves. The paragraph follows every code token with a
   noun, uses no term the substitution table in `.claude/rules/writing.md` bans, and states no count.
7. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check, the styles build, the tokens file (46 passed),
   `npm run test:guides`, and `npm run test:policy` exit 0 in `tkp-instruments/r5/`.
