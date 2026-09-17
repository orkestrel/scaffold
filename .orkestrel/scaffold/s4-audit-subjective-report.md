# Unit S4 audit — subjective lane report

Lane: `reviewer` holding the **subjective** lane, Opus 5, native subagent, clean context,
2026-09-16. Transcribed by the Orchestrator from the lane's returned message; the role carries no
write tool.

## Per-claim verdicts

1. **The runtime check matches the narrowed type — CONFIRMED.** Both homes end with
   `'name' in plugin && typeof plugin.name === 'string'`, and the pinned copy in the test is
   byte-identical to both.
2. **The callable-`then` exclusion is correct — CONFIRMED, on Vite's own runtime.** `Promise<T>` is
   structural, so a plain object carrying `then`, `catch`, `finally`, and `[Symbol.toStringTag]` is
   admitted by the declared union — which is what the new case constructs with
   `satisfies PluginOption`, and what `instanceof Promise` could not reach. What settles the
   wrongly-rejects question is Vite's `asyncFlatten`, which discriminates a plugin entry from a
   pending one by a truthy `then` rather than by `instanceof`, so any object with a callable `then`
   is consumed before the plugin pipeline sees it. The emitted predicate applies the same test Vite
   applies, one layer earlier. The reverse-direction asymmetry — `{ name: 'x', then: true }`, which
   the predicate treats as named and Vite treats as pending — is real, but Vite spins forever on
   that value regardless. Referred.
3. **Still unexported, target unchanged — CONFIRMED.** The round-three rulings are untouched.
4. **The new cases red, green, and assert identity — CONFIRMED.** Both assert length before
   identity, so an unreadable result cannot pass through an empty population. The red is derivable
   from the algorithm without running it. The replay instrument was read, not run; the executed
   counts in the unit's report are the writer's claim.
5. **The census describes each case's mechanism truthfully — CONFIRMED**, verified per case against
   the bodies and the vendored import. The mechanism paragraph is true. A different paragraph of the
   same block is not; see F1.
6. **Each red runner asserts the named case and the population — CONFIRMED.** The shared runner
   refuses a startup failure, a termination, a collection failure, and any population other than
   exactly one executed case whose title and status match. A shared title substring reddens the
   single-execution assertion rather than certifying the wrong case. The negative control is drawn
   from outside the runner's population, as the instrument law requires.
7. **Mutations inside the restoring block, limits stated — CONFIRMED** per instrument. See F3 for a
   uniformity recommendation.
8. **Equal lengths asserted before different bytes — CONFIRMED**, in the order the claim names.
9. **Regenerated, nothing weakened — CONFIRMED.** The byte-identity case still states its population
   before drawing from it, still compares the whole relation, and still carries its discriminating
   control. The emitted pin carries the new predicate verbatim and matches character for character;
   moving a pin with the change is the pin following the change, not a weakening. Any hand-edit that
   diverged from generator output would redden the comparison, so the regeneration claim is
   self-gating.
10. **Nothing outside the owned list moved — CONFIRMED over the supplied patch.** Coverage is the
    patch, not a live status read; see R1.

## Findings

**F1 — DEFECT, medium. The census's control paragraph lost two members when S4 added two cases.**
The comment block partitions the case set: one paragraph names the cases carrying a bare-merge
control, the next names those carrying none. S4 added two cases, updated the mechanism paragraph,
and left the control paragraph at its old membership. Nine cases now; the block accounts for seven.
Neither new case carries a bare-merge control, and each falls exactly inside the reason the
paragraph already gives — so the paragraph's own sentence is true of them and does not name them,
and a reader who trusts the partition concludes they carry controls. This is the same class of
untruth round three rejected on, one paragraph over in the same block.

Two closes were offered. **Option A** re-enumerates, naming both new cases. **Option B** recasts the
paragraph as the property it stands in for: a case that contrasts against the bare merge asserts the
damage the guard prevents; a case with no such contrast asserts identity and order, because it
asserts exactly the value the bare merge produces — and a reader can see which is which from the
`mergeConfig` call in each body.

