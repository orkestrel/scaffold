# Unit R1 audit — subjective lane report

Lane: `reviewer` holding the **subjective** lane, Opus 5, native subagent, clean context,
2026-09-16. Transcribed by the Orchestrator from the lane's returned message; the role carries no
write tool.

## Per-claim verdicts

1. **Byte-identical bodies — CONFIRMED.** Compared line by line against the scaffold file: the merge
   body and `isNamedPlugin` agree character for character, including the `taken` set, the
   `findIndex` predicate's line break, the trailing-append loop, and the predicate's conjuncts. The
   unit's two extracts agree with both independent reads. Caveat: the lane cannot run `git show`, so
   it compared against the scaffold **working tree**; that checkout's status lists `vite.config.ts`
   as unmodified and the unit's `f83ee063` extract matches it, so three readings agree.
2. **Every difference named and justified — REFUTED on the justification half.** The naming half
   holds. The justification half fails on the `@returns` row, which the report justifies as "what
   the merge does hold" and which does not hold. A second retained sentence also fails verification;
   see Finding 3.
3. **The `@returns` line states a property the merge holds — REFUTED.** "Every base entry in the
   position the base gave it" is false whenever a replacement occurs, which is the merge's defining
   behaviour: for base `[vue, boundary]` and override `[vue']`, the base's `vue` entry is not in the
   result at all. The file's own vocabulary makes "entry" the object rather than the slot —
   `createNamedEntry` exists "so a proof compares entries by reference rather than by shape" — so
   the charitable "every base *position*" reading is not available. A reader applying the line to
   base `[alpha, alpha]` with override `[alpha]` predicts both base entries surviving; the actual
   result is `[replacement, repeated]`. An improvement on the line it replaced, and still inaccurate.
4. **A case per behaviour, each red from a subject mutation — CONFIRMED.** Six behaviours, six
   cases, six scripts, six logs. Every script mutates `vite.config.ts` — the flatten, the
   appended-entry keying, the pushed base entry, the dropped `taken` guard, the dropped string test,
   the widened refusal — and none touches an assertion. All six guard on the target's presence and
   restore from the in-memory original in a `finally`, so every failure path restores.
5. **Each new case carries a control contrasting against the first draft — REFUTED.** Five of six
   contrast against a real rival: `.flat()` for the nested case, `keyByName` for the
   caller-duplicate, base-repeat, and numbered-name cases, and bare `mergeConfig` for the position
   case. The sixth does not; see Finding 2.
6. **Existing cases unedited and green; the Vue case still discriminates — CONFIRMED.** The diff
   adds only. The Vue case passes for the new reason — the override's entry replaces the base's at
   the base's position rather than collapsing into a name-keyed map — and its control still builds
   the concatenating `mergeConfig` and still reports the plugin twice, so the case still fails
   against the untracked behaviour. The showcase-parity case also passes for the new reason, because
   the output boundary's name is fixed, so the showcase boundary replaces the browser boundary in
   place. One consequence worth recording: the position mutation does not redden the Vue case,
   because pushing the base entry still yields exactly one Vue plugin. The Vue case binds the count,
   the added position case binds the direction. That is the right division.
7. **The `tests/config.test.ts` sentence is true here — REFUTED on the "every registered factory"
   half.** The sentinel half holds: the vendored file builds a sentinel carrying `command` and
   `mode`, filters `projects` to factories, and refuses an empty set, so the narrowed discriminant
   still refuses it. See Finding 3 for the other half.
8. **No wrapper or journey project changed, with a failing negative control — CONFIRMED.** Source
   derivation: the wrapper calls `appBrowser()` with no argument, `journey` spreads `appBrowser()`
   rather than passing an override, and `appShowcase()` passes an override carrying only the
   boundary and `build`, so every call in this workspace enters through a branch both drafts share.
   Measurement agrees: the ported and draft captures are identical in length, tail, and captured
   plugin name arrays. The control is real and complete — it carries a changed `base` at all seven
   sites where the draft carries none, so the instrument sees a change at exactly the branch every
   call takes.
9. **Nothing outside the owned list moved — CONFIRMED, with two disclosures.** The status reports
   only the two owned files plus the Orchestrator's untracked brief. The stray file the report
   self-discloses in the scaffold checkout is gone, and that checkout's `vite.config.ts` is
   unmodified. The unit also created two files under `tmp/probe/`, outside the brief's named
   `tmp/units/` list; `.claude/rules/tests.md` § Probes fixes `tmp/probe/` as the mandatory home for
   a runtime probe, so the placement is correct and the deviation is the brief's enumeration.
10. **No banned syntax — CONFIRMED** over the two changed files whole, not only the added lines. The
    one narrowing construct added is the type predicate, which is a guard rather than an assertion.
11. **No Sass deprecation line — CONFIRMED**, zero matches across the retained build and test logs.

## Findings

**Finding 1 — DEFECT, moderate. The `@returns` line claims base entries survive replacement.**
`@returns` is where a reader looks for the return's shape, and this line is one of the two things
the port was asked to get right. What right looks like — name the slot and its occupant, and name
the refusal:

