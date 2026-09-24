# Unit AP-TYPE round 6 — the form-check partial sentence

Successor to `ap-type-brief-5.md`, which stays in force for every section this brief does not restate. What changed:
the round-5 audit (`apt-audit-5-verdict.md`) found one partial sentence that names the wrong partial.

## Role and engine

`builder` on Sonnet, a native Claude subagent, resumed with its context in `/home/user/veneer-apt`.

## Objective

In `guides/veneer.md` § Form check classes, the sentence "This partial writes none of either." reads, verbatim, "The
`_form-check.scss` partial writes none of either."

## Scope

**Owned.** That sentence and its paragraph's rewrap, and new files under `tmp/units/`. Everything else is off-limits.

## Execution

Perform the assignment directly and spawn nothing. Replace the sentence, rewrap its paragraph by hand to 100 columns,
then run `npm run format:check` and `npm run test:guides`, each logged as `tmp/units/apt-6-<gate>.log.txt`.

## Output

Write `tmp/units/apt-report-6.md` and return the same text: the before and after paragraph, the gate table with log
paths, and `tmp/units/apt-6.diff` (`git diff 712ae72 -- guides/veneer.md`).

## Acceptance criteria

1. The sentence reads the objective's text exactly, and no other word of the guide changed from round 5.
2. `format:check` and `test:guides` exit 0.
