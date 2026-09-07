Lane held: verifier websocket

**Command 1** — `git rev-parse --short HEAD && git status --short` — exit 0
```
d8ff4ee
```
(no untracked or modified files — clean tree)

**Command 2** — `node -p "require('./node_modules/@orkestrel/guide/package.json').version"` — exit 0
```
0.0.18
```
(head start `0.0.18`, matching the brief's recorded state against `package.json`'s declared `^0.0.17`)

**Command 3** — `npm run format:check` — exit 0
```
All matched files use the correct format.
Finished in 2916ms on 48 files using 4 threads.
```

**Command 4** — `npm run lint:check` — exit 0
```
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no violations reported)

**Command 5** — `npm run check` — exit 0
```
> tsc --noEmit -p configs/src/tsconfig.server.json
```
(no diagnostics)

**Command 6** — `npm run build` — exit 0
```
dist/src/server/index.js  32.56 kB │ gzip: 9.52 kB │ map: 58.78 kB
dist/src/server/index.cjs  33.79 kB │ gzip: 9.71 kB │ map: 58.82 kB
✓ built in 93ms
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
```

**Command 7** — `npm run docs` — exit 0
```
rows read: 1, disagreements found: 0
```

**Command 8** — `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
- `test:src` — Test Files 4 passed (4); Tests 120 passed (120)
- `test:policy` — Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)
- `test:config` — Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
- `test:setup` — Test Files 3 passed (3); Tests 21 passed (21)
- `test:guides` — Test Files 1 passed (1); Tests 25 passed (25)
- `test:integration` — Test Files 1 passed (1); Tests 14 passed (14)

No timing red on this run.

**Command 9** — `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — declared in `package.json` (`test:distribution` script, `/home/user/fleet/websocket/package.json:66`) — exit 0
```
Test Files  1 passed (1)
     Tests  9 passed (9)
```

GATES: GREEN
