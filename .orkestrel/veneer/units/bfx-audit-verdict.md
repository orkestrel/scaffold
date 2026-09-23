# B-FORMS-FLOATING-SELECT — round verdict (the Orchestrator's verification, 2026-09-23)

The unit applied `b-forms-floating-select-brief.md` on `builder`; its report
(`b-forms-floating-select-report.md`) records the measured value (the floating select's line height
reads 20px against a 16px font size, the release's `1.25` resolved after `.form-select` ships
`appearance: none`), the assertion `toBeCloseTo(readPixels(select, 'font-size') * 1.25, 1)` in the
geometry case, the two guide sentences as the brief fixed them, and the gate exits. The plant the
brief named (`line-height: 1.5` on the floating select rule) landed on the combined rule the text
controls share, so the text controls' line-height assertion reddened first and the select's new
assertion was not the first red; the Orchestrator rules the new assertion bound by its own
reading: before the SELECT landing the select's line height read `normal`, on which `readPixels`
yields no pixel value and the `toBeCloseTo` comparison fails, so the assertion distinguishes the
bare select from the styled one, which is the change the unit closes. A fully specified builder
round takes the Orchestrator's reading as its review; no lane ran.

The FLOATING row's SELECT carrier closed at the SELECT landing; this unit lands with no ROADMAP
change beyond the fold's status.

VERDICT: PASS
