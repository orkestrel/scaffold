# Extraction evidence instruments

Touched instruments: `tmp/pass/retain-guides-extraction-checkpoint.ps1`, `tmp/pass/capture-guides-extraction-review.sh`, `tmp/pass/compare-parity-guide-build.sh`, `tmp/pass/run-guides-extraction-review.sh`, and `tmp/pass/run-parity-population-question.sh`.

Syntax checks exited `0`: `bash -n tmp/pass/capture-guides-extraction-review.sh`, `bash -n tmp/pass/compare-parity-guide-build.sh`, `bash -n tmp/pass/run-guides-extraction-review.sh`, `bash -n tmp/pass/run-parity-population-question.sh`, and the PowerShell parser for `tmp/pass/retain-guides-extraction-checkpoint.ps1`.

The retention instrument copies `C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-core/red.log.txt` and `C:/Users/mikes/WebstormProjects/guide/tmp/d7n-parity-core/green.log.txt` into `evidence/d7n-guide-parity-core`, retains this evidence brief and report, retains itself, and retains the review and population-question launchers in the instrument record.

The retention instrument adds the stopped-adoption unit records, the capacity probe launcher, `scaffold-parity-adopt` logs and scripts, and frozen `d7n-guides-extraction-adoption-red` text evidence. It excludes raw Claude journals.

No carrier was executed. No deviation was found.
