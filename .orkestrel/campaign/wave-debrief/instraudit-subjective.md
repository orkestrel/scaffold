I held the **subjective** lane. Engine substitution: the GPT-5.6 Sol bench is dark this session, so Opus 5 runs every lane per `.agents/orchestration.md` § Engine assignment; I am the `reviewer` role on Opus 5 holding the subjective lens list at `.agents/skills/orkestrel-debrief/references/instruction-audit.md` § The subjective lens list.

**Deviation on evidence:** the brief cites `login-retry.sh:16` for the kill-by-pattern; the pattern selection is at `/home/user/scaffold/tmp/units/wave-record/login-retry.sh:15` and `:16` kills the fifo sleep by recorded pid. I ruled claim 8 against `:15`. The brief's `tmp/units/wave-record/*.sh` list also omits instruments the ledger cites; every one exists under `work/`, and finding S11 rules that.

**State read for the live builder's files:** I read `/home/user/scaffold/guides/scaffold.md` § Fleet catalog in its **post-builder** state (the `Peer dependencies` column at `:1086` and the peer-ordering sentence at `:1091-1093` are present) and `/home/user/scaffold/.claude/agents/orkestrel.md` in its **pre-builder** state (the catalog table header at `:46-47` carries no peer column, and the prose at `:123-124` reads "The `Layer` column in the catalog table is the publish round, derived from the runtime edges in the same row").

---

## Lens coverage

- **Role-job singularity** — covered. S2 and S3 are its findings: the release-instrument work class has no role whose charter admits it.
- **Charter voice against dispatched usage** — covered across `orkestrel`, `builder`, `verifier`, `grok`, `reviewer`, `analyst`. S2, S3, S13.
- **Lane-swap residue** — covered. S8 is its finding; this round is its own evidence.
- **Bridge minimalism** — covered, clean. `/home/user/scaffold/.claude/skills/orkestrel-publish/SKILL.md` loads `.agents/skills/orkestrel-publish/SKILL.md` and adds nothing; `analyst.md:17-27` and `.codex/agents/reviewer.toml:6-23` pin route and sandbox and refuse to restate their transport contracts. No finding.
- **Vocabulary drift across mirrored files** — covered. S12 is its finding. `orkestrel`, `builder`, `verifier`, `reviewer`, and `grok` Claude/Codex pairs compared.
- **Skill-family seams** — covered. S1, S4, S5, S7, S9, S10, S14.

---

## Findings

### S1 — `window.md` § Read a `403` on the poll presents a closed cause set that excludes the failure that stopped this wave, and § Reach the approval forbids the recovery

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/window.md:121-134`; `:56-58`; `:48-52`.

**What is wrong.** `:123-124` tells the reader "`403 Forbidden - GET /-/v1/done` carries more than one cause, and each takes a different reading of the same status. Rule from the evidence, never from which cause reads likelier" — then lists exactly two causes, an unclicked abandon at about 45 seconds and a click on a superseded URL. The wave's failure is neither: `ledger.md:126` records `403 {"message":"forbidden"}` on a **first** poll, seconds after minting, from a host whose proxy leaves from several egress addresses, before anyone could click. Nothing in the skill names a proxy, an egress address, or a first-poll refusal — a search of `.agents/skills/orkestrel-publish/` for `proxy|egress|address`, case-insensitive, returns no match. A reader following `:126-129` diagnoses the abandon, and `:134` prescribes "mint exactly one fresh attempt with the user at the keyboard", which is the loop that failed. `:56-58` then forbids the mechanism that recovered it: "Never keep a link alive by re-minting on a loop... Mint once per human moment." The wave broke that line — `login-retry.sh:8-21` mints until an attempt survives its own first poll, and `ledger.md:126` records the owner's click landing on the third relayed link at 19:32 after the first attempt at 16:41 (`work/login.log:1`, `work/login-1.log:1`).

**Why it matters.** The section's voice is its defect. It teaches the reader to rule from evidence and then hands over an enumeration that reads as complete, so the evidence has nowhere to land; and the one rule that would have produced the fix is written as a ban. This is the single failure that cost the wave its longest stall.

**Refinement class.** Skill refinement.

**Landing.** `window.md` § Read a `403` on the poll gains a third cause and the sentence that tells it apart: a refusal on the attempt's **first** poll, before any click was possible, is the registry rejecting a poll from an egress address other than the one that minted the session. `window.md` § Reach the approval's re-mint ban gains its distinguishing clause: the ban covers re-minting while the user holds a relayed link; minting attempts that are never relayed, until one survives its own first poll, and relaying only that one, is the recovery for a multi-address egress and is not a moving target. The host fact that this container's proxy leaves from several addresses stays in `ROADMAP.md` § 4.

---

### S2 — the contract orders instrument authorship and gate invocation dispatched to `builder` and `verifier`, and both charters forbid what a release instrument does

**File:line.** `/home/user/scaffold/.agents/orchestration.md:139-141`; `/home/user/scaffold/.claude/agents/builder.md:26-28`; `/home/user/scaffold/.claude/agents/verifier.md:2-3, 40`; `/home/user/scaffold/.agents/orchestration.md:207`.

**What is wrong.** `:139` reads "Dispatch staging, packing, gate-chain invocation, and instrument authorship as units — `builder` for a fully specified script, `verifier` for its evidence — each with a brief and an audit like any other unit. Only the commit and the push stay with the Orchestrator." A release instrument does what `prep-one-3.sh` does: `npm install` at `:25`, `npm run format` at `:40`, `npm run prepublishOnly` at `:41`, and `git commit` at `:29`. `builder.md:26-27` forbids exactly those — "NO tree-wide or mutating commands: never `format`, lint `--fix`, or `build`" — and `.agents/orchestration.md:207` bars **every** role from committing and installing. `verifier.md` runs named commands and never fixes, and holds no `Edit` or `Write`, so it cannot author. No role in the set can hold this job.

**Why it matters.** The wave's absorption of every instrument is read as indiscipline by the record and is not: the roster leaves the work class homeless, and the contract's sentence sends an Orchestrator to two roles that must both refuse. An instruction that cannot be followed is a defect in the instruction. The half that **is** dispatchable — authoring the script file with no run — was also not dispatched, so `tmp/units/wave-record/` holds no `*-brief.md` or `*-report.md` for any instrument.

**Refinement class.** Orchestration-contract refinement, with a role decision behind it.

**Landing.** `.agents/orchestration.md` § Orchestrator and executor gains the limit as one sentence after `:141`: a unit whose script installs, commits, or runs a mutating tree-wide command cannot be dispatched under the permission floor, so a release instrument's **authorship** is a `builder` unit with a brief and a report and its **run** stays with the Orchestrator, which retains the executed script as that unit's acceptance evidence. Route the roster question — whether a release-operator role earns a charter — to the objective lane's roster-completeness lens; I refer it rather than rule it (referral R1).

---

### S3 — `wave.md` § Visit a repository cannot run in its stated order, and § Prepare a layer contradicts the order that works

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md:9-17`; `:80-89`.

