# Unit d7n-scaffold-path-fix deviation report

## Outcome

Stopped before edits because the required pre-fix command did not reach Vitest.

## Expected

The command `npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary"` was expected to collect the named real-binary case and report its existing filename-comparison failure.

## Found

The npm command exited `1` before Vitest started. npm parsed the forwarded `-t` flag as an npm configuration flag and returned `EUNKNOWNCONFIG`. No failing test count exists because the test runner did not execute.

## Evidence

The exact command output was:

```text
npm warn "loads every configured policy rule through the real binary" is being parsed as a normal command line argument.
npm error code EUNKNOWNCONFIG
npm error Unknown cli flag:
npm error   - --t
npm error Run `npm help config` for supported options.
npm error A complete log of this run can be found in: C:/Users/mikes/scoop/persist/nodejs-lts/cache/_logs/2026-09-08T16_05_33_199Z-debug-0.log
```

The isolated checkout was clean at the assigned baseline before the command:

```text
git rev-parse HEAD
c87021bdc6367d27463139b293287a586de18240

git status --short --branch
## HEAD (no branch)
```

## Work state

Not done. No owned source, test, rule, configuration, manifest, lockfile, or generated file was edited. The requested validation commands after implementation were not run.

## Hypothesis

The host npm argument parser consumed Vitest's `-t` flag instead of forwarding it through the separator.
