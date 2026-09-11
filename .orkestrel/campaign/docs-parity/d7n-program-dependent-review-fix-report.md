# Program dependent review fix

## Status

PASS. The Program guide now qualifies repeatability by stable inputs, options and
dependency behavior. The mutable-label counterexample reproduced before the prose
changed. No runtime, contract, generated, metadata, configuration or setup file was
edited in this correction.

The execution-only brief qualifies the immutable independent report's FENCES and
CLOSING findings. Those table and sibling fence transitions are outside the ported
PF6 heading-only criterion. This correction adds no fence lead-ins and leaves the
immutable report unchanged.

## Counterexample

The ignored instrument
`C:/Users/mikes/WebstormProjects/program/tmp/d7n-program-dependent-fix/mutable-label-counterexample.mjs`
imports the built Program API and the installed public Qualifier and Reason APIs. It
creates an applied authority rule, executes the same definition and subject, changes
only the caller-owned `labels` record, and executes again.

Command:

```powershell
& 'C:/Users/mikes/scoop/apps/git/current/bin/bash.exe' -lc 'source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh && bash tmp/d7n-program-dependent-fix/mutable-label-counterexample.sh'
```

Exit: `0`

Stdout:

```text
{"definition":"mutable-label","subject":"subject","initial":"Initial status","changed":"Changed status"}
```

Stderr was empty. The retained receipt files are
`mutable-label-counterexample.stdout.txt`,
`mutable-label-counterexample.stderr.txt` and
`mutable-label-counterexample.exit.txt` in the ignored unit directory.

## Changed hunk

`C:/Users/mikes/WebstormProjects/program/guides/program.md:16` now reads:

```text
`Program` executes synchronously. Its result is repeatable only while inputs and
options stay unchanged and dependency behavior remains unchanged and deterministic.
```

This replaces the universal same-definition-and-subject result claim. The review-fix
delta is confined to this paragraph in `guides/program.md`; ignored proof instruments
carry the commands and receipts.

## Scoped validation

Command:

```powershell
& 'C:/Users/mikes/scoop/apps/git/current/bin/bash.exe' -lc 'bash tmp/d7n-program-dependent-fix/review-fix-checks.sh'
```

Exit: `0`

The scoped format command was:

```text
npx oxfmt --config .oxfmtrc.json --check guides/program.md
```

Its result was `All matched files use the correct format.` with exit `0`.

The native guide command was:

```text
node --experimental-strip-types tests/guides.test.ts
```

Its result was `Test Files 1 passed (1)` and `Tests 29 passed (29)` with exit `0`.
The retained stdout, stderr and exit receipts use the `review-fix-format` and
`review-fix-native` prefixes in the ignored unit directory.

## Preserved state

The working tree still contains the returned README, guide, source-comment and native
guide-entry changes plus root's package, config and setup repair. This correction did
not rewrite or revert those paths. No shared-file patch is required.
