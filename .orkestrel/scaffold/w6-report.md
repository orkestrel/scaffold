# Unit W6 report — the shipped sentences agree with the sweep

Complete. No deviation on the assignment. `implementer` on Opus 5 (recorded substitution: the Codex
bench is dark). Two off-limits files carry stale prose the sweep falsified; exact patches are in
Shared-file patches, and neither was edited.

## Touched files

Six files, all owned. Nothing else in the tree changed.

| File                                                   | Change                                                                                                                                                              |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `guides/scaffold.md`                                   | the intro's holdings, the `canon` question passage, the exit-codes and Git sections, the groups table and its canon paragraph, the `presence` example, the foreign-population sentence, the whole vendored-data-root canon prose, and the Limits entry |
| `README.md`                                            | the split paragraph's membership list and the catalog file it names; the `overwrite` passage now states the one-run sweep                                            |
| `ROADMAP.md`                                           | the adoption-visit row collapses to re-pin, `scaffold overwrite`, gates                                                                                             |
| `.agents/skills/orkestrel-publish/references/wave.md`  | the separate deletion step folds into the `scaffold overwrite` step, which gains the tracked-only and git-ignored limits; the rule-map red-gate warning is gone      |
| `.claude/rules/quality.md`                             | § Instruments gains the unregistered-`probe` line: register outside the repository, never in the tree                                                                |
| `.claude/agents/orkestrel.md`                          | the orchestration-contract read instruction resolves against scaffold rather than against the target                                                                 |

```text
 .agents/skills/orkestrel-publish/references/wave.md |  26 ++--
 .claude/agents/orkestrel.md                         |   8 +-
 .claude/rules/quality.md                            |   1 +
 README.md                                           |  19 ++-
 ROADMAP.md                                          |   8 +-
 guides/scaffold.md                                  | 164 +++++++++++----------
 6 files changed, 122 insertions(+), 104 deletions(-)
```

## Each replaced claim

### `guides/scaffold.md`

**The intro's holdings (line 15).**

- Old: "`HOST_PATHS` names the vendored set — the toolchain, the policy proofs, the harness wiring —
  … `CANON_PATHS` names the instruction canon — the coding and orchestration contracts, the rules,
  the skills, the templates, and the transport contracts … A target carries the `AGENTS.md` and
  `CLAUDE.md` pointers that name where a reader finds it."
- New: the vendored list becomes "the toolchain, the policy proofs, the bench scripts, and the
  harness permission file"; the canon list gains "the agent roles, the bench configuration, and the
  MCP registrations"; and the holdings sentence ends "and the catalog agent file the `catalog` verb
  rewrites. It carries nothing else at a canon path: a file found at one is a superseded copy, and
  `overwrite` deletes it."

**The question count (line 656).**

- Old: "`audit` reports further non-blocking questions, on the `setup` field and on the `canon`
  field."
- New: "`audit` reports a further non-blocking question, on the `setup` field."

**The whole `canon` question passage (old lines 689-703, hunk `@@ -686,35 +689,27 @@`).** Deleted,
because its subject no longer exists. Replaced by a pointer paragraph: "`audit` reads the instruction
canon as findings rather than as a question. Each `CANON_PATHS` member the target holds enters the
comparison, by file where the member is a directory, and a path the plan does not claim there reports
`foreign`. Ownership and drift states that population, and Vendored data root states what `overwrite`
does with it."

**Exit codes.** Added: "A superseded instruction copy is such a file, so a target generated before the
canon split exits `1` until the copy goes."

**Git.** Added: "A git-ignored file sits outside each reading: it never makes the tree dirty and it is
never deleted. Limits states what that costs a target that keeps one at a canon path."

**The groups table's `orchestration` row.**

- Old: "The vendored harness wiring, the bench scripts, and `.mcp.json`"
- New: "The harness permission file, the bench scripts, and the catalog agent file"

