# Verify report — U8 probe-gates, the release-mode distribution proof (probe)

## Commands, from `/home/user/fleet/probe`

### 1. `git log --oneline -1` and `git status --short`
Exit: 0
```
d24de2e Run the type stage's compiler as a process over a mirror of the workspace
```
`git status --short` produced no output (clean tree).

### 2. `PATH=/opt/npm11/bin:$PATH npm --version`
Exit: 0
```
11.19.1
```

### 3. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
Exit: 0
```
> @orkestrel/probe@0.0.12 test:distribution
> vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution

 RUN  v4.1.11 /home/user/fleet/probe

···········

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  21:22:54
   Duration  27.61s (transform 2.49s, setup 1.62s, import 18.26s, tests 7.50s, environment 0ms)
```

### 4. `PATH=/opt/npm11/bin:$PATH npm pack --dry-run 2>&1 | tail -25`
Exit: 0
```
npm notice 636B dist/bin/main.js.map
npm notice 34.7kB dist/src/core/index.cjs
npm notice 42.2kB dist/src/core/index.cjs.map
npm notice 54.5kB dist/src/core/index.d.cts
npm notice 54.5kB dist/src/core/index.d.ts
npm notice 32.9kB dist/src/core/index.js
npm notice 41.6kB dist/src/core/index.js.map
npm notice 117.6kB dist/src/server/index.cjs
npm notice 227.4kB dist/src/server/index.cjs.map
npm notice 67.8kB dist/src/server/index.d.cts
npm notice 67.8kB dist/src/server/index.d.ts
npm notice 113.0kB dist/src/server/index.js
npm notice 223.8kB dist/src/server/index.js.map
npm notice 5.1kB package.json
npm notice Tarball Details
npm notice name: @orkestrel/probe
npm notice version: 0.0.12
npm notice filename: orkestrel-probe-0.0.12.tgz
npm notice package size: 287.2 kB
npm notice unpacked size: 1.1 MB
npm notice shasum: c8fa12f9c396db991f556282139a01c7adbb2d71
npm notice integrity: sha512-/3+iKrj/986tm[...]2TZrdQLXngpBQ==
npm notice total files: 17
npm notice
orkestrel-probe-0.0.12.tgz
```

### 5. `git status --short` (expected unchanged from step 1)
Exit: 0
No output — the tree is unchanged from step 1.

## Anomalies

None observed.

GATES: GREEN
