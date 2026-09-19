# Unit D1 — audit verdict

Round one, 2026-09-17. Subject: unit D1's whole diff against `53d4a58e` —
`tests/config.test.ts`, `tests/distribution.test.ts`, and `host.json`. Written by Opus 5.

**Ruling: REJECT. A fix round is owed before this change can be accepted.** Both lanes rejected
independently and neither asked for the mechanism to change. The split at the case's seam stands and
is not reopened. What blocks acceptance is the pivot predicate, a shipped comment whose central claim
is false in the workspaces it addresses, and a contaminated measurement in the retained record.

The changed file is vendored. `tests/config.test.ts` ships as `dist/host/tests/config.test.ts` and
reaches every target through `repair`, so each defect here would propagate on the next release.

## Lanes that ran

| Lane       | Role and engine                                            | Verdict | Report                              |
| ---------- | ---------------------------------------------------------- | ------- | ----------------------------------- |
| Subjective | `reviewer` — Opus 5, native subagent, clean context         | REJECT  | `d1-audit-subjective-report.md`     |
| Objective  | `analyst` — GPT-5.6 Sol through the Codex bench, read-only  | REJECT  | `d1-audit-objective-report.md`      |

Both lanes read the same numbered claims at `d1-audit-claims.md`, in clean contexts, blind to each
other. Opus 5 wrote the work, so the objective lane went to Sol, which is an engine that did not
write it. No lane was substituted.

Bench provenance: journal `tmp/codex/d1-analyst.jsonl`, thread id
`01a0afaa-6555-7552-866f-7c6b20600f84`, terminal event `turn.completed`. The journal is swept with
`tmp/`; the provenance is recorded here because it does not survive that sweep.

No `checker` ran. The acceptance criteria were gate results and file contents rather than counts,
paths, or parity rows, and both lanes re-derived every number they ruled on.

## Where the lanes disagreed, and how it was settled

**Claim 4 — the skip measurement. The subjective lane refuted it; the objective lane confirmed it.
The Orchestrator settled it against the evidence, and the subjective lane is right.**

