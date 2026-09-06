# Audit brief — D1 guide-readers (round 1)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: the shape of the new types and functions under the single-word entity API laws, the guide's voice, whether the transform reads as one stated rule), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness of each reader over the fixture shapes, the transform's edge cases, the control's coverage, false greens), and `checker` (Sonnet: mechanical conformance, the acceptance criteria as stated, scope honesty, guide parity). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit D1 gave `@orkestrel/guide` the readers that project a guide's `Summary` cells, fence titles, and tagline, and a source's doc-block paragraphs, member paragraphs, and titled `@example` bodies, into one normalized form, with `findDrift` naming each disagreement. Its brief: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-guide-readers-brief.md`; its report: `d1-guide-readers-report.md`; the plan: `plan.md` decisions 1 to 5; the probes: `orchestrator-measurements.md`. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`.

## Review evidence

The actual diff and status of the guide checkout: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-guide-readers.diff.txt` and `d1-guide-readers.status.txt`. Read the diff in full; read the changed files under `/home/user/fleet/guide` at their new state where the diff is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. No file under `src/**` imports `typescript`, `vite`, or any parser; `Source` stays text-only and I/O-free; the readers extend the existing `jsdoc` span walk, the `@example` chain, and the heading walk rather than adding a second scanner.
2. The compared unit on the source side is the description paragraph up to the first block tag, and on the guide side the `Summary` cell; the transform is exactly the brief's (link and dotted link targets to code tokens, `{@link X | text}` to `text`, whitespace collapse; emphasis and links to their text, `\|` unescaped) and nothing else is transformed; a fixture carrying each clause pins it.
3. The `Summary` column is located by header text; a table without one, a row without a code-span name, and a row pairing with no export are findings with both sites, never silent skips; `Shape`, `Signature`, `Value`, and `Returns` are unread by the comparison.
4. `GuideFence.title` is the nearest preceding heading's flattened text; a titled `@example` pairs with the fence of that title and the bodies compare after the doc-comment unwrapping with the language; an untitled `@example` keeps its presence role.
5. The types are as the brief fixes them (`SurfaceSymbol.summary?` optional, `MethodEntry`, `SourceExample`, `Drift`, `GuideInterface.tagline()`), every property readonly and one word, `computeSymbolKey` unchanged, and the shapes, guards, and contracts follow them.
6. `findDrift` reports each disagreement with both texts, an absent side as `undefined`, never a symbol the SB or MB checks already report, and its negative control is drawn from outside its membership rule; a positive control plants one disagreement per kind and asserts both sites.
7. The `parseSync` control lives in the test tier alone, attaches doc blocks by range over the four fixture shapes, and the allowed misses are stated and asserted as the only misses.
8. `guides/guide.md` carries every new name in its tables, states the transform and what is outside the comparison, and names the new checks; the parity test of the checkout decides the rows; the prose obeys the writing rules and states no count.
9. Nothing outside the owned files changed; the report's claims match the diff; every criterion's evidence is present.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
