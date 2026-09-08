# d7n layer capture fix successor report

## Status

Corrected the durable row-key rename in the scratch carrier.

## Diff from retained layer-capture-fix snapshot

`Capture.mjs` now writes file rows with `record: 'file'` and `path`, and command rows
with `record: 'command'`. It no longer writes a row `type` key or a file-row `source`
key. `test.mjs` asserts those keys and their absence from the durable rows.

## Controls

Before the correction:

`node --test tmp/pass/layer-capture/test.mjs` exited `1`. The file-row control expected
`record` to equal `file` and found `undefined`. The command-row control expected
`record` to equal `command` and found `undefined`.

After the correction:

`node --test tmp/pass/layer-capture/test.mjs` exited `0`.

`git diff --check -- tmp/pass/layer-capture tmp/units/d7n-layer-capture-fix-successor-report.md`
exited `0`.

## Deviations

None.
