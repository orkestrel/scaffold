# Debrief of the fleet wave of 2026-10-29

The record the `orkestrel-debrief` round reads for the wave `.orkestrel/plan.md` records. The user ruled the round focused on 2026-10-30: a process retrospective and an instruction-set audit over this wave's record, the refinements landed in scaffold's canon, a scaffold release, and the folder retired on the user's go-ahead. Fleet-wide artifact audits and field passes are out of scope; each package's realignment unit and its review covered its own artifact.

## Evidence

- The campaign folder: `.orkestrel/plan.md` (§ Deferred, § State, § Renames, § Scaffold release), `.orkestrel/ledger.md`, and `.orkestrel/release.md`.
- Commit messages in scaffold and in each catalog package; the ledger names each carrier.
- Observations with no tracked artifact carry their date and the reading taken.

## Process retrospective

Each row is a candidate finding. The bucket column is ruled after the instruction-set audit.

### Release mechanics

| Id | Finding | Evidence |
| --- | --- | --- |
| R1 | A name two packages add within one wave collides unseen: each package's `surface` rule reads the guides scaffold's release vendors, so the collision surfaced only at scaffold's own build after L7, and closing it cost a cascade of six republishes and three publish batches. | `.orkestrel/plan.md` § Deferred, row "A wave's added names escape the `surface` rule"; reason `fe79ae1`; `.orkestrel/release.md` cascade rows |
| R2 | Scaffold's runtime dependencies on fleet packages pin the previous fleet, so every consumer that installs scaffold as a development dependency nests the newer copies its own runtime dependencies pull, and a check that reads the installed topology fails. agent's tools study refused ollama's nested process copy until scaffold 0.0.114 pinned process 0.0.16; study's own fixture had to keep nested roots distinct. | agent `912293d2` and `a0de2686` messages; study `7e7b061` |
| R3 | Right after a publish, `npm install` can 404 on the tarball while the packument already names the version; each case cleared on one rerun minutes later. | L1 checkouts on 2026-10-30 after contract 0.0.20; terminal at L3 |
| R4 | `window.ts --publish` reported `unconfirmed` for interpret 0.0.18, reason 0.0.15, qualifier 0.0.18, ollama 0.0.27, and scaffold 0.0.114, each served at one later `--confirm`. The Orchestrator pushed scaffold's `main` once before that confirmation, against the brief's push-after-serve order. | `.orkestrel/ledger.md` publish rows; scaffold push of 2026-10-30 at `416d329ac` |
| R5 | `npm ci` before scaffold 0.0.114's release chain failed `EPERM` unlinking `node_modules/@oxlint/binding-win32-x64-msvc/oxlint.win32-x64-msvc.node`, which three idle `node.exe` processes the wave did not launch held (read with `tasklist /M` on 2026-10-30), after it had removed most of `node_modules`. `npm install` from the unchanged lockfile rebuilt the tree. | scaffold `416d329ac`; observation of 2026-10-30 |
| R6 | A build that `stageHost` refuses leaves no `dist/host`, and the `catalog` verb refuses without one, so the local verb cannot refresh the guide mirror that clears the refusal. The published scaffold's CLI, installed in a scratch directory, ran the refresh. | observation of 2026-10-30; scaffold `ee24cf29b` |
| R7 | The wave ran on untracked hand tools: a layer preparation script, a chain-plan writer, a release-row writer, an MCP handshake driver, and acceptance and commit scripts. The release-row writer's ruling cell is fixed text, which misstated every cascade row until rewritten by hand. | `.orkestrel/release.md` cascade rows; the plan's § Visit procedure |
| R8 | Layer preparation runs scaffold's `wave.ts` from the scaffold checkout, so a writer editing that file blocks it; reason 0.0.15 was prepared by hand for that reason. | reason `6aeb47c` |
| R9 | A chain plan holds only `prepublishOnly`'s steps, so the clean reinstall and `npm run clean` the plan's § Visit procedure step 8 requires ran by hand before every chain. | `.orkestrel/plan.md` § Visit procedure step 8 |

### Tests and gates

