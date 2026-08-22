# Unit read-sites report: the consolidation's optional-read sites closed

Role `implementer` route `sol`, engine GPT-5.6 Sol, in the scaffold checkout. Brief:
`unit-read-sites-brief.md`, dispatched on the user's instruction. Returned 2026-08-22;
every criterion green; the one recorded drift was the validators site moving from the
measured :98 to :100 under U3's import, exactly as the brief anticipated.

## Landed

Every optional-read site closed with the ruled composition —
`requireValue(workspace.read(...))` at the origin read, with the `requireValue` import
added from `@orkestrel/test` where absent: the fresh- and target-manifest
`JSON.parse` sites and the `current` and `agent` origin reads in
`tests/src/bin/CLI.test.ts`, the offline-manifest origin read in
`tests/src/bin/main.test.ts`, and the `computeDigest` site in
`tests/src/server/validators.test.ts`. No non-null assertion, no `as`, no change to
`ScratchInterface`. The formatter convergence closed the consolidation's unformatted
hunks in the owned files, `tests/setupServer.ts` included.

## Acceptance evidence

- `git status --porcelain` before and after: identical path sets.
- **Root `tsc --noEmit`: exit 0, no diagnostics — the whole tree, unscoped.**
- Owned-file `oxfmt --check` and `oxlint --deny-warnings`: exit 0.
- `src:bin` `178 passed (178)` exit 0; `src:server` `395 passed | 5 skipped (400)`
  exit 0.

The campaign's standing-red ledger is retired: every later unit's typecheck criterion
returns to the unscoped root run.
