# Audit brief — the instruction set the publish wave ran on (debrief of 2026-09-05)

## Role and lane

Two read-only lanes on Claude Opus 5 in clean contexts, blind to each other. The GPT-5.6 Sol bench is dark in this session (`codex: command not found`, probed 2026-09-05 00:50 UTC), so Opus holds every lane as `.agents/orchestration.md` § Engine assignment prescribes, and the substitution is recorded here.

- `reviewer` holding the **subjective** lane: the lens list at `.agents/skills/orkestrel-debrief/references/instruction-audit.md` § The subjective lens list. State your coverage against that section, lens by lens.
- `reviewer` holding the **objective** lane, as the recorded substitution for the dark Sol bench: the lens list at `.agents/skills/orkestrel-debrief/references/instruction-audit.md` § The objective lens list. State your coverage against that section, lens by lens.

Say in your first line which lane you held and the engine substitution. Hold the named perspective in full.

## Subject

The instruction set as the publish wave of 2026-09-04 exercised it, judged against the wave's record:

- `.agents/skills/orkestrel-publish/SKILL.md`, `references/wave.md`, `references/window.md` — the skill the wave ran under.
- `.agents/orchestration.md` § Publishing the fleet (with § Fixing a dependency before it publishes and § What a bump obliges), § Long-running commands, § Orchestrator and executor, § Dispatch anatomy, § Writing concurrency.
- `.claude/agents/orkestrel.md` (the catalog role and the vendored floor prose under the table), `.claude/agents/grok.md`, `.claude/agents/builder.md`, `.claude/agents/verifier.md`, and the Codex mirrors under `.codex/agents/`.
- `ROADMAP.md` § 4 "The publish wave's obligations": the scaffold row holds the wave's process laws as sentences with no home in the canon yet. This round decides where each lands.

## Evidence

Read-only, all paths relative to `/home/user/scaffold`:

- `tmp/units/wave-record/report.md` — the preparation report (the round table, the peer edges, the plan).
- `tmp/units/wave-record/ledger.md` — the ledger: what landed when with the registry confirmation, § The login, § Re-baseline at L0, § Release report, § After the release.
- `tmp/units/wave-record/*.sh` and `*.mjs` — the instruments as retained: `prep-one.sh` → `prep-one-2.sh` → `prep-one-3.sh` (the per-package visit, three generations; each header names what changed), `publish-layer.sh`, `login-retry.sh`, `login-diag.sh`, `repin.mjs`, `distdiff2.mjs`, `devstale.mjs`, `release-commit.sh`, `push-main.sh`.
- `tmp/units/wave-record/work/` — the working logs (per-package `prep-<pkg>*.log`, per-slice `layer-*.log`, upload journals `publish-<pkg>-1.log`, chain logs `publish-layer-<pkg>.log`, `login*.log`, `devround-*.log`, `push-main*.log`, `ollama-*.log`, release messages `release-<pkg>-msg.txt`).
- `tmp/cursor/wave-debrief-absorb.result.md` — the Cursor Grok distillate of that record with `file:line` pointers (a proposal: test each pointer you use against the file).
- The prune commit `69ca1082` message, quoted: "The wave's process laws are carried by `ROADMAP.md` § 4 as the row that lands them in `.agents/skills/orkestrel-publish/references/wave.md` and `window.md` with scaffold's next vendored release".

Verbatim readings the Orchestrator took (each checked against the file named):

