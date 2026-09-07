# Report — P.1 `d7n-mcp-prep`

Every item landed and every criterion reads as the brief expected. No deviation.

Checkout `/home/user/fleet/mcp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip
`9096437` (clean at start). Wall clock, first command to last: 2026-09-07T16:44:53Z to
2026-09-07T16:59:23Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

```text
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
tsconfig.json replaced (3 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 40 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after, the P21 list exactly:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

The vendored set is byte-identical to the tip's `dist/host` copies after this unit's `npm run format`
(`cmp` over `configs/policy.ts`, `configs/helpers.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`: same). `package.json` carries the `docs` script row; `tsconfig.json` carries
the own-specifier `paths` entries.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

