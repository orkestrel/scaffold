# Capture recipe correction

The recipe separates awaited journey theme actions from the optional synchronous capture hook. The portfolio example consumes injected `JourneyVariant` data directly and captures navigation after the local `applyTheme` action and navigation-state convergence. Source is frozen for independent review; this report does not accept the release or the live capture repair.

## Scope and baseline

The effective brief is `.orkestrel/campaign/capture-recipe-unit-2/capture-recipe-brief.md`. The sole writing checkout is `C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75`, branch `recovery/scaffold-0.0.75`, with clean tracked baseline `c50efef0f741caafe1a80c1ef9ee4004f8be0f2b`. Other agents work in the separate Roughnotes checkout.

The source delta is limited to `.agents/skills/orkestrel-prove-journey/SKILL.md`, `.agents/skills/orkestrel-prove-journey/references/captures.md`, and generated `host.json`. No fixture digest change was required by the scoped checks. No shared-file patch is proposed. The old packed archive, prior reports, product and library behavior, dependencies, package versions, lockfiles, other skills, and canonical `.codex` files were not changed.

Completion for this unit requires awaited theme preparation in the recipe, data-only variants when the capture needs no synchronous preparation, retained synchronous-hook guidance, a single preparation-rule home, refreshed inventory, scoped checks, and retained diff/status evidence. The independent full gates and downstream browser regression remain parent obligations under the brief.

## Installed contract evidence

The installed `node_modules/@orkestrel/test/package.json` file declares version `0.0.18`; the candidate manifest declares `^0.0.18`. Its public core entry, `node_modules/@orkestrel/test/dist/src/core/index.d.ts:393`, exports `JourneyVariant` with readonly `name`, `width`, and `height` data. Its public browser entry, `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:297`, exports `CaptureVariant extends JourneyVariant`, with `readonly apply?: () => void` at line 302. `createPortfolio` is exported at line 695.

The installed implementation, `node_modules/@orkestrel/test/dist/src/browser/index.js:2600`, invokes `selected.apply?.()` before awaiting `captureFrame`; it does not await the hook. The example's published `clickAccessible` and `waitForState` role/name signatures resolve at browser declaration lines 381 and 2547. `applyTheme` remains explicitly a local browser setup helper imported from `../../setupBrowser.js`; it is not presented as a package export.

## Motivating defect measurement

The real Roughnotes record is `C:/Users/mikes/WebstormProjects/scaffold/tmp/recovery/roughnotes/tmp/units/r-b-report-10.md`. Its capture command preserves the preceding `CAPTURE` value, sets `CAPTURE=1`, executes `npm.cmd run test:journey -- --project journey:light-390`, and restores the environment in `finally`.

The actual log, `C:/Users/mikes/WebstormProjects/scaffold/tmp/recovery/roughnotes/tmp/units/navigation-capture-10-after.log.txt:290`, records `[Unhandled rejection] Error: Interactive target "Use dark theme" is not visible and focus-reachable`. The trusted `PromiseRejectionEvent` appears at line 310. The run exited 0 and reported 44 passed in 48.33 seconds, so the exit code and passed-test tally did not bind to the emitted defect. The stack reaches the asynchronous `applyTheme` operation at `tests/setupBrowser.ts:1061`, its `apply` adapter at line 1088, portfolio invocation at browser implementation line 2600, and navigation capture at integration line 509.

The parent supplied this executed defect evidence and confirmed that Roughnotes successor 11 owns the real rejection recorder, its failing run, and the same command's passing run after the adapter is removed. This recipe unit adds no prose-matching regression test and does not claim that the live defect has run green. The design ruling is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/r-b-capture-theme-design-verdict.md`.

## Instruction and inventory delta

The skill's `Prepare the capture theme` section owns the preparation rule. It requires awaiting interactive theme preparation before driving the captured state, prohibits asynchronous `CaptureVariant.apply` actions and covered-control re-resolution at capture time, and retains optional synchronous attribute preparation for a surface with no theme control. The capture reference links to that section and removes mandatory composed-list wording.

The example separates the browser setup `ProvidedContext` declaration from the journey consumer, reads the injected data directly, and uses every imported binding. It calls `await applyTheme(VARIANT)` before opening navigation and placing its frame. The prose requires the shipped application entry and real provisions before the journey runs.

