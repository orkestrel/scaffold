# Unit C2 report — charter findings O2+F3, F4, F11, O6

Findings O2+F3, F4, F11, and O6 all landed on both provider surfaces. One criterion is RED and its
cause is not mine:
`npm run format:check` fails on `.codex/config.toml`, a file unit C1 rewrote with CRLF and I do not
own. Exact fix returned in § Shared-file patches.

## Per criterion

| # | Criterion | State |
| - | --------- | ----- |
| 1 | Every read-only charter states its return channel in the same words; none describes a tool it does not hold | DONE |
| 2 | Sweep for `with a shell` returns nothing | DONE |
| 3 | Swap clause names the writer-engine trigger on both surfaces and in § Engine assignment | DONE |
| 4 | Codex verifier carries the dirty-tree clause | DONE |
| 5 | No charter restates the deviation rule | DONE |
| 6 | `format:check` and `lint:check` clean | `lint:check` GREEN; `format:check` RED on C1's `.codex/config.toml` only |
| 7 | `build` succeeds; `host.json` delta traces to touched files | DONE |
| 8 | `npm test` and `npm run test:distribution` exit 0 | DONE |
| 9 | `git status --short` named, C1's files distinguished | DONE |

## Finding O2 + F3 — read-only roles told to produce files

### The canonical return-channel sentence

Claude surface, where the tool allowlist is the guarantee:

```text
You are read-only. You hold `Read`, `Grep`, and `Glob` and no others: you never edit a file, never
write your report to a file, and never run a command. Your final message IS the <NOUN>. A dispatch
that names a report path for you, or assigns you a command, is a dispatch defect — return the
<NOUN> as your final message and name the defect in it.
```

Codex surface, where `sandbox_mode` is the guarantee:

```text
Your sandbox is read-only: you never edit a file and never write your report to a file. Your final
message IS the <NOUN>. A dispatch that names a report path for you is a dispatch defect — return
the <NOUN> as your final message and name the defect in it.
```

`<NOUN>` is the role's own return: verdict, proposal, distillate, answer, requested shape.

### Charters changed

| File | Before | After |
| ---- | ------ | ----- |
| `.claude/agents/reviewer.md` | `You are read-only: you never edit. Return only the verdict, never your process.` | `## Return channel` carrying the canonical sentence with `verdict`, then `Return only the verdict, never your process.` |
| `.claude/agents/checker.md` | same sentence | same section, `verdict` |
| `.claude/agents/planner.md` | no return-channel statement | `## Return channel`, `proposal` |
| `.claude/agents/scout.md` | `Never edit, never run shell commands, never speculate past the evidence.` | `Never speculate past the evidence.` plus `## Return channel`, `answer` |
| `.claude/agents/researcher.md` | no return-channel statement | `## Return channel`, `distillate`, tool list extended with `WebFetch` and `WebSearch` |
| `.claude/agents/orkestrel.md` | no return-channel statement | `## Return channel`, `requested shape` |
| `.claude/agents/distiller.md` | `You hold Read, Grep, and Glob. You write no file, so your final message is your distillate. A dispatch naming a report path for you is a dispatch defect: report it and return the distillate in the message.` | canonical sentence, `distillate` |
| `.codex/agents/reviewer.toml` | no return-channel statement | read-only driver clause (following) |
| `.codex/agents/planner.toml` | no return-channel statement | read-only driver clause (following) |
| `.codex/agents/analyst.toml` | no return-channel statement | Codex sentence, `verdict` |
| `.codex/agents/checker.toml` | no return-channel statement | Codex sentence, `verdict` |
| `.codex/agents/scout.toml` | `Never edit, never run commands, never speculate past the evidence.` | `Never speculate past the evidence.` plus Codex sentence, `answer` |
| `.codex/agents/researcher.toml` | no return-channel statement | Codex sentence, `distillate` |
| `.codex/agents/orkestrel.toml` | no return-channel statement | Codex sentence, `requested shape` |
| `.codex/agents/distiller.toml` | `Your sandbox is read-only, so you write no file and your final message is your distillate. A dispatch naming a report path for you is a dispatch defect: report it and return the distillate in the message.` | Codex sentence, `distillate` |

### Shell clause deleted

