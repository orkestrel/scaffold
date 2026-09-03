# Audit verdict: unit relation-prose

Subject: the follow-on unit in `/home/user/fleet/relation` on the landed tip `5914505` (brief `briefs/followon/relation-prose-brief.md`, report `units/followon/relation-prose-report.md`, result `units/followon/relation-prose-result.md`), a `builder` on Claude Sonnet: `guarantee` leaves `guides/relation.md` and `tests/src/core/Model.test.ts`, each site reading the bare noun phrase (listener isolation, emit safety).

## Lanes

No lane ran. The unit changes three prose sites in two files, and the Orchestrator read the diff against the brief's row and `.claude/rules/writing.md` § Claims and time, then confirmed the claim word absent from both files. Dispatching a checker for three prose lines spends a lane on what one read settles; `.agents/orchestration.md` § Orchestrator and executor names a one-line fix as direct work. The deviation from the audit step — no checker, no objective lane — is recorded here with that reason.

## Rulings

- The behaviours the sentences describe are pinned by `tests/src/core/Model.test.ts`'s listener-isolation and emit-safety cases; the rewrite changes the claim's wording, not its fact.
- No presence guard quoted either phrase; `tests/guides.test.ts` is untouched.

## Structural claims

The gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/relation`, recorded in `units/land-followon.log`, and the landing commit named in the state table.

## Terminal

PASS (Orchestrator's read of the diff), pending the deciding run at landing.
