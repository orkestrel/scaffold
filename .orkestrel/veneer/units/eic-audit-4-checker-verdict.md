LANE: eic-audit-4-checker

**Claim 2 — Chip sentences: CONFIRMED**
- `src/styles/_mixins.scss:106` — "Emits the chip the `code`, `kbd`, `samp`, and `var` elements wear: a surface and the small corner." Names all four elements, no count word.
- `guides/veneer.md:9924` — `samp { border-radius }` Reason: "Elements gives sample output the chip corner the `code`, `kbd`, and `var` elements also wear." Names the other three elements, no count.
- `tests/src/styles/elements/samp.test.ts:6-8` (diff) — "The samp element wears the chip the code, kbd, and var elements wear." Names elements, no count.
- `tests/src/styles/elements/var.test.ts:6-8` (diff) — "The var element wears the chip the code, kbd, and samp elements wear." Names elements, no count.
- Compiled cascade `dist/src/styles/index.css` (grep on minified rules): `code{...border-radius:var(--vn-radius-small)...}`, `kbd{...border-radius:var(--vn-radius-small)...}`, `samp{...border-radius:var(--vn-radius-small)...}`, `var{...border-radius:var(--vn-radius-small)...}` — all four elements resolve `border-radius`, matching every sentence above. None of the four sentences states a count (they enumerate the elements by name).

**Claim 4 — One citation: CONFIRMED**
- `guides/veneer.md:6616-6617` is the only hit for `tenet` in the file (single `Grep` match), so the tenet is cited once, in the § Deferred selectors lead (`guides/veneer.md:6607`).
- The lead names only rows whose reason is tag composition or adjacency: the table's `ol ol`/`ul ul`/`ol ul`/`ul ol`/`pre code`/`a > code`/`kbd kbd` rows (`guides/veneer.md:6621-6627`) all read "infers styling from tag composition," and `legend + *` (`guides/veneer.md:6628`) reads "infers layout from adjacency"; every other `Excluded` row in that table (`guides/veneer.md:6629-6634`) states a different reason (browser-engine unreachability, redundant vendor alias) and is not covered by the lead's own wording.
- `pre code`, `a > code`, `kbd kbd` Excluded Reason cells (`guides/veneer.md:6625-6627`) read as at `ca83afb`: `eic-4.diff` contains no hunk touching those lines (the only `guides/veneer.md` hunk in `eic-4.diff:20-38` adds the tenet-lead sentence and the new `samp { border-radius }` row), so the diff itself is the evidence these three rows are unchanged from `ca83afb`.

**Claim 5 — Scope and law: CONFIRMED**
- Status (`eic-4-status.txt:1-13`) lists exactly: `app/browser/constants.ts`, `guides/veneer.md`, `src/styles/_mixins.scss`, `src/styles/elements/_kbd.scss`, `_pre.scss`, `_samp.scss`, `tests/app/browser/sections/ContentSection.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/elements/kbd.test.ts`, `pre.test.ts`, `samp.test.ts` — each granted shared/owned by round 1 (`e-id-code-brief.md:18-23`) or round 2 (`e-id-code-brief-2.md:19-20`) and carried forward (`e-id-code-brief-3.md:19`); plus `src/styles/elements/_var.scss`, `tests/src/styles/elements/var.test.ts`, and `TEXT_VAR_CASES` in `tests/setupStyles.ts`, granted by round 4 (`e-id-code-brief-4.md:38-39`). No status row falls outside these grants.
- The diff (`eic-4.diff`) touches only SCSS declarations, a guide table/prose, a constants array of markup strings, and Vitest test bodies; no line adds `any`, `as`, a non-null assertion (`!`), a suppression comment, a nested function declaration, or a hidden module helper.
- Added or retitled tests are named for what they prove: `ContentSection.test.ts:184` "keeps each tag its own treatment inside a link, a code block, and a key"; `kbd.test.ts:269` and `pre.test.ts:284` "reads its border width from the release hook a scope retunes"; `samp.test.ts` and `var.test.ts` add assertions to existing, unretitled cases (`it.each(...)('resolves the samp/var values in $mode mode', ...)`), so no retitle applies there.

Findings outside the claims: none.

VERDICT: PASS
