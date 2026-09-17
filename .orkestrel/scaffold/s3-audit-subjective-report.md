# Unit S3 audit — subjective lane report

Lane: `reviewer` holding the **subjective** lane, Opus 5, native subagent, clean context,
2026-09-16. Transcribed by the Orchestrator from the lane's returned message; the role carries no
write tool.

## Per-claim verdicts

1. **The true discriminant — CONFIRMED.** `interface UserConfig` opens at
   `node_modules/vite/dist/node/index.d.ts:3477`, `mode?: string` at 3517, and `command` appears
   only at 3326 (`ConfigEnv`) and 3788 (`ResolvedConfig`). The emitted sentence matches.
2. **One override entry installed at most once — CONFIRMED.** `vite.config.ts:66-80`. Pinned by
   `installs one override entry at one base position` with identity at all three positions and a
   bare-merge control.
3. **Every other key merges as `mergeConfig` merges it — CONFIRMED.**
   `return { ...merged, plugins: selected }` leaves every non-`plugins` key as produced.
4. **The `assetsInlineLimit` comment — CONFIRMED, with one clause not checkable here.** The browser
   base sets `0`; 4096 is Vite's documented default; the template-level comment's causal clause is
   gone. The `viteSingleFile` overwrite clause cannot be checked in this checkout because the plugin
   is not installed. Referred.
5. **The control census matches the controls — CONFIRMED.** The four cases named as
   control-carrying each call `mergeConfig`. The three named as control-free each assert exactly the
   bare-merge value: the nested case appends an unnamed entry exactly as concatenation would, the
   opaque case's entries are unnamed on both sides so selection reduces to concatenation, and the
   `command`-alone case returns `mergeConfig`'s result untouched because `merged.plugins` is
   `undefined`. There is genuinely no damage to contrast. See D1 for a slip in the sentence beside
   it.
6. **Identity at the base's position — CONFIRMED.** The rival reading puts the factory's own
   boundary object there and fails identity while passing the mapped-name assertion.
7. **The pinning control — CONFIRMED, with a stated limit.** Drawn from a selection carrying no
   browser environment, outside the population every pin covers, and the comment states honestly
   that it establishes nothing about the merge pin. Limit: the control's assertions are negations,
   so they would also pass if the artifact reader returned an empty map; what proves the reader
   produces content is the case's own positive literal pins.
8. **The reds re-produce, each mutating the subject — CONFIRMED.** Read all four. None edits a test,
   an assertion, or an instrument. Each guards on its anchor before mutating and restores in
   `finally`. A script killed between mutation and restore leaves the tree mutated, and **no script
   removes any file** — every restore writes back content read at start.
9. **The relocation control perturbs inside the literal at equal length — CONFIRMED.** One
   same-width character, both unescaped in JSON. The perturbed character sits in a name only a
   showcased selection emits, so the control also shows the capture reaches the showcased half.
10. **`isNamedPlugin` narrows soundly — CONFIRMED.** Over the declared
    `PluginOption = Thenable<Plugin | { name: string } | FalsyPlugin | PluginOption[]>`, the only
    object variants carrying `name` type it `string`. An off-type runtime value arriving through an
    untyped path narrows unsoundly but stays inert: the narrowed value is only compared with `===`
    and pushed.
11. **The opaque-entry case asserts identity — CONFIRMED.** A length assertion, then six `toBe`
    assertions across both sides.
12. **No emitted wrapper's effective configuration changed — UNSETTLED, referred.**
    `s3-effective.mjs` measures plugin names only, S3's conjunct only, four wrappers only. It never
    compares the three-unit change against the pre-change baseline. By inspection the equivalence
    holds, but that is a reading rather than an executed measurement.
13. **Byte-identity — CONFIRMED to the extent this lane can check.** The case pins the artifact path
    list first, then compares whole file content on every run, so nothing can drift without it
    failing. Whether the bytes arrived by regeneration or by hand is undecidable from artifacts and
    carries no consequence under that gate.
14. **No vendored file changed — CONFIRMED for the tree.** The post-build half is the verifier's.
15. **No banned syntax — CONFIRMED.** Only prose occurrences of the word "as". The `Reflect.apply`
    calls are the honest mechanism for driving a runtime shape the declared type excludes.

## Findings

