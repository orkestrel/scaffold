# Audit brief — U10 database-readers (round 1)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: helper naming under the `{verb}{Noun}` law, whether the parser walk reads as one mechanism, whether the test cases are named for what they prove), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: whether every pinned string and fixture survives, whether the parser walk misses a re-export form the compiler walk reached, whether reading diagnostics instead of the exit code keeps the fail-closed phases, false greens), and `checker` (Sonnet: the acceptance criteria as stated, scope honesty against the status file, no `typescript` specifier left in the owned files). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit U10 moved `database`'s guide-fence typecheck and entry-surface reader off the TypeScript compiler API: fences are typechecked by the workspace's `tsc` run as a process over a scratch project with diagnostics read through `@orkestrel/probe`'s `scanDiagnostics`, and the entry surfaces are read by the parser `vite` re-exports over the barrel graph after the same `tsc` proved the graph clean. Its brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u10-database-readers-brief.md`; its report: `u10-database-readers-report.md`; the absorption: `u10u11-absorb-distillate.md` § A and § C. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/portability.md`, `.claude/rules/quality.md` § Instruments, `.claude/rules/writing.md`.

## Review evidence

The actual diff and status of the database checkout: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u10-database-readers.diff.txt` and `u10-database-readers.status.txt`. Read the diff in full; read the changed files under `/home/user/fleet/database` at their new state where the diff is not enough, and the installed probe declaration at `/home/user/fleet/database/node_modules/@orkestrel/probe/dist/src/server/index.d.ts` for `scanDiagnostics` and `Diagnostic`.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. No `typescript` specifier remains in `tests/setupServer.ts`, `tests/setupServer.test.ts`, or `tests/guides.test.ts`, and no new dependency was declared.
2. `checkGuideFences` keeps its signature and messages: the scratch `tsconfig.json` extends the caller's config with `noEmit`, the `paths` overlay onto `src/{core,browser,server}/index.ts`, `files` naming the fences, `include: []`; one `tsc --noEmit --pretty false -p` process runs through the workspace's own compiler binary resolved by path, never a shell shim; diagnostics come from `scanDiagnostics`, never the exit code; the `Fence N (guide line L)[file:line:col]` arithmetic is unchanged and pinned by the existing planted fault; the scratch is destroyed in `finally`.
3. `deriveEntrySurfaces` keeps its signature and return shape; step one fails closed under the same phase strings for a colliding `export *`, a missing re-export, and a type fault, filtering to files under `src/` with file-less diagnostics kept; step two's parser walk classifies `type`, `interface`, `class`, `function`, and `const`, refuses `let`, `enum`, `namespace`, default, and type-only exports with today's messages, follows `export *` and `export { a } from` recursively with `.js` to `.ts` and directory-to-index resolution, and yields one symbol per keyword for a merged name.
4. Every fixture and control the brief lists is present in `tests/setupServer.test.ts` and asserts the same strings as before the change; the diff removed no case.
5. The helpers are exported from `tests/setupServer.ts` with `{verb}{Noun}` names, no nested function declarations, and no `any`, assertion, or non-null assertion.
6. The `guides` project's load-time reading is stated in the report with its condition, and the scratch projects live under the package's `tmp/`.
7. Nothing outside the owned files changed; the report's claims match the diff; every criterion's evidence is present.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
