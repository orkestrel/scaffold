# Instruction-set audit — OBJECTIVE lane

**Lane and engine.** I held the **objective** lane, on Claude Opus 5, as the recorded substitution for the dark GPT-5.6 Sol bench (`codex: command not found`, probed 2026-09-05 00:50 UTC), per `.agents/orchestration.md` § Engine assignment. I held the objective lens list at `.agents/skills/orkestrel-debrief/references/instruction-audit.md` § The objective lens list, not design fit.

## Deviations recorded before the findings

- The brief cites `login-retry.sh:16` for the pattern kill. The pattern kill is at `:15`; `:16` kills the fifo sleep by a recorded process id. My finding cites `:15`.
- The brief cites `distdiff2.mjs:26` for the absent-baseline answer. It is at `:27`.
- The brief cites `src/core/helpers.ts:719-741` as deriving layers from `entry.dependencies` alone. On 2026-09-05 I read `:730` as `const edges = [...entry.dependencies, ...entry.peers].map(...)`, so the live `catalog-peers` unit's edit had landed when I read it. `src/server/Upstream.ts:598-599` reads both sections and `:609-615` states the development exclusion.
- For claim 13 I read `.claude/agents/orkestrel.md:123-124` as "The `Layer` column in the catalog table is the publish round, derived from the runtime edges in the same row." I cannot tell that state from the post-edit state; I rule against that text.
- I opened `work/publish-layer-abort.log`, `work/publish-console-1.log`, and `work/publish-table-1.log` directly rather than resting on the brief's transcription. The session-transcript reading of 19:35:05 I took as the brief supplies it; no file in the record carries it.

## Findings

### O1 — The wave's record has no durable home, and the prune is authorized

`/home/user/scaffold/.orkestrel/` holds `campaign/` (the apps campaign) and `campaign/wave-debrief/`, and no publish-wave folder. The entire wave record sits at `tmp/units/wave-record/`, which `.gitignore:11` (`tmp`) ignores.

`.agents/orchestration.md:447-453` binds retention uniformly, "including an Orchestrator-owned integration, fix, probe, or capture unit": copy the brief, the report, the verdict, the exact executed instrument, and the acceptance evidence into `.orkestrel/<package>/` **as the unit is dispatched and as it returns**, then sweep only the `tmp/` launch copies. None of that happened for any unit of this wave.

Why it matters: the prune commit `69ca1082` is done and authorized, and the sweep deletes the ledger, the report, and every instrument. `ROADMAP.md:310-323` then carries seven sentences of process law with no evidence behind any of them, and the next wave rebuilds every instrument from nothing.

Class: Orchestration-contract refinement.
Landing: `.agents/orchestration.md` § Dispatch anatomy → § Where campaign artifacts live. State that a release wave retains into `.orkestrel/<package>/` before its prune, naming the ledger, the report, and the instrument set, and that the prune refuses while any path the record cites does not resolve inside the retained tree.

### O2 — `.gitignore:3` deletes every retained log the moment retention runs

Every log in the record carries the bare `.log` suffix — `work/publish-console-1.log`, `work/publish-table-1.log`, `work/prep-timeout.log`, `work/layer-L1A.log`, and the rest. Only `devstale-final.log.txt` matches the required pattern. `.gitignore:3` is `*.log`.

`.agents/orchestration.md:455-456` states the law exactly: "Name a retained log with the `<unit>.log.txt` pattern, never with a bare `.log` suffix, which the root `.gitignore` file ignores."

Why it matters: a `git add` of the retained record drops the acceptance evidence silently and keeps the prose. The ledger already cites the compliant names (`publish-scaffold.log.txt` at `ledger.md:7`, `publish-brief.log.txt` at `:59`) for files that do not carry them, so the record reads as though the law was followed.

Class: Skill refinement — the law exists and is unreachable at the moment an instrument names its log.
Landing: `.agents/skills/orkestrel-publish/SKILL.md` § Load authority, the item at `:13-14` (see O13), and `references/wave.md` § Visit a repository: an instrument writes its log at `<unit>.log.txt` where that log is the acceptance evidence for a process law.

