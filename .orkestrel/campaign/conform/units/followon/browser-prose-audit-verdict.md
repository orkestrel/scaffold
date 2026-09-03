# Audit verdict: unit browser-prose

Subject: the follow-on unit in `/home/user/fleet/browser` on the landed tip `81a580c` (brief `briefs/followon/browser-prose-brief.md`, report `units/followon/browser-prose-report.md`, result `units/followon/browser-prose-result.md`), a `builder` on Claude Sonnet: `via`, the filler `just`, and `should` leave the non-vendored test prose across `tests/setup.ts`, `tests/setupServer.ts`, and the module suites.

## Lanes

No lane ran. The unit changes comment, TSDoc, and title lines in six files (17 insertions, 17 deletions), and the Orchestrator read the diff against the brief's row and `.claude/rules/writing.md` § Substitutions: every hunk is a substitution or the rewrap of the line it sits on, and no statement changed. Dispatching a checker for substitutions spends a lane on what one read settles. The deviation from the audit step — no checker, no objective lane — is recorded here with that reason.

## Rulings

- `just enough raw CDP` at `tests/setupServer.ts:212` is the idiomatic "exactly enough" sense, permitted.
- `Guaranteed teardown safety net` at `tests/setupServer.ts:455` predates the round and carries a claim word `.claude/rules/writing.md` § Claims and time bans; it sits outside this unit's sweep and is a next-matrix prose row for browser (`ledgers/followons.md`).

## Structural claims

The gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/browser`, recorded in `units/land-followon.log`, and the landing commit named in the state table; `test:service` runs under the wave's `prepublishOnly`.

## Terminal

PASS (Orchestrator's read of the substitution-only diff), pending the deciding run at landing.
