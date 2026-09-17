# Unit C4 report — the skill and rule findings

## Outcome

Nine of ten criteria closed. Criterion 1 is **half closed**: the lexical-registration law landed, and
the `above`/`below` registration is **blocked** — the term registry lives in `configs/policy.ts`,
which this brief names off-limits, not in `tests/setupPolicy.ts`. The registration is returned as a
proven coupled patch under § Shared-file patches. Every gate is green.

## Deviation — the policy term registry is off-limits

**Expected.** `POLICY_BANNED_TERMS` and `POLICY_JUDGED_TERMS` declared in `tests/setupPolicy.ts`,
which the brief owns.

**Found.** Both are declared in `configs/policy.ts`, which the brief's off-limits list names.
`tests/setupPolicy.ts:22` imports the reader from there:

```ts
import { stripPolicyCode, textToPolicyHits } from '../configs/policy.js'
```

`configs/policy.ts:339` declares `POLICY_BANNED_TERMS` and `configs/policy.ts:371` declares
`POLICY_JUDGED_TERMS`. Both are vendored (`host.json:640`), so editing the registry does move the
vendored surface exactly as the brief predicted — it just moves a different file.

**Why the writing-rule half is also withheld.** The registration is bidirectionally gated. The
`denylist currency` test at `tests/policy.test.ts:697` asserts
`[...registered].sort()` equals `[...new Set(table)].sort()` over the substitution table and the two
registry sets, and `tests/config.test.ts:1709` asserts the sets stay disjoint and frozen. Adding the
table row to the rule file I own, without the registry entries I do not, turns both red. So the table
row and the registry entries are one patch, and neither landed.

**Done or not done.** Not done, awaiting the Orchestrator's serial application of Patch A.

**Hypothesis.** The brief read the registry's consumer rather than its declaration.

## Judgment — `above` and `below` belong in the judged set

The brief asked which set is correct. The evidence says judged, and the sweep is the evidence.

I reproduced `inspectPolicyProse` under the real `stripPolicyCode` reader with an
`/\b(above|below)\b/giu` pattern, over every authored Markdown file outside
`POLICY_PROSE_EXCLUSIONS` (`.git`, `.orkestrel`, `dist`, `node_modules`, `tmp`), with catalog mirrors
skipped. Instrument: `tmp/probe-terms.mts`. Command: `node tmp/probe-terms.mts`.

**Before the fixes: 51 hits. After: 45.** Every one of the 45 survivors carries the permitted
comparative or spatial sense, so a pattern-matched ban would demand 45 rewrites of correct prose:

- 40 in `.agents/skills/enterprise-bootstrap/**` — viewport and type thresholds (`below 576 px`,
  `sizes above 1.25 rem`), the `light-from-above` shadow model, and the quoted interface label
  `"same as above"`;
- `.agents/skills/orkestrel-prove-journey/references/layer.md:125` — a timeout `cap above the cycle`;
- `.claude/rules/architecture.md:89` — `shapers.ts` `sits above them` in the layering;
- `.claude/rules/tests.md:126` — `record nothing below a magnitude`;
- `guides/scaffold.md:238` and `guides/scaffold.md:1343` — `at or above the supported minimum` and
  `a floor below the newest release`.

That is precisely the shape `POLICY_JUDGED_TERMS` exists for. The judged set carries no pattern, so
the registration catches nothing automatically, and the rule's own bullet tells a reader to rule each
hit by sense.

## What the sweep caught, and what I did about each

Six hits used `above` or `below` as a cross-reference, the sense `.claude/rules/writing.md` § Code
tokens bans. All six are fixed. Each now names the section it points at, which also survives a reflow
the positional word does not.

| Path                                                         | Before                                        | After                                                          |
| ------------------------------------------------------------ | --------------------------------------------- | -------------------------------------------------------------- |
| `.agents/skills/orkestrel-debrief/SKILL.md:86`               | `re-prove per the law above.`                 | `re-prove per the re-proving law in § "The debrief laws".`     |
| `.agents/skills/orkestrel-falsify/SKILL.md:50`               | `The **verdict shape** below is this skill's` | `The **verdict shape** in § "Verdict shape" is this skill's`   |
| `.agents/skills/orkestrel-falsify/SKILL.md:117`              | `per the table above.`                        | `per § "Evidence, by subject type".`                           |
| `.agents/skills/orkestrel-falsify/references/reconcile.md:8` | `Every judgement below is cheap`              | `Every judgement that follows is cheap`                        |
| `.agents/skills/orkestrel-harden-package/SKILL.md:14`        | `Select the work lane below and read`         | `Select the work lane § "Select the work lane" names, and read` |
| `.agents/skills/orkestrel-polish-surface/SKILL.md:59`        | `in the fixed shape below.`                   | `in the shape § "Return the fixed verdict shape" fixes.`       |

The 45 survivors stand, for the reason in § Judgment. None is a cross-reference.

## Criteria

1. **Half.** The law landed in `.claude/rules/writing.md`; the registration is blocked. See
   § Deviation and Patch A.
2. **Done.** `npm run test:policy` reports `Test Files 1 passed (1)` and `Tests 102 passed (102)`.
   What the registration catches, and what I did about each hit, is in the two preceding sections.
