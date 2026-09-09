# Keep fixture identity equal to executable classification

Continue as the native Terra builder under d7n-scaffold-setup-host-fixture-brief.md.
Its authority and ownership remain in force. Root rejects the unbriefed translation
from scripts/sample.sh to scripts/codex.sh only for executable classification.
The previous report remains immutable; write this successor report separately.

Root read matchesExecutablePath in src/server/helpers.ts. It uses the explicit
EXECUTABLE_PATHS membership, not the extension. The original sample.sh instruction
therefore selected an unadmitted executable. The unit should have stopped on that
deviation instead of declaring a differently named member executable.

In createCheckout and buildCheckoutManifest select codex.sh for the scripts root
instead of sample.sh. Classify the actual destination directly with
matchesExecutablePath(destination), with no conditional alias. In the exact
executable-list expectation use scripts/codex.sh. Keep all other predecessor edits.
Do not change the production classifier or its membership.

Own the existing fixture source scope, tmp/pass/scaffold-setup-host-fixture-successor
for saved validation scripts and raw logs, and
tmp/units/d7n-scaffold-setup-host-fixture-successor-report.md. Preserve predecessor
evidence. Run the same isolated setup command and scoped lint/format checks from
a saved script with the existing pass environment. Freeze after the result.
Spawn nothing. Preserve every other dirty or staged path. No installs or Git
mutations. Root's final chain and separate Astra review follow.
