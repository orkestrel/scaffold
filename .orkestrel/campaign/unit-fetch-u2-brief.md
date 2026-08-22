# Unit fetch-U2: the live reader

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/scaffold`. Native because the acceptance evidence runs
loopback fixture servers. You perform the assignment directly and spawn nothing beyond
the suites you run. Read before editing: `AGENTS.md`, `.claude/rules/typescript.md`,
`names.md`, `patterns.md`, `architecture.md`, `tests.md`, and the Upstream sections of
`guides/scaffold.md`. Ruling record: `.orkestrel/campaign/design-fetch-reconciliation.md`
(the adopted mechanism and contract are restated here; a conflict stops the unit).

## Objective

Give `Upstream` the vendored-file live read: the `Copy` row type, the
`vendor(paths, current)` verb that reads the committed inventory once and fetches by
raw only the paths whose live digest differs from the target's bytes, and the `guides`
option group renamed `repository` because one raw content host now serves guides and
vendored files.

## Context and standing facts

- U1 landed and is uncommitted in the tree: `HOST_INVENTORY_PATH = 'host.json'`
  (`src/core/constants.ts:160` region), `ManifestEntry.digest`
  (`src/server/types.ts:53` region), `hexToDigest` and `stageInventory`
  (`src/server/helpers.ts:259` region), the committed `host.json` at the repository
  root (108 entries), and the staleness gate in `tests/config.test.ts`. Treat every
  `git status --porcelain` entry at your start as standing, and build on U1's landed
  surface.
- STANDING REDS, not yours (the test-helper consolidation's unfinished `read` sites,
  measured 2026-08-22): `tests/src/bin/CLI.test.ts` :419, :1184, :2938, :3432-33;
  `tests/src/bin/main.test.ts` :170; `tests/src/server/validators.test.ts` :98. A
  standing formatter red also exists on `tests/setupServer.ts`'s consolidation hunks.
  Do not fix either and do not let them gate you.
- `@orkestrel/test` 0.0.10 is installed from a local tarball: `scratch.write` and
  `scratch.link` return the absolute contained path.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` and
  `npx.cmd` from the repository root.
- The existing reader: `Upstream` (`src/server/Upstream.ts`) is the package's only
  network reader; `#read` → `#request` (`redirect: 'manual'`) → `#body` under
  `limit`/`budget`; guides fetch through a bounded pool (concurrency 6) from
  `https://raw.githubusercontent.com/orkestrel/<repo>/refs/heads/<branch>/<path>`.
  `Upstream` NEVER falls back — the baseline choice belongs to the verbs (a later
  unit).

## The contract, fixed by the design (do not redesign)

- `Copy` in `src/core/types.ts` — the discriminated row: `found` carries `content` and
  optional `observed`; `missing` and `failed` carry `note` and optional `observed`;
  `path` is the target-relative path, which is also the checkout-relative path the
  repository serves, so the file fetched and the file answered for cannot drift. A row
  whose live digest already matches `observed` is `found` without a request, carrying
  those same bytes.
- `UpstreamOptions.repository` replaces `UpstreamOptions.guides` — same members
  (`base`, `branch`, `timeout`); the validator row follows
  (`src/server/validators.ts:381`).
