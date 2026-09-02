# Audit breaking-mcp — `reviewer` on Claude Opus 5 holding the OBJECTIVE lane (correctness, constraints, what the diff actually does)

## Role and engine

`reviewer` on Claude Opus 5 holding the OBJECTIVE lane (correctness, constraints, what the diff actually does). The writer was Claude Opus 5; the Sol bench is dark, so this lane runs on the writer's own
engine in a clean context. Attack the half your engine wrote hardest. The subject is the diff, the
status, and the report, never your own reading of the intent. Read-only.

## Subject

- Diff: `/home/user/scaffold/tmp/units/breaking/mcp.diff` (actual `git diff` at return).
- Status: `/home/user/scaffold/tmp/units/breaking/mcp.status` (actual `git status --short` at return).
- Report: `/home/user/scaffold/tmp/units/breaking/mcp-report.md`.
- Brief the writer executed: `/home/user/scaffold/tmp/units/breaking/mcp-brief.md` (its Rulings and Vocabulary sections are
  the ruled forms).
- Tree: `/home/user/fleet/mcp` (read it to confirm a claim the diff cannot settle).
- Law: `/home/user/fleet/mcp/AGENTS.md`, `/home/user/fleet/mcp/.claude/rules/names.md` (the vendored copy predates the
  vocabulary; the brief quotes the landed text), `architecture.md`, `patterns.md`,
  `documentation.md`, `tests.md`.

## Claims

Rule on claims 1, 2, 3, 4, 6, 8 with CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, each
with its evidence line (file:line or the command and its output as quoted in the report).

1. Every row the brief lists ends in the report as applied, refused, or stopped, and every refused row quotes the rule text that refuses it.
2. For every applied rename or removal, no old name survives under `src`, `tests`, and `guides` of /home/user/fleet/mcp (grep with word boundaries, then again case-insensitively for the inflected forms `-s`, `-ed`, `-ing` so a test title or sentence that used the old name as an English verb or plural is caught; the diff and the tree are the evidence), and every new published symbol is declared in the owning `types.ts` where it is a contract.
3. Each applied row lands in the ruled form, not a variant: s01-03 and s01-11; s01-01 and s01-02; s01-04; s01-09; s01-07, s01-10, s01-18, s01-19; Carry; Audit carrier; Carrier from the W-DEV sweep (the rulings are quoted in the brief's Rulings section).
4. No compatibility alias, re-export shim, deprecated twin, or old-name fallback was added anywhere in the diff.
5. Every guide row, fence, and `@example` that spelled a moved symbol moved with it, the parity `INTERNAL` list matches the barrel where the package keeps one, and a prose claim about changed behavior has an executed assertion rather than a substring check.
6. The tree holds only owned files changed: the status output lists nothing under `.claude/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a vendored guide mirror.
7. The gate commands the report claims exit as reported (the `verifier` lane re-runs the chain and quotes the exit codes; a reviewer or checker lane rules this NOT-EVIDENCED unless the report quotes the exact command and exit code).
8. The report's observations and deviations hide no criterion failure: a timing-suspect test is named with the failing test, and a stopped row states expected, found, and evidence.

## Output

Per-claim verdicts with evidence, then one terminal line: `PASS` when every claim you hold is
CONFIRMED, `FAIL` otherwise with the failing claim numbers. No process diary.
