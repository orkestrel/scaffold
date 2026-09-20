# Self-audit findings (workflow veneer-campaign-self-audit, run wf_6a6bf589-88d, 2026-09-20)

Surviving findings after two refuters each (site evidence, rule fit); 35 others were refuted and are in the workflow journal. Numbered here in severity order; the carriers are the plan re-baseline entry of the same date, `units/u3-brief-3.md`, `units/u3-policy-brief-8.md`, `units/retention-rewrite.mjs`, and the release commit.

### 1. [forces] [retention] Retained reports and claims files cite evidence by swept-once tmp/ launch paths, not retained paths
- site: .orkestrel/veneer/units/u6-report.md:20-22, u6-audit-analyst-report.md:25, u3-audit-claims.md:6,10, u6-audit-claims.md:5-7, u6-audit-claims-2.md:5-6,39, u6-audit-claims-3.md:5-6
- claim: Numerous retained records in the completed U1, U3, and U6 rounds still cite their evidence only by the executor-side tmp/codex or tmp/units or tmp/audit path, not by the retained units/ path the same file was copied to.
- rule: "Rewrite every `tmp/` path inside a copied artifact to the retained path it now names, in the same action that copies it. A retained file naming a launch copy resolves to nothing after the sweep, and the successor, the claim list, and the s
- fix: Rewrite the tmp/-path citations in the listed retained reports and claims files to the retained `.orkestrel/veneer/units/...` paths (with the `.log.txt` suffix for logs), and retain a copy of `u3-diff.patch` and `u6-diff.patch` under `.orkestrel/veneer` (or `units/`) before `tmp/audit/` and `` are swept at acceptance.

### 2. [forces] [carry] Checker's third count-phrase finding (guides/tokens.md:217) has no carrier in U3 brief-2
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md (§ Execution item 3) and C:/Users/mikes/WebstormProjects/veneer/guides/tokens.md:217
- claim: The checker's writing-sweep finding H flagged three leading-numeral count sentences in guides/tokens.md — at :160 ('Four root variables paint…'), :166 ('Bootstrap also retunes five image-valued variables…'), and :217 ('Two Elements behaviors are departures Veneer does not copy…') — but the fix brief that is meant to carry every audit finding only schedules deletion of counts at ':10', ':160', ':167', which map to the reviewer's separate finding 21 (lines 10, 160, 167) rather than to all three of the checker's own cited lines; the :217 sentence is absent from both the carry table and the 'Dropped, on the record' section.
- rule: ".agents/orchestration.md" § Carry every finding: "Every finding names exactly one carrier... A finding with no carrier is a dropped finding." Also AGENTS.md § Writing: "NEVER state a count. A number answering 'how many' about a set anyone 
- fix: Add the :217 sentence ('Two Elements behaviors are departures Veneer does not copy…') to u3-brief-2.md's § Execution item 3 counts list (or its own numbered item), rewritten to name the two departures instead of counting them, matching the treatment already planned for the :160/:166/:167 sentences; alternatively record it explicitly under 'Dropped, on the record' in u3-audit-verdict.md with a stated reason if the Orchestrator intends to leave it unfixed.

### 3. [forces] [plan] The routing ledger has no row for either scaffold-writing unit
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md:50-64
- claim: The U3-policy unit and the policy-styles-entry unit each wrote the scaffold checkout across multiple rounds, and neither appears in the routing ledger; no ledger row names the scaffold checkout at all.
- rule: .agents/orchestration.md § Execution loop, step 2 — "Surface the plan before dispatch, including a routing ledger naming each unit's role **and** engine."
- fix: Add ledger rows for `U3-policy` and `policy-styles-entry` naming the scaffold checkout in the Writes column, `builder` on native Sonnet as the role and engine, and the objective-review lane that ran each round.