```text
 * @returns The merged configuration. Each base position carries its own entry, or the override
 * entry that replaced it, and every override entry that replaced none follows in the order the
 * caller wrote it. The base itself when the override is absent or is Vitest's invocation record.
```

**Finding 2 — DEFECT, moderate. The discriminant case's control is ceremonial.** The control reads
`expect(() => expect(refused.base).toBe(COMMAND_ONLY.base)).toThrow(/expected/u)` under a comment
naming the `command`-alone refusal as the rival. It constructs no rival: `refused` is the subject's
own result, and the invocation record carries no `base` key, so that property is `undefined` under
the shipped merge, under the rival, and under a merge with no discriminant at all. The control
cannot fail for any implementation, and the retained log confirms the mutation reddens the case's
own assertion rather than this one. The file's header states the standard it breaks — each proof
carries the untracked behaviour as its control. Build the rival and show the merged reading fail
against it, the way the position case builds `mergeConfig`.

**Finding 3 — DEFECT, low. The `tests/config.test.ts` sentence is true in scaffold and false here.**
In scaffold every registered project function takes `override?` and ends in
`return mergeOverride(project, override)`. Here the registered set is `appCore`, `appBrowser`, four
`journey` entries, `policy`, `config`, `conformance`, and `probe`, and every one except `appBrowser`
is a parameterless arrow that never reaches `mergeOverride`. The vendored test hands the sentinel to
all of them, and exactly one forwards it. The sentence is the doc's only claim about who proves the
refusal. State what the vendored file actually does here:

```text
 * The `tests/config.test.ts` file hands that record to every registered factory and refuses any
 * configuration that carries a field of it.
```

**Finding 4 — RECOMMENDATION, low. `keyByName` names a map and returns a list.** The helper returns
a plugin list, so a reader expects a `Map` or a record. `keyBy` is a borrowed form outside the
helper prefixes the naming rules fix. Rename to `selectByName`, which names the returned value and
matches the comments that already call it "the name-keyed selection".

**Finding 5 — RECOMMENDATION, low. The nested case's name count states no coverage.** The reader
stringifies the nested array, so the count covers top-level entries only — yet it reads as the
deduplication the merge does not claim, which is the exact misreading the port's own report exists
to prevent. Add the coverage beside the result: the count reads top-level entries, and Vite flattens
the nested entry at resolve time.

**Finding 6 — RECOMMENDATION, low. The retained instruments need an interpreter named.** The red
scripts and both wrapper scripts are Python; scaffold's retained instruments are Node. It does not
matter for correctness — each is one plain file invocation, each guards its target, each restores in
a `finally`, and this checkout already carries Python instruments from earlier units. It matters for
a later re-run, because `package.json` declares a Node toolchain and nothing declares Python. Name
the interpreter in the retained record, or port the scripts when they are copied across.

## Rulings this lane owns

- **The TSDoc block.** The prose survived the reframing intact. Both of scaffold's paragraphs are
  carried whole into `@remarks` with no clause dropped, the summary opens third-person and does not
  name the symbol, so the summary policy is satisfied, and the tag order matches the sibling blocks.
  The summary says what the merge is for in this workspace's own terms. The `@remarks` read as one
  document: the paragraphs cover two hazards in the order a reader meets them, and the second gives
  the reader the two behaviours the `@returns` line garbles. One sentence in it is untrue here,
  which is Finding 3.
- **The `@returns` line.** Not accurate, not complete, not predictable. Refuted at claim 3.
- **The new case names.** They state rules, not mechanisms, and match the file's established form —
  verb first, subject implicit, contrast clause where one sharpens the rule. No rename required.
- **The controls.** Five contrast against something a reader would actually believe, and each rival
  is the first draft's own mechanism; bare `mergeConfig` is the strongest of the set because it is
  the real upstream behaviour rather than a modelled one. The sixth proves nothing.
- **One mutation reddening two cases.** Honest overlap. Dropping the replacement breaks the rule
  both cases read at the first position, and the base-repeat case cannot assert its own behaviour
  unless replacement happens first. Its distinguishing behaviour is isolated by the `taken` mutation,
  which reddens that case alone. Each added behaviour has at least one mutation that isolates it,
  and the unit disclosed the overlap rather than letting it pass as coverage.
- **The nested residual.** The doc block is honest at the mechanism level and silent on the
  consequence: it tells a reader what the merge selects over, not that Vite flattens recursively
  afterwards. Naming that belongs in scaffold's committed prose, not in a local fork, so the unit's
  decision to record it rather than edit here is the right call. Carry it upstream as a successor.
- **Is the change done.** No. The port of the code is done and is sound. Three defects remain, all
  one-line prose or one-block instrument fixes inside files the unit already owns.

## Referrals

- To the objective lane: the capture instrument maps every function to a string before comparison,
  so it cannot see a change in a plugin's hooks. Whether that coverage suffices for claim 8 is a
  measurement question.
- To the objective lane: whether the declaration-placement rule reaches a root config file.
- To the Orchestrator: the red scripts, their logs, and the wrapper instruments exist only under
  `tmp/units/`; the retention rule wants them copied across before the sweep.

VERDICT: REJECT
