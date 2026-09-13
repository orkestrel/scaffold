# Audit verdict — U-fix-2, `@orkestrel/scaffold` 0.0.65 at `9a250bb`

Lane held: **subjective** — design acceptance criteria, API and vocabulary, architecture fit, simplification, guide voice and product coherence. Engine: Opus 5, the engine that wrote the subject. Read-only; no command ran against the repository.

## Numbered verdicts

**1. Item A placed the paragraph correctly. — CONFIRMED**

`tmp/evidence/u-fix-2.diff.txt:114-141` removes the paragraph together with its trailing blank line and adds it after the last bullet. The tip reads it back: `guides/scaffold.md:1400-1403` is "…Nothing is fixed except the manifest." / blank / "- One computed artifact: `package.json`, …", and `guides/scaffold.md:1448-1461` is the last bullet ("One host artifact per vendored path…") / blank / the toolchain paragraph / blank / "A workspace publishing a `src` environment rolls each published face's declarations up…". No bullet line appears in the diff; the `guides/scaffold.md` diffstat of 19 changed lines accounts exactly for the seven removed paragraph-and-blank lines, the nine added paragraph lines plus its blank, and the one-line recast at the former line 908.

Attacked: whether the trailing placement is the right one. It holds. The section's established shape is an introducing sentence, the artifact list, then trailing elaboration paragraphs — the declaration-rollup paragraph at `:1461` is the second such paragraph, and the toolchain paragraph now sits as the first. The alternative (restating the list's introduction and leaving the paragraph in place) would have added a sentence to carry a paragraph that was already misplaced.

**2. Item A's paragraph is true and actionable. — CONFIRMED, bounded**

Every clause checks against source. `src/core/compilers.ts:581` emits `engines: { node: blueprint.engines }`, so the `engines.node` field does carry the blueprint value; `src/core/constants.ts:489` fixes that default at `` `>=${MINIMUM_NODE_VERSION}` `` with `MINIMUM_NODE_VERSION = '22.18.0'` at `:480`. `src/core/compilers.ts:580` emits `devEngines: WORKSPACE_DEV_ENGINES` unconditionally, with no blueprint input anywhere in the expression, which is what makes "no blueprint field varies that floor" true rather than asserted. `src/core/constants.ts:502-508` frozen at `version: '>=11.6.0'`, `onFail: 'error'`.

`EBADDEVENGINES` is evidenced at `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt:57` (`devEngines.packageManager exit=1 crash=no EBADDEVENGINES`), with the refusal/admit pair at `:40-42` — ambient `10.9.7` and `11.5.0` both `refused=yes crash=no`, `11.6.0` `exit=0 … added 69 packages`. The nested `npm run` clause is evidenced at `evidence/linux-gate/path-prepend.log.txt:6,11`.

Bounds, both named in the brief's Unknowns and neither breaking the claim: the readings are one Linux host, so the prose's implied universality over hosts is unmeasured; and no retained reading executes `npm install --global npm@11.6.0` itself, so the remedy's form is npm's documented global install rather than a measured one. Settling commands under **Unknown observations**.

**3. Every code token in the edited prose is followed by a noun and none is possessivized. — CONFIRMED**

The possessive sweep is empty over every named file. Pattern `` `'s ``, paths `guides/scaffold.md`, `README.md`, `ROADMAP.md`, `src/core/constants.ts`, `tests/distribution.test.ts`: no match in any of them.

Attacked hard and held: the version token `11.6.0` reads bare at `guides/scaffold.md:1457` ("run a generated workspace on npm `11.6.0` or later") and at `README.md:61` ("an npm floor of `11.6.0`"), and the predecessor round named `11.6.0` among the bare tokens (`u-fix-audit-verdict.md:17`). It is not a miss. `.orkestrel/campaign/u-fix-2-brief.md:37-39` prescribes exactly these forms — "write forms such as the `>=22.18.0` range, the `>=11.6.0` range, the `error` value, and npm `11.6.0` or later" — so the governing noun precedes the token by the Orchestrator's own ruling, and `u-fix-2-brief.md:49` prescribes the README form verbatim. The subject wrote its brief.

Second attack, also held: `README.md:12` and `guides/scaffold.md:36` write "Node 22.18.0 or later" unbackticked while the edited text backticks `11.6.0`. That is not incoherence — the unbackticked form states a requirement in prose, the backticked form names a value a manifest declares, and the same paragraph backticks `>=11.6.0` as the literal range beside it. The distinction tracks something real.

**4. Item C is true, placed, and does not capture the README pin. — CONFIRMED**

`README.md:61-64` sits as the first paragraph of § Notes (`README.md:59`), before the Windows paragraph. Each clause is true against the emitted manifest as verdict 2 establishes. The sentence carries no `Node <floor> or later` phrase, so the regex at `tests/guides.test.ts:111` — `/Node (?<floor>\d+\.\d+\.\d+) or later/u`, unanchored on any subject — still takes its first match at `README.md:12`; nothing earlier in the file matches. `test:guides` exit 0 at `evidence/linux-gate/final3.status.txt:11`, and the control the Orchestrator retained (`readme-pin-control.log.txt`) is what makes that green mean something.

**5. Item B is the only change in `tests/distribution.test.ts`. — CONFIRMED**

`tmp/evidence/u-fix-2.diff.txt:181-193`: one line, inside the `//` comment block at `tests/distribution.test.ts:923-929`, `resolveNpm` → `provisionNpm`. Diffstat row `2 +-`. No executable line in the hunk.