### 4. [forces] [plan] u3-policy-brief-5 directs a role to run `git checkout` and to write a second live checkout
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-policy-brief-5.md:55-60
- claim: The brief's step 6 tells `builder` to copy two files over the Roughnotes target's own copies and then restore them with `git -C ... checkout --`, which the permission floor bars outright, and which contradicts the brief's own Scope line.
- rule: .agents/orchestration.md § Permission floor — "No role runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Each discards a working-tree change silently." and "Every role honours this floor. No dispatch may widen it
- fix: Record the widening against brief 5 on the campaign record, and move any future portability reading to the Orchestrator's own tracked command against a scratchpad copy of the target, never a role writing and reverting a live checkout.

### 5. [forces] [tenets] Shadow lengths authored in px depart from Elements' rem with no recorded departure
- site: C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:204
- claim: Veneer authors the three elevation tokens in `px` where Elements authors them in `rem`, so the shadows stop tracking the root font size, and neither the guide's elevation row nor its Departures table records the change.
- rule: Preserve the look and feel that the user values in Elements, including its interaction animations. Investigate how its CSS, JavaScript, and native elements produce those effects, then reproduce the intended experience in Veneer.
- fix: Author the three elevation tokens' offsets, blurs, and spreads in `rem` at Elements' own values (`0.0625rem`, `0.125rem`, `0.1875rem`, `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2.75rem`, `-0.25rem`, `-0.5rem`), keeping the `var(--vn-factor-elevation)` multiplier, and re-read the two alias proofs in `tests/src/styles/tokens.test.ts` against the calibration's px readings at the 16 px root.

### 6. [forces] [tenets] `--vn-font-sans` departs from the Bootstrap variable it aliases and the Departures table omits it
- site: C:/Users/mikes/WebstormProjects/veneer/guides/tokens.md:196
- claim: `--bs-font-sans-serif` resolves to a shorter stack than Bootstrap 5.3.8 declares, and the guide's Departures table — which the guide presents as the record of values that differ from the aliased release — carries no row for it.
- rule: Make any proposed incompatibility explicit and reconcile it with the user's requirements before accepting it.
- fix: Add a Departures row for `--vn-font-sans`, through `--bs-font-sans-serif`, giving Veneer's stack and Bootstrap 5.3.8's, and name the three dropped families so a consumer on Linux or Android can decide whether to re-add them.

### 7. [forces] [tenets] No proof derives a `bootstrap`-sourced value from the installed Bootstrap stylesheet
- site: C:/Users/mikes/WebstormProjects/veneer/guides/tokens.md:15
- claim: Every token the guide marks `bootstrap` asserts equality with Bootstrap 5.3.8's own value, and no test reads that value from the digest-pinned stylesheet, so each of those parity claims is prose a change cannot break.
- rule: Maintain conformance coverage for the Bootstrap capabilities Veneer must replace and for every new capability Veneer supplies. Derive compatibility expectations independently of Veneer's implementation.
- fix: Extend the `readBootstrapVariables` reader `units/u3-brief-2.md` item 4 introduces to return each declaration's value beside its name, then assert in `tests/src/styles/tokens.test.ts` that every token the guide sources `bootstrap` resolves in the browser to the value that reading carries, and drive the Departures rows off the same reading so a Bootstrap bump reddens the guide.

### 8. [forces] [tenets] Three of the four scale factors have no proof that setting one rescales anything
- site: C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:162
- claim: `--vn-factor-radius`, `--vn-factor-elevation`, and `--vn-factor-motion` are registered, documented as customization controls, and never driven, so the guide's claim about what changing them does to a consumer rests on the token's presence alone.
- rule: Expose clear representations of CSS variables and prove what changing them does to actual consumers. Test resolved styles and rendered effects; the presence of a token name or a generated value alone is insufficient.
- fix: Add one case per remaining factor that sets it on the document element and reads the rescaled result through a consuming property — `border-top-left-radius` for radius, the parsed `box-shadow` lengths for elevation, and `transition-duration` for motion — then restores the factor and reads the neutral result back.