- `.claude/agents/reviewer.md`: `return a deviation instead of reconstructing it with a shell.` → `return a deviation instead of reconstructing it.`
- `.claude/agents/checker.md`: the same edit.

### Read-only Codex drivers

`.codex/agents/planner.toml` and `.codex/agents/reviewer.toml` each gained:

```text
Your sandbox is read-only: you never edit a file and never write your report to a file. You
therefore write neither the brief nor the journal. Return the brief text, its intended path,
the resolved command, and the journal path, and the Orchestrator writes the brief and
launches the run. A dispatch that names a report path for you is a dispatch defect — return
your result as your final message and name the defect in it.
```

`.agents/transports/claude.md` was the file that required the write. Before:

```text
Journal every run: redirect --output-format stream-json to tmp/claude/<unit>.jsonl,
which is gitignored, and record the session id. A bench unit with no journal ran on its
driver's engine, however normal its answer reads.

Briefs never travel as shell arguments. Write the brief to tmp/claude/<unit>-brief.md
and pass a pointer to it.

Long work is not launched by this bridge. Return the brief path, the exact resolved
command, and the journal path, ...
```

After:

```text
Journal every run: the resolved command redirects `--output-format stream-json` to
`tmp/claude/<unit>.jsonl`, which is gitignored. Whoever launches the run records the session
id from that journal. A bench unit with no journal ran on its driver's engine, however normal
its answer reads.

Briefs never travel as shell arguments. The brief lives at `tmp/claude/<unit>-brief.md` and
the command passes a pointer to it.

A driver pinned `workspace-write` writes that brief itself. A driver pinned `read-only` writes
nothing at all — not the brief, not the journal, not a report: return the brief text, its
intended path, the resolved command, and the journal path, and the Orchestrator writes the
brief and launches the run. Check your own pinned sandbox before drafting, and take the branch
that matches it.

Long work is not launched by this bridge. Return the brief path or text, the exact resolved
command, and the journal path, ...
```

`.codex/agents/opus.toml` is pinned `workspace-write` and takes the first branch unchanged.

## Finding F4 — the lane-swap clause

`.claude/agents/reviewer.md` and `.claude/agents/planner.md`, before:

```text
You hold the **subjective** lane by default. When the Sol bench is dark the dispatch
may assign you the **objective** lane instead — correctness, constraints, and what
the code and contracts actually permit. Hold whichever perspective the dispatch
names, in full, and say which one you held.
```

After, in both:

```text
You hold the **subjective** lane by default. The dispatch may assign you the **objective** lane
instead — correctness, constraints, and what the code and contracts actually permit — whenever the
round needs an engine that is not the one running that lane, including when the Sol bench is dark
and when Sol wrote the work under audit. Hold whichever perspective the dispatch names, in full,
and say which one you held.
```

The final sentence of each keeps its own drift warning: `design fit` in `reviewer.md`, `the
subjective case` in `planner.md`.

`.codex/agents/analyst.toml`, the inverse, before:

```text
You hold the objective lane by default. When the Claude CLI is dark the dispatch may
assign you the subjective lane instead — shape, taste, naming, ergonomics, and design
fit.
```

After:

```text
You hold the objective lane by default. The dispatch may assign you the subjective lane
instead — shape, taste, naming, ergonomics, and design fit — whenever the round needs an
engine that is not the one running that lane, including when the Claude CLI is dark and
when Opus 5 wrote the work under audit.
```

`.codex/agents/planner.toml` and `.codex/agents/reviewer.toml` are Codex-side drivers to the same
Claude route, so each carries the `reviewer.md` form rather than the inverse: `The route holds the
subjective lane by default and the objective lane whenever the round needs an engine that is not
the one running that lane, including when the Sol bench is dark and when Sol wrote the work under
audit.`

`.agents/orchestration.md` § Engine assignment gained, between the default-assignment line and the
unavailable-engine paragraph:

```text
Swap the lanes whenever the round needs an engine that is not the one running that lane. Bench
darkness is one trigger and the writer's engine is another: § Execution loop's audit step requires
an auditor that did not write the work, so where Sol wrote the work under audit, give the objective
lane to Opus 5 and the subjective lane to Sol, and reverse that where Opus 5 wrote it. Both engines
still run, so this is a lane swap rather than a substitution. Record which engine held which lane in
the routing ledger.
```