### O3 — The record's own citations resolve to nothing

- `ledger.md:7` cites `instruments/publish-one.sh` and `publish-scaffold.log.txt`; `ledger.md:60` cites `instruments/prep-probe-gates.sh`; `ledger.md:126` cites `instruments/login-diag.sh` and `instruments/login-retry.sh`; `report.md:209` cites `instruments/published.sh`. No `instruments/` directory exists under `tmp/units/wave-record/`. The scripts sit at `work/*.sh`.
- `report.md:3` cites `units/wave-draft-grok.result.md` and `units/wave-draft-checker-grok.result.md`. No `*wave-draft*` path exists anywhere under `tmp/`.
- `prep-one.sh:39` and `prep-one-2.sh:43` invoke `/home/user/work/distdiff.mjs`, and `report.md:209` names `published.sh`, which fetched the tarball baselines `distdiff2.mjs:27` requires. Neither file is retained.

Why it matters: the dist comparison ruled every bump in the wave, and its baseline fetcher and its first-generation comparator are both gone. The chain cannot be re-run.

Class: Orchestration-contract refinement.
Landing: `.agents/orchestration.md` § Dispatch anatomy, in the retention rule at `:447`. A record's citation resolves against the retained tree before the prune, and a cited instrument the retained tree does not hold is a retention failure rather than a formatting one.

### O4 — `.agents/orchestration.md:850-851` states an order law the fleet does not follow

The sentence reads "the fleet publishes in topological layer order derived from runtime `dependencies` alone."

The wave published middleware `0.0.19` and mcp `0.0.28` at "L3, after server" (`ledger.md:56-57`) on peer ranges `@orkestrel/server ^0.0.18`, while the catalog places middleware at `L2` (`.claude/agents/orkestrel.md:67`). `report.md:204` records the ruling: "A peer edge is an ordering edge. A caret at `0.0.x` is an exact pin and a peer range is published surface." `src/core/helpers.ts:730` now reads `[...entry.dependencies, ...entry.peers]`.

Why it matters: a reader deriving the round from the law's text places middleware in a window it cannot publish in, and the sentence now contradicts the code that generates the column it points at.

Class: Orchestration-contract refinement.
Landing: `.agents/orchestration.md` § Publishing the fleet → § What a bump obliges, the sentence at `:850-851`. Replace "runtime `dependencies` alone" with the runtime and peer edges, and state that a development edge stays excluded because it reaches no consumer of the published package.

### O5 — `references/window.md:78-79` denies a window and a race the wave met twice

The line reads: "The `npm publish --ignore-scripts --otp=<code>` command uploads with no browser authorization and no poll, so it carries neither a window nor a race."

Read directly:
- `work/publish-console-1.log:1` — code `385882`, `Script started on 2026-09-04 20:25:02`; `:35` `+ @orkestrel/console@0.0.12`; `:37` exit 0.
- `work/publish-table-1.log:1` — the **same** code `385882`, `Script started on 2026-09-04 20:25:58`; `:25` `npm error code EOTP`; `:28` "it is likely that you either typoed it, or it timed out"; `:31` `COMMAND_EXIT_CODE="1"`.
- `work/publish-brief-1.log` (as the brief supplies it) — a code minted 21:46:05 refused `EOTP` at `:25` before any upload rode it, `Script done … 21:46:10`.

The same section already contradicts itself at `:81-82` ("run the upload inside that code's own life"). The section also carries no recovery: `§ Spend the window`'s `EOTP` retry rule at `:111-115` is fenced to the browser path by `:93-94`, so a reader meeting `EOTP` on a one-time-code layer has nothing written to follow.

Why it matters: every upload in this wave rode the one-time-code path. The reference describes in full the path the wave never took and leaves the path it took without a life, a batch bound, or a recovery.

Class: Skill refinement.
Landing: `references/window.md` § Authorize the upload. Strike "so it carries neither a window nor a race". State that one code carries a layer's uploads back-to-back within that code's own life, that an `EOTP` mid-layer stops the chain at the refused package, and that the layer resumes from that package on a fresh code.

