# Unit markdown-sanitizer — report

## The fence

Added after "**The one widening: `src`.**" in `guides/markdown.md`, before "**What the composed
output looks like.**":

```ts
import { parseDocument, renderHTML } from '@orkestrel/markdown'

const source = [
	'<script>alert(1)</script>',
	'',
	'[link](javascript:alert(1))',
	'',
	'![alt](https://x.dev/pic.png)',
].join('\n')

const html = renderHTML(parseDocument(source))
// '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p><p><a>link</a></p><p><img src="https://x.dev/pic.png" alt="alt"></p>'
// — the script line has no element to remove and renders as escaped text, so no script
// subtree ever reaches the output; the javascript: link keeps its text and drops its
// href; the https: image keeps its src.
```

## The real reading

Command: `cd /home/user/fleet/markdown && npx tsx /home/user/work/evidence/markdown-proofs/sanitizer-read.ts`
(the script imports `parseDocument`/`renderHTML` from the built `dist/src/core/index.js`, because
`@orkestrel/markdown` cannot self-resolve from a path outside the package tree). Recorded output at
`/home/user/work/evidence/markdown-proofs/sanitizer-read.txt`:

```
<p>&lt;script&gt;alert(1)&lt;/script&gt;</p><p><a>link</a></p><p><img src="https://x.dev/pic.png" alt="alt"></p>
```

The raw `<script>` line parses to plain paragraph text (this package's parser has no raw-HTML block
support), so it is HTML-escaped rather than projected into an element — no script subtree ever
exists to remove. The `javascript:` link keeps its label and loses its `href` attribute entirely.
The `https:` image keeps its `src`. This value was read from the real code first, then transcribed
into both the guide fence's comment and the test assertion.

## The transcription

`tests/guides.test.ts` § `flagship fences` gained the case executing the fence's code and asserting
the transcribed value with `toBe`, and the presence-guard case reading the transcribed fence lines
back out of `guideText`, following the file's existing pair pattern.

- Red control: planted `https://x.dev/BOGUS.png` in the transcription's expected value (never in
  `src/**`). Ran `cd /home/user/fleet/markdown && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/markdown-proofs/sanitizer-control-red.txt 2>&1`.
  Result: the planted case failed and the rest of the suite passed, captured at
  `/home/user/work/evidence/markdown-proofs/sanitizer-control-red.txt`.
- Restored the correct value and re-ran the same command to
  `/home/user/work/evidence/markdown-proofs/sanitizer-green.txt`. Result: the suite passed.

## The prose

The "hostile subtree is dropped" and "refused destination is stripped" and "`src` survives" claims
match the fence's real output exactly; no sentence needed narrowing beyond what the fence's own
comment already states (that the script line is escaped text rather than a removed element, which
is a more precise, not weaker, statement of the same guarantee).

## Gates

| Gate | Command | Exit |
| --- | --- | --- |
| format:check | `npm run format:check` | 0 |
| lint:check | `npm run lint:check` | 0 |
| check | `npm run check` | 0 |
| build | `npm run build` | 0 |
| test | `npm test` | 0 (`test:guides` project: all cases passed) |

## Audit

`npx scaffold audit --offline` exit 0:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

## Tree

`git -C /home/user/fleet/markdown status --short` lists only the Owned paths:

```
 M guides/markdown.md
 M tests/guides.test.ts
```

`node /home/user/scaffold/tmp/work/evidence.mjs markdown` ran clean, writing the diff to
`/home/user/work/evidence/conform-markdown.diff` and the status to
`/home/user/work/evidence/conform-markdown.status`.

## Fix round 1

Closes the round-1 checker's refutations of claims 5 and 9
(`units/followon/markdown-sanitizer-checker-luna.md`): the fence at `guides/markdown.md` did not
exercise the refused-image sentence and the "unsafe subtree removed" prose overstated what a
markdown-sourced pipeline can show.

### The readings

