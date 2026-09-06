# Report — U2 policy-plugin (scaffold)

`implementer`, Claude Opus 5, native Claude Code subagent. Sole writer in `/home/user/scaffold`.

## Outcome

The vendored policy sweep names no compiler. Every syntax-shaped rule runs in the `policy` Oxlint
plugin, each with a `RuleTester` pair. Every acceptance criterion passes except the `test:config`
host-inventory case, which reddens because `host.json` digests the five files this unit edits and
`host.json` is off-limits. That case closes when `npm run build` regenerates the inventory, which
§ What is fixed assigns elsewhere.

## Rules moved: sweep reader → plugin rule id

| Sweep reader | Plugin rule | Message ids |
| --- | --- | --- |
| `inspectPolicySource` export branch | `policy/no-hidden-declaration` | `hidden` |
| `inspectPolicySource` type branch | `policy/no-misplaced-type` | `type` |
| `inspectPolicySource` class branch | `policy/no-misplaced-class` | `class` |
| `inspectPolicyVariables` data branch | `policy/no-misplaced-data` | `data` |
| `inspectPolicySource` function branch, `inspectPolicyVariables` function branch, `hasModulePolicyFunction`, `nestsPolicyFunction`, `hasNestedPolicyFunction` | `policy/no-misplaced-function` | `function` |
| `inspectPolicyConstants` | `policy/no-malformed-constant` | `mutable`, `naming`, `collection` |
| `inspectPolicyFunctionName` parse branch | `policy/no-misnamed-parser` | `parser` |
| `inspectPolicyFunctionName` create branch | `policy/no-misnamed-factory` | `factory` |
| `inspectFunctionDomain`, `isFunctionDomainPath`, the domain-name statement | `policy/no-malformed-domain` | `module`, `file` |
| `matchesPolicySplit`, `matchesPolicyTerminator`, `importsPolicyTerminator`, `inspectPolicyEndingNode` | `policy/no-host-line-endings` | `split`, `terminator` |

`policy/no-mocking`, `policy/no-keyword-privacy`, and `policy/no-nested-functions` are unchanged
apart from `reportMocking` now reading a computed member through the shared
`expressionToPolicyText` helper.

## Rules kept in the sweep

The suppression rule (`inspectPolicySuppressions`), the lint-wiring reading
(`inspectPolicyConfiguration`), the rule-map parity (`inspectPolicyRuleMap`), the path population
(`inspectPolicyFilenames`, `inspectPolicyFilenamePaths`, `readPolicyPaths`), the manifest-script
rule (`inspectPolicyScripts`), the mirrored-test rules (`inspectPolicyMirrors`,
`inspectPolicyMirrorPaths`, `testToPolicyStem`, `stemToPolicyCandidates`), and the skill and bridge
families. `PolicyRule` now reads
`'bridge' | 'mirror' | 'portability' | 'rules' | 'skill' | 'suppression'`, and
`createPolicyViolation` lost its syntax-node parameter with the `line` it derived.

## The registers' new home

`CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`,
`FUNCTION_DOMAIN_FOLDERS`, and `POLICY_AMBIENT_SUFFIXES` live in `configs/policy.ts` alone, beside
`FUNCTION_DOMAIN_NAMES`, `POLICY_SOURCE_EXTENSIONS`, `POLICY_PLACEMENT_GLOBS`,
`POLICY_ENDING_GLOBS`, `POLICY_CLASS_PATTERN`, `POLICY_CONSTANT_PATTERN`, and
`POLICY_DOMAIN_PATTERN`.

`tests/setupPolicy.ts` imports none of them, and that is a decision to check. After the move no
sweep rule reads a register: `readPolicySources` was the only reader of
`POLICY_AMBIENT_SUFFIXES`, and `isFunctionDomainPath` and `inspectPolicySource` were the only
readers of the file registers. The brief's sentence qualifies itself — "Where a sweep rule and a
plugin rule both read a register, they read the same export" — and no such sweep rule remains, so
an import there would be an unused binding that `@typescript-eslint/no-unused-vars` refuses.
`tests/config.test.ts` reads the registers from `../configs/policy.js`, which is where the register
assertion moved.

## The `.oxlintrc.json` populations

Two override entries were added after the `policy/no-nested-functions` entry:

