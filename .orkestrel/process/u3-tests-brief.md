# Unit U3 — tests: fold the suites into `helpers.test.ts` and retire `Retention`'s proofs

## Role and engine

`implementer`. Engine: Opus 5 (native). Routing note: this unit is judgment-bearing — it decides
where a deleted class's hardening lands and writes a regression guard — and its natural objective
route is the Sol `sol` bridge. The Codex bench is dark this session (the `codex` CLI does not
resolve), so Opus 5 runs it. The substitution is recorded.

## Context

Read `/home/user/process/tmp/units/shared-context.md` first; everything in it binds you. Then read
`/home/user/scaffold/.claude/rules/tests.md` in full. It decides this unit.

Units U1 and U2 have already landed. `src/server/execution/` and `src/server/Retention.ts` are
gone; `execute`, `executeSync`, `detach`, and `captureChunk` live in `src/server/helpers.ts`;
`guides/process.md` documents that surface. Read the real `src/server/helpers.ts` and the real
`guides/process.md` before writing. Do not trust this brief over the tree.

## Objective

The whole suite is green, `tests/src/server/execution/` and `tests/src/server/Retention.test.ts`
are gone, and the hardening those files carried is proven where the code now lives.

## Owned files

- `tests/src/server/helpers.test.ts` — edit.
- `tests/guides.test.ts` — edit.
- `tests/src/server/execution/execute.test.ts` — delete.
- `tests/src/server/execution/executeSync.test.ts` — delete.
- `tests/src/server/execution/detach.test.ts` — delete.
- `tests/src/server/execution/` — the directory itself must be gone.
- `tests/src/server/Retention.test.ts` — delete.

## Off-limits

Everything else. Specifically: `tests/setupPolicy.ts` and `tests/policy.test.ts`, which are
scaffold-vendored and which this repository's `AGENTS.md` forbids editing here;
`tests/setupServer.ts`; `tests/setup.ts`; `tests/config.test.ts`; `tests/distribution.test.ts`;
`vite.config.ts`; all of `src/`; all of `guides/`; `README.md`.

If a test cannot be made green without editing a file you do not own, stop and report. Do not edit
source to make a test pass.

## The work

### 1. Fold the three execution suites into `tests/src/server/helpers.test.ts`

Move every `it` from `execution/execute.test.ts`, `execution/executeSync.test.ts`, and
`execution/detach.test.ts` into `tests/src/server/helpers.test.ts` verbatim. Preserve each test's
body, its name, its options, and every comment attached to it — including the sizing rationale
comment on the `executeSync` grandchild test, which explains why its timeout is 40 seconds and
which `.claude/rules/tests.md` § Expensive proofs requires be kept with the proof it sizes.

Each of those three files declares its subject's `describe` block twice. Consolidate each subject
into one top-level `describe` per function, keeping every `it` and its order within the file, first
block then second. Two blocks with one title is accreted drift, not structure.

Append the three blocks after the existing blocks, in the source file's order: `execute`,
`executeSync`, `detach`.

Their relative import of the shared setup module changes depth, from `'../../../setupServer.js'`
to `'../../setupServer.js'`. `helpers.test.ts` already imports `resolveChildFixture` from that
path; merge rather than duplicating the import. `helpers.test.ts` already imports `executeSync`
from `@src/server`; add only the names that are missing.

### 2. Land the hardening `Retention.test.ts` carried

`tests/src/server/Retention.test.ts` proves, in one test, that a truncating stream retains the head
slice, refuses a second chunk once no room remains, ignores a chunk that is not a buffer, and
reports the delivered and retained totals. Delete the file, and land what it proved as a
`describe('captureChunk')` block placed beside the `trimHead` and `trimTail` blocks:

- the head slice: `captureChunk(Buffer.from('hello'), 3)` returns the leading three bytes;
- the no-room refusal: a room of `0`, and a room that has gone negative, both report `undefined`;
- the non-buffer refusal: a string chunk reports `undefined`;
- the whole-chunk path: a chunk that fits its room comes back as the same buffer.

The class's `delivered` and `retained` tallies have no direct equivalent, because the fold derives
that fact rather than storing it. Land it where it is now observable — through `execute` — per the
next section, rather than dropping it.

### 3. Prove the capture bound through `execute`

