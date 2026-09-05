# Unit docs-proposal-fix — fix round 1 on `PROPOSAL.md`

Successor of `tmp/units/docs-proposal-brief.md`. What changed: the round-1 audit (`tmp/units/docs-proposal-audit-verdict.md`, lanes at `tmp/units/docs-proposal-audit-{subjective,objective,checker}.md`) returned the findings below; this brief carries each as one numbered fix with the lane's prescription. Everything in the original brief still binds: the outline, the rulings R1 to R10, the writing rules, the scope (`PROPOSAL.md` alone), the tools (read-only inspection plus `oxfmt --check` and `--write` on the owned file), and the acceptance criteria.

## Role and engine

`implementer` on Opus 5, a native Claude Code subagent. Perform the assignment directly and spawn nothing.

## Objective

Apply every fix below to `/home/user/scaffold/PROPOSAL.md`, adopting each prescription as written unless a prescription is impossible to apply without misstating the evidence, in which case stop on that item, report it, and apply the rest.

## Fixes

1. **Rule ids.** Replace `policy/summary` with the ruled id `policy/tsdoc-voice` at every occurrence (:893, :978, :1012, :1039, :1177 and any other). Keep `policy/prose`. Beside the first occurrence add the same one-clause flag the `render` name carries at :380-381 — the ids are proposals the first unit settles — and note that the sibling rules `no-mocking`, `no-keyword-privacy`, and `no-nested-functions` name what they refuse, so the first unit may choose that form (`no-imperative-summary`, `no-banned-term`).
2. **Counts carry their run.** (a) :341-342: run `grep -rhE '^export (const|function|class|interface|type|enum)' src/bin | wc -l` and cite that command beside `69`, or write the sentence without the number. (b) :571-572: cite `git show <rev>:guides/scaffold.md | wc -l` for the line counts by commit, or move the three readings into a table with a Command column. (c) :820-821: cite the ecosystem report's `wc -l` readings by pointer (`tmp/units/docs-ecosystem-report.md` § Map) or drop the numbers.
3. **Option 2's worked example.** Replace the closing remark paragraph at :695-699 with the guide's sentence at `guides/scaffold.md:864-866` unaltered, and rewrite the claim at :668-671 to say exactly that: the summary and remarks are the block at `src/core/factories.ts:7-43` verbatim, and the closing paragraph is the guide's sentence moved, with `questions` left as prose. Add a body-rendering rule to Option 2's mechanism table at :642: a `{@link X}` in a chapter body renders as a link to the guide's own anchor when `X` is in the rendered surface and as `` `X` `` otherwise, and a `{@link}` in a first sentence always renders as code (R1). Make the passage at :718-733 follow that rule.
4. **Option 1's fleet cost, stated the same way everywhere.** In the blockquote (:11-12), the Summary bullet (:28), the glance table's Fleet cost cell (:57), and Claim 5 (:625-626), state Option 1's cost as: a `@orkestrel/guide` development bump (each package re-pins and proves its gates; no republish of any package's own surface) **plus** a `@orkestrel/scaffold` release for the seeded `docs` script and markers in the `new` templates, which reaches targets as files through re-pin and `repair` and can share Option 3's vendored release. Rewrite Claim 5 so it is true under that migration. Reconcile the price of the rule amendment: :12 says one amendment to `.claude/rules/documentation.md:35`, and :1037-1038 adds "any `.claude/rules/writing.md` row the denylist derives from"; the denylist is derived from the table as it stands and the currency check reads it, so drop the `writing.md` amendment clause unless you find a reason, in which case price it at :12 too.
5. **Pointers.** (a) :195: run `grep -rniE '\b(should|simply|leverage)\b' src configs tests` and `grep -rniE 'substitution|banned' src configs tests` and rewrite the row from their actual output; the absorb distillate's reading was that the first sweep returns no hit and the second hits only the policy plugin's "banned" mock-API messages and the templates' "declaration substitution" string. (b) :83-84, :979-980, :1105: `ROADMAP.md:127` sits inside the `contract` package's bullet (`ROADMAP.md:67-129`); drop the attribution to scaffold, or state that the seam is contract's and that Option 3 reaches it only after contract re-pins and repairs. (c) :911-912, :1029: cite `src/core/constants.ts:186-201` for `CANON_PATHS` and `:195` for its `.claude/rules` member. (d) :443-445: write "The `Origin` narrative and its per-member table stay authored (`guides/scaffold.md:961-965`)". (e) :414: cite `src/core/types.ts:9-18`.
6. **Checks tables.** Option 1 (:492-506): add a `SB, guide to barrel` row (`tests/guides.test.ts:109-117`) ruled tautological under a generated region and replaced by region currency, so :490's sentence is true. Option 2 (:775): rule TE a regeneration guard, as :771 rules SB, rather than "stays honest" with LI covering it with force.
7. **Rename rows.** Option 1 (:477) and Option 2 (:749): carry every surviving site into the after column — the `{@link}` occurrences on other declarations, and under Option 1 every fence importing the symbol — and let the gate column say which check catches each (typecheck for call sites, FI for fences, the region-currency check for rows, `none` for a `{@link}` on another declaration unless you name the check).
8. **Fragment.** :969: make the sentence introducing the fence at :971-973 a complete sentence with a finite verb.
9. **One reason per refusal; a comparison per probe.** :1148, :1150, :1153: keep the load-bearing reason in the Reason cell and either drop the second or move it into the relevant option's Risks; keep :1143's header true. Probe 3 (:1167-1170): name the comparison — write a fixture file carrying two marker pairs, splice both through the existing catalog path in a throwaway script, and diff the output against the expected two regions; state the branch each outcome takes (both spliced: the splice generalizes; one spliced: the render lives in `@orkestrel/guide`, per R4) instead of stating the answer.
10. **:93.** Neither the Compile fence at `guides/scaffold.md:878-886` nor the `@example` at `src/core/Compiler.ts:78` executes today; the transcribed fences are the blueprint defaults, the compile refusal, and the error-code narrowing (`tests/guides.test.ts:212-245`). Correct :93, and adjust Option 2's benefit statements at :780 and :858-859: reading fences from `@example` makes the two sites one; execution still requires a transcription.
11. **:81-82 and :84-85.** The doc block at `src/core/helpers.ts:61` answers to `.claude/rules/typescript.md:78-79` and satisfies it; only the guide row at `guides/scaffold.md:221` violates `.claude/rules/documentation.md:35`. Rewrite both sentences so each site is judged against the rule that governs it.
12. **Stage 3's claim.** :358 and :1113-1114: state which parts of `README.md` the head region covers (name the line spans: the pitch, the install line, the runtime line, the verb table, the flags), say whether `README.md:45-100` is inside it, and describe the `npx scaffold` against `scaffold <verb>` pair as a register difference that the region removes only inside the region.
13. **Date the reading.** :266-267: add that the run was taken at `792a9739` and that `ROADMAP.md` was repaired as `a74686b8`.
14. **Population.** :297-298 and :546-547: "every fleet package except `guide` itself, plus `scaffold`".
15. **Section-ownership walk.** :833-836: add `## Library` (`guides/scaffold.md:1379`) to the sections the walk must own, and say that `## Surface`, `## Methods`, and `## See also` are generated or structural.
16. **Direct-to-barrel.** :771: state that the direct↔barrel half stays real under Option 2, as :495 states for Option 1, because generation touches neither side of it.
17. **`guide.tests()`.** :191: `tests/guides.test.ts:89` calls it inside the NV assertion; move the row to say the resolution pass is folded into LI and non-vacuity is asserted.
18. **:213-214.** Replace "falls in the second class" with "falls in the sentence-truth class".
19. **Conditional `jsdoc`.** :1017 and :1024: mark the oxfmt `jsdoc` row and the hover bullet conditional on the measured diff that alters no first sentence, matching :934-940, :1042-1043, and probe 5.
20. **Inherited defects.** Add a risk row to Option 1 § Risks and open questions: verbatim derivation carries a doc-block writing defect into the guide (the pluralized code token `{@link Question}s` at `src/core/factories.ts:31`, forbidden by `.claude/rules/writing.md` § Code tokens), and neither `policy/tsdoc-voice` (first sentence) nor `policy/prose` (substitution table) reads it; state that a code-token inflection rule is a candidate successor to `policy/prose` and that the class stays review-owned in this proposal.
21. **Your own flags.** :366-367: write that the marker text carries an environment and kind qualifier so a file *is designed to* carry several regions, and that the splice's generalization is probe 3's question. :1067: write the sentence as a judgment ("the denylist's membership rule is the substitution table's own exemption list") rather than as a measured property.

## Output

`PROPOSAL.md` rewritten in place and formatter-clean. Your final message is a report in this shape and nothing else:

- `Applied`: fixes 1 to 21, each with the line span it now occupies.
- `Format`: the exact `oxfmt --check` command and its last output line.
- `Sweeps`: the two `grep` commands from fix 5a with their output, and the `grep -rhE '^export ...' src/bin | wc -l` reading from fix 2a.
- `Not applied`: any fix you could not apply as prescribed and why, or `none`.
- `Flags`: any sentence you consider weaker than its evidence, with its line.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` exits 0.
2. Every fix is applied or reported under Not applied with a reason.
3. `grep -c 'policy/summary' PROPOSAL.md` returns 0.
4. Every pointer named in fix 5 resolves to text saying what its sentence says.
5. No count in prose remains at :341-342, :571-572, or :820-821 without its command.
