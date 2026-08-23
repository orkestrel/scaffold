# FIX-G report — the export-array hole and the two false reds

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/fix-g-brief.md`.

## Three departures from the brief, each an improvement

**A typed list guard instead of `Array.isArray`.** Measured under the repository's own strict
TypeScript: `Array.isArray` on an `unknown` widens the member to `any` — a `const check: string =
member` compiled clean — so the walkers would have read the fallback list through `any`, which
`AGENTS.md` forbids outright. With `isList` the same assignment errors TS2322.

**A declaration lookup the brief got wrong.** The brief specified
`resolveTarget(entry, ['types','import']) ?? resolveTarget(entry, ['types','require'])`. `??` falls
to the first **defined** answer, so an entry whose `import` branch is a bare string takes the
JavaScript fallthrough and never consults `require`. `readDeclaration` iterates the condition sets
and accepts only a resolved target `isDeclaration` admits, which also folds away the call-site
extension test. `isDeclaration` names `.d.ts`, `.d.cts`, and `.d.mts`, because the `require`-only
false red declares `.d.cts`.

**Two additions the brief did not name, forced by measurement.** A `require`-only subpath throws on
`import()`, and an ES module probe reports "Cannot find module" under every resolution mode, so
merely classifying it would have moved its red from the partition to the drive. `Entry.module`
records whether the entry resolves an `import`, the ESM drive is gated on it, and the consumer
compile writes one probe per module format with a per-format absent-subpath control.

**And the unit closed the silence its own gate opened.** An entry resolving a declaration but
neither an `import` nor a `require` would then be driven by nothing, so the partition claim now also
asserts that set is empty. Verified firing: a `{"types":…,"browser":…}` subpath reddens naming
`./odd`. That is a unit finding and closing a hole its own fix would have introduced.

## How an extensionless module was separated from a `.wasm` asset

The discriminator is whether the target's **own file name** carries an extension at all:

```ts
const name = target.slice(target.lastIndexOf('/') + 1)
const dot = name.lastIndexOf('.')
return dot === -1 || MODULE_EXTENSIONS.includes(name.slice(dot))
```

No extension is code, because `require` reads such a file through its JavaScript handler — Sol's
published `{"./feature":["./feature"]}` loaded, and the unit's own extensionless target loaded
through `require` and matched its declaration. An extension is code only when it is `.js`, `.mjs`,
or `.cjs`. `.wasm` is an asset because it *has* an extension that is not a JavaScript one, not
because of a denylist — which is the rule the brief warned would get one of the pair wrong.

Taking the basename first is load-bearing: `./dist/bundle.js/feature` and `./dist/v1.2/index` are
modules, and a whole-path read gets both wrong.

Stated in the emitted comment so a maintainer meets it: an extensionless file published for a
reader — a `LICENSE` at a subpath — reddens. That is the safe direction, and unreachable in every
real manifest measured.

## The `./*` pattern, ruled and reported rather than altered

Left reddening. Treating a pattern subpath as excluded reintroduces exactly the class this unit
closes — a whole family accounted for and never measured. Real support means expanding the pattern
against the installed tree and driving each match, which is new capability outside this brief. A
reddening pattern tells the maintainer the proof does not measure that family, which is the honest
answer.

## The controls

Criterion 5 reproduced the state both lanes measured green — `8 passed`, silent — then reddened
naming `./thing`, then passed at `10 passed` once declared, the count moving because the subpath is
now driven by a real `import` and a real `require` rather than filed away.

Criterion 6: an array-form browser face was silent pre-fix and now reddens naming `./ui`.

Criterion 7: both false reds are gone, and the verbose run shows the `require`-only subpath skipping
the ESM drive and passing the CommonJS one.

Criterion 8: `./package.json`, a `.css`, and a `.wasm` target stay excluded, count unchanged.

The committed test carries its own firing control: run against the pre-fix bytes the lift refuses
outright, and the answerable cases come back wrong for the array and extensionless shapes while
`./x.wasm` and `./package.json` answer identically both ways.

## The unknown, answered by comparison rather than assertion

No `@orkestrel` package uses any of the three shapes. The unit swept every checkout, plus every
installed `@orkestrel` manifest in `node_modules`, then **partitioned each exports map twice — once
with the shipped classifier and once with the repaired one — and compared the buckets.** Every
package reported unchanged. The repair reddens no target and un-reddens none; it changes only what
happens to shapes nobody publishes yet, which is where the silence was.

## For FIX-I

The guide says a runtime target is "a `.js`, `.mjs`, or `.cjs` file". The rule is now the file
name's extension, with no extension read as code. Two facts the guide does not carry: a declaration
resolves through `['types','import']` then `['types','require']`, and a subpath resolving a
declaration but neither an `import` nor a `require` target is named by the partition claim.
