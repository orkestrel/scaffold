# Probe bin observation instrument

## Outcome

The bounded observer is ready for root execution. The unit did not run it or drive Probe.

## Touched paths

- `tmp/pass/observe-probe-bin-claim.mjs`
- `tmp/units/d7n-probe-bin-observation-report.md`

## Instrument behavior

- The script accepts only `baseline` or `constants`.
- It derives the canonical Probe checkout and absolute import URLs from its own file URL.
- It requires Probe's installed MCP package to report version `0.0.29`.
- It drives Probe's built bin entry from Probe's canonical working directory through the pinned
  legacy client adapter used by the bin suite.
- It sends the core project, the exact clean and broken module texts, the passing Vitest
  specification, the type-stage control, and the stated reason.
- It requires a complete call result and a value accepted by `isVerdict`, then writes the full
  verdict and `formatVerdict` text as JSON without requiring a receipt.
- It disconnects the client, attempts only `rmdir` on `tmp/probe/bin`, and preserves any contents
  that keep the directory nonempty.

## Diffstat

```text
/dev/null => tmp/pass/observe-probe-bin-claim.mjs | 91 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
1 file changed, 91 insertions(+)
```

## Syntax validation

```text
node --check tmp/pass/observe-probe-bin-claim.mjs
exit 0
```

The creation diff emitted no whitespace diagnostics from `git diff --no-index --check`.

## Shared-file patches

None.
