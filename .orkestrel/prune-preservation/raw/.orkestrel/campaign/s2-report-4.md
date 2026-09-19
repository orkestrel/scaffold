# Unit S2-4 — report

Every item closed as prescribed. No prescription was departed from. Owned files touched:
`tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `guides/scaffold.md`.
`.claude/rules/documentation.md` and `tests/policy.test.ts` needed no edit: item 8 keeps the
obligation where it already sits, and item 5's control is data the existing loop drives.

Diffstat against the checkpoint `beb88af9`:

```text
 guides/scaffold.md        |  26 ++-
 tests/setupPolicy.test.ts | 204 +++++++++++++++++++---
 tests/setupPolicy.ts      | 425 ++++++++++++++++++++++++++++++++++++----------
 3 files changed, 536 insertions(+), 119 deletions(-)
```

`git status --short` shows those three modified files and the Orchestrator's untracked
`.orkestrel/campaign/`.

## The items

### Item 1 — unparseable fence

`inspectSkillImports` reads `source.errors` before walking the body. A fence whose first error is
present and whose text contains `@orkestrel/` reports
`skill fence could not be parsed: <first error message>` against the skill file and skips that
fence; a refused fence naming no `@orkestrel/` specifier is walked as before. The reader's TSDoc and
the guide passage both state it.

Controls: `rejects a skill fence the parser cannot read beside an Orkestrel import`
(`SKILL_POLICY_CONTROLS`, asserted as exactly one `skill` violation) and, in the setup project,
`inspectSkillImports > refuses a fence the parser cannot read beside an Orkestrel import` and
`inspectSkillImports > leaves a fence the parser cannot read outside the check when it names no
Orkestrel import`.

The control pins no parser prose. The message text is pinned once, in the non-vendored
`tests/setupPolicy.test.ts`, so an Oxc message change reddens this checkout rather than every
target.

### Item 2 — the workspace's own package

`readSkillExports` reads `<root>/package.json` through the new exported `readSkillManifest` helper
before the `node_modules` lookup. When that manifest's `name` equals the specifier's package
segment, the exports map resolves against `<root>`. Everything after is unchanged.

Controls: `accepts a fenced import of the package the inspected workspace itself publishes`
(policy), `readSkillExports > resolves the package this workspace publishes through its own
manifest` and `inspectSkillImports > accepts a named import of the package this workspace publishes`
(setup). The reader proof asserts `outcome` is `read` and that the inventory contains
`BASE_DEV_DEPENDENCIES` and `HOST_PATHS`, so it discriminates a resolution that happened from an
empty violation list.

### Item 3 — named re-export through a cycle

`readSkillDeclarations` now walks the statements in two passes. The first collects what the file
declares itself and refuses a local form; the cycle check follows it, so a file the branch already
visited returns `{ outcome: 'cycle', names: <its own declarations> }`. The second pass resolves
re-exports: a named re-export checks membership against those names, and a star re-export of a
visited file contributes nothing, because the frame still reading that file contributes them. The
rule is recorded in the reader's TSDoc.

Controls: `readSkillDeclarations > resolves a name re-exported through a cycle against what the
visited file declares` (the reproduction's fixture, `['ALIAS', 'VALUE']`), `refuses a name
re-exported through a cycle that the visited file does not declare`, and `reads a star re-export
cycle without looping or dropping a declared name`. The pre-existing star-cycle fixture in `reads
declaration forms and relative value and type re-exports` is unchanged and still returns the same
inventory.

### Item 4 — distinct messages

The reader returns `SkillDeclarationResult` — `outcome`, `names`, optional `detail` — instead of
`undefined` for every cause. `SkillDeclarationRefusal` names the axis that varies: `entry`, `form`,
`name`, `package`, `specifier`, `syntax`, `target`. `SKILL_DECLARATION_MESSAGES` maps each to its
sentence, and `inspectSkillImports` composes `skill fence import <specifier> <sentence> <detail>`:

| Outcome     | Message                                                  |
| ----------- | -------------------------------------------------------- |
| `specifier` | `is not a supported package entry specifier`             |
| `package`   | `has no installed package`                               |
| `entry`     | `has no declaration entry for <key>`                     |
| `target`    | `has no declaration file at <file>`                      |
| `syntax`    | `has a declaration syntax error: <parser message>`       |
| `form`      | `has an unsupported declaration form: <form>`            |
| `name`      | `re-exports a name its target does not declare: <name>`  |

Controls: the `SKILL_REFUSAL_CASES` matrix in `tests/setupPolicy.ts` plants one package per
deterministic cause, and the setup project drives each as `inspectSkillImports > names the refusal
cause: <label>` — the entry segment outside the grammar, the package the workspace does not hold,
the exports key the map does not declare, the wildcard exports key, the declaration target the
package does not hold, the declaration form the reader refuses, and the re-exported name the target
does not declare. The parser-message cause is `inspectSkillImports > names the parser message a
declaration file raised`, kept out of the vendored matrix for the reason item 1 gives.

The guide's refusal list now names the unresolvable relative target, the re-exported name the target
lacks, the syntax error, and the wildcard exports key.

### Item 5 — a control the sweep's absence would redden

`accepts exported value and type bindings from root and browser entries` is kept as the
false-positive guard. Beside it, `reports one absent binding beside exported bindings in the same
fence` carries the identical fence with `waitForCondition` replaced by `s2MissingValue` and asserts
exactly that violation. The red was recorded by disabling the sweep's call site in `inspectSkill`,
not by mutating the reader.

### Item 6 — the refusal inventory

`SKILL_DECLARATION_REFUSALS` gains `'export declare namespace Vocabulary { }'` and
`'export declare const value: string\nexport { value as default }'`. `FunctionDeclaration` is gone
from the read union: a declaration file carrying a function body is refused earlier, by the parser
(`An implementation cannot be declared in ambient contexts.`, measured through `parseSync` on a
`.d.ts` name), so that union member was unreachable. The constant's TSDoc reads `Enumerates the
refusals a declaration file can carry, each written as the form that raises it.` The refusal loop
asserts the outcome is one `SKILL_DECLARATION_MESSAGES` names and that the inventory is empty.

### Item 7 — the code point

U+96EA is restored in both operands, written through the editor tool. The strongest available proof
is that `git diff 4c4edd93 -- tests/setupPolicy.test.ts` no longer shows the line at all: it is
byte-identical to the release baseline.

```text
$ node tmp/probe/s2-4-codepoints.mjs tmp/probe/s2-4-full.diff
tests/setupPolicy.test.ts:781: U+96EA 雪
tests/setupPolicy.test.ts:782: U+96EA 雪
diff removed lines carrying a code point above 0x7F: 0
removed lines whose code points no added line carries: 0
```

The sweep reads the whole `git diff 4c4edd93` (every file, not only the owned set) and finds no
removed line carrying a code point above 0x7F. The neighbour proof `normalizePolicyPath > changes
separators without resolving segments or decoding percent text` passes.

### Item 8 — one home for the obligation

The guide passage and the `inspectSkillImports` TSDoc now describe what the sweep reads and refuses.
`Every taught symbol belongs in a named import fence`, `Every symbol a skill teaches must appear in a
named import fence`, and `Targets need not install packages outside that base set` are deleted from
those sites. `.claude/rules/documentation.md` keeps both sentences unchanged.

```text
$ git grep -n -e "taught symbol" -e "symbol a skill teaches" -e "named import fence" \
    -e "Import only packages in" -e "need not install" -- ':!node_modules' ':!.orkestrel' ':!tmp'