**What is wrong.** `:11-13` makes the re-pin and install the first step; `:14` makes `scaffold overwrite` the second. The overwrite refuses an uncommitted tree. The session transcript of 2026-09-04 19:35:05 records it: `codec scaffold overwrite exit=1` / `TARGET: The target at . carries 2 uncommitted changes. Commit them, or pass --dirty to waive the refusal.` The step that writes the manifest is the step that makes the next one refuse, and `:10` even states the governing principle — "A step that reads generated or installed state is invalid before the step that writes it" — without applying it to the write the overwrite itself refuses. § Prepare a layer then orders the commit **last**, at `:89` "Commit and push before the window opens", so the two sections read together forbid the preparation commit that `prep-one-2.sh:27-31` and `prep-one-3.sh:27-31` had to introduce. The install after the overwrite is also missing: `prep-one-3.sh:37` adds it because the overwrite moves the manifest, a fact `wave.md:61-63` already knows ("The `declare` step inside `scaffold overwrite` re-pins before any later check") and never turns into a step.

**Why it matters.** Every visit in the wave ran an order the skill does not describe. A procedure whose stated order refuses on its own second step is not a procedure a reader can follow, and the reader discovers that only after the first target reddens.

**Refinement class.** Skill refinement.

**Landing.** `wave.md` § Visit a repository is restated in the order that ran: re-pin and bump; install; commit the re-pin and bump, because `scaffold overwrite` refuses an uncommitted tree; `scaffold overwrite`, then `scaffold audit` to exit `0`; re-pin again where the overwrite re-declared a range and install again where the manifest moved at all, so the lockfile and the installed toolchain match the manifest before the gates; force-verify every `@orkestrel` range; format; gates; compare the rebuilt `dist/` against the published tarball. § Prepare a layer's `:89` narrows to the **release** commit and push, and points at the visit for the preparation commit.

---

