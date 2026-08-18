# Unit W1: author the developer-facing writing rules (campaign 3)

## Role and engine

`implementer`, Claude Opus 5, native subagent. Sole serial writer from a clean committed baseline
3469c61. The user named Opus and the Orchestrator as this campaign's final voice: you draft, the
Orchestrator rules. Perform directly; spawn nothing; no commits.

## Objective

Land the reconciled adoption from the Google developer documentation style guide as agent-facing
instructions: a new rule file `.claude/rules/writing.md` for developer-facing prose, TSDoc
sentence shapes folded into `.claude/rules/typescript.md`, and one row in `AGENTS.md`'s rule map.
Every line you write obeys the instruction-files law: directives for agents, trigger + action,
no persuasion, one home per rule. The prose these rules govern is read by the developer; the
rules themselves are read by agents.

## Context

- The three engine distillates (the evidence you draft from):
  `.orkestrel/scaffold/style-audit/distillate-grok.md`, the Opus distillate you may know as your
  engine's own (its 27 candidates and substitution table are restated in the reconciliation
  below), and `.orkestrel/scaffold/style-audit/distillate-sol.md`.
- The baseline law you must not restate: `AGENTS.md` § Communication → Writing and
  § Instruction files; `.claude/rules/documentation.md`; `.claude/rules/typescript.md`
  § Comments and API documentation; `.claude/rules/names.md` (its lifecycle vocabulary is canon
  the new rules must not collide with).
- The corpus (spot-checks only; do not re-absorb):
  `/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/gstyle/text/`.

## The reconciled matrix — fixed by the Orchestrator; you own the drafting voice

`.claude/rules/writing.md` (new; no `paths:` frontmatter; scope statement: developer-facing prose
— chat replies, reports, guides, commit messages — extending `AGENTS.md` § Writing without
restating it):

1. Obligation ladder: `must` for a requirement, `can` for an option or ability, `might` for a
   possibility, the imperative for an instruction or recommendation; never `should`, never
   `We recommend`.
2. Actor: address the developer as `you`; name the software component that acts; reserve `user`
   for someone using software the developer builds; never `we`, `our`, or `let's` for agent work.
3. Condition, goal, or location before the instruction in steps and recommendations, so a
   non-matching reader skips the sentence. A report still opens with the finding; this rule
   governs sentences, not documents.
4. Key point first in every paragraph and every list item, not only at the top.
5. Required facts stay in the main flow. A note or notice carries only what a reader may skip;
   never a prerequisite, a step, or a warning the task depends on.
6. Claims a reader can verify: no `ensure`, `guarantee`, superlatives, or effort adjectives as
   behavior claims; cite the run behind any number. `ensure` addressed to an executor as a
   directive is outside this ban.
7. Present tense for what exists; no `currently`, `now`, `new`, `latest`, `soon`; a version or
   date where time matters.
8. Code-token grammar: backticks plus a following noun (`the` X `method`, `file`, `flag`); never
   inflect a code token or use one as an English verb.
9. No human faculties for software: components report, return, refuse — never know, think, want,
   see.
10. Structural references: `preceding`, `following`, `earlier`, `later`; never `above` or
    `below`; `earlier`/`later` for version ranges.
11. Keep helper words (`that`, `then`, `a`, `the`, `of`); name the noun after `this`, `these`,
    or `it` when the referent could be misread.
12. Link with the destination's title or a descriptive phrase (`see` X); never `here` or a bare
    URL in prose.
13. Recommend one path — the shortest proven one; do not present a menu of equivalents without a
    ruling.
14. State what the reader can do; no double negatives.
15. Negative contractions (`don't`, `isn't`, `can't`) are welcome in replies and guides; not in
    instruction files.
16. Introduce every list, table, and code fence with a complete sentence; numbered lists only
    where order or rank matters; tables only for rows with comparable fields.
17. Headings in sentence case: verb-first for a task, noun phrase for a concept. Identity
    numbering (claims, audit verdicts, plan units) is data, not a heading style, and stays.
18. Examples carry fictional, PII-free data with descriptive names; placeholders are
    UPPER_SNAKE_CASE and explained on first use; never `foo`, `bar`, `baz`.
19. Expand an unfamiliar abbreviation once with the short form in parentheses; skip the ceremony
    for the universally known set.
20. Numerals for technical quantities, versions, and counts; `YYYY-MM-DD` for dates in evidence,
    commits, and reports.
21. Serial comma. Mark omitted code with a comment in the sample's language, never `...`.
22. Passive voice only where naming the actor adds blame without information (a defect count); an
    actor the reader needs is always named.
23. Paraphrase and link third-party content; never paste it.
24. A substitution table (data, one home), reconciled from all three lanes:
    `should` → the ladder above · `simply`/`easy`/`just` (filler) → delete · `currently`/`now`/
    `new`/`latest` → delete or date it · `utilize`/`leverage` → `use` · `via` → `through`,
    `by using` · `in order to` → `to` · `e.g.`/`i.e.` → `for example`, `that is` · `etc.` →
    bound the list or recast · `performant`/`robust` → the measured property · `allows you to` →
    `lets you` · `and/or` → `and`, `or`, or `both` · `since` (causal) → `because` · `once`
    (temporal) → `after` · `please` → delete · `sanity check` → `quick check` · `dummy` →
    `placeholder` · `blacklist`/`whitelist` → `denylist`/`allowlist` · `master`/`slave` →
    `primary`/`replica` — a literal code identifier is always quoted as itself, exempt from every
    row. Singular `they` for any person of unstated gender.
    EXCLUDED deliberately: no rows for `execute`, `abort`, `kill`, `terminate`, `run` — the
    lifecycle vocabulary in `.claude/rules/names.md` owns those words; state that exclusion in
    one line so the table is never read against the API vocabulary.

`.claude/rules/typescript.md` § Comments and API documentation gains the TSDoc sentence shapes
(fold into the existing bullets; do not duplicate them): first sentence is third person with an
`-s` verb stating what the symbol does, never repeating the symbol name; boolean parameter — "If
`true`, …; if `false`, …"; boolean return — "True if …; false otherwise"; defaults as
"Default: …"; exceptions as "Thrown when …"; a deprecation names its replacement first;
prerequisites and failure behavior are stated where they exist.

`AGENTS.md` rule map gains one row for `.claude/rules/writing.md` in the table's existing form
(Governs column: developer-facing prose — reports, replies, vocabulary, claims, structure). No
other `AGENTS.md` edit.

Recorded rejections (close the file with a short "Not adopted" block naming these, one line each,
so the next reader does not re-import them): conversational personality and memorability; the
style guide's break-the-rules license; `We recommend` as a form; Google's indent and line-length
sample chrome; unspaced em dashes (this project's spaced em dash is the intentional deviation);
a numeric sentence-length cap; the word list wholesale.

## Your latitude

The matrix fixes substance. You own: wording of every directive in the repository's instruction
voice, ordering and grouping, section names, what folds into one line versus two, and the
table's exact layout. Where a matrix item duplicates existing law when you read the baseline
files first-hand, fold rather than restate and record it.

## Scope

- Owned: `.claude/rules/writing.md` (new), `.claude/rules/typescript.md`, `AGENTS.md` (the one
  rule-map row).
- Off-limits: everything else, `.orkestrel/` included.
- Validation: read-only plus scoped `npx oxfmt --check` on owned files.

## Output

The exact `git diff`, one line per matrix item saying where it landed (or how it folded), and
deviation findings or `none`.

## Deviation contract

Stop and report if a matrix item contradicts a baseline law the Orchestrator did not name.
Wording, grouping, and placement are yours; record the calls you make.
