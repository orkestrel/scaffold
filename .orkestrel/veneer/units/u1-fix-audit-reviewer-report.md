# U1 fix-round audit report, objective lane (reviewer, native Opus 5, 2026-09-20, 531 s), Veneer at `690bbb4`

**Lane held: OBJECTIVE** (correctness, constraints, dependency truth, test sufficiency, mechanical conformance). Subject: diff `ae0221d..690bbb4`, status clean.

## Per-claim verdicts

**1. Containment — CONFIRMED.** `tests/setupConformance.ts:6` imports `resolveContained`; `:169-175` keeps the extraction and `realpathSync` resolution and decides containment at `:173`; `tests/conformance.test.ts:78` calls the same primitive; the installed implementation (`@orkestrel/test/dist/src/server/index.cjs:37-42`) is byte-equivalent to the deleted predicate; no `isAbsolute`/`relative(`/`sep` predicate remains in `tests/**` beyond an unrelated local at `tests/distribution.test.ts:944`; the rejecting control stands at `tests/setupConformance.test.ts:135-148`.

**2. CommonJS specifiers — CONFIRMED.** `tests/setupConformance.ts:131-140` collects `require(...)` string arguments in the same visitor pass; no double count for `import … = require(...)`; controls at `:117` and `:132`; the report's red (`returned []`) matches the pre-change code; no new sweep exposure (`createRequire(...).resolve` has member callees; built `.cjs` sits outside the `.js`/`.d.ts` filter at `tests/conformance.test.ts:96`).

**3. Digest controls — CONFIRMED** (see N2 on the name's count and N3 on duplication).

**4. Falsifiable layer assertion — CONFIRMED.** The unfalsifiable line is gone; the replacements at `tests/distribution.test.ts:919-920` precede the equality and throw on their own.

**5. RTL guard — CONFIRMED.** `tests/setupStyles.test.ts:16-21` fires exactly when the built LTR cascade carries a physical inline-axis declaration and `index.rtl.css` is a byte copy; the report records the planted red; the status is empty so `_tokens.scss` is restored.

**6. Static stylesheet import — CONFIRMED.** `app/browser/main.ts:1-5`; `.oxlintrc.json:43-48` allows an unassigned `**/*.scss` import; the `app/browser` restricted-import patterns do not match.

**7. Ownership — CONFIRMED.** `ColorMode.ts:38` sets `#written = mode === 'dark'`; `:49` returns early when false; the ordering case at `ColorMode.test.ts:69-76`; types and guide honoured.

**8. One landmark name — CONFIRMED.** `Showcase.ts:36-38`; the proofs resolve `Showcase` on exactly one element.

**9. Showcase column — CONFIRMED.** `guides/README.md:8-10`; `@orkestrel/guide` keys the table by header cell and ignores an extra column (`dist/src/core/index.js:2982-2993`).

**10. One recorder helper — CONFIRMED.** `tests/setupBrowser.ts:47-66`; `tests/setupBrowser.test.ts:15-27`; `tests/src/browser/index.test.ts:7,22`; no installed listener recorder exists to reuse.

**11. Distribution page — UNDECIDABLE** (mechanism sound: `vite-ignore` short-circuits the asset attributes at `vite/dist/node/chunks/node.js:5599-5605`; `public/` copies to the outDir root; the pass reading rests on the report). Settled green by the round-2 verifier.

**12. Scope and process — UNDECIDABLE** on the git trace (scope confirmed: every path owned; nothing vendored — `HOST_PATHS` and `SEED_GUIDE_PATHS` name none of the changed files). Settled by the Orchestrator: `git stash list` is empty and the reflog's two `reset: moving to HEAD` entries (04:21, 04:25) precede the fix commit (04:33), so they are the first run's stash and pop; the successor made no git write.

**13. Gates — UNDECIDABLE** (self-consistent counts). Settled green by the round-2 verifier.

## Round-1 findings F1 to F6 — all closed (sites as in the claims above).

## Findings outside the claims

**N1.** `units/u1-fix-report.md:7-11` — per-step green readings could not have been produced at those steps (the `setup` project count was 12 at the baseline and 14 only at the end); the projects were run once at the end. The red readings are consistent with the pre-change code and unaffected.

**N2.** `tests/setupConformance.test.ts:60` — a count in a case name ("pins three distinct digests").

**N3.** `tests/setupConformance.test.ts:61-68` restates `tests/conformance.test.ts:28-35`; the setup proof must assert only what is true of the constants (distinctness, hex shape); the equalities belong to `conformance.test.ts`. Traces to the brief (`u1-fix-brief.md:69-73`), so the correction is the Orchestrator's.

## Referrals

Claims 11 and 13 need the verifier (supplied: `units/u1-gate-report-2.md`); claim 12 needs `git stash list` (supplied above). Dispatch defect in `u1-fix-brief.md`: step 5 planted in a file the brief listed off-limits.

## Observation

`guides/README.md` is birth-owned (`blueprintToGuideArtifacts`, `ownership: "birth"`, `origin: "template"`), in neither `HOST_PATHS` nor `SEED_GUIDE_PATHS`; editing Veneer's copy was legitimate.

Verdict: fix round — findings N1 and N2, with N3 to be ruled by the Orchestrator, and claims 11, 12, and 13 unsettleable without the verifier and the one git read.
