# Reconciliation — the pre-publication round

Three lanes ran on one brief and its successor, in clean contexts, blind to each other, plus a
read-only coverage sweep. **All three returned FAIL.** Publication is blocked.

| Lane                | Engine        | Terminal line                                                       |
| ------------------- | ------------- | ------------------------------------------------------------------- |
| Subjective          | Opus 5        | FAIL — 4 broken, 1 unresolved, 5 findings outside the claims        |
| Objective           | Opus 5        | FAIL — 4 broken, 0 unresolved, 2 findings outside the claims        |
| Objective           | GPT-5.6 Sol   | FAIL — 1 broken, 1 unresolved, 1 finding outside the claims         |

Sol held the objective lane on its own engine for the first time in this campaign. The Opus
objective lane ran beside it rather than being replaced, so the round carries two independent
objective readings and their disagreements are evidence rather than noise.

## Where every lane agrees

**Claim 2 is broken.** A published subpath whose entry resolves no `.d.ts` is dropped by a bare
`continue` at `src/core/templates.ts:1368`. It receives no runtime test, no declaration comparison,
and no place in the module-resolution compile, and nothing records that it was skipped. Under
`--mode release` the run reports success for a subpath it never measured. Three engines found this
by three routes; it is not in dispute.

The objective lane found a second door into the same class, measured on a real copy of
`@orkestrel/indexeddb` carrying the core-only variant: `4 passed | 2 skipped` under `--mode release`
with the browser entry never imported, bundled, or loaded. `entry.browser` is true, both Node cases
skip on `it.runIf(!entry.browser)`, and the core-only variant emits no browser block at all. The
branch is chosen at generation time — `src/core/compilers.ts:1302` — and presence ownership means no
verb ever rewrites the file, so a workspace that later publishes a browser face keeps a proof that
cannot see it and audits as aligned.

## Where the lanes disagree, and the ruling

**Claim 5 — Sol CONFIRMED, Opus objective BROKEN. Opus wins.** It produced the failing input: a
blueprint with `global: true` seeds `tests/setupGlobal.ts` with `export function setup(): void {}`,
33 bytes, because `ARTIFACT_TEMPLATES.tests.global` is not the empty seed. The question fires on a
freshly materialized workspace and is live on `mcp` today. Sol did not test that shape. The comment
the filter rests on, and the guide sentence repeating it, are both false.

**Claim 14 — Sol CONFIRMED, both Opus lanes BROKEN. Both are right about different questions.** Sol
ruled on the implementation, which behaves as it should. The Opus lanes ruled on the wording: the
claim and the shipped in-file comment say the assertion detects "an extractor that narrows over what
a declaration prints", and the objective lane measured that a rule keeping only a tenth of each
declaration's fenced bodies drops 172 of 188 claim lines while `printing` does not move. The code
stands; the sentence describing it does not.

**Sol's finding versus the Opus objective lane's reading. Sol wins, and this is the round's clearest
argument for the cross-engine split.** Both lanes drove an empty `scripts` region through
`replaceManifestScripts`. Opus saw it refused and recorded that as correct behaviour. Sol read the
contract: `src/core/types.ts:140` states "An absent script is always writable and needs no entry in
`accepted`", and the refusal at `src/core/compilers.ts:1896` contradicts it. The Orchestrator
verified the type's wording. Same evidence, opposite conclusions, and the one that read the contract
was right.

**Claim 11 — subjective BROKEN, both objective lanes CONFIRMED.** They tested different candidates.
The objective lanes rejected reference coverage, import-without-throwing, and the no-`describe` law,
each for a measured reason. The subjective lane proposed a reachability assertion — every
`tests/**/setup*.ts` is named by the root configuration or imported by a non-setup file — and
measured it green across every checkout, 50 modules with none unreachable. That candidate was not
tested by either objective lane. The narrow ruling that satisfies all three is that the **guide's
categorical sentence** asserts a whole space from one sample and must be narrowed to what was
measured; whether to adopt the assertion itself is a successor question, not this release's.

## What the coverage sweep found

Grok swept the chain for behavioural changes no claim names and returned exactly one:
`#projectQuestion` now audits the manifest **as a write would leave it**, projecting the disk text
through `replaceManifestScripts` before judging Vitest-project reachability. That was a deliberate
and necessary change, and no claim attacked it. It is a claim for the successor brief.

The sweep names its own bound: it did not walk the complete unified diff, the per-file test diffs,
or the vendored inventory.

## Carried to fix units

| Finding                                                                    | Unit  |
| -------------------------------------------------------------------------- | ----- |
| `appBrowser()` reds every `app/browser` workspace on its own `npm test`     | FIX-A |
| Untyped subpath silently dropped; core-only proof blind to a browser face   | FIX-B |
| Setup question fires on the seeded global module; remedy names one file     | FIX-C |
| The W7 comment and claim over-state the assertion's coverage                | FIX-D |
| Guide: "the one proof scaffold writes"; the empty-seed sentence; the        | FIX-E |
| categorical setup sentence; the presence-ownership table's missing row      |       |
| An empty `scripts` region is refused against its own contract               | FIX-F |

## Recorded, not carried

A hard-linked checkout is refused as carrying no readable manifest, pre-existing on `origin/main`.
`overwrite --offline` exits 1 after a successful write because its catalog step refuses the flag,
also pre-existing. Both are recorded in `propagation-offline-evidence.md` for the change that owns
them.
