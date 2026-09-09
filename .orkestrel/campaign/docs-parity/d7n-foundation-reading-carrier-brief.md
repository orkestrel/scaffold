# Unit d7n-foundation-reading-carrier — release readings

## Role and engine

Builder on Terra. Perform the assignment directly and spawn nothing.

## Objective

Author a root-run script to retain fresh registry and Git readings for the initial layer.

## Law and host

Read the authority named in d7n-foundation-tooling-carrier-brief.md and d7n-foundation-action-carrier-brief.md. Source pass-env.sh, use Windows Git Bash, forward-slash paths, and explicit git -C. No role installs, runs network mutation, commits, pushes, publishes or reads credentials. Root runs the script.

## Scope

Own only tmp/pass/read-foundation-release.sh and tmp/units/d7n-foundation-reading-carrier-report.md. Other work is report-only. Preserve others' edits.

## Execution

Take an unused evidence label, validate it, and create $SCR/<label>. Save node --version and npm --version, using the environment's PATH. For each of codec, contract, msg, sse, test, guide, and scaffold, run npm view @orkestrel/<package> --registry=https://registry.npmjs.org/ --json with a60s cap and actual exit/stdout/stderr files. Preserve full packument output as raw evidence. Stop on a failed registry reading.

For each canonical repository, run git -C <path> fetch origin with a60s cap; retain original exit/stdout/stderr. Run branch --show-current, rev-parse HEAD, rev-parse origin/main, merge-base --is-ancestor origin/main HEAD, and status --porcelain=v1 --untracked-files=all separately into named files. An ancestry or dirty result is evidence, not an automatic merge or failure. Contract's native writer may have owned test changes while these read-only commands run; never alter or reject that expected work. Copy each package.json into its own evidence directory; do not copy package directories or node_modules.

Do not re-pin or compute bumps. Do not touch metadata or index. Do not read .npmrc or auth files. Return syntax proof and paths. Root interprets the registry candidate availability and downstream graph from this evidence.

## Acceptance

Each package has attributed registry and branch evidence or an exact failure. Script syntax passes and no product path is written. Do not run it yourself.
