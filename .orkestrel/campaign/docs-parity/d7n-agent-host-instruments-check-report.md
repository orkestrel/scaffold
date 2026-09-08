# Agent host instruments check

1. H1 — CONFIRMED

Evidence: `tmp/pass/agent-audit-controls.mjs:30-46` bounds the Constants and Validators checks to their named section markers, matches formatter-padded `API | Kind | Shape | Summary` headers, and requires each exact convention sentence. Missing section markers make `section()` return `undefined`, so the checks fail rather than pass vacuously.

2. H2 — CONFIRMED

Evidence: `tmp/pass/agent-audit-controls.mjs:21-26,49-54` matches only exact keyed lines beginning with the backticked `ChannelInterface` or `AuthorityInterface` key and requires `{}` plus. The line split uses `/\r\n|\n/`; the topic-heading, tally, and ending expressions are in `tmp/pass/agent-audit-controls.mjs:56-59` and retain CRLF handling for the ending check.

3. H3 — BROKEN

Evidence: `tmp/pass/agent-host-preflight.sh:8-24` places the HEAD, clean-status, hash, and audit commands inside the condition list of `if { ...; }; then`. Bash suppresses `errexit` for commands in an `if` condition, so a failed `test "$actual" = "$HEAD"`, cleanliness test, or hash prefix test can continue to the later commands. The final status can therefore be supplied by the audit command instead of stopping at the failed precondition. `bash -n tmp/pass/agent-host-preflight.sh` exited `0`; this syntax result does not establish the required runtime stop behavior.

4. H4 — CONFIRMED

Evidence: `tmp/pass/run-agent-host.sh:8-18` rejects a missing brief, present report, present journal or stderr path, and dirty target before launch. The launch at `tmp/pass/run-agent-host.sh:19-21` uses the established `claude` route with `--permission-mode acceptEdits`, `--add-dir`, stream JSON, verbose output, timeout, and the known Git Bash path. It does not set `allowedTools`, `disableSandbox`, or another permission override; its prompt forbids Bash, alternate execution, installation, delegation, commits, and permission changes.

5. H5 — BROKEN

Evidence: `tmp/pass/validate-agent-host.sh:8-34` creates a fresh log directory and records each invoked command and captured exit status, stops when `check()` receives a nonzero status, and invokes read-only checks from the target checkout. It invokes `npm run docs` at line 29 but does not invoke the required no-write directions `npm run docs -- --to guide` and `npm run docs -- --to source` specified by `tmp/units/d7n-agent-converge-fix-brief.md:22,32`. The script therefore cannot record or fail on those required direction checks. `bash -n tmp/pass/validate-agent-host.sh` exited `0`; this syntax result does not establish runtime validation.

Syntax evidence: `bash -n tmp/pass/agent-host-preflight.sh`, `bash -n tmp/pass/run-agent-host.sh`, `bash -n tmp/pass/validate-agent-host.sh`, and `node --check tmp/pass/agent-audit-controls.mjs` each exited `0`.

VERDICT: FAIL H3, H5; outside the claims: none