### S4 — `window.md` § Authorize the upload states the one-time code carries no window, and the record refuses that in both directions

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/window.md:76-84`; `:92-95`.

**What is wrong.** `:77-78` reads "uploads with no browser authorization and no poll, so it carries neither a window nor a race." The record falsifies it twice. One code carried console at 20:25:08 through router at 20:25:58 (`work/publish-layer-console.log:1-8`) and was refused `EOTP` at table at 20:26:00 (`work/publish-table-1.log:1,25,31`) — a window. Another, minted at 21:46:05, was refused at its first use before any upload (`work/publish-brief-1.log:1,25`) and the layer rode a fresh code (`work/publish-layer-brief.log:1-6`) — expiry with no use at all. `:81` then says "Ask for the code at the moment of the upload, and run the upload inside that code's own life", written for one upload, while the pattern that actually shipped the wave is one code carrying a layer back-to-back with a fresh code resuming the refused remainder. § Spend the window's `:93` explicitly excludes the code path from every chaining rule it holds, so that path is left with no chaining guidance and one false reassurance.

**Why it matters.** "Neither a window nor a race" is the sentence that tells an operator not to plan the code path, and it is the path the wave used for every upload. The reader plans no resume, meets `EOTP` mid-layer, and reads it as the contention `:111-115` describes rather than as the code's life ending.

**Refinement class.** Skill refinement.

**Landing.** `window.md` § Authorize the upload replaces `:77-78` with the measured shape: a one-time code opens no browser authorization and no poll, and it has its own life measured in tens of seconds — one code carries a layer's uploads back-to-back, and a package refused `EOTP` resumes on a fresh code with the layer's remainder. Cite the 2026-09-04 readings by their timestamps. `:81` becomes "Ask for the code at the moment the layer's first upload starts, and chase the layer inside that code's life." `SKILL.md:53-56` follows.

---

### S5 — the order law says runtime `dependencies` alone, the wave ruled peer edges are ordering edges, the guide already says so, and the contract is not scoped to the unit fixing it

**File:line.** `/home/user/scaffold/.agents/orchestration.md:849-853`; `/home/user/scaffold/.claude/agents/orkestrel.md:46-47, 123-124`; `/home/user/scaffold/guides/scaffold.md:1086, 1091-1093`.

**What is wrong.** `.agents/orchestration.md:850-851` reads "the fleet publishes in topological layer order derived from runtime `dependencies` alone", and `orkestrel.md:123-124` mirrors it. Middleware and mcp break it: the catalog places middleware at `L2` (`orkestrel.md:67`) and both published "L3, after server" with `@orkestrel/server ^0.0.18` (`ledger.md:56-57`). The law's own rationale argues against its scope — `:851-853` says "ranges that disagree install duplicate copies of the same package, and the compiler reads them as distinct types", and a caret peer range at `0.0.x` disagrees exactly that way. `guides/scaffold.md:1091-1093` already carries the corrected rule in the post-builder state I read: "A peer edge orders a dependent the same way a runtime edge does, because a caret peer range at `0.0.x` pins one exact release." The live builder's scope, per the brief's standing conditions, covers `guides/scaffold.md` § Fleet catalog and the one sentence at `.claude/agents/orkestrel.md:123-124` — and **not** `.agents/orchestration.md:849-853`. When that unit lands, the contract sentence is the stale copy and the guide is the true one.

**Why it matters.** `.agents/orchestration.md` § Publishing the fleet is where an Orchestrator reads the order before a release. Leaving it false while the guide and the code are corrected seeds the drift deliberately, and `.agents/orchestration.md` § Check the brief before you send it already forbids it: "Scope a unit that changes a mechanism to own the prose describing it. Where a brief scopes that prose out, name the carrier and dispatch it before the change ships." No carrier is named.

**Refinement class.** Orchestration-contract refinement, with mirror discipline.

**Landing.** `.agents/orchestration.md:850-851` becomes "topological layer order derived from the runtime `dependencies` and `peerDependencies` edges", and the sentence naming the `Layer` column as the publish round stays. `.claude/agents/orkestrel.md:123-124` takes the same wording, and its catalog table gains the `Peer dependencies` column `guides/scaffold.md:1086` already documents. Dispatch this as a named carrier before the builder's change ships, or add `.agents/orchestration.md` § Publishing the fleet to that unit's owned files in a successor brief.

---

### S6 — `window.md` § Read the verdict from the registry is written entirely as refusals, so a chain built from it has nothing to gate on

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/window.md:136-149`.

**What is wrong.** Every line of the section says what not to conclude: not from an exit code, not `404` as failed, not the warning's own text, not a failure before a re-read. It never names the signal a reader **can** read as an accepted upload. `publish-layer.sh` was built from it and stopped a healthy chain: `work/publish-layer-abort.log:1-2` records `20:03:14 abort 0.0.9: registry serves nothing yet (exit=0)` then `STOP at abort`, on an upload the registry served at 20:07 (`ledger.md:17`). The instrument was then rekeyed to the acceptance line at `publish-layer.sh:11` — `grep -qE "\+ @orkestrel/$p@"` — a signal the reference does not mention, though the journals carry it beside the processing notice (`work/publish-html-1.log:25-26`).

**Why it matters.** `.claude/rules/writing.md` § Sentence and paragraph order fixes this form directly: "State what the reader can do. Do not write a double negative." A section of refusals reads as complete guidance and leaves the reader to invent the positive rule under a running window.

**Refinement class.** Skill refinement.

