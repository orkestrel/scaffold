# Unit V visit, overwrite step — successor to `visit-brief.md`

## Supersedes

Step 2 of `visit-brief.md` for the `test`, `form`, and `terrain` targets. The rest of that brief
stands.

## Role and engine

Orchestrator-owned mechanical step, run in the main session on Opus 5 as a serialized writer in
each target checkout, after the visit unit exits. Audited by the round's audit lanes with the
visit reports as the subject.

## Why the step moved

Both visit units refused at step 2 with the same reading:

```text
TARGET: The target at . carries 2 uncommitted changes. Commit them, or pass --dirty to waive the refusal.
```

The uncommitted changes were the unit's own step-1 re-pin. The brief forbade committing and
forbade `--dirty`, and step 1 necessarily dirties the manifest, so the wave's commit between
step 1 and step 2 is the Orchestrator's. Commit the re-pin, run the overwrite from the committed
baseline, prove it with `npx scaffold audit`, then install, format, and run the gates.

## Standing ruling on `@orkestrel/contract`

The regenerated catalog (this session, `node dist/bin/main.js catalog`, exit 0) moved contract
`0.0.13` to `0.0.15` and process `0.0.8` to `0.0.9`. Contract `0.0.14` and `0.0.15` were published
on 2026-09-01. Every published dependent, `emitter` and `process` included, still declares
`^0.0.13`, so the cascade has not begun.

- A published package's runtime `dependencies` range on contract stays at `^0.0.13` in this
  campaign. Moving one package ahead of its own runtime dependencies publishes out of layer order
  and installs two copies of contract in every consumer. The overwrite's declare step moves the
  range; restore it by hand after the overwrite and record the audit's remaining contract line as
  the uncascaded range, not as drift this campaign owns.
- An unpublished application (terrain) may take the range the overwrite declares, and its gate
  chain measures whether the duplicate copy under its dependencies reads as distinct types.
- The contract cascade is a fleet release wave the user decides. Carry it in the campaign report.

## Acceptance

Per target: the overwrite's summary and exit, the audit's exit and every remaining line with its
owner, the manifest diff, the gate chain read bare after the full install and format.
