# Audit verdict: unit guide-prose

Subject: the follow-on unit in `/home/user/fleet/guide` on the landed tip `be14c1b` (brief `briefs/followon/guide-prose-brief.md`, report `units/followon/guide-prose-report.md`, result `units/followon/guide-prose-result.md`), a `builder` on Claude Sonnet: the `extractSourceLines` fence in `guides/guide.md` ends its output comment at the first record and names the elision in a following comment line, and the presence guard in `tests/guides.test.ts` transcribes both lines.

## Lanes

No lane ran. The unit changes one fence comment and one presence guard, and the Orchestrator read the diff (`git -C /home/user/fleet/guide diff`: two hunks) against the brief's row and `.claude/rules/writing.md` § Examples, numbers, and abbreviations. Dispatching a checker for two lines spends a lane on what one read settles; `.agents/orchestration.md` § Orchestrator and executor names a one-line fix as direct work. The deviation from the audit step — no checker, no objective lane — is recorded here with that reason.

## Rulings

- The fence's remaining `...` hits at `guides/guide.md:326` and `:411` are prose describing a syntax placeholder, not an output elision; permitted.
- The guide parity project ran green with the guard changed in the same edit.

## Structural claims

The gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/guide`, recorded in `units/land-followon.log`, and the landing commit named in the state table.

## Terminal

PASS (Orchestrator's read of the two-hunk diff), the deciding run at landing read every gate exit 0 (landed as guide `a8caefd`).