- `tmp/units/wave-record/work/publish-table-1.log:1` `Script started on 2026-09-04 20:25:58+00:00 [COMMAND="npm publish --ignore-scripts --browser=false --registry=https://registry.npmjs.org/ --otp=385882 < /home/user/work/wave/publish-table.fifo" …]`; `:25` `npm error code EOTP`; `:31` `Script done on 2026-09-04 20:26:00+00:00 [COMMAND_EXIT_CODE="1"]`. The same code carried console (20:25:08) through router (20:25:58) in `work/publish-layer-console.log:1-8`, then `STOP at table (no acceptance line)` at `:10`.
- `work/publish-brief-1.log:1` a code minted at `21:46:05` refused `EOTP` at `:25`, `Script done … 21:46:10`; the layer then rode a fresh code, `work/publish-layer-brief.log:1-6`, `LAYER-PUBLISHED`.
- `work/publish-layer-abort.log:1-2`: `20:03:14 \abort 0.0.9: registry serves nothing yet (exit=0, …)` then `STOP at abort` — the chain stopped on an upload the registry had accepted (`ledger.md`: abort served `0.0.9` at 20:07). `publish-layer.sh:11` was then keyed on the acceptance line `+ @orkestrel/<pkg>@`.
- The session transcript, 2026-09-04 19:35 UTC, the first L0 visit: `19:35:05 codec scaffold overwrite exit=1` / `TARGET: The target at . carries 2 uncommitted changes. Commit them, or pass --dirty to waive the refusal.` / `19:35:05 codec PREP-codec-RED scaffold overwrite` (the same for msg and test). `prep-one-2.sh` answered with the preparation commit before the overwrite; `prep-one-3.sh:1-5` names both changes.
- `ledger.md` § The login: `403 {"message":"forbidden"}` on a poll from an address other than the minting one; `202` every 3 seconds on one kept-alive connection; the click landed on the third relayed link at 19:32.
- `login-retry.sh:16` kills the dropped attempt with `ps -eo pid,args | grep -E '[n]pm login|[s]cript -qfc'` — a kill by pattern.
- `report.md` § The round and `ledger.md` rows for middleware `0.0.19` and mcp `0.0.28`: published "L3, after server" with peer ranges `@orkestrel/server ^0.0.18`; the catalog table at `.claude/agents/orkestrel.md:67` places middleware at `L2`, and `src/core/helpers.ts:719-741` derives layers from `entry.dependencies` alone (`src/server/Upstream.ts:611-614`: "Development edges are deliberately not read").
- `ledger.md` § Re-baseline at L0: guide published `0.0.16` on its own account ahead of L0 because every consumer's `tests/guides.test.ts` read its renamed API while the catalog placed guide at L3.
- `ledger.md` § The closing round: scaffold's `dist/src` moved on a development re-pin "because the compiler embeds the ranges it writes into generated workspaces", released as `0.0.63`.
- `ledger.md` § The closing round: process "reddened on a chunking assertion under load and re-ran alone".
- `tmp/units/wave-record/` holds no `*-brief.md` or `*-report.md` for any instrument: every instrument was Orchestrator-authored and Orchestrator-run, and no `builder` or `verifier` unit was dispatched for staging, gates, or instrument authorship.
- `distdiff2.mjs:26` answers `{ moved: 'ERR', error: 'no published copy …' }` when the tarball baseline is absent; the closing round's toolbox and ollama rows first read as a bump owed because their tarballs had not been fetched (`work/devround-*.log`), then unmoved once fetched.

## What the round decides

Which of the wave's process laws become canon and where each lands (skill reference, contract section, rule, charter, guide, or roadmap), which instruction defects the record proves (a step that cannot run as written, a claim the record falsifies, a law the wave broke that the text did not make actionable), and whether the Orchestrator's absorption of instrument authorship and gate evidence in this wave is a deviation to correct or a limit the contract must state for an interactive release.

## Already established

The release itself is accepted (`RELEASE: LANDED`, records `64631e31`); the bump rulings and the registry confirmations are not under audit. The prune is done and authorized. A lane that disagrees with a release ruling records a referral, not a finding.

## Claims

Attempt to break each one. A claim you cannot break is held, with the evidence that convinced you.

