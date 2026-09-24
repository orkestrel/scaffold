# Unit RP round 3 — the padding and staging sentences

Successor to `rp-repin-brief-2.md`, which stays in force for every section this brief does not restate. What changed:
the round-2 audit (`rp-audit-2-verdict.md`) broke claim 4 and raised F1, F2, and F3. Every item is prose or a title;
no assertion or call changes.

## Role and engine

`builder` on Sonnet, a native Claude subagent, resumed with its round-2 context. Perform the assignment directly in
`/home/user/veneer-rp` and spawn nothing.

## Objective

Each padding site states the padding's gutter role and the release's park in separate sentences, and the new case says
what touches the origin and why it stages the pane.

## Context

Read `/home/user/scaffold/.orkestrel/veneer/units/rp-audit-2-verdict.md` and `rp-audit-2-subjective-verdict.md`. Host,
law, and standing conditions are as in round 2, with npm 11 first on the path. Keep every log under `tmp/units/`.

## Unknowns

None.

## Scope

Owned: `tests/app/browser/integration.test.ts`, `tests/setup.ts`, and `guides/veneer.md`. Off-limits as in round 2.

## Execution

Perform the assignment directly and spawn nothing. Write these sentences as given; you may re-wrap lines for the
formatter and settle nothing else.

1. **`tests/setup.ts`, the `CASCADE_KEYS` remarks** (around line 627). Replace "The journey releases the pointer before
   these shots, so no resting frame carries a hover paint. Each copy is lifted below a padded top." with: "The journey
   releases the pointer before these shots, and the release parks the pointer outside the page, so no resting frame
   carries a hover paint. Each copy is lifted below a padded top, and the padding is deeper than the widest negative
   gutter a specimen's first row pulls up by, so no row starts above the document."
2. **`guides/veneer.md`** (around line 10556). Replace "The journey shoots each resting element frame on a copy of its
   specimen lifted to the document's start below a padded top, after releasing the pointer, so no resting frame
   carries a hover paint." with: "The journey shoots each resting element frame on a copy of its specimen lifted to the
   document's start. It releases the pointer first, and the release parks the pointer outside the page, so no resting
   frame carries a hover paint. Each copy sits below a padded top, and the padding is deeper than the widest negative
   gutter a specimen's first row pulls up by, so no row starts above the document."
3. **The cascade-key comment** (`integration.test.ts`, around line 721). Delete its last sentence pair ("Each copy is
   lifted below the wrapper's top padding, and the padding is deeper than … so no row starts above the document.").
   Keep "The release parks the pointer outside the page." Add a comment line immediately above
   `const lifted = build('div', { classes: 'pt-5' })` (around line 742): "The lifted element's top padding is deeper
   than the widest negative gutter a specimen's first row pulls up by, so no row starts above the document."
4. **The case's title and comment** (around line 871). Title: "takes no mouseover event from the parked pointer while
   the pane is staged, on a lifted copy whose box touches the document's origin". Comment, replacing the current
   three lines: "An unpadded lift puts its wrapper first in the document with the \"Primary\" button's copy as its
   only child, so the copy's box touches the document's origin. The release parks the pointer outside the page. The
   pane is staged after the release, because staging repositions the document under a pointer that does not move with
   it, and a pointer parked at the origin would then enter the copy."

## Output

Write `tmp/units/rp-report-3.md` and return the same text: each change by site, the gate table with log paths, the green
runs, and `tmp/units/rp-3.diff` (the whole change over `1ee0faf`) and `tmp/units/rp-3-status.txt`.

## Deviation contract

As in round 1. Stop and report if a given sentence does not fit the site it names.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged with its exit status appended.
2. The renamed case passes under `journey:light-390` and `journey:dark-1280`, each scoped with `-t "while the pane is
   staged"` and with `CAPTURE` unset, each logged.
3. `grep -rn -i -E "pointer (rests|resting) off|first element touches|as the document's first element" tests/
   guides/veneer.md` returns nothing.
4. `git diff 1ee0faf -- tests/setup.ts` changes only the `CASCADE_KEYS` remarks.

## Review evidence

The Orchestrator supplies `rp-3.diff`, `rp-3-status.txt`, the report, and the logs to the checker.
