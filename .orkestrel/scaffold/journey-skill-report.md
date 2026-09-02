# Unit U4 journey-skill — report

## Files changed

| File                                                                | Lines | What it now holds                                                                                                      |
| ------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| `.agents/skills/orkestrel-prove-journey/SKILL.md`                   | 198   | Journey laws, refusal family, transport family, plus the families table, the `variant` run axis, and a pointer per reference |
| `.agents/skills/orkestrel-prove-journey/references/layer.md`        | 159   | The import contract, the corrected element law, the published resolver and voices, traversal, perception, cleanup      |
| `.agents/skills/orkestrel-prove-journey/references/captures.md`     | 99    | `createPortfolio` and `place` as the hook, what the package refuses, and the proofs the suite still owes                |
| `.agents/skills/orkestrel-prove-journey/references/statechart.md`   | 82    | The transition table, the runner, the harness contract, and the gate that drives it                                     |
| `.agents/skills/orkestrel-prove-journey/references/decide.md`       | 68    | The routing table, the `prove` limit, the rendered artifact, and the harness link                                       |
| `.agents/skills/orkestrel-prove-journey/references/styles.md`       | 87    | Resolved-value law, per-variant run, contrast and ring, class census, escapes, tokens                                   |
| `.agents/skills/orkestrel-prove-journey/agents/openai.yaml`         | 4     | `default_prompt` extended to the matrix and the statechart outcome                                                      |
| `.claude/skills/orkestrel-prove-journey/SKILL.md`                   | 10    | Frontmatter `description` re-copied byte-for-byte from the canonical line                                               |

`SKILL.md` names `references/layer.md`, `references/captures.md`, `references/styles.md`,
`references/statechart.md`, and `references/decide.md`. No file in `references/` is unnamed, which
`tests/policy.test.ts` § skill family policy proves.

## Gates

`npm run format:check`, bare tail:

```text
Checking formatting...

All matched files use the correct format.
Finished in 3637ms on 218 files using 16 threads.
```

`npm run test:policy`, bare tail:

```text
 Test Files  1 passed (1)
      Tests  111 passed (111)
   Start at  16:13:40
   Duration  2.05s (transform 261ms, setup 320ms, import 321ms, tests 1.25s, environment 0ms)
```

Baseline before the edits was the same 111 passing policy tests.

## Review evidence

`git diff --stat`:

```text
 .agents/skills/orkestrel-prove-journey/SKILL.md    | 108 +++++++++---
 .../orkestrel-prove-journey/agents/openai.yaml     |   2 +-
 .../orkestrel-prove-journey/references/captures.md |  93 +++++++----
 .../orkestrel-prove-journey/references/layer.md    | 184 ++++++++++++---------
 .claude/skills/orkestrel-prove-journey/SKILL.md    |   2 +-
 .orkestrel/scaffold/evaluation.md                  |   8 +
 6 files changed, 262 insertions(+), 135 deletions(-)
```

`git status --porcelain`:

```text
 M .agents/skills/orkestrel-prove-journey/SKILL.md
 M .agents/skills/orkestrel-prove-journey/agents/openai.yaml
 M .agents/skills/orkestrel-prove-journey/references/captures.md
 M .agents/skills/orkestrel-prove-journey/references/layer.md
 M .claude/skills/orkestrel-prove-journey/SKILL.md
 M .orkestrel/scaffold/evaluation.md
?? .agents/skills/orkestrel-prove-journey/references/decide.md
?? .agents/skills/orkestrel-prove-journey/references/statechart.md
?? .agents/skills/orkestrel-prove-journey/references/styles.md
?? .orkestrel/scaffold/journey-skill-brief.md
?? .orkestrel/scaffold/terrain-reference-tarball.txt
?? .orkestrel/scaffold/test-additions-gates.md
?? .orkestrel/scaffold/test-additions-successor-report.md
```

`.orkestrel/scaffold/evaluation.md` and the four untracked `.orkestrel/scaffold/*` files carried
those states before this unit started. This unit wrote nothing under `.orkestrel/`, `host.json`, or
`ROADMAP.md`.

## Every published name the skill cites

Each resolves to an export in the `test` checkout at `C:\Users\mikes\WebstormProjects\test`, located
by `grep -n "^export (async )?(function|const|interface|type) <name>\b" src/core/*.ts src/browser/*.ts`.