- `["app/**/*.{cts,mts,ts,tsx}", "src/**/*.{cts,mts,ts,tsx}"]` enables `policy/no-hidden-declaration`,
  `policy/no-misplaced-type`, `policy/no-misplaced-class`, `policy/no-misplaced-data`,
  `policy/no-misplaced-function`, `policy/no-malformed-constant`, `policy/no-misnamed-parser`,
  `policy/no-misnamed-factory`, and `policy/no-malformed-domain`. The extension set is
  `POLICY_SOURCE_EXTENSIONS`, which is what the deleted `POLICY_SOURCE_GLOB` named.
- `["app/**/*.ts", "configs/**/*.ts", "src/**/*.ts"]` enables `policy/no-host-line-endings`, which
  is what the deleted `POLICY_PORTABILITY_SOURCE_GLOB` named.

Ambient declaration files stay outside every rule through `isPolicyAmbient`, which every report
function calls first, rather than through a glob negation. `.oxlintrc.json` files globs match
`env.d.ts`, so the exclusion has to sit in the rule.

No restricted-import row for `typescript` was added; the brief assigns that row to U6.

## `RuleTester` pairs in `tests/config.test.ts`

Every pair sits under `describe('policy plugin')` with the existing
`languageOptions: { parserOptions: { lang: 'ts' } }` tester, and every case carries the `filename`
suffix its rule keys on. Filenames are drawn from `src/worker`, `src/mobile`, `app/edge`,
`app/desktop`, and `app/browser/composables`, so no case depends on an environment name this
workspace has.

`no-hidden-declaration` — invalid: "rejects a hidden helper", "rejects a hidden constant"; valid:
"accepts an exported centralized declaration", "accepts a hidden declaration outside a centralized
file".

`no-misplaced-type` — invalid: "rejects an interface beside helpers", "rejects a type alias in an
environment module"; valid: "accepts an interface in types.ts", "accepts an interface in an ambient
declaration file", "accepts an interface in an ambient module declaration file", "accepts an
interface in an ambient CommonJS declaration file".

`no-misplaced-class` — invalid: "rejects a class that differs from its file", "rejects a class in a
camelCase file"; valid: "accepts a class in the file named for it", "accepts an error class in
errors.ts".

`no-misplaced-data` — invalid: "rejects data beside handlers", "rejects data in an implementation
file"; valid: "accepts module data in constants.ts", "accepts a helper namespace in helpers.ts".

`no-misplaced-function` — invalid: "rejects a function module in an unregistered folder", "rejects a
property-held arrow in a route table", "rejects a callback parameter default function", "rejects an
assignment inside a direct callback", "rejects a destructured callback parameter default function",
"rejects an assignment inside callback control flow", "rejects a declaration inside a direct
callback", "rejects an assignment two direct callbacks down"; valid: "accepts a function in a
function-kind file", "accepts a module in a registered function domain", "accepts a callback passed
directly as an argument", "accepts a function returned directly through a concise body", "accepts
functions returned directly through callback control flow", "accepts a function returned by a return
statement inside a callback", "accepts a method of a top-level class".

`no-malformed-constant` — invalid: "rejects a mutable constant", "rejects a lower-case constant",
"rejects a bare collection constant"; valid: "accepts a frozen upper-case constant", "accepts a
lower-case binding outside constants.ts".

`no-misnamed-parser` — invalid: "rejects an unprefixed coercer", "rejects an unprefixed assigned
coercer"; valid: "accepts a parse-prefixed coercer", "accepts an unprefixed function outside
parsers.ts".

`no-misnamed-factory` — invalid: "rejects an unprefixed factory", "rejects an unprefixed assigned
factory"; valid: "accepts a create-prefixed factory", "accepts an unprefixed function outside
factories.ts".

`no-malformed-domain` — invalid: "rejects a module whose function differs from its file", "rejects a
hidden domain function", "rejects a file named for a registered domain"; valid: "accepts a
registered function module carrying imports and one named export", "accepts a module outside every
registered domain".

`no-host-line-endings` — invalid: "rejects a payload trimmed before it is split", "rejects a
templated line-feed split", "rejects a read of the host line ending", "rejects an EOL import from
the host module"; valid: "accepts a split on the line-ending pattern", "accepts a locally declared
line-ending constant", "accepts a namespace import that reads no line ending".

