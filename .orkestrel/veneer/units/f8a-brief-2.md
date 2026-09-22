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

<!-- REVIEWER -->

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
6. `grep -c '^function\|^const [a-z][A-Za-z]* = (' tests/tailwind/profiles.test.ts` prints 0.
