# d7n path artifact pilot report

## Status

Authored the disposable public-API pilot under `tmp/pass/path-artifact-pilot/`.

## Created source

- `package.json` declares a private ESM consumer without a tarball path or release pin.
- `constants.mjs` holds the selected paths, stale fixtures, and unchanged sentinels.
- `functions.mjs` resolves the installed package through its public package export,
  creates the filtered plan, drives `Materializer.audit` and `Materializer.repair`,
  checks the negative selection and occupied-output controls, and retains JSON receipts.
- `main.mjs` accepts the absent absolute output path and invokes `run`.

## Root launch recipe

Run these plain commands from Git Bash after root supplies the bootstrap tarball:

```bash
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/path-artifact-pilot
npm install --no-save --package-lock=false <bootstrap-tarball>
node main.mjs /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/path-artifact-pilot-output
```

## Validation

`node --check tmp/pass/path-artifact-pilot/constants.mjs` exited `0`.

`node --check tmp/pass/path-artifact-pilot/functions.mjs` exited `0`.

`node --check tmp/pass/path-artifact-pilot/main.mjs` exited `0`.

`git diff --check -- tmp/pass/path-artifact-pilot tmp/units/d7n-path-artifact-pilot-report.md`
exited `0`.

## Unverified assumption

The pilot uses the accepted isolated `0.0.63` declarations for `Compiler`,
`createBlueprint`, and `Materializer`. The supplied packed installation has not yet
been resolved from this temporary consumer, so its package path, version, and runtime
receipt shape remain for root's execution check.
