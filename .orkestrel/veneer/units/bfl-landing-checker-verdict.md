# bfl landing check (`checker` on Sonnet) — verdict

Brief: `units/bfl-landing-checker-brief.md`. Instrument: `units/bfl-probe-bfl-integration.py`. Diff: `units/bfl-integration.diff`.

**Claim 1** — MET. `bfl-integration.diff` shows only two hunks, both inside `guides/veneer.md` (diff lines 83-85 and 128-132, both within `### Form label classes`). `bfl-2-status.txt` and `bfl-3-status.txt` list the identical file set (the round-1 owned set); only the diff's `index` hash line and the two paragraph hunks differ between `bfl-2.diff` and `bfl-3.diff`.

**Claim 2** — MET. `/home/user/veneer-bfl/guides/veneer.md:995-998` reads verbatim: "The unsized horizontal label reads `--vn-size-3`, the control's type step, so its text sits level with the control's, and the stacked `.form-label` class keeps inheriting the surrounding type. On a `legend` element the horizontal label also clears the element's own trailing margin and type size, so the legend reads at its control's type step." The rest of the paragraph (lines 989-994) is unchanged.

**Claim 3** — MET. `/home/user/veneer-bfl/guides/veneer.md:1020-1021` carries "each horizontal label's type step and the sized labels' insets" as specified, and the rest of the proof paragraph (lines 1016-1024) is unchanged.

**Claim 4** — MET. Each non-value code token in the two paragraphs is followed by a noun (`attribute`, `element`, `class`, `parent`); each value token (`0.875em`, `--vn-size-3`, `--bs-secondary-color`) is a CSS value and counts as its own noun. No banned substitution-table term appears in either paragraph; neither states a count. The nearest `§ Additions` sits on one line. No line in the `veneer.md:980-1029` span exceeds 100 columns.

**Outside the claims**: none found.

VERDICT: PASS
