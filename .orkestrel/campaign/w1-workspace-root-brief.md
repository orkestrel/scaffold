# Unit W1 — probe: WORKSPACE_ROOT adoption

Role: builder. Engine: native cheap tier. You perform this unit directly and spawn nothing.

## Objective

In `/home/user/orkestrel/probe` (baseline: the head commit when you start), land the
`WORKSPACE_ROOT` half of ruling 11 from
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md`:

1. Export `const WORKSPACE_ROOT = resolveRoot(import.meta)` from `tests/setup.ts` (the file
   exists and is wired into every project's `setupFiles`). `resolveRoot` is published by
   `@orkestrel/test` with signature `resolveRoot(meta: ImportMeta): URL` — import it from the
   package specifier the other tests use. The export is a URL; it stays host-independent (no
   `node:*` import in `tests/setup.ts`).
2. Convert every per-file root computation under `tests/src/**` to consume `WORKSPACE_ROOT`,
   deriving native paths at the consumer (`fileURLToPath` where the consumer needs a path —
   the consumer files are server/bin tests, so `node:url` is fine THERE). Find the sites with
   `grep -rn "fileURLToPath(new URL" tests/` and convert exactly the root-shaped ones (a URL
   built to reach the repository or workspace root); leave non-root URL constructions alone.
3. Root-level suites (`tests/*.test.ts`) call `resolveRoot` directly per the ruling — do not
   reroute them through `tests/setup.ts`.

## Environment

Native run; `node_modules` installed; Vitest runs for you. Scoped runs only.

## Scope

- Owned: `tests/setup.ts`, the `tests/src/**` test files the grep names.
- Off-limits: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
  `vite.config.ts`, `src/**`, guides. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on touched files.
2. `grep -rn "fileURLToPath(new URL" tests/src/` returns no root-shaped constructions (name the
   residual non-root hits).
3. One scoped suite per touched directory green (for example
   `npx vitest run --project src:server tests/src/server/helpers.test.ts`); record the commands.

## Deviation contract

Stop and report if a site resists the conversion (a root used before setup runs, a non-URL
consumer the derivation cannot reach) — report the site, do not improvise.

## Output

Final message = report: converted sites list, residual hits with reasons, gate tails,
`git diff --stat`, `git status --porcelain`, deviations or none.
