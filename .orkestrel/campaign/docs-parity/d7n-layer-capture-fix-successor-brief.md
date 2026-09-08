# Correct the returned row-key substitution

Act as builder on Terra under the unchanged d7n-layer-capture-fix-brief.md authorities,
ownership and prohibitions. This is its bounded successor, not a scope expansion.
You are not alone; preserve all other edits. Read the original brief before acting.

Root inspected the returned source. It writes type: 'record' for every row, which
keeps the forbidden type key and destroys the file/command discriminant. The brief
requires a key rename, not a value rename. File rows must have record: 'file'.
Command rows must have record: 'command'. File rows must have path: source, with
no source key. Command rows already have label and must keep it.

Correct the real controls to assert row.record equals 'file' or 'command' as applicable,
row.path equals the actual file path, and row.type and row.source are absent. Run
them red on the returned candidate before fixing it; rerun the same command green.
Do not reclassify this as a new feature. Make no other source change.

The returned report omitted its requested actual diff. Root retained that report,
the actual no-index diff and source under the campaign folder. Do not overwrite them.
Write the successor report to tmp/units/d7n-layer-capture-fix-successor-report.md.
Return the exact command/results and a diff against the retained layer-capture-fix
snapshot. No install, collection, commit, push, whole suite or delegation.
