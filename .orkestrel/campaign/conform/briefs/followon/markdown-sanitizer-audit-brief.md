# Checker lane — unit markdown-sanitizer (a follow-on in /home/user/fleet/markdown)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/markdown`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `markdown-sanitizer` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/markdown-sanitizer-brief.md`, report `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md`, evidence `/home/user/work/evidence/conform-markdown.diff` and `conform-markdown.status`, captures under `/home/user/work/evidence/markdown-proofs/`), on the landed tip `f45b004`, uncommitted.

## Claims

1. `guides/markdown.md` carries one new ```ts fence after "**The one widening: `src`.**" that imports `parseDocument` and `renderHTML` from `@orkestrel/markdown` (never `@src/*`), builds a source with a raw `<script>` line, a `javascript:` link, and an `https:` image, and shows the rendered string in a `// ` comment; that comment's value equals byte-for-byte the real reading recorded at `/home/user/work/evidence/markdown-proofs/sanitizer-read.txt` (compare the two strings character by character, including the escaped `&lt;script&gt;` text, the `<a>link</a>` with no `href`, and the `<img src="https://x.dev/pic.png" alt="alt">`).
3. `tests/guides.test.ts` § flagship fences executes the fence's code and asserts the transcribed value with `toBe`, and a presence guard reads the fence's lines back out of the guide text; `sanitizer-control-red.txt` shows one failing case with the planted `BOGUS` value and `sanitizer-green.txt` shows the guides project green; no planted value survives in the tree (sweep `BOGUS` over `tests/**` and `guides/**`).
5. The prose in the two sanitizer paragraphs and the fence's comment agree: read the paragraph claims (unconditional sanitizing, the `src` widening, a hostile subtree, a refused destination) against the fence's real output and rule whether any sentence claims more than the output shows — in particular whether "hostile subtree" prose is consistent with a `<script>` line that renders as escaped paragraph text rather than a removed element; a sentence that outruns the fence is a REFUTED claim 5 with the sentence quoted.
7. `/home/user/work/evidence/conform-markdown.status` lists only `guides/markdown.md` and `tests/guides.test.ts`, and the diff carries no hunk outside them and none under `src/**`; the read script under `/home/user/work/evidence/markdown-proofs/` imports from the built `dist/` and touches no source.
9. No `TODO`, deferred row, skipped test, `.only`, mock, spy, or debug residue entered on an added line; the report's fence, reading, and captures match the diff and the files on disk; the report states no count in prose (a test count reported with its run is a measurement, not a count).

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
