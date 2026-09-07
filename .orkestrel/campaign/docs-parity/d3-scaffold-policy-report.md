# Unit D3 — scaffold-policy: report

Done, with one deviation. `policy/no-imperative-summary` and `policy/no-banned-term` ship in the
vendored plugin at error severity, the vendored sweep reads every authored Markdown file over the
same denylist, the denylist's currency against `.claude/rules/writing.md` § Substitutions is a test
with a control, and every named criterion exits 0. **Not done:** the mirror-evidence violation the
brief fixes cannot be met green in this checkout; § Deviation names it with its evidence.

## Deviation — the mirror-evidence violation

**Expected.** "for each top-level guide that is a mirror candidate with no
`node_modules/@orkestrel/<name>/package.json` beside it, one violation `guide is the package's own,
the map, or a vendored mirror` (so the exclusion is evidence, never silence)".

**Found.** That evidence does not exist for half of scaffold's own mirrors, so the rule as fixed
reddens `npm run test:policy`, which acceptance criterion 4 requires green. `guides/` holds 48
mirror candidates (every `.md` except `README.md` and `scaffold.md`). 24 have the package installed;
24 do not:

```text
agent, brief, browser, budget, csv, form, interpret, middleware, msg, ndjson, ollama, pool,
program, qualifier, rater, reason, relation, sea, table, terminal, toolbox, worker, workflow,
workspace
```

Measured at the tip of this unit's work:

```text
$ node -e "const fs=require('fs');const cand=fs.readdirSync('guides').filter(f=>f.endsWith('.md'))
  .map(f=>f.slice(0,-3)).filter(n=>n!=='README'&&n!=='scaffold');
  const un=cand.filter(n=>!fs.existsSync('node_modules/@orkestrel/'+n+'/package.json'));
  console.log('candidates',cand.length,'unbacked',un.length)"
candidates 48 unbacked 24
```

**Done vs not done.** `isPolicyMirror`, the mirror exclusion, and its controls are implemented and
green: a hit in `guides/other.md` with `node_modules/@orkestrel/other/package.json` beside it is not
reported, and a hit in `guides/<own>.md` is. The guide finding itself is **not implemented**, and no
substitute evidence source was invented. The `guides/stray.md` control the brief lists is therefore
absent from `PROSE_POLICY_CONTROLS`.

**Hypothesis.** The brief's evidence holds for a target, whose `guides/` mirrors are exactly its
installed `@orkestrel` dependencies, and does not hold for scaffold, whose `guides/` is the fleet's
mirror shelf: `host.json` stages `guides/guide.md` and `guides/scaffold.md` alone, so the other 46
files are read here rather than shipped, and their packages are not dependencies.

Two in-repository sources could carry that evidence, recorded as observations rather than
implemented: the catalog table in `.claude/agents/orkestrel.md`, which `scaffold catalog`
regenerates from the registry and which names every package in this list, and the directory index in
`guides/README.md`.

## Answers to the Unknowns

**`context.sourceCode.text` exists on oxlint 1.80.0.** The probe under `tmp/probe/d3/` (deleted;
`tmp/probe` is empty) ran the P5 plugin shape through the real binary and printed the context's
source-code keys:

```text
SOURCECODE-KEYS ["text","hasBOM","ast","isESTree","scopeManager","visitorKeys","parserServices",
"lines","lineStartIndices","tokensAndComments","getText","getAncestors", ...,"getAllComments", ...]
TEXT-TYPE string LEN 128
GETTEXT-TYPE function
COMMENTS [{"type":"Block","keys":["type","value","start","end","range","loc"],"range":[0,28], ...}]
```

Mechanism chosen: `sourceCode.text` with `slice(comment.range[1], statement.range[0])`, because it
reads the gap directly and needs no node argument. The same probe driven through `RuleTester`
reported `TESTER TEXT-TYPE string GETTEXT function GETALL function`, so the test harness exposes the
identical surface and the RuleTester runs exercise the shipped path.

**`context.report({ loc })` with a computed position lands where it is told.** The probe reported a
computed `{ start: { line: 1, column: 3 }, end: { line: 1, column: 8 } }` at
`"span": {"offset": 3,"length": 5,"line": 1,"column": 4}`. It is not used: both rules report on the
comment as the brief fixes, and the term message carries the term.