### O6 — `references/wave.md` § Visit a repository refuses on its own step

Step 1 at `:11-12` re-pins `@orkestrel/scaffold` and installs. Step 2 at `:13` runs `scaffold overwrite`. The install leaves `package.json` and `package-lock.json` dirty, and the overwrite refuses a dirty tree: 2026-09-04 19:35:05, `codec scaffold overwrite exit=1`, `The target at . carries 2 uncommitted changes. Commit them, or pass --dirty to waive the refusal.` `prep-one-2.sh:27-31` answered with a preparation commit between the install and the overwrite, and every later visit ran that order.

The section names that refusal only at `:28-30`, and only for an untracked instruction-canon copy, so a reader meets it from a cause the section does not name.

The install-after-overwrite half of the `ROADMAP.md:320-321` sentence needs no landing: step 4 at `:36` ("Run the full install") already carries it. Landing it again creates the duplicate `AGENTS.md` § Instruction files forbids.

Class: Skill refinement.
Landing: `references/wave.md` § Visit a repository. Insert the preparation commit as its own step between the install and the overwrite, naming the refusal it clears.

### O7 — `references/window.md` § Read the verdict from the registry cannot chain a layer

`work/publish-layer-abort.log:1-2`, read directly:

```
20:03:14 \abort 0.0.9: registry serves nothing yet (exit=0, log /home/user/work/wave/publish-abort-1.log)
STOP at abort
```

`ledger.md:17` records the registry serving abort `0.0.9` at 20:07. The chain stopped on an upload the registry had accepted.

The section at `:137-149` names what not to trust (the exit code) and requires re-reading the registry, but supplies no positive signal a chain can key on; its pending rule at `:143-144` is written for a package with no prior version. `publish-layer.sh:11` was rekeyed on the journal's acceptance line `+ @orkestrel/<pkg>@`. `work/publish-table-1.log:31-32` shows why the exit code is unusable: `COMMAND_EXIT_CODE="1"` beside `PUBLISH-EXIT=0`, the wrapper's status masking npm's.

Why it matters: a reader following the section stops a healthy layer and spends an approval republishing a package that already landed.

Class: Skill refinement.
Landing: `references/window.md` § Read the verdict from the registry. The journal's acceptance line `+ @orkestrel/<pkg>@` is the upload's verdict for advancing the chain; the registry read is the confirmation the record carries. A registry miss straight after an accepted upload advances the chain and re-reads later.

### O8 — `references/window.md` misdiagnoses a first-poll `403` and forbids the recovery that worked

`ledger.md:126` records `403 {"message":"forbidden"}` on a poll from an address other than the minting one, `202` every 3 seconds on one kept-alive connection, and the owner's click landing on the third relayed link at 19:32.

Three defects in the text:

- `:48-52` fixes the abandon at about 45 seconds. `login-retry.sh:13` found the drop within 9 seconds. A reader waits out a duration that never arrives.
- `:29` tells the reader to read the legacy `Username:` prompt as "an expired attempt". A first-poll `403` is not an expiry, and § Read a `403` on the poll at `:125-132` enumerates only the abandon and the poisoned superseded URL.
- `:57-58` forbids re-minting on a loop. `login-retry.sh:8-23` mints attempts in a loop until one survives its first poll, relaying nothing until then — which is what reached a live URL on this host and reads as banned.

Class: Skill refinement, plus one host fact staying in the roadmap.
Landing: `references/window.md` § Read a `403` on the poll — add the egress cause: where the client leaves from several addresses, the registry refuses a poll from an address other than the minting one, npm reads that as web login unsupported, and the attempt drops to the legacy prompt within seconds rather than at 45. `references/window.md` § Reach the approval at `:57-58` — bound the ban to a URL already relayed, and permit minting until an attempt survives its first poll while no URL has been relayed. The fact that this host's proxy leaves from several addresses stays in `ROADMAP.md`.

### O9 — `login-retry.sh:15` kills by a pattern that matches every live upload

```
for p in $(ps -eo pid,args | grep -E '[n]pm login|[s]cript -qfc' | awk '{print $1}'); do kill $p 2>/dev/null; done
```

