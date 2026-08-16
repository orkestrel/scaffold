# Unit D1 — land the debrief's canon refinements

Role: `implementer`. Engine: Opus 5, native, sole serial writer in `/home/user/scaffold`
from the committed baseline. Perform the assignment directly and spawn nothing.

## Authority

Read `.agents/orchestration.md`, `AGENTS.md` (Writing + Instruction-files sections bind
every sentence you land), and the two skill references named below when you edit them.

## Objective

Apply the reconciled refinement set R1-R17, R22, R23 from the A-campaign debrief to the
canon files, exactly as prescribed below. Prescribed sentences are the substance; you own
placement, list punctuation, and voice conformance to the surrounding file. Do not add
rationale sentences beyond the prescriptions — instruction files carry the rule and its
trigger, not persuasion.

## Context

- These files are the scaffold host inventory: the build stages them into the published
  `dist/host`, so this unit moves the vendored surface (release is the owner's later
  decision — out of your scope).
- Standing condition: `.orkestrel/debrief/**` and `tmp/**` contain campaign artifacts —
  off-limits, do not read or edit.
- The working tree is clean at dispatch; commit nothing.

## Unknowns

`analyst.toml`'s exact current wording of its conditional verdict-shape clause is
unverified; find the clause matching "when the dispatch names a skill that fixes the
verdict shape" and apply edit 14's replacement to it. If no such clause exists, report
that in your return instead of inventing a location.

## Scope

Owned files (all edits below land only here):
`.agents/orchestration.md`; `CLAUDE.md`;
`.claude/agents/codex.md`, `grok.md`, `planner.md`, `reviewer.md`, `analyst.md`, `checker.md`, `sol.md`;
`.codex/agents/claude.toml` (new), `planner.toml`, `reviewer.toml`, `opus.toml`, `analyst.toml`, `grok.toml`;
`.claude/rules/quality.md`, `.claude/rules/tests.md`;
`.agents/skills/orkestrel-debrief/references/field-testing.md`, `instruction-audit.md`.

Off-limits: everything else, explicitly `AGENTS.md`, `.orkestrel/**`, `tmp/**`,
`.agents/skills/orkestrel-falsify/**`, credentials of any kind. No installs, no commits,
no pushes, no tree-wide mutating gates.

## The edits

1. **orchestration.md — execution loop step 5 (R1).** Replace the sentence "Run the
   two-lane adversarial pass on every nontrivial implementation: `reviewer` for the
   subjective lane and `analyst` for the objective lane, plus `checker` for mechanical
   conformance." with: "Audit every nontrivial implementation with at least one lane
   whose engine did not write it. Run the second lane when the first returns FAIL, when
   the subject is a rendered or externally driven surface, or when the unit's claims span
   both correctness and shape. Dispatch `checker` when the acceptance criteria are
   mechanical — counts, paths, parity rows, scope honesty. Record in the round's verdict
   file when a lane or the checker did not run." Keep the step's remaining bullets.
2. **orchestration.md — adversarial pass scope (R1).** Replace "Two lanes run on every
   design round and every audit round." with "Two lanes run on every design round; an
   audit round runs the lanes the execution loop's step 5 names, on the same
   clean-context terms." Replace "**Both lanes always run.** Never collapse them into
   one. Never let an engine's absence stand in for a lane." with "**A required lane
   always runs.** Never collapse two required lanes into one. Never let an engine's
   absence stand in for a required lane."
3. **orchestration.md — Confirm dead before relaunching (R2).** Add one bullet: "A
   killed `codex exec` is dead only when its process tree is dead: walk the children
   with `ps --ppid` and confirm the `codex-code-mode-host` child is gone. Before
   dispatching a substitute writer, check the owned files' modification times against
   the baseline — a live orphan is still writing the tree the substitute is about to
   own."
4. **orchestration.md — step 4 Integrate (R5).** Append: "Integration applies exact
   returned patches and mechanical conflict resolution only. A new type, mechanism,
   behavior, or acceptance criterion discovered at integration is a successor brief
   routed to a writer, never an integration edit."
