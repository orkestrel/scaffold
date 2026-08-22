# Unit v50: peers are caller-owned, and a precondition carries its scope

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly inside your
sandbox and spawn nothing beyond the scoped commands named here. Read before editing:
`AGENTS.md`, `.claude/rules/typescript.md`, `names.md`, `patterns.md`, `architecture.md`,
`tests.md`, `documentation.md`, `writing.md`, and the sections of `guides/scaffold.md` your
fixes touch. Ruling record: `.orkestrel/campaign/design-v50-reconciliation.md`, which this
brief implements; a conflict between the two stops the unit.

## Context

The tree is committed and clean at your start; any `.orkestrel/campaign/` path is standing and
never yours. Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` and
`npx.cmd` from the repository root; your sandbox denies network, so registry-shaped proofs
drive the existing loopback fixtures. Editing a vendored file reds the `config` staleness
gate: run `npm.cmd run build:inventory` and include the regenerated `host.json`. The root
typecheck exits 0 at your start, so any error is yours.

## Fix 1 — no writing verb alters a peer

The mechanism, verified by both design lanes: `manifestToDependencies`
(`src/core/helpers.ts:833`) erases the declaration section, `#pin` (`src/bin/CLI.ts:811`)
produces a range keyed by package name alone, and `replaceManifestRanges`
(`src/core/compilers.ts:1481`) then applies that name across `dependencies`,
`devDependencies`, and `peerDependencies`. Section information is lost before the rewrite, so
a peer cannot be distinguished from a runtime range.

Rule: scaffold never rewrites, inserts, or removes an existing `peerDependencies` entry, and
never touches `peerDependenciesMeta`. Runtime and development declarations keep their
full-triple floors. A `Blueprint.peers` row is still written exactly once, at creation, into a
vacant target; CLI derivation from an existing target never invents a peer.

- Scope `replaceManifestRanges` and `replacePlanRanges` to the `dependencies` and
  `devDependencies` sections. Their TSDoc states the rule plainly, including that they never
  read or write `peerDependencies` or `peerDependenciesMeta`.
- Give the derivation helper a name that says which set it answers, so a caller cannot mistake
  it for the whole manifest. The subjective lane proposed
  `manifestToWritableDependencies(manifest, blueprint)`; adopt that or name it better under
  the naming rules and record your choice.
- Narrow the `declare` contract so a peer rewrite is impossible through the typed API.
- The landed tests at `tests/src/core/compilers.test.ts:71-79` and
  `tests/src/server/Materializer.test.ts:1132` currently REQUIRE the defective behaviour.
  Reverse them: a name shared by `devDependencies` and `peerDependencies` takes the
  development-floor raise while its peer text stays byte-identical. A test that pins a defect
  is why no gate caught this, so say in each rewritten row what it now proves.

## Fix 2 — a precondition carries the scope of what it blocks

`repair` parses the group selection at `src/bin/CLI.ts:323` and `overwrite` at `:429`, but
`#assertTarget` and `#targetQuestions` (`src/bin/CLI.ts:1205` region) receive no selection, so
every target question applies to the whole run.

Rule: a target question carries the groups it speaks for, and the writing path filters against
the selection before refusing.

- The custom-Vitest-project question carries `configs`.
- The planned-dependency question (`src/bin/CLI.ts:1173` region) carries `configs` and `tests`.
- A selection that includes a blocked group refuses atomically before any write. A selection
  that excludes it proceeds.
- `audit` reports a question only when its selection includes that question's groups; the
  question stays non-blocking, and an aligned audit does not become drift because a target
  owns a custom project.
- Rewrite both refusal messages to name the blocking group, the conflicting path or packages,
  and the usable alternative. Both lanes proposed wording; write it in the guide's voice under
  the writing rules rather than pasting either verbatim.
- HELD BACK deliberately: `overwrite`'s dirty-tree refusal has the same over-broad shape and
  guards a destructive path. Leave it whole-run. If you touch it, that is a deviation.

## Fix 3 — the gate that would have caught fix 1

Unit assertions prove the rewrite policy, never npm installability. Add to the distribution
project a proof that builds a local tarball carrying a preserved peer beside a **co-peer
witness** pinning an exact version, runs the real resolver, and proves the install resolves.
Its negative control substitutes the narrowed peer and observes `ERESOLVE`.

A generic pack-and-install with no co-peer witness can miss this defect entirely, because npm
may install a version satisfying the narrowed range. If your sandbox cannot run a real
install, say so plainly, write the proof so it runs on the host, and report the exact command
the Orchestrator must run — do not weaken the proof to fit the sandbox.

## Scope

- Owned: `src/core/helpers.ts`, `src/core/compilers.ts`, `src/core/types.ts`,
  `src/server/types.ts`, `src/server/Materializer.ts`, `src/bin/CLI.ts`, `src/bin/helpers.ts`,
  `src/bin/types.ts`, every owning test file for the changes above, `tests/setupServer.ts`,
  `tests/distribution.test.ts`, `guides/scaffold.md`, and `host.json` through regeneration.
- Off-limits: `ROADMAP.md` — its rows are the Orchestrator's to close. Everything else not
  named.
- No commits, no installs beyond what a distribution proof performs inside its own fixture, no
  mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the owned files and any
   `.orkestrel/campaign/` path; report before and after.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — unscoped.
4. Failing-first, each recorded with its exact command and counts: the shared-name row (a
   development floor raised while the peer text stays byte-identical) red against the current
   rewrite; one group-scoped row per verb showing a selection that excludes the blocked group
   proceeding and one including it refusing, red against the current whole-run refusal.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project <name>`
   exits 0 for `src:core`, `src:server`, `src:bin`, `config`, and `guides`; totals reported.

## Output

The complete diff, per-criterion exit codes and totals including every failing-first pair, the
derivation helper's chosen name and why, the distribution proof's status and the exact host
command if it could not run in your sandbox, and any deviation (expected, found, exact
evidence, done or not done, at most one short hypothesis). No process diary.

## Deviation contract

Stop on: a peer-preservation fix that cannot be made without touching an off-limits file; the
group-scope change requiring a contract this brief does not rule; `overwrite`'s dirty-tree
refusal proving entangled with fix 2; a criterion unreachable. Naming, message wording within
the writing rules, and test mechanics are yours: decide, record, carry on.
