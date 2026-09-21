# Unit CL4b — CL4's two carried proof obligations

## Role and engine

`builder` on native Sonnet, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `bc580c1`, tracked tree clean. Perform the
assignment directly and spawn nothing.

Read before acting: `AGENTS.md` at the Veneer checkout root, `.claude/rules/tests.md`,
`.claude/rules/names.md`, and `.claude/rules/writing.md`. This unit names no skill.

## Why this unit exists

CL4's audit (`.orkestrel/veneer/cl4-audit-verdict.md`, round 2 finding 9 and round 1's note on
claim 7) found two proofs that pass for a reason weaker than the thing they exist to guard. No
later unit in the plan owns either file, so both come here. Neither obligation changes shipped
CSS or any public API. This unit is test-side only.

## Host facts

Windows 11, Git Bash. Run `npm` scripts from the Veneer checkout root. The `src:styles` project
loads the **built** cascade, so `npm run build:src:styles` must run before any styles proof is
read; a styles reading taken without that build reports the previous build's cascade. Managed
Chromium is the default receipt. `tmp/` in that checkout is ignored and is where you put any
scratch file.

## Obligation 1 — pin the horizontal rule's border reset

`src/styles/elements/_hr.scss` includes the `box-reset` mixin, which supplies `border: 0`. The
proof for that family pins the margin, the block-start border, and the opacity only, so dropping
the include returns the user-agent `1px inset` border on the inline sides and the block end with
the suite still green.

The case table is `TEXT_HR_CASES` at `tests/setupStyles.ts:121-134`; its frozen `values` object
is what `tests/src/styles/elements/hr.test.ts:13-24` reads, by taking `Object.keys(values)` and
reading each property. Add these entries to that `values` object, each `'0px'`:

- `border-inline-start-width`
- `border-inline-end-width`
- `border-block-end-width`

Add nothing else and change no existing entry. `tests/src/styles/elements/hr.test.ts` needs no
edit, because it derives the property list from the table.

**The red proof.** `src/styles/elements/_hr.scss:5-7` is a block include,
`@include box-reset { color: inherit; }`, and the mixin at `src/styles/_mixins.scss:16-20` emits
`margin: 0`, then the caller's content, then `border: 0`. Plant by replacing those three lines
with `margin: 0;` and `color: inherit;`, which drops only the `border: 0` and leaves the margin
and the colour the other assertions read. Then run `npm run build:src:styles`, run the horizontal
rule's proof, and record the failing output; exactly the three new width entries must fail, and
the margin, the block-start border, the opacity, and the colour must still pass. Restore the
include block exactly as it stands at `bc580c1`, rebuild, and record the same command green. The
plant sits in a file this unit does not own; prove its removal by showing
`git status --porcelain` listing no `src/styles/` path at the end.

## Obligation 2 — give the content section proof an independent control

`tests/app/browser/sections/ContentSection.test.ts:15-20` asserts that the rendered specimen
names equal `CONTENT_SPECIMENS.map((specimen) => specimen.name)` and that the rendered markup
equals the same table's `markup` values. Both compare the specimen table against itself, so
renaming a specimen in `app/browser/constants.ts` leaves the proof green. The literal tag
sequence later in the same case is the only control the file carries.

Add one assertion in that case, beside the existing literal tag sequence and in the same style:
compare `CONTENT_SPECIMENS.map((specimen) => specimen.name)` against a literal array of every
specimen name in table order, written out in the test file. Transcribe the names from
`app/browser/constants.ts` exactly. Change no existing assertion and add no case.

**The red proof.** Change one specimen's `name` value in `app/browser/constants.ts` to a value
no name uses, run the content section's proof, and record the failing output; the existing
assertions cannot catch that change and the new one must. Then restore the original value and
record the same command green. The plant sits in a file this unit does not own; prove its
removal by showing `git status --porcelain` listing no `app/` path at the end.

## Scope

Owned: `tests/setupStyles.ts` (the `TEXT_HR_CASES` values object only) and
`tests/app/browser/sections/ContentSection.test.ts`.

Planted and restored, never left changed: `src/styles/elements/_hr.scss` and
`app/browser/constants.ts`.

Off-limits: every other file, including `src/styles/**` beyond that one plant, `tests/setupStyles.test.ts`
(its assertion lists export names, which this change does not move), `tests/setupConformance.ts`,
`tests/fixtures/**`, `guides/veneer.md`, `package.json`, `configs/**`, and every vendored file.

## Execution

1. Obligation 1 with its red proof, then its green run.
2. Obligation 2 with its red proof, then its green run.
3. The ordered chain from the checkout root, reading each exit code:
   `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`,
   `npm run test:src:styles`, `npm run test:setup`, `npm run test:app:browser`.

## Output

Write `cl4b-report.md` in the Veneer checkout and return it: each obligation's change
with its site; each red proof's exact failing output and its green rerun; each plant and the
evidence it is gone; every step's exit code and final lines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: where in the case the new
assertion sits, and how you word the plant's restoration evidence. **Stop and report** if a red
proof does not redden, if restoring a plant leaves the tree different from `bc580c1`, or if
closing either obligation needs a file this brief does not name.

## Acceptance criteria

1. `TEXT_HR_CASES` carries the three width entries, each `'0px'`, and no other change.
2. The horizontal rule's proof fails with the include removed and passes with it restored, each
   recorded with its exact output.
3. The content section case carries a literal specimen-name sequence compared against the table.
4. The content section's proof fails on a renamed specimen and passes when restored, each
   recorded with its exact output.
5. `git status --porcelain --untracked-files=all` lists only the two owned files outside `tmp/`.
6. Every step of the chain exits 0.
