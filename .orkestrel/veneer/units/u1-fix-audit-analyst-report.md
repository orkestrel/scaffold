Audited `690bbb4b9f542f4d67cee6d26b7b3c929d52c75f`; the checkout is clean. This is a source review with read-only probes. Browser suites and write-producing gates were not run.

1. **CONFIRMED — Containment.** `tests/setupConformance.ts:168–174` preserves extraction and real-path resolution and delegates containment to `resolveContained`. `tests/conformance.test.ts:79` uses that primitive. Read-only probes reproduced the contained-path and parent-escape controls.

2. **CONFIRMED — CommonJS specifiers.** `tests/setupConformance.ts:131–139` collects literal arguments to identifier `require` calls. Probes covered nested calls and mixed ES/CommonJS source order; `object.require('vue')` correctly remained excluded. The controls exist at `tests/setupConformance.test.ts:117,132`; the report records their earlier failure at line 8.

3. **CONFIRMED — Digest controls.** `tests/setupConformance.test.ts:60–72` compares each artifact against its pin and checks pairwise inequality. Direct reads reproduced every comparison. The renamed digest-reader case describes its byte-change and missing-file assertions. Finding 16 addresses separate wording compliance.

4. **CONFIRMED — Layer assertion.** `tests/distribution.test.ts:919–928` checks presence, the initial `theme` name, and complete order. The former negative comparison is gone. An empty reading violates presence; `['utilities']` violates the initial-name requirement.

5. **REFUTED — RTL guard.** [tests/setupStyles.test.ts:6](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:6) misses asymmetric shorthand declarations. Passing `:root { margin: 0 1px 0 2px; }` through installed Sass and Lightning CSS produced identical directional strings containing `margin:0 1px 0 2px`; the guard passed. Its `padding-left:1px` control correctly failed, and logical padding correctly passed. The build copies CSS unchanged at `configs/src/vite.styles.config.ts:27`. The report records the requested planted failure; independent blob hashes confirm `_tokens.scss` is byte-identical to `HEAD`.

6. **CONFIRMED — Static stylesheet import.** `app/browser/main.ts:1–5` imports the library SCSS before application SCSS, declares nothing, and executes synchronously. Running the exact lint script body, `node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings .`, exited 0 without suppression.

7. **CONFIRMED — Ownership contract.** `src/browser/color-mode/ColorMode.ts:35–51` sets ownership after setting dark, clears ownership after removal, and gates destruction on ownership. The requested ordering appears at `tests/src/browser/color-mode/ColorMode.test.ts:69–75`; report line 13 records its earlier `null` result. The contract wording remains unchanged in `src/browser/types.ts:22` and `guides/veneer.md:35`.

8. **UNDECIDABLE — Landmark resolution.** The source change is correct: `app/browser/showcases/Showcase.ts:36–38` leaves `main` unnamed and names the section `Showcase`. Existing consumers still query that name at `tests/app/browser/integration.test.ts:67` and `tests/app/browser/showcases/Showcase.test.ts:24`. No independent browser reading establishes their continued resolution.

9. **UNDECIDABLE — Showcase column.** `guides/README.md:8–10` contains the required column and resolving `../app/browser` link. The green `test:guides` result appears only in the builder’s report, line 15.

10. **CONFIRMED — Recorder extraction.** `tests/setupBrowser.ts:45–64` installs the recorder, awaits the action, restores in `finally`, and returns targets. The empty/document cases appear at `tests/setupBrowser.test.ts:15–26`; both entry tests use the helper. A read-only extraction probe using real Node `EventTarget` verified empty results, target identity, restoration, and rejection propagation. This does not establish browser-suite success.

11. **UNDECIDABLE — Distribution page.** `tests/distribution.test.ts:603,647` contains the required link and public-directory destination. Installed Vite handles `vite-ignore` at `node_modules/vite/dist/node/chunks/node.js:5599`. The report’s lines 96–104 supply only the builder’s success assertion, not independent host evidence that the named cases executed successfully with registry access.

12. **REFUTED — Scope and process.** The committed diff stays within owned paths; manifest, lockfile, and token-file comparisons are unchanged. However, `git reflog` retains `reset: moving to HEAD` entries at `2026-09-20 04:21:21 -0400` and `04:25:17 -0400`. That contradicts “no trace … in the reflog beyond a dropped stash.” The available record cannot establish that the successor issued no git write.

13. **UNDECIDABLE — Gates.** The lint command reproduces green. Full same-commit reproduction remains unestablished: distribution packs, installs, and writes consumer files (`tests/distribution.test.ts:719–733`), and the build deletes and recreates output. Those commands conflict with this audit’s no-write instruction.

The additional findings concern coding and wording rules beyond the numbered claims.

14. **Nested function assignment.** [tests/setupBrowser.test.ts:20](C:/Users/mikes/WebstormProjects/veneer/tests/setupBrowser.test.ts:20) introduces `const listener = (): void => undefined` inside a test callback. Scaffold `AGENTS.md:68` and `.claude/rules/architecture.md:167` prohibit that form. Use an existing recorder’s handler or a properly placed helper.

15. **Misplaced module constant.** [tests/setupStyles.test.ts:5](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:5) adds a hidden module-scope regex constant. Scaffold `.claude/rules/architecture.md:58` places module constants in their designated file. Because this expression serves one case, fold it into that callback.

16. **Count in a case name.** [tests/setupConformance.test.ts:60](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.test.ts:60) says “pins three distinct digests.” Scaffold `AGENTS.md:172` explicitly prohibits such counts. Remove “three”; the remaining name preserves the meaning.

Verdict: fix round — claims 5 and 12 are refuted; claims 8, 9, 11, and 13 remain undecidable; extra findings 14–16 require fixes.