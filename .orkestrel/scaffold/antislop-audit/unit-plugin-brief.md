# Unit U2: author the policy oxlint plugin and wire it into the lint gate

## Role and engine

`sol` route — GPT-5.6 Sol implementer, journaled CLI, sandbox workspace-write, main checkout, sole
serial writer from a clean committed baseline. You perform the assignment directly and spawn
nothing.

## Objective

Create `configs/policy.ts` — the workspace's oxlint JS plugin, namespace `policy`, rules
`policy/no-mocking` and `policy/no-keyword-privacy` — and wire it into `.oxlintrc.json` together
with two built-ins, and add one vendored-path row to `src/core/constants.ts`. Zero new
dependencies: `package.json` and `package-lock.json` must not change.

## Context — read before writing

- `AGENTS.md` non-negotiables bind: no `any`, no type assertions (`as const` is sanctioned), no
  `@ts-*` suppressions, no nested function declarations, single quotes, tabs, no semicolons.
- Rules: `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
  `.claude/rules/workspace.md` (§ Configuration authority and § Tooling now name
  `configs/policy.ts` as the third permitted leaf and fix the visitor-adapter idiom — read those
  sections; they are the law this unit implements).
- The adopted design: `.orkestrel/scaffold/antislop-audit/adoption-report.md` (sections A1–A3).
- Prior art (MIT, read for approach, do not copy style or import its dependency):
  `/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/antislop/anti-slop-main/src/rules/no-module-mocking.ts`.
- Skill: none.
- Environment facts: linux; repo /home/user/scaffold; network DENIED in your sandbox (no installs,
  no fetches — none are needed); `tmp/` is expected dirty and git-ignored; `.git` is read-only
  (never run a git command that takes the index lock; read-only `git diff`/`status` are fine).
- Measured facts you may rely on (evidence: `.orkestrel/scaffold/antislop-audit/design-lanes-evidence.md`):
  - The installed oxlint is 1.78.0; `.oxlintrc.json` accepts
    `"jsPlugins": [{ "name": …, "specifier": … }]`, and a plain ESLint-shape default-export object
    plugin loads and reports (E6) — no `@oxlint/plugins`, no `defineRule`.
  - `typescript/no-restricted-types` and `typescript/parameter-properties` are enabled-and-firing
    built-ins in this oxlint (probed); `typescript/explicit-member-accessibility` accepted the
    `no-public` option without error but its positive firing is UNPROVEN — see Unknowns.
  - The whole tree currently carries zero violations of everything this unit enables (E3, E5).
- `oxlint/plugins-dev` exports only `RuleTester` — there are no importable rule-authoring types.
  Declare minimal structural interfaces locally in `configs/policy.ts` (exported, `Policy`-prefixed
  with names.md role suffixes) covering exactly the members the rules touch. The file imports
  nothing, per the leaf law.

## The plugin, fixed verbatim

Default export (framework-required; an `.oxlintrc.json` override grants this one file
`import/no-default-export: off`): `{ meta: { name: 'policy' }, rules: { 'no-mocking': …,
'no-keyword-privacy': … } }`. Also export each rule object by name — `MOCKING_RULE` and
`PRIVACY_RULE` — so tests can drive them through RuleTester, and export the reporter functions.

Visitor tables hold one-line context-binding arrows delegating to named module-scope
`report{Noun}` functions (workspace.md § Tooling sanctions exactly this shape); rule logic never
sits inline in the table.

**`policy/no-mocking`** — meta.type `'problem'`, four `messageId`s, detection on `CallExpression`
whose callee is a member expression (computed with a string literal, or plain identifier property)
on the identifier `vi` or `jest`:

| Members | messageId | Message |
| --- | --- | --- |
| `mock`, `doMock`, `unstable_mockModule` | `mock` | `Replace module mocking with a real injected collaborator; a missing seam is a missing injection point, not an untestable truth.` |
| `fn`, `spyOn` | `spy` | `Use createRecorder from @orkestrel/test; framework spies and mock functions are banned.` |
| `useFakeTimers`, `setSystemTime` | `clock` | `Use real short timers and waitForDelay from @orkestrel/test; never replace the host clock.` |
| `stubGlobal`, `stubEnv` | `stub` | `Drive the real implementation or a protocol-faithful fixture; never stub globals or environment.` |

Detection is name-based (`vi`/`jest` identifiers), deliberately: the naming rules ban abbreviated
identifiers, so no legitimate local binding is ever named `vi` or `jest` in this fleet, and the
docs.description states the limit (a renamed import alias escapes the rule).

**`policy/no-keyword-privacy`** — meta.type `'problem'`, one `messageId` `keyword`, message
`Use runtime-enforced # privacy; TypeScript {{keyword}} is compile-time-only.` Reports the
`accessibility` value `'private'` or `'protected'` on class members (`MethodDefinition`,
`PropertyDefinition`, `AccessorProperty`, and the TS abstract variants if this ESTree emits them —
verify with your fixture, do not guess). Explicit `public` and parameter properties are NOT this
rule's subject (built-ins below own them).