That paragraph is what separates a swap from the `Engine unavailable` table that follows it, which
still covers darkness alone.

## Finding F11 — the Codex verifier dirty-tree clause

`.codex/agents/verifier.toml` gained, after `Return only the gate report.`:

```text
Follow .agents/orchestration.md § Permission floor for the discarding git commands. Read a
dirty git status as the expected state.
```

## Finding O6 — charters and the contract disagree about when to stop

`.agents/orchestration.md` § Deviation protocol, before:

```text
## Deviation protocol

When reality diverges from a writing dispatch:

1. The writer stops and reports: expected, found, ...
```

After:

```text
## Deviation protocol

Stop when a conflict prevents the primary objective or requires an unowned change. Resolve an
ancillary choice within the owned scope, record the choice, and continue.

Every charter references this section rather than restating it. A charter keeps only a stop
condition its own route owns, such as a misrouted unit it must refuse.

When a writer stops:

1. The writer reports: expected, found, ...
```

The second paragraph is what makes the charter reductions enforceable rather than a convention each
charter can drift from.

Charters reduced to the reference:

| File | Before | After |
| ---- | ------ | ----- |
| `.claude/agents/builder.md` | `## Deviation protocol — stop, do not solve` plus its Expected/Found/Evidence/Done/Hypothesis list and `No root-causing, no workarounds, no plan edits. Escalation is the Orchestrator's job.` | `## Deviation protocol` / `Follow \`.agents/orchestration.md\` § Deviation protocol.` |
| `.claude/agents/application.md` | `On divergence, stop and report expected, found, exact evidence, done/not done, and one short hypothesis.` | `Follow \`.agents/orchestration.md\` § Deviation protocol.` |
| `.claude/agents/opus.md` | `- Stop on genuine deviation and report: expected, found, exact evidence, done vs not done, and at most one short hypothesis.` | `- Follow \`.agents/orchestration.md\` § Deviation protocol.` |
| `.claude/agents/sol.md` | `- The deviation contract, scoped: a conflict with the primary objective stops the unit; an ancillary conflict is the executor's to decide, record, and carry on from.` | `- The deviation contract, scoped, pointing the unit at \`.agents/orchestration.md\` § Deviation protocol.` |
| `.codex/agents/builder.toml` | `On divergence, stop and report expected, found, exact evidence, done/not done, and one short hypothesis.` | `Follow .agents/orchestration.md § Deviation protocol.` |
| `.codex/agents/application.toml` | same sentence | same reference |
| `.codex/agents/sol.toml` | `Stop when reality diverges; return expected, found, evidence, done/not done, and one short hypothesis.` | `Follow .agents/orchestration.md § Deviation protocol.` |
| `.codex/agents/opus.toml` | `The brief requires owned files, off-limits files, acceptance criteria, TTTDD, and a deviation contract.` | `... and a deviation contract pointing the unit at .agents/orchestration.md § Deviation protocol.` |

These descriptions claimed unconditional stopping and now name the contract:

- `.claude/agents/builder.md` and `.codex/agents/builder.toml`: `stops on any plan deviation` → `follows the orchestration contract deviation protocol`.
- `.claude/agents/application.md` and `.codex/agents/application.toml`: the same substitution.

### Stop conditions kept, and why

These are route refusals rather than restatements of the deviation rule. Each names a condition only
that role can detect, and each ends in a refusal to reroute rather than in a report shape:

- `.claude/agents/analyst.md`, `.claude/agents/grok.md`, `.codex/agents/grok.toml` —
  `A unit that needs a write is a misrouted unit — stop and report, do not switch routes.`
- `.claude/agents/builder.md`, `.codex/agents/builder.toml` — `An app-layer unit belongs to
  application: stop and say so.`
- `.claude/agents/builder.md`, `.claude/agents/application.md`, `.codex/agents/builder.toml`,
  `.codex/agents/application.toml` — a unit whose taste, contracts, or host boundaries are still
  open belongs to `opus` or `sol`: `stop and say so.`
- `.claude/agents/orkestrel.md`, `.codex/agents/orkestrel.toml` — report an unanswerable question as
  unknown, name the reading that would settle it, and stop.

## Sweeps

Pattern and paths behind each result.

