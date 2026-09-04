Unit complete except for one gate that needs an off-limits file. Report written to `/home/user/scaffold/tmp/units/followon/scaffold-setup-proof-report.md`; it is reproduced below.

## Touched files

- `/home/user/scaffold/tests/setup.test.ts` (new) — proves the host-independent infrastructure `tests/setup.ts` exports: builders, the hostile matrix and its selector, the naive-count negative control, the trap tables, and the case-table invariants.
- `/home/user/scaffold/tests/setupServer.test.ts` (new) — proves the Node-only infrastructure `tests/setupServer.ts` exports: the workspace anchors, manifest builders, real host/checkout/git/scratch fixtures, refusal readers, registry and loopback HTTP fixtures, and the derived fleet totals.
- `/home/user/scaffold/vite.config.ts` — the `setup` project factory and its entry in `test.projects`.
- `/home/user/scaffold/package.json` — `test:setup` and the `test` chain entry.
- `/home/user/work/evidence/scaffold-proofs/**` — captures.

Diffstat: `package.json | 3 ++-`, `vite.config.ts | 13 ++++++++++++-`, plus the two untracked proof files.

## Deviation

`npm test` exits 1. `tests/src/core/compilers.test.ts > blueprintToRootVite fixed proofs > keeps this repository byte-identical to every configuration it generates` compiles from a fixed blueprint that omits `setup`, so the configuration it generates now lacks the `setup` project the checkout carries. That file is off limits; the report-only patch at `tests/src/core/compilers.test.ts:1167` is:

```diff
 		const blueprint = createBlueprint('scaffold', {
 			src: ['core', 'server'],
 			bin: true,
 			guides: true,
+			setup: true,
 		})
```

A read-only probe through the built `blueprintToConfigArtifacts` settles it: `without setup => drifted: vite.config.ts`, `with setup => drifted: none` — so the wiring is byte-identical to what scaffold emits for this repository's real facts, and the one line closes the gate. Also deviating: `npx scaffold audit --offline` fails here with `sh: 1: scaffold: Permission denied` (no `node_modules/.bin/scaffold`), so both audit readings came from `node dist/bin/main.js audit --offline`, the entry the repository's own `scaffold` script runs.

## Evidence

Failing-first controls, command `npm run test:setup`: planted `buildQuestion`'s `blocking` default and `buildManifestEntry`'s default digest → exit 1, `Tests 2 failed | 67 passed (69)`, failing exactly `tests/setup.test.ts > the inert value builders > replaces only the named fields on the dependency, override, and question builders` and `tests/setupServer.test.ts > the manifest builders > digests the destination text every host root writes for an entry` (`/home/user/work/evidence/scaffold-proofs/setup-red-control.txt`). Restored by editing; `git diff --stat -- tests/setup.ts tests/setupServer.ts` prints nothing; green exit 0, `Tests 69 passed (69)` (`setup-green.txt`).

Gates, each taken inside this unit's own exec: `npm run format:check` 0, `npm run lint:check` 0, `npm run check` 0, `npm run build` 0, `npm test` 1 (the case named earlier; `Tests 1 failed, 387 passed (388)` in `src:core`, where the chain stops), `npm run test:setup` 0, `npm run test:config` 0, and the projects the stopped chain never reached, run singly: `src:server` 0, `src:bin` 0, `policy` 0, `guides` 0.

`diff audit-before.txt audit-after.txt` reports `1d0` and nothing else: the `setup` advisory line is gone and every canon row is unchanged. No `projects` question appeared, so the `test` chain reaches the registered project.

`git status --short` lists only `package.json`, `vite.config.ts`, `tests/setup.test.ts`, and `tests/setupServer.test.ts`.

The brief's unknown is answered: `tests/config.test.ts` keys projects by label (`tests/config.test.ts:281`), so array position is free; it requires the include `tests/setup*.test.ts` and setup files `['./tests/setup.ts']` whenever the glob matches (`:130`–`:137`), and `npm run test:config` exits 0 against the wiring.