1. `references/wave.md` § Visit a repository can be run as written: its steps, in its order, complete on a target at the wave's state without a refusal. (The overwrite refusal on an uncommitted re-pin is the vector; rule whether the visit's order or the layer's order in § Prepare a layer is what must change, and where the install-after-overwrite belongs.)
2. `references/window.md` § Authorize the upload states the one-time-code path truly: "it carries neither a window nor a race", and "Ask for the code at the moment of the upload". (The code that carried eight uploads and was refused at the ninth about 56 seconds after its first use is the vector; so is the code that expired unused before its first upload.)
3. `references/window.md` § Read the verdict from the registry is sufficient to chain a layer: a reader following it does not stop a chain on an accepted upload. (The abort chain's `serves nothing yet` stop is the vector.)
4. `references/window.md` § Reach the approval and § Arm the terminal get a reader to a live approval URL through a proxy that leaves from several egress addresses. (The 403-on-first-poll drop is the vector; rule what the reference must say and what stays a host fact for the roadmap or the transport.)
5. `.agents/orchestration.md` § Publishing the fleet's order law — "topological layer order derived from runtime `dependencies` alone" — and the catalog's `Layer` column place every package in a round it can publish in. (middleware and mcp are the vector. Rule on the law's text; the code fix is a separate unit this round dispatches.)
6. § What a bump obliges together with `wave.md` § Rule on the bump let a reader derive guide's early own-account release and scaffold's release on a development re-pin from the written triggers, without a re-baseline. (Rule whether each is a missing trigger, a stated one, or a repository fact for the guide.)
7. `.agents/orchestration.md` § Orchestrator and executor's law that instrument authorship, staging, and gate invocation are `builder` and `verifier` units held in this wave, or the contract states the limit under which it does not. (No brief or report exists for any instrument. Rule the bucket: a deviation the next release corrects as written, or a contract clause for an interactive upload loop whose one-time codes live under a minute.)
8. The wave's instruments obey § Confirm dead before relaunching: every kill is by process id. (`login-retry.sh:16` is the vector; rule whether the law's text is discoverable at the moment a login attempt must be killed, and whether the skill's § Arm the terminal must point at it.)
9. Every correction the wave made is re-runnable from what it kept: each instrument generation names its predecessor and what changed, and each deviation's recovery is a file. (The three `prep-one` generations and the chain logs are the evidence; the absent briefs are the counter-evidence.)
10. `wave.md` § Sweep the self-pins names every self-pin class the wave met: a version literal in `src/` (`BROWSER_HAR_CREATOR.version` in browser), generated-manifest snapshot fixtures carrying the toolchain ranges (scaffold's `tests/src/core/fixtures/*.txt`), and a golden digest.
11. Each sentence of the `ROADMAP.md` § 4 scaffold row is a process law with exactly one correct home in the canon, or a host or repository fact that belongs in the guide or stays in the roadmap. Rule each sentence: the multi-address proxy login; the acceptance line as the upload's verdict; one code per layer with resume on a fresh code; the preparation commit before `scaffold overwrite` and the install after it; the early own-account release of a development dependency whose API the consumers' tests read; the peer range as an ordering edge; the release a development re-pin forces where the build embeds ranges.
12. The `orkestrel-publish` skill reads as one system with the contract and the debrief's retention procedure: no step the wave always overrode, no step the wave always skipped, and no restatement of a contract law inside the skill.
13. The `orkestrel` role charter (`.claude/agents/orkestrel.md`, prose outside the marker-bounded table) states the layer derivation truly once the peer edge is an edge, and the Codex mirror agrees.

## Output

Per `.agents/skills/orkestrel-debrief/references/instruction-audit.md`: numbered findings, most severe first, each with the file and line, what is wrong, why it matters, the refinement class from § Refinement classes, and the exact landing (file and section) you propose. Then the claims attacked and held, with the evidence. Then referrals outside your lane. Then exactly one terminal line: `INSTRAUDIT SUBJECTIVE: <finding ids, or none>` or `INSTRAUDIT OBJECTIVE: <finding ids, or none>`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing; run nothing. If a file this brief names is absent, say so in a deviation line and continue with the rest.

## Standing conditions

A `builder` unit (`tmp/units/catalog-peers-brief.md`) is live in this checkout while you read: it edits `src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, `src/server/Upstream.ts`, `src/server/Materializer.ts`, tests under `tests/`, `guides/scaffold.md` § Fleet catalog, and the one prose sentence at `.claude/agents/orkestrel.md:123-124`. You may find those files in either state; for claim 13 rule against the sentence as this brief quotes it and say which state you read. Nothing else in the tree is moving. The GPT-5.6 Sol bench is dark; the Cursor Grok bench ran the absorption lane whose distillate the Evidence section names.
