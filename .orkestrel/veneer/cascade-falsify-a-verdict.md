# cascade-falsify-a — round verdict (2026-10-01)

Subject: the drop-in stage of the Bootstrap cascade chunk, veneer main `09216a5` (the chain `6496e13..09216a5`). Claims: `veneer/tmp/units/cascade-falsify-a-claims.md` (twelve). Two blind lanes in clean contexts:

| Lane | Role | Engine | Transport | Report | Terminal line |
| --- | --- | --- | --- | --- | --- |
| objective | `analyst` | GPT-6 Astra, which wrote the contract, instruments, utilities, and registry units | `codex exec`, session `01a0f7de-e05a-78f2-b026-623ca17beaa2`, 980 s, probes deleted, tree unchanged | `veneer/tmp/units/cascade-falsify-a-analyst-verdict.md` (90 citations, 0 unresolved) | `VERDICT: FAIL 2, 3, 5, 6, 12; outside the claims: none` |
| subjective | `reviewer` | Claude Opus 5.5 | native Agent, no shell, 931 s | `veneer/tmp/units/cascade-falsify-a-reviewer-verdict.md` (59 citations; 7 shorthand spellings of the host rule files and `src/bootstrap/_tokens.scss`, every one resolvable by hand) | `VERDICT: FAIL 2, 3, 4, 6, 7, 8, 9, 12; outside the claims: F1, F2, F3, F4, F5` |

## Orchestrator reproductions

- **Claim 4 (quoted values through `unlayer`).** A scratch compile of `unlayer(((content "a b"), (--q "a"), (--empty ''),))` with `$layered: false` emitted `content: a b !important; --q: a !important; --empty: !important;`: the `#{$value}` interpolation strips a quoted string's quotes. The reviewer is right; the analyst confirmed the pair loop's order and the fixture's double-wrapped string, which hides the loss. Split: 4a (order and duplicates kept) held; 4b (quoted values) broken.
- **Claim 3.** The guard is `/!important|@layer/iu` (`tests/setup.ts:429`); both lanes showed `! important` passing it and the analyst showed the interpolated and unquoted forms too. Broken; the guard's coverage is textual and its TSDoc must say so.
- **Claim 8.** `git diff 6496e13 09216a5 -- src/core/constants.ts` removes only the TSDoc sentences and the nine unquoted `gray` numeric keys, which return quoted (the same property keys); the analyst's probe read 0 changed old paths. The registry holds; the reviewer's finding is about the derivation proof, which admits a hyphenated key. Split: 8a (population and paths) held; 8b (the proof's blindness) broken.
- **Claim 12.** The self-comparison at `tests/setupServer.test.ts:163-165` joins the bundled file's own region slices and compares them with that file; it cannot fail once contiguity holds. The reviewer and the analyst each found a distinct vacuity (the per-key case's expectation derived from the same map flag; the keyframes blind spot of the placement predicate; the census compared with its own fixture; the digest control that tests the hash function; the same-input round-trip assertions). All broken.

## Rulings per claim

