# Carry Scaffold's upper-layer preparation

Act as the mechanical builder on the native builder engine. Read AGENTS.md,
orchestration, portability/writing/quality/workspace rules, the publish skill
and wave reference, and guides/scaffold.md ownership/catalog/dependency-floor
sections. Read the retained d7n-upper-layer-plan.md. Work directly. Spawn nothing.
Use apply_patch and preserve other work. Own only the script paths named below.
Do not edit package source, install, run package actions, commit, push,
authenticate, publish or read secrets. Root executes the resulting carriers.

Create tmp/pass/scaffold-upper-action.sh as a successor of upper-layer-action.sh.
Accept scaffold only with the same argument shape. Preserve all captures,
canonical checks, caps and actual-exit handling. Its supported actions are:

- catalog: node dist/bin/main.js catalog
- lock: npm install --package-lock-only --ignore-scripts
- install: npm ci --ignore-scripts
- format: npm run format
- prepublish: npm run prepublishOnly
- check: npm run check
- guides: npm run test:guides
- pins: node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/compilers.test.ts

Reject every other action. Do not run Scaffold overwrite on its own canon.

Create tmp/pass/install-scaffold-upper-tooling.sh as a successor of
install-guide-upper-tooling.sh. Accept scaffold only. Take arguments package,
receipt label, Guide pack label and expected Guide SHA256. Validate safe labels
and the full hexadecimal SHA256. Resolve the Guide archive only under
$SCR/packed/<Guide pack label>/orkestrel-guide-0.0.18.tgz. Require its digest,
extracted package name/version, and extracted dist before the install. Install
only that Guide archive with the same no-save/ignore-scripts/package-lock=false
flags. Never install Scaffold into itself. Preserve metadata/index and record
the installed tree. Compare the complete installed Guide dist with that pack's
extracted dist. Keep npm-ls's overlay mismatch as recorded evidence, not a
failure. Preserve all remaining target and actual-install-exit guards.

Create tmp/pass/pack-upper-layer-final-verified.sh as a successor of
pack-next-layer-final-verified.sh. Accept only the selected upper-layer names
from d7n-upper-layer-plan.md, including Guide and Scaffold. Preserve every gate,
metadata, Git state, archive, baseline download and full packed-dist guard.
For Scaffold, add baseline comparisons for dist/host and dist/bin through the
existing compare function, with raw and whitespace-insensitive/no-map results.
Keep the existing dist/src comparisons. A differing baseline is measured
movement, not a bypass of packed/canonical equality. No other behavior changes.

Run bash -n only. Return each exact predecessor diff and actual syntax exit.
Stop if a required detail is absent or the change would exceed these rules.