**Landing.** `window.md` § Read the verdict from the registry opens with the positive rule: read `+ @orkestrel/<pkg>@<version>` in the upload's own journal as the accepted verdict, and chain the layer on it. The registry read confirms an accepted upload and never gates the chain, because the registry's read lags its processing. The existing refusals follow as the rules for reporting, not for chaining.

---

### S7 — `window.md` § Arm the terminal tells the reader to kill by process id at the moment a login must be killed, and points at nothing that says what that means

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/window.md:28-29`; `/home/user/scaffold/.agents/orchestration.md:669-673`; `/home/user/scaffold/tmp/units/wave-record/login-retry.sh:3-4, 15`.

**What is wrong.** `:29` reads "Kill it by process id and mint a fresh flow" — a bare imperative with no pointer to `.agents/orchestration.md` § Confirm dead before relaunching, which owns the law at `:669` ("Kill by process id, never by pattern") and the reason. The instrument written at that moment claims compliance in its own header — `login-retry.sh:3-4`, "An attempt that drops to the legacy `Username:` prompt is killed by process id" — and selects by a full-command-line pattern at `:15`: `ps -eo pid,args | grep -E '[n]pm login|[s]cript -qfc' | awk '{print $1}'`. The bracket trick avoids the self-match the contract warns about; the wider hazard the contract names does not go away, because that pattern reaches **any** `script -qfc` process, which is the arming form `:12` mandates for every publish in the same wave.

**Why it matters.** The instrument's author read `:29`, believed the header they wrote, and did not reach `:669`. A law is discoverable at the moment it binds or it is not a law. This is the wave's clearest case of a rule that exists and was not reachable.

**Refinement class.** Skill refinement.

**Landing.** `window.md:29` gains its pointer: "Kill it by its recorded process id, per `.agents/orchestration.md` § Confirm dead before relaunching, which owns why a command-line pattern is refused. Every publish in this wave runs under the same `script -qfc` form, so a pattern over that form reaches them too." Add no restatement of the law itself.

---

### S8 — no charter enumerates the objective lane's lenses, so a dark Sol bench leaves the swapped lane with a one-clause charter

**File:line.** `/home/user/scaffold/.claude/agents/reviewer.md:17-21, 57-63`; `/home/user/scaffold/.claude/agents/analyst.md:1-27`.

**What is wrong.** `reviewer.md:17-21` carries the swap clause correctly and `:57-63` names the objective subject matter in one clause — "correctness, security, dependency constraints, test sufficiency, and mechanical conformance" — written as the boundary the subjective lane must **not** cross. `analyst.md` is a bridge driver end to end: it drafts a brief, resolves a `codex exec` command, and returns a journal path, and holds no lens list at all. So when Sol is dark, the role that inherits the objective lane inherits a five-item enumerated lens list for the lane it is **not** holding and a negative-space clause for the lane it is. For this round the gap is filled by `instruction-audit.md` § The objective lens list. For a code audit under a dark bench nothing fills it.

**Why it matters.** This is lane-swap residue in its exact named form: a charter whose wording assumes its default perspective everywhere outside the swap clause. The instruction-set audit happens to have a reference that repairs it; a diff audit does not, and a swapped lane there returns design-fit reasoning wearing an objective label.

**Refinement class.** Charter refinement.

**Landing.** `reviewer.md` gains an objective-lane section beside its subjective one, enumerating the lane's lenses for a code subject with the same weight: correctness under the adverse orderings `.claude/rules/quality.md` § Falsification names; constraints and what the declared contracts permit; dependency and range truth; test sufficiency and the missing seam; mechanical conformance. Mirror it into `.codex/agents/opus.toml`, which carries the Codex-side Opus route.

---

### S9 — `wave.md` § Sweep the self-pins scopes itself to the publishing package's own version, and the closing round falsified fixtures no version bump touched

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md:99-117`, scope sentence at `:101`; `:119-123`; `/home/user/scaffold/tests/src/core/fixtures/app-only-toolchain.txt:2-7`; `/home/user/scaffold/tests/src/core/fixtures/source-manifest.txt:65-68`; `/home/user/scaffold/tests/src/core/fixtures/setup-false-manifest.txt:65-68`.

**What is wrong.** `:101` fixes the section's scope: "A package's own version appears in its source and its tests as a literal, and a bump falsifies every one of them", and `:103` keys the sweep to the prior version literal. Scaffold's generated-manifest fixtures carry other packages' ranges — `"@orkestrel/contract": "^0.0.16"`, `"@orkestrel/guide": "^0.0.17"`, `"@orkestrel/probe": "^0.0.12"`, `"@orkestrel/test": "^0.0.13"` — which move on a **development re-pin with no bump at all**, so a prior-version grep cannot reach them and the section's own framing excludes them. The closing round is where this fired (`ledger.md:73`), and § Refresh the registry between layers at `:119-123`, the section that owns the post-window development re-pin, carries no sweep obligation whatsoever.

