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

`tests/guides.test.ts` § `flagship fences` gained two cases: one executing the fence's code and
asserting the transcribed value with `toBe`, and one presence guard reading the transcribed fence
lines back out of `guideText`, following the file's existing pair pattern.

- Red control: planted `https://x.dev/BOGUS.png` in the transcription's expected value (never in
  `src/**`). Ran `cd /home/user/fleet/markdown && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/markdown-proofs/sanitizer-control-red.txt 2>&1`.
  Result: 1 failed, 59 passed (60), captured at
  `/home/user/work/evidence/markdown-proofs/sanitizer-control-red.txt`.
- Restored the correct value and re-ran the same command to
  `/home/user/work/evidence/markdown-proofs/sanitizer-green.txt`. Result: 60 passed (60).

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
| test | `npm test` | 0 (`test:guides` project: 60 passed (60)) |

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

`node /home/user/scaffold/tmp/work/evidence.mjs markdown` ran clean, writing
`/home/user/work/evidence/conform-markdown.diff` (64 lines) and
`/home/user/work/evidence/conform-markdown.status` (2 entries).
