# Unit S2-5 — the vendored-import proof reads imports with the parser

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/scaffold` checkout. You open this brief
yourself.

## Objective

Make the vendored-import proof in `tests/src/server/helpers.test.ts` read import specifiers from the
parsed module rather than from a text pattern, so a specifier written inside a string literal is no
longer reported as an import, while every control the proof carries still discriminates.

## Context

**Evidence.** Unit S2-4's report (`tmp/units/s2-report-4.md` § Finding outside the items) found
that `tests/src/server/helpers.test.ts > vendored imports > imports only Orkestrel packages every
workspace declares from each vendored module` fails since checkpoint `beb88af9`: its reader is the
text pattern at `tests/src/server/helpers.test.ts:433`,
`/\b(?:from|import|require)\s*\(?\s*(['"`])(@orkestrel\/[^'"`]+)\1/gu`, run over each vendored
module's whole text, and `tests/setupPolicy.ts` now carries the string
`import { isString } from "@orkestrel/contract"` inside a control fixture (a TypeScript string
literal, never an import). The proof reports `tests/setupPolicy.ts: @orkestrel/contract` as an
undeclared vendored import. The reproduction is `.orkestrel/campaign/s2-4-instruments/s2-4-vendored.mjs`.
`.claude/rules/quality.md` § Instruments rules it: a text search reports on text, so a claim about
imports needs the parser the workspace already uses.

The proof's shape today (`tests/src/server/helpers.test.ts:425-470`): it collects every vendored
module under `HOST_PATHS`, appends four control modules drawn from outside the vendored set
(`control/from.ts` with a static import, `control/dynamic.ts` with a template-literal dynamic
import, `control/guide.ts` importing a declared package, `control/console.ts` importing an
undeclared one), extracts specifiers, and asserts the vendored modules import only packages
`BASE_DEV_DEPENDENCIES` declares while the controls report both sides. Read the whole block before
editing; the comment above it states why a reader that extracts nothing and an allowlist that
admits everything each report the same clean list.

`vite`'s `parseSync` is already the parser `tests/setupPolicy.ts` uses for the same job
(`readSkillDeclarations`, `inspectSkillImports`); it parses TypeScript and returns an ESTree
program with `ImportDeclaration`, `ExportAllDeclaration`, `ExportNamedDeclaration` (each with an
optional `source`), and `ImportExpression` nodes. `.oxlintrc.json` forbids `typescript` under
`tests/**`; `vite` is permitted and in `BASE_DEV_DEPENDENCIES`.

**Law.** `AGENTS.md`; `.claude/rules/tests.md`, `.claude/rules/typescript.md`,
`.claude/rules/quality.md` § Instruments, `.claude/rules/names.md`, `.claude/rules/writing.md`.
Skill: none. Guide: none.

**Installed primitives.** `vite` (`parseSync`), `@orkestrel/contract` guards, `@orkestrel/test`
(`requireValue`). A helper whose job an installed export does is a defect.

**Host.** Windows 11; Bash; multi-line programs go to a file under `tmp/probe/` and are run from
there; write source through your editor tools so no non-ASCII code point round-trips through
cp1252.

**Measurements.** Baseline: the checkpoint commit the dispatch message names, carrying S2-4's
tree and the regenerated `host.json`. At that baseline `npm run test:src:server` reports the one
failure named above (the Orchestrator's reading is in `tmp/verify/s2-4-server.log.txt`).

**Control identifiers.** `S2-5-C1` through `S2-5-C3`. Name each test for what it proves.

**Standing conditions.** None known beyond the failure this unit closes.

## Unknowns

- **Whether any vendored module carries a `require(...)` call or a dynamic `import()` with an
  expression argument.** Read the modules `HOST_PATHS` names and report what forms you found; a
  dynamic import whose argument is not a string or an expression-free template literal is reported
  by the proof as unreadable rather than skipped.

## Scope

**Owned.** `tests/src/server/helpers.test.ts` (the `vendored imports` describe block and any helper
it needs, placed per `.claude/rules/tests.md` § Shared test infrastructure — a reusable extractor
goes to `tests/setupServer.ts`, exported and named `{verb}{Noun}`).

**Shared (report-only).** None.

**Off-limits.** Everything else, including `tests/setupPolicy.ts`, `src/**`, `host.json`,
`package.json`, every `.claude/**` and `.agents/**` file, `guides/**`.

**What asserts the state this change ends.** The `vendored imports` block itself and, where an
extractor lands in `tests/setupServer.ts`, its sibling proof in `tests/setupServer.test.ts` (which
the `setup` project collects).

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. `npm run lint` then `npm run format` before
the checks are permitted.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The change

Replace the text pattern with a reading of the parsed module: the `source.value` of every
`ImportDeclaration`, `ExportAllDeclaration`, and `ExportNamedDeclaration` that carries a source,
and the argument of every `ImportExpression` where it is a string literal or a template literal
with no expressions. Keep the four existing controls. Add `S2-5-C1`: a control module carrying an
`@orkestrel/console` specifier only inside a string literal (and one inside a comment), which the
reading must not report — the false positive that motivated this unit, drawn from outside the
population of imports. Keep the assertions on both sides of the ruling: the vendored modules report
only declared packages, `control/console.ts` is reported, and the controls' specifiers appear in
the controlled list exactly as written.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/s2-report-5.md` and return its path as
your final message: the forms found in the vendored modules; each control with the command, its
failing count before (record `S2-5-C1` red against the text-pattern reader before replacing it,
and the mechanism red by disabling the parser read once), and its passing count after; every gate
command with exit code and totals; the claims you flag as least certain. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most —
where a vendored module carries an import form the parser reading cannot resolve to a string, or
where the fix needs an off-limits file. Decide, record, and carry on on: the extractor's name and
placement, fixture wording, and assertion order.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run format:check` and `npm run lint:check` exit 0.
3. `npm run test:src:server` exits 0, including the repaired case and `S2-5-C1`; `S2-5-C2`: the
   four pre-existing controls still discriminate (recorded red by disabling the parser read once);
   `S2-5-C3`: the extractor, if exported from `tests/setupServer.ts`, has a sibling proof and
   `npm run test:setup` exits 0.
4. `npm run test:policy` exits 0.

**Observations, not criteria.** The whole `npm test` chain.

## Review evidence

The Orchestrator takes `git diff` and `git status --short` after you return.
