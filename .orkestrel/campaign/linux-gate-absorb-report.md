# release-state absorption distillate

Engine: Cursor Grok 4.6 (`cursor-grok-4.6-high`).
Journal: `tmp/cursor/release-state.jsonl`.
Session id: `d4394105-6c54-4ddc-b7db-8f3a41825714`.
Duration: 298427ms.

I'll read the brief and the governing files it names, then return only the shape it specifies.I'll read the authority sections and campaign record next, staying inside the brief's listed paths.The campaign tree is large, so I’ll locate the release records for the three packages and read the bump/publish sections next.I'll search the docs-parity campaign record for bump rulings, red gates, and host-dependent facts.The owner-upload records look like the baseline. I’ll read those files and the matching gate evidence next.I’ll pull the bump rulings, red-gate records, and host-dependent skip/platform lines from the three trees.**Question:** What state did the prior release campaign leave `@orkestrel/scaffold`, `@orkestrel/toolbox`, and `@orkestrel/ollama` in, so the Orchestrator can run the Linux gate chain against a known baseline instead of rediscovering it?

**Evidence:**

1. Bump-owed rulings and triggers

- All three pending versions were ruled bump-owed.
- `@orkestrel/scaffold` `0.0.65`: comparison against registry `0.0.64` reports material source and host changes (moved `dist/` / vendored host, not a runtime-dependency trigger in that reading). `.orkestrel/campaign/docs-parity/d7n-ollama-hook-http-acceptance-reading.md:13`
- Local manifest is `0.0.65`. `package.json:3`
- `@orkestrel/toolbox` `0.0.13`: fetched baseline differs after excluding maps and ignoring whitespace (published documentation and declaration text); independently, final runtime dependency ranges differ from the baseline archive manifest. `.orkestrel/campaign/docs-parity/d7n-toolbox-registry-independent-report.md:43`
- Same dual trigger in the prepared verdict: material dist difference and runtime ranges differ from the baseline manifest. `.orkestrel/campaign/docs-parity/d7n-toolbox-ollama-toolbox-registry-prepared-verdict.md:18-20`
- Local manifest is `0.0.13`. `/home/user/toolbox/package.json:3`
- `@orkestrel/ollama` `0.0.15`: baseline comparison to registry `0.0.14` reports non-whitespace documentation/declaration differences; runtime pins also differ. `.orkestrel/campaign/docs-parity/d7n-ollama-hook-candidate-verdict.md:7`
- Local manifest is `0.0.15`. `/home/user/ollama/package.json:3`

2. Prior uploads and the approval that did not complete

- Registry at the last campaign reading: scaffold `0.0.64`, ollama `0.0.14`, toolbox `0.0.12`. Candidate queries for `0.0.65` / `0.0.15` / `0.0.13` each exited `1` with E404. `.orkestrel/campaign/docs-parity/d7n-owner-upload-registry-reading.md:7-17`
- Scaffold `0.0.64` was uploaded in a prior window and registry-confirmed (SHA-256 `a4e7078da602619e54384dbc7bdddaf25a2fdc6af0842a55004b8328365b8be7`; operator command consumed). `.orkestrel/campaign/docs-parity/d7n-scaffold-registry-closure.md:1-12`
- Toolbox `0.0.13` and Ollama `0.0.15` were prepared and closed to main; owner upload remained pending. `.orkestrel/campaign/docs-parity/d7n-toolbox-registry-release-landing.md:15-17` `.orkestrel/campaign/docs-parity/ledger.md:552`
- A Toolbox-only prompt was written, then superseded; Scaffold and Ollama stayed held. `.orkestrel/campaign/docs-parity/d7n-toolbox-upload-prompt.md:3` `.orkestrel/campaign/docs-parity/d7n-owner-upload-decision.md:3`
- Owner then authorized Scaffold `0.0.65`, Ollama `0.0.15`, and Toolbox `0.0.13` despite recorded Linux lifecycle and Node `22.12` lint-loader gaps, without claiming those gaps repaired. `.orkestrel/campaign/docs-parity/d7n-owner-upload-decision.md:3-7`
- Handoff landed at Scaffold `6bccbb09`; prompt selects Scaffold, then Ollama, then Toolbox; root does not authenticate or upload; registry confirmation remains pending. `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-landing.md:1-5` `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-verdict.md:13` `.orkestrel/campaign/docs-parity/handoff.md:9-19`
- Ledger last row: upload command ready; no authentication or upload ran in the root session. `.orkestrel/campaign/docs-parity/ledger.md:562`

