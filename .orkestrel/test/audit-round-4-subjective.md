# Round 4 — subjective lane verdict (`reviewer`, Opus 5)

Transport: `Read`/`Grep`/`Glob` only, no shell. The lane was told Opus 5 wrote the prose half of the
subject and to attack its own engine's work harder for that reason. All three `BROKEN` verdicts below
are against Opus-written prose.

**1. The `resolveContained` contract change opened no escape — CONFIRMED.**

Attacked by input class. The three remaining disjuncts are `contained === '..'`,
`contained.startsWith('..' + sep)` and `isAbsolute(contained)`, all applied to
`relative(root, resolve(root, target))`. Because `resolve` normalizes before `relative` runs, every
target lands in one of three shapes: `''`, a non-`..`-leading relative path, or a `..`-leading path.

Failed attacks: `../x`, `..`, `a/../../b` all yield `..`-leading. `/etc/passwd` against root `/root`
yields `../etc/passwd` — the refusal no longer depends on the target being absolute, which is the
property the deleted disjunct supplied. Root-prefix lookalikes `/rootish` and `/root2/x` yield
`../rootish` and `../root2/x`; `startsWith` is applied to `relative`'s output, not the raw path, so
string-prefix confusion cannot occur.

Not caught, correctly and by design: symbolic and hard links, both documented. `''`, `'.'` and `'./'`
return the root itself, unchanged by this diff and reached deliberately as `readInventory`'s `.` case.
`readInventory` still re-runs the check on the realpath, so a directory that resolves outside through
a link is still refused.

**2. The `roundTripJSON` loop fix introduced no new failure mode — CONFIRMED.**

The two loops enumerate exactly the sets the two spreads enumerated, in the same order, so the node
set the non-finite check reaches is unchanged. Deep nesting is bounded by heap rather than stack
because the walk is an explicit worklist and always was. A `__proto__` key materialized by
`JSON.parse` is an own enumerable property and `Object.values` includes it. No spread survives in the
function. Reading verdict on a pure transformation; 300,000 elements not executed.

**3. `read`'s directory refusal is complete and did not break the pair — UNRESOLVED.**

Every disjunct turns on what `statSync` does, and this lane has no shell.

The disagreement it could not settle: `exists` uses `lstatSync` while `read` uses `statSync`. On a
dangling symlink `exists` returns `true` while `read` reaches `statSync` on a missing target. The
`## Methods` row admits only three throw classes for `read`, none of them that one.

Bounded observation, not a break: `read` resolves containment and then calls `exists`, which resolves
it a second time with the identical message. Harmless, and it buys the correct escape error before the
`statSync`, but the pair now performs two containment checks per call.

**4. The six regression proofs bind — UNRESOLVED.** Requires applying source mutations; no shell.
Settling commands given per proof.

**5. The timer floor is right — UNRESOLVED on flake, with a design answer.**

Whether `delay * 0.9` flakes elsewhere is a measurement and only this host's is in evidence.

The shape is decidable and is wrong. The record identifies the undershoot as clock-source slop
between `performance.now()` and the timer loop — an absolute quantity near 0.82ms — while
`delay * 0.9` scales the budget with the delay. At `waitForDelay(1000)` the same assertion tolerates
100ms and stops catching a mutant that sleeps 900ms. The test uses one delay, so the mismatch is
latent rather than live.

Assert `elapsed >= delay - 2` instead, with the `2` named as the measured slop budget rather than
left as a proportion. Same margin against the half-delay mutant, says what it tolerates, and does not
loosen if the delay is raised.

**6. Rule 7 and the threat model are now true — BROKEN.**

**(a) "a link inside the allocation is one the test itself created."** The threat model restates it as
"a link inside that directory is one the test put there — **which is true whatever the permissions
are**." Three sentences earlier the same paragraph says the opposite: "It does not keep out a sibling
test worker or the code under test, because both run as the same uid, and **they are the population
that would create a link here**." The paragraph concedes that the code under test creates links here,
then asserts that any link here came from the test, then strengthens that assertion against the
objection it just conceded.

The package's own suite demonstrates the consequence: it creates a symlink inside the allocation,
calls `scratch.write('linked/file.txt', 'linked')`, and asserts the bytes landed outside. Handing
`scratch.path` to the code under test is the ordinary use of this helper, so the case is reachable
through the package's own documented seam.

The README ships this and the guide does not. The README carries the same contradiction in a worse
order: it asserts the link "is one the test put there", then follows with the fact that the code under
test is not another uid, and stops. The reader is handed the fact that falsifies the previous sentence
and no ruling on it.

This is round 3's F4/F5 recurring. The mode-`0700` justification was struck because it admits the code
under test; the replacement justification is a universal of the same class admitting the same
population, and "whatever the permissions are" makes it stronger rather than weaker.

Smallest fix, prose only, without reopening the design ruling: state the reachable consequence instead
of the universal. A link inside the allocation was created by the test process or by the code the test
drives; `createScratch` follows it, so `write` and `read` can reach outside through one; that is not a
case this helper defends against.

