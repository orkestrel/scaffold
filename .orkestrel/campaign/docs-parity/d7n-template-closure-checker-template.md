Lane held: checker template

## Claim 1 — Every closing-brief item landed as stated; nothing else changed

**PASS.** `git status --short` evidence (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-template-close.status.txt`) lists exactly `M guides/template.md` and `M tests/guides.test.ts`, matching the brief's owned-file scope. The diff (`d7n-template-close.diff.txt`) contains only three hunks: the `Shape`/`TemplateFillContext` convention-sentence and row edit (item 1), the header/`INTERNAL` doc-block correction (item 3), and the `#### Create a template and a registry` lead-in (item 4). No `src/**` file changed — item 1's report correctly found no row needed a `plus` addition beyond `TemplateFillContext`, verified against `src/core/types.ts:26-304` row by row (`TemplatePlaceholder`, `TemplateDefinition`, `TemplateFillOptions`, `TemplateTokenResolution`, `TemplateRegisterOptions`, `TemplateValidationResult`, `TemplateOptions`, `TemplateQuery`, `TemplateManagerOptions` all declare data members only), and item 2 needed no re-read (`{@link TemplateInterface#fill}` / `#validate` already correct at `src/core/types.ts:57,67`).

## Claim 2 — Report citations match the tree; no count in prose

**PASS.** Every diff hunk quoted in the report matches `d7n-template-close.diff.txt` byte for byte (convention sentence, `TemplateFillContext` row, header lines, `INTERNAL` comment, fence lead-in). Scanned report prose for stated counts outside command output/quoted measurements: none found. "reported zero disagreements throughout" (report line 125) names its producing run (`npm run docs`) inline, so it falls under the measurement-with-its-run exemption rather than a bare set count.

## Claim 3 — The `Shape` idiom

**PASS.** `guides/template.md:34-55` — every interface/type row matches `src/core/types.ts` exactly: bare data members, `?` on optionals, `plus` before call-signature members in declaration order (`TemplateInterface` at line 53, `TemplateManagerInterface` at line 55). The extended interface `TemplateFillContext` (line 47) reads `TemplateFillOptions plus { placeholders? }` per Ruling 21, and the Types convention sentence (line 36) carries the added extension clause verbatim from Ruling 21. The Constants table (lines 57-66) carries the constants sentence alone with declared/widened types (`RegExp`, `MissingPolicy`, `'en-US'`, `readonly string[]`), no `Value` column. No `Shape` cell holds `…` or a spelled-out method type (`grep -n '| interface *| ~{[^~]*:'` and `grep -n '…'` patterns confirmed empty by direct read). No guard table or shape-value constants table exists in this guide, so Rulings 20/25's guard/shape-value clauses are inert here.

## Claim 4 — The drop-in's canon

**PASS.** `tests/guides.test.ts` lines 1-3 read the pilot's exact header text (`.../fleet/abort/tests/guides.test.ts:1-3`), including the Ruling 13-amended "that follow" (not "below") wording. The `INTERNAL` doc-block sentence at line 54 matches the pilot's line 54 verbatim ("the assertion that follows it fails when a name"). The region from `const root = ` (template line 62 / pilot line 47) through the manifest loop's closing brace (template line 273 / pilot line 258) is structurally and textually identical outside the package-specific `GUIDE_SPEC`/`MODULES` constants, matching the report's claim of an empty diff over that region.

## Claim 5 — Fence lead-ins, sibling fences, retired terms, README fences

**PASS.** A full heading scan of `guides/template.md` (every `#`-`####` heading and its next three lines) shows no heading directly followed by a fence without an intervening lead-in sentence; the sole prior gap (`#### Create a template and a registry` → fence) now carries "Builds a template and fills it directly…" at line 148. No sibling-fence-without-heading case exists (the one titled fence has no untitled sibling). No heading carries a retired term (no "entities" or similar). `README.md`'s `## Install` (line 13, fence line 15) and `## Usage` (line 24, fence line 26) sit directly under their headings, matching the pilot's canon and Ruling 24.

## Findings outside the claims

- Several tables in `guides/template.md` are immediately followed by a demonstration fence with no dedicated lead-in sentence (Constants → fence at line 68, Errors → fence at line 89, Helpers → fence at line 111, Shapers → fence at line 133, both `## Methods` subsection tables → fences at lines 194 and 231). Ruling 21's own text scopes the closing sweep's enumeration duty to "each fence that sits directly under a heading," and this pattern is pre-existing and repeated unflagged across sibling packages (for example `/home/user/fleet/budget/guides/budget.md`'s Types table has no trailing fence at all, and other packages' Constants sections likewise carry no such fence). This reads as outside this unit's scope under the applicable ruling, not a defect this unit introduced, but the general writing rule ("introduce every list, table, and code fence with a complete sentence") is broader than Ruling 21's stated closing-sweep scope. Referred to the Orchestrator to confirm whether Ruling 21 is meant to cover table-adjacent fences fleet-wide in a future ruling, rather than ruled here as a judgment call.

VERDICT: PASS
