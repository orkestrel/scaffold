<!-- workflow wf_17eea6d5-d63, agent aff51e5c7cad70b6d, checker on sonnet, retained 2026-09-21 -->

## Verdict

**Claim 10 [mechanical] — CONFIRMED.**

Evidence:

- **Scope.** `tmp/audit/cl5-status.txt` lists 13 modified + 12 untracked files, all under the two briefs' owned surfaces (`app/browser/**`, `guides/veneer.md`, `src/styles/index.scss`, `src/styles/components/_type|_list|_quote|_image.scss`, `tests/**` mirrors). `tests/app/browser/index.test.ts`'s diff (`cl5-diff.patch:422-440`) is exactly the six added barrel names (`MEDIA_COPY`, `MEDIA_SPECIMENS`, `MediaSection`, `TYPE_COPY`, `TYPE_SPECIMENS`, `TypeSection`) with no other change — matches the declared exception. Grep of the status file for `elements/|_reset.scss|_tokens.scss|_mixins.scss|setupConformance.ts|fixtures/|package.json|configs/` returned no matches, confirming their absence. `src/styles/_mixins.scss` is likewise absent (unchanged).
- **The keys.** Every key the claims list (`h1`-`h6`, `display`, `lead`, `small`, `mark`, `initialism`, `list-unstyled`, `list-inline`, `blockquote`, `img`, `figure`) has its selectors present in the built `dist/src/styles/index.css` (grep confirmed `.h1{` through `.h6{`, `.display-1` through `.display-6`, `.lead{`, `.small{`, `.mark{`, `.initialism{`, `.list-unstyled`, `.list-inline`, `.blockquote{`, `.blockquote-footer`, `.img-fluid`, `.img-thumbnail`, `.figure{`, `.figure-img`, `.figure-caption`).
- **The guide.** `guides/veneer.md:769-784` gives each of those keys one `selector` row with Status `shipped`, and `tests/conformance.test.ts`'s and `tests/setupConformance.test.ts`'s `listed`/`Set` values (`cl5-diff.patch:509-528`, `541-563`) list exactly that same set plus `btn`/`reboot`/`engine`. No mismatch found either direction.
- **The layer/loading.** All four new partials are wrapped in `@layer components` (`cl5-diff.patch:883-1017`); `src/styles/index.scss` adds each `@use` once, after `components/button` (`cl5-diff.patch:379-386`).
- **The sweep.** `Glob` over `src/styles/components/*.scss` in the live Veneer tree returns exactly five files: `_button.scss` plus the four new partials — matches the claim.
- **Law sweep.** Grep over the diff for `any`, non-`as const` assertions, non-null assertions, suppression comments, `public`/`private`/`protected`, parameter properties, default exports, and skipped/`.skip`/`.todo` cases found no hits in the added code (the sole `as const` hit is a pre-existing, untouched line in `BUTTON_SIZE_CASES`).
- **The report** (`.orkestrel/veneer/units/cl5-report.md`) self-names this same `tests/app/browser/index.test.ts` deviation and its exact diff, which matches what the tree shows — CONFIRMED as accurately reported, not merely asserted.

**Gate half of claim 10**: not ruled — the independent verifier's chain is outside this lane's slice, per the brief.

## Extra findings

1. `src/styles/components/_type.scss:1-6` (`.h1`-`.h6` block: `margin: 0; font-weight: var(--vn-weight-heading); line-height: var(--vn-line-heading); color: var(--bs-heading-color)`) duplicates `src/styles/elements/_heading.scss`'s tag block verbatim. `.claude/rules/styles.md` centralizes a pattern repeated across two partials into `src/styles/_mixins.scss`. The unit's own report names this as a carried-forward finding, citing that `src/styles/elements/**` was off-limits to this unit's scope (brief 1's Owned/Off-limits split) and that its shared-block sweep is bounded to `src/styles/components/`, which cannot see a duplicate against `elements/`. This is a legitimate scope boundary, not a mechanical-law violation by this unit — carries no fix-round force.

Verdict: accept
