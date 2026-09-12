# Preserve CRLF text in Probe helpers

Read the native-entry and helper-correction briefs and current applicable
authority. Execute directly; spawn nothing. You are not alone. Own only
probe/tests/setupServer.ts, probe/tests/setupServer.test.ts and
scaffold/tmp/units/d7n-probe-native-crlf-report.md. Preserve all other edits.
No installs, tree-wide gates, builds, commits or pushes.

Root reproduced the independent report's exact LF/CRLF vector with the real
helpers in tmp/pass/probe-helper-line-endings.mjs. Exit 1 and the actual result
are retained in d7n-probe-helper-line-endings-result.md. Equivalent present CRLF
claim and heading text returns undefined; LF succeeds.

Apply the review's bounded correction: normalize LF/CRLF before claim and section
line matching. In extractClaimLiteral split on /\r\n|\n/ and keep its LF joined
return. In extractProbeSection derive text with CRLF replaced by LF and use that
derived text for its searches and slices. Leave bare carriage returns alone.
Keep real absence undefined and keep the interface-property and Guide-backed
comment extraction helpers unchanged.

Add focused LF/CRLF parity cases using the exact root instrument inputs and
assertions to the existing setup test file. Preserve the indentation test and
absent-input assertions. No CLAIM, DIGEST, example, workload or source API change.
Root reruns the exact failing instrument, setup cases and native parity. This is
the independent review's prescription, not a new helper design.

Return paths and report; do not run package commands.
