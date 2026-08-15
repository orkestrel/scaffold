# A10 — the agent lane's deadline becomes policy: ApplicationPolicy.agent

## Role and engine

`sol` implementer, engine **GPT-5.6 Sol** via the journaled codex CLI, workspace-write
sandbox. Sole serial writer in `/workspace/supervisor` from the clean committed baseline
current at launch (the launcher names it; record it in your report). Perform directly,
spawn nothing, no commits/pushes/installs. Read `AGENTS.md`, `.claude/rules/names.md`,
`.claude/rules/patterns.md`, `.claude/rules/application.md`, `.claude/rules/tests.md`, and
`guides/src/supervisor.md` before editing. An Opus review follows; your self-report is not
acceptance.

## The defect (E1 finding 1, probe-bound)

A cold model load can outlive the inference deadline. The deadline is real and
unconfigurable today: `@orkestrel/ollama` defaults `timeout` to 120_000ms and
`ApplicationRuntime.ts:162` constructs `createOllama({ model: this.policy.model })` —
model only. E1 filmed a cold qwen3.5:2b run dying at exactly 120s (ollama logged the
client's 499). The tarpit probe (record:
`.orkestrel/supervisor/a8-probe-verdict.md`) proved the deadline lands as a settled failed
task, so the failure is honest — but a cold load must not be a failure at all.

## The mechanism (ruled by the reconciled design round — build exactly this)

1. **Types first.** `ApplicationPolicy` in `app/core/types.ts` replaces the flat
   `model: string` (line ~173) with a grouped sub-entity:
   `readonly agent: { readonly model: string; readonly timeout: number; readonly keep: string }`.
   Three flat keys about one lane is the case the single-word law regroups. `keep` is the
   policy's word; the runtime translates it to the provider's `keepAlive` at the
   `createOllama` call. Greenfield: update every consumer, no shim, no alias.
2. **Parsing.** `app/core/parsers.ts` grows the env surface beside the policy:
   `APP_AGENT_MODEL` (default `OLLAMA_MODEL`), `APP_AGENT_TIMEOUT` (positive safe integer
   milliseconds; default per rule 4), `APP_AGENT_KEEP` (non-empty duration string; default
   the provider's own `'5m'` unless your measurement argues otherwise). `APP_MODEL` is
   renamed, not kept: update every consumer under `app/`, `tests/`, and `demo`/`scripts`
   if present — grep first, list them in the report. Validation follows the existing
   parser patterns (typed ApplicationError, CONFIG code, bounds from constants).
3. **Composition.** `ApplicationRuntime.ts` passes all three:
   `createOllama({ model: policy.agent.model, timeout: policy.agent.timeout, keepAlive: policy.agent.keep })`.
   No other provider or executor changes.
4. **The default timeout is measured, not guessed.** Your first step: measure the cold
   path in this container. Kill the ollama daemon's resident model state by restarting the
   daemon (`ps` for `ollama serve`, kill by PID, `setsid ollama serve > tmp/a10/ollama.log 2>&1`,
   wait for `/api/version`), then time one real `run:'agent'` workflow through the built
   server (`dist/app/server/main.cjs` — the pattern in `tmp/a8-probe/probe.mjs`; use your
   own scratch under `tmp/a10/`, not that workspace). Record cold and warm durations. Set
   the default timeout from the observed cold high mark plus explicit slack (at minimum
   3x the cold observation, floor 300_000ms), declared as a named constant in
   `app/core/constants.ts` beside `OLLAMA_MODEL` with the measurement in its TSDoc remark.
5. **The proof binds to the boundary.** Two integration-grade proofs through the real
   built server, red-first where a red is expressible:
   a. Deadline honored: with `APP_AGENT_TIMEOUT` set small (e.g. 2000) against a hanging
      inference (tarpit pattern from `tmp/a8-probe/tarpit.mjs`, your own copy under
      `tmp/a10/`), the task settles failed at ~that deadline, not at 120s. Red form: at
      the current baseline the same env var changes nothing (assert the old behavior, then
      the new).
   b. Cold survival: a genuinely cold run (daemon restarted) under the new default
      completes. Record its duration beside the assertion.
   Place durable versions of these where the repository's test taxonomy puts real-server
   proofs (read how `tests/app/server/` structures them); the scratch scripts are launch
   evidence, the committed tests are the proof. If a committed test cannot restart the
   daemon safely, prove (a) as the committed test and record (b) as script evidence with
   its command and output pasted in the report — say which you did.
6. **Guide parity.** `guides/src/supervisor.md` documents the policy's `agent` group and
   the three env vars wherever it documents `APP_MODEL`/policy today (grep first). Run
   `npm run test:guides` and paste the count; close any parity red your exports cause.

## Scope

**Owned:** `app/core/types.ts` (the policy field), `app/core/parsers.ts`,
`app/core/constants.ts`, `app/core/factories.ts` (if it builds policy defaults),
`app/server/ApplicationRuntime.ts` (the one construction), every `APP_MODEL` consumer your
grep names under `app/`, `tests/`, `scripts/`, `demo/`; `guides/src/supervisor.md`;
scratch under `tmp/a10/`. **Off-limits:** `src/**`, `node_modules`, `app/browser/**`,
`tests/setupBrowser.ts`, configs, manifests, everything else.

## Environment facts

- The ollama daemon is running (`http://127.0.0.1:11434/api/version` answers); killing and
  restarting it is permitted and expected for the cold measurement — leave it RUNNING when
  you finish.
- The built server is current at `dist/` (rebuilt this session). If your app/core change
  must reach `dist` for the script proofs, run `npm run build` yourself and say so.
- Port 11434 must be free of tarpits when you finish; kill your own tarpit by PID.
- The codex sandbox denies network beyond localhost; everything here is localhost.

## Acceptance criteria

1. The grouped policy compiles everywhere: `npm run check` green; no `as`, no suppressions,
   no shim; `grep -rn "APP_MODEL\b" app/ tests/ scripts/ demo/ 2>/dev/null` names only the
   renamed forms (paste it).
2. Proof 5a red/green with commands and tails; proof 5b's duration recorded.
3. The default constant's TSDoc carries the cold/warm measurements.
4. `npm run test:app:core` and `npm run test:app:server` green with counts; `npm run
   test:guides` green with count.
5. The daemon is running and 11434 tarpit-free at the end (paste the version curl).

## Output

Touched files + diffstat; the measurements (cold, warm, chosen default); the APP_MODEL
consumer list; per-criterion proofs (red first); `git status --porcelain`; deviations or
none. No diary.

## Deviation contract

If `@orkestrel/ollama` rejects any of the three options as typed, or the policy ripple
reaches a file outside the owned list, stop and report with the diagnostic — do not widen
scope. Ancillary calls (constant names within the naming laws, where the parser helpers
sit among the existing ones) are yours to decide and record.
