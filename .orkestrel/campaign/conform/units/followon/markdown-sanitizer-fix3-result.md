Confirmed: only `guides/markdown.md` and `tests/guides.test.ts` are modified, unchanged by this round.

## Fix round 3

Closes the round-3 checker's refutation of claim 9
(`units/followon/markdown-sanitizer-r3-checker-luna.md`): the report's paraphrased prose-change
descriptions did not carry the literal old and new text of every changed sentence, and its authored
prose still stated counts.

### The lines rewritten

- **Fix round 1 § The prose changed**: replaced the paraphrase of the `UNSAFE_ELEMENTS`-subtree
  clause and the "defence-in-depth" clause with the literal old sentence and literal new sentence for
  each, quoted from `git -C /home/user/fleet/markdown diff -- guides/markdown.md` against the landed
  tip, and noted that fix round 2 narrowed the first pair's new text further before it reached the
  tip.
- **Fix round 2 § The sentences changed**: replaced the paraphrase of the `UNSAFE_ELEMENTS`-tag-list
  narrowing and the attribute-floor-refusal-list rewrite with the literal old sentence and literal
  new sentence for each, quoted from the same diff.
- **Fix round 2 § The report**, the sentence describing what the round-2 checker's own refutation
  named: named the `UNSAFE_ELEMENTS`-tag sentence and the attribute-floor-refusal-list sentence
  instead of stating "two sentences".
- **Fix round 2 § The reading**: named the reading's plain string and the fence comment's quoted
  string instead of stating "the two strings".
- **Fix round 2 § The sentences changed**, the sentence naming what the attribute-floor rewrite
  points to: named the `javascript:` member of the refusal list instead of stating "the one member".

### The sweep

Pattern: `\b(one|two|three|four|five|six|seven|eight|nine|ten|both|single|pair|dozen)\b`, case
insensitive, run with Grep over
`/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md`. Result: every remaining hit
is either a heading or phrase quoted verbatim from `guides/markdown.md` or from a prior report draft
that the surrounding sentence names as replaced (`"**The one widening: `src`.**"`, `"one with a
`data:`"`, `"both refused images"`, `"gained two cases"`, the `javascript:`-example clause quoted in
**Fix round 1 § The prose changed** and **Fix round 2 § The sentences changed**), a structural
device name rather than a tally (`pair pattern`, `old/new pair`, `single quotes`), or `both` in
"both the guide fence's comment and the test assertion", which names its own members immediately
after `both`. No authored sentence in the report states a count of a growable set that the report
itself is tallying.

### Tree

`git -C /home/user/fleet/markdown status --short` lists only the Owned paths, unchanged by this
round:

```
 M guides/markdown.md
 M tests/guides.test.ts
```