## `.oxlintrc.json`, fixed verbatim

- Top-level `"jsPlugins": [{ "name": "policy", "specifier": "./configs/policy.ts" }]`.
- In `rules`: `"policy/no-mocking": "error"`, `"policy/no-keyword-privacy": "error"`,
  `"typescript/parameter-properties": "error"`,
  `"typescript/explicit-member-accessibility": ["error", { "accessibility": "no-public" }]`.
- In `overrides`, a new entry: files `["configs/policy.ts"]`, rules
  `{ "import/no-default-export": "off" }` — an explicit row, not a glob ride.

## `src/core/constants.ts`

Add the row `'configs/policy.ts'` to `HOST_PATHS`, placed beside `'configs/helpers.ts'`. Touch
nothing else in the file.

## Unknowns

- Whether `typescript/explicit-member-accessibility` with `no-public` actually FIRES on an explicit
  `public` member in this oxlint build. Prove it with your fixture. If it cannot fire (option
  ignored or rule unimplemented), remove that config line, report the finding as a deviation, and
  leave `public` unenforced — do not substitute a custom check.
- Whether this ESTree names abstract members with distinct node types. Settle it in the fixture.

## Scope

- Owned: `configs/policy.ts` (new), `.oxlintrc.json`, `src/core/constants.ts` (the one row).
- Off-limits: everything else — `package.json`, `package-lock.json`, `tests/`, `guides/`, `src/`
  beyond the one row, `.claude/`, `.orkestrel/`.
- Validation allowed: `npm run lint:check`, `npm run format:check`, `npm run check` (all
  read-only), plus throwaway fixtures under `tmp/plugin-fixture/` driven with
  `node_modules/.bin/oxlint`. No `--fix`, no `format`, no `build`, no `test`, no git writes, no
  installs.

## Execution

Perform the assignment directly. Spawn nothing.

## Output — the report, nothing else

1. `git status --porcelain` and the full `git diff` of the three owned files.
2. The fixture run: exact command plus output showing all four enabled rule ids firing
   (`policy/no-mocking` with each of the four messageIds, `policy/no-keyword-privacy` for both
   `private` and `protected`, `typescript/parameter-properties`,
   `typescript/explicit-member-accessibility` on an explicit `public` member), and a clean fixture
   reporting nothing.
3. Exit-code truth for `npm run lint:check`, `npm run format:check`, `npm run check` on the whole
   tree.
4. Deviation findings, or `none`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when:
the plugin cannot load through `jsPlugins`, a built-in rejects its configured shape, a rule cannot
be expressed without `any`/assertions/suppressions, or a tree-wide gate reports findings your
change did not introduce. Where a helper's name or a type's exact member list is the question,
decide it under the naming rules, record it, and carry on.

## Acceptance criteria

- `package.json` and `package-lock.json` byte-identical to baseline.
- All three gates above exit 0 on the whole tree.
- The fixture fires every enabled rule id and messageId listed in Output 2; the clean fixture is
  silent.
- Neither custom rule can fire on `configs/policy.ts`'s own source.
- `configs/policy.ts` has no imports, no `any`, no type assertion other than sanctioned `as const`
  (prefer none), no `@ts-*` comment, no disable directive, and no function declared inside another
  function beyond the sanctioned one-line visitor adapter arrows.

## Review evidence

The diff and status in Output 1; an independent Opus design-fit audit follows in a later unit.