`references/window.md:11-12` arms the login **and every publish** under `script -qfc '<command>' <log>`, so the `script -qfc` alternative matches an upload as readily as a login. `.agents/orchestration.md:669-670` bans a pattern kill. `login-diag.sh:22` in the same wave uses the sanctioned `ps -eo pid,ppid,comm` form, so the compliant shape was in hand.

Ruling on the claim's question: the law's text **is** discoverable at that moment — `window.md:29` says "Kill it by process id and mint a fresh flow" in the same section. The instrument disobeyed a rule stated where it binds. The text gap is narrower: no rule names the collision the shared `script -qfc` arming creates.

Why it matters: a login retry run beside a live layer kills that layer's uploads, and the deaths read as the registry refusing them.

Class: Skill refinement.
Landing: `references/window.md` § Arm the terminal, after the `script -qfc` rule. State that the shared arming makes a login and a publish indistinguishable on the command line, so every kill in this procedure reads a recorded process id.

### O10 — `references/wave.md` § Sweep the self-pins names an instrument that cannot reach the class the wave met

`:103` prescribes: "`grep` the prior version literal across `tests/` and `src/` in the publishing package".

`tests/src/core/fixtures/source-manifest.txt:3` declares `"version": "0.0.1"` — the generated workspace's version, not scaffold's — and `:65-68` carry `@orkestrel/guide ^0.0.17`, `@orkestrel/probe ^0.0.12`, `@orkestrel/scaffold ^0.0.63`, `@orkestrel/test ^0.0.13`. Scaffold's own prior literal appears nowhere in the file, so the prescribed grep returns no hit, while `ledger.md:7` records "the generated-manifest fixtures moved with the bump" as a preparation-commit edit. The section's nearest line at `:110-113` covers a **digest** re-taken after the install, a different mechanism from a plain-text snapshot of generated output.

Class: Skill refinement.
Landing: `references/wave.md` § Sweep the self-pins. Add the class: a fixture snapshotting generated output carries the ranges the package writes rather than the package's own version, so sweep the prior range of every re-pinned dependency across `tests/` alongside the version literal.

### O11 — `references/wave.md` § Rule on the bump carries no trigger for the release guide took

`ledger.md:130` records the cause: the first L0 visits reddened at `check` because `npm install` restored the registry's guide `0.0.15` over the staged tip while every consumer's `tests/guides.test.ts` reads the tip's renamed API (`extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, `symbol.keyword`). Guide published `0.0.16` on its own account ahead of L0 (`ledger.md:9`) and again at L3 (`:40`).

§ Rule on the bump at `:57-72` triggers on a moved dist and a moved runtime dependency set. Neither fires on a consumer's test reading a development dependency's renamed API. This is a **missing** trigger.

Scaffold's third release is a **stated** trigger and needs no new law: `.agents/orchestration.md` § What a bump obliges already rules that a development bump moving the published artifact is no longer a development bump and must be proved from the build, which `distdiff2.mjs` did. Landing `ROADMAP.md:322-323` as a fresh law duplicates it.

Class: Skill refinement.
Landing: `references/wave.md` § Rule on the bump. Add: a development dependency whose renamed API the consumers' tests already read publishes on its own account ahead of its layer, because each consumer's install restores the registry copy over any staged tip, and it publishes again at its own slot when its runtime ranges move. Add the range-embedding case beside the version-embedding bullet at `:68-72`: a package whose build writes its own declared ranges into published output emits them, so its dist moves on a development re-pin.

### O12 — Instrument authorship, staging, and gate invocation were absorbed with no brief, no report, and no audit

`tmp/units/wave-record/` holds no `*-brief.md` and no `*-report.md` for `prep-one.sh`, `publish-layer.sh`, `repin.mjs`, `distdiff2.mjs`, `devstale.mjs`, `login-retry.sh`, or `push-main.sh`. `.agents/orchestration.md:139-141` assigns exactly those units to `builder` and `verifier` "each with a brief and an audit like any other unit. Only the commit and the push stay with the Orchestrator."

