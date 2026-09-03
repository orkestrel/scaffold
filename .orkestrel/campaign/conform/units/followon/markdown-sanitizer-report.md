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
  then ran a real render of an image with a `javascript:` destination and one with a `data:`
  destination through the installed pipeline (`sanitizer-read-2.ts`, output captured to
  `/home/user/work/evidence/markdown-proofs/sanitizer-read-2.txt`, run with
  `cd /home/user/fleet/markdown && npx tsx /home/user/work/evidence/markdown-proofs/sanitizer-read-2.ts`):
  both refused images rendered as `<img alt="alt">` — the element and its `alt` survive, and only
  `src` is dropped. The sentence at `guides/markdown.md:432` ("A refused image keeps its element and
  its alt text and loses only the destination.") stands unchanged; it is now shown by the fence.
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

- `guides/markdown.md`, the "**`renderHTML` sanitizes, unconditionally.**" paragraph: the sentence
  claiming an `UNSAFE_ELEMENTS` subtree "is removed WHOLE rather than unwrapped, so its body can
  never resurface as markup" is rewritten to state that `markdownToHTML` never projects a raw HTML
  tag into an element in the first place, so html's `UNSAFE_ELEMENTS` removal has nothing to remove
  in this pipeline; what actually judges the projection's output is html's attribute floor. The
  closing "defence-in-depth" sentence is rewritten to keep its meaning — the floor still runs
  unconditionally against a hand-built `MarkdownNode` — without repeating the subtree claim.
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

Replaced "gained two cases" with the members it names (the executing case and the presence guard)
and swept the report for the other prose counts the checker did not flag: the test-result sentences
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
