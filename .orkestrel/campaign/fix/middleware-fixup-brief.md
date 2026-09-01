# Fix-up unit: middleware referral repairs (non-breaking half)

## Role and engine

You are the Opus 5 `implementer` for the middleware referral fix-up. You perform the assignment
directly and spawn nothing.

## Objective

Apply the non-breaking repairs the referral probe unit established with run evidence, in
`/home/user/fleet/middleware` (campaign branch, fix unit landed, tree clean, `node_modules`
installed), with the pinning tests and guide contract in the same change. Leave the tree
uncommitted.

## Evidence

Read `/home/user/scaffold/.orkestrel/campaign/fix/referrals-middleware-report.md` in full first.
The probes it names are retained under `/home/user/fleet/middleware/tmp/referrals/` and run
with `npx vitest run --config tmp/referrals/vite.config.ts --no-cache --reporter=verbose <probe>`;
run the relevant probe before and after each repair so each defect is red first and green after.

## Repairs to apply

1. **SPA fallback, item 1 — `HEAD` parity.** `resolveStaticFallbackPath` (`src/server/helpers.ts`
   near line 78) accepts `HEAD` as well as `GET`; the fallback arm in `createStatic`
   (`src/server/middlewares.ts` near lines 290–322) answers `HEAD` with a bodiless 200 carrying
   the same headers as the `GET` answer, mirroring the primary path's `HEAD` arm near lines
   346–350.
2. **SPA fallback, item 2 — configured `etag` and `cache` apply.** Build the fallback response
   through the same `fstat`-derived header block the primary path uses, so `ETag`,
   `Cache-Control`, `Content-Length`, and `Accept-Ranges` come from the shell handle's stat and
   `If-None-Match` answers 304 exactly as the primary path does.
3. **SPA fallback, item 3 — `dotfiles` and the shell path.** Take the documentation route: state
   in `StaticOptions`'s `fallback` and `index` TSDoc that the configured `index` is served by the
   fallback regardless of `dotfiles`, because the path is operator-configured. Do not change the
   screening behavior.
4. **Asset cache finiteness.** State in `AssetOptions`'s TSDoc (the `read`/source member) and in
   the guide's Assets section that `read` must answer a bounded key set and return `undefined`
   for an unknown key, because `createAssets` retains every successful result for the process
   lifetime. No code change.
5. **Guide contract.** Update `guides/middleware.md`'s fallback section (near lines 724–729) so
   the documented contract matches repairs 1–3, and the Assets section for repair 4. Where a
   guide sentence claims a behavior, add the executed assertion that would break if the claim
   went false (per `.claude/rules/documentation.md` § Parity), in the package's existing test
   files for static and assets middleware.

## Not in this unit

The session-store seam (`SessionStoreInterface.set`) and a bounded asset capacity option move
the published surface and sit in the breaking work order. The redundant `MultipartError` re-wrap
at `middlewares.ts:418` is a shape observation for a later change. Touch none of them.

## Scope

- Owned: `src/server/helpers.ts`, `src/server/middlewares.ts`, `src/core/types.ts` (TSDoc only),
  `guides/middleware.md`, and the existing tests for static and assets middleware under
  `tests/`.
- Off-limits: `package.json`, lockfiles, every vendored instruction and policy file, vendored
  dependency guide mirrors, `tmp/referrals/**` (read and run only), and every file outside the
  repository. No commit, stage, or discarding `git` command.
- TSDoc you write uses the third-person first sentence and the `True if …; false otherwise`
  boolean form.

## Execution and gates

Repair by repair: run the probe red, apply, run it green, add or extend the pinning test. Then
the full chain from the repository root:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

Converge with `npm run lint` then `npm run format` only if `format:check` fails on files you
wrote, then re-run the non-mutating chain.

## Deviation contract

Stop and report when a repair would require a published signature change, when a probe cannot
be made red before the repair, or when a gate fails for a cause you cannot attribute. Wording and
placement within the rules are yours.

## Output

Return: per repair — applied or stopped, the probe's before/after readings, the files touched,
the test added or extended; the gate results with excerpts for any failure; `git diff --stat`;
deviations. No process diary.
