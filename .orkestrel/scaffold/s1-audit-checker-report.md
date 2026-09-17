# Unit S1 audit — mechanical conformance report

Lane: `checker`, Sonnet, native subagent, clean context, 2026-09-16. Brief:
`tmp/audit/s1-audit-checker-brief.md`. Transcribed by the Orchestrator from the lane's returned
message, because the role carries no write tool — the brief named a report path the allowlist could
not reach, which is the Orchestrator's dispatch error and is recorded in § Deviations.

## Per-check results

**1. Scope honesty — PASS.** Every modified file is on the brief's owned list:
`configs/src/vite.bin.config.ts`, `configs/src/vite.core.config.ts`,
`configs/src/vite.server.config.ts`, `src/core/compilers.ts`, `src/core/templates.ts`,
`tests/src/core/compilers.test.ts`, `tests/src/core/templates.test.ts`, `vite.config.ts`.
`.orkestrel/scaffold/` is untracked campaign retention, not a code edit. No off-limits file is
modified. No file appears in neither list.

**2. `applicationBrowser` is gone — PASS.** `src/` no matches; `configs/` no matches;
`vite.config.ts` no matches; `guides/` no matches. `tests/` carries one hit,
`tests/src/core/compilers.test.ts:1153`, `expect(config).not.toContain('applicationBrowser')` —
the absence assertion, not a survival.

**3. Every factory takes the override — PASS.** Every value-exported `UserConfig`-returning
declaration in the emitted template text declares `(override?: UserConfig): UserConfig`:
`srcCore`, `srcBrowser`, `srcServer`, `srcBin`, `appCore`, `appBrowser`, `appServer`, `policy`,
`config`, `setup`, `guides`, `conformance`, `service`, `distribution`, `probe`, `integration`. The
one exemption is `mergeOverride(base: UserConfig, override?: UserConfig)`, which the brief allows.

**4. No wrapper calls `mergeConfig` — PASS.** `grep -n mergeConfig configs/` returns no hits across
this repository's own wrappers and their generated-template counterparts. `mergeConfig` appears
only inside `mergeOverride`.

**5. Banned syntax — PASS.** Sweep over the added lines of `tmp/audit/s1-diff.patch` for ` as `,
`as unknown`, `: any`, `<any>`, `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, `eslint-disable`,
`oxlint-disable` and a non-null assertion. The only ` as ` hits are import renames
(`config as configProject` and its siblings) and prose inside comments. No type assertion, no
suppression comment, no `any`.

**6. Vendored files unedited — PASS.** `git status --short` shows no line for `configs/helpers.ts`,
`configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, or
`host.json`.

**7. The two inverted cases — PASS.**

- `tests/src/core/compilers.test.ts:1147`, `gives every application browser factory the caller
  override`. Controls: `expect(config).not.toContain('applicationBrowser')`,
  `expect(config).not.toContain('never[]')`,
  `expect(config).not.toContain('overrides are not permitted')`. The comment at lines 1138–1146
  carries the reason: `appBrowser` is a project row, Vitest calls it with its own environment
  record, that record lands in the override position, `mergeOverride` refuses a value carrying
  `command`, and the vendored `tests/config.test.ts` drives every registered row through that
  refusal.
- `tests/src/core/templates.test.ts:932`, `declares every emitted project factory with the override
  parameter`. Planted control: `sealParameter` takes the override back out of the emitted `policy`
  factory, and the sweep requires that plant to be reported —
  `expect(findRefused(sealed)).toStrictEqual(['policy()'])` at line 944, with
  `expect(findRefused(CONFIG_TEMPLATES.factories.policy)).toStrictEqual([])` at line 945. The
  comment at lines 933–941 carries the same reason.

**8. Guide parity — PASS.** No file under `guides/` names `applicationBrowser`, `mergeConfig`,
`appShowcase`, `appBrowser`, or `mergeOverride`.

**9. Count honesty — NOT RUN.** The lane has no command-running tool, so the green half could not
be re-derived here. Carried to the `verifier` lane, whose `npm test` run reports `src:core`
independently.

## Discrepancies

None between the tree and the report for the checks that ran.

## Deviations

The brief assigned this lane a command to run and a report file to write. The `checker` allowlist
carries `Read`, `Grep`, and `Glob` and neither. That is the Orchestrator's dispatch error against
`.agents/orchestration.md` § Check the brief before you send it — "Check the brief's output
mechanism and its verification method against the executor's tool allowlist." The count check moved
to the lane that owns gate evidence; this report was transcribed rather than written by the lane.

VERDICT: ACCEPT
