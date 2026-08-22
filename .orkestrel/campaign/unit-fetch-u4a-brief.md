# Unit fetch-U4a: the three unblocks the verbs need

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`,
rooted at `C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment
directly inside your sandbox and spawn nothing beyond the scoped commands named here.
Read before editing: `AGENTS.md`, `.claude/rules/typescript.md`, `names.md`,
`patterns.md`, `architecture.md`, `tests.md`, and the Upstream, Materializer, and
Vendored data root sections of `guides/scaffold.md`.

## Why this unit exists

The verbs unit measured that the host baseline as designed can never go live, and
reported it rather than working around it. The Orchestrator verified every reading and
rules the three fixes below. Each is a contract change in `src/server` or `src/core`,
which the verbs unit could not make. Ruling record:
`.orkestrel/campaign/design-fetch-reconciliation.md` plus this brief, which amends it.

The measured blocks, each re-verified by the Orchestrator on 2026-08-22:

```
src/core/constants.ts:155:	'guides/guide.md',
src/core/constants.ts:156:	'guides/scaffold.md',
src/server/helpers.ts:1145:export function copiesToHost(copies: readonly Copy[], manifest: HostManifest): Host | undefined {
src/server/helpers.ts:1149:		if (copy.lookup !== 'found' || !declared.has(copy.path)) return undefined
src/server/Materializer.ts:188:			const root = supplied ?? resolve(dirname(fileURLToPath(import.meta.url)), '../../host')
src/server/Materializer.ts:775:	#deferred(path: string): boolean {
src/server/Materializer.ts:776:		return path === CATALOG_AGENT_PATH || (path.startsWith('guides/') && path.endsWith('.md'))
src/core/types.ts:63:export type Lookup = 'found' | 'missing' | 'failed'
src/server/Upstream.ts:113:	static readonly #unreadable = 'the answer carries no readable latest version'
```

## Fix 1 — the host baseline must be reachable

Every floor manifest declares `guides/guide.md` and `guides/scaffold.md`; `vendor`
answers a guides-group path `missing` without a request; `copiesToHost` voids the fill
on any non-`found` row. So the live host baseline is unreachable by construction and
`provenance.host` could only ever read `floor`. Both rulings are individually right;
their intersection is the defect.

Rule: **the host surface owns the vendored paths whose bytes no other surface owns.**
A path the materializer defers — a `guides/*.md` mirror, or `CATALOG_AGENT_PATH`
whose bytes the catalog table owns — is not host-owned, is never requested from the
repository, and keeps the floor's bytes.

- Extract `Materializer.#deferred`'s exact predicate to an exported pure leaf in
  `src/core/helpers.ts` beside `inferGroup` (`src/core/helpers.ts:190`), name it under
  the naming rules — `isExactCaseFile` is the precedent for an `is*` predicate that is
  not a type guard — export it, test it, and have `Materializer` call it so one rule
  has one home.
- Change `copiesToHost(copies: readonly Copy[], floor: Host): Host | undefined`. It
  overlays the live copies onto the floor: every host-owned declared entry must appear
  among the copies as `found`, each deferred declared entry keeps the floor's bytes,
  and it answers `undefined` when a host-owned entry is absent or any supplied row is
  not `found`, or when a row names a path the floor's manifest does not declare. The
  emitted entries keep the release's order, storage names, and executable
  declarations, with each digest recomputed over the bytes the fill holds and the
  membership digest recomputed, exactly as the current implementation already does.
- The whole-baseline rule is unchanged in substance and now states the set it was
  always about: the host-owned files. Say that in the TSDoc, because a reader who
  meets `copiesToHost` alone must not conclude that a fill can mix live and floor
  bytes for a file the host surface writes.

## Fix 2 — the floor must be nameable outside the materializer

`Materializer` resolves the default vendored root privately at
`src/server/Materializer.ts:188` and exposes neither it nor the manifest, so a CLI verb
cannot read the floor to derive the request set or to pass it back as the fallback.