**Why it matters.** The section names the fixture class and then defines its trigger so the class escapes on the one pass where nothing bumps. A reader running the closing round follows a section with no sweep and meets the fixtures as a red gate.

**Refinement class.** Skill refinement.

**Landing.** `wave.md` § Sweep the self-pins widens `:101` to name the trigger rather than the bump: a version literal in this package's source or tests, and a generated or snapshot artifact carrying **any** installed `@orkestrel` range, both fall to this sweep — the first on a bump, the second on any re-pin including a development one. § Refresh the registry between layers points at it for the closing round.

---

### S10 — no written trigger produces guide's early own-account release, and the wave reached it only through a mid-round re-baseline

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md:56-72`; `/home/user/scaffold/.agents/orchestration.md:838-847`; `/home/user/scaffold/tmp/units/wave-record/ledger.md:128-130`.

**What is wrong.** § Rule on the bump gives two triggers — the dist moved materially, or the runtime dependency set moved — and neither reaches guide's case. `ledger.md:130` records what did: the first L0 visits reddened at `check` because `npm install` restored the registry's `@orkestrel/guide` 0.0.15 over the staged tip while every consumer's `tests/guides.test.ts` read the tip's renamed API. Guide is a **development** dependency, so § What a bump obliges reads it as obliging nothing, and the catalog placed it at L3. The wave recovered by re-baselining mid-round. Scaffold's own-account placement is the only precedent, and `ROADMAP.md:118-121` carries it as a repository fact rather than a rule, so it generalizes to nothing.

**Why it matters.** The trigger is not exotic and it fires at the very first layer: any package the fleet consumes as a development dependency whose **source tip** the consumers' gates read cannot wait for its layer, because the visit's install replaces the tip with the registry's copy. Leaving it unwritten costs a re-baseline every wave.

**Refinement class.** Skill refinement.

**Landing.** `wave.md` § Rule on the bump gains a third trigger: a package the fleet consumes as a development dependency, whose consumers' gates read its unpublished tip, publishes on its own account before the layer order and again at its own layer slot after its runtime ranges move — because each consumer's visit installs the registry's copy over the staged tip. Name guide and scaffold as the packages that met it on 2026-09-04. The `ROADMAP.md` § 4 sentence retires into this one.

---

### S11 — the ledger's citations resolve to no path in the record it was written to describe

**File:line.** `/home/user/scaffold/tmp/units/wave-record/ledger.md:7, 9, 11-26, 60, 68, 73, 126, 156` (the `instruments/<name>` and `publish-<pkg>.log.txt` forms); the retained tree at `/home/user/scaffold/tmp/units/wave-record/work/`.

**What is wrong.** The ledger cites `instruments/publish-one.sh`, `instruments/repin-dev.sh`, `instruments/repin-dev-2.sh`, `instruments/prep-probe-gates.sh`, `instruments/prep-ollama-gates.sh`, `instruments/login-diag.sh`, `instruments/devstale.mjs`, `instruments/push-main.sh`, and per-package logs named `publish-scaffold.log.txt`, `publish-codec.log.txt`, and so on. The record holds no `instruments/` directory: every instrument sits at `tmp/units/wave-record/` or `tmp/units/wave-record/work/`. Only one file in the whole record ends `.log.txt` — `devstale-final.log.txt` — while the journals the ledger points at are `work/publish-codec-1.log`, `work/publish-console-1.log`, and their siblings. Separately, `.orkestrel/` holds `campaign/wave-debrief/` and no copy of any wave instrument, ledger, or report, so the record `.agents/orchestration.md` § Dispatch anatomy tells the Orchestrator to retain — "the exact executed script or instrument, and the acceptance evidence into `.orkestrel/<package>/`" — exists only in the `tmp/` copies that same section sweeps.

**Why it matters.** The wave's corrections are genuinely re-runnable — `prep-one.sh`, `prep-one-2.sh`, and `prep-one-3.sh` each name their predecessor and what changed — and the citations that reach them are wrong, so the reader re-derives the mapping under time pressure. And the whole set is one sweep from gone.

**Refinement class.** Orchestration-contract refinement, plus a fix-now for the record.

**Landing.** Copy the wave's instruments, ledger, report, and this round's verdicts into `.orkestrel/scaffold/` before any `tmp/` sweep, and correct the ledger's citations to the paths they land at in the same edit. `.agents/orchestration.md` § Dispatch anatomy gains one sentence after `:139`: a record's own citations name the retained path, not the working path the run used, and the retention copy is what the citation resolves against.

---

### S12 — the `orkestrel` Codex mirror names the role's return shapes with words the Claude charter does not use

**File:line.** `/home/user/scaffold/.claude/agents/orkestrel.md:153-160`; `/home/user/scaffold/.codex/agents/orkestrel.toml:2, 20-21`.

**What is wrong.** The Claude charter fixes three named return shapes — `Map`, `Health`, `Work order` — and instructs "Return exactly one requested shape". The Codex mirror at `:20-21` reads "Return only the requested primed map, evidence-first health audit, or dependency blast-radius and topological work-order proposal." Same three shapes, three different names, and `primed map` appears nowhere else in the instruction set. The `description` fields differ too: Claude names "package maps, dependency sequencing, blast radius, and drift findings" and adds "never treats the embedded catalog as live state"; Codex names "package maps, drift audits, and dependency sequencing" and drops the catalog caveat, which is the guard the Claude charter spends its § Package catalog section establishing.

**Why it matters.** `.agents/orchestration.md` names the mirror by work class, not filename, and a dispatch that asks for a `Map` reaches a Codex executor with no such word in its charter. The dropped catalog caveat is the sharper half: the Codex mirror's own instruction to read `.claude/agents/orkestrel.md` "as the canonical ecosystem catalog and operating reference" points the executor straight at the generated table without the sentence that says the table is discovery data rather than live state.

**Refinement class.** Charter refinement, mirror discipline.

**Landing.** `.codex/agents/orkestrel.toml:20-21` takes the Claude charter's three shape names verbatim — `Map`, `Health`, `Work order` — and its `description` takes the Claude wording including "never treats the embedded catalog as live state".

---

### S13 — `wave.md`'s dist comparison step names no baseline precondition, and an absent baseline reads as a bump owed

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md:38`; `/home/user/scaffold/tmp/units/wave-record/distdiff2.mjs:26-27`; `/home/user/scaffold/tmp/units/wave-record/work/repin-dev-2.sh:29`; `/home/user/scaffold/tmp/units/wave-record/prep-one.sh:9`.

