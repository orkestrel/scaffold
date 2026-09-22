# B-PASSIVE-D round 2 — audit claims

Subject: the fix round `opus` wrote in `/home/user/veneer-bd` from
`/home/user/veneer-bd/tmp/units/b-passive-d-brief-2.md` over the round-1 verdicts
(`/home/user/veneer-bd/tmp/units/bd-audit-analyst-verdict.md`, `FAIL 3, 4, 5, 6, 9; outside the
claims: O1`; `bd-audit-reviewer-verdict.md`, `FAIL 1, 2, 5, 6, 7, 9; outside the claims: F1 to F3`).
Evidence: `/home/user/scaffold/tmp/audit/bd-fix-2.diff` (the whole diff against `3a9202a`,
untracked files as additions; the round-1 writes are inside it), `bd-fix-2-status.txt`, and the
round's report `/home/user/scaffold/tmp/audit/bd-report-2.md`. The design is
`/home/user/veneer-bd/tmp/units/b-passive-design-verdict.md`; D15's amendment is
`/home/user/veneer-bd/tmp/units/b-sweep-design-verdict.md` § Amendment; D21 (a flat paint is not a
blank frame) and D22 are recorded in the report's context. Rule each claim CONFIRMED, BROKEN, or
UNRESOLVED with `file:line`; rule a claim about a proof on the mutation named and whether the
assertions distinguish it from the passing case.

1. **The disabled forms carry a pointer assertion** (round-1 analyst 3). In
   `tests/src/styles/components/pagination.test.ts`, the equivalence case compares `pointer-events`
   beside the paint properties for `.page-link.disabled` and `.disabled > .page-link`, and the pointer
   case (`refuses the pointer on a disabled page under either spelling and leaves its neighbour
   reachable`) marks one item's parent and another item's link, reads `none` on each and `auto` on
   the neighbour between them, and drives `elementFromPoint` at each refused link's centre. The
   mutation "a trailing `.page-link.disabled { pointer-events: auto }` rule inside the layer" reddens
   both cases (`2 failed | 14 passed (16)`), and the partial is byte-identical after the revert
   (SHA-256 `1ff72744…5788`).
2. **The lifted specimen keeps space around its ring** (round-1 analyst 4). The pagination journey
   case in `tests/app/browser/integration.test.ts` lifts the specimen into a `div` stage padded
   `1rem`, prepends the stage, and in `finally` restores the specimen at its marker and removes the
   stage; the regenerated `page-strip-focus--light-390.png` shows the ring's first painted row at 12
   with the halo whole above, left, and below (the right band is covered by Page 2's active fill,
   which claim 3 records), and the other three focus frames report the same first painted row; every
   pagination frame and artifact exists for the four variants.
3. **The guide promises what the frame shows** (round-1 analyst 6, reviewer 6). In
   `guides/veneer.md` § Pagination classes the stacking paragraph states the values (`2` hovered,
   `3` focused and active) and their consequence (an active page later in the strip paints over the
   ring of the focused page before it), promising no unobscured ring; the palette paragraph states
   that a `--vn-color-primary-base` retune leaves the active page and the focus ring on Bootstrap's
   blue because each reads the palette token, and names `--bs-pagination-active-bg`,
   `--bs-pagination-active-border-color`, and `--bs-pagination-focus-box-shadow` as the overrides
   that move them; the class words `active` and `disabled` name the class states, `current` only
   `aria-current`; § Customization is untouched.
4. **`mountPagination` is a shared builder** (round-1 analyst O1). `tests/setupBrowser.ts` exports
   `mountPagination(markup, options)` with `PaginationOptions` (`classes`, `attributes`) after
   `scene`, `tests/setupBrowser.test.ts` inventories it and proves it (`renders every page its markup
   declares, under the classes and attributes it was asked for`, reading accessible names back
   against the caller's list), and `pagination.test.ts` imports it; the mutation "the builder mounts
   one fewer page than asked" reddens that case (`1 failed | 54 passed (55)`).
5. **Case-table rows are addressed by name** (round-1 reviewer F2). `pagination.test.ts` reads
   `PAGINATION_STATE_CASES` and `PAGINATION_SIZE_CASES` through `requireValue(...find(({ name }) =>
   name === '…'), '…')`; `grep -n "_CASES\[" tests/src/styles/components/pagination.test.ts` returns
   nothing.
6. **Scope is honest.** The status lists the round-1 paths plus `tests/setupBrowser.ts` and
   `tests/setupBrowser.test.ts` and nothing else; `guides/ledger/departures.md` is untouched this
   round (`oxfmt --check` exits 0 on it); `tests/setup.ts`, `tests/setup.test.ts`, and
   `app/browser/constants.ts` carry the round-1 writes and nothing of this one; the vendored files,
   `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`,
   `tests/setupStyles.test.ts`, `src/styles/_mixins.scss`, and `src/styles/components/_list.scss` are
   untouched by this round; no `tmp/probe/` file remains.
7. **The returned patches are exact** (report § Shared-file patches): Patch A (`'pagination',`
   between `'offset',` and `'ratio',` in the `tests/setupServer.test.ts` Set literal), Patch C (the
   `_pagination.scss` stacking comment rewritten to the values and their consequence), Patch D (the
   `PAGINATION_KEYS` remark in `tests/setup.ts` takes `active` and `disabled`), Patch E (the
   `PAGINATION_SPECIMENS` remark takes the class words; the rendered paragraph is copy and stays)
   each name a real line and close the finding they carry.
8. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:src:styles`
   `432 passed`; `test:app` `28 passed`; `test:setup:browser` `55 passed`; `test:guides`
   `18 passed`; `test:policy` `109 passed | 1 skipped`; four capture journeys `26 passed` each;
   observation `test:journey` `104 passed`; `test:setup` red on the Set literal (Patch A) and on the
   sweep case (closed by B-SWEEP-2 on the session branch). UNRESOLVED until the Orchestrator's
   independent chain; rule `npm run check` yourself where the sandbox allows it.
