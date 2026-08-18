## 1. New candidate directives

1. Address the developer as “you,” name the software or service as the actor for automated behavior, and use “user” only for someone who uses software the developer builds.  
   Sources: `person.txt`, `pronouns.txt`, `translation.txt`, `highlights.txt`.  
   Change: Reports assign each action and decision to an unambiguous actor.

2. When an instruction applies conditionally or serves a goal, state that condition or goal before the action, then state any result or justification after the action.  
   Sources: `sentence-structure.txt`, `procedures.txt`, `translation.txt`.  
   Change: Developers can skip irrelevant instructions and understand why each applicable action matters.

3. Use *must* for requirements, *can* for permission, ability, or options, and *might* for possible outcomes; replace ambiguous *should* with the intended force.  
   Sources: `prescriptive-documentation.txt`, `word-list.txt`.  
   Change: Reports distinguish obligations, recommendations, options, and uncertainty.

4. Keep each paragraph to one idea, place its critical information first, and split walls of text with descriptive headings or lists.  
   Sources: `paragraph-structure.txt`, `accessibility.txt`, `headings.txt`.  
   Change: Long reports remain scannable without losing detail.

5. When showing a command, give a runnable minimal form, explain every placeholder, and show output only when the developer needs it to verify the result or reuse a value.  
   Sources: `code-syntax.txt`, `placeholders.txt`, `code-samples.txt`.  
   Change: Command examples become executable evidence instead of illustrative fragments.

6. When applicable, make TSDoc state prerequisites, defaults, boolean meanings, failure or exception behavior, and the replacement for a deprecated API.  
   Sources: `api-reference-comments.txt`.  
   Change: TSDoc becomes an operational contract rather than a restatement of the signature.

7. Write a multi-step procedure as numbered actions, keep one primary action in each step, provide required preparation first, and prefer one shortest proven path.  
   Sources: `procedures.txt`, `prescriptive-documentation.txt`, `lists.txt`.  
   Change: Guides stop mixing alternatives, prerequisites, and actions in one sequence.

8. Replace an ambiguous pronoun with its noun, and add helper words such as *that*, *then*, or *of* when they make the relationship explicit.  
   Sources: `pronouns.txt`, `translation.txt`, `word-list.txt`.  
   Change: Reports no longer leave “it,” “this,” or a compressed clause open to competing readings.

9. Describe product behavior in present tense, and replace *new*, *current*, *latest*, or *soon* with a version, date, or enduring fact when time matters.  
   Sources: `tense.txt`, `timeless-documentation.txt`, `future.txt`, `word-list.txt`.  
   Change: Guides remain accurate after the surrounding release context disappears.

10. Use a conversational, friendly, and respectful tone without slang, forced humor, cuteness, hype, or needless formality.  
    Sources: `tone.txt`, `philosophy.txt`, `highlights.txt`.  
    Change: Replies can show personality while keeping the developer’s task central.

11. Replace ableist, gendered, graphic, or socially charged figurative terms with precise neutral terms, except when an exact code identifier must be named.  
    Sources: `inclusive-documentation.txt`, `anthropomorphism.txt`, `examples.txt`, `word-list.txt`.  
    Change: Reports become more precise and avoid making readers decode or absorb incidental stereotypes.

12. Use short descriptive link text that makes sense alone, link to the most relevant section, and provide brief local context when that saves the developer a trip.  
    Sources: `cross-references.txt`, `accessibility.txt`.  
    Change: Links explain their destination and purpose instead of interrupting the report with “here” or raw URLs.

13. Expand an abbreviation on first use when the audience might not know it, omit the abbreviation if it appears only once, and do not expand a familiar abbreviation when the expansion adds no meaning.  
    Sources: `abbreviations.txt`, `jargon.txt`, `translation.txt`.  
    Change: Replies define necessary vocabulary without burdening experts with ceremonial expansions.

14. Format literal identifiers, filenames, paths, commands, values, and output as code, preserve their exact spelling, and do not inflect them or use them as English verbs.  
    Sources: `code-in-text.txt`, `filenames.txt`, `possessives.txt`, `reference-verbs.txt`.  
    Change: Technical prose clearly separates exact syntax from the surrounding explanation.