**6. Item D's `&&` row is true prose. — CONFIRMED**

`ROADMAP.md:387-395`. No count survives: "one failing project" became "a failing project" and "one red case in `src:server`" became the named case. The case is the right one, and I verified the identity myself rather than taking the unit's word: `evidence/linux-gate/scaffold-gates.log.txt:168` names the 2026-09-13 failure as `tests/src/server/helpers.test.ts > Ollama setup > refuses redirected version readiness without starting a local daemon`, failing at `:223:59` on `expect(server.requests.map(…)).toStrictEqual(['/api/version'])`; that same assertion is `tests/src/server/helpers.test.ts:234`, under the title `refuses an unready loopback endpoint rather than starting a host daemon` at `:225`. Same case, renamed since the log. The row's descriptor "the unready-loopback case" matches the title the file carries at the tip, so a reader can find it. The remaining clauses ("Rule on a composition that runs every project and reports every failure; the repair edits…") are reflowed, not changed.

The unit correcting its brief here was right and the record says so plainly (`u-fix-2-report.md:87`). Writing the brief's name would have put a false claim into the row item D exists to make true.

**7. Item D's citation and possessives. — CONFIRMED**

`ROADMAP.md:375-379` names `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt` and states the prune and the git-history persistence. The file exists and records every version the row claims: `10.9.7`, `11.0.0` through `11.5.0`, and `11.6.0`, each verified from its own install log (`npm-boundary-readings.log.txt:22-31`). `ROADMAP.md:368-369` reads "timed out at the warmup in `OllamaProvider.test.ts`" and `:295-296` reads "the disabled busy submit in `SetupPanel` parks focus deliberately" — both recast, both substantively identical to the rows they replace.

**8. Item D's successor row carries every finding the predecessor carried. — CONFIRMED on the enumerated list; R-4's question is not carried**

`ROADMAP.md:422-441` names every item the brief enumerates, each locatable: the hard-coded `EAFNOSUPPORT` with the unmeasured errno set (F-1 of claim 1, and R-1); the `resolveTool` execute bit; the inline, unexported, unasserted shadow directory and the silent drop; `OLLAMA_TOOLS` against `scripts/ollama.sh`; the `host` collision in the `executeOllamaSetup` doc block; `host npm` in the `provisionNpm` doc block; the `provisionNpm`/`resolveNpm` prefix as an open design question; the guide's unasserted behavioural claims; the README pin's in-body imports and unanchored regex; the missing `engines.node`-to-`MINIMUM_NODE_VERSION` pin. The row states no count. It reopens nothing closed.

R-4, which the brief asks me to rule on: **the shadow-directory clause does not cover it.** The clause records that "a tool it cannot resolve is dropped silently" — the mechanism. R-4 asked a different question: whether a host lacking `setsid` or `timeout` changes the exit code and the message the pinned case asserts. A successor reading this row learns the drop is silent and learns nothing about the pinned case's assertions being unverified on such a host, so the question the predecessor's terminal line recorded as carried is not in the artifact. Recorded as a finding outside the claims with its fix. `ROADMAP.md` is not in `package.json`'s `files` list (`package.json:22-27`), so this reaches the repository and not the upload.

**9. Item E moved no summary line. — CONFIRMED**

The diff hunk is `@@ -493,8 +493,9 @@` (`tmp/evidence/u-fix-2.diff.txt:169`), opening on ` *` and ` * @remarks`. The description paragraph sits at `src/core/constants.ts:492` — outside the hunk, untouched — and reads "Holds the `devEngines` record every generated manifest carries.", which is byte-for-byte the guide's parity cell at `guides/scaffold.md:168`. `test:guides` exit 0 at `final3.status.txt:11`.

**10. `host.json` follows the vendored guide edit. — CONFIRMED**

