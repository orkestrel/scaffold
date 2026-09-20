<!-- checker on native Sonnet, workflow wf_8a54447e-081, agent a90d884c22e264eb7; law read of the pending document; retained 2026-09-20 -->

## Checklist verdict

**Verdict:** PASS — `tmp/units/u7a-brief.md` contains no rule-forbidden instruction, no surface addition beyond core/browser/server/styles, no new package, no scaffold-rule amendment, no vendored/content-owned file touch, no inadmissible fixed name, and no contradiction of a standing ruling.

### Table 1 — Lines forbidding/violating content

| Line | Text | Rule (file:line) | Departure |
| --- | --- | --- | --- |
| — | — | — | None found. Every scoped path (`src/styles/**`, `src/core/constants.ts`/`types.ts` token names only, mirrored `tests/**`, `guides/veneer.md`) resolves inside the `core`/`styles` surfaces the environment table admits (`.claude/rules/workspace.md:19-25`), the off-limits list (brief:102-104) excludes `src/browser/**`, `app/**`, `package.json`, vendored, and content-owned paths, no RTL or direction-specific work is instructed (brief:29-30, 126, 136 explicitly forbid it), no subpath export/side-effect entry/build wrapper/manifest row is touched (`package.json` is off-limits, brief:104), and every new custom property/mixin name (`--vn-state-mixer`, `--vn-state-hover`, `--vn-state-active`, `--vn-focus-width`, `--vn-focus-color`, `focus-ring`) follows the admitted `--{scope}-{property}[-modifier]` and kebab-case mixin forms (`.claude/rules/styles.md:56-61`). |

### Table 2 — File paths created/edited, with placing rule

| Path | Rule row (file:line) |
| --- | --- |
| `src/styles/elements/_button.scss` (new) | `.claude/rules/workspace.md:24` (`src/styles/`: optional SCSS bundle) |
| `src/styles/components/_button.scss` (new) | `.claude/rules/workspace.md:24`; layer confirmed at brief:40-41 (`@layer … elements, components, …`) |
| `src/styles/index.scss` | `.claude/rules/styles.md:20,25` (sole compilation barrel) |
| `src/styles/_tokens.scss` | `.claude/rules/styles.md:18,26` (token source of truth; adding a token is allowed) |
| `src/styles/_theme.scss` | `.claude/rules/styles.md:19,27` (token overrides under theme selectors) |
| `src/styles/_mixins.scss` | `.claude/rules/styles.md:17,22-23` (`@mixin` declaration emitters) |
| `src/core/constants.ts` | `AGENTS.md` § Design laws, "Centralize by kind" (constants live in their designated centralized file) |
| `src/core/types.ts` | `AGENTS.md` § Non-negotiable rules, "ALWAYS define reusable and public types in `*/types.ts`" |
| `tests/src/styles/elements/button.test.ts` (new) | `.claude/rules/tests.md:13-14` (mirror rule) |
| `tests/src/styles/components/button.test.ts` (new) | `.claude/rules/tests.md:13-14` |
| `tests/src/styles/mixins.test.ts` | `.claude/rules/tests.md:13-14` |
| `tests/src/core/index.test.ts` | `.claude/rules/tests.md:13-14` |
| `guides/veneer.md` | `.claude/rules/documentation.md` § Authority and workflow, "maintain … the concept index" / user standing ruling "one guide per package" |
| Report (`tmp/units/u7a-report.md`) | `.agents/orchestration.md` § Dispatch anatomy, "a native unit's pair is `tmp/units/<unit>-brief.md` and `tmp/units/<unit>-report.md`" |

**Surface line:** The document adds no surface. Every owned path sits inside the existing `core` and `styles` surfaces (`.claude/rules/workspace.md:19-25`); no `browser`, `server`, `bin`, or Vue/app path is created or edited, and `guides/scaffold.md:924-927` confirms Vue is a pipeline the `app/browser` axis applies, not an independent environment.
