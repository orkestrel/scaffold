# Unit S1 report — scaffold: source-level portability law

Implementer (Opus 5) returned 2026-08-26. Acceptance met.

- New `.claude/rules/portability.md` (paths frontmatter src/app/configs/workflows; sections: host
  branching, line endings, paths, processes and executables, terminals, scripts and packaging,
  claims). One aligned Rule map row in `AGENTS.md` after `styles.md`.
- Acceptance: `format:check` green (213 files); `test:policy` green (93); rule-map resolution
  script clean; no restatement of `tests.md` lines 36/39.
- Standing consequence (Orchestrator-owned): `host.json` digests stale → scaffold `test:config`
  red (1 failed | 45 passed) until inventory regeneration runs after all scaffold vendored edits.
  Regeneration is a serial integration step, deliberately not this unit's.
- Ancillary decisions recorded: row placement, 70-column Governs phrase, section order,
  objective-lane phrasing preferred on conflicts.
