# d7n layer capture fix report

## Status

Completed the bounded carrier corrections in `tmp/pass/layer-capture/`.

## Touched paths

- `tmp/pass/layer-capture/Capture.mjs`
- `tmp/pass/layer-capture/functions.mjs`
- `tmp/pass/layer-capture/helpers.mjs`
- `tmp/pass/layer-capture/main.mjs`
- `tmp/pass/layer-capture/test.mjs`

## Diff from retained snapshot

The entry now imports `run` from `functions.mjs`. The run metadata labels cached origin,
states UTF-8 encoding, and retains the decoded-stream caveat in `note`. File and command
rows use `type: 'record'`; command labels use `label` and file paths remain `source`.
The redundant settlement object, special scaffold package branch, containment helper and
check, timestamp helper, and repeated population assignment are removed. The child fixture
resolves from its module URL. Controls parse durable journal rows and assert file and command
records, saved streams, cached origin, and encoding metadata.

## Controls

Before the correction:

`node --test tmp/pass/layer-capture/test.mjs` exited `1`. The command-record control expected
`type` to equal `record` and received `command`.

After the correction:

`node --test tmp/pass/layer-capture/test.mjs` exited `0`.

`git diff --check -- tmp/pass/layer-capture` exited `0`.

## Deviations

Formatter and linter checks were not run. The existing configuration excludes these ignored
`.mjs` scratch files, and this unit does not change ignore policy or install tooling. No live
capture, Git mutation, package installation, or whole-suite command ran.
