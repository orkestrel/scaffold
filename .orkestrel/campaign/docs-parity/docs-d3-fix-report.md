# Unit D3-fix — report

Every edit E1 to E14 landed, and every gate, build, and suite criterion is green, including
`test:distribution` — the audit round's red — which now exits 0. Two items are open.

- **Deviation: E3's RuleTester case cannot discriminate as specified.** The case is in the tree
  exactly as the brief writes it, the plant run proves it reports nothing in either direction, and
  § Deviation names the measured one-token remedy.
- **Criterion 1's phrase grep is not clean.** It prints one pre-existing line no edit names,
  `.claude/rules/writing.md:56`, in a permitted sense. See § Flagged claims.

## Deviation — E3's case does not discriminate

**Expected.** "Prove it discriminates: … disable the stop for one run, run `npm run test:config`,
record the failing count and that this case reports `name`."

**Found.** The case reports nothing with the stop disabled. `reportVoice` reads only the first
sentence, `POLICY_SENTENCE_PATTERN` (`configs/policy.ts:256`, `/\.\s|\.$/u`) ends that sentence at
the description's own period, and the tag text joins the paragraph after it. The symbol name
therefore never enters the sentence the `name` check reads.

Measured through the real planted code, `configs/policy.ts` with `742` reading
`if (false && text.trimStart().startsWith('@')) break`:

```text
PARAGRAPH "Creates a control. @param value - The value readControl reads."
OPENER Creates VOICED true
FIRST SENTENCE "Creates a control"
NAME REPORTED false
```

The plant run reddened `reads a description paragraph up to its first block tag`
(`tests/config.test.ts:1681`, the helper case the brief keeps) and the inventory case, and left the
new RuleTester case green:

```text
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  |config| tests/config.test.ts > root configuration > keeps the committed host inventory aligned with the vendored checkout bytes
 FAIL  |config| tests/config.test.ts > policy plugin > reads a description paragraph up to its first block tag
AssertionError: expected 'Creates a control. @param value - Rep…' to be 'Creates a control.' // Object.is equality
      Tests  2 failed | 170 passed | 1 skipped (173)
```

The inventory failure is the plant's own artifact: the plant moved `configs/policy.ts` bytes, and
`host.json` had been regenerated before the plant. It cleared on the restore.

**Done vs not done.** E3's deletion of the invalid case and the addition of the valid case are
**done**, exactly as written. The discrimination proof the brief requires is **not done**, because
the specified code cannot produce it. Nothing was improvised into the tree: the case stands as the
brief fixes it, and no substitute case was invented.

**The remedy, measured.** Drop the description's terminating period, so the tag text joins the first
sentence when the stop is removed. Under the same plant, with the block's description line reading
` * Creates a control`:

```text
PARAGRAPH "Creates a control @param value - The value readControl reads."
FIRST SENTENCE "Creates a control @param value - The value readControl reads"
NAME REPORTED true
```

With the stop restored, that paragraph is `Creates a control`, the opener is voiced, and the
sentence names no symbol, so the case stays valid. That single edit turns the case into the
discriminating one the objective asks for.

**Hypothesis.** The brief's case was designed against the paragraph reader, which does run past the
tag when the stop is removed, rather than against `reportVoice`, which reads the paragraph's first
sentence rather than the paragraph.

## Edits

