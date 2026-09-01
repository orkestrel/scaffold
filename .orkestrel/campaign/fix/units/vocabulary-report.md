# Unit vocabulary — report (2026-09-01)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report,
verbatim in substance:

- Owned file changed: `.claude/rules/names.md` (16 insertions, 1 deletion). § Standalone helpers'
  prefix sentence became a list carrying `extract*`, `infer*`, `compute*`, `matches*` (wording
  preserved) and the new `build*`, `read*`, `resolve*`, `scan*`, `describe*`, `normalize*`,
  `collect*`, `render*`, `supports*`. § General vocabulary gained the external-mirror directive
  (with `foreignKeys` and `keepAlive` as the deciding examples) and the never-licensed-word
  directive naming `kind`, `type`, and § Rejected naming, with the CFB object-type byte example.
- Ancillary decisions recorded by the writer: the `supports*` line omits the `is*` rationale
  because § Fixed derivation/construction forms is that rule's home; the existing prefixes keep
  their committed wording.
- Unknowns sweep: `rg -l 'names\.md' tests src` hit fixture path strings, TSDoc examples, and
  `tests/distribution.test.ts:226` (vendored path list, not bytes). No test pins the file's
  content or digest.
- Gates: `format:check` 0, `lint:check` 0, `test:policy` 0 (111 passed), `test:distribution` 0
  (5 passed). `test:src:core`, `test:src:server`, `test:src:bin` exit 1 at HEAD, falsified as
  baseline by restoring the committed file and re-running: unchanged red.
- Observations (not this unit's): `tests/src/core/fixtures/app-only-toolchain.txt:2` still
  pins `@orkestrel/contract` at `^0.0.13` while `package.json` declares `^0.0.15`, failing
  `compilers.test.ts` (carried to `scaffold-adopt`, L3). `dist/host/claude/agents/orkestrel.md`
  predates the catalog regeneration, so `readHostFloor` tests fail until `npm run build` runs;
  the ordinary chain builds before testing, and `dist/host/claude/rules/names.md` is stale
  against this edit for the same reason.
- Tree: `git status --short` → ` M .claude/rules/names.md` only. Nothing committed, installed, or
  discarded by the unit.

Orchestrator: accepted for audit (objective `reviewer` lane on Opus, `checker` on Sonnet); the
added text is quoted into `.orkestrel/campaign/fix/vocabulary.md` for every later brief.
