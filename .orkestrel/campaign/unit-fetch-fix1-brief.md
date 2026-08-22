# Unit fetch-fix1: the audit round's accepted findings

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`,
rooted at `C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment
directly inside your sandbox and spawn nothing beyond the scoped commands named here.
Read before editing: `AGENTS.md`, `.claude/rules/typescript.md`, `names.md`,
`patterns.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`, and
the sections of `guides/scaffold.md` your fixes touch. Ruling record:
`.orkestrel/campaign/audit-fetch-reconciliation.md`, which this brief implements; a
conflict between the two stops the unit.

## Context

The campaign is committed and the tree is clean at your start. Any path under
`.orkestrel/campaign/` is standing and never yours. Host facts: Windows 11; the `npm`
PowerShell shim is blocked — `npm.cmd`/`npx.cmd` from the repository root; your sandbox
denies network, so every proof drives the loopback or on-disk fixtures the suite
already builds. `guides/scaffold.md` is vendored, so the `config` staleness gate reds
after you touch it: run `npm.cmd run build:inventory` and include the regenerated
`host.json`. The root typecheck exits 0 at your start, so any error is yours.

## Fix 1 — verify raw bytes, and stop round-tripping through text

The integrity defect, measured by the audit and verified by the Orchestrator: the
response reader decodes a body through a default `TextDecoder`
(`src/server/Upstream.ts:871-905`), which strips a leading UTF-8 byte-order mark, and
the digest comparison hashes that decoded string (`src/server/Upstream.ts:539-551`). A
body `EF BB BF 61` therefore satisfies an inventory digest declared for `61`, and the
decode-then-re-encode round trip would write the stripped form into a target.

Rule: the vendored-file path carries **raw bytes as hexadecimal end to end**, and every
digest is computed over raw bytes on both sides.

- The row's payload becomes hexadecimal rather than decoded text, matching the
  `Snapshot` and `HostArtifact.hex` vocabulary the rest of the host path speaks. The
  field name follows that vocabulary.
- The fetched body is hashed before any decoding, and compared against the inventory's
  declared digest for that path.
- The caller's own bytes, which decide whether a path is fetched at all, are compared
  as bytes rather than as decoded text.
- Nothing on this path decodes to text and re-encodes. Guide mirrors are unaffected:
  `Mirror.content` stays text, because a guide is text the materializer writes as text.

Pin it: a fixture serving a body whose bytes begin with a byte-order mark, declared in
the inventory under the digest of those **exact** bytes, is accepted and round-trips
byte-identically; the same body declared under the digest of the mark-stripped bytes is
**refused**. That second row is the defect's own vector and must be red before the fix.

## Fix 2 — stage the digest from what was published

`stageHost` reads each digest from the source before copying
(`src/server/helpers.ts:1445-1462`, `:1473-1496`), so a source that changes between
those operations yields a manifest describing bytes it did not publish. Compute or
verify each entry's digest from the staged destination after the copy, so the manifest
describes the bytes it actually staged.

## Fix 3 — state what the staleness gate assumes

The gate compares a freshly generated inventory against the committed one
(`tests/config.test.ts:562-605`), which cannot distinguish a quiescent checkout from
one edited mid-run. There is no cheap mechanism that proves nobody edited during the
run, so state the requirement where a reader meets the gate — a sentence in the gate's
own comment and in the guide passage that describes it. Do not build snapshot
machinery.

## Fix 4 — say the invariant that actually holds

A `Host` value deliberately carries live host-owned bytes beside floor bytes for
deferred entries; the write invariant is that deferred paths are presence-only and
repair never writes those floor bytes. The invariant is **one baseline per surface**,
never "no `Host` value mixes bytes". Correct the TSDoc on the assembler and the
matching guide sentence so a reader who meets either alone cannot conclude the wrong
one. The audit confirmed the code is right here; only the wording is wrong.

## Fix 5 — the two guide overstatements

- Authoritative absence is a `FETCH` refusal for the verbs that write, while `audit`
  turns release absence into questions and returns an audit result
  (`src/bin/CLI.ts:279-310`). Narrow the sentence to the verbs it is true of.
- The request-count statement omits `UpstreamOptions.retries`, which lets `#read`
  issue repeated requests (`src/server/types.ts:312-330`,
  `src/server/Upstream.ts:784-799`). Qualify the statement so it is true at the
  default and states what raises it.

## Fix 6 — the two term collisions

- `copy` names three things: `WriteTransaction.copy()`, `UpstreamEventMap.copy`, and
  the `Copy` type. The row type becomes `HostFile`; the event and every derived name
  follow it, including the assembler's own name, which currently reads as a projection
  from copies.
- `Repository` names two: the existing local git-state contract with `isRepository`
  (`src/server/types.ts:123`, consumed at `src/server/Materializer.ts:442` and
  `src/bin/CLI.ts:1267`), and the new `UpstreamOptions.repository` remote endpoint.
  The local contract becomes `Worktree` with `isWorktree`, because a worktree is what
  it holds and `repository` is the right word for a base and a branch. Sweep for every
  consumer, including prose, and report the pattern and scope.

## Fix 7 — the reader's method name

`vendor` names a writing operation in this ecosystem, on a contract documented as a
reader that never writes. Rename it `files`, which sits beside `catalog()` in the
noun-method pattern the interface already uses. Do not name it `read`: the class holds
a private `#read` doing something else.

## Fix 8 — the guide's predictability and the guide-provenance rule

- Add compact corollaries before the verb table so each row follows from the stated
  rule rather than only from the table: which surfaces each verb reads; that a
  network-forced floor is drift except for a successful `new`; that an explicit
  offline floor is intentional; that `catalog` has no offline form; and that
  `overwrite` commits its repair and removal work before the catalog step.
- The guide never says which single value `provenance.guides` takes when some rows
  resolve live and others keep their mirror. **Read the implementation first**, state
  what it actually does, and report that reading — do not restate an intent.

## Scope

- Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts`,
  `src/server/types.ts`, `src/server/helpers.ts`, `src/server/Upstream.ts`,
  `src/server/Materializer.ts`, `src/server/validators.ts`, `src/bin/CLI.ts`,
  `src/bin/types.ts`, `src/bin/helpers.ts`, every owning test file for the changes
  above, `tests/setupServer.ts`, `tests/config.test.ts`, `guides/scaffold.md`, and
  `host.json` through regeneration.
- Off-limits: `ROADMAP.md` — its release note is already written, and a rename that
  makes one of its sentences false is a deviation to report rather than an edit to
  make. Everything else not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the owned files and any
   `.orkestrel/campaign/` path; report before and after.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — unscoped.
4. Failing-first, each recorded with its exact command and counts: fix 1's
   mark-stripped-digest row red before the fix and green after, beside its
   exact-bytes acceptance row; fix 2's row proving the manifest's digest describes the
   staged bytes; and one row per rename proving the old name is gone from the surface
   it named.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project
   <name>` exits 0 for `src:core`, `src:server`, `src:bin`, `config`, and `guides`;
   totals reported.

## Output

The complete diff, per-criterion exit codes and totals including every failing-first
pair, the rename sweeps' patterns and scopes, the `provenance.guides` reading you took
from the implementation, and any deviation (expected, found, exact evidence, done or
not done, at most one short hypothesis). No process diary.

## Deviation contract

Stop on: a `ROADMAP.md` sentence a rename makes false; the hexadecimal payload change
proving to need a design decision this brief does not make; a rename whose consumer set
reaches outside the owned files; a criterion unreachable. Field and event naming within
the vocabulary this brief states, TSDoc wording, and test mechanics are yours: decide,
record, carry on.
