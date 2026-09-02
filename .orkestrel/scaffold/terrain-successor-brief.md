# Unit U6s — close what the resolver defect held open in terrain

## Supersedes

Nothing. Successor to `terrain-reference-brief.md` after U3s3 fixed the exact-name resolver in
`@orkestrel/test` and the Orchestrator re-staged the rebuilt tarball into terrain.

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\terrain`. Perform the assignment directly and spawn nothing.

## Objective

Complete the three proofs `terrain-reference-report.md` left open on the layer finding, on the
rebuilt layer, and remove every comment or workaround that named the defect.

## Context

- The finding and its workarounds: `terrain-reference-report.md` § Layer finding and § Surface
  findings. The fix: `test/tmp/units/resolve-hidden-report.md` (mechanism and bound).
- `node_modules/@orkestrel/test` holds the rebuilt campaign tarball; prove it first with
  `npm ls @orkestrel/test` and by reading the resolver in
  `node_modules/@orkestrel/test/dist/browser/index.js` for the two-pass shape the fix report
  describes. Where the installed copy is still the old build, stop and report.
- Skill: `orkestrel-prove-journey` and every reference it names. Rules: `AGENTS.md`,
  `.claude/rules/tests.md`, `.claude/rules/browser.md`. Guide: terrain's `guides/README.md`.
- Standing conditions: the lockfile pair (`D  package-lock.json`, `?? package-lock.json`) is the
  user's; never stage, restore, or rewrite it. Commit nothing.
- Host: Windows 11, Git Bash; Playwright Chromium installed. Variant and flag names:
  `VITE_VARIANT` (`light-1280`, `dark-1280`, `light-390`, `dark-390`), `VITE_CAPTURE=true`.

## Work

1. Refusal family: add the reachable half. Open the CSV menu through its named control, then
   resolve `Import buildings from CSV` and assert it is reachable; keep the withheld half's exact
   voice assertion.
2. `mountSurface`: resolve the first-run dialog by its region name `Quick reference` rather than
   through its `Close` control, and read it through `readPerception`.
3. Remove every comment naming the resolver defect as the reason a proof is absent, and every
   workaround the fix makes unnecessary. Keep a comment that records a surface fact.
4. Run the suite once per variant (four runs) and once with `VITE_CAPTURE=true` for `light-1280`
   and `dark-390`; record each run's bare summary line.

## Scope

**Owned.** `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`,
`tests/setupBrowser.ts`. **Off-limits.** `app/**`, `src/**`, every other test file, `package.json`,
the lockfile pair, vendored files.

## Output

Write `tmp/units/terrain-successor-report.md` and return it as your final message: the installed
resolver proof, each change with the voice or reading it asserts, the six run summaries,
`git diff --stat`, `git status --porcelain`, and the claims you could not close.

## Deviation contract

Stop and report when the installed layer still fails a case the fix report claims green, when a
proof needs an `app/**` change, or when a run is red for a reason outside the three changes.
Decide and record test names and comment wording.

## Acceptance criteria

1. The refusal family asserts both halves for `Import buildings from CSV`.
2. `mountSurface` resolves the dialog by name and `readPerception` reads it.
3. No comment in the owned files names the resolver defect; all six runs green.