**D1 — defect, low.** The census sentence claims the replacement, repeated-name, and nested cases
take their base from `srcServer`. The repeated-name case never calls `srcServer`; it writes its own
base from the vendored boundary helpers. This paragraph exists because round two found the same
comment asserting a regime its cases did not have, and a reader trusting it believes a real emitted
factory is under test where hand-written entries are. The prescription, written verbatim: "the
replacement and nested cases take their base from `srcServer`; the repeated-name case writes its
base from the same vendored boundary helpers, because no emitted base repeats a plugin name." One
sentence, no code change, no emitted byte moves.

**R1 — recommendation.** The emitted `appShowcase` carries no comment on the boundary replacement.
The explanation is template-level and never ships, so the workspace developer who adds a plugin to a
showcase reads only the general merge rule. One-home argues against restating the rule per factory,
so this is the Orchestrator's call. The smallest form is one clause pointing at the merge rule.

**R2 — recommendation.** The local refusal case duplicates a stronger vendored proof: the vendored
`tests/config.test.ts` imports the same default export, uses the same sentinel keys, makes the same
per-field assertion, and carries a planted factory that must make the loop throw. Keeping the local
copy keeps the whole merge rule set readable in one place.

**R3 — recommendation.** The emitted merge text has three hand-maintained homes — the template, the
generated file, and the pinned literal in the test. The pin earns its keep and its red fires, but it
is the friction point for the next edit, whose brief must grant the test file.

**R4 — recommendation.** `s3-relocation-control.mjs` prints the byte lengths but never asserts they
match. The instrument's stated value is that a length-only comparison would miss the perturbation;
asserting equality turns that from a printed observation into a checked one.

## Rulings this lane owns

- **The emitted prose, read end to end.** It teaches the mechanism now, and orders itself correctly
  for a cold reader: what the merge does and why the parameter exists; why the parameter is safe and
  where that is proven; then the plugin rule as problem, rule, at-most-once bound, append order,
  pass-through set, the impossibility, and the scope limit for every other key. The block no longer
  ends on a fact with no consequence. "The merge returns the base unchanged and reports nothing" is
  the right kind of sentence: it states the silence rather than hiding it. The shipped claim that
  `tests/config.test.ts` drives every registered factory through the refusal was checked against the
  vendored file and is true. One seam remains, and it is R1.
- **`isNamedPlugin` — name, placement, export.** The name answers exactly the question the call site
  asks. The placement after its only caller is right for a root configuration, which is outside the
  centralized-kind table and already declares unexported module state. **It must stay unexported:**
  the predicate has no meaning apart from that one algorithm, and the minimal-API creation gate
  names no consumer. The narrower `plugin is { name: string }` target is also correct — widening to
  `Plugin` would drag `Plugin<any>` into the emitted type import for nothing.
- **The selection's readability.** It reads as one idea: merge everything, then rebuild the plugin
  array by selection. Every name is a plain noun stating what it holds rather than a judgment about
  it. One line still reads as a trick: `const replacement = candidates[index]` relies on
  `candidates[-1]` being `undefined`. Every alternative under `noUncheckedIndexedAccess` is longer
  and no clearer, so this is recorded rather than asked for.
- **The test suite three units leave behind.** The hazard suite reads as proofs of rules: every case
  name states a rule, and a reader who read only the names would learn the merge's contract. The
  whole-output pin reads as transcription, which is the deliberate cost of what round two asked for,
  and its red is recorded, so it is a transcription that can fail. The controls' honesty is the
  strongest thing in this round: three cases are named as carrying none, with the reason, rather
  than left to look controlled.
- **Is the change done.** Yes, apart from D1. The browser branch collapsed from sixty-odd lines of
  inline template assembly into two lines matching every sibling branch, the showcase moved to a
  template constant where template data belongs, `applicationBrowser` and the `viteTypes`
  conditional are gone, and every wrapper stopped merging from outside. "I would accept it."

## Referrals

- Claim 12's equivalence span, to the objective lane.
- The `viteSingleFile` clause, unverifiable in this checkout.
- `host.json` after a build, and the gate chain, to the verifier.
- Tree state: the session-start snapshot names files the current status does not. No vendored path
  appears in either, so claim 14 is unaffected, but the Orchestrator owns reconciling which tree the
  verifier gates.

VERDICT: REJECT
