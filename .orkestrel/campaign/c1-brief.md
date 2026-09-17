# Unit C1 — name the implementation lanes by engine, and give Cursor a transport contract

## Role and engine

`implementer` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer. The tree is committed and clean.

This unit carries judgment, not transcription: the rename's blast radius is yours to find, and the
transport extraction must leave two charters that still work.

## Objective

Land three findings from the debrief's instruction-set audit. The repository owner directed all
three, knowing they move the vendored `dist/host` surface and oblige a release.

## Authority — read before acting

1. `AGENTS.md` § Instruction files and § Writing. Every line you write is a directive for an
   executing agent, never prose for a person.
2. `.agents/orchestration.md` whole. You are editing its role model.
3. `.orkestrel/campaign/debrief-verdict.md` — the finding table and the buckets.
4. `.agents/skills/orkestrel-debrief/references/instruction-audit.md` § Mirror discipline. Every
   roster change lands on all provider surfaces in the same round.

## Finding F1 — the implementation lanes resolve to different engines per harness

The contract states that `implementer` means Opus in Claude Code and Sol in Codex, and tells the
reader to resolve it against the harness they are running in. One campaign, one Orchestrator, one
harness produced these four briefs:

- `.orkestrel/scaffold/s1-brief.md` — "`implementer` — Opus 5, native Claude subagent"
- `.orkestrel/scaffold/s2-brief.md` — "`implementer` — GPT-5.6 Sol, running inside the Codex CLI"
- `.orkestrel/scaffold/s3-brief.md` — "`implementer` — Opus 5, native Claude subagent"
- `.orkestrel/scaffold/s4-brief.md` — "You are the implementer for unit S4. You are GPT-5.6 Sol"

A bench brief has two readers: the Orchestrator writes it where `implementer` resolves one way, and
the engine reads it inside a CLI where it resolves the other. Those briefs cannot be re-run by role
name. A sweep of the campaign folder shows the Claude-side `sol` route was never reached by its own
name, against the contract's own "Reach every role by its own name."

**The change.** Name each implementation lane by its engine on both provider surfaces, and retire
the harness-relative token.

Replace the two role-table rows:

```text
| Nontrivial implementation (objective)    | `sol`                           | `sol`                         | GPT-5.6 Sol (bridge / native) |
| Nontrivial implementation (subjective)   | `opus`                          | `opus`                        | Opus 5 (native / bridge)      |
```

Replace the bullet that explains the harness-relative token with:

```text
- `sol` and `opus` each name one engine on both provider surfaces. The harness decides whether the
  role is native or a bridge; the name never does. State the engine in the dispatch anyway.
```

Then carry it: `.claude/agents/implementer.md` becomes `.claude/agents/opus.md`,
`.codex/agents/implementer.toml` becomes `.codex/agents/sol.toml`, and the existing
`.claude/agents/sol.md` and `.codex/agents/opus.toml` stay as they are. After the rename each
surface holds one `sol` and one `opus`, and which is native is the harness's fact rather than the
name's.

**Find every reference yourself.** `.agents/orchestration.md`, `CLAUDE.md`, both files under
`.agents/transports/`, every charter that names another role, every skill, and every test that
asserts a role roster. Sweep for `implementer` when you are done and rule on each surviving hit.

**The collision to rule on.** `CLAUDE.md` § Models fixes `opus` and `sonnet` as model aliases. A role
named `opus` is a different field from a model named `opus`. State in the contract, in one sentence,
that a role name and a model alias occupy different fields so a reader does not conflate them — or
if you judge the collision unworkable, stop and report with your reasoning rather than inventing a
third name.

## Finding F6 — the Cursor transport contract sits in an agents directory

The contract states that a transport contract lives in `.agents/transports/`, and that directory
holds `claude.md` and `codex.md` only. The role table lists `grok` on both surfaces with the engine
"Cursor Grok (bridge)", so a third bridge exists whose transport lives in `.claude/agents/grok.md`.

The consequence is already live: the Claude charter forbids the Windows shim and names the `0xE9`
abort, and the Codex mirror mandates the shim it forbids. The campaign's routing ledger records the
versioned entry as the route that worked, so the Codex mirror prescribes the one the campaign proved
unreliable.

