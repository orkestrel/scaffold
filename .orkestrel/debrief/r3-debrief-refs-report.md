# Unit R3 report — debrief references: retention and instruction-audit symmetry

Both objectives closed. `references/retention.md` exists and is named from `SKILL.md`; the
instruction-audit reference now names each lane's holding role and gives each lens list one home.
One shared-file patch is returned for integration, and one vocabulary residual is reported rather
than edited.

## Files touched

| File                                                             | Change                                                                                                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agents/skills/orkestrel-debrief/references/retention.md`       | Created. Owns the whole prune procedure: gate order, artifact locations, the `tmp/` sweep, the checks, the prune commit's promotion record.  |
| `.agents/skills/orkestrel-debrief/references/instruction-audit.md` | Symmetry repair (ruling 12): a bounded section per lane, each naming its holding role, each lens list with one home.                        |
| `.agents/skills/orkestrel-debrief/SKILL.md`                      | Names the new reference at the load point and at step 9; settles the folder's vocabulary on "campaign folder"; the ephemerality law points.  |

Diffstat, including the untracked new file:

```text
 .agents/skills/orkestrel-debrief/SKILL.md                          | 20 +++++----
 .agents/skills/orkestrel-debrief/references/instruction-audit.md   | 50 ++++++++++++++------
 .agents/skills/orkestrel-debrief/references/retention.md           | 106 +++++++++++++++++++ (new)
```

`git status --porcelain` after the work, and nothing outside the owned set:

```text
 M .agents/skills/orkestrel-debrief/SKILL.md
 M .agents/skills/orkestrel-debrief/references/instruction-audit.md
?? .agents/skills/orkestrel-debrief/references/retention.md
```

## The retention reference

The file is `# Retire a campaign folder`. Its opening states the two doors ruling 2 requires: a
debrief arrives at its Dispose step, and a campaign accepting with no debrief arrives at
acceptance through `.agents/orchestration.md` § Where campaign artifacts live. Its sections:

| Section                    | What it carries                                                                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Opening                    | The two doors, and the vocabulary ruling: the `.orkestrel/` folder is the campaign folder, because `ledger` already names the routing ledger and the carry ledger.                                                                   |
| The gate order             | The ordered steps: the checks close the prune, the disposition goes to the owner, the owner's explicit go-ahead authorizes the deletion, the commit carries the promotion record. Closed checks authorize nothing on their own.      |
| What the prune covers      | The location table: `.orkestrel/<package>/`, `.orkestrel/campaign/`, `tmp/units/`, `tmp/<bench>/`, `tmp/probe/`, `ROADMAP.md`, `PROPOSAL.md`, each with what it holds and what the prune does. Plus the plan-of-record lifecycle.     |
| Sweep `tmp/` as a tree     | The whole-tree sweep including prior-session residue; an unattributable file is a carry-check item rather than residue; never sweep while a unit is live; the source-tree probe deletion points at `.claude/rules/tests.md`.          |
| The carry check            | Every open item ends with a carrier — a commit, a live brief, or an explicit drop. Read the register files rather than every brief and report.                                                                                        |
| The promotion check        | Product truth to the guide, a process law to its owning rule or contract file, a decision to its commit message, everything else prunes. Live-state sections prune with no promotion.                                                |
| The measurement check      | A number carried out of the folder carries its date; an undated measurement is re-taken or dropped.                                                                                                                                  |
| The orientation check      | A handoff, a package-root narrative file, or a session log dissolves into the artifacts that own it and is deleted.                                                                                                                   |
| The prune commit           | The message is the promotion record: what moved and where each part landed, the measurements with their dates, and the campaign folder path the commit removes.                                                                       |

The test-run scratch location resolves to `tmp/probe/`, which `.claude/rules/tests.md` fixes as the
runtime probe's home and `.claude/rules/workspace.md` fixes as the `probe` project's include. The
row points at `.claude/rules/quality.md` § Instruments for the probe-becomes-a-test obligation
rather than restating it.

## The symmetry repair

Ruling 12 named three defects. Each closed:

