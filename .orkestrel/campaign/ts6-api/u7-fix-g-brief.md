# Unit brief — U7-fix-g: the stale boot and warm-prove rows in the guide's § Cost (probe)

Follows `ts6-u7-fix-f-brief.md`. Carries the Orchestrator's M6 reading (`/home/user/scaffold/.orkestrel/campaign/ts6-api/m6-boot.log.txt`, taken 2026-09-06 with `instruments/m6/m6-boot.mjs`): the guide's boot row and warm-prove row in `guides/probe.md` § Cost still carry the 2026-08-20 readings over the resident language service, which the type stage no longer uses.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/fleet/probe` for the life of this unit.

## Objective

Make the § Cost table in `guides/probe.md` state what the built entry costs on 2026-09-06, so a harness sizing its timeout from that table reads the arming and the per-call cost the shipped server has.

## Context

- Read first: `AGENTS.md` § Writing and `.claude/rules/writing.md` (at `/home/user/scaffold/`; a measurement is a value the reader needs, so the ranges and run counts in a table row are permitted), then `guides/probe.md` from the `## Cost` heading to the `## Tests` heading (about lines 1043 to 1077).
- Measured, 2026-09-06 (M6, three fresh spawns of `dist/bin/main.js` driven as a newline-delimited JSON-RPC line client from this repository's root, with other work running beside them):
  - `initialize` answered at 497 ms, 526 ms, and 561 ms after the spawn;
  - the first answered `tools/call` (`prove` over the flagship claim) landed at 16154 ms, 16712 ms, and 16786 ms after the spawn;
  - the next `prove` on the same child, client round trip, took 4211 ms, 4509 ms, and 5692 ms.
- The other rows of the table are the type-stage readings taken on 2026-09-06 and stay as they are. After this edit every row in the table is a 2026-09-06 reading.
- The tree is dirty with U7 and fixes a to f, uncommitted; commit nothing.
- Host: Linux, bash; `npx oxfmt` and `npm run test:guides` run from `/home/user/fleet/probe`.

## Scope

Owned: `guides/probe.md`, the § Cost section only. Off-limits: everything else, including every other section of the guide.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no tree-wide `format` or lint `--fix`. A scoped `npx oxfmt guides/probe.md` is permitted because you own the file.

## Edits

1. **The introductory paragraph** under `## Cost`: replace the clause "The type-stage readings were taken on 2026-09-06 and the rest on 2026-08-20, over this repository" with "They were taken on 2026-09-06, over this repository", keeping the rest of the sentence (the host, the toolchain versions, "with other work running beside them") and the sentence that follows it unchanged.
2. **The boot row**: `| Boot: spawning \`dist/bin/main.js\` to the first answered \`tools/call\` | 4.1 s to 4.4 s over 4 runs |` becomes `| Boot: spawning \`dist/bin/main.js\` to the first answered \`tools/call\` | 16.2 s to 16.8 s over 3 runs |`.
3. **A new row before the boot row**: `| Boot: spawning \`dist/bin/main.js\` to the answered \`initialize\` | 497 ms to 561 ms over 3 runs |`.
4. **The warm-prove row**: `| One warm \`prove\` over the flagship claim, client round trip | 437 ms to 495 ms over 4 runs |` becomes `| One warm \`prove\` over the flagship claim, client round trip | 4.2 s to 5.7 s over 3 runs |`.
5. **The paragraph beginning "Boot is dominated by arming"**: after its first sentence, add one sentence: "The first answered `tools/call` also carries one `prove`, so it lands about one warm call after the `arm` event." Leave the remaining sentences of the paragraph unchanged.
6. Change nothing else. Re-align the table's columns with `npx oxfmt guides/probe.md` if the check refuses the widths.

## Output

Write `tmp/units/ts6-u7-fix-g-report.md` with the lines before and after per edit, every criterion below with PASS or FAIL and its evidence (the command and its exit code), and any deviation.

## Deviation contract

Stop and report when the section is not where the brief says, when a row named under Edits is absent or reads differently from the brief's "before" text, or when `npx oxfmt` changes a line outside § Cost. Where a heading or a paragraph sits is yours to decide and record.

## Acceptance criteria

1. `git diff --stat` names `guides/probe.md` and no other file.
2. `sed -n '/^## Cost/,/^## Tests/p' guides/probe.md | grep -c '2026-08-20'` prints 0, and the same range carries the three rows under Edits 2 to 4 with the values the brief states.
3. `npx oxfmt --check guides/probe.md` exits 0.
4. `npm run test:guides` exits 0. Report its reading as an observation if a row reddens on a timing budget; the deciding re-run is the Orchestrator's.