**Third finding, outside the Unknowns.** oxlint's `CommentType.type` is
`"Line" | "Block" | "Shebang"`, so a two-member `PolicyComment.type` breaks assignability of
`PolicyRuleInterface` to `Rule` and reddens `npm run check` at every existing `tester.run` call
(`tests/config.test.ts(765,27): error TS2345 … Property 'createOnce' is missing`). § Decisions
records the resolution.

## New types, constants, helpers, rules, registers, and tests

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
| register rows `'no-imperative-summary'`, `'no-banned-term'` | `configs/policy.ts:1391-1392` |

### `tests/setupPolicy.ts`

| Symbol | Line |
| --- | --- |
| `PolicyRule` gains `'prose'` | `tests/setupPolicy.ts:15` |
| `POLICY_WIRING_RULES` gains both rules | `tests/setupPolicy.ts:162-163` |
| `POLICY_PROSE_ROOTS` | `tests/setupPolicy.ts:238` |
| `POLICY_MIRROR_PATTERN` | `tests/setupPolicy.ts:247` |
| `POLICY_GUIDE_MAP` | `tests/setupPolicy.ts:250` |
| `POLICY_TERM_FILE` | `tests/setupPolicy.ts:253` |
| `POLICY_TERM_HEADING` | `tests/setupPolicy.ts:256` |
| `readPolicyProse` | `tests/setupPolicy.ts:1340` |
| `readPolicyPackage` | `tests/setupPolicy.ts:1363` |
| `isPolicyMirror` | `tests/setupPolicy.ts:1390` |
| `inspectPolicyProse` | `tests/setupPolicy.ts:1407` |
| `readPolicyTerms` | `tests/setupPolicy.ts:1436` |
| `inspectPolicyWorkspace` routes the sweep | `tests/setupPolicy.ts:1481` |
| `PROSE_POLICY_MANIFEST` | `tests/setupPolicy.ts:2126` |
| `PROSE_POLICY_CONTROLS` | `tests/setupPolicy.ts:2135` |

`PROSE_POLICY_CONTROLS` members, each run through `inspectPolicyControl` and so through the
production `inspectPolicyWorkspace` route over a real temporary workspace:

| Control | Line | Expects |
| --- | --- | --- |
| rejects a banned term in the workspace front page | `tests/setupPolicy.ts:2137` | `README.md:3`, `should` |
| rejects a banned term in the package guide | `tests/setupPolicy.ts:2148` | `guides/sample.md:3`, `should` |
| rejects a banned term in a rule file | `tests/setupPolicy.ts:2159` | `.claude/rules/sample.md:3`, `should` |
| accepts a banned term inside a fenced block | `tests/setupPolicy.ts:2177` | the arrival hit alone |
| accepts a banned term inside a code span a line break runs through | `tests/setupPolicy.ts:2192` | the arrival hit alone |
| accepts a banned term in a guide mirroring another package | `tests/setupPolicy.ts:2207` | the arrival hit alone |
| accepts a banned term inside an installed package | `tests/setupPolicy.ts:2219` | the arrival hit alone |
| accepts a banned term inside scratch work | `tests/setupPolicy.ts:2234` | the arrival hit alone |

### `tests/policy.test.ts`

| Test | Line |
| --- | --- |
| `describe('prose policy')`, the control loop | `tests/policy.test.ts:350` |
| reads the authored Markdown population and excludes the directories it names | `tests/policy.test.ts:362` |
| `describe('denylist currency')` | `tests/policy.test.ts:375` |
| registers every substitution-table term as either matched or judged | `tests/policy.test.ts:380` |
| reports a table row neither set names (the control) | `tests/policy.test.ts:390` |

### `tests/config.test.ts`

| Test | Line |
| --- | --- |
| `tester.run('no-imperative-summary', VOICE_RULE, …)` | `tests/config.test.ts:1338` |
| `tester.run('no-banned-term', TERM_RULE, …)` | `tests/config.test.ts:1445` |
| blanks a matched region without moving a line break | `tests/config.test.ts:1651` |
| blanks every code, tag, and address region while holding each later offset | `tests/config.test.ts:1656` |
| reads every banned-term hit in offset order with the row it matched | `tests/config.test.ts:1674` |
| reads a description paragraph up to its first block tag | `tests/config.test.ts:1682` |
| reads the opening word of a paragraph as its letters alone | `tests/config.test.ts:1696` |
| admits a third-person opener and refuses a registered non-verb | `tests/config.test.ts:1702` |
| keeps the matched and judged term sets disjoint and frozen | `tests/config.test.ts:1712` |
| loads every configured policy rule through the real binary | `tests/config.test.ts:1751` |