### 9. [forces] [tenets] The mixin tier proof asserts on generated declaration text where a rendered reading was available
- site: C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/mixins.test.ts:81
- claim: The only proof that the tier mixin emits the calibrated mix percentages is a substring match over the generated CSS declaration, which passes for any declaration whose text happens to contain the percentage.
- rule: Test resolved styles and rendered effects; the presence of a token name or a generated value alone is insufficient.
- fix: Give the fixture a `--vn-color-probe-base` and a known surface, mount a specimen carrying the fixture class, and assert each tier resolves through `matchesPaintedColor` to the colour the 12%, 70%, and 35% mixes produce; keep the declaration-list assertion only as a presence guard beside it.

### 10. [forces] [tenets] The retained U6 report names swept launch paths and its gate logs and review evidence were never retained
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-report-4.md:48
- claim: The retained U6 round-4 report points at `` for every gate log and for the diff and status it names as review evidence, and those files exist only in the Test checkout's launch directory, so the sweep removes the evidence the round was accepted on.
- rule: Preserve necessary plans and evidence, then remove disposable .orkestrel and tmp artifacts safely.
- fix: Copy the named gate logs, the final diff, and the final status into `.orkestrel/veneer/units/` under the `<unit>.log.txt` pattern, then rewrite every `` path inside `units/u6-report-4.md` to the retained path it now names, before anything sweeps the Test checkout's `tmp/`.

### 11. [forces] [veneer] The fix brief's `readBootstrapVariables` spec names one rule where bootstrap.css has four and eight, so item 4 cannot close
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:91
- claim: Brief-2 § 4 tells the unit to read "the custom property names declared in the `:root` (or `:root, [data-bs-theme=light]`) rule for `'root'` and in the `[data-bs-theme=dark]` rule for `'dark'`" and assert `toStrictEqual` against the retained lists, but the installed stylesheet declares custom properties in four `:root`-prefixed rules and eight `[data-bs-theme=dark]`-matching rules, so a reader written to that spec returns 117 and 52 names against retained lists of 127 and 61 and the assertion reddens on correct data.
- rule: .agents/orchestration.md § Check the brief before you send it: "Paste the command and its output behind every factual claim — paths, counts, registrations, file existence." and "State every standing condition the same way: a file expected t
- fix: Rewrite brief-2 § 4 to specify a reader that walks every rule and accumulates in source order from each rule whose collapsed selector matches `/^:root(,|$| )/` for `'root'` and `/^\[data-bs-theme=dark\]/` for `'dark'`, stating that the second predicate must be anchored so `.navbar-dark, .navbar[data-bs-theme=dark]` is excluded. Replace the deviation trigger about a single dark block with the measured rule inventory as a standing condition, and record that both predicates were verified to reproduce the retained lists exactly.

### 12. [forces] [veneer] `matchesPaintedColor` is exported from an invented `tests/src/styles/fixtures/` home rather than a setup module
- site: C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/fixtures/colors.ts:23
- claim: `matchesPaintedColor` is a reusable test helper exported from `tests/src/styles/fixtures/colors.ts`, a location no rule sanctions, when `tests/setupBrowser.ts` is the declared home for browser helpers and is already loaded by the `src:styles` project.
- rule: .claude/rules/tests.md § Shared test infrastructure: "Export every reusable helper, fixture type, factory, constant, and guard from setup files." and "Place helpers by environment: ... `tests/setupBrowser.ts`: DOM/Vue/browser helpers and se
- fix: Move `matchesPaintedColor` into `tests/setupBrowser.ts` and move `readPaintedColor` there with it — it paints onto a canvas and reads `document`, so it is a DOM helper that the Node `setup` project cannot prove anyway — then delete `tests/src/styles/fixtures/`, repoint the two style proofs at `../../setupBrowser.js`, drop `readPaintedColor` from the `tests/setupStyles.test.ts` export-name list, and add its case to `tests/setupBrowser.test.ts`. Keeping the helper out of `tests/setupStyles.ts` keeps postcss out of the `src:browser` and `app:browser` graphs.

