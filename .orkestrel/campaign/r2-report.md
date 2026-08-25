# Unit R2 report — ROADMAP.md reconciled to the 2026-08-25 plan of record

`/home/user/scaffold/ROADMAP.md` states the plan of record after the ROADMAP-rows campaign of
2026-08-25. Every § 1 close ruling is applied as the brief fixes it, the retained rows are
byte-identical, and § 2 is untouched. Nothing was committed. Diffstat:
`ROADMAP.md | 119 +++---`, 59 insertions, 60 deletions; `git status --porcelain -- ROADMAP.md`
reports ` M ROADMAP.md` and nothing else.

## Header

Rewritten. It now names the 2026-08-25 campaign, the scaffold 0.0.52 publish with its
registry confirmation and same-day adoption wave (re-pinned, repaired, gated green, pushed), the
package rows it closed, the mechanisms that closed them (implementation, cross-engine audit, the
fleet setup-proof wave over every published package), and the mcp 0.0.23, brief 0.0.6, and probe
0.0.5 releases. The sentences that this file owns everything still open, that campaign detail is
recoverable from git history by hash, and that no campaign folder is the plan of record are kept.

## § 1 rulings applied

| Row | Ruling | Applied |
| --- | ------ | ------- |
| `scaffold: publish the release…` | Closed | Removed; absorbed into the header's closed-campaign sentence |
| `scaffold: --no-cache ruling` | Closed | Removed |
| `fleet: uncovered tests/setup.ts modules` | Closed | Removed |
| `test: transcribe the remaining guide fences` | Closed | Removed |
| `mcp: StdioServerTransport.send` | Closed | Removed |
| `middleware: setupServer proofs` | Closed | Removed |
| `html: tests/setup.ts proof` | Closed | Removed |
| `html: NAMED_ENTITIES membership strength` | Closed | Removed |
| `process: weak negative assertion` | Closed | Removed |
| `process: spawning proof placement` | Closed | Removed |
| `brief: Interpretation member names` | Closed | Removed |
| `supervisor: ProcessOptions.delivery adoption` | Keep | Byte-identical |
| `supervisor: first-unparseable-line policy` | Keep | Byte-identical |
| `supervisor: claude.mjs orphan` | Keep | Byte-identical |
| `probe: mintty TTY fixture` | Keep | Byte-identical |
| `scaffold: repair message and two manifest rulings` | Add | Present |
| `html: constants.ts TSDoc counts` | Add | Present |
| `agent: tests/setup.ts battery registration` | Add | Present |
| `database: conformDriver plus createIntegrationDatabase` | Add | Present |
| `test: browser barrel vitest/browser import` | Add | Present |
| `mcp: buildElement plus two referred rulings` | Add | Present |
| `probe: silent boot rejection plus npm pkg fix` | Add | Present |
| `interpret and reason: TRICKY_KEYS and INTEGER_KEY_SUBJECT` | Add | Present as one row keyed **interpret and reason** |
| `msg: patchBytes copy-only contract` | Add | Present |
| `qualifier: buildHostileRecord __proto__` | Add | Present |
| `table: readTableError non-throw` | Add | Present |
| `ollama: local daemon fixture` | Add | Present |
| `fleet: isBrowserVuePath` | Add | Present |

Ordering, which the brief leaves to the writer: the cross-cutting `scaffold` and `fleet` rows
open § 1, and the package rows follow alphabetically by package key, so a later row lands in one
predictable place. Retained rows keep their exact text; the `supervisor` rows stay adjacent in
their original relative order, and the `probe` rows sit together.

## Close rulings checked against the retained reports

No close ruling contradicts what a retained report records. Checked directly:

- `test` fences — `.orkestrel/campaign/test/w56-close.md:12-22` records the CommonMark fence
  parsing, the deeper-heading preservation, and the line-anchored marker checks adopted from the
  objective lane's `AUDIT: FAIL`.
- `mcp: send` — `.orkestrel/campaign/mcp/w1-audit-verdict.md:15-17` records the landed `send`
  behavior, and refers exactly the post-close WebSocket pin and the race-abandoned `writeLine`
  callback that the added `mcp` row now carries.
- `html: NAMED_ENTITIES` — `.orkestrel/campaign/html/w4-report.md:3` records
  `expect(NAMED_ENTITIES).toEqual(WHATWG_NAMED_ENTITIES)` and that the size assertions are gone.
- `brief: Interpretation member names` — `.orkestrel/campaign/brief/w2-report.md:1-10,44` records
  the frozen `INTERPRETATION_MEMBERS` in `src/core/constants.ts` with its executed pins.
- `process` rows — `.orkestrel/campaign/process/w3-fix-report.md:1-30` records the merged case
  asserting a real child's terminal pair.

The added `probe` row is corroborated by `.orkestrel/campaign/probe/f-arm-report.md:30-33`: a boot
that expires rejects without emitting `arm`, and only the next `prove` call retries the arming.

## Validation, closing lines

Format, `npx oxfmt --config .oxfmtrc.json --check ROADMAP.md`:

```text
All matched files use the correct format.
Finished in 448ms on 1 files using 4 threads.
FMT_EXIT:0
```

Substitutions sweep of `.claude/rules/writing.md` § Substitutions plus the banned claim words,
case-insensitive and word-anchored, over the whole of `ROADMAP.md`:

```text
PATTERN: \b(should|simpl(y|e)|eas(y|ier|ily)|just|currently|now|new(est|ly)?|latest|utiliz|leverag|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|since|once|please|sanity check|dumm(y|ies)|blacklist|whitelist|master|slave|ensure[sd]?|guarantee[sd]?|above|below|here|we|our|lets|foo|bar|baz)\b
PATH: ROADMAP.md, case-insensitive, word-anchored
NO HITS
```

An unanchored run of the same pattern returned only substring hits inside permitted words —
`nowhere` and `where` matching `now` and `here`, `barrel` matching `bar` — at
`ROADMAP.md:29,34,52,53,58,75,77`. Each is permitted by the sense its row bans.

Retained-row byte check, comparing each kept block against `git show HEAD:ROADMAP.md`:

```text
IDENTICAL supervisor-delivery
IDENTICAL supervisor-policy
IDENTICAL supervisor-fixture
IDENTICAL probe-mintty
S2_IDENTICAL
```

## Deviation state

No deviation. Neither stop condition fired: every close ruling matches its retained report, and
each retained row and § 2 reproduced byte-identical under the rewrite. Only `ROADMAP.md` was
written, and nothing was committed.
