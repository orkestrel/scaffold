Lane held: checker browser

**Claim 1 — PASS.** `d7n-browser-prep.status.txt` and `.diff.txt` list exactly `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `guides/browser.md` (2 voice/prose lines only), `package-lock.json`, `package.json` (`docs` script row + version), `src/core/helpers.ts`, `src/server/types.ts` (comment-only), the six `tests/**` voice-site files, `tests/guides.test.ts`, `tsconfig.json`, and untracked `scripts/docs.ts`. `package-lock.json` diff (lines 1096-1626 of `d7n-browser-prep.diff.txt`) drops only the extraneous `vite-plugin-dts` subtree and bumps the root version; `@orkestrel/contract` stays `^0.0.16` throughout. No `@orkestrel/*` range moved.

**Claim 2 — PASS.** `tests/guides.test.ts` lines 156-181, 201-238 in `/home/user/fleet/browser` match `/home/user/fleet/abort/tests/guides.test.ts:146-224` byte for byte outside `MODULES`/`INTERNAL`/`GUIDE_SPEC` constants (confirmed by direct read of both files). `members`/`documented` bound once per `describe`; `examples` bound once at the loop's own scope above its `describe`. `group.methods.length` assertion and the import-walk `findMissing(names, surface)` case are untouched. `test:guides` summary (`Tests 198 passed (198)`) is quoted from a run in the P.1 report.

**Claim 3 — PASS.** Report's before/after table (lines 178-372 of `d7n-browser-prep-report.md`) matches `d7n-browser-prep.diff.txt` hunks for `tests/setup.ts`, `tests/setupServer.ts`, `tests/setupService.ts`, `tests/src/server/Browser.test.ts`, `src/core/helpers.ts`, `src/server/types.ts`, `guides/browser.md`. Every rewrite opens third-person-verb-first without naming the symbol, keeps every fact, moves no code token, changes no assertion value. `git diff -U0 src/` in the diff shows only comment text touched at those two sites.

**Claim 4 — PASS.** Live-tree grep of `/home/user/fleet/browser/guides/browser.md` confirms every `## Surface`/`## Methods` table heads `Summary` beside only `Kind`/`Shape`/`Signature`/`Returns`; `#### Entities` is gone (`grep -n 'Entities'` in report finds nothing), `#### Classes` exists at lines 59 and 292; Constants (line 72) and Guard tables carry the required `Shape` convention sentence above the table.

**Claim 5 — PASS (sampled).** `src/core/constants.ts:10-13` `{@link BASE64_LOOKUP}`/`{@link BASE64_CHARS}` compare correctly as code-token cells in `guides/browser.md:81-83`. Converge report's `cells.py` instrument reads `rows in baseline: 671 rows now: 671`, `keys missing now: []`, `keys added now: []`, `non-Summary cells moved in columns 1 and 2: 0`.

**Claim 6 — PASS.** `grep -rn '@example \S' src` shows exactly one titled block: `src/server/factories.ts:14` (`createBrowser`, the primary factory). `grep -n '^#\+ Connect to a browser and drive a page' guides/browser.md` returns one line (23). Fence body (guide lines 27-36) equals the block body (`factories.ts:15-24`) exactly; no three-backtick run, no `*/`.

**Claim 7 — PASS.** `guides/browser.md:3-6` and `README.md:3-6` carry the identical noun-phrase blockquote with identical line breaks, no link, no bold. Guide's opening paragraph (lines 8-19) and README's (lines 8-11) each carry distinct prose restating no tagline clause; README's `## Install`/`## Requirements` onboarding stays.

**Claim 8 — PASS.** `tests/guides.test.ts` matches pilot lines 1-120 (equality-adjacent cases) byte for byte outside constants: the pin (lines 82-104) uses the guard-and-continue loop with no local type predicate and the both-sides failure line; the README case (111-120) carries two `not.toBeUndefined()` guards before `toBe`; `README.md` is in `ROOT_FILES` (line 55); `GUIDE_SPEC` (line 30) is used at the pin, README case, and manifest lookup; each test is named for what it proves.

**Claim 9 — PASS.** `src/**` diff (`d7n-browser-converge.diff.txt`) shows zero `+export`/`+readonly` member lines — no code token moved. `guides/browser.md` and `README.md` sweeps for count-phrase pattern and all-caps emphasis words (`NOT`, `ONE`, `SAME`, `EXACTLY`, `BOTH`, `WITHOUT`, `RESUMABLE`, `IN-PAGE`, `START`) return nothing. `## Tests` (line 2171) names the equality gate descriptively with no SQ/MQ/EQ/RQ identifier; the titled heading reads as a demonstration.

**Claim 10 — PASS.** `d7n-browser-converge.status.txt` lists exactly `README.md`, `guides/browser.md`, the twelve `src/**` files (doc-block-only), and `tests/guides.test.ts`. `d7n-browser-version.diff.txt` and `.status.txt` confirm `b41f54c` touches only `src/core/constants.ts`'s one literal. `tests/src/core/BrowserHARManager.test.ts:23` verified live; version report quotes red-first (`expected '0.0.15' to be '0.0.16'`, exit 1) and green (`Tests 1 passed | 5 skipped (6)`, exit 0) readings.

**Claim 11 — PASS.** Converge report Criterion 6-7 (lines 180-216) quotes `npm run docs` (`disagreements found: 0`, exit 0), `--to guide`/`--to source` (`written: 0`), scoped format/lint/`check`/`test:guides`/`test:policy` all green, each from a run.

**Claim 12 — FAIL.** Citations sampled (`src/core/BrowserLocator.ts:279`, `src/core/BrowserCookieManager.ts:36`, `tests/src/core/BrowserHARManager.test.ts:23`) all match the tree. But both reports state counts the Writing rules ban ("a number answering 'how many' about a set anyone can add to"), and the checker brief names this ban explicitly as part of this claim:
- `d7n-browser-prep-report.md:21` "the two lines the `test:policy` prose rule named"
- `d7n-browser-prep-report.md:82` "no difference at any of the three named sites"
- `d7n-browser-prep-report.md:176` "The two `src/**` edits touch a doc block and a `@param` line only"
- `d7n-browser-prep-report.md:431` "the two `guides/browser.md` prose rows"
- `d7n-browser-converge-report.md:55` "every one of the nine codes is present"
- `d7n-browser-converge-report.md:93` "The two extending interfaces"
- `d7n-browser-converge-report.md:95` "Seven facts restored", "the two key names", "the three environment variables"
- `d7n-browser-converge-report.md:150` "the two published specifiers"
- `d7n-browser-converge-report.md:262` "why I ran the two scans"

None of these is a duration, size, limit, version, date, exit code, or a measurement reported with the run that produced it (unlike the diffstat and the `cells.py`/`docs` figures, which are permitted run measurements). These are the author's own prose counting growable sets (lines, sites, edits, rows, codes, interfaces, facts, keys, variables, specifiers, scans).

**Claim 13 — PASS.** Both reported defects are real and correctly ruled: (1) `BROWSER_HAR_CREATOR.version` staleness — confirmed red on baseline, blocking, and closed by `b41f54c`; (2) the seed's alias-truncation on a multiline intersection type — confirmed by the current `guides/browser.md:859` cell reading the full corrected literal, non-blocking, correctly routed to the campaign record rather than this checkout.

## Findings outside the claims

- The count-ban violations in claim 12 are pervasive enough across both reports that a future report for this campaign should be swept with the substitution-table/count pattern before being accepted, the way the guide and README prose already were. Right looks like: zero count-phrases in report prose, with any needed number either named by its members or reported as a run measurement (package: browser).

VERDICT: FAIL 12