**The paragraph under the groups table.**

- Old: "No group carries the instruction canon. No host-origin artifact claims a `CANON_PATHS`
  member, so no group selection reaches a staged contract and no verb copies one into a target. The
  one deliberate overlap is on the plan: …"
- New: the plan's canon claims are named with their reasons, `CATALOG_AGENT_PATH` is stated as the
  host-origin artifact at a canon path, and the paragraph closes on the group-scoped foreign reading:
  "a copy a target holds at one of them is foreign drift in the group `inferGroup` gives it. A scoped
  audit reads the canon through that same selection, so a run excluding a group reports nothing
  there."

**The presence example (line 958).**

- Old: "reports `presence` for `.claude/settings.json`, `.codex/config.toml`, `tests/policy.test.ts`"
- New: "reports `presence` for `.claude/settings.json`, `scripts/codex.sh`, `tests/policy.test.ts`"
  (`.codex/config.toml` is no longer vendored, so it is no longer in any plan).

**The foreign-population sentence (line 1007).**

- Old: "An audit reports one `Finding` per planned path, followed by any foreign path beneath the
  groups the plan covers."
- New: "… followed by every foreign path in the groups the plan covers. That second list draws on a
  file beneath a vendored directory the plan expands and on a file the target holds at a canon path
  the plan does not claim."

**The vendored-data-root membership prose (hunk `@@ -1169,28 +1169,32 @@`).** Three replacements in
one hunk.

- `HOST_PATHS`: "the harness wiring" → "the harness permission file".
- `CANON_PATHS`: the member list gains `.cursor/rules/`, `.claude/agents/`, `.codex/agents/`,
  `.codex/config.toml`, `.mcp.json`, and `.cursor/mcp.json`; "no plan claims those staged bytes, so
  no target receives a copy of a contract" becomes "a target receives a copy only where the plan
  claims the path", with `CATALOG_AGENT_PATH` named beside the pointer pair.
- Disjointness: "`HOST_PATHS` and `CANON_PATHS` are disjoint. A path in both would be copied into a
  target as a host artifact and refused by the overlay …" → disjoint by prefix in either direction,
  with the storage-name reason; "the executable's advisory" → "the executable's fetch list"; and the
  closing sentence separates membership from being planned.

**The move paragraph.**

- Old: "… where no artifact is planned at that path no verb writes or deletes that copy, so `audit`
  raises the `canon` question naming it until a maintainer removes it in one commit."
- New: "… that copy sits at a path the plan does not own, so `audit` reports it `foreign` and exits
  `1`. `overwrite` deletes it in the run that repairs the pointers — one candidate list and one
  transaction, whether the file is a stray beneath a vendored directory or a superseded copy inside
  the canon. Membership decides that, never byte identity …"

**The fetch-list paragraph.**

- Old: "No target receives those bytes, so the fetch list drops the path rather than spending a round
  trip on one no verb can write."
- New: "The fetch list drops it and `filesToHost` takes the installed floor bytes for it: a target
  receives no copy of a staged contract, and the one canon path a plan does claim is deferred, so
  live bytes reach neither."

**The Limits entry (hunk `@@ -1499,15 +1506,17 @@`).**

- Old heading and body: "**No verb removes a superseded instruction copy.** … `audit` reports no
  drift against them and raises the non-blocking `canon` question naming them instead. The removal is
  one commit in the target — `git rm -r` over each named path …"
- New heading and body: "**A file a target keeps at a canon path never reports clean.** `overwrite`
  deletes a superseded instruction copy in the run that repairs the pointers, and it deletes only
  what git tracks, from a tree carrying no uncommitted work. An untracked copy is left standing, and
  a git-ignored one sits outside the dirty reading as well … The audit reads canon membership by
  path, so such a copy stays a `foreign` finding and that target exits `1` on every run. `repair`
  never closes it either … A maintainer who wants a local MCP server registration keeps it outside
  the repository, in the harness's own local or user scope, rather than at `.mcp.json`, where the
  file is drift whoever wrote it."

