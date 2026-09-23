# B-FORMS-RENAME (D40a) — audit claims

## Subject

The B-FORMS-RENAME writes in `/home/user/veneer-bfr` (a worktree detached at `53628aa`, the
session branch tip), written by `builder` on Sonnet from
`/home/user/veneer-bfr/tmp/units/b-forms-rename-brief.md` under D40a
(`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D40a): `control-type` becomes
`input-text` and `control-border` becomes `input-border` in `src/styles/_mixins.scss` and at every
include, with the compiled cascade byte-identical, and the `INPUT_GROUP_CASES` remark takes the
`FORM_CONTROL_CASES` remark's voice for the `reads` map. One round so far: this one. **Review
evidence.** `/home/user/scaffold/.orkestrel/veneer/units/bfr.diff` (the whole diff against
`53628aa`), `bfr-status.txt`, the brief `b-forms-rename-brief.md`, and the report
`b-forms-rename-report.md` (the compile comparison's exit codes and the gate table). The compile
comparison is the writer's; the objective lane repeats it.

## What the round decides

Whether B-FORMS-RENAME lands on the session branch as one commit after `53628aa` with the D40a
carrier row closed at the fold, and whether the mixin names and comments read as the file's form.

## Already established — do not re-run

D40 and D40a; the CONTROL rounds' rulings on the mixins' declarations and on the `reads`
sentence's wording (`bfo-4-audit-verdict.md` claim 2, `bfo-3-audit-verdict.md` claim 3); the
sandbox for the objective lane is read-only with no browser and runs no Vitest project
(`npm run check`, `node -e`, and `npx sass` that write nothing are allowed); the Orchestrator's
landing chain settles the gates.

## Unknowns

- Whether any site outside the grep the brief quotes names either old mixin (a test string, a
  guide sentence, or a comment): the lanes search `src`, `tests`, `guides`, and `app`.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a compile comparison is ruled on
an independent compile. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with
`file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** The diff against `53628aa` consists of the two mixin renames with
   their comments, the six include lines, and the `INPUT_GROUP_CASES` remark's `reads` paragraph,
   and nothing else; the status lists the owned files and nothing else; a search for
   `control-type` and `control-border` over `src`, `tests`, `guides`, and `app` returns nothing.
2. **The compile is byte-identical.** The compiled cascade at `53628aa` and after the rename are
   the same bytes (the objective lane compiles both with `npx --no-install sass --no-source-map
   src/styles/index.scss`, the second from the worktree and the first from an in-memory copy with
   the old names, and compares them).
3. **The names and comments.** `input-text` and `input-border` follow the `_mixins.scss` file's
   `-text` form for a typography run and name the release's `$input-*` family, distinct from the
   `control-text` reboot reset; each comment names `.form-control`, `.form-select`, and
   `.input-group-text` as the readers; every changed comment and the remark follow `writing.md`.
4. **One voice.** The `INPUT_GROUP_CASES` remark's `reads` paragraph and the `FORM_CONTROL_CASES`
   remark's carry the same two sentences about the map, the empty map, and the moved token, with
   the input-group paragraph keeping its own clause about a sized select heading two rules.
5. **Law and scope.** Across the diff: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function; the off-limits files untouched. Run `npm run check` and report
   its exit code as evidence here (the objective lane).