### 13. [forces] [veneer] Brief-2 § 2 changes `--vn-focus-width` and the shadow colours without scoping the three guide rows that state them, and no gate reads that guide
- site: C:/Users/mikes/WebstormProjects/veneer/guides/tokens.md:145
- claim: Brief-2 § 2 authors `--vn-focus-width: 0.1875rem` and re-authors the shadow colours as `rgba(var(--vn-palette-black-rgb), α)`, but § 3's enumerated guide edits do not name `guides/tokens.md:145`, `:211`, or `:137`, which state those values as `3px` and `inset 0 1px 2px rgba(0, 0, 0, 0.075)`, and `tests/guides.test.ts` never reads `tokens.md`, so the unit finishes green with a guide that publishes values the cascade no longer carries.
- rule: .agents/orchestration.md § Check the brief before you send it: "Scope the change by the files its result makes **false**, not by the files that declare the thing changing" and "Ask what the change does to every fact you measured, and fix ea
- fix: Add `guides/tokens.md:137`, `:145`, and `:211` to brief-2 § 2 as sites the value change owns, requiring each cell to carry the authored value after the edit. Because no gate reads `tokens.md`, make the acceptance criterion a named re-read of those three rows against `src/styles/_tokens.scss` rather than a gate exit code.

### 14. [forces] [process] Policy brief 5 ordered a builder to run `git checkout --` in another checkout, and it ran
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-policy-brief-5.md:58-63
- claim: The brief instructed a `builder` to overwrite two vendored files in the Roughnotes checkout and then restore them with `git checkout --`, which the permission floor bars outright and which no dispatch may authorize.
- rule: orchestration.md § Permission floor: "No role runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Each discards a working-tree change silently. A role that must undo its own edit undoes exactly that edit." And: "Ev
- fix: The Orchestrator takes the cross-target portability reading as its own tracked command, the way the plan already assigns it every `scaffold`-verb and cross-checkout command (`plan.md:36-39`). Where a unit must take it, have it copy the two target files aside before overwriting and restore by copying those exact bytes back — undoing exactly its own edit — and state in the brief that the git verb is barred.

### 15. [forces] [process] Commit 9b22b165 changed a vendored file and left the committed host inventory stale
- site: C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/styles.md:42-43
- claim: The styles rule clause was committed alone, without the regenerated `host.json`, so the tree at that commit fails the inventory digest gate on the file the commit changed.
- rule: orchestration.md § Check the brief before you send it: "Where the change edits a file the repository vendors or digests, the regeneration step precedes every gate that reads the generated artifact." § Publishing the fleet: "Bump and publish
- fix: Stage the regenerated `host.json` with the styles clause in the release commit, and run every vendored edit through the `policy-styles-entry-land.sh` shape — build, gates, then one pathspec commit carrying the file and the inventory together.

### 16. [forces] [process] The U3-policy unit landed a fleet-wide vendored surface with no independent verifier
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-policy-report-5.md:30-39
- claim: Every gate reading for the policy unit is the writer's own or the Orchestrator's own re-run; no `verifier` ran the authoritative chain over a change that `host.json` propagates to every target.
- rule: orchestration.md § Writing concurrency: "After integration, clear shared caches if needed, then have one independent `verifier` run the authoritative tree-wide sweep. A writer's self-report never establishes green." § Execution loop step 6:
- fix: Dispatch `verifier` on the scaffold chain — `format:check`, `lint:check`, `check`, `build`, `test` — over the accumulated policy diff, and retain its report as `units/u3-policy-gate-report.md` before the release commit.

### 17. [forces] [u3brief] The brief tells the unit test:policy is green; the Veneer checkout still carries the failing rule
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:16
- claim: Brief-2 states the Orchestrator re-vendored `tests/setupPolicy.ts` and `tests/policy.test.ts` with the stray-guide fix so `test:policy` is green on `guides/tokens.md` (D1 closed); in the Veneer checkout neither file moved, the fix exists only in the scaffold working tree, and the vendored sweep still rejects `guides/tokens.md`.
- rule: `.agents/orchestration.md` § Check the brief before you send it: "Paste the command and its output behind every factual claim - paths, counts, registrations, file existence. Name the scope any search covered, and check a fact against the co
- fix: Propagate the scaffold policy fix into Veneer (publish and re-pin, or vendor the built host copy) and re-measure before dispatch, or strike `test:policy` from acceptance criterion 2 and record it as a standing condition the unit must not diagnose, naming who repairs it.

