Lane held: **subjective** (shape, vocabulary, ergonomics, design fit). I left `Constraints`, `Refusals`, and `Measurements` empty because the objective lane owns them; readings the design needs and the dispatch did not supply are named under `Tensions`.

# Design

## The boundary

**Capture is transport plus retention. Every semantic decision moves to the reader.**

The rejected candidate fused three jobs into one artifact: invoking a supported command, reshaping its output into a field-selected record, and ruling on whether the result was complete. Read the retained findings against that split. The registry identity substitution, the lost HTTP status, the flattened `dist` grouping, the renamed substrate vocabulary, the derived `termination` label, the doubled reason, and the control families that cannot reach their own class all sit in the reshaping job or the ruling job. The invoking job carries no finding in either lane. So the boundary that ends the hardening project is drawn between them: keep the invoking job, delete the other two.

A capture unit does exactly this and nothing else:

- runs one supported command with an explicit argument vector, or copies one file;
- writes the response bytes unmodified to their own file;
- writes a row naming what was invoked, from where, when, and how the child settled;
- writes nothing inside any fleet checkout, installs nothing, fetches no git ref.

It selects no field, validates no shape, compares no identity, and reports no verdict. Its own exit reports whether it wrote what it was told to write, and answers no question about any package.

This is the smallest boundary that keeps the plan's evidence obligations, because every fact the fixed scope names is present in the retained bytes, and no fact can be lost by a selector nobody has proved exhaustive.

## Vocabulary

Each term names one thing, and the record carries no second word for it.

| Term | Names |
| --- | --- |
| `capture` | One invocation or one file copy, with its retained bytes |
| `transcript` | The directory of captures taken for one checkout |
| `run` | One whole survey execution, in its own fresh directory |
| `survey` | The fleet-wide capture pass taken before the wave design |
| `visit` | The per-package pass at that package's layer turn, which the alignment plan already names |
| `reading` | A fact a person or a later unit derives from a capture, recorded separately |

Retired from the boundary, with the concept each was standing in for: `inventory` (the run), `projection` (nothing — the reader derives it), `attestation` (a reading), `snapshot` (a capture taken again), `completeness` and `valid` and `complete` (a reading, and often an owner decision).

A capture row carries the substrate's own words, unchanged from what `@orkestrel/process` publishes: `code`, `signal`, `failed`, `expired`, `aborted`, `truncated`. Nothing is renamed on the way through, so a reader holds one name per fact and can open the dependency's guide against the evidence file. A file capture carries no `code` at all; absence stays `undefined` rather than taking a sentinel.

The axis that varies is `source`, whose members are `command` and `file`. That is a real irreducible mode: one has an argument vector and a settlement, the other has a path and a digest.

## Evidence shape

One `run` directory, supplied absent by root and created by the capture:

```text
tmp/pass/<run>/
  run.json              the run's own argv, host, stamp, npm CLI path, registry argument
  <package>/
    capture.json        the transcript's rows
    manifest.json       copied bytes of the checkout's package.json
    lock.json           copied bytes of the checkout's package-lock.json
    <name>.out          one command's stdout, byte for byte
    <name>.err          that command's stderr, byte for byte
```

A `command` row carries `source`, `argv` as its own array, `cwd`, `stamp`, `code`, `signal`, `failed`, `expired`, `truncated`, the `out` and `err` file names, and a digest of each stream. A `file` row carries `source`, `path`, `stamp`, the copied file name, and its digest.

Retain whole bytes, never a field allowlist. This is the decision that closes the largest finding class at once. Runtime, development, peer, optional, `peerDependenciesMeta`, bundled, and override declarations are all present because the whole manifest is present, and no future field can be silently dropped by a list nobody updated. The registry response keeps its own `dist` grouping and its own root `name`, so an identity substitution has no place to happen. A malformed body is retained as the malformed bytes it is.

## Where each fact is captured

