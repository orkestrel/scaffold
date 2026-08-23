# FIX-J audit — rule on the five repairs and the one Orchestrator edit

Both lanes receive this identical text and are blind to each other.

## Subject

`@orkestrel/scaffold` 0.0.50, commit `f4ac5da` on `claude/new-session-hxonen`. The subject is that
commit's diff: five repairs to the distribution proof template plus one edit the Orchestrator made.

The chain: design rounds, implementation W1 through W7, propagation across eleven targets, audit
round 1 (three lanes, FAIL), fix round 1 (FIX-A through FIX-E), round 2 (two lanes, FAIL), fix round
2 (FIX-G, FIX-H, FIX-I), round 3 (two lanes, FAIL, plus nine refuters). FIX-J carries round 3's five
surviving code findings.

## What this round decides

**Whether 0.0.50 publishes.** A prose unit follows this one and then the fleet re-propagates. If a
defect survives here it reaches the registry.

Every previous fix round in this campaign shipped the next defect. FIX-G introduced two of the four
faults FIX-J just repaired. Assume this one did too, and find it.

## Who wrote which half

- **Sol wrote J1 through J5.** If you are the objective lane, that is your own engine's work: attack
  it harder, because a clean pass on your own engine's output is the least valuable result you can
  return.
- **The Orchestrator (Opus) wrote one edit**: the emitted `declaration` literal reformatted to
  oxfmt's own output, at `src/core/templates.ts` around line 1504. If you are the subjective lane,
  that is your engine's work. It is briefed, owned, and audited like any other part — no part of this
  diff is exempt because the Orchestrator wrote it.

## Already established — do not re-run

Verified by the Orchestrator directly, by running it:

- `npm run format:check`, `npm run lint:check`, `npm run check` all exit 0 at `f4ac5da`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts`
  reports 21 passed, exit 0.
- Sol's four firing controls each reddened the one test naming the fix and greened on restoration.
  Transcripts are in `.orkestrel/campaign/fix-j-report.md`.
- Node's behaviour on package targets: an invalid target inside a fallback array falls through to
  the next member; a standalone invalid target throws `ERR_INVALID_PACKAGE_TARGET`.
- Node loads an extensionless file under BOTH module systems, resolving format from the nearest
  `package.json` `type`. A round-3 claim to the contrary was refuted and withdrawn. Do not revive it.
- `isModule('./x.d.mts')` is `false`. `.mts` is not in `MODULE_EXTENSIONS`; `.mjs` is.
- The authoritative tree-wide gates have NOT run. That is an independent verifier's job, not yours,
  and not a finding.

## Review evidence

- The diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/fixj-diff.txt`
- The diffstat: `.../scratchpad/audit/fixj-diffstat.txt`
- The status output: `.../scratchpad/audit/fixj-status.txt` — empty; the tree is clean.
- The unit's own report, including its integration note: `.orkestrel/campaign/fix-j-report.md`
- Round 3's ruling: `.orkestrel/campaign/audit-r3-reconciliation.md`
- The repository at `/home/user/scaffold`.

## Claims

**A1 — J1 is correct and complete.** `.node` joins `MODULE_EXTENSIONS`. Attack: does this redden a
package it should not? Is `.node` the only extension wrongly excluded, or does the same argument now
reach another one the change left out? Does the guide sentence describing the rule still match?

**A2 — J2's per-format declaration is right, and nothing still reads a single declaration.** The
entry now carries `declaration.module` and `declaration.commonjs`. Attack: enumerate EVERY consumer
of `entry.declaration` in the emitted template and show each reads the right one. A missed site is
the defect this claim exists to find.

**A3 — J3's partition selects correctly and its controls run.** `.ts` by `entry.module`, `.cts` by
`entry.commonjs`. Attack: can an entry now enter both probes, neither, or the wrong one? Is a control
still skipped for any populated format? Is any entry now compiled against a declaration it does not
publish?

**A4 — J4's validation matches Node and no more.** Attack: name a target Node accepts that the new
validation rejects, or one Node rejects that it accepts. Check the `node_modules` segment rule, the
`..` rule, the leading `./` rule, and URL-encoded forms. Does `collectTargets` now inventory exactly
what the tree owes?

**A5 — J5 left the comment true.** The quoted predicate was replaced. Attack: does the comment now
match the code beside it in the EMITTED file, not just in the template source? Generate the artifact
and read it.

**A6 — The Orchestrator's formatter edit changed only formatting.** Attack: prove the reformatted
literal is semantically identical to what Sol wrote, and that it is genuinely oxfmt's fixed point
rather than one the formatter would move again. This edit had no firing control.

**A7 — The emitted corpus is still an oxfmt fixed point, everywhere.** The corpus test covers a fixed
set of blueprint shapes. Attack the INSTRUMENT, not its output: name a workspace shape whose emitted
artifacts this corpus would not cover, where J1 through J5 could have left unformatted output.

**A8 — No refusal was widened into a regression.** Every fix here makes the proof stricter. Attack:
which legitimate published package shape now reddens that did not before? Name it concretely.

**A9 — The change is coherent as one thing.** Read the diff as one change. Name any repair layered on
a repair, any vocabulary that drifted, any place two mechanisms now do one job. Would you ship it?

## Unknowns, named as unknowns

- Whether any `entry.declaration` consumer was missed is not known to the Orchestrator. A2 is the
  claim that settles it; enumerate rather than assume.
- Whether the corpus covers every shape J1 through J5 touch is not known. A7 settles it.

## Where a probe may live

**Objective lane (Sol, inside `codex exec`):** you may write and run probes, ONLY under
`tmp/audit-fixj-sol/`. Never inside `tests/`. Delete them before returning. Do not run a tree-wide
gate. Scope every run to a named vitest project or an explicit path. Your sandbox denies a grandchild
process, a nested install, and a loopback listener — that denial is exactly what hid a defect from
the last unit, so if an attack needs one, report it as an observation naming the exact command rather
than working around it, and the Orchestrator takes that reading on the host.

**Subjective lane (Opus): you have Read, Grep, and Glob only — no Bash, no Write.** Do not plan a
probe or a command. Where a claim needs a run, return `UNRESOLVED` and name the exact command; the
Orchestrator runs it and rules. A5, A6, A7 and A9 are yours first.

## The threshold

A finding is worth more than a clean pass. This is the last code audit before the fleet re-propagates
and the version publishes. Return "no findings" only if you attacked and failed to break, and show
what you tried.

## Verdict shape

Exactly the `orkestrel-falsify` shape: numbered verdicts in this brief's order, each
`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED` with the evidence that value requires; then
findings fitting no claim; then one terminal line and only one.
