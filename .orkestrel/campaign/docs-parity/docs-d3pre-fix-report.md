# Unit report — D3-pre-fix

## Edits

1. `tests/setupServer.ts:1483` — `Counts the artifacts the compiler itself supplies for a plan selecting \`src/core\` alone.` → `Lists the artifacts the compiler itself supplies for a plan selecting \`src/core\` alone.`; `tests/setupServer.ts:1487-1489` — `Counted from a real compile rather than summed from parts, because the generated set grows every time the emitter gains a group and a hand-written sum goes stale on each one.` → `Read from a real compile rather than assembled by hand, because the generated set grows every time the emitter gains a group and a hand-written list goes stale on each one.` `CORE_GENERATED_COUNT` (line 1496) unchanged, still `Counts …`.
2. `tests/setupServer.ts:1521` — `Counts the planned paths a repair leaves alone because the workspace owns them.` → `Lists the planned paths a repair leaves alone because the workspace owns them.`; `tests/setupServer.ts:1526` — `Counted from the plan so it tracks the emitter:` → `Read from the plan so it tracks the emitter:`. `FLEET_BIRTH_COUNT` (line 1535) unchanged, still `Counts …`.
3. Separator restored in seven blocks, matching `git show HEAD:<file>` shape:
   - `configs/policy.ts:260-264` (`isPolicyDomain`)
   - `configs/policy.ts:457-461` (`functionToPolicyRegion`)
   - `tests/setupPolicy.ts:674-680` (`parseSkillPrompt`)
   - `tests/setupPolicy.ts:696-702` (`matchesSkillToken`)
   - `tests/setupPolicy.ts:1139-1144` (`inspectPolicyRuleMap`)
   - `tests/setupPolicy.ts:1174-1181` (`inspectPolicyFilenamePaths`)
   - `tests/setupPolicy.ts:1330-1336` (`inspectPolicyControl`)
4. One verb (`Matches`) for every `_PATTERN`/`_GLOB`/`_GLOBS` constant. Sites found by `grep -n "_PATTERN\|_GLOB" configs/policy.ts tests/setupPolicy.ts`:
   - `configs/policy.ts:193` `POLICY_PLACEMENT_GLOBS` — before `Lists the lint populations …` → after `Matches the lint populations …`
   - `configs/policy.ts:202` `POLICY_ENDING_GLOBS` — before `Names the lint population …` → after `Matches the lint population …`
   - `configs/policy.ts:212` `POLICY_CLASS_PATTERN` — before `Describes the file name shape an implementation file takes, …` → after `Matches the file name shape an implementation file takes, …`
   - `configs/policy.ts:215` `POLICY_CONSTANT_PATTERN` — before `Describes the name shape every constants.ts declaration takes.` → after `Matches the name shape every constants.ts declaration takes.`
   - `configs/policy.ts:218` `POLICY_DOMAIN_PATTERN` — before `Describes the file name shape a direct module of a registered function domain takes.` → after `Matches the file name shape a direct module of a registered function domain takes.`
   - `tests/setupPolicy.ts:133` `POLICY_MODULE_GLOB` — already `Matches …`, unchanged.
   - `tests/setupPolicy.ts:136` `POLICY_TESTS_MODULE_GLOB` — already `Matches …`, unchanged.
   - `tests/setupPolicy.ts:139` `POLICY_TEST_GLOB` — already `Matches …`, unchanged.
   - `tests/setupPolicy.ts:145` `POLICY_SUPPRESSION_GLOB` — already `Matches …`, unchanged.
   - `tests/setupPolicy.ts:167` `POLICY_SUPPRESSION_PATTERN` — already `Matches …`, unchanged.
   - `tests/setupPolicy.ts:176` `POLICY_PORTABILITY_GLOB` — already `Matches …`, unchanged.
   - `tests/setupPolicy.ts:210` `POLICY_RESERVED_PATTERN` — already `Matches …`, unchanged.
   - `tests/setupPolicy.ts:213` `POLICY_SHELL_PATTERN` — already `Matches …`, unchanged.
