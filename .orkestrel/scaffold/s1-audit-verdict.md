# Unit S1 — audit verdict

Round: the config override change, audited 2026-09-16 while uncommitted in the `scaffold` checkout.

**Ruling: REJECT, with a fix round dispatched as unit S2.** The change's direction is confirmed by
every lane. Two defects the gates cannot see are what the rejection rests on, and both lanes found
each one independently.

## Lanes that ran

| Lane | Role and engine | Verdict | Report |
| ---- | --------------- | ------- | ------ |
| Objective | `analyst` — GPT-5.6 Sol, Codex bench, `gpt-6-astra`, read-only | REJECT | `s1-audit-objective-report.md` |
| Subjective | `reviewer` — Opus 5, native subagent, clean context | REJECT | `s1-audit-subjective-report.md` |
| Mechanical | `checker` — Sonnet, native subagent, clean context | ACCEPT | `s1-audit-checker-report.md` |
| Gates | `verifier` — Sonnet, native subagent | GREEN | `s1-verify-report.md` |

Both lanes ran on the same claim list, `s1-audit-claims.md`, blind to each other, in clean contexts.
The writer was the Opus `implementer`; the objective lane is the engine that did not write the work.

Objective lane provenance: journal `tmp/codex/s1-audit-objective-2.jsonl`, session
`01a0accd-b429-7561-a25b-a596967e00a8` for the successor run.

## Reconciled claim verdicts

`1` `2` `3` `4` `6` `10` `11` `12` `13` CONFIRMED by both lanes. The objective lane settled claim 10
by executing the generator and comparing every emitted configuration byte-for-byte against its
checkout file, with a control that produced a mismatch.

`5` REFUTED. The plugin selection flattens one level and runs over the merged array. Carried to S2
item 1.

`7` CONFIRMED. Both lanes made it turn on whether `viteSingleFile()` returns same-named siblings.
Research settled it: `vite-plugin-singlefile@2.3.3` returns one plugin object named
`vite:singlefile`.

`8` CONFIRMED. `vite-plugin-singlefile@2.3.3` overwrites `build.assetsInlineLimit` with `() => true`
in its `config` hook, unconditionally, whenever `useRecommendedBuildConfig` is true — and the
emitted showcase passes `useRecommendedBuildConfig: true`. The restated `4096` is discarded before
Vite resolves the configuration, so it is build-neutral. It stays as the guard for a workspace that
turns that option off, because the showcase composes on a browser configuration that sets `0`.
Carried to S2 item 8 as the comment that records it.

`9` REFUTED by both lanes. The inverted browser case carries the reason but plants no control.
Carried to S2 item 4.

`14` CONFIRMED, following claim 8.

## Findings carried to S2

Every finding has exactly one carrier.

| Finding | Source | Carrier |
| ------- | ------ | ------- |
| Plugin selection is depth-dependent and reaches the caller's own array | subjective Finding 1, objective claim 5, both hazard rulings | S2 item 1 |
| The hazard case states a population it does not have, and pins it with a transcribed length | subjective Finding 2 | S2 item 2 |
| The showcase factory template lives in the compiler | subjective Finding 3 | S2 item 3 |
| The inverted browser case plants no control | subjective Finding 4, objective claim 9 | S2 item 4 |
| The refusal's comment overclaims, and the refusal is wider than its subject | subjective Finding 5, objective silent-refusal ruling | S2 item 5 |
| `findRefused` names a judgment rather than what it returns | subjective Finding 6 | S2 item 6 |
| Shared test data sits in private module constants | objective placement finding | S2 item 7 |
| The showcase's `assetsInlineLimit` is unread, and nothing says why | claims 8 and 14 | S2 item 8 |

## Findings recorded, not carried

- **`publicDir: false` is restated in the core wrapper.** Subjective Finding 7. It predates this
  change. S2 is told to leave it. It belongs to whoever next owns the emitted wrapper templates.
- **The plugin-selection rule has no gate in a generated workspace.** The vendored
  `tests/config.test.ts` proves the invocation-record refusal in every workspace that receives it;
  the selection rule is proven only in this repository's own `tests/src/core/compilers.test.ts`,
  which no generated workspace receives. Closing it means editing a vendored file, which moves
  `dist/host`, which obliges a scaffold bump, a publish, and a `repair` visit to every target. That
  is a release decision and belongs to the repository owner, not to an auditor's finding.

## Deviations this round

- **Two briefs named a report path their executor's allowlist cannot write.** The `reviewer` and
  `checker` roles carry no write tool. Both reports were transcribed by the Orchestrator instead.
  Orchestrator dispatch error against `.agents/orchestration.md` § Check the brief before you send
  it.
- **The checker brief assigned a Vitest run to a role with no shell.** The check moved to the
  `verifier`, whose `src:core` run reports 415 passed.
- **The objective lane's first launch failed and was re-run.** Its brief's § Execution addressed a
  bridge driver, and the file was delivered to the bench engine, which tried to launch a nested
  Codex and stopped on `Error loading configuration: Could not find home directory`. The successor
  brief `s1-audit-objective-brief.md` addresses the bench engine directly and supersedes
  `tmp/audit/s1-audit-objective-brief.md`. Orchestrator dispatch error against
  `.agents/orchestration.md` § Required sections, which requires the Execution sentence to be
  written for the reader the transport delivers it to.
- **A scoped Vitest run inside the read-only bench sandbox fails** with `EPERM … mkdir …\ssr` before
  collecting tests. Named in the S2 brief as a host fact.

VERDICT: REJECT — fix round S2 dispatched.