```text
$ grep -rn "with a shell" .claude/agents .codex/agents .agents
(no output, exit 1)

$ grep -rni "stop and report\|stops on any plan deviation\|On divergence, stop\|Stop when reality diverges\|Stop on genuine deviation" .claude/agents .codex/agents
.claude/agents/analyst.md:26:need a write is a misrouted unit — stop and report, do not switch routes.
.claude/agents/grok.md:28:misrouted unit — stop and report, do not switch routes.
.codex/agents/grok.toml:22:misrouted unit — stop and report, do not switch routes.

$ grep -rni "one short hypothesis\|done/not done\|done vs" .claude/agents .codex/agents
(no output, exit 1)

$ grep -rni "never run a command\|never run commands\|never run shell\|no shell" .claude/agents .codex/agents
.claude/agents/checker.md:65      .claude/agents/distiller.md:35
.claude/agents/orkestrel.md:20    .claude/agents/orkestrel.md:168
.claude/agents/planner.md:54      .claude/agents/researcher.md:39
.claude/agents/reviewer.md:103    .claude/agents/scout.md:33
```

Every `never run a command` hit sits on a Claude charter whose `tools:` line carries no `Bash`, and
`.claude/agents/orkestrel.md:20` (`You have no shell and no network`) is the same fact. No Codex
charter makes that claim, because a `read-only` Codex sandbox does run read-only commands — that
difference is why the two surfaces carry different sentences, per criterion 1's second half.

Return-channel coverage, counted by normalizing each file to one line and matching the sentence:

```text
$ for f in .claude/agents/*.md .codex/agents/*.toml; do n=$(tr '\n' ' ' < "$f" | grep -o "dispatch defect" | wc -l); [ "$n" -gt 0 ] && echo "$n  $f"; done
1  .claude/agents/checker.md      1  .claude/agents/distiller.md
1  .claude/agents/orkestrel.md    1  .claude/agents/planner.md
1  .claude/agents/researcher.md   1  .claude/agents/reviewer.md
1  .claude/agents/scout.md        1  .codex/agents/analyst.toml
1  .codex/agents/checker.toml     1  .codex/agents/distiller.toml
1  .codex/agents/orkestrel.toml   1  .codex/agents/planner.toml
1  .codex/agents/researcher.toml  1  .codex/agents/reviewer.toml
1  .codex/agents/scout.toml
```

Every Claude charter whose `tools:` line excludes `Edit`, `Write`, and `Bash` is in that list, and
every `.codex/agents/*.toml` pinned `sandbox_mode = "read-only"` is too, except
`.codex/agents/grok.toml` — see § Not closed.

## Gates

| Command | Exit | Reading |
| ------- | ---- | ------- |
| `npm run format:check` | 1 | `.codex/config.toml (0ms)` — `Format issues found in above 1 files.` `Finished in 4038ms on 227 files` |
| `npm run lint:check` | 0 | no output |
| `npm run build` | 0 | `build-host: staged 175 file(s) into dist/host`, `build-inventory: staged 175 file(s) into host.json` |
| `npm test` | 0 | last project `test:guides` `23 passed (23)`; `test:setup` `118 passed \| 3 skipped`; `test:config` `172 passed \| 1 skipped` |
| `npm run test:distribution` | 0 | `Test Files 1 passed (1)`, `Tests 5 passed \| 1 skipped (6)`, duration 72.45s |

### The `format:check` failure is not mine

`.codex/config.toml` is pure CRLF in the working tree and pure LF at `HEAD`. `.oxfmtrc.json` sets
`"endOfLine": "lf"` and `.gitattributes` sets `* text=auto eol=lf`.

```text
$ tr -cd '\r' < .codex/config.toml | wc -c   →  43
$ tr -cd '\n' < .codex/config.toml | wc -c   →  43
$ git show HEAD:.codex/config.toml | oxfmt --check   →  All matched files use the correct format.
```

I did not touch that file; unit C1 did, and its only textual change is the two role-rename lines
(`implementer` → `sol`, adding `distiller` to the Luna row). Every file I wrote is pure LF:

```text
$ for f in .claude/agents/*.md .agents/orchestration.md .agents/transports/claude.md .codex/agents/*.toml;
  do echo "$(tr -cd '\r' < "$f" | wc -c)  $f"; done
0  (every file)
```

### `host.json` delta

