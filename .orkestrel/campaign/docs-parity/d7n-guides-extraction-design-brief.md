# Guide extraction and scaffold ownership design

## Subject

Read the canonical checkouts at C:/Users/mikes/WebstormProjects/scaffold and
C:/Users/mikes/WebstormProjects/guide. Do the assignment directly; spawn nothing.
Hold the lane the dispatch names. This design decides the bounded implementation
that replaces the package-local parity engine and the retired-host list.

The owner directs shared guide logic into @orkestrel/guide. Leave inventory choices,
entry wiring, and package-specific executable assertions in tests/guides.test.ts.
Keep test:guides pointing directly at that test file. Add no launcher or docs command.
Default test:guides and npm test are read-only. --to guide makes source authoritative
for matched summaries and examples; --to source makes the guide authoritative.
Report unresolved drift and run assertions against fresh bytes after an explicit write.

The owner rejects RETIRED_HOST_PATHS and optional obsolete-file removal. Scaffold's
supported overwrite/delete mechanism must remove obsolete scaffold-owned files.
Determine the smallest ownership change that does this without a historical path list.
Identify any boundary that would accidentally delete unrelated package-owned scripts.
Do not assume that removal authority includes arbitrary custom files.

The owner also requests review of the entire dirty scaffold diff for alignment and
docs-command remnants. Existing toolchain package.json and staged package-lock.json
edits are approved for inclusion in the product commit after this revision is accepted.
Packing and propagation follow; publication remains held.

## Authority

Read scaffold/AGENTS.md, .agents/orchestration.md, and the applicable names,
typescript, architecture, patterns, tests, workspace, portability, documentation,
writing, and quality rules. Use the orkestrel-align-packages skill and integration
and fleet references, plus the structural orkestrel-harden-package lane with contract,
centralization, and hardening references. Read the canonical guides/README.md and
guides/scaffold.md and Guide's AGENTS.md, guides/README.md, and guides/guide.md.
The owner's instruction supersedes Ruling 34's local-engine placement and retained-path
special case. Preserve the accepted command behavior and direct-checkout constraint.
No new npm package, host imports in core, assertion directives, mocks, compatibility
wrappers, or changes to target-vendored files. Public types precede implementation.

## Evidence

Scaffold base: 369797dcbdfb3b3f2671cc87544ebd256deb76c8 on
claude/orkestrel-npm-audit-deps-14ibta. Read the complete dirty diff and status at
tmp/pass/guides-extraction/design.diff and design.status; these include staged and
unstaged changes. Read tests/guides.test.ts directly, not an obsolete candidate.
Guide canonical source is clean at the captured tip in design.state.
Read Guide src/core/types.ts, index.ts, helpers.ts, shapers.ts, and factories.ts,
and scaffold src/core/constants.ts, compilers.ts, src/server/Materializer.ts,
src/server/types.ts, and the canonical ownership helpers.

The root read the current implementation directly. findDrift returns an untagged
Drift; the scaffold entry reconstructs summary/example identity by validating an
example suffix. Reusable inventory comparison, report formatting, rewrite accumulation,
and generic parity checks are duplicated in the entry. Guide is core-only and takes
pure inventories; it declares Contract and Markdown runtime dependencies, with Vitest
as a development dependency. Do not invent an existing server export or Vitest peer.

Root gates on the predecessor source passed in order. Receipts are under
.orkestrel/campaign/docs-parity/evidence/d7n-guides-test-file-gates-closed.
Permanent real-command cases are in tests/src/core/compilers.test.ts. Preserve default
no-write, strict VITEST=true worker detection, invalid-direction preflight, missing
index/spec refusal, shared-file accumulation, colliding summary/example keys, repeated
titles, absent language, fresh worker import, runner failures, and unresolved drift.
The predecessor audit packet is d7n-guides-test-file-close-* in the campaign directory.
Prior acceptance does not accept the extraction or revised deletion behavior.

## Design question

The owner explicitly directs use of @orkestrel/markdown to simplify Guide helpers
and the extracted logic. Inspect Guide's exact installed Markdown declarations and
canonical Markdown types/guide. Reuse parsed nodes, provenance spans, traversal,
and renderers where semantics match; do not introduce another Markdown parser or
retain a parallel local approximation. Bound changes to the parity/rewrite engine.

Propose the smallest coherent public Guide abstraction that absorbs the duplicated
guide mechanics, including reusable checks, while leaving only package decisions and
real executable examples downstream. Prefer native existing dependency capabilities.
Decide whether pure inventory composition can keep Guide core-only, or whether a
server boundary is necessary; name exact dependency and configuration consequences.
Do not turn the local engine into an exported bag of unrelated forwarding helpers.
State the public types, the minimal caller shape, direct tests, and the boundary
between runner orchestration and guide logic. Keep per-entry source mappings possible.

For scaffold, derive mandatory obsolete ownership cleanup from the existing mechanism,
not another renamed retirement list. State the exact owned population, deletion verb,
group filtering, and behavior of tracked, untracked, changed, protected, and unrelated
files. Surface a genuine owner choice if the requested deletion cannot be inferred
without broadening ownership.

## Output

Return Design, Alternatives, Constraints, Refusals, Measurements, Units, Tensions,
and Risks, following the planner contract's lane sections. Every unit names role,
engine, owned paths, dependencies, and acceptance evidence. This is a read-only design
review: no source writes or command execution. Supply file:line evidence and mark
unknowns, not inferred measurements. Keep reports free of prose counts and model ids.
