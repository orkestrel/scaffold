# Unit VISIT-probe — deviation report

## Advisory as taken

Command: `npx --no-install scaffold audit` (run from `/home/user/orkestrel/probe`).

Full output:

```
dependencies: typescript declares major 6, while the registry serves major 7.
┌──────────────────────────────────────────────────────────────────┬───────────────┬─────────┐
│ path                                                             │ group         │ drift   │
├──────────────────────────────────────────────────────────────────┼───────────────┼─────────┤
│ CLAUDE.md                                                        │ docs          │ stale   │
│ .agents/orchestration.md                                         │ orchestration │ stale   │
│ .agents/skills/enterprise-bootstrap/SKILL.md                     │ orchestration │ stale   │
│ .agents/skills/orkestrel-align-packages/SKILL.md                 │ orchestration │ stale   │
│ .agents/skills/orkestrel-debrief/SKILL.md                        │ orchestration │ stale   │
│ .agents/skills/orkestrel-debrief/references/instruction-audit.md │ orchestration │ stale   │
│ .agents/skills/orkestrel-debrief/references/retention.md         │ orchestration │ missing │
│ .agents/skills/orkestrel-prove-journey/SKILL.md                  │ orchestration │ missing │
│ .agents/skills/orkestrel-prove-journey/agents/openai.yaml        │ orchestration │ missing │
│ .agents/skills/orkestrel-prove-journey/references/captures.md    │ orchestration │ missing │
│ .agents/skills/orkestrel-prove-journey/references/layer.md       │ orchestration │ missing │
│ .agents/skills/orkestrel-publish/SKILL.md                        │ orchestration │ missing │
│ .agents/skills/orkestrel-publish/agents/openai.yaml              │ orchestration │ missing │
│ .agents/skills/orkestrel-publish/references/wave.md              │ orchestration │ missing │
│ .agents/skills/orkestrel-publish/references/window.md            │ orchestration │ missing │
│ .agents/templates/brief.md                                       │ orchestration │ missing │
│ .agents/transports/claude.md                                     │ orchestration │ missing │
│ .agents/transports/codex.md                                      │ orchestration │ missing │
│ .claude/agents/analyst.md                                        │ orchestration │ stale   │
│ .claude/agents/application.md                                    │ orchestration │ stale   │
│ .claude/agents/builder.md                                        │ orchestration │ stale   │
│ .claude/agents/checker.md                                        │ orchestration │ stale   │
│ .claude/agents/grok.md                                           │ orchestration │ stale   │
│ .claude/agents/implementer.md                                    │ orchestration │ stale   │
│ .claude/agents/planner.md                                        │ orchestration │ stale   │
│ .claude/agents/researcher.md                                     │ orchestration │ stale   │
│ .claude/agents/reviewer.md                                       │ orchestration │ stale   │
│ .claude/agents/scout.md                                          │ orchestration │ stale   │
│ .claude/agents/sol.md                                            │ orchestration │ stale   │
│ .claude/agents/verifier.md                                       │ orchestration │ stale   │
│ .claude/rules/documentation.md                                   │ orchestration │ stale   │
│ .claude/skills/enterprise-bootstrap/SKILL.md                     │ orchestration │ stale   │
│ .claude/skills/orkestrel-debrief/SKILL.md                        │ orchestration │ stale   │
│ .claude/skills/orkestrel-prove-journey/SKILL.md                  │ orchestration │ missing │
│ .claude/skills/orkestrel-publish/SKILL.md                        │ orchestration │ missing │
│ .codex/agents/analyst.toml                                       │ orchestration │ stale   │
│ .codex/agents/application.toml                                   │ orchestration │ stale   │
│ .codex/agents/builder.toml                                       │ orchestration │ stale   │
│ .codex/agents/checker.toml                                       │ orchestration │ stale   │
│ .codex/agents/grok.toml                                          │ orchestration │ stale   │
│ .codex/agents/implementer.toml                                   │ orchestration │ stale   │
│ .codex/agents/opus.toml                                          │ orchestration │ stale   │
│ .codex/agents/orkestrel.toml                                     │ orchestration │ stale   │
│ .codex/agents/planner.toml                                       │ orchestration │ stale   │
│ .codex/agents/researcher.toml                                    │ orchestration │ stale   │
│ .codex/agents/reviewer.toml                                      │ orchestration │ stale   │
│ .codex/agents/scout.toml                                         │ orchestration │ stale   │
│ .codex/agents/verifier.toml                                      │ orchestration │ stale   │
│ .agents/skills/orkestrel-human-journey/SKILL.md                  │ orchestration │ foreign │
│ .agents/skills/orkestrel-human-journey/agents/openai.yaml        │ orchestration │ foreign │
│ .agents/skills/orkestrel-human-journey/references/captures.md    │ orchestration │ foreign │
│ .agents/skills/orkestrel-human-journey/references/layer.md       │ orchestration │ foreign │
│ .claude/agents/codex.md                                          │ orchestration │ foreign │
│ .claude/skills/orkestrel-human-journey/SKILL.md                  │ orchestration │ foreign │
│ .codex/agents/claude.toml                                        │ orchestration │ foreign │
└──────────────────────────────────────────────────────────────────┴───────────────┴─────────┘
48 of 135 planned paths drifted from the plan. Audit compared bytes at 105, existence at 19, and nothing at 11. The plan does not own 7 further paths beneath its groups.
```

