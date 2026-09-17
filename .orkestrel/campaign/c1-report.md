# Unit C1 report — engine-named implementation lanes, a Cursor transport contract, a `distiller` role

All three findings landed. One shared-file patch is returned for serial integration:
`.codex/config.toml` names the retired role and sits in neither the owned nor the off-limits list.

## 1. Done / not done per criterion

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `implementer` sweep returns only ruled-on hits | Done | Three sites survive, in two classes, ruled in § 2 |
| 2 | One `sol` and one `opus` per surface; the role table names them | Done | `.claude/agents/{sol.md,opus.md}`, `.codex/agents/{sol.toml,opus.toml}`; `.agents/orchestration.md:161-162` |
| 3 | `.agents/transports/cursor.md` exists; both `grok` charters bind it and restate nothing | Done | Neither charter now contains `agent`, `agent.cmd`, `agent.ps1`, `0xE9`, `--mode=ask` command text, or a journal path |
| 4 | `distiller` on both surfaces and in the role table | Done | `.claude/agents/distiller.md`, `.codex/agents/distiller.toml`, `.agents/orchestration.md:163` |
| 5 | `format:check` and `lint:check` clean | Done | `All matched files use the correct format. Finished in 4023ms on 227 files`; `lint:check` exit 0, no output |
| 6 | `build` succeeds; every `host.json` entry traces to a touched file | Done | `build-inventory: staged 175 file(s) into host.json`; delta in § 5 |
| 7 | `npm test` exits 0, counts reported | Done | `TEST_EXIT=0`; counts in § 6, plus `test:distribution` run separately |
| 8 | `git status --short` names owned files plus `host.json` | Done | Listed in § 6; the only extra line is `.orkestrel/campaign/c1-brief.md`, untracked at the baseline and not mine |

## 2. The rename

### Files moved

- `.claude/agents/implementer.md` → `.claude/agents/opus.md`, `name: opus`, description and opening
  line now name `sol` as its mirror instead of "the Sol implementer".
- `.codex/agents/implementer.toml` → `.codex/agents/sol.toml`, `name = "sol"`, description gains
  "the objective mirror of `opus`".

Moved with plain `mv`, not `git mv`, so the index stays untouched.

### References changed

| File | Change |
| ---- | ------ |
| `.agents/orchestration.md` | Role table's two implementation rows now read `sol` / `sol` and `opus` / `opus`; the harness-relative bullet replaced with the supplied wording; the collision sentence added; execution-loop step 3, the network-dependent-work bullet, and the bench-child-stdio paragraph re-pointed |
| `CLAUDE.md` | § Models: "the Opus `implementer`" → "`opus`" |
| `.agents/transports/codex.md` | `## Implementer route` → `## Sol route`; the negative-test routing exclusion now routes to `opus` |
| `.claude/agents/sol.md` | Description and opening name Sol's implementation route; route pin now `the route is `sol`` |
| `.codex/agents/opus.toml` | Description names the Claude `opus` route and `sol` as its mirror; CLI-failure fallback now routes to `sol` |
| `.claude/agents/application.md` | Open-contract work "belongs to `opus` or `sol`" |
| `.codex/agents/application.toml` | Same, "belongs to sol or opus" |
| `.codex/agents/builder.toml` | Open taste work "belongs to sol or opus" |
| `tests/distribution.test.ts` | `.claude/agents/implementer.md` → `opus.md`; `.codex/agents/implementer.toml` → `sol.toml` |

Checked and needing no change: `.agents/templates/brief.md` and `.cursor/rules/orchestration.mdc`
name no implementation role; `tests/policy.test.ts`, `tests/setupPolicy.ts`, and
`tests/setupServer.ts` reference only `orkestrel.md` and a `grok.toml` fixture path.

### Surviving hits and their rulings

**Kept — `CODEX_IMPLEMENTER_MODEL` and `CODEX_IMPLEMENTER_EFFORT`**
(`.agents/transports/codex.md:23-24`, read by `scripts/codex.sh:16-17,42,44`).

These are environment-variable names on a wire, not role names any harness resolves. Renaming them
to `CODEX_SOL_*` requires editing `scripts/codex.sh`, which is in neither the owned nor the
off-limits list, and buys no routing correctness — nothing dispatches by them. Kept as-is. If the
Orchestrator wants the token gone from the tree, that is a successor unit owning
`.agents/transports/codex.md` and `scripts/codex.sh` together; splitting it across units would leave
the readiness script reading a variable the contract no longer declares.

**Report-only — `.codex/config.toml:28`.**

This one the rename makes false: the Codex harness bridge maps `implementer` to Sol, and no
`.codex/agents/implementer.toml` exists after this unit. The file is in neither scope list, so I did
not edit it. Exact patch, which also carries the O7 mirror:

```diff
-- Sol: this session, plus analyst and implementer.
+- Sol: this session, plus analyst and sol.
 - Cursor Grok: the grok bridge, read-only.
 - Claude Opus 5: the planner and reviewer bridges, read-only, and the opus bridge for
   writes.
-- Luna: researcher, scout, and checker.
+- Luna: distiller, researcher, scout, and checker.
 - Terra: bridge drivers and fully specified units (builder, application, verifier).
```

