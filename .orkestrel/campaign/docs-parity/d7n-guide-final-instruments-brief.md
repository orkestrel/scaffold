# Prepare guide validation and packing instruments

Act as builder on the native mechanical route. Perform directly and spawn nothing.
Read scaffold AGENTS.md, .agents/orchestration.md, portability, writing, quality, and
documentation rules, and orkestrel-harden-package with its required references.
Read d7n-guide-heading-fix-brief.md and the retained heading design verdict for scope.
Other agents own guide and agent source. Do not edit or execute against those trees.

Own only scaffold/tmp/pass/validate-guide-heading.sh, pack-guide-heading.sh, and
scaffold/tmp/units/d7n-guide-final-instruments-report.md. Use apply_patch. Run syntax
checks only. No script-body execution, install, commit, push, publication, credential
read, permission change, or discarded work. Do not alter retained instruments.

Every script sources /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh.
Use Bash set -euo pipefail, explicit forward-slash paths, git -C, and a run helper
that logs the exact command, output, and exit while preserving failures. Do not put
precondition guards inside a conditional-list group that suppresses errexit. Use fresh
mktemp directories below $SCR; refuse missing expected prerequisites. All tracked files
must remain unchanged from before the run to after the run; capture and compare git diff
and status in the run directory. Never format, repair, install, clean source, or publish.

validate-guide-heading.sh takes no arguments. Require the campaign working branch in
guide and no staged changes or untracked non-ignored files. Permit only the owned tracked
paths from the fix brief to be dirty. Run from guide, in this order: npm run format:check,
npm run lint:check, npm run check, npm run build, npm test, npm run docs. The build command
is explicitly authorized for the root caller only. No other build, docs direction, or
mutating convergence command belongs in this validator. Preserve a failed exit and print
the log directory even on failure. Capture final diff/status through an EXIT trap without
masking the original command's status; if the chain succeeded but tracked state changed,
fail. Write a success marker only after the chain and state comparison succeed.

pack-guide-heading.sh takes the expected full commit SHA as its sole argument. Refuse
an empty or non-hex SHA, a dirty guide checkout, a branch mismatch, or HEAD differing from
the supplied SHA. Fetch origin, then require origin/main to be an ancestor; stop instead
of merging or rebasing. Recheck cleanliness and HEAD after fetch. Require package name
@orkestrel/guide and version 0.0.18 using node -p, never node -e. Create a fresh directory
under $SCR/packed with mktemp -d, never reuse or overwrite the existing guide tarball.
Run npm run build followed by npm pack --ignore-scripts --pack-destination <new directory>.
Require the exact resulting orkestrel-guide-0.0.18.tgz file. Extract it into a fresh child
directory and compare package/dist/src/core/index.js byte-for-byte with guide's built
dist/src/core/index.js. Print and retain the full commit SHA, package version, tarball
path, tarball SHA256, and dist SHA256. Do not assert a new expected hash: this run measures
it. Preserve the original 2b76b363 tarball. Record the final clean status and unchanged
HEAD. No consumer install is authorized in this instrument.

Report the scripts, guards, syntax commands and exits, and any unresolved specification
conflict. Do not claim package gates or packing ran. No prose counts or engine identifiers.