The voice run carries valid cases for `Creates`, `Checks whether`, `Is`, `Reports whether`, an
anonymous default export, a doc block no export reaches, a doc block on a class member, a single-star
block comment before an export, a stop-set word after the opener, and an export with no comment; and
invalid cases for a noun-phrase opener, an imperative opener, a stop-set opener, a class name repeat,
a constant name repeat, an empty doc block, a doc block a blank line separates from its export, and a
description read past its first block tag. The term run carries valid cases for a code span, a fenced
example, a link target, an address, a span a line break runs through, the judged rows, a longer word
carrying a term, and clean prose; and one invalid case per matched row, plus `easiest`, `utilizing`,
`leveraged`, `robustness`, `dummies`, the dotted rows, `and/or`, `sanity-check`, and one block
comment, each asserting `data.term` and `data.replacement`.

The real-binary fixture gains `// A reader should meet this term.` at `tests/config.test.ts:1759`
and `/** The opener, a noun phrase. */` at `:1768`; the expected list gains
`policy(no-banned-term) src/violations/fixture.ts` and
`policy(no-imperative-summary) src/violations/fixture.ts` at `:1890-1891`; the clean fixture gains
`// Reads the value a caller receives.` and `/** Holds one runtime-private value. */` at
`:1803-1804` and its report stays empty.

## Residual hits the real rules found beyond the probes

**None.** `npm run lint:check` over the whole tree exits 0 with both rules at top-level error
severity. The lint population is 59 files, which is wider than the probes': the P10b instrument read
`src app configs tests scripts` and never read the root `vite.config.ts`, which oxlint does lint.
That file carries `//` comments before its exports rather than doc blocks, so
`policy/no-imperative-summary` finds no member there, and `policy/no-banned-term` read those comments
and reported nothing. No comment or doc block in this checkout was edited by this unit.

That absence is not vacuous. A control planted in a scratch copy outside this tree, run through the
real binary against the shipped `configs/policy.ts` and `.oxlintrc.json`:

```text
$ node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --format json src/violations
{"message":"Replace via in this comment: through, by using.","code":"policy(no-banned-term)", …}
{"message":"Open this description with a third-person verb ending in s, such as Creates, Returns,
 or Checks whether.","code":"policy(no-imperative-summary)", …}
```

and a second control over a copy of the real `configs/policy.ts` with one multi-line `@remarks` doc
block's opener replaced by a noun phrase, which reports that block and nothing else — so the rule
reaches this file's real 703 doc blocks rather than only synthetic ones.

Cross-check against the campaign instruments after the change:

```text
$ node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts
FILES 58 BLOCKS 703 FLAGGED 0 NODOC 35
$ node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold
FILES 80 HITS 0
```

The vendored sweep independently reads 128 Markdown files, excludes 48 mirrors, sweeps 80, and
reports 0 — the same 80-file population `p9d-terms.mjs` reports, derived by a different walk.

## Failing-first evidence

Each new assertion was observed red before it was observed green, on the same command.

| Command | Red | Cause | Green |
| --- | --- | --- | --- |
| `npm run check` | red, first `tests/config.test.ts(765,27): error TS2345` and one per `tester.run` call | `PolicyComment.type` declared with two members against oxlint's three | exit 0 after the widening |
| `npm run test:config` | `29 failed \| 136 passed (166)` | the term cases asserted `data.term` alone, leaving `{{replacement}}` unhydrated | `172 passed \| 1 skipped (173)` after each case named its replacement |
| `npm run test:config` | `2 failed \| 170 passed (173)`, `admits a third-person opener and refuses a registered non-verb` | `These` in the stop set fails `^[A-Z][a-z]*s$`, so the set carried a member the pattern never admits | green after the member was struck |
| `npm run test:config` | `1 failed \| 164 passed (166)`, `keeps the committed host inventory aligned with the vendored checkout bytes` | the vendored bytes moved before `host.json` was regenerated | green after `npm run build:inventory` |

## Decisions recorded