Two further cases were added to the same block:

- "registers handlers as a function kind and routes as a data kind" reads the registers from
  `../configs/policy.js`, replacing the sweep's deleted register case.
- "enables every plugin rule over the population its law names" reads `.oxlintrc.json`, asserts that
  every rule id the plugin's default export declares is enabled somewhere in that file, and asserts
  that the file declares an override whose `files` list is `POLICY_PLACEMENT_GLOBS` and one whose
  list is `POLICY_ENDING_GLOBS`. A rule the configuration never enables reddens here.

## The unknown the brief named

Every `POLICY_CONTROLS` row of a moved rule maps one-to-one onto a `RuleTester` case except the
population rows, which no `RuleTester` case can carry because the population is `.oxlintrc.json`'s
`files` list rather than anything a rule reads.

Rows that mapped to a `RuleTester` invalid case: "rejects a type outside types.ts", "rejects a type
in a non-ambient env module", "rejects an inline function in routes.ts", "rejects data in
handlers.ts", "rejects a hidden centralized declaration", "rejects a class that differs from its
file", "rejects mutable constants", "rejects lower-case constants", "rejects bare collection
constants", "rejects a parser without the parse prefix", "rejects a factory without the create
prefix", "rejects a malformed registered function module", "rejects a file named for a function
domain", "rejects a function in an unregistered domain", "rejects a callback parameter default
function", "rejects a destructured callback parameter default function", "rejects an assignment
inside callback control flow", "rejects an assignment inside a direct callback", "rejects a
declaration inside a direct callback", "rejects an assignment two direct callbacks down", and the
three moved `PORTABILITY_POLICY_CONTROLS` rows.

"rejects a property-held arrow in constants.ts" and "rejects an inline function in routes.ts" both
attack the same boundary — module function syntax whose file is absent from the function register —
and collapse into "rejects a property-held arrow in a route table", whose fixture is the object
inside the frozen array.

Accept-side rows that mapped to a `RuleTester` valid case: the three ambient-declaration exclusions,
"accepts a direct callback argument in constants.ts", "accepts a helper namespace in helpers.ts",
"accepts a concise-body direct return in constants.ts", "accepts a returned function inside a direct
callback", "accepts directly returned functions through callback control flow",
`PORTABILITY_POLICY_LOCAL`, and `PORTABILITY_POLICY_SPLIT`.

Rows that needed a different shape:

- `PORTABILITY_POLICY_EXCLUSION` ("excludes a script module from the parsed source axes") moved into
  the real-binary case, which writes `scripts/read.ts` carrying the same trimmed split and asserts
  the diagnostics carry no `policy(no-host-line-endings) scripts/read.ts`.
- "excludes Vue text from the placement population" moved into "enables every plugin rule over the
  population its law names", where `POLICY_PLACEMENT_GLOBS` names `cts`, `mts`, `ts`, and `tsx` and
  no other extension.
- `GENERIC_POLICY_SOURCES` ("accepts a differently shaped workspace without a core environment") has
  no single-case equivalent; its property is carried by drawing every case filename from
  environments this workspace does not have. The constant and its sweep case are deleted.

## The real-binary case

`it('loads every configured policy rule through the real binary')` now writes a fixture per
filename-keyed law, lints `src/violations`, `app`, and `scripts` in the scratch workspace through
oxlint's own Node entry, and asserts each expected `code` and file pair. It reads the diagnostic's
`filename` beside its `code`, so a diagnostic reported against the wrong file no longer satisfies
it. The clean fixture moved from `src/clean/fixture.ts` to `src/clean/CleanMember.ts`, because
`policy/no-misplaced-class` refuses a class in a file not named for it and the old path would have
made the clean run red for a real reason.

## Commands and readings, 2026-09-06

