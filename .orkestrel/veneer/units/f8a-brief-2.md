# Unit F8a PROFILES — brief 2 (the fix round)

Successor to `tmp/units/f8a-brief.md`. What changed: the audit round ruled on the unit's writes —
`analyst` on GPT-6 Astra (`/home/user/scaffold/.orkestrel/veneer/units/f8a-audit-analyst-verdict.md`,
`VERDICT: FAIL 3, 5, 6; outside the claims: F-INFRA`) and `reviewer` on Opus
(`/home/user/scaffold/.orkestrel/veneer/units/f8a-audit-reviewer-verdict.md`). This brief carries the
findings the Orchestrator reconciled from both lanes and nothing else; the first brief stays
unedited. Same role, worktree, host, law, and scope as the first brief, plus the grants named here.

## Obligations

### Obligation 1 — the composable imports are proved (analyst 3)

The profiles proof cannot tell a `tailwind` profile that lost its `theme.css` or `utilities.css`
import from one that kept them, because the exclusion empties the emission. Give the `unexcluded`
instrument a candidate control the built cascade never carries — add `@source inline("px-8 font-bold")`
(or the pair you measure) to `tests/fixtures/tailwind/unexcluded.css` — and add a case asserting
its sheet carries a `theme` layer block declaring the theme variables those utilities read and a
`utilities` block declaring `.px-8` and `.font-bold`. Record the two mutations that redden it:
the `theme.css` import removed (the `theme` block disappears) and the `utilities.css` import removed
(the rules disappear), with the command the analyst named:
`npm exec -- vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot tests/tailwind/profiles.test.ts`.
The completeness reading keeps excluding the control names from its "every emitted name is on the
exclusion line" assertion only by reading them from the same `inline(...)` directive, so no
second list appears in the test.

### Obligation 2 — the standalone case pins no minifier detail (analyst 5)

`tests/src/styles/index.test.ts`: the custom-property namespace reading permits `--lightningcss-`
without requiring it (the expected set is `--bs-` and `--vn-`, and a generated `--lightningcss-`
member is allowed), while the foreign-namespace rejection, the cascade identity, and the sheet
isolation readings stay and the `--tw-probe` plant still reddens.

### Obligation 3 — the guide states what Tailwind emits (analyst 6)

§ Tailwind's profile table and prose say that Tailwind fills a layer only for the utilities it
generates: `theme` carries the variables those utilities read, `utilities` the rules, `base` the
preflight for the bare import, and a generated `properties` layer whose `@layer properties;`
statement Tailwind places before the consumer's order line when a utility registers a custom
property. Say that the placement leaves Veneer's named layers in their relative order, and that the
profiles proof reads that order (obligation 1's case asserts `properties` precedes `theme` in the
document's effective order when the control emits it, and the six named layers keep their order).
The recipe fences stay as they are.

### Obligation 4 — no hidden helpers in the proof (F-INFRA)

Move every reusable reader `tests/tailwind/profiles.test.ts` declares at module scope
(`loadProfile`, `readExcluded`, and the stylesheet readers) into `tests/setupBrowser.ts`, exported,
with a case each in `tests/setupBrowser.test.ts` and inventory rows; inline a trivial one-use
reading into its case. Test registration stays in the proof file.

### Obligation 5 — the reviewer's findings

The `reviewer` on Opus ruled `VERDICT: FAIL 3, 8` with findings outside the claims
(`/home/user/scaffold/.orkestrel/veneer/units/f8a-audit-reviewer-verdict.md`). Claim 3's falsified
conjunct is the claims text's own (the planted sheet lives in `tests/setupBrowser.test.ts` and
`tests/src/styles/index.test.ts`, which is stronger than the claim), and claim 8 is settled by the
finished log. The findings you carry:

- **F1.** `CASCADE_PREFIX` duplicates `TOKEN_PREFIX` from `tests/setup.ts`. Delete it; import
  `TOKEN_PREFIX` in `tests/setupBrowser.ts` and use it at the `startsWith` predicate and the
  `{@link}`; drop the export-list entry; change the import and the expected member in
  `tests/src/styles/index.test.ts`.
- **F2** (with analyst 6, obligation 3). Head the profile table's layers column
  `Layers Tailwind fills in a consumer build`, and say in the closing paragraph that the workspace's
  profiles scan the derived candidate list rather than markup, so the executed `tailwind` profile
  emits nothing and that silence is what proves the exclusion complete.
- **F3.** One sentence in § Tailwind states the exclusion line's membership rule: a shared class name
  Veneer declares with `!important` wins by importance and needs no exclusion; a shared name Veneer
  declares normally is named on the line. F8b lands the proof prose; the sentence lands now because
  the pointer at the F6 sentence promises it.
- **F4.** The one-home sentence is false as written (the list is repeated in
  `tests/fixtures/tailwind/preflight.css` and in both recipe fences). Make it true by mechanism: add a
  case to `tests/tailwind/profiles.test.ts` reading `guides/veneer.md?raw` and
  `tests/fixtures/tailwind/preflight.css?raw`, extracting every `@source not inline("…")` line, and
  asserting each equals the line in `tests/setup.css`; then write the sentence as what holds — the
  proof reads the list from `tests/setup.css` and holds every other copy equal to it, so a release
  that ships another shared name extends the line and the copies redden until they match.
- **F5, the cheap half.** Mark the `@source './src';` line inside each recipe fence with a CSS
  comment naming it as the consumer's own markup directory, and move the sentence that says so
  ahead of the first fence. The executed consumer-shaped recipe (with the trailing cascade import
  and a markup fixture) is F8b's, and the section says so in one sentence beside the fences.
- **F7.** Extend the § Files table with rows for `configs/src/vite.tailwind.config.ts`,
  `tests/setup.css`, `tests/fixtures/tailwind/`, and `tests/tailwind/`, and name the wrapper in the
  hand-authored configuration paragraph.
- **Lesser, carried.** Rename `REACHED` to `FLOOR_SELECTORS`; head the entry column `Entry`; write
  the link sentence as `the profiles proof reads it from that file rather than repeating it; see
  [stylesheet profiles](../tests/tailwind/profiles.test.ts)`; retitle the reader case
  `reads Veneer's sheet while a Tailwind stylesheet is loaded`; in `tests/src/styles/index.test.ts`
  the comment names `--lightningcss-` as the minifier's lowering of `light-dark()`, permitted and
  not required (obligation 2).
- **Referral R1, ruled.** `source(none)` on the utilities import is what silences the directory
  scan; `theme.css` generates no utility and needs none. No change.


## Scope

Owned as in the first brief, plus `tests/fixtures/tailwind/unexcluded.css` (already owned) and the
setup module's proof for the moved readers. Everything else stays off-limits.

## Output

Append `## Round 2` to `tmp/units/f8a-report.md` and return that section: each obligation's
readings (the mutations and their commands), the touched files, `git status --porcelain`, the gate
exits for `format:check`, `lint:check`, `check`, `test:src:tailwind`, `test:src:styles`,
`test:setup:browser`, `test:guides`, and `test:policy`, deviations, and the claims you flag
unverified.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:tailwind` exits 0 with the control case present and its two mutations recorded
   red.
3. `npm run test:src:styles` exits 0 with the standalone case no longer requiring `--lightningcss-`.
4. `npm run test:setup:browser` exits 0 with the moved readers' cases present.
5. `npm run test:guides` and `npm run test:policy` exit 0.
6. `grep -rn 'CASCADE_PREFIX' tests configs guides` prints nothing.
7. `grep -c '^function\|^const [a-z][A-Za-z]* = (' tests/tailwind/profiles.test.ts` prints 0.
