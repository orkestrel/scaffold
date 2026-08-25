# Unit F-W56 — adopt the audit's prescribed fixes to the totality guard and the portfolio case

## Role and engine

`implementer` on Claude Opus 5, native subagent. Perform the assignment directly and spawn
nothing beyond what the tests themselves spawn.

## Objective

Adopt, verbatim in intent, the two `BROKEN` findings from the W56 audit
(`tmp/codex/w56-audit-last.md`) in `/home/user/orkestrel/test`. Do not commit.

## Context

- Law: `AGENTS.md`, the vendored `.claude/rules/tests.md` and `.claude/rules/writing.md`.
- The audited commits: `789d7db`, `2f04580`. The verdict: `tmp/codex/w56-audit-last.md`.
- Subject files: `tests/guides.test.ts` (the totality guard,
  `carries every fence-bearing guide heading in exactly one place`),
  `tests/src/browser/factories.test.ts` (the disabled-placement case near line 298),
  `tests/setup.ts` (`ROUTED_FENCES` — read-only context).

## The fixes

**Fix 1 — the discovery walk in `tests/guides.test.ts`.**

- Preserve the owning `###` heading across deeper headings: a `####` or deeper heading must not
  clear `heading`. Only a new `###` re-assigns it and only a `##` resets the section.
- Recognize a fence opened by a backtick run of three or more, indented up to three spaces, per
  CommonMark; the closing delimiter is a run at least as long, indented up to three spaces. The
  current `line.startsWith('```')` misses the indented form.
- Compare marker presence line-anchored rather than by whole-file substring: a file carries a
  marker only when some line's trimmed text starts with `// ` immediately followed by the exact
  marker string. Apply this to the transcribed check over this file's own text and to the
  routed-carrier check. The existing carrier comments (for example
  `tests/src/browser/helpers.test.ts:373`) open exactly that way, so they still match.
- The population unit stays the `###` heading: several fences under one heading remain one entry,
  and the walk must reach a fence that follows a deeper heading under the same `###`.

**Fix 2 — the disabled-placement case in `tests/src/browser/factories.test.ts`.**

Before the disabled placement call, stage a distinct viewport and a cleared theme; after the
call, assert the viewport and theme remain unchanged, so an erroneous resize or variant
application under a disabled placement fails the case instead of coasting on state the enabled
placement left behind.

## Mutation controls

Run each against the named command, report the failing line, restore byte-for-byte, and re-run
green.

1. Append to `guides/test.md` a temporary `### Uncarried` heading, a `#### Detail` heading under
   it, and a three-space-indented fence under that. `npm run test:guides` must fail the totality
   guard naming `Uncarried`. Restore.
2. In `tests/src/browser/factories.test.ts`, temporarily delete the
   `Place a capture portfolio` marker line and insert the same marker text inside an unrelated
   comment elsewhere in the file such that no line's trimmed text starts with `// ` followed by
   the marker. `npm run test:guides` must fail naming that carrier file. Restore.
3. Mutate the new unchanged-viewport expectation in the disabled-placement case to a wrong
   value. Run the browser suite scoped to the file
   (`npx vitest run --config vite.config.ts --project src:browser tests/src/browser/factories.test.ts`).
   It must fail at the new assertion. Restore.

## Scope

**Owned.** `tests/guides.test.ts`, `tests/src/browser/factories.test.ts`.
**Off-limits.** Everything else, including `tests/setup.ts`, `guides/test.md` (mutation control 1
touches it temporarily and restores it byte-for-byte), `src/**`.
**Tools.** Read, Grep, Glob, Edit, Write, Bash. No git state changes, no commit.

## Standing conditions

The tree is committed at `2f04580` plus later fleet-visit commits; expect `tmp/` launch files to
be untracked. The browser suite runs Chromium on this host and works. The guides project runs in
Node.

## Execution

Perform the assignment directly and spawn nothing beyond what the tests themselves spawn.

## Output

Write `/home/user/orkestrel/test/tmp/units/f-w56-report.md`: each fix as landed with file:line,
each mutation control's failing line and its restored green re-run, and the closing scoped
validations (`npm run test:guides` green; the factories browser file green;
`npx oxfmt --config .oxfmtrc.json --check` and `npx oxlint --config .oxlintrc.json
--deny-warnings` over the changed files; the narrowest `tsc --noEmit` project covering them).
Return the same content as your final message.

## Deviation contract

Stop and report — expected, found, exact evidence — when a prescribed fix conflicts with a law in
`tests.md`, when a control cannot produce its red, or when a gate fails outside your owned files.
File-internal structure and case naming are yours.

## Acceptance criteria

1. Both fixes landed as specified.
2. Every mutation control produced its red at the named place and was restored green.
3. The closing scoped validations are green.
