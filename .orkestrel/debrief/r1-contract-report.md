# Unit R1 report — orchestration contract edits from the debrief

Every ruling assigned to R1 landed in `/home/user/scaffold/.agents/orchestration.md`. Nothing else
was touched.

Touched files:

- `/home/user/scaffold/.agents/orchestration.md` — the owned file; every R1 ruling's edit.
- `/home/user/scaffold/tmp/units/r1-contract-report.md` — this report.

Size: the contract went from 1040 lines to 873. I ran no git command, per the brief; the
Orchestrator captures the diff.

## What changed, by ruling

### Ruling 1 — brief preflight becomes a checklist

`### Check the brief before you send it` is now an imperative checklist: one line per check, trigger
first, no worked rationale. It opens with the pointer `Fill `.agents/templates/brief.md`, which
carries the named scope rows and the worked reason behind each check.`

Every substantive check survives, condensed: executor-and-transport identity; pasted command output
and named search scope; measurement under the unit's conditions; what the change does to the facts
measured; the false-set scoping rule with its examples; deriving that set by running the suite;
granting a behaviour with its tests, a constant with its fixtures, a template with its materialized
copy; criteria read against the off-limits list; mechanism prose and its carrier; the small
unrelated obligation; property rather than consequence; cheap-first ordering with the regeneration
exception; the timing and whole-suite gate ban; the tool-allowlist check; brief-local control
identifiers.

### Ruling 2 — prune shrinks to trigger, path, and pointer

`### Before you prune` is deleted whole. The prune bullet under `### Where campaign artifacts live`
now carries the trigger (a commit at acceptance), the path (`.orkestrel/<package>/`, named in the
same list), and one pointer to `.agents/skills/orkestrel-debrief/references/retention.md`, which
R3 creates. The pointer names what the reference owns without restating it.

The vocabulary settled on "campaign folder". `grep -n "ledger" .agents/orchestration.md` now returns
routing-ledger uses only.

### Ruling 3 — the release moves to `orkestrel-publish`

Deleted: `### The release wave`, `### Preparing`, `### Reaching the approval`, `### Spending the
window`. Replaced by a pointer paragraph at the head of `## Publishing the fleet` naming the skill
and its `references/wave.md` and `references/window.md`, which R2 creates.

The contract keeps what the reconciliation names: the user's decision and the user's credential, the
never-substitute-a-token law, the long-running-command binding, serialization, and the
catalog-derived layer order.

S4's boundary test landed in `## Authority`, after the bridges paragraph: "A line stays in this file
when an executor who is not doing that thing is worse off without it. A line becomes a skill when it
fires on a named trigger and its reader is one agent at one moment."

### Ruling 4 — bench starvation

New Bench law, inserted after "Tracked, never loose" and numbered 4, with the following laws
renumbered: **One lane at a time per bench**. It fixes one `grok` lane at a time, names the tell (a
probe that round-trips while the lanes return empty), and states the remedy — cut the concurrency and
re-run, rather than recording the bench dark and substituting an engine.

### Ruling 5 — audit-step lane naming

Execution loop step 5 now names `reviewer` for the subjective lane and `analyst` for the objective
lane, the way step 2 names its lanes, and dispatches `checker` "in addition ... never in place of a
lane".

### Ruling 6 — adversarial-pass consistency

`## The engines` reads: "Design runs the adversarial pass. An audit runs the lanes its round names,
with at least one whose engine did not write the work."

### Ruling 7 — native-unit artifact homes

Under `### Every dispatch is a file before it is a launch`: the brief bullet declares
`tmp/units/<unit>-brief.md` and `tmp/units/<unit>-report.md` for a native unit and the role-file
bench directory for a bench unit; a new bullet fixes the round's verdict at
`.orkestrel/<package>/<unit>-audit-verdict.md` and names it as where the audit step records a lane
that did not run; a new bullet requires a corrected unit to name its effective pair and the pair it
supersedes before integration.

### Ruling 9 — Roles table and the one-token rule

The subjective-implementation row's Codex cell reads `opus`. Column alignment preserved: every table
row is 142 characters. A bullet beside the table states that `implementer` names the harness's native
implementation lane and that an engine-named bridge — `sol`, `opus` — names the other engine.

## Sentence-level choices I made

- **Boundary-test placement.** `## Authority` is the only section that rules on what this file is
  against what a skill is, so the test sits there rather than in `## Publishing the fleet`. I added
  one supporting sentence naming why the test bites: every agent loads this file on every dispatch.
