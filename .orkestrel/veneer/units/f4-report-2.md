<!-- Unit F4 HOST-OBSERVATIONS, run 2: `sol` on GPT-6 Astra (codex exec, workspace-write with the network-access override), thread 01a0c983-3680-7332-a252-6ba99dde9d85, returned 2026-09-22 with a deviation report and no tracked change; its probe measured the restoration matrix on Chromium 141.0.7390.37. Brief: f4-brief-2.md over f4-brief.md and f4-terrain.md. Journal: tmp/codex/f4-2.jsonl (launch journal, swept at acceptance). Retained verbatim. -->

# F4 HOST-OBSERVATIONS — report 2

Stopped on the serialized-class condition in Obligation 4. On Chromium `141.0.7390.37`, a host with no `class` attribute has `class=""` after construction, `toggle()`, and `destroy()`. Attribute presence changes; this is neither token reordering nor whitespace collapse. The tracked tree remains clean at `751c3ed`.

The effective instruction is `tmp/units/f4-brief-2.md` over `tmp/units/f4-brief.md`. The terrain record was read first and whole. No agent was spawned.

## Changes by obligation

- **Obligation 1 — recorder:** Not implemented. No change to `tests/setup.ts`, `tests/setupBrowser.ts`, or `tests/setupBrowser.test.ts`.
- **Obligation 2 — event assertions:** Not implemented. No change to `tests/src/browser/Button.test.ts` or `tests/src/browser/helpers.test.ts`.
- **Obligation 3 — receipts:** Not implemented. No change to `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/fixtures/oracle/button.json`, or `README.md`.
- **Obligation 4 — restoration:** Measured the requested initial-class and `aria-pressed` combinations against the actual `src/browser/Button.ts` implementation. The reading reached the stop condition before tracked edits. No restoration test was added. The existing consumer-edit test remains unchanged.
- **Obligation 5 — delegated release:** Read `src/browser/Delegate.ts`; its contained-host check agrees with the successor brief's reinsertion correction. No guide paragraph was added.
- **Obligation 6 — registry term:** Not implemented. The rename population remains unchanged.
- **Obligation 7 — stripe scopes:** Not implemented. `tests/src/styles/tokens.test.ts` remains unchanged.

Only this ignored report remains from the unit. The temporary `tmp/probe/f4-restoration.mjs` file was deleted after its run.

## Commands and exit codes

The following execution and inspection commands returned these results.

| Command | Exit code | Reading |
| --- | --- | --- |
| `git log -1 --format='%h %s'` | 0 | `751c3ed Carry the oracle keyboard traversal with the scoped Test release` |
| `git status --porcelain` | 0 | Empty before the probe and after its deletion. |
| `node tmp/probe/f4-restoration.mjs` | 0 | The matrix completed; membership, other-token order, and exact `aria-pressed` restoration assertions passed. Serialized strings appear in the following section. |
| `git diff --stat` | 0 | Empty. |
| `npm --version` with the brief's npm directory prepended to `PATH` | 0 | `11.19.1` |
| `npm run test:policy` with the same `PATH` | 0 | `109 passed`, `1 skipped`; run after writing the report. |

Each file read used its own command. The `cat` commands exited 0 for these paths: `tmp/units/f4-terrain.md`, `tmp/units/f4-brief-2.md`, `tmp/units/f4-brief.md`, `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.agents/orchestration.md`, and the `tests.md`, `typescript.md`, `names.md`, `architecture.md`, `patterns.md`, `documentation.md`, `writing.md`, `browser.md`, `quality.md`, `portability.md`, and `styles.md` files under `/home/user/scaffold/.claude/rules/`.

The separate `cat` commands also exited 0 for `guides/README.md`, `guides/veneer.md`, `ROADMAP.md`, `node_modules/@orkestrel/test/dist/src/core/index.d.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/src/browser/Button.test.ts`, `tests/src/browser/helpers.test.ts`, `src/browser/Button.ts`, `src/browser/Delegate.ts`, `package.json`, and `configs/browsers.ts`.

