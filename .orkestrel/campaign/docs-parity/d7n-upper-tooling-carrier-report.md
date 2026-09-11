Stopped with a required structural deviation.

Expected: successors preserving the predecessors’ line structure.
Found: the authored successors are syntactically valid but compacted into single-line shell forms, so they are not acceptable exact structural successors.

Syntax evidence:

- `bash -n tmp/pass/install-upper-layer-tooling.sh`: `0`
- `bash -n tmp/pass/finish-upper-layer-native-final.sh`: `0`

`git diff --no-index` exit: `1` for each successor. The diff shows the non-preserving rewrites. No package action ran.
