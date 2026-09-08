# Contract Abort staging proposal

The runner stages the measured Abort commit in an exclusive temporary directory. It
installs the accepted Contract and Guide tarballs only in that copy, packs Abort from
the copy, and drives ESM and CommonJS consumers against the resulting tarballs.

The runner records canonical Abort status, binary diff, manifest hash, and lock hash
before work. On a successful run it compares each record after work and fails on
drift. Package execution is unrun.

Syntax checks exited `0`:

- `bash -n tmp/pass/contract-abort-stage/run.sh`
- `node --check tmp/pass/contract-abort-stage/mutate.mjs`
- `node --check tmp/pass/contract-abort-stage/inspect.mjs`
- `node --check tmp/pass/contract-abort-stage/smoke.mjs`
- `node --check tmp/pass/contract-abort-stage/smoke.cjs`

Root invocation: `bash tmp/pass/contract-abort-stage/run.sh`
