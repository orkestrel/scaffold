# Unit R2 audit — subjective lane report

Lane: `reviewer` holding the **subjective** lane, Opus 5, native subagent, clean context,
2026-09-16. Transcribed by the Orchestrator from the lane's returned message; the role carries no
write tool.

## Per-claim verdicts

1. **The `@returns` line predicts `[replacement, repeated]` — CONFIRMED, with one bit implicit.**
   The lane's own walk of base `[alpha, alpha]` with override `[alpha]` reaches the right result.
   Recorded rather than refuted: neither `@returns` nor `@remarks` says the **first** matching base
   position takes the entry, so the prediction relies on the reader allocating in reading order. A
   reader has no rule telling them to skip a qualifying position.
2. **The added clause is necessary and true; sufficiency is partial — CONFIRMED with that
   qualification.** Without it the line admits `[replacement, replacement]`, because nothing bounds
   how many positions one entry reaches. The `taken` set and its guard consume each candidate index
   once, and the retained `taken-once` red proves it. It fixes how many base positions one override
   entry reaches and leaves which one to the reader.
3. **The control builds the rival and depends on the subject — CONFIRMED.** Narrowing the
   discriminant to `'command' in override` makes both readings `undefined`, the inner expectation
   stops throwing, and the control fails; the retained log records exactly that assertion error. The
   control passes under the shipped pair discriminant and under a merge with no discriminant at all,
   and fails under the `command`-alone rival — not vacuous, not universal, discriminating precisely
   the rival its comment names. The no-discriminant implementation is caught by the case's own
   identity assertion and by the neighbouring refusal case. The fixture guard asserting the value
   still carries `command` cannot fail against the subject; it reddens if the fixture ever loses that
   key and silently voids the case, which is a legitimate job.
4. **Removing the case's opening assertion is legitimate — CONFIRMED**, checked three ways. The
   deleted assertion is not the evidence: the evidence is the control's own distinct failure, which
   no deletion could manufacture. The deleted assertion's failure is separately recorded under the
   same mutation by the earlier retained log. Restoration is unconditional in the `finally`, covering
   both files. The coverage limit is real and stated: the isolated run exercises a case with one
   fewer assertion than the shipped one, so it proves the control, not the shipped case.
5. **Helper placement — CONFIRMED.** The installed host manifest carries exactly three `tests/`
   destinations and `tests/setup.ts` is absent, so the move was available. The three helpers are
   exported from the setup module; the numbered-entry builder is folded into its one case with no
   nested function. No other module-scope helper was added.
6. **`selectByName` names what it returns and models the draft's mechanism — CONFIRMED.** `select`
   names a list drawn from a list where `keyByName` promised a map. It sits outside the fixed prefix
   table correctly, because `filter*` is defined as a predicate over members in order and this is
   not. No fleet collision. On every input the file feeds it, it computes what the draft computed;
   the draft's flatten is modelled separately in the one case where it matters. `Map<unknown, …>`
   and `Map<string, …>` are runtime-identical, so the `unknown` hides nothing — it states that the
   value under `name` is not guaranteed to be a string, which is the numbered-name case's premise,
   and reaches that without an assertion.
7. **The nested case states its coverage truthfully — CONFIRMED in both halves.** The reader maps
   over top-level entries only, and a nested array stringifies. Installed Vite flattens recursively
   during `resolveConfig`, so a nested override entry does reach the resolved configuration beside
   the base entry sharing its name.
8. **The `tests/config.test.ts` sentence is true here — CONFIRMED.** The vendored case filters
   projects to functions, throws on an empty set, applies every factory to a sentinel, asserts every
   sentinel key undefined on every returned configuration, and carries its own failing control.
   "A record of that shape" is the right choice over "that record", because the vendored sentinel
   carries an extra key. The sentence makes no claim about forwarding, which is the half the
   carried-across wording got wrong here.
9. **Bodies byte-identical; the instrument's control is weak but not vacuous — CONFIRMED,
   qualified.** Every line agrees across both checkouts. The control compares the altered text
   against the local extract, never against a committed extract, so it exercises the operator and
   the extract's contents but not the comparison the claim rests on. It can print false, so it is
   not vacuous, and it is drawn from inside the population the instrument covers, which the
   instrument law tells you not to do. See F4.
10. **Every earlier red still re-runs — CONFIRMED from the logs rather than the report.** Each
    retained log cites a line number that exists only in the post-R2 file, and the added import and
    comment shift every one of those lines, so a pre-R2 run could not have produced them.
11. **Nothing outside the owned list moved — CONFIRMED on the supplied evidence, with its bound.** A
    dispatch-time status snapshot cannot exclude a transient write that was reverted.
12. **No banned syntax — CONFIRMED.** Only the English word "as" in prose. The numbered-name case
    reaches an off-type value through `Reflect.set` rather than an assertion.

## Findings

