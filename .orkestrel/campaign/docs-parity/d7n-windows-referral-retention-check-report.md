# Referral retention checker

PASS: the final amendment closes the terminal-event hazard. assert-journal.mjs parses
the final nonblank JSONL line, rejects missing or malformed events, rejects arrays,
null, and non-objects, and requires event.type to equal result. Evidence:
tmp/pass/assert-journal.mjs:5.

retain-referral.sh preflights and retains the amendment brief and helper. It invokes
the helper before projection and optional checkout reads. Its set -eu propagates
helper failure. Evidence: tmp/pass/retain-referral.sh:40.

The checker's bash -n and node --check runs exited 0. The Orchestrator then ran
retain-referral.sh probe; it exited 0 and retained the completed result projections,
probe diff and status, and the named runtime logs. Raw provider journals remain in tmp.

The Orchestrator retained the returned claims with prose-only normalization and added
the runtime receipt. The substantive checker verdict remains unchanged.