5. **orchestration.md — Launching, network sentence (R5).** Replace "belong to the
   Orchestrator's own tracked commands or a network-capable native agent" with "belong
   to the Orchestrator's own tracked commands or to the native `implementer` or
   `builder` as an ordinary dispatched writing unit".
6. **orchestration.md — Acceptance laws (R5).** Add one law: "When the Orchestrator
   writes any part of a unit, that part is briefed, owned, and audited like any other
   part, and its auditor is an engine the Orchestrator does not share."
7. **orchestration.md — Dispatch anatomy retention (R6).** Replace the bullet "Treat the
   `tmp/` brief and report pair as ephemeral launch copies. **Bench laws** rule 4 owns
   what is kept and what is swept; follow it there rather than deciding here." with:
   "Retention is uniform for every unit, whatever engine ran it, including an
   Orchestrator-owned integration, fix, probe, or capture unit: copy the brief, the
   returned report or distillate, the audit verdict, the exact executed script or
   instrument, and the acceptance evidence into `.orkestrel/<package>/` as the unit is
   dispatched and as it returns, then sweep only the `tmp/` launch copies. A capture
   claim's instrument is acceptance evidence; the frames may be swept once the record
   transcribes them, because the committed instrument re-produces the film. **Bench
   laws** rule 4 owns journals and points here for everything durable."
8. **orchestration.md — Bench laws rule 4 (R6).** Rewrite rule 4 so it owns only the
   journal stream: keep "A journal proves a bench is alive and recovers an interrupted
   session. Keep journals under `tmp/`, never commit them, and sweep them at acceptance
   after the final gate evidence is recorded." and replace the remainder of the rule
   with "Durable retention — brief, distillate, verdict, instrument, acceptance
   evidence — is owned by **Dispatch anatomy**; this rule owns only the journal stream."
9. **orchestration.md — Reaching the approval (R7).** Add two bullets: "Launch the login
   chain only when the user has signalled they are at the keyboard and will click within
   ten minutes. An approval URL expires unclicked in about ten to fifteen minutes, and
   an overnight gap expires the session credential with it." and "A login log showing
   the spinner and then a legacy `Username:` prompt is an expired attempt, not a prompt
   to answer: kill it by process id and mint a fresh flow."
10. **orchestration.md — Dispatch anatomy meta-law (R7).** Add one bullet beside the
    promote-before-sweep bullet: "Land a process rule stated as binding mid-campaign in
    the owning rule or contract file in the same commit that states it. A campaign
    artifact is evidence, never a rule's home."
11. **orchestration.md — Roles (R10).** Add one bullet: "Mirroring is by work class, not
    filename. A transport contract is provider-specific: `.claude/agents/codex.md`
    carries the Sol transport on the Claude side, `.codex/agents/claude.toml` the Opus
    transport on the Codex side, and each side's bridges bind their own by reference."
12. **orchestration.md — brief checks (R14).** In the fleet-wide-refactor check, replace
    "A criterion to delete or rename anything closes only when every importer is owned"
    with "A criterion that removes a symbol, or that makes an existing state or fixture
    shape unreachable, closes only when every consumer that exercises it is owned". In
    the off-limits check ("Read the acceptance criteria against the off-limits list…"),
    append: "A file the change will break that appears in neither list is an unscoped
    file; grant it or strike the criterion."
13. **codex.md — sandbox section (R3).** After the `--unshare-net` paragraph, add: "The
    namespace has its own loopback, so a host daemon on `127.0.0.1` is unreachable and a
    bind can fail `EPERM`. It has no IPv6, so `::1` fails `EAFNOSUPPORT`. Any proof that
    must reach a daemon, bind a port, or drive a built server belongs outside the exec."
14. **codex.md — analyst route (R11).** Replace "When the dispatch names a skill that
    fixes the verdict shape, that skill owns the value set and the terminal line." with
    "The verdict shape defaults to `orkestrel-falsify`; a dispatch may name a different
    skill that fixes another. That skill owns the value set and the terminal line."
    Apply the same replacement to the matching conditional clause in `analyst.toml`
    (see Unknowns).
