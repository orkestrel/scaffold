# Round R — the Orchestrator's confirmations of the subjective lane

Taken by direct reading and against an earlier measurement, before the objective lane returned.
Dated 2026-08-23.

## C3 confirmed: the membership filter withholds a diagnostic

`src/core/templates.ts:1447-1453`:

```ts
function selectEntries(entries: readonly Entry[], conditions: readonly string[]): readonly Entry[] {
	return entries.filter(
		(entry) =>
			resolveTarget(entry.mapping, conditions) !== undefined &&
			(!conditions.includes('require') || entry.commonjs),
	)
}
```

`entry.commonjs` is a second filter on top of the resolution test. For
`{ require: { types: './index.d.mts', default: './index.cjs' } }` the declaration is `.d.mts`, so
`commonjs` is `false`, the entry never reaches the compiler, and the TS1479 it would have reported
lands nowhere. The previous revision read the runtime target, returned `true`, and reddened.

The lane's bound is correct and matters: **do not drop the filter.** It is what keeps a legitimately
ESM-only subpath out of the CommonJS probe, and removing it reddens every ESM-only workspace. The fix
is the mirror assertion beside `unreachable` — name every entry where `required && !commonjs`, which
is require-loadable and CommonJS-untypable, the same defect class `undeclared` already reports.

## The finding outside the claims, confirmed: `required` under-reports

The asymmetry is visible in the constants themselves:

```text
1177:  module: ['node-addons', 'node', 'import', 'module-sync']   ← import side, full set
1183:  COMMONJS_CONDITIONS = ['node', 'require']                  ← require side, missing two
1585:  const required = resolveTarget(entry, COMMONJS_CONDITIONS) !== undefined
```

`COMMONJS_CONDITIONS` is TypeScript's CommonJS resolution set with `types` removed. It was correct for
the job it held in the previous revision, where it selected the target a typed consumer resolves. This
revision gave it a **runtime** job without changing its value.

Node's require resolver enables `node-addons` and `module-sync`, measured earlier in this campaign
against real packages:

```text
  cond-probe/no-addons  require -> node
  cond-probe/no-node    require -> module-sync
  cond-probe            require -> node-addons
```

So a subpath Node reaches through `module-sync` or `node-addons` has `required` false, its runtime
drive never runs, and its published names are never compared against its declaration — while
`commonjs` is true, so the proof still asserts a `.cts` consumer compiles against it. The proof states
half the CommonJS claim and drops the other half, which is the asymmetry the two booleans existed to
remove.

The comment at `:1180-1182` compounds it: it now claims this is "the conditions Node's require
resolver uses", which is false, and it ships into every target under presence ownership.

## What this round establishes

C1, C2 and C4 confirmed. C4 re-asked every case this seam has repaired — the dual subpath, the
ESM-only package, `module-sync` first, the `node` branch, extensionless targets, nested scope — at
every entry point reaching the rule, and broke none. That is the first time the seam's repairs have
been re-verified rather than re-broken.

The ruling holds. The remaining defects are a punch-list against it, and the lane states the whole set
is one small commit: one constant restored with its real conditions, one assertion added beside
`unreachable`, one guide sentence, fixture entries that discriminate the booleans, and the report
edits.
