# Checker lane, round 2 — unit markdown-sanitizer (a follow-on in /home/user/fleet/markdown)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/markdown`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `markdown-sanitizer` after its fix round 1 (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/markdown-sanitizer-brief.md`, fix brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/markdown-sanitizer-fix1-brief.md`, report `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md` with its `## Fix round 1` section, evidence `/home/user/work/evidence/conform-markdown.diff` and `conform-markdown.status`, captures under `/home/user/work/evidence/markdown-proofs/`), on the landed tip `f45b004`, uncommitted. The round-1 lane refuted claim 5 (prose outrunning the fence) and claim 9 (a count in the report); the fix round extended the fence with a refused image, rewrote the subtree sentences, and removed the counts.

## Claims

1. The ```ts fence after "**The one widening: `src`.**" in `guides/markdown.md` imports from `@orkestrel/markdown` only, carries a raw `<script>` line, a `javascript:` link, a `javascript:` image, and an `https:` image, and its `// ` comment value equals byte-for-byte the real readings at `/home/user/work/evidence/markdown-proofs/sanitizer-read.txt` and `sanitizer-read-2.txt` (the refused image renders as `<img alt="alt">`; compare character by character).
3. `tests/guides.test.ts` § flagship fences executes the fence's code and asserts the extended value with `toBe`, with a presence guard for the fence's lines; `sanitizer-control-red-2.txt` shows the planted `<img src="javascript:alert(1)" alt="alt">` value failing and `sanitizer-green-2.txt` shows the guides project green; no planted value survives (sweep `javascript:alert(1)" alt` and `BOGUS` over `tests/**` and `guides/**` and rule each hit).
5. Every sentence in the "**`renderHTML` sanitizes, unconditionally.**" and "**The one widening: `src`.**" paragraphs is shown by the fence's comment values: read each sentence against the real output and rule whether any still claims more than the output shows — in particular whether any sentence still claims that an unsafe element subtree is removed from a markdown-sourced document, which the pipeline cannot show because the projection produces no raw HTML element; the sentence "A refused image keeps its element and its alt text and loses only the destination." is now shown by the `<img alt="alt">` output.
7. `/home/user/work/evidence/conform-markdown.status` lists only `guides/markdown.md` and `tests/guides.test.ts`, and the diff carries no hunk outside them and none under `src/**`; the read scripts under `/home/user/work/evidence/markdown-proofs/` import from the built `dist/` and touch no source.
9. No `TODO`, deferred row, skipped test, `.only`, mock, spy, or debug residue entered on an added line; the report's fence, readings, prose changes (old and new text), and captures match the diff and the files on disk; the report's authored prose states no count (a literal command output pasted as evidence, such as a runner tally or the audit line, is not authored prose).

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