**Ruling on the bucket the brief asks for.** The absorption is a **deviation** for the preparation, comparison, and push instruments, and a **genuine limit** for the upload loop alone.

- `prep-one*.sh`, `repin.mjs`, `distdiff2.mjs`, and `devstale.mjs` are fully specified mechanical units that hold no credential and race no clock. Nothing about a one-time code reaches them. They are `builder` units with `verifier` evidence, as written.
- `publish-one.sh` and `publish-layer.sh` run inside a code whose measured life is under 60 seconds (`work/publish-console-1.log:1` at 20:25:02 against `work/publish-table-1.log:1` at 20:25:58) with the user at the keyboard relaying a URL or a code. No dispatched unit can hold that loop.

The record proves the cost of the wider absorption: `push-main.sh:8` gates its push on `git status --porcelain` being empty, which is the criterion `.agents/orchestration.md:275-277` names as wrong — "Reading 'is the tree dirty' instead of 'did this target pass' pushes a red target the moment one exists, and a flake makes that look like it worked." The wave had a red target (`ledger.md:99`, process reddening on a stdout-chunking assertion under load). A `verifier` unit is where the per-target status the push needed would have come from.

Class: Orchestration-contract refinement.
Landing: `.agents/orchestration.md` § Orchestrator and executor at `:139-141`. Keep the law and name the exception exactly: an interactive upload loop that must run inside a one-time code's life with the user at the keyboard stays with the Orchestrator, and every instrument that runs outside a window stays a `builder` unit with `verifier` evidence. I do not recommend a new release-operator role: the retained loop's only work is relaying and uploading, which the exception covers, and § Roles' "a role with no file has nowhere to pin either" makes a role whose whole job is a credentialed human handoff the wrong shape.

### O13 — `SKILL.md` § Load authority does not reach the contract sections the wave broke

`SKILL.md:13-14` names `.agents/orchestration.md` § Publishing the fleet and § Long-running commands, "Each named section binds every step here."

The wave broke `:275-277` (§ Writing concurrency, the per-target-green push), `:447-453` and `:455-456` (§ Dispatch anatomy, retention and log naming), and `:139-141` (§ Orchestrator and executor). None of those sections is named, so none was loaded at the moment it bound. Findings O1, O2, and O12 each trace to this one omission.

Class: Skill refinement.
Landing: `SKILL.md` § Load authority, the item at `:13-14`. Add § Orchestrator and executor, § Writing concurrency, and § Dispatch anatomy to the named sections.

### O14 — The wave's Grok lanes carry no journal handle

`report.md:3` rests the whole preparation report on two Grok lanes and cites `units/wave-draft-grok.result.md` and `units/wave-draft-checker-grok.result.md`. Neither path exists under `tmp/`. No journal path and no session id appears anywhere in `report.md` or `ledger.md`.

`.agents/orchestration.md` § Bench laws, rule "Journal first", requires a bench unit to return its journal path and session id with its result and the Orchestrator to confirm both before using it: "a bench unit with no journal ran on its driver's engine, however normal its answer reads." `grok.md:60-62` fixes the same return. This debrief's own absorb lane complies (`tmp/cursor/wave-debrief-absorb.jsonl` beside its brief, `.err`, and `.result.md`), so the shape was available.

Why it matters: nothing in the record proves the report's drafting and checking lanes reached Grok. The report's round table, its peer-edge analysis, and its obligation matrix rest on that provenance.

Class: Orchestration-contract refinement. `grok.md` needs no change; the defect is the record.
Landing: `.agents/orchestration.md` § Dispatch anatomy, in the retention rule at `:447`. A report resting on a bench lane names that lane's journal path and session id inside the report.

### O15 — `prep-one-3.sh` names its predecessor's usage and log

`prep-one-3.sh:2` states what changed, then repeats `prep-one-2.sh`'s header verbatim from `:2` onward, including a second "Successor of prep-one.sh" at `:2-3` and "Usage: prep-one-2.sh <pkg>" at `:8`.

Why it matters: claim 9 rests on each generation naming its predecessor **and** its own invocation. A stale usage line sends the next run to the superseded script.