**What is wrong.** `:38` reads "Compare the rebuilt `dist/` against the published tarball for material content" and states no precondition. `prep-one.sh:9` held the missing half in a comment — "the published copy is fetched when absent" — and `distdiff2.mjs:27` dropped it, answering `{ moved: 'ERR', error: 'no published copy …' }`; `repin-dev-2.sh:29` gates on the absence of `"moved":false`, so the error read as a bump owed. `work/devrepin-toolbox.log:6` and `work/devround-R4.log:8` record toolbox reading `DEVREPIN-toolbox-BUMP-OWED` on that path, and `work/devrepin-toolbox-commit.txt:3` records it unmoved once the tarball was fetched.

**Why it matters.** `.claude/rules/quality.md` § Instruments names this exact failure — "a fallback that measures something adjacent returns a confident wrong answer, and nothing downstream can tell that answer from the real one." The wave caught it. A reader following `:38` has nothing that would make them look.

**Refinement class.** Skill refinement.

**Landing.** `wave.md:38` becomes: "Fetch the published tarball, then compare the rebuilt `dist/` against it for material content. An absent baseline is an unanswered comparison, never a moved dist — fetch and re-run rather than ruling a bump owed." The instrument half is a referral (R2).

---

### S14 — the `orkestrel-publish` skill restates the reference it points at and the contract law it says it does not carry

**File:line.** `/home/user/scaffold/.agents/skills/orkestrel-publish/SKILL.md:25-35, 46-47, 48-50, 53-56`.

**What is wrong.** `:26-29` states the boundary plainly and names "what a bump obliges downstream" among the things the contract owns and the skill does not repeat. `:46-47` then repeats it: "A package whose published surface did not move takes its re-pin, its gates, and a commit to `main`, and does not publish" — which is `.agents/orchestration.md` § What a bump obliges' development rule, restated. `:48-50` likewise restates `wave.md` § Prepare a layer's ordered list inside the skill that points at it, and drifted from it exactly where the wave's correction landed: neither copy carries the preparation commit before the overwrite. `:53-56` carries S4's false sentence a second time.

**Why it matters.** `AGENTS.md` § Instruction files fixes the rule: "Give a rule one home. Restating it elsewhere creates a duplicate that drifts, and an agent reading the stale copy is following this file." The skill's own boundary section is the strongest thing in the skill and these lines contradict it in the same document.

**Refinement class.** Root-reference trim.

**Landing.** `SKILL.md:46-47` shrinks to "Apply the triggers in `wave.md` § Rule on the bump; `.agents/orchestration.md` § What a bump obliges owns the blast radius." `:48-50` shrinks to a pointer at `wave.md` § Prepare a layer with only the boundary sentence the skill owns — every step happens outside the window. `:53-56` takes S4's corrected wording by reference rather than by copy.

---

## Claims attacked

**1 — `wave.md` § Visit a repository runs as written.** **BROKEN.** `wave.md:11-13` writes the manifest, `:14` refuses an uncommitted tree; 19:35:05 transcript, `codec scaffold overwrite exit=1` with the uncommitted-changes refusal, repeated for msg and test. Ruling the brief asks for: the **visit's** order is what must change, not the layer's — the refusal is caused by the visit's own preceding step, and § Prepare a layer's commit at `:89` is the release commit, a different commit at a different moment. The install after the overwrite belongs in § Visit a repository as its own step, keyed on the manifest moving at all rather than on an `@orkestrel` range moving, per `prep-one-3.sh:37`. Finding S3.