The plan's fixed scope splits cleanly along one line: **what the wave design consumes is captured fleet-wide once; what a layer's own install produces is captured inside that layer's visit.**

The **survey** captures, per package: the manifest bytes, the lockfile bytes, the git readings (`status --porcelain`, `branch --show-current`, `rev-parse HEAD`, `rev-parse origin/main`, `merge-base --is-ancestor origin/main HEAD`), and the registry reading through the npm CLI `view` command with the field list the Contract reading already round-tripped. That set is exactly the input to graph and version planning: declared categories in every category, the current source and main relation, and published identity with version history and distribution identity.

The **visit** captures, for the package it is visiting: the lockfile bytes again, the raw `npm ls --all --json --long` output, the on-disk manifest of each resolved `@orkestrel` path the output names, the digests of the built distribution entries present there, the replaced range before a tarball install and the restored range after, and the manifest and lock digests taken again at the end.

The reason for that assignment, and it is the load-bearing one: installed and nested state is a **product of the wave**, not an input to it. Each layer's accepted tarball changes the closure of every checkout downstream of it, so a fleet-wide installed reading taken before the wave describes a graph the wave is about to replace, and every downstream row would be re-captured anyway. Declared ranges, source relation, and registry identity do not move when a layer lands, so they belong to one simultaneous fleet-wide reading that the wave design can trust as one moment.

Nothing is dropped by that split. Every row of the fixed scope's `Live package registry`, `Artifact provenance`, and `Dependency closure` capabilities has a named capture point, and the visit's captures are the ones the plan already requires before an accepted tarball can move upward.

## Availability is not health

The capture never certifies a closure and never erases raw output.

- A nonzero `npm ls` exit is a row value. Its stdout and stderr are retained whole. Invalid, missing, and extraneous evidence inside that output is usable, and a reader takes it.
- A zero exit certifies nothing either. The capture states what was invoked and what came back, and makes no claim that the closure is the intended one.
- A registry lookup that failed is a row with its `code` and its retained stderr. It is never an invented version, and it never becomes a version the wave planner reads as absent-therefore-unpublished.
- A missing lookup, a malformed body, and a cycle each stay explicit, as retained bytes plus a reading recorded by whoever read them.

Health, order, and acceptance are readings, recorded in named reading files beside the transcript in the campaign folder — the shape `d7n-layer-contract-reading.md` already established and the shape this campaign already trusts.

## What the design reuses, and what it refuses to build

Prefer the standard npm CLI `view` command as the registry reading. It round-tripped on Contract at exit 0 with the categories, the version history, and the distribution identity retained. Pass `--registry https://registry.npmjs.org/` explicitly on every registry capture and record that argument in the row's `argv`. The configured value that read back once is a reading about that moment, not a property of the next call, and an explicit argument makes each capture self-describing when someone opens the transcript later.

Use `Upstream.catalog()` with `catalogToLayers` as **corroboration** of the published-latest and runtime-plus-peer order, never as the primary graph. The published contract carries `dist-tags.latest` with runtime and peer edges and nothing else, so it cannot answer the optional, development, or prepared-unpublished questions the plan requires, and adapting it with caller-synthesized rows would need provenance and independent verification that this boundary is trying to avoid buying. The embedded catalog table is never read as current order.

Refuse the process-supervision project outright. The honest fix for the `termination` finding is deletion, not a supervisor. The capture carries `expired`, `aborted`, and `truncated` under the substrate's names, and states in `run.json` that an expired capture's tree outcome is unobserved. An expired capture is a capture root re-runs and reads directly; it is never evidence about the package. That converts an unbounded boundary-implementation question into one sentence and a re-run.

Refuse the source-parser referral. A parser duplicating the project's own language analysis is barred, and the style question it was raised against already has an owner in lint.

## Ownership