### `README.md`

- The split paragraph's vendored list becomes "its toolchain, its policy proofs, its bench scripts,
  its harness permission file"; the canon list gains "the agent roles, the bench configuration, and
  the MCP registrations"; the holdings sentence gains "and the `.claude/agents/orkestrel.md` catalog
  file the `catalog` verb rewrites. Anything else a target holds at a canon path is a superseded
  copy, and `overwrite` deletes it."
- The `overwrite` passage gains: "The deletion covers a stray beneath a vendored directory and a
  superseded instruction copy alike, so one run repairs the pointers and sweeps the canon paths a
  release moved."

### `ROADMAP.md`

- Old: "re-pin `@orkestrel/scaffold` and install, run `repair` to take the `AGENTS.md` and
  `CLAUDE.md` pointers, delete each path the `canon` question names with `git rm -r`, and run the
  gates … the question self-extinguishes per target after the deletion commits."
- New: "re-pin `@orkestrel/scaffold` and install, run `scaffold overwrite`, and run the gates. That
  one run takes the `AGENTS.md` and `CLAUDE.md` pointers and deletes every tracked copy the target
  still holds at a canon path, so a second `scaffold audit` in the same visit exits `0`."

### `.agents/skills/orkestrel-publish/references/wave.md`

The separate step 3 is deleted and the remaining steps renumber. Step 2 becomes:

- "Run `scaffold overwrite`. One run repairs the `AGENTS.md` and `CLAUDE.md` pointers and deletes
  every tracked copy the target still holds at an instruction-canon path. Prove the sweep with a
  second `scaffold audit` that exits `0`."
- Sub-bullet: "The deletion draws on what git tracks, so an untracked copy survives it, and the verb
  refuses the whole run as uncommitted work while an unignored one stands. Commit that copy or delete
  it by hand before re-running: `--dirty` clears the refusal and leaves the copy standing."
- Sub-bullet: "A copy the target git-ignores stays a `foreign` finding, so that target never reaches
  exit `0` again. Keep a local MCP server registration outside the repository rather than at
  `.mcp.json`."

The sentences that dissolved with the fold: "No scaffold verb deletes those copies", and the whole
`inspectPolicyRuleMap` red-gate warning — repair and removal are one run, so the target never sits
between a pointer with no rule map and a kept `.claude/rules` directory.

### `.claude/rules/quality.md` § Instruments

One line added after the `prove` routing rule and before the receipt-quoting rule:

> When no `probe` server is registered in the session, register one outside the repository, in the
> harness's own local or user MCP scope — in Claude Code, `claude mcp add` outside project scope —
> naming the installed `node_modules/@orkestrel/probe/dist/bin/main.js` entry, and start it in the
> repository whose projects the question names, because the server fixes its workspace from its own
> working directory. The registration cannot live in the tree: a scaffold target holds no `.mcp.json`
> file, that path is instruction canon, and a copy at it reports as foreign drift on every `scaffold
> audit` run. Where the harness registers no server at all, treat the question as supplying no
> project and take the preceding rule's fallback.

The working-directory clause is the brief's settled unknown read back against the installed
declaration and the installed entry: `ProbeOptions.workspace` is "Target workspace root. Default: the
current working directory" (`node_modules/@orkestrel/probe/dist/src/core/index.d.ts:976-988`), and
`node_modules/@orkestrel/probe/dist/bin/main.js` constructs `new ProbeServer()` with no options, so
the default is what a registration gets. The fallback clause routes to the preceding rule rather than
restating it, so § Instruments keeps one home for the fallback.

### `.claude/agents/orkestrel.md`

- Old: "Read `.agents/orchestration.md` first. It owns the role set, the routing, and the dispatch
  contract. Then read `AGENTS.md`, applicable rules, the dispatch-named skill and references, and the
  governing guides."
