Lane held: checker middleware

**Claim 1 — scope honesty.** PASS. `git status --short` (`.status.txt`) lists exactly `README.md`, `guides/middleware.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/middlewares.ts`, `src/core/stores/DatabaseSessionStore.ts`, `src/core/stores/MemorySessionStore.ts`, `src/core/types.ts`, `src/server/helpers.ts`, `src/server/middlewares.ts`, `src/server/parsers.ts`, `src/server/types.ts`, `tests/guides.test.ts` — matching the diff's file list exactly, nothing else touched. Every `src/**` hunk in the diff is a comment line (`*` prefix), confirming no code token moved; the report's own `git diff -U0 -- src | grep … ` criterion prints nothing, and this reading is corroborated directly against the diff content itself rather than trusted from the report alone.

**Claim 2 — citations match the tree; no count in prose.** FAIL. The report states a count in prose in at least four places, contrary to `AGENTS.md` § Writing ("NEVER state a count... rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets"):
- Item 2: "on the baseline named **three** lines; all **three** are rewrapped" (`d7n-middleware-converge-fix-report.md:58`) — a count over a grep-matched line population.
- Item 4: "`grep -rn 'extends' src --include=*.ts` names **four** extended interfaces" (`:113`) — a count over the extended-interface population.
- Item 7: "**Two** acceptance-bar readings carry no gate I could find" (`:241`) — a count over the acceptance-bar-claim population.
- Item 11: "**Ten** headings took one, beyond item 3's" (`:355`) — a count over the fence/heading population.

Each names a set a later change can add to (more hyphen hits, more extended interfaces, more bar claims, more headings), so each is a banned count rather than an exempt measurement (duration, size, limit, version, date, exit code, or a run-quoted number). This falsifies the brief's second half of claim 2 outright; the report's citations otherwise do match the tree (verified `isBufferingIneligible` at `src/core/helpers.ts:274-296`, the `SessionRow`/`SessionEntry`/`MemorySessionStoreOptions`/`UploadedFile` cells at `guides/middleware.md:108-130`, the `Shapers`/`Validators — core` tables at `:183-227`, the `DEFAULT_CSP`/`DEFAULT_PERMISSIONS_POLICY`/`DEFAULT_LIMITER_MESSAGE` cells at `:143-158`, the README diff at `README.md:49-51`, and the drop-in header/executed section in `tests/guides.test.ts:1-3,276-319`), but claim 2 is conjunctive and the second conjunct is false.

**Claim 3 — each named correction landed as the audit asked.** PASS.
- MF1: `src/core/helpers.ts:275` reads "must skip the compression and ETag buffering pipeline," and the guide's `isBufferingIneligible` row (`guides/middleware.md:204`) carries the identical text. `@returns` at `:290` agrees ("must be left untouched").
- MF2: `grep -rnE '[a-z]-$' src --include=*.ts` finds nothing in the current tree (verified by inspection of `src/server/helpers.ts:121-123`, `src/server/types.ts:66-69`, `src/core/types.ts:205-207`, all rewrapped); `guides/middleware.md:233` reads `reserved-device-name` on one line.
- MF3: `guides/middleware.md:29` carries the lead-in sentence directly under `### Mount a battery`, before the fence at `:31`.
- MF4: `guides/middleware.md:77` carries the added convention clause; `:108,111,112,130` carry `SessionLimits plus {…}`, `SessionCursors plus {…}` (twice, both `SessionRow` and `SessionEntry`, per the standing condition), and `Omit<MultipartFile, 'status'> plus { status }`.
- MF5: `guides/middleware.md:185-189` heads `Shape` under the constants sentence with `sessionColumns`'s bare-member cell.
- MF6: `tests/guides.test.ts:1-3` matches the pilot's header byte for byte per the report's `diff` command; the drop-in region is unmoved per the diff (only the header line and the appended executed section changed).
- MF7: `tests/guides.test.ts:276-319` carries `describe('flagship fences')` with the transcribed `Mount a battery` fence and the presence guard, matching the guide fence at `guides/middleware.md:31-44` line for line.
- MF8: no remaining all-caps hit in `src/**` outside HTTP methods, header values (`DENY`, `SAMEORIGIN`), acronyms, CVE identifiers, Node error codes, and filenames — confirmed by an independent sweep of `\b[A-Z]{3,}\b` over `src`.
- MF9: `src/core/constants.ts` (`DEFAULT_LIMITER_MESSAGE`, `DEFAULT_PERMISSIONS_POLICY`, `DEFAULT_CSP`) each name their literal first in the description, mirrored in `guides/middleware.md:143,145,158`.
- MF10: `README.md:49-51` carries the shortened paragraph with no second battery enumeration; `## Install`/`## Usage` fences sit directly under their headings.
- MF11: `guides/middleware.md:220` carries the guard-table sentence with narrowed-type cells at `:224-227`; every fence directly under a heading (`:29,586,610,628,655,703,718,734,756,768,798`) carries a lead-in sentence, matching the close brief's list exactly; `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| '` finds no empty `Shape` cell in the tree.

**Findings outside the claims.** None beyond the deviation the brief already dispositions (the `SessionCursors plus` count of `2` and the node-face `createCompression` row), both of which the Orchestrator ruled correct in the standing conditions and which this checker confirms on the tree.

**Referrals.** None — claim 2's failure is a mechanical writing-rule violation with named `file:line` evidence, not a judgment call.

VERDICT: FAIL 2