- The capture writes only beneath the fresh `run` directory root supplies under `tmp/pass/`. It never writes into a fleet checkout.
- Primary scaffold's owner-modified `package.json` and owner-staged lockfile are read-only inputs. Their bytes are copied and digested; a digest that moves is a row and a reading, never a run failure that discards the work already captured.
- Guide and Ollama parked source candidates are read the same way and left alone.
- The capture never installs, fetches, merges, stages, or builds. A `git fetch` before a version decision is root's own recorded command, taken per checkout at that checkout's visit, as it already was for Contract.
- A layer writer gets its own clean accepted baseline, and no capture runs into a checkout while its writer is live.

## Release manifests stay registry-resolvable

A local tarball path never enters a release manifest. A tarball install is `--no-save`, and the visit's transcript records the replaced range before the install and the restored range after, so a checkout sitting on an unpublished tarball can always be restored from what the campaign kept. The version decision happens before the accepted pack, and a prepared unpublished version is retained rather than incremented because the pass resumed — the Contract candidate stands on that basis. Ruling 8's guide-publication hold is unchanged; a measured conflict between the aligned closure and that hold is written as a reading and carried to the owner before the release sequence freezes.

# Alternatives

**Repair the retained collector.** Fix the registry root identity, retain the status before decoding, replace the derived termination label, and add the missing control families. It loses on cost and on the rule that governs the seam: `.claude/rules/quality.md` § Rounds and verdicts sets the budget at three rounds against one seam and directs the next unit to be a ruling on the boundary rather than a fourth repair, and this seam has reached it. Each repair also adds surface that needs its own control, and the control families the objective lane bounded show that the excluded classes grow with the projection rather than shrinking. The repair buys a record that is smaller to read and pays for it with a hardening project that has no stated close condition.

**Reduce the collector to its projection-free core but keep its verdict.** Drop the field selectors, keep `evaluateCompleteness`, the `complete` boolean, and the exit code. It loses on the first required decision of this brief. A completeness verdict over a closure the capture cannot see is exactly the silent certification that must not exist, and its false value is the mechanism that turns usable invalid-and-missing evidence into a run somebody discards. Keeping the verdict also keeps the reason plumbing, which is where the duplicated-reason and empty-reason findings live.

# Constraints

Objective lane.

# Refusals

Objective lane.

# Measurements

Objective lane. Readings this design needs that the dispatch did not supply appear under `Tensions`.

# Units

| Unit | Role and engine | Owns | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| `d7n-capture-probe` | Orchestrator, host-executed; retained as its own pair | The probe log under the campaign folder | Nothing | The `npm ls --all --json --long` argument vector and the `npm view` argument vector each run once on one checkout through the absolute Node and npm CLI entries, with the explicit registry argument; the log retains argv, code, elapsed reading, and output size. First use of a flag combination happens here, never inside a dispatched unit. |
| `d7n-capture-survey-instrument` | `builder`, Sonnet/Terra; authoring only, no execution | `tmp/pass/layer-capture.mjs` and its controls | `d7n-capture-probe` | Spawns only through `@orkestrel/process` with an argument vector and shell disabled; retains whole bytes per capture; selects no field; carries no completeness verdict and no health exit; writes only beneath the supplied absent run directory; its controls are root-run against the exact shipped file with the red reading tied to that file's own line numbers. |
| `d7n-capture-survey-run` | Orchestrator-executed, tracked and capped; `checker` on the ladder from `grok` reports the mechanical evidence | The run directory | `d7n-capture-survey-instrument` | Every population member has a transcript directory; every expected capture row is present with its `argv`, `code`, and stream digests; no fleet checkout's tracked status moved. The checker reports rows and paths, and rules on no package. |
| `d7n-graph-reading` | `orkestrel`, Sonnet/Terra; read-only | The reading file under the campaign folder | `d7n-capture-survey-run` | Derives the runtime, peer, and optional order from the retained manifest bytes, and the tooling prerequisite order separately; names every cycle, every failed lookup, and every malformed body explicitly; cites the capture row behind each fact; infers no order from the embedded catalog table. |
| `d7n-wave-design` | `analyst` on Sol and `planner` on Opus, blind, clean contexts | Proposals only | `d7n-graph-reading` | Both lanes run on one brief over the measured transcript, including the unresolved tooling cycles; root reconciles. |