The following bounded reads exited 0.

```text
sed -n '280,560p' /home/user/scaffold/.agents/orchestration.md
sed -n '560,730p' /home/user/scaffold/.agents/orchestration.md
sed -n '193,207p' ROADMAP.md
sed -n '170,192p' ROADMAP.md
sed -n '370,580p' node_modules/@orkestrel/test/dist/src/core/index.d.ts
grep -n -E '^export|^ export|record|composedPath|relatedTarget|currentTarget' node_modules/@orkestrel/test/dist/src/browser/index.d.ts
sed -n '/^## Surface/,/^## Methods/p' /home/user/scaffold/guides/test.md
```

Some large read outputs truncated despite separate commands. The terrain and effective briefs did not truncate. Follow-up reads recovered the orchestration stop protocol and the roadmap standing conditions. Required reading for implementation was not completed before the stop.

No acceptance gate chain ran after a final implementation edit: no implementation edit occurred. The formatter, lint, typecheck, browser, setup, style, conformance, and guide gates were not run. The policy gate passed after the report was written and was repeated after its final edit.

## Stored-event sweep

The planned pattern is `target|currentTarget|relatedTarget|composedPath`, bounded to the owned files, with the terrain's `tests/src/browser/*.test.ts` population used to distinguish listener-body reads from stored-event reads. The sweep was not run. No clean-sweep claim is made.

## Serialized-class observations

The probe bundled the actual `src/browser/Button.ts` entry and its dependencies in memory through Vite, with writing disabled, and loaded that bundle into Playwright Chromium. It constructed detached native button hosts, applied each requested attribute combination, then called the actual constructor, `toggle()`, and `destroy()`.

Each row in this table held separately for `aria-pressed` absent, `"true"`, `"false"`, and `"mixed"`. Every reading preserved the exact original `aria-pressed` value and absence, the original `active` membership, and the order of every other class token.

| Original `class` reading | Restored `class` reading | Observation |
| --- | --- | --- |
| `null` — attribute absent | `""` — attribute present | Attribute presence changes; the brief requires a stop. |
| `"active btn"` | `"btn active"` | Token order changes. |
| `" active  btn "` | `"btn active"` | Whitespace collapses and token order changes. |
| `"btn"` | `"btn"` | Serialized value is unchanged. |
| `""` | `""` | Serialized value is unchanged. |

The exact absent-class, absent-pressed reading was as follows.

```json
{"before":{"classes":null,"tokens":[],"pressed":null},"after":{"classes":"","tokens":[],"pressed":null}}
```

## Fixture provenance

The fixture was not refreshed or edited, so there is no fixture header diff and no refreshed `browser` field to report. The probe's exact `browser.version()` string was `141.0.7390.37`. This is a probe measurement, not a fixture receipt. No fixture-step comparison ran.

## Whole-chain observation

`npm test` was not run. The whole-chain result is unverified.

## Working-tree evidence

After the temporary probe was deleted, `git status --porcelain` and `git diff --stat` each exited 0 and printed nothing. No tracked file changed.

## Deviation and unverified claims

**Expected:** Obligation 4 permits serialized differences only for token order or whitespace collapse and requires a stop for another difference.

**Found:** An absent `class` attribute becomes a present empty attribute for every requested pressed value on Chromium `141.0.7390.37`.

**Evidence:** The executed matrix produced the exact readings recorded earlier. `Button.destroy()` restores active membership through `classList.toggle()` and does not restore class-attribute absence.

**Done:** Measured the matrix, preserved every tracked file, deleted the temporary probe, and wrote this report.

**Not done:** The implementation obligations and acceptance gates remain open. No source fix or reinterpretation of the permitted differences was attempted.

This finding reaches the brief's serialized-difference stop condition. It does not establish a violation of the guide's narrower membership contract. The probe is an observation without a negative-control receipt; it does not replace the requested permanent proof. No claim is made about another browser build, a completed recorder, a completed rename, fixture stability after refresh, or passing acceptance gates.