`npm.cmd run build:inventory` exited 0 and reported `build-inventory: staged 175 file(s) into host.json`. The generated entry and membership digests changed as follows:

| Destination | Baseline digest | Frozen digest |
| --- | --- | --- |
| `.agents/skills/orkestrel-prove-journey/SKILL.md` | `2e18a1917b1b6ab4a523c14c9c00f5aad3d553f6c9f4b34b4cac43692c3efe55` | `6641bc22518dcc6f60bffa15d014e980c52c92f15e9a4a8bf34b541da17af449` |
| `.agents/skills/orkestrel-prove-journey/references/captures.md` | `a9fcd48be6a92dd717fc69fbb2a90e0406aa1d5b238cde7c2a760d345c0c3315` | `e36b56406d3e8643f253196d915ea1f265aae3169e810769171f75a8ab4461f5` |
| Inventory membership | `e8845599ab7b210cffae4f2a08409ad7b073473dbb070d074d7c87b4857a73b6` | `3db7ab94e3a1afe8a5af29d49075d6b94a88a3f023672a629f563f0058434b56` |

## Scoped validation

The following commands ran in the isolated candidate checkout on Windows PowerShell on 2026-09-18. Logs sit in `.orkestrel/campaign/capture-recipe-unit-2/capture-recipe-evidence/`. Each logged native command used `Tee-Object` and explicitly exited with its `$LASTEXITCODE`; PowerShell rendered npm notice stderr as `NativeCommandError` records without changing the native exit code.

| Exact command | Actual result | Evidence |
| --- | --- | --- |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md` | Exit 0; owned Markdown formatting only | Tool output |
| `npm.cmd run build:inventory` | Exit 0; generator refreshed the inventory | Tool output and actual inventory diff |
| `npm.cmd run test:policy -- -t 'skill family policy\|skill bridge policy'` | Exit 0; 51 passed, 59 excluded by the name filter | `policy.log.txt` |
| `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t inspectSkillImports` | Exit 0; 15 passed, 56 excluded by the name filter | `imports.log.txt` |
| `npm.cmd run test:config -- -t 'keeps the committed host inventory aligned with the vendored checkout bytes'` | Exit 0; 1 passed, 173 excluded by the name filter; fresh generated bytes equal committed inventory | `inventory.log.txt` |
| `npm.cmd run test:guides` | Exit 0; 23 passed | `guides.log.txt` |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md host.json` | Exit 0; owned Markdown passes; repository ignore excludes generated `host.json` | `format.log.txt` |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --ignore-path .gitignore --check host.json` | Exit 1; supplemental bypass of the repository formatter exclusion reports generated inventory format drift | `format-inventory.log.txt` |
| `git diff --check -- .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md host.json` | Exit 0 | Tool output |

The supplementary formatter command inspected the generator-owned artifact with its documented exclusion bypassed. `.prettierignore` explicitly excludes `host.json` because its bytes belong to `stageInventory`. No generated-byte rewrite or formatter-policy change was made. The authoritative inventory parity command passed after regeneration.

The text-integrity and prohibited-term sweep used `rg -n -i 'should|simply|easy|utilize|leverage|performant|robust|ensure|guarantee|soon|�|Ã|Â|â€'` over the owned skill and capture reference. It reported no match and exited 1. This sweep measures the named text patterns only; the real skill/import and guide tests provide the corresponding structural checks.

## Retained proposal and freeze

The actual tracked diff, status, diffstat, and frozen hashes are `.orkestrel/campaign/capture-recipe-unit-2/capture-recipe-evidence/actual.diff`, `status.txt`, `diffstat.txt`, and `frozen-hashes.tsv`. The measured tracked diffstat is 46 insertions and 21 deletions across the owned source and generated inventory paths. The report and evidence are ignored scratch artifacts, ready for parent retention.

No scoped fixture failure or rule/guide conflict required an unowned correction. Full release gates, archive regeneration, independent audit, the real Roughnotes rejection-regression red/green record, and downstream field proof are not measured by these scoped results. The source is frozen; no commit, install, publication, deletion, or delegation occurred.
