# Unit canon-fixup-2 — report

## Rows

1. `applied` — `.agents/skills/orkestrel-falsify/SKILL.md` § Run the round now reads: "`.agents/orchestration.md` § Execution loop owns which lanes a round runs and the deviation a short round records; § Engine assignment owns the substitution."
2. `applied` — `.agents/skills/orkestrel-falsify/references/brief.md` § The read-only audit lane's brief now reads: "...plus its own **Role and lane** row (the role, its engine, and which lane it holds) and **Output** row (the verdict shape and its single terminal line)." The paragraph is rewrapped with no line exceeding 100 characters; no word changed.
3. `applied` — `.claude/agents/checker.md` now reads: "...addressed to the subjective lane when it is running and to the Orchestrator when it is not — never a guess and never a verdict of yours."
4. `applied` — `.codex/agents/opus.toml` now reads: "Verify that every authority the brief references exists in the tree the run is rooted in; propagate a missing file rather than restating it, and take the stale-authority branch in..." Reflowed at the file's width; no orphan pushed past it.
5. `applied` — `.claude/agents/application.md` frontmatter now reads: "Writes only owned files in the checkout the unit writes as the sole serial writer and stops on any plan deviation."
6. `applied` — `.agents/orchestration.md` § The engines now reads: "Design runs the adversarial pass. § Execution loop's audit step fixes which lanes an audit runs."
7. `applied` — `.agents/orchestration.md` § Execution loop, the audit step now reads: "...the way the design step names its lanes..." The step's first paragraph (ending "never a template sentence.") is rewrapped with no line exceeding 100 characters; no word changed.
8. `applied` — `.agents/skills/enterprise-bootstrap/references/components.md`, four lines: "Width/height through `--bs-offcanvas-width`", "focusable through `tabindex=\"0\"`", "shown through a trigger", "never report form errors through a tooltip". No other `via` token remains in the file (backticked or otherwise).
9. `applied` — `.codex/agents/grok.toml`: rewrapped the paragraph carrying the `.err`-journal sentence (previously one 138-character line) at the file's width (no line exceeds 100 characters); no word changed.
10. `applied` — `.codex/agents/planner.toml`: reflowed the paragraph carrying "units that each name their role and" / "engine; tensions named for the other lane to challenge" at the file's width, removing the orphan line; no word changed.

## Sweeps

- `grep -rnE '\bstep [0-9]\b' .agents .claude .codex CLAUDE.md` — no matches (empty output). Passes.
- `grep -noE '[^\`]via[^\`]|^via[^\`]|[^\`]via$' .agents/skills/enterprise-bootstrap/references/components.md` — no matches (empty output). No unbackticked `via` token remains. Passes.

## Gates (acceptance order)

| Command | Exit code |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 (regenerated `host.json`, staged 116 files into `dist/host`) |
| `npm test` | 0 (244 + 111 + 46 + 17 tests passed) |

## Tree state

`git status --short` lists exactly the Owned files plus `host.json`:

```
 M .agents/orchestration.md
 M .agents/skills/enterprise-bootstrap/references/components.md
 M .agents/skills/orkestrel-falsify/SKILL.md
 M .agents/skills/orkestrel-falsify/references/brief.md
 M .claude/agents/application.md
 M .claude/agents/checker.md
 M .codex/agents/grok.toml
 M .codex/agents/opus.toml
 M .codex/agents/planner.toml
 M host.json
```

No commit, stage, push, install, or discarding git command was run. `tmp/tarballs/` and `AGENTS.md`/`CLAUDE.md` were untouched.
