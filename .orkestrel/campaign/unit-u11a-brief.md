# Unit U11-A: the awaited-delay conversions

## Role and engine

Role `builder`, engine Sonnet, native subagent. You visit the named checkouts ONE AT A TIME,
strictly serially, as the sole writer in each. You perform the assignment directly and spawn
nothing.

## Objective

Design round 3 (S11): every awaited complete-statement of the exact form
`await new Promise((resolve) => setTimeout(resolve, N))` — the arrow body being the `setTimeout`
call alone, the callback the promise's own `resolve`, no timer handle captured — converts to
`await waitForDelay(N)` with `N` unchanged, wherever it appears, fixture handlers included.
Nothing else converts.

Exclusions, each by FORM, never by judgment:

- A matching statement INSIDE an attempt-counted poll loop does NOT convert (converting only a
  loop's inner delay masks the loop's budget defect; those loops await a later unit).
- A `setTimeout` whose handle is captured, whose callback is not the promise's own `resolve`,
  or which shares its promise body with other statements stays.

## The visits, in this order

1. `C:/Users/mikes/WebstormProjects/middleware` — known matching sites:
   `tests/src/server/helpers.test.ts:688` and `:1057` (VERIFY `:1057` is not loop-internal
   before converting; the loops near `:1103-1136` are excluded);
   `tests/src/core/middlewares.test.ts:526`, `:531`, `:539`, `:562`, `:566`, `:829`. This
   repo's tests do not yet import `waitForDelay` — add
   `import { waitForDelay } from '@orkestrel/test'` per each file's import idiom. Then sweep
   the whole `tests/` tree for further matching forms and convert those too, reporting each.
2. `C:/Users/mikes/WebstormProjects/browser` — `tests/src/core/BrowserHARManager.test.ts:152`;
   the loops in `tests/setupServer.ts:502`, `:683`, `:699` are EXCLUDED (loop-internal). Sweep
   the tree for further matching forms.
3. `C:/Users/mikes/WebstormProjects/workflow` — `tests/src/core/helpers.test.ts:1065`;
   `:792` is EXCLUDED (captured handle, subject input). Sweep the tree.

Do NOT visit queue, router, or agent (their sites are excluded by form or absent).

## Standing conditions

Each of the three checkouts carries ` M package.json` (the campaign's `prepack` line) — leave
it. Everything else is clean.

## Scope

- Owned per visit: the test files carrying matching forms, and their import lines.
- Off-limits: every `src/**`, every setup file's poll loops, `package.json`, everything else.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, per visit, before moving on

1. `git status --porcelain` adds exactly the touched test files to the standing entry.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the touched files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. The narrowest Vitest project covering each touched file passes; report totals per file.
5. Report the converted-site list and the skipped-site list with each skip's form reason.

## Output

Per visit: the diff, the criterion outputs, the site lists. One closing summary table. No
process diary.

## Deviation contract

Stop the whole unit only if a conversion changes a test's result (that is a behavioural
surprise — the form is supposed to be identity). A site you cannot classify by form is skipped
and recorded, never guessed.