15. **grok.md — dark-bench fallback (R23).** Replace "Stop with a deviation naming the
    fallback: hand the reading to the Orchestrator, `planner`, or `analyst` directly."
    with "Stop with a deviation naming the fallback from the root tedious-work ladder —
    Luna, then Sonnet. Never hand the reading to the Orchestrator, `planner`, or
    `analyst`."
16. **planner.md — Tensions (R8).** Replace "`Tensions`: subjective choices that Sol
    should challenge objectively." with "`Tensions`: the choices your lane made on
    judgment, named for the other lane to challenge — or, when you hold both lanes, for
    the Orchestrator to rule."
17. **reviewer.md (R8 + R11).** Replace "Anything you cannot settle on subjective
    grounds becomes an Analyst referral rather than a verdict of yours." with "Anything
    you cannot settle within your lane becomes a referral — to the other lane when it is
    running, to the Orchestrator when you hold both — never a verdict of yours." Replace
    "when the dispatch names a skill that fixes the verdict shape, return that shape and
    its single terminal line" with "return the `orkestrel-falsify` verdict shape and its
    single terminal line unless the dispatch names a different skill that fixes one".
    Replace the "## Output contract — the Verdict" section body with: "- The
    `orkestrel-falsify` verdict shape: numbered per-claim verdicts, findings outside the
    claims, and its single terminal line — unless the dispatch names a different skill
    that fixes one.\n- Each required change carries file:line, what is wrong, why it
    matters, and what right looks like — actionable enough to re-dispatch verbatim.\n-
    **Referrals** — specifically evidenced questions outside your lane, addressed to the
    other lane when it is running and to the Orchestrator when you hold both, with no
    verdict from you.\n\nYou are read-only: you never edit. Return only the verdict,
    never your process." Update the mid-file sentence "report it as a specifically
    evidenced **Analyst referral**" to "report it as a specifically evidenced
    **referral**".
18. **analyst.md + sol.md — return contract (R22).** In each file's return section,
    state: the driver returns the brief path, the resolved command, the journal path,
    and nothing else; the Orchestrator launches the exec and reads Sol's answer from the
    `--output-last-message` file; a follow-up on a finished exec is a fresh dispatch,
    not a continuation. Remove the "once the Orchestrator reports the exec complete —
    Sol's answer verbatim" clause. In analyst.md also default the verdict shape per
    edit 14's sentence.
19. **checker.md — trigger (R1).** In the frontmatter description, replace "pairs with
    the judgment reviewer on every build" with "dispatched when a unit's acceptance
    criteria are mechanically checkable". Conform any body sentence that promises the
    every-build cadence to the same trigger.
20. **`.codex/agents/claude.toml` — create (R10).** The Claude transport contract,
    mirroring `.claude/agents/codex.md`'s structure at Codex scale: name `claude`;
    description "The Claude Opus 5 transport contract every Codex-side bridge follows:
    invocation, journalling, session ids, availability, and recovery. Reach a route by
    its own name — `planner`, `reviewer`, `opus`. Never dispatched directly for work.";
    model `gpt-5.6-terra`, effort low, sandbox read-only. Developer instructions must
    carry: read `.agents/orchestration.md` first; invocation `claude -p "<brief or
    pointer>" --model opus --effort high` with the permission mode the route pins;
    verify the `claude` CLI resolves and is authenticated before first use, and on
    failure return it immediately with the fallback named so the Sol main session
    records Opus unavailable for the round; journal every run with `--output-format
    stream-json` redirected to `tmp/claude/<unit>.jsonl` (gitignored) and record the
    session id — a bench unit with no journal ran on its driver's engine, however
    normal its answer reads; briefs never travel as shell arguments (write to
    `tmp/claude/<unit>-brief.md`, pass a pointer); long work is not launched by the
    bridge — return the brief path, the exact resolved command, and the journal path
    for the Orchestrator to launch under a cap it owns; never recommend a cap, never
    detach, poll, restart, or kill a run; never route orchestration or acceptance
    across the bridge; never read credentials, edit, or spawn.
