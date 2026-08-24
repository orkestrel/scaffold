# Unit R4 report — mirrored charter fixes (2026-08-24)

Every fix ruling 8 names landed on the Claude side and mirrored to its Codex twin. One
report-only patch is returned for `.claude/agents/codex.md` beyond its description line, which
the brief scopes out. No deviation.

## Per-finding landing sites

### S2 — `checker` gains the falsify shape and the referral vocabulary

- Claude, `/home/user/scaffold/.claude/agents/checker.md`: the judgment ban keeps its force and
  changes its address — a question needing judgment becomes a **referral**, specifically
  evidenced, to the subjective lane when it is running and to the Orchestrator when it is not.
  `## Output contract — the Checklist` becomes `## Output contract` with the dispatch fixing the
  shape: numbered claims take the `orkestrel-falsify` verdict shape and its single terminal line
  unless the dispatch names a different skill that fixes one, and criteria without claims take
  the Checklist. `Needs the reviewer` in the Checklist becomes `Referrals`.
- Codex, `/home/user/scaffold/.codex/agents/checker.toml`: the same referral sentence replaces
  "Flag judgment questions for reviewer instead of guessing", and the return contract splits into
  the same two shapes with the undecidable-claim rule.

### S6 — `planner` gains the escape clause

- Claude, `/home/user/scaffold/.claude/agents/planner.md`: `Return only:` becomes `Return only
  the following, unless the dispatch names a skill that fixes a different shape — that skill owns
  the sections and the terminal line, and it wins over this list:`.
- Codex, `/home/user/scaffold/.codex/agents/planner.toml`: the brief-shape paragraph gains "A
  dispatch may name a skill that fixes a different return shape, and that skill wins over this
  list."

### S7 — one authority-pointer form across the roster

The form, identical in every file:

```markdown
Read `.agents/orchestration.md` first. It owns the role set, the routing, and the dispatch
contract.
```

- Claude: added to `planner.md` and `orkestrel.md`, which carried no pointer at all; replaced the
  `(see .agents/orchestration.md)` parenthetical in `implementer.md`, `builder.md`, `checker.md`,
  `reviewer.md`, `verifier.md`, `scout.md`, `researcher.md`, and `application.md`; extended the
  bare `Read .agents/orchestration.md first.` in `analyst.md` and `sol.md`; and reordered
  `grok.md` so the contract leads its reading list.
- Codex: added at the head of `developer_instructions` in every `.toml` role file. `claude.toml`
  already led with the bare form and now carries the full sentence.
- `planner.md` gains the clause S7 asks for by name: the pointer states the contract owns "the
  vocabulary your `Units` section is written in".
- In `checker`, `scout`, and `researcher` on both sides the sentence ends "including the
  tedious-work ladder this role sits at the end of", which is where the S8 trim lands, so each
  file carries one pointer rather than a pointer plus a restatement.
- `scout` and `researcher` on both sides now read `AGENTS.md` **next** rather than **first**, so
  exactly one instruction in each file claims to be first.

### S9 — bridge descriptions rewritten as the driver's job

Each description now names what the driver does and what the route is for, and denies the far
engine's work to the driver.

- `/home/user/scaffold/.claude/agents/analyst.md`: "Claude-side driver for the GPT-5.6 Sol
  `analyst` route … Drafts the brief, resolves the read-only `codex exec` command, and returns
  the brief path, the command, and the journal path. Analyses nothing itself and endorses
  nothing."
- `/home/user/scaffold/.claude/agents/sol.md`: the same shape for the `implementer` route, with
  "Implements nothing itself and endorses nothing."
- `/home/user/scaffold/.claude/agents/grok.md`: the same shape for the Cursor Grok route, with
  "Reads nothing at absorption depth itself, and never designs, decides, edits, or reviews." The
  body's opening becomes "You are the Cursor Grok driver."
- `/home/user/scaffold/.claude/agents/codex.md` (description line only): "The transport contract
  every Claude-side driver follows when it carries a brief to the GPT-5.6 Sol bench: …" — it
  describes the contract as the thing a driver follows rather than as an engine's offer.
- Codex mirrors: `grok.toml`, `planner.toml`, `reviewer.toml`, and `opus.toml` take the same
  driver-job form; `claude.toml` takes the same transport-contract form as `codex.md`.

### O6 — `orkestrel` narrowed to reconciliation over supplied evidence

- `/home/user/scaffold/.claude/agents/orkestrel.md`: the description now reads "ecosystem
  reconciler: turns the evidence the dispatch supplies … Collects no live state itself." The
  opening states the job as reconciliation over supplied evidence, never collection; names the
  supplied artifacts as the only trace for a reported fact; and routes live collection to a
  tool-capable lane such as `verifier` or `researcher`, or to the Orchestrator, before this role
  is dispatched. Evidence workflow step 3 changes from "Verify registry versions … when the task
  needs live state" to reconciling declared ranges against the supplied registry reading and
  reporting unknown where the dispatch supplies none.
- `/home/user/scaffold/.codex/agents/orkestrel.toml`: description and instructions carry the same
  narrowing.

### O8 and S8 — root-reference trims

- `/home/user/scaffold/.claude/agents/grok.md` § Brief and containment: the `tmp/cursor/`
  retention paragraph becomes "Leave `tmp/cursor/` to the Orchestrator. `.agents/orchestration.md`
  § Bench laws owns the retention rule for every journal."
