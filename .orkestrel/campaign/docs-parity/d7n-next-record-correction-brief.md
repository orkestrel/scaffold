# Correct the release pin sweep

Keep the bounded builder role and authority of d7n-next-record-carriers-brief.md. Edit only tmp/pass/sweep-next-pins.sh and its correction report. Preserve checkpoint-next-layer.sh. Do not execute the body or touch a package.

Fix the wrong CSV prior version: d7n-next-layer-plan.md records 0.0.6, not 0.0.9. The remaining existing map entries match the table.

Fix the vacuous search. Root ran rg -n -F --glob 'src/**' --glob 'tests/**' 'export' C:/Users/mikes/WebstormProjects/csv and received exit1 with no output, although direct src search finds exports. Use explicit "$target/src" and "$target/tests" operands without those globs. Record exact argv including every operand. Do not introduce synthetic package fixtures. The root will repeat the positive search using real source after review.

After a search error, preserve actual exit truth and take final captures before returning failure. Stop running later searches on an error above exit1; do not overwrite the code. If any search has hits, final captures and comparisons must still run, then exit1. Remove unused status bookkeeping or use it for that control flow. Retain the original authored report as history; write d7n-next-record-correction-report.md. Syntax-check only.
