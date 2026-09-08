# Match the docs producer's real summary

Act as builder on the native mechanical route. Follow the original agent-final-host
instrument brief and its required instructions. Perform directly and spawn nothing.
Own only tmp/pass/agent-final-host.sh and the successor report
tmp/units/d7n-agent-final-host-instruments-2-report.md. Preserve the initial snapshot
and preceding report. No package command body, source edit, install, commit, or push.

Root read agent/scripts/docs.ts:447-449. The producer prints a summary line containing
rows read, disagreements found, written, and reported together. It never prints a bare
written line. Correct check_writes to require the exact summary shape:

```text
^rows read: [1-9][0-9]*, disagreements found: 0, written: 0, reported: 0$
```

Reject a missing matching summary and any summary line beginning with rows read: that
does not match the accepted shape. Keep actual command exits authoritative and preserve
all output. Do not alter the producer or relax state comparison. Leave the rest of the
script unchanged. Syntax-check only and report the correction; do not run the instrument.
No prose counts or engine identifiers.
