# Unit fetch-fix2: the re-check's accepted findings

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`,
rooted at `C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment
directly inside your sandbox and spawn nothing beyond the scoped commands named here.
Read before editing: `AGENTS.md`, `.claude/rules/names.md`, `typescript.md`,
`documentation.md`, `writing.md`, and the passages of `guides/scaffold.md` you touch.

## Context

The tree is committed and clean at your start; any `.orkestrel/campaign/` path is
standing and never yours. Host facts: Windows 11; the `npm` PowerShell shim is blocked
— `npm.cmd`/`npx.cmd` from the repository root; the sandbox denies network. Editing
the vendored guide reds the `config` staleness gate: run `npm.cmd run build:inventory`
and include the regenerated `host.json`. The root typecheck exits 0 at your start.

## Fix 1 — say precisely what a digest covers, and change no code for it

The re-check reported a second entrance: `fetch` transparently decodes a
`Content-Encoding: gzip` response, so the digest covers the decoded representation
rather than the octets the socket carried. **The Orchestrator rules this a precision
defect in the prose, not an integrity defect, and refuses the prescribed remedy.**

The reasoning, which the correction must reflect: the inventory declares the digest of
a file's content, and the comparison must therefore cover content. Transport
compression is transparent by design — the decoded representation is the file. Refusing
a non-identity `Content-Encoding` would spend more bytes on every vendored fetch and
buy no integrity, because a body that decodes to the declared bytes *is* the declared
file. The implementation is already deliberate here: `#body`'s own comment records that
both bounds count decoded bytes and that content encoding may make either count larger
than the other, which is also why a compressed body cannot slip past the bounds.

Correct every place the prose overstates this — the guide's raw-byte and integrity
wording, and any TSDoc that says a digest covers what the socket carried or the bytes
before decoding. State it exactly: the digest covers the response's decoded content,
before any character decoding; transport encoding is transparent and does not enter
the comparison. Sweep for the overstatement rather than fixing only the sentence this
brief quotes, and report the pattern and scope.

## Fix 2 — the reader's method takes the accurate verb

`.claude/rules/names.md` fixes public methods at one word and requires a verb; `files`
is a noun, and read as a verb it means to file something away, which is the write
connotation the previous rename existed to remove. The re-check is right and the
Orchestrator's earlier choice was wrong.

- The public method becomes `read`.
- The private `#read` is renamed, because the rule constrains public methods only and a
  private compound name is permitted. Pick a compound name that says what that private
  step does in the `#request`/`#body` chain it belongs to.
- Sweep every consumer, test, fixture, and prose mention; report the pattern and scope.

## Scope

- Owned: `src/server/types.ts`, `src/server/Upstream.ts`, `src/server/helpers.ts`,
  `src/bin/CLI.ts`, `src/core/types.ts` if a TSDoc sentence there overstates, the
  owning test files, `tests/setupServer.ts`, `guides/scaffold.md`, and `host.json`
  through regeneration.
- Off-limits: `ROADMAP.md`; a sentence there that a rename makes false is a deviation
  to report. Everything else not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the owned files and any
   `.orkestrel/campaign/` path; report before and after.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — unscoped.
4. Failing-first: a surface-parity row proving `read` is published and `files` is gone
   from the reader's surface, red before the rename and green after, in the shape the
   fix round's own rename rows already use.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project
   <name>` exits 0 for `src:core`, `src:server`, `src:bin`, `config`, and `guides`;
   totals reported.
6. A gzip proof, as an **observation** rather than a behaviour change: drive the
   loopback fixture to serve a vendored body under `Content-Encoding: gzip` whose
   decoded bytes match the inventory's declared digest, and report whether the row is
   accepted. Report the reading; do not change behaviour to alter it.

## Output

The complete diff, per-criterion exit codes and totals including the failing-first
pair, both sweeps' patterns and scopes, the gzip observation's reading, and any
deviation (expected, found, exact evidence, done or not done, at most one short
hypothesis). No process diary.

## Deviation contract

Stop on: the gzip observation showing a body whose decoded bytes match the declared
digest is **refused** (that would be a real defect this brief does not cover); a
`ROADMAP.md` sentence a rename makes false; a criterion unreachable. The private
method's new name and the corrected wording within the writing rules are yours:
decide, record, carry on.
