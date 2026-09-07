All citations check out at their stated lines. Now finalizing the verdict.

Lane held: checker sse

**Claim 1 — every fix-brief item landed in the diff as stated, nothing else changed.** PASS.
`git status --short` (`d7n-sse-converge-fix.status.txt:1-5`) lists exactly `guides/sse.md`, `src/core/factories.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/setup.ts` — all inside the brief's owned set (`guides/sse.md`, doc blocks under `src/core/**`, `tests/setup.ts`'s `chunkings` block, `tests/guides.test.ts`; `README.md` reported unchanged and item 6 found nothing to correct there). The diff's five hunks correspond one-to-one to items 1, 3, 2, 5, 4 of the brief; no unrelated hunk appears.

**Claim 2 — citations match the tree; no count in prose; the pin described only in the file's words.** FAIL.
- Citations verified against the tree and correct: `SSEParser.test.ts:26` (`describe('SSEParser — a single event'`), `:960` (`describe('SSEParser — (G) property / invariant suites'`), `factories.test.ts:10` (`describe('createSSEParser'`), `policy.test.ts:54` (`describe('policy scratch'`), `:530` (`describe('policy configuration wiring'`), `config.test.ts:75` (`describe('root configuration'`), `:771` (`describe('policy plugin'`), `:1906` (`describe('configuration helpers'`) — all match.
- Counts in prose found in the report's own text (not command output, so not exempt): `d7n-sse-converge-fix-report.md:73` — "the `config.test.ts` clause from its three (`config.test.ts:75`, `:771`, `:1906`)" states "three"; `d7n-sse-converge-fix-report.md:93` — "which builds a parser with `{ limit: 1_000_000 }` and feeds it three chunks" states "three". `AGENTS.md` § Writing: "NEVER state a count. … Name the members, or write the sentence without the number." Naming the members alongside the number (as at line 73) does not cure the violation; the number must be absent. This is the same defect class Round 1 failed claims 12, 25, and 38 for ("Counts in prose in every converge report," `d7n-slice1-audit-verdict.md:9`).
- The pin sentence (`d7n-sse-converge-fix-report.md:69`, "the installed version is `0.0.18`") uses only the file's own words and a version number, which the writing rules exempt ("a version"); no issue there.

**Claim 3 — the named findings present as the audit asked (sse-scoped subset).** PASS.
- `## Tests` section: present, `guides/sse.md` diff lines 27-34, in the pilot's bullet shape (`/home/user/fleet/abort/guides/abort.md:154-160`).
- Descriptive heading over the demonstrating fence and retitled `@example`: `guides/sse.md` diff line 9 (`#### Create a bounded parser and feed it chunks`) and `src/core/factories.ts` diff line 44 (`@example Create a bounded parser and feed it chunks`).
- Restored cross-file links: `src/core/types.ts` diff lines 58, 68-69, 77 restore `{@link import('./errors.js').SSEError}`, `{@link import('./factories.js').createSSEParser}`, `{@link import('./SSEParser.js').SSEParser}` — the only sites the converge diff (`d7n-sse-converge.diff.txt:309-332`) had flattened to bare code spans; `errors.ts`, `factories.ts`, and `SSEParser.ts` use same-file-importable `{@link}` forms that were never flattened, so the restoration set is complete.
- Hoisted `examples` binding matching the pilot: `tests/guides.test.ts` diff lines 86-112 move the binding to the loop scope; compared against `/home/user/fleet/abort/tests/guides.test.ts:209-228`, the resulting block is byte-for-byte identical (both read verbatim above).
- `chunkings` wording: `tests/setup.ts` diff lines 116-127 reword to "chunk sequences" / "one sequence," dropping the borrowed `partition` noun while `partition` (`tests/setup.ts:74`, unchanged) keeps its own name.
- `MSGSourceInterface` and codec items are outside sse's scope; not ruled here.

No other findings outside the three claims.

VERDICT: FAIL 2
