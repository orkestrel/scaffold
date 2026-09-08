# Unit d7n-path-artifact-pilot — prove filtered packed-host repair

Act as builder on Terra after root dispatches this file. You are not alone. Own only
C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/path-artifact-pilot/ and the report
tmp/units/d7n-path-artifact-pilot-report.md. Do not edit any fleet checkout, install,
pack, build, run the pilot, commit, push, publish, inspect secrets or delegate.
Root installs the supplied bootstrap tarball and runs the checked pilot.

Read AGENTS.md, .agents/orchestration.md, architecture, typescript, portability, tests,
quality and writing rules; orkestrel-align-packages SKILL.md and fleet/integration
references; guides/README.md, guides/scaffold.md Materializer and Plan contracts.
Read src/core/types.ts Plan and Blueprint, src/server/types.ts MaterializerInterface,
src/core/factories.ts createBlueprint, and the exact installed declarations once root
supplies the artifact. The governing scope is this file plus the campaign's
d7n-layer-supported-map-reading.md and d7n-path-bootstrap-pack-brief.md.

Author a minimal disposable consumer and real mechanism control, not fleet automation.
package.json is private, type module, with no new ecosystem dependency beyond the
owner-authorized scaffold artifact that root installs --no-save --package-lock=false.
No actual tarball path or release pin belongs in this temporary manifest.

Use an entry main.mjs, centralized functions.mjs for exported behavior and constants.mjs
only where shared fixture data needs it. No type assertions, suppression, mocks,
nested assigned functions or custom path parser. Resolve every path through node:path
and fileURLToPath. Load @orkestrel/scaffold and @orkestrel/scaffold/server from this
temporary consumer's installed package, never from source or an old installed sibling.

Root passes an absent absolute output path. Use exclusive mkdir and refuse occupied
output without changing it. All target fixtures and receipts live under that output.
Take the installed package path through its public package.json export; resolve its
dist/host directory there and construct new Materializer({host}).

Use createBlueprint('contract', {src: ['core']}) and Compiler.compile(..., ['tests']).
Fail if no plan. Construct a new Plan with the same blueprint/groups and only artifacts
whose logical path is tests/setupPolicy.ts or tests/config.test.ts. Omit the old hash;
the Plan contract makes it optional. Assert the actual selected paths equal that named
set before any repair. Do not infer a target blueprint or reuse private bin helpers.

Create an inert disposable target with stale literal contents at the selected paths,
and unchanged sentinels at package.json, package-lock.json, tests/policy.test.ts and
outside.txt. These are test data, not a fleet checkout. Record exact before bytes.
Take a fresh Materializer.audit from the filtered plan and call Materializer.repair
with that exact audit. Assert the selected files equal installed packed-host members,
the written set equals the selected paths, and all sentinels remain byte-identical.
Take another fresh audit and repair; assert no selected stale/missing finding and
no write. Destroy Compiler and Materializer through their public lifecycle.

The pilot's negative control must challenge the selection check: pass the compiler's
unfiltered tests plan into that same selection assertion and require its rejection.
This is an outside-membership control, not another implementation of repair. Also
exercise the occupied-output refusal on a real sentinel file and verify unchanged bytes.
Do not build filesystem race, process supervision or generalized provenance machinery.

Retain factual JSON receipts naming the installed package version/path, selected paths,
audit and repair outputs, sentinel before/after readings, and control outcomes. Do not
write counts, healthy/complete fields, publication claims or registry metadata guesses.
No real npm install or pilot run belongs to the builder. Return actual created source,
a root launch recipe with plain script commands, and any unverified assumption.

