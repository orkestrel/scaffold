# STOP — owned path was not writable

Expected: the brief grants `.agents/orchestration.md` as owned and the workspace sandbox permits its edit.

Found:

```text
patch rejected: writing outside of the project; rejected by user approval settings
```

The orchestration contract requires the executor to stop after this rejection and forbids trying another write mechanism.

## P1

The unverified predicate resolves with `['node', 'require']`, then classifies the runtime target:

- `.cjs` and `.node` are CommonJS.
- `.js` is CommonJS unless the installed manifest declares `"type": "module"`.
- Other targets are not CommonJS.

The installed manifest’s `type` field is reachable inside `buildStage`.

| Case | Required | Before fix |
| --- | ---: | ---: |
| `module-sync` first | `true` | `false` |
| `node` condition | `true` | `false` |
| Plain ESM-only | `false` | `false` |
| Plain dual | `true` | `true` |

The regression test reddened as required:

```text
Tests  1 failed | 21 skipped (22)
expected [ false, false, false, true, … ] to strictly equal
         [ true,  true,  false, true, … ]
exit_code=1
```

The implementation and test were edited but not rerun because the stop contract fired.

## P2

The assertion now checks that the emitted `buildStage` body contains the shipped `collectTargets(entry)` call.

Baseline before caller mutation:

```text
Test Files  1 passed (1)
Tests  1 passed | 15 skipped (16)
exit_code=0
```

The caller-mutating control was not run before the stop.

## P3

- [src/core/compilers.ts](/home/user/scaffold/src/core/compilers.ts):  
  Old: “those imports follow a published face rather than selecting the branch.”  
  New: “those imports are declared by either axis, so they do not select the branch.”

  **This entry is false and is corrected here rather than edited away.** The edit did not land. The
  file carries a graft — the replacement was spliced onto the surviving fragment `those imports
  follow a`, leaving `those imports follow a / declared by either axis`, which states nothing. Two
  audit lanes found it independently. The other two entries in this section are accurate, which is
  what made the false one invisible to a check comparing the copies against each other.

- [src/core/templates.ts](/home/user/scaffold/src/core/templates.ts):  
  Old: “those imports follow a published face rather than selecting the branch.”  
  New: “those imports are declared by either axis, so they do not select the branch.”

- [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md):  
  Old: “the imports the branch needs follow a published face rather than selecting the branch.”  
  New: “The imports the branch needs are declared by either axis, so they do not select the branch.”

## P4 and P5

P4 is not done. The sandbox rejected the owned orchestration file.

P5 is edited:

- The release-skew paragraph is wrapped.
- The browser-branch paragraph is wrapped.
- The guide assertion now uses the stable fragment “raises the question on every target materialized before it”.

## Ordered gates

The regeneration, lint, format, check, guide, template, compiler, firing-control, and width gates were not run after the stop. `host.json` remains unchanged.

An attempted full template-project reading before the stop reported the intended P1 failure plus sandbox `EPERM` failures from grandchild Node processes:

```text
Tests  7 failed | 15 passed (22)
Error: spawnSync /opt/node22/bin/node EPERM
exit_code=1
```

The Orchestrator must take the authoritative host reading.

## Unclosed work

The settling action is to grant write access to `.agents/orchestration.md`, then resume this brief from the P4 edit. The remaining work is the caller-mutating control, P1 revert control, formatting, inventory regeneration, ordered scoped gates, width check, and cleanup verification.

## Weak claim

The P1 predicate is plausible but weak until its repaired test, revert control, emitted fixed-point test, and generated distribution proof run.
---

## Orchestrator's integration note

**The unit stopped correctly, and the stop was the Orchestrator's fault.** Its sandbox refused the
grant on `.agents/orchestration.md`:

```text
patch rejected: writing outside of the project; rejected by user approval settings
```

`.agents/orchestration.md` sits inside the checkout, and a native Claude subagent wrote it earlier in
this campaign without trouble — the refusal is the codex bench sandbox's, not the tree's.
`.agents/orchestration.md` § Bench laws requires a brief assigning a bench unit a path outside the
obvious source tree to name the write limit before dispatch. This brief did not, so the unit met a
grant it could not use and stopped, which is what the contract requires of it.

**Routing fact, for every future dispatch:** `.agents/` is not writable from the codex bench sandbox.
A unit touching it goes to a native Claude writer, or the Orchestrator takes that file.

## The readings the unit could not take

**P1 is correct.** The unit edited the predicate and its test but stopped before re-running them, and
its own reading was polluted by sandbox `EPERM` on grandchild processes. On the host:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
 Test Files  1 passed (1)
      Tests  22 passed (22)
exit: 0
```

The four cases, run against the shipped predicate:

```text
  module-sync first   required=true   got=true  OK
  node condition      required=true   got=true  OK
  plain ESM-only      required=false  got=false OK
  plain dual          required=true   got=true  OK
  => all four cases hold
```

The predicate resolves under `['node','require']` and then classifies the target: `.cjs` and the
addon extension are CommonJS, `.js` is CommonJS unless the installed manifest declares
`"type": "module"`, anything else is not. It reads what the target **is** rather than which condition
names the walk visited, which is what makes it the first selector to clear both audit vectors while
keeping both controls.

**P2's caller-mutating control, taken by the Orchestrator.** The original was held outside the tree so
restoration could not fail. Replacing `collectTargets(entry)` inside the emitted `buildStage`:

```text
baseline                              Tests  16 passed (16)
caller mutated   FAIL … skips rejected package targets only while traversing fallback lists
                                      Tests  1 failed | 15 passed (16)   exit 1
restored byte-identical               Tests  16 passed (16)
```

The assertion now binds the shipped call site. Before this round the same mutation left it passing.

**Correction to this integration note.** It asserted P3's outcome from the unit's report without
opening `src/core/compilers.ts`. One of the three copies had not changed, so the note repeated a
false claim into the next round's brief, which then carried "in all three copies" as a thing to
attack rather than as a thing already known false. `.agents/orchestration.md` requires checking a
fact against the thing it describes, and where several artifacts state it, checking the code rather
than the other copies. This note checked the report against itself. The rule was landed in this same
campaign, by the Orchestrator, and broken by the Orchestrator in the round that landed it.

**P4, completed by the Orchestrator** because the bench could not write the file. The duplicated
fact-check directive is deleted and its one additive clause folded into the existing
paste-the-command bullet, which already owned the subject. The surviving rule keeps its trigger and
action and loses its explanatory consequence.

**P5's width.** Both paragraphs now wrap at or under the width their neighbours use. Two lines inside
them wrap raggedly. They are left alone deliberately: reflowing that span risks the assertion
coupling F2 identified, `test:guides` is green, and trading a gate for typography is a poor exchange.
The file's other over-width lines are pre-existing tables and fences, so a whole-file width check
answers a different question than the one this finding asked. That criterion was mis-specified in the
brief.

**`format:check` was red on arrival** — the unit's stop fired before it formatted `tests/guides.test.ts`.
Run `npm run format`, then green.

## Gates at this tree

```text
npm run build && npm run build:inventory   → staged 108 file(s) into host.json
npm run format:check = 0
npm run lint:check   = 0
npm run check        = 0
npm run test:guides  = 0
src:core templates.test.ts   22 passed
src:core compilers.test.ts   91 passed
guides   tests/guides.test.ts 16 passed
```

The whole suite, the distribution proof, and the indexeddb end-to-end reading have not run. Those
belong to the authoritative pass.