`.codex/config.toml` is a vendored path, so applying this patch changes `host.json` again. Rebuild
after integrating it.

## 3. The collision ruling

The collision is workable, so I did not take the stop condition and did not invent a third name.

A role name and a model alias never occupy the same field. A role name appears in a dispatch and in
a role file's `name`; a model alias appears only in a `model:` pin. The tree already proves they are
independent: `.codex/agents/opus.toml` is a role named `opus` pinned to `gpt-5.6-terra`. That is the
disambiguating case, so I put it in the sentence rather than asserting the separation abstractly.

Landed in `.agents/orchestration.md` § Roles, directly beneath the `sol` / `opus` bullet:

> - A role name and a model alias occupy different fields — a dispatch and a role file's `name` carry
>   the role, a `model:` pin carries the alias — so the Codex `opus` bridge is a role named `opus`
>   pinned to the `gpt-5.6-terra` model.

Home chosen over `CLAUDE.md` § Models because the role name is introduced in the orchestration
contract and read by every harness, and a Claude-only placement would leave a reader of
`.codex/agents/opus.toml` without it. Not restated in `CLAUDE.md`.

## 4. The transport

`.agents/transports/cursor.md` is new. Its headed sections are Model, Invocation, Journal the
launch, Containment, and Availability.

**Moved verbatim from `.claude/agents/grok.md`**, byte-for-byte apart from section headings: the
`CURSOR_GROK_MODEL=cursor-grok-4.6-high` pin with its `agent models` re-read rule and 2026-08-13
reading date; the resolution ladder; the whole versioned-entry paragraph with the `cursor-agent.ps1`
console-title cause, the `0xE9` abort, the intermittency clause, and the `SetConsoleWindowTitle`
trace; the empty-shim reading rule; the `tmp/cursor/` creation and brief-pointer rule; the full
launch command line; the `run.sh` rule; the `init`/`session_id`/`result`/`.err`/`--resume`
paragraph; the two-minute work-class split with the never-recommend-a-cap and never-detach clauses;
`--force`; `CURSOR_API_KEY`; the `tmp/cursor/` retention pointer; and the dark-bench ladder with its
"never hand the reading to the Orchestrator, `planner`, or `analyst`" clause. Nothing was rewritten.

**Added to the new file** — the contract header, modelled on `codex.md` and `claude.md`: it names
itself a contract rather than a route, states that the drivers binding it pin their own tools, model,
effort, and permission or sandbox mode, points at `.agents/orchestration.md` first, states that both
harnesses' `grok` bridges bind it because Cursor is native to neither, and closes with "Never route
orchestration or acceptance across this bridge."

**What each charter kept.** `.claude/agents/grok.md` keeps its frontmatter unchanged (`tools: Bash,
Read, Grep, Glob`, `model: sonnet`, `effort: low`, `permissionMode: default`), its opening
containment line, its read-order line, its bounded-question requirement, a transport-binding section
worded like `analyst.md`'s, a route pin (`the route is `grok`, its mode is `--mode=ask`, and it is
read-only in the current checkout`), the two brief-and-containment bullets that shape the brief
rather than the command, and its full return shape. `.codex/agents/grok.toml` keeps
`model = "gpt-5.6-terra"`, `model_reasoning_effort = "low"`, `sandbox_mode = "read-only"`, the same
transport-binding paragraph, the same route pin, the same brief shape, and its return list — now
also carrying "Grok's output is evidence, never a decision or a verdict," which its Claude twin
already had.

**Neither charter can fail to launch its route.** Each binds a contract that carries the model
variable, the resolution ladder, and the exact command line, exactly as `analyst.md` and `sol.md`
bind `codex.md` today. I did not take the second stop condition.

**The invocation contradiction is resolved in favour of the versioned entry.** The Codex mirror
previously mandated `agent -p --trust --mode=ask ...` — the bare shim the Claude charter forbids.
Both charters now carry no invocation at all, and the single copy in `cursor.md` forbids `agent`,
`agent.cmd`, and `agent.ps1` on Windows. The Codex mirror's pointer to `.claude/agents/grok.md` as
the owner of the model pin is gone; the pin has one home.

## 5. The vendored set

`src/core/constants.ts` declares the vendored set by directory — `CANON_PATHS` carries
`.agents/transports`, `.claude/agents`, and `.codex/agents` — so a new file beneath any of them is
already claimed and `src/` needed no edit. That matches the brief, which puts `src/` off-limits.

The per-file declaration is the `expanded` array in `tests/distribution.test.ts`, which the test
compares in both directions against `HOST_PATHS`, `CANON_PATHS`, `REFERENCE_PATHS`, and the actual
`dist/host` listing. Declared there: `.agents/transports/cursor.md`, `.claude/agents/distiller.md`,
`.claude/agents/opus.md`, `.codex/agents/distiller.toml`, `.codex/agents/sol.toml`; removed:
`.claude/agents/implementer.md`, `.codex/agents/implementer.toml`.

`host.json` delta — `git diff --stat host.json`:

```text
 host.json | 56 +++++++++++++++++++++++++++++++++++++-------------------
 1 file changed, 37 insertions(+), 19 deletions(-)