- New: "Read the orchestration contract first. It owns the role set, the routing, and the dispatch
  contract. Resolve it against scaffold rather than against this repository, the way this
  repository's `AGENTS.md` file directs: `../scaffold/.agents/orchestration.md` when a scaffold
  checkout sits beside this repository, and
  `node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md` otherwise. Then read
  `AGENTS.md` itself, the applicable rules it names, the dispatch-named skill and its references, and
  the governing guides."

Both spellings are the pointer template's own (`src/core/templates.ts:2035` and `:2039`), so a reader
of the catalog file and a reader of the target's `AGENTS.md` follow the same route.

## Scoped validation evidence

| Command                                                            | Result                                                    |
| ------------------------------------------------------------------- | ----------------------------------------------------------- |
| `npm run test:guides`                                              | exit 0, `Test Files 1 passed (1)`, `Tests 17 passed (17)`  |
| `npm run test:policy`                                              | exit 0, `Test Files 1 passed (1)`, `Tests 111 passed (111)` |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>`           | exit 0, `All matched files use the correct format.`       |
| `git status --porcelain`                                           | the six owned files, modified; nothing else               |

The formatter check is read-only and scoped to the owned files by explicit path, outside the brief's
named commands for the reason W4 and W5 recorded. It earned its place here: `oxfmt` formats Markdown
tables, and the widened `orchestration` row in the groups table left every other row in that table
misaligned. The misalignment was found by formatting a copy of the guide in the scratchpad and
diffing it, then applied by hand to the owned file, so no mutating command ran in the tree.

There is no failing-first record. This unit changes no behavior and adds no test; its subject is
prose whose falsity the parity suite cannot see, which is the reason the brief assigned it to a
reading of the W4 and W5 diffs rather than to a red gate.

## Acceptance criteria

1. `npm run test:guides` exits 0. **Met**, recorded above.
2. `npm run test:policy` exits 0. **Met**, recorded above.
3. No owned file carries "No verb removes a superseded instruction copy", a `canon` question
   description, or a repository-relative `.agents/` read instruction outside scaffold's own sibling
   spelling. **Met.** `grep -rn "No verb removes a superseded instruction copy" <owned files>` and
   `grep -rn "canon\` question\|\`canon\` field\|canon question" <owned files>` each report no match.
   `grep -rn "\.agents/" .claude/agents/orkestrel.md README.md ROADMAP.md .claude/rules/quality.md`
   reports four hits, each permitted: `.claude/agents/orkestrel.md:14` is the sibling spelling
   `../scaffold/.agents/orchestration.md`; `ROADMAP.md:20` names scaffold's own wave reference in
   scaffold's own plan file, which no target holds; `.claude/rules/quality.md:10` is the pre-existing
   frontmatter glob and `:88` a pre-existing cross-reference inside a canon file, where the path
   resolves against the canon root. The pattern covers the literal spelling `.agents/` across those
   files and nothing else.
4. `git status --porcelain` shows changes only in owned files. **Met**, recorded above.

## Shared-file patches

Two off-limits files carry sentences the sweep falsified. Neither was edited. Both are `src/**`, so
each patch is a writing unit rather than an integration edit.

### `src/core/templates.ts` — the `AGENTS.md` pointer names paths no target holds

This is the exit criterion's own subject: "no file scaffold leaves in a target names a path the
target lacks." The pointer is planned into every target, and its closing paragraph names
`.codex/`, `.cursor/`, and `.mcp.json` as the target's own copies. After W4 a target holds none of
them, and inside `.claude/agents/` it holds only `orkestrel.md`.

```diff
--- a/src/core/templates.ts
+++ b/src/core/templates.ts
@@ -2043,4 +2043,4 @@
 Every path a scaffold-supplied file names resolves the same way. The files this repository carries
-— the \`.claude/agents/\` directory, the \`.codex/\` directory, the \`.cursor/\` directory, the
-\`.mcp.json\` file, and the \`.claude/settings.json\` file — are this repository's own copies and
-resolve here.
+— the \`.claude/agents/orkestrel.md\` catalog file, the \`.claude/settings.json\` permission file,
+and the bench scripts under \`scripts/\` — are this repository's own copies and resolve here.
```

Read before proposing it: no test pins that paragraph. `tests/src/core/templates.test.ts:596` pins
only the eight resolution spellings, `:613` the import rule, and `:622` the placeholder rule;
`tests/src/server/helpers.test.ts:266` pins the installed storage spellings;
`tests/src/bin/CLI.test.ts:4010` computes a line delta rather than pinning one. The change moves
`dist/src` and therefore the published surface, and it does not move `host.json`, because the root
`AGENTS.md` staged into the canon is a different file from this template.

### `src/bin/CLI.ts` — the fetch list's comment states a reason that went false

The outcome is right and the stated reason is not: a target does receive `CATALOG_AGENT_PATH`, and
`repair` writes it from the floor bytes, so "no verb can write" is false for it. The path is dropped
because it is deferred. W5 repaired the same claim in `filesToHost`'s remark and left this copy.

```diff
--- a/src/bin/CLI.ts
+++ b/src/bin/CLI.ts
@@ -635,3 +635,4 @@
 		// A canon destination is dropped beside a deferred one, and for the same
-		// reason the assembler drops it: no target receives those bytes, so a request
-		// for them would spend a round trip on a path no verb can write.
+		// reason the assembler drops it: a target receives no copy of a staged
+		// contract, and the one canon path a plan does claim is deferred, so live
+		// bytes reach neither and the request would spend a round trip for nothing.
```

## Observations, not criteria

- **`test:config` is red by construction and was not run.** Four owned files are staged paths
  (`guides/scaffold.md`, `.claude/rules/quality.md`, `.claude/agents/orkestrel.md`, and the wave
  reference under `.agents/skills`), so `host.json` is stale until the Orchestrator regenerates the
  inventory after integration. The brief names that red as the Orchestrator's.
- **`npm test` and the build were not run.** Outside this unit's tool grant, and both read the stale
  inventory.
- **`guides/README.md` needed no edit.** No index row names a renamed section: its concept and
  directory tables name only `scaffold.md` and source directories, and its prose names no heading in
  the guide.
- **The guide is itself a vendored path.** `guides/scaffold.md` is in `HOST_PATHS`, so a target
  receives it as a mirror, and its `.claude/rules/workspace.md` reference (line 1535, pre-existing)
  addresses the upstream tree the way every relative link in a mirror does. I added no new
  repository-relative canon reference to it: the Limits entry states the registration remedy without
  naming a rule file, and `.claude/rules/quality.md` § Instruments owns that instruction alone.
- **The guide's `CANON_PATHS` constants-table summary was left alone.** "The instruction-canon paths
  staged for reading rather than for a target, frozen" is the constant's own TSDoc summary line,
  which W4 did not move, and the parity suite compares the pair.

## Deviation state

None on the assignment. No sentence I was asked to write contradicted the W4 or W5 diffs, the parity
proof demanded no `tests/guides.test.ts` edit, and no owned fix needed an off-limits file. The two
off-limits findings are reported as patches rather than edited, per the scope rows.

One judgment call inside the brief's ruling is recorded rather than absorbed. The brief named both
pointer spellings for `.claude/agents/orkestrel.md`, and restating a table that lives in the
`AGENTS.md` template risks the drift `AGENTS.md` § Instruction files warns about — the template's own
copy is already stale, which is the `src/core/templates.ts` patch above. I wrote the spellings as the
brief ruled and anchored them on the sentence "the way this repository's `AGENTS.md` file directs",
so a reader who finds the two disagreeing knows which one is authoritative.
