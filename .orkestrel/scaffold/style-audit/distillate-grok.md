1. New (ranked by effect on report/guide/TSDoc quality)

1. When stating an obligation, use `must` (required), an imperative (required), `can` (optional/ability), or `might` (possible); never `should`. (`prescriptive-documentation.txt`, `word-list.txt`) A report that says “you should run lint” leaves the developer unsure whether the gate is required.
2. Name the actor: address the developer as `you`; use third person for what the software or an end user does; never `let's`. (`person.txt`, `pronouns.txt`, `tone.txt`) Stops “we created a bucket” / “the user then…” from hiding who acts.
3. Put the condition, goal, or location before the imperative so a non-matching reader can skip. (`sentence-structure.txt`, `procedures.txt`, `highlights.txt`) “To restore the fixture, run …” not “Run … if you want to restore.”
4. State required facts in the main sentence flow; do not park them in parentheses, notes, or asides. (`parentheses.txt`, `notices.txt`) A Caution box after the step is how a skipped warning becomes a broken run.
5. In running text, put a code item in backticks and follow it with a noun (`the `parse` method`); do not inflect or pluralize the code token. (`code-in-text.txt`, `pluralization.txt`, `possessives.txt`) “Call `close`s” and bare `` `src/index.ts` `` without “file” both misparse.
6. Claim only what the cited run or contract can still be true later; never `simply`, `easy`, `quickly`, `just`, `ensure`, `guarantee`, or a superlative. (`excessive-claims.txt`, `tone.txt`, `word-list.txt`) “This ensures isolation” over-claims; “`app/core` has no Node globals” is checkable.
7. Write present tense about what exists now; do not document unshipped features or use `will`/`currently`/`now`/`new` as the claim. (`tense.txt`, `timeless-documentation.txt`, `future.txt`) “X will support Y” in a guide ages into a lie.
8. Link with the destination title or a unique descriptive phrase; never `click here`; put a one-line definition on the page when a hop is avoidable; `see` is the cross-reference verb. (`cross-references.txt`, `accessibility.txt`, `word-list.txt`) “See `tests.md` § Browser tests” survives a screen-reader scan; “here” does not.
9. Recommend one path (shortest, keyboard-reachable) instead of a menu of equivalent options. (`prescriptive-documentation.txt`, `procedures.txt`) A report that lists three ways to run the gate forces the developer to choose without a ruling.
10. Keep helper words: articles (`a`/`the`), `that`, and `if … then`; do not drop them for brevity. (`articles.txt`, `pronouns.txt`, `translation.txt`, `word-list.txt`) “Create VM instance” and “the link you want” cost a parse the developer should not pay.
11. Do not attribute human perception or speech to software (`sees`, `tells`, `wants`). (`anthropomorphism.txt`, `inclusive-documentation.txt`) “The parser detects …” not “the parser knows …”.
12. Refer to earlier/later material with `preceding`/`following`, never `above`/`below` or other directional UI language. (`accessibility.txt`, `word-list.txt`) Chat that says “see above” fails when the transcript is searched or read out of order.
13. Introduce a code fence with a sentence that names what the sample does; mark omissions with a language comment, not `...`. (`code-samples.txt`, `code-syntax.txt`, `placeholders.txt`) A naked fence forces the developer to reverse-engineer the point.
14. In TSDoc and API blurbs, the first sentence states what the symbol does (`Creates…`, `Returns…`), not what the reader should do; document defaults, missing-dependency behavior, and the replacement on deprecation. (`api-reference-comments.txt`, `reference-verbs.txt`) Matches generated reference skim; “Create a task” reads as a how-to in the wrong slot.
15. Do not write `please` in instructions. (`tone.txt`, `word-list.txt`) Politeness padding in a procedure looks like an optional courtesy, not a step.

2. Already ours (Google home → our home)

- Active voice, name the doer: `voice.txt` → `AGENTS.md` Writing “active voice”.
- Lead with the important fact: `paragraph-structure.txt` → `AGENTS.md` “Lead with the decision or the finding.”
- One idea, short sentences, no walls of text: `paragraph-structure.txt`, `accessibility.txt`, `translation.txt` → `AGENTS.md` “One idea per sentence. Keep sentences short.”
- No metaphors, idioms, flourish, slang, or humor: `tone.txt`, `inclusive-documentation.txt`, `translation.txt` → `AGENTS.md` “Do not write aphorisms, metaphors, or rhetorical flourish.”
- Prefer the short common word (`use` not `utilize`): `translation.txt`, `jargon.txt` → `AGENTS.md` “Do not use a long or technical word where a short common one works.”
- Replace evaluative mush with a testable condition: `excessive-claims.txt`, `word-list.txt` (`simple`/`easy`) → `AGENTS.md` “Write requirements so they are specific and testable.”
- Imperative for instructions: `person.txt`, `procedures.txt` → `AGENTS.md` “imperative for instructions.”
- One concept, one term; define jargon on first use: `translation.txt`, `jargon.txt` → `AGENTS.md` Design law “One concept, one term.”
- Do not document speculative future behavior: `future.txt` → `.claude/rules/typescript.md` TSDoc “Do not document speculative future product behavior unless requested.”
- Backticked names must be real exports: `code-in-text.txt` (code font for APIs) → `.claude/rules/documentation.md` “Every backticked API in a guide resolves to a real public export.”
- Falsify a prose claim the way you falsify code: not in Google; already `.claude/rules/documentation.md`.
- Never claim a gate passed unread: not in Google; already `AGENTS.md` Communication.

