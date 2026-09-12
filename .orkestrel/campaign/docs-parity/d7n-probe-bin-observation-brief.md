# Observe Probe's bin claim verdict

Act as implementer directly; spawn nothing. Read root AGENTS.md, orchestration,
portability/tests/quality rules and Probe's bin tests and public MCP/Probe types.
You are not alone. Own only scaffold/tmp/pass/observe-probe-bin-claim.mjs and
scaffold/tmp/units/d7n-probe-bin-observation-report.md. No target edits, installs,
builds, gates, commits or publication. Root runs the instrument alone.

Write a bounded diagnostic script using real MCP client and legacy adapter
imports from the canonical Probe checkout's installed package output. Derive
native paths and import URLs with node:path and node:url relative to the
instrument. Validate canonical Probe's installed MCP version is 0.0.29. Drive
its current built dist/bin/main.js from Probe's canonical cwd through the same
pinned legacy client arrangement in tests/src/bin/main.test.ts.

Accept exactly baseline or constants as the mode. Construct the same buildClaim
case/control and PASSING test as that file, with isolated diagnostic names.
Baseline uses src/core/diagnostic.ts for case/control; constants uses
src/core/diagnostic/constants.ts. These are virtual overlays, never physical
source writes. The exact texts are export const VALUE = 'ok' plus newline,
and export const VALUE: number = 'bad' plus newline. Use the same configured
core project and a test under tmp/probe/bin. The test imports expect/test from
vitest and asserts 2 + 2 equals 4. The control stage is type and the reason is
the source assigns a string to a number.

Create only the required tmp/probe/bin directory. Record the complete returned
verdict JSON and formatVerdict text so a missing receipt's actual case/control
issues are visible. Assert the result is complete and passes isVerdict before
using it. Do not assert a speculative outcome for either mode. Always disconnect
the client and attempt only an empty-directory rmdir; preserve existing contents.
Use a generous bounded client timeout as the bin tests do. Never modify the
registered harness transport or claim this instrument is the registered tool.

Return script/report paths. Root reads the script and runs it only after the
active suite exits. Syntax validation may run; no observation run in the unit.