- **Holding roles named.** The opening now reads "`reviewer` holds the subjective lane and
  `analyst` holds the objective lane." That also settles the S6 half about the verdict shape: both
  charters carry the escape clause, verified at `.claude/agents/reviewer.md:70-72` ("unless the
  dispatch names a different skill that fixes one") and `.claude/agents/analyst.md:37-41` ("The
  verdict shape defaults to `orkestrel-falsify`; a dispatch may name a different skill that fixes
  another"). The reference now says to name `orkestrel-debrief` in the dispatch so its
  `INSTRAUDIT <LANE>` shape binds.
- **The subjective lane gets its own bounded section.** `## The subjective lens list` matches
  `## The objective lens list` in shape: a holder sentence, a coverage sentence, then one bolded,
  defined, bounded lens per bullet. The lenses are role-job singularity, charter voice against
  dispatched usage, lane-swap residue, bridge minimalism, vocabulary drift across mirrored files,
  and skill-family seams. The `lane-swap residue` definition is drawn from the swap clause the
  charters actually carry (`.claude/agents/planner.md:15-19`, `.claude/agents/reviewer.md:16-19`,
  `.codex/agents/analyst.toml:11-14`).
- **One home for each lens list.** Each section states it is the list's only home, and the opening
  instructs a dispatch to point each lane's brief at its section rather than copying the list, with
  the failure named: a copied list drops a lens silently and the lane that lost it reports full
  coverage. That is the transcription defect this campaign's own audit brief demonstrated.

I renamed the objective heading from `## The objective lanes` to `## The objective lens list` for
the parallelism. A `grep -rn 'objective lanes'` over `*.md`, `*.toml`, `*.mdc`, and `*.ts` outside
`node_modules` returns no live referrer: the hits are `dist/host/.../instruction-audit.md:27` (the
built copy of this file, which the build regenerates), `.orkestrel/debrief/instr-audit-subjective.md:259`
(the audit finding that prescribed this repair), and two sentences using "objective lanes" as prose
rather than as a heading reference (`.agents/orchestration.md:229`,
`.agents/skills/orkestrel-falsify/SKILL.md:83`).

## The SKILL.md decision, and what it left

The brief left open whether `SKILL.md` needs more than reference-name additions. It does, and the
minimal edit is the ruling 2 vocabulary settlement plus one pointer that removes the second gate:

- Load authority item names `retention.md` "before retiring the campaign folder".
- The ephemerality law reads "**The campaign folder is ephemeral.**" and now points at the
  reference for the gate rather than stating consent alone. That closes the divergence subjective
  finding 3 recorded, where the contract pruned on checks and the skill pruned on consent.
- Step 9 Dispose retires the folder through the reference instead of restating the go-ahead.
- Step 6 and the portable-versus-resident law drop `ledger` for `campaign folder`.
- Load authority item 2 dropped "ledger entry" for "finding this round records".

The `unit ledger` at `SKILL.md:55` stays: it names a record of units, which is the sense ruling 2
leaves intact. `agents/openai.yaml` keeps "findings ledger" for the same reason and needed no
change.

## Shared-file patch for integration

`tests/distribution.test.ts` expands the vendored host inventory into exact declared membership, so
the new reference makes it false. It is not an owned file. Insert one line after line 183:

```diff
 			'.agents/skills/orkestrel-debrief/references/field-testing.md',
 			'.agents/skills/orkestrel-debrief/references/instruction-audit.md',
+			'.agents/skills/orkestrel-debrief/references/retention.md',
 			'.agents/skills/orkestrel-falsify/SKILL.md',
```

`src/core/constants.ts` needs no change: `HOST_PATHS` vendors `.agents/skills` as a directory entry
(`src/core/constants.ts:129`), and a directory entry vendors everything beneath it. `host.json`
needs the regeneration the brief's standing condition already assigns to the Orchestrator; the new
reference adds a storage/destination pair beside the existing debrief reference pairs at
`host.json:112-119`. No guide lists the skill's references, so no guide patch is owed.

## Validation

Read-only and scoped to the owned files. Commands and their output:

- `npx oxfmt --config .oxfmtrc.json --check` over the three touched files — "All matched files use
  the correct format." The first run reported the table's column padding on `retention.md`; I
  formatted a scratch copy, diffed, and applied the padding.
- `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 93 passed (93)`, duration 1.61s, run at
  22:06 on 2026-08-24. That project owns the skill-family rules: it asserts each `references/*.md`
  file is named by its `SKILL.md` (`tests/setupPolicy.ts:1349`), that the references directory holds
  no subdirectories, that the skill directory holds only `agents/` and `references/`, and the
  bridge's `name` and `description` parity against the canonical frontmatter.
- Directory inventory — `find . -type f` under the skill returns `SKILL.md`, `agents/openai.yaml`,
  `references/field-testing.md`, `references/instruction-audit.md`, `references/retention.md`, and
  nothing else.
- Template-TODO sweep — `grep -rn 'TODO\|TBD\|FIXME\|<placeholder'` over the skill directory
  returned exit 1, no matches.
- Writing sweep — a case-insensitive `grep -E` for the `.claude/rules/writing.md` substitution terms
  plus `above` and `below` over the three touched files returned no hit in `retention.md` or
  `instruction-audit.md`.

I did not run `test:config`, per the standing condition. I ran no `git` command that changes state
and committed nothing.

## Deviation state

No deviation. Both deviation triggers were checked and neither fired:

- R1's pointer at `.agents/orchestration.md:468` names
  `.agents/skills/orkestrel-debrief/references/retention.md`, read from `git show HEAD`. The file I
  created is at exactly that path.
- The bridge `.claude/skills/orkestrel-debrief/SKILL.md` needs no edit. It carries `name` and
  `description` and the canonical load path, and I changed neither the canonical `name` nor the
  canonical `description`.

## Observations for the Orchestrator

These are outside this unit's objective and I changed none of them.

1. **The frontmatter description still says "retire the working ledger."** It is the one place the
   ruling 2 vocabulary has not landed. Repairing it moves the canonical frontmatter and the bridge's
   verbatim copy together, and the bridge is off-limits here, so it needs a unit that owns both
   files. The body carries the settled vocabulary either way, and the description is a trigger
   sentence rather than an executed instruction, so I judged it does not have to change for this
   unit's work to be coherent — reported rather than treated as the stop trigger.
2. **`SKILL.md:74-75` writes `should` twice and `SKILL.md:86` writes `above`**, both banned by
   `.claude/rules/writing.md` § Substitutions and § Code tokens, references, and links. The lines
   are pre-existing and unrelated to rulings 2 and 12, so I left them for the file's next owner
   rather than widening this diff.
3. **`test:config` and the host inventory.** The new reference adds a row to `host.json`, which is
   already stale at HEAD for `.agents/orchestration.md` and `.claude/rules/documentation.md`. The
   regeneration remains the Orchestrator's single pass at integration.
