# Measure the foreign result reading

Act as native Terra builder. Own only tmp/pass/probe-guide-result-reading.mjs
and tmp/units/d7n-guide-result-reading-report.md. Spawn nothing. Preserve frozen
Guide and Scaffold product files. Read AGENTS.md, .agents/orchestration.md, patterns,
tests, quality, portability and writing rules, and the Guide server types/helper.
Use apply_patch. Author the specified root-run runtime instrument; run syntax only.

Import matchesGuideResult from canonical Guide src/server/helpers.ts through
native path/URL resolution relative to this instrument. Node24 strips the type-only
imports; the helper's runtime imports are native modules. This is a source-behavior
probe, not an installed-package or TypeScript assignability claim.

Call the real helper with inert external-result data. Include a stable passed
module, a stable failed module and an empty module array as controls. Each module
has a real state method returning its declared state. Include an adversarial
result object whose testModules getter returns a failed module on its initial
read and an empty array on later reads, with unhandledErrors an empty array.
Record the helper result and property reads. The helper must return false for the
adversarial result and must read that foreign property only on arrival. Do not
mock a runner or replace a project-owned method. These are boundary data objects,
not an implementation of Vitest.

Use a module-scope class for the getter's private read state, not an exported or
nested named helper. Print JSON evidence containing stable control results and
the adversarial result/reads. Use process.exitCode = 1 when any expected property
fails; do not catch setup/import errors as product failures. Add no product tests
or package files. Root executes and retains the source and raw result. Return the
authored path and syntax receipt, then freeze.
