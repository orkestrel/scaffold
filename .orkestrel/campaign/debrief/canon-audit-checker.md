# Canon audit — checker lane (verbatim, 2026-09-02)

Held lane: `checker`, mechanical claims 5, 6, 7, and the file-level portion of claim 8 (grep evidence only). No engine substitution; native Sonnet checker.

Claim 5 — BROKEN on the lane's reading: the writer's sweeps were narrower than the claim's pattern; the full pattern over the whole content of every touched file surfaces `.agents/orchestration.md:306` and `:366` (`just`, temporal), `.claude/rules/quality.md:70` (`just`, ambiguous; referred), and `.claude/rules/names.md:118` (`via` inside backticks, exempt as a code token). Smallest fix: re-run the full pattern over whole files and have the objective lane rule the `quality.md` hit.

Claim 6 — CONFIRMED: every path in `tmp/units/canon.status` is Owned or `host.json`; `CLAUDE.md`'s presence matches the audit brief's recorded Orchestrator edit and the hunk matches the patch verbatim.

Claim 7 — CONFIRMED: the three edited skills carry only `name` and `description` in frontmatter, every `references/*.md` is named from its `SKILL.md`, and every `.claude/skills/<name>/SKILL.md` bridge matches its twin's `name` and `description` with no bridge-owned references.

Claim 8 — UNRESOLVED beyond file-level tracing: every `diff --git` header names an Owned file or `host.json`; the `CLAUDE.md` and skill-shape hunks trace to rows 9 and 16; a hunk-by-hunk map across the other files was not completed.

Findings outside the claims: none substantiated. Referral: the sense of `just` at `.claude/rules/quality.md:70`.

Attacked and held: claims 6 and 7 at file-set and frontmatter granularity; the apparent `CLAUDE.md` contradiction resolved by the brief's recorded Orchestrator edit.

VERDICT: FAIL 5, 8; outside the claims: none
