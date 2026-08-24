Unit PD6 complete, with one deviation reported and carried on from (it is outside the owned files).

## Touched files

- `/home/user/orkestrel/probe/guides/probe.md` — every landed ruling's prose, each sentence verified against the landed code; the `relativeWorkspaceMessage` row that closes the parity gate.

No other file touched. No commits.

## Per-ruling sentences, with the code each was checked against

### Ruling 1/5 — deadlines and destroy

| Guide | Sentence | Verified against |
| --- | --- | --- |
| `guides/probe.md:787-794` | **The budget is not the ceiling** — the deadline fires on the host's event loop; a language service checks one candidate synchronously; the type stage yields at each candidate boundary, so an overrun is bounded by the budget plus the longest single language-service call. | `src/server/Probe.ts:441-458` (`#bound` races `createTimeout`), `src/server/Probe.ts:543-564` (`#expiry` rejects from an `abort` listener, an event-loop task), `src/server/stages/TypeStage.ts:255-258` (`#unblock`), `:147,150,166,182,201` (the yield sites) |
| same | The lint stage's exchanges cross a child process and the runtime stage's run happens in Vitest workers, so neither holds the loop. | `src/server/stages/LintStage.ts` drives a child over LSP; `src/server/stages/RuntimeStage.ts:316` (`pool: 'threads'`) |
| `guides/probe.md:779-782` | Caller-named project resolution shares the type stage's admission order, so a resolve never runs between two of one inspection's own candidate checks. | `src/server/Probe.ts:504-513` (`#admitType`), used at `:390` and `:516`; pinned by `tests/src/server/Probe.test.ts:872` |
| `guides/probe.md:820-834` | **Stage teardown is bounded, and each stage is bounded by something different** — the lint stage waits 2 s per LSP exchange then signals the child; the type stage holds no bound and disposes directly, and cannot cut short a language-service call already running; the runtime stage holds no bound, so `Probe.destroy` races each teardown against `ProbeOptions.deadline` and proceeds; what an abandoned tool holds it holds until the process ends. | `src/server/stages/LintStage.ts:51` (`#deadline = 2_000`), `:114`; `src/server/stages/TypeStage.ts:208-220`; `src/server/stages/RuntimeStage.ts:252-282`; `src/server/Probe.ts:566-594` (`#destroy` / `#destroyStage`). Pinned by `tests/src/server/Probe.test.ts:1409-1484` and `tests/src/server/stages/LintStage.test.ts:681-721` |
| `guides/probe.md:213` | `StageInterface.destroy` no longer claims a per-stage local bound; it points at `## Lifecycle`. | same |

### Ruling 2 — relatedness

| Guide | Sentence | Verified against |
| --- | --- | --- |
| `guides/probe.md:539-545` | `prove` compares the control against the case byte for byte — every candidate draft paired by position, and the test — and refuses a control that repeats all of them with `origin: 'claimant'`, `code: 'refused'`, before any stage inspects the claim. Varying `stage` or `reason` alone does not admit it. | `src/server/Probe.ts:622-637` (`#admit`), called at `:135` ahead of `#ready()` at `:136`. Pinned by `tests/src/server/Probe.test.ts:242` |
| `guides/probe.md:351` | `claimant`/`refused` row gained `a control repeating the case's candidate drafts and test byte for byte`. | same |
| `guides/probe.md:205` | `prove` "Throws when the control repeats the whole case, and when a stage cannot start." | same |
| `guides/probe.md:623-630` | probe applies no relatedness rule; the one control it refuses is the whole-case repeat, and that refusal answers nondeterminism rather than relatedness. **Judging a control against its case is the reader's obligation.** | `src/server/Probe.ts:609-637` is the only admission refusal in `prove` |

### Ruling 3 — re-warm

`guides/probe.md:770-777` — **A failed warm is not permanent.** The runtime stage clears its Vitest slot when the warm rejects, so the fault reaches the caller as `origin: 'workspace'`, `code: 'malformed'`, naming `vite.config.ts` in `context`; the next `inspect` finds the slot empty and warms fresh; one call never loops through a second warm; a warm that succeeded is kept.

Verified against `src/server/stages/RuntimeStage.ts:654-660` (`#store` clears identity-checked), `:625-637` (`#runner`), `:335-344` and `:662-673` (`#configuration`). Pinned by `tests/src/server/stages/RuntimeStage.test.ts:1228-1296` (`refuse-warm` sentinel: refusal, then recovery after removal).

### Ruling 8 — fsModuleCache