Rule: add `readHostFloor(root?: string): Host`, exported from `src/server/helpers.ts`:
resolve the default vendored root when no root is given, read its manifest and every
declared entry's bytes, and answer the `Host` value. Refuse with the existing `TARGET`
vocabulary when the root, its manifest, or a declared file is unreadable or fails the
manifest's own verification.

`Materializer`'s default-root resolution and this helper must share one expression —
two copies of that path can drift and the whole point is that they agree. Do not add a
second manifest reader: reuse whatever `Materializer` already calls.

## Fix 3 — authoritative absence needs a real discriminant

A verb must tell a transport failure (fall back to the floor) from a registry answer
that admits no version (keep the refusal). Today the only discriminant is the exact
text of `Upstream.#unreadable`, a private static; restating that literal in `src/bin`
would drift silently.

Rule: split the union — `Lookup = 'found' | 'missing' | 'unmatched' | 'failed'`.

- `found` — a version was served and admitted.
- `missing` — the source served a definite absence.
- `unmatched` — the answer was read and no version admits under the declared range.
- `failed` — the read did not complete: transport, timeout, byte bound, redirect, or a
  shape the reader refuses.

`Upstream` reports `unmatched` where it now reports `failed` with the `#unreadable`
note; the note text stays as prose for the reader. Every existing consumer in `src/`
tests `lookup === 'found'` or `lookup !== 'found'` and is correct unchanged — verified
by the Orchestrator across `src/bin/CLI.ts`, `src/bin/helpers.ts`, and
`src/core/helpers.ts`. The two enumerating validators are not: `src/core/validators.ts`
`:458` and `:482` each read `literalOf('missing', 'failed')` and must admit
`unmatched`. Sweep for any other enumeration before you finish and report the pattern
and its scope.

## Scope

- Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts`,
  `src/server/helpers.ts`, `src/server/Materializer.ts`, `src/server/Upstream.ts`,
  `src/server/validators.ts` if a guard follows, the owning test files for each change
  (`tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`,
  `tests/src/server/helpers.test.ts`, `tests/src/server/Materializer.test.ts`,
  `tests/src/server/Upstream.test.ts`), and `guides/scaffold.md` table rows only —
  narrative belongs to a later unit.
- `guides/scaffold.md` is vendored, so the `config` staleness gate reds after you touch
  it; run `npm.cmd run build:inventory` and include the regenerated `host.json`.
- Off-limits: `src/bin/**` — the verbs are the next unit's, and this unit adds no
  caller. Everything else not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd`/`npx.cmd`
  from the repository root; your sandbox denies network, so every proof drives the
  existing loopback fixtures or on-disk fixtures.

## Acceptance criteria, in this order

1. `git status --porcelain` lists only the owned files; report before and after. The
   tree is committed and clean at your start.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — unscoped, and it exits 0
   at your start, so any error is yours.
4. Failing-first, each recorded with its exact command and counts:
   - fix 1's reachability row — `copiesToHost` over a floor whose manifest declares
     deferred paths, with live copies for the host-owned paths only, answers a `Host`
     rather than `undefined`; red against the current signature and rule;
   - fix 1's refusal control — a host-owned path absent from the copies, and a
     non-`found` host-owned row, each still answer `undefined`;
   - fix 2's row — `readHostFloor()` with no argument answers a `Host` that verifies,
     and a materializer over it hydrates what the default root hydrates;
   - fix 3's row — a packument read with no admitting version reports `unmatched`
     while a transport fault reports `failed`, driven by the loopback fixture.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project
   <name>` exits 0 for `src:core`, `src:server`, `src:bin`, and `config`; totals
   reported.

## Output

The complete diff, per-criterion exit codes and totals including every failing-first
pair, the enumeration sweep's pattern and scope, the predicate's chosen name and why,
and any deviation (expected, found, exact evidence, done or not done, at most one
short hypothesis). No process diary.

## Deviation contract

Stop on: a fix requiring a change outside the owned set; `Materializer`'s default-root
resolution proving unshareable without a design change; a criterion unreachable;
`unmatched` proving producible by a surface that should not produce it. Naming within
the rules, TSDoc wording, and test row mechanics are yours: decide, record, carry on.