175 entries before and after; no entry added, none removed. Every digest that changed belongs to a
file I wrote, and the changed set is exactly the files I wrote:

```text
.agents/orchestration.md            .agents/transports/claude.md
.claude/agents/application.md       .claude/agents/builder.md
.claude/agents/checker.md           .claude/agents/distiller.md
.claude/agents/opus.md              .claude/agents/orkestrel.md
.claude/agents/planner.md           .claude/agents/researcher.md
.claude/agents/reviewer.md          .claude/agents/scout.md
.claude/agents/sol.md               .codex/agents/analyst.toml
.codex/agents/application.toml      .codex/agents/builder.toml
.codex/agents/checker.toml          .codex/agents/distiller.toml
.codex/agents/opus.toml             .codex/agents/orkestrel.toml
.codex/agents/planner.toml          .codex/agents/researcher.toml
.codex/agents/reviewer.toml         .codex/agents/scout.toml
.codex/agents/sol.toml              .codex/agents/verifier.toml
```

No entry for `.codex/config.toml`, `.claude/agents/grok.md`, `.codex/agents/grok.toml`,
`.agents/transports/codex.md`, `.agents/transports/cursor.md`, or `CLAUDE.md` changed, which
confirms I did not write C1's files.

## `git status --short`

Mine alone, plus `host.json` regenerated by `npm run build`:

```text
 M .agents/transports/claude.md
 M .claude/agents/builder.md      M .claude/agents/checker.md
 M .claude/agents/orkestrel.md    M .claude/agents/planner.md
 M .claude/agents/researcher.md   M .claude/agents/reviewer.md
 M .claude/agents/scout.md
 M .codex/agents/analyst.toml     M .codex/agents/application.toml
 M .codex/agents/builder.toml     M .codex/agents/checker.toml
 M .codex/agents/opus.toml        M .codex/agents/orkestrel.toml
 M .codex/agents/planner.toml     M .codex/agents/researcher.toml
 M .codex/agents/reviewer.toml    M .codex/agents/scout.toml
 M .codex/agents/verifier.toml
 M host.json
```

Mine inside files C1 created and left untracked — C1 owns the file, I own my edit to it:

```text
?? .claude/agents/distiller.md    ?? .claude/agents/opus.md
?? .codex/agents/distiller.toml   ?? .codex/agents/sol.toml
```

Modified by C1 and then by me — each diff carries both units' work:

```text
 M .agents/orchestration.md       C1 renamed the lanes; I changed § Engine assignment and § Deviation protocol
 M .claude/agents/application.md  C1 renamed the lanes; I reduced the deviation restatement
 M .claude/agents/sol.md          C1 created the route; I reduced the deviation restatement
```

C1's alone, untouched by me:

```text
 M .agents/transports/codex.md    M .claude/agents/grok.md
 D .claude/agents/implementer.md  M .codex/agents/grok.toml
 D .codex/agents/implementer.toml M .codex/config.toml
 M CLAUDE.md                      M tests/distribution.test.ts
?? .agents/transports/cursor.md
```

The Orchestrator's:

```text
?? .orkestrel/campaign/c1-brief.md   ?? .orkestrel/campaign/c1-report.md
?? .orkestrel/campaign/c2-brief.md
```

## Shared-file patches

Report-only. I edited none of these.

### 1. `.codex/config.toml` — line endings, C1's file, blocks criterion 6

Convert every line terminator from CRLF to LF. `npm run format` rewrites it, which is a tree-wide
mutating command the permission floor bars me from. The scoped equivalent:

```text
node -e "const f='.codex/config.toml',s=require('node:fs');s.writeFileSync(f,s.readFileSync(f,'utf8').replace(/\r\n/g,'\n'))"
```

After it, `npm run format:check` exits 0. No byte of the file's text changes.

### 2. `.agents/orchestration.md` § Required sections — outside my owned sections

My scope grants § Engine assignment and § Deviation protocol only, so the restatement at line 545
stands. It is the last copy of the rule outside its new home. Patch:

