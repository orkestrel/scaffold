# Unit catalog — report (2026-09-01)

Command, run in `/home/user/scaffold` with `dist/` fresh against `src/` (no `.ts` newer than
`dist/bin/main.js`):

```text
node ./dist/bin/main.js catalog --target .
3 written, 9 unchanged, 0 removed in ..
50 published, 10 guides fetched, 0 no longer listed.
exit 0   (real 0m5.049s)
```

Files the command wrote, each ruled on:

- `.claude/agents/orkestrel.md`: the table's `contract` row moves `0.0.13` → `0.0.15` and the
  `process` row moves `0.0.8` → `0.0.9`. No other row moved; the `Layer` column is unchanged
  against the column the plan used, so the wave schedule stands. Dependency ranges in the table
  still name `^0.0.13` and `^0.0.8` because the registry copies of every dependent predate the
  campaign's re-pins, which are unpublished.
- `guides/contract.md` and `guides/process.md`: vendored dependency guide mirrors refreshed from
  the registry copies at 0.0.15 and 0.0.9. Fetched bytes, not authored prose; accepted as the
  mirror refresh `.claude/rules/documentation.md` prescribes.

Acceptance: 1 met (output quoted, exit 0); 2 met (contract and process are the moved rows, as
predicted); 3 met (no package changed layer); 4 met (the files are the three named).
