# F8c-B MOVE, round 2 — audit claims

## Subject

The F8c-B fix round's uncommitted writes in `/home/user/veneer-f8b` (branch `unit/f8b`, checkpoint
`b9c0b0a` = F8c-A READERS as accepted after its round-3 audit), written by `opus` from
`/home/user/veneer-f8b/tmp/units/f8c-b-brief-2.md` (the successor carrying the round-1 audit's findings: reviewer 4(a), 4(b), § Scripts wording, R1, D25, R4, D27, deviation 3, analyst 2)
over the round-1 writes ruled in `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-audit-verdict.md`.
Rounds so far: round 1 (analyst FAIL 1, 2, 11; reviewer FAIL 4, 5, 6, 7, 9, 11), this fix round.
**Review evidence.** `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-2.diff` (the whole diff against `b9c0b0a`,
untracked `tests/service/**` added with `git add -N` so the diff renders them),
`f8c-b-2-status.txt`, the round-1 diff `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-1.diff` for the delta
this round added, the report `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-2-report.md`, and the mutation
log `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-2-mutations.log.txt` (instrument
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8cb2-mutate.py`).

## What the round decides

Whether the nine carried findings are closed in the owned files so that F8c (A and B) lands on
Veneer `main` from the checkpoint, and whether the writer's deviation 1 (the D25 citations corrected
to CSS Cascading and Inheritance Level 5 § Importing Style Sheets and § Declaring Without Styles,
because the brief's cited sections do not state the rule) stands.

## Already established — do not re-run

Verified by the Orchestrator directly: the checkpoint `b9c0b0a`; the round-1 verdicts and their
reconciliation (`f8c-b-audit-verdict.md`); `grep -rnw 'TAILWIND_PATHS\|readVeneerGuide' tests`
finds the two declarations (`tests/setupService.ts:79`, `tests/setupServer.ts:1178`), their
inventory rows and proofs, and their consumers in the three service proofs and nothing else; the
guide's import-placement paragraph links `https://www.w3.org/TR/css-cascade-5/#at-import` and
`#layer-empty` (`guides/veneer.md:318-319`); `git diff b9c0b0a --stat` reports 18 files, 849
insertions, 1127 deletions; the SHA-256 of `tests/setupService.ts` opens `b0f68c90da35b48a`, the
value the mutation log records after the `TAILWIND_PATHS.consumer` revert. The sandbox is
read-only with no browser: rule a browser-only reading by naming its settling command.

## Unknowns

- Whether the round-1 findings' closures introduced a new defect in the delta between
  `f8c-b-1.diff` and `f8c-b-2.diff` (the files this round touched: `guides/veneer.md`,
  `tests/service/tailwind/{consumer,profiles,preflight}.test.ts`, `tests/setupService.ts`,
  `tests/setupService.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`): read the delta,
  not the whole diff, for claims 1 to 8, and the whole diff for claim 9.
- Whether the cited spec sections state the `@import` placement rule as the guide paraphrases it:
  the sandbox has no network, so rule from the guide's sentence against the writer's verbatim quote in
  the report (§ Deviations 1) and mark the citation `UNRESOLVED` if the quote is the only evidence.

## The threshold

A finding is worth more than a clean pass: this round lands F8c on `main`, and every later Tailwind
reader builds on its service proofs. `CONFIRMED` requires naming the attack that failed; a claim
about a proof is ruled on the mutation named and whether the assertions distinguish it from the
passing case. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The important-branch overclaim is closed** (reviewer 4(a)). The § Tailwind sentence ends
   "with the exclusion line dropped and Tailwind's own rule on the page, the element resolves, for
   every property that rule declares, what it resolves under the cascade and the plant alone", and
   the comment at the comparison in `tests/service/tailwind/consumer.test.ts` (the case `keeps an
   important shared declaration whatever the recipe withholds`) states the same; the comparison
   itself reads only the longhands Tailwind's own rule declares. Rule whether "the cascade and the
   plant alone" (the writer's wording, because the baseline reading is taken with the plant loaded)
   is the true statement of what the assertion compares.
2. **The § Files rows and § Scripts read in the table's grammar** (reviewer 4(b), § Scripts). The
   `tests/setupService.ts` row reads "The service setup: the readiness that verifies the compiler,
   the built cascade, the pinned browser, and the candidate list; the paths of the Tailwind profiles
   and fixtures; the profile compiler; and the stage that reads what a page resolves"; the
   `tests/setupServer.ts` row names "the installed and built cascades and the guide"; § Scripts says
   "the `prepublishOnly` chain runs it" and "The `service` project's readiness … before the
   `test:service` script". Each row follows `writing.md` (a code token followed by a noun; no banned
   term; no count).
3. **R1 binds** (reviewer R1). The planted `@layer components { .col-1 { color: rgb(1, 2, 3)
   !important } }` reddens the comparison case with `[ 'grid-column-start: auto became 1' ]` and
   `col-1` stays in the branch (log entry 1; `1 failed | 16 passed (17)` then `17 passed (17)`);
   the SHA-256 before equals after. Rule from the assertion whether that plant is the mutation the
   case distinguishes and whether a plant with `!important` on a longhand Tailwind's rule does not
   declare would also redden it.
4. **D25 lands with corrected citations** (reviewer R2; deviation 1). The import-placement paragraph
   states the rule ("an `@import` rule is valid only ahead of every rule other than `@charset` and
   `@layer` statements") with the two Cascade 5 links, states the Vite `postcss-import` sentence as
   a consequence, keeps the import-first closing clause, and adds no test. Rule whether the
   paragraph's rule statement matches the quoted spec text and whether the brief's original
   citations (Cascade 5 § Layer Ordering, Syntax 3 § The `@import` rule) would have been wrong, per
   the report's § Deviations 1.
5. **R4 lands** (reviewer R4). `TAILWIND_PATHS` is a frozen record in `tests/setupService.ts` after
   `CANDIDATES_PATH` with the keys `tailwind`, `preflight`, `consumer`, `instrument`, `markup`, each
   an absolute path under `WORKSPACE_ROOT`; `readVeneerGuide()` in `tests/setupServer.ts` after
   `readBuiltCascade` reads `resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH)`; every repeated path and
   guide read in the three service proofs and in `tests/setupService.test.ts`'s `CANDIDATE_FLOOR`
   case goes through them; both are inventoried and proved (`TAILWIND_PATHS › locates each Tailwind
   profile and fixture…`, `server setup › reads the Veneer guide anchored at the workspace root…`);
   the failing-first run reads `5 failed | 197 passed (202)` with the five named cases, then `202
   passed`; the mutations (a key pointed at `unexcluded.css`; the loader reading relative to the
   working directory under `process.chdir` in the `forks` pool) redden exactly the added case. Rule
   whether the `tailwind` key beyond the brief's four paths is the same defect the rule names, and
   whether the absolute-path requirement is what `compileProfile`'s `from` needs.
6. **D27 lands** (analyst 1). The comment on the profiles order case states the structural reading
   (the first placement of each layer across the linked cascade followed by the loaded profile) and
   that `stage.open` and `stage.load` fix the sheet sequence the proof assumes; the `properties`
   case comment points at the same assumption; § Tailwind carries one sentence after "reads both
   orders" stating the limit. No stage member is added.
7. **Deviation 3 is closed.** The `@param source` TSDoc of `collectInlineSources` reads "The
   stylesheet text, such as a profile read from its file or the CSS fences of a guide holding a
   profile."; the function is otherwise unchanged from `b9c0b0a`.
8. **The `candidates.txt` writer is unique** (analyst 2). `grep -rn "candidates.txt\|CANDIDATES_PATH"
   tests configs src app` returns the declaration and the one write in `verifyReadiness`, the four
   hits in `tests/setupService.test.ts`, and the three `@source` read directives (`tests/setup.css:13`,
   `tests/fixtures/tailwind/preflight.css:5`, `tests/fixtures/tailwind/unexcluded.css:7`), and
   nothing else. Reproduce the grep.
9. **The law holds across the whole diff.** No `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback passed or returned directly; readonly
   interface members; one-word entity members; `{verb}{Noun}` helpers (`readVeneerGuide`); frozen
   exported tables; no mock, spy, or fake; every added guide sentence follows `writing.md`.
10. **Scope is honest.** `f8c-b-2-status.txt` is the round-1 set plus `tests/setupServer.ts` and
    `tests/setupServer.test.ts`; no `ROADMAP.md` change beyond round 1's one-row fix; `tmp/probe/`
    is absent; no vendored file is touched; the observation the report ends with (the repeated
    `resolve(WORKSPACE_ROOT, 'guides/veneer.md')` in `readCompatibility`, `readDeferrals`,
    `readDepartures`, `readAdditions`, and the working-directory `VENEER_GUIDE_PATH` read in
    `tests/setupStyles.test.ts`) is outside this unit's scope and is recorded, not fixed. Rule whether
    it is a defect and name the smallest fix for the carrier.
11. **Gates.** `format:check` (219 files), `lint:check`, `check` exit 0; `test:policy` `109 passed |
    1 skipped`; `test:conformance` `17 passed`; `build:src:styles && test:service` `17 passed` in
    12 s wall at load 6.5 to 7.4; `test:setup` `202 passed`; `test:guides` `18 passed`. UNRESOLVED
    until the Orchestrator's independent chain at the F8c landing; run `npm run check` yourself.