| Id | Finding | Evidence |
| --- | --- | --- |
| T1 | The rules ran studies as release gates, and agent published on a recorded red; the user ruled a study a recorded research instrument, never a gate. | scaffold `74c6d64df`; agent `a0de2686` |
| T2 | A behavior switched at call sites shipped with call sites no test pinned: making `repair` lift, or lifting the written-manifest readback, left every case green until mutations proved two added checks. A CLI call in a proof whose exit the proof never asserted passed on a usage refusal (`repair` refuses `--dirty`). | scaffold `58315f65b` message |
| T3 | Writers reported full-file failures as baseline without running the baseline before their edits; the reviewer could not separate them from regressions. | scaffold `74c6d64df`; the studies unit's review row in `.orkestrel/ledger.md` |
| T4 | `npm test` stops at its first failing script, so acceptance hid workflow's broken guide behind an unrelated failure. | workflow's realignment acceptance, 2026-10-29 |
| T5 | A rename left a guide fence reading the old member (middleware's limiter fence, `resetAt`), and guide parity passed because it compares names and summaries; only flagship fences execute. | middleware's realignment acceptance, 2026-10-29 |
| T6 | Bindings rewrites swapped algorithms for higher-cost ones that every static gate passed: database's wildcard matcher (0.2 ms to about 200 ms on the pinned input) and capture's picture shrink (1267 ms against a 1000 ms bound). | the cost-class review rows of `.orkestrel/ledger.md` |
| T7 | Four guard review rounds widened "checked against its declared type" to new structural edges until the stopping standard landed. | `.orkestrel/plan.md` § Scaffold release row 9 |
| T8 | A scaffold proof reads the git-ignored `tmp/probes/` directory. | `.orkestrel/plan.md` § Deferred, row "A scaffold proof reads an ignored directory" |
| T9 | A fixture entry imports a sibling fixture module, which no rule places. | `.orkestrel/plan.md` § Deferred, row "A fixture entry imports a sibling fixture module" |

### Dispatch and briefs

| Id | Finding | Evidence |
| --- | --- | --- |
| D1 | A writer brief that restated a placement law let a helper sit at a test file's module scope against `.claude/rules/tests.md`, and every early writer followed the brief. | the realignment briefs of 2026-10-29; § Scaffold release row 5 |
| D2 | Moving helpers into setup modules made them exports the `surface` rule reads, and contract and test collided on four names. | contract and test realignment commits |
| D3 | Commit messages built from earlier receipts overclaimed twice, and a commit script committed budget with a red `test:setup` because it read receipts without exits. | budget's realignment commit; scaffold config count |
| D4 | The Orchestrator ran `git reset` (forbidden by the wave brief) to clear intent-to-add entries in contract's checkout; the working tree was unchanged. | contract's realignment review, 2026-10-29 |
| D5 | A shell expanded backticks inside a `node -e` heredoc and garbled a spliced source region. | 2026-10-29 acceptance of database, console, and form |
| D6 | Codex writer lanes failed to start ("required MCP servers failed to initialize: probe") until the probe checkout's self-junction was restored; the vendored `.codex/config.toml` entry carries a relative path and no `cwd`. | `.orkestrel/plan.md` § Deferred, row "The vendored Codex probe entry" |
| D7 | The Orchestrator told a consultant that the re-pin visit had run `test:studies`; the visit's gates never ran it. | the agent-study consult row of `.orkestrel/ledger.md` |
| D8 | A writer named a predicate `isAttemptCancelled`, against the fixed lifecycle vocabulary and the `is*` guard form. | workflow's realignment; ruled `matchesAbortedAttempt` |
| D9 | Writers moved a raw-Node guide proof's helpers into setup modules behind a static `./setup.js` import, which resolves only under the runner. | markdown, ollama, and agent realignments |
| D10 | Ledger carriers cited unit briefs under git-ignored `tmp/units/` paths; the resume sweep cannot tell a citation of an ignored path from a mention of one as a rule's subject. | `.orkestrel/plan.md` sweep lines of 2026-10-30 |

### What worked

| Id | Practice | Evidence |
| --- | --- | --- |
| S1 | A read-only consult at a seam's stop settled each design question in one round: pool's microtask latency, agent's recorded red, `iterateIndices` ownership, and the toolchain lift's home. | the consult rows of `.orkestrel/ledger.md` |
| S2 | An independent review of every medium unit falsified real claims each round: two of ten for wave-visit and studies, two of seven for the toolchain lift, plus untested seams. | the review rows of `.orkestrel/ledger.md` |
| S3 | A mutation that must redden one named check proved each repaired seam, with the source restored byte for byte. | scaffold `58315f65b` message |
| S4 | The runner adopted mechanical published renames itself (lsp, mcp, ollama, study, agent, reason), and writer lanes held the judgment-bearing units. | the `rule` rows of `.orkestrel/ledger.md` |
| S5 | A probe compared the two `iterateIndices` forms over edge bounds with a control that had to differ, before the reuse ruling shipped. | reason `fe79ae1` message |

## Instruction-set audit

Two blind lanes ran one brief on 2026-10-30: the subjective lane (`reviewer`, Claude Opus 5.5) returned findings J1 to J29, and the objective lane (`analyst`, GPT-6 Astra) returned O01 to O16 with a ruling on every retrospective row. Each lane quoted its evidence by `file:line`; the rulings carry the lane ids, and each carrier is the commit that lands it.

## Rulings

| Id | Rows | Lanes | Bucket | Ruling | Carrier |
| --- | --- | --- | --- | --- | --- |
| F1 | R1 | J13, O03 | skill refinement | `orkestrel-publish` `references/wave.md` § Prepare a layer compares a wave's candidate surfaces with each other and the served fleet before upload. J13's `names.md` addition is refused: the ownership law stands, and a second home would restate it. | scaffold `4379ff5ed` |
| F2 | R2 | J14, objective table | stays as-is | Scaffold's runtime ranges nest only until its release after the last layer, which § Sequence step 7 orders, and agent `a0de2686` closed the case; nesting itself is no defect. | this record |
| F3 | R3, D2, D3, D5, D7, D8, D10, T5 | J29, objective table | executor departure | The instruction already binds: `wave.md` polls the tarball before an install; `names.md` § Fleet name ownership reaches setup exports; `orchestration.md` § Acceptance requires the exit; the Claude quirk page sends a program to a TypeScript file; `orkestrel-dispatch` § Write the brief backs every fact; `names.md` fixes `is*` and `abort`; `campaign.md` § Content refuses ignored paths; `orkestrel-harden` `references/document.md` runs each example. | this record |
| F4 | R4 | J7, objective table | skill refinement | The user's wave order binds: `wave.md` pushes a release commit only after the registry serves its version. | scaffold `4379ff5ed` |
| F5 | R5 | J24, O11 | process refinement | `.agents/platforms/windows.md` § Processes: when a held native module interrupts an install, find the holders with `tasklist /M`, terminate no process the session did not launch, record the partial state, rebuild from the unchanged lockfile, and report the clean-install criterion the recovery did not prove. | scaffold `4379ff5ed` |
| F6 | R6 | J29, O12 | skill refinement and roadmap | `wave.md` § Visit a repository names the recovery, a verified published scaffold executable run from owned scratch; the `catalog` verb's need for `dist/host` after a refused build is `ROADMAP.md` forward work. | scaffold `4379ff5ed` |
| F7 | R7, R8, R9 | J8, J15, O13 | skill refinement and roadmap | `wave.md` § Prepare a layer: the chain plan carries the clean reinstall and the clean as its first steps whether the tree is a clone or the checkout; a script a writer owns runs from the installed built twin; a release row takes its ruling from the measured dist and range result. Promoting the wave's preparation, chain-plan, and release-row tools into `orkestrel-publish` scripts is `ROADMAP.md` forward work. | scaffold `4379ff5ed` |
| F8 | T1 | O04 | root-reference trim | `orkestrel-harden` `references/hardening.md` judges a discovered project's gate by `.claude/rules/workspace.md` § Test project matrix, so `studies` stays on demand. | scaffold `4379ff5ed` |
| F9 | T2 | J20, objective table | rule refinement | `.claude/rules/tests.md` § Test contract: a proof that runs a command asserts its exit. J20's call-site law is refused: the mutation on a load-bearing line in `orchestration.md` § Size gate already binds it. | scaffold `4379ff5ed` |
| F10 | T3 | J21, O06 | skill refinement | `orkestrel-dispatch` § Write the brief: a unit that may call a failure baseline records that command's pre-edit output and exit before writing, or reports the attribution unverified. | scaffold `4379ff5ed` |
| F11 | T4 | J6, O01 | skill refinement and roadmap | `orkestrel-parallel` § Run evidence commands sends a release run to `wave.md`'s every-valid-step law instead of a first-failure stop, and `wave.md` names the prerequisite split a serial chain needs. A prerequisite-aware `chain.ts` mode is `ROADMAP.md` forward work. | scaffold `4379ff5ed` |
| F12 | T5 | J19, objective table | roadmap | The guide worklist already reaches a renamed fence member; a gate that type-checks every TypeScript guide fence is `ROADMAP.md` forward work. | scaffold `4379ff5ed` |
| F13 | T6 | J16, O09 | skill refinement | `orkestrel-harden` `references/equivalence.md` § Hold the contract compares cost growth on the package's realistic load whenever a rewrite changes traversal, membership, allocation, or materialization, and rules the effect under `quality.md` § Performance. | scaffold `4379ff5ed` |
| F14 | T7 | J22, objective table | rule refinement | `.claude/rules/writing.md` § Instruction files: a rule that requires a check against a declared type or shape states the standard where the check stops. | scaffold `4379ff5ed` |
| F15 | T8 | J29, O07 | fix now and rule refinement | Scaffold's discovery proof stops depending on what `tmp/probes/` holds, and `tests.md` § Test contract states independence from an ignored path's presence, content, and absence. | scaffold `4379ff5ed` |
| F16 | T9 | J17, O08 | rule refinement | `tests.md` § Shared test infrastructure places a raw-runtime fixture's support module beside the entries that alone import it. | scaffold `4379ff5ed` |
| F17 | D1 | J5, O14 | skill refinement and root-reference trim | `orkestrel-dispatch` § Write the brief cites each law by file and section and quotes, never paraphrases, a law it carries; the writer charters (Claude `builder` and `opus`, Codex `astra`, `builder`, and `opus`) point at `orchestration.md` and `orkestrel-parallel` for shared-file ownership and validation instead of restating them. | scaffold `4379ff5ed` |
| F18 | D4 | J12, objective table | process refinement | `orchestration.md` § Permission floor states that its git-undo and secret bullets bind the Orchestrator, and a review receives an untracked file by its path, never by staging it. | scaffold `4379ff5ed` |
| F19 | D6 | J25, O05 | process refinement and roadmap | `orkestrel-parallel` `references/codex.md` § Quirks: before a Codex lane that requires a tool server, verify the entry's resolution and handshake from that lane's checkout under the effective configuration; on "required MCP servers failed to initialize", read the user-level configuration for a same-named entry. The configuration fix is `ROADMAP.md` forward work. | scaffold `4379ff5ed` |
| F20 | D9 | J18, O10 | rule refinement | `.claude/rules/documentation.md` § Parity: `tests/guides.test.ts` imports a setup module only inside the callback passed to `execute`, and the guide proof runs with build output absent. | scaffold `4379ff5ed` |
| F21 | D10 | J2, objective table | process refinement | `orchestration.md` § Cleanup carries each deviation a unit reported and the recovery that closed it, quoted, with its effective brief. | scaffold `4379ff5ed` |
| F22 | S1 | J3 | agent refinement | The `planner` charter, in both mirrors, names the read-only consult as its second job, with the return shape `orchestration.md` § Sessions and consultation names. | scaffold `4379ff5ed` |
| F23 | S2 | J4, O15 | agent and skill refinement | The `analyst` charter, in both mirrors, takes a dispatch-named skill's verdict shape before the falsify default and requires a diff and status only for a code subject; `orkestrel-falsify` lets a one-lane review carry its claims inline and its rulings in the ledger row. | scaffold `4379ff5ed` |
| F24 | S4 | J1, O02 | process refinement | `orchestration.md` § Routing: mechanical source adoption is recorded as Orchestrator integration or a writer unit, and the runner name stays with a verifier that made no source repair. | scaffold `4379ff5ed` |
| F25 | none | J9 | agent refinement | The Codex `reviewer` and `analyst` charters carry the Claude charters' lens words. | scaffold `4379ff5ed` |
| F26 | none | J10 | agent refinement | Both `orkestrel` charter mirrors describe the catalog table in one wording: the layer order `release.md` reads, discovery data for versions, never live state. | scaffold `4379ff5ed` |
| F27 | none | J11 | rule refinement | `.claude/rules/campaign.md` § Layout: a ledger role cell holds a § Roles name, `user`, or `Orchestrator`. | scaffold `4379ff5ed` |
| F28 | none | J23 | fix now | This record and `plan.md` drop the process ids, the host description, and the ignored-path citation that `campaign.md` § Content refuses. | scaffold `4379ff5ed` |
| F29 | none | J26 | process refinement | `orchestration.md` § Acceptance: a review the size gate names closes before acceptance and never enters a deferral list, as this wave's review rows of § Deferred did. | scaffold `4379ff5ed` |
| F30 | none | J27 | skill and rule refinement | `orkestrel-debrief` names its buckets with `references/instruction-audit.md`'s refinement-class names, and `campaign.md` § Layout names `.orkestrel/debrief.md`. | scaffold `4379ff5ed` |
| F31 | none | J28 | root-reference trim | Every skill bridge under `.claude/skills/` points at `AGENTS.md` § Authority and loading instead of restating the order. | scaffold `4379ff5ed` |
| F32 | none | O16 | root-reference trim | `orkestrel-align` `references/integration.md` defines the destination type contract first and documents it in the final prose pass. | scaffold `4379ff5ed` |
| F33 | S3, S5 | J29, objective table | stays as-is | Already carried by `orchestration.md` § Size gate, `tests.md` § Test contract, `patterns.md` § Declared ecosystem capabilities, and `quality.md` § Instruments. | this record |

## Carry check

Each item the campaign folder leaves open, with its carrier.

| Item | Carrier |
| --- | --- |
| `plan.md` § Deferred, "The vendored Codex probe entry carries a relative path and no `cwd`" | `ROADMAP.md` item 72; F19 lands the diagnosis |
| `plan.md` § Deferred, "A wave's added names escape the `surface` rule" | F1 |
| `plan.md` § Deferred, "Legacy distribution harnesses launch npm through a shell" | `ROADMAP.md` item 73 |
| `plan.md` § Deferred, "Test's guide proof reads its own build" | `ROADMAP.md` item 74 |
| `plan.md` § Deferred, "Contract changes committed before a review pass" | closed: `plan.md` § State of 2026-10-30 records the contract, cost-class, and guard reviews and their repairs closed; F29 lands the law |
| `plan.md` § Deferred, "Cost-class regressions the gates do not pin" | closed by the same § State line; F13 lands the law |
| `plan.md` § Deferred, "A fixture entry imports a sibling fixture module" | F16 |
| `plan.md` § Deferred, "A scaffold proof reads an ignored directory" | F15 |
| `plan.md` § Deferred, "No catalog package carries an app face" | `ROADMAP.md` item 75 |
| `release.md` § Standing readings, browser's Windows release host | `ROADMAP.md` item 76 |
| `ROADMAP.md` items 44, 45, 61, 62, and 63, which § Sequence step 3 landed (test `adf7751`, process `27e6360`, capture `e6ae343`) | struck from `ROADMAP.md` |
| `ROADMAP.md` item 56, the clean-clone release gate | struck: the user ruled out clones on 2026-10-29, F7 lands the checkout procedure, and item 69 ships the plan |