| Name                    | Verified in                    |
| ----------------------- | ------------------------------ |
| `StateTransition`       | `src/core/types.ts:204`        |
| `StateScenario`         | `src/core/types.ts:226`        |
| `executeScenario`       | `src/core/helpers.ts:447`      |
| `executeScenarios`      | `src/core/helpers.ts:483`      |
| `STATECHART_ATTRIBUTES` | `src/core/constants.ts:20`     |
| `STATECHART_STATUSES`   | `src/core/constants.ts:47`     |
| `ACCESSIBLE_ROLES`      | `src/browser/constants.ts:11`  |
| `CANVAS_COLOR`          | `src/browser/constants.ts:38`  |
| `FOCUSABLE_SELECTOR`    | `src/browser/constants.ts:105` |
| `CaptureVariant`        | `src/browser/types.ts:42`      |
| `PortfolioOptions`      | `src/browser/types.ts:57`      |
| `isReachable`           | `src/browser/helpers.ts:57`    |
| `isRendered`            | `src/browser/helpers.ts:96`    |
| `resolveRendered`       | `src/browser/helpers.ts:123`   |
| `resolveAccessible`     | `src/browser/helpers.ts:164`   |
| `clickAccessible`       | `src/browser/helpers.ts:207`   |
| `clickAccessibleWithin` | `src/browser/helpers.ts:245`   |
| `clickDisclosure`       | `src/browser/helpers.ts:291`   |
| `typeAccessible`        | `src/browser/helpers.ts:319`   |
| `fillAccessible`        | `src/browser/helpers.ts:342`   |
| `pressKeys`             | `src/browser/helpers.ts:357`   |
| `traverseAccessible`    | `src/browser/helpers.ts:373`   |
| `readPerception`        | `src/browser/helpers.ts:418`   |
| `readPage`              | `src/browser/helpers.ts:461`   |
| `readFocus`             | `src/browser/helpers.ts:478`   |
| `readValue`             | `src/browser/helpers.ts:500`   |
| `readText`              | `src/browser/helpers.ts:529`   |
| `readRole`              | `src/browser/helpers.ts:559`   |
| `readName`              | `src/browser/helpers.ts:603`   |
| `readStates`            | `src/browser/helpers.ts:661`   |
| `describeTree`          | `src/browser/helpers.ts:723`   |
| `describeFocus`         | `src/browser/helpers.ts:772`   |
| `waitForFrame`          | `src/browser/helpers.ts:804`   |
| `build`                 | `src/browser/helpers.ts:828`   |
| `mount`                 | `src/browser/helpers.ts:868`   |
| `render`                | `src/browser/helpers.ts:898`   |
| `typeInput`             | `src/browser/helpers.ts:940`   |
| `commitInput`           | `src/browser/helpers.ts:961`   |
| `clearStorage`          | `src/browser/helpers.ts:979`   |
| `removeDatabase`        | `src/browser/helpers.ts:1005`  |
| `rgba`                  | `src/browser/helpers.ts:1092`  |
| `colorEqual`            | `src/browser/helpers.ts:1128`  |
| `blendColor`            | `src/browser/helpers.ts:1155`  |
| `measureLuminance`      | `src/browser/helpers.ts:1177`  |
| `measureContrast`       | `src/browser/helpers.ts:1202`  |
| `readLayers`            | `src/browser/helpers.ts:1231`  |
| `readBackdrop`          | `src/browser/helpers.ts:1266`  |
| `contrast`              | `src/browser/helpers.ts:1307`  |
| `readRing`              | `src/browser/helpers.ts:1363`  |
| `readCascade`           | `src/browser/helpers.ts:1409`  |
| `readClasses`           | `src/browser/helpers.ts:1442`  |
| `findRule`              | `src/browser/helpers.ts:1516`  |
| `readRows`              | `src/browser/helpers.ts:1564`  |
| `extractOrphans`        | `src/browser/helpers.ts:1601`  |
| `extractStyles`         | `src/browser/helpers.ts:1632`  |
| `style`                 | `src/browser/helpers.ts:1660`  |
| `token`                 | `src/browser/helpers.ts:1688`  |
| `rootToken`             | `src/browser/helpers.ts:1709`  |
| `pixels`                | `src/browser/helpers.ts:1736`  |
| `captureFrame`          | `src/browser/helpers.ts:1858`  |
| `expandCaptures`        | `src/browser/helpers.ts:1903`  |
| `createPointerEvent`    | `src/browser/factories.ts:31`  |
| `createDragEvent`       | `src/browser/factories.ts:68`  |
| `createPortfolio`       | `src/browser/factories.ts:106` |
| `createJournal`         | `src/browser/factories.ts:207` |

Members cited on those exports, each read in the same files:

| Member                                                          | Owner                                        |
| --------------------------------------------------------------- | -------------------------------------------- |
| `place`, `files`, `paths`, `states`, `variant`                  | `PortfolioInterface`, `src/browser/types.ts:77` |
| `states`, `variants`, `variant`, `directory`, `enabled`         | `PortfolioOptions`, `src/browser/types.ts:57`   |
| `name`, `width`, `height`, `apply`                              | `CaptureVariant`, `src/browser/types.ts:42`     |
| `name`, `from`, `event`, `to`                                   | `StateTransition`, `src/core/types.ts:204`      |
| `transition`, `arrange`, `act`, `assert`                        | `StateScenario`, `src/core/types.ts:226`        |
| `steps`, `output`                                               | `JournalInterface`, `src/browser/types.ts:118`  |
| `status`, `passed`, `failed`, `total`, `scenario`, `result`, `state` | `STATECHART_ATTRIBUTES`, `src/core/constants.ts:20` |
| `pending`, `idle`, `running`, `passed`, `failed`                | `STATECHART_STATUSES`, `src/core/constants.ts:47` |
| `floor`, `worn`, `root`                                         | Parameters of `contrast`, `readRing`, and `readClasses` / `extractStyles` |

No name from the previous skill that the package does not publish survives. `capture(state)`,
`runScenario`, `runScenarios`, `readOrigin`, and `extractEscapes` appear nowhere in the skill.

## Shared files

No patch is required for either shared file.

- `.agents/skills/orkestrel-polish-surface/references/capture-harness.md`: this unit makes no
  sentence there false. The journey run already generated the portfolio before this unit, and
  `SKILL.md` still routes portfolio review to that campaign unchanged. The reconciliation's
  question 7 — fold the spawned harness into the journey run — is unanswered by the user, so this
  unit asserted no fold and the harness's scope sentence still holds.
- `.agents/skills/enterprise-bootstrap/**`: `references/inspection.md` already states the property,
  population, reading, control, and coverage for every instrument `styles.md` supplies a reading
  for. `styles.md` links to it and restates none of it.

## Unknowns answered

The brief's ruling holds: no published computed-style matrix helper is needed. Every rule in
`styles.md` reads one property at a time through `style`, `pixels`, `token`, `rootToken`, `contrast`,
or `readRing`, and the matrix family is the suite's loop over the declared variants. No rule written
here is unfollowable without a matrix helper.

## Decisions recorded, not escalated

Each is ancillary under the deviation contract.

- **Attribute placement.** The brief says the `STATECHART_ATTRIBUTES` sit "on the stage element".
  The published constant's own documentation at `src/core/constants.ts:20` places `status`,
  `passed`, `failed`, and `total` on the harness root, `scenario` and `result` on each row, and
  `state` on the element rendering the entity's current state. `statechart.md` states the published
  placement, because the gate finds the harness by `status` and reads the tally from the same
  element.
- **Deduplication for criterion 5.** `SKILL.md` § Prove the styles, § Prove the statechart, and
  § Route the question are pointers carrying no rule of their own. `captures.md` § Variants points
  at `SKILL.md` → Read the variant once for the run axis and at `styles.md` → Run per variant for
  the `apply` attribute rule, so the axis, the never-split rule, and the `data-bs-theme` rule each
  have one home.
- **Frontmatter.** The `description` gained the styles, statechart, and routing triggers, because a
  model matching on "prove the resolved styles in dark" or "drive the transition table" matched
  nothing in the previous line. `.claude/skills/orkestrel-prove-journey/SKILL.md` line 3 was
  regenerated from the canonical line by copy, so the strings are identical. `default_prompt` gained
  the same scope and keeps the complete `$orkestrel-prove-journey` token.

## Vocabulary sweep

Pattern `\b(should|simply|just|easy|easier|currently|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|sanity check|dummy|blacklist|whitelist|we |our |let's|please|ensure|guarantee|above|below|new |latest)\b`, case-insensitive, over
`.agents/skills/orkestrel-prove-journey/SKILL.md`,
`.agents/skills/orkestrel-prove-journey/references/*.md`, and
`.claude/skills/orkestrel-prove-journey/SKILL.md`. Hits, each in a permitted sense:

- `SKILL.md` → Derive journeys from intents, "the new sentence is present": `new` names a value, the
  sentence that replaced another, rather than dating anything.
- `layer.md` → Input and traversal, "a cap above the cycle": `above` is a magnitude, not a pointer to
  other material.

Pattern `\b(once|since|both|two|three|four|five|several)\b` over the same paths. Every `once` is
numeric ("one time"); the temporal `once` at `layer.md` → Input and traversal was rewritten to
`after`. `two` at `statechart.md` was rewritten out. `both` survives only where the sentence names
its members, at `statechart.md` → Build the harness a person watches and `styles.md` → Tokens.

## Claims not closed

None. Every acceptance criterion in the brief has evidence in this report.