### 18. [forces] [u3brief] Item 4's Bootstrap dark reading is falsified by the installed stylesheet
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:90
- claim: Item 4 specifies a reader that returns the custom properties declared in "the `[data-bs-theme=dark]` rule" and asserts `BOOTSTRAP_DARK_VARIABLES` `toStrictEqual` that reading; the installed stylesheet makes that assertion unsatisfiable, and the brief's own deviation clause then stops the unit.
- rule: `.agents/orchestration.md` § Check the brief before you send it: "Take every measurement under the conditions the unit runs in, or have the unit take it before doing anything else."
- fix: Paste the postcss reading into the brief and specify the selector predicate: every top-level rule whose selector is `:root` or `:root, [data-bs-theme=light]` for `'root'`, and every top-level rule whose selector begins `[data-bs-theme=dark]` for `'dark'`. Delete the deviation clause that would stop the unit on the shape you already measured.

### 19. [forces] [u3brief] Analyst finding 18's unproven-prose half has no carrier
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:75
- claim: The verdict carries analyst 18 into brief-2 § 3, but § 3 carries only the alias-propagation prose; the second half - that the integration proof omits the claimed emphasis and border results - is specified nowhere, so a false behaviour claim ships.
- rule: `.agents/orchestration.md` § Carry every finding: "Every finding names the brief item that carries it. A finding with no carrier is a dropped finding."
- fix: Extend item 3 (or add an item) to either add the two missing assertions to `tests/src/styles/integration.test.ts` or narrow the guide sentence to the results the proof actually reads, per `.claude/rules/documentation.md`: "Where a prose claim about behaviour sits under no fence, add the executed assertion that would break if the claim went false."

### 20. [forces] [u3brief] Item 3's count list omits the count the checker reported
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:88
- claim: Item 3 names the counts at `guides/tokens.md:10`, `:160`, `:167` and `src/styles/_theme.scss:18`, but the checker's FAIL named a third guide count at `:217` that the brief drops, so a banned count survives the fix round; the cited `:167` is also one line past the sentence it means.
- rule: `AGENTS.md` § Writing: "**NEVER state a count.** A number answering \"how many\" about a set anyone can add to is a count - rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets. Name the mem
- fix: Add `guides/tokens.md:217` to item 3's deletion list, correct `:167` to `:166`, and state the rule rather than the line numbers so a shifted line does not orphan the instruction.

### 21. [forces] [u3brief] The control-removal proof cannot work on the dirty tree the brief hands the unit
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:49
- claim: The brief requires removal of each plant to be proved with `git diff --exit-code -- <file>` where the file is tracked; every tracked file the plants touch already differs from HEAD by the whole U3 change, so that command returns non-zero whether or not the plant was removed.
- rule: `.agents/orchestration.md` § Check the brief before you send it: "Ask what the change does to every fact you measured, and fix each criterion to the state the unit finishes in."
- fix: Require removal to be proved by the absent text for every plant, or by diffing the file against a copy taken before the plant, and delete the tracked-file branch of the sentence.

### 22. [forces] [u3brief] No Unknowns section, while three unknowns are live in the brief
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:57
- claim: Brief-2 has no § Unknowns between § Context and § Scope, yet it carries three questions the Orchestrator has not settled, each scattered into another section where it reads as an instruction rather than as an unknown.
- rule: `.agents/orchestration.md` § Required sections: "**Unknowns.** What the Orchestrator does not yet know that the unit needs, named as unknown, with how the unit reports back on it. A brief that cannot be fully specified says so instead of sh
- fix: Add § Unknowns. Settle (a) and (c) by pasting the two commands' output - the bootstrap path resolves and no such export exists - so item 9 takes its stated fallback outright, and move (b) into the Unknowns row with the reading you take before dispatch.

