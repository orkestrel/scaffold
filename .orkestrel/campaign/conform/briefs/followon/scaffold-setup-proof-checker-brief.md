# Checker lane, round 1 — unit scaffold-setup-proof (a follow-on in /home/user/scaffold)

## Role and engine

`checker` on Cursor Grok 4.6, read-only, in `/home/user/scaffold`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject and claims

Read `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/scaffold-setup-proof-audit-brief.md` in full: its § Subject names every file, its § Standing conditions bind every sweep, and its § Claims are the numbered claims. This lane holds claims 1, 3, 4, 6, 7, and 9 — the mechanical ones. Mark claims 2, 5, and 8 `not held`. For claim 1, derive the export list yourself with `grep -nE '^export' tests/setup.ts tests/setupServer.ts` and match each against the proof files and the report's table; name every export the table omits and every table row whose `file:line` does not open on the case it names.

## Output

As the audit brief's § Output, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).
