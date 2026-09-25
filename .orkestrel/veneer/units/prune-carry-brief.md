# Unit PRUNE-CARRY — the carry check for the landed styles records

## Role and engine

`grok` bridge driving Cursor Grok, read-only. The driver carries this brief across unaltered and returns the journal
path, the session id, and Grok's answer. Grok performs the reading itself and spawns nothing.

## Objective

For the records of units that have landed on Veneer `main`, list every item they leave open and name its carrier, so
the Orchestrator can run the retention procedure's carry check
(`/home/user/scaffold/.agents/skills/orkestrel-debrief/references/retention.md` § The carry check) before pruning them.

## Context

**The groups** (all under `/home/user/scaffold/.orkestrel/veneer/units/`):

- APPEARANCE (landed as Veneer `8507fba` and `1775bb7`): `ap-color-*`, `ap-type-*`, `apc-*`, `apt-*`, `appearance-*`,
  and the folders `apc-instruments*/`, `apt-instruments*/`, `appearance-instruments/`, `audit-launchers/`.
- The landed E-IDENTITY units: E-ID-RECORD (`6c26b14`), E-ID-LAYOUT (`dd4300a`), E-ID-CODE (`4edb3c6`), E-ID-FLOW
  (`b4825e0`), and E-ID-FLOW-2 (`873f715`): `e-id-record-*`, `e-id-layout-*`, `e-id-code-*`, `e-id-common.md`,
  `e-id-flow-*`, `eir-*`, `eil-*`, `eic-*`, `flow-*`, `flow2-*`, and their `*-instruments/` folders.
- J-FIXTURES (landed as `e07b3a6`): `jf-*` and `jf-instruments/`.
- The answered engine readings: `sanitizer-read/`, `sanitizer-read-2/`, `receipts-read/`.

**Where carriers live.** A Veneer commit that closed the item (`git -C /home/user/veneer-probe log --oneline` reads
Veneer `main` at `0865c67`); a row of Veneer's `ROADMAP.md` § Carriers (`/home/user/veneer-probe/ROADMAP.md`); a
decision in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the styles session's
`/home/user/scaffold/.orkestrel/veneer/plan.md`; a live brief under that `units/` folder (`e-id-button-*`, `ebc-*`,
`enum-*`, `er-mech-*`, `erm-*`, `rm-*`, `e-id-motion-*`, `e-id-anchor-*`, `tenets-styles/`); or the engine session's
`/home/user/scaffold/.orkestrel/veneer/engine/plan.md` § Carried findings.

**Law.** Read-only. `/home/user/scaffold/AGENTS.md` § Writing governs the answer's prose.

**Host.** Linux. Read files and run `grep` and `git log`/`git show` only. Write nothing.

## Unknowns

None.

## Scope

Read-only. Write nothing.

## Execution

Read each group's register files first: the audit verdicts (`*-audit*-verdict.md`), the design verdict where one sits
in the group, and the last report of each unit. Read a brief or an instrument only where a verdict points at it. List
every open item: a finding or referral a verdict carried, a measurement to re-take, a deferred decision, a withdrawn
claim, an unmet acceptance condition. For each, find its carrier and cite it with `file:line` or a commit hash, or
write "none" when no carrier exists.

## Output

One table per group with the columns Item (a short paraphrase), Source (`file:line`), Carrier (a commit hash with its
subject, or `file:line`, or "none"), and Status (closed, carried, or open). Then one list of every "open" row across
the groups. Then, for each group, the durable facts its records state that no guide, rule, or commit states (product
truth or process law), each with `file:line`, or "none". Under 1800 words. No recommendations.