3. Gates recorded red at these baselines

- `@orkestrel/ollama` `0.0.15` on Ubuntu, Node `22.12.0`, GitHub Actions job `103507513115`, run `34676625435`: `npm run lint:check` → `oxlint --config .oxlintrc.json --deny-warnings .` failed loading `./configs/policy.ts` with `ERR_UNKNOWN_FILE_EXTENSION`; process exit `1`. Carrier: `.orkestrel/campaign/docs-parity/evidence/d7n-ollama-hook-linux-ci/run.log.txt:659-677` `.orkestrel/campaign/docs-parity/evidence/d7n-ollama-hook-linux-ci/watch.stdout.txt:21-27` `.orkestrel/campaign/docs-parity/evidence/d7n-ollama-hook-linux-ci/watch.exit.txt:1`
- Same reading in prose: workflow fails at the Node `22.12` lint-plugin loader; Node `26` job passed format/lint/typecheck/build/ordinary tests plus automatic install and `npm run test:service`. `.orkestrel/campaign/docs-parity/d7n-ollama-hook-linux-reading.md:5-9`
- Linux owned-daemon failure/cleanup is recorded as unproved, not as a red command. `.orkestrel/campaign/docs-parity/d7n-owner-upload-decision.md:7` `.orkestrel/campaign/docs-parity/d7n-ollama-hook-linux-reading.md:7`
- `@orkestrel/toolbox` current baseline: `d7n-toolbox-final-registry-visit-prepublish` exit `0` (format, lint, check, build, tests, release-mode distribution). No standing red gate named for Toolbox. `.orkestrel/campaign/docs-parity/d7n-toolbox-registry-independent-report.md:35`
- `@orkestrel/scaffold` `0.0.65` current baseline: `d7n-scaffold-hook-prepublish-http` exit `0` (format, lint, typecheck, build, ordinary tests, guide parity, distribution). `.orkestrel/campaign/docs-parity/d7n-ollama-hook-http-acceptance-reading.md:11`
- Ollama Windows restored-registry `prepublishOnly` later reran to exit `0`, including distribution and real service; that does not rewrite the Ubuntu Node `22.12` lint reading. `.orkestrel/campaign/docs-parity/d7n-owner-upload-registry-reading.md:19-21` `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-verdict.md:7`

4. Host-dependent facts (Linux versus Windows)

Campaign record

- Windows operator path: PowerShell upload from canonical `WebstormProjects` folders; command runs no install/build/gate. `.orkestrel/campaign/docs-parity/d7n-owner-upload-decision.md:5`
- Windows: complete Scaffold `prepublish-http` and Ollama/Toolbox `prepublishOnly` including real service. `.orkestrel/campaign/docs-parity/d7n-ollama-hook-http-acceptance-reading.md:1-11` `.orkestrel/campaign/docs-parity/d7n-ollama-hook-candidate-verdict.md:3` `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-verdict.md:7`
- Direct Windows daemon reuse passed; Linux owned-daemon failure/cleanup remains unproved. `.orkestrel/campaign/docs-parity/ledger.md:555` `.orkestrel/campaign/docs-parity/d7n-owner-upload-decision.md:7` `.orkestrel/campaign/docs-parity/handoff.md:47-49`
- Ubuntu Node `26.8.2` job `103507513066` passed automatic Linux installation and `npm run test:service`; Node `22.12.0` job failed at lint as above. `.orkestrel/campaign/docs-parity/d7n-ollama-hook-linux-reading.md:1-9`
- Toolbox prompt confirmation: direct Bash override could not start through the host’s unregistered Linux launcher; ran through explicit Git Bash instead. `.orkestrel/campaign/docs-parity/d7n-toolbox-upload-prompt.md:7`
- Owner waived those Linux holds without relabeling them passing. `.orkestrel/campaign/docs-parity/d7n-owner-upload-review-report.md:11` `.orkestrel/campaign/docs-parity/d7n-owner-upload-decision.md:3-7`