**F1 — DEFECT, low. Two added comments use `above`.** The writing rules ban `above` and `below` in
developer prose, and no instrument reports it because the policy table carries no row for it.
Replacements: "the readings earlier fail against it", and "the position reading and the count fail",
which also closes an unnamed `both` tally. Line counts are unchanged by either edit, so every
retained red log's line numbers stay valid. These lines entered with the port rather than this unit,
which disclosed them rather than reopening a closed scope.

**F2 — RECOMMENDATION, moderate. `@returns` has grown into a second copy of the `@remarks`
mechanism paragraph, in a second vocabulary.** One event, two verbs — `replace` in `@returns`,
`take` in `@remarks` — twenty lines apart. The statements agree, so nothing is wrong; a reader meets
the rule twice and has to check that they do. `@returns` should state the shape and the refusal, and
`@remarks` should own the mechanism and its vocabulary. Do not spend a fourth rewrite of this line
here; carry it into the upstream carry-back, where `@remarks` can move too.

**F3 — RECOMMENDATION, low. "the reader" names the acting component with the word that means the
human audience.** Write `readPluginNames` instead.

**F4 — RECOMMENDATION, low. The comparison instrument's control never touches the comparison it
certifies.** Move the control inside the revision loop and compare the altered text against the
committed extract, so it uses the same operands, the same extraction on both sides, and the same git
read.

**F5 — RECOMMENDATION, low. The control comment's closing sentence is too long to hold.** Replace
with: "The subject's merged reading must differ from what the rival returns."

**F6 — RECOMMENDATION, moderate. The file's helpers live in two homes with no in-file reason.**

## Rulings this lane owns

- **The `@returns` line as prose.** True, and it predicts the case. It does not read as one sentence
  a developer holds; it reads as a specification assembled from findings. The middle sentence
  carries three ideas and its third clause is a different kind of statement stapled on with `and`;
  tenses alternate inside one sentence for the same event; the block alternates fragment, sentence,
  sentence, fragment, so the reader resets their parse repeatedly. Against that: accurate, complete
  on the refusal, and at its round budget. No rewrite required here. For the upstream carry-back:
  "The merged configuration. Each base position keeps its own entry unless a same-named override
  entry takes that position, and each override entry takes one position at most. An override entry
  that takes none follows the base entries in the order the caller wrote it. The base unchanged when
  the override is absent or is Vitest's invocation record." That version also states the name match
  and the allocation order.
- **The doc block end to end.** Still one document, one seam. The summary states the purpose in this
  workspace's terms; the tag order matches the siblings; `@remarks` covers the two hazards in the
  order a reader meets them. The seam is F2, with a smaller one beside it: the refusal is stated in
  both places. Checked for contradiction rather than assumed — `@remarks` is strictly the stronger
  statement everywhere they overlap. Honest and slightly redundant, not drifting.
- **The control's comment.** A reader learns the rival from it and does not have to derive it from
  the code: it names the rival's rule, the input, why it differs, and what it returns. A real repair
  of the previous defect, not a relabelling — the old comment named a rival the code never built,
  and this one builds what it names.
- **The helper split.** Does not read coherently on this axis, and the reason is only partly in the
  file. A reader meets one reader imported from the setup module and a sibling declared thirty lines
  later in the same file, reading the same property off the same type, with nothing to say why they
  live apart. Two of the three reasons are permanent: the Vue-dependent helper can never move, so
  "put everything in setup" is not the end state. What right looks like is one line naming the rule
  that splits them, plus moving the host-independent readers in the next change that owns this file.
  Separately, and in the unit's favour: the extracted reader is not a rename of the installed
  `requireValue` — it composes the property access, the call, and a fixed message used in several
  cases, and its value is the message.
- **Whether the change is done.** Yes. Every defect the previous round raised is closed at the
  property named rather than at its symptom, and nothing regressed: every earlier red re-runs at its
  recorded count, the ported bodies are unmoved, and the file's own header standard — each proof
  carries the untracked behaviour as its control — is now true of every case in it, which it was not
  before. One defect remains, F1, outside this unit's enumerated scope by the same rule that kept it
  out of the pre-existing helpers.

## Referrals to the objective lane

- **An override carrying `mode` without `command` is unproven.** Every case feeds the discriminant
  both keys or `command` alone. A discriminant keyed on `mode` alone would refuse a legitimate
  override and pass every assertion. Vector:
  `mergeOverride(appBrowser(), { mode: 'development', base: '/conformance-mode-only/' })` must merge.
- **The extracted reader's throw path is unexercised.** No case passes it a configuration without
  plugins, so neither the throw nor its message is asserted anywhere.
- **`selectByName`'s retention rule is asserted only negatively.** Nothing asserts positively that
  the last entry per name is retained at the first insertion's position.
- **Claim 11's historical half**, on the same ground the previous round's objective lane used.
- **The three setup exports carry no dedicated proof, and the reason is structural.** The vendored
  configuration test registers a `setup` project if and only if a `tests/setup*.test.ts` file exists,
  so adding the proof forces a project entry the brief placed off limits.

VERDICT: ACCEPT