```
grep -n "from 'typescript'\|require('typescript')" tests/setupPolicy.ts configs/policy.ts   exit 1, no output
grep -n '^import' configs/policy.ts                                                          exit 1, no output
grep -rn "export const CENTRAL_SOURCE_FILES" tests configs   configs/policy.ts:99  (one definition)
grep -rn "export const FUNCTION_SOURCE_FILES" tests configs  configs/policy.ts:124 (one definition)
grep -rn "export const DATA_SOURCE_FILES" tests configs      configs/policy.ts:143 (one definition)
grep -rn "export const DATA_EXEMPT_FILES" tests configs      configs/policy.ts:159 (one definition)
grep -rn "export const FUNCTION_DOMAIN_FOLDERS" tests configs configs/policy.ts:162 (one definition)
grep -rn "export const POLICY_AMBIENT_SUFFIXES" tests configs configs/policy.ts:173 (one definition)
npx oxfmt --config .oxfmtrc.json --check .oxlintrc.json configs/policy.ts tests/setupPolicy.ts tests/policy.test.ts tests/config.test.ts
                                                             exit 0  "All matched files use the correct format."
npm run lint:check                                           exit 0
npm run test:policy                                          exit 0  "Test Files 1 passed (1) / Tests 73 passed (73)"
npm run test:config                                          exit 1  "Tests 1 failed | 105 passed (106)"
npm run check                                                exit 0
```

The `grep -n 'CENTRAL_SOURCE_FILES\s*=' tests configs` form the brief names prints nothing under GNU
grep's basic expressions, because `\s` is not a basic-expression class there. The `export const`
form printed above answers the same question.

`npm run test:config` fails on one case:

```
FAIL  |config| tests/config.test.ts > root configuration > keeps the committed host inventory aligned with the vendored checkout bytes
Error: The committed host inventory is stale at .oxlintrc.json, configs/policy.ts, tests/config.test.ts, tests/policy.test.ts, tests/setupPolicy.ts
```

Those are the five files this unit owns. `stageInventory` digests them from the checkout because
`HOST_PATHS` in `src/core/constants.ts` names each one, so any edit to them makes `host.json` stale.
`host.json` is off-limits and `npm run build` is barred, so this criterion cannot close inside the
unit. Regenerating it is `npm run build` (its `build:inventory` step), or a direct
`stageInventory(process.cwd(), 'host.json')` run against a built `dist/src`.

## Tree state

```
$ git status --short
 M .oxlintrc.json
 M configs/policy.ts
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts

$ git diff --stat
 .oxlintrc.json       |  20 ++
 configs/policy.ts    | 715 +++++++++++++++++++++++++++++++++++--
 tests/config.test.ts | 525 ++++++++++++++++++++++++++-
 tests/policy.test.ts | 171 ---------
 tests/setupPolicy.ts | 981 +--------------------------------------------------
 5 files changed, 1227 insertions(+), 1185 deletions(-)
```

No file outside the owned set was written. Every probe ran in the session scratchpad.

## Shared-file patch: `.claude/rules/architecture.md`

This unit moves the placement law from the sweep to the plugin, so § What the policy sweep proves
now attributes those proofs to the wrong instrument. The file is off-limits, so the patch is
returned rather than applied. `.claude/rules/workspace.md` § Policy instruments already states the
split this unit implements and needs no change.

Patch 1 — the section heading and its opening paragraph (line 99):

```
-### What the policy sweep proves
-
-The fleet policy sweep (`tests/policy.test.ts`, `tests/setupPolicy.ts`) enforces syntactic
-placement: a declaration of a given syntactic kind appears only in a file permitted to hold that
-kind. It reads declaration syntax and file name, never meaning.
+### What the policy instruments prove
+
+The `policy` Oxlint plugin (`configs/policy.ts`) enforces syntactic placement: a declaration of a
+given syntactic kind appears only in a file permitted to hold that kind. The fleet policy sweep
+(`tests/policy.test.ts`, `tests/setupPolicy.ts`) enforces what a path or a text reading decides.
+Each reads declaration syntax, file name, and workspace text, never meaning.
```

Patch 2 — the placement bullet (line 105), whose subject becomes the plugin:

```
-- It proves that a module function sits in a function-kind file, that module data sits in a
+- The plugin proves that a module function sits in a function-kind file, that module data sits in a
```

Patch 3 — the portability bullet (line 113), which loses the line-ending clause and the deleted
glob:

```
-- It proves the host portability rules that are path- or text-shaped over the populations
-  `POLICY_PORTABILITY_GLOB` and `POLICY_PORTABILITY_SOURCE_GLOB` name: no path segment carries a
-  Windows reserved device name, a character Windows refuses, a trailing dot or space, or a sibling
-  differing only by case; no `package.json` script names a `.sh` file; and no source in the parsed
-  population trims a payload before splitting it on `'\n'`, reads `os.EOL`, or imports `EOL` from
-  `node:os`.
+- The sweep proves the host portability rules that are path- or text-shaped over the population
+  `POLICY_PORTABILITY_GLOB` names: no path segment carries a Windows reserved device name, a
+  character Windows refuses, a trailing dot or space, or a sibling differing only by case; and no
+  `package.json` script names a `.sh` file.
+- The plugin proves, over the population `POLICY_ENDING_GLOBS` names, that no source trims a
+  payload before splitting it on `'\n'`, reads `os.EOL`, or imports `EOL` from `node:os`.
```

Patch 4 — the `helpers.ts` bullet (line 133):

```
-  syntax, so `DATA_EXEMPT_FILES` in `tests/setupPolicy.ts` excludes the file. Ordinary module data
+  syntax, so `DATA_EXEMPT_FILES` in `configs/policy.ts` excludes the file. Ordinary module data
```

Patch 5 — the ambient bullet (line 136):

```
-- It inspects no ambient declaration file: `.d.ts`, `.d.mts`, and `.d.cts` are all outside its
-  reach. An ambient declaration file is not a module in the kind table, so it sits outside the
-  parsed population entirely rather than being exempted from the `type` rule.
+- No placement rule inspects an ambient declaration file: `.d.ts`, `.d.mts`, and `.d.cts` are all
+  outside its reach. An ambient declaration file is not a module in the kind table, so every rule
+  refuses the file by its name rather than exempting it from the `type` rule.
```

Patch 6 — the domain register (line 217):

```
-- `FUNCTION_DOMAIN_FOLDERS` in the fleet-canon register (`tests/setupPolicy.ts`) registers the
+- `FUNCTION_DOMAIN_FOLDERS` in the fleet-canon register (`configs/policy.ts`) registers the
```

The remaining bullets under that section keep their meaning: the suppression, rule-map, and
filename-population bullets belong to the sweep, and the bare-collection, function-kind, and
class-expression bullets belong to the plugin, whose region walk stops at a class expression exactly
as the deleted `hasModulePolicyFunction` did.

## What I could not close

- `npm run test:config` exit 0. One case reddens on the stale `host.json`, which is off-limits.
  Everything else in that project passes.

## Claims I flag

- **The plugin reproduces the sweep's placement reading exactly, with one stricter edge.**
  `fileToPolicyStem` strips the last extension, where the sweep used `basename(file, '.ts')`. A file
  named for a registered function domain with a `.tsx`, `.mts`, or `.cts` extension —
  `composables.tsx` — now reports `policy/no-malformed-domain` `file` where the sweep reported
  nothing. The reading is stricter, so it cannot redden a tree the sweep accepted. No such file
  exists in this workspace.
- **`isPolicyDomain` matches a registered folder as a path suffix**, because a rule reads the
  absolute path the linter passes. A path such as `vendor/app/browser/composables/useTheme.ts` would
  match where the sweep's workspace-relative comparison did not. The lint population is anchored at
  the workspace root, which bounds it, but the suffix match is wider than the equality it replaces.
- **The `parent` chain carries the placement rules.** `functionToPolicyRegion` walks up to `Program`
  rather than walking down from each statement, so it depends on `node.parent` being present on
  every node oxlint 1.80.0 visits. The measurement is in the session probe and in the passing
  invalid cases; a future oxlint that drops `parent` would make every placement rule silent, and the
  invalid cases are what would catch it.
- **The population claim rests on two mechanisms, neither of which is `RuleTester`.** The parity case
  reads `.oxlintrc.json` against `POLICY_PLACEMENT_GLOBS` and `POLICY_ENDING_GLOBS`, and the
  real-binary case drives oxlint over a scratch workspace. A `RuleTester` case cannot see a
  population, because it resolves a case's `filename` against oxlint's own package folder.
- **`tests/setupPolicy.ts` imports nothing from `configs/policy.ts`.** The reasoning is under
  § The registers' new home. If the Orchestrator reads the brief's sentence as binding regardless,
  the repair is to give a sweep rule a register to read, not to add an unused import.