`@orkestrel/scaffold` tests (OS / host capability)

- `tests/src/server/helpers.test.ts:101` — `normalizeBashPath` expects slash rewrite only when `process.platform === 'win32'`.
- `tests/src/server/helpers.test.ts:825` — `it.skipIf(process.platform === 'win32')` dangling-link traversal (Windows junction lexical collapse). `:818-824` states why.
- `tests/src/server/helpers.test.ts:1142` — `it.skipIf(!supportsFileLinks())`; `:1140-1141` names the Windows symlink-privilege / junction limit.
- `tests/src/server/helpers.test.ts:1811` — `it.skipIf(!supportsMode())`; `:1807-1810` host mode round-trip.
- `tests/src/server/helpers.test.ts:1564` — comments that Windows publish modes read `0644`.
- `tests/src/server/helpers.test.ts:2292-2296` — Windows refuses rename onto an existing directory (ext4 inode reuse contrast).
- `tests/src/server/WriteTransaction.test.ts:206` and `:227` — `it.skipIf(!supportsMode())`.
- `tests/src/server/WriteTransaction.test.ts:281` — `it.skipIf(process.platform === 'win32')` race proof; `:248-278` records Windows 11 / NTFS measurement that never hit the window.
- `tests/distribution.test.ts:13` and `:21` — `npm.cmd` and `shell: true` when `win32`; `:14-20` states the registry probe is false on every Windows host without that.
- `tests/setupServer.ts:340-342` — Windows working tree reports no executable bit; git index is the host-stable source.
- `tests/setupServer.ts:374-377` — case-folding probe vs assuming Windows/macOS.
- `tests/setupServer.ts:2129` — `normalizeBashPath` `win32` branch.
- `tests/config.test.ts:1815-1817` — oxlint shim is POSIX `sh` on Linux vs `.cmd`/`.ps1` on Windows; Windows `CreateProcess` cannot run the extensionless form.

`@orkestrel/toolbox` tests

- `tests/distribution.test.ts:27` and `:38` — `npm.cmd` / `SHELL` when `win32`; `:34-37` same Windows spawn rationale.
- `tests/config.test.ts:1815-1817` — same oxlint shim host branch as scaffold (vendored copy).

`@orkestrel/ollama` tests

- `tests/distribution.test.ts:27` and `:38` — same `win32` npm/shell branch.
- `tests/config.test.ts:1815-1817` — same oxlint shim host branch.
- Service suite: campaign records “no service skip” on the Windows source-prep run. `.orkestrel/campaign/docs-parity/d7n-ollama-toolbox-source-gate-reading.md:11-12`
- `vite.config.ts` `platform: 'node'` in all three trees is the Vitest project environment, not a Linux/Windows OS branch. `/home/user/scaffold/vite.config.ts:67` `/home/user/toolbox/vite.config.ts:67` `/home/user/ollama/vite.config.ts:49`

`it.skipIf(extractorPath === undefined)` / `it.skipIf(!isPolicyFile(...))` in `tests/config.test.ts` and `tests/policy.test.ts` of all three packages skip on layout/authorship, not OS.

5. `wave.md` visit / prepare steps named done vs outstanding

Done, as named in the campaign (not a re-derivation of `wave.md`):

- Toolbox visit: re-pin/registry, supported overwrite/audit, full install, `prepublishOnly`, pack, fetch-and-compare baseline, bump left at `0.0.13`, campaign/main close. `.orkestrel/campaign/docs-parity/d7n-toolbox-ollama-toolbox-registry-prepared-verdict.md:4-20` `.orkestrel/campaign/docs-parity/d7n-toolbox-registry-release-landing.md:3-13` `wave.md` visit steps at `.agents/skills/orkestrel-publish/references/wave.md:13-44` and prepare steps at `:94-106`
- Scaffold `0.0.65`: Windows `prepublishOnly`, pack, dist vs registry `0.0.64`, source checkpoint on main (not called release closure at landing). `.orkestrel/campaign/docs-parity/d7n-scaffold-hook-candidate-landing.md:3-9` `.orkestrel/campaign/docs-parity/d7n-ollama-hook-http-acceptance-reading.md:11-13`
- Ollama: supported offline overwrite/audit (catalog skip exit `1` documented), Windows `prepublishOnly` including service, pack, baseline compare, then main promotion under owner exception. `.orkestrel/campaign/docs-parity/d7n-ollama-hook-tarball-trial-reading.md:5` `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-verdict.md:7-9`
- Prepare-layer “write the release commit and push before the window opens”: named done for the operator handoff at `6bccbb09`. `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-landing.md:1-5` `.agents/skills/orkestrel-publish/references/wave.md:106`