**2 — § Authorize the upload states the code path truly.** **BROKEN** on both sentences. `work/publish-layer-console.log:1-8` and `work/publish-table-1.log:1,25,31` for the code that carried a layer and was then refused; `work/publish-brief-1.log:1,25` for the code refused before its first upload. Finding S4.

**3 — § Read the verdict from the registry is sufficient to chain a layer.** **BROKEN.** `work/publish-layer-abort.log:1-2` stopped the chain on an upload `ledger.md:17` records the registry serving at 20:07. The section supplies no positive verdict; `publish-layer.sh:11` had to introduce one. Finding S6.

**4 — § Reach the approval and § Arm the terminal get a reader to a live approval URL through a multi-address proxy.** **BROKEN.** No mention of a proxy, an egress address, or a first-poll refusal anywhere in the skill; `window.md:126-129`'s closed cause set excludes the wave's failure and `:134`'s recovery is the loop that failed; `:56-58` bans the mechanism that worked. Ruling the brief asks for: the **rule** is portable and belongs in the reference — a first-poll `403`, before any click was possible, is an egress-address refusal, and the recovery is minting unrelayed attempts until one survives its own first poll. The **host fact** — this container's proxy leaves from several addresses — stays in `ROADMAP.md` § 4. Finding S1.

**5 — the order law and the catalog `Layer` column place every package in a round it can publish in.** **BROKEN.** `orkestrel.md:67` places middleware at `L2`; `ledger.md:56-57` publishes middleware and mcp at "L3, after server". The law's own rationale at `.agents/orchestration.md:851-853` argues for the wider edge set. `guides/scaffold.md:1091-1093` already carries the corrected rule in the post-builder state. Finding S5, including the unscoped contract sentence.

**6 — the written bump triggers yield guide's early release and scaffold's `0.0.63` without a re-baseline.** **BROKEN on guide, HELD on scaffold.** Scaffold is derivable: `.agents/orchestration.md` § What a bump obliges already states "A development bump that moves the published artifact is no longer a development bump. Prove the direction with the build... rebuild after the re-pin and compare `dist/` against the published tarball", which is exactly `ledger.md:73` and `work/scaffold-release-3-msg.txt:3`. The mechanism behind it — the compiler embedding ranges into generated workspaces — is a scaffold repository fact for `guides/scaffold.md`, not a new law. Guide is a **missing trigger**: `ledger.md:128-130` reached it through a mid-round re-baseline, and nothing written produces it. Finding S10.

**7 — instrument authorship, staging, and gate invocation were dispatched, or the contract states the limit.** **BROKEN both ways.** No `*-brief.md` or `*-report.md` exists for any instrument in `tmp/units/wave-record/`, and the contract states no limit. Ruling the bucket the brief asks for: **a contract clause**, not a deviation the next release corrects as written — because `.agents/orchestration.md:207` bars every dispatchable role from installing and committing, and `builder.md:26-27` bars the mutating commands a release instrument runs, so the law at `:139` cannot be followed for this work class by any role in the set. The authorship half is dispatchable and was not dispatched, which is the correctable remainder. Finding S2.

**8 — every kill in the wave's instruments is by process id.** **BROKEN.** `login-retry.sh:15` selects with `ps -eo pid,args | grep -E '[n]pm login|[s]cript -qfc'`, a full-command-line pattern, while `:3-4` claims process-id compliance. Ruling the brief asks for: the law at `.agents/orchestration.md:669` is **not** discoverable at the moment a login attempt must be killed, and `window.md:29` must point at it. Finding S7.

**9 — every correction is re-runnable from what the wave kept.** **BROKEN.** The generational chain holds — `prep-one.sh`, `prep-one-2.sh`, and `prep-one-3.sh` each name their predecessor and what changed, and `publish-layer.sh:11` carries the acceptance-line correction — so the mechanism the claim rests on works. What breaks it: no brief or report exists for any instrument, so the **instruction** each was written under is unrecoverable; the ledger's `instruments/<name>` and `<pkg>.log.txt` citations resolve to nothing in the retained tree; and no `.orkestrel/` copy exists, so the whole set is one sweep from gone. Two smaller drifts in the same class: `prep-one-3.sh:8` still reads `Usage: prep-one-2.sh <pkg>`, and its header runs the two generations' change notes together so the reader cannot tell which change belongs to which generation. Finding S11.