**(b) The mode-`0700` sentence is unqualified and the new test hard-codes it.** Guide and README state
it without qualification, and the test asserts the constant `0o700` with no host guard.
`.claude/rules/tests.md:26` names this category exactly: "Probe a host-varying property at runtime …
Filesystem case folding, path separators, **permission bits**, and rename semantics differ per host."
Rule 6 eight lines above follows that rule for case folding and says so; rule 7 does not follow it for
permission bits and reads as though it does — "the suite asserts that mode on the host it runs on"
resembles the rule-6 probe pattern while the assertion is a hard-coded POSIX constant.

Qualify the sentence to POSIX in guide and README, or probe the mode the way rule 6 probes case. One
or the other, not both.

**Not broken here:** rule 7's operative clauses are accurate — every escaping `write`, `read` and
`exists` throws, a failed seed removes the directory before rethrowing, and the `destroy()` identity
comparison is exactly what the source does. The retitling was right and the ruling not to walk
segments is right. Only the justifications are overstated.

**7. The README lets a consumer use `readInventory` without the guide — CONFIRMED, with gaps.**

Read end to end as a consumer with no other document; no call could be constructed that the README
does not support. Both imports, a valid root, the required directories argument and why it is an
argument, both `InventoryOptions` keys, the key shape, and the refusals are all present. The fence is
copyable and the call is correct.

Still missing:

- **The values.** Nothing says the record's values are the file contents. Both fences call only
  `Object.keys(...)`, the one shape that hides them, and the prose calls the result "a file map". The
  shipped TSDoc closes it, which makes this a gap rather than a break — but the worked example never
  shows the helper's primary output.
- **Order.** This diff deleted the README's only statement of it. The previous text read "a
  root-relative file map **keyed in sorted order**" and the replacement drops the phrase. The
  guarantee and its integer-key caveat survive only in the guide, which never ships.
- **Directory exclusion.** The README says "an `exclude` is a whole key" and demonstrates a file. A
  directory key prunes its whole subtree, proven by the test this same diff added, and neither the
  README nor the guide says so.

**8. Nothing still describes the pre-fix behaviour — BROKEN.**

The fifth stale site is the guide's own `## Tests` section. The diff added six tests, updated the
`factories.test.ts` bullet for two of them, and left four unrecorded plus one in a bullet it edited:

- the `helpers.test.ts` bullet was edited by this diff and still lists only "exact-path exclusion";
  the directory-exclusion test the same diff added is absent.
- the `core/helpers.test.ts` bullet was not touched and now misses the `requireValue` default message,
  the `collectStream` lock release, `-0` normalization, and the 300,000-element argument-limit proof.

The last matters most: that test is the regression guard for the round's headline defect, and the
guide's index of what the suite proves does not record that it exists.

Attacks that failed, so the next round knows: no occurrence of `hasSymbolicLink`, of an absolute
target "never resolving", or of `readInventory` making an absolute directory root-relative first
remains anywhere in `guides/test.md`, `README.md`, `src/` or `tests/`. Rule 6, the `resolveContained`
prose, the `read` row and both worked fences all match shipped source.

**9. The CI workflow is right for this package — CONFIRMED.**

Byte-identical to the fleet variant across 46 lines, same pinned action SHAs, same matrix. Failed
attacks: the lockfile `npm ci` needs exists; all five gate scripts are defined; `npm test` names five
of the six declared projects and the sixth is `probe`, excluded deliberately; `guides` is
conditionally registered such that a false condition fails loudly rather than skipping silently; both
matrix Node versions satisfy the engines floor; and none of the four richer fleet variants adds a step
this package would use.

One observation carried rather than counted: `ubuntu-latest` is the only runner, so the hard-coded
`0o700` assertion is never exercised where permission bits are emulated. That is the corroborating
half of finding 6(b), not a defect in the workflow.

**10. Ship it — BROKEN.**

Blocked by the README security paragraph: the only prose 41 repositories receive states the package's
boundary in two sentences that contradict each other, plus one unqualified host-dependent universal.
A consumer's whole basis for deciding whether `createScratch` is safe to hand to the code under test
is that paragraph, and it currently gives both answers.

Cost to close: one paragraph in `README.md`, mirrored in two places in `guides/test.md`. No source,
type, test or version implication.

Not blocked, so the fix is not over-corrected into a redesign: the source is sound as far as reading
reaches it, the surface and both entry points match, the CI workflow is right, and the design ruling
on not walking symlink segments is right and must survive the prose fix. What is wrong is the argument
the prose makes for it, not the decision.

## Finding outside the claims

**`InventoryOptions.exclude`'s shipped TSDoc contradicts the implementation.** `src/server/types.ts:44`
reads "The path **segments** that exclude a file or directory from the walk." Exclusions are not
segments: `src/server/helpers.ts:81` matches `excluded.has(key)` where `key` is the full `/`-joined
root-relative path, and the helper's own remark says so correctly.

Reachable and silent: a consumer reading IntelliSense writes `exclude: ['index.ts']` expecting every
`index.ts` to drop out, gets a map with all of them still in it, and no error. `types.ts` is
authoritative for public APIs, and this string ships in `dist/src/server/index.d.ts` while the correct
wording exists two files away.

---

VERDICT: FAIL — 3 broken, 3 unresolved, 0 not-evidenced, 1 finding outside the claims
