# Unit fetch-U1: inventory digests and the committed inventory

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`,
rooted at `C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment
directly inside your own sandbox and spawn nothing beyond the scoped test commands
named in the acceptance criteria. Read before editing: `AGENTS.md`, `.claude/rules/`
`typescript.md`, `architecture.md`, `names.md`, `tests.md`, and the Vendored data root
and Helpers sections of `guides/scaffold.md`. The ruling record is
`.orkestrel/campaign/design-fetch-reconciliation.md`; this brief restates everything
U1 needs, and a conflict between the two stops the unit.

## Objective

Give the vendored host a per-file digest chain and a committed inventory, so a later
unit can fetch only changed files from the repository and verify what it fetched: add
`digest` to `ManifestEntry`, emit it from `stageHost`, add the `hexToDigest` and
`stageInventory` helpers, commit the generated `host.json` at the repository root, and
land the conformance gate that reds when a vendored file's bytes move without
regeneration.

## Context and standing facts

- The tree is clean at your start apart from `.orkestrel/campaign/` additions; treat
  every `git status --porcelain` entry at your start as standing.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` and
  `npx.cmd` from the repository root. Your sandbox denies network and denies installs;
  every proof here is on-disk. Prior units in this repository ran scoped
  `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot` commands
  successfully inside this sandbox.
- The digest family already exists and is the only hashing this package uses:
  `computeDigest`, `computeFileDigest`, `computeManifestDigest`, `DIGEST_PATTERN` in
  `src/core/helpers.ts` / `src/server/helpers.ts` (locate exactly; reuse, never
  duplicate).
- `stageHost` (`src/server/helpers.ts:1158` region) expands `HOST_PATHS`
  (`src/core/constants.ts:124` region) from the checkout into `dist/host` and writes a
  `manifest.json` whose membership digest `computeManifestDigest` covers.
  `readHostManifest` and the manifest validators read it back. `dist/host` is
  gitignored; regenerate it only if a criterion needs it and treat its absence as
  normal.
- The design fixes these shapes (do not redesign them):
  - `ManifestEntry` gains `readonly digest: string` — the SHA-256 of the file's exact
    bytes (TSDoc: what a live read compares against a target's copy, and what a host
    supplied as a value is verified against). This breaks the staged-host format: a
    root staged by an earlier release is refused by this release's reader. That is
    correct at `0.0.x`; no shim.
  - `export const HOST_INVENTORY_PATH = 'host.json'` in `src/core/constants.ts` — the
    repository-relative path the committed inventory is served at.
  - `export function hexToDigest(hex: string): string` — projects exact bytes stated
    in hexadecimal to their SHA-256 digest; place it with its digest siblings.
  - `export function stageInventory(checkout: string, path: string): HostManifest` —
    stages the committed vendored-file inventory a live read compares against: the
    same expansion `stageHost` performs, written as one JSON file at `path` carrying
    the manifest shape (entries with digests, roots, membership digest), reading back
    through the same validators.
- The committed `host.json` is generated, committed, and gated: add an npm script that
  regenerates it (name it within the repository's script conventions beside
  `build:host`), run it, and commit the result. The conformance gate makes staleness
  red: a test that recomputes the inventory from the checkout and compares it against
  the committed file byte-for-byte (or digest-for-digest) and fails on any difference.
  Find the conformance suite's home first: if `tests/conformance.test.ts` does not
  exist, put the gate in the test project that runs cheapest tree-wide checks
  (`test:policy` or `test:config` family) and report where and why.

## Scope

- Owned: `src/core/constants.ts`, `src/core/types.ts` and `src/server/types.ts` (only
  the declarations named here — locate where `ManifestEntry` actually lives),
  `src/server/helpers.ts`, `src/server/validators.ts`, `src/core/helpers.ts` (only if
  the digest family lives there), the committed `host.json`, `package.json` (the one
  script), the owning test files for each change (`tests/src/server/helpers.test.ts`
  and the conformance gate's home), and the `guides/scaffold.md` Helpers and
  Interfaces table rows for the symbols this unit adds — rows only, no narrative.
- Off-limits: `src/server/Upstream.ts`, `src/server/Materializer.ts`, `src/bin/**`,
  every other guide section, and every file not named. Report-only for anything
  shared.
- No commits, no installs, no mutating git commands, no tree-wide `format`/`lint --fix`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus owned files;
   report before and after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first, each recorded with its exact command and counts:
   - a row proving each `stageHost` entry's `digest` equals `computeFileDigest` over
     the same file, red against the digest-less emission, green after;
   - the membership-digest negative control: one entry's digest changed must change
     the manifest digest (the control reports a different digest, run under the same
     conditions);
   - the staleness gate: with one vendored file's bytes changed and `host.json` not
     regenerated, the gate exits 1 naming the path; after regeneration it exits 0.
     Restore the probe edit exactly and show the restoration.
5. Scoped suites: the owned test files' projects each exit 0 under
   `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot
   --project <name>`; totals reported.

## Output

The complete diff; per-criterion exit codes and totals including every failing-first
pair; where the conformance gate landed and why; the generated `host.json`'s entry
count as reported by the gate's own output (never restate it as prose); any deviation.
No process diary.

## Deviation contract

Stop on: `ManifestEntry`'s actual home contradicting this brief's shape; the digest
family not being reusable as assumed; a criterion unreachable inside the sandbox; an
off-limits file needing an edit. Script naming, TSDoc wording within the rules, and the
gate's exact comparison mechanics are yours: decide, record, carry on.