**10 — § Sweep the self-pins names every self-pin class the wave met.** **BROKEN.** The version-literal class and the golden-digest class are named. The fixture class is named only under a trigger that excludes the pass where it actually fired: `wave.md:101` scopes the section to "A package's own version... and a bump falsifies every one of them", while `tests/src/core/fixtures/app-only-toolchain.txt:2-7` carries other packages' ranges that move on a development re-pin with no bump, and `wave.md:119-123` — the section owning that pass — carries no sweep obligation. Finding S9.

**11 — each `ROADMAP.md` § 4 scaffold sentence has exactly one correct home.** **HELD**, and each sentence is ruled:

- *Multi-address proxy login* — splits. The rule ("a `403` on an attempt's first poll is an egress-address refusal; mint unrelayed attempts until one survives its first poll, then relay that one") lands in `window.md` § Read a `403` on the poll and § Reach the approval. The host fact stays in `ROADMAP.md` § 4.
- *The acceptance line as the upload's verdict* — `window.md` § Read the verdict from the registry, as that section's opening positive rule.
- *One code per layer, resume on a fresh code* — `window.md` § Authorize the upload, replacing "neither a window nor a race".
- *Preparation commit before `scaffold overwrite`, install after it* — `wave.md` § Visit a repository, as steps in its stated order.
- *Early own-account release of a development dependency whose API the consumers' tests read* — `wave.md` § Rule on the bump, as a third trigger. Not the contract: it is a wave-ordering rule, and the contract's bump section owns blast radius rather than order.
- *A peer range is an ordering edge* — `.agents/orchestration.md:849-853`, because that sentence is the false one, mirrored into `.claude/agents/orkestrel.md:123-124` and its catalog table's columns. `guides/scaffold.md:1091-1093` already holds it.
- *A package whose build embeds its development ranges takes a release from a development re-pin* — **no canon landing.** `.agents/orchestration.md` § What a bump obliges already states the law. The scaffold-specific mechanism is a repository fact for `guides/scaffold.md`. The roadmap sentence retires.

**12 — the skill reads as one system with the contract and the retention procedure.** **BROKEN.** `SKILL.md:46-47` restates the contract law `:26-29` disclaims; `:48-50` restates `wave.md` § Prepare a layer and drifted from it at the wave's correction point; `:53-56` carries S4's false sentence a second time. And the skill addresses a solo operator throughout — `:31-32`, "what an operator needs while a release is running" — so a reader following it never meets `.agents/orchestration.md:139`'s dispatch law at all, which is how the wave's instruments came to have no briefs. Findings S14 and S2.

**13 — the `orkestrel` charter states the layer derivation truly, and the Codex mirror agrees.** **BROKEN in the state I read.** `.claude/agents/orkestrel.md:123-124` reads "The `Layer` column in the catalog table is the publish round, derived from the runtime edges in the same row" — false against `ledger.md:56-57`, and false against `guides/scaffold.md:1091-1093` in the post-builder state. The catalog table at `:46-47` carries no `Peer dependencies` column, which `guides/scaffold.md:1086` documents. The mirror question is **HELD and clean**: `.codex/agents/orkestrel.toml` states no layer prose of its own and binds `.claude/agents/orkestrel.md` by reference at `:10-11`, so it cannot disagree — good mirror design and worth keeping. The mirror's separate drift is S12, on the return-shape names and the dropped catalog caveat, not on the layer rule. Finding S5.

---

## Referrals

**R1 — to the Orchestrator (I hold every lane, so no other lane receives it).** Whether the release-instrument work class earns a chartered role, or stays with the Orchestrator under the contract clause S2 proposes, is the roster-completeness question, and `instruction-audit.md` assigns roster completeness to the objective lens list. I have evidenced the gap and proposed the clause; the role decision is not mine.

**R2 — to the Orchestrator.** `distdiff2.mjs:26-27` returns a value that a caller reads as a verdict rather than as an unanswered comparison, and `repin-dev-2.sh:29` gates on the absence of `"moved":false` so any error reads as a bump owed. Whether the instrument must fail loudly or fetch its own baseline is an instrument-correctness ruling. I ruled only the skill text (S13).

**R3 — to the Orchestrator.** The exact life of an npm one-time code — whether the 20:26:00 refusal is a code-lifetime expiry, server-side single-window contention, or the `EOTP` contention `window.md:111-115` already describes — decides how S4's replacement sentence is worded. My ruling stands on the record either way: the current sentence is false. The mechanism needs a measurement I cannot take.

**R4 — to the Orchestrator.** `ledger.md:60` and `:68` record probe's `npm test` red and ollama's `test:service` red as "standing readings, not gates", and packages published on them. Whether the skill's § Accept the release at `SKILL.md:66-74` — "every gate that proved a package ran outside the window and against the artifact that shipped" — admits a standing reading is a correctness question about the acceptance condition, not a design-fit one. The brief's § Already established places release rulings outside this round, so I raise it as the **text's** silence rather than as a challenge to those releases.

INSTRAUDIT SUBJECTIVE: S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14