Class: Orchestration-contract refinement.
Landing: `.agents/orchestration.md` § Long-running commands, beside the copy-the-file-before-editing rule. A successor script's header names its own file, its own log, and what changed from the file it supersedes.

## Claims attacked

**1. `references/wave.md` § Visit a repository can be run as written — BROKEN.** Step 1 (`:11-12`) dirties the tree; step 2 (`:13`) refuses a dirty tree (`19:35:05 codec scaffold overwrite exit=1`, "carries 2 uncommitted changes"). The visit's order must change, not § Prepare a layer's: the refusal fires inside the visit, and § Prepare a layer's commit at `:89` is a later, different commit ("before the window opens"). The install-after-overwrite already sits at § Visit a repository step 4 (`:36`) and must not be landed again. See O6.

**2. § Authorize the upload states the one-time-code path truly — BROKEN.** `:78-79` is false on both vectors, verified in the logs directly: one code carried console (20:25:02) through router and was refused `EOTP` at table 56 seconds after its first use, and another was refused before its first upload. The section also contradicts itself at `:81-82` and fences its only `EOTP` recovery to the browser path at `:93-94`. See O5.

**3. § Read the verdict from the registry is sufficient to chain a layer — BROKEN.** `work/publish-layer-abort.log:1-2` shows the chain stopping on an upload the registry served four minutes later. The section supplies no positive chaining signal, and `work/publish-table-1.log:31-32` shows why the exit code cannot substitute. See O7.

**4. § Reach the approval and § Arm the terminal get a reader to a live approval URL through a multi-address proxy — BROKEN.** The section's timing model (45 seconds, `:48-52`), its diagnosis (`:29`, "an expired attempt"), and its cause list (`:125-132`) all miss the first-poll egress `403`, and `:57-58` forbids the mint loop that reached a live URL. See O8.

**5. The order law and the catalog `Layer` column place every package in a round it can publish in — BROKEN.** `.agents/orchestration.md:850-851` says "runtime `dependencies` alone"; the catalog places middleware at `L2` (`.claude/agents/orkestrel.md:67`); middleware published at L3 after server on a peer range (`ledger.md:56`). Ruling on the law's text only, as the brief directs. See O4.

**6. § What a bump obliges plus § Rule on the bump let a reader derive guide's and scaffold's releases — SPLIT.** Guide's early own-account release is a **missing trigger**: neither section reaches a consumer's test reading a development dependency's renamed API, and the wave paid a re-baseline for it (`ledger.md:128-130`). Scaffold's release on a development re-pin is a **stated trigger**: § What a bump obliges already rules a development bump that moves the published artifact and requires the build to prove the direction, which `distdiff2.mjs` did. See O11.

**7. Instrument authorship, staging, and gate invocation held as `builder` and `verifier` units — BROKEN, and ruled a deviation for everything outside the upload loop.** No brief and no report exists for any instrument. The one-time-code limit reaches `publish-one.sh` and `publish-layer.sh` and nothing else. `push-main.sh:8` is the measurable cost. See O12.

**8. Every kill is by process id — BROKEN.** `login-retry.sh:15` kills by a `ps -eo pid,args | grep` pattern whose `script -qfc` alternative matches every live upload. The law's text **is** discoverable at that moment (`window.md:29`), so the charter is not at fault; the unnamed consequence of the shared arming is. See O9.

**9. Every correction is re-runnable from what the wave kept — BROKEN.** The generations name each other (`prep-one-2.sh:2`, `prep-one-3.sh:2`), but `distdiff.mjs` and `published.sh` are absent, the `instruments/` and `*.log.txt` paths the ledger cites do not exist, the two Grok lanes' distillates are gone, and `prep-one-3.sh:8` names its predecessor's usage. See O3, O14, O15.

**10. § Sweep the self-pins names every self-pin class the wave met — BROKEN.** The browser version literal is covered. The golden digest is covered at `:105-107`. The generated-manifest snapshot fixture carrying the toolchain ranges is not reachable by the prescribed grep at all — `tests/src/core/fixtures/source-manifest.txt` carries `"version": "0.0.1"` and the dependency carets, and never scaffold's own prior version. See O10.