15. Use fictional or reserved data in examples, remove personally identifiable information, and choose meaningful placeholders instead of real identities or `foo`, `bar`, and `baz`.  
    Sources: `examples.txt`, `placeholders.txt`, `images.txt`, `word-list.txt`.  
    Change: Examples remain safe, reusable, and easier to understand.

16. Use sentence case for headings, start task headings with an action verb, and use noun phrases for conceptual headings.  
    Sources: `headings.txt`, `capitalization.txt`.  
    Change: Guide structure signals whether a section explains a concept or asks the developer to act.

17. Use numbered lists only when order or rank matters, bullets for unordered sets, and tables only for items with multiple comparable fields.  
    Sources: `lists.txt`, `tables.txt`, `accessibility.txt`.  
    Change: Reports encode relationships through structure instead of using one list form for every collection.

18. Keep prerequisites and success-critical facts in the main flow, and reserve notes, cautions, and warnings for genuine asides, careful action, and material risk.  
    Sources: `notices.txt`, `procedures.txt`.  
    Change: Developers do not miss required information because it was styled as an optional aside.

## 2. Already ours

- Plain, common words — Google: `translation.txt`, `tone.txt`, `jargon.txt`; project: `AGENTS.md` § Communication → Writing, “Write plainly” and “Do not use a long or technical word where a short common word works.”
- Lead with the decision or finding — Google: `paragraph-structure.txt`, `accessibility.txt`; project: `AGENTS.md` § Communication → Writing, “Lead with the decision or the finding.”
- Keep sentences short and give each one idea — Google: `paragraph-structure.txt`, `translation.txt`, `accessibility.txt`; project: `AGENTS.md` § Communication → Writing, “One idea per sentence. Keep sentences short.”
- Prefer active voice and imperative instructions — Google: `voice.txt`, `person.txt`, `procedures.txt`; project: `AGENTS.md` § Communication → Writing, “Use the active voice, and the imperative for instructions.”
- Avoid metaphors, aphorisms, and rhetorical flourish — Google: `inclusive-documentation.txt`, `anthropomorphism.txt`, `tone.txt`; project: `AGENTS.md` § Communication → Writing, “Do not write aphorisms, metaphors, or rhetorical flourish.”
- Use one term for one concept — Google: `translation.txt`, `jargon.txt`; project: `AGENTS.md` § Design laws, “One concept, one term.”
- Make claims factual, bounded, and verifiable — Google: `excessive-claims.txt`; project: `.claude/rules/quality.md` § Evidence before change and § Probes before arguments, plus `.claude/rules/documentation.md` § Parity.
- Preserve substance while cutting clutter — Google: `tone.txt`, `paragraph-structure.txt`, `philosophy.txt`; project: `AGENTS.md` § Communication → Writing, “Keep all substance, nuance, and precision.”
- Present tradeoffs as a recommendation with consequences — Google: `prescriptive-documentation.txt`; project: `AGENTS.md` § Communication → Writing, “Present a tradeoff as option, cost, and recommendation.”
- Give every public export complete TSDoc — Google: `api-reference-comments.txt`; project: `.claude/rules/typescript.md` § Comments and API documentation.
- Do not speculate about future product behavior — Google: `future.txt`, `timeless-documentation.txt`; project: `.claude/rules/typescript.md` § Comments and API documentation.
- Keep guides aligned with the shipped behavior — Google: `api-reference-comments.txt`, `examples.txt`; project: `.claude/rules/documentation.md` § Parity and § Guide examples.

## 3. Conflicts

- `index.txt` permits breaking the style guide whenever a departure appears clearer; retain project authority instead, because the user’s instruction, `AGENTS.md`, applicable rules, and governing spec are binding, while a documented exception may depart only where those authorities allow it.
- `html-formatting.txt` and `code-samples.txt` default to spaces, two-space indentation, and 80-character code lines; retain the repository formatter and `.claude/rules/typescript.md` requirements for project code, because copied examples must match the real language and project conventions before Google’s generic presentation defaults.
- `headings.txt` rejects numbered headings; retain numbers in roadmaps, plans, claims, audits, and verdicts when the number provides stable identity, order, or a cross-reference, and omit decorative numbering in ordinary conceptual guides.
- `prescriptive-documentation.txt` suggests “We recommend” for optional guidance; prefer a direct imperative or an explicit `Recommendation:` in this project, because agent rules require trigger-and-action directives and developer-facing prose should not introduce an unclear organizational “we.”
- `dates-times.txt` prefers written US dates for prose; use ISO `YYYY-MM-DD` in technical evidence, roadmaps, logs, and commit records because it is globally unambiguous and sortable, while written dates remain acceptable in ordinary narrative prose.