- **`PolicyComment extends PolicyNode`, `type: 'Block' | 'Line' | 'Shebang'`.** The brief fixes both
  `PolicyDiagnostic.node` widening to `PolicyNode` and `PolicyComment.range` as
  `readonly [number, number]`; those two cannot hold together, because a readonly tuple is not
  assignable to `PolicyNode`'s `[number, number]` and the comment would stop being reportable.
  Extending `PolicyNode` keeps the fixed member set, keeps reportability, and states that a comment
  is a reportable node. The third `type` member is oxlint 1.80.0's own
  (`node_modules/oxlint/dist/plugins-dev.d.ts:1315`), and omitting it breaks the plugin's
  assignability to `Rule`.
- **`These` struck from the stop set.** It ends in `e`, so `POLICY_VOICE_PATTERN` never admits it and
  the entry could never fire. `isPolicyVoiced('These')` is `false` either way, so no behaviour moved.
  The assertion at `tests/config.test.ts:1709` is the mechanism that keeps the set reachable.
- **`readPolicyPackage` strips any scope, not `@orkestrel/` alone.** The file is vendored
  byte-identical into workspaces outside that scope, where a fixed prefix would read `@acme/thing`
  as `acme/thing` and lose the workspace's own-guide exclusion.
- **`programToPolicyDocs`, `reportVoice`, `reportDocs`, `reportTerm`, and `reportComments` are proven
  through the `RuleTester` runs**, not through a hand-built AST and a stub context. The RuleTester
  drives them with a real oxlint parse and the real context, and each valid case is one membership
  boundary: a non-export, a class member, a single-star block, an export with no comment, and a
  whitespace-separated block. A hand-built program node would assert my belief about the AST rather
  than the AST.
- **Exports beyond the brief's fixed list:** `blankPolicyText` (four callers), `reportDocs` and
  `reportComments` (the visitor-table delegations `.claude/rules/workspace.md` § Policy instruments
  requires), the pattern constants, and in the sweep `POLICY_GUIDE_MAP`, `POLICY_MIRROR_PATTERN`,
  `POLICY_TERM_FILE`, `POLICY_TERM_HEADING`, and `PROSE_POLICY_MANIFEST`.
- **Every prose control expects exactly one violation.** Each control attacking an exclusion also
  writes an arrival file carrying a different banned term, so a control that reports nothing is a
  failure rather than a pass, and the reported term names which file reported.
- **`stripPolicyCode` reuses `p9d-terms.mjs`'s fence and span patterns**, so the shipped sweep reads
  the population D3-pre converged the tree against.

## Criteria

1. **Wiring, registration, and wiring rules.**

   ```text
   $ grep -n "no-imperative-summary\|no-banned-term" .oxlintrc.json configs/policy.ts tests/setupPolicy.ts
   .oxlintrc.json:61:		"policy/no-imperative-summary": "error",
   .oxlintrc.json:62:		"policy/no-banned-term": "error"
   configs/policy.ts:1391:		'no-imperative-summary': VOICE_RULE,
   configs/policy.ts:1392:		'no-banned-term': TERM_RULE,
   tests/setupPolicy.ts:162:	'policy/no-imperative-summary',
   tests/setupPolicy.ts:163:	'policy/no-banned-term',
   ```

2. **The read-only gates, with the rules on.** `npm run format:check` → exit 0,
   `All matched files use the correct format.` `npm run lint:check` → exit 0, no diagnostic.
   `npm run check` → exit 0 through `check:src:core`, `check:src:server`, and `check:src:bin`.

3. **`npm run test:config`** → exit 0, `Test Files 1 passed (1)`,
   `Tests 172 passed | 1 skipped (173)`. The baseline at `HEAD` was `111 passed | 1 skipped (112)`.

4. **`npm run test:policy`** → exit 0, `Test Files 1 passed (1)`, `Tests 88 passed (88)`. The
   baseline at `HEAD` was `77 passed (77)`. The eight prose controls, the population membership
   assertion, the currency check, and its control are inside that count, and
   `enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace`
   now routes `inspectPolicyProse` over 80 swept files and reports none.

5. **Build, inventory, and the remaining suites.** `npm run build` → exit 0, last lines
   `build-host: staged 121 file(s) into dist/host` and
   `build-inventory: staged 121 file(s) into host.json`. `npm run build:inventory` → exit 0, same
   last line. `git status --short` lists `M host.json`. The digests that moved are exactly the eight
   files this unit edited — `.claude/rules/typescript.md`, `.claude/rules/writing.md`,
   `.oxlintrc.json`, `configs/policy.ts`, `guides/scaffold.md`, `tests/config.test.ts`,
   `tests/policy.test.ts`, `tests/setupPolicy.ts` — with no entry added or removed.
   `npm run test:setup` → exit 0, `74 passed (74)`. `npm run test:guides` → exit 0, `17 passed (17)`.