**11. Each `ROADMAP.md` § 4 sentence has exactly one correct home — BROKEN on two sentences.** Rulings, sentence by sentence:

| `ROADMAP.md` sentence | Ruling | Home |
| --- | --- | --- |
| Multi-address proxy refuses a poll from a non-minting address; mint on a kept-alive connection and retry until an attempt survives its first poll | Splits: host fact plus process law | Host fact stays in `ROADMAP.md`; the law lands in `references/window.md` § Read a `403` on the poll and § Reach the approval (O8) |
| An upload's outcome is read from the journal's acceptance line, because the registry's read lags its processing | Process law | `references/window.md` § Read the verdict from the registry (O7) |
| One code carries a layer's uploads back-to-back; a refused package resumes on a fresh code | Process law | `references/window.md` § Authorize the upload (O5) |
| `scaffold overwrite` refuses uncommitted changes, so the re-pin and bump commit before it | Process law | `references/wave.md` § Visit a repository, a new step between the install and the overwrite (O6) |
| …and it moves the toolchain ranges, so the install repeats after it before the gates | **Already canon — must not land** | `references/wave.md` § Visit a repository step 4 (`:36`) states it. Landing it again creates a duplicate that drifts |
| A development dependency whose API the consumers' tests read publishes on its own account ahead of its layer and again at its slot | Process law, missing trigger | `references/wave.md` § Rule on the bump (O11) |
| A peer range is an ordering edge | Process law | `.agents/orchestration.md` § Publishing the fleet at `:850-851` (O4). The `.claude/agents/orkestrel.md:123-127` paragraph states the same derivation and must be reconciled, not given a second copy (O16 below) |
| A package whose build embeds its development ranges takes a release from a development re-pin | **Instance of a stated law — lands as an example, not a law** | `references/wave.md` § Rule on the bump, beside the version-embedding bullet at `:68-72` (O11) |

**12. The `orkestrel-publish` skill reads as one system — BROKEN.** The wave overrode § Visit a repository's order on **every** target, which is the "step the wave always overrode" the lens names (O6). § Spend the window, the skill's longest section, binds a path the wave never took for any upload, while the path it took holds one contradictory line (O5). § Load authority omits three contract sections the wave then broke (O13). One restatement stands: `window.md:83-84` states the credential law and then names its owner; that is a duplicate with a pointer, and the pointer is what keeps it from drifting — I do not raise it as a finding.

**13. The `orkestrel` charter states the layer derivation truly, and the Codex mirror agrees — BROKEN on the Claude charter; the mirror holds.** I read `.claude/agents/orkestrel.md:123-124` as "The `Layer` column in the catalog table is the publish round, derived from the runtime edges in the same row." The table's own column is headed `Runtime dependencies` and the middleware row at `:67` carries no peer edge, so a reader cannot derive middleware's L3-after-server placement from the row the sentence points at. `.codex/agents/orkestrel.toml:10-11` states no derivation at all and points at `.claude/agents/orkestrel.md` "as the canonical ecosystem catalog and operating reference" — the correct bridge shape, and it agrees by construction.

**O16 (from claim 13) — the layer paragraph is underivable from the table it describes.**
Landing: `.claude/agents/orkestrel.md` § Versions, the paragraph at `:123-127`. Either the generated table carries the peer edges the derivation reads, or the paragraph states that the round is derived from runtime and peer edges of which the row shows the runtime ones alone. Mirror discipline is satisfied by the Codex file's pointer; no second copy is created.

## Objective lens coverage