```diff
-- **Deviation contract.** The required stop-and-report behaviour for writers, scoped. A conflict
-  with the primary objective stops the unit. An ancillary conflict — where a paragraph sits, which
-  heading a section takes — is the executor's to decide, record, and carry on from. An unscoped
-  contract stops a unit over a detail it was equipped to settle.
+- **Deviation contract.** Point the writer at § Deviation protocol and scope it: name the ancillary
+  choices this unit settles itself — where a paragraph sits, which heading a section takes. An
+  unscoped contract stops a unit over a detail it was equipped to settle.
```

### 3. `.codex/agents/grok.toml` and `.agents/transports/cursor.md` — the same defect as F3, one bench over

`.codex/agents/grok.toml` is pinned `sandbox_mode = "read-only"`, its description says it `drafts
the brief, resolves the CLI command, journals the run`, and its binding contract
`.agents/transports/cursor.md` requires both writes:

- `cursor.md:43` — `Create tmp/cursor/ first. Write any brief longer than a couple of sentences to tmp/cursor/<unit>-brief.md`
- `cursor.md:49` — `Write that chain to tmp/cursor/run.sh and run the file`
- `cursor.md:47` — the launch form redirects to `tmp/cursor/<unit>.jsonl` and `tmp/cursor/<unit>.err`

I did not land half of this. `.agents/transports/cursor.md` is not in my owned files, and a charter
that contradicts its binding contract is worse than one that is consistently wrong. Both patches
belong in one round:

`.agents/transports/cursor.md`, after the `Write that chain to tmp/cursor/run.sh` paragraph:

```text
A driver pinned `workspace-write` writes the brief and the run script itself. A driver pinned
`read-only` writes nothing at all — not the brief, not the script, not the journal: return the
brief text, its intended path, the resolved command, and the journal and `.err` paths, and the
Orchestrator writes them and launches the run. Check your own pinned sandbox before drafting, and
take the branch that matches it.
```

`.codex/agents/grok.toml`, before its `Return only the question, evidence, ...` paragraph:

```text
Your sandbox is read-only: you never edit a file and never write your report to a file. You
therefore write neither the brief nor the journal. Return the brief text, its intended path, the
resolved command, and the journal path, and the Orchestrator writes the brief and launches the run.
A dispatch that names a report path for you is a dispatch defect — return your result as your final
message and name the defect in it.
```

Its description also needs `drafts the brief, resolves the CLI command, journals the run` →
`returns the brief text, its intended path, and the resolved CLI command for the Orchestrator to
write and launch`, matching what C1 already wrote into `.codex/agents/reviewer.toml`.

`.claude/agents/grok.md` needs no equivalent: it holds `Bash`, so it can write what the contract
asks for. Same for `.claude/agents/analyst.md` and `.claude/agents/sol.md` against
`.agents/transports/codex.md`.

## Ancillary choices I settled and recorded

Per the rule this unit installed: resolve an ancillary choice within the owned scope, record it,
continue.

1. **One phrasing per surface.** The brief prescribed a sentence for `reviewer` and `checker` and told
   me to match `distiller`'s existing wording elsewhere. Those are different sentences, and
   criterion 1 requires one. I unified on the prescribed sentence and rewrote `distiller` to it,
   because the prescribed sentence also covers the assigned-command half of F3 and `distiller`'s did
   not.
2. **Per-surface wording.** Criterion 1 also requires that no charter describe a tool it does not
   hold. A Claude read-only role holds no `Bash`, so `never run a command` is true there. A Codex
   `read-only` sandbox does run read-only commands, so that clause is false there and I dropped it
   from the Codex sentence. The sentences are identical within each surface.
3. **Mirrors the brief did not name by file.** The brief named `.claude/agents/builder.md`,
   `.codex/agents/application.toml`, and `.codex/agents/sol.toml` for O6 and then said to sweep
   every charter. Mirror discipline took the sweep to `.codex/agents/builder.toml`,
   `.claude/agents/application.md`, `.claude/agents/opus.md`, `.claude/agents/sol.md`, and
   `.codex/agents/opus.toml`.
4. **Descriptions, not only bodies.** `stops on any plan deviation` in four role descriptions is the
   same unconditional claim the finding is about, so it moved to the reference form.

## Not closed

- `npm run format:check` stays RED until patch 1 lands. Every other gate is green.
- Patches 2 and 3 are outside my owned files and await a successor unit.
- `.codex/agents/grok.toml` is the one `read-only` Codex charter with no return-channel sentence,
  for the reason in patch 3.