### 23. [bound] [retention] U3-policy review rounds retain no dedicated verdict file
- site: .orkestrel/veneer/units/u3-policy-review-report.md through -5.md (no u3-policy-review-verdict*.md exists anywhere under .orkestrel/veneer)
- claim: Unlike the U3 and U6 audit rounds, which each retain a separate `<unit>-audit-verdict.md`, the five U3-policy review rounds have no dedicated verdict file; the per-round report file doubles as both report and ruling.
- rule: "Write the round's verdict to `.orkestrel/<package>/<unit>-audit-verdict.md`. That file is where the audit step records a lane or a checker that did not run." (.agents/orchestration.md § Dispatch anatomy)
- fix: No forced rewrite needed now since the ruling content is present in substance, but a future round of this unit should split the reviewer's ruling into a named `u3-policy-review-verdict-N.md` to match the naming convention the other rounds follow.

### 24. [bound] [plan] § Standing conditions' scaffold rows are stale after today's vendored edits
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md:73,78
- claim: The registry row pins `@orkestrel/scaffold` `0.0.75` as the condition, while the campaign now depends on an unpublished vendored change Test and Veneer must re-pin to; and the policy-mirror row's line citation resolves to a different declaration.
- rule: plan.md:78, consequence column — "Pin `vitest` to the `^4.1.11` line that `@orkestrel/test` peers and Scaffold's base set declares"; the row is the pinning authority for this campaign's installs.
- fix: Add a standing-conditions row naming the unreleased vendored policy change, the two consumers that must re-pin, and that `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts` in each target; and re-cite plan.md:73 to `stemToPolicyCandidates` at its current line.

### 25. [bound] [plan] U4b's guide bullet does not carry the two guide-policy constraints U3 discovered
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md:378-379
- claim: U4b must write `guides/compatibility.md`, a second top-level guide with no TypeScript surface, which is exactly the shape that reddened `test:policy` and `test:guides` in U3; the plan's U4b bullet names neither constraint and neither appears as a U4b prerequisite.
- rule: .agents/orchestration.md § Execution loop, step 7 — "Walk the remaining units once and ask of each whether what landed still supports it. A decision taken inside a unit can remove a later unit's foundation, and the unit that took it cannot 
- fix: State in U4b's bullet that `guides/compatibility.md` must be linked from `guides/README.md` for the amended stray-guide rule to admit it, and that it sits in § By directory rather than the concept index; make the vendored re-pin of the amended policy a U4b prerequisite.

### 26. [bound] [plan] Retained artifacts point at swept launch copies, and U6's review evidence was never retained
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-report-4.md:81
- claim: Retained briefs and reports name `tmp/` paths that resolve to nothing after the sweep, and the diff and status output that were U6 round 4's review evidence have no retained counterpart.
- rule: .agents/orchestration.md § Dispatch anatomy — "Rewrite every `tmp/` path inside a copied artifact to the retained path it now names, in the same action that copies it. A retained file naming a launch copy resolves to nothing after the sweep
- fix: Retain U6 round 4's diff and status as `units/u6-round4-final.diff.txt` and `units/u6-round4-final-status.txt`, then rewrite every `tmp/` reference in the retained briefs and reports to its `.orkestrel/veneer/units/` path before the campaign's sweep.

### 27. [bound] [tenets] `interpolate-size` is adopted for an animation the proof never runs
- site: C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/elements/html.test.ts:5
- claim: The document baseline declares `interpolate-size: allow-keywords` so a size transition can interpolate to and from `auto`, and the only proof reads the declared property string rather than an interpolation.
- rule: Investigate native support before adding custom machinery. Verify the resulting behavior and animation rather than assuming a native element automatically supplies the complete component contract.
- fix: Record the bound in `guides/tokens.md` now — the declaration is proved present and its interpolation is proved by the first animated consumer — and name the disclosure or drawer unit as the carrier of the frame-sampled proof, the way `.orkestrel/veneer/research/calibration.md` samples Elements' own courses.

### 28. [bound] [tenets] The retained U6 successor brief cites its superseded briefs by launch path
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-brief-5.md:5
- claim: The retained successor brief states its authority chain in terms of `` copies, so after the sweep the brief an executor opens names two documents that resolve to nothing even though both are retained beside it.
- rule: Preserve necessary plans and evidence, then remove disposable .orkestrel and tmp artifacts safely.
- fix: Rewrite the three `` references in the retained `units/u6-brief-5.md` to `units/u6-brief-4.md`, `units/u6-brief.md`, and `units/u6-report-5.md`, and apply the same rewrite to every retained artifact that cites a launch copy.

