# B-PASSIVE-PROSE round 3 report (`builder` on Sonnet)

Brief: `/home/user/scaffold/.orkestrel/veneer/units/b-passive-prose-brief-4.md`. Carries claim 8, O1, O2, O3, and the `renderRuleKey` observation from `bpp-audit-2-objective-verdict.md`.

## Ledger of every changed line

Each row names the file, the tag or phrase, the text before this round, and the text after it.

| File | Site | Before | After |
| --- | --- | --- | --- |
| `setupServer.ts` | `scanOracleObligation` (near line 179) | `is refused by {@link scanOracleObligation} as a fault in` | `is refused by the {@link scanOracleObligation} helper as a fault in` |
| `setupServer.ts` | `computeArtifactDigest` (near line 309) | `through {@link computeArtifactDigest} over the manifest-rooted` | `through the {@link computeArtifactDigest} helper over the manifest-rooted` |
| `setupServer.ts` | `FORBIDDEN_RUNTIME` (near line 339) | `` `@tailwindcss/` in {@link FORBIDDEN_RUNTIME}.`` | `` `@tailwindcss/` in the {@link FORBIDDEN_RUNTIME} constant.`` |
| `setupServer.ts` | `collectImportantNames` (near line 532) | `the input the {@link collectImportantNames} proofs read as the longhands` | `the input the proofs the {@link collectImportantNames} helper drives read as the longhands` |
| `setupServer.ts` | `extractStringArgument` (near line 843) | `each read through {@link extractStringArgument}.` | `each read through the {@link extractStringArgument} helper.` |
| `setupServer.ts` | `FORBIDDEN_SIGNATURES` (near line 911) | `such as a member of {@link FORBIDDEN_SIGNATURES}.` | `such as a member of the {@link FORBIDDEN_SIGNATURES} constant.` |
| `setupServer.ts` | `CASCADE_PATH` (near line 1223) | `Default: {@link CASCADE_PATH} under` `WORKSPACE_ROOT`.` | `Default: the {@link CASCADE_PATH} constant under` `WORKSPACE_ROOT`.` |
| `setupServer.ts` | `VENEER_GUIDE_PATH` (near line 1232) | `the Veneer guide, {@link VENEER_GUIDE_PATH} under` `WORKSPACE_ROOT`.` | `the Veneer guide, the {@link VENEER_GUIDE_PATH} constant under` `WORKSPACE_ROOT`.` |
| `setupServer.ts` | `SheetReader.order` (near line 1670) | `a name in {@link SheetReader.order} with no` | `a name in the {@link SheetReader.order} member with no` |
| `setupServer.ts` | `SheetReader.declarations` (near line 1740) | `other property a sheet declares is in {@link SheetReader.declarations}.` | `other property a sheet declares is in the {@link SheetReader.declarations} member.` |
| `setupServer.ts` | `EMPTY_CELL` and `ABSENT_CELL` (near line 2317) | `The value itself, {@link EMPTY_CELL} where it is empty, and {@link ABSENT_CELL} where` | `The value itself, the {@link EMPTY_CELL} constant where it is empty, and the {@link ABSENT_CELL} constant where` |
| `setupServer.ts` | `ORACLE_BINDINGS` (near line 2798) | `predicate from. Default: {@link ORACLE_BINDINGS}.` | `predicate from. Default: the {@link ORACLE_BINDINGS} constant.` |
| `setupServer.ts` | `describeSite` (near line 2116, found by the corrected sweep, outside O1's own ledger) | `so every row claims its {@link describeSite} site as it` `is written and` | `so every row claims the site the {@link describeSite} helper writes as it` `is written and` |
| `setupServer.ts` | count near `indexRecordingKeys` (claim 8, near line 1987) | `answers one rule at a time and the cascade carries hundreds, so the` | `answers one rule at a time and the cascade carries many, so` |
| `setupServer.ts` | `renderRuleKey` observation (near line 1420's doc comment, the self-reference at line 1395) | `is found by the key this function renders for the recorded rule` | `is found by the key this helper renders for the recorded rule` |
| `setupStyles.ts` | `BOOTSTRAP_SCOPE_PATTERNS` (near line 140) | `matched through {@link BOOTSTRAP_SCOPE_PATTERNS}.` | `matched through the {@link BOOTSTRAP_SCOPE_PATTERNS} constant.` |
| `setupStyles.ts` | `normalizeComplexSelector` (near line 387) | `writes — reaches` `{@link normalizeComplexSelector} as text and is copied` | `writes — reaches the` `{@link normalizeComplexSelector} helper as text and is copied` |
| `setupStyles.ts` | `collectTokenNodes` (near line 562) | `This is {@link collectTokenNodes} reduced to its leaves.` | `This is the {@link collectTokenNodes} helper reduced to its leaves.` |
| `setupStyles.ts` | `RETAINED_COLOR_ALIASES` (near line 2891) | `pins each value to the stylesheet the same way it pins` `{@link RETAINED_COLOR_ALIASES}.` | `pins each value to the stylesheet the same way it pins` `the {@link RETAINED_COLOR_ALIASES} constant.` |
| `setupStyles.ts` | `VENEER_GUIDE_PATH` (near line 3008) | `so` `tests/setupStyles.test.ts` reads` `{@link VENEER_GUIDE_PATH} itself and requires this text` | `so` `tests/setupStyles.test.ts` reads the` `{@link VENEER_GUIDE_PATH} constant itself and requires this text` |
| `setupStyles.ts` | `GRID_BREAKPOINT_CASES` (near line 3855) | `The boundary is read off {@link GRID_BREAKPOINT_CASES} rather than written again, so the ramp` | `The boundary is read off the {@link GRID_BREAKPOINT_CASES} constant rather than written again, so the ramp` |
| `setupStyles.ts` | count near `LIST_GROUP_ACTION_HOSTS` (claim 8, near line 3960) | `which is the whole of what separates` `the three rules. The {@link LIST_GROUP_ACTION_HOSTS} constant carries the hosts each state is driven on, and a` | `which is the whole of what separates` `the rules. The {@link LIST_GROUP_ACTION_HOSTS} constant carries the hosts each state is driven` `on, and a` |
| `setupStyles.ts` | `INPUT_GROUP_DEFERRED` (near line 4302) | `owns and are listed in {@link INPUT_GROUP_DEFERRED}. The rules that` | `owns and are listed in the {@link INPUT_GROUP_DEFERRED} constant.` `The rules that` |
| `setupStyles.ts` | `FORM_CONTROL_MARKUP` (near line 5053) | `Holds the accessible name of the control in {@link FORM_CONTROL_MARKUP} the selector matches.` | `Holds the accessible name of the control in the {@link FORM_CONTROL_MARKUP} constant that the selector matches.` |

## The corrected sweep

Run from the worktree root with npm 11 on `PATH` through the scratchpad override this brief
names:

```
grep -Pzo '\{@link [^}]+\}(\s*\n\s*\*)?\s*(?!(helper|constant|method|member)\b)[a-z]' tests/setupServer.ts tests/setupStyles.ts
```

Exit `1`, no output: every `{@link}` tag, across a comment-line continuation included, is followed
by its D42 noun (`helper`, `constant`, `method`, or `member`) or by punctuation.

```
grep -Pzo '\{@link [^}]+\}(\s*\n\s*\*)?\s*(is|are|reads|holds|returns|names|writes|takes|carries|maps|owns|runs|lists|declares|records|keeps|emits|binds|hands|reports|raises|measures|answers|builds|refuses|does|passes|states|decodes|copies|drives|serves|sits|,)' tests/setupServer.ts tests/setupStyles.ts
```

Exit `1`, no output: no tag is followed by a bare verb or a comma across a continuation either.

### Positive control

The first pattern fires on a planted bare tag. A scratch copy of `setupServer.ts` under
`tmp/probe/` (removed after the check; not part of this report's diff) replaced the phrase
`{@link extractStringArgument} helper.` with `{@link extractStringArgument} parses text.`. Running
the first pattern against that copy:

```
grep -Pzo '\{@link [^}]+\}(\s*\n\s*\*)?\s*(?!(helper|constant|method|member)\b)[a-z]' tmp/probe/setupServer.control.ts
```

printed `{@link extractStringArgument} p` and exited `0`, confirming the pattern detects a bare
tag while both real files return nothing.

## `this function` check

```
grep -n "this function" tests/setupServer.ts tests/setupStyles.ts
```

returns only `tests/setupStyles.ts:31: * @remarks Loads Sass only when the Node setup proof calls this function.`, the `compileBreakpointRamp` remark outside this round. The `setupServer.ts:1395`
self-reference on `renderRuleKey` reads `this helper` after this round.

## Gates

```
npm run format:check
```

exit `0`: "All matched files use the correct format."

```
npm run lint:check
```

exit `0`: no output, no denied warning.

```
npm run check
```

exit `0`: `tsc --noEmit` over the root project, `check:src:core`, `check:src:browser`,
`check:src:styles`, and `check:app:browser` (`vue-tsc --noEmit`) each ran with no diagnostic.

## Scope and standing conditions

Only `tests/setupServer.ts` and `tests/setupStyles.ts` changed, doc comments only. The scoped
`tests/src/styles/components/button-group.test.ts` diff stays exactly as round 2 left it; this
round did not touch it. `tests/setupPolicy.ts` and `tests/policy.test.ts` stay untouched. No
commit, push, install, or destructive git command ran.

`git status --porcelain` at hand-back:

```
 M tests/setupServer.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/button-group.test.ts
```

The `git diff 87ff1d0` for `tests/setupServer.ts` and `tests/setupStyles.ts` touches only ` *` and
`/** */` comment lines, the same shape rounds 1 and 2 established.

## Deviation

One deviation from the brief's own ledger: the corrected sweep in O2 surfaced a bare tag at
`describeSite` (near `setupServer.ts:2116`) that O1's ledger did not list, because O1's search used
a different method. The tag sat inside a doc-comment continuation the round-2 patterns could not
see. Fixed under the same rule the listed sites follow (D42's `helper` noun) rather than treated as
out of scope, because the deviation contract's stop condition — a site that is not a `{@link}` tag,
or a sentence that cannot take the noun without changing its meaning — does not apply here: the
site is a `{@link}` tag and the rewrite keeps the sentence's meaning.