## Observations, not criteria

- `npm test` → exit 0. Per project: `385 passed`, `432 passed`, `245 passed`, `88 passed`,
  `172 passed | 1 skipped`, `74 passed`, `17 passed`.
- `npm run test:distribution` → exit 1, `Tests 1 failed | 4 passed (5)`. The failure is
  `installed package consumer > installs the packed scaffold and passes one generated core/server
  workspace through prepublish [requires a reachable npm registry]`,
  `AssertionError: expected 1 to be +0`, the same reading D3-pre recorded. This unit changed no
  manifest, no lockfile, no template, and not `tests/distribution.test.ts`; `git status --short`
  confirms none is modified. The authoritative run is the Orchestrator's.

## Touched files

| File | Change |
| --- | --- |
| `configs/policy.ts` | the comment surface on `PolicyContext`, the denylist and the judged set, the pure helpers, `VOICE_RULE`, `TERM_RULE`, and the register rows |
| `tests/setupPolicy.ts` | the `prose` rule, the Markdown sweep and its readers, the terms reader, `PROSE_POLICY_CONTROLS`, and the two wiring rules |
| `tests/policy.test.ts` | the prose control loop, the population membership assertion, the currency check and its control |
| `tests/config.test.ts` | the two `RuleTester` runs, the pure-helper tests, and the extended real-binary fixtures |
| `.oxlintrc.json` | both rules at top-level error severity |
| `.claude/rules/typescript.md` | the one sentence naming what `policy/no-imperative-summary` reads |
| `.claude/rules/writing.md` | the one sentence naming what the rule and the sweep read and what they leave to review |
| `guides/scaffold.md` | the policy proof row names the two rules, the prose sweep, and the shared denylist |
| `host.json` | regenerated by `npm run build:inventory` |

```text
 .claude/rules/typescript.md |   4 +
 .claude/rules/writing.md    |   4 +
 .oxlintrc.json              |   4 +-
 configs/policy.ts           | 362 ++++++++++++++++++++++++++++++++++++++-
 guides/scaffold.md          |  11 +-
 host.json                   |  18 +-
 tests/config.test.ts        | 405 ++++++++++++++++++++++++++++++++++++++++++++
 tests/policy.test.ts        |  75 +++++++-
 tests/setupPolicy.ts        | 283 ++++++++++++++++++++++++++++++-
 9 files changed, 1149 insertions(+), 17 deletions(-)
```

`git status --short` lists those same nine files, all modified, none added, none deleted. No
off-limits file was touched, `tmp/probe/` is empty, and nothing was committed.

## Flagged claims

- **The brief's dispatch baseline names a different commit.** The brief records
  `bce3ddb4 Record D3-pre's closure`; this checkout opened at
  `35dcdd0c Record D3's dispatch`, one commit later, with a clean tree. Every other dispatch fact
  reproduced.
- **The stop set and the denylist are copies, and only one of them has a currency mechanism.**
  `POLICY_BANNED_TERMS` and `POLICY_JUDGED_TERMS` are proven against
  `.claude/rules/writing.md` § Substitutions by `tests/policy.test.ts:380`. `POLICY_VOICE_STOPWORDS`
  has no external source to compare against — no rule file lists those words — so its test proves
  only that each member is reachable by the pattern. A word that ought to be in the set and is not
  passes the rule silently. Recorded for the next change over that constant.
- **`policy/no-banned-term` reads a comment's prose, never a string literal.**
  `tests/src/bin/CLI.test.ts:3285` carries a banned term inside a test title, which D3-pre placed
  outside its scope; the rule does not reach it either, and it remains.
- **The voice rule's opener test is a proxy, and it fails one way.** A plural noun ending in `s`
  passes `^[A-Z][a-z]*s$` and no stop-set member closes that direction, so a doc block opening
  `Files the …` is admitted. D3-pre recorded the same gap and rewrote the two blocks it found. The
  sentence landed in `.claude/rules/typescript.md` says review reads the sentence as well, which is
  the only mechanism that closes it.
