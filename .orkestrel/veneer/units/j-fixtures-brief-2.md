# Unit J-FIXTURES round 2 — the refusal runs, the check order, and the message table's home

Successor to `j-fixtures-brief.md`; that brief stays in force for every section this one does not restate. What
changed: the round-1 audit (`/home/user/scaffold/.orkestrel/veneer/units/jf-audit-verdict.md`). The `MatchMessages`
name stands; the verdict rules why.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-jf`, which holds round 1. Read
`tmp/units/jf-report.md` first.

## Findings this round carries

- **J1.** Run two mutations on `requireMatch` in `tests/setupBrowser.ts`, each through
  `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts`: remove the
  duplicate refusal (the helper returns the first match), and remove the foreign refusal (the helper returns a lone
  non-HTML match). Retain each log under `tmp/units/` with the case that reads red and a byte-identical restore check.
- **J2.** Add a case that passes an SVG element followed by a `div` and asserts the duplicate refusal, so the check
  order (several matches, then none, then non-HTML) is pinned; show it red under a mutation that runs the HTML check
  first.
- **J3.** The message table the helper's cases share sits inside the test's `describe` callback. Move it into
  `tests/setupBrowser.ts` as an exported constant with TSDoc, list it in the export-list case, and import it; keep the
  registrations and assertions in the test file.

## Scope

As round 1. `tests/setupBrowser.ts` is shared with the engine session: keep the change to the helper's cases' data and
the new constant.

## Execution

Perform the assignment directly and spawn nothing.

1. Apply the findings.
2. Run `npx vitest run --config vite.config.ts --no-cache --project setup:browser`, then
   `npx vitest run --config vite.config.ts --no-cache --project app:browser`, `npm run format:check`,
   `npm run lint:check`, and `npm run check`, each logged under `tmp/units/` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/jf-report-2.md` and return the same text: the changes, the mutation table with log paths, the gate
table with log paths, `tmp/units/jf-2.diff` (`git diff 6882751`), and `tmp/units/jf-2-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the constant's name under the
naming rules. Stop and report if a caller must change.

## Acceptance criteria

The gates exit 0; each named mutation reads red with a byte-identical restore; `git diff 6882751 --stat` lists only the
two owned files; each lookup's messages are unchanged.