Not by my own hash — by the mechanism that can disagree with it. `tests/config.test.ts:705-727` regenerates the inventory, indexes each entry's `destination` to its `digest`, compares against the committed `host.json`, and names every stale destination. `test:config` exit 0 after `build` at `final3.status.txt:9`, so the committed digest at `host.json:694-696` equals the one regenerated from the file at the tip. The integration pair owning that regeneration exists on disk: `.orkestrel/campaign/u-fix-2-integrate-brief.md` and `u-fix-2-integrate-report.md:24-25`, which names `host.json` as its one owned path, regenerated by `build` and never hand-edited. The record defect the predecessor ruled BROKEN at claim 12 is closed.

**11. Nothing outside the carriers moved. — NOT-EVIDENCED on the second conjunct; CONFIRMED on the first**

First conjunct holds: `tmp/evidence/u-fix-2.diffstat.txt` lists exactly `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, `src/core/constants.ts`, and `tests/distribution.test.ts`, and every hunk in the diff belongs to a named carrier.

Second conjunct cannot be read from the supplied evidence at all. `dist` is untracked, so a tracked diff between two commits structurally cannot show `dist/src`, and no build-and-compare against `9e21cd7` is in the portfolio. What I can read corroborates without bounding: the reworded comment is present in the built artifacts at `dist/src/core/index.d.ts`, `index.d.cts`, `index.js`, `index.cjs`, and the two sourcemaps.

That reading also breaks the claim's wording. "Item E's declaration comment" understates the reach — the TSDoc block survives into the emitted JavaScript and the maps, not only into the `.d.ts` files. Nothing is obliged by it: the emitted difference is comment text, which `.agents/orchestration.md` § What a bump obliges treats as immaterial, and the package bumps to `0.0.65` regardless. Settling command under **Unknown observations**.

**12. The authoritative host run is green and the provisioning case skips at the floor. — CONFIRMED**

`final3.status.txt:1-13`: every row `exit=0`, including `distribution(release)` and `prepublishOnly(literal)`.

The skip identification I re-derived rather than accepted. `tests/distribution.test.ts` carries exactly two conditional gates: `it.skipIf(!registry && !release)` at `:782` and `it.skipIf(compareVersions(ambient, MINIMUM_NPM_VERSION) >= 0)` at `:982`. Under `--mode release` the first condition is false whatever the registry does, so it cannot produce a skip in either run. `u2-probe.log.txt:1-3` reads `ambient npm on PATH: 11.6.0 (node v22.22.2)` and `Tests 5 passed | 1 skipped (6)`; `final3` under ambient `10.9.7` reads `6 passed (6)`. The two runs differ in exactly one input and exactly one gate reads that input, so the skipped case is the provisioning case at `:982` and every other case passed. The pair is self-corroborating in both directions.

**13. The package is coherent to ship. — CONFIRMED**

Read as a consumer: `README.md:12` states the executable's Node floor; `README.md:59-64` states the generated workspace's npm floor, the refusal code the developer will actually see, and the command that clears it; `guides/scaffold.md:1451-1459` states the same facts with the manifest fields behind them and the `npm --version` reading; `src/core/constants.ts:502-508` and `src/core/compilers.ts:580-581` emit exactly what both documents describe; the refusal is measured. The document a reader meets first now carries the npm floor, which is what the predecessor ruled it lacked.

Three further attacks, all held:

- **Does the guide contradict itself elsewhere?** No. `npm install` appears in `guides/scaffold.md` only at `:33` (installing the package itself) and inside the toolchain paragraph. The guide never instructs a reader to install a generated workspace anywhere that omits the floor.
- **Does scaffold's own checkout meet the refusal, making the README's scoping ("a workspace the `scaffold new` command generates") too narrow?** No. `package.json:118-120` declares `engines` and no `devEngines` record, so the scoping is exact.
- **Does § Notes bury a prerequisite?** `.claude/rules/writing.md` § Structure bars a note from carrying a prerequisite the task depends on. The rule's subject is a callout, not a `## Notes` section in the main flow, and the file's neighbouring paragraph (the Windows and PowerShell caveat) is this README's own precedent for an operational condition of the same shape. The placement was the audit's own prescription and it holds.

The brief's second Unknown, ruled: **a README reader does not need the `npm --version` reading the guide gives.** The README sentence names `EBADDEVENGINES`, which is the observable the reader already has in front of them when they need this paragraph; reading their version first is a step the refusal has already taken for them. The guide's extra sentence serves a reader planning before the first install. The asymmetry is correct, not a gap.

## Findings outside the claims

