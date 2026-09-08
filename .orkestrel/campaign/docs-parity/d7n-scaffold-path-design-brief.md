# Unit d7n-scaffold-path-design — canonical diagnostic filenames

## Role and lane

The planner on the configured Claude subjective route and the analyst on the configured
native objective route read this identical brief independently. Hold the lane named at
launch. Perform the assignment directly and spawn nothing. Read only; run no commands,
write no source, reconcile nothing, and accept nothing.

## Subject and decision

Design the bounded canonical correction for lint diagnostic filename comparison. This
round fixes its ownership, behavior, regression coverage, and instruction home before
implementation. It does not authorize a general path audit or publication.

The canonical root is C:/Users/mikes/WebstormProjects/scaffold at
c87021bdc6367d27463139b293287a586de18240. The primary checkout has owner edits in
package.json and package-lock.json. A clean isolated worktree under tmp/pass/scaffold-path
is being prepared from that commit; no writer may touch the owner edits.

## Authority

Read AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md, tests.md,
workspace.md, names.md, typescript.md, architecture.md, documentation.md, writing.md,
and quality.md. Read the orkestrel-harden-package skill with centralization.md and
contract.md references, and orkestrel-align-packages with fleet.md. Read guides/README.md
and guides/scaffold.md sections Vendored data root and Limits.

## Evidence

Read .orkestrel/campaign/docs-parity/d7n-guide-config-diagnosis.md and the captured
evidence/d7n-guide-policy-observe/observation.json beneath that campaign folder.
The Orchestrator ran the real Windows binary and the isolated failing test. The rule
emits policy(no-mocking); the filename is a file URL; the test compares against a
relative path. The problem is not missing rule execution.

The canonical tests/config.test.ts diagnostic loop calls normalizePolicyPath(filename).
The tests/setupPolicy.ts helper replaces separators and repeated slashes only. Its
documented input is workspace-relative text. It also serves logical policy paths and
scratch target validation, so widening its semantics can change unrelated behavior.
The tests/config.test.ts fixture is driven through process.execPath and the installed
oxlint binary, with cwd set to scratch.path.

The portability rule requires node:path for host path composition and relativization,
and equal normalization of comparison operands. It names pathToFileURL for construction;
it does not explicitly name the inverse fileURLToPath conversion. CLAUDE.md points to
AGENTS.md and the orchestration contract; it is not another coding-rule home.

Node's official URL and path references are the external API authority:
https://nodejs.org/api/url.html#urlfileurltopathurl-options
https://nodejs.org/api/path.html#pathrelativefrom-to
Root called the registered probe tool for a conversion fragment and a URL.pathname
negative control. Its legacy transport refused the stream; no receipt was obtained.
Do not claim that design fragment is proven. The native direct fallback and permanent
regression remain required before acceptance.

## Proposed boundary to attack

Normalize diagnostic filenames at the diagnostic boundary. Decode a file URL with
node:url, resolve native relative names against the known child cwd, and relativize
with node:path before stable display comparison. Normalize expected paths by the same
boundary. Preserve the existing logical-path normalizer and all unrelated callers.
Do not strip to a basename, case-fold to hide mismatches, decode a native percent sign,
catch malformed URLs and silently accept them, or loosen rule/code assertions.

Consider whether this conversion belongs inline or in an exported vendored setup helper
with a direct setup-project test. Keep a helper only for real composition/translation.
The proof must cover native relative and absolute names and file URLs generated from
native paths, including spaces, percent signs, hash characters, and Unicode. A different
file or root must remain distinguishable. A malformed file URL must fail loudly.
Keep real binary integration coverage; never mock the diagnostic producer.

A portability clarification, if needed, belongs in .claude/rules/portability.md only.
Scope it to URL-to-host-path conversion rather than prescribing this test's algorithm.
Its directive must name the proper native API and refuse manual scheme/drive/escape
rewrites. Do not duplicate an existing rule or write history into the rule file.

## Unknowns and constraints

The exact helper scope and Linux reading remain unknown. A separate read-only evidence
map is tracing the consumers and propagation API. Name evidence missing for any proposal.
CI declares Windows and Linux gates; a local Windows run cannot establish Linux green.
The root manifest declares Node >=22.12.0. Do not choose an API above that floor.

No target vendored edits, dependency additions, manifest changes, public-library redesign,
new parser, skips, diagnostic suppression, or publishing. host.json and dist/host become
stale when canonical vendored bytes change; regeneration belongs to root before gates.

## Output

Return your lane's proposed invariant, bounded owned files and tests, tensions, risks,
and any missing measurement. Name the role and engine for proposed implementation and
review units. State the behavior that over-correction would break. Keep prose tally-free.