## 4. Reject

- Reject HTML/CSS semantics, custom anchors, page layout, font styling, hard line breaks, responsive rendering, and metadata mechanics as general prose rules: `html-formatting.txt`, `semantic-tagging.txt`, `headings-targets.txt`, `markdown.txt`.
- Reject alt-attribute syntax, image resolution, `srcset`, screenshot sizing, video formats, and image-map mechanics from this writing layer: `images.txt`, the media-specific parts of `accessibility.txt`.
- Reject Google-, Android-, Cloud-, and Workspace-specific product names, UI labels, icon names, console terminology, and trademark treatment: `product-names.txt`, `trademarks.txt`, `ui-elements.txt`, product-specific entries in `word-list.txt`.
- Reject detailed phone-number, currency, mathematical-symbol, measurement, and temperature formatting as standing agent instructions unless a document actually contains that material: `phone-numbers.txt`, `mathematical-notation.txt`, `numbers.txt`, `units-of-measure.txt`.
- Reject most house-level punctuation, article, hyphenation, plural, possessive, quotation, and preposition rules as instruction lines; ordinary US English and the formatter are enough until a real ambiguity arises: `articles.txt`, `colons.txt`, `commas.txt`, `dashes.txt`, `ellipses.txt`, `format-examples.txt`, `hyphens.txt`, `parentheses.txt`, `periods.txt`, `pluralization.txt`, `possessives.txt`, `prepositions.txt`, `quotation-marks.txt`, `semicolons.txt`, `slashes.txt`.
- Reject SEO-driven filename rules, site-navigation behavior, external-link icons, and forced-tab behavior from the general writing contract: `filenames.txt`, the publishing-specific parts of `cross-references.txt`.
- Reject detailed shell prompt, line-continuation, optional-argument notation, Linux signal, and platform-keyboard conventions as general rules; apply them only in a guide that documents those exact interfaces: `code-syntax.txt`, `code-samples.txt`.
- Reject footnote markup, figure numbering, table HTML, and notice HTML as general chat or report rules while retaining their underlying information-placement lessons: `footnotes.txt`, `images.txt`, `tables.txt`, `notices.txt`.
- Reject `whats-new.txt` as source material for a directive because it records the guide’s change history rather than a stable writing rule.
- Reject `philosophy.txt`, `other-sources.txt`, and `spelling.txt` as new instruction lines: they respectively explain guide governance, restate ordinary copyright discipline, and redirect to the word list.

## 5. Word-list verdict

The entries that materially affect this project are:

- *must / can / might / should* — encode requirement, option, possibility, and ambiguity.
- *easy / simple / quick / simply / quickly / just* — omit unmeasured claims about effort and filler that can sound dismissive.
- *currently / new / latest / now / soon / eventually* — replace with an enduring fact or a dated or versioned reference.
- *you / user / we / they* — address the developer directly, distinguish the software’s user, avoid unclear collective voice, and use singular *they*.
- *this / that / it / above / below / higher / lower* — name the referent or use structural terms such as *preceding*, *following*, *earlier*, and *later*.
- *leverage / utilize / impact / surface / actionable / performant / workload / solution / support* — replace overloaded business or technical jargon with the exact action, object, or property.
- *sanity check / crazy / dummy / blacklist / whitelist / master / slave / guys / war room* — replace with precise neutral language, except when quoting an exact code identifier.
- *repo / e.g. / i.e. / etc. / via / and/or* — prefer *repository*, *for example*, *that is*, an explicitly bounded list, a precise preposition, and *and*, *or*, or *both*.

Do not adopt Google’s word list as a repository-wide vocabulary law. Adopt the category-level directives above; isolated spelling, branding, and product terms do not justify instruction lines until this project uses them repeatedly.