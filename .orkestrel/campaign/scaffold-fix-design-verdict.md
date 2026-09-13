# Design verdict — the scaffold 0.0.65 fix

Brief: `scaffold-fix-design-brief.md`. Lanes: `planner` on Opus 5 (native, subjective) and `analyst`
on GPT-5.6 Sol (`codex exec`, objective, journal `tmp/codex/scaffold-fix-design.jsonl`, thread
`01a098d8-270a-75b1-88f2-c81d7e280beb`). Both ran on one identical brief, blind, in parallel.

**Routing substitution.** The user asked for this lane's engine to be a model named "Astra". Neither
`gpt-5.6-astra` nor `astra` resolves through the Codex CLI, and Cursor's `agent models` list carries
no Astra entry. The user then instructed: use Sol. Recorded, not silent.

## Ruling

Raise `MINIMUM_NODE_VERSION` to `22.18.0`, emit a `devEngines.packageManager` floor of `>=11.6.0`
with `onFail: "error"` into every generated manifest, and change no public shape. Node 22 and Node 24
both stay supported.

## Both lanes were factually wrong on the load-bearing point

Neither verdict is usable as written. The Orchestrator measured the point both lanes ruled on.

**The subjective lane** refused every npm-floor direction on the premise that "the npm a conforming
developer runs is the one their Node bundles, so a declared `engines.npm` is a second label for a
fact the Node floor already fixes", and recommended a floor of `26.0.0` that drops Node 22 and 24.
The premise is false: npm is installed independently of Node, which only *defaults* it. Measured —
`node v22.22.2` with npm `11.6.0` invoked directly installs the crashing graph at exit `0`, `added 69
packages`. The recommendation would have cost two long-term-support lines for no reason.

**The objective lane** ruled that with `engine-strict=true` "the older npm then refuses with
`EBADENGINE` before dependency resolution instead of crashing". Measured against the real crashing
graph on npm `10.9.7`: `engines.npm` alone crashes and emits no `EBADENGINE` at all, and
`engines.npm` with `engine-strict=true` crashes identically. The subjective lane's competing
inference — that the crash fires inside `#loadPeerSet` during ideal-tree construction, ahead of
engine validation — is the correct one.

The objective lane's direction F, which it filed as a deferred successor rather than the release fix,
is what actually works.

## Measured basis

Instruments retained under `evidence/linux-gate/`: `isolate.sh`, `enforce.sh`, `direct-npm.sh`,
`devengines-control.sh`, `engines-probe.sh`, `npm-matrix.sh`, `npm-bisect.sh`.

**The defect.** `@npmcli/arborist/lib/arborist/build-ideal-tree.js:1289` reads
`node.parent.edgesOut.get(edge.name)` inside `#loadPeerSet`, and `node.parent` is null. The stack
carries three recursive `#loadPeerSet` frames. It is an unguarded null dereference in npm's peer-set
resolution.

**The trigger is `vitest@4.1.11` alone**, not a combination and not `@types/node`:

```text
vite alone                       exit=0  clean
vitest alone                     exit=1  crash
vite + vitest                    exit=1  crash
vite + vitest + @types/node@^26  exit=1  crash
vite + vitest + @types/node@^22  exit=1  crash
```

Adding `@types/node` at either version changes nothing, and the minimal reproduction carries none.

**The boundary is the npm version and nothing else.** Every row below ran on `node v22.22.2` with npm
invoked directly from its own prefix, so each version self-reports truthfully:

```text
npm 10.9.7 crash    npm 11.5.0 crash    npm 11.6.0 exit=0, added 69 packages
```

**Guard mechanisms, against the real crashing graph on npm `10.9.7`:**

```text
no guard                            crash
engines.npm only                    crash, and no EBADENGINE emitted
engines.npm + engine-strict=true    crash
devEngines.packageManager           EBADDEVENGINES, no crash
```

**The guard is not vacuous.** It refuses exactly the crashing versions and admits exactly the working
one, each self-reporting its true version:

```text
npm 10.9.7  refused, current=10.9.7      npm 11.5.0  refused, current=11.5.0
npm 11.6.0  admitted, exit=0, added 69 packages
```

**The Node half is a separate, genuine requirement.** Node `22.18.0` is where type stripping became
unflagged, which the vendored `configs/policy.ts` lint plugin needs; `22.12.0` fails it with
`ERR_UNKNOWN_FILE_EXTENSION`, a Node module-loader error. Node 22 and 24 both clear `22.18.0`.

## A finding neither seam predicted, and it stands

The subjective lane found that `src/core/constants.ts:494` pipes scaffold's own
`@types/node` into `BASE_DEV_DEPENDENCIES`, so every generated workspace typechecks against Node 26's
declaration surface while declaring `>=22.12.0`. Verified from the emitted artifact: `"@types/node":
"^26.5.0"` beside `engines: {"node":">=22.12.0"}`. Raising the floor to `22.18.0` narrows that
divergence without closing it. Record it as a successor question — whether the emitted
`@types/node` range should track the declared floor rather than scaffold's own devDependency — rather
than widening this change.

## Units

- **U-floor.** `MINIMUM_NODE_VERSION` to `22.18.0`; add `MINIMUM_NPM_VERSION` and the derived
  `devEngines` constant; emit `devEngines.packageManager` from the manifest compiler; move
  `matchesEngines` boundary cases, factory cases, the guide fence and its transcription, and
  scaffold's own `engines`. Constraint-bound and taste-free once this ruling is fixed — Sol
  `implementer`.
- **U-probe.** Replace the hard-coded mapped-IPv6 reachability at
  `tests/src/server/helpers.test.ts:214-224` with an exported runtime capability predicate beside
  `supportsFileLinks` and `supportsMode`, gating the case and citing the mechanism. Judgment on the
  predicate's name and the skip's reason — Opus `implementer`.
- **U-record.** Correct `ROADMAP.md:370-375`, whose npm-11 framing is falsified because npm `11.0.0`
  through `11.5.0` crash; record the measured boundary, the `devEngines` ruling, the S3 `&&`
  composition row, and the `@types/node` successor question — `builder`.

**Excluded from this change.** S3's repair of the `&&` chain edits the generated manifest and the
`test` script in three packages, which exceeds this version's scope. U-record carries it forward.

## Risk

A consumer on Node `22.12.0` through `22.17.x` is excluded by the floor raise, and under the fleet's
caret convention receives it only on a deliberate re-pin. A developer on Node 22 or 24 running the
npm their Node bundled is refused at install with `EBADDEVENGINES` naming the required npm, instead
of an unattributable `TypeError` inside arborist — that is the fix's whole point, and it is still a
refusal they must act on by upgrading npm.

The release gate cannot go green on this host: `test:distribution -- --mode release` installs a
generated workspace from ranges under the ambient npm `10.9.7`. After U-floor that install is
refused rather than crashed, so the distribution proof itself must launch an admitted npm. That is
U-floor's own acceptance question and it is named in its brief.

VERDICT: RULED — direction as stated, on measured evidence, against both lanes as written
