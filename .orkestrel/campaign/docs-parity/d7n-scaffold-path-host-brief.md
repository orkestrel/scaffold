# Unit d7n-scaffold-path-host — isolated canonical host instrument

## Role and engine

Use builder on the configured native mechanical engine. Perform this assignment directly
and spawn nothing. Author the instrument; do not execute its worktree or install steps.

## Objective

Write a root-owned script that creates a clean isolated scaffold worktree and records
the configured-policy regression at its committed dependency closure.

## Context

Read AGENTS.md, .agents/orchestration.md, the portability, writing, tests, workspace,
and quality rules; the orkestrel-align-packages skill with references/fleet.md; and
guides/scaffold.md sections Vendored data root and Tests.

The root is C:/Users/mikes/WebstormProjects/scaffold. Read tmp/pass/pass-env.sh.
Use Git Bash and forward-slash paths. Every shell call is a plain saved-script command.
The root owner changes are package.json unstaged and package-lock.json staged, confirmed
by git status --short. Do not change, stage, install into, or commit that checkout.
The committed baseline is c87021bdc6367d27463139b293287a586de18240.

## Scope

Own tmp/pass/bootstrap-scaffold-path.sh and tmp/units/d7n-scaffold-path-host-report.md.
Everything else is report-only. Do not edit package sources or run generated scripts.
Use apply_patch to author; bash -n may check syntax. No dependency additions, secret
reads, installs, commits, pushes, cleanup, or recursive deletion by this role.

## Execution

Write the following workflow with set -eu and source the exact pass-env.sh path.
Use a fresh mktemp log directory beneath SCR and refuse an existing SCR/scaffold-path.
Resolve the worktree target to its absolute path and verify it is precisely that directory
beneath SCR before creating it. Record root HEAD, status, package.json and package-lock.json
SHA-256 hashes, and the staged lockfile diff hash without printing the lockfile content.
Require HEAD to equal the named baseline; require its branch to be the campaign branch.
Create the worktree with git -C "$SCAFFOLD" worktree add --detach "$SCR/scaffold-path" "$baseline".
Do not use checkout, restore, stash, reset, clean, or branch -f.
Run npm ci --ignore-scripts only in that fresh worktree and log its actual exit. Fail on an
install failure. Record Node and npm versions and npm ls oxlint typescript vitest --depth=0.
Record the fresh worktree's HEAD and status, requiring a clean tracked state.
Run npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary"
there, capturing the full log and its exit without transforming red into green. This is
a baseline observation: print its exit and log directory, and preserve that exit as the
script's final exit. Re-read root owner file hashes and staged diff hash at completion;
compare them with the opening readings and fail on any change. Never remove the worktree.

## Unknowns and deviation

The isolated committed closure may differ from root's installed closure. Record the
actual readings; do not update dependencies to force reproduction. Stop and report a
scope, command, or path-validation conflict without improvising.

## Acceptance and output

The script must refuse an occupied target and wrong baseline, isolate installation,
retain the raw baseline output and exact exit, and preserve root owner edits.
Return the authored paths, syntax-check result, and any deviation. Keep prose tally-free.
The independent check and root execution provide acceptance evidence after this role returns.
