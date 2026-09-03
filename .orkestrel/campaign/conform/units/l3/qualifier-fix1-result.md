## Fix round 1

Closes the round-1 objective lane's refutations of claims 4 and 6 and F3 (`units/l3/qualifier-objective-r1.md`).

- **§ Sweeps** gains seven rows, one per row the lane named, each re-run and read empty: qualifier-obj-3, qualifier-obj-4, qualifier-subj-4, qualifier-subj-5, qualifier-subj-7, qualifier-subj-10, and qualifier-subj-11.
- **§ Shared-file patches** gains the "Program's own authored prose" block: the corrected import lines at `program/README.md:31` and `program/guides/program.md:38`; the remaining `qualificationDefinition` → `createQualificationDefinition` sites at `README.md:50` and `guides/program.md:57,770,786,876`; the remaining `rulingDefinition` → `createRuling` sites at `README.md:56` and `guides/program.md:63,792,821,832,890`; and the `logicalPremises` → `ruleToPremises` prose rename at `guides/program.md:279`.
- The qualifier-subj-14 row is rewritten: the citation is `helpers.ts:326`, matching where the `false` arm sits after this unit's edits.

No file under `/home/user/fleet` changed; this unit read program's files only, with the `grep -rn` commands the brief grants.

Owned file changed: `/home/user/scaffold/tmp/units/conform/conform-qualifier-report.md`.
