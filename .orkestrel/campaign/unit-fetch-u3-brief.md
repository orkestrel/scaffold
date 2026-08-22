# Unit fetch-U3: the value host

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/scaffold`. Native because the acceptance evidence runs
the Materializer suite's real-checkout fixtures. You perform the assignment directly
and spawn nothing beyond the suites you run. Read before editing: `AGENTS.md`,
`.claude/rules/typescript.md`, `names.md`, `patterns.md`, `architecture.md`,
`tests.md`, and the Materializer and Vendored data root sections of
`guides/scaffold.md`. Ruling record:
`.orkestrel/campaign/design-fetch-reconciliation.md`; a conflict stops the unit.

## Objective

Let a materializer consume a vendored host supplied as a value rather than a
directory: the `Host` type, the `copiesToHost` assembler, the
`MaterializerOptions.host: string | Host` union, and the hydration path that treats a
verified value host exactly as a staged root.

## Context and standing facts

- U1 and U2 are landed and uncommitted: `ManifestEntry.digest`, `hexToDigest`,
  `stageInventory`, the committed `host.json`, the `Copy` type in
  `src/core/types.ts`, `UpstreamInterface.vendor`, and the `repository` option group.
  Treat every `git status --porcelain` entry at your start as standing and build on
  them.
- STANDING REDS, not yours: root-typecheck errors at the consolidation's `read` sites
  (`tests/src/bin/CLI.test.ts` :419, :1184, :2938, :3432-33;
  `tests/src/bin/main.test.ts` :170; `tests/src/server/validators.test.ts` :98) and
  formatter reds on `tests/setupServer.ts` and `tests/src/bin/CLI.test.ts` from the
  consolidation's unformatted hunks. Do not fix them and do not let them gate you.
- `tests/src/server/Materializer.test.ts` carries the consolidation's standing edits;
  your rows are granted hunks in it, nothing else.
- `@orkestrel/test` 0.0.10 is installed: `scratch.write` and `scratch.link` return the
  absolute contained path.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` and
  `npx.cmd` from the repository root.
- If a vendored file you own changes, the `config` project's staleness gate reds; run
  `npm.cmd run build:inventory` and include the regenerated `host.json`.
- U2's carry: the fatal hex-to-text decode exists twice (folded into `Upstream`'s
  answer path, and `readFileText` reading from disk). If your implementation needs it
  a third time, extract the leaf to `src/core/helpers.ts` beside `contentToHex`,
  export it, test it, and update both existing sites; otherwise leave it.

## The contract, fixed by the design (do not redesign)

- `Host` in `src/server/types.ts`: `{ readonly manifest: HostManifest; readonly bytes:
  Snapshot }`. The manifest carries the membership, roots, and executable declarations
  the installed release fixed, with each entry's `digest` being the digest of the
  bytes the value actually holds; `bytes` is keyed by each entry's `destination` and
  covers exactly the entries the fill holds. TSDoc states the containment consequence:
  membership never moves without a release, so a fill cannot introduce a path.
- `copiesToHost(copies: readonly Copy[], manifest: HostManifest): Host | undefined`
  in `src/server/helpers.ts`, pure and exported: assembles the complete fill from live
  copies and the release manifest, answering `undefined` when any copy is not `found`
  or names a path the manifest does not declare — the single testable leaf that makes
  the all-or-nothing baseline a fact rather than a policy scattered across verbs. The
  entries it emits carry digests recomputed over the bytes the fill holds.
- `MaterializerOptions.host?: string | Host` — one key, branching on representation. A
  string is the directory path today's behaviour reads; a `Host` is consumed directly.
  A `Host` is verified at construction the way a staged root is: a manifest whose
  membership digest does not cover its entries, an entry with no bytes, or bytes that
  do not hash to the entry's digest refuses with the existing `TARGET` error
  vocabulary.
- Hydration, audit, materialize, and repair read one immutable host whichever
  representation supplied it; the deferred `guides/**` carve-out holds for a value
  host exactly as for a directory.
- Validators: `isHost`, and the `isMaterializerOptions` union arm.

## Scope

- Owned: `src/server/types.ts`, `src/server/helpers.ts`, `src/server/Materializer.ts`,
  `src/server/validators.ts`, `tests/src/server/Materializer.test.ts` (granted hunks),
  `tests/src/server/helpers.test.ts` (granted hunks for `copiesToHost` rows),
  `tests/src/server/validators.test.ts` (granted hunks for `isHost` rows only — the
  file carries a standing red at :98 you must not touch), `guides/scaffold.md` (the
  type, helper, and options table rows only; narrative belongs to U5), and
  `host.json` only through regeneration.
- Off-limits: `src/server/Upstream.ts`, `src/bin/**`, the standing-red sites, and
  every file not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus owned
   files; report before and after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` over the owned files
   exit 0 — for the consolidation-dirty test files, report the standing formatter
   state and prove your own hunks clean by the scratchpad-copy method U2 recorded.
3. `npm.cmd run check:src:core` and `npm.cmd run check:src:server` exit 0; the root
   `tsc --noEmit` as an observation with every error confirmed at the standing sites.
4. Failing-first, recorded with exact commands and counts: the equivalence row — a
   materializer over a `Host` hydrates artifacts identical to one over a staged root
   holding the same bytes — red before the union lands (the option refuses or the
   types refuse; name the red you produced); the one-byte negative control — a value
   host differing in one byte reports `stale` on exactly that path — run under the
   same conditions.
5. Refusal rows pinned: a `Host` whose membership digest does not cover its entries,
   a `Host` missing bytes for a declared entry, and a `Host` whose bytes miss an
   entry's digest each refuse `TARGET`; `copiesToHost` answers `undefined` on any
   non-`found` row and on an undeclared path, with a green all-`found` control.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project
   src:server` exits 0 and the `config` project exits 0; totals reported.

## Output

The complete U3 diff, per-criterion exit codes and totals including every
failing-first pair, the `hexToContent` decision (extracted or not, and why), and any
deviation (expected, found, exact evidence, done or not done, at most one short
hypothesis). No process diary.

## Deviation contract

Stop on: the fixed contract conflicting with what U1 or U2 actually landed; the
hydration path proving unable to treat a value host as a staged root without a design
change; an off-limits file needing an edit; a criterion unreachable. Refusal message
wording within the existing `TARGET` vocabulary and test row mechanics are yours:
decide, record, carry on.
