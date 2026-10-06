# Audit verdict: the line-addressed reading campaign (2026-10-06)

**Lanes:** workflow `reading-falsify` (run `wf_479b08ad-2cf`) ran two lanes, both Opus 5.5, because GPT-6 Astra wrote every audited line. Both read one claims file, `scaffold/tmp/units/reading-claims.md` (21 claims), each in a clean context and blind to the other. Their verdicts are in `falsify/`.

- Objective lane: `VERDICT: FAIL 1 2 3 4 7 8 9 10 11 12 13 14 15 19 21; outside: F1 F2`.
- Subjective lane: `VERDICT: FAIL 7 11 13 15 16 19; outside: F1 F2 F3 F4`.

**Reproduced by the Orchestrator** (by reading the source):
- the role word is a `text` span (browser `src/core/helpers.ts:555`);
- a value is whitespace-normalized before redaction (`:574-582`);
- the journey call allowance `(1 + followups) × STORE_BOUNDS.limit` is unchanged from `58c08d8` (`tests/service/browser.test.ts:293` there), so claim 18's call-limit concern holds.

## Rulings

| Claim | Ruling | Carried into |
| --- | --- | --- |
| 1 Whole-result bound | **Broken.** Host notes are prepended to journey results unbounded, MCP text has no backstop, and redaction after numbering grows a result. The catalog (`acquire`, `tools`) is not a tool result, so the claim and guide are scoped | B-fix 1, 2 |
| 2 Continuation | **Broken** by redaction after numbering | B-fix 1 |
| 3 Stability | **Broken.** The projection is stored before a render that can throw | B-fix 3 |
| 4 Search | **Broken.** Role and state words are scored as text | B-fix 4 |
| 5, 6 | Confirmed | none |
| 7 Secrets | **Broken.** Whitespace-normalized values defeat redaction, and the MCP crash notice prints an unredacted address | B-fix 1, 5 |
| 8 Settle | **Scope.** It holds on the page placement. The DOM placement has no observer, so the guide and the claim are scoped to the page placement | B-fix 9 |
| 9 Receipts | **Broken.** The `wait` window misses text split across lines | B-fix 6 |
| 10 Journeys | **Broken** through claim 1. Loading a 0.0.26 journey file is unresolved | B-fix 2, 13 |
| 11 MCP | **Broken** through claim 1. A page tool can adopt the name `look`, so the refusal is narrowed and tested | B-fix 2, 9 |
| 12 Placements | **Broken.** The page placement splits text nodes into separate lines, while the DOM placement joins them | B-fix 7 |
| 13 Stale names | **Broken:** the README fence, `helpers.ts:973`, and test docs, titles, and variables | B-fix 8 |
| 14 Binding | **Broken.** Removing either redaction layer leaves every test green; one guide test can never fail | B-fix 1, 13 |
| 15 Guide | **Broken:** guide lines 302, 377, 3123, 3129, 3131, 3207, 3675, and 3760-3780 | B-fix 9 |
| 16 Vocabulary | **Broken copy:** `read.search` says the reply starts at the match, but it opens one line before | B-fix 10, plan amended |
| 17 Agent | Unresolved; the live consumers run at measurement | M stage |
| 18 Oracles | Holds where read. The full predicate diff needs no fix | none |
| 19 Paging predicate | **Broken.** Both lanes agree that refusing a non-empty `search` narrows the claim. The objective lane adds that "earlier" is implemented as "immediately preceding" | H-fix 1 |
| 20 Fixture positions | Confirmed for 5-digit ports, which the instruments and the Windows ephemeral range use. Re-pinned after B-fix 7 moves lines | H-fix 3 |
| 21 Instruments | **Broken.** The `productive` pattern misses `1 line matches`. The journeys arm, unplanned, is dropped from M1 | H-fix 2 |

**Outside the claims, all accepted:**
- objective F1: notes are drained before a render that can throw;
- objective F2: guide line 302's DOM submit sentence is false;
- subjective F1: the `boundBrowserText` doc and its example are false;
- subjective F2: the `journeys` search header is duplicated, hard-codes 50 and 120, prints "1 lines", and lacks the miss line;
- subjective F3: `journeys` footers say "page";
- subjective F4: the `journeys` copy is weaker than `read`'s.

**Advisories:**
- **Taken:**
  - the four unchanged settle cases each wait about 4 s (test time);
  - stale ollama fixtures;
  - mixed import specifiers;
  - instrument rows interleaved and carrying their arm.
- **Recorded, with no change:**
  - quadratic membership scans;
  - `getComputedStyle` per mutation batch;
  - label rows repeating a control's name;
  - the `search` name overlapping the site's search box, which M2 decides.

## Bounds on the fixes

- **Redaction:**
  - Every surface stays redacted: windows, titles, addresses, notes, errors, receipts, journey results, and MCP text.
  - Only the order changes: redact before wrapping and numbering, never after.
  - No unredacted path opens.
- **The page placement's text joining:**
  - It must not merge text across blocks.
  - It must not drop text that is not inside a named referenced owner.
  - A label is not its control's owner.
- **The paging predicate** still refuses the seed's footer, a guessed line, a shifted window, a changed page, a failed call, and a footer an action or a change note made stale.
- **The `journeys` copy** stays within the existing 3,400 bound. If it cannot, stop and report the figure; the bound does not move.