### 29. [bound] [veneer] `BOOTSTRAP_ROOT_VARIABLES` TSDoc claims Bootstrap declares the same set on `[data-bs-theme=light]`, which is false for the breakpoint rung
- site: C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:252
- claim: The doc block states "Bootstrap declares the same set on `[data-bs-theme=light]`, so one list here covers both selectors", but six of the 127 names are declared in a `:root` rule that carries no `[data-bs-theme=light]` arm, so the list does not describe what `[data-bs-theme=light]` declares.
- rule: .claude/rules/documentation.md § Parity: "Falsify a prose claim the way you falsify a code claim. The parity test proves a name exists, never that a sentence about behavior is true, so run the example and read what it returns."
- fix: Replace the sentence with what the reading shows: the list is the union of every `:root`-prefixed rule, and Bootstrap repeats all of it on `[data-bs-theme=light]` except the `--bs-breakpoint-*` rung, which `:root` declares alone and Veneer declares the same way.

### 30. [bound] [veneer] `BOOTSTRAP_DARK_VARIABLES` TSDoc mis-describes four of its own members
- site: C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:390
- claim: The doc block accounts for the list as "the `[data-bs-theme=dark]` block itself, and the component rules it nests under that selector, whose image-valued variables have no theme-scope light counterpart", but four members come from two further top-level `[data-bs-theme=dark]` blocks, are not nested under a component selector, two of them are colour-valued rather than image-valued, and all four do have a theme-scope light counterpart.
- rule: .claude/rules/documentation.md § Parity: "Re-read the prose last, against what actually shipped. Where a change chose to document a limit rather than close it, the sentence was often drafted for the option that lost, or written more confide
- fix: Restate the remark as the guide already does: the list is every rule whose selector begins `[data-bs-theme=dark]`, which is the theme block, the two later theme blocks carrying the close-button and carousel values that also have a light counterpart, and the nested component rules whose image variables have none. Exclude `.navbar-dark, .navbar[data-bs-theme=dark]` by name, because a reader matching the substring picks up its seven `--bs-navbar-*` declarations.

### 31. [bound] [veneer] The landed literal-colour clause is narrower than the `_tokens.scss` it was written to permit
- site: C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/styles.md:43
- claim: The clause permits a literal colour only in "the value map in `_tokens.scss`", but `_tokens.scss` declares most of its literal colours directly in a `:root` block rather than in a Sass map, so the clause as written refuses conforming code in the tree it was authored for.
- rule: .claude/rules/styles.md § Prohibitions:42-43: "The one place a literal color may appear is the value map in `_tokens.scss` that declares the token itself."
- fix: Narrow the clause to the file rather than to a construct inside it: a literal colour may appear only in `_tokens.scss`, where the token is declared. Land that wording in the scaffold rule and re-vendor it with the same release the verdict already schedules.

### 32. [bound] [u3brief] The brief states counts while instructing their deletion
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:157
- claim: Brief-2's own prose states counts over sets that can grow, in the same document that orders the unit to delete such counts from the guide.
- rule: `AGENTS.md` § Writing: "**NEVER state a count.** ... Delete a count you find. Do not correct it." and, on scope, "This governs prose everywhere: chat replies, instruction files, guides, TSDoc, commit messages, and briefs."
- fix: Recast criterion 3 as "Every control named in § Control identifiers turned its named assertion red and every plant is removed", and drop the numerals from the item sentences that already name their members.

