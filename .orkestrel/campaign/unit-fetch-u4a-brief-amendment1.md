# Unit fetch-U4a, amendment 1: the scope criterion

This amendment supplements `unit-fetch-u4a-brief.md` after its deviation stop. The
original stands except where this file changes it. Written 2026-08-22, before the
re-dispatch.

## What was wrong

The original's criterion 1 read "`git status --porcelain` lists only the owned files"
beside the claim "The tree is committed and clean at your start". Both were false when
written: the brief file itself and a sibling amendment were untracked campaign
artifacts, so the criterion was unreachable on arrival. The unit was right to stop; the
defect is the Orchestrator's, in a brief that asserted a state it had just changed.

## The amended criterion 1

`git status --porcelain` adds nothing beyond the owned files and any path under
`.orkestrel/campaign/`. That folder is the Orchestrator's campaign record: files appear
there while a unit runs, none of them is yours, and none of them is a source, test, or
guide file. Report the before and after sets as the original asks.

The tree is committed and clean at this dispatch, verified: `git status --porcelain`
returned nothing at commit `210ac02`.

## Everything else

Unchanged: the three ruled fixes, their measured evidence, the owned set, criteria 2
through 5, the output shape, and the deviation contract.
