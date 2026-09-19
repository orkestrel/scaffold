# Corrected capture recipe retention instrument report

Preserved the predecessor instrument as `tmp/release/retain-stage-capture-recipe-previous.ps1`. Corrected generated index interpolation through format strings and corrected the mapping header to emit a tab character.

The instrument maps each named evidence directory and its direct files. It normalizes the canonical and candidate prefixes before resolving repository-relative references, applies longest origins first, and records unmatched `tmp/units` and `tmp/audit` references in the retained index. The unmatched references remain unchanged for a parent ruling.

The script computes all selected Markdown transformations before it creates the retained destination. The index points at the copied successor ruling and names this successor brief/report as the effective authoring pair.

Preparation invocation: `powershell -NoProfile -File .orkestrel/campaign/capture-recipe-unit/retain-stage-capture-recipe.ps1 -Prepare`.
