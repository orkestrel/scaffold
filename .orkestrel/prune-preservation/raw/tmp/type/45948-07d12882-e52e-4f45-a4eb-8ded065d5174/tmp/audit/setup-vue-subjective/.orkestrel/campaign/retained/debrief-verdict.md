# Debrief verdict — the roughnotes redesign and the scaffold config-override campaign

Run 2026-09-16 under `.agents/skills/orkestrel-debrief`. Subjects: the roughnotes application
redesign and journey proving; the scaffold config-override campaign across four adversarial audit
rounds; the hardened-merge port back into roughnotes across two rounds; the skill refinements to
`orkestrel-prove-journey` and `enterprise-bootstrap`; and the `readHit` publication in
`@orkestrel/test`.

## Evidence produced for this round

- **Field pass** over the refined journey skill, three tiers, goal-only prompt:
  `field-pass-journey-skill.md`. Contaminated by design error; what it does and does not settle is
  recorded there.
- **Instruction-set audit**, both lanes on one brief, blind, per
  `references/instruction-audit.md`: subjective on Opus 5, objective on GPT-5.6 Sol through the
  Codex bench. Terminal lines `INSTRAUDIT SUBJECTIVE: F1–F11` and `INSTRAUDIT OBJECTIVE: O1–O7`.

## The finding table

Every finding ends in exactly one bucket with one carrier.

| Id | Finding | Bucket | Carrier |
| -- | ------- | ------ | ------- |
| **O1 + F2** | Retention copies artifacts without rewriting the `tmp/` paths inside them, and does not cover every audit lane's brief. Retained briefs name swept files; several lane briefs were never retained; four verdict and report files were missing outright | fix now, then process refinement | The four missing files are written: `scaffold/s2-audit-verdict.md`, `roughnotes/r1-audit-verdict.md`, `roughnotes/r2-audit-verdict.md`, `roughnotes/r4-report.md`. The contract law needs the owner's direction — see § Owner's direction |
| **F1** | `implementer` resolves to a different engine per harness, so a bench brief is un-re-runnable by role name; the Claude-side `sol` route was never reached by its own name in the whole campaign | process refinement, root contract | Owner's direction |
| **F6** | The Cursor transport contract sits in an agents directory against the contract's own law, and the two `grok` mirrors prescribe opposite Windows invocations — one forbids the shim the other mandates | process refinement, root contract, moves `dist/host` | Owner's direction |
| **F4** | The lane-swap clause names bench darkness as the only swap trigger; round four swapped lanes with the bench live, because Sol wrote the work under audit | charter refinement | Owner's direction, with wording supplied |
| **F7** | "Amend a brief on re-run" and "a successor file, and the original stays" prescribe opposite artifacts; this campaign produced both shapes | process refinement | Owner's direction, with wording supplied |
| **F8** | The shared numbered-claims file that made "both lanes ran the same brief" checkable is named in no instruction file; the campaign invented it four times | skill refinement | `orkestrel-falsify` reference, wording supplied |
| **O2 + F3** | Read-only roles are instructed to produce filesystem artifacts. The Claude charters never state their return channel; the Codex bridge drivers are told to write briefs and journals under a read-only sandbox | charter refinement | Wording supplied for both surfaces |
| **O3** | `orkestrel-falsify` says an audit lane "writes nothing and runs nothing" while its parent skill requires auditors to run attacks. A read-only filesystem does not forbid a nonmutating command | skill refinement | Wording supplied |
| **O4** | `.claude/rules/writing.md` bans `above` and `below`, and the policy table registers neither, so five violations passed every gate and two audit rounds that read them verbatim | rule refinement | Wording supplied; the sites are already closed |
| **O5** | Skill validation proves a referenced file exists and never proves an instructed API exists. `pressKeys` was named in the journey skill for an unknown period and is exported by nothing | skill refinement | Wording supplied; the dangling verb is already restored |
| **O6** | Charters prescribe unconditional stopping; the orchestration contract authorizes resolving an ancillary conflict. Units followed the contract and contradicted their charters | root-reference trim | Owner's direction, with wording supplied |
| **O7** | Absorption falls back to Luna then Sonnet, and neither native charter admits repository-scale absorption: `scout` excludes deep reading, `researcher` excludes repository-scale work | role create | Owner's direction |
| **F5** | The brief template's rows are not binding, and the rows this campaign dropped are the ones that map onto the deviations it hit | process refinement | Owner's direction, with wording supplied |
| **F9** | `orkestrel-build-application` is the only `orkestrel-` skill with no acceptance section, and the campaign that redesigned an application never named it | skill refinement | Wording supplied |
| **F10** | `instruction-audit.md` records a past campaign's narrative as a rule, against `AGENTS.md` § Instruction files | skill refinement | Wording supplied |
| **F11** | The Codex `verifier` mirror lacks the dirty-tree reading clause its Claude twin carries, and every gate run in this campaign ran over an uncommitted tree | charter refinement, mirror discipline | Wording supplied |
| **Field-1** | The field pass ran over a checkout carrying this campaign's own verdict, so the acceptance tier copied the answer instead of deriving it. `field-testing.md` § fresh state already bars this; the dispatch broke it | process, stays as-is | The law exists and was violated by the Orchestrator. Recorded; the clean probe is owed before the statechart trigger is called settled |
| **Field-2** | The acceptance tier resumed a retained verdict as its plan where both higher tiers ruled it evidence to re-verify | skill refinement | `orkestrel-prove-journey`, wording owed |