5. `configs/policy.ts:51` — `/** The directory Oxlint resolves \`filename\` against. */` → `/** Names the directory Oxlint resolves \`filename\` against. */`.
6. `.agents/skills/enterprise-bootstrap/references/frontend-design.md:106` — `Keep a word only where it helps the reader understand the design, and therefore use the design.` → `Keep a word only where it helps the reader understand the design, and so use it.`
7. Inventory regenerated: `npm run build` (chains `build:inventory`), then a standalone `npm run build:inventory` re-run left `host.json` byte-identical.

## Criteria

1. `grep -n "Counts the artifacts the compiler itself\|Counts the planned paths a repair leaves" tests/setupServer.ts` — exit 1, no output. `grep -c "^ \* Matches" configs/policy.ts tests/setupPolicy.ts` — `configs/policy.ts:3`, `tests/setupPolicy.ts:2` (these count only the block-comment continuation lines beginning `^ \* Matches`; the single-line `/** Matches … */` sites at `configs/policy.ts:214,217` and `tests/setupPolicy.ts:135,136,144,166,209,212` do not match that anchored pattern but are confirmed above as `Matches`-opened by direct inspection).
2. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2` → `FILES 58 BLOCKS 662 FLAGGED 0 NODOC 35`. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -1` → `FILES 80 HITS 0`.
3. `npm run build` exit 0 (chains `build:inventory`, `build-inventory: staged 121 file(s) into host.json`). Standalone `npm run build:inventory` re-run exit 0; `sha256sum host.json` = `1bb189a79989fe90ba55e70d4e5cdde27b35241317d4d690c635f03e891d7ee5` before and after — unchanged.
4. `npm run format:check` exit 0 (`All matched files use the correct format.`). `npm run lint:check` exit 0. `npm run check` exit 0.
5. `npm run test:policy` exit 0 (77 passed). `npm run test:config` exit 0 (111 passed, 1 skipped). `npm run test:setup` exit 0 (74 passed). `npm run test:src:server` exit 0 (432 passed).

## Tree state

`git status --short` against `HEAD`:

```
 M .agents/orchestration.md
 M .agents/skills/enterprise-bootstrap/references/bootstrap-reference.md
 M .agents/skills/enterprise-bootstrap/references/frontend-design.md
 M .agents/skills/enterprise-bootstrap/references/utilities.md
 M .agents/skills/orkestrel-debrief/references/field-testing.md
 M .agents/skills/orkestrel-falsify/references/reconcile.md
 M .claude/rules/architecture.md
 M .claude/rules/quality.md
 M AGENTS.md
 M ROADMAP.md
 M configs/helpers.ts
 M configs/policy.ts
 M host.json
 M src/server/Materializer.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/core/templates.test.ts
```

`git diff --stat HEAD`:

```
 .agents/orchestration.md                           |  17 +-
 .../references/bootstrap-reference.md              |  32 ++--
 .../references/frontend-design.md                  |  12 +-
 .../enterprise-bootstrap/references/utilities.md   |   8 +-
 .../orkestrel-debrief/references/field-testing.md  |  10 +-
 .../orkestrel-falsify/references/reconcile.md      |   2 +-
 .claude/rules/architecture.md                      |   2 +-
 .claude/rules/quality.md                           |   2 +-
 AGENTS.md                                          |   4 +-
 ROADMAP.md                                         |  10 +-
 configs/helpers.ts                                 |  15 +-
 configs/policy.ts                                  | 172 ++++++++++----------
 host.json                                          |  26 +--
 src/server/Materializer.ts                         |   4 +-
 tests/setup.ts                                     |  74 ++++-----
 tests/setupPolicy.ts                               | 168 +++++++++++---------
 tests/setupServer.ts                               | 174 ++++++++++-----------
 tests/src/core/templates.test.ts                   |   4 +-
 18 files changed, 387 insertions(+), 349 deletions(-)
```

This diffstat carries D3-pre's uncommitted work plus this round's edits together, per HEAD.

## Corrections to D3-pre's report

- Five skill references moved in the inventory (D3-pre's report did not record this).
- `configs/helpers.ts` grew by 9 lines (D3-pre's report did not record this).

## Deviations

None. Every block named in the fix brief matched its quoted text exactly; no gate failed outside the owned files; the inventory regenerated cleanly.
