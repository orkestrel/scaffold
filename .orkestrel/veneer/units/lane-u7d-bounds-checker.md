<!-- workflow wf_8db70e17-fda, agent a43cb3765e68bd93e, label unknown, retained 2026-09-20 -->

## Claim | Verdict | Evidence

| Claim | Verdict | Evidence |
|---|---|---|
| 9 [mechanical] | CONFIRMED | `tmp/audit/u7d-bounds-status.txt` lines 1-5 list exactly `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/setupConformance.test.ts`, `tests/setupConformance.ts`, `tests/setupStyles.test.ts`; `tests/setupStyles.ts` and every other named path (`src/**`, `app/**`, `guides/**`, `package.json`, `vite.config.ts`, `configs/**`, `tests/src/**`, `tests/app/**`, `tests/conformance.test.ts`, `tests/fixtures/**`) are absent from `u7d-bounds-diff.patch.txt`. A pattern sweep of the diff for `!.`, `!)`, `: any`, `@ts-`, `eslint-disable`, `it.skip`, `it.todo`, `it.fails`, `test.skip`, `describe.skip` returned no matches; a sweep for ` as ` returned only `as const` (diff lines 289, 297) and prose/comment/`* as setup` uses, none a type assertion. No new module-scope function is added by the diff — `matchesOracleEvents`, `readManifestMember`, `computeArtifactDigest`, `BOOTSTRAP_MANIFEST_PATH`, `WORKSPACE_ROOT` are pre-existing exports newly imported (diff lines 144, 420-426), not declared. No nested function declaration exists outside an `it(...)` callback argument or a `.map`/`.filter` callback argument (diff lines 358-370, 390-402). `it(` titles at diff lines 10, 24, 46, 153, 193, 239, 288 name no control/plant/probe term. |
| 10 [mechanical] | CONFIRMED | Every removed `it(` title in the diff has a same-position rewritten successor: `'matches a mix against...'` → `'agrees with the installed reader...'` (diff lines 9-10); `'reads the channels a modern color function paints...'` → `'reads a modern color function as whole-byte channels...'` (diff lines 23-24); `'binds every table entry to a saved fixture step and omits keyboard obligations'` → `'…and a ledger row, and omits keyboard obligations'` (diff lines 152-153); `'proves a native click event from a live activation'` → `'refuses an event obligation the table names no events for, and one it binds no predicate for'` (diff lines 192-193); `'selects an exact event obligation after the wildcard...'` → `'reads the required events from the binding rather than from the obligation wording'` (diff lines 204/239). Added titles are exactly the split-category and out-of-gamut cases the claim names: `'paints an out-of-gamut color on the sRGB edge the installed reader clips it to'` (diff line 46) and `'withholds a component carrying an accepted row beside a shipped one in the same category'` (diff line 288). |

## Probe readings

- **Scope**: confirmed above under claim 9; `tests/setupStyles.ts` is unchanged (not in the diff, not in the status output) though the report and Sites reference it as a location that stayed as-is.
- **Doc blocks**: `readPaintedColor`'s landed `@remarks` (diff lines 79-94) drops the sentence "a modern color function computes to itself, so an `oklch()` or `oklab()` recording comes back unread" and states the reading now goes through "the CSS Color 4 matrices" and canvas rasterization. The installed `parseCSSColor` doc block (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1657-1712`) confirms `parseColor`'s supported syntaxes include `oklab()`, `oklch()`, `lab()`, `lch()`, and `color()`, resolved "through the CSS Color 4 matrices" — no sentence in the installed declaration says a modern colour function comes back unread. `matchesPaintedColor`'s landed `@remarks` (diff lines 106-121) similarly drops the old "unread" claim and states the comparison is over engine-rendered pairs. No sentence in either landed doc block still claims a modern colour function comes back unread.
- **Cases**: enumerated under claim 10; matches.
- **Letter of the law**: no forbidden syntax found (see claim 9 evidence); no unexported/untested module-scope function added; no nested function declaration outside a permitted callback form.
- **Installed-primitive probe**: the diff adds no new helper function — it only newly imports and calls pre-existing exports (`matchesOracleEvents`, `readManifestMember`, `computeArtifactDigest`, `BOOTSTRAP_MANIFEST_PATH`, `WORKSPACE_ROOT`, `createHash`) already declared in `tests/setupConformance.ts` or `node:crypto`/`node:path`. No overlap finding.

## Extra findings

None found.

Verdict: accept
