Lane held: checker console

## Claim rulings (console only — claims 1–13)

**1. PASS.** `f93a2f4`'s diff (`d7n-console-prep.diff.txt`) touches exactly: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package-lock.json`, `package.json`, `src/core/constants.ts`, `src/server/constants.ts`, `tests/config.test.ts`, `tests/guides.test.ts`, `tests/policy.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupPolicy.ts`, `tests/setupServer.ts`, `tests/src/core/helpers.test.ts`, `tsconfig.json`, plus untracked `scripts/docs.ts` — matching `d7n-console-prep.status.txt` and the P.1 brief's repair list plus item-2/item-3 sites. `grep` for `@orkestrel/guide` in the diff returns no match; `@orkestrel/contract` line is unchanged context (`d7n-console-prep.diff.txt:1092,1634`). `package.json` version `0.0.12→0.0.13` (`:1620-1621`); `package-lock.json` root version bump plus dropped `vite-plugin-dts` subtree (`:1097,1564` region).

**2. PASS.** The hunk in `d7n-console-prep-report.md:33-104` shows exactly the described transform (`members`/`documented` name-mapping, `findMissing`/`findUnexampled` calls updated, the already-string `findMissing` calls left alone), confirmed live in `/home/user/fleet/console/tests/guides.test.ts:187-208, 241-246, 258-265`. The P.1 report quotes `test:guides` as `91 passed (91)` from an actual run (`d7n-console-prep-report.md:284-289`).

**3. PASS.** Every voice/prose-sweep hunk in the report (`d7n-console-prep-report.md:112-225`) keeps its factual content, opens with a third-person verb, and the after-text is present in the current tree (spot-checked `tests/setup.ts:10,23,57` — content matches, PASS on substance).

**4. PASS.** `guides/console.md` — every `## Surface`/`## Methods` header row ends `Summary` beside only `Kind`/`Returns` (confirmed by direct read: lines 55,78,99,…,305,313,…,403); the converge report's header audit (`d7n-console-converge-report.md:47-56`) is corroborated. No `### Entities` heading exists (`grep` returns none) and no `### Classes` conversion was required — the report's stated reason (mixed-kind tables, no class documented outside its H3/`## Methods` subsection) matches the guide's structure I read directly.

**5. PASS.** Sampled `Summary` cells (`Color`, `Style`, `RendererInterface`, `ProcessCapture`) equal their source description paragraphs in the compared form; report names each hand-rewritten block (`d7n-console-converge-report.md:69-105`); `git show HEAD:guides/console.md` comparison reports `non-final cells mismatched: 0` (`:131-139`).

**6. PASS.** Exactly one titled `@example` exists: `src/server/factories.ts:37` "The server — a TTY sink and a process capture", matching `### The server — a TTY sink and a process capture` at `guides/console.md:596` (facts block) / confirmed heading occurs once (`d7n-console-converge-report.md:150-152`); fence body equals the doc-block content (converge diff `2043-2098`); no stray triple-backtick or `*/` inside it.

**7. PASS.** `guides/console.md:3-6` and `README.md:3-6` blockquotes are byte-identical, one noun phrase, no link/bold, same line breaks (confirmed by direct read of both files). Opening prose after each carries the displaced material without restating tagline clauses (`guides/console.md:8-26`; `README.md:8-10`).

**8. PASS.** `tests/guides.test.ts:112-134` is the file-scope guard-and-continue pin with the both-sides failure line; `:141-150` is the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` is in `ROOT_FILES` (`:79`); `GUIDE_SPEC` constant present (`:85`); equality case sits inside the manifest loop's `describe(entry.concept)` (`:221-229`). Report records red-first failures with lines (`d7n-console-converge-report.md:15-41`) and green after (`:43`).

**9. PASS.** Converge diff's `src/**` hunks sit inside doc blocks only (spot-checked `src/server/factories.ts` hunk, converge diff `2043-2098`); report states a `git diff -U0 -- src/` filtered to non-comment lines returns nothing (`d7n-console-converge-report.md:301-302`). `## Tests` section exists and names the equality gate descriptively with no SQ/MQ/EQ/RQ identifier (`guides/console.md:706-708`). Titled example heading reads as a demonstration. Guide's `## Contract` numbered items are identity numbering, not counts; no all-caps emphasis or stray count found in a sweep of `guides/console.md`/`README.md`.

**10. PASS.** `d7n-console-converge.status.txt` lists only `README.md`, `guides/console.md`, `src/browser/*` (4 files), `src/core/*` (8 files), `src/server/*` (5 files), `tests/guides.test.ts` — all within the claim's named scope.

**11. PASS.** `npm run docs` exit 0 at `disagreements found: 0` (`d7n-console-converge-report.md:241-243`); `--to guide`/`--to source` at `written: 0` (`:244-247`); scoped format/lint/`check`/`test:guides`/`test:policy` all green with quoted last lines (`:254-258`).

**12. FAIL.** Report honesty is violated: `d7n-console-prep-report.md:263` states "plus **the six files** item 3 edited (...)" — a count of a growable set (files edited) asserted in the report's own prose, not quoted from any command's output. This is exactly what `AGENTS.md` § Writing bans ("NEVER state a count") and what this claim's own "count ban over both reports" text requires ruling on. One violation is sufficient to fail the claim regardless of citation accuracy elsewhere.

**13. PASS.** The `{@link import('…')}` seed defect is named with its evidence (`d7n-console-converge-report.md:107-121`), attributed to the package's own link form (not the reader), and resolved within scope (66 tags rewritten to code spans) rather than left as an open blocker — a defensible non-blocking ruling on real evidence.

## Findings outside the claims

- **`d7n-console-prep-report.md:263`** ("the six files") is the disqualifying count; the fix is mechanical — restate as "the files item 3 edited" and name them, dropping the numeral, consistent with `.claude/rules/writing.md` § Substitutions and `AGENTS.md` § Writing.
- **Line-citation drift, not ruled as a violation:** `tests/setup.ts` diagnostics cited at `:9`, `:22`, `:56` in `d7n-console-prep-report.md:112-136` read at `:10`, `:23`, `:57` in the current tree. This is a one-line, uniform offset consistent with the diagnostic having been read against the tree state at the moment `oxlint` ran (after `repair --offline`, before the hand rewrite), not against the final committed tree. What right looks like: a report citing a pre-edit diagnostic line should say so explicitly (e.g., "line N before this edit") so a later reader is not left to infer the offset.
- **Converge report's diffstat row** (`d7n-console-converge-report.md:295-298`, "`src/** (19 files)` | 391 insertions...") is a hand-summarized row rather than the verbatim `git diff --stat` output; it restates a file count instead of quoting the tool's own summary line. What right looks like: paste the literal `git diff --stat` tail line, which already carries the number as a value the reader needs from that run, rather than composing a new summary sentence around it.

VERDICT: FAIL 12