.claude/rules/documentation.md:94: ...
.claude/rules/documentation.md:95: ...
```

The rule file is the only match.

## Mutation probes

Each probe disabled one load-bearing line, ran the scoped project, and was reverted through the
editor. Setup totals read 159 collected during the probes and 160 after the later
`readSkillManifest` case was added.

| Item | Mutation | Command | Reading |
| ---- | -------- | ------- | ------- |
| 1 | `if (false && failure !== undefined && …)` in `inspectSkillImports` | `npm run test:policy` | 1 failed \| 109 passed (110); the failure is `rejects a skill fence the parser cannot read beside an Orkestrel import` |
| 2 | `const owned = false && isPolicyRecord(own) && …` | `npm run test:policy`; `npm run test:setup` | policy 1 failed \| 109 passed (110) on `accepts a fenced import of the package the inspected workspace itself publishes`; setup 2 failed \| 154 passed \| 3 skipped (159) on the two workspace-package cases |
| 3 | cycle branch returns `names: []` | `npm run test:setup` | 1 failed \| 155 passed \| 3 skipped (159) on `resolves a name re-exported through a cycle against what the visited file declares` |
| 4 | `readSkillExports` returns `package` where it returns `entry` | `npm run test:setup` | 5 failed \| 151 passed \| 3 skipped (159): the two entry-cause cases, the wildcard case, and the two exports-map reader cases |
| 5 | `inspectSkillImports` call site deleted from `inspectSkill` | `npm run test:policy` | 5 failed \| 105 passed (110); `reports one absent binding beside exported bindings in the same fence` is among them, while `accepts exported value and type bindings from root and browser entries` stays green — the defect item 5 names |
| 6 | `default export list` refusal deleted; `exported namespace` refusal replaced by `continue` | `npm run test:setup` | 2 failed \| 154 passed \| 3 skipped (159): the two refusal fixtures this item added |

After every revert, `npm run test:policy` reported 110 passed and `npm run test:setup` reported
156 passed | 3 skipped at that point in the unit.

## Gates

Acceptance criteria, each run after the final edit:

| Command | Exit | Totals |
| ------- | ---- | ------ |
| `npm run format:check` | 0 | `All matched files use the correct format` over 227 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root project plus the three scoped `src` projects |
| `npm run test:setup` | 0 | 157 passed \| 3 skipped (160) |
| `npm run test:policy` | 0 | 110 passed (110) |
| `npm run test:guides` | 0 | 23 passed (23) |

Baselines from the brief: policy 107, setup 139 (3 skipped), guides 23. `requires every discovered
skill file, metadata token, and reference` — the real skill family — passes inside the policy run.

Observations, not criteria:

| Command | Exit | Reading |
| ------- | ---- | ------- |
| `npm run test:config` | 1 | 1 failed \| 172 passed \| 1 skipped (174); the failure is `keeps the committed host inventory aligned with the vendored checkout bytes`, the standing condition |
| `npm run test:src:core` | 0 | 421 passed (421) |
| `npm run test:src:bin` | 1 | 5 failed \| 252 passed (257); every failure is `ScaffoldError: The vendored host cannot read the declared file at guides/scaffold.md` |
| `npm run test:src:server` | 1 | 2 failed \| 464 passed \| 7 skipped (473); one is the same `readHostFloor` digest read, the other is the finding recorded next |

`readHostFloor` run from source compares the committed `host.json` digests against the working tree,
so editing a vendored or hosted file reddens it until the Orchestrator rebuilds:

```text
$ node tmp/probe/s2-4-digests.mjs
guides/scaffold.md: stale in host.json
tests/policy.test.ts: matches in host.json
tests/setupPolicy.ts: stale in host.json
```

## Finding outside the items — report only, off-limits file

`tests/src/server/helpers.test.ts > vendored imports > imports only Orkestrel packages every
workspace declares from each vendored module` fails at the checkpoint `beb88af9`, before this unit,
and still fails. Its reader is a text regex,
`/\b(?:from|import|require)\s*\(?\s*(['"`])(@orkestrel\/[^'"`]+)\1/gu`, run over the whole file, so
it matches a specifier written inside a string literal. The S2 round-3 control
`rejects a fenced package outside the base dependency set` carries the fixture text
`import { isString } from "@orkestrel/contract"` inside a TypeScript string, and the proof reports
`tests/setupPolicy.ts: @orkestrel/contract` as an undeclared vendored import that does not exist.

Reproduction against the checkpoint bytes, with no checkout:

```text
$ git show beb88af9:tests/setupPolicy.ts > tmp/probe/baseline-setupPolicy.ts
$ node tmp/probe/s2-4-vendored.mjs tmp/probe/baseline-setupPolicy.ts
tmp/probe/baseline-setupPolicy.ts: [...,"@orkestrel/contract","@orkestrel/test/browser"]
```

The same probe over the current file extracts the same `@orkestrel/contract`, plus
`@orkestrel/test` and `@orkestrel/scaffold` from this unit's fixtures, which are declared and
therefore add no violation. This unit's edits do not change the failure.

`tests/src/server/helpers.test.ts` is off-limits, so no edit was made. The defect is in the
instrument rather than in the vendored module: a claim about imports needs the parser the workspace
already uses. The direction I would take is to read specifiers from `parseSync(path, content)` —
the `source.value` of each `ImportDeclaration`, `ExportAllDeclaration`, and `ExportNamedDeclaration`,
plus the literal argument of each dynamic `import()` call — and to keep the existing controls, which
that reading still discriminates. I did not write it, because the controls in that file are drawn to
the regex's shape and re-drawing them is a decision the Orchestrator owns.

## Claims I flag as least certain

1. **The pinned Oxc message.** Two setup-project cases assert `Unexpected token` verbatim. It is
   today's Oxc text, measured on vite 4.1.11. The vendored control avoids it, so a parser message
   change reddens this checkout alone — but it does redden it.
2. **What `SKILL_DECLARATION_REFUSALS` enumerates.** Four refusal branches have no fixture:
   `destructured declaration`, `anonymous declaration`, `unsupported exported declaration`, and
   `untyped re-export target`. I believe the first three are unreachable from declaration syntax the
   parser accepts, and I did not prove it. The fourth — a relative re-export with no declaration
   extension, such as `export * from './values'` — is reachable, and item 6 named neither, so I
   added neither.
3. **The star-cycle branch.** Every entry point I could construct makes "a star re-export of a
   visited file contributes nothing" observationally equal to "it contributes that file's own
   declarations", because the frame still reading the file adds them. The test pins the outcome; the
   branch itself is pinned by reading, not by a discriminating case.
4. **A manifest holding invalid JSON.** `readSkillManifest` throws `SyntaxError` rather than
   reporting the `package` outcome. That matches the baseline behaviour and the prescription's
   `has no installed package` sentence covers an absent package and a manifest that is not a record,
   so I left the throw in place.
5. **The stale-inventory failures.** I cannot run `npm run build`, so I have not seen
   `test:config`, `test:src:bin`, and the `readHostFloor` case in `test:src:server` return green
   after the rebuild. The digest probe is the evidence for the cause, not for the recovery.

## Instruments left in place

Under `tmp/probe/`, for retention or sweep: `s2-4-codepoints.mjs` (the code-point dump and diff
sweep), `s2-4-digests.mjs` (the host inventory comparison), `s2-4-vendored.mjs` (the vendored-import
regex reproduction), `s2-4-shapes.test.ts` (the Oxc AST and error-text probe), and the captured
`s2-4.diff`, `s2-4-full.diff`, and `baseline-setupPolicy.ts` inputs. No gate collects any of them.
