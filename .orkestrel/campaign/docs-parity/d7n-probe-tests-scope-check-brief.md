# Check the resumed probe test unit

Act as an independent read-only checker. Read AGENTS.md, .agents/orchestration.md,
the names, typescript, architecture, tests, portability, writing, and quality rules,
the orkestrel-falsify skill and its required references, the probe guide's flagship,
the ported d7n-probe-tests-brief.md and its Windows supplement, and the returned
tmp/units/d7n-probe-tests-report.md. Spawn nothing and edit nothing.

Read the actual diff in C:/Users/mikes/WebstormProjects/probe against 135aab7 and
the final local logs under probe/tmp/d7n-probe-tests. The writer has exited. Try to
break these claims:

- Ownership: only tests/src/server/Probe.test.ts changes. No runtime, vendored,
  manifest, lockfile, shared helper, or public type file changed.
- Meaning: candidate draft text and candidate paths now use function exports under
  helpers.ts where the real policy applies. Controls still fail at their intended
  stage. No assertion value, condition, test name, or skip policy changed to obtain green.
- Evidence: the initial server run is red for the recorded draft-policy refusal and
  the final server, guide, format, lint, and type checks have the outputs the writer reports.
  Name any evidence not retained rather than infer it.
- Scope ruling: the helpers.ts path adaptation remains within the owned test file and
  preserves caller-chosen project, receipt, timeout, stage-order, and portability claims.

Report source or assertion defects separately from report-only counts or pointers.
Do not reopen the unit for report prose alone. This is a landing scope check, not the
full package closure; the original audit items and full gate chain remain pending.
Use git -C with the explicit probe path and forward-slash paths. Read-only commands
only; no installs, suites, edits, commits, pushes, credentials, or discard commands.
Return evidence and PASS/FAIL/UNKNOWN per named claim, with a final verdict in chat.