21. **planner.toml, reviewer.toml, opus.toml — slim to the contract (R10 + R8 + R11).**
    Each keeps its frontmatter (name, description, model, effort, sandbox) and reduces
    developer instructions to: one line binding the transport — "`.codex/agents/claude.toml`
    owns the Claude transport contract in full; read it and follow it." — plus the
    route's own pins only: planner pins `--permission-mode plan` and the design brief
    shape (coherent API shape, vocabulary, ergonomics, at most two alternatives, bounded
    units naming role and engine, tensions named for the other lane to challenge or for
    the Orchestrator to rule when one engine holds both, risks; forbids edits, commands,
    reconciliation, orchestration, acceptance); reviewer pins `--permission-mode plan`
    and the audit shape (the `orkestrel-falsify` verdict shape and single terminal line
    unless the dispatch names a different skill; file:line on every required change;
    out-of-lane questions return as referrals; capture portfolio primary for rendered
    surfaces); opus pins `--permission-mode acceptEdits`, main checkout, sole serial
    writer from a clean committed baseline, the brief requirements (owned files,
    off-limits files, acceptance criteria, TTTDD, deviation contract; forbids installs,
    commits, pushes, publishing, credentials, destructive commands, shared-file edits,
    tree-wide mutating gates), the on-failure fallback to the Sol implementer, and the
    post-return verification (git status, diff, scoped validation → touched files,
    diffstat, validation evidence, deviation state, labeled untrusted). Every toml ends
    returning results labeled untrusted plus any CLI/auth deviation.
22. **grok.toml — model pin (R9).** Replace the clause pinning "cursor-grok-4.5-high"
    with: "Resolve the exact model from `CURSOR_GROK_MODEL`; `.claude/agents/grok.md`
    owns the current pin and the re-read rule. Never guess or substitute a model id."
23. **quality.md — pipeline masking (R15).** Append to the "Diagnose from the artifact"
    law: "Read a gate bare: a pipeline stage after it (`| tail`, `| grep`) reports the
    stage's exit status and hides the gate's failing lines."
24. **quality.md — mutation probe (R17).** Add one law under Falsification's "Rounds and
    verdicts": "A fix that adopts the auditor's prescription verbatim may close with a
    mutation probe in place of a fresh audit round: disable the load-bearing line, watch
    the adopted pin fail, restore it, and commit the pin as the regression guard. A fix
    that departs from the prescription gets the cross-engine round."
25. **tests.md — address family (R4).** Add one law where the file governs test servers
    and fixtures: "Bind a test fixture server to `127.0.0.1` on an ephemeral port
    (`listen(0)`), never to `::1` and never to a fixed port: a host without IPv6 fails
    `EAFNOSUPPORT`, and a fixed port flakes on occupancy."
26. **field-testing.md — re-films (R12).** Add to the scoreboard section: "A re-film
    that drives the surface with live models is a field pass: it carries the scoreboard
    and each lane's journal path like any other round."
27. **instruction-audit.md — subjective lenses + round shape (R13).** After the
    subjective-lane bullet add: "The subjective lenses, so the lane can state its
    coverage: role-job singularity; charter voice against dispatched usage; lane-swap
    residue; bridge minimalism; vocabulary drift across mirrored files; skill-family
    seams." Under "Two blind passes, one brief" add: "Each lane returns numbered
    findings, most severe first, and exactly one terminal line:
    `INSTRAUDIT <LANE>: <n> findings`."
28. **CLAUDE.md — foreground cap (R16).** Add one bullet under "Dispatch mechanism":
    "Foreground Bash is hard-capped at 10 minutes regardless of its timeout parameter.
    Launch anything that can exceed it as a harness-tracked background command."

## Deviation contract

A conflict with a prescription's substance — a target sentence that does not exist, an
edit that would contradict another prescription — stops the unit with expected/found/
evidence. Placement, bullet order, and heading choices are yours to decide and record in
the return.

## Validation

Scoped and read-only: after editing, run `npx oxfmt --check` (or the repository's format
check limited to your owned files if a scoped invocation exists) and report the result.
Do not run tree-wide mutating gates.

## Output

Touched files with a one-line delta each; the deviation list (or "none"); the scoped
validation result; the Unknowns report for analyst.toml. No process diary.
