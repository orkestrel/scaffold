# Unit U1-fix — the U1 audit's fix round

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You are the sole writer in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
for the life of this unit. Every fix below is fully specified; where a sentence leaves a choice,
the deviation contract names it.

## Objective

Close the findings the U1 audit round substantiated (`u1-audit-verdict.md` under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`), each with the proof that binds it,
and leave every gate green on managed Chromium.

## Context

**Checkout.** Clean at `ae0221d`. Managed Chromium runs every browser project; `npm run <name>`
from the checkout. No install, no `scaffold` verb, no tree-wide `format` (format your owned files
by path, then run `format:check`).

**Findings and their sources.** The objective lane (`reviewer`, native Opus 5,
`u1-audit-reviewer-report.md`) and the subjective lane (`analyst` on Astra,
`u1-audit-analyst-report.md`) both refuted claims 6 and 8 of
`u1-audit-claims.md`; the reviewer added F1 to F6 and the analyst added findings 14 and 15. The
verifier (`u1-gate-report.md`) settled claim 13 green.

**Installed primitives.** `@orkestrel/test/server` exports `resolveContained(root, target)`
("resolves a target that stays below a root directory, or `undefined` when the target escapes";
`node_modules/@orkestrel/test/dist/src/server/index.d.ts:428-435`). `typescript` exposes
`isCallExpression`, `isIdentifier`, `isStringLiteralLike` (already imported in
`tests/setupConformance.ts`).

**Law.** `AGENTS.md`; `.claude/rules/tests.md`, `typescript.md`, `architecture.md`,
`documentation.md`, `browser.md`, `writing.md` under `C:/Users/mikes/WebstormProjects/scaffold/`.

## Scope

**Owned.** `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`,
`tests/distribution.test.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/index.test.ts`,
`app/browser/main.ts`, `app/browser/showcases/Showcase.ts`, `src/browser/color-mode/ColorMode.ts`,
`src/browser/types.ts`, `guides/veneer.md`, `guides/README.md`,
`tests/src/browser/color-mode/ColorMode.test.ts`, `tests/src/browser/index.test.ts`,
`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/showcases/Showcase.test.ts`,
`tests/app/browser/integration.test.ts` (only if the `main` name change breaks a reading).

**Off-limits.** Everything else, including `package.json`, every vendored path, `configs/**`,
`src/styles/**`, `src/core/**`.

**Tools.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash` for the scoped gates. No `git` write.

## Execution

Perform the assignment directly and spawn nothing. Apply each fix, then run the narrowest project
named beside it.

1. **Containment through the installed primitive (claim 6, F1).** In `tests/setupConformance.ts`,
   `readEscapingImport` keeps its specifier extraction and real-path resolution and decides
   containment through `resolveContained(root, target) === undefined` imported from
   `@orkestrel/test/server`, deleting the hand-written `relative`/`'..'`/`isAbsolute` predicate.
   In `tests/conformance.test.ts:79-82` the closure assertion calls the same imported primitive
   instead of restating the expression. Keep `tests/setupConformance.test.ts:116-129` green.
   `npm run test:setup`, `npm run test:conformance`.
2. **CommonJS specifiers (claim 8).** `readSpecifiers` also collects the string argument of every
   `require(...)` call expression whose callee is the identifier `require`, in source order with
   the others. Add to `tests/setupConformance.test.ts` the control: `const dependency = require("vue")`
   reads `['vue']` and `readForbiddenSource` on it returns `'vue'`; run it red first (before the
   change), record the reading, then green. `npm run test:setup`.
3. **Digest controls (claim 8).** In `tests/setupConformance.test.ts`, prove the three digest
   constants against the installed files through `readFileDigest` and add the rejecting control
   that the LTR and RTL digests differ from each other and from the bundle digest; the existing
   export-name assertion stays. Rewrite the case names so they say what is proved where.
   `npm run test:setup`.
4. **Unfalsifiable assertion (F2).** In `tests/distribution.test.ts:927`, replace
   `expect(reading.layers).not.toStrictEqual(['utilities'])` with two assertions that can fail on
   their own: the statement rule was found (`reading.layers.length` greater than zero) before the
   equality, and the first name is `theme`. `npm run test:distribution` (registry cases skip).
5. **RTL guard (F3).** Add to `tests/setupStyles.test.ts` a case that reads `dist/src/styles/index.css`
   and fails when it contains a physical inline-axis declaration (`margin-left`, `margin-right`,
   `padding-left`, `padding-right`, `border-left`, `border-right`, `left:`, `right:`, `float:`,
   `text-align: left`, `text-align: right`) while `index.rtl.css` is byte-identical to it; name
   the case for the permitted state ("ships an RTL cascade that needs no flipping"). Plant
   `padding-left: 1px` into a `:root` rule of `src/styles/_tokens.scss`, build, run the case red,
   record it, remove the plant, and prove removal with `git diff --exit-code -- src/styles/_tokens.scss`.
   `npm run test:src:styles` (builds first), then `npm run test:setup`.
6. **Static stylesheet import (F4).** `app/browser/main.ts` imports the package cascade
   statically as `import '../../src/styles/index.scss'` before `./styles/index.scss`, and the
   dynamic import of `src/styles/index.ts` goes; `main.ts` declares nothing and stays synchronous.
   `npm run lint:check`, `npm run test:app`, `npm run test:journey`.
7. **Ownership contract (F5).** In `src/browser/color-mode/ColorMode.ts`, `#written` is true only
   while this controller's own `set` is the last write it made: `apply('dark')` sets it,
   `apply('light')` (the removal) clears it, and `destroy` removes the attribute only when it is
   true. Add to `tests/src/browser/color-mode/ColorMode.test.ts` the ordering `apply('light')` →
   external `setAttribute('data-bs-theme', 'dark')` → `destroy()` leaves `dark` in place, run it
   red first, record it, then green. Keep `src/browser/types.ts:22` and `guides/veneer.md:35`
   as they read ("Removes the attribute only when this controller wrote it") because the code
   now honors them. `npm run test:src`.
8. **One name per landmark (F6).** Remove the `aria-label` from the `main` element in
   `app/browser/showcases/Showcase.ts`; the `section` keeps the `Showcase` name the proofs read.
   `npm run test:app`, `npm run test:journey`.
9. **Showcase column (analyst 14).** Add a `Showcase` column to the `## By concept` table in
   `guides/README.md` linking [`app/browser`](../app/browser), keeping Source and Tests as they
   are; if `test:guides` refuses the extra column, report the exact finding and instead add the
   showcase link in the prose paragraph under the table. `npm run test:guides`.
10. **One recorder helper (analyst 15).** Extract the listener-recording instrumentation that
    `tests/src/browser/index.test.ts` writes twice into one exported helper in
    `tests/setupBrowser.ts` — `recordListeners(action: () => Promise<unknown>): Promise<readonly EventTarget[]>`
    that installs the recorder on `EventTarget.prototype.addEventListener`, runs the action,
    restores in `finally`, and returns the targets recorded — prove it in
    `tests/setupBrowser.test.ts` (a no-listener action returns an empty list; an action that adds
    a `document` listener returns `[document]`), and make both cases in `index.test.ts` call it.
    `npm run test:setup:browser`, `npm run test:src`.
11. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, `test:src`,
    `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
    `test:setup:browser`, `test:conformance`, `test:guides`, `test:distribution`. Record each
    command's final lines.

## Output

Write `u1-fix-report.md` in the Veneer checkout and return its content: one row per fix
with its site, the red reading where one was required, and the project's green reading; the gate
table; any deviation with expected, found, exact evidence, done or not done, and at most one
hypothesis. No process diary.

## Deviation contract

Stop and report on: a gate that stays red after your own fix inside owned files; a need to edit an
off-limits file; `test:guides` refusing the Showcase column and the prose fallback both. Decide,
record, and carry on from: case names, helper placement inside `tests/setupBrowser.ts`, and the
exact wording of the RTL case name.

## Acceptance criteria

1. Every gate in step 11 exits 0.
2. The three red-first readings (steps 2, 5, 7) are recorded with their exact assertion text.
3. `git status --porcelain` shows only owned files changed and the report present.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
