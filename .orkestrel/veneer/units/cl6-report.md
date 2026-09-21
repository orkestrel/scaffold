# CL6 report

Stopped before implementation: the retained calibration record does not settle the anchor's hover mechanism. CL6 is incomplete. HEAD remains `c1c81a4`; the tracked tree is unchanged. Executor: `sol` role on Astra, acting directly without sub-agents.

Expected: identify the mechanism from the record before binding a hover value. Found: the record supplies computed colours and an unchanged custom property, but no matched hover declaration or transformation that explains the change.

The first measurement is a reading of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration-content.md`. Its Chromium and Edge columns agree on these readings.

| Record rows | Light | Dark |
| --- | --- | --- |
| Rest `color`, line 1215 | `oklab(0.3984 -0.019591 -0.190088)` | `oklab(0.7458 -0.0728685 -0.0983535)` |
| Hover `color`, line 1280 | `color(srgb 0.0407929 0.170295 0.538144)` | `color(srgb 0.248988 0.580565 0.745237)` |
| Rest and hover `--set-a-color`, lines 1272 and 1337 | Identical primary-over-text mix, primary weight `70%` | Identical primary-over-text mix, primary weight `80%` |
| Rest and hover `opacity`, lines 1263 and 1328 | `1` | `1` |

The `--color-primary-on-canvas` rows at lines 1270 and 1335 equal the corresponding `--set-a-color` rows. Decoration colour follows computed colour at lines 1245 and 1310. These readings establish that the custom property stays unchanged; they do not establish how the hover colour is produced.

The sibling `calibration-content.mjs` instrument records resolved properties and selected custom properties. Its lines 23–25 name a `150ms` transition and a `500ms` settle, but do not name the hover colour expression. That note cannot establish the missing mechanism.

The brief's Deviation contract explicitly requires: “Stop and report if the record cannot settle the hover mechanism.” I followed that stop condition rather than proceeding with Obligation 1's rest-only fallback. The missing evidence is the matched hover colour declaration, tied to the recorded Elements showcase digest `cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792`.

No retune or before/after browser measurements were performed. No selectors, variable rows, showcase section, or proofs were added. The button assertions remain unchanged. The opacity proof, red/green pair, shared-block sweep, conformance run, ordered gate chain, and Edge runs were not run; they have no exit codes or final lines to report.

The carried guide bounds remain unimplemented: explain the role classes' departure from Bootstrap's literal hover/focus channels, document the calibrated link-colour change and its effect on link-styled buttons, and describe the link showcase. No guide text changed.

Repository checks returned these results.

| Command | Exit | Actual output |
| --- | --- | --- |
| `git rev-parse --short HEAD` | `0` | `c1c81a4` |
| `git diff --stat` | `0` | Empty |
| `git status --porcelain --untracked-files=all` | `0` | Empty porcelain output |

The status command also emitted this warning on stderr, repeated verbatim:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

Only this report was written, under the ignored `tmp/units/` directory.
