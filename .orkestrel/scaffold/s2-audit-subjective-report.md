# Unit S2 audit — subjective lane report

Lane: `reviewer` holding the **subjective** lane, Opus 5, native subagent, clean context,
2026-09-16. Brief: `.orkestrel/scaffold/s2-audit-subjective-brief.md`. Transcribed by the
Orchestrator from the lane's returned message; the role carries no write tool.

**Ruling: REJECT.** The direction is right and most of the fix round landed cleanly — the
relocation, the derived population, the sharpened typecheck control, and the naming all improve the
product. The rejection rests on the emitted prose: every generated `vite.config.ts` ships a comment
whose load-bearing sentence is false against the installed Vite declaration, and the merge's own
vocabulary claims a guard the body does not perform.

## Per-claim verdicts

1. **No flattening — CONFIRMED.** `vite.config.ts:50-84` contains no `flat` call and the predicate
   excludes arrays on each side. The case at `tests/src/core/compilers.test.ts:3093-3106` pins one
   nesting level; depth-independence follows from the absence of any flatten, which is a source
   reading rather than a case.
2. **Caller duplicates survive in order — CONFIRMED.** `tests/src/core/compilers.test.ts:3108-3116`
   covers the bare-override path and the same-named-base path. The reverse shape — a base carrying
   two same-named entries — is not covered and produces a different result; see Finding 2.
3. **Replacement in position, unmatched append in caller order — CONFIRMED.** Pinned at
   `3060-3091`, re-proved through the real `srcServer` factory against the real vendored boundary
   plugins, with the bare concatenation as the control. Append order pinned at `3118-3129`.
4. **Opaque entries pass through — CONFIRMED, with one weakness.** The assertion is `toStrictEqual`
   on the whole result rather than identity per entry, so for `anonymous = {}` the case would also
   pass if the merge substituted a fresh empty object. The nested case uses `toBe` and has no gap.
5. **The hazard case derives its population — CONFIRMED.** `3040-3043` reads the project rows and
   filters to callables; the `registered.length === 0` throw is an empty-population guard, not a
   transcribed total; the control at `3053-3057` sits outside the factory population. This closes
   the round-one finding properly.
6. **Relocation byte-neutral — CONFIRMED.** Placement at `src/core/templates.ts:340-385`; the
   compiler's fill reduces to the selection. Byte-neutrality holds by construction as well as by
   capture: `s2-relocate.mjs:12` lifts the literal verbatim including its backticks, it contains no
   `${` interpolation, and escape handling is identical in both files. On the instruments: the
   comparison is sound, but `s2-compare.mjs:8-10` controls the comparator rather than the capture. A
   capture that silently emitted nothing would pass that control identically. The control should
   have perturbed a template character and re-captured.
7. **The browser case plants a control — CONFIRMED, weakly.** It satisfies the brief and is close to
   vacuous: after removing the substring it proves that `toContain` discriminates, which nothing
   doubts, and it couples to Vitest's message text. The sibling in `templates.test.ts` earns its
   plant because `findRefusals` is a parser-backed reader with real blindness.
8. **The refusal requires both fields — PARTIALLY CONFIRMED.** The predicate and the `command`-alone
   case are as claimed, and the vendored file is unedited. "Its project passes" rests on the
   writer's report and the parallel verifier; UNSETTLED in this lane.
9. **Naming and placement — CONFIRMED.** The rename is complete outside campaign records; the
   required signatures are inlined at the single call site and pinned independently by the sibling
   assertion, which is the right fold. `find*` matches the file's established `findDrift` and
   `findWide` forms.
10. **The showcase comment — CONFIRMED on the letter, defective in substance.** See Finding 4.
11. **No emitted wrapper changed — CONFIRMED.** The core wrapper's base declares no plugins; the
    browser and server wrappers add a plugin whose name differs from both boundaries; the bin
    wrapper passes no plugins; the app wrappers pass no override.
12. **Byte-identity — CONFIRMED as a mechanism.** The case states its artifact population before
    comparing and carries a control that must disagree. Whether it passes now is gate evidence.
13. **No vendored change — PARTIALLY CONFIRMED.** The status lists no vendored path; the post-build
    half is gate evidence.
14. **No banned syntax — CONFIRMED.** Only prose matches for the English word "as".
    `Reflect.apply` is the legitimate dynamic door for a test whose subject is a value the declared
    signatures refuse; one of its two uses carries the explaining comment and the other does not.
15. **Recorded reds — UNRESOLVED.** The reds exist only in the writer's report, which the claim list
    itself designates a claim rather than evidence. The retained instruments hold the implementation
    and capture scripts, not the mutations, so nothing on disk re-produces any red.

## Findings

**Finding 1 — the emitted comment states a falsehood about `UserConfig`. Required.**
`src/core/templates.ts:100-101`, `vite.config.ts:39-40`, `tests/src/core/templates.test.ts:931-933`.
The sentence reads "A `UserConfig` declares neither `command` nor `mode`, so a value carrying both
is treated as Vitest's invocation record rather than an override." `UserConfig` declares `mode`:
`node_modules/vite/dist/node/index.d.ts:3477` opens the interface and `mode?: string` sits at line
3517. Only `command` is absent. This is product prose shipped in every generated workspace, and it
is the justification for the one mechanism a developer must trust before passing an override at all.
A reader who checks it against Vite's own types finds it false and then has no reason to believe the
rest. It also under-sells the design: the mechanism is sound precisely because the pair is the
discriminant.

