# Unit docs-proposal-audit-4 — checker

Returned by `checker` on Sonnet on 2026-09-05 (brief: `proposal-audit-4-brief.md`); captured verbatim by the Orchestrator from the lane's final message.

README.md:6-8 (the shared-toolchain sentence) content matches guides/scaffold.md:9-13 ("The package exists because...write the difference back."), and README.md:10-23 (vendored/canon split) matches guides/scaffold.md:15-27. Both are within the cited `guides/scaffold.md:9-27` span, so claim 3's `:9-27` pointer resolves correctly.

Based on all evidence gathered:

## Per-claim verdicts

**1. Every `rep` call sits at its new site with the script's `new` string, `old` string appears nowhere — CONFIRMED.** Verified each patch's `new` text at its cited location: `R3-pitch`/`R3-vendored` at `PROPOSAL.md:109` and `:440-441` ("the compile-compare-write pitch (`README.md:3-4`; `guides/scaffold.md:3-7`)", "the vendored-set paragraphs (`README.md:6-23`; `guides/scaffold.md:9-27`)"); `R3-verb` at `:444` ("a verb-table region inserted at `README.md:44`, between the flags and the per-verb sections"); `R3-rec` at `:1208-1212`; `R3-currency` at `:560`; `R3-gate` at `:520`; `R3-li` at `:542`; `R3-rename-today`/`R3-rename-gate` at `:520`; `R3-probe3`/`R3-probe5`/`R3-probe6` at `:1268-1275` (list now runs 1-5 with item 3 = Formatter stability); `R3-catalog-range`/`R3-recatalog-range` at `:366-367`, `:395-396`, `:399-400` (all now `:386-396` and `:1112-1161`); `R3-bold` at `:847` ("**Stays real and is adopted here, as under Option 1**,"). A full-file grep for every `old` string in the script (`guides/scaffold.md:1-13`, `:15-27`, the pre-patch verb sentence, the singular Recommendation/currency/gate/LI text, the un-renumbered probe 3-6 block, `Materializer.ts:369-395`, `:1112-1117`) returned zero occurrences.

**2. The probe list is numbered 1-5 with no gap, no item a settled reading, no stale numbered cross-reference — CONFIRMED.** `PROPOSAL.md:1262-1275` runs 1 (scanner miss rate), 2 (regeneration diff), 3 (formatter stability), 4 (`jsdoc` rewrite), 5 (oxlint rule), each naming a command or comparison to run. The removed settled reading (the multi-region splice) already lives in the risk row at `:645-650`, so its content is not lost, only de-duplicated. A file-wide search for a probe cited by a stale number (`probe \d`, `item \d`) found no hits.

**3. Every added/changed pointer resolves to the text its sentence claims — CONFIRMED.** `guides/scaffold.md:3-7` is the blockquote; `:9-27` spans the paragraph mirroring `README.md:6-8` (`:9-13`, "The package exists because…") and the paragraph mirroring `:10-23` (`:15-27`, "That root stages…"), together matching `README.md:6-23`. `README.md:44` is the blank line between the flags at `:42-43` and the `### `new`` heading at `:45`. `src/server/Materializer.ts:386-396` is the `catalog()` method; `:1112-1161` is `#recatalog`, matching the sentence's description of each.

**4. The README head is framed as one region per span at every site — CONFIRMED.** `grep` for `head region`/`README region` returns `:388` ("one region per span"), `:520` and `:542` ("the README regions at Stage 3" / "inside the README regions at Stage 3"), `:560` ("Each marker-bounded span in `README.md` matches the render"), `:1208` ("the `README.md` head regions"). `:525`'s singular "the README region as well" names one specific region (the verb-table region, in the CLI-flag row) rather than the collective framing, so it is not a counter-example. `:861`'s singular "README region equality" sits under Option 2's own whole-guide render, a different mechanism from Option 1's per-span regions, so it is outside this claim's scope rather than an inconsistency.

**5. The patched spans carry no uncited count, no banned-sense substitution term, complete introductions; formatting is recorded clean — CONFIRMED.** No new count appears in the round-3 patch text. A file-wide sweep for the substitution-table terms found only the pre-existing quoted-as-data instances at `:218-219` (`` `should` ``, `` `simply` ``, `` `leverage` ``), already ruled exempt. `.orkestrel/campaign/docs-proposal/proposal-audit-3-verdict.md:22` records `oxfmt --write PROPOSAL.md`, then `oxfmt --check` clean, `git diff --check` clean, and `npm run format:check` clean on 222 files, at 1301 lines — matching the file's current line count, so the recorded clean run post-dates this exact patch state.

## Findings outside the claims

Both open findings from the round-3 objective verdict are resolved as a side effect of the script, beyond what their prescriptions strictly required:

- **F1 (probe 3 no longer a probe)** — resolved: item 3 is gone and the list renumbers cleanly (see claim 2).
- **F2 (two ranges cited for the same members)** — resolved beyond its own prescription: `PROPOSAL.md:366-367` (the site the prescription named but the script's `rep` calls did not target directly) now also reads `:386-396`/`:1112-1161`, because `R3-catalog-range`/`R3-recatalog-range` used a global count-based replace rather than a single-site `rep`.

VERDICT: PASS none; outside the claims: none