```

Entry count holds at 175. Every changed entry traces to a file this unit touched:

| Entry | Trace |
| ----- | ----- |
| `.agents/transports/cursor.md` added | F6, new file |
| `.claude/agents/distiller.md` added | O7, new file |
| `.codex/agents/distiller.toml` added | O7, new file |
| `.claude/agents/implementer.md` removed, `.claude/agents/opus.md` added | F1 rename |
| `.codex/agents/implementer.toml` removed, `.codex/agents/sol.toml` added | F1 rename |
| `CLAUDE.md` digest | F1 |
| `.agents/orchestration.md` digest | F1, F6, O7 |
| `.agents/transports/codex.md` digest | F1 |
| `.claude/agents/grok.md`, `.codex/agents/grok.toml` digests | F6 |
| `.claude/agents/sol.md`, `.codex/agents/opus.toml` digests | F1 |
| `.claude/agents/application.md`, `.codex/agents/application.toml`, `.codex/agents/builder.toml` digests | F1 |
| root `digest` | derived from the entries |

No entry in the delta is unexplained.

## 6. Gates

Run in the documented order, read from the actual output, after the final rewrap and rebuild.

| Gate | Result |
| ---- | ------ |
| `npm run format:check` | Clean — `All matched files use the correct format. Finished in 4023ms on 227 files using 16 threads.` |
| `npm run lint:check` | Clean — exit 0, no diagnostics |
| `npm run check` | Clean — root project plus `check:src:core`, `check:src:server`, `check:src:bin`, no diagnostics |
| `npm run build` | Succeeds — `build-host: staged 175 file(s) into dist/host`, `build-inventory: staged 175 file(s) into host.json` |
| `npm test` | `TEST_EXIT=0` |

Per-project counts from the final `npm test`:

| Project | Files | Tests |
| ------- | ----- | ----- |
| `src:core` | 9 passed (9) | 422 passed (422) |
| `src:server` | 5 passed (5) | 466 passed, 7 skipped (473) |
| `src:bin` | 3 passed (3) | 257 passed (257) |
| `policy` | 1 passed (1) | 102 passed (102) |
| `config` | 1 passed (1) | 172 passed, 1 skipped (173) |
| `setup` | 3 passed (3) | 118 passed, 3 skipped (121) |
| `guides` | 1 passed (1) | 23 passed (23) |

`npm test` does not include the distribution project, so I ran it separately —
`npm run test:distribution`, `DIST_EXIT=0`, `Test Files 1 passed (1)`,
`Tests 5 passed | 1 skipped (6)`. That project holds the vendored-set assertion, so criterion 7's
guard actually ran.

`git status --short`:

```text
 M .agents/orchestration.md
 M .agents/transports/codex.md
 M .claude/agents/application.md
 M .claude/agents/grok.md
 D .claude/agents/implementer.md
 M .claude/agents/sol.md
 M .codex/agents/application.toml
 M .codex/agents/builder.toml
 M .codex/agents/grok.toml
 D .codex/agents/implementer.toml
 M .codex/agents/opus.toml
 M CLAUDE.md
 M host.json
 M tests/distribution.test.ts
?? .agents/transports/cursor.md
?? .claude/agents/distiller.md
?? .claude/agents/opus.md
?? .codex/agents/distiller.toml
?? .codex/agents/sol.toml
?? .orkestrel/campaign/c1-brief.md
```

Nothing committed, pushed, installed, or versioned. No `git checkout`, `restore`, `stash`, `reset`,
or `clean` ran.

## 7. What I did not close

- **`.codex/config.toml`.** Unscoped, so report-only. The patch is in § 2. Until it is applied, the
  Codex bridge's engine mapping names a role file that no longer exists, and the Luna row omits
  `distiller`. This is the one place where the campaign is mid-rename on disk.
- **`CODEX_IMPLEMENTER_*`.** Kept deliberately, reasoning in § 2. A successor unit owning both
  `.agents/transports/codex.md` and `scripts/codex.sh` can retire the token; neither file alone can.
- **The read-only return-channel sentence** exists on `distiller` only, as the brief directed. The
  `grok` charters and the other read-only charters still lack it; unit C2 owns that sweep.
- **The release.** Vendored bytes moved and vendored paths were added, so this obliges a `scaffold`
  bump, a publish, and a `repair` re-propagation across every target. Not mine: the brief forbids a
  version bump and a publish.
- **Observations, not criteria.** The rename touched references in nine files beyond the two renamed
  charters. Wall-clock: the full `npm test` runs about 40 seconds of reported test time across its
  seven projects; `test:distribution` is the slow one because it packs and installs.
