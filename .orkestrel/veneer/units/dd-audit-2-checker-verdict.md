# Audit round 2 — DROPDOWN (`dd`), checker verdict (`checker` on Sonnet; claims 1, 4, 7, 8)

**Claim 1: CONFIRMED.** `dd-2-status.txt:1-4` lists exactly the four untracked owned files; `dd-2.diff:1-6` opens on `_dropdown.scss` as a new-file diff and the report's diffstat (`b-collapse-dd-report-2.md:35-40`) confirms the four files; `owned-round-delta.diff:1-283` shows exactly the `$raised` rename with its comment nouns (6-81), the dark-mode case rewrite and the unplaced end-menu reading (85-169), and the per-width containment cases (170-283), with no `DropdownSection.ts` hunk; the patch's `git apply --stat` (`:44-58`) lists exactly the thirteen files, "13 files changed, 786 insertions(+)", and `grep -c '^-[^-]'` prints `0` (`:61`).

**Claim 4: CONFIRMED.** The predicate at `dd-shared-2.patch:753-759`; the comment at `:749-750`; the derivation case's `expect(declared.get('vertical-align') !== '0').toBe(raised)` at `:761-772`; the `Nav` row retained at `:283`; the mutation rows `nav-row-dropped` (exit 0), `nav-row-dropped-narrow-predicate` (exit 1, the named case), and `raised-column-flipped` (exit 1) at `b-collapse-dd-report-2.md:246-247,238` with their logs present under `dd-instruments-2/logs/mutations/`.

**Claim 7: CONFIRMED.** `logs/summary.txt:22-32` ("final chain after the last edit") shows every gate exit 0; `gate-setup.log.txt:31-32` `252 passed (252)`; `gate-styles.log.txt:79` `46 passed (46)`; `gate-section.log.txt:10` `5 passed (5)`; `gate-conformance.log.txt:11` `22 passed (22)`; `gate-guides.log.txt:11` `19 passed (19)`; `gate-policy.log.txt:11` `109 passed | 1 skipped (110)`; `apply-check.log.txt:1` exit 0; `journey-light-390.log.txt:116` `39 passed (39)` with the driven case (line 98) and the lifted-frame case (line 88) passing; the other three variants' logs are present and the report's table states matching lines, not individually re-opened.

**Claim 8: CONFIRMED.** `_dropdown.scss` carries one `@each` over `$carets` (line 77), no literal color (the dark block reads `var(...)` and `color-mix()`), an empty `--bs-dropdown-box-shadow: ;`; no forbidden syntax in the owned test files or `DropdownSection.ts`; no banned-term hit in the report; § Decisions names the seven decisions the claim requires (`:313-335`); every number is a measurement tied to its run. Counts the report states: the gate tallies, the four journey `39 passed (39)` lines, the owned-file and patch diffstats, the per-row mutation tallies.

Findings outside the claims: none.

VERDICT: PASS