**Finding 2 — `used` names a consumption ledger the search never consults. Required.**
`vite.config.ts:55-79`, mirrored at `src/core/templates.ts:116-140`. `findIndex` runs fresh for
every base entry and never skips a consumed index. A reader meeting a `Set<number>` named `used`
inside a selection loop will read it as the guard that stops an override entry being taken twice.
The writer's own first implementation carried that guard —
`.orkestrel/scaffold/s2-instruments/s2-edit.mjs:18-19` writes the callback with
`!used.has(position) &&` — and the shipped body dropped both the parameter and the conjunct with no
retained record of the decision. Consequence, referred to the objective lane: a base declaring two
entries named `x` against an override carrying one takes the override entry into both positions and
discards the second base entry. No emitted factory reaches that shape, but `mergeOverride` is
exported, so a workspace developer can supply such a base.

**Finding 3 — the merge comment never says what happens to everything that is not `plugins`.
Required.** `src/core/templates.ts:105-110`, mirrored at `vite.config.ts:44-49`. The paragraph
presents array concatenation as the problem the function solves, so a reader concludes it is solved
generally. The concrete case a workspace developer hits first is `test.setupFiles` — overriding it
yields the entry twice, silently. `build.rolldownOptions.output` is the same shape. Add one sentence
stating that every other key merges as `mergeConfig` merges it.

**Finding 4 — the `assetsInlineLimit` reason is split across two comments and closes neither.
Required.** `src/core/templates.ts:340-345` and `371-372`. The template-level comment gives the
purpose and omits the overwrite; the emitted comment gives the overwrite and omits the purpose.
Neither states the case the line exists for. The emitted comment is the one a generated workspace's
developer reads, and it ends on "this is overwritten anyway" — which invites the obvious cleanup,
deleting a line that appears to do nothing, which is precisely the deletion the comment exists to
prevent.

**Finding 5 — `replacements` states a judgment false for some of its members. Recommended.**
`vite.config.ts:54`. The constant holds every override entry, and the function's own comment says
most of them append rather than replace. `entries` or `overrides` holds what the list holds. Related
and minor: `selected` and `merged.plugins` are two names for one list within one function, and
`mergeOverride(showcase, override)` passes an overlay as the parameter named `base`.

**Finding 6 — the guard chain is one idea written twice inline. Recommended.**
`vite.config.ts:58-71`. The callback spells "is this a named top-level plugin object" once for the
base entry and once for the candidate — the same conjuncts, twice, with the base half re-evaluated
for every candidate. The emitted comment states the rule and the code never names it, so the reader
re-derives it from eleven lines of conjunction. Extracting it also removes the invariant work from
the inner loop and makes Finding 2's shape visible.

**Finding 7 — the emitted showcase comment breaks the file's comment voice. Recommended.**
`src/core/templates.ts:371-372` writes its code tokens as bare words while the sibling comment
backticks them, and opens with an imperative that addresses nobody.

**Finding 8 — the browser-case control asserts Vitest rather than the subject. Recommended.**
`tests/src/core/compilers.test.ts:1141-1145`. Either make the plant meaningful — assert the sealed
copy fails the emitted-workspace typecheck — or drop the nesting and keep the plain assertion.

## Rulings beyond the claims

- **Predictability.** Predictable for `plugins`; not for anything else. Still unsaid: that arrays
  outside `plugins` concatenate; that the match is by `name` alone, so a base plugin's options are
  discarded wholesale when a caller names it; and what a caller whose override is silently discarded
  can do about it.
- **The body.** Not one idea. Under this repository's own would-be-helper rule the predicate belongs
  in a named function.
- **The comments.** The seal replacement teaches — it names the mechanism and the vendored proof
  that drives it. The emitted merge comment teaches its second paragraph well and is honest about
  silence, but rests on a false premise. The showcase comment asserts rather than teaches.
- **Vocabulary.** `candidate`, `base`, `override`, and `showcase` are apt. `replacements` states a
  false judgment; `used` claims an invariant the body does not hold; `selected` is a third name for
  one list. The one axis is spelled `used` in code and "Remaining" in the comment.
- **The relocation.** A clear win. Two small residues: the `showcase` key reads as a fourth app
  environment when it continues `browser`, and its value opens with a bare newline that is
  load-bearing for the emitted blank line, with nothing saying so.
- **The test files.** Mostly right. The hazard cases read as proofs of the rule. The typecheck
  control is a genuine improvement — planting `{ unreachable: false }` proves the parameter carries
  `UserConfig` rather than an open type. Against that, the whole-output case transcribes the emitted
  text; that is the right call, because asserting an implementation against itself is barred and the
  transcribed literal is the independent fixture. Its cost is real and should be recorded rather
  than fixed: the merge body now lives in three places, each gated by a test that reddens on a
  partial move, and the next author pays for it three times.

VERDICT: REJECT
