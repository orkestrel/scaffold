# CANON — independent gate evidence

`verifier`, Sonnet, read-only, every working-tree-discarding git command prohibited by name.

| Gate                   | Exit | Note |
| ---------------------- | ---- | ---- |
| `npm run format:check` | 0    | |
| `npm run lint:check`   | 0    | |
| `npm run check`        | 0    | |
| `npm run build`        | 0    | |
| `npm test`             | 0    | |
| `npx scaffold audit`   | 127  | **A dispatch defect, not a package defect.** |

The audit command as dispatched cannot resolve here: this repository *is* the `scaffold` package, so
no `node_modules/.bin/scaffold` link exists. The verifier ran the equivalent local entry directly:
`node dist/bin/main.js audit` exits 0 and reports `0 of 126 planned paths drifted from the plan.
Audit compared bytes at 112, existence at 3, and nothing at 11.` Every future dispatch against this
repository names the direct entry.

Test counts as the runner printed them:

| Project | Files | Tests |
| ------- | ----- | ----- |
| `src:core` | 8 | 315 |
| `src:server` | 6 | 357 |
| `src:bin` | 3 | 168 |
| `policy` | 1 | 86 |
| `config` | 1 | 29 |
| `guides` | 1 | 7 |

`npm test` does not chain `test:distribution` here; that script runs from `prepublishOnly`.

## The repaired phrases are gone

`grep -n "six rules\|eleven checks\|four laws\|rule 4 owns\|fifth kind" .agents/orchestration.md .claude/rules/workspace.md`
returns no hit in either file. `grep -rn "one thing that file leaves" .claude/agents/` returns no hit.

## Diff

Seven files, 39 insertions, 18 deletions: `.agents/orchestration.md`,
`.agents/skills/orkestrel-falsify/SKILL.md`, `.claude/agents/analyst.md`, `.claude/agents/sol.md`,
`.claude/rules/workspace.md`, `.claude/rules/writing.md`, `src/bin/helpers.ts`.
