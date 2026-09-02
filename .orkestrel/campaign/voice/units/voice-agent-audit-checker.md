# Audit lane output — voice-agent, checker lane (FAIL 2)

## Verdicts

Per-claim rulings below.

## Findings outside the claims

## Claim 1 — comment-only hunks: CONFIRMED

Every `-`/`+` line pair in `/home/user/scaffold/tmp/units/voice/voice-agent.diff` (2172 lines, 20 files) begins with `*`, `/**`, or `/**` continuation. A full sweep with `rg '^[+-][^+-]'` over the diff (all 385 changed-content lines) shows every one prefixed by a comment token (`* `, `/** `, or tab-indented `* ` / `/** `). No hunk touches a code token, an import, a signature, or a value.

## Claim 2 — token identity: BROKEN

Two hunks introduce a backtick token absent from the removed line, and neither fits a stated exception (boolean `@returns` rewrite, boolean-summary opener, or dropped self-referential identifier — this is neither an `@returns` line nor a "`true` when the value is …" opener; it is a plain property/options doc):

- `src/core/factories.ts` (diff hunk near old line 1699, `AgentQueueOptions.partial`):
  - removed: `` /** A partial `AgentResult` THROWS by default (retries engage); `true` resolves it as success. */ ``
  - added: `` /** If `true`, a partial `AgentResult` resolves as success; if `false` (the default), it THROWS and retries engage. */ ``
  - The added line introduces a new backtick token `` `false` `` that the removed line never carried.
- `src/core/factories.ts` (diff hunk near old line 1717, `AgentRunnerOptions.partial`):
  - removed: `` /** A partial `AgentResult` THROWS by default (fail-fast engages); `true` resolves it as success. */ ``
  - added: `` /** If `true`, a partial `AgentResult` resolves as success; if `false` (the default), it THROWS and fail-fast engages. */ ``
  - Same new `` `false` `` token, same exception gap.

Verified with `rg '^\+.*`false`'` against the diff: three hits total, one (`errors.ts` line 316, the `AgentJobError` doc) matches a `` `false` `` token already present on the corresponding removed line (context lines 312-317), so it is not a new token. The remaining two hits are the `factories.ts` cases above, both genuinely new tokens.

## Claim 3 — status scope: CONFIRMED

`/home/user/scaffold/tmp/units/voice/voice-agent.status` lists 20 `M` entries, every one under `src/core/**` (`Agent.ts` through `validators.ts`). None under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts`.

## Claim 4 — imperative/returns sweep: CONFIRMED

Ran the brief's exact sweep against `/home/user/fleet/agent/src`:
- Single-line `/** Verb …` openers: no match.
- Multi-line blocks whose first content line after `/**` opens with a listed verb: no match (multiline `rg` over `/**\n * Verb`).
- Tab-indented property-doc `/** Verb …` forms: no match.
- `@returns` followed by `Whether`, `` `true` ``, or `true `: no match.

An earlier broad grep for the verb list anywhere in a comment line returned mid-paragraph continuation lines only (for example `errors.ts:16` "read `partial`", `factories.ts:439` "Write and read are decoupled"), none of which open a doc block's first line, so they are not sweep hits.

## Claim 5 — gates: CONFIRMED on quoted evidence

The writer's report (`/home/user/scaffold/tmp/units/voice/voice-agent-report.md`, lines 50-64) quotes the exact command and exit code for every gate in order: `npm run format:check` (0), `npm run lint:check` (0), `npm run check` (0), `npm run build` (0), `npm test` (0, with per-suite pass counts). Per the brief's own acceptance criterion 4 and this claim's instruction, `npm test` is reported as an observation and the Orchestrator's landing chain remains the authoritative run.

## Findings outside the claims

- The two `factories.ts` token additions (claim 2) are the only mechanical defect found; they are cosmetic (adding `` `false` `` for symmetry with the newly added `` `true` `` opener) but are still a rule violation under the claim's byte-identity requirement, since the brief's stated exceptions do not cover this pattern. This is a re-dispatchable instruction: revert the two `partial` doc comments in `src/core/factories.ts` (`AgentQueueOptions.partial`, `AgentRunnerOptions.partial`) to keep only the tokens the removed line carried, or extend the accepted-exception list explicitly if the intent was to allow it.