### 33. [note] [scaffold] --offline reads the installed package's own vendored floor, not the network
- site: C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:672
- claim: `repair --offline` (and `audit`/`overwrite --offline`) resolves the vendored host from `readHostFloor()` — the bytes bundled inside whatever `@orkestrel/scaffold` package is currently installed in the target's node_modules — while the default (non-offline) path instead calls `Upstream.read()` to fetch bytes over the network for the declared dependency version.
- rule: "Build the dependency from source, pack it, and install the tarball into the consumer... Install it, never link it." (.agents/orchestration.md § Fixing a dependency before it publishes)
- fix: To vendor this unpublished fix into Veneer before scaffold publishes 0.0.76: build scaffold (`npm run build`), `npm pack` the tarball, `npm install` that tarball into Veneer's node_modules (never `npm link`), then run `scaffold repair --offline` inside Veneer. Because `--offline` reads `readHostFloor()` from the just-installed tarball rather than fetching from the network, it materializes the fixed tests/setupPolicy.ts, tests/policy.test.ts, guides/scaffold.md, and .claude/rules/styles.md into Veneer without waiting on publication. Record the replaced version range per the dependency-fix rule, and once scaffold actually publishes 0.0.76, restore the registry copy and re-pin Veneer to it, per "Restore the registry copy before any gate that must prove the published artifact, and before publishing anything."

### 34. [note] [scaffold] Stray-guide sweep rule is stated once, and the updated wording is uncommitted
- site: C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:1151-1156
- claim: The stray-guide sweep rule (what counts as an excluded top-level guide) is documented in exactly one place, guides/scaffold.md around lines 1151-1156, and the diff there is the uncommitted addition of the "nor a guide `guides/README.md` links" clause; no other sentence in guides/*.md, .claude/rules/*.md, or .agents/skills/ restates the old or new rule.
- rule: assignment check 6: "Whether the scaffold guide (guides/scaffold.md) documents the stray-guide rule in one place only, or whether another sentence elsewhere in the guide or in .agents/skills still states the old rule."
- fix: None needed for duplication; this rule statement rides along with the same commit-and-bump obligation named in the first finding, since guides/scaffold.md is one of the four uncommitted vendored files.

### 35. [note] [process] The three U3 shared-file patches were integrated correctly; record the ruling
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/.orkestrel/../units/u3-report.md:272
- claim: The D3, D4, and D6 patches into `tests/distribution.test.ts`, `guides/veneer.md`, and `configs/src/vite.styles.config.ts` are within the integration rule, were briefed as off-limits and report-only, and were audited by a lane the Orchestrator does not share.
- rule: orchestration.md § Execution loop step 4: "Evaluate each distillate against its acceptance criteria, apply shared-file patches serially ... Integration applies exact returned patches and mechanical conflict resolution only." § Writing concu
- fix: No change. Keep the ruling on the record so the contrast with the styles clause is visible: a returned exact patch is integration, and an Orchestrator-authored clause is a unit that owes a brief, a report, and an audit.

### 36. [note] [process] U6's checker omissions carry round-specific reasons, not a template
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-2.md:10-12
- claim: The recorded reasons for omitting `checker` in U6 rounds 2 and 3 name each round's own facts, so neither is the template sentence the rule bars, and the omission itself is permitted because the checker is additive rather than a lane.
- rule: orchestration.md § Execution loop step 5: "Dispatch `checker` in addition when the acceptance criteria are mechanical — counts, paths, parity rows, scope honesty — never in place of a lane. A round that runs fewer lanes than its brief names
- fix: No change. Round 3's sentence is round 2's structure with the claim numbers swapped, which is the thinnest form the rule still admits; if round 4 reuses it again with only the numbers changed it becomes the template the rule bars, so make round 4's reason name what that round's fix actually touched.

### 37. [note] [u3brief] Item 8's mixin rename names a guide site that does not exist
- site: C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-2.md:126
- claim: Item 8 instructs the unit to rename `palette-each` to `role-each` "with its callers and the guide"; no guide names the mixin, and the site the instruction misses is a test fixture stylesheet.
- rule: `.agents/orchestration.md` § Check the brief before you send it: "Paste the command and its output behind every factual claim - paths, counts, registrations, file existence. Name the scope any search covered."
- fix: Replace "and the guide" with the measured site list - `src/styles/_mixins.scss:28,60` and `tests/src/styles/fixtures/mixins.scss:25` - and give the search bound a word-boundary sweep over `palette-each` across `src/`, `tests/`, and `guides/`.
