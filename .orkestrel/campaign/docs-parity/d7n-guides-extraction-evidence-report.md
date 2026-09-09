# Extraction evidence instruments

Touched instruments: `tmp/pass/retain-guides-extraction-checkpoint.ps1`, `tmp/pass/capture-guides-extraction-review.sh`, `tmp/pass/compare-parity-guide-build.sh`, and `tmp/pass/run-guides-extraction-review.sh`.

Syntax checks exited `0`: `bash -n tmp/pass/capture-guides-extraction-review.sh`, `bash -n tmp/pass/compare-parity-guide-build.sh`, `bash -n tmp/pass/run-guides-extraction-review.sh`, and the PowerShell parser for `tmp/pass/retain-guides-extraction-checkpoint.ps1`.

The retention instrument copies `C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-core/red.log.txt` and `C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-core/green.log.txt` into `evidence/d7n-guide-parity-core`, retains this evidence brief and report, retains itself, and retains `tmp/pass/run-guides-extraction-review.sh` in the instrument record.

No carrier was executed. No deviation was found.