The visit-time captures get no instrument unit. They belong inside each layer visit, taken by the visit and retained with it, because they describe the state that visit created.

# Tensions

- **Whole-byte retention over field selection.** I ruled for retaining whole manifests, whole lockfiles, and whole `npm ls --all --json --long` output. The dispatch supplied no reading of that output's size or elapsed time on any checkout in this fleet, and no reading of whether `npm ls --all` settles within a bound where `node_modules` is absent or partial. That reading is what `d7n-capture-probe` exists to take, and it is the one input that could move this ruling.
- **Splitting installed, lock, and nested captures to the visit.** The objective lane may argue the wave design needs current installed state to size its own work. My ruling is that it needs declared ranges and registry identity, and that installed state read before the wave describes a graph the wave replaces. Root rules if the lanes disagree.
- **Deleting the termination field rather than observing a tree outcome.** No failed `taskkill` reading and no surviving-descendant reading was supplied, and I do not treat the audit's hypothetical interleaving as run. I ruled on honesty rather than on the hypothetical: a field that claims a tree outcome the substrate does not deliver must not exist, and an expired capture is re-run by root.
- **The npm CLI `view` command as the primary registry reading, with `Upstream.catalog()` as corroboration.** The dispatch supplied a live `view` round trip for one package only, and no live reading of the organization membership call. Fleet completeness of the registry path is unmeasured.
- **The red-line-number claim.** I carry no conclusion that changed line numbers prove changed control semantics, and I do not carry the source-parser referral at all. What I carry forward is only the process consequence: a control whose red reading cannot be tied to the shipped file is not evidence, so the capture's controls are root-run against the shipped file.
- **Reading the retained bytes without a shared reader.** I ruled that each consuming unit reads the transcript for its own question rather than importing a shared reader module. That is a deliberate cost, and the objective lane may hold that it invites divergent readings of the same output.
- **Readings the dispatch did not supply.** No elapsed or size reading for `npm ls --all --json --long` anywhere in this fleet; no reading of which checkouts hold an installed `node_modules` at all; no fresh `git fetch` relation for any package other than Contract; no live organization membership reading; no reading of whether the sibling guide installation's declarations agree with the isolated build's declarations.

# Risks

- **The reader becomes the projection framework by the back door.** Someone writes a shared parser over the transcript and the deleted job returns under a new name. Evidence that settles it: the graph reading unit's own diff, checked for whether its reading code stayed inside the unit that asked the question.
- **The transcript is unreadable at fleet scale.** Whole `ls --all` output per package may be large enough that a person cannot open it, which pushes work back toward a projection. Evidence: the probe's output-size reading on one representative checkout.
- **A capture straddles a moving checkout.** Another session moves a manifest or a lockfile mid-run, and the fleet-wide reading is not one moment after all. Evidence: the digests captured at the start and the end of each transcript, read against root's own knowledge of which owner edits were live.
- **Cached `origin/main` misleads a version decision.** A survey capture reads a stale relation, and the visit's version choice rests on it. Evidence: root's own `git fetch` and re-read per checkout immediately before that checkout's visit, as already done for Contract.
- **A registry capture succeeds while returning something other than what the reader assumes.** Retention removes the substitution defect, but a reader can still misattribute a field. Evidence: the reading file cites the capture row and the file name behind each fact, so a wrong attribution is checkable against the retained bytes.
- **A layer visit's tarball install leaves a checkout unrestorable.** Evidence: the replaced-range row written before the install and the restored-range row written after, in the same transcript.
- **The visit's captures diverge in shape from the survey's.** Two shapes for one concept is the defect this design exists to remove. Evidence: the visit writes capture rows in the same shape, and the checker reads both against the same row description.
