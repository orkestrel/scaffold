# Capture recipe successor

The example captures mounted home after the awaited local theme action. It no longer opens navigation or assumes that an opened modal leaves its trigger reachable. The screenshot directory is verified against the installed provider resolver, and the generated inventory matches the corrected instructions. Source is frozen for independent review.

## Effective scope and predecessor

The effective brief is `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/capture-recipe-brief-2.md`. This report supersedes `tmp/units/capture-recipe-report.md` for the example and frozen source proposal. The predecessor report and `tmp/units/capture-recipe-evidence/` remain unchanged as historical evidence. The writing checkout remains `C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75`, with committed baseline `c50efef0f741caafe1a80c1ef9ee4004f8be0f2b` and the predecessor's owned changes present at dispatch.

The successor modifies only `.agents/skills/orkestrel-prove-journey/SKILL.md` and generated `host.json`. The capture reference remains at the predecessor's frozen digest, `e36b56406d3e8643f253196d915ea1f265aae3169e810769171f75a8ab4461f5`. No shared-file patch or fixture digest correction is needed. No dependency, behavior, API, version, lockfile, unrelated skill, canonical `.codex` file, archive, or prior report changed.

The example imports `createPortfolio`, reads the injected variant data directly, registers `home`, awaits `applyTheme(VARIANT)`, and then awaits `PORTFOLIO.place('home')`. The existing preparation rule and synchronous optional-hook guidance remain intact. The prose requires mounting the shipped application entry with real provisions before the journey runs.

## Installed screenshot destination evidence

The installed `@orkestrel/test` browser implementation passes `options.path` directly to `page.screenshot` at `node_modules/@orkestrel/test/dist/src/browser/index.js:2201`; portfolio placement constructs that path from its directory at line 2602. The installed `@vitest/browser-playwright` provider calls `resolveScreenshotPath(context.testPath, name, context.project.config, options.path)` at `node_modules/@vitest/browser-playwright/dist/index.js:512`. The public resolver in `@vitest/browser` version `4.1.11`, `node_modules/@vitest/browser/dist/index.js:645`, resolves a custom path as `resolve(dirname(testPath), customPath)`.

The retained executable instrument is `tmp/units/capture-recipe-evidence-2/directory-check.mjs`. The exact command, `node tmp/units/capture-recipe-evidence-2/directory-check.mjs`, runs that real published resolver with the integration test's absolute path. It asserts that `../../../tmp/capture/states/home--light-390.png` resolves to the workspace's capture directory. Its negative control supplies `tmp/capture/states/home--light-390.png`; the same equality assertion throws, and the resolver instead returns a destination beneath `tests/app/browser/tmp/capture/states`. The instrument normalizes every compared path with `node:path` and records the returned paths in `directory.log.txt`.

The initial instrument run exited 1 because it compared the resolver's slash-separated Windows output with an unnormalized native path. Its failed assertion is retained in `directory-separator-reading.log.txt`; it measures a comparison defect in the instrument, not a screenshot defect in the provider. After applying the same native normalization to each operand, the exact command exited 0 and its control still made the destination assertion throw. No browser screenshot or live capture outcome is claimed by this resolver reading.

The optional hook contract remains `readonly apply?: () => void` at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:302`; its unawaited invocation remains at browser implementation line 2600. The predecessor report retains the actual Roughnotes emitted rejection, trace, command, and test tally. The parent-owned successor supplies the live rejection regression red/green measurement; these instruction checks do not replace it.

## Inventory delta

`npm.cmd run build:inventory` exited 0 and reported `build-inventory: staged 175 file(s) into host.json`. The skill entry digest changes from predecessor `6641bc22518dcc6f60bffa15d014e980c52c92f15e9a4a8bf34b541da17af449` to `e0d0fafe15b4427751215b3814b92bb936b3b4f49b6ebb7e5fee9840b0016e98`. The inventory membership digest changes from predecessor `3db7ab94e3a1afe8a5af29d49075d6b94a88a3f023672a629f563f0058434b56` to `43ace6252032edd21d6f9c87006a0d9006fde2b5bed16a53c44442db2963852f`. The capture-reference digest is unchanged from the predecessor.

## Actual scoped validation

The commands ran in the isolated candidate checkout on Windows PowerShell on 2026-09-18. Evidence sits separately in `tmp/units/capture-recipe-evidence-2/`. Logged native commands retain their `$LASTEXITCODE` after `Tee-Object`.

| Exact command | Actual result | Evidence |
| --- | --- | --- |
| `node tmp/units/capture-recipe-evidence-2/directory-check.mjs` | Initial exit 1 for unnormalized comparison; corrected instrument exit 0, with the wrong-base control rejected by the same assertion | `directory-separator-reading.log.txt`, `directory.log.txt`, and instrument |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write .agents/skills/orkestrel-prove-journey/SKILL.md` | Exit 0; owned Markdown only | Tool output |
| `npm.cmd run build:inventory` | Exit 0 | `generation.log.txt` |
| `npm.cmd run test:policy -- -t 'skill family policy\|skill bridge policy'` | Exit 0; 51 passed, 59 excluded by the name filter | `policy.log.txt` |
| `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t inspectSkillImports` | Exit 0; 15 passed, 56 excluded by the name filter | `imports.log.txt` |
| `npm.cmd run test:config -- -t 'keeps the committed host inventory aligned with the vendored checkout bytes'` | Exit 0; 1 passed, 173 excluded by the name filter; fresh and recorded inventory bytes match | `inventory.log.txt` |
| `npm.cmd run test:guides` | Exit 0; 23 passed | `guides.log.txt` |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md host.json` | Exit 0; owned Markdown passes; generated inventory retains the repository's explicit formatter exclusion | `format.log.txt` |
| `git diff --check -- .agents/skills/orkestrel-prove-journey/SKILL.md .agents/skills/orkestrel-prove-journey/references/captures.md host.json` | Exit 0 | Tool output |

The text-integrity and prohibited-term sweep used `rg -n -i 'should|simply|easy|utilize|leverage|performant|robust|ensure|guarantee|soon|�|Ã|Â|â€'` over the owned skill and capture reference. It reported no match and exited 1. This sweep covers only those text patterns; the scoped skill/import and guide gates provide structural parity checks.

## Freeze and remaining parent evidence

The cumulative tracked diff against the committed baseline measures 47 insertions and 21 deletions. The changed source paths remain the skill, capture reference, and inventory. Successor evidence retains `actual.diff`, `status.txt`, `diffstat.txt`, and `frozen-hashes.tsv`. The source is frozen; no commit, install, publication, delegation, or destructive operation occurred.

Independent audit, full release gates, refreshed packing, the real Roughnotes rejection-regression red/green record, and downstream published field proof remain parent obligations. No additional fixture failure, unowned correction, or rule/guide conflict arose in this unit.
