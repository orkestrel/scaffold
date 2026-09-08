Lane held: checker browser

## Claim 1 — scope honesty (fix + closing rounds)

PASS. `d7n-browser-converge-fix.status.txt` lists exactly the eight files the fix report's touched-file table names (`README.md`, `guides/browser.md`, `src/core/BrowserDiagnostics.ts`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/server/types.ts`), and the diff's hunks correspond one-to-one to fix-brief items 1–11 with propagation (item 12) accounted for by the docs/oxfmt runs — no unexplained hunk found. `d7n-browser-close.status.txt` lists `guides/browser.md` and `src/server/helpers.ts` only, matching the claim, and `d7n-browser-close.diff.txt` shows exactly: the `Extended constants` `Shape` column (close item 1), two fence lead-ins (close item 4), and the granted `src/server/helpers.ts:330-332` comment patch (close item 5) — nothing else.

## Claim 2 — citations and no prose counts

PASS. Spot-checked citations against the live tree at `/home/user/fleet/browser`: `guides/browser.md:16-19` (surfaces-by-position wording), `:462-501` (Extended constants/classes split with `Shape` column), `tests/guides.test.ts:1-3` (header), and `src/server/helpers.ts:330-332` (granted comment) all match what each report states. Every numeral in both reports is either an exit code, a duration, a diffstat, or a test-runner count quoted verbatim from the command that produced it (for example, `d7n-browser-converge-fix-report.md:22` `` `8 files changed, 121 insertions(+), 109 deletions(-)` `` and `:422` `Tests 201 passed (201)`), which `AGENTS.md` § Writing exempts as "a measurement reported with the run that produced it." No authored-prose count found in either report.

## Claim 3 — fix-round corrections (B1–B11)

PASS for every listed item, evidenced directly against `d7n-browser-converge-fix.diff.txt` and the tip: B1 (`mid-request`, `off-shape` rewrapped, `errors.ts`/`helpers.ts`), B2 (`### Drive the core client over an injected transport` with its own fence and lead-in), B3 (six cells backticked with a following noun; transport sentence agrees at `guides/browser.md:965` and `src/core/types.ts:21`), B4 (`guides/browser.md:16-17` names core/server without a position word), B5 (`#### Extended constants` / `#### Extended classes` split; `entities` removed from `README.md:57`), B6 (README fence uses `createCDPClient({ transport })`), B7 (`BROWSER_RESULT_LIMIT_PATTERN` description ends in a code-span pattern with rationale in `@remarks`), B8 (`BROWSER_WAIT_POLL_INTERVAL_MS` `@remarks` regains slack/readiness facts; `CDPError`'s `@remarks` no longer restates the field list), B9 (`{@link BROWSER_RESULT_LIMIT}` restored; `String#length` in a code span; `LOCAL DETACH ONLY`/`REMOTE` lowered), B10 (`BROWSER_CODEGEN_SOURCE` remark reflowed), B11 (`below`/`above` replaced at `guides/browser.md:219`, `:1088`, `:1144`).

## Claim 4 — closing-unit corrections

FAIL. The claim asserts "the drop-in's lines 1 to 3 equal the pilot's." They do not. Reading `/home/user/fleet/browser/tests/guides.test.ts:1-3` against the pilot `/home/user/fleet/abort/tests/guides.test.ts:1-3`:

- Pilot line 3: `// package's own, as is the executed section that closes the file.`
- Browser line 3 (unchanged by the close round): `// package's own, and are the only part a sibling package changes.`

Ruling 21 struck that exact clause fleet-wide ("The clause 'and are the only part a sibling package changes' is struck... The pilot carries the header first and every closing unit converges on the pilot's bytes."), so browser's line 3 is the pre-Ruling-21 text, not the canon. The closing brief itself surfaced this divergence (`d7n-browser-close-brief.md:146`, the `3c3` diff) but scoped its own acceptance criterion to "line 2 equals the pilot's" only, and the closing unit made no edit. `d7n-browser-close-report.md`'s Item 3 then mischaracterizes this as "the header's own line 3 per Ruling 21" being one of "the package-specific bindings the canon permits" — the opposite of what Ruling 21 states, since line 3 is exactly the byte Ruling 21 unified across every package.

Every other part of claim 4 holds: the `#### Extended constants` table heads `Shape` under the constants sentence (`guides/browser.md:464`, `BROWSER_HAR_CREATOR` as `` `{ name, version }` ``, Ruling 19's object-literal form); the fences at `guides/browser.md:2069` and `:2086`-adjacent (post-edit `:2071`/`:2090`) each gained a lead-in sentence; the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block and cases appended, per the close report's own diff reading (uncontradicted by direct inspection of the surrounding structure); `src/server/helpers.ts` changed only at the granted comment lines (confirmed against `d7n-browser-close.diff.txt`).

## Findings outside the claims

None beyond the claim-4 evidence above; the close report's mischaracterization of the line-3 divergence is folded into claim 4 rather than raised separately, since it is the direct explanation for the failure.

## Referrals

None. The line-3 divergence is a mechanical byte comparison against an explicit ruling, not a judgment call.

VERDICT: FAIL 4
