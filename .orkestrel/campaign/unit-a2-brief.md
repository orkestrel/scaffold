# Unit A2: capability gates and link proofs on a junction host

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing.

## Objective

Rename the symlink capability axis, reassign every gated proof to the mechanism it actually
needs, and land the new proofs the `createLink` fallback owes — so the link family runs on this
Windows host instead of skipping.

## Context

Authority, all inside the test checkout: `AGENTS.md`; `.claude/rules/tests.md` (skips cite the
probed mechanism, never a platform; performance.now for elapsed intervals),
`.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
`.claude/rules/writing.md`. Guide `guides/test.md` is read-only context (unit A3 owns it).
Skill: none.

Unit A1 (complete, in the working tree) added `createLink(path, source)` to
`src/server/helpers.ts` and routed the factory's `link` through it. The fallback contract,
fixed by the reconciled design round and measured on this host (Windows 11, Node v24.18.1, NTFS,
no Developer Mode, 2026-08-21):

- Untyped `symlinkSync` first; only `EPERM` enters fallback; the source is resolved against the
  link's own directory; an existing directory gets a junction; an existing non-directory
  rethrows the original `EPERM` and leaves nothing at the target; a missing source gets a
  dangling junction.
- On this host: file symlinks all `EPERM`; junctions to directories work and satisfy
  `lstatSync().isSymbolicLink()`; a junction onto an occupied target throws `EEXIST`; `rmSync`
  removes a junction and leaves its destination; a dangling junction reports "exists but
  unreadable"; stored junction text is the resolved absolute path.
- Node documents the `type` argument as ignored off Windows, so `symlinkSync(..., 'junction')`
  on POSIX creates an ordinary symbolic link.

Current gate state: `tests/setupServer.ts:38-43` exports `SYMLINKS` (a `'dir'` symlink probe);
the whole `link` family gates on it and skips here. The suite baseline on this host is
`153 passed | 26 skipped` for `test:src`, of which `src:server` is `60 passed | 26 skipped`.

## The design, fixed by the reconciled round

1. In `tests/setupServer.ts`, REPLACE `SYMLINKS` with:
   - `FILE_LINKS`: in the probe directory, write a file, `symlinkSync(target, link, 'file')`,
     and return whether the file reads back through the link. False on this host.
   - `DIRECTORY_LINKS`: make a directory holding a marker file,
     `symlinkSync(target, link, 'junction')`, and return whether `lstatSync(link)` reports a
     symbolic link AND `statSync(link)` reports a directory AND the marker reads back through
     the link. True on this host and on POSIX.
   Each probe's TSDoc names the mechanism and what refusal means, per the existing probes'
   idiom. `POSIX_MODE`, `CASE_SENSITIVE_FS`, and `RAW_BYTE_NAMES` are untouched.
2. In `tests/src/server/factories.test.ts`, reassign gates:
   - The `link` describe (`:455`) becomes `describe.runIf(DIRECTORY_LINKS)`.
   - Inside it, the two proofs that link an existing FILE and read back (`:456-471`,
     `:473-489`) become `it.runIf(FILE_LINKS)`.
   - The dangling proof, the `EEXIST` proof, the planted-destination proofs, and the
     escaping-target proof run under the block gate with no extra gate.
   - The `remove`-through-link proofs (`:668-694`, `:696-714`, `:716-732`), the
     root-replacement proof (`:144-167`), the empty-target proof (`:189-208`), and the
     linked-parent proof (`:849-865`) become `it.runIf(DIRECTORY_LINKS)`; where their fixtures
     create links with raw `symlinkSync(..., 'dir')`, the fixture type becomes `'junction'`.
     The empty-target proof's `EEXIST` expectation holds here through the fallback (measured).
   - `resolves an empty target to the allocation root` keeps its non-link member assertions
     ungated only if they are separable without contortion; otherwise the whole proof takes
     `DIRECTORY_LINKS` and you record the choice.
3. In `tests/src/server/helpers.test.ts`, reassign the `readInventory` family: proofs whose
   fixture links are `'dir'` symlinks convert to `'junction'` fixtures under
   `it.runIf(DIRECTORY_LINKS)` (their subject — refusal and skip of linked entries — is exactly
   what a junction exercises on this host); proofs needing `'file'` symlink fixtures
   (`:254-270`, `:387-399` in part) gate on `FILE_LINKS`, splitting a mixed proof only where
   the split is clean. The `removeTree` live-cwd proof keeps its own applicability condition
   unchanged apart from the gate rename. Verify each site; where a conversion changes what the
   proof proves, keep the symlink form gated on `FILE_LINKS` (a `'dir'` symlink needs the same
   privilege as a `'file'` one on this host) and record it.
4. New proofs:
   - In `helpers.test.ts`, a `createLink` unit family: directory source absolute; directory
     source relative (resolved against the link's directory — ungated, passes on every host);
     missing source (dangling; `lstatSync` link, read refused) under `DIRECTORY_LINKS`;
     occupied target `EEXIST` passthrough under `DIRECTORY_LINKS`; file-source refusal under
     `it.runIf(!FILE_LINKS && DIRECTORY_LINKS)` asserting the throw AND that nothing exists at
     the target afterwards.
   - In `factories.test.ts`, under the link describe: `it.runIf(!FILE_LINKS)` — `link` with an
     existing file source throws and `has(target)` stays false; and
     `it.runIf(!FILE_LINKS)` — the stored value for a fallback link is an absolute path
     (`isAbsolute(readlinkSync(...))`), which backs the guide's claim.
   Name every test for what it proves, never for a control label or a platform.

## Unknowns

Whether every `readInventory` fixture converts cleanly (question 3 names the fallback). Report
per-site decisions.

## Scope

- Owned: `tests/setupServer.ts`, `tests/src/server/factories.test.ts`,
  `tests/src/server/helpers.test.ts`.
- Off-limits: `src/**`, `guides/**`, `package.json`, `vite.config.ts`, every other test file.
  If `SYMLINKS` is imported anywhere beyond the two owned test files, stop and report (a grep
  on 2026-08-21 found no other importer).
- Standing conditions, expected: `package.json`/`package-lock.json` dirty (user);
  `src/server/helpers.ts`, `src/server/factories.ts`, `src/server/types.ts` modified (unit A1).
  Leave all of them.
- No commits, installs, or git checkout/restore/stash/reset/clean. Scoped validation only.

## Execution

You perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. `npx oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings` on the owned files exits 0.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server`
   on this host: every proof in the `link` describe RUNS except those gated `FILE_LINKS`; the
   converted `readInventory` and `remove`/root/parent proofs run; no proof fails; report the
   raw totals and name every remaining skip with its gate. The pre-change baseline is
   `60 passed | 26 skipped`.
6. Report, as observations: which proofs moved from skipped to passing, and any proof whose
   conversion you refused with the reason.

## Output

Return: the diff; raw output and exit code per criterion; the skip inventory with gates; the
per-site conversion decisions; any deviation. No process diary.

## Deviation contract

A proof that fails after conversion for a reason that is not a wrong gate or a fixture type —
that is, a genuine behavioural surprise in `createLink` or the factory — stops the unit with
the exact failure; do not patch `src/**`. Ancillary choices (test names, helper placement
inside a file, whether a mixed proof splits) are yours: decide, record, carry on.