- **Duplication diff.** Whole-line and obligation-level comparison across `SKILL.md`, `references/wave.md`, `references/window.md`, `.agents/orchestration.md` §§ Publishing the fleet / Orchestrator and executor / Long-running commands / Writing concurrency / Dispatch anatomy / Bench laws, `.claude/agents/orkestrel.md`, `builder.md`, `verifier.md`, `grok.md`, and `.codex/agents/orkestrel.toml`. Duplicates found: the layer derivation stated in both `.agents/orchestration.md:850-851` and `.claude/agents/orkestrel.md:123-127` (O4, O16); the install-after-overwrite that `ROADMAP.md:320-321` would land a second time on `wave.md:36` (claim 11); the credential law at `window.md:83-84`, ruled acceptable because it names its owner. `SKILL.md:48-50` summarizes its own reference's § Prepare a layer, which `.claude/rules/documentation.md`'s concise-`SKILL.md` rule admits.
- **Mechanical-equivalence groups.** Bound of the sweep: the role files the brief names — `.claude/agents/orkestrel.md`, `grok.md`, `builder.md`, `verifier.md`, and `.codex/agents/orkestrel.toml`. I did not read the remaining Claude charters or Codex mirrors. In the sweep's population, `builder` (`sonnet`/`low`/`acceptEdits`, with `Edit` and `Write`), `verifier` (`sonnet`/`low`/`default`, `Bash` and no write tools), `grok` (`sonnet`/`low`/`default`, `Bash` for the bridge launch), and `orkestrel` (`sonnet`/`low`/`dontAsk`, no `Bash`) are distinct on the tool axis alone, so no equivalence group forms. No finding.
- **Charter-versus-usage drift.** `builder` and `verifier` carry powers the wave never exercised — no unit of either was dispatched (O12). `grok` was dispatched and its journal-return charter at `:60-62` was honoured by the driver but not recorded by the Orchestrator (O14). `orkestrel`'s charter forbids treating the catalog as live state (`:28-32`); `report.md:97` and `:202` both reconcile the catalog against a registry reading, so that charter held. No wording in any charter produced a deviation report in this wave.
- **Promise-versus-tooling gaps.** `orkestrel` promises reconciliation and disclaims collection with no `Bash` and no network, and its charter states the evidence comes supplied (`:20-26`) — no gap. `verifier` promises exit-code truth and holds `Bash` — no gap. `grok` promises a journalled bench round trip and holds `Bash` — no gap. The gap is not in a charter: no role in the table at `.agents/orchestration.md:143` onward can hold a credentialed interactive upload loop, which is why the Orchestrator absorbed it (O12).
- **Roster completeness on both axes.** Model agents span Grok, Opus, and Sol on both providers with named bridges. Task agents span implementation, evidence, design, review, and distillation. The campaign's work classes map cleanly onto them except the release operator's, and my ruling there is that the exception clause at `:139-141` is the correct remedy rather than a new role (O12). The evidence axis has no hole the wave revealed: `verifier` and `checker` both existed and neither was dispatched, which is a routing failure rather than a roster one.

## Referrals to the subjective lane

Each of these I can evidence but not rule, because the decision is shape and voice rather than correctness.

- **`references/window.md`'s weighting.** The browser-authorization path holds a full § Spend the window; the one-time-code path the wave used for every upload holds one contradictory line at `:78-79`. I ruled the sentence false (O5). Whether the correction is a bullet in § Authorize the upload or its own section beside § Spend the window is a structural call.
- **`ROADMAP.md` § 4's scaffold row.** It reads as a plan row while carrying process laws awaiting homes. Once O4 through O11 land, what remains is the host fact about this proxy's egress addresses. Whether a single host fact justifies keeping the row, or belongs in `guides/scaffold.md`, is a voice and product-coherence call.
- **`.claude/agents/orkestrel.md:123-127`.** I ruled the paragraph underivable from its own table (O16). Whether the remedy is a peer column in the generated table or a sentence naming the edges the row does not show is a design-fit call, and it interacts with the live `catalog-peers` unit's output.

## Referral to the Orchestrator

- **`report.md:3`'s provenance is unverifiable.** Both Grok lanes' distillates are absent and no journal handle was recorded (O14). The release is accepted and not under audit, but the preparation report's round table, peer-edge analysis, and obligation matrix are the durable artifact the next wave reads. Decide whether that report is retained as evidence, retained with its provenance marked unproven, or re-derived.

INSTRAUDIT OBJECTIVE: O1, O2, O3, O4, O5, O6, O7, O8, O9, O10, O11, O12, O13, O14, O15, O16
