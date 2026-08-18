# Opus-lane distillate (researcher on Opus 5) — verbatim return, condensed layout

## 1. Candidate directives (New), ranked

1. Say `must` for a requirement, `can` for an option, `might` for a possibility, and `We
   recommend` for advice; never `should`. — prescriptive-documentation, word-list.
2. Describe the current state only. Delete `currently`, `now`, `new`, `newer`, `latest`, `old`,
   `existing`, `soon`, `eventually`, `at present`, `as of this writing`, `does not yet` from any
   statement of what the code does. — timeless-documentation, future, word-list.
3. State a claim only in terms the reader can verify. Ban `best`, `fastest`, `simplest`,
   `always`, `never`, `guarantee`, `ensure` as product claims; cite the source of any performance
   number; write "helps with X" where X cannot be proved. — excessive-claims.
4. Put the condition, circumstance, or goal before the instruction. — sentence-structure,
   procedures, translation.
5. Put the key point in the first sentence of every paragraph and every list item. —
   paragraph-structure, accessibility.
6. Write TSDoc to a fixed sentence shape: first sentence third person `-s` verb (Creates…,
   Returns…, Checks whether…); no symbol-name repetition; boolean parameter "If `true`, …; if
   `false`, …"; boolean return "True if …; false otherwise"; "Default: …"; "Thrown when …";
   deprecation names its replacement first. — api-reference-comments, reference-verbs.
7. Never inflect a code symbol; add a noun and inflect that. — code-in-text, possessives,
   pluralization, filenames.
8. No human qualities for code, tools, or tests. — anthropomorphism.
9. Introduce every list, table, and code block with a complete sentence. — lists, tables,
   code-samples, colons.
10. Address the developer as `you`; imperative; no `we`, `our`, `let's` for agent work. — person,
    pronouns.
11. No directional language: `earlier`/`preceding`/`following`/`later`, never `above`/`below`;
    `earlier`/`later` for version ranges. — accessibility, procedures, word-list.
12. Cap a sentence at 26 words; one idea per paragraph; break past five or six sentences. —
    accessibility, paragraph-structure.
13. Keep the helper words (`that`, `then`, `of`, `a`, `an`, `the`), including in headings. —
    translation, articles, pronouns.
14. Follow `this`, `these`, `it` with the noun. — pronouns.
15. Say what the reader can do; no double negatives. — accessibility, translation.
16. Headings sentence case: bare infinitive for a task, noun phrase for a concept, no gerund
    first word, no sequence numbers, no bare code item, no skipped level. — headings,
    capitalization.
17. No notice for a prerequisite, cross-reference, step, or success-critical fact. — notices.
18. Link text that reads alone; never `here`, `this document`, bare URL; "For more information
    about X, see Y". — cross-references, accessibility.
19. Spell out an unfamiliar abbreviation on first use; never abbreviate peripheral terms; no
    abbreviation as a verb; the never-spell-out set exempt (API, HTML, URL, REST, PDF, RAM, USB,
    AI, units). — abbreviations.
20. Fictional, PII-free example data with descriptive names; never `foo`/`bar`/`baz`. — examples,
    word-list.
21. Placeholders UPPER_SNAKE_CASE, explained on first use; multiple → "Replace the following:"
    in command order. — placeholders, code-syntax.
22. Introduce a command by what it does, not "run the following command". — procedures.
23. Recommend one path; reference rather than repeat a procedure. — prescriptive-documentation,
    procedures.
24. Use contractions, especially negative ones. — contractions.
25. Numerals for every technical quantity, version, step; numeric dates `YYYY-MM-DD`. — numbers,
    dates-times.
26. Mechanical punctuation set: serial comma; straight quotes; no ellipsis (language comment for
    omissions); prefer period to semicolon; important information out of parentheses; no slash
    for alternatives; em dash unspaced. — commas, quotation-marks, ellipses, semicolons,
    parentheses, slashes, dashes.
27. Paraphrase and link third-party content; do not copy it. — other-sources.

## 2. Already ours

Active voice; imperative; plain short words; lead with the finding; one idea per sentence; no
metaphor or flourish; one term per concept; testable conditions over evaluative words; rationale
subordinate; code font resolving to real symbols; every public member documented; introduced
runnable samples; present tense (weakly stated in ours). Mapped to AGENTS.md § Writing,
§ Instruction files, documentation.md § Parity/Guide examples, typescript.md § Comments.

## 3. Conflicts, with position

- Tone "knowledgeable friend"/personality: keep ours; adopt only second person, contractions, no
  `please`, no `simply`.
- "Guidelines, not rules; break them": keep ours — import guidance, not the license to deviate.
- Passive-voice exceptions: adopt narrowly — passive only where naming the actor adds blame and
  nothing else (defect counts); active wherever the acting component matters.
- `should` re-permitted for recognized recommendations: take the stricter branch; ban it.
- Semicolons (Google: avoid): prefer a period in developer-facing prose; do not retrofit
  instruction files.
- Em dash unspaced: record ours (spaced) as the intentional deviation; fix variation, not choice.
- Avoid question marks: reject — bounded questions to the developer are a first-class output.
- `ensure`: the ban is on behavior claims, not on directives addressed to an executor; state the
  scope or the rule misfires on the rule files themselves.

## 4. Reject

HTML/CSS/semantic-tagging; images/alt mechanics; heading anchors; table markup; link styling; UI
elements; product names/trademarks; phone numbers; math notation; footnotes; units and most
date/number mechanics; SEO filenames; Markdown-vs-HTML; whats-new/index/philosophy meta;
highlights index; disability-identity guidance (no analog; technical substitutions kept);
four-type notice taxonomy (restraint rule kept); multi-action list machinery; localization
rationale.

## 5. Word-list verdict

Consulting the 4,900-line list is not an executable instruction. One substitution table is worth
it: should → must/can/might/We recommend · simple/simply/easy/easily/just → delete ·
currently/presently/as-of-this-writing/now/latest/existing → delete · utilize/leverage → use ·
via → by using/through · in order to → to · e.g./i.e. → for example/that is · etc./and so on →
recast · execute → run · terminate/kill/abort → stop/exit/cancel/end · performant/robust → the
measured property · desired → that you want · allows you to/enables you to → lets you ·
above/below → preceding/earlier, following/later · foo/bar/baz → descriptive name · sanity
check/sane/dummy → quick check/valid/placeholder · blacklist/whitelist, master/slave →
denylist/allowlist, primary/replica (literal identifiers exempt, code font) · since/as (causal)
→ because · please → delete (except a real favour) · API meaning one method → method. Plus:
`typically` never sentence-first; singular `they`.

## Gaps and capture notes

spelling.txt is a redirect stub to /style/word-list (nothing missing). All other 70 pages intact;
every page accounted for in exactly one bucket. Not verified: whether the em-dash and semicolon
conflict positions describe this repository's actual usage at scale (inference until counted).

[Orchestrator note: retained from the lane's live return; layout condensed, content complete.
The reconciliation in tmp/style-writing-brief.md rules on divergences: `execute`/`abort`/`kill`
rows excluded (names.md lifecycle vocabulary wins), `We recommend` excluded (imperative wins),
26-word cap excluded (no numeric prose gates), punctuation set trimmed to serial comma +
no-ellipsis.]
