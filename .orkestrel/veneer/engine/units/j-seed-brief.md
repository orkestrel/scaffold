# Unit J-SEED — `ColorMode` writes nothing after `destroy()`

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`. The executor that opens this brief is that subagent, the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-seed` (branch `unit/seed`, base `376d84a` of Veneer `main`).

## Objective

Repair the seed's one lifetime defect (design verdict R16): after `destroy()`, `ColorMode.apply` and `ColorMode.toggle` write neither the root's attribute nor storage, `toggle` returns the root's live mode without writing, and the proof reddens on the inherited source before the repair and passes after it.

## Context

**Evidence.** `sed -n 46,63p C:/Users/mikes/WebstormProjects/veneer-seed/src/browser/ColorMode.ts` → `apply(mode)` sets the attribute and storage with no liveness check; `toggle()` calls `apply`; `destroy()` sets `#original` to `undefined` and returns early on a second call. `grep -n "destroy" C:/Users/mikes/WebstormProjects/veneer-seed/tests/src/browser/ColorMode.test.ts` → the existing cases prove restoration and the second `destroy`, and none calls `apply` or `toggle` after `destroy`. `sed -n 42,49p guides/veneer.md` → the § Surface paragraph: "Destruction writes that construction reading back, removes the attribute where the root carried none, and releases the root, so a later call writes nothing." — a sentence about a later `destroy` call, silent on `apply` and `toggle`. `ROADMAP.md` § Rulings, the construction paragraph: "Refuse … post-`destroy` mutation."

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (TTTDD: a failing proof before the fix, the exact command and its failing count recorded); `.claude/rules/tests.md` (real browser, the regression form: the same command red then green; `.claude/rules/typescript.md` (comments explain why; TSDoc voice); `documentation.md` § Parity (a `Summary` cell equals the doc block's description paragraph; method summaries equal the method TSDoc's first paragraph); `writing.md`; skill: none; spec: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` R16 and R1.

**Installed primitives.** `@orkestrel/test` (`createRecorder` for a storage recorder if one is needed; read `node_modules/@orkestrel/test/dist/src/core/index.d.ts`), `@orkestrel/test/browser` (`build`, `mount`). A local helper whose job an installed export does is a defect.

**Host.** Windows 11; the subagent's `Bash` is Git Bash; run every command from `C:/Users/mikes/WebstormProjects/veneer-seed`; npm `12.0.2`; the browser project launches the Playwright-managed Chromium 153.0.8010.12; the receipt names that build. `npm run test:src:browser -- tests/src/browser/ColorMode.test.ts` runs the one file.

**Measurements.** None beyond the evidence row.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `ColorModeInterface` in `src/browser/types.ts` is owned by the parallel J-TYPES unit and is off-limits here; the method summaries there ("Writes the mode to the root and to storage when configured.", "Flips the mode and returns the applied mode.") stay as they are, and the post-destroy behaviour is stated in the class doc block's `@remarks` and in the guide paragraph, which parity does not compare. The guide's § Methods `#### \`ColorModeInterface\`` table therefore stays unchanged.

## Unknowns

None.

## Scope

**Owned.** `src/browser/ColorMode.ts`; `tests/src/browser/ColorMode.test.ts`; in `guides/veneer.md`, the § Surface paragraph sentence that begins "Destruction writes that construction reading back" (extend it to state that `apply` and `toggle` after destruction write nothing and `toggle` returns the live mode).

**Shared (report-only).** None.

**Off-limits.** Every other file, `src/browser/types.ts` included (J-TYPES owns it in a parallel worktree), the vendored `tests/setupPolicy.ts` and `tests/policy.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `src/styles/**`, `app/**`, `configs/**`, the lockfile.

**What asserts the state this change ends.** `tests/src/browser/ColorMode.test.ts` (owned); `tests/guides.test.ts` (the guide paragraph is prose parity does not compare; the class summary is unchanged) — read-only, stays green; `tests/policy.test.ts` (the prose sweep over the edited guide sentence) — read-only, stays green.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build`. Scoped validation: `npm run test:src:browser -- tests/src/browser/ColorMode.test.ts`, `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/ColorMode.ts tests/src/browser/ColorMode.test.ts`, `npx oxfmt --config .oxfmtrc.json --check src/browser/ColorMode.ts tests/src/browser/ColorMode.test.ts guides/veneer.md` (`--write` on your two TypeScript files where the check fails; never on the guide), `npm run test:policy`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write the report to `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/j-seed-report.md` and return its path as your final message. The report carries: the touched files with one line each; the red-first record (the exact command, its failing count, and the failing case names before the fix; the same command's passing count after); the mutation each new assertion distinguishes (reverting the liveness check reddens which assertion); the command and output of each acceptance criterion; `git status --short` and `git diff --stat`; deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when the repair needs a change to `src/browser/types.ts` or another off-limits file. Decide, record, and carry on from how the liveness reading is expressed (the existing `#original === undefined` reading is the destroyed state; add no second flag) and from the guide sentence's wording.

## Acceptance criteria

1. `npm run test:src:browser -- tests/src/browser/ColorMode.test.ts` ran red on the inherited source with the new cases (the failing count recorded) and exits 0 after the repair, in Chromium 153.0.8010.12.
2. `npm run check:src:browser` exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/ColorMode.ts tests/src/browser/ColorMode.test.ts` and `npx oxfmt --config .oxfmtrc.json --check src/browser/ColorMode.ts tests/src/browser/ColorMode.test.ts guides/veneer.md` exit 0.
4. After `destroy()`, `apply('dark')` leaves the root's attribute and storage unchanged and `toggle()` returns the root's live mode without writing, each asserted on a root with and without an original attribute and with storage supplied; a second `destroy()` still writes nothing.
5. `npm run test:policy` and `npm run test:guides` exit 0.

**Observations, not criteria.** The whole `src:browser` project (the Orchestrator takes the authoritative run).

## Review evidence

A code change: the actual diff and the actual status output, both in the report.