3. **Done.** `.claude/rules/documentation.md` § Workflow skills carries the API-verification law.
4. **Done.** `SKILL.md` owns the execution rule; `references/brief.md` points at it.
5. **Done.** `orkestrel-build-application` carries `## Accept the result` in its own vocabulary, and
   its `description` states the boundary.
6. **Done.** The instruction-audit bullet ends at `retire only when the job itself is not distinct.`
7. **Done.** `orkestrel-prove-journey` § Load authority states how to treat a retained verdict.
8. **Done.** `npm run format:check` reports `All matched files use the correct format.` over 227
   files. `npm run lint:check` exits 0 with no output. Both were re-run after the build.
9. **Done.** `npm run build` reports `build-inventory: staged 175 file(s) into host.json`. The delta
   is traced in the following section.
10. **Done.** `npm test` exits 0 — 422, 466, 257, 102, 172, 118, and 23 tests passed across its
    projects, 11 skipped. `npm run test:distribution` exits 0 with `Tests 5 passed | 1 skipped (6)`.

`npm run check` ran clean between them.

## The `host.json` delta

Twelve entry digests changed, plus the root digest. No entry was added or removed; the file count
held at 175 across the build. Every changed entry traces to a file this unit edited.

| `host.json` line | `storage`                                                         | Why it moved                                |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| 115               | `agents/skills/orkestrel-build-application/SKILL.md`              | F9 acceptance section and `description`     |
| 127               | `agents/skills/orkestrel-debrief/SKILL.md`                        | O4 cross-reference fix                      |
| 145               | `agents/skills/orkestrel-debrief/references/instruction-audit.md` | F10 history cut and case fix                |
| 157               | `agents/skills/orkestrel-falsify/SKILL.md`                        | O3 execution rule, O4 cross-reference fixes |
| 169               | `agents/skills/orkestrel-falsify/references/brief.md`             | O3 heading and pointer                      |
| 175               | `agents/skills/orkestrel-falsify/references/reconcile.md`         | O4 cross-reference fix                      |
| 181               | `agents/skills/orkestrel-harden-package/SKILL.md`                 | O4 cross-reference fix                      |
| 217               | `agents/skills/orkestrel-polish-surface/SKILL.md`                 | O4 cross-reference fix                      |
| 235               | `agents/skills/orkestrel-prove-journey/SKILL.md`                  | Field-2 retained-verdict rule               |
| 427               | `claude/rules/documentation.md`                                   | O5 API-verification law                     |
| 481               | `claude/rules/writing.md`                                         | O4 lexical-registration law                 |
| 505               | `claude/skills/orkestrel-build-application/SKILL.md`              | Bridge `description` parity with its canon  |
| 2014, the root    | —                                                                 | Rolls up the twelve                         |

Command: `diff tmp/host.before.json host.json`, against a copy taken before the build.

## Touched files

- `.claude/rules/writing.md` — added the lexical-registration law as the first bullet under the
  substitution table, ahead of the bullet describing the instrument.
- `.claude/rules/documentation.md` — added the API-verification law after the skill-validation bullet
  in § Workflow skills.
- `.agents/skills/orkestrel-falsify/SKILL.md` — merged the allowlist and the sandbox into one
  derivation rule, extended the independent-record rule to cover a write the sandbox refuses, and
  fixed two cross-references.
- `.agents/skills/orkestrel-falsify/references/brief.md` — retitled the section
  § "The audit lane's brief", and replaced `writes nothing and runs nothing` with a pointer to
  `SKILL.md` § "Run the round".
- `.agents/skills/orkestrel-build-application/SKILL.md` — added `## Accept the result`; rewrote the
  `description` to state the boundary.
- `.claude/skills/orkestrel-build-application/SKILL.md` — bridge `description` re-synced verbatim,
  which `.claude/rules/documentation.md` § Workflow skills requires and the policy sweep proves.
- `.agents/skills/orkestrel-debrief/references/instruction-audit.md` — cut the campaign-history
  sentence; lower-cased `reference-binding`.
- `.agents/skills/orkestrel-prove-journey/SKILL.md` — added the retained-verdict rule to
  § Load authority.
- `.agents/skills/orkestrel-debrief/SKILL.md`, `.agents/skills/orkestrel-harden-package/SKILL.md`,
  `.agents/skills/orkestrel-polish-surface/SKILL.md`, and
  `.agents/skills/orkestrel-falsify/references/reconcile.md` — cross-reference fixes only.
- `host.json` — regenerated by `npm run build`.

Diffstat over this unit's files, against `HEAD` and therefore inclusive of units C1 to C3 on the two
files they also touched:

```text
 .agents/skills/orkestrel-build-application/SKILL.md              |  19 +++-
 .agents/skills/orkestrel-debrief/SKILL.md                        |   2 +-
 .agents/skills/orkestrel-debrief/references/instruction-audit.md |   6 +-
 .agents/skills/orkestrel-falsify/SKILL.md                        |  21 ++--
 .agents/skills/orkestrel-falsify/references/brief.md             |  24 +++--
 .agents/skills/orkestrel-falsify/references/reconcile.md         |   4 +-
 .agents/skills/orkestrel-harden-package/SKILL.md                 |   2 +-
 .agents/skills/orkestrel-polish-surface/SKILL.md                 |   3 +-
 .agents/skills/orkestrel-prove-journey/SKILL.md                  |   4 +
 .claude/rules/documentation.md                                   |   1 +
 .claude/rules/writing.md                                         |   2 +
 .claude/skills/orkestrel-build-application/SKILL.md              |   2 +-
 host.json                                                        | 116 ++++++++++-------
 13 files changed, 129 insertions(+), 77 deletions(-)
```

## Shared-file patches

### Patch A — `configs/policy.ts` and `.claude/rules/writing.md`, applied together

Apply both hunks in one commit. Either alone reddens `tests/policy.test.ts` § denylist currency.

`configs/policy.ts`, the judged-set doc block and its array:

```diff
 /**
  * Lists every substitution-table row a reader rules by sense, which no pattern matches.
  *
  * @remarks
- * Each row carries a permitted sense: a date value, a version value, a causal clause, and the name
- * a replication topology takes. The currency check proves each row is registered here.
+ * Each row carries a permitted sense: a date value, a version value, a causal clause, the name a
+ * replication topology takes, and a comparative or spatial relation. The currency check proves each
+ * row is registered here.
  */
 export const POLICY_JUDGED_TERMS: readonly string[] = Object.freeze([
 	'now',
 	'new',
 	'latest',
 	'once',
 	'since',
+	'above',
+	'below',
 	'master',
 ])
```

`.claude/rules/writing.md`, the substitution table and the judged-row bullet:

```diff
 | `once` (temporal)        | `after`                                   |
+| `above`, `below` (cross-reference) | `preceding`, `following`, `earlier`, `later` |
 | `please`                 | Delete                                    |
```

```diff
 - `policy/no-banned-term` reads every comment and the prose sweep in `tests/setupPolicy.ts` reads
   every authored Markdown file, and each matches the rows this table bans unconditionally. The rule
-  and the sweep leave `now`, `new`, `latest`, `once`, `since`, and `master` unmatched because those
-  rows carry a permitted sense, so rule a hit in one of those rows yourself.
+  and the sweep leave `now`, `new`, `latest`, `once`, `since`, `above`, `below`, and `master`
+  unmatched because those rows carry a permitted sense, so rule a hit in one of those rows yourself.
```

The formatter reflows the table, so run `npm run format` after applying, then `npm run format:check`.

**Proof, with its control.** The instrument is `tmp/probe-currency.mts`. It applies the table row to
an in-memory copy of the rule, reads that copy with the suite's own `readPolicyTerms` function, and
runs the comparison the gate runs. It resolves `tests/setupPolicy.ts` through a generated copy whose
`../configs/policy.js` specifier is rewritten to `../configs/policy.ts`, because Node's type stripper
does not remap the extension. Output of `node tmp/probe-currency.mts`:

```text
table adds: [ 'above', 'below' ]
registry === table : true
unregistered rows  : []
unrowed registry   : []
control (no registry entries) registry === table : false
```

The control is the same comparison with the row added and the registry left alone. It reports
`false`, which is the failure the gate would report, so the instrument discriminates.

### Patch B — `.agents/templates/brief.md`

This unit retitled the falsify reference's section, so the template's pointer needs the new title.
The word `read-only` there also described the lane's tools, which `SKILL.md` refuses.

```diff
-A read-only audit lane is the exception that drops rows: fill the rows
-`.agents/skills/orkestrel-falsify/references/brief.md` § "The read-only audit lane's brief" names
+An audit lane is the exception that drops rows: fill the rows
+`.agents/skills/orkestrel-falsify/references/brief.md` § "The audit lane's brief" names
 and delete the rest of this template. Every other dispatch keeps every section and row heading
 verbatim.
```

## Finding for a successor unit — the new law's wider reach

The law landed in `.claude/rules/writing.md` says to register each lexical prohibition in the
substitution table. That file prohibits more tokens than the table registers: `ensure`, `guarantee`,
and `soon` in § Claims and time; `we`, `our`, and `let's` in § Voice and actor; `here` and
`this document` in § Code tokens; `foo`, `bar`, and `baz` in § Examples, numbers, and abbreviations.
Each needs a table row and a registry entry, and each new row in `POLICY_BANNED_TERMS` runs a fresh
sweep over the repository's authored prose. That work is outside this unit's enumerated scope. It is
recorded here against the capability that owns it — the writing rule's substitution table.

## Instruments retained

- `tmp/probe-terms.mts` — the `above` and `below` sweep under the real `stripPolicyCode` reader.
- `tmp/probe-currency.mts` — the currency proof for Patch A, with its negative control.
- `tmp/c4-test.log.txt` and `tmp/c4-distribution.log.txt` — the gate logs.

## Not closed

- The `above` and `below` registration, blocked on `configs/policy.ts`. Patch A closes it.
- The `.agents/templates/brief.md` pointer, which Patch B closes. Until then the template names a
  section title the falsify reference no longer carries.