## Product findings, routed out of the instruction layer

The field pass surfaced shipping questions about roughnotes that no round in this campaign covered.
They are recorded in `field-pass-journey-skill.md` with their evidence sites and belong to that
repository's forward work, not to this instruction set. Three need the owner rather than an engineer:
the request copy that paints acceptance for a form that sends nothing, the absent privacy statement
beside a form collecting personal data, and fixture data carried under a real company's name.

## The three questions this round must answer

**Which findings came from falsification rather than diff reading?** Every finding the gates and the
mechanical lane could not see. The mechanical lane returned ACCEPT and the gates returned GREEN in
the same round both adversarial lanes rejected the work. The depth-limited flatten, the vacuous
control, the byte-identity proof, the unsound predicate, and the `asyncFlatten` ruling each required
an attempt to break the claim. The method is doctrine; the artifact that carried it — one shared
claims file both lanes are pointed at — is named nowhere. That gap is F8.

**Which shipped gaps were accepted as untestable, and was each irreducible?** One missing seam
correctly escalated and still open: the plugin-selection rule has no gate inside a generated
workspace, and closing it means editing a vendored file, which obliges a release. One derivation
standing in for a run: whether the three-unit change moved any non-`plugins` key was settled by two
lanes reading the same construction rather than by capturing a resolved configuration before and
after. The rest are bounded by the host's own behaviour and correctly shipped open.

**Which units could not be re-run from their own recorded brief?** Six, in two classes. Briefs that
survive while the file they name was swept — S1, S2, the S1 objective audit lane, the S3 objective
audit lane, and the roughnotes design round, whose entire staged authority set is gone and whose
brief forbids the only surviving copy. And rounds whose lane briefs were never retained at all,
including the checker brief that caused the round-one deviation, which is now the one brief nobody
can read.

## Owner's direction needed

`.agents/skills/orkestrel-debrief` requires the owner's direction where the root contract is
touched, and two findings additionally move the vendored `dist/host` surface and therefore oblige a
release.

1. **F1 — rename the implementation lanes by engine** (`sol` and `opus` on both provider surfaces),
   retiring the harness-relative `implementer` token. Touches `.agents/orchestration.md`,
   `CLAUDE.md`, both transports, and both agent directories.
2. **F6 — create `.agents/transports/cursor.md`** and reduce both `grok` charters to a route pin
   binding it, resolving the contradictory Windows invocations. Adds a vendored path.
3. **F4, F5, F6, F7, O1, O6, O7** — the remaining root-contract and charter edits, each with wording
   supplied by its lane.

## Not yet run

- **The clean statechart probe.** The field pass cannot settle whether the tightened trigger fires
  correctly, because every tier could read the prior ruling.
- **An audit round on `readHit`.** The unit is committed and gated; no adversarial lane has read it.
- **The prune.** `references/retention.md` requires the checks to close and then the owner's explicit
  go-ahead. The carry check does not close while the direction items are open.

DEBRIEF: OPEN — the findings are bucketed and carried; the root-contract refinements need the
owner's direction, and the prune is blocked behind them.