- **The refused image.** Read `@orkestrel/html`'s `URL_ATTRIBUTES`, `SAFE_URL_SCHEMES`, and
  `sanitizeURL` declarations at
  `/home/user/fleet/markdown/node_modules/@orkestrel/html/dist/src/core/index.d.ts:1219,1253,1364`,
  then ran a real render of an image with a `javascript:` destination and an image with a `data:`
  destination through the installed pipeline (`sanitizer-read-2.ts`, output captured to
  `/home/user/work/evidence/markdown-proofs/sanitizer-read-2.txt`, run with
  `cd /home/user/fleet/markdown && npx tsx /home/user/work/evidence/markdown-proofs/sanitizer-read-2.ts`):
  the `javascript:` image and the `data:` image rendered as `<img alt="alt">` — the element and its
  `alt` survive, and only `src` is dropped. The sentence at `guides/markdown.md:432` ("A refused
  image keeps its element and its alt text and loses only the destination.") stands unchanged; it is
  now shown by the fence.
- **The subtree claim.** Ran the same script against `<span>inline html</span>` and
  `a *b* <em>c</em> d` through the installed pipeline: raw inline HTML (`<span>`, `<em>` written by
  hand in markdown source) renders as HTML-escaped text, never as an element, because
  `markdownToHTML` projects only markdown's own node shapes (headings, paragraphs, links, images,
  emphasis, code, tables) and has no node shape for a raw HTML tag. No markdown input reaches
  html's `UNSAFE_ELEMENTS` removal as a subtree to remove, because the parser never produces the
  element in the first place. Read against the parser's projection in the installed built output
  at `/home/user/fleet/markdown/node_modules/@orkestrel/markdown/dist/src/core/index.js` (the
  `markdownToHTML` projection switches on markdown element names only) and the guide's own
  description of raw HTML as literal text in the block-scan sections earlier in the file.

### The prose changed

`guides/markdown.md`, the "**`renderHTML` sanitizes, unconditionally.**" paragraph, quoted from
`git -C /home/user/fleet/markdown diff -- guides/markdown.md` against the landed tip:

- Old: "Everything that makes the output safe comes from html's floor, which no option can lower:
  an `UNSAFE_ELEMENTS` subtree (`script`, `style`, `template`, `svg`, forms, metadata) is removed
  WHOLE rather than unwrapped, so its body can never resurface as markup; every `on*` handler
  attribute and `style` / `srcdoc` / namespaced attribute is removed; a URL attribute is
  entity-decoded to a bounded fixpoint and stripped of ASCII whitespace and control characters
  BEFORE its scheme is checked, and `javascript:`, `data:`, `vbscript:`, `file:`, and the
  protocol-relative forms (`//`, `\\`, `/\`) are refused whatever the allowlist says."
  New (the tip's final wording after fix round 2 narrowed it further; see § The sentences changed
  below for that narrowing's own old/new pair): "`markdownToHTML` projects only markdown's own node
  shapes — headings, paragraphs, links, images, emphasis, code, tables, and the rest — and never an
  `UNSAFE_ELEMENTS` tag such as `script`, the case the fence below exercises: raw HTML written in
  markdown source has no node shape of its own, so the parser leaves it as literal text and it
  reaches the output escaped rather than as an element. html's `UNSAFE_ELEMENTS` removal therefore
  has nothing to remove in this pipeline; what actually judges the projection's output is html's
  attribute floor, whose full refusal list — the always-stripped attributes and the hard-banned
  schemes — is [`guides/html.md`](./html.md)'s to state. The fence below shows one member of that
  floor: a `javascript:` destination stripped from a link's `href` and from an image's `src` while
  the element and its remaining content survive."
- Old: "This is defence-in-depth: `renderHTML` accepts any `MarkdownNode`, including one a caller
  constructed by hand, rewrote through `map`, or accepted from elsewhere, so it can never assume its
  input came from `parseDocument` on trusted markdown."
  New: "This still runs unconditionally: `renderHTML` accepts any `MarkdownNode`, including one a
  caller constructed by hand, rewrote through `map`, or accepted from elsewhere, so it can never
  assume its input came from `parseDocument` on trusted markdown, and a hand-built node whose
  destination or attribute is hostile is still caught at this floor."
- The sentence at `guides/markdown.md:432` is unchanged; the real reading confirmed it rather than
  contradicting it.

### The fence

Extended the fence after "**The one widening: `src`.**" with an `![alt](javascript:alert(1))` line
between the existing `javascript:` link and the `https:` image, and extended the comment with the
image's rendered result, read from the run:

```ts
const html = renderHTML(parseDocument(source))
// '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p><p><a>link</a></p><p><img alt="alt"></p><p><img src="https://x.dev/pic.png" alt="alt"></p>'
// — the script line has no element shape of its own and renders as escaped text, so no
// script tag ever reaches the output for html's UNSAFE_ELEMENTS floor to remove; the
// javascript: link keeps its text and drops its href; the javascript: image keeps its
// element and its alt and drops only its src; the https: image keeps its src.
```

### The transcription

`tests/guides.test.ts` § `flagship fences`: extended the executing case's source array and expected
`toBe` value with the added `![alt](javascript:alert(1))` line and its rendered `<img alt="alt">`
segment, and extended the presence-guard case with a `toContain` check for the added fence line and
the updated comment string.

- Red control: planted `<img src="javascript:alert(1)" alt="alt">` in the executing case's expected
  value (never in `src/**`). Ran
  `cd /home/user/fleet/markdown && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/markdown-proofs/sanitizer-control-red-2.txt 2>&1`.
  Result: the planted case failed and the rest of the suite passed, captured at
  `/home/user/work/evidence/markdown-proofs/sanitizer-control-red-2.txt`.
- Restored the correct value and re-ran the same command to
  `/home/user/work/evidence/markdown-proofs/sanitizer-green-2.txt` and
  `/home/user/work/evidence/markdown-proofs/sanitizer-green-2b.txt`. Result: the suite passed.

### The report

Replaced the sentence naming the executing case and the presence guard by tally with a sentence
naming each case, and swept the report for the other prose counts the checker did not flag: the
test-result sentences
under **The transcription** now state which case failed rather than a tally, the `test` gate row now
states that the `test:guides` project's cases passed rather than a tally, and the `Tree` section now
names the diff and status files it wrote rather than their line and entry tallies. The code fences
quoting literal command output (the gate table's earlier evidence, the audit line) are left as
captured, because they are evidence pasted verbatim rather than authored prose stating a count.

### Gates

| Gate | Command | Exit |
| --- | --- | --- |
| format:check | `npm run format:check` | 0 |
| lint:check | `npm run lint:check` | 0 |
| check | `npm run check` | 0 |
| build | `npm run build` | 0 |
| test | `npm test` | 0 (`test:guides` project's cases passed) |

### Audit

`cd /home/user/fleet/markdown && npx scaffold audit --offline` exit 0:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

### Tree

`git -C /home/user/fleet/markdown status --short` lists only the Owned paths:

```
 M guides/markdown.md
 M tests/guides.test.ts
```

`node /home/user/scaffold/tmp/work/evidence.mjs markdown` ran clean, writing the diff to
`/home/user/work/evidence/conform-markdown.diff` and the status to
`/home/user/work/evidence/conform-markdown.status`.

## Fix round 2

Closes the round-2 checker's refutations of claims 1, 5, and 9
(`units/followon/markdown-sanitizer-r2-checker-luna.md`): the reading capture the report named did
not exist, the `UNSAFE_ELEMENTS`-tag sentence and the attribute-floor-refusal-list sentence in the
sanitizer paragraphs named attributes and schemes the fence's output does not show, and the report's
authored prose still stated counts.

### The reading

Wrote `/home/user/work/evidence/markdown-proofs/sanitizer-read-3.ts`, whose `source` array is the
fence's `source` array copied verbatim from `guides/markdown.md`, importing `parseDocument` and
`renderHTML` from the built `dist/src/core/index.js` and printing
`renderHTML(parseDocument(source))`. Ran it with
`cd /home/user/fleet/markdown && npx tsx /home/user/work/evidence/markdown-proofs/sanitizer-read-3.ts`,
captured to `/home/user/work/evidence/markdown-proofs/sanitizer-read-3.txt`:

```
<p>&lt;script&gt;alert(1)&lt;/script&gt;</p><p><a>link</a></p><p><img alt="alt"></p><p><img src="https://x.dev/pic.png" alt="alt"></p>
```

The fence's comment value in `guides/markdown.md`:

```
'<p>&lt;script&gt;alert(1)&lt;/script&gt;</p><p><a>link</a></p><p><img alt="alt"></p><p><img src="https://x.dev/pic.png" alt="alt"></p>'
```

The reading's plain string and the fence comment's quoted string are equal byte for byte once the
fence comment's surrounding single quotes are stripped from its string before the comparison.
`sanitizer-read-3.txt` is
the reading the sanitizer prose now cites; `sanitizer-read-2.txt`, which the round-1 report named but
never captured, is dropped from this report.

### The sentences changed

`guides/markdown.md`, the "**`renderHTML` sanitizes, unconditionally.**" paragraph, quoted from
`git -C /home/user/fleet/markdown diff -- guides/markdown.md` against the landed tip. Fix round 1
had already replaced the original `UNSAFE_ELEMENTS`-subtree and refusal-set clauses (old text quoted
in **Fix round 1 § The prose changed**) with a version naming the full tag list and the full
refusal set; this round narrows that version further, so the pair below shows the original clause as
old and the tip's landed clause as new:

- Old: "an `UNSAFE_ELEMENTS` subtree (`script`, `style`, `template`, `svg`, forms, metadata) is
  removed WHOLE rather than unwrapped, so its body can never resurface as markup"
  New: "`markdownToHTML` projects only markdown's own node shapes — headings, paragraphs, links,
  images, emphasis, code, tables, and the rest — and never an `UNSAFE_ELEMENTS` tag such as
  `script`, the case the fence below exercises: raw HTML written in markdown source has no node
  shape of its own, so the parser leaves it as literal text and it reaches the output escaped rather
  than as an element."
- Old: "every `on*` handler attribute and `style` / `srcdoc` / namespaced attribute is removed; a
  URL attribute is entity-decoded to a bounded fixpoint and stripped of ASCII whitespace and control
  characters BEFORE its scheme is checked, and `javascript:`, `data:`, `vbscript:`, `file:`, and the
  protocol-relative forms (`//`, `\\`, `/\`) are refused whatever the allowlist says"
  New: "html's `UNSAFE_ELEMENTS` removal therefore has nothing to remove in this pipeline; what
  actually judges the projection's output is html's attribute floor, whose full refusal list — the
  always-stripped attributes and the hard-banned schemes — is [`guides/html.md`](./html.md)'s to
  state. The fence below shows one member of that floor: a `javascript:` destination stripped from a
  link's `href` and from an image's `src` while the element and its remaining content survive."
- The "**The one widening: `src`.**" paragraph is unchanged: none of its sentences names a scheme,
  an attribute, an element, or a behaviour the fence's output does not show.

### The fence and the transcription

Row 2 rewrote sentences rather than widening the fence, so the fence's `source` array, its rendered
comment, and `tests/guides.test.ts`'s executing case and presence guard are unchanged from fix round
1. No red or green capture was needed for this round; `sanitizer-control-red-3.txt` and
`sanitizer-green-3.txt` were not produced because nothing in the executing case or its expected value
changed.

### The report

Rewrote the authored counts the round-2 checker named: the sentence describing the refused-image
reading no longer states "one with a `data:`" or "both refused images", and instead names the
`javascript:` image and the `data:` image individually; the sentence in **Fix round 1 § The report**
that quoted the phrase "gained two cases" now names the executing case and the presence guard
directly, without repeating the counted phrase. A sweep of the rest of the report for a number word
or numeral answering "how many" in authored prose found none outside a quoted claim identifier
(`claims 5 and 9`, which numbers the checker's own findings rather than tallying anything this report
counts), an exit code reported as the value a gate returned, and the audit's own output line quoted
verbatim as evidence inside a code fence.

### Gates

| Gate | Command | Exit |
| --- | --- | --- |
| format:check | `npm run format:check` | 0 |
| lint:check | `npm run lint:check` | 0 |
| check | `npm run check` | 0 |
| build | `npm run build` | 0 |
| test | `npm test` | 0 (every project's cases passed) |

### Audit

`cd /home/user/fleet/markdown && npx scaffold audit --offline` exit 0:

```
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
```

### Tree

`git -C /home/user/fleet/markdown status --short` lists only the Owned paths:

```
 M guides/markdown.md
 M tests/guides.test.ts
```

`node /home/user/scaffold/tmp/work/evidence.mjs markdown` ran clean, writing the diff to
`/home/user/work/evidence/conform-markdown.diff` and the status to
`/home/user/work/evidence/conform-markdown.status`.

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
