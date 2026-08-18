# Evidence pack: anti-slop audit probes (Orchestrator-run, 2026-08-18)

All commands ran on this host, in this checkout, with the repo's installed toolchain unless noted.

## E1. Installed oxlint version and plugin surface

```
$ node -e "console.log(require('/home/user/scaffold/node_modules/oxlint/package.json').version)"
1.78.0
$ node -e "const e=require('/home/user/scaffold/node_modules/oxlint/package.json').exports; console.log(Object.keys(e))"
[ '.', './plugins-dev', './package.json' ]
$ grep -o '"jsPlugins"[^,]*' -m1 node_modules/oxlint/configuration_schema.json
"jsPlugins": {
```

Installed oxlint is 1.78.0 (semver-matched by the manifest's `^1.77.0`). The JSON config schema
accepts `jsPlugins`, and the package exports `oxlint/plugins-dev` (RuleTester).

## E2. `as const` under the current config

Fixture `src/sample.ts`:

```ts
export const MODES = ["a", "b"] as const
export const WIDE = { x: 1 } as unknown
```

```
$ oxlint --config /home/user/scaffold/.oxlintrc.json .
src/sample.ts:2:21: error typescript(consistent-type-assertions): Do not use any type assertions. [as unknown reported]
```

Only line 2 reported. `as const` is exempt under `consistent-type-assertions: never` as installed.

## E3. Pattern counts in this repo (grep, rough upper bounds)

```
as const: 2   satisfies: 6   Record<string, unknown>: 44   runtime typeof (src+tests): 60
vi.mock/doMock/fn/spyOn/useFakeTimers/setSystemTime/stubGlobal/stubEnv/hoisted (tests/): 0
TS private/protected/public member keywords (src/, app/): 0
eslint-disable|oxlint-disable directives (src, app, tests, configs, scripts): 0
"Shape" occurrences in src/: 1
```

## E4. Anti-slop plugin negative control (instrument can fail)

The zip's plugin (with its own scratch `npm install`: oxlint 1.78.0 + @oxlint/plugins 1.78.0)
run over a deliberate-violation fixture reported every expected rule: no-module-mocking,
no-unknown-parameters, no-unknown-returns, no-object-parameters, no-unsafe-dictionary-type,
no-shape-in-symbol-names, no-known-value-widening, no-runtime-typeof. 8/8 fired.

## E5. Anti-slop plugin over this repo (src app tests configs scripts vite.config.ts)

```
     64 anti-slop(no-runtime-typeof)
     47 anti-slop(no-known-value-widening)
     44 anti-slop(no-unsafe-dictionary-type)
     43 anti-slop(no-shape-in-symbol-names)
     36 anti-slop(no-conditional-empty-object-spread)
     34 anti-slop(no-unknown-parameters)
      5 anti-slop(no-unknown-returns)
      3 anti-slop(no-reflect-apply)
      1 anti-slop(no-reflect-get)
      0 no-module-mocking, no-object-parameters, no-unknown-type-aliases,
        no-chained-type-assertions, no-widen-then-assert, require-safety-comment-for-type-assertion
```

Site inspection:
- All 3 `no-reflect-apply` sites are `tests/config.test.ts` (typed dynamic dispatch in proofs).
- The 1 `no-reflect-get` site is `src/server/helpers.ts:64`:
  `holds(() => isError(error) && Reflect.get(error, 'code') === 'ENOENT')` — a total-safe read off a
  hostile `unknown`, required because the repo bans type assertions outright.
- All 5 `no-unknown-returns` sites are tests/setup*.ts boundary loaders (JSON collectors/readers).
- `no-shape-in-symbol-names` hits are the fleet's own `ContractShape`/`shapers.ts` vocabulary.

## E6. Plain-object jsPlugin with ZERO new dependencies

A plugin authored as a plain ESLint-shape default export (`{ meta: { name }, rules: { ... } }`,
rules with plain `create(context)`, no `@oxlint/plugins` import, no `defineRule`) registered via
`jsPlugins` in a `.oxlintrc.json` under the repo's installed oxlint 1.78.0:

```
sample.ts:4:2: error probe(no-disable-directive): Remove the oxlint-disable directive and fix the cause.
sample.ts:2:2: error probe(no-accessibility): Use runtime-enforced # privacy, never TypeScript private.
sample.ts:3:14: error probe(no-accessibility): Use runtime-enforced # privacy, never TypeScript public.
```

`context.sourceCode.getAllComments()` works (comment-directive bans are feasible); TS
`accessibility` modifiers and `TSParameterProperty` are visible; a `#`-field class reported nothing.

## E7. What tests/setupPolicy.ts already enforces mechanically (read first-hand)

Rules: type/data/function placement by centralized-kind file, export requirement, class-file
naming, constants.ts const/UPPER_SNAKE/no-bare-collection, parsers/factories name prefixes,
function-domain shape, test mirrors, skill-family shape. The module-function law is enforced at
module scope and inside directly-passed callbacks/returns, but the sweep never walks the BODIES of
top-level function declarations or class methods — nested function declarations there are today
enforced only by cleanup/review. It also never sees mocks, accessibility keywords, or comments.

## E8. Bench state

Codex/Sol: authenticated mid-session (device auth approved by the user); journaled-CLI round trip
returned `OK` (thread 01a01484-b62b-70b2-9881-17791b9726ac). The MCP loopback transport is dark
this session (401 — the MCP server process predates the login) — CLI transport only.

## E9. Vue SFC reachability (post-round probe)

The plain-object plugin from E6, run over a `.vue` fixture whose `<script setup lang="ts">` block
contains a TS `private` member and an `oxlint-disable-next-line` comment:

```
Widget.vue:6:1: error probe(no-disable-directive): Remove the oxlint-disable directive and fix the cause.
Widget.vue:3:2: error probe(no-accessibility): Use runtime-enforced # privacy, never TypeScript private.
```

jsPlugins reach Vue SFC script blocks with correct line mapping under installed oxlint 1.78.0.

## E10. Fork-settling probes (post-lane, Orchestrator-run)

(a) Self-suppression: a fixture opening with `/* oxlint-disable */` and containing a TS `private`
member produced ZERO findings and exit 0 under the E6 plugin config. File-level disable directives
silently defeat jsPlugin rules, so a suppression ban homed in the plugin is self-defeating; the
policy sweep is the only unsuppressible home.

(b) Floor: a scratch install of oxlint@1.77.0 exports `./plugins-dev`, carries `jsPlugins` in its
configuration schema, and ran the E6 plain plugin identically (same three findings). The fleet's
declared `^1.77.0` floor carries the mechanism; no floor move needed.

(c) Lint population: `tmp/probe/lintReach.ts` containing a `no-var` violation was NOT reported by
`npm run lint:check` (oxlint honors .gitignore, which ignores `tmp`). The lint gate does not reach
`tmp/`; no ignore change is needed for probes.