**Option B recommended.** `.claude/rules/quality.md` § Rounds and verdicts rules that a subject
repricing itself on every edit has no closing condition and directs that the claim be dropped or
recast as the property the tally stood in for. This census has produced a finding in two consecutive
rounds, each time because a case was added and one paragraph was not. The mechanism paragraph earns
its keep, because a reader cannot see from a case body whether a base came from a real factory. The
control paragraph does not, because a reader can.

**F2 — RECOMMENDATION, low, do not take now.** The emitted merge comment says "promises" where the
code now excludes any entry carrying a callable `then`. The sentence is not false — promises do pass
through — but it is narrower than the code, and it is the only prose a workspace developer meets
that explains the `then` conjunct. Do not take it in this change: the merge text has three
hand-maintained homes, and changing one word moves emitted bytes across every generated workspace
for a case Vite itself resolves before a plugin runs. Carry it to whoever next edits the merge text,
with the wording "promises and any entry carrying a `then` method".

**F3 — RECOMMENDATION, low.** The restore pattern is not uniform: one instrument nests its two
restores so a throw on the first still restores the second, while three write both restores flat in
one `finally`. Claim 7 holds for all of them; this is uniformity, and a reader comparing the
instruments meets two patterns for one job. Correctness weight referred.

## Rulings this lane owns

- **The emitted predicate as prose and shape — accepted.** It reads as one question, and the
  conjuncts map one-to-one onto the variants of the declared union: object, non-null, not an array,
  not a thenable, then the positive `name: string` test. Negating the thenable test as a unit is the
  right shape; the `in` check is what licenses reading `.then` under the project's narrowing ban, so
  it is structural rather than defensive noise. A developer understands why it is there: the
  parameter is typed `PluginOption` on the same line, the declared union carries a promise arm, and
  the merge comment names promises as passing through.
- **The new exclusion needs no comment,** and no comment overstates it. One understates it, which is
  F2.
- **The two new case names state rules**, in the file's established form, naming the behaviour and
  the input class it applies to. Neither names the mutation that specified it, and both use the
  algorithm's own word, "selecting". A rename to "thenable" was considered and struck: it is the
  ECMAScript word and Vite's own discriminator, but "structural" names the exact contrast with the
  `instanceof` test it replaced, which is what the case exists to prove.
- **The typed and untyped doors are a coherent pair.** The non-string case reaches the merge through
  `Reflect.apply` because its value is not constructible as a `PluginOption`, and its comment says
  so; the structural case reaches it through the typed door with `satisfies PluginOption`. One
  proves the vector an untyped caller supplies, the other the vector the declaration admits. The
  file gained no new machinery.
- **The census after its correction.** The mechanism paragraph is now true per case. The block does
  not read as one honest paragraph, because its control paragraph no longer partitions the set it
  partitions. That is F1.
- **Whether the change is done.** The substance is done and I would accept it: the predicate, the
  two regression cases, the hardened runner and its control, the restored-mutation discipline, the
  relocation assertion, and the regeneration are all sound, and the design reads as one deliberate
  thing rather than a patched one. One five-line comment that S4's own addition falsified stands
  between it and a commit. That is a mechanical edit with the replacement text supplied — dispatch
  it to `builder`, not to a fifth adversarial round. No further audit round is warranted on this
  subject.

## Referrals

- **R1, to the Orchestrator.** The session context handed to this lane records a working-tree file
  set that does not match the supplied patch. With no live `git status` and no shell, claim 10 was
  ruled over the patch and that coverage named. Confirm the tree against a live read before
  committing.
- **R2, to the objective lane.** The `{ name: 'x', then: true }` asymmetry.
- **R3, to the objective lane.** Whether the flat restores are a real exposure or a uniformity wart.

VERDICT: REJECT
