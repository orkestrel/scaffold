# bpb landing check (`checker` on Sonnet) — verdict

Brief: `units/bpb-landing-checker-brief.md`. Instruments: `units/bpb-probe-bpb-integration.py`, `units/bpb-probe-bpb-integration-2.py`. Diff: `units/bpb-integration.diff`.

**Claim 1 — diff scope.** MET.
`/home/user/scaffold/.orkestrel/veneer/units/bpb-integration.diff` (full file, lines 1–88) contains exactly three file hunks: `guides/veneer.md` (lines 1–43: the pagination value paragraph, plus a reorder of the `btn-close` § Additions row), `src/styles/components/_close.scss` (lines 44–56: header comment untouched, one new comment line before `.btn-close:focus`), and `src/styles/components/_pagination.scss` (lines 57–88: header comment rewrap plus one new comment line before `.page-link:focus`). No other file or hunk appears.
`/home/user/scaffold/.orkestrel/veneer/units/bpb-status.txt` and `bpb-2-status.txt` both list exactly `guides/veneer.md`, `src/styles/components/_close.scss`, `src/styles/components/_pagination.scss`, `tests/src/styles/components/close.test.ts`, `tests/src/styles/components/pagination.test.ts` — identical sets, no other file, confirmed line-by-line in both reads.

**Claim 2 — pagination paragraph text.** MET.
`/home/user/veneer-bpb/guides/veneer.md:825-838`: opens "Every value the family paints is Bootstrap 5.3.8's own, apart from the forced-colors focus outline / § Additions records. A length reads the Veneer scale token that already resolves to it," (lines 825–826), then continues verbatim with the pre-existing text (lines 826–838, matching `bpb-integration.diff` lines 27–39 unchanged context). Wrapped at ≤100 columns (line 825 measures 98 characters; line 826 measures 98 characters). "§ Additions" sits together on line 826, not split across a line break.

**Claim 3 — § Additions row order.** MET.
`/home/user/veneer-bpb/guides/veneer.md:3633-3635`: `form-range` row (3633), `pagination` row for `.page-link:focus { outline }` (3634), `btn-close` row for `.btn-close:focus { outline }` (3635) — in that order, pagination directly before btn-close, both after form-range. No cell content changed from the audited diff's row text.

**Claim 4 — SCSS comments.** MET.
`/home/user/veneer-bpb/src/styles/components/_pagination.scss:11-15`: header comment opens "Every value here is Bootstrap 5.3.8's own, apart from the forced-colors focus outline. A length reads the Veneer scale token that already resolves to it," and continues with the prior text unchanged (matches `bpb-integration.diff` lines 72-76). Line 76: `// Forced colors paint no shadow, so the link takes the button's system-highlight outline there.` sits directly before `.page-link:focus {` (line 77).
`/home/user/veneer-bpb/src/styles/components/_close.scss:40-41`: `// Forced colors paint no shadow, so the control takes the button's system-highlight outline there.` sits directly before `.btn-close:focus {` (line 41).
Both sentences match the form of `/home/user/veneer-bpb/src/styles/components/_form-select.scss:53-54`: "...Forced colors paint no shadow, so the control takes the button's system-highlight outline there." (same sentence, subject noun `link`/`control` matching each partial's own element, same clause structure).

**Claim 5 — writing conformance.** MET.
No banned substitution-table term (`should`, `simply`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`) found anywhere in `guides/veneer.md` (grep, no matches). The edited passages state no count. Each code token in the edited passages (`--vn-factor-density`, `--vn-factor-radius`, `--vn-palette-blue`, `--vn-palette-white-base`, `--vn-color-primary-base`, `--bs-pagination-active-bg`, `--bs-pagination-active-border-color`, `--bs-pagination-focus-box-shadow`) is followed by a noun phrase (each is a CSS custom-property token, its own noun, per the brief's own exemption). No edited comment line exceeds 100 columns: `_pagination.scss:11` measures 99 columns including its leading tab; `_pagination.scss:76` measures 97; `_close.scss:40` measures 99 including its leading tab.

## Referrals

None. Every claim resolved mechanically against the diff and the worktree files without a judgment call.

## Outside the claims

No file outside the scope named in claim 1 was touched by the integration diff; no additional defect found in the read passages.

VERDICT: PASS
