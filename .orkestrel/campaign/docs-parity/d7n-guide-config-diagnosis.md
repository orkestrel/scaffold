# Configuration gate: diagnostic path mismatch

The diagnostic is present. The real Windows lint binary reports a file URL, while the
vendored config test compares it with a relative filename. The initial description of
an omitted diagnostic was incorrect; this captured output supersedes that attribution.

Root ran the independently checked guide-policy-observe instrument against the installed
oxlint 1.81.0 under Node v24.20.0 on win32. It copied the real config and policy bytes
into fresh temporary fixtures and invoked the package's real binary without a shell.
The minimal vector emitted policy(no-mocking). The complete violation fixture emitted
the same code. Its filename begins with file:///C:/ and names the actual scratch file.
The clean fixture emitted no diagnostic. Raw stdout, stderr, exit, and host metadata
are retained under evidence/d7n-guide-policy-observe.

The failing assertion at guide/tests/config.test.ts:1894 compares entries built at
:1847-1863 with the relative filename expected at :1875. The normalizePolicyPath helper
at guide/tests/setupPolicy.ts:276 replaces backslashes only. It neither decodes a file URL
nor makes an absolute filename relative to the scratch root. Therefore the emitted
diagnostic cannot equal the expected entry, despite the rule having fired.

The scout found the same reached test and helper text in scaffold's canonical copies.
This is not evidence of a missing no-mocking rule or a guide-reader regression. Root's
whole-chain and isolated red runs remain valid failures; do not relabel the gate green.

Correcting the canonical diagnostic-path comparison is outside the current reader and
package documentation units. The target files are vendored and remain untouched. A
canonical change would move scaffold's vendored surface and require release/propagation
coordination. Ask the owner before expanding the campaign or changing its release order.
No publication, target-side patch, dependency substitution, or permission change is authorized.

The scout's inline Node command was a proposal, not an executed host instrument. Root
used the saved and independently checked observation scripts instead. Retain the scout
result unchanged; annotate its diary and tally prose as report-only.