The owner required that the hardening be applied to `execute` so it stays hardened. Add these to
the `execute` block:

- **The code-point boundary.** A child writing the bytes of `aa€` captured at `limit: 3` returns
  `'aa'`, with no `�` replacement character, and reports `truncated` true. This is the
  regression guard for a defect that was live in the published 0.0.8 artifact, where the same run
  returned `'aa�'`. Name the test for what it proves, not for the defect's history.
- **The bound holds.** The captured text is never longer than `limit` bytes even though the capture
  reads one byte past it, and a run whose output ends exactly at `limit` reports `truncated` false
  while one byte more reports it true. That pair is what the deleted `delivered`-versus-`retained`
  assertion was really about, and it is checkable through the public API.

Use the existing child fixture and `childCommand` helper where they fit. Where you need a child
that writes exact bytes, follow the pattern the existing tests already use for that.

### 4. Retire `Retention` from the parity test

In `tests/guides.test.ts`:

- remove `Retention` from the `@src/server` import list;
- remove the `'Retention'` and `'RetentionInterface'` rows from the `REFUSALS` entry for
  `@orkestrel/process`. That list is compared for exact equality against the neighbouring face's
  live published surface, so a stale row fails the project with a diff that reads as a parity bug;
- remove the two executed assertions of the deleted guide example: the flagship-fence test that
  asserts the bounded stream head and both byte totals, and the later test asserting the same
  example's retained total;
- add the transcription the guide's new `captureChunk` fence requires. Read the fence from
  `guides/process.md` and assert the values its comments claim. `.claude/rules/documentation.md`
  requires that a fence claiming a value be executed, not merely matched as text.

## Deviation contract

Stop and report if a moved test fails for a reason the brief did not anticipate, if the guide's
`captureChunk` fence claims a value the code does not produce, or if green requires editing a file
you do not own. Where the brief leaves a detail open — a test's exact name, the order of two
independent additions — decide it, record it, and carry on.

## Acceptance criteria

Ordered cheap-first. Run each yourself and paste its real output.

1. `test ! -e tests/src/server/execution && test ! -e tests/src/server/Retention.test.ts && echo gone`.
2. `grep -rn "Retention" tests/` returns nothing.
3. `npm run format:check` exits 0.
4. `npm run lint:check` exits 0.
5. `npm run test:policy` exits 0. This is the mirror rule; it is the criterion most likely to catch
   a half-done deletion.
6. `npm run test:src:server` exits 0. The pre-change baseline for the whole `test:src` chain was
   172 passed and 8 skipped across 9 files. Report the file count and the passing and skipped
   counts you get, and account for the difference: the file count falls because four files fold
   into one, and the passing count must rise by the tests you added and fall by none.
7. `npm run test:guides` exits 0.

## Output

What you changed per file; the test counts before and after with the arithmetic that reconciles
them; each acceptance command with its real pasted output; the exact name and body of every test
you wrote fresh rather than moved; every decision you made where the brief left a detail open; and
anything you could not close.

---

# Amendment, after unit U2 landed

Unit U2 wrote `guides/process.md` and reported two obligations its work creates for you, beyond the
`Retention` removals the brief already names. Treat these as part of section 4.

1. **An `EXAMPLES` row for `captureChunk`.** `tests/guides.test.ts` carries an unfenced-TSDoc-examples
   block near line 1269 with rows for `trimHead` and `trimTail`. `captureChunk` is a new public
   export whose example lives in its TSDoc, so it needs a row beside theirs. Read the block and
   match its shape.
2. **A flagship transcription for the new `### Output bounds` fence.** U2 placed a runnable
   `captureChunk` fence in `### Output bounds` rather than under the Surface table, because that is
   the body section explaining the bound. The fence claims two values:
   `captureChunk(Buffer.from('hello'), 3)?.toString('utf8')` is `'hel'`, and
   `captureChunk('hello', 3)` is `undefined`. Transcribe and assert both, in place of the deleted
   `Retention` flagship transcription. Read the fence from the guide rather than from this
   amendment.

U2 also corrected two section attributions in its own brief, which do not change your work but which
you may meet while reading: the `RetentionInterface` row sat in `### Server contracts`, not in
`### Types`, and the `#### RetentionInterface` subsection sat under `## Methods`, not under
`### Server contracts`. All of that is already deleted.
