# Audit verdict — unit breaking-toolbox

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `e5b868a`
(`units/toolbox.diff`, `units/toolbox-report.md` re-rendered from `units/toolbox-report.json`
after the lanes found the first render's placeholders), then the fix-up at `02e25a0`
(`units/toolbox-fixup-brief.md`, `units/toolbox-fixup-report.md`, `units/toolbox-fixup.diff`,
`units/toolbox-fixup.status`, checker lane `units/toolbox-fixup-audit-checker-brief.md`). The
subjective lane ran: a class and file rename, a compiler module extracted, a helper rename family,
and a constant rename, above the wide-unit trigger. The unit ran against `agent-f0c4979.tgz` and
the L3 and L4 tips (`stage-l6-toolbox.log`, `verify-l6-toolbox.log`).

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s10-15, -21, -22, -25, -26, -32; the s10-29 carrier) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; the new contracts in `types.ts` | BROKEN (guide `run` at contract row 5; `openStream` in See also) | — | CONFIRMED (the ledger's own names) | — | closed by the fix-up |
| 3 ruled form (`TerminalBridge` with `createTerminalRoutes` kept on the read return type; `MAX_WORKFLOW_CHAIN`; the compilers module; the helper families; `TerminalRouteMethod`; the carry) | BROKEN on the carry (guide prose) | BROKEN on the carry (`openStream`) | — | — | closed by the fix-up |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows and fences; `INTERNAL` matches the barrel; executed assertions | — | BROKEN (`openStream`) | CONFIRMED | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | — | — | CONFIRMED as quoted | GREEN (451 src; policy 111; config 46; setup 17; guides 28) | stands |
| 8 nothing hidden | BROKEN (the first render printed the grouped report fields as placeholders) | finding 1 (same) | BROKEN (same) | — | closed by the re-render: `instruments/landbreaking.mjs` renders grouped fields and gained `--report-only` |

Rulings of record: `createTerminalRoutes`, `TERMINAL_ROUTES_PATH`, and `TERMINAL_KEEPALIVE_MS`
stay beside `TerminalBridge` because the factory returns `readonly TerminalRoute[]` (the ruling's
conditional, read from `src/server/factories.ts:30`); the subjective lane's two-vocabulary
observation is recorded as a successor question, and a round that renames the factory moves the
constants with it. The `run` → `behavior` adoption reached the package's own published surface
(`TaskDraft.behavior`, `taskDraftShape.behavior`) and the unknown-terminal `ToolboxError` context
replaced `known` with `count`; both carry radius rows (`carry/TaskDraft.behavior`,
`carry/ToolboxError-unknown-terminal-count`, no fleet consumer). The guide's causal `since` at
contract row 23 stays for the voice wave. The stale vendored `guides/server.md` mirror spelling
`openStream` refreshes at the re-pin (the W-END `mirror-refresh` row). The writer's `git mv`
staged the class-file rename against the brief's no-staging limit; the tree was correct, the
commit absorbed the index, and the breach is recorded as a process finding.

Fix round (`builder` on Sonnet, `02e25a0`): contract row 5 names an omitted task `behavior`; the
See also row names `createStream`; contract row 15 reads `because`; the `TerminalBridge` Surface
row restates the class TSDoc. Landed with the full chain green (`instruments/land-fixup.mjs`, log
`land-fixup.log`). Checker on the fix-up: PASS on every claim.

Recorded for the next change: the two-vocabulary seam on the terminal routes; contract row 23's
causal `since`; the wire-member `type` question raised in ollama applies to no toolbox member.

Terminal lines: objective `FAIL 2 3 8` and subjective `FAIL 3 5` closed by the fix-up and the
re-render; checker `FAIL 8` closed by the re-render and PASS on the fix round; verifier GREEN.
**Verdict: PASS.** The unit closes **applied** for every row. Tip packed: `toolbox-02e25a0.tgz`;
the README pass moved the tip to `c13a526`, repacked at W-END.
