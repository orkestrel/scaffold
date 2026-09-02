# Unit U5 polish-harness — report

Done. Both gates green. Two owned files changed, no shared file touched, no commit.

## Files touched

- `.agents/skills/orkestrel-polish-surface/references/capture-harness.md` — rewritten: the journey
  run is the portfolio source, the spawned script is the exception, and the portfolio table names a
  source per artifact plus a statechart outcome row.
- `.agents/skills/orkestrel-polish-surface/SKILL.md` — one bullet added to § Judge the rendering
  naming the journey suite's capture family as the portfolio source.

## Sections changed in `capture-harness.md`

| Section                                   | Change                                                                                                                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Opening                                   | Now states the scope rule first: take the portfolio from the journey suite's capture family wherever a Vitest browser project can mount and drive the surface; build the spawned script only where none can. Adds the one-source-per-surface rule and the pointer that `orkestrel-prove-journey` owns generation. Ownership and throwaway lines kept, recast as directives. |
| One call, one lifecycle                   | Scoped to the spawned harness with an opening directive. Every bullet kept; the process-group rationale folded into the bullet it governs.                                                                    |
| Validate the seed before capturing        | Scoped to the spawned harness, naming `orkestrel-prove-journey` as the owner of the journey run's entry law. Every bullet kept; the narration lead removed.                                                   |
| Capture the full portfolio                | Table rewritten to three columns: Artifact, Source in the journey run, What the artifact must show. Statechart outcome row added. Bullets recast as directives, with a routing bullet for the per-variant written artifact and the harness deep link, and a statechart-family condition. |
| Preflight before spending a round         | Kept, applying to either source. Lead recast as an imperative. One bullet added for the statechart outcome.                                                                                                   |
| Triage missing evidence to the harness first | Kept. Lead and closing recast as imperatives. One bullet added routing a journey-run gap to the journey suite.                                                                                                |

## The portfolio table as it now reads

| Artifact               | Source in the journey run            | What the artifact must show                                                           |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| Viewport captures      | `place` across the declared variants | Every breakpoint the surface declares, never one convenient size                      |
| Theme captures         | `place` across the declared variants | Every theme the surface ships, at every declared viewport                             |
| Accessibility snapshot | `describeTree` and `describeFocus`   | The rendered roles, names, and states, and the focus order the walk took              |
| Interaction log        | The journal's `steps`                | Each interaction, its trigger, and the result observed after it                       |
| Console and error log  | The journal's `output`               | Everything the page emitted, including an uncaught error                              |
| Statechart outcome     | The harness after a play-all run     | The terminal status, the passed, failed, and total tallies, and each row's own result |

Each source name is read from `C:\Users\mikes\WebstormProjects\test\guides\test.md` § Browser
(`createPortfolio` → `place`, `describeTree`, `describeFocus`, `JournalInterface` carrying `steps`
and `output`) and from `orkestrel-prove-journey` → `statechart.md` for the harness tallies.

## Gate output

`npm run format:check`:

```text
npm notice run @orkestrel/scaffold@0.0.59 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 3710ms on 218 files using 16 threads.
```

`npm run test:policy`:

```text
···············································································································

 Test Files  1 passed (1)
      Tests  111 passed (111)
   Start at  16:21:41
   Duration  1.94s (transform 253ms, setup 313ms, import 305ms, tests 1.16s, environment 0ms)
```

`oxfmt` formats Markdown. The first `format:check` after the rewrite failed on the owned file's
table padding alone. I ran `npx oxfmt --config .oxfmtrc.json --write` on that single owned file, not
tree-wide, and re-ran the check.

## Review evidence

`git diff --stat`:

```text
 .agents/skills/orkestrel-polish-surface/SKILL.md   |   3 +
 .../references/capture-harness.md                  | 120 ++++++++++++---------
 2 files changed, 74 insertions(+), 49 deletions(-)
```

`git status --porcelain`:

```text
 M .agents/skills/orkestrel-polish-surface/SKILL.md
 M .agents/skills/orkestrel-polish-surface/references/capture-harness.md
?? .orkestrel/scaffold/audit-brief.md
```

`.orkestrel/scaffold/audit-brief.md` is untracked and is not mine. I did not create, read, or touch
it.

## Decisions I recorded and carried on from

- **A statechart preflight line.** The brief says to keep preflight "as they are". A new portfolio
  row that preflight cannot check is a gap this unit would have created, so I added one bullet:
  the statechart outcome reads a terminal status, with a zero failed tally and a passed tally equal
  to the total. Every other preflight bullet is unchanged.
- **A triage routing line.** Added one bullet routing a journey-run gap to the journey suite that
  owns it. The rest of triage is unchanged.
- **Two rows kept for viewports and themes.** The brief names one source for them jointly. I kept
  them as separate rows because each states a different requirement on the declared variant set,
  and merging drops one. Neither row splits the run axis, so neither contradicts
  `orkestrel-prove-journey` → Read the variant once.
- **Cross-skill citation by name, not by relative link.** `orkestrel-prove-journey` is cited by
  backticked name and section, matching how `captures.md` already cites
  `orkestrel-polish-surface`. A `../../` link across skill directories would be the first of its
  kind here and is not validated by any gate.

## Claims I could not close

1. **No executed proof that a journey-generated portfolio satisfies every table row.** I read the
   published surface in `test/guides/test.md` and the journey skill's references. No surface in
   this checkout declares the capture family, so nothing here could run a capture family and read
   the artifacts back. The source column is documented reading, not measurement.
2. **The vendored `dist/host` surface moved.** `host.json` vendors both edited files (rows at
   `host.json:190` and `host.json:202`). No path set changed, so no `host.json` row needed editing,
   and `host.json` was off-limits regardless. The scaffold bump, the publish, and the fleet
   `repair` propagation are the Orchestrator's to sequence.
3. **`SKILL.md` § Judge the rendering still reads "captures at both viewports and both themes".**
   With the journey run as the source the variant list is declared and can carry more than a pair,
   and `AGENTS.md` § Writing bans a `both` that tallies a set the sentence does not enumerate. My
   grant was one sentence naming the source, so I left that bullet alone. It needs a carrier.
4. **No parity or link gate covers a cross-skill citation.** `tests/policy.test.ts` checks
   frontmatter, reference naming from `SKILL.md`, and bridge pairing; it asserts nothing about a
   citation of another skill. A rename of `orkestrel-prove-journey` would leave the new citations
   stale with every gate green.