**R4-carry — `ROADMAP.md:427-429`.** The successor row records the silent drop but not R-4's question. `u-fix-audit-verdict.md:68` lists R-4 among the carried findings and `:45-47` routes every carried finding to this row "so the acceptance prune cannot drop them"; the row names neither `setsid`, nor `timeout`, nor the pinned case's assertions. Why it matters: R-4 is the only carried item whose question survives independently of the mechanisms the row does name — the silent drop can be closed exactly as written while the pinned case's exit code and message stay unverified on a host lacking either tool, and the campaign folder that holds the question is pruned at acceptance. What right looks like: extend the shadow-directory clause to read "…and a tool it cannot resolve is dropped silently, so whether a host lacking `setsid` or `timeout` changes the exit code and the message the pinned case in `tests/src/server/helpers.test.ts` asserts is unmeasured". `ROADMAP.md` is unpublished, so this does not reach the artifact.

**README-voice — `README.md:61-64`.** The sentence is the one place in the shipped set where the prose falls below the standard the rest of the change meets. Two rule-grounded defects in one sentence. First, the opening puts a reduced relative clause between subject and verb — "A workspace the `scaffold new` command generates declares" — so the reader meets "generates declares" adjacently and re-reads, against `AGENTS.md` § Writing ("Word every sentence so the reader understands it on the first read") and against `.claude/rules/writing.md` § Voice and actor, which asks for the acting component as the sentence's subject; here the acting component is the `scaffold new` command and it is buried. Second, one sentence carries three ideas — the declaration, the refusal, and the remedy — joined by "so" and a semicolon, against "One idea per sentence", while the guide states the same content in four sentences and the neighbouring README paragraph at `:66-67` states its own caveat in two. What right looks like, preserving every fact and the § Notes placement:

```
The `scaffold new` command generates a workspace that declares an npm floor of `11.6.0` in its
`devEngines` record, so an npm beneath that floor refuses the `npm install` command with the
`EBADDEVENGINES` code. Raise npm with the `npm install --global npm@11.6.0` command, or a later
release, before the first install.
```

This makes no claim false and blocks nothing; it is a shipped byte in the document a reader meets first, which is the only reason I raise it rather than filing it forward.

**report-adjacency — `.orkestrel/campaign/u-fix-2-report.md:89`.** The unit's recorded rationale for the placement is wrong about the tree: it says the paragraph was kept "adjacent to the `package.json` bullet whose manifest it describes", and the `package.json` bullet is the list's first (`guides/scaffold.md:1403`) while the paragraph sits after its last (`:1448-1451`). The placement itself is correct and claim 1 confirms it; the retained record states a false reason for it, which the next reader of this campaign inherits. Ships nothing. What right looks like: the rationale is that the section already trails its list with elaboration paragraphs, which is what the declaration-rollup paragraph at `:1461` does.

## Attacked and held

- The toolchain paragraph's trailing placement against the alternative of restating the list's introduction (verdict 1).
- The bare `11.6.0` token in both shipped files against `.claude/rules/writing.md` § Code tokens, and the backticked-versus-unbackticked version form between `README.md:12` and `README.md:61` (verdict 3).
- The `&&` row's case identity, re-derived from the retained log's failing assertion to the file's current line rather than from the unit's report (verdict 6).
- The u2 probe's skip identity, re-derived from both `skipIf` conditions in `tests/distribution.test.ts` rather than from the integration report's assertion (verdict 12).
- Whether scaffold's own checkout falls under the README's npm-floor sentence (verdict 13).
- Whether § Notes is a permitted home for a prerequisite (verdict 13).
- Whether the guide instructs a generated-workspace install anywhere the floor is absent (verdict 13).

## Unknown observations

- **`EBADDEVENGINES` beyond this host.** The retained readings are Linux only (`npm-boundary-readings.log.txt`). Settling command, on a Windows and a macOS host with npm beneath `11.6.0`: generate a workspace with `scaffold new`, run `npm install` in it, and read the `code` field npm reports. Until then the prose's implied universality is bounded to the measured host, which `.claude/rules/portability.md` § Claims requires naming rather than closing.
- **The remedy command itself.** No retained reading executes `npm install --global npm@11.6.0`; `npm-boundary-readings.log.txt:34` records that an npm `11.6.0` was installed and self-reports that version, without naming the npm that performed the install. Settling command, on a host whose ambient npm is `10.9.7`: `npm install --global npm@11.6.0 && npm --version`.
- **`dist/src` across the chain (claim 11's second conjunct).** Settling command: build at `9e21cd7` into one directory, build at `9a250bb` into another, and `diff -r -w` the two `dist/src` trees excluding `*.map`, reading whether anything beyond the reworded TSDoc block differs.

VERDICT: FAIL 11; outside the claims: R4-carry, README-voice, report-adjacency