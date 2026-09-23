# Unit T4 TEST-CLIP — successor brief 2: the round-1 audit's findings

Supersedes `t4-test-clip-brief.md` for the unit's second round; the first brief stays in place unedited. What changed and why: the round-1 audit (`t4-audit-objective-verdict.md`, `FAIL 3, 4; outside the claims: clip-edge, fixture-cleanup, case-matrix`; `t4-audit-checker-verdict.md`, PASS with the token-noun referral) found the bordered fixture unable to distinguish the border subtraction (the frame's own edge masks it), the guide's tokens without nouns, the `overflow-clip-margin` expansion unhonoured, the predicate case's fixtures unregistered, and its case matrix inline.

## Role and engine

The Orchestrator (Opus 5.5) writes this round itself in `/home/user/test`, as in round 1; the auditor is `analyst` on GPT-6 Astra with `checker` on Sonnet.

## The edits

- **E5.** The cap becomes the clipping ancestor's own bottom edge (its border-box bottom, which the ancestor itself contributes, so the padding-edge subtraction was dead logic) plus the ancestor's clip margin; `readClipMargin(element)`, exported before `clipsOverflow`, returns the computed `overflow-clip-margin` length in pixels where the computed `overflow-y` value is the `clip` keyword or the clip comes from paint containment alone, and `0` otherwise (a `hidden`, `auto`, or `scroll` overflow ignores the property); the TSDoc remarks of `measureContent` and the `@returns` sentence of `clipsOverflow` carry their nouns.
- **E6.** The case matrices move to `tests/setupBrowser.ts` as the frozen, documented tables `CLIP_CASES` (`{ style, clips }`) and `CLIP_MARGIN_CASES` (`{ style, margin }`); the predicate case and a `readClipMargin` case iterate them; every frame is built through `buildFixture` and read with `requireValue`, so teardown removes it.
- **E7.** A `measureContent` case reads `500` under both panes for a 400-row `clip` frame with a 100-row clip margin over a 600-row child; the bordered case's comment states that the frame's own border stays the edge; the round-1 claims' stacked readings are corrected in the round-2 claims.
- **E8.** `guides/test.md`: the `readClipMargin` Surface row before `clipsOverflow`'s, and the § Capture and pattern sentences with a noun after every token and the clip margin named.

## Scope

Owned: `src/browser/helpers.ts`, `tests/setupBrowser.ts` (added this round for the tables), `tests/src/browser/helpers.test.ts`, `guides/test.md`. Off-limits: everything else, `package.json` and the lockfile included.

## Acceptance criteria

As in round 1, with the scoped browser run covering `clipsOverflow`, `readClipMargin`, and `measureContent` (`t4-2-gates.log.txt`: format, lint, check, the scoped run, and the guides project exit 0), the full `npm test` before the release (`t4-full-gates.log.txt`), and the head-start proof re-taken with the round-2 tarball.

## Review evidence

`t4-2.diff` and `t4-2-status.txt`.