## Deviation report

**Expected.** The brief states: "Run `npx --no-install scaffold audit` FIRST and read its
`setup:` advisory — that is your proof work list, one proof file per reported module." The brief's
entire scope (proof files, `test:guides`, `repair` sequencing, gates) is derived from that
advisory's module list.

**Found.** The audit's output carries no `setup:` advisory line and no reference to `setup`,
`setupBrowser`, `setupServer`, or `setupService` anywhere. It reports only a `dependencies`
advisory (`typescript` major mismatch, named out of scope by the brief) and the orchestration/docs
path-drift table reproduced above.

**Evidence.** `grep -n "setup" /tmp/audit_full.txt` against the full captured output returns no
matches; the output is 61 lines total and is reproduced in full above.

**Done / not done.** Not done. No proof files were written, `test:guides` was not touched,
`repair` was not run, and no gates were run, because the brief's work list (the advisory's module
names) does not exist to enumerate. `tests/setup.test.ts` and `tests/setupServer.test.ts` were not
inspected against a target list because there is no advisory naming which modules remain
uncovered.

**Hypothesis.** The advisory the brief expects may belong to a different `scaffold` audit
invocation, flag, or a state already closed by an earlier unit; this repository's current audit
output no longer emits a `setup:` row.

## Reduced scope — the 0.0.52 repair and gates

The Orchestrator accepted the deviation reading above and reduced the unit to the visit's
mechanical remainder: full `repair`, format, gates, and closing audit. No proof files, no script
changes, no mutation control — nothing new to control.

**1. First `npx --no-install scaffold repair` (full).** Rewrote the stale and missing
orchestration-group paths the drift table named (`CLAUDE.md`, `.agents/orchestration.md`, the
`.agents/skills/*` files, `.claude/agents/*` files, `.claude/rules/documentation.md`,
`.claude/skills/*` files, and `.codex/agents/*` files) and left the seven foreign
`orkestrel-human-journey`, `.claude/agents/codex.md`, and `.codex/agents/claude.toml` paths alone.
Closing line: `48 written, 88 unchanged, 0 removed in ..`

**2. Second `npx --no-install scaffold repair`.** Reported nothing written. Closing line:
`0 written, 136 unchanged, 0 removed in ..`

**3. `npm run format`.** Closing line: `Finished in 3367ms on 164 files using 4 threads.`

**4. Gates, each read bare.**

- `npm run format:check` — `All matched files use the correct format.` /
  `Finished in 3070ms on 164 files using 4 threads.` Exit 0.
- `npm run lint:check` — no diagnostics printed. Exit 0.
- `npm run check` — `tsc --noEmit` across the root project plus `check:src:core`,
  `check:src:server`, and `check:src:bin`, no diagnostics printed. Exit 0.
- `npm run build` — `✓ built in 3.73s` for `src/server`, `Copied: dist/src/server/index.d.ts to
  dist/src/server/index.d.cts`, `✓ built in 28ms` for `src/bin`. Exit 0.
- `npm test` — `Test Files  1 failed | 10 passed (11)`, `Tests  1 failed | 203 passed (204)`,
  `Duration  134.44s`. Exit 1. The single failure is
  `tests/src/server/Probe.test.ts > probe > expires caller-named project resolution and serves
  through the recycled type stage`, raising `Error: The project deadline fixture did not arm`
  against a 10-second timing race (`waitForDelay(10_000)` racing an `'arm'` emitter event). This
  file sits under the off-limits "every other test file" scope, and the failure is a timing race
  under load rather than a defect this unit's changes caused. `.agents/orchestration.md` §
  Writing concurrency reserves the deciding re-run for the Orchestrator after the unit exits.
  Reported as an observation, not cleared as a criterion; not re-run inside this unit.

**5. Closing `npx --no-install scaffold audit`.** Reports only the fleet-wide
`dependencies: typescript declares major 6, while the registry serves major 7.` advisory line and
a drift table naming exactly the seven foreign paths
(`.agents/skills/orkestrel-human-journey/SKILL.md`,
`.agents/skills/orkestrel-human-journey/agents/openai.yaml`,
`.agents/skills/orkestrel-human-journey/references/captures.md`,
`.agents/skills/orkestrel-human-journey/references/layer.md`, `.claude/agents/codex.md`,
`.claude/skills/orkestrel-human-journey/SKILL.md`, `.codex/agents/claude.toml`). No `setup:`
advisory. `0 of 135 planned paths drifted from the plan.`
