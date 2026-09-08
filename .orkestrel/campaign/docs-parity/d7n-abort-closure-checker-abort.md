Lane held: checker abort

**Claim 1 — scope honesty (diff = brief's items, no other path).** PASS.
`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-abort-close.status.txt:1` reads ` M guides/abort.md` only; `tests/guides.test.ts` carries no change. The diff at `d7n-abort-close.diff.txt:1-47` contains exactly two hunks in `guides/abort.md`: the `### Validators` guard-sentence/Shape-column addition and the `### Types` convention-sentence/Shape-cell rewrite (item 1), and the `### Create and abort` fence lead-in (item 4). Item 2 (member references) and item 3 (drop-in canon) needed no hunk, as the brief's own pre-read confirmed (`d7n-abort-close-brief.md:26-33`). No path outside `guides/abort.md` is touched.

**Claim 2 — citations match the tree; no prose count.** PASS.
The report's quoted diffs (`d7n-abort-close-report.md:11-28,36-43`) are byte-identical to the actual diff (`d7n-abort-close.diff.txt`). Every number in the report is either a command-quoted duration/exit-code/test-summary (`387ms`, `325ms`, `371ms`, `462ms`, `25 passed (25)`, `90 passed | 1 skipped (91)`) — permitted as a measurement quoted with the run that produced it — or a line-number citation (`d7n-abort-close-report.md:64`), not a stated count of a growable set.

**Claim 3 — the `Shape` idiom.** PASS.
`/home/user/fleet/abort/guides/abort.md:48` carries the exact guard sentence over `### Validators`, with `AbortSignal` (a type, not `…` or a spelled member type) in the Shape cell at line 52. `guides/abort.md:62` carries the canonical Ruling 15 sentence verbatim over `### Types`; `AbortOptions` (line 66) reads `{ id?, signal? }` and `AbortInterface` (line 67) reads `{ id, signal, aborted } plus abort` — bare names only, no member types, no `…`. No `### Constants` table and no extended interface exist in this guide, so those sub-clauses are inert, matching the report's own reading (`d7n-abort-close-report.md:29`).

**Claim 4 — the drop-in's canon.** PASS.
`/home/user/fleet/abort` is the named pilot itself, so this is a self-comparison. `tests/guides.test.ts:1-3` reads the Ruling 21 header verbatim (no "and are the only part a sibling package changes" clause). The region from `const root = ` (line 47) through the manifest loop's closing brace (line 258) carries `/Interface$/` with no flag (line 149), `new URL('../', import.meta.url)` (line 47), and the equality case (line 181) sits directly after the methods loop (ending line 171) and before the examples case (line 191), matching Ruling 13's canonical position.

**Claim 5 — fence lead-ins, sibling-fence headings, retired terms, README fences.** PASS.
Every fence in `guides/abort.md` (lines 21, 103, 116, 130, 139) sits under a lead-in sentence ending in a colon (lines 19, 101, 114, 128, 137). No heading in the guide is a Ruling 9 titled heading with a sibling fence lacking its own heading: only `### Create and abort` (line 99) pairs to an `@example Create and abort` title (`/home/user/fleet/abort/src/core/factories.ts:21`), and it carries exactly one fence, so the sibling-fence clause is vacuously satisfied; `### Link to a parent` and `### Race work against the signal` are plain Patterns headings with no matching `@example` title, so Ruling 22's sibling-heading requirement does not bind their two fences. No heading carries a retired term (no `entities`, no other flagged word). `README.md`'s `## Install` fence (line 14) and `## Usage` fence (line 25) sit directly under their headings.

## Findings outside the claims

`/home/user/fleet/abort/guides/abort.md:69` reads "The `id`, `signal`, and `aborted` members of `AbortInterface` are `readonly` data members (Surface rows, earlier) — its call-signature method is documented under [Methods](#methods)." This restates the same three members the `### Types` Shape cell (line 67) now already carries, which brushes against Ruling 15's "delete a guide sentence that only lists members a cell now holds." The sentence also states readonly-ness and points to `## Methods`, so whether it counts as a sentence that "only" lists members is a judgment call outside a mechanical ruling — not part of claim 3's tested items, and this diff left the line untouched (predates the closing unit). Referred to the subjective lane or the Orchestrator rather than ruled here.

VERDICT: PASS
