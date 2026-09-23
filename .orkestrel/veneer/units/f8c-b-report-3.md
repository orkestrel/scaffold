# Unit F8c-B MOVE, round 3 — report

Closed claim 9 (bare code tokens as sentence subjects) at the three named passages. No other
passage or table touched.

## Diff (this round's hunks only)

`git diff -- guides/veneer.md tests/setupService.ts` against the checkpoint `b9c0b0a` also carries
the round-1 and round-2 uncommitted hunks, so the isolated round-3 changes are shown as before/after
text below.

--- guides/veneer.md (around line 354) ---
```
- PostCSS plugin in Node, from the fixture's own path, so `@orkestrel/veneer/styles` resolves through
- the manifest's `exports` entry the way a consumer's install resolves it, and no alias, wrapper, or
+ PostCSS plugin in Node, from the fixture's own path, so the `@orkestrel/veneer/styles` specifier
+ resolves through the manifest's `exports` entry the way a consumer's install resolves it, and no alias, wrapper, or
```

--- guides/veneer.md (around line 404) ---
```
- that links the built cascade. Before any proof runs, `tests/setupService.ts` verifies
+ that links the built cascade. Before any proof runs, the `tests/setupService.ts` module verifies
```

--- tests/setupService.ts (`TAILWIND_PATHS` TSDoc remarks) ---
```
- * `tailwind` is `tests/setup.css`, the `tailwind` profile and the home of the exclusion line.
- * `preflight` is the `preflight` profile, `consumer` the guide's `tailwind` recipe as the workspace
- * executes it, `instrument` the `tailwind` profile without its exclusion line, and `markup` the
- * markup the consumer profile scans, each under `tests/fixtures/tailwind/`. Each path is absolute
+ * The `tailwind` key is the `tests/setup.css` file, the `tailwind` profile and the home of the
+ * exclusion line. The `preflight` key is the `preflight` profile, the `consumer` key the guide's
+ * `tailwind` recipe as the workspace executes it, the `instrument` key the `tailwind` profile
+ * without its exclusion line, and the `markup` key the markup the consumer profile scans, each
+ * under the `tests/fixtures/tailwind/` directory. Each path is absolute
```

## Gate exits

- `npx oxfmt --check guides/veneer.md tests/setupService.ts` — exit 0 ("All matched files use the
  correct format.").
- `npm run check` — exit 0 (`tsc --noEmit` for `tsconfig.json`, `check:src:core`, `check:src:browser`,
  `check:src:styles`, `check:app:browser` all completed with no diagnostics).
- `npm run test:guides` — exit 0 (1 test file, 18 tests, all passed).
