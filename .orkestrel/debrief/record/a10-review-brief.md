# A10 review — agent policy (writers were Sol and the Orchestrator; Opus rules)

## Role and engine

`reviewer`, engine **Opus 5**, native, high effort, read-only. You audit; you never edit,
reconcile, or accept.

## Subject

Commit `4f67735` in `/workspace/supervisor` (range `b6737f7..4f67735`, 8 files): the agent
lane's model, endpoint, deadline, and residency become the grouped
`ApplicationPolicy.agent`, with a measured default deadline and a portable real-server
proof. The full diff and status evidence is embedded at
`/home/user/scaffold/tmp/alignment/a10-evidence.md` — read it first; you have no shell, so
that file is your diff. Context to read directly: `app/core/types.ts` (~~:166-180),
`app/core/parsers.ts` (the agent group ~~:452-475 and `parseApplicationURL` ~~:625-670),
`app/core/constants.ts` (~~:150-200), `app/server/ApplicationRuntime.ts` (~~:160-172),
`tests/app/server/ApplicationRuntime.test.ts` (~~:55-135),
`tests/app/core/factories.test.ts` (~~:60-125), `guides/src/supervisor.md` (~~:896-905,
~:1156-1162, ~:1200-1205, ~:1271-1277). The unit's history is in
`.orkestrel/supervisor/a10-report.md` (Sol's sandbox-block deviation, the Orchestrator's
integration rulings).

Gate evidence (Orchestrator-run, not yours to re-prove): app:core 117/117, app:server
218/218, guides parity 374/374, tree-wide format clean, check green; the deadline proof
settles at the configured 2s within [1750,5000)ms; idle cold run 11,939ms under defaults.

## Claims to rule on (verdict each, with file:line evidence)

1. The grouped policy satisfies the naming and design laws: single-word members, absence
   as `undefined` (no sentinel), no second copy of any fact, the group's shape matching
   the ruled design plus the `url` addition — and that addition is a mechanism with a real
   first consumer, not speculation.
2. `parseApplicationURL` is airtight for its contract: absolute http/https only, trimmed,
   bounded, control-refusing, typed CONFIG errors, `undefined` passthrough — and the
   hoisted-narrowed spread means the frozen agent group genuinely lacks the key when the
   env is absent (exactOptionalPropertyTypes honest, no `as`).
3. The deadline proof binds: it could not pass at b6737f7 (no APP_AGENT_URL/TIMEOUT
   parsing existed), its assertions pin the wire (model, keep_alive), the settlement
   (failed + abort message), and the timing window — and nothing in it touches a real
   daemon or a fixed port, so it cannot flake on occupancy or address family.
4. The TSDoc calibration prose states only measured facts and their conditions (idle cold
   11,939ms; warm sub-second; loaded cold censored >120,000ms; default 3x the censored
   bound), and the guide's four rows and two paragraphs match the landed code exactly with
   every backticked name resolving.
5. The diff contains no `as`, non-null `!`, suppression, mock, fake clock, new dependency,
   or unrelated change; every new export is barrel-reachable and tested; the
   `tests/setupBrowser.ts` hunk is format-only.

## Subjective lane (your charter)

Does `url` read as the group's word, or should the lane's endpoint carry another name? Is
the calibration prose in the constant's TSDoc the right home and register for measurement
evidence? Name anything to re-voice as report-only findings with proposed exact wording.

## Execution

Perform the review directly and spawn nothing. Read-only: `Read`, `Grep`, `Glob` only.

## Output

Numbered verdicts 1-5, each `CONFIRMED` or `REFUTED` with `file:line` evidence and one
line of reasoning; subjective findings as `S<n>` with exact proposed wording where
applicable; then exactly one terminal line: `REVIEW: PASS` or `REVIEW: FAIL <claims>`. No
process diary.
