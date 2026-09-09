# Guides entry CLI fixture integration

Root owns this serial correction on Sol after the full gate command terminates.
Read AGENTS.md, the applicable testing, writing and quality rules, the accepted
guides-entry design and the original implementation brief. No executor is writing.

Own only the declaredGuides initializer in tests/src/bin/CLI.test.ts and the count
comment in scripts/guides.ts inside tmp/pass/scaffold-guides-entry. Preserve the
root version, generated inventory, owner manifest and lock, and every assertion.

The full root npm test run reaches the CLI audit fixture and exits 1. Its current
initializer removes --no-cache from the planned command, but the new launcher has
no such flag. The declared command therefore equals the planned command. Correct
the input to a genuinely custom command, node scripts/custom-guides.mjs. Keep the
test's expected question and byte-preservation assertions. This fixture exercises
manifest auditing and does not execute that inert custom command.

Replace the scripts/guides.ts count comment with equivalent count-free wording.
Do not change the entry's behavior. Regenerate host.json through the canonical
build after that vendored comment edit. This is an authored-byte change, not an
edit inside a fleet target.

Run the exact CLI test directly before and after the initializer correction.
Retain root's full-run failure and its independent repeat. Run the ordered package
gates against the corrected candidate. Capture the frozen diff and supply this
root-authored slice to the independent Opus review with the implementation.

No installation, publication, primary product edits or unrelated cleanup is owned.
Keep output logs and the report in the campaign. No prose counts.
