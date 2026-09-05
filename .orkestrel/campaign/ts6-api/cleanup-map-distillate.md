I'll read the brief first and follow it exactly, staying read-only.I'll gather the commit maps, diffs, and retention procedure in parallel so the distillate can classify each hunk against the campaign.The first git reads were blocked. I'll retry them as read-only log and show commands.Shell is blocked, so I'll read git refs and campaign evidence files directly to reconstruct the commit map.Shell is fully blocked, so I'll reconstruct the map from git refs, campaign reports, and evidence diffs, then search the trees for residue.I'll pull file lists from the campaign reports and search product trees for residue, since git objects aren't readable as text.Checking one more report for `dist/` and whether `70f42aa7` mixed records with product files.# Distillate — ts6-cleanup-map

`47200d6c^` on this branch is `f0edbcb9` (“Record the TypeScript 7 campaign's design lanes”). `origin/main` is `47200d6c`. The named branch HEAD is `a884603b`. Probe `origin/main` and the probe checkout are `9331ef4`; parent `b331d93` is the pre-campaign probe tree.

A range revert `47200d6c^..HEAD` does not touch the TypeScript 7 **record** commits that already sit **under** `47200d6c` on `origin/main`. Those stay until a prune commit deletes `.orkestrel/campaign/ts7/` (and `ts7-break/` if that folder is also present after the range revert — it is not; `ts7-break/` arrives only in `8c3e88aa` / `a884603b`).

---

## Commit map

### Scaffold (`47200d6c^..HEAD`)

Order is the reflog from `f0edbcb9` → `a884603b`. File lists for product commits come from the campaign reports and evidence `git status` blocks. File lists for “Record” / “Retain” / “Open” / “Reconcile” commits are inferred from subjects and the folders those units wrote; `git log --name-only` did not run.

| Hash | Subject | Files | Ruling |
| --- | --- | --- | --- |
| `47200d6c` | Adopt the `@typescript/typescript6` bridge at every in-process TypeScript API site | `package.json`, `package-lock.json`, `src/core/constants.ts`, `src/core/templates.ts`, `tests/setupPolicy.ts`, `tests/guides.test.ts`, `tests/distribution.test.ts`, `tests/src/core/templates.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/core/fixtures/app-only-toolchain.txt`, `tests/src/core/fixtures/source-manifest.txt`, `tests/src/core/fixtures/setup-false-manifest.txt`, `guides/scaffold.md`, `host.json`. Orchestrator landing also put the off-limits fixture row in `tests/src/bin/main.test.ts:90-93` (bridge-report deviation; ledger: patch applied). | `revert whole` |
| `ea6e2811` | Record the TypeScript 7 campaign's stage-2 report, the probe unit's report, and its successor brief | `.orkestrel/campaign/ts7/` (reports, successor brief) | `records only` |
| `6c46f547` | Move typescript to 7.0.2, clear the rollup's compiler folder, and hold browser workspaces on the 6 major | `package.json`, `package-lock.json`, `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, `src/core/templates.ts`, `src/core/constants.ts`, `src/core/compilers.ts`, `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/core/fixtures/source-manifest.txt`, `tests/src/core/fixtures/setup-false-manifest.txt`, `guides/scaffold.md`, `PROPOSAL.md`, `ROADMAP.md`, `host.json` | `revert whole` |
| `c6b92a9d` | Record the audit briefs, the probe successor's report, and the deciding-run instrument | `.orkestrel/campaign/ts7/` | `records only` |
| `c4bee5da` | Record the stage-2 and probe audit lanes, the verifier's chain, and the probe deciding runs | `.orkestrel/campaign/ts7/` | `records only` |
| `666a942c` | Record rounds 2 and 3 of the TypeScript 7 audits, the fix briefs, and the lockfile reading | `.orkestrel/campaign/ts7/` | `records only` |
| `70f42aa7` | Close the audit rounds over stage 2 of the TypeScript 7 move | Accumulated fix-round product tree: `PROPOSAL.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/constants.test.ts` (seven-fix / seven-fix-2 / seven-fix-3 owned sets). | `revert whole` |
| `5f5510c0` | Record the probe audit round 3, its verdict, the round-4 briefs, and the deciding chain instrument | `.orkestrel/campaign/ts7/` | `records only` |
| `e95d34e8` | Record the probe round 4, the deciding chain, and the lint deadline's cause | `.orkestrel/campaign/ts7/` | `records only` |
| `8c2cbfc8` | Record the probe fix-5 report and the presence check that closes the probe rounds | `.orkestrel/campaign/ts7/` | `records only` |
| `f6f55e10` | Retain the audit evidence and sweep the launch copies of the TypeScript 7 campaign | `.orkestrel/campaign/ts7/evidence/` (diffs, probe-unit logs, probe-decide logs); launch copies under `tmp/` are untracked | `records only` |
| `8c3e88aa` | Open the scoping campaign for the full TypeScript 7 break: the fleet sweep, the research, and the measurements | `.orkestrel/campaign/ts7-break/` | `records only` |
| `a884603b` | Reconcile the design lanes into the plan for the full TypeScript 7 break | `.orkestrel/campaign/ts7-break/` (`plan.md` and the design/measurement landing named in `COMMIT_EDITMSG`) | `records only` |

**Outside this range, already on `origin/main` as ancestors of `47200d6c`:** `44bad75d` (absorption records), `a2bb2d6b` (inventory / design brief / rehearsal instrument / ledger), `66499ed9` (first rehearsal), `f8bebcba` (second rehearsal), `f0edbcb9` (design lanes). All `records only`. A range revert leaves them. The prune commit is what removes that leftover `.orkestrel/campaign/ts7/` tree.

### Probe (`b331d93..HEAD`)

| Hash | Subject | Files | Ruling |
| --- | --- | --- | --- |
| `9331ef4` | Load the compiler through `@typescript/typescript6` when the workspace's typescript is 7 | `guides/probe.md`, `package.json`, `package-lock.json`, `src/core/types.ts`, `src/core/validators.ts`, `src/server/Probe.ts`, `src/server/helpers.ts`, `src/server/stages/TypeStage.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/stages/TypeStage.test.ts` (probe-fix-5 status; `COMMIT_EDITMSG` describes this squash) | `revert whole` |

---

## Hunks a plain revert would lose

Combined `git diff 47200d6c^ HEAD -- . ':!.orkestrel'` and `git diff b331d93 HEAD` did not run. Classification is from `ts7-seven.diff.txt`, `ts7-seven-fix-3.diff.txt`, `ts7-probe-fix-4.diff.txt`, the bridge/seven/probe reports, and the current trees.

**Independent of TypeScript 7 (would be lost, and is worth putting back as a residue edit after the reverts):**

- `tests/setupServer.ts` (scaffold, landed in `70f42aa7`) — the empty-version refusal now at the `latest === undefined \|\| published.some((entry) => entry.length === 0)` guard, and `tests/setupServer.test.ts` the row `refuses to publish no version, or an unnamed one`. That invariant holds on the original `buildPackument(version: string)` API (`buildPackument('')`). The `string \| readonly string[]` widening and the `['0.0.4', '0.0.8']` row do **not** belong here; their reason is a two-major `/typescript` packument.

**Every other product hunk is `7-specific`.** In particular:

- Scaffold `47200d6c`: every import swap to `@typescript/typescript6`, the `BASE_DEV_DEPENDENCIES` row and remarks (`src/core/constants.ts:494-504`), the generated proof import (`src/core/templates.ts:1088`), fixture snapshots, `guides/scaffold.md` bridge sentence, packument routes in `CLI.test.ts` and `main.test.ts:90-93`.
- Scaffold `6c46f547`: `package.json` `"typescript": "^7.0.2"`, `typescriptCompilerFolder: ''` in `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, and the three dts templates (`src/core/templates.ts:571`, `:611`, `:641`), `APP_BROWSER_TYPESCRIPT_RANGE` (`src/core/constants.ts:541-549`) and its spread (`src/core/compilers.ts:230`), browser Surface row (`guides/scaffold.md:107`), floors paragraph (`guides/scaffold.md:1144-1162`), ROADMAP retirement rows (`ROADMAP.md:38-65`, `:76-89`), PROPOSAL pin/table/control rewrites (see The proposal).
- Scaffold `70f42aa7`: remaining guide/ROADMAP/PROPOSAL wording about the override, `vue-tsc`, and preview cost; the compilers test that the override appears in every declaration-rolling face; `buildPackument` union, two-major remarks (`tests/setupServer.ts:1671-1675`), and CLI `/typescript` multi-version rows.
- Probe `9331ef4`: optional peer `^6.0.3 \|\| ^7.0.0` and `@typescript/typescript6` (`package.json:109-120`), `loadWorkspaceModule` bridge fallback (`src/server/helpers.ts`), `collectRangeMajors`, `TypeStage` type imports, `writeWorkspaceFixture` (`bridged` / version-only `7.0.2` default), Toolchain remarks, `guides/probe.md:212`, `:395`, `:459-482`.

`writeWorkspaceFixture` reads as a test helper. Its options and defaults exist to describe a TypeScript 7 workspace and the bridge. `7-specific`.

seven-fix-2 reported a format pass over a large file set; the unit's later `git status` still named only the owned product files. No evidence that `70f42aa7` committed an unrelated format.

---

## Residue after the reverts

After `git revert` of the range above, product files return to `f0edbcb9` (scaffold) and `b331d93` (probe). Campaign terms in files those commits edited go away with them.

**Pre-existing (leave):**

- `tests/src/bin/helpers.test.ts:356` and `:379` — `latest: '7.0.2'` in the foreign-major audit fixture (`range: '^6.0.3'` vs registry major 7). Not in any campaign report's touched-file list. The seven.diff minus-side of `PROPOSAL.md` still used `typescript` `6.0.3` and `ts.getJSDocCommentsAndTags` / `ts.displayPartsToString`, so this registry-latest literal is the pre-campaign control, not a leftover pin.

**No remaining campaign terms in:**

- `/home/user/scaffold/.claude/**`, `/home/user/scaffold/.agents/**` (no matches at HEAD).
- `/home/user/scaffold/host.json` (digests only).
- `/home/user/scaffold/configs/**` after revert (the override is `6c46f547`).
- Fleet mirrors `/home/user/fleet/*/guides/probe.md` and `guides/scaffold.md` other than probe's own guide — no `@typescript/typescript6`, `typescriptCompilerFolder`, `APP_BROWSER_TYPESCRIPT_RANGE`, `7.0.2`, `TypeScript 7`, `tsgo`, `unstable/`, `native-preview`, or `issue 5381`.
- Probe `guides/`, `src/`, `tests/` after reverting `9331ef4`.
- `R1` / `R2` / `R3` as retirement rows: none. `PROPOSAL.md:404` “per R4” is a docs-proposal constraint name, pre-existing.
- `retirement phase`, `tsgo`, `native-preview`, `unstable/async`: none in the named product paths at HEAD (those strings live under `.orkestrel/campaign/ts7-break/`, which the range revert removes).

**Still names the 7 work after the range revert (must edit or prune):**

- `.orkestrel/campaign/ts7/` as restored from `44bad75d`–`f0edbcb9` (ancestors of `47200d6c`). Not in the residue path list; it is the prune target. It still names the bridge, `7.0.2`, `tsgo`, and the rest.
- `PROPOSAL.md` after revert again names the **6.0.3 compiler API** (`ts.getJSDocCommentsAndTags`, `ts.displayPartsToString`, `ts.createProgram`) as the control / fallback reader. That is pre-existing docs-proposal text, not a TypeScript 7 pin, and it is what the later plan re-homes onto oxlint. It does not match the residue term list.

**HEAD-only lines that die with the reverts** (not residue; listed so a missed revert is obvious): `PROPOSAL.md:44-45`, `:252`, `:354-356`, `:411-414`, `:1033-1034`, `:1164-1168`; `ROADMAP.md:38-65`, `:76-89`; `guides/scaffold.md:107`, `:1144-1162`; `src/core/constants.ts:494-504`, `:541-549`; `src/core/compilers.ts:29`, `:230`; `src/core/templates.ts:571`, `:611`, `:641`, `:1088`; `configs/src/vite.core.config.ts` / `vite.server.config.ts` `typescriptCompilerFolder`; tests and fixtures listed in the commit map; probe files listed for `9331ef4`.

Untracked `.orkestrel/campaign/ts6-api/` is the cleanup campaign, not TypeScript 7 residue.

---

## Instruments and launch copies

Retention (`.agents/skills/orkestrel-debrief/references/retention.md`): carry / promotion / measurement / orientation checks close first; owner's go-ahead; then delete. The prune commit names what moved to the guide or rules, measurements re-taken with dates, and the folder path removed. `ROADMAP.md` is kept (strike closed chunks). `PROPOSAL.md` is the docs-pipeline proposal, not spent by the TypeScript 7 ruling — do not delete it in this prune. Sweep all of `tmp/`, naming each file; do not sweep while a unit is live.

**Campaign folders (prune commit deletes):**

- `/home/user/scaffold/.orkestrel/campaign/ts7/` — ledger, briefs, reports, verdicts, `orchestrator-measurements.md`, `instruments/` (`tsc7-probe.sh`, `api-probe.mjs`, `dts-probe.sh`, `dts-probe-2.sh`, `rehearsal.sh`, `rehearsal-2.sh`, `probe-decide.sh`, `probe-decide-4.sh`, `lsp-init-probe.mjs`, `lint-stage-probe.mjs`, `type-stage-probe.mjs`), `evidence/diffs/`, `evidence/probe-decide/`, `evidence/probe-units/`, draft briefs.
- `/home/user/scaffold/.orkestrel/campaign/ts7-break/` — `plan.md`, `ledger.md`, `sweep-brief.md`, `sweep-distillate.md`, design/research/propagation reports, `orchestrator-measurements.md`, `instruments-grok7.sh`, `instruments/` (`tsgo-api-ast-probe.mjs`, `tsgo-api-overlay-probe.mjs`, `tsgo-api-mutation-probe.mjs`, `tsgo-lsp-probe-3.mjs`, `tsgo-lsp-3.log.txt`, `strip-types-probe.mjs`, `fence-run-probe.mjs`, `rolldown-dts-build.mjs`, `api-extractor-over-tsc7.sh`, `rollup.cjs`, `api-extractor.json`).

**`tmp/` (sweep after this unit returns; live now):**

- Live: `tmp/cursor/ts6-cleanup-map-brief.md`, `ts6-cleanup-map.jsonl`, `ts6-cleanup-map.status-before.txt`; `tmp/units/ts6-api-design-brief.md`.
- TypeScript 7 launch copies: `tmp/cursor/ts7-absorb-brief.md`, `ts7-absorb.jsonl`, `ts7-absorb.result.md`; `tmp/cursor/ts7-break-sweep-brief.md`, `ts7-break-sweep.jsonl`, `ts7-break-sweep.launch.txt`, `ts7-break-sweep.result.md`, `ts7-break-sweep.status-before.txt`, `ts7-break-sweep.status-after.txt`; `tmp/units/ts7-break-*.md`; `tmp/ts7-distribution.log`, `tmp/ts7-distribution-2.log`, `tmp/ts7-distribution-3.log`; `tmp/cursor/npm-shim.log`.
- Scratch install: `tmp/ts7/package/` (unpacked `typescript` 7 distribution, including `bin/tsc` and `dist/`).

**Probe:** `/home/user/fleet/probe/tmp/` is empty. No `ts7`-named script under the probe checkout.

---

## The proposal

Current `PROPOSAL.md` sentences that rest on the compiler API or the bridge (re-home the TSDoc control onto the oxlint plugin surface):

- `PROPOSAL.md:44-45` — constraint: `typescript` `7.0.2` and its `@typescript/typescript6` bridge stay on the development edge.
- `PROPOSAL.md:252` — candidate table: JSDoc through `typescript/unstable/ast`'s `getJSDocTags` and `typescript/unstable/sync`'s `Symbol.getDocumentationComment(checker)`.
- `PROPOSAL.md:354-356` — C12: `7.0.2` already exposes the JSDoc readers through `unstable/ast` and `unstable/sync` (preview; 7.1 can change the shape).
- `PROPOSAL.md:411-415` — the compiler API is the **control** the scanner is measured against: `getJSDocTags` / `Symbol.getDocumentationComment(checker)`; never a shipped import.
- `PROPOSAL.md:640-644` — risk: scanner miss rate against the compiler API is unmeasured.
- `PROPOSAL.md:726-735` — Option 2 extractor: `ts.createProgram`, `checker.getExportsOfModule`, `Symbol.getDocumentationComment`, `Symbol.getJsDocTags`, `ts.displayPartsToString`; a shipped `scaffold` verb would move `typescript` onto the runtime edge.
- `PROPOSAL.md:1033-1034` — dependency delta: `typescript` `7.0.2` and the `@typescript/typescript6` bridge are already declared.
- `PROPOSAL.md:1161-1168` — fallback reader: `typescript/unstable/sync`'s `Symbol.getDocumentationComment(checker)`; `ts.getJSDocCommentsAndTags` and `ts.displayPartsToString` are gone at the 7 major.
- `PROPOSAL.md:1243-1248` — whether `typescript` may move to a runtime edge; the compiler-API extractor is the only exact reader; recommended path keeps it as control.
- `PROPOSAL.md:1269-1272` — probe: diff scanner first sentences against `ts.getJSDocCommentsAndTags`.

`PROPOSAL.md:301-302` names oxlint's `getJSDocComment`, not the TypeScript compiler API.

After the reverts, the `7.0.2` / bridge / `unstable/*` sentences return to the 6.0.3 control path (`ts.getJSDocTags`, `ts.getJSDocCommentsAndTags`, `Symbol.getDocumentationComment`, `ts.displayPartsToString`, `ts.createProgram`). That restored control path is still the thing to re-home.

---

## Unknowns

- **`git log` / `git diff` / `git show` did not run.** The Shell tool rejected every command in this session, including `echo`. Commit order and hashes come from `/home/user/scaffold/.git/logs/HEAD` and `/home/user/fleet/probe/.git/logs/HEAD`. Combined diffs were not read as one git diff. `git show 47200d6c^:<path>` and `git show b331d93:<path>` were not read; pre-existing vs residue for `PROPOSAL.md` uses the minus side of `ts7-seven.diff.txt`.
- **Records-commit file lists** were not verified with `git log --name-only`. A “Record” commit that also touched a product file would be mis-ruled `records only`.
- **Whether `47200d6c` or `6c46f547` committed `dist/**`.** Reports ran `npm run build` and listed `host.json`, not `dist/`.
- **Whether `70f42aa7` mixed `.orkestrel/` with product files.** Unit statuses at fix-round exit showed product files plus untracked campaign files; surrounding commits are the likely records carriers.
- **`tests/src/bin/main.test.ts` membership in `47200d6c`.** Present at HEAD with the bridge packument row; bridge-report left it to the Orchestrator. Not in seven.diff. Treated as part of stage 1 landing.
- **Local `refs/heads/main` is `bacb639d`**, not `47200d6c`. Use `origin/main`.

Deviation: Shell was rejected, so the brief's `git log`, `git diff`, and `git show` commands did not run; the map is reconstructed from reflogs, refs, campaign reports, and evidence diffs.