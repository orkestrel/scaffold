# Reconciliation — the successor round

Two lanes, blind, on one brief. **Both FAIL.** Publication stays blocked.

| Lane       | Engine      | Terminal line                                                    |
| ---------- | ----------- | ---------------------------------------------------------------- |
| Subjective | Opus 5      | FAIL — 5 broken, 0 unresolved, 1 finding outside the claims      |
| Objective  | GPT-5.6 Sol | FAIL — 9 broken, 1 unresolved, 0 findings outside the claims     |

The round did what a successor round is for: most of its claims attacked the fix round's rulings,
and the rulings are where the defects were.

## The one real code defect, found by both lanes independently

**A legal export shape escapes the partition entirely.** Node's exports field permits an array as a
fallback list. `collectTargets` rejects an array through `isRecord`, so it returns **no targets at
all**, and the subpath lands in `excluded` — the bucket meaning "published for a reader" — where it
is never imported, never required, never compiled against, and never existence-checked. The
partition's totality assertion stays green because the subpath is accounted for.

Reproduced by the Orchestrator against the shipped functions:

```text
array fallback (legal Node shape)   targets=[]   -> excluded
```

Sol went further than a reading. It published `{"./feature":["./feature"]}` and **drove
`require('runtime-package/feature')` successfully**, with an absent subpath throwing as its control.
So the shape is not merely legal, it loads — and `isModule` recognizes only `.js`, `.mjs`, and
`.cjs`, so an extensionless CommonJS target escapes even when the array is unwrapped.

The same hole makes the browser guard unreachable for that shape: an array-valued browser face
classifies `excluded`, so `publishes no browser face this proof cannot drive` stays green while a
browser face is published.

**Two false reds in the same classifier**, both measured:

- An array-valued `types` condition — legal — falls through to `default` and the subpath reports
  `undeclared`, reddening the publish gate for a correctly-typed subpath.
- A `require`-only subpath **that does declare types** reports `undeclared`, because the declaration
  lookup is `['types', 'import']` and never consults `require`.

## Where a lane attacked the Orchestrator's ruling, and won

The Orchestrator overturned a unit's reported `test:distribution` failure as a load artifact. The
subjective lane confirmed the **cause** reading and broke the ruling anyway, with a deterministic
input:

With `npm_config_legacy_peer_deps=true` in the environment — an ordinary npm setting, reachable
through a user `.npmrc` — the install the test expects to be refused **succeeds**, and
`expect(rejected.status).not.toBe(0)` fails. The fixture forwards `process.env`, so it inherits the
host's resolver policy instead of fixing its own.

It also showed a killed child renders exactly `'\n'` and returns `status: null`, which
`expect(status).not.toBe(0)` accepts as a refusal. So the assertion cannot tell a real `ERESOLVE`
from a process that never ran its resolver, and carries no diagnosis when it fails — which is
precisely why it cost a round.

**Ruled: the overturn was right about the cause and wrong to stop there.** The test is
environment-dependent and the fix is two lines.

## Where the guide is wrong, again

The bundler claim is false. `guides/scaffold.md` says a core-only workspace "declares neither the
launcher nor the bundler" the browser branch imports. Measured: `vite` is declared in every
workspace, core-only included, and the real `abort` checkout declares it. What actually blocks
unconditional emission is the absent `configs/browsers.ts` and the undeclared Playwright pair. The
ruling's outcome survives; its reason of record does not, and a reason of record is what the next
maintainer reasons from.

Three sentences the fix round itself wrote now over-assert, each contradicted by the array probe:
that classification reads every target under any condition, that a subpath the proof cannot classify
reddens rather than disappearing, and that a subpath is undeclared when it resolves no declaration.

Sol adds a fourth: the guide says the setup question fires when a module's **bytes** differ from the
seed, and the implementation compares **trimmed text**. Trimming is the right behaviour — a trailing
newline is not authorship — so the guide is what must change.

## The finding outside the claims

The `setup` advisory decides membership on bytes and then writes a message asserting **exports**.
`indexeddb/tests/setup.ts` is 423 bytes of comment and an `afterEach` call, and exports nothing;
the advisory names it and asks for a proof "asserting the behavior the module of the same name
exports". The maintainer's only options are to ignore a permanent advisory or write a proof that
measures nothing — the exact thing the guide condemns two sections later. Narrow the message to what
the predicate knows.

## Where the lanes disagree, and the ruling

**Claim 22, the `appBrowser` merge.** Sol broke it: Vitest calls a project function with a
`ConfigEnv`, which `mergeConfig` folds into the returned project. The subjective lane measured the
same fact and scored it confirmed, on the ground that **every sibling factory has had that exact
shape since before this chain**, the merged `mode` is the mode already in force, and the release-mode
gate is demonstrably green through it.

**Ruled with the subjective lane: recorded, not fixed.** Both lanes agree on the fact and disagree
on whether it is a defect. FIX-A made `appBrowser` consistent with siblings that already behaved
this way; changing it now would re-introduce the asymmetry that fix removed, and the correct scope
for the concern is every factory or none. It is a successor question, not this release's.

## Claims broken only in their wording

Sol broke claims 5, 11, and 14 because the **claim text** was never re-cut after the fix round
changed the code beneath it — the repaired predicate deliberately dropped the blanket silence rule,
a derivable structural assertion does exist, and the assertion catches silence rather than thinning.
The shipped code and the corrected guide already say all three. No fix is owed; the successor brief
carries the corrected wording.

## A correction to this round's evidence base

The eleven propagated checkouts carry the **pre-fix** artifact and guide. Anyone judging the shipped
proof from those directories is reading the bytes round 1 broke. The propagation must be re-run
after these fixes, and before publication.

## Fix units

| Finding                                                              | Unit  |
| --------------------------------------------------------------------- | ----- |
| Array-form exports, extensionless targets, `require`-only declarations | FIX-G |
| The peer fixture's inherited resolver policy and killed-child blindness | FIX-H |
| The setup advisory asserting exports it never measured                 | FIX-J |
| Guide: the bundler reason, three over-assertions, trimmed versus bytes | FIX-I |
| Re-propagate against the fixed bytes                                   | after |
