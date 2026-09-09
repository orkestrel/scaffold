# Foundation supported final preparation carrier

Act as builder on Terra. Read scaffold/AGENTS.md, orchestration, portability,
writing and quality rules, orkestrel-publish and its wave/window references,
and Ruling30. You are not alone. Own only tmp/pass/finish-foundation-native.sh
and tmp/units/d7n-foundation-finish-carrier-report.md. Use apply_patch. No package
edits or command execution beyond bash syntax. No install, commit, publish,
authentication, secret access, worktree or copy. Root runs the instrument.

Write a root-run bash carrier taking a foundation package and its full expected
source commit. Allow codec, contract, msg, sse and test. Source pass-env.sh and
use canonical FLEET/<package>. Require a clean tracked/untracked tree, expected
HEAD, campaign branch and correct name. Require every output label fresh so an
old reading cannot be overwritten. Never commit, push, switch or fetch here.

Use the accepted foundation-action.sh wrapper for overwrite, audit, lock,
install, format and prepublish. Preserve those per-action stdout/stderr/exits
and metadata/diff/index captures. Labels are d7n-<package>-final-overwrite,
-final-audit, -final-lock, -final-ci, -final-format, -final-prepublish.

Before mutation, compare the catalog agent body with the installed floor using
git -C <target> diff --no-index --ignore-space-at-eol
'--ignore-matching-lines=^|' -- <installed host claude/agents/orkestrel.md>
.claude/agents/orkestrel.md. If it differs, stop for root migration; do not
delete it. Record the comparison.

Run full overwrite --offline with cap180s. Require exit1 and the exact named
note "The catalog step did not complete: USAGE: 'catalog' does not take --offline."
in its stderr. Then require offline audit exit0, cap120s. Do not waive any other
failure. Use no --dirty option.

Remove only the extra maintainer docs script key with npm pkg delete scripts.docs
from the canonical target, recording stdout/stderr/exit. Do not hand-edit vendored
content. Then run the installed Scaffold catalog command with cap180s; it refreshes
registry ranges and mirrors. Require exit0. Refresh the accepted canonical Guide
mirror through the existing mirror-parity-guide.mjs instrument. Compare the target
Guide and Scaffold mirrors with canonical guide/guides/guide.md and scaffold/
guides/scaffold.md. These scripts consume the accepted Scaffold mechanism; never
copy a target-owned guide by hand.

Run lock regeneration cap600s, then full ci --ignore-scripts cap600s. Reinstall
the identified accepted no-save tooling through install-foundation-tooling.sh
with label d7n-<package>-final-tooling-installed. Run format cap120s, then the
package's actual prepublishOnly cap900s. Run pack-foundation-final.sh with label
d7n-<package>-publish-final. No parallel package gates inside this carrier.

Add a fresh d7n-<package>-final-visit evidence directory for operations not covered
by the wrappers. Record exact commands, exits, before/after head, branch, status,
diff and manifest hashes. Stop at the first unexpected failure and preserve all
evidence. Require HEAD and branch unchanged at completion; do not require the
expected generated edits to disappear. Never declare release acceptance yourself.

Use forward-slash paths and git -C everywhere. Keep multistep commands inside
the saved script. Capture failed status inside else, never after an if statement.
Root separately reviews metadata ranges and final diff before committing.
