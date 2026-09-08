# d7n guide bootstrap pack report

## Status

Authored the bootstrap pack runner and its package-field entry. Packing remains unrun.

## Changed paths

- `tmp/pass/pack-guide-bootstrap.sh`
- `tmp/pass/read-package-field.mjs`

## Exact runner difference

The successor changes its identity and temporary-directory labels from `heading` to
`bootstrap`. Its package reader invokes `node "$SCR/read-package-field.mjs"
"$GUIDE/package.json" "$1"` instead of `node -p`. The expected-SHA argument remains
an input, not a hardcoded source tip. The clean, branch, expected-SHA, fetch, ancestry,
build, pack, extraction, digest, and final-state logic match the predecessor.

## Read controls

`node --check tmp/pass/read-package-field.mjs` exited `0`.

`node tmp/pass/read-package-field.mjs C:/Users/mikes/WebstormProjects/guide/package.json name`
exited `0` and printed `@orkestrel/guide`.

`node tmp/pass/read-package-field.mjs C:/Users/mikes/WebstormProjects/guide/package.json version`
exited `0` and printed `0.0.18`.

`node tmp/pass/read-package-field.mjs C:/Users/mikes/WebstormProjects/guide/package.json scripts`
exited `1` with `Expected name or version as the package field.`

`C:/Users/mikes/scoop/apps/git/2.55.0.5/bin/bash.exe -n tmp/pass/pack-guide-bootstrap.sh`
exited `0`.

## Unrun work

The pack runner was not executed. No build, installation, package checkout edit, Git mutation,
or publication ran.