`guides/probe.md:631-638` — the overlay is the only thing serving a candidate's bytes; **measured on 2026-08-24, the string `fsModuleCache` appears nowhere in the installed `vite@8.2.2` tree**, so there is no such option to set and none to defeat; the standing guard is the runtime stage's serve detection rather than a version pin.

Measurement: `grep -rln "fsModuleCache" node_modules/vite/` returned nothing; `vite` version read from `node_modules/vite/package.json` is `8.2.2`.

### Ruling 9 — realpathSync

`guides/probe.md:664-674` — the walk and the write are separate calls; **the final component is closed** (probe creates every file it puts in a target with the `wx` flag, which fails rather than following a link or overwriting a file that appeared after the walk; an unlink names the final component itself); **a directory component is open** (Node exposes `O_NOFOLLOW` and no descriptor-relative call to apply it through).

Verified against `src/server/helpers.ts:59-121` (`resolveWorkspaceFile` mutating walk), the `wx` creates at `src/server/stages/RuntimeStage.ts:454-457` and `src/server/Probe.ts:287-302`, and a Node probe on v22.22.2: `fs.constants.O_NOFOLLOW === 131072`, no `openat`-style entry in `fs`.

### Ruling 10 — revision suffix

`guides/probe.md:798-801` (Revisions) — the fresh path never reaches a caller: a test reading its own filename, through `import.meta.url` or a frame in a failure it raised, reports the path the claim declared, because the stage rewrites the exact basename it generated back to the declared test's basename in every message.

Verified against `src/server/stages/RuntimeStage.ts:892-896`. Pinned by `tests/src/server/stages/RuntimeStage.test.ts:272-296`.

### Rulings 6/7 — issue party, message hygiene, overlay query, serve detection

| Guide | Sentence | Verified against |
| --- | --- | --- |
| `guides/probe.md:178` | `relativeWorkspaceMessage` row inserted after `relativeWorkspaceFile` in source order (the PD5-FIX text). | `src/server/helpers.ts:229-251` |
| `guides/probe.md:219` | `TypeStageInterface.inspect` now says a file-less diagnostic "reports a `workspace` issue for an inferred one" (was `instrument`). | `src/server/stages/TypeStage.ts:442-455` |
| `guides/probe.md:291-297` | The `workspace` list gained the inferred-project case and the workspace-served-module case; the `instrument` list gained the module probe's own loader received and did not resolve. | `src/server/stages/TypeStage.ts:450-454`; `src/server/stages/RuntimeStage.ts:568-574` |
| `guides/probe.md:302-309` | **A diagnostic naming no file belongs to whoever chose the project** — caller-named throws `claimant`/`refused`; an inferred project reports `workspace` against that project path. | `src/server/stages/TypeStage.ts:442-455`. Pinned by `tests/src/server/stages/TypeStage.test.ts:174-215` |
| `guides/probe.md:311-316` | **Every message a stage reports is rendered in the workspace's own terms** — the three root spellings removed, only where a path begins; the runtime stage removes one further name by exact basename. | `src/server/helpers.ts:236-249`; `src/server/stages/RuntimeStage.ts:892-896` |
| `guides/probe.md:709-717` | New `## What the runtime overlay serves`: the runtime stage runs a generated sibling and overlays only `Case.files`; the type stage records the declared test alongside every candidate. | `src/server/stages/RuntimeStage.ts:166-170,193`; `src/server/stages/TypeStage.ts:159-160` |
| `guides/probe.md:719-724` | **A query is stripped for the lookup and kept for the transform** — resolution cuts at the first `?` and hands the suffix back; `?raw` imports the candidate's text as a default export. | `src/server/stages/RuntimeStage.ts:380-398`, `:400-422`. Pinned by `tests/src/server/stages/RuntimeStage.test.ts:799-829` |
| `guides/probe.md:726-730` | **A bare specifier is Vite's to resolve** — the resolver declines a specifier neither relative nor absolute; the loader still runs first on the resolved id. | `src/server/stages/RuntimeStage.ts:384-385`, `:408-413` |
| `guides/probe.md:732-742` | **A covered module served by anything else is reported rather than passed over** — reachability from the generated specification bounds the reading; `workspace` when probe's loader never received the id, `instrument` when it received and did not match. | `src/server/stages/RuntimeStage.ts:532-577`. Pinned by `tests/src/server/stages/RuntimeStage.test.ts:832-870` |

## Validation evidence

```
npx oxfmt --config .oxfmtrc.json --check guides/probe.md
  All matched files use the correct format.   (exit 0)

npm run test:guides
  RUN  v4.1.11 /home/user/orkestrel/probe
  ·············
  Test Files  1 passed (1)
       Tests  13 passed (13)
    Duration  4.95s
```