`d1-skipreport.log.txt:4` names the measured workspace
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d1-skipreport/generated` — materialized inside
the subject checkout. Lines 6 and 10 of that log show the case `rolls one face into a single
declaration and rewrites its core specifier` running and emitting API Extractor output. That case is
`it.skipIf(extractorPath === undefined)`, so `@microsoft/api-extractor` resolved there — reached by
Node walking up into the parent checkout's `node_modules`.

A genuine app-only workspace does not resolve it. `d1-red.log.txt:35-40` measures one in the
operating system's temporary directory and reports `1 failed | 170 passed | 2 skipped (173)` before
the fix; two skips there means the extractor was absent.

So the post-fix counts in an uncontaminated app-only target are `171 passed | 3 skipped (174)` — two
more skips than this checkout, not one. The objective lane read the probe's totals without reading
the extractor output above them and took a contaminated workspace as representative.

What survives claim 4: the case skips rather than passing vacuously, and the skipped count rises.
The numeric relation D1 reported does not hold, and the Orchestrator repeated it before this round
corrected it.

**Claim 9 — the red's chronology. The subjective lane confirmed it; the objective lane left it
`UNSETTLED`, and the objective lane's reasoning is the stronger one.** `npm pack` reads staged
`dist/host` bytes, so a stale build could produce the same red after a source edit had already
landed. The retained record does not settle the order. This does not reopen the fix — the red names
a case title that exists nowhere in the tree, which is strong evidence it predates the split — but
the proof is weaker than D1 claimed and the fix round records the chronology explicitly.

**Claim 11 — scope. The subjective lane could not settle it and correctly refused to rule.** Its two
status sources disagreed. Resolved by the Orchestrator against the live tree: HEAD `53d4a58e`, with
`host.json`, `tests/config.test.ts`, and `tests/distribution.test.ts` modified and nothing under
`src/`. The contradicting evidence was the stale session-start git snapshot the harness injects into
every subagent context, which still reports HEAD `d6ef2689` and seven modified `src/` files from the
start of the session. This is the second time in this campaign that snapshot has reached a lane and
produced a false scope allegation.

## Findings carried to the fix round

Ordered by severity. Both lanes reached the first one independently, from different directions, and
together they make it the blocking finding.

| Finding | Lane | What is wrong |
| ------- | ---- | ------------- |
| The `published` predicate is wrong in substance | Objective F-1, HIGH | `existsSync(resolve(root, 'src'))` accepts a regular file, an empty directory, and a directory holding no recognized environment. `src/bin/helpers.ts:899-903` derives the axis from physical `src/core`, `src/browser`, or `src/server` directories and `src/core/compilers.ts:278` defines publishing as `blueprint.src.length > 0`. On this case-insensitive host `SRC` also resolves. A private workspace carrying an unrelated `src` entry still fails with `The workspace declares no face project` |
| `published` is also the wrong name | Subjective 1 | The file already calls this fact `publishes` at `:541` and `:637`, and `src/core/compilers.ts` at `:278` and `:519`. One concept now carries two identifiers differing by one letter, which `AGENTS.md` § Design laws forbids |
| The skip comment claims an outcome the reporter does not deliver | Subjective 2 | `:2161-2163` says a skip "reports that absence in the run". Every generated workspace runs `--reporter=dot` per `src/core/compilers.ts:282`, so the skip prints as an unnamed `-`. This is the sentence that justified skipping over guarding, and it is the one claim a target reader can check against their own output |
| Shared install scenarios are declared inside a test file | Objective F-2, MEDIUM | `tests/distribution.test.ts:143-266` declares the reused `installPackedScaffold` and `installGeneratedWorkspace` locally. `AGENTS.md` requires reusable logic exported from its centralized home and `.claude/rules/tests.md` requires a test file to import shared infrastructure rather than declare it |
| `installGeneratedWorkspace` returns the wrong value and leaks its path convention | Subjective 3 | It fixes the materialization directory internally and returns only an environment, so both callers repeat the `'generated'` literal and one re-parses a manifest the helper already parsed |
| A case comment states a reason false for its own readings | Subjective 5 | `:2213-2214` says every reading is decided by the text or the value handed to it. False for `packageManifestName` at `:2260`, `readCompilerOutput` at `:2230`, and `createRequire(...).resolve` at `:2267`. The conclusion holds; the reason does not |
| The two case names disagree and the second undersells its contents | Subjective 4 | `:2164` ends "a declaration roll-up requires" and `:2217` ends "a roll-up requires". The second omits the `parseProjectScope` refusals, the compiler refusal, `isStringList`, and `isExtractorModule` |
| Added comments use a prohibited word | Objective F-3, LOW | `here` appears at `tests/config.test.ts:2213` and `tests/distribution.test.ts:142`, `179`, `181`, `1060`, `1071`, `1098`. `.claude/rules/writing.md` bans it as an ambiguous reference |
| A vendored sentence inverts its actor | Subjective 6 | `:68-69` — "must still fail it" parses with the axis as subject and `it` attaches to either the proof or the defect |
| A comment states a past-state claim the case beneath it makes false | Subjective 7 | `tests/distribution.test.ts:1059-1060` says nothing here has ever run the vendored set against such a workspace, directly above the case that does |
| The blocked-plan diagnostic changed | Objective, claim 7 | `The generated proof blueprint was blocked` became `The generated blueprint was blocked`. No assertion was dropped or weakened; the refutation is limited to observable diagnostics |
| The retained skip instrument is contaminated | Both, by reconciliation | `d1-instruments/d1-probe-skipreport-3.sh:6` materializes under the subject tree. Re-take in the operating system's temporary directory |

## Findings recorded, not carried

- **The blueprint's coverage limit is unstated** (Subjective 8). `app: ['core', 'server']` exercises
  the axis-level defect and an `app: ['browser']` workspace takes the same branch, so the population
  is covered. What is unproven is a browser-carrying workspace's gate chain, which vendors
  `configs/browsers.ts` and registers Playwright projects this blueprint never materializes. Name the
  omission beside the case rather than widening the proof.
- **`blueprint: string` is a source expression, not a blueprint** (Subjective 9). A recommendation.
- **The gate list at `tests/distribution.test.ts:1101` is a literal** (Subjective R3), so a removed
  gate script reddens and an added one is silently not run.
- **Nothing committed distinguishes the skip from a vacuous pass in an app-only target**
  (Subjective R1). The objective lane ruled no finding, because the scope case still runs in every
  publishing workspace including this checkout and the generated core/server case. Reconciled as the
  objective lane ruled: the scope reading is proven where it applies. The gap is that no target's own
  gates can tell the two apart, which is low severity and recorded here rather than carried.

## Dropped on the record

- **The skip condition's case-folding** as a defect in its own right. The subjective lane ruled the
  folding applies equally to the wrapper probe, so the readings stay consistent. The objective lane
  raised it inside F-1, where it is carried. It is not a separate finding.
- **Collection-time evaluation.** Both lanes ruled no defect: `root` is per-module-instance and a
  generated workspace runs its own vendored copy in its own process.
- **The count and case-name change breaking a consumer.** Both lanes searched and found no fixture,
  golden digest, expectation, generated manifest, or committed script reading the old name or the old
  total.
- **A target reddening on the change rather than on the defect.** Both lanes ruled none exists.

## Deviations this round

- **The stale session-start git snapshot reached the subjective lane's context** and reported a HEAD
  and a modified-file set from the start of the session. The lane ruled `UNSETTLED` and asked for a
  re-capture, which is the correct handling. Second occurrence in this campaign.
- **The objective lane could not run the distribution project.** Its sandbox denies the nested
  install and the spawned workspace the case requires, and Vitest additionally failed writing
  `node_modules/.vite-temp` under a read-only sandbox. The lane named the blocked command and ruled
  from source and the retained logs, which is the required handling.

VERDICT: REJECT — the mechanism stands; a fix round carries the findings in the preceding table.
