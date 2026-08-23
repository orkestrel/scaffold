# FIX-Q report

## Q1 — CommonJS decision

I chose complete enumeration. `buildStage` must classify entries before the compile probes call `selectEntries`. Running `require()` during classification would conflate an incompatible format with valid CommonJS code that throws during initialization.

The selector resolves with `['node', 'require']`, then applies these rules:

| Target | Result | Rule |
| --- | ---: | --- |
| `.cjs` | `true` | Always CommonJS |
| `.mjs` | `false` | Always ESM; synchronous `require(esm)` does not change its format |
| `.json` | `true` | Loaded through the CommonJS JSON handler |
| `.node` | `true` | Loaded through the native-addon handler |
| Extensionless | `true` | Loaded as JavaScript through `require()` |
| `.js` | scope-dependent | The nearest enclosing `package.json` decides; `module` rejects, while `commonjs` or omitted `type` admits |

These rules follow the [Node 22 CommonJS loader](https://nodejs.org/download/release/latest-jod/docs/api/modules.html) and [Node 22 package-type rules](https://nodejs.org/download/release/v22.18.0/docs/api/packages.html). Other extensions remain outside the proof’s runtime-module contract; the `.wasm` control returns `false`.

The target-format matrix passes:

| Case | Required | Result |
| --- | ---: | ---: |
| `module-sync` first | `true` | `true` |
| `node` condition | `true` | `true` |
| Plain ESM-only | `false` | `false` |
| Plain dual | `true` | `true` |
| Extensionless under `"type": "module"` | `true` | `true` |
| Nested `.js` under `"type": "commonjs"` | `true` | `true` |

The firing control changed the extensionless branch to `false`:

```text
FAIL |src:core| selects CommonJS entries by the target format a typed consumer resolves
Expected: true
Received: false
exit_code=1
```

After restoration:

```text
exit_code=0
```

## Q2 — call-site binding

The guide test inspects direct variable-initializer call expressions inside `buildStage` and requires:

```text
collectTargets(entry)
resolveTarget(entry, RUNTIME_CONDITIONS.module)
resolvesCommonJS(entry, installed)
resolveTarget(entry, RUNTIME_CONDITIONS.browser)
```

The fallback-dropping control fired:

```text
Mutation: collectTargets(entry).slice(0, 1)
Expected call missing: collectTargets(entry)
exit_code=1
```

The fixed-lookup control fired:

```text
Mutation: replace resolveTarget(entry, RUNTIME_CONDITIONS.module) with entry.import lookup
Expected call missing: resolveTarget(entry, RUNTIME_CONDITIONS.module)
exit_code=1
```

After restoration, `npm run test:guides` reported:

```text
exit_code=0
```

## Q3 through Q7

- Q3: [compilers.ts](/home/user/scaffold/src/core/compilers.ts:1306) contains the complete sentence and matching wrap.
- Q4: [templates.ts](/home/user/scaffold/src/core/templates.ts:1890) tells the emitted file’s reader that installed browser tooling does not stand for a published browser face.
- Q5: [scaffold.md](/home/user/scaffold/guides/scaffold.md:1477) names `node` and `require` as TypeScript’s CommonJS target-resolution conditions after removing `types`. It explains why `node-addons` and `module-sync` are omitted and documents extensionless and `.mjs` classification.
- Q6: The release-skew and browser-branch paragraphs are reflowed. The asserted fragment “raises the question on every target materialized before it” remains intact.
- Q7: [fix-p-report.md](/home/user/scaffold/.orkestrel/campaign/fix-p-report.md) names the matrix members, audit vectors, controls, paragraphs, and ragged breaks instead of tallying them. The substitution sweep returned no hits.

## TypeScript settlement

TypeScript 6.0.3 produced these results. Its Node-format resolution behavior is described in the [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference).

| Fixture | `node16` | `nodenext` |
| --- | --- | --- |
| `module-sync` / `require` | Selected `require` → `./s.cjs` | Selected `require` → `./s.cjs` |
| `types: .d.mts`, `require: .mjs` | TS1471, exit `2` | Accepted, exit `0` |

The exact `module-sync` fixture has no declaration, so strict tracing also reports TS7016 after selecting `./s.cjs`. With `--noImplicitAny false`, its `.cts` consumer exits `0` under `node16` and `nodenext`. The generated classifier still rejects `.mjs` as CommonJS, as required.

## Gate evidence

### Build and inventory

```text
exit_code=0
```

The `host.json` file changed.

### Owned TypeScript lint

```text
npx oxlint --config .oxlintrc.json --deny-warnings …
exit_code=0
```

### Owned TypeScript format

```text
All matched files use the correct format.
exit_code=0
```

### TypeScript checks

```text
npm run check
check:src:core
check:src:server
check:src:bin
exit_code=0
```

### Guide project

```text
exit_code=0
```

### Template project

```text
Error: spawnSync /opt/node22/bin/node EPERM
exit_code=1
```

Every failure is the brief’s named grandchild-process denial, including the emitted-corpus oxfmt fixed-point test. No weaker substitute was used.

### Compiler project

```text
exit_code=0
```

### Selector matrix and format enumeration

```text
exit_code=0
```

The Q2 mutation transcripts are recorded earlier in this report.

Final scope checks:

```text
git diff --check
exit_code=0
```

Only the brief’s owned files are modified. `tmp/fix-q/` contains no probe file.

## Unclosed evidence

The sandbox prevented the authoritative template-project result. Settle it on the host with:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
```

The indexeddb regenerated proof remains an Orchestrator observation. Settle it from `/home/user/orkestrel/indexeddb` with:

```text
npm run test:distribution
```

The `prove` instrument returned:

```text
MCP tool call requires approval, but approval policy is never
```

It issued no receipt. The actual Vitest mutation controls provide the selector and call-site evidence.

## Weak claim

The packed-proof end-to-end result remains weak until the host clears the template project and the indexeddb distribution proof. The selector’s lifted classifier, mutation controls, lint, format, typecheck, guide project, and compiler project are directly measured.

---

## Orchestrator's integration note

**The unit ruled between the candidate mechanisms with an argument the brief did not supply.** It chose
complete enumeration and gave the reason observation fails: `buildStage` must classify entries before
the compile probes call `selectEntries`, and running `require()` during classification would conflate
an incompatible module format with valid CommonJS code that throws while initializing. That
distinction is real and settles the question the brief left open.

**Host readings, taken after the unit exited.** Its sandbox reported `EPERM` failures on the
template project. The project passes on the host:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
exit: 0

npm run format:check = 0
npm run lint:check   = 0
npm run check        = 0
npm run test:guides  = 0
```

**The end-to-end reading, which is what this round is for.** The candidate rebuilt, packed, installed,
and the presence-owned proof deleted so `repair` writes the regenerated proof into a real target:

```text
repair completed in /home/user/orkestrel/indexeddb.
the proof carries the format enumeration.
exit: 0
```

## An independent verification the Orchestrator could not complete

The round's evidence requirement was the enumeration itself, so the Orchestrator attempted to check
it rather than accept it. **That attempt was inconclusive, and the reason is a defect in the probe
rather than in the enumeration.**

The runtime probe drove `require()` over each target rule and reported every target loading. It
discriminates nothing: Node's `require(esm)` loads an ES module too, so runtime tolerance cannot
separate the cases. The predicate models TypeScript's judgment, not Node's.

The TypeScript probe drove the same fixtures:

```text
  target        node16            nodenext          enumeration says
  cjs           accepts           accepts           true
  mjs           TS1479            accepts           false
  json          TS2307            accepts           true
  ext           TS2307            TS2307            true
  jsroot        accepts           accepts           false
  jsnest        accepts           accepts           true
```

The `json`, `ext`, and `jsroot` rows disagree with the enumeration, and none is evidence against it. The fixtures
carry no `types` condition, so TypeScript resolved declarations by extension guess: `TS2307` is
"cannot find module", a declaration-resolution failure rather than a format verdict, and `jsroot` and
`jsnest` accept because the `.d.cts` declaration decided the format rather than the target did.
The fixture conflates declaration resolution with format classification, which is the question under
test.

**The reading worth pursuing** is that `jsroot` and `jsnest` answer identically. If a properly
declared entry has its format decided by the `types` condition rather than by the target, then the
nearest-manifest rule may model something TypeScript does not consult. That is put to the audit as a
claim rather than settled here, because the Orchestrator's earlier fixtures were not correct and the
audit lanes can build them.

What stands independently of that question: the unit's target-format matrix, its firing control, its
TypeScript settlement for the referred `.mjs` and `module-sync` cases, the host gate chain, and the
end-to-end run in a real target.