Red before the unit, on the same command:

```
FAIL  |guides| tests/guides.test.ts > guides parity > documents every public export, and publishes every documented name
-   "relativeWorkspaceMessage"
 ❯ tests/guides.test.ts:208:43
  Tests  1 failed | 12 passed (13)
```

## Writing sweep of my own edits

Pattern, run over the added non-table lines of `git diff -U0 guides/probe.md` (path: `guides/probe.md`):

`(?i)(should|simpl|easy|easier|easiest|\bjust\b|currently|\bnow\b|\bnew\b|latest|utiliz|leverag|\bvia\b|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|\bsince\b|\bonce\b|please|sanity|dummy|blacklist|whitelist|\bmaster\b|\bslave\b|\bensure|guarantee|\bwe\b|\bour\b|let's|\babove\b|\bbelow\b|\bhere\b)`

One hit, ruled permitted: `guarantee` at `guides/probe.md:673`, in "Read the physical guarantee as covering…". It names the passage's pre-existing scope noun ("physical-containment guarantee") and narrows it, rather than claiming behaviour. A second sweep for counts (`both|three|two|worst|best|most`) found four hits, all corrected: "the two sides" → "the control against the case"; "binds the two together" → "binds the case and the control together"; "the worst overrun a caller sees is" → "an overrun is bounded by"; "not the same across the three" → "differs per stage".

Unchanged rows re-padded by `oxfmt` carry pre-existing hits (`releaseListeners`: "since its capture"). Not mine, not touched.

## Diffstat and status

```
 guides/probe.md | 243 +++++++++++++++++++++++++++++++++++++++++---------------
 1 file changed, 177 insertions(+), 66 deletions(-)
```

```
 M guides/probe.md
```

## Deviations

**One, and it is not closable from the owned files.** Ruling 2 obliges the guide to state relatedness as the reader's obligation "with an end-to-end unrelated-control-earns-receipt proof". No such proof exists in the suites this chain landed.

- Expected: an executed assertion that a clean case paired with an *unrelated* broken control mints a receipt.
- Found: `tests/src/server/Probe.test.ts:155-238` is the receipt pin, and every control there carries the case's own test and a mutation of the case's own candidate at the same path (`clean`/`broken` both at `src/core/probe-receipt.ts`). `grep -rn "unrelated" tests/` returns only `helpers.test.ts:444`, `helpers.test.ts:571`, and `core/helpers.test.ts:402`, none of which drive `prove`. PD4-FIX's own report enumerates its pin's cases and lists no unrelated-control receipt.
- Consequence: the guide sentence at `guides/probe.md:623-625` — "a caller can pair a clean case with unrelated broken code and satisfy every receipt condition" — is a behavioural claim with no assertion that would break if it went false. `.claude/rules/documentation.md` § Parity demands one.
- Done vs not done: every other ruling's prose landed and the gate is green. I did **not** soften that sentence, and I did **not** add a proof — `tests/src/server/Probe.test.ts` is off-limits to this unit.
- Hypothesis: PD4's brief scoped the identity refusal and the `Claim` remark, and the ruling's other half — the proof that the admitted unrelated control still earns its receipt — had no named carrier.

Exact patch for a successor unit that owns `tests/src/server/Probe.test.ts`: add a case to the existing receipt pin whose control names a different candidate path and a different test path from the case's, assert `receipt` is defined on the returned verdict, and name the test for what it proves (an unrelated control earning a receipt), not for the ruling number.

Two further report-only findings in off-limits files, neither blocking:

1. `src/server/stages/RuntimeStage.ts:90-92` carries the same physical-containment sentence pair the guide just narrowed ("A concurrent process that mutates a path component between the final inspection and the write is outside that guarantee"). Ruling 9 says "The remarks and guide say exactly that"; the guide half landed here, the remark half did not. Patch: replace those two lines with the narrowed claim — the final component closed by `wx` exclusive creation, a directory-component swap open because Node exposes no descriptor-relative no-follow traversal.
2. The lint stage's 2 s bound and the coordinator-bounded runtime teardown are pinned (`LintStage.test.ts:681-721`, `Probe.test.ts:1409-1484`), but the type stage's uninterruptible-call limit — the guide's "an overrun is bounded by the budget plus the longest single language-service call" — has no executed assertion measuring an overrun. Its mechanism is pinned indirectly by the yield sites and the expiry tests at `Probe.test.ts:713` and `:774`. I left the sentence as the ruling states it rather than softening it.