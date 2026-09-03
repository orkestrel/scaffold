All rows complete, all gates green, and the tree carries only the two owned files.

## Fix round 2

Closes the round-2 checker's refutations of claims 1, 5, and 9
(`units/followon/markdown-sanitizer-r2-checker-luna.md`): the reading capture the report named did
not exist, two sentences in the sanitizer paragraphs named attributes and schemes the fence's output
does not show, and the report's authored prose still stated counts.

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

The two strings are equal byte for byte once the reading's plain string is compared against the
fence comment's quoted string with the surrounding single quotes stripped. `sanitizer-read-3.txt` is
the reading the sanitizer prose now cites; `sanitizer-read-2.txt`, which the round-1 report named but
never captured, is dropped from this report.

### The sentences changed

- `guides/markdown.md`, the "**`renderHTML` sanitizes, unconditionally.**" paragraph: the clause
  naming `UNSAFE_ELEMENTS` tags the parser never projects — `script`, `style`, `template`, `svg`, a
  form, metadata — is narrowed to name only `script`, the tag the fence exercises, and points the
  reader at `guides/html.md` for the rest of that list. The following clause, which named the
  attribute floor's full refusal set (`on*`, `style`, `srcdoc`, namespaced attributes, and the
  hard-banned schemes `javascript:`, `data:`, `vbscript:`, `file:`, and the protocol-relative forms),
  is rewritten to state that the floor's full refusal list is `guides/html.md`'s to state, and to
  name the one member of it the fence below shows: a `javascript:` destination stripped from a
  link's `href` and from an image's `src` while the element and its remaining content survive.
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