**The change.** Create `.agents/transports/cursor.md` carrying the model pin, the CLI resolution
ladder, the versioned-entry rule with its `0xE9` reason, the launch form, the journal and error-file
discipline, the session id, and the resume option — moved out of the Claude `grok` charter rather
than rewritten, because a rewritten transport drifts from the one that works. Reduce both `grok`
charters to their route pin and return shape, each binding the new contract by reference the way
`.claude/agents/analyst.md` binds the Codex one. Resolve the invocation contradiction in favour of
the versioned entry, which is the route the campaign measured.

Extend the transport bullet in `.agents/orchestration.md` to name three contracts, adding:

```text
  `.agents/transports/cursor.md` is the shared Cursor transport contract, and both harnesses' `grok`
  bridges bind it, because Cursor is native to neither. A contract's home is the provider it carries,
  never the harness that reaches it.
```

Add the new path wherever the repository declares its vendored host set and wherever a test asserts
that set. Find both yourself; `host.json` is generated by the build, not hand-edited.

## Finding O7 — absorption falls back to charters that exclude the work

The contract routes absorption to Grok, then Luna, then Sonnet. The native charters the ladder lands
on exclude the work: `scout` excludes deep reading, and `researcher` excludes repository-scale
absorption. The `grok` roles are drivers and cannot perform it themselves.

**The change.** Add mirrored `distiller` charters on both surfaces and a routing-table entry using
the existing fallback ladder. The charter's job:

```text
Perform bounded bulk reading and evidence distillation when the orchestration contract routes
absorption to the native fallback. Return cited facts, contradictions, and unresolved inputs. Make
no design, implementation, review, or acceptance decisions.
```

Give it the read-only tool set its siblings carry, and the return-channel sentence every read-only
charter is about to gain in unit C2 — write it here for this charter only: it holds `Read`, `Grep`,
and `Glob`, its final message is its distillate, and a dispatch naming a report path for it is a
dispatch defect.

## Scope

**Owned files:**

- `.agents/orchestration.md`
- `CLAUDE.md`
- `.agents/transports/` — the new `cursor.md`, and `claude.md` and `codex.md` where they name a
  renamed role
- `.claude/agents/` and `.codex/agents/` — the renames, the two `grok` trims, the new `distiller`
  pair, and any charter naming a renamed role
- whichever file declares the vendored host path set, and the test that asserts it

**Off-limits:**

- `src/`, `configs/`, `guides/`, `dist/`, `package.json`, `.orkestrel/`
- `host.json` by hand — it is generated; run the build and let it regenerate
- `.agents/skills/` — unit C4 owns the skill refinements
- the roughnotes and test checkouts

**Do not bump a version and do not publish.** Do not commit or push. Do not install anything. Run no
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. A sweep for `implementer` across `.agents/`, `.claude/`, `.codex/`, `CLAUDE.md`, and `tests/`
   returns only hits you rule on and report. `dist/` and `tmp/` are excluded.
2. Each provider surface holds one `sol` role file and one `opus` role file, and the role table's
   two implementation rows name them.
3. `.agents/transports/cursor.md` exists, both `grok` charters bind it by reference, and neither
   restates it. A sweep shows the two charters no longer disagree about the Windows invocation.
4. A `distiller` charter exists on both surfaces and appears in the role table.
5. `npm run format:check` and `npm run lint:check` are clean.
6. `npm run build` succeeds. `host.json` changes — that is expected, because this repository vendors
   these paths. Report `git diff --stat host.json` and confirm every changed entry traces to a file
   you touched or added.
7. `npm test` exits 0. Report every project's counts. The distribution and config projects assert
   the vendored set, so a missing path declaration fails there rather than silently.
8. `git status --short` names only files on your owned list plus `host.json`.

**Observations, not criteria:** the wall-clock durations; how many references the rename touched.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. If the role-name and model-alias collision is unworkable, stop and
report rather than inventing a third name. If the transport extraction would leave a charter unable
to launch its route, stop and report with the text that breaks.

## Output

Write your report to `tmp/units/c1-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The rename** — every file and reference you changed, and every surviving `implementer` hit with
   your ruling on it.
3. **The collision ruling** — role name against model alias, and the sentence you landed.
4. **The transport** — what moved verbatim, what each charter kept, and how the invocation
   contradiction resolved.
5. **The vendored set** — what you declared and where, and the `host.json` delta.
6. **Gates.**
7. **What you did not close**, and why.

No process diary.