| Edit | Landed at |
| --- | --- |
| E1 rule id | `.oxlintrc.json:61`, `configs/policy.ts:1391`, `tests/setupPolicy.ts:162`, `tests/config.test.ts:1338` and `:1890`, `.claude/rules/typescript.md:80`, `PROPOSAL.md:986`; the `guides/scaffold.md` site is carried by E12 at `:1014`. `VOICE_RULE` keeps its name; `voice` and `name` unchanged |
| E2 workspace-independent cases | `tests/policy.test.ts:379-395` (accounting body), `:408-418` (population, now `guides/README.md` and `POLICY_CATALOG_FILE`), `:430-441` (`it.skipIf` on the table's presence, with its comment at `:426-429`), imports at `:17`, `:23`, `:33`, `:34` |
| E3 tag-boundary case | invalid case deleted; valid case at `tests/config.test.ts:1388-1400`. Discrimination not proven — see § Deviation |
| E4 voice-rule sentence | `.claude/rules/typescript.md:80-84` |
| E5 term-rule sentence | `.claude/rules/writing.md:110-113` |
| E6 one word for the axis | `configs/policy.ts:333`, `:1355`; `tests/setupPolicy.ts:1469`; `guides/scaffold.md:1016` carries the sentence |
| E7 comment types' doc lines | `configs/policy.ts:41`, `:47` |
| E8 exclusion constant | `POLICY_PROSE_EXCLUSIONS` at `tests/setupPolicy.ts:238`, `:1346`, `:1360`; doc line unchanged |
| E9 one reader behind two predicates | `readPolicyGuide` at `tests/setupPolicy.ts:1430`; `isPolicyMirror:1450`; `isPolicyStray:1463`; case at `tests/policy.test.ts:397-405` |
| E10 stray message | `tests/setupPolicy.ts:1491`, `:2328` |
| E11 stop-set labels | `tests/config.test.ts:1383`, `:1402` |
| E12 guide | index entry `guides/scaffold.md:1824-1827`; mechanism paragraph `:1013-1023`, placed in § Ownership and drift directly after the `repair`/`overwrite` content-ownership paragraph and before the `tests/distribution.test.ts` paragraph |
| E13 tables and strike | this report, § Symbols, § Prose controls, § Strike |
| E14 inventory | `npm run build` exit 0; `host.json` digest identical across the `build:inventory` re-run — see criterion 5 |

## E3 revert reading

| Step | Reading |
| --- | --- |
| Before the plant | `npm run test:config` exit 0, `Tests 172 passed \| 1 skipped (173)` |
| Plant | `configs/policy.ts:742` → `if (false && text.trimStart().startsWith('@')) break` |
| With the plant | `npm run test:config` exit 1, `Tests 2 failed \| 170 passed \| 1 skipped (173)`; failures are `reads a description paragraph up to its first block tag` and `keeps the committed host inventory aligned with the vendored checkout bytes`. The E3 case reported neither `name` nor `voice` |
| Restore | `configs/policy.ts:742` back to `if (text.trimStart().startsWith('@')) break`; `sha256sum configs/policy.ts` is `477235716dca10f84af294fa7ebad7ff4a321aafe563664b7cd24676f31459d9` before the plant and after the restore, and `diff` against the pre-plant copy reports identical |
| `git diff --stat -- configs/policy.ts` after the restore | ` configs/policy.ts \| 362 +++…+- ` , `1 file changed, 361 insertions(+), 1 deletion(-)` |
| After the restore | `npm run test:config` exit 0, `Tests 172 passed \| 1 skipped (173)` |

## Symbols (E13, at the final tree)

These supersede the D3 report's symbol tables, which were taken before its resumption.

### `configs/policy.ts`

| Symbol | Line |
| --- | --- |
| `PolicyComment` | `configs/policy.ts:42` |
| `PolicySourceCode` | `configs/policy.ts:48` |
| `PolicyDoc` | `configs/policy.ts:54` |
| `PolicyTerm` | `configs/policy.ts:60` |
| `PolicyHit` | `configs/policy.ts:67` |
| `PolicyDiagnostic.node` widened to `PolicyNode` | `configs/policy.ts:74` |
| `PolicyContext.sourceCode` | `configs/policy.ts:84` |
| `POLICY_VOICE_PATTERN` | `configs/policy.ts:253` |
| `POLICY_SENTENCE_PATTERN` | `configs/policy.ts:256` |
| `POLICY_MARKER_PATTERN` | `configs/policy.ts:259` |
| `POLICY_BREAK_PATTERN` | `configs/policy.ts:262` |
| `POLICY_FENCE_PATTERN` | `configs/policy.ts:265` |
| `POLICY_SPAN_PATTERN` | `configs/policy.ts:268` |
| `POLICY_TAG_PATTERN` | `configs/policy.ts:271` |
| `POLICY_URL_PATTERN` | `configs/policy.ts:274` |
| `POLICY_VOICE_STOPWORDS` | `configs/policy.ts:283` |
| `POLICY_BANNED_TERMS` | `configs/policy.ts:339` |
| `POLICY_JUDGED_TERMS` | `configs/policy.ts:371` |
| `blankPolicyText` | `configs/policy.ts:695` |
| `stripPolicyCode` | `configs/policy.ts:711` |
| `textToPolicyHits` | `configs/policy.ts:724` |
| `commentToPolicyParagraph` | `configs/policy.ts:738` |
| `paragraphToPolicyOpener` | `configs/policy.ts:754` |
| `isPolicyVoiced` | `configs/policy.ts:765` |
| `programToPolicyDocs` | `configs/policy.ts:781` |
| `reportVoice` | `configs/policy.ts:809` |
| `reportDocs` | `configs/policy.ts:824` |
| `reportTerm` | `configs/policy.ts:829` |
| `reportComments` | `configs/policy.ts:843` |
| `VOICE_RULE` | `configs/policy.ts:1335` |
| `TERM_RULE` | `configs/policy.ts:1356` |
| register row `'no-malformed-summary'` | `configs/policy.ts:1391` |
| register row `'no-banned-term'` | `configs/policy.ts:1392` |

### `tests/setupPolicy.ts`

| Symbol | Line |
| --- | --- |
| `PolicyRule` gains `'prose'` | `tests/setupPolicy.ts:19` |
| `POLICY_WIRING_RULES` gains `'policy/no-malformed-summary'` | `tests/setupPolicy.ts:162` |
| `POLICY_WIRING_RULES` gains `'policy/no-banned-term'` | `tests/setupPolicy.ts:163` |
| `POLICY_PROSE_EXCLUSIONS` (renamed here from `POLICY_PROSE_ROOTS`) | `tests/setupPolicy.ts:238` |
| `POLICY_MIRROR_PATTERN` | `tests/setupPolicy.ts:247` |
| `POLICY_GUIDE_MAP` | `tests/setupPolicy.ts:250` |
| `POLICY_TERM_FILE` | `tests/setupPolicy.ts:253` |
| `POLICY_TERM_HEADING` | `tests/setupPolicy.ts:256` |
| `readPolicyProse` | `tests/setupPolicy.ts:1352` |
| `readPolicyPackage` | `tests/setupPolicy.ts:1375` |
| `readPolicyGuide` (added here) | `tests/setupPolicy.ts:1430` |
| `isPolicyMirror` (body now delegates) | `tests/setupPolicy.ts:1450` |
| `isPolicyStray` (body now delegates) | `tests/setupPolicy.ts:1463` |
| `inspectPolicyProse` | `tests/setupPolicy.ts:1483` |
| `readPolicyTerms` | `tests/setupPolicy.ts:1521` |
| `inspectPolicyWorkspace` routes the sweep | `tests/setupPolicy.ts:1559` |
| `PROSE_POLICY_MANIFEST` | `tests/setupPolicy.ts:2231` |
| `PROSE_POLICY_CONTROLS` | `tests/setupPolicy.ts:2240` |

### `tests/policy.test.ts`

| Test | Line |
| --- | --- |
| `describe('prose policy')`, the control loop | `tests/policy.test.ts:363` |
| accounts for every top-level guide as this package, the index, or a catalog row | `tests/policy.test.ts:379` |
| reads the guide name a top-level path carries for another package to account for (added here) | `tests/policy.test.ts:397` |
| reads the authored Markdown population and excludes the directories it names | `tests/policy.test.ts:408` |
| `describe('denylist currency')` | `tests/policy.test.ts:421` |
| registers every substitution-table term as either matched or judged (`it.skipIf` here) | `tests/policy.test.ts:430` |
| reports a table row neither set names (the control) | `tests/policy.test.ts:443` |

### `tests/config.test.ts`

| Test | Line |
| --- | --- |
| `tester.run('no-malformed-summary', VOICE_RULE, …)` | `tests/config.test.ts:1338` |
| accepts a word from the stop set after the opener (relabelled here) | `tests/config.test.ts:1383` |
| accepts a block tag naming the symbol after the description (added here) | `tests/config.test.ts:1389` |
| rejects an opener from the stop set (relabelled here) | `tests/config.test.ts:1416` (the report cited `:1402`; corrected by the Orchestrator on the checker's reading) |
| `tester.run('no-banned-term', TERM_RULE, …)` | `tests/config.test.ts:1444` |
| blanks a matched region without moving a line break | `tests/config.test.ts:1650` |
| blanks every code, tag, and address region while holding each later offset | `tests/config.test.ts:1655` |
| reads every banned-term hit in offset order with the row it matched | `tests/config.test.ts:1673` |
| reads a description paragraph up to its first block tag | `tests/config.test.ts:1681` |
| reads the opening word of a paragraph as its letters alone | `tests/config.test.ts:1695` |
| admits a third-person opener and refuses a registered non-verb | `tests/config.test.ts:1701` |
| keeps the matched and judged term sets disjoint and frozen | `tests/config.test.ts:1711` |
| loads every configured policy rule through the real binary | `tests/config.test.ts:1750` |
| expected `policy(no-banned-term)` diagnostic | `tests/config.test.ts:1889` |
| expected `policy(no-malformed-summary)` diagnostic | `tests/config.test.ts:1890` |

The case deleted here is `rejects a description read past its first block tag`, which reported
`voice` from its stop-set opener whether or not the paragraph stopped at the tag.

## Prose controls (E13)

Every row runs through `inspectPolicyControl` and so through the production `inspectPolicyWorkspace`
route over a real temporary workspace. The table is ordered as `PROSE_POLICY_CONTROLS` declares it.

| Control | Line | Membership | Expects |
| --- | --- | --- | --- |
| rejects a banned term in the workspace front page | `tests/setupPolicy.ts:2242` | authored Markdown outside the excluded directories and the guide mirrors | `README.md:3`, `should` |
| rejects a banned term in the package guide | `tests/setupPolicy.ts:2253` | the top-level guide whose name matches the manifest name | `guides/sample.md:3`, `should` |
| rejects a banned term in a rule file | `tests/setupPolicy.ts:2264` | authored Markdown below a dot directory the sweep descends into | `.claude/rules/sample.md:3`, `should` |
| accepts a banned term inside a fenced block | `tests/setupPolicy.ts:2282` | fenced regions, whose lines are code rather than prose | the arrival hit alone, `via` |
| accepts a banned term inside a code span a line break runs through | `tests/setupPolicy.ts:2297` | inline code spans, whose text is a token rather than prose | the arrival hit alone, `via` |
| accepts a banned term in a guide the catalog registers to another package | `tests/setupPolicy.ts:2312` | top-level guides the catalog registers to a package other than this one | the arrival hit alone, `via` |
| rejects a top-level guide the catalog does not register | `tests/setupPolicy.ts:2325` | top-level guides that are neither this package, nor the index, nor a catalog row | `guide is the package's own, the map, or a catalog row` |
| accepts a banned term inside an installed package | `tests/setupPolicy.ts:2336` | Markdown below a directory name the sweep never descends into | the arrival hit alone, `via` |
| accepts a banned term inside scratch work | `tests/setupPolicy.ts:2351` | Markdown below a directory name the sweep never descends into | the arrival hit alone, `via` |

The stray control's membership at `:2313` was corrected here from "top-level guides the catalog
names, with no installed package beside them", which the resumption's ruling had already made false:
the installed-package check is gone and the catalog is the only evidence. The brief's deviation
contract grants label wording beyond E3 and E11, and this is recorded under it.

## Strike (E13)

**Struck:** the D3 report's flagged claim that `programToPolicyDocs` pairs "a doc block written for
one export and followed by an undocumented export … is therefore read twice".

**Reason:** `configs/policy.ts:796` rejects a pairing whose gap text is not whitespace, and the gap
between one export's block and the next export holds that export's own source.

Proven with the real binary against a scratch copy of the shipped `configs/policy.ts`, outside this
tree. The negative control `src/adjacent.ts` — a block naming its own symbol — reports, so the rule
and the harness reach these files; `src/gap.ts` — `/** Creates a control. */`, `export const CONTROL
= 1`, a blank line, `export const control = 2` — reports nothing, though a second read of that block
against `control` would report `name`:

```text
{ "diagnostics": [{"message": "State what the symbol does without naming control in the first sentence.",
  "code": "policy(no-malformed-summary)","severity": "error","filename": "src/adjacent.ts", …}],
  "number_of_files": 2, "number_of_rules": 97 }
```

Coverage: the instrument covers a top-level `const` export pair separated by a blank line, driven
through the real oxlint binary and the shipped rule. It says nothing about class or function
declarations, which take the same `programToPolicyDocs` path.

## Criteria

**1. Greps.**

- `grep -rn "no-imperative-summary" …` prints nothing (exit 1, no match).
- `grep -n "readPolicyGuide" tests/setupPolicy.ts tests/policy.test.ts` prints the declaration
  (`tests/setupPolicy.ts:1430`), the two predicate bodies (`:1451`, `:1464`), the import
  (`tests/policy.test.ts:33`), and the case (`:401-405`).
- The phrase grep prints one line, which is **not** clean. See § Flagged claims:

```text
.claude/rules/writing.md:56:  vendored mirror is fetched bytes rather than authored prose, and `.claude/rules/documentation.md`
```

**2. Read-only gates.**

- `npm run format:check` → exit 0, `All matched files use the correct format.`
- `npm run lint:check` → exit 0, no diagnostic.
- `npm run check` → exit 0 through `check:src:core`, `check:src:server`, and `check:src:bin`.

**3. `npm run test:config`** → exit 0, `Test Files 1 passed (1)`,
`Tests 172 passed | 1 skipped (173)`, with the E3 case present. The revert reading is recorded in
§ E3 revert reading; the case did not report `name` under the plant, which is the deviation.

**4. `npm run test:policy`** → exit 0, `Test Files 1 passed (1)`, `Tests 91 passed (91)`, with the
E2 cases and the E9 case present.

**5. Build and inventory.** `npm run build` → exit 0, last line
`build-inventory: staged 121 file(s) into host.json`. `sha256sum host.json` is
`25645b7994a477417e261d352e08ae6d274968326df22d130820cbb11c11a172` before the `npm run
build:inventory` re-run and identical after it; that re-run exits 0 with the same last line.

**6. Observations.**

- `npm test` → exit 0. Per project: `385 passed`, `432 passed`, `245 passed`, `91 passed`,
  `172 passed | 1 skipped`, `74 passed`, `17 passed`.
- `npm run test:guides` → exit 0, `Test Files 1 passed (1)`, `Tests 17 passed (17)`.

**7. Observation — distribution.** `PATH=/opt/npm11/bin:$PATH npm run test:distribution` → **exit
0**, `Test Files 1 passed (1)`, `Tests 5 passed (5)`, `Duration 72.88s`. The audit round's red is
gone; the deciding run is the Orchestrator's.

## Tree

```text
$ git status --short
 M .claude/rules/typescript.md
 M .claude/rules/writing.md
 M .oxlintrc.json
 M PROPOSAL.md
 M configs/policy.ts
 M guides/scaffold.md
 M host.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
```

```text
$ git diff --stat
 .claude/rules/typescript.md |   5 +
 .claude/rules/writing.md    |   4 +
 .oxlintrc.json              |   4 +-
 PROPOSAL.md                 |   2 +-
 configs/policy.ts           | 362 ++++++++++++++++++++++++++++++++++++++-
 guides/scaffold.md          |  18 +-
 host.json                   |  18 +-
 tests/config.test.ts        | 404 ++++++++++++++++++++++++++++++++++++++++++++
 tests/policy.test.ts        | 128 +++++++++++++-
 tests/setupPolicy.ts        | 400 ++++++++++++++++++++++++++++++++++++++++++-
 10 files changed, 1327 insertions(+), 18 deletions(-)
```

The modified set is exactly the owned set: D3's nine files plus `PROPOSAL.md` for E1's one token.

Nothing was committed. No discard-class git command ran, no dependency was installed, and no
tree-wide `format` or lint `--fix` ran. Probe instruments were written to the session scratchpad
outside this checkout, never to `tmp/` or the tree.

## Flagged claims

- **Criterion 1's phrase grep is not clean, and the hit is not this campaign's.**
  `.claude/rules/writing.md:56` reads "A vendored mirror is fetched bytes rather than authored prose,
  and `.claude/rules/documentation.md` governs it." That line is at `HEAD` — `git diff --
  .claude/rules/writing.md` does not show it — and it uses "vendored mirror" in the third-party
  mirror sense that `.claude/rules/documentation.md` § Parity owns, not in the policy sweep's sense
  the E10 message drops. No edit E1 to E14 names it. Rewording a correct pre-existing rule sentence
  to clear a grep is a suppression, so it stands; the Orchestrator decides whether the criterion or
  the line moves.
- **Two `.orkestrel/` paths moved under this unit, and neither move is mine.** A `git status
  --short` reading taken mid-unit, right after `npm run build:inventory`, listed
  `.orkestrel/campaign/docs-parity/ledger.md` as modified and
  `.orkestrel/campaign/docs-parity/d4-scout-distillate.md` as untracked. Neither appeared in the
  reading at unit start, and neither appears in the final reading. That directory is off-limits to
  this unit and no command here touched it, so another writer held the checkout during the run.
- **The E3 case now in the tree is decorative.** It passes for the reason every other valid case
  passes — a voiced opener and no symbol in the first sentence — and not for the tag boundary its
  name claims. The tag boundary is still proven at the unit level by
  `tests/config.test.ts:1681`, which the plant reddened. Until the remedy lands, the RuleTester run
  carries a case whose name overstates it.
- **`POLICY_VOICE_STOPWORDS` still has no currency source.** Carried unchanged from the D3 report;
  E4's sentence now states the gap in the rule file, which is the only mechanism closing it.
- **`readPolicyGuide` reads the manifest on every call.** `isPolicyMirror` and `isPolicyStray` each
  call it, and `inspectPolicyProse` calls both per path, so the sweep reads `package.json` and the
  catalog file repeatedly. `npm run test:policy` runs in 1.73 s, so nothing is slow enough to act
  on; recorded for the next change over those readers rather than fixed here.