- **`programToPolicyDocs` pairs a statement with the last comment that closes before it.** A doc
  block written for one export and followed by an undocumented export is therefore read twice — once
  for each — because no other comment intervenes. No such pair exists in this checkout
  (`lint:check` exit 0), and the behaviour is the conservative direction: it over-reads rather than
  under-reads. Recorded rather than fixed, because narrowing it needs a token-level check the
  brief's fixed semantics do not name.

## Resumed — the mirror evidence is the catalog table

The deviation is closed on the coordinator's ruling. The catalog table in
`.claude/agents/orkestrel.md` is the evidence, and it is the only evidence: the installed-package
check is gone, a top-level guide the catalog registers to another package is a mirror, and a
top-level guide that is neither this package's own, nor `guides/README.md`, nor a catalog row now
reports `guide is the package's own, the map, or a vendored mirror`. Every criterion re-ran and
exits 0.

The ruling's premise reproduced before implementation. Reading the first cells beneath
`## Package catalog` and stripping each scope yields 50 names; all 48 of scaffold's mirror
candidates are among them, `guide` and `scaffold` included, `README` is not, and the one catalog
name with no guide is `supervisor`:

```text
catalog rows 50
candidates 48 not in catalog: (none)
README in catalog? false
scaffold in catalog? true
catalog names not guided: supervisor
```

### What landed

| Symbol | Line |
| --- | --- |
| `POLICY_CATALOG_FILE` | `tests/setupPolicy.ts:265` |
| `POLICY_CATALOG_HEADING` | `tests/setupPolicy.ts:268` |
| `readPolicyCatalog` | `tests/setupPolicy.ts:1400` |
| `isPolicyMirror`, rewritten onto the catalog | `tests/setupPolicy.ts:1431` |
| `isPolicyStray` | `tests/setupPolicy.ts:1446` |
| the finding inside `inspectPolicyProse` | `tests/setupPolicy.ts:1471` |
| `createPolicyCatalog` | `tests/setupPolicy.ts:2171` |
| control: a cataloged mirror with no installed package is excluded | `tests/setupPolicy.ts:2297` |
| control: a top-level guide the catalog does not register reports | `tests/setupPolicy.ts:2310` |
| accounts for every top-level guide as this package, the index, or a catalog row | `tests/policy.test.ts:375` |

`POLICY_CATALOG_FILE` is a literal, as the ruling requires: the module is vendored byte-identical
into every workspace and imports nothing from the package, so it cannot read `CATALOG_AGENT_PATH`.
`readPolicyCatalog` returns an empty list where the file or the heading is absent, so a workspace
that has not received a catalog registers no package rather than failing.

`isPolicyStray` is the second predicate the finding needs; the ruling names the behaviour and not a
symbol for it, so the name is mine. `createPolicyCatalog` mirrors `createPolicyRuleMap` and is what
lets each control carry its own catalog rather than an inline table.

Two decisions beyond the ruling, both recorded:

- **A stray guide is reported and still swept for terms.** It is not a mirror, so nothing accounts
  for its prose being someone else's; reading it is the direction that hides nothing.
- **`excludes documentation from the suppression population` in `tests/policy.test.ts` gains a
  manifest.** That control writes `guides/sample.md` into a scratch workspace with no manifest, so
  the new finding fired on it and its `toEqual([])` over the whole workspace route went red. Naming
  the package `@orkestrel/sample` makes that guide the workspace's own rather than an unaccounted
  one, and keeps the control asserting silence across the whole route.

### Failing-first readings for the two new controls

Each mechanism was removed from `tests/setupPolicy.ts`, the same command run, the reading recorded,
and the file restored to bytes `cmp` reports identical.

| Removed | Command | Red |
| --- | --- | --- |
| the finding inside `inspectPolicyProse` | `npm run test:policy` | `1 failed \| 89 passed (90)`; `rejects a top-level guide the catalog does not register` → `AssertionError: expected [] to have a length of 1 but got +0` |
| the catalog condition in `isPolicyMirror` | `npm run test:policy` | `3 failed \| 87 passed (90)`; `accepts a banned term in a guide the catalog registers to another package` → `expected [ { rule: 'prose', …(3) }, …(1) ] to have a length of 1 but got 2`; `accounts for every top-level guide as this package, the index, or a catalog row` → `expected false to be true`; `enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace` → `expected [ { rule: 'prose', …(3) }, …(315) ] to deeply equal []` |

