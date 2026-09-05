# Checker audit — canon unit, claims 5, 6, 7

I hold the `checker` role on Sonnet (native lane, no engine substitution applicable to this role).

## Claim 5 — Writing sweep over added lines

Grepped `/home/user/scaffold/tmp/units/canon.diff` for `^\+.*\b(should|robust|performant|utilize|leverage|via|simply|just|easy|e\.g\.|i\.e\.|etc\.|currently|now|new|latest|since|once)\b` (case-insensitive). Three hits, all permitted senses:

- `tmp/units/canon.diff:230` (`window.md`): "Mint once per human moment" — frequency/quantifier sense ("one time per occasion"), not the banned temporal `once` ("after X, do Y"). Permitted.
- `tmp/units/canon.diff:486` (`ROADMAP.md`): "derives the layers from runtime and peer edges since 2026-09-05" — temporal `since` marking a start date, not the banned causal `since` ("because"). Permitted.
- `tmp/units/canon.diff:496` (`ROADMAP.md`): "an absent baseline read once as a bump owed until the tarball was fetched" — "at one point in time," not the banned temporal `once`. Permitted.

No `should`, `robust`, `performant`, `utilize`, `leverage`, `via`, `simply`, `just`, `easy`, `e.g.`, `i.e.`, or `etc.` hits in added lines. Separately swept added lines for numerals (`^\+.*\b(one|two|...|ten)\b`, `.diff:12,76,82-84,116,178-179,231-232,246,251-252,266,268-269,455,540`): every hit is a quantifier ("one code," "one run," "one package") or a value (a duration, a date), never a count of a growable set.

**Verdict: CONFIRMED.**

## Claim 6 — `git status --short` scope

Read `/home/user/scaffold/tmp/units/canon.status` in full (36 `M` rows, 7 `??` rows) and mapped every row against the brief's named categories:

- Canon unit's nine files (`.agents/orchestration.md`, `.agents/skills/orkestrel-publish/SKILL.md`, `references/wave.md`, `references/window.md`, `.claude/agents/reviewer.md`, `.claude/agents/orkestrel.md`, `.codex/agents/orkestrel.toml`, `.codex/agents/reviewer.toml`, `ROADMAP.md`) — all present, all accounted for.
- `catalog-peers` unit's named files (`src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, `src/server/Upstream.ts`, `src/server/Materializer.ts`, `tests/setup.ts`, `tests/setupServer.ts`, `tests/src/**` — 6 test files, `guides/scaffold.md`) — all present and match exactly.
- Refreshed guide mirrors under `guides/`: `console.md`, `contract.md`, `emitter.md`, `guide.md`, `html.md`, `markdown.md`, `probe.md`, `process.md`, `template.md`, `test.md` — 10 files, matching the brief's "ten guide mirrors" beside `guides/scaffold.md`.
- `host.json` — present, named explicitly.
- `.orkestrel/campaign/wave-debrief/**` — covers the remaining `M` rows (`debrief.md`, `catalog-peers-audit-brief.md`) and all 7 `??` rows (`catalog-peers-checker.md`, `catalog-peers-report.md`, `catalog-peers.diff.txt`, `catalog-peers.status.txt`, `instraudit-objective.md`, `instraudit-subjective.md`, `instruments/`).

Every one of the 43 status lines resolves to a named category with no residue and no omission.

**Verdict: CONFIRMED.**

## Claim 7 — Skill shape

- `/home/user/scaffold/.agents/skills/orkestrel-publish/SKILL.md:1-4` frontmatter carries only `name` and `description`.
- `/home/user/scaffold/.claude/skills/orkestrel-publish/SKILL.md:1-4` frontmatter carries the identical `name: orkestrel-publish` and the identical `description:` string, verbatim match against the canonical twin.
- The canonical `SKILL.md` names two references: `[wave.md](references/wave.md)` and `[window.md](references/window.md)` (lines 16-18). `Glob` over `.agents/skills/orkestrel-publish/references/*.md` returns exactly `wave.md` and `window.md` — no orphan reference file, no named-but-missing file.
- `.claude/skills/orkestrel-publish/` contains only `SKILL.md` (bridge, no independent references), consistent with `.claude/rules/documentation.md` § Workflow skills.

**Verdict: CONFIRMED.**

## Findings outside claims 5-7

- **F1** — `.agents/skills/orkestrel-publish/references/wave.md:151` (added): "A third trigger orders rather than bumps." This names a list item by its ordinal position rather than by name, which `AGENTS.md` § Writing bars ("NEVER name a list item by its position"). This falls under claim 2 (instruction-file directive form), which is outside my assigned claims 5-7; routing it to the lane auditing claim 2.

## Referrals

None — claims 5, 6, and 7 settled entirely on mechanical grep and file evidence.

VERDICT: PASS