- `/home/user/scaffold/.claude/agents/checker.md`, `scout.md`, `researcher.md`: the three
  wordings of the tedious-work ladder, each ending in the unverifiable "a dispatch reaching you
  should already record why the benches above it were unavailable", are gone. The ladder position
  rides the single authority pointer. `researcher.md`'s scope note keeps only its role-specific
  bound.
- `/home/user/scaffold/.claude/agents/builder.md`: "No suppressions (`any`, `as`, `!`,
  ts-ignores, eslint-disables)" and the dependency, mock, wrapper, and deferral list become "Fix
  causes, not symptoms. The `AGENTS.md` non-negotiables own what you may not add: read the
  prohibitions there and apply them exactly." The reading bullet gains "All bind you as written
  there, and this charter restates none of them." This closes the `as const` contradiction O8
  names.
- Codex mirrors: `scout.toml` and `researcher.toml` take the same ladder trim; `builder.toml`
  replaces "Add no dependency, suppression, mock, superfluous wrapper, or current-scope
  TODO/skip/deferral" with the same binding.

## Mirror asymmetries and their reasons

1. `.claude/agents/codex.md` keeps its body untouched, including its shorter authority pointer
   and its § Journals retention restatement. The brief scopes the body out for R8. Exact patches
   follow.
2. `.codex/agents/analyst.toml` and `.codex/agents/implementer.toml` keep their descriptions.
   They are native Sol lanes, not drivers, so the S9 rewrite has no subject there. The mirror of
   the Claude drivers by work class is the Codex drivers for Claude routes — `planner.toml`,
   `reviewer.toml`, `opus.toml` — and those took the rewrite.
3. `.claude/agents/codex.md` and `.codex/agents/claude.toml` are transport contracts rather than
   roles, so they take the transport-contract description form rather than the driver-job form.
   They mirror each other, not the drivers.
4. `.claude/agents/checker.md` keeps its Checklist as a named shape and gains the falsify shape
   beside it; `.codex/agents/checker.toml` states the same split in prose because its
   `developer_instructions` field carries no lists. Content mirrors; syntax does not.
5. The word "bridge" survives where it names the role class, per the contract's own definition of
   a bridge role. "Driver" names the job in every rewritten description.

## Validation

Every command ran on 2026-08-24 in `/home/user/scaffold`, scoped to the owned files.

- `npx oxfmt --config .oxfmtrc.json --check .claude/agents .codex/agents` → "All matched files
  use the correct format. Finished in 435ms on 28 files using 4 threads."
- Structural parse of every role file (frontmatter key/value shape, quoted-scalar termination,
  `name` matching the filename, Claude `model` restricted to a Claude alias, balanced Codex
  multiline strings): "OK: every Claude frontmatter and Codex role file parsed structurally",
  exit 0. Script:
  `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/r4-validate.mjs`.
  Every Claude `model:` field is `opus` or `sonnet`, unchanged by this unit.
- Vocabulary sweep, pattern
  `\b(should|simply|easy|easier|just|currently|utiliz|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|master|slave)\b`
  case-insensitively over `.claude/agents` and `.codex/agents`: one hit, `reviewer.md:40`
  "easier", on a pre-existing line no R4 finding names. Left as found and reported here.
- Second sweep, pattern `\b(once|since|new|now|latest)\b` over the same paths: `grok.md:39`
  "answered once" (numeric sense, permitted) and `orkestrel.md:102` "a new version" (naming a
  value, permitted). Both pre-existing.
- Em dash spacing, pattern `[^ ]—\|—[^ ]` over the same paths: no hits.
- `git --no-pager diff --stat`: 28 files changed, 204 insertions, 125 deletions.
  `git status --porcelain` lists only those 28 owned files as modified.

Not run, per the brief's standing condition: `npm run test:config`.

## Shared and off-limits file patches (report-only)

Two patches for `/home/user/scaffold/.claude/agents/codex.md`, whose body this unit does not own.

Patch 1 — S7, the authority-pointer form. Replace line 10:

```markdown
You dispatch the external Codex Sol bench. Read `.agents/orchestration.md` first.
```

with:

```markdown
You dispatch the external Codex Sol bench.

Read `.agents/orchestration.md` first. It owns the role set, the routing, and the dispatch
contract.
```

Patch 2 — S8, the `tmp/` retention trim. Replace lines 160-162:

```markdown
Journals, briefs, session files, and last-message files under `tmp/codex/` are ephemeral
unit evidence owned by the Orchestrator. Never commit them and never delete them yourself;
the Orchestrator sweeps them at campaign acceptance.
```

with:

```markdown
Leave `tmp/codex/` to the Orchestrator. `.agents/orchestration.md` § Bench laws owns the
retention rule for every journal, brief, session file, and last-message file.
```

Both patches are formatter-clean at the file's wrap width and can ride R8 when the transport
contract moves to `.agents/transports/codex.md`.

## Observations for the Orchestrator

- This unit edits 28 vendored files, so the committed `host.json` digests for those paths are
  now stale alongside the two paths the standing condition names. One regeneration at integration
  covers all of them.
- `tests/distribution.test.ts` asserts vendored path membership, not content, so no path in its
  list moved.
- `.claude/agents/reviewer.md:40` carries "easier", which the writing rules' `easy` row bans. No
  R4 finding names that line, so it stays for a carrier.
