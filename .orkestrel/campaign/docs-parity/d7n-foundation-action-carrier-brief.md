# Unit d7n-foundation-action-carrier — root action recorder

## Role and engine

Builder on Terra. Perform the assignment directly and spawn nothing.

## Objective

Author a bounded root command recorder for an individual canonical foundation package.

## Context and law

Read the same authority as d7n-foundation-tooling-carrier-brief.md. The root integrated its predecessor's inline Node validation into the retained read-package-field.mjs call before running. Do not introduce node -e or node -p. Windows Git Bash; forward-slash paths; source pass-env.sh. Do not run installs, gates, mutations, or git writes yourself. Root takes all execution evidence. Scope is preparation, not publication.

## Scope

Own only tmp/pass/foundation-action.sh and tmp/units/d7n-foundation-action-carrier-report.md in scaffold. You are not alone; do not revert others' edits. Canonical repositories, campaign record, and other instruments are report-only.

## Execution

Accept <package> <action> <unused-label> <cap>. Permit package contract, codec, msg, sse, or test only. Validate manifest name with read-package-field.mjs. Require fresh output directory $SCR/<label> and safe label. Capture head, branch, git status --porcelain=v1 --untracked-files=all, git diff HEAD --binary, git ls-files --stage, and manifest/lock SHA256 before and after. Use git -C always. Change shell directory to canonical $FLEET/<package> before the selected command. Save stdout, stderr and the original exit; print only evidence path, action and exit. Preserve the command's nonzero exit. Cap via timeout --kill-after=15s with root-supplied duration; reject absent duration. Do not special-case an exit as green.

Map each allowed action to its actual command:

- native: node --experimental-strip-types tests/guides.test.ts
- guides: npm run test:guides
- to-guide: npm run test:guides -- --to guide
- to-source: npm run test:guides -- --to source
- prepublish: npm run prepublishOnly
- format: npm run format
- lock: npm install --package-lock-only --ignore-scripts
- install: npm ci --ignore-scripts
- audit: node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline
- overwrite: node node_modules/@orkestrel/scaffold/dist/bin/main.js overwrite --offline
- help: node node_modules/@orkestrel/scaffold/dist/bin/main.js --help

Do not run a command before or after its selected action beyond evidence collection. No commit, push, auth, upload, cleanup, fixture copy, repair workaround or broad package loop. Root decides when an action is safe and observes the actual generated diff before accepting it.

## Acceptance

Return the script, syntax exit and unknowns. Syntax checking only. The root reads the script before executing. Each action has an exact bounded log and does not hide a nonzero result. No secret files are read or copied.
