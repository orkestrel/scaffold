Verdicts for claims 1, 5, and 6 of `/home/user/scaffold/.orkestrel/veneer/units/upl-audit-4-claims.md`. All reads confined to the named evidence; no command was run.

## Claim 1 — Delta and scope: CONFIRMED

- `upl-4-status.txt:1-17` and `upl-3-status.txt:1-17` are line-for-line identical.
- `upl-shared-4.patch` and `upl-shared-3.patch`: `diff --git` headers at lines 1,30,193,204,689,704,745,783,853,950,960,996,1006,1064,1074,1203,1238,1313,1584(4)/1582(3) name the same file set in both patches — no file added or removed.
- `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-4/round-delta-shared.diff:1-21` shows exactly one file, `tests/setupStyles.test.ts`, with the `TRANSLATION_BOX` import beside `PLACEMENT_CONTAINER` (line 9) and the one added assertion (line 17) — nothing else.
- `/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-4/round-delta.diff:1-134` shows exactly `app/browser/styles/_shell.scss` (comment-only hunk, lines 1-18), `tests/app/browser/sections/SizingSection.test.ts`, `tests/src/styles/utilities/position.test.ts`, and `tests/src/styles/utilities/sizing.test.ts` — matching the round-3 rename/fixture-binding shape described in the report, nothing further.
- `upl-4.diff:1-303` (owned files) touches only `app/browser/styles/_shell.scss` and the seven new untracked owned files (`sections/*.ts`, `src/styles/*.scss`, matching test files) — no vendored file, no sibling-unit file, no `src/browser/**`, no `src/core/**`, `package.json`, `README.md`, or `ROADMAP.md`.
- The shared-patch file list (`app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/index.scss`, and the named `tests/**` files) likewise contains none of the disallowed paths.

Mutation-sensitivity: a lane confirming "no patch touches a disallowed file" is confirmed by the absence of a matching `diff --git` header, and the mutation that would falsify it — adding a hunk against `package.json` or `src/core/**` — is directly distinguishable by grep over the header lines already read above.

## Claim 5 — The gates: CONFIRMED

`/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-4/fresh-run.log.txt:1-25` reads exit 0 on every line after the two `apply-check … at base` lines (also exit 0), matching the report's § Gates on the fresh copy table verbatim: `format exit=0`, `lint exit=0`, `check exit=0`, `build exit=0`, `styles … 42 passed (42)`, `setup-styles … 110 passed (110)`, `sections … 18 passed (18)`, `conformance … 22 passed (22)`, `service … 18 passed (18)`, `guides … 19 passed (19)`, `policy … 109 passed | 1 skipped (110)`, `setup … 251 passed (251)`, `setup-browser … 66 passed (66)`. The reversal and re-apply lines (20-25) read `reverse unlisted exit=0`, `reverse shared exit=0`, `tracked files other than the owned shell partial at base exit=0`, `apply-check shared after return to base exit=0`, `apply-check unlisted after return to base exit=0` — all exit 0, on the single run recorded (no self-correction line present), consistent with claim 5's "first run with no self-correction."

Mutation-sensitivity: the claim is a proof that every gate exited 0 on one run; the mutation that would falsify it is a nonzero exit or a differing result-line string anywhere in the log, and reading the full log line-by-line against the report's table is what distinguishes that mutation from the passing case — done above.

## Claim 6 — Law and report: CONFIRMED, with one finding outside the claim's own text

**Law on the delta:** grepped `upl-4.diff` and `upl-shared-4.patch` for `any`, non-const `as`, `!`, suppression comments, and function declarations. Every `as` hit is prose ("as the release does", "as wide as") except `upl-shared-4.patch:1499` (`] as const)`), a permitted const assertion. The lone function declaration found, `upl-shared-4.patch:1229` (`export function mountTraversalStart(): HTMLButtonElement {`), is a module-scope exported declaration, not a nested function. No `@ts-`/`eslint-disable` hit. No mock-pattern hit searched separately, but none of the added files import a mocking utility per the diff bodies already read. CONFIRMED.

**Report's history claim:** `upl-instruments-3/fresh-run.log.txt:3,4,7,9,20,23,63,64` shows `format exit=1`, `check exit=0`, `reverse shared exit=1` with `apply-check shared after return to base exit=1` — matching the report's stated format failure, passing check, and failed patch reversal. Grepped `upl-instruments-3/` and `upl-instruments-2/` for `TS2724`/`TS7031`: no file matches either, confirming the report's claim that no retained log carries that diagnostic. CONFIRMED.

**Gate commands in full with result lines:** the report's § Gates on the fresh copy table (`b-utilities-upl-report-4.md:144-160`) states each command in full (for example `npm run format:check`, `npx vitest --config … tests/app/browser/sections/SizingSection.test.ts …`) with its result line. CONFIRMED.

**Banned terms:** grepped the report for the unconditional-ban substitution rows (`should`, `simply`, `easy`, `just`, `utilize`, `leverage`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `slave`): no matches. Grepped the judged-sense rows (`since`, `once`, `above`, `below`, `now`, `new`, `latest`, `master`): the sole hit, `b-utilities-upl-report-4.md:18` (`"...in above 1 files..."`), is inside a backticked literal reproduction of the `format` command's own console output, not authored prose, so it is data rather than a banned sense. CONFIRMED.

**Digests of both patches:** `b-utilities-upl-report-4.md:183-185` states both SHA-256 digests. CONFIRMED as present.

**Retained path stated once:** `/home/user/scaffold/.orkestrel/veneer/units/upl-shared-4.patch` (the full retained path) appears exactly once, at `b-utilities-upl-report-4.md:179`. CONFIRMED.

**Finding outside claim 6's own wording (code token followed by a noun):** `.claude/rules/writing.md` § Code tokens requires a code token to be followed by a noun. `b-utilities-upl-report-4.md:183-185` reads `` SHA-256: `upl-shared-4.patch` `` immediately followed by a bare hash in backticks, then `` `upl-unlisted-4.patch` `` immediately followed by another bare hash — each named patch token is followed by a code token (the digest), not a noun. This is a writing-rule violation the claim's own text does not name, so it is a finding outside the claims rather than a break of claim 6 as stated.

## Counts the report states, listed

`b-utilities-upl-report-4.md` § Gates on the fresh copy: `42 passed (42)`, `110 passed (110)`, `18 passed (18)`, `22 passed (22)`, `18 passed (18)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `251 passed (251)`, `66 passed (66)`. § The geometric cap mutation: `2 failed | 11 passed (13)`. § The round-2 setup controls re-run table: `110 passed (110)`, `66 passed (66)`, `1 failed | 109 passed (110)` (four rows), `2 failed | 108 passed (110)`, `1 failed | 65 passed (66)`. § The translation fixture's binding: `1 failed | 109 passed (110)`. Each is a measured run result reported with the run that produced it (permitted under `AGENTS.md` § Writing), not a count of a growable set.

## Terminal line

VERDICT: FAIL none; outside the claims: code-token-noun violation at `b-utilities-upl-report-4.md:183-185` (patch name followed by digest, not a noun)
