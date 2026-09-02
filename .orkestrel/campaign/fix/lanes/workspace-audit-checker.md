<!-- task a691195f347277ad7.output -->
## Per-claim verdicts

**Claim 1 — CONFIRMED.**
Every row in the report resolves to applied, applied, applied, or refused-with-quoted-rule: s17-31 "applied" (`workspace-report.md:7`), s17-32 "applied" (`workspace-report.md:8`), empty-batch "applied" (`workspace-report.md:9`), cross-package-template "refused" quoting the brief's off-limits text verbatim — `"Off-limits. package.json, package-lock.json, AGENTS.md, .claude/**, .agents/**, .codex/**, .cursor/**, configs/**, tests/setupPolicy.ts, tests/policy.test.ts, vendored dependency guide mirrors (guides/<other-package>.md), .orkestrel/**, tmp/**, and every file outside the repository."` (`workspace-report.md:10`).

**Claim 2 — CONFIRMED.**
`workspace.diff` shows `data` → `base64` at every consumer read (`src/core/types.ts:194`, `helpers.ts:143-146,154-155`, `validators.ts:213`, `factories.ts:104-116`) and `decodedSize` → `computeDecodedSize` at every call site and TSDoc (`helpers.ts:154,163-177`, `guides/workspace.md:25,41,58,67,76`). The report quotes the word-boundary and inflection sweep commands and their outputs (`workspace-report.md:66`: `grep -rn '\bdecodedSize\b' src tests guides` exits 1; `grep -rn '\bdata\b' ...` returns only unrelated prose, classified). `FileContent`'s new `base64` member is declared in `src/core/types.ts` (`workspace.diff:194-195`), the owning `types.ts` for that contract.

**Claim 5 — CONFIRMED.**
Every guide row/fence naming the moved symbols moved with them: the Helpers table row, the FileContent type row, the tagless-union prose, and the `@example`-adjacent comment `via computeDecodedSize` (`workspace.diff:9-10,25,41,58,66-76`). This package keeps no `INTERNAL` parity list per the report's centralization sweep — "the star barrel needed no edit because both renamed symbols reach it through `export * from ...`" (`workspace-report.md:67`) — so there is no list to check against a barrel. The empty-batch prose claim is backed by an executed assertion (new `Workspace.test.ts` and `WorkspaceManager.test.ts` pins, `workspace.diff:320-339,352-359`) plus a mutation probe proving the pins can fail (`workspace-report.md:65`), not a bare substring check.

**Claim 6 — CONFIRMED.**
`workspace.status` lists exactly twelve modified files, all under `src/core`, `guides/workspace.md`, or `tests/**`; none under `.claude/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a vendored guide mirror (`/home/user/scaffold/tmp/units/breaking/workspace.status:1-12`).

**Claim 7 — UNRESOLVED.**
The report quotes each gate command and its exit code: `npm run format:check` → exit 0, `npm run lint:check` → exit 0, `npm run check` → exit 0, `npm run build` → exit 0, `npm test` → exit 0, each with an output excerpt (`workspace-report.md:47-51`). This satisfies the quoting requirement, so the claim is not NOT-EVIDENCED, but this lane has no shell and did not re-run the chain, so it cannot independently confirm the exit codes match reality. That confirmation belongs to `verifier`, per the brief's own routing.

## Terminal line

FAIL 7