| Claim | Ruling | Carried into the fix unit |
| --- | --- | --- |
| 1 | CONFIRMED by both | none |
| 2 | BROKEN by both: no committed proof compiles a literal partial against its region | the per-region `it.each` over the 51 literal regions, each partial compiled alone with `$layered: false` (the two root regions through `tokens`), with the boundary-move control that reddens two cases and keeps link 1 green |
| 3 | BROKEN by both | the guard recognises CSS whitespace between `!` and `important`, `@layer`, and `layer(` in an import, with those controls; its TSDoc states the textual limit (an interpolated or unquoted flag is beyond a source guard, and the built-sheet placement case is the second door) |
| 4 | split: 4a CONFIRMED, 4b BROKEN | `unlayer` emits `$value` without interpolation except for the empty string; the sample fixture proves the natural quoted form and a quoted custom property; the expectations follow |
| 5 | CONFIRMED by both; the analyst's wording point accepted | the claim reads "loads no project module" from now on; no code change |
| 6 | BROKEN by both | two parser-free fixture checks in `tests/setupServer.test.ts`: the bundled line at every node's `line` begins with the node's opening text, and the comment records equal the bundled lines whose trimmed start is `/*`, with the shifted-line and deleted-comment controls; the analyst's regenerate-and-compare alternative is refused because it would promote the campaign instrument's CSS scanner into the tree |
| 7 | split: the shipped output CONFIRMED (the analyst's six scratch controls distinguished), the committed harness BROKEN (no positive baseline, no changed-value mutation, an unpinned key population) | the baseline equality before the mutations, the changed-value mutation, and the key count pinned at 90 |
| 8 | split: 8a CONFIRMED, 8b BROKEN | the derivation case asserts no key contains `-` or is empty, with the hyphenated re-key control |
| 9 | CONFIRMED by the analyst's packed probe (a Vite build of the bare-specifier recipe from a scratch install compiled with no layer and equal after the round trip; plain Sass with a `node_modules` load path refuses the bare specifier; the `pkg:` importer succeeds); UNRESOLVED by the reviewer for want of a committed proof | a release-mode distribution case that packs, installs into a scratch consumer, and compiles `pkg:@orkestrel/veneer/bootstrap/scss` through `NodePackageImporter` with `$layered: false`, equal to the bundled CSS after the round trip; the guide names the package-aware resolver (the guide unit) |
| 10 | CONFIRMED by both | none |
| 11 | CONFIRMED by both for style rules; the keyframes gap is claim 12's | see 12 |
| 12 | BROKEN by both | the placement assertion covers keyframes through `readKeyframes` (every frame in `bootstrap`, no important frame) with the appended-animation control; `census.rules` and `census.important` pinned to their literal values; the self-comparison deleted; the digest's one-byte control deleted (the pin stays); the same-input round-trip assertions replaced by independent expected values; the per-key case deleted (F3) |

## Findings outside the claims

- **F1** (the guide names renamed cases and keeps the foundation's paragraph): the guide unit.
- **F2** (the roadmap's registry, proofs, and link 1 sentences contradict the code): the roadmap unit.
- **F3** (the per-key case re-implements the schedule): the fix unit deletes it; the pass and region cases pin every key.
- **F4** (expected-output constants in a test file): the fix unit moves them to `tests/fixtures/bootstrap/sample-dropin.css` and `sample-layered.css`.
- **F5** (the switch instance in `_mixins.scss` against the styles rule's kind-file row and the roadmap's `_tokens.scss` sentence): the roadmap unit amends the sentence; the styles rule's row gains the emitters' own `!default` switch in the next scaffold release (recorded in the ledger as a propagation item).

## Which engine was right on what

- Analyst: the packed-install recipe through Vite and the `pkg:` importer; the keyframes blind spot; the interpolated and unquoted importance flags; the same-input tautologies; the registry's unchanged paths.
- Reviewer: the quote-stripping interpolation; the missing per-region proof's exact shape; the fixture-drift checks; the emitter harness's missing baseline; the per-key case's duplication of the schedule; the expected-output constants; the guide and roadmap drift; the switch's home.
- Both: the per-region gap, the guard's regex, the fixture's silent drift, the vacuous instruments.

## Bounds

Not broken: the shipped drop-in sheet (link 1 and every region hold on the Orchestrator's run and the analyst's six controls), the utilities schedule and map, the registry's population and paths, the formatter directive, the lifted sheet's layer placement for style rules, the containment of `src/bootstrap/**`. Over-correcting would break: a guard that refuses `!` inside a quoted `content` string (keep ordinary quoted text), a per-region case that compiles the two root regions without the tokens module (they need the switch), a keyframes placement assertion that expects an important frame to be lifted (Bootstrap has none and `unlayer` never writes one).

Fix unit: `cascade-fix-a` (Astra); re-audit of the repaired claims by the reviewer lane with mutation probes; then the lift stage.
