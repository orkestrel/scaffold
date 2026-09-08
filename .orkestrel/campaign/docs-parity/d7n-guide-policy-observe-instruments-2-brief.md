# Preserve and parse the actual diagnostic envelope

Act as builder on the native mechanical route. Follow the original observation brief,
its required instructions, and the checker report. Perform directly and spawn nothing.
Own only tmp/pass/guide-policy-observe.mjs and
tmp/units/d7n-guide-policy-observe-instruments-2-report.md. Preserve the original snapshot
and preceding report. No body execution, package write, install, commit, or push.

Correct O2. The real config test parses an object containing diagnostics, not an array
at the root. Validate the parsed value as a non-null object and validate its diagnostics
property as an array, matching guide/tests/config.test.ts:1847-1863. Do not change the
fixture vectors, copied config, binary invocation, timeout, or the shell wrapper.

Persist fixture roots and binary/host metadata before invoking the binary. For each
named run, persist raw stdout, stderr, status, signal, and a serialized spawn error
before throwing or parsing. Give the minimal, complete-violations, and complete-clean
runs distinct evidence files under the fresh output directory. Use exclusive file
creation so an accidental repeated output path refuses to overwrite prior evidence.
After parsing succeeds, retain code, filename, and message projections. An ordinary
lint exit with valid output stays observation data; a spawn error, timeout/signal,
empty stdout, malformed JSON, or missing diagnostics array remains a nonzero collection
failure. Raw evidence must survive every such failure.

Keep the final summary only for successful collection, without calling the config gate
green. Run node --check only and return the successor report. No prose counts or engine IDs.
