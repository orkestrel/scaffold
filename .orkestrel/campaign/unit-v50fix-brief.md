# Unit v50fix: the manifest is birth-owned, and a plan may not say otherwise

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly inside your
sandbox and spawn nothing beyond the scoped commands named here. Read before editing:
`AGENTS.md`, `.claude/rules/typescript.md`, `patterns.md`, `architecture.md`, `tests.md`,
`documentation.md`.

## The finding, accepted

The 0.0.50 audit ruled claim 1 BROKEN and the Orchestrator verified it. Every CLI route is
section-safe: derivation preserves sections (`src/core/helpers.ts:841`), the writable
projection excludes peers (`src/bin/helpers.ts:284`), the range writer searches
`dependencies` and `devDependencies` only (`src/core/compilers.ts:1490`), and `declare`
accepts runtime and development rows only (`src/server/Materializer.ts:409`).

The escape is a library route. `isArtifact` accepts a caller-authored `content` artifact for
any valid path (`src/core/validators.ts:321`) and `isPlan` does not enforce compiler
ownership (`:342`), so a caller can hand `Materializer.repair` a content-owned
`package.json`; repair then selects that artifact (`src/server/Materializer.ts:290`) and
writes its whole content (`:989`), which can insert, rewrite, or remove `peerDependencies`
and `peerDependenciesMeta`.

This is reachable through the package's own published API rather than a hypothetical foreign
implementation, so it is repaired rather than documented.

## The rule

The compiler always emits the manifest as birth-owned
(`src/core/Compiler.ts:283-289`: `path: 'package.json'`, `ownership: 'birth'`). A plan that
claims it otherwise contradicts the compiler that produces plans, so the guard refuses it.

Add that invariant where a plan is narrowed: an artifact at the manifest path must be
birth-owned. Refuse a plan that says otherwise, with the existing refusal vocabulary and a
message naming the path and the ownership it must carry.

Rule these before implementing, and record each decision:

- Whether the invariant belongs in `isPlan`, beside `isArtifact`, or in a named predicate the
  two share. Prefer one home; do not state the rule twice.
- Whether the manifest path is already a named constant. If it is, use it; if it is not, and a
  literal appears in more than one place, centralize it under the constants rules.
- Whether `presence` ownership at that path must be refused too. Decide from what the
  compiler can emit and what the writer would do with it, and say which you found.

## Scope

- Owned: `src/core/validators.ts`, `src/core/constants.ts` if the path becomes a constant,
  `src/core/types.ts` if a TSDoc must follow, `tests/src/core/validators.test.ts`,
  `tests/src/server/Materializer.test.ts` if a route needs pinning, and `guides/scaffold.md`
  where the plan contract is stated.
- `guides/scaffold.md` is vendored: if you touch it, run `npm.cmd run build:inventory` and
  include the regenerated `host.json`.
- Off-limits: `ROADMAP.md`, every `src/bin` file, and everything else not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` and `npx.cmd` from
  the repository root. The tree is committed and clean at your start; any
  `.orkestrel/campaign/` path is standing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the owned files and any
   `.orkestrel/campaign/` path; report before and after.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — unscoped.
4. Failing-first, recorded with its exact command and counts: a plan carrying a content-owned
   manifest whose content declares a peer is refused, red before the guard and green after.
   Its control is a plan carrying the compiler's own birth-owned manifest, which must still be
   accepted — so the guard refuses the claim rather than the path.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project <name>`
   exits 0 for `src:core`, `src:server`, `src:bin`, `config`, and `guides`; totals reported.

## Output

The complete diff, per-criterion exit codes and totals including the failing-first pair, your
three recorded decisions, and any deviation (expected, found, exact evidence, done or not
done, at most one short hypothesis). No process diary.

## Deviation contract

Stop on: the invariant breaking a legitimate compiler-produced plan; the guard needing a file
outside the owned set; a criterion unreachable. Placement, naming, and message wording within
the rules are yours: decide, record, carry on.