- `UpstreamInterface.vendor(paths: readonly string[], current: Snapshot):
  Promise<readonly Copy[]>` — reads the committed inventory at `HOST_INVENTORY_PATH`
  from the repository once per call; each path's live digest decides fetch or skip; an
  inventory that produces no answer — unreachable, unparseable, membership digest
  invalid — fails EVERY row, which is what leaves the caller one whole baseline to
  fall back to. A path absent from the live inventory is `missing`. A fetched body is
  verified against the inventory's digest for that path; a mismatch, an over-`limit`
  body, invalid UTF-8, or a redirect fails the row with a note naming the cause. The
  vendor request set never includes a `guides/*.md` path — `mirror` owns those bytes
  (parity with `Materializer`'s deferred carve-out).
- `UpstreamEventMap` gains `copy: readonly [copy: Copy]`.
- Bounds: the existing `limit`/`budget` plumbing; every consumed byte, including from
  a refused response, spends the budget.

## The rename's two senses — measured, and the rule

`grep -rn "guides\s*:" src/` shows the identifier in TWO senses. The endpoint sense —
`src/server/validators.ts:381` (`guides: recordOf({ base: isEndpoint, ... })`), the
`UpstreamOptions` declaration, `Upstream.ts`'s consumption, and every construction site
that passes `guides:` INTO an `Upstream` — renames to `repository`. The blueprint sense
— `src/core/types.ts:173` (`readonly guides: boolean`), `src/core/factories.ts:59`,
`src/core/templates.ts:372,1132`, `src/bin/CLI.ts:701` (`isExactCaseFile`), and every
other `guides` that is not an `UpstreamOptions` member — is OFF the rename. Verify each
site's sense by its type before touching it, and report the sweep: after the unit, a
search for the endpoint sense of `guides` in `src/`, `tests/`, and `guides/` returns
nothing, with the pattern and scope named.

## Scope

- Owned: `src/core/types.ts` (the `Copy` addition), `src/server/types.ts`,
  `src/server/Upstream.ts`, `src/server/validators.ts`,
  `tests/src/server/Upstream.test.ts`, `tests/setupServer.ts` (GRANTED for the fixture
  routes — inventory and raw blob endpoints plus a request recorder — and for
  endpoint-sense rename hunks in existing fixture options; nothing else in that file),
  `guides/scaffold.md` (the Upstream member and type table rows plus the rename's
  touch on existing rows; narrative belongs to a later unit), and endpoint-sense
  rename hunks ONLY in whichever `src/bin` or test files construct `UpstreamOptions`
  with `guides:` — verify by type first and list every site you touched.
- The committed `host.json` regenerates only if a vendored file you own changes — the
  staleness gate tells you; run `npm.cmd run build:inventory` then.
- Off-limits: `src/server/Materializer.ts`, verb semantics in `src/bin/CLI.ts` beyond
  the rename hunks, the standing-red sites, and every file not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus owned files;
   report before and after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` over the owned files
   exit 0 — except `tests/setupServer.ts`, whose standing formatter red is reported
   with evidence that your own hunks are format-clean (format a scratchpad copy of
   your hunks or equivalent; name the method).
3. `npm.cmd run check:src:core` and `npm.cmd run check:src:server` exit 0; the root
   `tsc --noEmit` runs as an observation with every error confirmed inside the
   standing-red files.
4. Failing-first, recorded with exact commands and counts: the aligned-target row —
   every requested path's digest matches `current`, one request total (the recorder's
   reading), every row `found` — red before `vendor` exists (or red on the recorder
   assertion against a naive per-file implementation; name which red you produced);
   the changed-path row — exactly one further request; the dead-inventory row — every
   row `failed`, no raw fetch attempted.
5. Rows also pinned, each with the recorder or the row verdicts: a path absent from
   the live inventory is `missing`; a digest-mismatched body fails its row; an
   over-`limit` body fails its row; a `guides/*.md` path is never requested;
   `destroy()` mid-call rejects with the existing `DESTROYED` semantics.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project
   src:server` exits 0; totals reported. The `config` project exits 0 (the staleness
   gate still green, or regenerated and green).

## Output

The complete U2 diff, per-criterion exit codes and totals including every
failing-first pair, the rename sweep's pattern, scope, and touched-site list, and any
deviation (expected, found, exact evidence, done or not done, at most one short
hypothesis). No process diary.

## Deviation contract

Stop on: the fixed contract conflicting with what U1 actually landed; a rename site
whose sense you cannot decide from its type; an off-limits file needing more than an
endpoint-sense rename hunk; a criterion unreachable. Fixture mechanics, note wording,
and test row shapes within the stated properties are yours: decide, record, carry on.