- **Starvation and darkness read against each other.** The `### Engine assignment` bullet on an
  empty lane told the reader to record the bench dark unconditionally, which the starvation law
  contradicts. I added one clause there — "Re-probe the bench before ruling on why, per Bench laws
  rule 'One lane at a time per bench'" — and kept the test itself in Bench laws, so the rule has one
  home.
- **Bench law numbering.** I inserted the starvation law at position 4 rather than appending it,
  because admission belongs beside "Tracked, never loose". Cross-references to Bench laws elsewhere
  in the tree cite rules by name ("Journal first", "Ephemeral streams, durable records"), never by
  number, so renumbering breaks no reference.
- **"ledger" swept beyond the prune section.** The shared-campaign-folder bullet ("the wave's plan,
  ledger, and verdicts") and the recompute bullet ("A ledger of live state is stale") named neither
  the routing nor the carry ledger. The first now reads "routing ledger"; the second is recast as "A
  document recording live state". This is ruling 2's vocabulary settlement applied to the section it
  names.
- **What stayed in `## Publishing the fleet`.** I applied ruling 3's own boundary test to the
  subsections no ruling named. `### Fixing a dependency before it publishes` binds a consumer-repo
  implementer who is not publishing, and `### What a bump obliges` carries the vendored-surface laws
  that bind every writing unit in a target repo — never edit a vendored file, keep target
  permissions in `.claude/settings.local.json` — plus the catalog-derived layer order the
  reconciliation names as a keeper. Both stay, untouched. I added one sentence saying so: "What
  remains in this section binds an executor who is not publishing."
- **Serialization kept at the head.** "Publish serially" lived in the deleted `### Spending the
  window`. The reconciliation names the serialization laws as a keeper, so it moved into the
  long-running-command paragraph at the section head.
- **`### Running a release` heading dropped.** I first added the skill pointer as its own trailing
  subsection, then moved it into the section head so a reader meets the pointer before the
  subsections that are not about publishing.

## Validation

Read-only, scoped to the owned file.

- `grep -n "ledger" .agents/orchestration.md` → lines 106, 316, and 456, each reading "routing
  ledger". No hit names the campaign folder. Acceptance criterion 3 closes.
- Banned-vocabulary sweep, case-insensitive with inflections, pattern
  `should|simply|[^a-z]easy|easier|[^a-z]just[^a-z]|currently|[^a-z]now[^a-z]|utilize|leverage|[^a-z]via[^a-z]|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|sanity check|dummy|blacklist|whitelist|master|slave|please`
  over `.agents/orchestration.md` → hits at lines 69, 270, 294, 355, 790, every one in text this
  unit did not write or move. A second sweep for `[^a-z]once[^a-z]` and `\bboth\b` returned no hit in
  new text except "span both correctness and shape" (pre-existing, and the sentence names its
  members) and "five-minute upload window" (a duration value).
- Character-accurate line-length check over the whole file: no line this unit authored exceeds 100
  characters. The over-100 lines are the pre-existing engines and roles tables and pre-existing
  prose.
- `npx oxfmt --config .oxfmtrc.json --check .agents/orchestration.md` → "All matched files use the
  correct format."
- `npm run test:policy` → 93 passed, 1 file passed, 1.50s.
- Referrer sweep for the deleted anchors (`Before you prune`, `The release wave`, `Preparing`,
  `Reaching the approval`, `Spending the window`) over `*.md`, `*.toml`, `*.ts`, and `*.json` from
  the repository root, excluding `node_modules` and `.orkestrel/`: the only hits outside this unit's
  own brief and report are in `dist/host/agents/orchestration.md`, the staged build copy that
  `npm run build:host` regenerates. No role file, skill, rule, or test names a deleted section.

## Observation the Orchestrator must settle

`npm run test:config` reds on this edit, and it will red on any content edit to this file:

```text
FAIL  |config| tests/config.test.ts > root configuration > keeps the committed host inventory aligned with the vendored checkout bytes
Error: The committed host inventory is stale at .agents/orchestration.md
Tests  1 failed | 45 passed (46)
```

`host.json` carries a content digest for `.agents/orchestration.md`
(`63bacfdc…` before this unit). `host.json` is off-limits to R1 and regeneration needs a built
`dist/`, so the settling command belongs to the Orchestrator, after the last unit that edits a
vendored file: `npm run build && npm run build:inventory`, then `npm run test:config`. Because R2,
R3, R4, R5, and R8 also move vendored bytes, run it once at the end of the landing sequence rather
than after each unit.

## Deviation state

None. No ruling's edit conflicted with the contract's remaining text in a way the reconciliation had
not ruled on. Every judgment I made is recorded under "Sentence-level choices".