The third row is the reading that closes the deviation: with the catalog gone, sweeping the mirrors
produces 316 violations over the real workspace, and with the catalog present it produces none.

A third failing-first reading arrived unprompted when the finding first landed:
`npm run test:policy` → `1 failed | 88 passed (89)`,
`excludes documentation from the suppression population` →
`AssertionError: expected [ { rule: 'prose', …(2) } ] to deeply equal []`. That is the finding
firing on a real fixture before any control asked it to.

### Criteria, re-run

1. **Wiring.** Unchanged.

   ```text
   $ grep -n "no-imperative-summary\|no-banned-term" .oxlintrc.json configs/policy.ts tests/setupPolicy.ts
   .oxlintrc.json:61:		"policy/no-imperative-summary": "error",
   .oxlintrc.json:62:		"policy/no-banned-term": "error"
   configs/policy.ts:1391:		'no-imperative-summary': VOICE_RULE,
   configs/policy.ts:1392:		'no-banned-term': TERM_RULE,
   tests/setupPolicy.ts:162:	'policy/no-imperative-summary',
   tests/setupPolicy.ts:163:	'policy/no-banned-term',
   ```

2. **The read-only gates.** `npm run format:check` → exit 0. `npm run lint:check` → exit 0.
   `npm run check` → exit 0. No delta.

3. **`npm run test:config`** → exit 0, `Tests 172 passed | 1 skipped (173)`. No delta.

4. **`npm run test:policy`** → exit 0, `Tests 90 passed (90)`. Delta `+2` from `88`: the
   catalog-registered mirror control replaced the installed-package one in place, the
   catalog-does-not-register control is new, and the real-workspace guide accounting is new.

5. **Build, inventory, and the remaining suites.** `npm run build` → exit 0,
   `build-host: staged 121 file(s) into dist/host`,
   `build-inventory: staged 121 file(s) into host.json`. `npm run build:inventory` → exit 0, same
   line. The digests that moved are the same eight files as before, none added, none removed.
   `npm run test:setup` → exit 0, `74 passed (74)`. `npm run test:guides` → exit 0, `17 passed (17)`.
   No delta.

**Observation.** `npm test` → exit 0: `385`, `432`, `245`, `90`, `172 passed | 1 skipped`, `74`,
`17`. The real prose sweep now reads `files=128 mirrors=48 strays=0 swept=80 catalog=50
violations=0`, so every one of the 48 exclusions carries its catalog row and none is silent.
`npm run test:distribution` was not re-run; its earlier reading stands and this resumption touched
no manifest, lockfile, or template.

### Final diffstat

```text
 .claude/rules/typescript.md |   4 +
 .claude/rules/writing.md    |   4 +
 .oxlintrc.json              |   4 +-
 configs/policy.ts           | 362 ++++++++++++++++++++++++++++++++++++++-
 guides/scaffold.md          |  15 +-
 host.json                   |  18 +-
 tests/config.test.ts        | 405 ++++++++++++++++++++++++++++++++++++++++++++
 tests/policy.test.ts        | 103 ++++++++++-
 tests/setupPolicy.ts        | 385 ++++++++++++++++++++++++++++++++++++++++-
 9 files changed, 1283 insertions(+), 17 deletions(-)
```

`git status --short` lists those same nine files, all modified, none added, none deleted.
`tmp/probe/` is empty, no off-limits file was touched, and nothing was committed. The guide's policy
passage now states the rule: the sweep skips a top-level guide the catalog registers to another
package and reports one that is neither this package's own, nor `guides/README.md`, nor a catalog
row.

### Flagged claim added by this resumption

- **The catalog is regenerated data, so the sweep's exclusion moves when the registry moves.**
  `scaffold catalog` rewrites the block between the `orkestrel:catalog` markers, so a package
  dropped from the registry turns its vendored guide into a reported stray on the next regeneration,
  and a guide fetched before its package is published reports until the catalog catches up. That is
  the intended direction — a guide with no evidence reports — but it couples the prose sweep to a
  regenerated artifact, and a fleet target that has not run `catalog` since a fleet change reads the
  older list. `readPolicyCatalog` reads the whole `## Package catalog` section rather than the
  marker block, so a hand-written row outside the markers would also register; the section holds
  only the generated table today.
