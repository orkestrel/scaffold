# Unit S2 report — scaffold: portability rules in the policy sweep

Implementer (Opus 5) returned 2026-08-26. Acceptance met (the `test:setup` criterion was
inapplicable — no `setup*.test.ts` exists here, per workspace law; sweep exports are exercised by
the policy project).

- New `portability` member of `PolicyRule`; inspectors for rule-map parity, unusable filenames,
  `.sh`-in-npm-scripts, trim-before-split, and the `os.EOL` guard. Trim-split and `os.EOL` match
  on the TypeScript AST, not text.
- Controls: failing-first baseline 13 failed | 96 passed before inspectors; 110 passed (110)
  after; each inspector disabled alone reddens exactly its own controls (table quoted in the
  return); boundary controls proven able to fail (over-broad matchers and a shrunken population
  each redden a named control).
- Measured host limits recorded: Windows refuses `<` (`ENOENT`), turns `:` into an alternate data
  stream, folds case collisions — those two boundaries prove from the path population instead of
  written files, TSDoc-documented.
- Deviations recorded, accepted: rule-map parity rides the `portability` tag; population-level
  controls for host-refused filenames.
- Report-only patch for `.claude/rules/architecture.md` § What the policy sweep proves — applied
  serially by the Orchestrator 2026-08-26.
- Standing consequence: `host.json` stale set grew to the four vendored edits; the regeneration
  step closes all of them (running).
