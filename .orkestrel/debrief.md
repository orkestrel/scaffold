# Debrief: fleet surface check of 2026-10-30

Focused round, on the user's ruling of 2026-10-30: field evidence, the process retrospective, and the lessons the campaign record carries. The blind-pass instruction audit did not run in this round.

## Field evidence

- The built `scaffold surface` verb ran live at each scaffold release, 0.0.116, 0.0.117, and 0.0.118: exit `0`, 51 owners, 107 recorded collisions, no conflicts, every source live (each release's chain, commits `5ccb6400b`, `358dd306a`, `d090ed5a3`).
- Run with the mcp and middleware checkouts as candidates, it exits `1` on exactly the five environment conflicts `ROADMAP.md` items 77 and 78 track (commit `20823f4c7`).

## Findings

| Id | Evidence | Bucket | Carrier |
| --- | --- | --- | --- |
| 1 | `npm ci` in the scaffold 0.0.116 release chain deleted most of `node_modules`, then refused `EPERM` on `@oxlint/binding-win32-x64-msvc`, which the `probe` server's `oxlint --lsp` child held; guide's 0.0.27 chain refused the same way on `tsc.exe`, which the editor's language server held. A lockfile reinstall with `npm install` and `npm ls --all` recovered both, before the release commits `5ccb6400b` and guide `41148fb`. | Orchestration-contract refinements | `.agents/platforms/windows.md` § Processes |
| 2 | A catalog refresh after the build left `host.json` holding the old digest of `.claude/agents/orkestrel.md`, and `test:src:server` failed two cases until a rebuild, before `a97264ceb`. | Skill refinements / creation | `.agents/skills/orkestrel-publish/references/wave.md` § Prepare a layer |
| 3 | `c10c7f4d3` shipped seven `@example` lines the distribution census lists, and the census went stale until the 0.0.116 release chain ran `test:distribution`, fixed in `7e0ba9bfa`. No writer brief named that project. | Rule additions, one law each | `.claude/rules/tests.md` § Expensive proofs |
| 4 | guide's policy sweep parses guide's own hosted guide, so the 0.0.116 catalog refresh had to wait until guide pushed its conforming guide (`1697436`) before it mirrored it (`489a68443`). | Skill refinements / creation | `.agents/skills/orkestrel-publish/references/release.md` § The scaffold surface |
| 5 | The sweep consult cited `guides/contract.md` rows for `success` and `failure` that the guide does not hold; the citation check caught it before the ruling reached `ROADMAP.md`. | Stays as-is: the `orkestrel-dispatch` skill's citation check worked | none |
| 6 | Campaign ledger rows named models and recorded the Orchestrator's own commits, against `.claude/rules/campaign.md` § Content and § Layout; corrected within the campaign. | Stays as-is: the rule states both, and the error was the executor's | none |
| 7 | The independent reviews and revert proofs caught tests that could not fail: a dead self-pair control, decorative constant assertions, an unordered sort case, and an untested whole-segment lookahead. | Stays as-is: `.claude/rules/tests.md` § Test contract and the review gate worked | none |
| 8 | `GuideCompiler` refused a nested module source that `validateModules` admits, found through scaffold's guides-entry fixture. | Guide truth | guide `ddcc984`, released as 0.0.28 |

## Canon delta

- `.agents/platforms/windows.md` § Processes: check for held files under `node_modules` before `npm ci`.
- `.agents/skills/orkestrel-publish/references/wave.md` § Prepare a layer: build between the catalog refresh and `scaffold surface --from .`.
- `.claude/rules/tests.md` § Expensive proofs: run the `distribution` project when a change alters what a package ships.
- `.agents/skills/orkestrel-publish/references/release.md` § The scaffold surface: push conforming guides before a catalog refresh under a tightened guide parser.