3. Conflicts (position)

- Conversational “knowledgeable friend” / “let personality shine” (`tone.txt`) vs `AGENTS.md` ban on flourish and instruction-file persuasion. Keep ours. Developer-facing prose stays plain and direct; do not add warmth, wit, or persona.
- Condition-before-instruction (`sentence-structure.txt`) vs lead-with-finding (`AGENTS.md`). Not a contradiction if scoped: a report opens with the finding; a skippable step opens with the condition.
- Recommended contractions (`contractions.txt`) vs silent `AGENTS.md`. Adopt two-word negation contractions (`don't`, `isn't`) in chat, guides, TSDoc, commits; keep instruction files as written (directives, not chat).
- “We recommend …” (`prescriptive-documentation.txt`) vs lead with the decision. In reports, state the recommendation as the finding (“Use X. Cost: Y.”), not a hedged “we recommend.”
- Second-person `you` (`person.txt`) vs bare imperative in instruction files. `you` for developer-facing output; instruction files stay trigger+action with no audience padding.
- Google 2-space / 80-col sample formatting (`code-samples.txt`, `html-formatting.txt`) vs project tabs and TypeScript rules. Keep project source law; Google’s wrap/indent is publishing chrome.
- “Break any of these rules sooner than say anything outright barbarous” (`index.txt`) vs `AGENTS.md` instruction-file law. Do not import a license to freelance. Clarity is already the writing law; exceptions are not a directive.
- Serial comma / US spelling / straight quotes (`commas.txt`, `quotation-marks.txt`, redirect of `spelling.txt`) vs no house dictionary here. Adopt serial comma only where omission can change meaning; do not add a dictionary instruction. `spelling.txt` failed to capture (redirects to `/style/word-list`).

4. Reject (publishing mechanics, no analog in agent-to-developer output)

- `html-formatting.txt`, `semantic-tagging.txt`: HTML/CSS indent, optional elements, `em` vs `i`.
- `images.txt`, `accessibility.txt` (alt, SVG, captions, `srcset`, flashing media): image-pipeline mechanics.
- `headings-targets.txt`: HTML `id`/`section` anchors.
- `markdown.txt`: HTML vs Markdown as a CMS choice (this repo already writes Markdown).
- `phone-numbers.txt`, `units-of-measure.txt` (nonbreaking spaces), `mathematical-notation.txt` (HTML entities).
- `trademarks.txt`, `product-names.txt` (Google-brand title case, “never as a verb”).
- `other-sources.txt`: Google legal/copyright reprint policy.
- `whats-new.txt`, `philosophy.txt`, `index.txt`: their changelog, house-style manifesto, and Merriam-Webster/Chicago fallback hierarchy (our `AGENTS.md` is the authority).
- `filenames.txt` SEO hyphens, `tables.txt` HTML `th`/`scope`/`colspan`, `ui-elements.txt` `aria-label` on `>`, `footnotes.txt` page apparatus.
- Example-name/domain catalogs in `examples.txt` except the rule “no real PII in examples.”
- Click-to-copy optional-argument bracket rules in `code-syntax.txt`.
- 12-hour clock and season bans in `dates-times.txt` as standalone date policy (ISO dates in commits/reports are enough).

5. Word-list verdict

Do not adopt the list. It is a publishing glossary (Cloud/Android UI verbs, inclusive substitutions, hyphenation trivia). Three clusters are worth instruction lines, and they are already in §1: obligation verbs (`should`/`can`/`must`/`will`); filler/hype (`please`, `just`, `simply`, `easy`, `lets`/`let's`, `currently`, `via`, `leverage`, `utilize`, `performant`, `allows you to`); ambiguous conjunctions (`since`→`because`, `once`→`after`, `while`→`although` for contrast). Keep `see` for links. Do not add `dummy`, `first-class`, or `native` as standalone bans; they fall under jargon/precision. One extra word-level line is not worth it beyond those clusters.