Outstanding, as named:

- Upload window / registry confirmation: owner uploads remain pending; no authentication or upload ran. `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-landing.md:5` `.orkestrel/campaign/docs-parity/handoff.md:19` `.agents/skills/orkestrel-publish/references/wave.md:115-117`
- Development-only Scaffold re-pin after registry confirmation; Ollama and Toolbox keep registry-resolvable Scaffold `^0.0.64`. `.orkestrel/campaign/docs-parity/d7n-owner-upload-decision.md:9` `/home/user/toolbox/package.json:101` `/home/user/ollama/package.json:88` `.orkestrel/campaign/docs-parity/d7n-scaffold-hook-candidate-landing.md:7`
- Linux owned-daemon failure/cleanup and Node `22.12` lint remain named open readings, owner-waived not repaired. `.orkestrel/campaign/docs-parity/d7n-owner-upload-handoff-verdict.md:3` `.orkestrel/campaign/docs-parity/d7n-scaffold-hook-candidate-landing.md:9`

**Distillate:**

Unpublished local tips: scaffold `0.0.65`, toolbox `0.0.13`, ollama `0.0.15`. Registry still serves `0.0.64` / `0.0.12` / `0.0.14`. Each tip was ruled bump-owed (scaffold: moved `dist/src` and `dist/host` vs `0.0.64`; toolbox and ollama: moved dist material plus moved runtime pins). Windows `prepublishOnly` is recorded green for all three, including Ollama real service after `npm ci --ignore-scripts`. Linux baseline already known: Ollama Ubuntu Node `26` chain including `npm run test:service` passed; Ollama Ubuntu Node `22.12` `npm run lint:check` is red on `configs/policy.ts` / `ERR_UNKNOWN_FILE_EXTENSION`; Linux owned-daemon failure/cleanup never executed. Owner approved upload of the three tips anyway; prompt is at Scaffold `6bccbb09`; no upload ran; dependents still pin published Scaffold `^0.0.64`. Linux gate chain on this host is a new run against that recorded baseline, not against a registry-confirmed new release.

**Unknowns:**

- Whether `@orkestrel/scaffold` or `@orkestrel/toolbox` ever ran their full gate chain on Linux in this campaign: no Linux CI log for those two packages was present under the owner-upload / hook / toolbox-registry files read (`d7n-owner-upload-*`, `d7n-scaffold-hook-*`, `d7n-toolbox-registry-*`, `d7n-ollama-hook-linux-*`, `handoff.md`, `ledger.md` rows around the 2026-09-12 close). `ROADMAP.md` does not record this wave’s Linux/Windows gate split.
- Which exact Ollama runtime pins differ from registry `0.0.14`: `d7n-ollama-hook-candidate-verdict.md:7` asserts they differ and points at “registry preparation,” but the later hook trial kept declared Scaffold `^0.0.64`; the pin-by-pin baseline table was not in the ollama-hook verdict files read.
- Whether the owner executed `prompt.txt` after `6bccbb09`: campaign last row and handoff say pending; this session’s known `npm view` still shows the old registry versions. No post-upload confirmation file exists beside `d7n-owner-upload-handoff-landing.md`.
- Contents of `.orkestrel/campaign/ts6-api/**` and older `docs-parity` package visits were not read as the prior campaign for these three tips; they did not name the `0.0.65`/`0.0.13`/`0.0.15` owner-upload baseline.
- Commit `c439685` (“d7n-owner-upload-retention”) is a known fact; no file named that retention was found under `.orkestrel/campaign/docs-parity/` besides `d7n-owner-upload-handoff-landing.md:3` referring to a following campaign-only retention commit.
