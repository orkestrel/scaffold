# bfl round 2, objective lane (`analyst` on GPT-6 Astra) — verdict

Journal: `tmp/codex/bfl-2-audit-analyst.jsonl` (swept at acceptance); session id `01a0ce02-1390-7640-b09d-e7de090c59be`; exit 0 under the 1500 s cap; the journal names `gpt-6-astra`. Launcher: `units/bfl-2-audit-analyst.sh`. Brief: `units/bfl-2-audit-analyst-brief.md`. Claims: `units/bfl-2-audit-claims.md`.

1. **CONFIRMED — Delta and scope.** The retained whole diff matches the live diff, and the retained status matches `git status --short`. The delta names only permitted files. Comparing the moved forms sections against `git show a56ca7e:guides/veneer.md` found byte-identical blocks; an in-memory heading mutation broke the comparison. Evidence: `bfl-2-delta.diff:1`, `bfl-2-status.txt:1`, `guides/veneer.md:1026`. The required style-proof link is the sole change under § Tests.

2. **CONFIRMED — Type step.** The binding is present at `src/styles/components/_form-label.scss:30`, in the built cascade, and at `tests/setupStyles.ts:4957`. The stacked rule and sized rules remain unchanged. The level assertion compares every label with its control at `tests/src/styles/components/form-label.test.ts:107`; the legend assertion does likewise at line 148. Mutation: restoring `inherit` in the expanded cascade removes the font-size token read and breaks the Node binding equality at `tests/setupStyles.test.ts:2737`; this was reproduced without writing files. The browser assertions distinguish the reported 14 px label from its 16 px control. The retained red and green results appear at `tmp/units/bfl-report-2.md:92`. Browser execution was not repeated, as the brief requires. Stacked inheritance remains intentional.

3. **CONFIRMED — Ledger row.** `guides/veneer.md:2564` records exactly `col | .col-form-label | font-size | — | inherit | var(--vn-size-3) | tokenized`. Running the ledger computation against the expanded cascade returned empty unrecorded and stale lists. Mutation: removing this row from the recorded rows produced precisely that unrecorded departure, which fails the equality at `tests/conformance.test.ts:208`. Restoring `inherit` instead made the recorded row stale. The report records the conformance run at `tmp/units/bfl-report-2.md:128`.

4. **CONFIRMED — Guide sentences.** The replacement sentence, stacked inheritance statement, retained headline, and corrected closing clause appear at `guides/veneer.md:995`, line 1004, and line 1013. The attack was to compare the headline against each horizontal size’s actual declarations: the base rule reads the control’s base tokens, and the size loop reads the corresponding sized tokens (`src/styles/components/_form-label.scss:4`, line 27, line 34). No horizontal size retains the superseded inheritance claim.

5. **CONFIRMED — Shared split.** `tests/src/styles/components/form-label.test.ts:10` imports the helper from the same module as `tests/src/styles/components/form-check.test.ts:25`, and line 160 calls it. No `split(',')` remains in the label proof. An executed input containing `:is(.form-label, .form-text), .col-form-label` retained the nested selector intact; the naïve split control fragmented it. The layer assertion still rejects an absent case selector at line 165.

6. **BROKEN — Prose.** The listed replacements landed, but the universal claim that no other bare code token remains is false. Added prose still contains:
   - “the stacked `.form-label` keeps inheriting” at `guides/veneer.md:996`;
   - “reads `--vn-space-4` and” at `guides/veneer.md:1002`;
   - “reads `--bs-secondary-color` byte for byte” at `guides/veneer.md:1012`;
   - “the release’s `0.875em`, which” at `src/styles/components/_form-label.scss:8`.

   These tokens lack the following nouns required by `/home/user/scaffold/.claude/rules/writing.md`. The smallest fix adds the applicable `class`, `token`, `variable`, or `size` noun. The correctly repaired attribute, element, helper, selector, and key phrases do not need revision.

7. **BROKEN — Report completeness.** `tmp/units/bfl-report-2.md:130` records a result for the scoped label-and-floating run but omits its command. The command at line 92 selects only the label proof; the observation at line 223 again describes the combined run without recording its command. This fails the required command-and-result record. The smallest fix records the actual combined command, including its configuration, flags, and selected paths. The delta adds no prohibited code construct or duplicate helper, `npm run check` independently exited 0, and the required § Tests qualification appears at line 132. This finding concerns the report’s completeness, not a demonstrated test failure.

VERDICT: FAIL 6, 7; outside the claims: none